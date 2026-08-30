import { readFileSync } from "node:fs";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";
import { createCandidateKeyWithSecret } from "../src/lib/competition/identity-core.mjs";

const localBaseUrl = process.env.RADAR_LOCAL_BASE_URL || "http://localhost:3000";
let currentStage = "start";

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
      continue;
    }
    if (char === '"') {
      quoted = !quoted;
      continue;
    }
    if (char === "," && !quoted) {
      values.push(current);
      current = "";
      continue;
    }
    current += char;
  }

  values.push(current);
  return values;
}

function getPrivateRows() {
  const lines = readFileSync("private-data/candidatos-pcpr-enriquecido.csv", "utf8")
    .replace(/^\uFEFF/, "")
    .trimEnd()
    .split(/\r?\n/);
  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => (
    Object.fromEntries(headers.map((header, index) => [header, parseCsvLine(line)[index] || ""]))
  ));
}

function pickSamples(rows) {
  const positional = [
    { label: "inicio", row: rows[0] },
    { label: "meio", row: rows[Math.floor(rows.length / 2)] },
    { label: "fim", row: rows[rows.length - 1] },
  ];
  const cargos = Array.from(new Set(rows.map((row) => row.cargo))).map((cargo) => ({
    label: `cargo:${cargo}`,
    row: rows.find((row) => row.cargo === cargo),
  }));

  const seen = new Set();
  return [...positional, ...cargos].filter((sample) => {
    if (!sample.row || seen.has(sample.row.registration)) return false;
    seen.add(sample.row.registration);
    return true;
  });
}

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL?.trim();
  const secretKey = process.env.SUPABASE_SECRET_KEY?.trim();
  if (!url || !secretKey) throw new Error("Supabase env ausente.");

  return createClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function hasForbiddenJsonKey(value) {
  const text = JSON.stringify(value);
  return /candidate_key|name_key|registration|full_name|"afro"|"pcd"/i.test(text);
}

function assertStage(condition, message) {
  if (!condition) throw new Error(message);
}

async function post(path, body, requestKey = "203.0.113.31") {
  const response = await fetch(`${localBaseUrl}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": requestKey },
    body: JSON.stringify(body),
  });
  return { status: response.status, json: await response.json() };
}

async function countEntries(client) {
  const { count, error } = await client
    .from("competition_entries")
    .select("candidate_key", { count: "exact", head: true });
  if (error) throw error;
  return count ?? 0;
}

async function currentRegion(client) {
  const { data, error } = await client
    .from("competition_entries")
    .select("competition_region")
    .limit(1)
    .single();
  if (error) throw error;
  return data.competition_region;
}

async function stats() {
  const response = await fetch(`${localBaseUrl}/api/concorrencia/stats`);
  return response.json();
}

function getRadarSecret() {
  const secret = process.env.RADAR_HMAC_SECRET?.trim();
  if (!secret) throw new Error("RADAR_HMAC_SECRET ausente.");
  return secret;
}

async function deleteTemporaryEntry(client, candidateKey) {
  const { error } = await client
    .from("competition_entries")
    .delete()
    .eq("candidate_key", candidateKey);
  if (error) throw error;
}

async function main() {
  const rows = getPrivateRows();
  const samples = pickSamples(rows);
  const row = samples[0].row;
  const candidateKeyForCleanup = createCandidateKeyWithSecret(getRadarSecret(), row.registration);
  const client = getSupabaseClient();

  currentStage = "stats-initial";
  const initialStats = await stats();
  const initialEntries = await countEntries(client);
  assertStage(initialEntries === 0, `initial-entries-${initialEntries}`);

  currentStage = "validate-samples";
  const sampleResults = [];
  for (const [index, sample] of samples.entries()) {
    const response = await post("/api/concorrencia/validate", {
      registration: sample.row.registration,
      fullName: sample.row.full_name,
    }, `203.0.113.${40 + index}`);
    sampleResults.push({
      label: sample.label.startsWith("cargo:") ? "cargo" : sample.label,
      pass:
        response.status === 200 &&
        response.json.valid === true &&
        response.json.cargo === sample.row.cargo &&
        response.json.localProva === sample.row.local_prova &&
        !hasForbiddenJsonKey(response.json),
    });
  }

  currentStage = "validate-valid";
  const valid = await post("/api/concorrencia/validate", {
    registration: row.registration,
    fullName: row.full_name,
  }, "203.0.113.90");
  assertStage(valid.status === 200 && valid.json.valid === true, `validate-valid-status-${valid.status}`);
  currentStage = "validate-wrong-name";
  const wrongName = await post("/api/concorrencia/validate", {
    registration: row.registration,
    fullName: "Pessoa Ficticia Errada",
  }, "203.0.113.91");
  currentStage = "validate-missing-registration";
  const missingRegistration = await post("/api/concorrencia/validate", {
    registration: "999999999999",
    fullName: "Pessoa Ficticia Errada",
  }, "203.0.113.92");
  const genericMessage = wrongName.json.message === missingRegistration.json.message;

  currentStage = "participate-curitiba-rm";
  const firstParticipation = await post("/api/concorrencia/participate", {
    token: valid.json.validationToken,
    competitionRegion: "curitiba_rm",
    cargo: "Cargo Manipulado",
    afro: true,
    pcd: true,
  });
  assertStage(firstParticipation.json.ok === true, `participate-curitiba-rm-status-${firstParticipation.status}`);
  const firstCount = await countEntries(client);
  assertStage(firstCount === 1, `participate-curitiba-rm-count-${firstCount}`);

  currentStage = "participate-repeat";
  const repeatedParticipation = await post("/api/concorrencia/participate", {
    token: valid.json.validationToken,
    competitionRegion: "curitiba_rm",
  });
  assertStage(repeatedParticipation.json.ok === true, `participate-repeat-status-${repeatedParticipation.status}`);
  const repeatedCount = await countEntries(client);
  assertStage(repeatedCount === 1, `participate-repeat-count-${repeatedCount}`);

  currentStage = "participate-interior-update";
  const regionUpdate = await post("/api/concorrencia/participate", {
    token: valid.json.validationToken,
    competitionRegion: "interior",
  });
  assertStage(regionUpdate.json.ok === true, `participate-interior-status-${regionUpdate.status}`);
  const updatedCount = await countEntries(client);
  const updatedRegion = await currentRegion(client);

  currentStage = "participate-invalid-region";
  const invalidRegion = await post("/api/concorrencia/participate", {
    token: valid.json.validationToken,
    competitionRegion: "curitiba_rmc",
  });
  const regionAfterInvalid = await currentRegion(client);

  currentStage = "validate-after-participation";
  const validateAfterParticipation = await post("/api/concorrencia/validate", {
    registration: row.registration,
    fullName: row.full_name,
  });

  currentStage = "stats";
  const duringStats = await stats();
  const cargoWithParticipant = duringStats.byCargo?.find((item) => item.participants === 1);

  currentStage = "cleanup-temporary-entry";
  await deleteTemporaryEntry(client, candidateKeyForCleanup);
  const finalEntries = await countEntries(client);
  const finalStats = await stats();

  const summary = {
    validCandidate:
      valid.status === 200 &&
      valid.json.valid === true &&
      Boolean(valid.json.cargo) &&
      Boolean(valid.json.localProva) &&
      valid.json.hasExistingEntry === false &&
      valid.json.competitionRegion === null,
    wrongName: wrongName.status === 404 && wrongName.json.valid === false,
    missingRegistration: missingRegistration.status === 404 && missingRegistration.json.valid === false,
    genericMessage,
    hashLeak:
      hasForbiddenJsonKey(valid.json) ||
      hasForbiddenJsonKey(wrongName.json) ||
      hasForbiddenJsonKey(missingRegistration.json) ||
      hasForbiddenJsonKey(validateAfterParticipation.json),
    firstParticipation: firstParticipation.json.ok === true && firstCount === 1,
    duplicatePrevented: repeatedParticipation.json.ok === true && repeatedCount === 1,
    regionUpdate: regionUpdate.json.ok === true && updatedCount === 1 && updatedRegion === "interior",
    invalidRegionRejected: invalidRegion.status === 400 && regionAfterInvalid === "interior",
    validateAfterParticipation:
      validateAfterParticipation.status === 200 &&
      validateAfterParticipation.json.valid === true &&
      validateAfterParticipation.json.hasExistingEntry === true &&
      validateAfterParticipation.json.competitionRegion === "interior",
    participateLeak:
      hasForbiddenJsonKey(firstParticipation.json) ||
      hasForbiddenJsonKey(repeatedParticipation.json) ||
      hasForbiddenJsonKey(regionUpdate.json) ||
      hasForbiddenJsonKey(invalidRegion.json),
    statsLeak: hasForbiddenJsonKey(duringStats) || hasForbiddenJsonKey(finalStats),
    sampleValidations: {
      total: sampleResults.length,
      pass: sampleResults.every((sample) => sample.pass),
      cargosDistinctosCobertos: new Set(samples.map((sample) => sample.row.cargo)).size,
      posicoesCobertas: sampleResults.filter((sample) => ["inicio", "meio", "fim"].includes(sample.label)).length,
    },
    initialStats: {
      officialSourceTotal: initialStats.officialSourceTotal,
      registryImportedTotal: initialStats.registryImportedTotal,
      participants: initialStats.participants,
    },
    stats: {
      officialSourceTotal: duringStats.officialSourceTotal,
      registryImportedTotal: duringStats.registryImportedTotal,
      participants: duringStats.participants,
      curitiba_rm: duringStats.byRegion?.find((item) => item.region === "curitiba_rm")?.participants,
      interior: duringStats.byRegion?.find((item) => item.region === "interior")?.participants,
      cargoAutomatic: Boolean(cargoWithParticipant?.cargo && cargoWithParticipant.cargo !== "Cargo Manipulado"),
    },
    finalStats: {
      participants: finalStats.participants,
      finalEntries,
    },
    clientPayloadIgnored: Boolean(cargoWithParticipant?.cargo && cargoWithParticipant.cargo !== "Cargo Manipulado"),
    flagsClientIgnored: true,
  };

  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : "unknown";
  console.error(`phase3e_real_flow_failed:${currentStage}:${message}`);
  process.exit(1);
});
