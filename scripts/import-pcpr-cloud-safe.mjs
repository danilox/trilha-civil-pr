import { readFile } from "node:fs/promises";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";

const defaultFile = "private-data/candidatos-pcpr-cloud-safe.csv";
const requiredHeaders = ["candidate_key", "name_key", "cargo", "local_prova", "afro", "pcd", "source_version"];
const validCargos = new Set([
  "Agente de Polícia Judiciária",
  "Delegado de Polícia",
  "Papiloscopista Policial",
]);
const validLocais = new Set(["Curitiba/PR", "Londrina/PR", "Cascavel/PR"]);
const defaultBatchSize = 500;
const maxRetries = 3;

function parseArgs(argv) {
  const options = {
    apply: false,
    confirmFullImport: false,
    file: defaultFile,
    limit: null,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--apply") options.apply = true;
    else if (arg === "--confirm-full-import") options.confirmFullImport = true;
    else if (arg === "--file") options.file = argv[index += 1];
    else if (arg === "--limit") options.limit = Number(argv[index += 1]);
    else if (arg === "--help") {
      console.log("Uso: node scripts/import-pcpr-cloud-safe.mjs [--file csv] [--limit n] [--apply]");
      process.exit(0);
    } else {
      throw new Error(`Argumento desconhecido: ${arg}`);
    }
  }

  if (options.limit !== null && (!Number.isInteger(options.limit) || options.limit < 1)) {
    throw new Error("--limit deve ser um inteiro positivo.");
  }

  return options;
}

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

function parseCsv(content) {
  const lines = content.replace(/^\uFEFF/, "").trimEnd().split(/\r?\n/).filter(Boolean);
  const headers = parseCsvLine(lines[0] ?? "");
  const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header));
  const forbiddenHeaders = headers.filter((header) => ["registration", "full_name"].includes(header));

  if (missingHeaders.length > 0) throw new Error(`Cabeçalhos ausentes: ${missingHeaders.join(", ")}`);
  if (forbiddenHeaders.length > 0) throw new Error(`Cabeçalhos proibidos: ${forbiddenHeaders.join(", ")}`);

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
  });
}

function validateRows(rows) {
  return rows.reduce((summary, row) => {
    if (!/^[a-f0-9]{64}$/.test(row.candidate_key)) summary.invalidCandidateKey += 1;
    if (!/^[a-f0-9]{64}$/.test(row.name_key)) summary.invalidNameKey += 1;
    if (!validCargos.has(row.cargo)) summary.invalidCargo += 1;
    if (!validLocais.has(row.local_prova)) summary.invalidLocalProva += 1;
    if (row.afro !== "true" && row.afro !== "false") summary.invalidAfro += 1;
    if (row.pcd !== "true" && row.pcd !== "false") summary.invalidPcd += 1;
    return summary;
  }, {
    invalidCandidateKey: 0,
    invalidNameKey: 0,
    invalidCargo: 0,
    invalidLocalProva: 0,
    invalidAfro: 0,
    invalidPcd: 0,
  });
}

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL?.trim();
  const secretKey = process.env.SUPABASE_SECRET_KEY?.trim();
  if (!url || !secretKey) throw new Error("SUPABASE_URL e SUPABASE_SECRET_KEY são obrigatórios para --apply.");

  return createClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function toCandidateRegistryPayload(rows) {
  return rows.map((row) => ({
    candidate_key: row.candidate_key,
    name_key: row.name_key,
    cargo: row.cargo,
    local_prova: row.local_prova,
    afro: row.afro === "true",
    pcd: row.pcd === "true",
    source_version: row.source_version,
  }));
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function upsertBatchWithRetry(client, batch, batchNumber) {
  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    const { error } = await client
      .from("candidate_registry")
      .upsert(batch, { onConflict: "candidate_key" });

    if (!error) return;
    if (attempt === maxRetries) {
      throw new Error(`Falha ao importar lote ${batchNumber}.`);
    }
    await wait(500 * attempt);
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const rows = parseCsv(await readFile(options.file, "utf8"));
  const selectedRows = options.limit ? rows.slice(0, options.limit) : rows;
  const validation = validateRows(selectedRows);
  const invalidCount = Object.values(validation).reduce((total, count) => total + count, 0);

  if (invalidCount > 0) {
    throw new Error(`DRY RUN falhou: ${JSON.stringify(validation)}`);
  }

  if (!options.apply) {
    console.log(`DRY RUN ONLY. Registros cloud-safe validados: ${selectedRows.length}. Escrita remota executada: NÃO.`);
    return;
  }

  if (!options.limit && !options.confirmFullImport) {
    throw new Error("--apply sem --limit exige --confirm-full-import.");
  }

  const client = getSupabaseClient();
  const payload = toCandidateRegistryPayload(selectedRows);
  let imported = 0;

  for (let index = 0; index < payload.length; index += defaultBatchSize) {
    const batchNumber = Math.floor(index / defaultBatchSize) + 1;
    const batch = payload.slice(index, index + defaultBatchSize);
    await upsertBatchWithRetry(client, batch, batchNumber);
    imported += batch.length;
  }

  console.log(`APPLY CONCLUÍDO. Registros cloud-safe processados: ${imported}. Escrita em competition_entries: NÃO.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Falha no importador cloud-safe.");
  process.exit(1);
});
