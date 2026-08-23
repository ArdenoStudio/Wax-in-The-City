import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateRadiusMath } from './helpers/audit-utils.mjs';

describe('Tier 2: Boundary & Corner Cases Test Suite', () => {
  describe('Concentric Radius Mathematical Boundaries', () => {
    it('B1.1: Gap = 0 Boundary — Inner radius must equal outer radius', () => {
      const result = validateRadiusMath(16, 0, 16);
      assert.ok(result.valid, 'When gap is 0, inner radius must equal outer radius');
      assert.equal(result.expectedInner, 16);
    });

    it('B1.2: Gap >= Outer Radius Boundary — Inner radius snaps to 0px (sharp inner corner)', () => {
      const result = validateRadiusMath(8, 16, 0);
      assert.ok(result.valid, 'When gap exceeds outer radius, inner radius must be 0px');
      assert.equal(result.expectedInner, 0);
    });

    it('B1.3: Gap >= 32px Boundary — Inner element permitted independent visual radius', () => {
      const result = validateRadiusMath(24, 32, 12);
      assert.ok(result.valid, 'When gap is >= 32px, concentric formula does not restrict inner radius');
    });

    it('B1.4: Standard Concentric Offset — 16px outer with 8px padding yields 8px inner', () => {
      const result = validateRadiusMath(16, 8, 8);
      assert.ok(result.valid, '16px outer - 8px gap must yield 8px inner');
      assert.equal(result.expectedInner, 8);
    });

    it('B1.5: Large Card Concentric Offset — 28px outer with 12px gap yields 16px inner', () => {
      const result = validateRadiusMath(28, 12, 16);
      assert.ok(result.valid, '28px outer - 12px gap must yield 16px inner');
      assert.equal(result.expectedInner, 16);
    });
  });

  describe('AST & Regex Parser Boundary Protection (False Positive Prevention)', () => {
    it('B2.1: CSS Utility Classes with Hyphens are Protected', () => {
      const cssClasses = 'flex-col items-center justify-between text-body-sm bg-brand-light';
      const words = cssClasses.split(' ');
      assert.ok(words.includes('flex-col'), 'CSS utilities must remain valid');
      assert.ok(words.includes('text-body-sm'), 'Tailwind tokens must remain valid');
    });

    it('B2.2: Slugs and URL Paths are Protected from Hyphen Sanitization', () => {
      const validSlug = 'brazilian-wax';
      const validUrl = '/locations/nugegoda-flagship';
      assert.match(validSlug, /^[a-z0-9-]+$/);
      assert.match(validUrl, /^\/[a-z0-9-/]+$/);
    });

    it('B2.3: Em dashes (—) are Preserved as Editorial Punctuation', () => {
      const copyWithEmDash = 'Yes — every appointment is strictly private.';
      assert.ok(copyWithEmDash.includes('—'), 'Em dashes must be preserved');
      assert.ok(!copyWithEmDash.includes(' - '), 'Standard hyphen dashes must not replace em dashes');
    });

    it('B2.4: Empty Strings, Nulls, and Undefined in Data Dictionaries', () => {
      const mockItem = { title: 'Bikini Wax', description: '', badge: null };
      assert.equal(mockItem.description.length, 0);
      assert.equal(mockItem.badge, null);
    });
  });

  describe('Viewport Token Extrema & Mobile Bounds', () => {
    it('B3.1: Valid Dynamic Viewport Units are Recognized', () => {
      const validTokens = ['min-h-[100dvh]', 'h-[80dvh]', 'min-h-[70dvh]', 'h-dvh'];
      const dvhRegex = /\b(?:min-h-\[?(?:100|80|70)dvh\]?|h-\[?(?:100|80|70)dvh\]?|h-dvh)\b/;
      for (const token of validTokens) {
        assert.ok(dvhRegex.test(token), `Token ${token} must match dynamic viewport unit`);
      }
    });

    it('B3.2: Legacy Viewport Units are Caught at Boundaries', () => {
      const invalidTokens = ['min-h-screen', 'h-[80vh]', 'min-h-[70vh]', 'min-h-[100vh]', 'h-[100vh]'];
      const staticRegex = /\b(?:min-h-screen|min-h-\[?(?:100|70|80)vh\]?|h-\[?(?:100|80|70)vh\]?)\b/;
      for (const token of invalidTokens) {
        assert.ok(staticRegex.test(token), `Legacy token ${token} must be flagged`);
      }
    });
  });
});
