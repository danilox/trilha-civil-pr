import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import ts from "typescript";

export function loadModule(path, dependencies = {}, env = {}) {
  const code = ts.transpileModule(readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const exports = {};
  new Function("require", "exports", "process", code)((name) => {
    assert.ok(name in dependencies, `Unexpected dependency: ${name}`);
    return dependencies[name];
  }, exports, { env });
  return exports;
}

export const totals = loadModule("src/data/competition-totals.ts");

// In-memory PostgREST adapter: never connects to Supabase.
export function countQuery(rows, options = {}) {
  let selected = rows;
  const query = {
    returns() { return query; },
    eq(key, value) {
      selected = selected.filter(row => key === "candidate_registry.cargo" ? row.candidate_registry?.cargo === value : row[key] === value);
      return query;
    },
    order() { selected = [...selected].sort((a, b) => (b.updated_at ?? "").localeCompare(a.updated_at ?? "")); return query; },
    limit(n) { selected = selected.slice(0, n); return query; },
    then(resolve, reject) { return Promise.resolve({ count: selected.length, data: options.head ? null : selected, error: null }).then(resolve, reject); },
  };
  return query;
}
