# Wax In The City SL Website

Ladies-only beauty salon website for Colombo, covering Battaramulla and Nugegoda. Built by Ardeno Studio around a sharper private-studio glamour direction: privacy, hygiene, confident service discovery, and low-friction booking.

**Live:** https://wax-in-the-city-website.vercel.app (Vercel production, deploys from `main`)

## Stack

- Next.js 16 App Router and TypeScript
- Tailwind CSS v4 tokens in `src/app/globals.css`
- `motion/react` for page and component transitions
- Lenis for smooth wheel scrolling, disabled for reduced-motion users
- Radix UI primitives with shadcn-style components in `src/components/ui`
- `react-hook-form` and `zod` for booking and contact forms
- Supabase form capture as the pre-Dinaya backend
- `react-compare-slider` for before/after imagery
- Google Fonts via `next/font`: Fraunces (display, variable) + Plus Jakarta Sans (body, variable)

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Local app URL:

```text
http://localhost:3000
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local dev server on port 3000 (webpack) |
| `npm run build` | Production build (`next build`) |
| `npm run build:next` | Same production build (used by Vercel) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint over `src/**/*.{ts,tsx}` |
| `npm run test` | Static audit script (`scripts/e2e-audit.mjs`) |
| `npm run test:all` | Tiered feature/boundary/cross-feature/workload test suites |

## Environment Variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used for metadata, Open Graph, JSON-LD, sitemap, and robots. Set this per-environment (staging vs. production) so metadata doesn't point at the wrong domain. Falls back to `https://wax-in-the-city-website.vercel.app`. |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key for public form inserts |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number, digits only, for example `94771234567` |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only Supabase key used by `/admin` to update service rows |
| `ADMIN_PASSWORD` | Password for the lightweight `/admin` service editor |
| `ADMIN_SESSION_SECRET` | Long random value used to sign the admin session cookie |

Build-time vars (`NEXT_PUBLIC_*`) must be set in the **Vercel project environment** (Production/Preview); runtime-only vars (`SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`) go in the same project environment.

## Booking Capture

Run `supabase/schema.sql` in the Supabase SQL editor before relying on the forms. It creates `services`, `booking_requests`, `testimonials`, and `gallery`, with RLS policies for public insert-only booking requests.

If Supabase env vars are missing, `BookingZone` automatically renders the WhatsApp-only CTA instead of the request form, so the primary booking route is never a form that's guaranteed to fail. Once `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set, it switches back to the form automatically. Pass an explicit `mode` prop to `BookingZone` to override this.

## Admin Panel

`/admin` is a hidden dashboard (no nav link, `robots` disallowed, noindex metadata) for bookings inbox, services, gallery, and testimonials. Auth is identity based via Supabase with a legacy password fallback.

### 1. Run the SQL

In the Supabase SQL editor, run `supabase/schema.sql`, then `supabase/admin-auth.sql`. The second script creates:

- `admin_users` — the email allowlist. RLS is enabled with **no** policies on purpose; only the service-role key reads it, and enforcement happens server side after every sign in.
- The public `gallery` storage bucket plus read/write policies.
- An `active` flag column on `gallery`.

If the bucket INSERT errors on your project version, create it manually: Storage > New bucket > name `gallery`, Public ON.

### 2. Add Google OAuth

1. Google Cloud Console > APIs & Services > Credentials > Create OAuth client ID (Web application).
2. Authorized redirect URI: `https://<project-ref>.supabase.co/auth/v1/callback`.
3. Supabase Dashboard > Authentication > Providers > Google: paste the client ID and secret, enable.
4. Also enable the Email provider in the same list.
5. Set `NEXT_PUBLIC_SITE_URL` so the app redirects back to `<site>/api/auth/callback` correctly (localhost for dev).

### 3. Approve admins

```sql
insert into admin_users (email, role, note)
values ('owner@example.com', 'owner', 'Studio owner')
on conflict (email) do nothing;
```

Only allowlisted emails can finish sign in (Google or email/password). Sign up from the login card works only for pre approved emails.

### 4. Legacy fallback

When Supabase auth env vars are absent, `/admin` falls back to the original signed-cookie `ADMIN_PASSWORD` flow (12h session, rate limited). Both paths satisfy the same server-side `isAdminAuthenticated()` check that guards every mutation; the service-role key never reaches the browser.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Base url used for the OAuth redirect |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project + browser auth |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only reads/writes (bookings inbox, gallery storage) |
| `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET` | Legacy fallback only |

## Imagery & Media

All site imagery is authentic client photography from the Battaramulla and Nugegoda studios — no stock. Assets are centralized in:

- `src/lib/images.ts` — image + video manifest (hero, services, branches, studio, gallery)
- `src/lib/gallery.ts` — curated gallery set
- `public/images/wax-real-optimized/` — optimized studio photography
- `public/images/services/` — category card visuals (waxing shows real RICA/Lycon inventory)
- `public/videos/wax-studio-real.mp4` — hero/studio reel video

Privacy rule for ladies-only positioning: procedural imagery crops to hands/tools only — no faces — until client-approved close-ups exist.

## Deployment

Production deploys to **Vercel** from `main` (project `wax-in-the-city-website`, configured in `vercel.json`). The latest production build compiles cleanly with Next.js 16: all routes are static or SSG with 1h ISR revalidation except `/admin`, `/book`, and server actions. A GitHub Actions CI workflow runs lint, typecheck, the static audit, and the build on every push/PR.

## Impeccable Context

- `PRODUCT.md` captures the brand strategy, register, audience, anti-references, and accessibility bar.
- `DESIGN.md` captures the extracted visual system in DESIGN.md format.
- `.impeccable/design.json` powers the local impeccable design sidecar.
- `.impeccable/live/config.json` is configured for the Next App Router layout.

## Project Structure

```text
src/
  app/                     routes, metadata, server actions, sitemap, robots
  components/global/       Navbar, Footer, MobileBookingBar, smooth scroll
  components/sections/     homepage, services, booking, gallery, trust sections
  components/ui/           shared primitives and cards
  lib/                     content (site.ts), images/gallery manifests, booking schemas, Supabase clients, pricing
public/
  images/                  client photography (studio, services, optimized sets)
  videos/                  studio reel video
supabase/
  schema.sql               pre-Dinaya database setup
tests/                     tier1–tier4 feature coverage suites
```

## Content Still Needing Client Confirmation

- Final Nugegoda address
- Real testimonials or approved Google review quotes
- Production Supabase env vars
- Dinaya booking widget when ready

## Launch Checklist

Before handing this off as a finished client site, confirm:

- [x] Real salon/service photography integrated across the site (`src/lib/images.ts`)
- [x] Final service menu and pricing confirmed against `src/lib/site.ts` / `src/lib/pricing.ts`
- [x] Production build passes cleanly on Vercel
- [x] `NEXT_PUBLIC_SITE_URL` set to the production domain (falls back to the vercel.app URL)
- [ ] Nugegoda address confirmed and `googleMapsUrl` in `src/lib/site.ts` updated to a precise place link (not a generic search URL)
- [ ] Battaramulla `googleMapsUrl` also switched to a precise place link
- [ ] Real, client-approved testimonials before enabling any review carousel
- [ ] Production Supabase project provisioned, `supabase/schema.sql` run, and env vars set in Vercel — otherwise booking stays WhatsApp-only by design
- [ ] `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` set to strong, unique production values
- [ ] Dinaya booking widget wired in and `BookingZone` mode switched over, once available

Crafted by Ardeno Studio.
