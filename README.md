# Wax In The City SL

> **"Private waxing, quietly perfected."**  
> Dedicated ladies-only private waxing and aesthetic skin therapy sanctuary across two Colombo studios (Battaramulla &amp; Nugegoda). Crafted with bespoke luxury editorial direction by [Ardeno Studio](https://ardeno-studio-website.vercel.app/).

[![Deployment](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Workers-f38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://wax-in-the-city.suvenseoras.workers.dev)
[![Framework](https://img.shields.io/badge/Next.js-16.3.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)]()

---

## 🌐 Live Environments

- **Production (Cloudflare Workers):** [https://wax-in-the-city.suvenseoras.workers.dev](https://wax-in-the-city.suvenseoras.workers.dev)
- **Vercel Mirror:** [https://wax-in-the-city-website.vercel.app](https://wax-in-the-city-website.vercel.app)
- **Instagram:** [@waxinthecitylk](https://instagram.com/waxinthecitylk)
- **Facebook:** [facebook.com/waxinthecitylk](https://facebook.com/waxinthecitylk)

---

## 💎 Brand & Creative Direction

**Creative North Star: "The Private Dressing Room"**

Designed to evoke the discreet intimacy of stepping behind a velvet curtain into an immaculate private suite:
- **Palette:** Deep Oxblood (`#2b0710`), Wine Action (`#a20f37`), Oxblood Noir (`#0e0407`), Pearl Blush (`#fff7f9`), and Antique Jewelry Gold (`#d9b35f`).
- **Typography:** Soft luxury pairing featuring **Fraunces** (optical-size display serif) and **Plus Jakarta Sans** (clean, ultra-legible body).
- **Guest Privacy:** Strict procedural imagery standard — authentic photography cropped to hands and tools only, zero faces, honoring the sanctuary's ladies-only confidential positioning.
- **Formulations:** Authentic Australian **Lycon** stripless hot wax and Italian **Rica** liposoluble strip waxes with strict zero double-dipping protocols.

---

## ⚡ Key Highlights & Architecture

### 1. Dual-Branch Studio Booking Engine
- **Atelier System:** Seamless branch switching between the **Battaramulla Main Studio** and **Nugegoda Boutique Studio**.
- **Contextual WhatsApp Deep-Links:** Generates branch-specific and service-specific booking messages with localized studio operating hours.
- **Fail-Safe Booking Zone:** Intelligent hybrid form. When Supabase environment variables are connected, public insert-only booking requests are captured directly; if offline or unconfigured, it gracefully falls back to instant WhatsApp concierge without breaking UX.

### 2. Luxury Editorial Footer
- **Official White Insignia:** Features the crisp circular white emblem housed in a frosted glass jewel container with ambient radial glow.
- **Pre-Footer Sanctuary Banner:** Editorial reservation call-to-action with live status indicators and dual booking actions.
- **Studio Atelier Cards:** Glassmorphic branch cards displaying real-time opening status (`🟢 Open Daily`), hours, one-tap calling, and dedicated WhatsApp triggers.
- **Ardeno Production Credit:** Bespoke animated credit featuring an IntersectionObserver auto-shine light sweep on scroll and continuous fluid shine on hover.

### 3. Edge-Native Cloudflare Architecture
- Powered by **OpenNext** (`@opennextjs/cloudflare`) on **Cloudflare Workers**.
- Static assets, edge rendering, and sub-second global response times across Cloudflare's edge network.
- Automated CI/CD pipeline via GitHub Actions (`.github/workflows/deploy.yml`) on every push to `main`.

### 4. Hidden Admin Sanctuary (`/admin`)
- Concealed, unindexed dashboard protected from crawlers (`robots.txt` disallow, `noindex`).
- **Authentication:** Dual-mode auth supporting Supabase Google OAuth with an email allowlist (`admin_users`) plus signed-cookie legacy password fallback (`ADMIN_PASSWORD`).
- **Capabilities:** Review inbound booking requests, manage service pricing, update testimonials, and curate gallery assets.

---

## 🛠 Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/), React 19, TypeScript 5 |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), `@tailwindcss/postcss`, CSS Variables |
| **Animation & Motion** | [Motion (`motion/react`)](https://motion.dev/), Lenis Smooth Scroll, Custom CSS Keyframes |
| **UI Components** | [Radix UI](https://www.radix-ui.com/), `lucide-react`, Custom SVG Icons, `react-compare-slider` |
| **Form Management** | `react-hook-form`, [Zod](https://zod.dev/) validation schemas |
| **Database & Auth** | [Supabase](https://supabase.com/) (`@supabase/ssr`, `@supabase/supabase-js`), Google Cloud OAuth |
| **Edge Deployment** | [Cloudflare Workers](https://workers.cloudflare.com/) via OpenNext (`@opennextjs/cloudflare`), Wrangler CLI |
| **CI/CD** | GitHub Actions (`deploy.yml`, `ci.yml`) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ or 22+ (LTS recommended)
- npm 10+

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ArdenoStudio/Wax-in-The-City-website.git
   cd Wax-in-The-City-website/Wax-in-The-City-website-main
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```

4. **Launch development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local Next.js dev server with Webpack on port 3000 |
| `npm run build` | Builds OpenNext bundle for Cloudflare Workers |
| `npm run build:next` | Compiles standard Next.js production build |
| `npm run build:cf` | Generates Cloudflare worker output (`.open-next/worker.js`) |
| `npm run preview` | Runs local Wrangler preview in workerd runtime |
| `npm run deploy:cf` | Deploys build bundle directly to Cloudflare Workers |
| `npm run lint` | Runs ESLint across `src/**/*.{ts,tsx}` |
| `npm run typecheck` | Validates TypeScript with `tsc --noEmit` |
| `npm run test` | Executes end-to-end static audit (`scripts/e2e-audit.mjs`) |
| `npm run test:all` | Executes full 4-tier integration test suite |

---

## 🔐 Environment Variables

| Variable | Scope | Purpose |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Public / Build | Canonical domain for SEO, OpenGraph, JSON-LD, sitemaps, and OAuth redirects. Defaults to `https://wax-in-the-city.suvenseoras.workers.dev`. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Public | Primary studio WhatsApp contact in international format (e.g. `94779469437`). |
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase project API endpoint. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Supabase anonymous API key for public booking request inserts. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-Only | Supabase elevated key for admin mutations and private dashboard access. |
| `ADMIN_PASSWORD` | Server-Only | Secret password for legacy admin authentication fallback. |
| `ADMIN_SESSION_SECRET` | Server-Only | Cryptographic secret for signing admin session cookies. |
| `CLOUDFLARE_API_TOKEN` | CI / Secret | Cloudflare API token used in GitHub Actions deployment. |
| `CLOUDFLARE_ACCOUNT_ID` | CI / Secret | Cloudflare Account ID for Workers deployment. |

---

## 🗄 Database & Security Setup

The backend schema lives in `supabase/`:

1. **Core Schema (`supabase/schema.sql`):**
   - Tables: `services`, `booking_requests`, `testimonials`, `gallery`.
   - Row-Level Security (RLS) policies configured for public insert-only booking submissions.

2. **Admin Authentication (`supabase/admin-auth.sql`):**
   - Table: `admin_users` (email allowlist).
   - Storage bucket: `gallery` (with authenticated write and public read policies).

3. **Google OAuth Authorization:**
   - Configure OAuth 2.0 Web Client in Google Cloud Console.
   - Authorized Redirect URI: `https://<supabase-project-id>.supabase.co/auth/v1/callback`.
   - Enable Google & Email providers under Supabase Auth.
   - Insert authorized administrator emails into `admin_users`:
     ```sql
     insert into admin_users (email, role, note)
     values ('owner@example.com', 'owner', 'Studio Owner')
     on conflict (email) do nothing;
     ```

---

## 📂 Project Structure

```text
├── .github/workflows/         # CI/CD pipelines (deploy.yml, ci.yml)
├── public/
│   ├── images/                # Optimized studio photography, logos, icons
│   │   ├── services/          # RICA & Lycon product visuals
│   │   ├── studio/            # Studio suites, reception, protocol imagery
│   │   └── witc-logo-white.png# Official high-res circular white insignia
│   └── videos/                # Studio atmosphere reel videos
├── src/
│   ├── app/                   # App Router pages, layouts, server actions, API routes
│   │   ├── (site)/            # Public pages: home, about, services, locations, gallery, book, faq, contact
│   │   ├── admin/             # Hidden admin dashboard & actions
│   │   ├── api/auth/callback/ # Supabase OAuth redirect handler
│   │   ├── globals.css        # Tailwind v4 theme definitions and font pairings
│   │   └── layout.tsx         # Root layout with JsonLd and SmoothScroll
│   ├── components/
│   │   ├── global/            # Navbar, Footer, MobileBookingBar, ArdenoProductionCredit
│   │   ├── sections/          # HeroSection, BookingZone, ServicesGrid, StudioReel, etc.
│   │   ├── ui/                # Accessible Radix primitives and shared buttons/inputs
│   │   └── icons.tsx          # Optimized brand SVG glyphs (Instagram, Facebook, WhatsApp)
│   └── lib/
│       ├── site.ts            # Single source of truth for site content & branches
│       ├── images.ts          # Central client media manifest
│       ├── pricing.ts         # Service pricing and treatment categories
│       └── supabase.ts        # Supabase client instances (client & server)
├── supabase/                  # PostgreSQL schema and migration scripts
├── tests/                     # Tier 1–4 boundary and feature test suites
├── open-next.config.ts        # OpenNext configuration for Cloudflare Workers
└── wrangler.jsonc             # Cloudflare Workers configuration file
```

---

## 🚢 Continuous Deployment

Every commit pushed to the `main` branch automatically triggers the **Deploy to Cloudflare Workers** GitHub Action:
1. Checks out repository and configures Node.js 22.
2. Installs dependencies (`npm ci`).
3. Compiles the OpenNext bundle (`npx @opennextjs/cloudflare build`).
4. Deploys to Cloudflare Workers (`npx @opennextjs/cloudflare deploy`).

---

## 📋 Launch & Production Checklist

- [x] Authentic client photography integrated across all sections (`src/lib/images.ts`)
- [x] Full treatment matrix and pricing synchronized (`src/lib/pricing.ts`)
- [x] Luxury editorial footer with official white insignia and studio atelier cards
- [x] Ardeno Production Credit animation with auto-shine and hover effects
- [x] Production OpenNext build passing with 0 TypeScript/ESLint errors
- [x] Cloudflare Workers deployment active and healthy
- [ ] Confirm exact Google Maps Place URL for Nugegoda branch in `src/lib/site.ts`
- [ ] Set production Supabase credentials in Cloudflare dashboard
- [ ] Add client's production Google OAuth credentials for the `/admin` portal

---

## 🖋 Credits

Crafted with dedication by **[Ardeno Studio](https://ardeno-studio-website.vercel.app/)**.  
*Based in LK.*
