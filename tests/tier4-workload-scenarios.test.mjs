import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { SRC_DIR } from './helpers/audit-utils.mjs';

describe('Tier 4: Real-World Workload Scenarios Test Suite', () => {
  it('W1: Global CSS Custom Properties & Token Architecture', () => {
    const globalsCssPath = path.join(SRC_DIR, 'app', 'globals.css');
    assert.ok(fs.existsSync(globalsCssPath), 'globals.css must exist');
    const content = fs.readFileSync(globalsCssPath, 'utf-8');

    // Required color & motion custom properties from DESIGN.md
    const requiredTokens = [
      '--color-brand',
      '--color-brand-action',
      '--color-cream',
      '--ease-apple'
    ];

    for (const token of requiredTokens) {
      assert.ok(
        content.includes(token),
        `globals.css must define standard design token ${token}`
      );
    }
  });

  it('W2: Core Site Page Route Completeness (19 Route Structure)', () => {
    const requiredPages = [
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

    for (const relPage of requiredPages) {
      const fullPath = path.join(SRC_DIR, relPage);
      assert.ok(fs.existsSync(fullPath), `Route component ${relPage} must exist in src/`);
      const content = fs.readFileSync(fullPath, 'utf-8');
      assert.ok(
        content.includes('export default') || content.includes('export function'),
        `Route component ${relPage} must have a valid default/named export`
      );
    }
  });

  it('W3: Design Token & Layout Sanity across Root Layout & Template', () => {
    const layoutPath = path.join(SRC_DIR, 'app', 'layout.tsx');
    const templatePath = path.join(SRC_DIR, 'app', 'template.tsx');
    assert.ok(fs.existsSync(layoutPath), 'src/app/layout.tsx must exist');
    assert.ok(fs.existsSync(templatePath), 'src/app/template.tsx must exist');

    const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
    const templateContent = fs.readFileSync(templatePath, 'utf-8');

    // Check no static min-h-screen in layout
    assert.ok(!layoutContent.includes('min-h-screen'), 'layout.tsx should use min-h-[100dvh] instead of min-h-screen');

    // Check motion easing in template
    assert.ok(!templateContent.includes('"easeInOut"'), 'template.tsx should use standard cubic-bezier curve instead of "easeInOut"');
  });
});
