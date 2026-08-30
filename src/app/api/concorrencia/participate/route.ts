import { NextResponse } from "next/server";
import { participateInCompetition } from "@/lib/competition/service";

export const runtime = "nodejs";

async function readBody(request: Request) {
  try {
    return (await request.json()) as { token?: unknown; competitionRegion?: unknown };
  } catch {
    return {};
  }
}

export async function POST(request: Request) {
  const body = await readBody(request);

  try {
    const result = await participateInCompetition(body.token, body.competitionRegion);
    return NextResponse.json(result.response, { status: result.status });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        status: "error",
        message: "Não foi possível registrar a participação agora. Tente novamente mais tarde.",
      },
      { status: 500 },
    );
  }
}

