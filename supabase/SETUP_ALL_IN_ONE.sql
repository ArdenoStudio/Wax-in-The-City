-- ============================================================================
-- WAX IN THE CITY SL — COMPLETE ALL-IN-ONE DATABASE SETUP
-- ============================================================================
-- Instructions:
-- 1. Open your Supabase Dashboard -> SQL Editor -> "New Query"
-- 2. (Optional) Replace 'admin@waxinthecity.lk' below with your own email address.
-- 3. Click "RUN". Everything (tables, security, storage, full menu & prices)
--    will be created and seeded in 3 seconds!
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 0. Admin Allowlist
-- ----------------------------------------------------------------------------
create table if not exists admin_users (
  email text primary key,
  role text default 'admin' check (role in ('admin','owner')),
  added_at timestamptz default now(),
  note text
);

alter table admin_users enable row level security;
create index if not exists idx_admin_users_role on admin_users(role);

-- >>> REPLACE THIS WITH YOUR EMAIL (or add more emails) <<<
insert into admin_users (email, role, note) values
  ('admin@waxinthecity.lk', 'owner', 'Studio Owner')
on conflict (email) do update set role = 'owner';

-- ----------------------------------------------------------------------------
-- 1. Helper function for updated_at timestamps
-- ----------------------------------------------------------------------------
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------
-- 2. Core Tables
-- ----------------------------------------------------------------------------

-- Services
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (category in ('waxing','facial','moroccan','hydra-facial')),
  description text,
  duration_min text,
  price_from integer,
  slug text unique not null,
  active boolean default true,
  featured boolean default false,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_services_slug on services(slug);
create index if not exists idx_services_active_sort on services(active, sort_order);
create index if not exists idx_services_category on services(category);

drop trigger if exists set_services_updated_at on services;
create trigger set_services_updated_at
  before update on services
  for each row execute function update_updated_at_column();

-- Booking Requests
create table if not exists booking_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) >= 2 and char_length(name) <= 120),
  phone text not null check (char_length(phone) >= 9 and char_length(phone) <= 30),
  branch text not null check (branch in ('battaramulla','nugegoda')),
  service_preference text,
  preferred_date date,
  message text check (message is null or char_length(message) <= 1500),
  status text default 'pending' check (status in ('pending','confirmed','cancelled')),
  created_at timestamptz default now()
);

create index if not exists idx_booking_requests_created_at on booking_requests(created_at desc);
create index if not exists idx_booking_requests_status on booking_requests(status);

-- Testimonials
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  quote text not null,
  branch text check (branch is null or branch in ('battaramulla','nugegoda')),
  rating integer default 5 check (rating >= 1 and rating <= 5),
  featured boolean default false,
  created_at timestamptz default now()
);

create index if not exists idx_testimonials_featured on testimonials(featured);

-- Gallery
create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  alt_text text,
  category text check (category in ('salon','before-after','results','events')),
  featured boolean default false,
  active boolean not null default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);

create index if not exists idx_gallery_featured_sort on gallery(featured, sort_order);

-- Wax Prices Matrix
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

drop trigger if exists set_wax_prices_updated_at on wax_prices;
create trigger set_wax_prices_updated_at
  before update on wax_prices
  for each row execute function update_updated_at_column();

-- Wax Curated Packages
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

drop trigger if exists set_wax_packages_updated_at on wax_packages;
create trigger set_wax_packages_updated_at
  before update on wax_packages
  for each row execute function update_updated_at_column();

-- Visitor & Conversion Analytics
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

-- ----------------------------------------------------------------------------
-- 3. Row-Level Security Policies
-- ----------------------------------------------------------------------------
alter table booking_requests enable row level security;
alter table services        enable row level security;
alter table testimonials    enable row level security;
alter table gallery         enable row level security;
alter table wax_prices       enable row level security;
alter table wax_packages     enable row level security;
alter table analytics_events enable row level security;

-- Public bookings submission
drop policy if exists "anyone can submit booking requests" on booking_requests;
create policy "anyone can submit booking requests"
  on booking_requests for insert to anon, authenticated
  with check (true);

-- Public read policies
drop policy if exists "public can read services" on services;
create policy "public can read services"
  on services for select to anon, authenticated
  using (coalesce(active, true) = true);

drop policy if exists "public can read testimonials" on testimonials;
create policy "public can read testimonials"
  on testimonials for select to anon, authenticated
  using (coalesce(featured, false) = true);

drop policy if exists "public can read gallery" on gallery;
create policy "public can read gallery"
  on gallery for select to anon, authenticated
  using (coalesce(featured, false) = true);

drop policy if exists "public can read active wax prices" on wax_prices;
create policy "public can read active wax prices"
  on wax_prices for select to anon, authenticated
  using (coalesce(active, true) = true);

drop policy if exists "public can read active wax packages" on wax_packages;
create policy "public can read active wax packages"
  on wax_packages for select to anon, authenticated
  using (coalesce(active, true) = true);

-- Public analytics logging
drop policy if exists "anyone can log analytics events" on analytics_events;
create policy "anyone can log analytics events"
  on analytics_events for insert to anon, authenticated
  with check (true);

-- ----------------------------------------------------------------------------
-- 4. Storage Bucket Setup
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

drop policy if exists "public can view gallery objects" on storage.objects;
create policy "public can view gallery objects"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'gallery');

drop policy if exists "service role manages gallery objects" on storage.objects;
create policy "service role manages gallery objects"
  on storage.objects for all to service_role
  using (bucket_id = 'gallery')
  with check (bucket_id = 'gallery');

-- ----------------------------------------------------------------------------
-- 5. Seed Initial Data (Pre-Populates the entire website menu & pricing)
-- ----------------------------------------------------------------------------

-- Wax Prices (All 18 Areas)
insert into wax_prices (area, category, lycon_superberry, lycon_pinkini, lycon_aloe_vera, rica_white_choc, biahu_gold, note, sort_order, active)
values
  ('Upper Lip', 'face', 700, null, null, null, null, null, 10, true),
  ('Eyebrow Shaping', 'face', 1000, null, null, null, null, null, 20, true),
  ('Forehead', 'face', 1100, null, null, null, null, null, 30, true),
  ('Nose', 'face', 1500, null, null, null, null, null, 40, true),
  ('Eyebrow + Upper Lip', 'face', 1500, null, null, null, null, null, 50, true),
  ('Chin', 'face', 3500, null, null, null, null, null, 60, true),
  ('Full Face', 'face', 6500, null, null, null, null, null, 70, true),
  ('Underarms', 'intimate', 3500, 4000, 2500, null, null, null, 80, true),
  ('Half Arms', 'body', null, null, null, 2500, 1500, null, 90, true),
  ('Full Arms', 'body', null, null, null, 3500, 2500, null, 100, true),
  ('Half Leg', 'body', null, null, null, 4000, 3000, null, 110, true),
  ('Full Leg', 'body', null, null, null, 6500, 5000, null, 120, true),
  ('Full Leg + Full Arms', 'body', null, null, null, 9000, 6500, null, 130, true),
  ('Full Back', 'body', null, null, null, 3500, 2500, null, 140, true),
  ('Chest', 'body', null, null, null, 3000, 2000, null, 150, true),
  ('Stomach', 'body', null, null, null, 3500, 2500, null, 160, true),
  ('Full Brazilian', 'intimate', null, 10500, 6500, null, null, 'Strict no double dipping protocol with fresh spatulas.', 170, true),
  ('Brazilian + Underarm', 'intimate', null, 10500, 7500, null, null, null, 180, true)
on conflict (area) do nothing;

-- Wax Packages
insert into wax_packages (id, name, description, inclusions, price_essential, price_premium, duration, tag, sort_order, active)
values
  ('full-body', 'Full Body Wax', 'The complete full body smooth ritual covering all essential body zones.', array['Full Leg', 'Full Arms', 'Underarms', 'Full Brazilian'], 10000, 16500, '90 min', 'Most Popular', 10, true),
  ('neck-to-toe', 'Neck to Toe', 'Total body and facial smoothing for a seamless, radiant finish.', array['Full Body', 'Full Face', 'Full Back', 'Chest', 'Neck'], 15000, 26000, '120 min', 'Signature', 20, true),
  ('beach-body', 'Beach Body', 'Focused confidence package designed for swimwear and getaways.', array['Full Body', 'Back', 'Stomach'], 13000, 22500, '100 min', null, 30, true)
on conflict (id) do nothing;

-- Core Services
insert into services (name, category, description, duration_min, price_from, slug, active, featured, sort_order)
values
  ('Full Body Waxing', 'waxing', 'Complete full body smooth ritual with premium Lycon and Rica wax.', '90 min', 10000, 'waxing-full-body', true, true, 10),
  ('Full Brazilian Waxing', 'waxing', 'Zero double dipping, gentle Pinkini hot wax in a private suite.', '30 min', 6500, 'waxing-full-brazilian', true, true, 20),
  ('Classic Glow Facial', 'facial', 'Deep cleanse, extraction, and hydration for radiant skin.', '60 min', 5000, 'facial-classic-glow', true, true, 30),
  ('Signature Moroccan Bath', 'moroccan', 'Authentic black soap exfoliation, kessa scrub, and body mask.', '75 min', 15000, 'moroccan-signature-bath', true, true, 40),
  ('Hydra-Facial Infusion', 'hydra-facial', 'Non-invasive vortex suction, serum infusion, and glow lock.', '60 min', 18000, 'hydra-facial-infusion', true, true, 50)
on conflict (slug) do nothing;

-- Testimonials
insert into testimonials (client_name, quote, branch, rating, featured)
values
  ('Nisansala P.', 'The cleanest waxing experience in Colombo. Completely private rooms, gentle therapist, and no double dipping at all.', 'battaramulla', 5, true),
  ('Dilani K.', 'Lycon wax makes an incredible difference for sensitive skin. Staff is polite, professional and punctual.', 'nugegoda', 5, true),
  ('Sarah M.', 'Tried the Moroccan bath ritual and it was heavenly. Unhurried care and wonderful ambience.', 'battaramulla', 5, true);

-- Success notice
select 'Wax In The City database setup successfully completed!' as status;
