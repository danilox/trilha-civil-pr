import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type SupabaseServerConfig = {
  url: string;
  secretKey: string;
};

let cachedClient: SupabaseClient | null = null;

export function getSupabaseServerConfig(): SupabaseServerConfig | null {
  const url = process.env.SUPABASE_URL?.trim();
  const secretKey = process.env.SUPABASE_SECRET_KEY?.trim();

  if (!url || !secretKey) return null;
  return { url, secretKey };
}

export function isSupabaseServerConfigured() {
  return getSupabaseServerConfig() !== null;
}

export function getSupabaseServerClient() {
  const config = getSupabaseServerConfig();
  if (!config) return null;

  cachedClient ??= createClient(config.url, config.secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return cachedClient;
}
