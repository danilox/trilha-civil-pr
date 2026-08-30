import { createHmac } from "node:crypto";

export function normalizeRegistration(value) {
  // Normalizacao deterministica compartilhada com a pseudonimizacao local:
  // remove tudo que nao for digito e preserva a sequencia oficial resultante.
  return String(value ?? "").trim().replace(/\D/g, "");
}

export function normalizeFullName(value) {
  // Normalizacao deterministica compartilhada com a pseudonimizacao local:
  // Unicode NFC, trim, colapso de espacos e comparacao case-insensitive pt-BR.
  // Acentos sao preservados no material canonico usado no HMAC.
  return String(value ?? "")
    .normalize("NFC")
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("pt-BR");
}

export function createCandidateKeyWithSecret(secret, registration) {
  return createHmac("sha256", secret)
    .update(`pcpr-2026:${normalizeRegistration(registration)}`, "utf8")
    .digest("hex");
}

export function createNameKeyWithSecret(secret, fullName) {
  return createHmac("sha256", secret)
    .update(`pcpr-2026:name:${normalizeFullName(fullName)}`, "utf8")
    .digest("hex");
}

