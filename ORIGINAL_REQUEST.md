# Original User Request

## 2026-08-20T23:06:20+05:30

Execute a comprehensive UI/UX design audit and end-to-end frontend enhancement on the Wax In The City website, applying the ai-design-skills and redesign-existing-projects framework (strict typography rules, text-wrap balancing, hyphen elimination, Tailwind scale snapping, asymmetric layouts, spring motion, conversion copywriting, and mobile viewport optimization).

Working directory: c:/Users/suven/Desktop/OneDriveBackupFiles/Documents/ARDENO STUDIO/2 - Client & Demo Websites/Wax-in-The-City-website-main/Wax-in-The-City-website-main
Integrity mode: development

## Requirements

### R1. Typography & Copywriting Standard Alignment
Audit and update all site copy, headings, and UI labels against ai-design-skills:
- Enforce `text-wrap: balance` on all major headings and `text-wrap: pretty` on body paragraphs to prevent orphaned words.
- Eliminate hyphen characters (`-`) inside running copy, sentences, and badges by rewriting phrasing where necessary.
- Snap all font sizes to Tailwind's default type scale with paired line heights (remove arbitrary pixel/rem font sizes).
- Eliminate all italic styling across the UI, relying on font weight, size, and color hierarchy instead.

### R2. Visual System & Surface Discipline
- Verify the luxury dark wine and pearl palette (`oxblood-deep`, `wine-action`, `pearl-blush`) maintains consistent tone without unapproved ambient gradients on container backgrounds (only hero heading text gradients permitted).
- Ensure all elevation and drop shadows use tinted values rather than generic black box shadows.
- Verify container and card corner radius math: nested elements must satisfy `r_inner = r_outer - gap` (when gap < 32px).

### R3. Layout & Conversion Architecture Optimization
- Upgrade the homepage conversion flow according to landing page best practices: clear outcome-focused hero, single primary booking CTA above the fold, adjacent social proof, benefit-driven service highlights, interactive before/after showcase, and objection-handling FAQ.
- Replace any viewport height `100vh` rules with `min-height: 100dvh` to ensure stability across mobile Safari and iOS browsers.
- Break symmetric card monotony using asymmetric grids, staggered depth, or masonry where appropriate.

### R4. Interactivity, Transitions & Motion Polish
- Standardize animation curves across UI interactions to use smooth cubic-bezier easing (`cubic-bezier(0.32,0.72,0,1)`) or spring physics via Framer Motion.
- Ensure viewport scroll reveals use IntersectionObserver or Framer Motion with zero layout shift or scroll lag.

### R5. Build Integrity & Regression Testing
- Verify that the entire Next.js application compiles cleanly with zero TypeScript errors or broken imports via `npm run build`.

## Acceptance Criteria

### Typography & Copy
- [ ] Every heading component includes `text-wrap: balance` and paragraphs include `text-wrap: pretty`.
- [ ] Zero hyphen characters `-` exist in headings, body copy, or promotional badges.
- [ ] No arbitrary font sizes (`text-[...]`) remain in the codebase; all sizes snap to Tailwind standard tokens.
- [ ] No italicized text styles remain in UI elements.

### Layout & Responsiveness
- [ ] All full-screen hero or section containers use `100dvh` instead of `100vh`.
- [ ] Inner card radii mathematically match container outer radii minus padding gap.
- [ ] Desktop and mobile navigation and booking workflows render seamlessly without overflow or clipping.

### Quality & Performance
- [ ] All UI transitions utilize defined smooth easing curves without abrupt linear defaults.
- [ ] `npm run build` completes successfully with zero compile or lint errors.
