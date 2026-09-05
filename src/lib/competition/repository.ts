import "server-only";

import { getSupabaseServerClient, isSupabaseServerConfigured } from "@/lib/supabase/server";
import type { CompetitionRegionApiValue, CompetitionStatsApiResponse } from "@/types/competition";

const officialSourceTotal = 62657;
const officialTotalsByCargo: Record<string, number> = {
  "Agente de Polícia Judiciária": 40284,
  "Delegado de Polícia": 15549,
  "Papiloscopista Policial": 6824,
};

type CandidateRegistryRow = {
  candidate_key: string;
  name_key: string;
  cargo: string;
  local_prova: string;
  afro: boolean;
  pcd: boolean;
  source_version: string;
  imported_at: string | null;
};

type CompetitionEntryRow = {
  candidate_key: string;
  competition_region: CompetitionRegionApiValue;
  updated_at: string | null;
};

type JoinedEntryRow = CompetitionEntryRow & {
  candidate_registry: {
    cargo: string;
  } | null;
};

export type CandidateRegistryRecord = {
  candidateKey: string;
  nameKey: string;
  cargo: string;
  localProva: string;
  sourceVersion: string;
};

export function isCompetitionBackendConfigured() {
  return isSupabaseServerConfigured() && Boolean(process.env.RADAR_HMAC_SECRET?.trim());
}

function getClientOrThrow() {
  const client = getSupabaseServerClient();
  if (!client || !process.env.RADAR_HMAC_SECRET?.trim()) {
    throw new Error("Competition backend is not configured.");
  }
  return client;
}

function toCandidateRecord(row: CandidateRegistryRow): CandidateRegistryRecord {
  return {
    candidateKey: row.candidate_key,
    nameKey: row.name_key,
    cargo: row.cargo,
    localProva: row.local_prova,
    sourceVersion: row.source_version,
  };
}

export async function findCandidateByKey(candidateKey: string) {
  const client = getClientOrThrow();
  const { data, error } = await client
    .from("candidate_registry")
    .select("candidate_key,name_key,cargo,local_prova,afro,pcd,source_version,imported_at")
    .eq("candidate_key", candidateKey)
    .maybeSingle<CandidateRegistryRow>();

  if (error) throw error;
  return data ? toCandidateRecord(data) : null;
}

export async function getExistingCompetitionEntry(candidateKey: string) {
  const client = getClientOrThrow();
  const { data, error } = await client
    .from("competition_entries")
    .select("candidate_key,competition_region,updated_at")
    .eq("candidate_key", candidateKey)
    .maybeSingle<CompetitionEntryRow>();

  if (error) throw error;
  return data
    ? {
        candidateKey: data.candidate_key,
        competitionRegion: data.competition_region,
        updatedAt: data.updated_at ?? undefined,
      }
    : null;
}

export async function upsertCompetitionEntry(
  candidateKey: string,
  competitionRegion: CompetitionRegionApiValue,
) {
  const client = getClientOrThrow();
  const existing = await getExistingCompetitionEntry(candidateKey);
  const { error } = await client
    .from("competition_entries")
    .upsert(
      { candidate_key: candidateKey, competition_region: competitionRegion },
      { onConflict: "candidate_key" },
    );

  if (error) throw error;
  return { status: existing ? "updated" as const : "created" as const };
}

export async function getCompetitionStats(cargoFilter?: string): Promise<CompetitionStatsApiResponse> {
  const client = getClientOrThrow();
  const { count: registryImportedTotal, error: registryCountError } = await client
    .from("candidate_registry")
    .select("candidate_key", { count: "exact", head: true });

  if (registryCountError) throw registryCountError;

  const { data: entries, error: entriesError } = await client
    .from("competition_entries")
    .select("candidate_key,competition_region,updated_at,candidate_registry(cargo)")
    .returns<JoinedEntryRow[]>();

  if (entriesError) throw entriesError;

  const regionCounts: Record<CompetitionRegionApiValue, number> = {
    curitiba_rm: 0,
    interior: 0,
  };
  const cargoCounts = new Map<string, number>();
  let latestUpdate = "";

  const scopedEntries = (entries ?? []).filter((entry) => !cargoFilter || entry.candidate_registry?.cargo === cargoFilter);

  for (const entry of scopedEntries) {
    regionCounts[entry.competition_region] += 1;
    if (entry.updated_at && entry.updated_at > latestUpdate) latestUpdate = entry.updated_at;

    const cargo = entry.candidate_registry?.cargo;
    if (cargo) cargoCounts.set(cargo, (cargoCounts.get(cargo) ?? 0) + 1);
  }

  const participants = scopedEntries.length;

  return {
    available: true,
    mock: false,
    officialSourceTotal,
    registryImportedTotal: registryImportedTotal ?? 0,
    participants,
    coveragePercent: officialSourceTotal ? (participants / officialSourceTotal) * 100 : 0,
    byRegion: [
      { region: "curitiba_rm", participants: regionCounts.curitiba_rm },
      { region: "interior", participants: regionCounts.interior },
    ],
    byCargo: Object.entries(officialTotalsByCargo).map(([cargo, officialTotal]) => {
      const cargoParticipants = cargoCounts.get(cargo) ?? 0;
      return {
        cargo,
        officialTotal,
        participants: cargoParticipants,
        coveragePercent: officialTotal ? (cargoParticipants / officialTotal) * 100 : 0,
      };
    }),
    updatedAt: latestUpdate || undefined,
  };
}
