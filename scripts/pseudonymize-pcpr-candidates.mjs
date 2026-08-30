import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import process from "node:process";
import {
  createCandidateKeyWithSecret,
  createNameKeyWithSecret,
  normalizeFullName,
} from "../src/lib/competition/identity-core.mjs";

const headers = ["registration", "full_name", "cargo", "local_prova", "afro", "pcd"];
const outputHeaders = ["candidate_key", "name_key", "cargo", "local_prova", "afro", "pcd", "source_version"];
const cargos = [
  "Agente de Polícia Judiciária",
  "Delegado de Polícia",
  "Papiloscopista Policial",
];
const locais = ["Curitiba/PR", "Londrina/PR", "Cascavel/PR"];
const expectedTotal = 62657;
const expectedAfro = 10351;
const expectedPcd = 1723;
const expectedAfroAndPcd = 312;
const expectedAfroOnly = 10039;
const expectedPcdOnly = 1411;
const expectedNeitherAfroNorPcd = 50895;

const defaultOptions = {
  input: "private-data/candidatos-pcpr-enriquecido.csv",
  output: "private-data/candidatos-pcpr-cloud-safe.csv",
  sourceVersion: "FGV-PCPR-2026-HOMOLOGACAO-PRELIMINAR-2026-08-27",
};

function parseArgs(argv) {
  const options = { ...defaultOptions };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") options.input = argv[index += 1];
    else if (arg === "--output") options.output = argv[index += 1];
    else if (arg === "--source-version") options.sourceVersion = argv[index += 1];
    else if (arg === "--help") {
      console.log("Uso: node scripts/pseudonymize-pcpr-candidates.mjs [--input csv] [--output csv] [--source-version versao]");
      process.exit(0);
    } else {
      throw new Error(`Argumento desconhecido: ${arg}`);
    }
  }
  return options;
}

function resolveLocalPath(path) {
  return isAbsolute(path) ? path : resolve(process.cwd(), path);
}

function assertPrivateDataPath(path, label) {
  const absolute = resolveLocalPath(path);
  const privateRoot = resolve(process.cwd(), "private-data");
  if (absolute !== privateRoot && !absolute.startsWith(`${privateRoot}\\`) && !absolute.startsWith(`${privateRoot}/`)) {
    throw new Error(`${label} deve ficar dentro de private-data/.`);
  }
  return absolute;
}

function getRadarSecret() {
  const secret = process.env.RADAR_HMAC_SECRET?.trim();
  if (!secret) throw new Error("RADAR_HMAC_SECRET não configurado.");
  return secret;
}

function normalizeSpaces(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
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

function readCsv(path) {
  const content = readFileSync(path, "utf8").replace(/^\uFEFF/, "").trimEnd();
  const lines = content ? content.split(/\r?\n/) : [];
  const csvHeaders = parseCsvLine(lines[0] ?? "");
  if (csvHeaders.join(",") !== headers.join(",")) {
    throw new Error(`Cabeçalho inválido: ${csvHeaders.join(",")}`);
  }

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
  });
}

function csvEscape(value) {
  const text = String(value);
  if (!/[",\r\n]/.test(text)) return text;
  return `"${text.replace(/"/g, '""')}"`;
}

function toCsv(records) {
  const lines = [outputHeaders.join(",")];
  for (const record of records) {
    lines.push(outputHeaders.map((header) => csvEscape(record[header])).join(","));
  }
  return `${lines.join("\n")}\n`;
}

function toBooleanString(value) {
  const normalized = normalizeSpaces(value).toLocaleLowerCase("pt-BR");
  if (normalized !== "true" && normalized !== "false") {
    throw new Error(`Flag booleana inválida: ${value}`);
  }
  return normalized;
}

function pseudonymize(rows, secret, sourceVersion) {
  return rows.map((row) => ({
    candidate_key: createCandidateKeyWithSecret(secret, row.registration),
    name_key: createNameKeyWithSecret(secret, row.full_name),
    cargo: row.cargo,
    local_prova: row.local_prova,
    afro: toBooleanString(row.afro),
    pcd: toBooleanString(row.pcd),
    source_version: sourceVersion,
  }));
}

function countDuplicates(values) {
  const seen = new Map();
  for (const value of values) {
    seen.set(value, (seen.get(value) ?? 0) + 1);
  }
  return Array.from(seen.values()).filter((count) => count > 1).length;
}

function validateInput(rows) {
  return rows.reduce((acc, row) => {
    if (!row.registration) acc.registrationEmpty += 1;
    if (!row.full_name) acc.fullNameEmpty += 1;
    if (!cargos.includes(row.cargo)) acc.cargoInvalid += 1;
    if (!locais.includes(row.local_prova)) acc.localInvalid += 1;
    if (!/^\d{12}$/.test(row.registration)) acc.registrationNot12Digits += 1;
    if (row.afro === "true") acc.afro += 1;
    if (row.pcd === "true") acc.pcd += 1;
    if (row.afro === "true" && row.pcd === "true") acc.afroAndPcd += 1;
    if (row.afro === "true" && row.pcd === "false") acc.afroOnly += 1;
    if (row.afro === "false" && row.pcd === "true") acc.pcdOnly += 1;
    if (row.afro === "false" && row.pcd === "false") acc.neitherAfroNorPcd += 1;
    return acc;
  }, {
    registrationEmpty: 0,
    fullNameEmpty: 0,
    cargoInvalid: 0,
    localInvalid: 0,
    registrationNot12Digits: 0,
    afro: 0,
    pcd: 0,
    afroAndPcd: 0,
    afroOnly: 0,
    pcdOnly: 0,
    neitherAfroNorPcd: 0,
  });
}

function validateOutput(rows) {
  return rows.reduce((acc, row) => {
    if (!row.candidate_key) acc.candidateKeyEmpty += 1;
    if (!row.name_key) acc.nameKeyEmpty += 1;
    if (!cargos.includes(row.cargo)) acc.cargoInvalid += 1;
    if (!locais.includes(row.local_prova)) acc.localInvalid += 1;
    if (row.afro === "true") acc.afro += 1;
    if (row.pcd === "true") acc.pcd += 1;
    if (row.afro === "true" && row.pcd === "true") acc.afroAndPcd += 1;
    if (row.afro === "true" && row.pcd === "false") acc.afroOnly += 1;
    if (row.afro === "false" && row.pcd === "true") acc.pcdOnly += 1;
    if (row.afro === "false" && row.pcd === "false") acc.neitherAfroNorPcd += 1;
    return acc;
  }, {
    candidateKeyEmpty: 0,
    nameKeyEmpty: 0,
    cargoInvalid: 0,
    localInvalid: 0,
    afro: 0,
    pcd: 0,
    afroAndPcd: 0,
    afroOnly: 0,
    pcdOnly: 0,
    neitherAfroNorPcd: 0,
  });
}

function deterministicCheck(inputRow, secret) {
  const registration = normalizeSpaces(inputRow.registration).replace(/\D/g, "");
  const normalizedName = normalizeFullName(inputRow.full_name);
  const candidateKeyA = createCandidateKeyWithSecret(secret, registration);
  const candidateKeyB = createCandidateKeyWithSecret(secret, registration);
  const nameKeyA = createNameKeyWithSecret(secret, normalizedName);
  const nameKeyB = createNameKeyWithSecret(secret, normalizedName);

  return {
    candidateKey: candidateKeyA === candidateKeyB,
    nameKey: nameKeyA === nameKeyB,
  };
}

function assertExpected(summary) {
  const checks = [
    ["total de entrada", summary.inputTotal, expectedTotal],
    ["total de saída", summary.outputTotal, expectedTotal],
    ["candidate_key vazio", summary.outputValidation.candidateKeyEmpty, 0],
    ["name_key vazio", summary.outputValidation.nameKeyEmpty, 0],
    ["candidate_key duplicado", summary.candidateKeyDuplicates, 0],
    ["cargo inválido", summary.outputValidation.cargoInvalid, 0],
    ["local_prova inválido", summary.outputValidation.localInvalid, 0],
    ["total afro", summary.outputValidation.afro, expectedAfro],
    ["total pcd", summary.outputValidation.pcd, expectedPcd],
    ["afro + pcd", summary.outputValidation.afroAndPcd, expectedAfroAndPcd],
    ["afro somente", summary.outputValidation.afroOnly, expectedAfroOnly],
    ["pcd somente", summary.outputValidation.pcdOnly, expectedPcdOnly],
    ["nenhuma cota", summary.outputValidation.neitherAfroNorPcd, expectedNeitherAfroNorPcd],
    ["registration na saída", summary.outputContainsRegistration, false],
    ["full_name na saída", summary.outputContainsFullName, false],
    ["candidate_key determinístico", summary.deterministic.candidateKey, true],
    ["name_key determinístico", summary.deterministic.nameKey, true],
    ["CSV original preservado", summary.originalFieldsPreservedInMemory, true],
  ];

  const failures = checks.filter(([, actual, expected]) => actual !== expected);
  if (failures.length > 0) {
    throw new Error(`Validações falharam: ${failures.map(([name, actual, expected]) => `${name}: ${actual} != ${expected}`).join("; ")}`);
  }
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const inputPath = assertPrivateDataPath(options.input, "CSV de entrada");
  const outputPath = assertPrivateDataPath(options.output, "CSV cloud-safe");
  const secret = getRadarSecret();

  if (!existsSync(inputPath)) throw new Error(`CSV de entrada não encontrado: ${inputPath}`);

  const inputRows = readCsv(inputPath);
  const originalRowsAfterRead = readCsv(inputPath);
  const outputRows = pseudonymize(inputRows, secret, options.sourceVersion);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, toCsv(outputRows), "utf8");

  const outputContent = readFileSync(outputPath, "utf8");
  const outputHasPlainRegistrationPattern = /\b\d{12}\b/.test(outputContent);
  const outputHasPlainNameColumn = outputHeaders.includes("full_name");
  const summary = {
    inputCsv: inputPath,
    outputCsv: outputPath,
    sourceVersion: options.sourceVersion,
    inputTotal: inputRows.length,
    outputTotal: outputRows.length,
    inputValidation: validateInput(inputRows),
    outputValidation: validateOutput(outputRows),
    candidateKeyDuplicates: countDuplicates(outputRows.map((row) => row.candidate_key)),
    nameKeyEmpty: outputRows.filter((row) => !row.name_key).length,
    outputContainsRegistration: outputHasPlainRegistrationPattern || outputHeaders.includes("registration"),
    outputContainsFullName: outputHasPlainNameColumn,
    outputHeader: outputHeaders.join(","),
    deterministic: inputRows.length > 0
      ? deterministicCheck(inputRows[Math.floor(inputRows.length / 2)], secret)
      : { candidateKey: false, nameKey: false },
    originalFieldsPreservedInMemory: inputRows.every((row, index) => {
      const reread = originalRowsAfterRead[index];
      return ["registration", "full_name", "cargo", "local_prova"].every((field) => row[field] === reread[field]);
    }),
  };

  assertExpected(summary);
  console.log(JSON.stringify(summary, null, 2));
}

Promise.resolve().then(main).catch((error) => {
  const message = error instanceof Error ? error.message : "Falha na pseudonimização.";
  console.error(message);
  process.exit(1);
});
