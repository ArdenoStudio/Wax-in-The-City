/**
 * Single source of truth for site content.
 * Placeholders per the master build prompt — swap when the client delivers
 * real addresses, phone numbers, and copy. Phone/WhatsApp resolve from env so
 * the real number drops in without a code change.
 */

export const SITE = {
  name: "Wax In The City SL",
  shortName: "Wax In The City",
  tagline: "Smooth. Safe. Genuine.",
  description:
    "Ladies-only waxing & beauty in Colombo — waxing, facials, Moroccan treatments and hydra facials across two branches in Battaramulla and Nugegoda.",
  url: "https://waxinthecitylk.com",
  locale: "en_LK",
  instagram: "https://instagram.com/waxinthecitylk",
  facebook: "https://facebook.com/waxinthecitylk",
} as const;

/** Default WhatsApp number — overridable via NEXT_PUBLIC_WHATSAPP_NUMBER. */
const DEFAULT_WHATSAPP = "94770000000"; // TBC from client — placeholder

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
    address: "Battaramulla, Colombo (exact address to be confirmed)",
    phone: "+94 77 000 0000",
    whatsapp: DEFAULT_WHATSAPP,
    hours: {
      weekday: "9:00 AM – 6:00 PM",
      weekend: "9:00 AM – 5:00 PM",
      poya: "Closed on Poya days & public holidays",
    },
    googleMapsUrl: "https://maps.google.com/?q=Battaramulla+Colombo",
    blurb: "Our Battaramulla studio — a calm, private space east of the city.",
  },
  {
    slug: "nugegoda",
    name: "Nugegoda",
    area: "Nugegoda, Colombo",
    address: "Nugegoda, Colombo (exact address to be confirmed)",
    phone: "+94 77 000 0000",
    whatsapp: DEFAULT_WHATSAPP,
    hours: {
      weekday: "9:00 AM – 6:00 PM",
      weekend: "9:00 AM – 5:00 PM",
      poya: "Closed on Poya days & public holidays",
    },
    googleMapsUrl: "https://maps.google.com/?q=Nugegoda+Colombo",
    blurb: "Our Nugegoda studio — easy to reach in the heart of the suburb.",
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
    short: "Clean, gentle waxing that leaves you genuinely smooth.",
    description:
      "Premium soft wax that removes hair cleanly at the root, with a gentle technique made for sensitive skin. Fresh wax, clean tools, and a private room — every time.",
    priceFrom: 800,
  },
  {
    slug: "facial",
    href: "facials",
    name: "Facials",
    short: "Cleansing, brightening facials tailored to your skin.",
    description:
      "Facial care designed around your skin — from a classic cleanse to a brightening treatment that leaves you glowing, without the hard sell.",
    priceFrom: 3500,
  },
  {
    slug: "moroccan",
    href: "moroccan",
    name: "Moroccan",
    short: "An authentic black-soap & clay ritual for radiant skin.",
    description:
      "A deep-cleansing ritual with authentic Moroccan black soap and clay that draws out impurities and nourishes deeply. Used for centuries across North Africa — now in Colombo.",
    priceFrom: 4500,
  },
  {
    slug: "hydra-facial",
    href: "hydra-facial",
    name: "Hydra Facial",
    short: "Cleanse, extract and hydrate — results, not recovery.",
    description:
      "A professional multi-step facial that cleanses, extracts and hydrates in under an hour. Active serums, zero downtime, visible results from the first session.",
    priceFrom: 7500,
  },
];

export function getCategory(href: string): ServiceCategoryMeta | undefined {
  return SERVICE_CATEGORIES.find((c) => c.href === href);
}

export interface Service {
  name: string;
  category: ServiceCategory;
  duration: string;
  priceFrom: number;
  description: string;
  slug: string;
}

/** Placeholder service set — replace with Supabase data once populated. */
export const SERVICES: Service[] = [
  // Waxing
  { name: "Full Body Wax", category: "waxing", duration: "60–75 min", priceFrom: 6500, slug: "full-body-wax", description: "Head-to-toe smoothness in one unhurried session, with premium soft wax and a gentle, skin-first technique." },
  { name: "Brazilian Wax", category: "waxing", duration: "30–40 min", priceFrom: 3500, slug: "brazilian-wax", description: "A private, judgement-free Brazilian wax with fresh wax and a careful, comfortable technique." },
  { name: "Half Leg Wax", category: "waxing", duration: "25–30 min", priceFrom: 1800, slug: "half-leg-wax", description: "Smooth lower legs, cleanly waxed at the root for a longer-lasting finish." },
  { name: "Half Arm Wax", category: "waxing", duration: "20–25 min", priceFrom: 1500, slug: "half-arm-wax", description: "Quick, gentle waxing for forearms with minimal fuss." },
  { name: "Underarm Wax", category: "waxing", duration: "15 min", priceFrom: 900, slug: "underarm-wax", description: "Fast, fresh-wax underarm care that fits into a busy day." },
  { name: "Eyebrow Wax", category: "waxing", duration: "15 min", priceFrom: 800, slug: "eyebrow-wax", description: "Clean, considered brow shaping that flatters your features." },
  { name: "Lip Wax", category: "waxing", duration: "10 min", priceFrom: 800, slug: "lip-wax", description: "A quick, gentle upper-lip wax with fresh wax every time." },
  // Facials
  { name: "Classic Facial", category: "facial", duration: "45 min", priceFrom: 3500, slug: "classic-facial", description: "A cleansing, balancing facial that leaves your skin fresh and calm." },
  { name: "Deep Cleanse Facial", category: "facial", duration: "60 min", priceFrom: 4500, slug: "deep-cleanse-facial", description: "A thorough deep-clean for congested skin, with gentle extraction and hydration." },
  { name: "Brightening Facial", category: "facial", duration: "60 min", priceFrom: 5500, slug: "brightening-facial", description: "A targeted treatment to even tone and bring back a natural glow." },
  // Moroccan
  { name: "Moroccan Black Soap Treatment", category: "moroccan", duration: "60 min", priceFrom: 4500, slug: "moroccan-black-soap", description: "An authentic black-soap ritual that exfoliates and softens for radiant skin." },
  { name: "Moroccan Clay Mask", category: "moroccan", duration: "45 min", priceFrom: 4000, slug: "moroccan-clay-mask", description: "A mineral-rich clay mask that draws out impurities and nourishes deeply." },
  // Hydra Facial
  { name: "HydraFacial MD", category: "hydra-facial", duration: "50 min", priceFrom: 12500, slug: "hydrafacial-md", description: "The full multi-step HydraFacial — cleanse, extract, hydrate, with active serums and zero downtime." },
  { name: "Express HydraFacial", category: "hydra-facial", duration: "30 min", priceFrom: 7500, slug: "express-hydrafacial", description: "A focused HydraFacial for a quick, visible refresh between busy days." },
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

/** Placeholder reviews — replace with real Google/collected reviews. */
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
] as const;

export const TRUST_PILLARS = [
  { title: "Fresh wax, every time", body: "Single-use wax strips and clean tools for every guest — always." },
  { title: "Ladies-only space", body: "A private, women-only studio where you can truly relax." },
  { title: "Certified therapists", body: "Trained, certified therapists who take genuine care." },
  { title: "Two Colombo locations", body: "Find us in Battaramulla and Nugegoda, close to home." },
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
