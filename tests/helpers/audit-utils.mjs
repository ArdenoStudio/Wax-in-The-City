import fs from 'node:fs';
import path from 'node:path';

export const PROJECT_ROOT = path.resolve(process.cwd());
export const SRC_DIR = path.join(PROJECT_ROOT, 'src');

/**
 * Recursively find all files matching extensions in a directory
 */
export function getSourceFiles(dir = SRC_DIR, extensions = ['.ts', '.tsx', '.css']) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getSourceFiles(fullPath, extensions));
    } else if (extensions.some(ext => entry.name.endsWith(ext))) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Relative path helper for display
 */
export function relPath(filePath) {
  return path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');
}

/**
 * Audit 1: Typography Scale Snapping
 * Detect arbitrary font sizes like text-[2rem], text-[clamp(...)], text-[6rem], etc.
 */
export function checkArbitraryFontSizes(files) {
  const violations = [];
  // Regex matches text-[...] where content is a dimension or clamp
  const arbitraryFontRegex = /\btext-\[(clamp\([^)]+\)|[0-9.]+(?:rem|px|em|vw|vh|dvh|%))\b/g;

  for (const file of files) {
    if (!file.endsWith('.tsx') && !file.endsWith('.ts')) continue;
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, idx) => {
      let match;
      while ((match = arbitraryFontRegex.exec(line)) !== null) {
        violations.push({
          file: relPath(file),
          line: idx + 1,
          match: match[0],
          rawLine: line.trim()
        });
      }
    });
  }
  return violations;
}

/**
 * Audit 2: Italic Class Usage
 * Check for the class 'italic' or font-style: italic in UI elements
 */
export function checkItalicStyling(files) {
  const violations = [];
  const italicClassRegex = /(?:className=["'`][^"'`]*\bitalic\b[^"'`]*["'`]|font-style:\s*italic|<(?:i|em)\b)/g;

  for (const file of files) {
    if (!file.endsWith('.tsx') && !file.endsWith('.ts') && !file.endsWith('.css')) continue;
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, idx) => {
      // Exclude comments
      if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) return;
      
      let match;
      while ((match = italicClassRegex.exec(line)) !== null) {
        violations.push({
          file: relPath(file),
          line: idx + 1,
          match: match[0],
          rawLine: line.trim()
        });
      }
    });
  }
  return violations;
}

/**
 * Audit 3: Hyphenated Copy in User-Facing Content
 * Check for hyphenated compound words inside visible user copy
 */
export function checkHyphenatedCopy(files) {
  const violations = [];
  // Known hyphenated words identified in design audit
  const targetHyphenWords = [
    /\bappointment-led\b/gi,
    /\bladies-only\b/gi,
    /\bwomen-only\b/gi,
    /\bafter-care\b/gi,
    /\bpre-wax\b/gi,
    /\bpost-wax\b/gi,
    /\bfirst-timers\b/gi,
    /\bskin-aware\b/gi,
    /\bultra-calming\b/gi,
    /\bdouble-dipping\b/gi,
    /\bhead-to-toe\b/gi,
    /\bskin-first\b/gi,
    /\bjudgement-free\b/gi,
    /\broot-clean\b/gi,
    /\blonger-lasting\b/gi,
    /\bdeep-clean\b/gi,
    /\bblack-soap\b/gi,
    /\bmineral-rich\b/gi,
    /\bmulti-step\b/gi,
    /\bopen-floor\b/gi,
    /\bsalon-floor\b/gi
  ];

  for (const file of files) {
    if (!file.endsWith('.tsx') && !file.endsWith('.ts')) continue;
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, idx) => {
      // Exclude comments, imports, slugs, hrefs, classNames, aria attributes
      const trimmed = line.trim();
      if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.startsWith('import ')) return;
      if (trimmed.includes('slug:') || trimmed.includes('href=') || trimmed.includes('className=') && !trimmed.includes('>') && !trimmed.includes('{')) return;

      for (const regex of targetHyphenWords) {
        let match;
        while ((match = regex.exec(line)) !== null) {
          violations.push({
            file: relPath(file),
            line: idx + 1,
            word: match[0],
            rawLine: trimmed
          });
        }
      }
    });
  }
  return violations;
}

/**
 * Audit 4: Palette & Brand Color Hex Violations
 * Check for forbidden hex codes (#a5273f, #6f1726) and invalid classes (text-gold-dark)
 */
export function checkPaletteIntegrity(files) {
  const violations = [];
  const forbiddenHexRegex = /(?:#a5273f|#6f1726|\btext-gold-dark\b)/gi;

  for (const file of files) {
    if (!file.endsWith('.tsx') && !file.endsWith('.ts') && !file.endsWith('.css')) continue;
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, idx) => {
      let match;
      while ((match = forbiddenHexRegex.exec(line)) !== null) {
        violations.push({
          file: relPath(file),
          line: idx + 1,
          match: match[0],
          rawLine: line.trim()
        });
      }
    });
  }
  return violations;
}

/**
 * Audit 5: Container Ambient Radial Gradients
 * Containers must have solid luxury backgrounds; radial overlays are unapproved.
 */
export function checkContainerRadialGradients(files) {
  const violations = [];
  // Detect radial-gradient in section background containers
  const radialBgRegex = /bg-\[[^\]]*radial-gradient\([^\]]+\)[^\]]*\]/g;

  for (const file of files) {
    if (!file.endsWith('.tsx') && !file.endsWith('.ts')) continue;
    // Exclude hero text gradients (which are linear-gradient text-clip)
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, idx) => {
      let match;
      while ((match = radialBgRegex.exec(line)) !== null) {
        violations.push({
          file: relPath(file),
          line: idx + 1,
          match: match[0],
          rawLine: line.trim()
        });
      }
    });
  }
  return violations;
}

/**
 * Audit 6: Generic Black Shadows and Default shadow-sm
 * Check for rgba(0,0,0,...) or shadow-sm in UI elements
 */
export function checkShadowSystem(files) {
  const violations = [];
  const blackShadowRegex = /(?:shadow-\[[^\]]*rgba\(0,\s*0,\s*0,\s*[0-9.]+\)[^\]]*\]|\bshadow-sm\b)/g;

  for (const file of files) {
    if (!file.endsWith('.tsx') && !file.endsWith('.ts') && !file.endsWith('.css')) continue;
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, idx) => {
      let match;
      while ((match = blackShadowRegex.exec(line)) !== null) {
        violations.push({
          file: relPath(file),
          line: idx + 1,
          match: match[0],
          rawLine: line.trim()
        });
      }
    });
  }
  return violations;
}

/**
 * Audit 7: Viewport Height Safety (dvh vs vh/screen)
 * Detect min-h-screen, 100vh, 70vh, 80vh
 */
export function checkViewportHeightRules(files) {
  const violations = [];
  const staticVhRegex = /\b(?:min-h-screen|min-h-\[?(?:100|70|80)vh\]?|h-\[?(?:100|80|70)vh\]?)\b/g;

  for (const file of files) {
    if (!file.endsWith('.tsx') && !file.endsWith('.ts') && !file.endsWith('.css')) continue;
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, idx) => {
      let match;
      while ((match = staticVhRegex.exec(line)) !== null) {
        violations.push({
          file: relPath(file),
          line: idx + 1,
          match: match[0],
          rawLine: line.trim()
        });
      }
    });
  }
  return violations;
}

/**
 * Audit 8: Motion & Transition Easing Curves
 * Check for string easing literals easeOut, easeInOut, easeIn
 */
export function checkMotionEasings(files) {
  const violations = [];
  const legacyEaseRegex = /ease:\s*["'](?:easeInOut|easeOut|easeIn)["']/g;

  for (const file of files) {
    if (!file.endsWith('.tsx') && !file.endsWith('.ts')) continue;
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, idx) => {
      let match;
      while ((match = legacyEaseRegex.exec(line)) !== null) {
        violations.push({
          file: relPath(file),
          line: idx + 1,
          match: match[0],
          rawLine: line.trim()
        });
      }
    });
  }
  return violations;
}

/**
 * Audit 9: Homepage Conversion Flow Components
 * Check that src/app/page.tsx mounts FAQAccordion and StatsCounter
 */
export function checkHomepageConversionComponents() {
  const pagePath = path.join(SRC_DIR, 'app', '(site)', 'page.tsx');
  if (!fs.existsSync(pagePath)) {
    return { mounted: false, reason: 'src/app/(site)/page.tsx does not exist' };
  }

  const content = fs.readFileSync(pagePath, 'utf-8');
  const hasFAQ = content.includes('FAQAccordion') || content.includes('FAQSection') || content.includes('faq');
  const hasStats = content.includes('StatsCounter') || content.includes('DEFAULT_STATS');

  return {
    hasFAQ,
    hasStats,
    valid: hasFAQ && hasStats
  };
}

/**
 * Audit 10: Concentric Corner Radius Math Validator
 * Formula: r_inner = max(0, r_outer - gap) when gap < 32px
 */
export function validateRadiusMath(rOuter, gap, rInner) {
  if (gap >= 32) {
    return { valid: true, expectedInner: rInner, note: 'gap >= 32px allows independent radius' };
  }
  const expectedInner = Math.max(0, rOuter - gap);
  const valid = Math.abs(rInner - expectedInner) <= 1; // Allow 1px subpixel tolerance
  return {
    valid,
    expectedInner,
    actualInner: rInner,
    rOuter,
    gap
  };
}
