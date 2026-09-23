import { countQuery, totals } from "./helpers.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

function loadModule(path, dependencies) {
  const compiled = ts.transpileModule(readFileSync(path, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const loadedModule = { exports: {} };
  new Function("require", "module", "exports", compiled)((name) => {
    assert.ok(name in dependencies, `Unexpected dependency: ${name}`);
    return dependencies[name];
  }, loadedModule, loadedModule.exports);
  return loadedModule.exports;
}

function repository(entries) {
  const client = { from(table) {
    assert.ok(["candidate_registry", "competition_entries"].includes(table));
    return { select(_columns, options) { return table === "candidate_registry"
      ? Promise.resolve({ count: 4, error: null })
      : countQuery(entries, options); } };
  } };
  // getClientOrThrow only checks presence; no real client or network is used.
  const previous = process.env.RADAR_HMAC_SECRET;
  process.env.RADAR_HMAC_SECRET = "isolated-test-only";
  const loaded = loadModule("src/lib/competition/repository.ts", {
    "server-only": {},
    "@/data/competition-totals": totals,
    "@/lib/supabase/server": { getSupabaseServerClient: () => client },
  });
  return { loaded, restore() { if (previous === undefined) delete process.env.RADAR_HMAC_SECRET; else process.env.RADAR_HMAC_SECRET = previous; } };
}

const agent = "Agente de Polícia Judiciária";
const entry = (cargo, region) => ({ candidate_registry: { cargo }, competition_region: region, updated_at: "2026-09-01T00:00:00Z" });

test("optional Agente scope excludes other cargos and preserves default totals", async () => {
  const { loaded, restore } = repository([entry(agent, "interior"), entry(agent, "curitiba_rm"), entry("Delegado de Polícia", "interior")]);
  try {
    const scoped = await loaded.getCompetitionStats(agent);
    assert.equal(scoped.participants, 2);
    assert.equal(scoped.officialSourceTotal, 40284);
    assert.equal(scoped.coveragePercent, 2 / 40284 * 100);
    const all = await loaded.getCompetitionStats();
    assert.equal(all.officialSourceTotal, 62657);
    assert.equal(all.coveragePercent, 3 / 62657 * 100);
    assert.equal(scoped.byRegion.find(row => row.region === "interior").participants, 1);
    assert.equal((await loaded.getCompetitionStats()).participants, 3);
  } finally { restore(); }
});

test("empty database returns available zero totals and client derives finite zero percentages", async () => {
  const { loaded, restore } = repository([]);
  try {
    const payload = await loaded.getCompetitionStats(agent);
    const client = loadModule("src/lib/competition-data.ts", { "@/data/competition": {} });
    const stats = client.mapCompetitionStatsToStatistics(payload);
    assert.equal(payload.available, true);
    assert.equal(stats.totalParticipants, 0);
    assert.deepEqual(stats.regions.map(row => row.percentage), [0, 0]);
  } finally { restore(); }
});

test("exact head counts preserve totals beyond the REST row limit", async () => {
 const {loaded, restore} = repository(Array.from({length:1501}, (_,i) => entry(agent, i < 1000 ? "interior" : "curitiba_rm")));
 try { const stats = await loaded.getCompetitionStats(agent); assert.equal(stats.participants,1501); assert.deepEqual(stats.byRegion.map(x=>x.participants),[501,1000]); assert.equal(stats.coveragePercent,1501/40284*100); } finally { restore(); }
});
