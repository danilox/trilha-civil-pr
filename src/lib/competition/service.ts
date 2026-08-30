import "server-only";

import { createValidationToken, readValidationToken } from "@/lib/competition/crypto";
import { createCandidateKey, createNameKey, normalizeFullName, normalizeRegistration } from "@/lib/competition/identity";
import {
  findCandidateByKey,
  getCompetitionStats,
  getExistingCompetitionEntry,
  isCompetitionBackendConfigured,
  upsertCompetitionEntry,
} from "@/lib/competition/repository";
import type {
  CompetitionRegionApiValue,
  CompetitionStatsApiResponse,
  CompetitionSubmitApiResponse,
  CompetitionValidateApiResponse,
} from "@/types/competition";

export const genericValidationMessage =
  "Não foi possível validar os dados informados. Confira o nome completo e o número de inscrição conforme a lista oficial.";

export const unavailableValidationMessage =
  "Validação temporariamente indisponível. Tente novamente mais tarde.";

export const unavailableParticipationMessage =
  "Participação temporariamente indisponível. Tente novamente mais tarde.";

export const validCompetitionRegions: CompetitionRegionApiValue[] = ["curitiba_rm", "interior"];

export function isValidCompetitionRegion(value: unknown): value is CompetitionRegionApiValue {
  return typeof value === "string" && validCompetitionRegions.includes(value as CompetitionRegionApiValue);
}

export function validateIdentityPayload(fullName: unknown, registration: unknown) {
  const normalizedRegistration = normalizeRegistration(typeof registration === "string" ? registration : "");
  const normalizedName = normalizeFullName(typeof fullName === "string" ? fullName : "");

  return {
    ok:
      normalizedRegistration.length >= 4 &&
      normalizedRegistration.length <= 32 &&
      normalizedName.length >= 5 &&
      normalizedName.length <= 160 &&
      normalizedName.includes(" "),
    normalizedRegistration,
    normalizedName,
  };
}

export async function validateCompetitionCandidate(
  fullName: unknown,
  registration: unknown,
): Promise<{ response: CompetitionValidateApiResponse; status: number }> {
  const payload = validateIdentityPayload(fullName, registration);
  if (!payload.ok || typeof fullName !== "string" || typeof registration !== "string") {
    return { response: { valid: false, message: genericValidationMessage }, status: 400 };
  }

  if (!isCompetitionBackendConfigured()) {
    return { response: { valid: false, message: unavailableValidationMessage }, status: 503 };
  }

  const candidateKey = createCandidateKey(registration);
  const nameKey = createNameKey(fullName);
  const candidate = await findCandidateByKey(candidateKey);
  if (!candidate || candidate.nameKey !== nameKey) {
    return { response: { valid: false, message: genericValidationMessage }, status: 404 };
  }

  const existingEntry = await getExistingCompetitionEntry(candidateKey);

  return {
    response: {
      valid: true,
      validationToken: createValidationToken(candidateKey),
      cargo: candidate.cargo,
      localProva: candidate.localProva,
      hasExistingEntry: Boolean(existingEntry),
      competitionRegion: existingEntry?.competitionRegion ?? null,
    },
    status: 200,
  };
}

export async function participateInCompetition(
  token: unknown,
  competitionRegion: unknown,
): Promise<{ response: CompetitionSubmitApiResponse; status: number }> {
  if (!isValidCompetitionRegion(competitionRegion)) {
    return {
      response: { ok: false, status: "invalid-region", message: "Selecione uma região válida." },
      status: 400,
    };
  }

  if (typeof token !== "string") {
    return {
      response: {
        ok: false,
        status: "invalid-token",
        message: "Validação expirada ou inválida. Faça a validação novamente.",
      },
      status: 401,
    };
  }

  if (!isCompetitionBackendConfigured()) {
    return {
      response: { ok: false, status: "unavailable", message: unavailableParticipationMessage },
      status: 503,
    };
  }

  const tokenPayload = readValidationToken(token);
  if (!tokenPayload) {
    return {
      response: {
        ok: false,
        status: "invalid-token",
        message: "Validação expirada ou inválida. Faça a validação novamente.",
      },
      status: 401,
    };
  }

  const candidate = await findCandidateByKey(tokenPayload.candidateKey);
  if (!candidate) {
    return {
      response: {
        ok: false,
        status: "invalid-token",
        message: "Validação expirada ou inválida. Faça a validação novamente.",
      },
      status: 401,
    };
  }

  const result = await upsertCompetitionEntry(tokenPayload.candidateKey, competitionRegion);
  return { response: { ok: true, status: result.status }, status: 200 };
}

export async function getCompetitionStatsResponse(): Promise<CompetitionStatsApiResponse> {
  if (!isCompetitionBackendConfigured()) {
    console.error("[competition:stats] backend-not-configured");
    return {
      available: false,
      mock: false,
      officialSourceTotal: 62657,
      registryImportedTotal: 0,
      participants: 0,
      coveragePercent: 0,
      byRegion: [],
      byCargo: [],
      message: "Resultados temporariamente indisponíveis.",
    };
  }

  return getCompetitionStats();
}
