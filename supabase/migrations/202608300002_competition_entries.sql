create table if not exists public.competition_entries (
  candidate_key text primary key references public.candidate_registry(candidate_key) on update cascade on delete restrict,
  competition_region text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint competition_entries_region_check
    check (competition_region in ('curitiba_rm', 'interior'))
);

create index if not exists competition_entries_region_idx
  on public.competition_entries(competition_region);

create or replace function public.set_competition_entries_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists competition_entries_set_updated_at on public.competition_entries;
create trigger competition_entries_set_updated_at
before update on public.competition_entries
for each row execute function public.set_competition_entries_updated_at();

alter table public.competition_entries enable row level security;

revoke all on table public.competition_entries from anon, authenticated;
revoke all on table public.competition_entries from public;
revoke all on function public.set_competition_entries_updated_at() from anon, authenticated;
revoke all on function public.set_competition_entries_updated_at() from public;

comment on table public.competition_entries is
  'One Radar participation per candidate_key. Does not store registration, full_name, email, phone, CPF, or persistent IP.';

comment on column public.competition_entries.competition_region is
  'Candidate-declared Radar region. Allowed values: curitiba_rm, interior.';
