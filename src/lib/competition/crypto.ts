import "server-only";

import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const tokenTtlSeconds = 15 * 60;
const tokenVersion = "v1";

type ValidationTokenPayload = {
  candidateKey: string;
  exp: number;
  iat: number;
  purpose: "competition-validation";
};

function getRadarSecret() {
  const secret = process.env.RADAR_HMAC_SECRET?.trim();
  if (!secret) throw new Error("RADAR_HMAC_SECRET is not configured.");
  return secret;
}

function getEncryptionKey() {
  return createHash("sha256").update(getRadarSecret(), "utf8").digest();
}

function base64UrlEncode(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function base64UrlDecode(input: string) {
  return Buffer.from(input, "base64url");
}

function signTokenPayload(value: string) {
  return createHmac("sha256", getRadarSecret()).update(value).digest("base64url");
}

export function createValidationToken(candidateKey: string, now = Math.floor(Date.now() / 1000)) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const payload: ValidationTokenPayload = {
    candidateKey,
    iat: now,
    exp: now + tokenTtlSeconds,
    purpose: "competition-validation",
  };

  const ciphertext = Buffer.concat([
    cipher.update(JSON.stringify(payload), "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  const encryptedPayload = base64UrlEncode(Buffer.concat([iv, tag, ciphertext]));
  const signedValue = `${tokenVersion}.${encryptedPayload}`;
  const signature = signTokenPayload(signedValue);

  return `${signedValue}.${signature}`;
}

export function readValidationToken(token: string, now = Math.floor(Date.now() / 1000)) {
  const [version, encryptedPayload, signature] = token.split(".");
  if (version !== tokenVersion || !encryptedPayload || !signature) return null;

  const signedValue = `${version}.${encryptedPayload}`;
  const expectedSignature = signTokenPayload(signedValue);
  const expected = Buffer.from(expectedSignature);
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;

  try {
    const buffer = base64UrlDecode(encryptedPayload);
    const iv = buffer.subarray(0, 12);
    const tag = buffer.subarray(12, 28);
    const ciphertext = buffer.subarray(28);
    const decipher = createDecipheriv("aes-256-gcm", getEncryptionKey(), iv);
    decipher.setAuthTag(tag);
    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
    const payload = JSON.parse(plaintext) as Partial<ValidationTokenPayload>;

    if (
      payload.purpose !== "competition-validation" ||
      typeof payload.candidateKey !== "string" ||
      typeof payload.exp !== "number" ||
      payload.exp < now
    ) {
      return null;
    }

    return { candidateKey: payload.candidateKey };
  } catch {
    return null;
  }
}
