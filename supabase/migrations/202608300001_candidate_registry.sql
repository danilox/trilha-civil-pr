create table if not exists public.candidate_registry (
  candidate_key text primary key,
  name_key text not null,
  cargo text not null,
  local_prova text not null,
  afro boolean not null default false,
  pcd boolean not null default false,
  source_version text not null,
  imported_at timestamptz not null default now(),
  constraint candidate_registry_cargo_check
    check (cargo in ('Agente de Polícia Judiciária', 'Delegado de Polícia', 'Papiloscopista Policial')),
  constraint candidate_registry_local_prova_check
    check (local_prova in ('Curitiba/PR', 'Londrina/PR', 'Cascavel/PR'))
);

create index if not exists candidate_registry_name_key_idx
  on public.candidate_registry(name_key);

create index if not exists candidate_registry_cargo_idx
  on public.candidate_registry(cargo);

create index if not exists candidate_registry_local_prova_idx
  on public.candidate_registry(local_prova);

create index if not exists candidate_registry_source_version_idx
  on public.candidate_registry(source_version);

alter table public.candidate_registry enable row level security;

revoke all on table public.candidate_registry from anon, authenticated;
revoke all on table public.candidate_registry from public;

comment on table public.candidate_registry is
  'Pseudonymized PC-PR candidate registry. It must not store registration or full_name.';

comment on column public.candidate_registry.candidate_key is
  'HMAC-SHA256 over pcpr-2026:{registration}, generated outside the database.';

comment on column public.candidate_registry.name_key is
  'HMAC-SHA256 over pcpr-2026:name:{normalized_name}, generated outside the database.';
