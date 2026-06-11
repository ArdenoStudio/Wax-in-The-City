# Wax In The City SL Website

Ladies-only beauty salon website for Colombo, covering Battaramulla and Nugegoda. Built by Ardeno Studio around a sharper private-studio glamour direction: privacy, hygiene, confident service discovery, and low-friction booking.

## Stack

- Next.js 16 App Router and TypeScript
- Tailwind CSS v4 tokens in `src/app/globals.css`
- `motion/react` for page and component transitions
- Lenis for smooth wheel scrolling, disabled for reduced-motion users
- Radix UI primitives with shadcn-style components in `src/components/ui`
- `react-hook-form` and `zod` for booking and contact forms
- Supabase form capture as the pre-Dinaya backend
- `react-compare-slider` for before/after imagery
- System font stack: Bodoni/Didot-style display, Avenir/Segoe-style body, no remote font fetch required for builds

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

## Environment Variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key for public form inserts |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number, digits only, for example `94771234567` |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only Supabase key used by `/admin` to update service rows |
| `ADMIN_PASSWORD` | Password for the lightweight `/admin` service editor |
| `ADMIN_SESSION_SECRET` | Long random value used to sign the admin session cookie |

## Booking Capture

Run `supabase/schema.sql` in the Supabase SQL editor before relying on the forms. It creates `services`, `booking_requests`, `testimonials`, and `gallery`, with RLS policies for public insert-only booking requests.

If Supabase env vars are missing, booking and contact forms now fail honestly and ask the visitor to use WhatsApp instead. They do not show a false success state.

## Admin Service Editor

`/admin` is a lightweight backend surface for changing services, durations, visibility, sort order, and prices. It uses an HTTP-only signed cookie after `ADMIN_PASSWORD` login and performs every mutation in a Server Action. The Supabase service-role key must stay server-only and must never use a `NEXT_PUBLIC_` prefix.

If the `services` table is empty, sign in and use **Seed current service menu** to copy the static fallback menu into Supabase. Public service cards will use Supabase rows when available and fall back to `src/lib/site.ts` when Supabase is missing or empty.

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
  lib/                     content, booking schemas, Supabase clients, utilities
supabase/
  schema.sql               pre-Dinaya database setup
```

## Content Still Needing Client Confirmation

- Final Nugegoda address
- Real salon photography
- Real testimonials or approved Google review quotes
- Final service menu and pricing
- Production Supabase env vars
- Custom domain and metadata URL alignment
- Dinaya booking widget when ready

Crafted by Ardeno Studio.
