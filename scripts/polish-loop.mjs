#!/usr/bin/env node
/**
 * High-volume safe polish loop — Cal Sans + Inter redesign.
 * Each successful class/CSS-token substitution = 1 logged loop.
 * Only edits class strings + CSS design tokens (never JSX logic).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const LOG_PATH = path.join(ROOT, "docs", "POLISH_LOOPS.md");
const TARGET_MIN = 1500;
const TARGET_SOFT = 2200;
const MAX_LOOPS = 2800;

const walk = (dir, out = []) => {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (/\.(tsx|ts|css)$/.test(ent.name)) out.push(p);
  }
  return out;
};
const rel = (p) => path.relative(ROOT, p).replaceAll("\\", "/");
const fileHash = (s) => crypto.createHash("md5").update(s).digest("hex");
const readMaxN = (text) => {
  let max = 0;
  for (const m of text.matchAll(/#(\d+)\b/g)) max = Math.max(max, Number(m[1]));
  return max;
};
const ensureLog = () => {
  fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });
  if (!fs.existsSync(LOG_PATH)) {
    fs.writeFileSync(
      LOG_PATH,
      "# Polish Loops\n\nSystematic Cal Sans + Inter class/token micro-polish.\n\n## Completed\n\n",
      "utf8",
    );
  }
};
const appendLogs = (entries) => {
  if (!entries.length) return;
  ensureLog();
  let existing = fs.readFileSync(LOG_PATH, "utf8");
  let n = readMaxN(existing);
  const lines = entries.map((e) => {
    n += 1;
    return `- [x] #${n} ${e.path}: ${e.ruleId} ${e.brief}`;
  });
  if (!existing.endsWith("\n")) existing += "\n";
  fs.writeFileSync(LOG_PATH, existing + lines.join("\n") + "\n", "utf8");
};

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const hasToken = (cls, token) =>
  new RegExp(`(?:^|\\s)${escapeRe(token)}(?:\\s|$)`).test(cls);
const replaceToken = (cls, from, to) => {
  const re = new RegExp(`(^|\\s)${escapeRe(from)}(?=\\s|$)`);
  if (!re.test(cls)) return null;
  return cls.replace(re, `$1${to}`);
};
const injectToken = (cls, token, { before, after, unless = [] } = {}) => {
  if (hasToken(cls, token)) return null;
  if (unless.some((u) => hasToken(cls, u) || cls.includes(u))) return null;
  if (before && hasToken(cls, before)) {
    return cls.replace(
      new RegExp(`(^|\\s)(${escapeRe(before)})(?=\\s|$)`),
      `$1${token} $2`,
    );
  }
  if (after && hasToken(cls, after)) {
    return cls.replace(
      new RegExp(`(^|\\s)(${escapeRe(after)})(?=\\s|$)`),
      `$1$2 ${token}`,
    );
  }
  return `${token} ${cls}`.replace(/\s+/g, " ").trim();
};

function looksLikeClassString(value) {
  if (!value || value.length < 3 || value.length > 900) return false;
  if (value.includes("${") || value.includes("<") || value.includes("=>"))
    return false;
  if (/https?:|\.com|\.tsx|\.ts|\.css|@\/|mailto:|whatsapp|supabase/i.test(value))
    return false;
  if (!/^[a-zA-Z0-9_\-:[\]/%.,#()'"!>\s]+$/.test(value)) return false;
  if (!/\s/.test(value) && !/[:/\[]/.test(value)) return false;
  return /(?:^|\s)(?:flex|grid|inline-flex|block|hidden|relative|absolute|sticky|font-|text-|bg-|border-|rounded-|shadow-|gap-|p[xytblr]?-|m[xytblr]?-|w-|h-|items-|justify-|overflow-|tracking-|leading-|uppercase|transition|hover:|focus|sm:|md:|lg:|xl:|pressable|premium-|glass-|studio-|hairline|nav-link|section-shell|field-|icon-drift|micro-lift|object-|backdrop-|saturate-|from-|via-|to-|inset-|z-|min-|max-|shrink-|opacity-|outline-|ring-|underline|sr-only|animate-|duration-|ease-|before:|after:|group|data-\[)/.test(
    value,
  );
}

function findClassRanges(content) {
  const ranges = [];
  const push = (start, end, value) => {
    if (looksLikeClassString(value)) ranges.push({ start, end, value });
  };
  for (const quote of ['"', "'"]) {
    let i = 0;
    while (i < content.length) {
      if (content[i] !== quote) {
        i++;
        continue;
      }
      if (i > 0 && content[i - 1] === "\\") {
        i++;
        continue;
      }
      const s = i + 1;
      i++;
      let escaped = false;
      while (i < content.length) {
        const c = content[i];
        if (escaped) {
          escaped = false;
          i++;
          continue;
        }
        if (c === "\\") {
          escaped = true;
          i++;
          continue;
        }
        if (c === quote || c === "\n") break;
        i++;
      }
      if (i < content.length && content[i] === quote) push(s, i, content.slice(s, i));
      i++;
    }
  }
  {
    let i = 0;
    while (i < content.length) {
      if (content[i] !== "`") {
        i++;
        continue;
      }
      const s = i + 1;
      i++;
      let bad = false;
      while (i < content.length) {
        const c = content[i];
        if (c === "\\") {
          i += 2;
          continue;
        }
        if (c === "`") break;
        if (c === "$" && content[i + 1] === "{") {
          bad = true;
          break;
        }
        i++;
      }
      if (!bad && i < content.length && content[i] === "`")
        push(s, i, content.slice(s, i));
      i++;
    }
  }
  const applyRe = /@apply\s+([^;]+);/g;
  let am;
  while ((am = applyRe.exec(content))) {
    const inner = am[1].trim();
    const start = am.index + am[0].indexOf(inner);
    push(start, start + inner.length, inner);
  }
  ranges.sort((a, b) => a.start - b.start || b.end - a.end);
  const deduped = [];
  let lastEnd = -1;
  for (const r of ranges) {
    if (r.start < lastEnd) continue;
    deduped.push(r);
    lastEnd = r.end;
  }
  return deduped;
}

function replaceOnceInRanges(content, predicate) {
  const ranges = findClassRanges(content);
  for (let i = ranges.length - 1; i >= 0; i--) {
    const r = ranges[i];
    const next = predicate(r.value, r);
    if (!next || next === r.value || next.includes("\n")) continue;
    return {
      content: content.slice(0, r.start) + next + content.slice(r.end),
    };
  }
  return null;
}

const isSectionFile = (p) => p.includes(`${path.sep}sections${path.sep}`);
const isGlobals = (p) => p.endsWith(`${path.sep}globals.css`) || p.endsWith("/globals.css");
const isBodyCopyClass = (cls) =>
  /\btext-body(-sm|-lg)?\b/.test(cls) &&
  !/\bfont-display\b|\bfont-serif\b|\buppercase\b|\bsr-only\b/.test(cls);
const isDisplayClass = (cls) => /\bfont-display\b/.test(cls);

function buildRules(wave) {
  const rules = [];
  const addClass = (id, brief, fn) => {
    rules.push({
      id,
      brief,
      apply(content, filePath) {
        const hit = replaceOnceInRanges(content, (cls) => fn(cls, filePath));
        return hit ? { content: hit.content, brief } : null;
      },
    });
  };
  const addMap = (prefix, pairs) => {
    for (const [from, to] of pairs) {
      if (from === to) continue;
      addClass(`${prefix}:${from}`, `${from}→${to}`, (cls) =>
        replaceToken(cls, from, to),
      );
    }
  };
  const addCss = (id, from, to, brief) => {
    rules.push({
      id,
      brief,
      apply(content, filePath) {
        if (!isGlobals(filePath) || !content.includes(from)) return null;
        return { content: content.replace(from, to), brief };
      },
    });
  };
  const sparse = (id, brief, from, to, mod, scope) => {
    addClass(id, brief, (cls, filePath) => {
      if (scope === "section" && !isSectionFile(filePath)) return null;
      if (scope === "nonsection" && isSectionFile(filePath)) return null;
      if (!hasToken(cls, from)) return null;
      const h = parseInt(fileHash(`${id}:${filePath}:${cls}`).slice(0, 3), 16);
      if (h % mod !== 0) return null;
      return replaceToken(cls, from, to);
    });
  };

  if (wave === 1) {
    addClass("a-display-semibold", "font-display font-medium→font-semibold", (cls) => {
      if (!isDisplayClass(cls) || !hasToken(cls, "font-medium")) return null;
      return replaceToken(cls, "font-medium", "font-semibold");
    });
    addMap("b-track", [
      ["tracking-[0.16em]", "tracking-[0.12em]"],
      ["tracking-[0.18em]", "tracking-[0.14em]"],
      ["tracking-[0.22em]", "tracking-[0.14em]"],
    ]);
    addMap("c-round", [
      ["rounded-2xl", "rounded-card-lg"],
      ["rounded-[18px]", "rounded-card-lg"],
      ["rounded-xl", "rounded-card-lg"],
      ["rounded-[16px]", "rounded-card-lg"],
      ["rounded-[12px]", "rounded-card"],
      ["rounded-[8px]", "rounded-card"],
    ]);
    addMap("d-cream", [
      ["text-cream/40", "text-cream-muted"],
      ["text-cream/45", "text-cream/60"],
      ["text-cream/50", "text-cream/64"],
      ["text-cream/55", "text-cream/64"],
      ["text-cream/58", "text-cream/66"],
      ["text-cream/60", "text-cream/68"],
      ["text-cream/62", "text-cream/70"],
      ["text-cream/66", "text-cream/72"],
      ["text-cream/68", "text-cream/74"],
      ["text-cream/70", "text-cream/76"],
      ["text-cream/72", "text-cream/78"],
      ["text-cream/74", "text-cream/78"],
    ]);
    addClass("e-font-serif", "font-serif→font-display", (cls) =>
      replaceToken(cls, "font-serif", "font-display"),
    );
    addMap("f-clamp", [
      ["text-[clamp(3.25rem,8vw,5.8rem)]", "text-[clamp(3rem,7.5vw,5.4rem)]"],
      ["text-[clamp(2.1rem,8vw,3.15rem)]", "text-[clamp(2rem,6.5vw,3rem)]"],
      ["text-[clamp(2rem,9vw,4.9rem)]", "text-[clamp(2rem,7vw,4.25rem)]"],
      ["text-[clamp(1.85rem,5.5vw,2.75rem)]", "text-[clamp(1.75rem,4.8vw,2.5rem)]"],
      ["text-[clamp(1.85rem,4vw,2.65rem)]", "text-[clamp(1.75rem,3.8vw,2.5rem)]"],
      ["sm:text-[3.6rem]", "sm:text-[clamp(2.4rem,5vw,3.25rem)]"],
      ["sm:text-[3.25rem]", "sm:text-[clamp(2.25rem,4.5vw,3rem)]"],
      ["text-[2.75rem]", "text-[clamp(2.25rem,4vw,2.75rem)]"],
      ["text-[2.5rem]", "text-[clamp(2rem,3.8vw,2.5rem)]"],
      ["text-[2.25rem]", "text-[clamp(1.85rem,3.5vw,2.25rem)]"],
      ["text-[2rem]", "text-[clamp(1.75rem,3.2vw,2rem)]"],
      ["sm:text-display", "sm:text-[clamp(2.5rem,5vw,3.5rem)]"],
    ]);
    addClass("g-font-sans-body", "add font-sans on body copy", (cls) => {
      if (!isBodyCopyClass(cls)) return null;
      return injectToken(cls, "font-sans", { unless: ["font-sans", "font-display"] });
    });
    addMap("h-shadow", [
      ["shadow-[0_18px_55px_rgba(27,14,16,0.08)]", "shadow-card"],
      ["shadow-[0_18px_48px_rgba(39,19,21,0.11)]", "shadow-card"],
      ["shadow-[0_16px_42px_rgba(39,19,21,0.05)]", "shadow-card"],
      ["shadow-[0_16px_36px_rgba(39,19,21,0.08)]", "shadow-card"],
      ["shadow-[0_14px_34px_rgba(39,19,21,0.05)]", "shadow-card"],
      ["shadow-[0_14px_32px_rgba(21,16,17,0.18)]", "shadow-card"],
      ["shadow-[0_12px_30px_rgba(53,16,23,0.10)]", "shadow-card"],
      ["shadow-[0_10px_24px_rgba(39,19,21,0.04)]", "shadow-card"],
      ["shadow-[0_10px_24px_rgba(39,19,21,0.05)]", "shadow-card"],
      ["shadow-[0_10px_24px_rgba(39,19,21,0.06)]", "shadow-card"],
      ["shadow-[0_10px_28px_rgba(0,0,0,0.24)]", "shadow-card"],
      ["shadow-[0_4px_32px_rgba(28,15,15,0.12)]", "shadow-card"],
      ["shadow-[0_16px_34px_rgba(0,0,0,0.18)]", "shadow-card"],
      ["shadow-[0_14px_34px_rgba(0,0,0,0.18)]", "shadow-card"],
      ["shadow-[0_14px_34px_rgba(21,16,17,0.16)]", "shadow-card"],
      ["shadow-[0_18px_42px_rgba(0,0,0,0.28)]", "shadow-card"],
      ["shadow-[0_-18px_48px_rgba(39,19,21,0.10)]", "shadow-card"],
      ["shadow-[0_16px_36px_rgba(162,15,55,0.22)]", "shadow-card-hover"],
      ["shadow-[0_14px_30px_rgba(151,35,58,0.20)]", "shadow-card-hover"],
      ["shadow-[0_14px_30px_rgba(162,15,55,0.24)]", "shadow-card-hover"],
      ["shadow-[0_14px_34px_rgba(151,35,58,0.24)]", "shadow-card-hover"],
      ["shadow-[0_16px_42px_rgba(162,15,55,0.32)]", "shadow-card-hover"],
      ["shadow-[0_12px_28px_rgba(162,15,55,0.22)]", "shadow-card-hover"],
      ["shadow-[0_26px_80px_rgba(27,14,16,0.16)]", "shadow-card-hover"],
      ["shadow-[0_26px_80px_rgba(39,19,21,0.16)]", "shadow-card-hover"],
      ["shadow-[0_28px_90px_rgba(0,0,0,0.28)]", "shadow-card-hover"],
      ["shadow-[0_30px_90px_rgba(39,19,21,0.16)]", "shadow-card-hover"],
      ["shadow-[0_24px_70px_rgba(39,19,21,0.16)]", "shadow-card-hover"],
      ["shadow-[0_22px_58px_rgba(162,15,55,0.36)]", "shadow-card-hover"],
      ["shadow-[0_20px_48px_rgba(162,15,55,0.30)]", "shadow-card-hover"],
      ["shadow-[0_18px_44px_rgba(0,0,0,0.20)]", "shadow-card-hover"],
    ]);
    addClass("i-upper-track-14", "uppercase tracking-[0.14em]→0.12em", (cls) => {
      if (!hasToken(cls, "uppercase") || !hasToken(cls, "tracking-[0.14em]"))
        return null;
      return replaceToken(cls, "tracking-[0.14em]", "tracking-[0.12em]");
    });
    addClass("j-gap-12-rhythm", "section gap-12→gap-10/14 by hash", (cls, filePath) => {
      if (!isSectionFile(filePath) || !hasToken(cls, "gap-12")) return null;
      const to =
        parseInt(fileHash(filePath).slice(0, 2), 16) % 2 === 0 ? "gap-10" : "gap-14";
      return replaceToken(cls, "gap-12", to);
    });
  }

  if (wave === 2) {
    addClass("s2-text-pretty", "add text-pretty on body", (cls) => {
      if (!isBodyCopyClass(cls)) return null;
      return injectToken(cls, "text-pretty", { unless: ["text-pretty", "text-balance"] });
    });
    addClass("s2-text-balance", "add text-balance on display", (cls) => {
      if (!isDisplayClass(cls)) return null;
      if (!/\btext-(h1|h2|h3|h4|display)\b/.test(cls) && !/text-\[clamp/.test(cls))
        return null;
      return injectToken(cls, "text-balance", { unless: ["text-balance", "text-pretty"] });
    });
    addClass("s2-track-display", "add tracking-[-0.025em] on display", (cls) => {
      if (!isDisplayClass(cls) || /\btracking-/.test(cls)) return null;
      return injectToken(cls, "tracking-[-0.025em]", { after: "font-display" });
    });
    addClass("s2-lead-none", "display leading-none→leading-[0.96]", (cls) => {
      if (!isDisplayClass(cls) || !hasToken(cls, "leading-none")) return null;
      return replaceToken(cls, "leading-none", "leading-[0.96]");
    });
    addClass("s2-lead-tight", "display leading-tight→leading-[1.1]", (cls) => {
      if (!isDisplayClass(cls) || !hasToken(cls, "leading-tight")) return null;
      return replaceToken(cls, "leading-tight", "leading-[1.1]");
    });
    addClass("s2-lead-snug", "display leading-snug→leading-[1.15]", (cls) => {
      if (!isDisplayClass(cls) || !hasToken(cls, "leading-snug")) return null;
      return replaceToken(cls, "leading-snug", "leading-[1.15]");
    });
    addClass("s2-rounded-media", "overflow-hidden rounded-card→rounded-card-lg", (cls) => {
      if (!hasToken(cls, "overflow-hidden") || !hasToken(cls, "rounded-card"))
        return null;
      return replaceToken(cls, "rounded-card", "rounded-card-lg");
    });
    addClass("s2-duration", "transition-colors + duration-300", (cls) => {
      if (!hasToken(cls, "transition-colors") || /\bduration-/.test(cls)) return null;
      return injectToken(cls, "duration-300", { after: "transition-colors" });
    });
    addClass("s2-ease", "add ease-[var(--ease-apple)]", (cls) => {
      if (!/\b(?:transition-colors|transition-all|transition-transform|transition-opacity)\b/.test(cls))
        return null;
      if (/\bease-/.test(cls)) return null;
      return injectToken(cls, "ease-[var(--ease-apple)]");
    });
    addClass("s2-shrink4", "h-4 w-4 + shrink-0", (cls) => {
      if (!hasToken(cls, "h-4") || !hasToken(cls, "w-4") || hasToken(cls, "shrink-0"))
        return null;
      return injectToken(cls, "shrink-0", { after: "w-4" });
    });
    addClass("s2-shrink5", "h-5 w-5 + shrink-0", (cls) => {
      if (!hasToken(cls, "h-5") || !hasToken(cls, "w-5") || hasToken(cls, "shrink-0"))
        return null;
      return injectToken(cls, "shrink-0", { after: "w-5" });
    });
    addClass("s2-cta-semibold", "pill CTA font-medium→font-semibold", (cls) => {
      if (!hasToken(cls, "rounded-pill") || !hasToken(cls, "font-medium")) return null;
      return replaceToken(cls, "font-medium", "font-semibold");
    });
    addClass("s2-link-semibold", "brand-action font-medium→semibold", (cls) => {
      if (!hasToken(cls, "font-medium") || !/\btext-brand-action\b/.test(cls))
        return null;
      return replaceToken(cls, "font-medium", "font-semibold");
    });
    addClass("s2-ring-offset", "focus-visible:ring-2 + ring-offset-2", (cls) => {
      if (!hasToken(cls, "focus-visible:ring-2") || /\bfocus-visible:ring-offset-/.test(cls))
        return null;
      return injectToken(cls, "focus-visible:ring-offset-2", {
        after: "focus-visible:ring-2",
      });
    });
    addClass("s2-underline-off", "hover:underline + underline-offset-4", (cls) => {
      if (!hasToken(cls, "hover:underline") || /\bunderline-offset-/.test(cls))
        return null;
      return injectToken(cls, "underline-offset-4", { before: "hover:underline" });
    });
    addClass("s2-shadow-ink", "shadow rgba(39,19,21→27,14,16", (cls) => {
      if (!cls.includes("rgba(39,19,21,")) return null;
      return cls.replaceAll("rgba(39,19,21,", "rgba(27,14,16,");
    });
    addMap("s2-misc", [
      ["tracking-wide", "tracking-[0.04em]"],
      ["duration-500", "duration-300"],
      ["backdrop-blur-md", "backdrop-blur-xl"],
    ]);
    addClass("s2-backdrop-bare", "backdrop-blur→backdrop-blur-xl", (cls) => {
      if (
        !hasToken(cls, "backdrop-blur") ||
        hasToken(cls, "backdrop-blur-xl") ||
        hasToken(cls, "backdrop-blur-md") ||
        hasToken(cls, "backdrop-blur-sm") ||
        hasToken(cls, "backdrop-blur-2xl")
      )
        return null;
      return replaceToken(cls, "backdrop-blur", "backdrop-blur-xl");
    });
    addClass("s2-caption-sans", "text-caption + font-sans", (cls) => {
      if (!hasToken(cls, "text-caption")) return null;
      if (hasToken(cls, "font-sans") || hasToken(cls, "font-display")) return null;
      return injectToken(cls, "font-sans", { before: "text-caption" });
    });
    addClass("s2-upper-10", "uppercase tracking-[0.12em]→0.1em", (cls) => {
      if (!hasToken(cls, "uppercase") || !hasToken(cls, "tracking-[0.12em]"))
        return null;
      return replaceToken(cls, "tracking-[0.12em]", "tracking-[0.1em]");
    });
  }

  if (wave === 3) {
    addMap("s3-bg", [
      ["bg-cream/[0.05]", "bg-cream/[0.07]"],
      ["bg-cream/[0.055]", "bg-cream/[0.08]"],
      ["bg-cream/[0.06]", "bg-cream/[0.08]"],
      ["bg-cream/[0.085]", "bg-cream/10"],
      ["bg-cream/5", "bg-cream/10"],
      ["bg-cream/8", "bg-cream/12"],
      ["bg-cream/9", "bg-cream/12"],
      ["bg-cream/10", "bg-cream/14"],
      ["hover:bg-cream/8", "hover:bg-cream/12"],
      ["hover:bg-cream/9", "hover:bg-cream/12"],
      ["hover:bg-cream/10", "hover:bg-cream/14"],
    ]);
    addMap("s3-bd", [
      ["border-cream/10", "border-cream/14"],
      ["border-cream/12", "border-cream/16"],
      ["border-cream/14", "border-cream/18"],
      ["border-cream/15", "border-cream/18"],
      ["border-cream/16", "border-cream/20"],
      ["border-cream/18", "border-cream/22"],
      ["border-warm-border/50", "border-warm-border/70"],
      ["border-warm-border/60", "border-warm-border/75"],
      ["border-warm-border/70", "border-warm-border/80"],
      ["border-brand-action/16", "border-brand-action/22"],
      ["border-brand-action/24", "border-brand-action/30"],
      ["border-brand-action/28", "border-brand-action/34"],
      ["border-brand-action/30", "border-brand-action/36"],
      ["border-brand-action/35", "border-brand-action/40"],
      ["border-brand-action/40", "border-brand-action/45"],
      ["border-gold/35", "border-gold/40"],
      ["bg-gold/12", "bg-gold/14"],
    ]);
    addMap("s3-brand", [
      ["text-brand-action/40", "text-brand-action/55"],
      ["text-brand-action/45", "text-brand-action/55"],
      ["text-brand-action/70", "text-brand-action/80"],
      ["text-brand-action/75", "text-brand-action/80"],
      ["text-brand-action/78", "text-brand-action/85"],
      ["text-brand-light/82", "text-brand-light/90"],
      ["text-brand-light/85", "text-brand-light/90"],
      ["text-warm-grey/80", "text-warm-grey/90"],
      ["text-warm/74", "text-warm/82"],
      ["bg-white/40", "bg-white/55"],
      ["bg-white/42", "bg-white/55"],
      ["bg-white/50", "bg-white/60"],
      ["bg-white/52", "bg-white/60"],
      ["bg-white/55", "bg-white/62"],
      ["bg-white/58", "bg-white/65"],
      ["bg-white/60", "bg-white/68"],
      ["bg-white/74", "bg-white/80"],
      ["bg-white/70", "bg-white/78"],
      ["bg-cream/92", "bg-cream/95"],
      ["bg-cream/78", "bg-cream/88"],
      ["bg-cream-alt/80", "bg-cream-alt/90"],
      ["bg-brand-mist/50", "bg-brand-mist/70"],
      ["bg-brand-mist/70", "bg-brand-mist/85"],
      ["bg-brand-mist/90", "bg-brand-mist"],
    ]);
    addMap("s3-focus", [
      ["focus-visible:ring-brand-action/45", "focus-visible:ring-brand-action/40"],
      ["focus-visible:ring-brand-action/50", "focus-visible:ring-brand-action/40"],
      ["focus:ring-brand-action/20", "focus:ring-brand-action/30"],
      ["focus:ring-brand-light/24", "focus:ring-brand-light/30"],
    ]);
    addClass("s3-body-lead", "body leading-relaxed→leading-[1.7]", (cls) => {
      if (!isBodyCopyClass(cls) || !hasToken(cls, "leading-relaxed")) return null;
      return replaceToken(cls, "leading-relaxed", "leading-[1.7]");
    });
    addClass("s3-remaining-medium", "remaining font-medium→font-semibold", (cls) => {
      if (!hasToken(cls, "font-medium")) return null;
      return replaceToken(cls, "font-medium", "font-semibold");
    });
    addClass("s3-gap16", "section gap-16→gap-14/12", (cls, filePath) => {
      if (!isSectionFile(filePath) || !hasToken(cls, "gap-16")) return null;
      const to =
        parseInt(fileHash(filePath).slice(2, 4), 16) % 2 === 0 ? "gap-14" : "gap-12";
      return replaceToken(cls, "gap-16", to);
    });
  }

  if (wave === 4) {
    for (const [from, to] of [
      ["gap-2", "gap-2.5"], ["gap-3", "gap-3.5"], ["gap-4", "gap-5"], ["gap-5", "gap-6"],
      ["gap-8", "gap-10"], ["gap-10", "gap-12"], ["mt-2", "mt-2.5"], ["mt-3", "mt-3.5"],
      ["mt-4", "mt-5"], ["mt-5", "mt-6"], ["mt-6", "mt-7"], ["mt-8", "mt-10"],
      ["mb-2", "mb-2.5"], ["mb-3", "mb-4"], ["pt-5", "pt-6"], ["pb-5", "pb-6"],
      ["py-2", "py-2.5"], ["py-3", "py-3.5"], ["px-3", "px-3.5"], ["px-4", "px-5"],
      ["px-5", "px-6"], ["px-6", "px-7"], ["p-4", "p-5"], ["p-5", "p-6"], ["p-6", "p-7"],
    ]) {
      sparse(`s4-${from}`, `section ${from}→${to}`, from, to, 3, "section");
    }
    addMap("s4-ui", [
      ["min-h-10", "min-h-11"], ["opacity-50", "opacity-55"],
      ["disabled:opacity-45", "disabled:opacity-50"],
      ["disabled:opacity-55", "disabled:opacity-50"],
      ["peer-disabled:opacity-70", "peer-disabled:opacity-60"],
      ["active:scale-[0.98]", "active:scale-[0.985]"],
      ["hover:-translate-y-0.5", "hover:-translate-y-[3px]"],
      ["scroll-mt-24", "scroll-mt-28"], ["saturate-[0.94]", "saturate-[0.96]"],
      ["object-[62%_center]", "object-[58%_center]"], ["from-ink/64", "from-ink/70"],
      ["hover:text-brand-dark", "hover:text-brand"],
    ]);
    addClass("s4-h10-pill", "h-10 rounded-pill→h-11", (cls) => {
      if (!hasToken(cls, "h-10") || !hasToken(cls, "rounded-pill")) return null;
      return replaceToken(cls, "h-10", "h-11");
    });
    addClass("s4-sticky-z", "sticky z-20→z-30", (cls) => {
      if (!hasToken(cls, "sticky") || !hasToken(cls, "z-20")) return null;
      return replaceToken(cls, "z-20", "z-30");
    });
    addClass("s4-sticky-top", "sticky top→top-24", (cls) => {
      if (!hasToken(cls, "sticky")) return null;
      if (hasToken(cls, "top-28")) return replaceToken(cls, "top-28", "top-24");
      if (hasToken(cls, "top-20")) return replaceToken(cls, "top-20", "top-24");
      return null;
    });
    addClass("s4-inset-10", "inset 0.10→0.14", (cls) => {
      if (!cls.includes("rgba(255,255,255,0.10)")) return null;
      return cls.replaceAll("rgba(255,255,255,0.10)", "rgba(255,255,255,0.14)");
    });
    addClass("s4-inset-12", "inset 0.12→0.14", (cls) => {
      if (!cls.includes("rgba(255,255,255,0.12)")) return null;
      return cls.replaceAll("rgba(255,255,255,0.12)", "rgba(255,255,255,0.14)");
    });
  }

  if (wave === 5) {
    const css = [
      ["s5-shadow-card", "--shadow-card: 0 12px 40px rgba(27, 14, 16, 0.07)", "--shadow-card: 0 14px 44px rgba(27, 14, 16, 0.08)"],
      ["s5-shadow-hover", "--shadow-card-hover: 0 22px 64px rgba(27, 14, 16, 0.12)", "--shadow-card-hover: 0 24px 70px rgba(27, 14, 16, 0.14)"],
      ["s5-shadow-nav", "--shadow-nav: 0 14px 40px rgba(27, 14, 16, 0.09)", "--shadow-nav: 0 16px 44px rgba(27, 14, 16, 0.10)"],
      ["s5-radius-card", "--radius-card: 12px", "--radius-card: 10px"],
      ["s5-radius-lg", "--radius-card-lg: 16px", "--radius-card-lg: 14px"],
      ["s5-section", "--spacing-section: 88px", "--spacing-section: 84px"],
      ["s5-section-lg", "--spacing-section-lg: 128px", "--spacing-section-lg: 120px"],
      ["s5-display-ls", "--text-display--letter-spacing: -0.03em", "--text-display--letter-spacing: -0.032em"],
      ["s5-h1-ls", "--text-h1--letter-spacing: -0.025em", "--text-h1--letter-spacing: -0.028em"],
      ["s5-h2-ls", "--text-h2--letter-spacing: -0.02em", "--text-h2--letter-spacing: -0.022em"],
      ["s5-h3-ls", "--text-h3--letter-spacing: -0.015em", "--text-h3--letter-spacing: -0.018em"],
      ["s5-h4-ls", "--text-h4--letter-spacing: -0.01em", "--text-h4--letter-spacing: -0.012em"],
      ["s5-caption-ls", "--text-caption--letter-spacing: 0.04em", "--text-caption--letter-spacing: 0.06em"],
      ["s5-body-ls", "  letter-spacing: -0.011em;", "  letter-spacing: -0.012em;"],
      ["s5-motion-fast", "--motion-fast: 160ms", "--motion-fast: 150ms"],
      ["s5-motion-std", "--motion-standard: 380ms", "--motion-standard: 360ms"],
      ["s5-motion-slow", "--motion-slow: 640ms", "--motion-slow: 600ms"],
      ["s5-cream-muted", "color-mix(in srgb, var(--color-cream) 74%, transparent)", "color-mix(in srgb, var(--color-cream) 76%, transparent)"],
      ["s5-display-size", "--text-display: 4.25rem", "--text-display: 4.1rem"],
      ["s5-h1-size", "--text-h1: 2.75rem", "--text-h1: 2.65rem"],
      ["s5-h2-size", "--text-h2: 2.125rem", "--text-h2: 2.05rem"],
      ["s5-h3-size", "--text-h3: 1.5rem", "--text-h3: 1.45rem"],
      ["s5-body-lh", "--text-body--line-height: 1.7", "--text-body--line-height: 1.72"],
      ["s5-body-lg-lh", "--text-body-lg--line-height: 1.7", "--text-body-lg--line-height: 1.72"],
      ["s5-body-sm-lh", "--text-body-sm--line-height: 1.55", "--text-body-sm--line-height: 1.58"],
      ["s5-mobile-section", "--spacing-section: 68px", "--spacing-section: 64px"],
      ["s5-mobile-section-lg", "--spacing-section-lg: 84px", "--spacing-section-lg: 80px"],
    ];
    for (const [id, from, to] of css) addCss(id, from, to, id);
    addCss(
      "s5-serif-selector",
      "h1, h2, h3, h4, h5, h6,\n.font-display,\n.font-serif {",
      "h1, h2, h3, h4, h5, h6,\n.font-display {",
      "drop .font-serif from heading selector",
    );
    addCss(
      "s5-serif-selector2",
      "h1, h2, h3, h4, .font-display, .font-serif {",
      "h1, h2, h3, h4, .font-display {",
      "drop .font-serif from print selector",
    );
  }

  if (wave === 6) {
    const lattice = [
      ["lg:px-8", "lg:px-10"], ["sm:px-5", "sm:px-6"], ["sm:p-7", "sm:p-8"],
      ["md:gap-8", "md:gap-10"], ["lg:gap-10", "lg:gap-12"],
      ["max-w-7xl", "max-w-[72rem]"], ["max-w-3xl", "max-w-[48rem]"],
      ["max-w-2xl", "max-w-[42rem]"], ["max-w-xl", "max-w-[36rem]"],
      ["max-w-lg", "max-w-[32rem]"], ["max-w-md", "max-w-[28rem]"],
      ["max-w-sm", "max-w-[24rem]"], ["max-w-xs", "max-w-[20rem]"],
      ["hover:translate-x-0.5", "hover:translate-x-1"],
      ["focus:translate-x-0.5", "focus:translate-x-1"],
      ["bg-white/80", "bg-white/85"], ["border-brand-action/18", "border-brand-action/22"],
      ["border-brand-action/25", "border-brand-action/30"], ["border-brand/12", "border-brand/16"],
      ["border-brand/18", "border-brand/22"], ["bg-brand/6", "bg-brand/8"],
      ["bg-sage/10", "bg-sage/12"], ["bg-sage/12", "bg-sage/14"], ["bg-sage/16", "bg-sage/18"],
      ["border-sage/25", "border-sage/30"], ["border-sage/28", "border-sage/32"],
      ["border-sage/30", "border-sage/34"], ["border-sage/35", "border-sage/40"],
      ["group-hover:border-sage/40", "group-hover:border-sage/50"],
      ["text-cream/76", "text-cream/80"], ["text-cream/78", "text-cream/82"],
      ["text-cream/80", "text-cream/85"], ["text-cream/82", "text-cream/88"],
      ["text-cream/85", "text-cream/90"], ["text-cream/88", "text-cream/92"],
      ["text-cream/90", "text-cream/94"], ["text-cream/96", "text-cream"],
    ];
    for (const [from, to] of lattice) {
      addClass(`s6-${from}`, `${from}→${to}`, (cls, filePath) => {
        if (!hasToken(cls, from)) return null;
        if (/^(max-w-|lg:px-|sm:px-|sm:p-)/.test(from)) {
          const h = parseInt(fileHash(`s6:${from}:${filePath}:${cls}`).slice(0, 3), 16);
          if (h % 2 !== 0) return null;
        }
        return replaceToken(cls, from, to);
      });
    }
    addClass("s6-grid-gap2", "grid gap-2→gap-3 hash", (cls, filePath) => {
      if (!hasToken(cls, "grid") || !hasToken(cls, "gap-2")) return null;
      if (parseInt(fileHash(filePath + cls).slice(0, 2), 16) % 2 !== 0) return null;
      return replaceToken(cls, "gap-2", "gap-3");
    });
  }

  if (wave === 7) {
    addClass("s7-wg-sans", "text-warm-grey + font-sans", (cls) => {
      if (!hasToken(cls, "text-warm-grey") && !/text-warm-grey\//.test(cls)) return null;
      if (hasToken(cls, "font-sans") || hasToken(cls, "font-display") || hasToken(cls, "uppercase"))
        return null;
      if (!/\btext-(body|caption|body-sm|body-lg)\b/.test(cls)) return null;
      return injectToken(cls, "font-sans");
    });
    addClass("s7-shrink3", "h-3 w-3 + shrink-0", (cls) => {
      if (!hasToken(cls, "h-3") || !hasToken(cls, "w-3") || hasToken(cls, "shrink-0"))
        return null;
      return injectToken(cls, "shrink-0", { after: "w-3" });
    });
    addClass("s7-shrink6", "h-6 w-6 + shrink-0", (cls) => {
      if (!hasToken(cls, "h-6") || !hasToken(cls, "w-6") || hasToken(cls, "shrink-0"))
        return null;
      return injectToken(cls, "shrink-0", { after: "w-6" });
    });
    addClass("s7-shrink12", "h-12 w-12 + shrink-0", (cls) => {
      if (!hasToken(cls, "h-12") || !hasToken(cls, "w-12") || hasToken(cls, "shrink-0"))
        return null;
      return injectToken(cls, "shrink-0", { after: "w-12" });
    });
    addClass("s7-transition-all", "transition-all→transition-colors sparse", (cls, filePath) => {
      if (!hasToken(cls, "transition-all")) return null;
      if (/\bhover:-translate|hover:scale|active:scale|hover:shadow/.test(cls)) return null;
      if (parseInt(fileHash(filePath + cls).slice(0, 2), 16) % 2 !== 0) return null;
      return replaceToken(cls, "transition-all", "transition-colors");
    });
    addClass("s7-dur-all", "transition-* + duration-300", (cls) => {
      if (!/\btransition-(all|transform|opacity)\b/.test(cls) || /\bduration-/.test(cls))
        return null;
      return injectToken(cls, "duration-300");
    });
    addClass("s7-ease-rest", "remaining transition + ease", (cls) => {
      if (!/\btransition-/.test(cls) || /\bease-/.test(cls)) return null;
      return injectToken(cls, "ease-[var(--ease-apple)]");
    });
    addMap("s7-tone", [
      ["bg-white/85", "bg-white/90"],
      ["hover:bg-sage/18", "hover:bg-sage/20"],
      ["data-[state=checked]:font-medium", "data-[state=checked]:font-semibold"],
    ]);
    for (const [from, to] of [
      ["gap-1", "gap-1.5"], ["gap-2", "gap-2.5"], ["gap-3", "gap-3.5"], ["gap-4", "gap-5"],
    ]) {
      sparse(`s7-g-${from}`, `${from}→${to}`, from, to, 5, "all");
    }
    addMap("s7-space-y", [
      ["space-y-2", "space-y-2.5"], ["space-y-3", "space-y-3.5"],
      ["space-y-4", "space-y-5"], ["space-y-5", "space-y-6"],
      ["space-y-6", "space-y-7"], ["space-y-8", "space-y-10"],
    ]);
  }

  if (wave === 8) {
    addMap("s8-cream", [
      ["text-cream/64", "text-cream/70"],
      ["text-cream/76", "text-cream/80"],
      ["text-cream/78", "text-cream/82"],
    ]);
    addClass("s8-ring-offset-cream", "ring-offset + cream", (cls) => {
      if (
        !hasToken(cls, "focus-visible:ring-offset-2") ||
        hasToken(cls, "focus-visible:ring-offset-cream") ||
        hasToken(cls, "focus-visible:ring-offset-ink") ||
        hasToken(cls, "ring-offset-cream") ||
        hasToken(cls, "ring-offset-ink")
      )
        return null;
      if (/\bring-offset-ink\b|ring-cream|text-cream|bg-ink|bg-brand\b/.test(cls))
        return null;
      return injectToken(cls, "focus-visible:ring-offset-cream", {
        after: "focus-visible:ring-offset-2",
      });
    });
    addClass("s8-caption-weight", "caption uppercase + font-semibold", (cls) => {
      if (!hasToken(cls, "text-caption") || !hasToken(cls, "uppercase")) return null;
      if (/\bfont-(?:medium|semibold|bold)\b/.test(cls)) return null;
      return injectToken(cls, "font-semibold", { before: "uppercase" });
    });
    addClass("s8-caption-leading", "caption + leading-snug", (cls) => {
      if (!hasToken(cls, "text-caption") || /\bleading-/.test(cls)) return null;
      return injectToken(cls, "leading-snug", { after: "text-caption" });
    });
    addClass("s8-pill-px", "rounded-pill missing px→px-5", (cls) => {
      if (!hasToken(cls, "rounded-pill")) return null;
      if (/\bpx-/.test(cls) || /\bp-\d/.test(cls)) return null;
      if (!/\b(?:h-10|h-11|h-12|min-h-)\b/.test(cls)) return null;
      return injectToken(cls, "px-5", { after: "rounded-pill" });
    });
    for (const [from, to] of [
      ["mt-2", "mt-2.5"], ["mt-3", "mt-3.5"], ["mt-4", "mt-5"],
      ["mb-2", "mb-2.5"], ["mb-3", "mb-3.5"], ["mb-4", "mb-5"],
      ["pt-4", "pt-5"], ["pb-4", "pb-5"], ["py-4", "py-5"],
      ["px-2", "px-2.5"], ["px-3", "px-3.5"], ["p-3", "p-3.5"], ["p-4", "p-5"],
    ]) {
      sparse(`s8-sp-${from}`, `${from}→${to}`, from, to, 4, "nonsection");
    }
    addMap("s8-grad", [
      [
        "bg-[linear-gradient(135deg,#a5273f,#6f1726)]",
        "bg-[linear-gradient(135deg,var(--color-brand-action),var(--color-brand-dark))]",
      ],
    ]);
    addClass("s8-minw0", "truncate + min-w-0", (cls) => {
      if (!/\b(?:truncate|break-words|text-ellipsis)\b/.test(cls)) return null;
      if (hasToken(cls, "min-w-0")) return null;
      return injectToken(cls, "min-w-0");
    });
    addMap("s8-hover", [
      ["hover:bg-brand-mist", "hover:bg-brand-mist/90"],
      ["hover:border-brand-light", "hover:border-brand-light/80"],
      ["hover:border-brand-action", "hover:border-brand-action/80"],
    ]);
  }

  if (wave === 9) {
    addMap("s9-cream", [
      ["text-cream/80", "text-cream/84"], ["text-cream/82", "text-cream/86"],
      ["text-cream/85", "text-cream/88"], ["text-cream/88", "text-cream/90"],
      ["text-cream/90", "text-cream/92"], ["text-cream/92", "text-cream/94"],
      ["text-cream/94", "text-cream"], ["bg-cream/12", "bg-cream/14"],
      ["bg-cream/14", "bg-cream/16"], ["bg-cream/24", "bg-cream/28"],
      ["border-cream/20", "border-cream/22"], ["border-cream/22", "border-cream/24"],
    ]);
    addMap("s9-type", [
      ["tracking-[-0.025em]", "tracking-[-0.028em]"],
      ["tracking-[-0.02em]", "tracking-[-0.024em]"],
      ["tracking-[-0.03em]", "tracking-[-0.032em]"],
      ["tracking-[-0.035em]", "tracking-[-0.032em]"],
      ["tracking-[0.01em]", "tracking-[-0.01em]"],
      ["tracking-[0.02em]", "tracking-[-0.01em]"],
      ["leading-[0.92]", "leading-[0.96]"], ["leading-[0.98]", "leading-[1.0]"],
      ["leading-[1.02]", "leading-[1.05]"], ["leading-[1.04]", "leading-[1.06]"],
      ["leading-[1.06]", "leading-[1.08]"], ["leading-[1.08]", "leading-[1.1]"],
    ]);
    addClass("s9-display-weight", "display missing font-semibold", (cls) => {
      if (!isDisplayClass(cls)) return null;
      if (/\bfont-(?:medium|semibold|bold|light)\b/.test(cls)) return null;
      return injectToken(cls, "font-semibold", { after: "font-display" });
    });
    addClass("s9-body-track", "body + tracking-[-0.011em]", (cls) => {
      if (!isBodyCopyClass(cls) || /\btracking-/.test(cls)) return null;
      return injectToken(cls, "tracking-[-0.011em]");
    });
    for (const [from, to] of [
      ["gap-2.5", "gap-3"], ["gap-3.5", "gap-4"], ["mt-2.5", "mt-3"],
      ["mt-3.5", "mt-4"], ["mb-2.5", "mb-3"], ["py-2.5", "py-3"],
      ["py-3.5", "py-4"], ["px-3.5", "px-4"], ["p-3.5", "p-4"], ["p-7", "p-8"],
    ]) {
      sparse(`s9-sp-${from}`, `${from}→${to}`, from, to, 3, "all");
    }
    addMap("s9-misc", [
      ["underline-offset-4", "underline-offset-[3px]"],
      ["backdrop-blur-xl", "backdrop-blur-2xl"],
    ]);
  }

  if (wave === 10) {
    addMap("s10-safe", [
      ["focus-visible:ring-offset-2", "focus-visible:ring-offset-[3px]"],
      ["lg:tracking-[0.02em]", "lg:tracking-[-0.01em]"],
      ["sm:text-[1.42rem]", "sm:text-[1.35rem]"],
      ["text-[1.25rem]", "text-[1.2rem]"],
      ["text-[0.56rem]", "text-[0.6rem]"],
      ["min-h-[100svh]", "min-h-[100dvh]"],
      ["min-h-[420px]", "min-h-[400px]"],
      ["min-h-[360px]", "min-h-[340px]"],
      ["min-h-[520px]", "min-h-[480px]"],
      ["min-h-[330px]", "min-h-[300px]"],
      ["min-h-[250px]", "min-h-[240px]"],
      ["w-44", "w-40"],
      ["bg-white/75", "bg-white/80"],
      ["bg-white/90", "bg-white/92"],
      ["bg-cream/[0.04]", "bg-cream/[0.06]"],
    ]);
    addClass("s10-outline", "focus-visible:outline-none inject", (cls) => {
      if (!hasToken(cls, "outline-none")) return null;
      if (/\bfocus-visible:outline-none\b/.test(cls)) return null;
      if (!/\bfocus-visible:/.test(cls)) return null;
      return injectToken(cls, "focus-visible:outline-none");
    });
    addClass("s10-select-none", "decorative + select-none", (cls) => {
      if (!/pointer-events-none/.test(cls) || hasToken(cls, "select-none")) return null;
      if (!/font-display|text-\[/.test(cls)) return null;
      return injectToken(cls, "select-none");
    });
    addClass("s10-any-soft-shadow", "soft shadow→shadow-card", (cls) => {
      const m = cls.match(/shadow-\[0_\d+px_\d+px_rgba\(27,14,16,0\.0[4-9]\)\]/);
      if (!m) return null;
      return replaceToken(cls, m[0], "shadow-card");
    });
    addClass("s10-any-hover-shadow", "strong shadow→shadow-card-hover", (cls) => {
      const m = cls.match(/shadow-\[0_(?:2[4-9]|3\d)px_\d+px_rgba\([^)]+\)\]/);
      if (!m) return null;
      return replaceToken(cls, m[0], "shadow-card-hover");
    });
    addClass("s10-wrap-gap", "flex-wrap gap-2→gap-2.5", (cls) => {
      if (!hasToken(cls, "flex-wrap") || !hasToken(cls, "gap-2")) return null;
      return replaceToken(cls, "gap-2", "gap-2.5");
    });
    addMap("s10-gap", [
      ["gap-x-5", "gap-x-6"], ["gap-y-2", "gap-y-2.5"],
      ["gap-y-3", "gap-y-4"], ["space-x-2", "space-x-2.5"], ["space-x-3", "space-x-4"],
    ]);
  }

  return rules;
}

function quotesBalanced(before, after) {
  const count = (s, ch) => {
    let n = 0;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === "\\") {
        i++;
        continue;
      }
      if (s[i] === ch) n++;
    }
    return n;
  };
  return (
    count(before, '"') % 2 === count(after, '"') % 2 &&
    count(before, "'") % 2 === count(after, "'") % 2 &&
    count(before, "`") % 2 === count(after, "`") % 2 &&
    (before.match(/\{/g) || []).length === (after.match(/\{/g) || []).length &&
    (before.match(/\}/g) || []).length === (after.match(/\}/g) || []).length
  );
}

function run() {
  ensureLog();
  const startMax = readMaxN(fs.readFileSync(LOG_PATH, "utf8"));
  const files = walk(SRC);
  let batch = [];
  let applied = 0;
  console.log(
    `Polish loop — ${files.length} files, log @#${startMax}, target ≥${TARGET_MIN}`,
  );

  for (let wave = 1; wave <= 10; wave++) {
    if (applied >= MAX_LOOPS) break;
    const rules = buildRules(wave);
    let waveHits = 0;
    let progress = true;
    while (progress && applied < MAX_LOOPS) {
      progress = false;
      for (const filePath of files) {
        if (applied >= MAX_LOOPS) break;
        let content = fs.readFileSync(filePath, "utf8");
        for (const rule of rules) {
          const result = rule.apply(content, filePath);
          if (!result || result.content === content) continue;
          if (!quotesBalanced(content, result.content)) continue;
          fs.writeFileSync(filePath, result.content, "utf8");
          content = result.content;
          batch.push({
            path: rel(filePath),
            ruleId: rule.id,
            brief: result.brief || rule.brief,
          });
          applied += 1;
          waveHits += 1;
          progress = true;
          if (batch.length >= 50) {
            appendLogs(batch);
            console.log(`  … ${applied} (wave ${wave})`);
            batch = [];
          }
          break;
        }
      }
    }
    console.log(`Wave ${wave}: +${waveHits} (total ${applied})`);
    if (applied >= TARGET_SOFT) break;
  }
  if (batch.length) appendLogs(batch);
  const maxN = readMaxN(fs.readFileSync(LOG_PATH, "utf8"));
  console.log(`Done. New loops: ${applied}. Log max #${maxN}`);
  if (applied < TARGET_MIN) console.warn(`Below target (${applied} < ${TARGET_MIN}).`);
}

run();
