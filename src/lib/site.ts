/**
 * Single source of truth for site content.
 * Placeholders per the master build prompt — swap when the client delivers
 * real addresses, phone numbers, and copy. Phone/WhatsApp resolve from env so
 * the real number drops in without a code change.
 */

export const SITE = {
  name: "Wax In The City SL",
  shortName: "Wax In The City",
  tagline: "Private waxing, done properly.",
  description:
    "Ladies-only waxing and skin care in Colombo — known for careful hygiene, premium products, and private appointment-led care.",
  url: "https://waxinthecitylk.com",
  locale: "en_LK",
  instagram: "https://instagram.com/waxinthecitylk",
  facebook: "https://facebook.com/waxinthecitylk",
} as const;

/** Default WhatsApp number — overridable via NEXT_PUBLIC_WHATSAPP_NUMBER. */
const DEFAULT_WHATSAPP = "94779469437";

export function whatsappNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? DEFAULT_WHATSAPP;
}

/** Build a WhatsApp deep link with an optional prefilled message. */
export function whatsappLink(message?: string, number?: string): string {
  const n = (number ?? whatsappNumber()).replace(/[^\d]/g, "");
  const base = `https://wa.me/${n}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export type BranchSlug = "battaramulla" | "nugegoda";

export interface Branch {
  slug: BranchSlug;
  name: string;
  area: string;
  address: string; // TBC — placeholder
  phone: string;
  whatsapp: string; // digits only, country code first
  hours: { weekday: string; weekend: string; poya: string };
  googleMapsUrl: string;
  blurb: string;
}

export const BRANCHES: Branch[] = [
  {
    slug: "battaramulla",
    name: "Battaramulla",
    area: "Battaramulla, Colombo",
    address: "15, 3 Centre Rd, Battaramulla 10120, Sri Lanka",
    phone: "+94 77 946 9437",
    whatsapp: DEFAULT_WHATSAPP,
    hours: {
      weekday: "9:00 AM – 6:00 PM",
      weekend: "9:00 AM – 5:00 PM",
      poya: "Closed on Poya days & public holidays",
    },
    googleMapsUrl: "https://maps.google.com/?q=Battaramulla+Colombo",
    blurb: "A private appointment-led studio with calm rooms and careful treatment flow.",
  },
  {
    slug: "nugegoda",
    name: "Nugegoda",
    area: "Nugegoda, Colombo",
    address: "Nugegoda, Colombo (exact address to be confirmed)",
    phone: "+94 77 946 9437",
    whatsapp: DEFAULT_WHATSAPP,
    hours: {
      weekday: "9:00 AM – 6:00 PM",
      weekend: "9:00 AM – 5:00 PM",
      poya: "Closed on Poya days & public holidays",
    },
    googleMapsUrl: "https://maps.google.com/?q=Nugegoda+Colombo",
    blurb: "A convenient second studio for guests closer to the High Level Road side.",
  },
];

export function getBranch(slug: BranchSlug): Branch {
  return BRANCHES.find((b) => b.slug === slug) ?? BRANCHES[0];
}

export type ServiceCategory = "waxing" | "facial" | "moroccan" | "hydra-facial";

export interface ServiceCategoryMeta {
  slug: ServiceCategory;
  /** URL slug used in /services/[slug] */
  href: string;
  name: string;
  short: string; // one-line teaser for the grid card
  description: string; // longer intro for the category page
  priceFrom: number;
}

export const SERVICE_CATEGORIES: ServiceCategoryMeta[] = [
  {
    slug: "waxing",
    href: "waxing",
    name: "Waxing",
    short: "Root-clean hair removal with careful prep and fresh tools.",
    description:
      "A focused waxing menu for women who care about hygiene as much as the final result. Fresh wax, no rushed handling, and a private room — every time.",
    priceFrom: 700,
  },
  {
    slug: "facial",
    href: "facials",
    name: "Facials",
    short: "Calm skin work for glow, texture, and maintenance.",
    description:
      "Facial care designed around your skin — from a glow-up treatment to a brightening session that leaves you luminous, without the hard sell.",
    priceFrom: 5000,
  },
  {
    slug: "moroccan",
    href: "moroccan",
    name: "Moroccan",
    short: "A deep-clean ritual using black soap and clay.",
    description:
      "A deep-cleansing ritual with authentic Moroccan body polish and spa treatments that draw out impurities and nourish deeply. Used for centuries across North Africa — now in Colombo.",
    priceFrom: 15000,
  },
  {
    slug: "hydra-facial",
    href: "hydra-facial",
    name: "Hydra Facial",
    short: "Cleanse, extract, hydrate — visible refresh without downtime.",
    description:
      "A professional multi-step facial that cleanses, extracts and hydrates in under an hour. Active serums, zero downtime, visible results from the first session.",
    priceFrom: 10000,
  },
];

export function getCategory(href: string): ServiceCategoryMeta | undefined {
  return SERVICE_CATEGORIES.find((c) => c.href === href);
}

export interface PriceVariant {
  product: string;
  price: number;
}

export interface Service {
  name: string;
  category: ServiceCategory;
  duration: string;
  priceFrom: number;
  description: string;
  slug: string;
  /** When a service has multiple wax/product options at different prices. */
  variants?: PriceVariant[];
  /** Short note for package inclusions. */
  includes?: string;
}

/** Full service menu from the salon price list. */
export const SERVICES: Service[] = [
  // Waxing — body areas
  {
    name: "Full Leg Wax",
    category: "waxing",
    duration: "40–50 min",
    priceFrom: 5000,
    slug: "full-leg-wax",
    description: "Smooth full legs with premium Rica or Biahu Gold wax for a longer-lasting finish.",
    variants: [
      { product: "Rica White Choc", price: 6500 },
      { product: "Biahu Gold", price: 5000 },
    ],
  },
  {
    name: "Half Leg Wax",
    category: "waxing",
    duration: "25–30 min",
    priceFrom: 3000,
    slug: "half-leg-wax",
    description: "Lower legs waxed cleanly at the root with your choice of premium wax.",
    variants: [
      { product: "Rica White Choc", price: 4000 },
      { product: "Biahu Gold", price: 3000 },
    ],
  },
  {
    name: "Full Arms Wax",
    category: "waxing",
    duration: "25–30 min",
    priceFrom: 2500,
    slug: "full-arms-wax",
    description: "Complete arm waxing from shoulder to wrist with gentle, skin-first technique.",
    variants: [
      { product: "Rica White Choc", price: 3500 },
      { product: "Biahu Gold", price: 2500 },
    ],
  },
  {
    name: "Half Arms Wax",
    category: "waxing",
    duration: "20 min",
    priceFrom: 1500,
    slug: "half-arms-wax",
    description: "Quick, gentle waxing for forearms with minimal fuss.",
    variants: [
      { product: "Rica White Choc", price: 2500 },
      { product: "Biahu Gold", price: 1500 },
    ],
  },
  {
    name: "Underarm Wax",
    category: "waxing",
    duration: "15 min",
    priceFrom: 2500,
    slug: "underarm-wax",
    description: "Fast, fresh-wax underarm care with Lycon premium products.",
    variants: [
      { product: "Lycon Superberry", price: 3500 },
      { product: "Lycon Pinkini", price: 4000 },
      { product: "Lycon Aloe Vera", price: 2500 },
    ],
  },
  {
    name: "Full Brazilian Wax",
    category: "waxing",
    duration: "30–40 min",
    priceFrom: 6500,
    slug: "full-brazilian-wax",
    description: "A private, judgement-free Brazilian wax with fresh Lycon wax and careful technique.",
    variants: [
      { product: "Lycon Pinkini", price: 10500 },
      { product: "Lycon Aloe Vera", price: 6500 },
    ],
  },
  {
    name: "Full Back Wax",
    category: "waxing",
    duration: "25 min",
    priceFrom: 2500,
    slug: "full-back-wax",
    description: "Complete back waxing for a smooth, even finish.",
    variants: [
      { product: "Rica White Choc", price: 3500 },
      { product: "Biahu Gold", price: 2500 },
    ],
  },
  {
    name: "Chest Wax",
    category: "waxing",
    duration: "20 min",
    priceFrom: 2000,
    slug: "chest-wax",
    description: "Gentle chest waxing with premium soft wax.",
    variants: [
      { product: "Rica White Choc", price: 3000 },
      { product: "Biahu Gold", price: 2000 },
    ],
  },
  {
    name: "Stomach Wax",
    category: "waxing",
    duration: "20 min",
    priceFrom: 2500,
    slug: "stomach-wax",
    description: "Smooth stomach area with Rica or Biahu Gold wax.",
    variants: [
      { product: "Rica White Choc", price: 3500 },
      { product: "Biahu Gold", price: 2500 },
    ],
  },
  {
    name: "Brazilian + Underarm",
    category: "waxing",
    duration: "40–45 min",
    priceFrom: 7500,
    slug: "brazilian-underarm-wax",
    description: "Combined Brazilian and underarm wax in one session.",
    variants: [
      { product: "Lycon Pinkini", price: 10500 },
      { product: "Lycon Aloe Vera", price: 7500 },
    ],
  },
  {
    name: "Full Leg + Full Arms",
    category: "waxing",
    duration: "60 min",
    priceFrom: 6500,
    slug: "full-leg-arms-wax",
    description: "Combined full leg and full arm waxing at a package rate.",
    variants: [
      { product: "Rica White Choc", price: 9000 },
      { product: "Biahu Gold", price: 6500 },
    ],
  },
  // Waxing — face
  {
    name: "Full Face Wax",
    category: "waxing",
    duration: "30 min",
    priceFrom: 6500,
    slug: "full-face-wax",
    description: "Complete facial waxing with Lycon Superberry for smooth, even skin.",
  },
  {
    name: "Chin Wax",
    category: "waxing",
    duration: "10 min",
    priceFrom: 3500,
    slug: "chin-wax",
    description: "Targeted chin waxing with Lycon Superberry.",
  },
  {
    name: "Upper Lips Wax",
    category: "waxing",
    duration: "10 min",
    priceFrom: 700,
    slug: "upper-lips-wax",
    description: "A quick, gentle upper-lip wax with fresh Lycon wax every time.",
  },
  {
    name: "Eyebrow Wax",
    category: "waxing",
    duration: "15 min",
    priceFrom: 1000,
    slug: "eyebrow-wax",
    description: "Clean, considered brow shaping that flatters your features.",
  },
  {
    name: "Nose Wax",
    category: "waxing",
    duration: "10 min",
    priceFrom: 1500,
    slug: "nose-wax",
    description: "Gentle nose waxing with Lycon Superberry.",
  },
  {
    name: "Forehead Wax",
    category: "waxing",
    duration: "10 min",
    priceFrom: 1100,
    slug: "forehead-wax",
    description: "Smooth forehead waxing for a clean, even finish.",
  },
  {
    name: "Eyebrow + Upper Lips",
    category: "waxing",
    duration: "15 min",
    priceFrom: 1500,
    slug: "eyebrow-upper-lips-wax",
    description: "Combined eyebrow and upper lip waxing in one quick session.",
  },
  {
    name: "Eyebrow + Upper Lips Threading",
    category: "waxing",
    duration: "15 min",
    priceFrom: 1500,
    slug: "eyebrow-upper-lips-threading",
    description: "Precise eyebrow and upper lip threading for clean, defined results.",
  },
  // Waxing — packages
  {
    name: "Full Body Wax",
    category: "waxing",
    duration: "75–90 min",
    priceFrom: 10000,
    slug: "full-body-wax",
    description: "Head-to-toe smoothness in one unhurried session with premium wax.",
    includes: "Full leg, full arms, under arms & Brazilian",
    variants: [
      { product: "Lycon with Rica", price: 16500 },
      { product: "Lycon with Butiza", price: 10000 },
    ],
  },
  {
    name: "Neck to Toe",
    category: "waxing",
    duration: "2–2.5 hrs",
    priceFrom: 15000,
    slug: "neck-to-toe-wax",
    description: "The complete waxing experience from neck to toe in one session.",
    includes: "Full body, full face, full back, chest & neck",
    variants: [
      { product: "Lycon with Rica", price: 26000 },
      { product: "Lycon with Butiza", price: 15000 },
    ],
  },
  {
    name: "Beach Body",
    category: "waxing",
    duration: "90 min",
    priceFrom: 13000,
    slug: "beach-body-wax",
    description: "Holiday-ready smoothness covering your full body, back and stomach.",
    includes: "Full body, back & stomach",
    variants: [
      { product: "Lycon with Rica", price: 22500 },
      { product: "Lycon with Butiza", price: 13000 },
    ],
  },
  // Facials
  {
    name: "Glow Up Facial",
    category: "facial",
    duration: "45 min",
    priceFrom: 5000,
    slug: "glow-up-facial",
    description: "A refreshing facial that brings back your natural glow and leaves skin luminous.",
  },
  {
    name: "Unicare Brightening Facial",
    category: "facial",
    duration: "60 min",
    priceFrom: 8500,
    slug: "unicare-brightening-facial",
    description: "A targeted brightening treatment to even tone and restore radiance.",
  },
  // Moroccan
  {
    name: "Moroccan Body Polish",
    category: "moroccan",
    duration: "60 min",
    priceFrom: 15000,
    slug: "moroccan-body-polish",
    description: "An authentic Moroccan body polish ritual that exfoliates and softens for radiant skin.",
  },
  {
    name: "Full Body Scrub (Spacylon)",
    category: "moroccan",
    duration: "60 min",
    priceFrom: 15000,
    slug: "full-body-scrub-spacylon",
    description: "A deep exfoliating full body scrub using Spacylon products for silky-smooth skin.",
  },
  {
    name: "Moroccan Body Polish + Full Body Wax",
    category: "moroccan",
    duration: "2.5 hrs",
    priceFrom: 20000,
    slug: "moroccan-body-polish-full-body-wax",
    description: "Combined Moroccan body polish and full body wax for head-to-toe renewal.",
    includes: "Moroccan body polish & full body wax",
    variants: [
      { product: "Butiza Gold", price: 20000 },
      { product: "Rica White Choc", price: 26500 },
    ],
  },
  {
    name: "Japanese Spa Bed Treatment",
    category: "moroccan",
    duration: "90 min",
    priceFrom: 19000,
    slug: "japanese-spa-bed-treatment",
    description: "A luxurious 90-minute spa experience combining facial, Moroccan body polish and head treatment.",
    includes: "Facial, Moroccan body polish & Moroccan head treatment",
  },
  // Hydra Facial
  {
    name: "Hydro Facial",
    category: "hydra-facial",
    duration: "50 min",
    priceFrom: 10000,
    slug: "hydro-facial",
    description: "A professional multi-step facial that cleanses, extracts and hydrates with zero downtime.",
  },
];

export function servicesByCategory(category: ServiceCategory): Service[] {
  return SERVICES.filter((s) => s.category === category);
}

export interface Testimonial {
  quote: string;
  name: string;
  branch: string;
  rating: number;
}

/**
 * Placeholder reviews — not rendered on the site until client-verified.
 * Homepage uses REVIEW_THEMES instead to avoid shipping unverified quotes.
 * Swap into ReviewThemes or a carousel once testimonials are confirmed.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I've always been nervous about waxing, but the team made me feel completely at ease. Fresh wax, private room, no judgement. I won't go anywhere else now.",
    name: "Nimasha P.",
    branch: "Nugegoda",
    rating: 5,
  },
  {
    quote:
      "Genuinely the most careful and clean salon I've been to in Colombo. You can tell they take hygiene seriously.",
    name: "Dilini R.",
    branch: "Battaramulla",
    rating: 5,
  },
  {
    quote:
      "The HydraFacial left my skin glowing for days and there was zero downtime. Booked my next session before I even left.",
    name: "Sapna M.",
    branch: "Nugegoda",
    rating: 5,
  },
  {
    quote:
      "A ladies-only space makes such a difference. Warm, calm and professional from start to finish.",
    name: "Hashini W.",
    branch: "Battaramulla",
    rating: 5,
  },
  {
    quote:
      "The Moroccan treatment was something else — my skin felt so soft afterwards. Such lovely, honest people too.",
    name: "Ayesha F.",
    branch: "Nugegoda",
    rating: 5,
  },
  {
    quote:
      "Quick, gentle and always on time. They genuinely care about getting it right for sensitive skin.",
    name: "Tharushi S.",
    branch: "Battaramulla",
    rating: 5,
  },
];

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Locations", href: "/locations" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const TRUST_PILLARS = [
  { title: "No double dipping", body: "Spatulas and strips are treated as single-use once they touch skin." },
  { title: "Private rooms", body: "Ladies-only spaces designed for calm, comfortable appointments." },
  { title: "Skin-first choices", body: "Therapists match products and pressure to your skin and service." },
  { title: "Appointment led", body: "Requests are reviewed before confirmation so visits do not feel rushed." },
] as const;

export const CARE_STANDARDS = [
  "Fresh wax setup before every guest",
  "Disposable covers and clean prep surfaces",
  "Clear after-care guidance before you leave",
  "Quiet rooms, no rushed open-floor service",
] as const;

export const REVIEW_THEMES = [
  {
    title: "Cleanliness people notice",
    body: "Guests repeatedly mention fresh tools, disposable covers, and a studio that feels looked after.",
  },
  {
    title: "Less fear around waxing",
    body: "The recurring signal is comfort: first-timers and regulars both call out gentle handling.",
  },
  {
    title: "Product quality matters",
    body: "Public reviews often mention premium wax, careful product choice, and skin-aware recommendations.",
  },
] as const;

export const MARQUEE_WORDS = [
  "Smooth",
  "Safe",
  "Genuine",
  "Ladies Only",
  "Colombo",
  "Battaramulla",
  "Nugegoda",
] as const;
