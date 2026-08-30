import {
  emptyCompetitionStatistics,
  mockCompetitionAggregatedResults,
  mockCompetitionStatistics,
} from "@/data/competition";
import type {
  CompetitionAggregatedResults,
  CompetitionRegionApiValue,
  CandidateValidationResult,
  CompetitionStatsApiResponse,
  CompetitionSubmitApiResponse,
  CompetitionStatistics,
  OfficialCandidate,
} from "@/types/competition";

const validationError =
  "Não foi possível validar os dados informados. Confira o nome completo e o número de inscrição conforme a lista oficial.";

export const isCompetitionMockEnabled = process.env.NODE_ENV !== "production";
export const backendUnavailableMessage =
  "Serviço de concorrência temporariamente indisponível. Tente novamente mais tarde.";

function waitForVisibleDevState() {
  return isCompetitionMockEnabled
    ? new Promise((resolve) => window.setTimeout(resolve, 450))
    : Promise.resolve();
}

function maskRegistration(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 4) return "••••";
  return `••••••${digits.slice(-4)}`;
}

function maskName(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => {
      const [first = ""] = part.toUpperCase();
      if (!first) return "";
      return `${first}${"•".repeat(Math.min(5, Math.max(2, part.length - 1)))}`;
    })
    .join(" ");
}

export async function validateOfficialCandidate(
  registrationNumber: string,
  fullName: string,
): Promise<CandidateValidationResult> {
  try {
    const response = await fetch("/api/concorrencia/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ registration: registrationNumber, fullName }),
    });
    const payload = await response.json() as {
      valid?: boolean;
      validationToken?: string;
      cargo?: string;
      localProva?: string;
      hasExistingEntry?: boolean;
      competitionRegion?: CompetitionRegionApiValue | null;
      nomeMascarado?: string;
      inscricaoMascarada?: string;
      message?: string;
      mock?: boolean;
    };
    await waitForVisibleDevState();

    if (!payload.valid || !payload.validationToken || !payload.cargo || !payload.localProva) {
      return {
        status: "error",
        message: response.status === 503 ? backendUnavailableMessage : payload.message || validationError,
      };
    }

    return {
      status: "success",
      candidate: {
        validationToken: payload.validationToken,
        cargo: payload.cargo,
        localProva: payload.localProva,
        hasExistingEntry: Boolean(payload.hasExistingEntry),
        competitionRegion: payload.competitionRegion ?? null,
        nomeMascarado: payload.nomeMascarado,
        inscricaoMascarada: payload.inscricaoMascarada,
        fonte: payload.mock ? "Mock isolado para desenvolvimento" : "Base validada no servidor",
      },
      fonte: payload.mock ? "Mock isolado para desenvolvimento" : "Base validada no servidor",
    };
  } catch {
    if (!isCompetitionMockEnabled) {
      return { status: "error", message: backendUnavailableMessage };
    }
  }

  if (!isCompetitionMockEnabled) {
    return { status: "error", message: validationError };
  }

  await new Promise((resolve) => window.setTimeout(resolve, 1200));

  const digits = registrationNumber.replace(/\D/g, "");
  const nameParts = fullName.trim().split(/\s+/).filter(Boolean);

  if (digits.length < 4 || nameParts.length < 2 || digits.endsWith("0000")) {
    return { status: "error", message: validationError };
  }

  const candidate: OfficialCandidate = {
    validationToken: `mock.${digits.slice(-4)}.${nameParts[0].toLocaleLowerCase("pt-BR")}`,
    inscricaoMascarada: maskRegistration(registrationNumber),
    nomeMascarado: maskName(fullName),
    cargo: "Agente de Polícia Judiciária",
    localProva: "Curitiba/PR",
    hasExistingEntry: false,
    competitionRegion: null,
    fonte: "Adapter mock para desenvolvimento",
    atualizadoEm: "2026-08-28",
  };

  return {
    status: "success",
    candidate,
    fonte: candidate.fonte,
    atualizadoEm: candidate.atualizadoEm,
  };
}

export function getCompetitionStatistics(): CompetitionStatistics {
  return isCompetitionMockEnabled ? mockCompetitionStatistics : emptyCompetitionStatistics;
}

export function mapCompetitionResultsToStatistics(results: CompetitionAggregatedResults): CompetitionStatistics {
  const interior = results.agentePorRegiao.interior;
  const curitibaRm = results.agentePorRegiao.curitibaRm;
  const total = results.totalParticipantes;

  return {
    totalParticipants: total,
    tipo: results.mock ? "mock" : results.available ? "estimativa" : "unavailable",
    fonte: results.mock ? "Mock isolado para desenvolvimento" : "Agregações server-side",
    atualizadoEm: results.updatedAt,
    regions: [
      {
        regionId: "regiao-interior",
        label: "Região 1 - Interior",
        shortLabel: "Região 1",
        count: interior,
        percentage: results.agentePorRegiao.interiorPercentual,
        tipo: results.mock ? "mock" : results.available ? "estimativa" : "unavailable",
      },
      {
        regionId: "regiao-curitiba-rm",
        label: "Região 2 - Curitiba/RMC",
        shortLabel: "Região 2",
        count: curitibaRm,
        percentage: results.agentePorRegiao.curitibaRmPercentual,
        tipo: results.mock ? "mock" : results.available ? "estimativa" : "unavailable",
      },
    ],
    modalities: [
      {
        status: "total",
        label: "Total",
        regions: {
          "regiao-interior": interior,
          "regiao-curitiba-rm": curitibaRm,
        },
        tipo: results.mock ? "mock" : results.available ? "estimativa" : "unavailable",
      },
      {
        status: "afro",
        label: "Afro",
        regions: {
          "regiao-interior": results.afro.porRegiao.interior,
          "regiao-curitiba-rm": results.afro.porRegiao.curitibaRm,
        },
        tipo: results.mock ? "mock" : results.available ? "estimativa" : "unavailable",
      },
      {
        status: "pcd",
        label: "PcD",
        regions: {
          "regiao-interior": results.pcd.porRegiao.interior,
          "regiao-curitiba-rm": results.pcd.porRegiao.curitibaRm,
        },
        tipo: results.mock ? "mock" : results.available ? "estimativa" : "unavailable",
      },
    ],
  };
}

export function mapCompetitionStatsToStatistics(results: CompetitionStatsApiResponse): CompetitionStatistics {
  const interior = results.byRegion.find((item) => item.region === "interior")?.participants ?? 0;
  const curitibaRm = results.byRegion.find((item) => item.region === "curitiba_rm")?.participants ?? 0;
  const total = results.participants;

  return {
    totalParticipants: total,
    tipo: results.mock ? "mock" : results.available ? "estimativa" : "unavailable",
    fonte: results.mock ? "Mock isolado para desenvolvimento" : "Agregações server-side",
    atualizadoEm: results.updatedAt,
    regions: [
      {
        regionId: "regiao-interior",
        label: "Região 1 - Interior",
        shortLabel: "Região 1",
        count: interior,
        percentage: total ? (interior / total) * 100 : 0,
        tipo: results.mock ? "mock" : results.available ? "estimativa" : "unavailable",
      },
      {
        regionId: "regiao-curitiba-rm",
        label: "Região 2 - Curitiba/RMC",
        shortLabel: "Região 2",
        count: curitibaRm,
        percentage: total ? (curitibaRm / total) * 100 : 0,
        tipo: results.mock ? "mock" : results.available ? "estimativa" : "unavailable",
      },
    ],
    modalities: [
      {
        status: "total",
        label: "Total",
        regions: {
          "regiao-interior": interior,
          "regiao-curitiba-rm": curitibaRm,
        },
        tipo: results.mock ? "mock" : results.available ? "estimativa" : "unavailable",
      },
    ],
  };
}

export async function fetchCompetitionStatistics() {
  try {
    const response = await fetch("/api/concorrencia/stats", { method: "GET" });
    const payload = await response.json() as CompetitionStatsApiResponse;
    if (!response.ok || !payload.available) {
      return {
        statistics: isCompetitionMockEnabled
          ? mapCompetitionResultsToStatistics(mockCompetitionAggregatedResults)
          : emptyCompetitionStatistics,
        unavailable: true,
      };
    }

    return {
      statistics: mapCompetitionStatsToStatistics(payload),
      unavailable: false,
    };
  } catch {
    return {
      statistics: isCompetitionMockEnabled ? mockCompetitionStatistics : emptyCompetitionStatistics,
      unavailable: !isCompetitionMockEnabled,
    };
  }
}

export async function submitCompetitionResponse(
  token: string,
  regiao: CompetitionRegionApiValue,
): Promise<CompetitionSubmitApiResponse> {
  try {
    const response = await fetch("/api/concorrencia/participate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, competitionRegion: regiao }),
    });
    const payload = await response.json() as CompetitionSubmitApiResponse;
    if (payload.ok) return payload;

    return {
      ok: false,
      status: payload.status,
      message: response.status === 503 ? backendUnavailableMessage : payload.message,
    };
  } catch {
    return {
      ok: false,
      status: "unavailable",
      message: backendUnavailableMessage,
    };
  }
}
