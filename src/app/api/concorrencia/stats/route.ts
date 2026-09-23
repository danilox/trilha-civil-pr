import { unstable_cache } from "next/cache";
import { NextResponse } from "next/server";
import { getOfficialSourceTotal } from "@/data/competition-totals";
import { getCompetitionStatsResponse } from "@/lib/competition/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Cache only public aggregates. Validation and participation remain uncached.
const getCachedStats = unstable_cache(async (cargo?: string) => {
  const payload = await getCompetitionStatsResponse(cargo);
  if (!payload.available) throw new Error("StatsUnavailable");
  return payload;
}, ["competition-stats-v2"], { revalidate: 30 });

export async function GET(request: Request) {
  const cargo = new URL(request.url).searchParams.get("cargo") === "agente" ? "Agente de Polícia Judiciária" : undefined;
  try {
    const payload = await getCachedStats(cargo);
    return NextResponse.json(payload, { headers: { "Cache-Control": "no-store" } });
  } catch {
    // Do not log backend messages, identifiers or request bodies.
    console.error("[competition:stats] unavailable");
    return NextResponse.json({
      available: false, mock: false, officialSourceTotal: getOfficialSourceTotal(cargo),
      registryImportedTotal: 0, participants: 0, coveragePercent: 0, byRegion: [], byCargo: [],
      message: "Resultados temporariamente indisponíveis.",
    }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
