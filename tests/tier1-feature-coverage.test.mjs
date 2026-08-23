import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  getSourceFiles,
  checkArbitraryFontSizes,
  checkItalicStyling,
  checkHyphenatedCopy,
  checkPaletteIntegrity,
  checkContainerRadialGradients,
  checkShadowSystem,
  checkViewportHeightRules,
  checkMotionEasings,
  checkHomepageConversionComponents,
  SRC_DIR
} from './helpers/audit-utils.mjs';

describe('Tier 1: Feature & Token Compliance Test Suite', () => {
  const files = getSourceFiles(SRC_DIR);

  it('R1.1: Typography Scale Snapping — Zero arbitrary text-[...] font sizes in components', () => {
    const violations = checkArbitraryFontSizes(files);
    const summary = violations.map(v => `${v.file}:${v.line} -> ${v.match}`).join('\n');
    assert.equal(
      violations.length,
      0,
      `Found ${violations.length} arbitrary font size violation(s):\n${summary}`
    );
  });

  it('R1.1: Text Wrapping — globals.css defines balance for headings and pretty for body text', () => {
    const globalsCssPath = path.join(SRC_DIR, 'app', 'globals.css');
    assert.ok(fs.existsSync(globalsCssPath), 'globals.css must exist');
    const content = fs.readFileSync(globalsCssPath, 'utf-8');

    const hasHeadingBalance =
      content.includes('text-wrap: balance') ||
      content.includes('text-balance') ||
      /h[1-6][^{]*{[^}]*text-wrap:\s*balance/s.test(content);
    const hasParagraphPretty =
      content.includes('text-wrap: pretty') ||
      content.includes('text-pretty') ||
      /p[^{]*{[^}]*text-wrap:\s*pretty/s.test(content);

    assert.ok(hasHeadingBalance, 'globals.css or base styles must enforce text-wrap: balance on headings');
    assert.ok(hasParagraphPretty, 'globals.css or base styles must enforce text-wrap: pretty on paragraphs');
  });

  it('R1.2: Copywriting & Hyphen Elimination — Zero hyphens in human copy and promotional badges', () => {
    const violations = checkHyphenatedCopy(files);
    const summary = violations.map(v => `${v.file}:${v.line} -> "${v.word}" in: ${v.rawLine}`).join('\n');
    assert.equal(
      violations.length,
      0,
      `Found ${violations.length} hyphenated copy violation(s):\n${summary}`
    );
  });

  it('R1.3: Italic Elimination — Zero italic classes or italic font styling in UI elements', () => {
    const violations = checkItalicStyling(files);
    const summary = violations.map(v => `${v.file}:${v.line} -> ${v.rawLine}`).join('\n');
    assert.equal(
      violations.length,
      0,
      `Found ${violations.length} italic styling violation(s):\n${summary}`
    );
  });

  it('R2.1: Brand Palette Unification — Zero off-palette hex codes (#a5273f, #6f1726) and undefined tokens', () => {
    const violations = checkPaletteIntegrity(files);
    const summary = violations.map(v => `${v.file}:${v.line} -> ${v.match}`).join('\n');
    assert.equal(
      violations.length,
      0,
      `Found ${violations.length} palette violation(s):\n${summary}`
    );
  });

  it('R2.2: Surface Discipline — Zero unapproved ambient radial overlays on container backgrounds', () => {
    const violations = checkContainerRadialGradients(files);
    const summary = violations.map(v => `${v.file}:${v.line} -> ${v.match}`).join('\n');
    assert.equal(
      violations.length,
      0,
      `Found ${violations.length} unapproved container gradient violation(s):\n${summary}`
    );
  });

  it('R2.3: Shadow System — Zero generic black rgba(0,0,0,...) or unconfigured shadow-sm', () => {
    const violations = checkShadowSystem(files);
    const summary = violations.map(v => `${v.file}:${v.line} -> ${v.match}`).join('\n');
    assert.equal(
      violations.length,
      0,
      `Found ${violations.length} black shadow / shadow-sm violation(s):\n${summary}`
    );
  });

  it('R3.1: Viewport Height Safety — Zero static 100vh / min-h-screen rules across viewports', () => {
    const violations = checkViewportHeightRules(files);
    const summary = violations.map(v => `${v.file}:${v.line} -> ${v.match}`).join('\n');
    assert.equal(
      violations.length,
      0,
      `Found ${violations.length} static viewport height violation(s):\n${summary}`
    );
  });

  it('R4.1: Motion Standardization — Zero legacy string easings (easeOut, easeInOut)', () => {
    const violations = checkMotionEasings(files);
    const summary = violations.map(v => `${v.file}:${v.line} -> ${v.match}`).join('\n');
    assert.equal(
      violations.length,
      0,
      `Found ${violations.length} legacy easing violation(s):\n${summary}`
    );
  });

  it('R3.2: Homepage Conversion Flow — Mounts FAQAccordion and StatsCounter on homepage', () => {
    const res = checkHomepageConversionComponents();
    assert.ok(res.hasFAQ, 'Homepage (src/app/page.tsx) must mount FAQAccordion / objection handling section');
    assert.ok(res.hasStats, 'Homepage (src/app/page.tsx) must mount StatsCounter social proof section');
  });
});
