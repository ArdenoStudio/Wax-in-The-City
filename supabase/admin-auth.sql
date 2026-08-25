-- Wax In The City SL — Admin identity allowlist + gallery storage
-- Run in the Supabase SQL editor AFTER supabase/schema.sql.
-- Idempotent: safe to run again.

-- ----------------------------------------------------------------------------
-- admin_users — server-side-only email allowlist
-- ----------------------------------------------------------------------------
-- IMPORTANT: this table is an ALLOWLIST consulted by the Next.js server using
-- the service-role key. There are deliberately NO anon/authenticated policies:
-- RLS blocks every client read and write; only service role (bypasses RLS)
-- may select. Never add a public policy here.

create table if not exists admin_users (
  email text primary key,
  role text default 'admin' check (role in ('admin','owner')),
  added_at timestamptz default now(),
  note text
);

alter table admin_users enable row level security;

comment on table admin_users is
  'Server-side admin allowlist. No RLS policies on purpose: only the service role reads it, enforcement happens in Next.js after every auth success.';

create index if not exists idx_admin_users_role on admin_users(role);

-- ----------------------------------------------------------------------------
-- Seed placeholders — replace with real approved emails, one row each
-- ----------------------------------------------------------------------------

-- insert into admin_users (email, role, note) values
--   ('suven@example.com', 'owner', 'Studio owner'),
--   ('manager@example.com', 'admin', 'Battaramulla manager')
-- on conflict (email) do nothing;

-- ----------------------------------------------------------------------------
-- Gallery storage bucket + policies
-- ----------------------------------------------------------------------------
-- Bucket creation via SQL is supported on current Supabase projects but has
-- varied across versions historically. If the INSERT below errors, create the
-- bucket manually: Storage > New bucket > name `gallery`, Public = ON.
-- See README "Admin Panel" for the manual dashboard steps.

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

drop policy if exists "public can view gallery objects" on storage.objects;
create policy "public can view gallery objects"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'gallery');

drop policy if exists "service role manages gallery objects" on storage.objects;
create policy "service role manages gallery objects"
  on storage.objects for all
  to service_role
  using (bucket_id = 'gallery')
  with check (bucket_id = 'gallery');

-- ----------------------------------------------------------------------------
-- Gallery active flag — used by the admin dashboard to soft hide rows
-- ----------------------------------------------------------------------------

alter table gallery add column if not exists active boolean default true;

create index if not exists idx_gallery_active_sort on gallery(active, sort_order);
