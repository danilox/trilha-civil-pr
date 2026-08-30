export type CompetitionRegionId = "regiao-interior" | "regiao-curitiba-rm";
export type CompetitionRegionApiValue = "interior" | "curitiba_rm";
export type CompetitionDataKind = "oficial" | "estimativa" | "mock" | "unavailable";
export type CompetitionStatusKind = "total" | "afro" | "pcd";

export type OfficialCandidate = {
  validationToken: string;
  cargo: string;
  localProva: string;
  hasExistingEntry: boolean;
  competitionRegion: CompetitionRegionApiValue | null;
  inscricaoMascarada?: string;
  nomeMascarado?: string;
  fonte?: string;
  atualizadoEm?: string;
};

export type CandidateValidationResult =
  | {
      status: "success";
      candidate: OfficialCandidate;
      fonte?: string;
      atualizadoEm?: string;
    }
  | {
      status: "error";
      message: string;
    };

export type CompetitionSubmission = {
  validationToken: string;
  regionId: CompetitionRegionId;
  submittedAt: string;
};

export type RegionStatistics = {
  regionId: CompetitionRegionId;
  label: string;
  shortLabel: string;
  count: number;
  percentage: number;
  tipo: CompetitionDataKind;
  fonte?: string;
  atualizadoEm?: string;
  availableVacancies?: number;
};

export type ModalityStatistics = {
  status: CompetitionStatusKind;
  label: string;
  regions: Record<CompetitionRegionId, number>;
  tipo: CompetitionDataKind;
  fonte?: string;
  atualizadoEm?: string;
};

export type CompetitionStatistics = {
  totalParticipants: number;
  regions: RegionStatistics[];
  modalities: ModalityStatistics[];
  tipo: CompetitionDataKind;
  fonte?: string;
  atualizadoEm?: string;
};

export type CompetitionAggregatedResults = {
  available: boolean;
  mock: boolean;
  totalParticipantes: number;
  porCargo: Record<string, number>;
  porLocalProva: Record<string, number>;
  agentePorRegiao: {
    interior: number;
    curitibaRm: number;
    interiorPercentual: number;
    curitibaRmPercentual: number;
  };
  afro: {
    total: number;
    porRegiao: {
      interior: number;
      curitibaRm: number;
    };
  };
  pcd: {
    total: number;
    porRegiao: {
      interior: number;
      curitibaRm: number;
    };
  };
  coberturaAmostra: {
    totalCandidatosAtivos: number;
    percentual: number | null;
    sourceVersion?: string;
  };
  updatedAt?: string;
  message?: string;
};

export type CompetitionValidateApiResponse =
  | {
      valid: true;
      validationToken: string;
      cargo: string;
      localProva: string;
      hasExistingEntry: boolean;
      competitionRegion: CompetitionRegionApiValue | null;
      mock?: boolean;
    }
  | {
      valid: false;
      message: string;
      mock?: boolean;
    };

export type CompetitionSubmitApiResponse =
  | {
      ok: true;
      status: "created" | "updated";
    }
  | {
      ok: false;
      status: "error" | "invalid-region" | "invalid-token" | "unavailable";
      message: string;
    };

export type CompetitionStatsApiResponse = {
  available: boolean;
  mock: boolean;
  officialSourceTotal: number;
  registryImportedTotal: number;
  participants: number;
  coveragePercent: number;
  byRegion: {
    region: CompetitionRegionApiValue;
    participants: number;
  }[];
  byCargo: {
    cargo: string;
    officialTotal: number;
    participants: number;
    coveragePercent: number;
  }[];
  updatedAt?: string;
  message?: string;
};
