-- Wax In The City SL — Neon Postgres schema
-- Run against your Neon database (SQL editor or psql) before relying on forms.
-- All website writes go through server actions using DATABASE_URL (server-only).

create extension if not exists "pgcrypto";

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

create index if not exists booking_requests_created_at_idx
  on booking_requests (created_at desc);
