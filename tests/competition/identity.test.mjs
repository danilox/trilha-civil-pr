import { createHmac } from "node:crypto";
import test from "node:test";
import assert from "node:assert/strict";
import {
  createCandidateKeyWithSecret,
  createNameKeyWithSecret,
  normalizeFullName,
  normalizeRegistration,
} from "../../src/lib/competition/identity-core.mjs";

const testSecret = "fixed-test-secret-not-real";

test("normaliza inscricao removendo caracteres inesperados e espacos", () => {
  assert.equal(normalizeRegistration(" 26.000-000/1234 "), "260000001234");
});

test("normaliza nome com caixa, espacos duplicados e acentos preservados", () => {
  assert.equal(normalizeFullName("  JOSÉ   DA Silva  "), "josé da silva");
});

test("HMAC de candidate_key usa contexto correto e e deterministico", () => {
  const first = createCandidateKeyWithSecret(testSecret, "260000001234");
  const second = createCandidateKeyWithSecret(testSecret, " 260.000.001.234 ");
  const expected = createHmac("sha256", testSecret)
    .update("pcpr-2026:260000001234", "utf8")
    .digest("hex");

  assert.equal(first, second);
  assert.equal(first, expected);
});

test("HMAC de name_key usa contexto proprio e difere de candidate_key", () => {
  const candidateKey = createCandidateKeyWithSecret(testSecret, "260000001234");
  const nameKey = createNameKeyWithSecret(testSecret, "Pessoa Ficticia de Teste");
  const repeatedNameKey = createNameKeyWithSecret(testSecret, "  PESSOA   FICTICIA DE TESTE ");

  assert.equal(nameKey, repeatedNameKey);
  assert.notEqual(candidateKey, nameKey);
});

