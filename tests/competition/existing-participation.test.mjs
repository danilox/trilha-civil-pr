import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

function loadIsolated(path, dependencies) {
  const code = ts.transpileModule(readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const exports = {};
  new Function("require", "exports", "process", code)((name) => {
    assert.ok(name in dependencies, `Unexpected dependency: ${name}`);
    return dependencies[name];
  }, exports, { env: { RADAR_HMAC_SECRET: "isolated-test-only" } });
  return exports;
}

test("participação existente preserva uma entrada por candidato", async (t) => {
  const entries = new Map();
  const candidateKey = "isolated-candidate-key";
  const candidate = {
    candidate_key: candidateKey,
    name_key: "isolated-name-key",
    cargo: "Agente de Polícia Judiciária",
    local_prova: "Curitiba/PR",
    source_version: "isolated-test",
  };
  let writes = 0;
  // Only an in-memory adapter is supplied. No Supabase connection is possible.
  const client = {
    from(table) {
      assert.ok(["candidate_registry", "competition_entries"].includes(table));
      return {
        select(_columns, options) {
          if (options?.head) return Promise.resolve({ count: 1, error: null });
          return {
            eq(column, key) {
              assert.equal(column, "candidate_key");
              return { async maybeSingle() {
                return { data: table === "candidate_registry"
                  ? key === candidateKey ? candidate : null
                  : entries.get(key) ?? null, error: null };
              } };
            },
            async returns() {
              return { data: [...entries.values()].map((entry) => ({
                ...entry, candidate_registry: { cargo: candidate.cargo },
              })), error: null };
            },
          };
        },
        async upsert(row, options) {
          assert.equal(table, "competition_entries");
          assert.deepEqual(options, { onConflict: "candidate_key" });
          assert.deepEqual(Object.keys(row).sort(), ["candidate_key", "competition_region"]);
          entries.set(row.candidate_key, { ...entries.get(row.candidate_key), ...row });
          writes++;
          return { error: null };
        },
      };
    },
  };
  const repository = loadIsolated("src/lib/competition/repository.ts", {
    "server-only": {},
    "@/lib/supabase/server": {
      getSupabaseServerClient: () => client,
      isSupabaseServerConfigured: () => true,
    },
  });
  const service = loadIsolated("src/lib/competition/service.ts", {
    "server-only": {},
    "@/lib/competition/repository": repository,
    "@/lib/competition/crypto": {
      createValidationToken: () => "isolated-token",
      readValidationToken: (token) => token === "isolated-token" ? { candidateKey } : null,
    },
    "@/lib/competition/identity": {
      createCandidateKey: () => candidateKey,
      createNameKey: () => candidate.name_key,
      normalizeFullName: (name) => name.trim().toUpperCase(),
      normalizeRegistration: (registration) => registration.replace(/\D/g, ""),
    },
  });
  const validate = () => service.validateCompetitionCandidate("Candidato Teste", "12345678");

  await t.test("primeira participação cria exatamente um registro", async () => {
    assert.equal((await validate()).response.hasExistingEntry, false);
    assert.equal(entries.size, 0);
    const result = await service.participateInCompetition("isolated-token", "interior");
    assert.equal(result.response.status, "created");
    assert.equal(entries.size, 1);
    assert.equal(writes, 1);
  });

  await t.test("revalidar a mesma inscrição não grava e repetir envio não duplica", async () => {
    const result = await validate();
    assert.equal(result.response.hasExistingEntry, true);
    assert.equal(result.response.competitionRegion, "interior");
    assert.equal(writes, 1);
    assert.equal(entries.size, 1);
    assert.equal((await service.participateInCompetition("isolated-token", "interior")).response.status, "updated");
    assert.equal(entries.size, 1);
  });

  await t.test("Interior para Curitiba altera somente a região da mesma entrada", async () => {
    const previous = { ...entries.get(candidateKey) };
    const result = await service.participateInCompetition("isolated-token", "curitiba_rm");
    assert.equal(result.response.status, "updated");
    assert.equal(entries.size, 1);
    assert.deepEqual(entries.get(candidateKey), { ...previous, competition_region: "curitiba_rm" });
    assert.equal((await validate()).response.competitionRegion, "curitiba_rm");
  });

  await t.test("total geral permanece um e apenas a distribuição regional muda", async () => {
    const stats = await service.getCompetitionStatsResponse();
    assert.equal(stats.participants, 1);
    assert.equal(stats.byRegion.find((region) => region.region === "interior").participants, 0);
    assert.equal(stats.byRegion.find((region) => region.region === "curitiba_rm").participants, 1);
  });
});
