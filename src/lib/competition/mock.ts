import { mockCompetitionAggregatedResults } from "@/data/competition";
import type {
  CompetitionRegionApiValue,
  CompetitionSubmitApiResponse,
  CompetitionValidateApiResponse,
} from "@/types/competition";

const mockResponses = new Set<string>();

const validationError =
  "Não foi possível validar os dados informados. Confira o nome completo e o número de inscrição conforme a lista oficial.";

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

export function createMockValidationResponse(registration: string, fullName: string): CompetitionValidateApiResponse & {
  nomeMascarado?: string;
  inscricaoMascarada?: string;
} {
  const digits = registration.replace(/\D/g, "");
  const nameParts = fullName.trim().split(/\s+/).filter(Boolean);

  if (digits.length < 4 || nameParts.length < 2 || digits.endsWith("0000")) {
    return { valid: false, message: validationError, mock: true };
  }

  const mockToken = `mock.${digits.slice(-4)}.${nameParts[0].toLocaleLowerCase("pt-BR")}`;

  return {
    valid: true,
    validationToken: mockToken,
    cargo: "Agente de Polícia Judiciária",
    localProva: "Curitiba/PR",
    hasExistingEntry: mockResponses.has(mockToken),
    competitionRegion: mockResponses.has(mockToken) ? "interior" : null,
    nomeMascarado: maskName(fullName),
    inscricaoMascarada: maskRegistration(registration),
    mock: true,
  };
}

export function submitMockCompetitionResponse(
  validationToken: string,
  regiao: CompetitionRegionApiValue | null,
): CompetitionSubmitApiResponse {
  if (!validationToken.startsWith("mock.") || !regiao) {
    return {
      ok: false,
      status: "invalid-token",
      message: "Validação expirada ou inválida. Faça a validação novamente.",
    };
  }

  if (mockResponses.has(validationToken)) {
    return { ok: true, status: "updated" };
  }

  mockResponses.add(validationToken);
  return { ok: true, status: "created" };
}

export function getMockCompetitionAggregatedResults() {
  return mockCompetitionAggregatedResults;
}
