import { NextResponse } from "next/server";
import { checkCompetitionRateLimit } from "@/lib/competition/rate-limit";
import {
  genericValidationMessage,
  validateCompetitionCandidate,
} from "@/lib/competition/service";

export const runtime = "nodejs";

async function readBody(request: Request) {
  try {
    return (await request.json()) as { registration?: unknown; fullName?: unknown };
  } catch {
    return {};
  }
}

function getRateLimitKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "local";
}

export async function POST(request: Request) {
  const rateLimit = await checkCompetitionRateLimit("concorrencia_validate", getRateLimitKey(request));
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { valid: false, message: genericValidationMessage },
      { status: 429 },
    );
  }

  const body = await readBody(request);

  try {
    const result = await validateCompetitionCandidate(body.fullName, body.registration);
    return NextResponse.json(result.response, { status: result.status });
  } catch {
    return NextResponse.json(
      { valid: false, message: "Validação temporariamente indisponível. Tente novamente mais tarde." },
      { status: 503 },
    );
  }
}
