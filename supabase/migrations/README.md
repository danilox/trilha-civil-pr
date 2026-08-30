# Radar migrations

Apply Radar migrations manually and selectively.

The legacy file `202608280001_competition_backend.sql` belongs to an obsolete
Phase 2 model and is intentionally blocked. Do not run `supabase db push`
blindly while that file is present in this directory.

For the current PC-PR Radar schema, apply only:

- `202608300001_candidate_registry.sql`
- `202608300002_competition_entries.sql`
- `202608300003_competition_rate_limits.sql`

