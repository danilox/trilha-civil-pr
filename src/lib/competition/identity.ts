import "server-only";

import {
  createCandidateKeyWithSecret,
  createNameKeyWithSecret,
  normalizeFullName,
  normalizeRegistration,
} from "@/lib/competition/identity-core.mjs";

export { normalizeFullName, normalizeRegistration };

function getRadarSecret() {
  const secret = process.env.RADAR_HMAC_SECRET?.trim();
  if (!secret) throw new Error("RADAR_HMAC_SECRET is not configured.");
  return secret;
}

export function createCandidateKey(registration: string) {
  return createCandidateKeyWithSecret(getRadarSecret(), registration);
}

export function createNameKey(fullName: string) {
  return createNameKeyWithSecret(getRadarSecret(), fullName);
}
