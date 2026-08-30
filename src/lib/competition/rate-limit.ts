import "server-only";

import { createHmac } from "node:crypto";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const windowMs = 60_000;
const maxAttempts = 12;
const cleanupSkewMs = 120_000;

function getRadarSecret() {
  const secret = process.env.RADAR_HMAC_SECRET?.trim();
  if (!secret) throw new Error("RADAR_HMAC_SECRET is not configured.");
  return secret;
}

function toWindowStart(now: number) {
  return Math.floor(now / windowMs) * windowMs;
}

function createBucketKey(endpoint: string, requestKey: string, windowStart: number) {
  return createHmac("sha256", getRadarSecret())
    .update(`${endpoint}:${requestKey}:${windowStart}`, "utf8")
    .digest("hex");
}

export async function checkCompetitionRateLimit(endpoint: string, requestKey: string, now = Date.now()) {
  const client = getSupabaseServerClient();
  if (!client) {
    return { allowed: false, remaining: 0 };
  }

  const windowStart = toWindowStart(now);
  const { data, error } = await client.rpc("check_competition_rate_limit", {
    p_endpoint: endpoint,
    p_bucket_key: createBucketKey(endpoint, requestKey || "unknown", windowStart),
    p_window_start: new Date(windowStart).toISOString(),
    p_expires_at: new Date(windowStart + windowMs + cleanupSkewMs).toISOString(),
    p_max_attempts: maxAttempts,
  });

  if (error || !Array.isArray(data) || data.length === 0) {
    return { allowed: false, remaining: 0 };
  }

  const attempts = Number(data[0]?.attempts ?? maxAttempts);
  const allowed = Boolean(data[0]?.allowed);
  return { allowed, remaining: Math.max(0, maxAttempts - attempts) };
}
