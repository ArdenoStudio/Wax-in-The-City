---
name: Wax In The City SL
description: Sharper private salon glamour for appointment-led waxing and skin care in Colombo.
colors:
  oxblood-deep: "#2b0710"
  wine-action: "#a20f37"
  pressed-wine: "#17070b"
  blush-highlight: "#ffd6de"
  blush-mist: "#fce5ec"
  pearl-blush: "#fff7f9"
  pearl-shadow: "#f8edf1"
  warm-ink: "#1f171a"
  muted-plum: "#65565d"
  powder-border: "#ead7df"
  antique-gold: "#d9b35f"
  muted-sage: "#a3a981"
typography:
  display:
    fontFamily: "Cal Sans, Inter, system-ui, sans-serif"
    fontSize: "clamp(3.2rem, 8vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Cal Sans, Inter, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.6vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.08
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: "0.04em"
rounded:
  card: "12px"
  pill: "9999px"
spacing:
  section: "80px"
  section-lg: "120px"
  control-sm: "10px 16px"
  control-md: "12px 24px"
  control-lg: "16px 32px"
components:
  button-primary:
    backgroundColor: "{colors.wine-action}"
    textColor: "{colors.pearl-blush}"
    rounded: "{rounded.pill}"
    padding: "{spacing.control-lg}"
    height: "56px"
  button-outline:
    backgroundColor: "#ffffff59"
    textColor: "{colors.wine-action}"
    rounded: "{rounded.pill}"
    padding: "{spacing.control-md}"
  field:
    backgroundColor: "#ffffffdb"
    textColor: "{colors.warm-ink}"
    rounded: "{rounded.card}"
    padding: "12px 16px"
    height: "48px"
  card-premium:
    backgroundColor: "{colors.pearl-blush}"
    textColor: "{colors.warm-ink}"
    rounded: "{rounded.card}"
---

# Design System: Wax In The City SL

## 1. Overview

**Creative North Star: "The Private Dressing Room"**

The system should feel like stepping behind a velvet curtain into a private appointment room: dark wine, pearled blush, precise gold, and confident type. It is sharper and more glamorous than a soft pink salon template, but it still protects the guest's sense of calm and privacy.

The site uses brand drama at the edges: the hero, booking calls to action, nav states, and focused treatment moments. Most content stays measured and readable so privacy, hygiene, locations, and booking paths are never buried under decoration. The system explicitly rejects generic pink salon templates, overdone glass and cursor effects, fake luxury wording, and stock-photo sameness.

**Key Characteristics:**

- Dark wine brand fields with pearled blush relief.
- Fashion-label display type paired with clean appointment-system body type.
- Tight, quiet components with 10px cards and pill CTAs only where the action deserves it.
- Motion that feels like a composed reveal, not a hover toy.

## 2. Colors

The palette is a committed wine-and-pearl system: oxblood carries the brand, blush surfaces create softness, and gold is used like jewelry, never confetti.

### Primary

- **Oxblood Deep**: the brand field for hero overlays, footer depth, logo chips, and high-contrast salon drama.
- **Wine Action**: the booking and conversion accent. It belongs on primary CTAs, active states, focus rings, and selected chips.

### Secondary

- **Blush Highlight**: a soft highlight for badges and text over dark hero surfaces.
- **Antique Gold**: a controlled premium detail for hygiene icons, dividers, and small moments of ceremony.

### Tertiary

- **Muted Sage**: a calm counter-color for trust and after-care signals when the page needs relief from wine and blush.

### Neutral

- **Pearl Blush**: the default body surface, intentionally cleaner than beige.
- **Pearl Shadow**: alternating section surface.
- **Warm Ink**: body text, never pure black.
- **Muted Plum**: secondary text, labels, captions, and inactive copy.
- **Powder Border**: structural borders and field strokes.

### Named Rules

**The Jewelry Rule.** Gold is an accent, not a theme. If a section uses more than one gold element, one must become wine or plum.

**The No Candy Pink Rule.** Pink may be pearl or blush, never bubblegum, neon, or cosmetic-template pink.

## 3. Typography

**Display Font:** Cal Sans
**Body Font:** Inter
**Label/Mono Font:** Inter

**Character:** Display type should read like a modern private studio mark — geometric Cal Sans with tight tracking. Body type is Inter: clear, appointment-ready, calm.

### Hierarchy

- **Display** (600, clamp(3.2rem, 8vw, 6rem), 0.96): hero headlines and rare first-viewport brand statements only.
- **Headline** (600, clamp(2rem, 4.6vw, 4rem), 1.08): page heroes and major section titles.
- **Title** (600, 1.5rem, 1.3): cards, forms, and repeated content groups.
- **Body** (400, 1rem, 1.75): service descriptions, branch copy, FAQ answers. Keep long prose under 75ch.
- **Label** (700, 0.75rem, 0.08em): short badges and field support labels. Do not use long all-caps sentences.

### Named Rules

**The One Dramatic Voice Rule.** Let Cal Sans own display glamour. Do not add decorative scripts, drop caps, or extra typefaces beyond Cal Sans + Inter.

## 4. Elevation

Elevation is hybrid: forms and cards use soft ambient lift, while the hero and nav use controlled blur only where layering needs it. Glass is allowed for the hero protocol panel and floating nav, but it is forbidden as the default card treatment across every section.

### Shadow Vocabulary

- **Card Rest** (`shadow-card` / `0 14px 44px rgba(27, 14, 16, 0.08)`): default service, branch, and form surfaces.
- **Card Hover** (`shadow-card-hover` / `0 24px 70px rgba(27, 14, 16, 0.14)`): hover lift for repeated cards.
- **Nav Float** (`shadow-nav` / `0 16px 44px rgba(27, 14, 16, 0.10)`): sticky nav surface after scroll.
- **Hero Glass** (`inset 0 1px 0 rgba(255,255,255,0.16), 0 24px 70px rgba(0,0,0,0.22)`): dark hero panels only.

### Named Rules

**The Blur Has a Job Rule.** Backdrop blur is allowed only when it separates interface from photography or dark hero content. Decorative blur on ordinary cards is prohibited.

## 5. Components

### Buttons

- **Shape:** pill for primary actions and compact nav CTAs (9999px radius).
- **Primary:** wine gradient with pearl text, 56px height for major booking actions.
- **Hover / Focus:** slight lift, stronger ambient shadow, visible wine focus ring, and a restrained sweep.
- **Secondary / Ghost:** outline or cream-on-dark only. Ghost buttons must remain legible over photography.

### Chips

- **Style:** small, rounded, bordered, and low-contrast until selected.
- **State:** selected chips use blush mist or wine action, never bright pink.

### Cards / Containers

- **Corner Style:** 10px (`rounded-card`). Cards should feel tailored, not bubbly.
- **Background:** pearl blush or white with subtle border.
- **Shadow Strategy:** ambient lift at rest, stronger lift only on meaningful hover.
- **Border:** powder border, usually 1px.
- **Internal Padding:** 24px to 32px on desktop, 20px to 24px on mobile.

### Inputs / Fields

- **Style:** 48px height, 8px radius, white pearl field, plum placeholder.
- **Focus:** wine border plus a soft ring. Focus must be visible on keyboard.
- **Error / Disabled:** error copy uses the semantic error token; disabled state reduces opacity and blocks interaction.

### Navigation

- Desktop nav starts transparent over the hero, then condenses into a pill with pearl blur after scroll. Mobile uses a sheet with large Cal Sans route links and a direct booking CTA. Active links use blush or cream contrast, not underlines alone.

### Signature Component

The homepage hero combines full-bleed treatment-room photography, a typographic reveal, a decisive booking CTA, and a protocol panel. This is the brand's front door. It must feel glamorous but still answer practical booking questions.

## 6. Do's and Don'ts

### Do:

- **Do** make the first viewport say privacy, hygiene, and appointment-led care before it says beauty.
- **Do** use oxblood and pearl as the main brand contrast, with gold as a controlled detail.
- **Do** keep card corners at 10px and use pill shapes only for actions, chips, and nav containers.
- **Do** respect reduced motion and keep motion available as enhancement, not a requirement to read content.
- **Do** treat branch details, reviews, and photos as client-confirmed content only.

### Don't:

- **Don't** use generic pink salon templates.
- **Don't** use overdone glass and cursor effects.
- **Don't** use fake luxury wording.
- **Don't** rely on stock-photo sameness when client photography becomes available.
- **Don't** repeat tiny uppercase tracked labels above every section heading.
- **Don't** hide booking reliability problems behind success messages.
