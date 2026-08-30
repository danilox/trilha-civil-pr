-- LEGACY/DO NOT USE.
-- This migration belongs to the obsolete Phase 2 Radar model
-- (competition_candidates/competition_responses/curitiba_rmc).
-- New local installs must use:
-- 202608300001_candidate_registry.sql
-- 202608300002_competition_entries.sql
do $$
begin
  raise exception 'Legacy Radar migration blocked. Use candidate_registry and competition_entries migrations instead.';
end $$;

create extension if not exists pgcrypto;

create table if not exists public.competition_candidates (
  candidate_key text primary key,
  cargo text not null,
  local_prova text not null,
  afro boolean not null default false,
  pcd boolean not null default false,
  source_version text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.competition_responses (
  id uuid primary key default gen_random_uuid(),
  candidate_key text unique not null references public.competition_candidates(candidate_key) on update cascade on delete restrict,
  regiao text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint competition_responses_regiao_check
    check (regiao is null or regiao in ('interior', 'curitiba_rmc'))
);

create index if not exists competition_candidates_active_idx
  on public.competition_candidates(active);

create index if not exists competition_candidates_source_version_idx
  on public.competition_candidates(source_version);

create index if not exists competition_responses_regiao_idx
  on public.competition_responses(regiao);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists competition_candidates_set_updated_at on public.competition_candidates;
create trigger competition_candidates_set_updated_at
before update on public.competition_candidates
for each row execute function public.set_updated_at();

drop trigger if exists competition_responses_set_updated_at on public.competition_responses;
create trigger competition_responses_set_updated_at
before update on public.competition_responses
for each row execute function public.set_updated_at();

alter table public.competition_candidates enable row level security;
alter table public.competition_responses enable row level security;

revoke all on table public.competition_candidates from anon, authenticated;
revoke all on table public.competition_responses from anon, authenticated;
revoke all on function public.set_updated_at() from anon, authenticated;
