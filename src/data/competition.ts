import type {
  CompetitionAggregatedResults,
  CompetitionRegionId,
  CompetitionRegionApiValue,
  CompetitionStatistics,
  ModalityStatistics,
  RegionStatistics,
} from "@/types/competition";

export const competitionRegionOptions: {
  id: CompetitionRegionId;
  apiValue: CompetitionRegionApiValue;
  code: string;
  title: string;
  subtitle: string;
  description: string;
}[] = [
  {
    id: "regiao-interior",
    apiValue: "interior",
    code: "Região 1",
    title: "Interior do Paraná",
    subtitle: "Interior",
    description:
      "80% das futuras vagas destinadas à região, conforme regra utilizada pela plataforma.",
  },
  {
    id: "regiao-curitiba-rm",
    apiValue: "curitiba_rm",
    code: "Região 2",
    title: "Curitiba + Região Metropolitana",
    subtitle: "Curitiba/RMC",
    description:
      "20% das futuras vagas destinadas à região, conforme regra utilizada pela plataforma.",
  },
];

export const competitionModalityOptions: {
  id: "total" | "afro" | "pcd";
  shortLabel: string;
  label: string;
}[] = [
  { id: "total", shortLabel: "Total", label: "Total validado" },
  { id: "afro", shortLabel: "Afro", label: "Afrodescendente" },
  { id: "pcd", shortLabel: "PcD", label: "Pessoa com Deficiência" },
];

export const competitionRegionIdByApiValue: Record<CompetitionRegionApiValue, CompetitionRegionId> = {
  interior: "regiao-interior",
  curitiba_rm: "regiao-curitiba-rm",
};

export const competitionRegionApiValueById = competitionRegionOptions.reduce(
  (accumulator, region) => ({ ...accumulator, [region.id]: region.apiValue }),
  {} as Record<CompetitionRegionId, CompetitionRegionApiValue>,
);

const mockRegions: RegionStatistics[] = [
  {
    regionId: "regiao-interior",
    label: "Região 1 - Interior",
    shortLabel: "Região 1",
    count: 781,
    percentage: 60.8,
    tipo: "mock",
    fonte: "Mock isolado para desenvolvimento",
    atualizadoEm: "2026-08-28",
  },
  {
    regionId: "regiao-curitiba-rm",
    label: "Região 2 - Curitiba/RMC",
    shortLabel: "Região 2",
    count: 503,
    percentage: 39.2,
    tipo: "mock",
    fonte: "Mock isolado para desenvolvimento",
    atualizadoEm: "2026-08-28",
  },
];

const mockModalities: ModalityStatistics[] = [
  {
    status: "total",
    label: "Total",
    regions: { "regiao-interior": 781, "regiao-curitiba-rm": 503 },
    tipo: "mock",
    fonte: "Mock isolado para desenvolvimento",
    atualizadoEm: "2026-08-28",
  },
  {
    status: "afro",
    label: "Afro",
    regions: { "regiao-interior": 87, "regiao-curitiba-rm": 55 },
    tipo: "mock",
    fonte: "Mock isolado para desenvolvimento",
    atualizadoEm: "2026-08-28",
  },
  {
    status: "pcd",
    label: "PcD",
    regions: { "regiao-interior": 44, "regiao-curitiba-rm": 27 },
    tipo: "mock",
    fonte: "Mock isolado para desenvolvimento",
    atualizadoEm: "2026-08-28",
  },
];

export const emptyCompetitionStatistics: CompetitionStatistics = {
  totalParticipants: 0,
  regions: competitionRegionOptions.map((region) => ({
    regionId: region.id,
    label: `${region.code} - ${region.subtitle}`,
    shortLabel: region.code,
    count: 0,
    percentage: 0,
    tipo: "estimativa",
  })),
  modalities: competitionModalityOptions.map((modality) => ({
    status: modality.id,
    label: modality.shortLabel,
    regions: { "regiao-interior": 0, "regiao-curitiba-rm": 0 },
    tipo: "estimativa",
  })),
  tipo: "estimativa",
};

export const mockCompetitionStatistics: CompetitionStatistics = {
  totalParticipants: 1284,
  regions: mockRegions,
  modalities: mockModalities,
  tipo: "mock",
  fonte: "Mock isolado para desenvolvimento",
  atualizadoEm: "2026-08-28",
};

export const mockCompetitionAggregatedResults: CompetitionAggregatedResults = {
  available: true,
  mock: true,
  totalParticipantes: mockCompetitionStatistics.totalParticipants,
  porCargo: {
    "Agente de Polícia Judiciária": mockCompetitionStatistics.totalParticipants,
  },
  porLocalProva: {
    Curitiba: 514,
    Londrina: 412,
    Cascavel: 358,
  },
  agentePorRegiao: {
    interior: 781,
    curitibaRm: 503,
    interiorPercentual: 60.8,
    curitibaRmPercentual: 39.2,
  },
  afro: {
    total: 142,
    porRegiao: {
      interior: 87,
      curitibaRm: 55,
    },
  },
  pcd: {
    total: 71,
    porRegiao: {
      interior: 44,
      curitibaRm: 27,
    },
  },
  coberturaAmostra: {
    totalCandidatosAtivos: 0,
    percentual: null,
    sourceVersion: "MOCK-DESENVOLVIMENTO",
  },
  updatedAt: "2026-08-28",
};
