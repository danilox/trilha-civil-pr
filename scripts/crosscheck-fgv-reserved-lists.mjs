import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import process from "node:process";

const headers = ["registration", "full_name", "cargo", "local_prova", "afro", "pcd"];
const cargos = [
  "Agente de Polícia Judiciária",
  "Delegado de Polícia",
  "Papiloscopista Policial",
];
const locais = ["Curitiba/PR", "Londrina/PR", "Cascavel/PR"];

const defaultOptions = {
  base: "private-data/candidatos-pcpr.csv",
  afroPdf: "private-data/pcpr-afro-preliminar.pdf",
  pcdPdf: "private-data/pcpr-pcd-deferidos.pdf",
  out: "private-data/candidatos-pcpr-enriquecido.csv",
  rejects: "private-data/candidatos-pcpr-crosscheck-rejeitados.txt",
};

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
  const options = { ...defaultOptions };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--base") options.base = argv[index += 1];
    else if (arg === "--afro-pdf") options.afroPdf = argv[index += 1];
    else if (arg === "--pcd-pdf") options.pcdPdf = argv[index += 1];
    else if (arg === "--out") options.out = argv[index += 1];
    else if (arg === "--rejects") options.rejects = argv[index += 1];
    else if (arg === "--help") {
      console.log("Uso: node scripts/crosscheck-fgv-reserved-lists.mjs [--base csv] [--afro-pdf pdf] [--pcd-pdf pdf] [--out csv] [--rejects txt]");
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

  if (result.status !== 0) throw new Error(result.stderr || `Falha ao extrair ${pdfPath}.`);
  return result.stdout;
}

function normalizeSpaces(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function normalizeForComparison(value) {
  return normalizeSpaces(value)
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("pt-BR");
}

function findCargo(rest) {
  const matches = cargos
    .map((cargo) => ({ cargo, index: rest.indexOf(cargo) }))
    .filter((match) => match.index >= 0)
    .sort((a, b) => a.index - b.index);
  return matches[0] ?? null;
}

function parseReservedLine(line, page, source) {
  const normalized = normalizeSpaces(line);
  const registrationMatch = normalized.match(/^(\d{12})\s+(.+)$/);
  if (!registrationMatch) return null;

  const [, registration, rest] = registrationMatch;
  const cargoMatch = findCargo(rest);
  if (!cargoMatch) {
    return { rejected: true, source, page, registration, reason: "cargo não identificado", line: normalized };
  }

  const fullName = normalizeSpaces(rest.slice(0, cargoMatch.index));
  const trailing = normalizeSpaces(rest.slice(cargoMatch.index + cargoMatch.cargo.length));
  if (!fullName) {
    return { rejected: true, source, page, registration, reason: "nome vazio", line: normalized };
  }
  if (trailing) {
    return { rejected: true, source, page, registration, reason: "conteúdo inesperado após cargo", line: normalized };
  }

  return { source, page, registration, full_name: fullName, cargo: cargoMatch.cargo };
}

function parseReservedPdf(pdfPath, source) {
  if (!existsSync(pdfPath)) return { available: false, records: [], rejects: [] };

  const text = extractPdfText(pdfPath);
  const records = [];
  const rejects = [];
  let page = 0;

  for (const rawLine of text.split(/\r?\n/)) {
    if (rawLine.startsWith("__PAGE__ ")) {
      page = Number(rawLine.slice(9));
      continue;
    }

    const line = normalizeSpaces(rawLine);
    if (!line || !/^\d{12}\b/.test(line)) continue;

    const parsed = parseReservedLine(line, page, source);
    if (!parsed) continue;
    if ("rejected" in parsed) rejects.push(parsed);
    else records.push(parsed);
  }

  return { available: true, records, rejects };
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

function readBaseCsv(basePath) {
  const content = spawnSync(process.execPath, ["-e", `
    const fs = require("node:fs");
    process.stdout.write(fs.readFileSync(process.argv[1], "utf8"));
  `, basePath], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
    windowsHide: true,
  });

  if (content.status !== 0) throw new Error(content.stderr || "Falha ao ler CSV base.");
  const lines = content.stdout.replace(/^\uFEFF/, "").trimEnd().split(/\r?\n/);
  const csvHeader = parseCsvLine(lines[0]);
  if (csvHeader.join(",") !== headers.join(",")) {
    throw new Error(`Cabeçalho inválido na base: ${csvHeader.join(",")}`);
  }

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
  });
}

function validateBase(records) {
  const registrations = new Map();
  const invalid = {
    registrationEmpty: 0,
    fullNameEmpty: 0,
    cargoInvalid: 0,
    localInvalid: 0,
    registrationNot12Digits: 0,
  };

  for (const record of records) {
    if (!record.registration) invalid.registrationEmpty += 1;
    if (!record.full_name) invalid.fullNameEmpty += 1;
    if (!cargos.includes(record.cargo)) invalid.cargoInvalid += 1;
    if (!locais.includes(record.local_prova)) invalid.localInvalid += 1;
    if (!/^\d{12}$/.test(record.registration)) invalid.registrationNot12Digits += 1;
    registrations.set(record.registration, (registrations.get(record.registration) ?? 0) + 1);
  }

  return {
    invalid,
    duplicateRegistrations: Array.from(registrations.values()).filter((count) => count > 1).length,
  };
}

function analyzeReservedList(records, baseByRegistration, flag) {
  const seen = new Map();
  const byCargo = Object.fromEntries(cargos.map((cargo) => [cargo, 0]));
  const samples = [];
  const notFound = [];
  const nameDivergences = [];
  const cargoDivergences = [];
  const duplicateRows = [];
  const compatible = [];

  for (const record of records) {
    seen.set(record.registration, (seen.get(record.registration) ?? 0) + 1);
  }

  const processedRegistrations = new Set();
  for (const record of records) {
    if ((seen.get(record.registration) ?? 0) > 1) duplicateRows.push(record);
    if (processedRegistrations.has(record.registration)) continue;
    processedRegistrations.add(record.registration);

    const base = baseByRegistration.get(record.registration);
    if (!base) {
      notFound.push(record);
      continue;
    }

    const nameMatches = normalizeForComparison(base.full_name) === normalizeForComparison(record.full_name);
    const cargoMatches = normalizeForComparison(base.cargo) === normalizeForComparison(record.cargo);
    if (!nameMatches) nameDivergences.push({ record, base });
    if (!cargoMatches) cargoDivergences.push({ record, base });
    if (!nameMatches || !cargoMatches) continue;

    base[flag] = "true";
    compatible.push(record);
    byCargo[base.cargo] += 1;
    if (samples.length < 5) samples.push(base);
  }

  return {
    totalExtracted: records.length,
    totalLocated: records.length - notFound.length,
    totalMarked: compatible.length,
    notFound,
    nameDivergences,
    cargoDivergences,
    duplicateRegistrations: Array.from(seen.values()).filter((count) => count > 1).length,
    duplicateRows,
    byCargo,
    samples,
  };
}

function csvEscape(value) {
  const text = String(value);
  if (!/[",\r\n]/.test(text)) return text;
  return `"${text.replace(/"/g, '""')}"`;
}

function toCsv(records) {
  const lines = [headers.join(",")];
  for (const record of records) {
    lines.push(headers.map((header) => csvEscape(record[header])).join(","));
  }
  return `${lines.join("\n")}\n`;
}

function compareFinalToBase(baseRecords, finalRecords) {
  const changedIdentity = [];
  for (let index = 0; index < baseRecords.length; index += 1) {
    const base = baseRecords[index];
    const enriched = finalRecords[index];
    for (const field of ["registration", "full_name", "cargo", "local_prova"]) {
      if (base[field] !== enriched[field]) {
        changedIdentity.push({ index, field, base: base[field], enriched: enriched[field] });
      }
    }
  }
  return changedIdentity;
}

function intersection(records) {
  return records.reduce((counts, record) => {
    if (record.afro === "true" && record.pcd === "true") counts.afroAndPcd += 1;
    else if (record.afro === "true") counts.afroOnly += 1;
    else if (record.pcd === "true") counts.pcdOnly += 1;
    else counts.neither += 1;
    return counts;
  }, { afroOnly: 0, pcdOnly: 0, afroAndPcd: 0, neither: 0 });
}

function writeRejects(path, reports) {
  const lines = ["Rejeições e inconsistências do cruzamento PC-PR 2026", ""];
  for (const report of reports) {
    lines.push(`## ${report.title}`);
    if (report.items.length === 0) {
      lines.push("Nenhum registro.");
      lines.push("");
      continue;
    }
    for (const item of report.items) {
      if (item.record && item.base) {
        lines.push(`${item.record.source} página ${item.record.page}: inscrição ${item.record.registration}`);
        lines.push(`Relação: ${item.record.full_name} | ${item.record.cargo}`);
        lines.push(`Base: ${item.base.full_name} | ${item.base.cargo}`);
      } else {
        lines.push(`${item.source} página ${item.page}: inscrição ${item.registration}`);
        lines.push(`${item.full_name ?? ""} | ${item.cargo ?? ""}`);
        if (item.reason) lines.push(`Motivo: ${item.reason}`);
        if (item.line) lines.push(item.line);
      }
      lines.push("");
    }
  }
  writeFileSync(path, `${lines.join("\n")}\n`, "utf8");
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const basePath = assertPrivateDataPath(options.base, "CSV base");
  const afroPdfPath = assertPrivateDataPath(options.afroPdf, "PDF Afro");
  const pcdPdfPath = assertPrivateDataPath(options.pcdPdf, "PDF PcD");
  const outputPath = assertPrivateDataPath(options.out, "CSV enriquecido");
  const rejectsPath = assertPrivateDataPath(options.rejects, "Arquivo de rejeitados");

  if (!existsSync(basePath)) throw new Error(`CSV base não encontrado: ${basePath}`);

  const baseRecords = readBaseCsv(basePath);
  const enrichedRecords = baseRecords.map((record) => ({ ...record, afro: "false", pcd: "false" }));
  const baseByRegistration = new Map(enrichedRecords.map((record) => [record.registration, record]));
  const baseValidation = validateBase(enrichedRecords);

  const afroExtraction = parseReservedPdf(afroPdfPath, "Afro");
  const pcdExtraction = parseReservedPdf(pcdPdfPath, "PcD");
  const afro = afroExtraction.available
    ? analyzeReservedList(afroExtraction.records, baseByRegistration, "afro")
    : null;
  const pcd = pcdExtraction.available
    ? analyzeReservedList(pcdExtraction.records, baseByRegistration, "pcd")
    : null;

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, toCsv(enrichedRecords), "utf8");

  const identityChanges = compareFinalToBase(baseRecords, enrichedRecords);
  const finalValidation = validateBase(enrichedRecords);
  const bothSamples = enrichedRecords
    .filter((record) => record.afro === "true" && record.pcd === "true")
    .slice(0, 5);
  const reports = [
    { title: "Afro - linhas rejeitadas na extração", items: afroExtraction.rejects },
    { title: "PcD - linhas rejeitadas na extração", items: pcdExtraction.rejects },
    { title: "Afro - não encontrados na base geral", items: afro?.notFound ?? [] },
    { title: "PcD - não encontrados na base geral", items: pcd?.notFound ?? [] },
    { title: "Afro - divergências de nome", items: afro?.nameDivergences ?? [] },
    { title: "PcD - divergências de nome", items: pcd?.nameDivergences ?? [] },
    { title: "Afro - divergências de cargo", items: afro?.cargoDivergences ?? [] },
    { title: "PcD - divergências de cargo", items: pcd?.cargoDivergences ?? [] },
  ];
  writeRejects(rejectsPath, reports);

  console.log(JSON.stringify({
    baseCsv: basePath,
    afroPdf: existsSync(afroPdfPath) ? afroPdfPath : null,
    pcdPdf: existsSync(pcdPdfPath) ? pcdPdfPath : null,
    outputCsv: outputPath,
    rejectsFile: rejectsPath,
    totalBase: baseRecords.length,
    totalFinal: enrichedRecords.length,
    baseValidation,
    finalValidation,
    identityChanges: identityChanges.length,
    afro: afro ? {
      totalExtracted: afro.totalExtracted,
      totalLocated: afro.totalLocated,
      totalMarked: afro.totalMarked,
      notFound: afro.notFound.length,
      nameDivergences: afro.nameDivergences.length,
      cargoDivergences: afro.cargoDivergences.length,
      duplicateRegistrations: afro.duplicateRegistrations,
      byCargo: afro.byCargo,
      samples: afro.samples,
    } : { unavailable: true },
    pcd: pcd ? {
      totalExtracted: pcd.totalExtracted,
      totalLocated: pcd.totalLocated,
      totalMarked: pcd.totalMarked,
      notFound: pcd.notFound.length,
      nameDivergences: pcd.nameDivergences.length,
      cargoDivergences: pcd.cargoDivergences.length,
      duplicateRegistrations: pcd.duplicateRegistrations,
      byCargo: pcd.byCargo,
      samples: pcd.samples,
    } : { unavailable: true },
    intersection: intersection(enrichedRecords),
    bothSamples,
    rejectedCount:
      afroExtraction.rejects.length +
      pcdExtraction.rejects.length +
      (afro?.notFound.length ?? 0) +
      (pcd?.notFound.length ?? 0) +
      (afro?.nameDivergences.length ?? 0) +
      (pcd?.nameDivergences.length ?? 0) +
      (afro?.cargoDivergences.length ?? 0) +
      (pcd?.cargoDivergences.length ?? 0),
  }, null, 2));
}

main();
