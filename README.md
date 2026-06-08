# Wax In The City SL Website

Ladies-only beauty salon website for Colombo, covering Battaramulla and Nugegoda. Built by Ardeno Studio around a sharper private-studio glamour direction: privacy, hygiene, confident service discovery, and low-friction booking.

## Stack

- Next.js 16 App Router and TypeScript
- Tailwind CSS v4 tokens in `src/app/globals.css`
- `motion/react` for page and component transitions
- Lenis for smooth wheel scrolling, disabled for reduced-motion users
- Radix UI primitives with shadcn-style components in `src/components/ui`
- `react-hook-form` and `zod` for booking and contact forms
- Neon Postgres (`@neondatabase/serverless`) for form capture as the pre-Dinaya backend
- `react-compare-slider` for before/after imagery
- Cormorant Garamond + DM Sans via `next/font`

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
| `DATABASE_URL` | Neon Postgres connection string (server-only; never expose to the browser) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number, digits only, for example `94771234567` |

On Vercel, add Neon via the Marketplace (`vercel integration add neon`) to auto-provision `DATABASE_URL`.

## Booking Capture

Run `db/schema.sql` against your Neon database before relying on the forms. It creates `services`, `booking_requests`, `testimonials`, and `gallery`.

Form writes run through server actions using `DATABASE_URL` — no client-side database access. If `DATABASE_URL` is missing, booking and contact forms fail honestly and ask the visitor to use WhatsApp instead. They do not show a false success state.

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
  lib/                     content, booking schemas, Neon client, utilities
db/
  schema.sql               pre-Dinaya database setup
```

## Content Still Needing Client Confirmation

- Final Nugegoda address
- Real salon photography
- Real testimonials or approved Google review quotes
- Final service menu and pricing
- Production Neon `DATABASE_URL`
- Custom domain and metadata URL alignment
- Dinaya booking widget when ready

Crafted by Ardeno Studio.
