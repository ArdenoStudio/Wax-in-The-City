-- Wax In The City SL — Supabase schema
-- Run in the Supabase SQL editor. Creates the four MVP tables (creative bible
-- file 11) plus row-level security so the public site can submit booking/contact
-- requests with the anon key while keeping reads private.

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
  featured boolean default false,
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table if not exists booking_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  branch text not null check (branch in ('battaramulla','nugegoda')),
  service_preference text,
  preferred_date date,
  message text,
  status text default 'pending' check (status in ('pending','confirmed','cancelled')),
  created_at timestamptz default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  quote text not null,
  branch text,
  rating integer default 5,
  featured boolean default false,
  created_at timestamptz default now()
);

create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  alt_text text,
  category text check (category in ('salon','before-after','results','events')),
  featured boolean default false,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- ----------------------------------------------------------------------------
-- Row-level security
-- ----------------------------------------------------------------------------

alter table booking_requests enable row level security;
alter table services        enable row level security;
alter table testimonials    enable row level security;
alter table gallery         enable row level security;

-- The website submits booking + contact enquiries with the anon key.
create policy "anon can submit booking requests"
  on booking_requests for insert
  to anon
  with check (true);

-- Public, read-only content tables (safe to read with the anon key).
create policy "public can read services"
  on services for select to anon using (true);

create policy "public can read testimonials"
  on testimonials for select to anon using (true);

create policy "public can read gallery"
  on gallery for select to anon using (true);

-- Note: booking_requests has NO anon select policy on purpose — only the
-- service-role key (Supabase dashboard / admin) can read submissions.
