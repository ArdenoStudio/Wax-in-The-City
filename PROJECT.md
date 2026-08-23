# Project: Wax In The City Website UI/UX Redesign & Frontend Enhancement

## Architecture
- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v3.4 + Framer Motion
- **Design System:** Luxury Oxblood & Warm Pearl Palette (`oxblood-deep`, `wine-action`, `pearl-blush`, `gold`), Serif display typography (Cormorant Garamond), Sans body typography (Plus Jakarta Sans).
- **Core Principles:**
  - Strict typography scale snapping (zero arbitrary `text-[...]`), balance/pretty text wrapping, zero copy hyphens, zero italics.
  - Concentric corner radius geometry ($r_{\text{inner}} = r_{\text{outer}} - \text{gap}$).
  - Tinted elevation shadows, solid luxury container surfaces, text-clipped hero headings.
  - Mobile viewport safety (`100dvh`), high-conversion landing page architecture, standardized cubic-bezier easing.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Global & Component Text Wrapping | Enforce `text-wrap: balance` on all headings and `text-wrap: pretty` on all body copy | M1 (DONE) | Survey Explorer 1 (R1) |
| 2 | Tailwind Font Scale Snapping | Snap 20 arbitrary `text-[...]` sizes across 10 files to standard Tailwind scale | M1 (DONE) | Survey Explorer 1 (R1) |
| 3 | Italic Styling Elimination | Remove all 6 `italic` class occurrences in UI elements, replace with weight/color hierarchy | M1 (DONE) | Survey Explorer 1 (R1) |
| 4 | Copywriting & Hyphen Elimination | Rewrite 263 hyphenated user-facing copy strings across data and component files | M1 (DONE) | Survey Explorer 1 (R1) |
| 5 | Brand Palette Unification | Replace hardcoded off-palette hex gradients (`#a5273f`, `#6f1726`) and fix `text-gold-dark` | M2 (DONE) | Survey Explorer 2 (R2) |
| 6 | Container Gradient Elimination | Remove unapproved ambient radial overlays on container backgrounds across 8 sections | M2 (DONE) | Survey Explorer 2 (R2) |
| 7 | Hero Heading Text Gradient | Add luxury text-clip gradient to hero display headings | M2 (DONE) | Survey Explorer 2 (R2) |
| 8 | Tinted Shadow System | Replace 8 generic black `rgba(0,0,0,...)` and 2 `shadow-sm` with oxblood/wine tinted shadows | M2 (DONE) | Survey Explorer 2 (R2) |
| 9 | Corner Radius Arithmetic | Fix 11 nested container/card hierarchies to strictly satisfy $r_{\text{inner}} = r_{\text{outer}} - \text{gap}$ | M2 (DONE) | Survey Explorer 2 (R2) |
| 10 | Homepage Conversion Architecture | Mount objection-handling FAQ and `StatsCounter` on homepage; optimize hero CTA | M3 | Survey Explorer 3 (R3) |
| 11 | Asymmetric Card Grid Layout | Break symmetric monotony in `TrustStrip` and cards with staggered depth | M3 | Survey Explorer 3 (R3) |
| 12 | Mobile Viewport Safety (`100dvh`) | Replace `min-h-screen`, `100vh`, `70vh`, `80vh` with `min-h-[100dvh]` / `h-[80dvh]` | M3 | Survey Explorer 3 (R3) |
| 13 | Standardized Motion Curves | Standardize Framer Motion and CSS transition easings to `[0.16, 1, 0.3, 1]` | M3 | Survey Explorer 3 (R4) |
| 14 | Tooling & Lint Script Hardening | Fix Windows path issue in lint script; clean up unused variables in `WaxPriceMatrix` | M3 | Survey Explorer 3 (R5) |
| 15 | Automated E2E Test Suite | Build 4-tier automated test suite verifying all R1-R5 criteria and publish `TEST_READY.md` | M4 (DONE) | Test Track (R5) |
| 16 | Full Build & Forensic Audit Gate | Validate `npm run build`, review sign-offs, challenger proofs, and forensic integrity | M5 | Integration (R5) |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Typography, Copywriting & Scale Snapping | `src/app/globals.css`, `src/lib/`, all heading and body components (R1) | none | DONE |
| M2 | Visual System, Surfaces, Shadows & Radii | `src/components/`, `src/app/globals.css`, color tokens, shadows, radius math (R2) | none | DONE |
| M3 | Layout, Conversion Flow, 100dvh & Motion | `src/app/page.tsx`, `src/app/layout.tsx`, `HeroSection`, `TrustStrip`, motion tokens (R3, R4) | M1, M2 | IN_PROGRESS |
| M4 | E2E Testing Suite & Infrastructure | Test harness and automated test runners for Tiers 1-4, `TEST_READY.md` | none | DONE |
| M5 | Final Integration, Build & Audit Verification | Complete test pass (100%), `npm run build`, Reviewers, Challengers, Auditor | M1, M2, M3, M4 | PLANNED |

## Interface Contracts
### Typography & Global Styles ↔ Component Hierarchy
- Headings: All `<h1>` to `<h6>` and `SectionHeading` components must apply `text-balance` (or rely on global CSS `text-wrap: balance`).
- Paragraphs: All `<p>` elements must apply `text-pretty` (or rely on global CSS `text-wrap: pretty`).
- Scales: Font classes must only use Tailwind scale tokens (`text-caption`, `text-body-sm`, `text-body`, `text-h4`, `text-h3`, `text-h2`, `text-h1`, `text-display`, `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`, `text-6xl`, `text-7xl`, `text-8xl`, `text-9xl`).

### Geometry & Radius Hierarchy
- Nested containers: Outer element with radius $r_{\text{outer}}$ and inner element with radius $r_{\text{inner}}$ separated by padding/gap $g$ must satisfy:
  $$r_{\text{inner}} = \max(0, r_{\text{outer}} - g) \quad (\text{for } g < 32\text{px})$$

### Shadow Tokens
- Elevation 1 (Card/Button): `shadow-[0_14px_30px_rgba(27,14,16,0.20)]` or `shadow-[0_14px_34px_rgba(162,15,55,0.20)]`
- Elevation 2 (Floating/Modal/Nav): `shadow-[0_24px_70px_rgba(27,14,16,0.30)]`
- Zero un-tinted black `rgba(0,0,0,...)` or unconfigured `shadow-sm`.

## Code Layout
- `src/app/globals.css` — Global CSS custom properties, typography resets, elevation utilities.
- `src/lib/site.ts`, `src/lib/pricing.ts`, `src/lib/faq.ts`, `src/lib/reviews.ts` — Authoritative data dictionaries and copy.
- `src/components/global/` — `Navbar.tsx`, `Footer.tsx`, `MobileBookingBar.tsx`, `LoadingScreen.tsx`.
- `src/components/sections/` — `HeroSection.tsx`, `ServicesGrid.tsx`, `TrustStrip.tsx`, `StatsCounter.tsx`, `BeforeAfterShowcase.tsx`, `WaxPriceMatrix.tsx`, `FAQAccordion.tsx`, `BookingZone.tsx`, etc.
- `src/components/ui/` — Base primitives (`button.tsx`, `section-heading.tsx`, `branch-card.tsx`, `select.tsx`, etc.).
- `scripts/e2e-audit.mjs` — Unified CLI audit runner.
- `tests/` — Automated 4-tier test suite.
