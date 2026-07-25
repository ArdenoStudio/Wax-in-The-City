# Improvement Loop (target 200)

## Completed

- [x] #1 layout.tsx: `lang="en-LK"`; main `pb-20 md:pb-0`
- [x] #2 globals.css: section scroll-margin; `.text-cream-muted`; marquee focus-within pause; marquee-slow in reduced-motion
- [x] #3 HeroSection: brand-first eyebrow `Wax In The City · Ladies-only Colombo` (serif on brand)
- [x] #4 HeroSection: supporting copy — private rooms, fresh wax, confirmation
- [x] #5 HeroSection: static trust list + ShieldCheck gold icons (no pressable/hover lift)
- [x] #6 HeroSection: WhatsApp ghost CTA via whatsappLink + WhatsappIcon
- [x] #7 HeroSection: protocol badge `Confirmation within 24h · WhatsApp for same-day`
- [x] #8 HeroSection: `min-h-[100svh]` (padding kept)
- [x] #9 HeroSection: gate `animate-float-soft` with `!reduceMotion`
- [x] #10 HeroSection: Image `priority`; ServicesGrid `#services` + `scroll-mt-24` (also global section scroll-margin)
- [x] #11 LoadingScreen: hold 700ms (400 reduce); aria-busy + aria-live; skip on saveData
- [x] #12 Navbar: close sheet on pathname change; aria-expanded on menu button
- [x] #13 Navbar: mobile aria-current uses startsWith like desktop
- [x] #14 Navbar: desktop WhatsApp ghost icon when `!scrolled` on sm+
- [x] #15 Navbar: scrolled pill `border-warm-border/80`
- [x] #16 Navbar: Wax / In The City tracking polish on lg+
- [x] #17 MobileBookingBar: hide on `/book` via usePathname
- [x] #18 MobileBookingBar: label "Request a time"; WhatsApp aria-label "WhatsApp — fastest booking"
- [x] #19 MobileBookingBar: role="region" aria-label="Quick booking"; pathname-aware WhatsApp message
- [x] #20 MobileBookingBar: hide when `#book` in view (IntersectionObserver)
- [x] #21 AnimatedSection: `initial={reduceMotion ? false : "hidden"}`
- [x] #22 animations.ts: viewportOnce margin `-10% 0px`; fadeUp duration 0.55
- [x] #23 animations.ts: add fadeUpFast (duration 0.45)
- [x] #24 marquee-strip.tsx: sr-only words; focus-within pause class; decorative tracks aria-hidden
- [x] #25 page.tsx: MarqueeStrip between Hero and ServicesGrid
- [x] #26 Footer: branch names → `/locations/[slug]`; tel: link in brand column
- [x] #27 Footer: WhatsApp pill CTA "Book via WhatsApp" in brand column
- [x] #28 Footer: weekend hours; Nugegoda pending-address caption; text-cream-muted for low-contrast lines
- [x] #29 Footer: bottom band — copyright, tel, /contact, /faq; Ardeno credit kept
- [x] #30 Footer: Contact under Explore via NAV_LINKS (already present; FAQ/Contact visible)
- [x] #31 SkipLink: wine focus styles already present — polished ring/border
- [x] #32 JsonLd.tsx: FAQPage schema from FAQ_GROUPS
- [x] #33 faq.ts: softened comfort claims; first-time, cancellation, what-to-bring FAQs
- [x] #34 site.ts REVIEW_THEMES: "Guests commonly mention" (not "Public reviews often")
- [x] #35 site.ts: softened Moroccan / Hydra claims
- [x] #36 site.ts: TRUST_PILLARS titles stay; bodies already clear
- [x] #37 site.ts: `isAddressPending(branch)` helper (already present — kept broader matcher)
- [x] #38 site.ts: `formatPriceFrom(n)` LKR helper
- [x] #39 images.ts: BLUR_DATA_URL tinted to #2b0710 wine
- [x] #40 SmoothScrollProvider: comment only (Window.lenis typed by package); Hero uses native scrollIntoView block start

Completed homepage / section complement items.

- [x] #41 ServicesGrid: add scroll-mt-24 on #services section.
- [x] #42 ServicesGrid: remove Positioning premium-surface sticky card; keep heading + Full menu CTA only.
- [x] #43 ServicesGrid: aria-label on category links with name + from price; duration teaser from shortest SERVICE in category.
- [x] #44 ServicesGrid: focus-visible ring styles on category Links matching hover.
- [x] #45 section-heading.tsx: add showEyebrow?: boolean default true; when false hide eyebrow.
- [x] #46 TrustStrip / BranchSelector / ReviewThemes / GalleryTeaser / AboutTeaser: showEyebrow={false} (Trust + Services + Branches + others).
- [x] #47 TrustStrip: h3 titles use font-serif text-h4.
- [x] #48 TrustStrip: remove per-card 0{i+1} and gold underline grow; keep icon gold only; add Studio standard footer hairline.
- [x] #49 TrustStrip: link under grid to /faq for hygiene room prep with sage accent.
- [x] #50 BeforeAfterShowcase: remove meta Approved result photos from visitor PROOF_POINTS; caption footnote text-cream/50.
- [x] #51 BeforeAfterShowcase: rounded-card (8px) not 18px; drop floating -inset-4 frame.
- [x] #52 BeforeAfterSlider: aria-label on slider; focus styles on handle.
- [x] #53 BeforeAfterSlider: move Before/After labels below media (not overlaid stickers).
- [x] #54 branch-card.tsx: pending address badge using isAddressPending; hide Maps CTA when pending.
- [x] #55 branch-card.tsx: Open in Maps link when confirmed; weekend hours in compact variant.
- [x] #56 BranchSelector: weekend hours visible via branch-card.
- [x] #57 ReviewThemes: soften Public reviews copy; caption disclaimer about themes vs quotes.
- [x] #58 ReviewThemes: CTA row FAQ hygiene + Gallery links.
- [x] #59 GalleryTeaser: wrap tiles in Link to /gallery with aria-label; mobile aspect 4/5; no row-span-2 below lg.
- [x] #60 AboutTeaser: brand in H2; link privacy words to /faq.
- [x] #61 page.tsx: FAQ teaser before BookingZone via FAQTeaser section.
- [x] #62 FAQAccordion: optional groups?: FaqGroup[]; defaultOpen?: string; denser trigger text-h4.
- [x] #63 BookingZone: WhatsApp-only dual CTAs WhatsApp + Link /book; drop empty minHeight 480 for whatsapp-only.
- [x] #64 BookingZone: ladies-only assurance line near primary CTA.
- [x] #65 BookingZone: Cult-style oxblood side panel polish — pearl type, no multicolor.
- [x] #66 BookingForm: min date today on preferred_date; autocomplete name/tel; inputMode tel.
- [x] #67 BookingForm: progressbar aria attributes; remove noisy Done chips.
- [x] #68 BookingForm: success copy Request received — we'll confirm next.; link to /services; WhatsApp with prefilled context.
- [x] #69 BookingForm: show selected branch hours helper under branch select.
- [x] #70 BookingForm: use ShimmerButton only on submit.
- [x] #71 ContactForm: aria-live polite on success/error; WhatsApp secondary on success.
- [x] #72 PageHero: optional CTA slot; blur placeholder if missing image.
- [x] #73 StatsCounter: respect reduced motion (instant final values).
- [x] #74 ServiceTabs: sync hash #waxing etc and scroll into view.
- [x] #75 service-card: include branch query when branch prop set.
- [x] #76 GalleryGrid: trap focus in lightbox; reset active on filter change.
- [x] #77 ui/button: focus-visible wine ring consistent.
- [x] #78 ui/input + textarea: focus wine border + ring; placeholder plum.
- [x] #79 ui/accordion: trigger denser on mobile.
- [x] #80 Create FAQTeaser.tsx used on homepage with top FAQs + All questions link.

## Secondary pages (81–120)

- [x] #81 faq/page.tsx: hero image from IMAGES not raw Unsplash.
- [x] #82 gallery/page.tsx: hero from IMAGES.
- [x] #83 faq page: sticky category jump list (enhanced FAQAccordion).
- [x] #84 FAQAccordion: support ?q= or hash deep-link open matching item.
- [x] #85 book/page.tsx: add compact PageHero before BookingZone.
- [x] #86 contact/page.tsx: tel: links on phones.
- [x] #87 contact: branch cards link to /locations/[slug].
- [x] #88 locations/page.tsx: View studio Link to detail; weekend hours on cards.
- [x] #89 locations/[branch]: maps query use full address; sibling branch pill; address pending note.
- [x] #90 about/page.tsx: distinct images hero vs story; branch mini-cards link to locations; soften 24h SLA copy.
- [x] #91 services/page.tsx: demote floating label pills on tiles if cluttering.
- [x] #92 services/[slug]: pass defaultService into BookingZone; OG images from category; after-care accordion tip.
- [x] #93 services/[slug]: honest process strip for Moroccan/Hydra if missing before/after.
- [x] #94 gallery page: editorial placeholder caption; events category honesty in gallery.ts.
- [x] #95 not-found.tsx: quick links Services/Locations/FAQ; wine radial atmosphere background.
- [x] #96 JsonLd: OfferCatalog/Service from public services with "from" prices; omit Nugegoda street if pending.
- [x] #97 locations/[branch] generateMetadata OG per branch.
- [x] #98 services/[slug] generateMetadata OG per category.
- [x] #99 about: Care journey quiet steps Arrive→Prep→Care→After-care (muted gold/wine).
- [x] #100 contact: hours table with open-today hint if easy.
- [x] #101 book: booking reassurance 3-step Request→Review→Confirm above form.
- [x] #102 faq: client search input filtering questions (useDeferredValue).
- [x] #103 gallery: filter chips polish selected wine/blush.
- [x] #104 services page: sticky category rail polish.
- [x] #105 locations index: WhatsApp per branch prefilled.
- [x] #106 about page: gold hairline timeline instead of cards — keep one purpose.
- [x] #107 PageHero brand-first: SITE.shortName as strong signal.
- [x] #108 All PageHero usages: ensure brand visible.
- [x] #109 Mobile nav sheet: Home link.
- [x] #110 Footer social pressable micro-lift class.
- [x] #111 robots/sitemap already exist — verify sitemap includes all routes; fix if missing.
- [x] #112 SkipLink target focus outline wine.
- [x] #113 template.tsx: ensure reduced motion respected for page fade.
- [x] #114 admin page: leave utilitarian — no Tremor; optional tiny polish only if safe.
- [x] #115 booking.ts: zod refine preferred_date not in past if schema exists.
- [x] #116 form-a11y.ts: ensure helpers used in forms.
- [x] #117 ContactForm: autocomplete fields.
- [x] #118 GalleryGrid: keyboard arrows already? add if missing.
- [x] #119 Branch detail: copy address button with inline Copied state (no toast lib).
- [x] #120 Homepage BookingZone id="book" for MobileBookingBar observer.

## Complements (121–160)

- [x] #121 globals.css: `.hairline-wine` utility (1px wine/powder gradient line).
- [x] #122 HeroSection: CTA group stacks cleanly on very small screens (gap/padding).
- [x] #123 HeroSection: reduceMotion shows headline lines at once without y stagger.
- [x] #124 ServicesGrid: empty-state calm studio-plate if categories empty.
- [x] #125 TrustStrip: section id="trust" for anchors.
- [x] #126 BranchSelector: section id="locations-teaser".
- [x] #127 ReviewThemes: section id="reviews".
- [x] #128 GalleryTeaser: section id="gallery-teaser".
- [x] #129 AboutTeaser: section id="about-teaser".
- [x] #130 FAQTeaser: section id="faq-teaser".
- [x] #131 BookingZone: clearer WhatsApp same-day note near CTA.
- [x] #132 BookingForm: textarea auto-grow max height for notes field.
- [x] #133 ContactForm: character-friendly error copy polish (contactSchema).
- [x] #134 Navbar: compact Book icon link on xs; labeled Book from sm+.
- [x] #135 Footer: social hover gold border sparingly (rel noopener kept).
- [x] #136 PageHero: min-h-[42vh] mobile polish with sm min-heights.
- [x] #137 not-found: SITE.shortName brand-first.
- [x] #138 LoadingScreen: logo alt = SITE.name.
- [x] #139 lib/site.ts: export BOOKING_STEPS = Request/Review/Confirm.
- [x] #140 book page: use BOOKING_STEPS constant from site.
- [x] #141 faq page: empty search result message calm.
- [x] #142 gallery: lightbox close button 44px hit target.
- [x] #143 GalleryGrid: swipe hint text for mobile once.
- [x] #144 Service detail sticky CTA column on desktop.
- [x] #145 services page intro copy tighten one sentence.
- [x] #146 locations page intro tighten.
- [x] #147 about page: remove redundant card borders (one job per section).
- [x] #148 contact page: WhatsApp primary emphasis.
- [x] #149 JsonLd: BreadcrumbList helper (skip SearchAction — no site search).
- [x] #150 BreadcrumbList JSON-LD on services/[slug] and locations/[branch].
- [x] #151 Select: blush mist hover/highlight rows.
- [x] #152 Sheet: close button size 44px (Radix focus trap kept).
- [x] #153 accordion content prose max-w measure 65ch.
- [x] #154 button primary: disabled opacity via pressable + disabled styles.
- [x] #155 shimmer-button: pause animation on prefers-reduced-motion.
- [x] #156 Marquee: add "Private Rooms" to MARQUEE_WORDS.
- [x] #157 REVIEW_THEMES: no star numbers rendered (theme titles only).
- [x] #158 BeforeAfter: caption "Illustrative care imagery" always visible.
- [x] #159 StatsCounter: format numbers with en-LK locale.
- [x] #160 print styles in globals.css: hide nav/footer/booking bar/loading; keep serif headings.

## Complements wave (161–200)

- [x] #161 CareJourney.tsx extracted from about; spacing polish on Arrive→Prep→Care→After-care
- [x] #162 FAQTeaser: AnimatedSection fadeUpFast
- [x] #163 BookingZone: aria-labelledby="booking-heading" + SectionHeading titleId
- [x] #164 Hero protocol mobile accordion default closed; gold ShieldCheck icons
- [x] #165 ServicesGrid: light wine hover borders on category rows
- [x] #166 TrustStrip: gold hygiene icons; muted sage for skin-first / after-care pillar
- [x] #167 Branch cards: WhatsApp prefilled with branch name (verified)
- [x] #168 GalleryTeaser: stronger wine “View gallery” CTA
- [x] #169 AboutTeaser: /about CTA with icon-drift ArrowRight
- [x] #170 ReviewThemes: no numeric ratings (themes + index only)
- [x] #171 FAQAccordion: aria-label on each accordion root
- [x] #172 Contact HoursTable: closed on Poya called out in caption
- [x] #173 Book PageHero: WhatsApp for urgent same-day timing
- [x] #174 Locations detail: weekday / weekend / Poya hours hierarchy
- [x] #175 services/[slug]: formatPriceFrom for category from-price
- [x] #176 service-card: formatPriceFrom
- [x] #177 formatPriceFrom / formatLKR* use en-LK
- [x] #178 Metadata description length check (~120–160) in layout
- [x] #179 robots.ts: allow public routes; disallow /admin
- [x] #180 sitemap: lastModified + priority/frequency polish
- [x] #181 next.config: Unsplash remotePatterns verified (still used)
- [x] #182 eslint/tsc clean for this batch
- [x] #183 Soft-wax / fresh-wax honesty double-check (FAQ + full-body copy)
- [x] #184 Hydra / Moroccan category + service copy honesty
- [x] #185 Nugegoda pending-address messaging aligned (footer / card / locations)
- [x] #186 MobileBookingBar z-40 below Sheet; safe-area pb kept
- [x] #187 Sheet overlay z-[60] above Navbar z-50 and bar z-40
- [x] #188 SkipLink: sr-only until focus (verified + .sr-only utility)
- [x] #189 SmoothScrollProvider: Lenis disabled under prefers-reduced-motion (+ change listener)
- [x] #190 template.tsx page transition duration 0.35
- [x] #191 globals: ::selection wine; input/textarea selection too
- [x] #192 .sr-only / .not-sr-only utilities in globals
- [x] #193 Hero scroll chevron: title + aria-label
- [x] #194 Footer privacy link → /contact#privacy
- [x] #195 Contact: id="privacy" private-review note
- [x] #196 BookingForm privacy note under submit
- [x] #197 Gallery filter “Studio” (+ honest categories from gallery.ts)
- [x] #198 Admin not in NAV_LINKS (verified)
- [x] #199 PRODUCT.md brand test: hero brand + privacy in first viewport
- [x] #200 Wave complete summary below

## Wave complete

**200/200** improvement loops recorded for Wax In The City SL (wine/pearl brand).

- Loops **1–120**: earlier commits on this branch
- Loops **121–160**: parallel complement batch (section anchors, sticky service CTA, breadcrumbs, print styles, etc.)
- Loops **161–200**: CareJourney extract, a11y/pricing/privacy/z-index/honesty polish

### Complement sources used

| Source | Patterns applied |
|---|---|
| HyperUI | Form helpers, contact/hours blocks, tel links |
| FAQ Sections | Homepage teaser, accordion a11y labels, deep-link FAQ |
| Footers | Branch IA, privacy link, WhatsApp CTA |
| React Bits | fadeUpFast reveals, marquee a11y, compare framing |
| Apple Cards Carousel | Clean gallery media rhythm |
| shadcnblocks | Booking/contact success + privacy notes |
| Cult UI (restrained) | Oxblood/pearl BookingZone + PageHero fields |
| Icons (Lucide) | Gold hygiene / sage after-care trust icons |
| Better Design Tips | Honest copy, brand-first hero, contrast |
| 21st.dev | Booking reassurance steps, CareJourney |

Rejected installs remain: DaisyUI, Tremor, Watermelon UI kits, fake reviews, purple/glow AI defaults.
