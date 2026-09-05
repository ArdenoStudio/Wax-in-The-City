-- ============================================================================
-- Wax In The City SL — Pricing & Analytics Expansion
-- Run in the Supabase SQL editor to create the wax_prices, wax_packages,
-- and analytics_events tables.
-- ============================================================================

-- 1. Wax Treatment Areas & Product Prices
create table if not exists wax_prices (
  id uuid primary key default gen_random_uuid(),
  area text unique not null,
  category text not null check (category in ('face', 'body', 'intimate')),
  lycon_pinkini integer,
  lycon_superberry integer,
  lycon_aloe_vera integer,
  rica_white_choc integer,
  biahu_gold integer,
  note text,
  sort_order integer default 0,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_wax_prices_category on wax_prices(category);
create index if not exists idx_wax_prices_active_sort on wax_prices(active, sort_order);

-- 2. Curated Bundle Packages
create table if not exists wax_packages (
  id text primary key,
  name text not null,
  description text not null,
  inclusions text[] not null default '{}',
  price_essential integer not null,
  price_premium integer not null,
  duration text not null,
  tag text,
  sort_order integer default 0,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_wax_packages_active_sort on wax_packages(active, sort_order);

-- 3. Anonymous Visitor & Conversion Analytics
create table if not exists analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (event_type in ('page_view', 'whatsapp_click', 'book_click', 'booking_submit', 'matrix_filter')),
  path text,
  device_type text check (device_type in ('ios', 'android', 'desktop')),
  branch text,
  metadata jsonb,
  created_at timestamptz default now()
);

create index if not exists idx_analytics_events_type_created on analytics_events(event_type, created_at desc);
create index if not exists idx_analytics_events_device on analytics_events(device_type);
create index if not exists idx_analytics_events_branch on analytics_events(branch);

-- 4. Triggers for updated_at
drop trigger if exists set_wax_prices_updated_at on wax_prices;
create trigger set_wax_prices_updated_at
  before update on wax_prices
  for each row execute function update_updated_at_column();

drop trigger if exists set_wax_packages_updated_at on wax_packages;
create trigger set_wax_packages_updated_at
  before update on wax_packages
  for each row execute function update_updated_at_column();

-- 5. Row-Level Security
alter table wax_prices       enable row level security;
alter table wax_packages     enable row level security;
alter table analytics_events enable row level security;

-- Public read for active pricing & packages
drop policy if exists "public can read active wax prices" on wax_prices;
create policy "public can read active wax prices"
  on wax_prices for select
  to anon, authenticated
  using (coalesce(active, true) = true);

drop policy if exists "public can read active wax packages" on wax_packages;
create policy "public can read active wax packages"
  on wax_packages for select
  to anon, authenticated
  using (coalesce(active, true) = true);

-- Public insert for analytics events (no select for public)
drop policy if exists "anyone can log analytics events" on analytics_events;
create policy "anyone can log analytics events"
  on analytics_events for insert
  to anon, authenticated
  with check (true);
