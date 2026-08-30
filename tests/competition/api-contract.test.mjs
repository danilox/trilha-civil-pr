import { readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const read = (path) => readFileSync(path, "utf8");

test("validate implementa contrato final sem expor chaves ou flags individuais", () => {
  const service = read("src/lib/competition/service.ts");
  const route = read("src/app/api/concorrencia/validate/route.ts");

  assert.match(service, /findCandidateByKey/);
  assert.match(service, /getExistingCompetitionEntry/);
  assert.match(service, /hasExistingEntry/);
  assert.match(service, /competitionRegion/);
  assert.match(route, /checkCompetitionRateLimit/);
  assert.doesNotMatch(service, /candidate_key:/);
  assert.doesNotMatch(service, /name_key:/);
  assert.doesNotMatch(service, /afro:/);
  assert.doesNotMatch(service, /pcd:/);
  assert.match(service, /Não foi possível validar os dados informados/);
});

test("participate valida regiao e grava por upsert em competition_entries", () => {
  const service = read("src/lib/competition/service.ts");
  const repository = read("src/lib/competition/repository.ts");

  assert.match(service, /curitiba_rm/);
  assert.match(service, /interior/);
  assert.match(service, /readValidationToken/);
  assert.match(service, /findCandidateByKey/);
  assert.match(repository, /\.from\("competition_entries"\)/);
  assert.match(repository, /\.upsert\(/);
  assert.match(repository, /onConflict: "candidate_key"/);
  assert.doesNotMatch(repository, /full_name/);
  assert.doesNotMatch(repository, /registration/);
});

test("stats retorna somente dados agregados e separa total oficial de importado", () => {
  const service = read("src/lib/competition/service.ts");
  const repository = read("src/lib/competition/repository.ts");

  assert.match(service, /officialSourceTotal: 62657/);
  assert.match(service, /registryImportedTotal: 0/);
  assert.match(repository, /officialSourceTotal/);
  assert.match(repository, /registryImportedTotal/);
  assert.match(repository, /byRegion/);
  assert.match(repository, /byCargo/);
  assert.doesNotMatch(repository, /select\("\*"\)/);
});

test("fluxo ativo nao usa endpoints nem regiao antigos", () => {
  const client = read("src/lib/competition-data.ts");
  const data = read("src/data/competition.ts");
  const page = read("src/components/competition/competition-page.tsx");

  assert.doesNotMatch(client, /\/api\/competition/);
  assert.match(client, /\/api\/concorrencia\/validate/);
  assert.match(client, /\/api\/concorrencia\/participate/);
  assert.match(client, /\/api\/concorrencia\/stats/);
  assert.doesNotMatch(data, /curitiba_rmc|regiao-curitiba-rmc|curitibaRmc/);
  assert.doesNotMatch(page, /ModalitySelector|candidate\.afro|candidate\.pcd/);
});

test("rate limiter usa estado compartilhado sem armazenar IP bruto", () => {
  const rateLimit = read("src/lib/competition/rate-limit.ts");
  const route = read("src/app/api/concorrencia/validate/route.ts");
  const migration = read("supabase/migrations/202608300003_competition_rate_limits.sql");

  assert.match(rateLimit, /createHmac/);
  assert.match(rateLimit, /check_competition_rate_limit/);
  assert.match(rateLimit, /getSupabaseServerClient/);
  assert.match(rateLimit, /return \{ allowed: false, remaining: 0 \}/);
  assert.match(route, /await checkCompetitionRateLimit\("concorrencia_validate"/);
  assert.match(migration, /create table if not exists public\.competition_rate_limits/);
  assert.match(migration, /primary key \(endpoint, bucket_key, window_start\)/);
  assert.match(migration, /delete from public\.competition_rate_limits/);
  assert.match(migration, /expires_at < now\(\)/);
  assert.match(migration, /security definer/);
  assert.doesNotMatch(migration, /ip_address|remote_addr|full_name|registration text|registration,/);
});
