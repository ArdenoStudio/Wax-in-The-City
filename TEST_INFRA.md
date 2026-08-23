# TEST INFRASTRUCTURE SPECIFICATION: WAX IN THE CITY

## 1. Overview & 4-Tier Testing Philosophy

This document defines the automated verification and quality assurance architecture for the **Wax In The City** luxury salon web platform. The test suite operates across four complementary tiers to guarantee visual discipline, mathematical layout correctness, conversion ergonomics, and compile-time integrity.

```
+-----------------------------------------------------------------------+
|                TIER 4: REAL-WORLD WORKLOAD SCENARIOS                  |
|  (Full Route Crawl, Next.js Build Integrity, ESLint Gate, SSG Pages)  |
+-----------------------------------------------------------------------+
                                    ^
+-----------------------------------------------------------------------+
|               TIER 3: CROSS-FEATURE INTEGRATION SUITE                 |
| (Hero Flow, Services Grid, FAQ Objection, Price Matrix, Mobile Bar)   |
+-----------------------------------------------------------------------+
                                    ^
+-----------------------------------------------------------------------+
|                TIER 2: BOUNDARY & CORNER CASES                        |
|  (Radius Math Boundaries, Hyphen False-Positives, Extreme Viewports)   |
+-----------------------------------------------------------------------+
                                    ^
+-----------------------------------------------------------------------+
|                TIER 1: FEATURE & TOKEN COMPLIANCE                     |
|  (Typography, No Italics, No Hyphens, Brand Palette, Shadows, dvh)    |
+-----------------------------------------------------------------------+
```

---

## 2. The Four Testing Tiers

### Tier 1: Feature & Token Compliance (Unit & Static Analysis)
Verifies discrete design tokens, component classes, and typography rules in isolation:
1. **Typography Scale Snapping (R1.1)**: Ensures no arbitrary font sizes (e.g. `text-[...]`, `text-[clamp(...)]`) exist in component classes. All font sizes must snap to standard Tailwind tokens (`text-caption`, `text-body-sm`, `text-body`, `text-h4`, `text-h3`, `text-h2`, `text-h1`, `text-display`, `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, etc.).
2. **Text Wrapping Discipline (R1.1)**: Verifies that headings (`h1`–`h6`, `SectionHeading`) apply `text-balance` / `text-wrap: balance` and paragraph bodies apply `text-pretty` / `text-wrap: pretty`.
3. **Hyphen Elimination in Copy (R1.2)**: Scans all user-facing strings, badges, and prose to ensure zero hyphen characters (`-`) exist in visible salon copy (e.g. `appointment-led` -> `appointment led`, `after-care` -> `aftercare`, `ladies-only` -> `ladies only`).
4. **Italic Elimination (R1.3)**: Confirms zero `italic` class occurrences or `font-style: italic` across all UI elements.
5. **Brand Palette Unification (R2.1)**: Detects and rejects off-palette hex values (specifically `#a5273f` and `#6f1726`) and unconfigured CSS tokens (such as `text-gold-dark`), enforcing the core luxury palette (`oxblood-deep`, `wine-action`, `pearl-blush`, `antique-gold`).
6. **Container Surface Discipline (R2.2)**: Purges unapproved ambient radial overlays from container backgrounds, restricting gradients exclusively to hero heading text-clip treatments.
7. **Tinted Elevation Shadows (R2.3)**: Replaces generic black `rgba(0,0,0,...)` and default `shadow-sm` with oxblood-tinted (`rgba(27,14,16,...)`) or wine-tinted (`rgba(162,15,55,...)`) elevation values.
8. **Concentric Corner Radius Math (R2.4)**: Asserts nested container/card hierarchies satisfy $r_{\text{inner}} = \max(0, r_{\text{outer}} - \text{gap})$ for all $\text{gap} < 32\text{px}$.
9. **Mobile Viewport Safety (`100dvh`) (R3.1)**: Replaces static `100vh`, `min-h-screen`, `70vh`, `80vh` with dynamic viewport height units (`min-h-[100dvh]`, `h-[80dvh]`).
10. **Motion Standardization (R4.1)**: Ensures transition easings use the defined luxury curve `[0.16, 1, 0.3, 1]` or `--ease-apple` rather than legacy linear or string defaults.

---

### Tier 2: Boundary & Corner Cases
Tests edge conditions, math limits, and potential false positives:
- **Radius Arithmetic Boundaries**:
  - Boundary $\text{gap} = 0$: $r_{\text{inner}} = r_{\text{outer}}$ (seamless alignment).
  - Boundary $\text{gap} \ge r_{\text{outer}}$: $r_{\text{inner}} = 0\text{px}$ (inner corner snaps cleanly to rectangle).
  - Boundary $\text{gap} \ge 32\text{px}$: Inner component operates with independent visual radius.
- **Copy Parsing & AST Boundary Protection**:
  - Validates that technical identifiers, URL paths (`/locations/nugegoda-flagship`), database slugs (`brazilian-wax`), HTML attributes (`aria-expanded`), and CSS utility classes (`items-center`, `flex-col`) are NOT flagged as copy hyphen violations.
  - Verifies em dashes (`—`) are preserved for editorial punctuation.
- **Extreme Viewport Constraints**:
  - Tests mobile header/drawer transitions, modal overlays, and full-screen hero sections on ultra-narrow (320px) and ultra-tall (100dvh) viewports.

---

### Tier 3: Cross-Feature Integration
Validates end-to-end component composition across critical page sections:
1. **Hero Conversion Flow**: Hero section combines text-clipped Cormorant/Bodoni display typography, `text-balance`, `100dvh` container, tinted glass shadow, and direct booking CTA.
2. **Services Grid & Card Composition**: Nested cards comply with concentric radius, luxury tinted elevation, standard typography scale, and zero hyphenated descriptions.
3. **Homepage Conversion & Objection Handling**: Verifies `src/app/page.tsx` mounts `StatsCounter` for social proof and `FAQAccordion` for objection resolution directly above `BookingZone`.
4. **Wax Price Matrix & Filter Tabs**: Combines active tab pill states, package card nested radii, price tags, and non-italic typography.
5. **Global Navigation & Mobile Bar**: Sticky navigation pill transitions, tinted blur, and mobile conversion bar with proper wine action gradient tokens.

---

### Tier 4: Real-World Workload Scenarios
Validates complete application integrity under realistic runtime and build conditions:
1. **Next.js Production Compilation**: `npm run build` with Turbopack, validating 0 TypeScript errors across all 19 static and dynamic routes.
2. **ESLint Static Analysis**: 0 linting errors across the entire codebase.
3. **Global Token Resets**: Verifies `src/app/globals.css` defines root CSS custom properties (`--color-oxblood-deep`, `--color-wine-action`, `--color-pearl-blush`, `--ease-apple`, `text-wrap: balance`, `text-wrap: pretty`).
4. **Site-Wide Route Coverage**: Verifies all 19 routes (`/`, `/about`, `/book`, `/contact`, `/faq`, `/gallery`, `/locations`, `/locations/[branch]`, `/services`, `/services/[slug]`, `/admin`, `/not-found`, etc.) render with complete structural layouts.

---

## 3. Test Runner Architecture

The test suite is powered by a high-performance verification engine in `tests/` and `scripts/e2e-audit.mjs`:
- **AST & Source Analyzer (`tests/helpers/audit-utils.mjs`)**: Directly parses TypeScript, TSX, and CSS files, extracting class tokens, JSX text nodes, style definitions, and component hierarchies.
- **Node.js Native Test Runner (`node --test tests/*.test.mjs`)**: Individual tier test suites executable with zero external runtime dependencies.
- **Unified E2E Audit CLI (`node scripts/e2e-audit.mjs`)**: Comprehensive terminal report with colorized progress, tier breakdowns, passing percentages, and actionable violation callouts.

---

## 4. Execution Commands

```bash
# Run the complete unified 4-tier E2E audit suite
node scripts/e2e-audit.mjs

# Run individual tier test suites via Node.js native test runner
node --test tests/tier1-feature-coverage.test.mjs
node --test tests/tier2-boundary-cases.test.mjs
node --test tests/tier3-cross-feature.test.mjs
node --test tests/tier4-workload-scenarios.test.mjs

# Run full Next.js production build verification
npm run build
```
