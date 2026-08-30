import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import process from "node:process";

const cargos = [
  "Agente de Polícia Judiciária",
  "Delegado de Polícia",
  "Papiloscopista Policial",
];

const locais = [
  "Curitiba/PR",
  "Londrina/PR",
  "Cascavel/PR",
];

const defaultPdfPath = "private-data/pcpr-homologacao-preliminar.pdf";
const fallbackPdfPath = "private-data/private-datapcpr-homologacao-preliminar.pdf";
const defaultCsvPath = "private-data/candidatos-pcpr.csv";
const defaultRejectsPath = "private-data/candidatos-pcpr-rejeitados.txt";

const pythonExtractor = String.raw`
import sys
import pdfplumber

pdf_path = sys.argv[1]

with pdfplumber.open(pdf_path) as pdf:
    for index, page in enumerate(pdf.pages, start=1):
        text = page.extract_text(x_tolerance=1, y_tolerance=3) or ""
        print(f"__PAGE__ {index}")
        print(text)
`;

function parseArgs(argv) {
  const options = {
    pdf: defaultPdfPath,
    out: defaultCsvPath,
    rejects: defaultRejectsPath,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--pdf") options.pdf = argv[index += 1];
    else if (arg === "--out") options.out = argv[index += 1];
    else if (arg === "--rejects") options.rejects = argv[index += 1];
    else if (arg === "--help") {
      console.log("Uso: node scripts/extract-fgv-candidates.mjs [--pdf arquivo.pdf] [--out saida.csv] [--rejects rejeitados.txt]");
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

function findPythonCommand() {
  const candidates = [
    process.env.PDF_EXTRACT_PYTHON,
    process.env.PYTHON,
    process.env.USERPROFILE
      ? `${process.env.USERPROFILE}\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe`
      : "",
    "python",
    "python3",
  ].filter(Boolean);

  for (const command of candidates) {
    const check = spawnSync(command, ["-c", "import pdfplumber"], {
      encoding: "utf8",
      env: { ...process.env, PYTHONIOENCODING: "utf-8" },
      windowsHide: true,
    });
    if (check.status === 0) return command;
  }

  throw new Error("Python com pdfplumber não encontrado. Defina PDF_EXTRACT_PYTHON para o executável correto.");
}

function extractPdfText(pdfPath) {
  const python = findPythonCommand();
  const result = spawnSync(python, ["-c", pythonExtractor, pdfPath], {
    encoding: "utf8",
    env: { ...process.env, PYTHONIOENCODING: "utf-8" },
    maxBuffer: 128 * 1024 * 1024,
    windowsHide: true,
  });

  if (result.status !== 0) {
    throw new Error(result.stderr || "Falha ao extrair texto do PDF.");
  }

  return result.stdout;
}

function normalizeSpaces(value) {
  return value.replace(/\s+/g, " ").trim();
}

function findCargo(rest) {
  const matches = cargos
    .map((cargo) => ({ cargo, index: rest.indexOf(cargo) }))
    .filter((match) => match.index >= 0)
    .sort((a, b) => a.index - b.index);

  return matches[0] ?? null;
}

function parseRecordLine(line, page) {
  const normalized = normalizeSpaces(line);
  const registrationMatch = normalized.match(/^(\d{12})\s+(.+)$/);
  if (!registrationMatch) return null;

  const [, registration, rest] = registrationMatch;
  const cargoMatch = findCargo(rest);
  if (!cargoMatch) {
    return { rejected: true, reason: "cargo não identificado", page, line: normalized };
  }

  const fullName = normalizeSpaces(rest.slice(0, cargoMatch.index));
  const afterCargo = normalizeSpaces(rest.slice(cargoMatch.index + cargoMatch.cargo.length));
  const local = locais.find((localProva) => afterCargo === localProva);

  if (!fullName) {
    return { rejected: true, reason: "nome vazio", page, line: normalized };
  }

  if (!local) {
    return { rejected: true, reason: "local de prova inválido", page, line: normalized };
  }

  return {
    registration,
    full_name: fullName,
    cargo: cargoMatch.cargo,
    local_prova: local,
    afro: "false",
    pcd: "false",
  };
}

function parseCandidates(text) {
  const records = [];
  const rejects = [];
  let page = 0;

  for (const rawLine of text.split(/\r?\n/)) {
    if (rawLine.startsWith("__PAGE__ ")) {
      page = Number(rawLine.slice(9));
      continue;
    }

    const line = normalizeSpaces(rawLine);
    if (!line) continue;
    if (!/^\d{12}\b/.test(line)) continue;

    const parsed = parseRecordLine(line, page);
    if (!parsed) continue;
    if ("rejected" in parsed) rejects.push(parsed);
    else records.push(parsed);
  }

  return { records, rejects };
}

function csvEscape(value) {
  const text = String(value);
  if (!/[",\r\n]/.test(text)) return text;
  return `"${text.replace(/"/g, '""')}"`;
}

function toCsv(records) {
  const header = ["registration", "full_name", "cargo", "local_prova", "afro", "pcd"];
  const lines = [header.join(",")];
  for (const record of records) {
    lines.push(header.map((field) => csvEscape(record[field])).join(","));
  }
  return `${lines.join("\n")}\n`;
}

function summarize(records, rejects) {
  const byCargo = Object.fromEntries(cargos.map((cargo) => [cargo, 0]));
  const byLocal = Object.fromEntries(locais.map((local) => [local, 0]));
  const matrix = Object.fromEntries(cargos.map((cargo) => [
    cargo,
    Object.fromEntries(locais.map((local) => [local, 0])),
  ]));
  const registrations = new Map();
  const exactRows = new Map();
  const invalid = {
    registrationEmpty: 0,
    fullNameEmpty: 0,
    cargoInvalid: 0,
    localInvalid: 0,
    registrationNot12Digits: 0,
  };
  let namesWithAccents = 0;
  let namesWithApostrophes = 0;
  let namesWithHyphens = 0;
  let compoundNames = 0;

  for (const record of records) {
    if (!record.registration) invalid.registrationEmpty += 1;
    if (!record.full_name) invalid.fullNameEmpty += 1;
    if (!cargos.includes(record.cargo)) invalid.cargoInvalid += 1;
    if (!locais.includes(record.local_prova)) invalid.localInvalid += 1;
    if (!/^\d{12}$/.test(record.registration)) invalid.registrationNot12Digits += 1;

    byCargo[record.cargo] += 1;
    byLocal[record.local_prova] += 1;
    matrix[record.cargo][record.local_prova] += 1;

    registrations.set(record.registration, (registrations.get(record.registration) ?? 0) + 1);
    const exactKey = JSON.stringify(record);
    exactRows.set(exactKey, (exactRows.get(exactKey) ?? 0) + 1);

    if (/[^\u0000-\u007f]/.test(record.full_name)) namesWithAccents += 1;
    if (/[’']/.test(record.full_name)) namesWithApostrophes += 1;
    if (/-/.test(record.full_name)) namesWithHyphens += 1;
    if (/\b(?:de|da|do|das|dos|e)\b/i.test(record.full_name)) compoundNames += 1;
  }

  return {
    total: records.length,
    byCargo,
    byLocal,
    matrix,
    duplicateRegistrations: Array.from(registrations.values()).filter((count) => count > 1).length,
    exactDuplicateRows: Array.from(exactRows.values()).filter((count) => count > 1).length,
    rejectedLines: rejects.length,
    invalid,
    utf8Checks: {
      namesWithAccents,
      namesWithApostrophes,
      namesWithHyphens,
      compoundNames,
      containsReplacementChar: records.some((record) => Object.values(record).some((value) => String(value).includes("\uFFFD"))),
    },
    samples: {
      first5: records.slice(0, 5),
      middle5: records.slice(Math.max(0, Math.floor(records.length / 2) - 2), Math.max(0, Math.floor(records.length / 2) - 2) + 5),
      last5: records.slice(-5),
    },
  };
}

function writeRejects(rejects, rejectsPath) {
  const lines = ["Linhas rejeitadas na extração FGV PC-PR 2026", ""];
  for (const reject of rejects) {
    lines.push(`Página ${reject.page || "?"}: ${reject.reason}`);
    lines.push(reject.line);
    lines.push("");
  }
  writeFileSync(rejectsPath, `${lines.join("\n")}\n`, "utf8");
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.pdf === defaultPdfPath && !existsSync(resolveLocalPath(options.pdf)) && existsSync(resolveLocalPath(fallbackPdfPath))) {
    options.pdf = fallbackPdfPath;
  }

  const pdfPath = assertPrivateDataPath(options.pdf, "PDF de entrada");
  const csvPath = assertPrivateDataPath(options.out, "CSV de saída");
  const rejectsPath = assertPrivateDataPath(options.rejects, "Arquivo de rejeitados");

  if (!existsSync(pdfPath)) throw new Error(`PDF não encontrado: ${pdfPath}`);

  mkdirSync(dirname(csvPath), { recursive: true });
  const text = extractPdfText(pdfPath);
  const { records, rejects } = parseCandidates(text);
  const summary = summarize(records, rejects);

  writeFileSync(csvPath, toCsv(records), "utf8");
  writeRejects(rejects, rejectsPath);

  console.log(JSON.stringify({
    inputPdf: pdfPath,
    outputCsv: csvPath,
    rejectsFile: rejectsPath,
    ...summary,
  }, null, 2));
}

main();
