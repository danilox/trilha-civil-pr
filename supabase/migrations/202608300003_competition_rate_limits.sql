create table if not exists public.competition_rate_limits (
  endpoint text not null,
  bucket_key text not null,
  window_start timestamptz not null,
  attempts integer not null default 0,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (endpoint, bucket_key, window_start),
  constraint competition_rate_limits_attempts_check check (attempts >= 0)
);

create index if not exists competition_rate_limits_expires_at_idx
  on public.competition_rate_limits(expires_at);

create or replace function public.check_competition_rate_limit(
  p_endpoint text,
  p_bucket_key text,
  p_window_start timestamptz,
  p_expires_at timestamptz,
  p_max_attempts integer
)
returns table(allowed boolean, attempts integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  current_attempts integer;
begin
  if p_max_attempts < 1 then
    raise exception 'p_max_attempts must be greater than zero';
  end if;

  delete from public.competition_rate_limits
  where expires_at < now();

  insert into public.competition_rate_limits (
    endpoint,
    bucket_key,
    window_start,
    attempts,
    expires_at
  )
  values (
    p_endpoint,
    p_bucket_key,
    p_window_start,
    1,
    p_expires_at
  )
  on conflict (endpoint, bucket_key, window_start)
  do update
    set attempts = least(
          public.competition_rate_limits.attempts + 1,
          p_max_attempts + 1
        ),
        expires_at = excluded.expires_at,
        updated_at = now()
  returning public.competition_rate_limits.attempts into current_attempts;

  allowed := current_attempts <= p_max_attempts;
  attempts := current_attempts;
  return next;
end;
$$;

alter table public.competition_rate_limits enable row level security;

revoke all on table public.competition_rate_limits from anon, authenticated;
revoke all on table public.competition_rate_limits from public;
revoke all on function public.check_competition_rate_limit(text, text, timestamptz, timestamptz, integer) from anon, authenticated;
revoke all on function public.check_competition_rate_limit(text, text, timestamptz, timestamptz, integer) from public;

comment on table public.competition_rate_limits is
  'Shared Radar rate-limit buckets. Stores HMAC-derived request keys, never raw IP, names, registrations, or secrets.';
