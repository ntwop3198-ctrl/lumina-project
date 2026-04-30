-- Lumina API usage & rate-limit tables (run in Supabase SQL Editor)
-- Requires: pgcrypto (gen_random_uuid) — enabled by default on Supabase

create table if not exists public.lumina_api_usage_events (
  id uuid primary key default gen_random_uuid(),
  user_key text not null,
  feature text not null,
  estimated_cost_usd numeric(14, 8) not null default 0,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_lumina_api_usage_user_feature_time
  on public.lumina_api_usage_events (user_key, feature, created_at desc);

create index if not exists idx_lumina_api_usage_created
  on public.lumina_api_usage_events (created_at desc);

create table if not exists public.lumina_api_feature_blocks (
  id uuid primary key default gen_random_uuid(),
  user_key text not null,
  feature text not null,
  blocked_until timestamptz not null,
  reason text,
  created_at timestamptz not null default now(),
  unique (user_key, feature)
);

create index if not exists idx_lumina_api_blocks_until
  on public.lumina_api_feature_blocks (blocked_until desc);

alter table public.lumina_api_usage_events enable row level security;
alter table public.lumina_api_feature_blocks enable row level security;

-- No public policies: access only via service role (server-side).

comment on table public.lumina_api_usage_events is 'Per-request API usage for cost & rate limiting (service role only)';
comment on table public.lumina_api_feature_blocks is 'Temporary blocks when rate limits are exceeded';
