-- Wax In The City SL — Supabase schema
-- Run in the Supabase SQL editor. Creates the four MVP tables
-- plus row-level security and indexes for production.

-- ----------------------------------------------------------------------------
-- Tables
-- ----------------------------------------------------------------------------

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

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  quote text not null,
  branch text check (branch is null or branch in ('battaramulla','nugegoda')),
  rating integer default 5 check (rating >= 1 and rating <= 5),
  featured boolean default false,
  created_at timestamptz default now()
);

create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  alt_text text,
  category text check (category in ('salon','before-after','results','events')),
  featured boolean default false,
  -- active flag: fresh installs get it here; admin-auth.sql ALTERs it in
  -- for pre-existing installs that ran schema.sql before this column existed.
  active boolean not null default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- ----------------------------------------------------------------------------
-- Indexes
-- ----------------------------------------------------------------------------

create index if not exists idx_services_slug on services(slug);
create index if not exists idx_services_active_sort on services(active, sort_order);
create index if not exists idx_services_category on services(category);
create index if not exists idx_booking_requests_created_at on booking_requests(created_at desc);
create index if not exists idx_booking_requests_status on booking_requests(status);
create index if not exists idx_testimonials_featured on testimonials(featured);
create index if not exists idx_gallery_featured_sort on gallery(featured, sort_order);

-- ----------------------------------------------------------------------------
-- Triggers
-- ----------------------------------------------------------------------------

create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_services_updated_at on services;
create trigger set_services_updated_at
  before update on services
  for each row execute function update_updated_at_column();

-- ----------------------------------------------------------------------------
-- Row-level security (Idempotent)
-- ----------------------------------------------------------------------------

alter table booking_requests enable row level security;
alter table services        enable row level security;
alter table testimonials    enable row level security;
alter table gallery         enable row level security;

-- Public users (anon and authenticated) can submit booking & contact enquiries
drop policy if exists "anon can submit booking requests" on booking_requests;
drop policy if exists "anyone can submit booking requests" on booking_requests;
create policy "anyone can submit booking requests"
  on booking_requests for insert
  to anon, authenticated
  with check (true);

-- Public, read-only content tables
drop policy if exists "public can read services" on services;
create policy "public can read services"
  on services for select
  to anon, authenticated
  using (coalesce(active, true));

drop policy if exists "public can read testimonials" on testimonials;
create policy "public can read testimonials"
  on testimonials for select
  to anon, authenticated
  using (coalesce(featured, false) = true);

drop policy if exists "public can read gallery" on gallery;
create policy "public can read gallery"
  on gallery for select
  to anon, authenticated
  using (coalesce(featured, false) = true);

-- Note: booking_requests has NO anon select policy on purpose — only the
-- service-role key (Supabase dashboard / admin) can read submissions.
