# Wax In The City SL — Website

Ladies-only beauty salon in Colombo (Battaramulla + Nugegoda). Built by Ardeno
Studio to the "Velvet Intimacy" creative direction.

**Tagline:** Smooth. Safe. Genuine.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (brand tokens in `src/app/globals.css` via `@theme`)
- **motion** (Framer Motion) — `motion/react`
- **Radix UI** primitives + shadcn-style components in `src/components/ui`
- **react-hook-form + zod** — booking & contact forms
- **Supabase** — form capture (pre-Dinaya fallback)
- **react-compare-slider** — before/after
- Fonts: **Cormorant Garamond** (headings) + **DM Sans** (body)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values (optional for local dev)
npm run dev                  # http://localhost:3000
```

The site runs without any env vars — the booking/contact forms degrade to a
WhatsApp call-to-action and log submissions server-side.

## Environment variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (form inserts) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number, digits only (e.g. `94771234567`) |

## Supabase setup

Run `supabase/schema.sql` in the Supabase SQL editor. It creates the `services`,
`booking_requests`, `testimonials`, and `gallery` tables and the RLS policies the
public site needs (anon can insert booking requests; submissions are readable
only with the service-role key).

## Project structure

```
src/
├── app/                     # routes (home, services, locations, about,
│   │                        #   gallery, book, contact, faq) + template.tsx
│   ├── actions/booking.ts   # server actions: submitBooking, submitContact
│   └── globals.css          # Tailwind v4 brand theme tokens + keyframes
├── components/
│   ├── global/              # LoadingScreen, Navbar, Footer, MobileBookingBar…
│   ├── sections/            # Hero, BranchSelector, ServicesGrid, BookingZone…
│   ├── ui/                  # Button, Sheet, Select, Accordion, cards…
│   └── icons.tsx            # Instagram / Facebook / WhatsApp SVGs
└── lib/
    ├── site.ts              # branches, services, nav, testimonials (CONTENT)
    ├── gallery.ts           # gallery image list
    ├── faq.ts               # FAQ content
    ├── animations.ts        # shared Framer Motion variants (file 10)
    ├── booking.ts           # zod schemas
    └── supabase/            # browser + server clients
```

## Editing content

All placeholder copy lives in `src/lib/` — update `site.ts` (branches, hours,
services, testimonials), `gallery.ts`, and `faq.ts` as the client delivers real
details. Photography currently uses warm Unsplash placeholders; swap for real
salon photos in those files and `public/`.

## Pending (client-dependent)

- Real branch addresses, phone & WhatsApp number (`.env.local` + `site.ts`)
- Real photography (replace Unsplash URLs)
- Real testimonials / Google reviews
- **Dinaya** booking widget (~30 days) — the `BookingZone` already reserves a
  480px slot; switch `mode="dinaya"` and drop the embed into the `DinayaPlaceholder`.

---

Crafted by **Ardeno Studio**.
