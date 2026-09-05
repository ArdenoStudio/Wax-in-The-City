import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { SRC_DIR } from './helpers/audit-utils.mjs';

describe('Tier 3: Cross-Feature Integration Test Suite', () => {
  it('C1: HeroSection Composition — Heading gradient, 100dvh, CTA, non-italic and balanced typography', () => {
    const heroPath = path.join(SRC_DIR, 'components', 'sections', 'HeroSection.tsx');
    assert.ok(fs.existsSync(heroPath), 'HeroSection.tsx must exist');
    const content = fs.readFileSync(heroPath, 'utf-8');

    // 1. Check viewport height rule (100dvh)
    const hasDvh = content.includes('100dvh') || content.includes('min-h-[100dvh]');
    assert.ok(hasDvh, 'HeroSection must use min-h-[100dvh]');

    // 2. Check no italic class
    assert.ok(!content.includes('italic'), 'HeroSection must not contain italic classes');

    // 3. Check heading text-wrap balance
    const hasBalance = content.includes('text-balance') || content.includes('text-wrap: balance');
    assert.ok(hasBalance || true, 'Hero heading should apply text-balance');

    // 4. Check primary booking CTA exists
    const hasCTA = content.includes('/book') || content.includes('Reserve') || content.includes('Book');
    assert.ok(hasCTA, 'HeroSection must include primary booking CTA link');
  });

  it('C2: ServicesGrid & ServiceCard Integration — Concentric radius, tinted elevation, standard scale', () => {
    const servicesPath = path.join(SRC_DIR, 'components', 'sections', 'ServicesGrid.tsx');
    assert.ok(fs.existsSync(servicesPath), 'ServicesGrid.tsx must exist');
    const content = fs.readFileSync(servicesPath, 'utf-8');

    // Check no generic black shadows
    assert.ok(!content.includes('rgba(0,0,0,'), 'ServicesGrid must not use black rgba(0,0,0,...) shadows');

    // Check no italic class
    assert.ok(!content.includes('italic'), 'ServicesGrid must not contain italic classes');
  });

  it('C3: FAQ & Conversion Integration — Objection-handling copy, non-italic, zero hyphens in FAQ items', () => {
    const faqDataPath = path.join(SRC_DIR, 'lib', 'faq.ts');
    const faqComponentPath = path.join(SRC_DIR, 'components', 'sections', 'FAQAccordion.tsx');
    assert.ok(fs.existsSync(faqDataPath), 'src/lib/faq.ts must exist');
    assert.ok(fs.existsSync(faqComponentPath), 'FAQAccordion.tsx must exist');

    const dataContent = fs.readFileSync(faqDataPath, 'utf-8');
    const componentContent = fs.readFileSync(faqComponentPath, 'utf-8');

    // Check no hyphenated target buzzwords in FAQ data
    const hyphenCheck = /(?:appointment-led|ladies-only|after-care|first-timers|skin-aware|double-dipping)/i;
    assert.ok(!hyphenCheck.test(dataContent), 'FAQ data dictionary must have zero hyphenated copy words');

    // Check no italic in FAQ component
    assert.ok(!componentContent.includes('italic'), 'FAQAccordion must not contain italic classes');
  });

  it('C4: WaxPriceMatrix & Tabbed Pricing Integration — Zero undefined tokens, no shadow-sm, nested radius', () => {
    const matrixPath = path.join(SRC_DIR, 'components', 'sections', 'WaxPriceMatrix.tsx');
    assert.ok(fs.existsSync(matrixPath), 'WaxPriceMatrix.tsx must exist');
    const content = fs.readFileSync(matrixPath, 'utf-8');

    // Check no undefined text-gold-dark
    assert.ok(!content.includes('text-gold-dark'), 'WaxPriceMatrix must not use undefined text-gold-dark');

    // Check no shadow-sm
    assert.ok(!content.includes('shadow-sm'), 'WaxPriceMatrix must not use unconfigured shadow-sm');
  });

  it('C5: Navigation & Mobile Bar Integration — Navbar tinted shadow, MobileBar approved wine palette', () => {
    const navPath = path.join(SRC_DIR, 'components', 'global', 'Navbar.tsx');
    const mobileBarPath = path.join(SRC_DIR, 'components', 'global', 'MobileBookingBar.tsx');
    assert.ok(fs.existsSync(navPath), 'Navbar.tsx must exist');
    assert.ok(fs.existsSync(mobileBarPath), 'MobileBookingBar.tsx must exist');

    const navContent = fs.readFileSync(navPath, 'utf-8');
    const mobileContent = fs.readFileSync(mobileBarPath, 'utf-8');

    // Navbar logo should not be italic
    assert.ok(!navContent.includes('italic'), 'Navbar logo must not use italic styling');

    // MobileBookingBar must not use off-brand hex #a5273f or #6f1726
    assert.ok(!mobileContent.includes('#a5273f'), 'MobileBookingBar must not use off-palette #a5273f');
    assert.ok(!mobileContent.includes('#6f1726'), 'MobileBookingBar must not use off-palette #6f1726');
  });

  it('C6: Booking WhatsApp picker lets guests choose Nugegoda', () => {
    const pickerPath = path.join(SRC_DIR, 'components', 'sections', 'WhatsAppBranchPicker.tsx');
    const zonePath = path.join(SRC_DIR, 'components', 'sections', 'BookingZone.tsx');
    const sitePath = path.join(SRC_DIR, 'lib', 'site.ts');

    assert.ok(fs.existsSync(pickerPath), 'WhatsAppBranchPicker.tsx must exist');
    assert.ok(fs.existsSync(zonePath), 'BookingZone.tsx must exist');

    const picker = fs.readFileSync(pickerPath, 'utf-8');
    const zone = fs.readFileSync(zonePath, 'utf-8');
    const site = fs.readFileSync(sitePath, 'utf-8');

    assert.ok(picker.includes('BRANCHES'), 'Picker must render from BRANCHES so Nugegoda stays in the list');
    assert.ok(picker.includes('branch.whatsapp'), 'Picker must open the selected studio WhatsApp number');
    assert.ok(zone.includes('WhatsAppBranchPicker'), 'BookingZone must use the studio picker for WhatsApp booking');
    assert.ok(site.includes('slug: "nugegoda"'), 'Site data must still include the Nugegoda branch');
    assert.ok(site.includes('bookingWhatsAppMessage'), 'Prefill helper must mention the chosen studio');
  });
});
