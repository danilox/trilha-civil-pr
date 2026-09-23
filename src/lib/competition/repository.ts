import "server-only";
import { getOfficialSourceTotal, officialTotalsByCargo } from "@/data/competition-totals";

import { getSupabaseServerClient, isSupabaseServerConfigured } from "@/lib/supabase/server";
import type { CompetitionRegionApiValue, CompetitionStatsApiResponse } from "@/types/competition";


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

// Exact head counts aggregate in PostgreSQL; no candidate rows are downloaded.
// Counts are not truncated by the REST row limit.
export async function getCompetitionStats(cargoFilter?: string): Promise<CompetitionStatsApiResponse> {
  const client = getClientOrThrow();
  async function countEntries(cargo?: string, region?: CompetitionRegionApiValue) {
    let query = client.from("competition_entries")
      .select(cargo ? "candidate_registry!inner(cargo)" : "candidate_key", { count: "exact", head: true });
    if (cargo) query = query.eq("candidate_registry.cargo", cargo);
    if (region) query = query.eq("competition_region", region);
    const { count, error } = await query;
    if (error) throw error;
    return count ?? 0;
  }
  let latestQuery = client.from("competition_entries")
    .select(cargoFilter ? "updated_at,candidate_registry!inner(cargo)" : "updated_at")
    .order("updated_at", { ascending: false }).limit(1);
  if (cargoFilter) latestQuery = latestQuery.eq("candidate_registry.cargo", cargoFilter);
  const cargos = Object.keys(officialTotalsByCargo);
  const [registry, participants, interior, curitiba, cargoCounts, latest] = await Promise.all([
    client.from("candidate_registry").select("candidate_key", { count: "exact", head: true }),
    countEntries(cargoFilter), countEntries(cargoFilter, "interior"), countEntries(cargoFilter, "curitiba_rm"),
    Promise.all(cargos.map(cargo => cargoFilter && cargo !== cargoFilter ? Promise.resolve(0) : countEntries(cargo))),
    latestQuery.returns<{ updated_at: string | null }[]>(),
  ]);
  if (registry.error) throw registry.error;
  if (latest.error) throw latest.error;
  const officialSourceTotal = getOfficialSourceTotal(cargoFilter);
  return {
    available: true, mock: false, officialSourceTotal,
    registryImportedTotal: registry.count ?? 0, participants,
    coveragePercent: officialSourceTotal ? participants / officialSourceTotal * 100 : 0,
    byRegion: [
      { region: "curitiba_rm", participants: curitiba },
      { region: "interior", participants: interior },
    ],
    byCargo: cargos.map((cargo, index) => ({
      cargo, officialTotal: officialTotalsByCargo[cargo], participants: cargoCounts[index],
      coveragePercent: cargoCounts[index] / officialTotalsByCargo[cargo] * 100,
    })),
    updatedAt: latest.data?.[0]?.updated_at ?? undefined,
  };
}
