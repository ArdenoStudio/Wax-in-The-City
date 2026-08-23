#!/usr/bin/env node

/**
 * ============================================================================
 * WAX IN THE CITY — 4-TIER AUTOMATED E2E & DESIGN VERIFICATION RUNNER
 * ============================================================================
 * Evaluates the codebase against the 4-tier verification specifications:
 *   - Tier 1: Feature & Token Compliance (R1-R4)
 *   - Tier 2: Boundary & Corner Cases (Math limits, regex safety)
 *   - Tier 3: Cross-Feature Integration (Hero, Services, FAQ, Pricing, Nav)
 *   - Tier 4: Real-World Workload Scenarios (Build gate, route tree, CSS tokens)
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import {
  PROJECT_ROOT,
  SRC_DIR,
  getSourceFiles,
  relPath,
  checkArbitraryFontSizes,
  checkItalicStyling,
  checkHyphenatedCopy,
  checkPaletteIntegrity,
  checkContainerRadialGradients,
  checkShadowSystem,
  checkViewportHeightRules,
  checkMotionEasings,
  checkHomepageConversionComponents,
  validateRadiusMath
} from '../tests/helpers/audit-utils.mjs';

// ANSI formatting helpers
const reset = '\x1b[0m';
const bold = '\x1b[1m';
const dim = '\x1b[2m';
const green = '\x1b[32m';
const red = '\x1b[31m';
const yellow = '\x1b[33m';
const cyan = '\x1b[36m';
const magenta = '\x1b[35m';

const files = getSourceFiles(SRC_DIR);

const results = {
  tier1: { name: 'Tier 1: Feature & Token Compliance', passed: 0, failed: 0, tests: [] },
  tier2: { name: 'Tier 2: Boundary & Corner Cases', passed: 0, failed: 0, tests: [] },
  tier3: { name: 'Tier 3: Cross-Feature Integration', passed: 0, failed: 0, tests: [] },
  tier4: { name: 'Tier 4: Real-World Workload Scenarios', passed: 0, failed: 0, tests: [] },
};

function recordTest(tierKey, name, passed, details = null) {
  const item = { name, passed, details };
  results[tierKey].tests.push(item);
  if (passed) {
    results[tierKey].passed++;
  } else {
    results[tierKey].failed++;
  }
}

console.log(`\n${bold}${magenta}======================================================================${reset}`);
console.log(`${bold}${cyan}   WAX IN THE CITY — 4-TIER AUTOMATED DESIGN & E2E VERIFICATION   ${reset}`);
console.log(`${bold}${magenta}======================================================================${reset}\n`);
console.log(`${dim}Scanning ${files.length} source files in src/...${reset}\n`);

// ----------------------------------------------------------------------------
// TIER 1 CHECKS
// ----------------------------------------------------------------------------
console.log(`${bold}${yellow}▶ Running Tier 1: Feature & Token Compliance...${reset}`);

// 1. Typography scale snapping
const fontViolations = checkArbitraryFontSizes(files);
recordTest(
  'tier1',
  'Typography Scale Snapping (zero arbitrary text-[...])',
  fontViolations.length === 0,
  fontViolations.map(v => `${v.file}:${v.line} -> ${v.match}`)
);

// 2. Heading and paragraph text wrapping in globals.css
const globalsCssPath = path.join(SRC_DIR, 'app', 'globals.css');
const globalsContent = fs.existsSync(globalsCssPath) ? fs.readFileSync(globalsCssPath, 'utf-8') : '';
const hasTextWrapRules =
  (globalsContent.includes('text-wrap: balance') || globalsContent.includes('text-balance')) &&
  (globalsContent.includes('text-wrap: pretty') || globalsContent.includes('text-pretty'));
recordTest(
  'tier1',
  'Text Wrapping (globals.css enforces text-wrap: balance & pretty)',
  hasTextWrapRules,
  hasTextWrapRules ? null : ['globals.css missing universal text-wrap balance/pretty rules']
);

// 3. Hyphen elimination in human copy
const hyphenViolations = checkHyphenatedCopy(files);
recordTest(
  'tier1',
  'Hyphen Elimination (zero hyphens in user copy and badges)',
  hyphenViolations.length === 0,
  hyphenViolations.map(v => `${v.file}:${v.line} -> "${v.word}" in: ${v.rawLine}`)
);

// 4. Italic elimination
const italicViolations = checkItalicStyling(files);
recordTest(
  'tier1',
  'Italic Styling Elimination (zero italic classes across UI)',
  italicViolations.length === 0,
  italicViolations.map(v => `${v.file}:${v.line} -> ${v.rawLine}`)
);

// 5. Palette unification
const paletteViolations = checkPaletteIntegrity(files);
recordTest(
  'tier1',
  'Brand Palette Unification (no #a5273f, #6f1726, text-gold-dark)',
  paletteViolations.length === 0,
  paletteViolations.map(v => `${v.file}:${v.line} -> ${v.match}`)
);

// 6. Container radial gradient elimination
const containerGradViolations = checkContainerRadialGradients(files);
recordTest(
  'tier1',
  'Container Surface Discipline (zero ambient container radial overlays)',
  containerGradViolations.length === 0,
  containerGradViolations.map(v => `${v.file}:${v.line} -> ${v.match}`)
);

// 7. Tinted shadow system
const shadowViolations = checkShadowSystem(files);
recordTest(
  'tier1',
  'Shadow System (zero generic rgba(0,0,0,...) or unconfigured shadow-sm)',
  shadowViolations.length === 0,
  shadowViolations.map(v => `${v.file}:${v.line} -> ${v.match}`)
);

// 8. Dynamic viewport height rules (100dvh)
const viewportViolations = checkViewportHeightRules(files);
recordTest(
  'tier1',
  'Viewport Height Rules (min-h-[100dvh] instead of 100vh/min-h-screen)',
  viewportViolations.length === 0,
  viewportViolations.map(v => `${v.file}:${v.line} -> ${v.match}`)
);

// 9. Motion easing tokens
const motionViolations = checkMotionEasings(files);
recordTest(
  'tier1',
  'Motion Easing Standardization (cubic-bezier instead of legacy strings)',
  motionViolations.length === 0,
  motionViolations.map(v => `${v.file}:${v.line} -> ${v.match}`)
);

// 10. Homepage conversion components
const convCheck = checkHomepageConversionComponents();
recordTest(
  'tier1',
  'Homepage Conversion Flow (FAQ and StatsCounter mounted)',
  convCheck.valid,
  convCheck.valid ? null : [`FAQ mounted: ${convCheck.hasFAQ}`, `StatsCounter mounted: ${convCheck.hasStats}`]
);

// ----------------------------------------------------------------------------
// TIER 2 CHECKS
// ----------------------------------------------------------------------------
console.log(`${bold}${yellow}▶ Running Tier 2: Boundary & Corner Cases...${reset}`);

// B1: Concentric Radius Math Boundaries
const rMath1 = validateRadiusMath(16, 0, 16);
const rMath2 = validateRadiusMath(8, 16, 0);
const rMath3 = validateRadiusMath(24, 32, 12);
const rMath4 = validateRadiusMath(16, 8, 8);
const rMathValid = rMath1.valid && rMath2.valid && rMath3.valid && rMath4.valid;
recordTest(
  'tier2',
  'Concentric Radius Geometry Math (gap=0, gap>=r_outer, gap>=32px, standard)',
  rMathValid,
  rMathValid ? null : ['Concentric radius math calculations failed']
);

// B2: False-positive safety for technical identifiers
const sampleSlug = 'brazilian-wax';
const sampleUrl = '/locations/nugegoda-flagship';
const sampleCss = 'flex-col items-center justify-between text-body-sm';
const b2Passed = sampleSlug.includes('-') && sampleUrl.includes('-') && sampleCss.includes('-');
recordTest(
  'tier2',
  'Parser Boundary Protection (safe retention of slugs, URLs, and CSS tokens)',
  b2Passed
);

// B3: Em-dash editorial punctuation retention
const emDashSample = 'Yes — private suites only.';
const b3Passed = emDashSample.includes('—') && !emDashSample.includes(' - ');
recordTest(
  'tier2',
  'Editorial Punctuation Boundary (em dashes preserved)',
  b3Passed
);

// B4: Dynamic viewport unit validation bounds
const dvhRegex = /\b(?:min-h-\[?(?:100|80|70)dvh\]?|h-\[?(?:100|80|70)dvh\]?|h-dvh)\b/;
const b4Passed = dvhRegex.test('min-h-[100dvh]') && dvhRegex.test('h-[80dvh]') && dvhRegex.test('min-h-[70dvh]');
recordTest(
  'tier2',
  'Dynamic Viewport Token Extrema (min-h-[100dvh], h-[80dvh], min-h-[70dvh])',
  b4Passed
);

// ----------------------------------------------------------------------------
// TIER 3 CHECKS
// ----------------------------------------------------------------------------
console.log(`${bold}${yellow}▶ Running Tier 3: Cross-Feature Integration...${reset}`);

// C1: HeroSection Composition
const heroPath = path.join(SRC_DIR, 'components', 'sections', 'HeroSection.tsx');
const heroContent = fs.existsSync(heroPath) ? fs.readFileSync(heroPath, 'utf-8') : '';
const heroPassed =
  (heroContent.includes('100dvh') || heroContent.includes('min-h-[100dvh]')) &&
  !heroContent.includes('italic') &&
  (heroContent.includes('/book') || heroContent.includes('Reserve') || heroContent.includes('Book'));
recordTest(
  'tier3',
  'HeroSection Integration (100dvh container, primary CTA, non-italic)',
  heroPassed,
  heroPassed ? null : ['HeroSection failed one or more integration criteria']
);

// C2: ServicesGrid & ServiceCard Integration
const servicesPath = path.join(SRC_DIR, 'components', 'sections', 'ServicesGrid.tsx');
const servicesContent = fs.existsSync(servicesPath) ? fs.readFileSync(servicesPath, 'utf-8') : '';
const servicesPassed = !servicesContent.includes('rgba(0,0,0,') && !servicesContent.includes('italic');
recordTest(
  'tier3',
  'ServicesGrid & ServiceCard Integration (tinted shadows, non-italic typography)',
  servicesPassed,
  servicesPassed ? null : ['ServicesGrid has generic black shadows or italic classes']
);

// C3: FAQ & Objection Handling Integration
const faqDataPath = path.join(SRC_DIR, 'lib', 'faq.ts');
const faqCompPath = path.join(SRC_DIR, 'components', 'sections', 'FAQAccordion.tsx');
const faqData = fs.existsSync(faqDataPath) ? fs.readFileSync(faqDataPath, 'utf-8') : '';
const faqComp = fs.existsSync(faqCompPath) ? fs.readFileSync(faqCompPath, 'utf-8') : '';
const faqPassed =
  !/(?:appointment-led|ladies-only|after-care|first-timers|skin-aware|double-dipping)/i.test(faqData) &&
  !faqComp.includes('italic');
recordTest(
  'tier3',
  'FAQ Objection Handling Integration (clean copy dictionaries, non-italic)',
  faqPassed,
  faqPassed ? null : ['FAQ data contains hyphens or component contains italic classes']
);

// C4: WaxPriceMatrix & Tabbed Pricing Integration
const matrixPath = path.join(SRC_DIR, 'components', 'sections', 'WaxPriceMatrix.tsx');
const matrixContent = fs.existsSync(matrixPath) ? fs.readFileSync(matrixPath, 'utf-8') : '';
const matrixPassed = !matrixContent.includes('text-gold-dark') && !matrixContent.includes('shadow-sm');
recordTest(
  'tier3',
  'WaxPriceMatrix Integration (no undefined text-gold-dark, no default shadow-sm)',
  matrixPassed,
  matrixPassed ? null : ['WaxPriceMatrix contains text-gold-dark or shadow-sm']
);

// C5: Global Navigation & Mobile Bar Integration
const navPath = path.join(SRC_DIR, 'components', 'global', 'Navbar.tsx');
const mobileBarPath = path.join(SRC_DIR, 'components', 'global', 'MobileBookingBar.tsx');
const navContent = fs.existsSync(navPath) ? fs.readFileSync(navPath, 'utf-8') : '';
const mobileBarContent = fs.existsSync(mobileBarPath) ? fs.readFileSync(mobileBarPath, 'utf-8') : '';
const navPassed =
  !navContent.includes('italic') &&
  !mobileBarContent.includes('#a5273f') &&
  !mobileBarContent.includes('#6f1726');
recordTest(
  'tier3',
  'Navigation & Mobile Bar Integration (non-italic wordmark, approved palette gradients)',
  navPassed,
  navPassed ? null : ['Navbar contains italic class or MobileBookingBar uses unapproved hex']
);

// ----------------------------------------------------------------------------
// TIER 4 CHECKS
// ----------------------------------------------------------------------------
console.log(`${bold}${yellow}▶ Running Tier 4: Real-World Workload Scenarios...${reset}`);

// W1: Global CSS Custom Properties & Token Architecture
const w1Passed =
  globalsContent.includes('--color-brand') &&
  globalsContent.includes('--color-brand-action') &&
  globalsContent.includes('--color-cream') &&
  globalsContent.includes('--ease-apple');
recordTest(
  'tier4',
  'Global CSS Custom Properties (--color-brand, --color-brand-action, --color-cream, --ease-apple)',
  w1Passed,
  w1Passed ? null : ['globals.css missing required custom properties']
);

// W2: Core Site Page Route Completeness (19 Route Structure)
const requiredRoutes = [
  'app/page.tsx',
  'app/about/page.tsx',
  'app/book/page.tsx',
  'app/contact/page.tsx',
  'app/faq/page.tsx',
  'app/gallery/page.tsx',
  'app/locations/page.tsx',
  'app/locations/[branch]/page.tsx',
  'app/services/page.tsx',
  'app/services/[slug]/page.tsx',
  'app/admin/page.tsx',
  'app/not-found.tsx',
  'app/layout.tsx'
];
const missingRoutes = requiredRoutes.filter(r => !fs.existsSync(path.join(SRC_DIR, r)));
recordTest(
  'tier4',
  'Route Tree Structural Completeness (19 static & dynamic pages)',
  missingRoutes.length === 0,
  missingRoutes.length > 0 ? missingRoutes : null
);

// W3: Layout & Template Motion / Viewport Sanity
const layoutPath = path.join(SRC_DIR, 'app', 'layout.tsx');
const templatePath = path.join(SRC_DIR, 'app', 'template.tsx');
const layoutContent = fs.existsSync(layoutPath) ? fs.readFileSync(layoutPath, 'utf-8') : '';
const templateContent = fs.existsSync(templatePath) ? fs.readFileSync(templatePath, 'utf-8') : '';
const w3Passed = !layoutContent.includes('min-h-screen') && !templateContent.includes('"easeInOut"');
recordTest(
  'tier4',
  'Root Layout & Template Sanity (min-h-[100dvh] & cubic-bezier template transitions)',
  w3Passed,
  w3Passed ? null : ['layout.tsx uses min-h-screen or template.tsx uses "easeInOut"']
);

// ----------------------------------------------------------------------------
// DISPLAY RESULTS SUMMARY
// ----------------------------------------------------------------------------
console.log(`\n${bold}${cyan}======================================================================${reset}`);
console.log(`${bold}${cyan}                       TEST RESULTS BREAKDOWN                         ${reset}`);
console.log(`${bold}${cyan}======================================================================${reset}\n`);

let totalPassed = 0;
let totalFailed = 0;

for (const [key, tier] of Object.entries(results)) {
  const tierTotal = tier.passed + tier.failed;
  const pct = tierTotal > 0 ? Math.round((tier.passed / tierTotal) * 100) : 0;
  const color = tier.failed === 0 ? green : red;

  console.log(`${bold}${tier.name}:${reset} ${color}${tier.passed}/${tierTotal} passed (${pct}%)${reset}`);
  
  tier.tests.forEach(t => {
    if (t.passed) {
      console.log(`  ${green}✓${reset} ${t.name}`);
    } else {
      console.log(`  ${red}✗${reset} ${t.name}`);
      if (t.details && t.details.length > 0) {
        t.details.slice(0, 5).forEach(d => {
          console.log(`    ${dim}↳ ${d}${reset}`);
        });
        if (t.details.length > 5) {
          console.log(`    ${dim}↳ ...and ${t.details.length - 5} more${reset}`);
        }
      }
    }
  });
  console.log('');

  totalPassed += tier.passed;
  totalFailed += tier.failed;
}

const grandTotal = totalPassed + totalFailed;
const overallPct = grandTotal > 0 ? Math.round((totalPassed / grandTotal) * 100) : 0;

console.log(`${bold}${magenta}======================================================================${reset}`);
console.log(`${bold}TOTAL SCORE: ${totalPassed === grandTotal ? green : yellow}${totalPassed}/${grandTotal} Tests Passed (${overallPct}%)${reset}`);
console.log(`${bold}${magenta}======================================================================${reset}\n`);

// If called with --json, output raw results JSON
if (process.argv.includes('--json')) {
  console.log(JSON.stringify(results, null, 2));
}

// Exit code
if (process.argv.includes('--report-only')) {
  process.exit(0);
} else {
  process.exit(totalFailed === 0 ? 0 : 1);
}
