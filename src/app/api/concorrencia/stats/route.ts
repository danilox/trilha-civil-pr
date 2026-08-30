import { NextResponse } from "next/server";
import { getCompetitionStatsResponse } from "@/lib/competition/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const payload = await getCompetitionStatsResponse();
    return NextResponse.json(payload, { status: payload.available ? 200 : 503 });
  } catch (error) {
    const code =
      typeof error === "object" && error !== null && "code" in error && error.code
        ? String(error.code)
        : error instanceof Error
          ? error.name
          : "UnknownError";
    const keys = typeof error === "object" && error !== null ? Object.keys(error).join(",") : "";
    const message =
      typeof error === "object" && error !== null && "message" in error && error.message
        ? String(error.message)
        : "";
    console.error("[competition:stats]", code, keys, message);
    return NextResponse.json(
      {
        available: false,
        mock: false,
        officialSourceTotal: 62657,
        registryImportedTotal: 0,
        participants: 0,
        coveragePercent: 0,
        byRegion: [],
        byCargo: [],
        message: "Resultados temporariamente indisponíveis.",
      },
      { status: 503 },
    );
  }
}
