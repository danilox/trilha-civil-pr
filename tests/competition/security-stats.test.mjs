import test from "node:test";
import assert from "node:assert/strict";
import * as crypto from "node:crypto";
import { loadModule, totals } from "./helpers.mjs";

test("tokens são criptografados, rejeitam adulteração e expiram em 15 minutos", () => {
  const tokenModule = loadModule("src/lib/competition/crypto.ts", { "server-only": {}, "node:crypto": crypto }, { RADAR_HMAC_SECRET: "isolated-test-secret-not-a-production-key" });
  const token = tokenModule.createValidationToken("fake-candidate-key", 1000);
  assert.deepEqual(tokenModule.readValidationToken(token, 1899), { candidateKey: "fake-candidate-key" });
  assert.ok(!token.includes("fake-candidate-key"));
  assert.equal(tokenModule.readValidationToken(token, 1900), null);
  assert.equal(tokenModule.readValidationToken(token, 1901), null);
  assert.equal(tokenModule.readValidationToken(token + "extra", 1001), null);
  assert.equal(tokenModule.readValidationToken(token + ".extra", 1001), null);
  assert.equal(tokenModule.readValidationToken("invalid", 1001), null);
});

test("stats API aplica filtro, mantém contrato e configura cache público de 30s", async () => {
  const calls = [];
  const route = loadModule("src/app/api/concorrencia/stats/route.ts", {
    "next/server": { NextResponse: { json: (payload, init = {}) => ({ payload, status: init.status ?? 200, headers: init.headers }) } },
    "next/cache": { unstable_cache: (fn, keys, options) => { assert.equal(options.revalidate, 30); assert.ok(keys.length); return fn; } },
    "@/data/competition-totals": totals,
    "@/lib/competition/service": { getCompetitionStatsResponse: async cargo => { calls.push(cargo); return { available: true, participants: 1, officialSourceTotal: totals.getOfficialSourceTotal(cargo) }; } },
  });
  assert.equal((await route.GET(new Request("https://example.test/api/concorrencia/stats?cargo=agente"))).payload.officialSourceTotal, 40284);
  assert.equal((await route.GET(new Request("https://example.test/api/concorrencia/stats"))).payload.officialSourceTotal, 62657);
  assert.equal((await route.GET(new Request("https://example.test/api/concorrencia/stats?cargo=unknown"))).payload.officialSourceTotal, 62657);
  assert.deepEqual(calls, ["Agente de Polícia Judiciária", undefined, undefined]);
});

test("stats indisponível não expõe erro interno e não é cacheado", async () => {
  const route = loadModule("src/app/api/concorrencia/stats/route.ts", {
    "next/server": { NextResponse: { json: (payload, init) => ({ payload, ...init }) } },
    "next/cache": { unstable_cache: fn => fn }, "@/data/competition-totals": totals,
    "@/lib/competition/service": { getCompetitionStatsResponse: async () => { throw new Error("private backend details"); } },
  });
  const result = await route.GET(new Request("https://example.test/api/concorrencia/stats?cargo=agente"));
  assert.equal(result.status, 503);
  assert.equal(result.headers["Cache-Control"], "no-store");
  assert.equal(result.payload.officialSourceTotal, 40284);
  assert.ok(!JSON.stringify(result).includes("private backend details"));
});
