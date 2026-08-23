# TEST_READY: 4-Tier Automated Verification Test Suite

**Project:** Wax In The City Website UI/UX Redesign & Frontend Enhancement  
**Milestone:** M4: E2E Automated Verification Test Suite  
**Status:** READY FOR VERIFICATION RUNS  
**Date:** 2026-08-20  

---

## 1. Executive Summary

The automated 4-tier verification test suite and CLI audit engine for Wax In The City has been successfully created, calibrated, and validated. The test suite programmatically audits all 72 source files in `src/` against the design system rules (`DESIGN.md`), project requirements (`ORIGINAL_REQUEST.md`), and architectural contracts (`PROJECT.md`).

### Test Suite Execution Summary
- **Test Runner Engine:** `scripts/e2e-audit.mjs` (Standalone CLI) & Node.js Native Test Runner (`node:test`)
- **Total Test Cases:** 22 automated suites across 4 tiers
- **Current Milestone Baseline:** 10 / 22 Tests Passing (45% pass rate on initial baseline; ready for progressive milestone integration M1–M5)
- **Zero Runtime Dependencies:** Built using standard Node.js v25 native testing capabilities and source AST scanners.

---

## 2. Tier-by-Tier Test Coverage Matrix

| Tier | Tier Name | Test Target | Focus & Scope | Current Status |
|---|---|---|---|---|
| **Tier 1** | Feature & Token Compliance | R1.1, R1.2, R1.3, R2.1, R2.2, R2.3, R3.1, R3.2, R4.1 | Font scale snapping, text wrapping, hyphen elimination, zero italics, brand palette hexes, container surface solids, tinted shadows, `100dvh` viewport rules, cubic-bezier motion curves, homepage conversion components | **2/10 Passed** (Active tracking) |
| **Tier 2** | Boundary & Corner Cases | Geometry Math, AST Bounds, Viewport Units | Concentric radius math ($r_{\text{inner}} = \max(0, r_{\text{outer}} - \text{gap})$), $gap=0$, $gap \ge r$, $gap \ge 32\text{px}$, technical identifier hyphen retention (slugs, URLs, CSS tokens), em dash preservation, dynamic viewport tokens (`100dvh`, `80dvh`, `70dvh`) | **4/4 Passed** (100%) |
| **Tier 3** | Cross-Feature Integration | Component Composition | `HeroSection` composition (heading gradient, 100dvh, CTA), `ServicesGrid` card hierarchy & tinted shadows, `FAQAccordion` objection flow, `WaxPriceMatrix` tab pricing & tokens, `Navbar` & `MobileBookingBar` palette integration | **2/5 Passed** (Active tracking) |
| **Tier 4** | Real-World Workload Scenarios | Production Build & Routes | Global CSS custom properties (`--color-brand`, `--color-brand-action`, `--color-cream`, `--ease-apple`), 19-route static/dynamic tree completeness, root layout & template transition sanity, `npm run build` Turbopack compilation | **2/3 Passed** (Active tracking) |

---

## 3. How to Run the Verification Tests

### 1. Complete Unified 4-Tier Audit CLI (Recommended)
Runs all 22 tests across all 4 tiers with colored diagnostics and exact line-by-line violation pointers:
```bash
node scripts/e2e-audit.mjs
```
*(Or via npm script)*:
```bash
npm test
```

### 2. Report-Only Mode (Returns Exit Code 0 for CI / Progress Tracking)
```bash
node scripts/e2e-audit.mjs --report-only
```

### 3. JSON Output Mode (For Automated Metric Ingestion)
```bash
node scripts/e2e-audit.mjs --report-only --json
```

### 4. Node.js Native Unit Test Runner (Individual Tiers)
```bash
# Run all native test files
npm run test:all

# Run specific tier test files
node --test tests/tier1-feature-coverage.test.mjs
node --test tests/tier2-boundary-cases.test.mjs
node --test tests/tier3-cross-feature.test.mjs
node --test tests/tier4-workload-scenarios.test.mjs
```

### 5. Full Next.js Production Build Gate
```bash
npm run build
```

---

## 4. Test Files & Artifacts Created

1. **`TEST_INFRA.md`** — Project-wide 4-tier testing specification and architecture documentation.
2. **`TEST_READY.md`** — This execution manual, test matrix, and verification status report.
3. **`scripts/e2e-audit.mjs`** — Unified CLI audit runner with formatted diagnostics and tier scorecards.
4. **`tests/helpers/audit-utils.mjs`** — Shared static analysis and AST parser engine for typography, hyphens, colors, shadows, viewports, and radius math.
5. **`tests/tier1-feature-coverage.test.mjs`** — Native test suite for feature and token compliance.
6. **`tests/tier2-boundary-cases.test.mjs`** — Native test suite for mathematical limits and parser boundaries.
7. **`tests/tier3-cross-feature.test.mjs`** — Native test suite for multi-component integration workflows.
8. **`tests/tier4-workload-scenarios.test.mjs`** — Native test suite for site-wide workload and route completeness.
9. **`package.json`** — Registered `"test"` and `"test:all"` execution scripts.

---

## 5. Escalated Implementation Action Items for Feature Workers

The test suite identified the following remaining implementation targets across Milestones M1, M2, and M3:

1. **Typography (M1 Worker):** Snap remaining arbitrary font sizes (`src/app/locations/page.tsx:77`, `src/app/services/page.tsx:130`, `src/components/sections/StatsCounter.tsx:63`).
2. **Copywriting (M1 Worker):** Clean up remaining hyphenated words in `src/app/about/page.tsx` (e.g. `after-care`, `appointment-led`, `ladies-only`, `first-timers`).
3. **Palette (M2 Worker):** Replace off-palette hex codes (`#a5273f`, `#6f1726`) in `src/components/global/MobileBookingBar.tsx`, `src/app/contact/page.tsx`, and `src/app/locations/page.tsx`.
4. **Container Surfaces (M2 Worker):** Purge ambient container radial overlays in `about/page.tsx`, `contact/page.tsx`, `locations/page.tsx`, `services/page.tsx`, `admin/page.tsx`.
5. **Shadows (M2 Worker):** Replace black `rgba(0,0,0,...)` and `shadow-sm` with oxblood-tinted shadow tokens.
6. **Conversion & Viewport (M3 Worker):** Mount `FAQAccordion` and `StatsCounter` in `src/app/page.tsx`; replace `min-h-screen` and `70vh`/`80vh` with `min-h-[100dvh]` / `h-[80dvh]`.
