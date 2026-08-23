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
    "Ladies only waxing and skin care in Colombo — known for careful hygiene, premium products, and private appointment led care.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://waxinthecitylk.com",
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
  geo: { latitude: number; longitude: number };
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
    geo: { latitude: 6.8972, longitude: 79.9186 },
    hours: {
      weekday: "9:00 AM – 6:00 PM",
      weekend: "9:00 AM – 5:00 PM",
      poya: "Closed on Poya days & public holidays",
    },
    googleMapsUrl: "https://maps.google.com/?q=Battaramulla+Colombo",
    blurb: "A private appointment led studio with calm rooms and careful treatment flow.",
  },
  {
    slug: "nugegoda",
    name: "Nugegoda",
    area: "Nugegoda, Colombo",
    address: "Nugegoda, Colombo (exact address to be confirmed)",
    phone: "+94 77 946 9437",
    whatsapp: DEFAULT_WHATSAPP,
    geo: { latitude: 6.8649, longitude: 79.8997 },
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
    short: "Root clean hair removal with Lycon (Australia) and Rica (Italy).",
    description:
      "A focused waxing menu for women who care about hygiene as much as the final result. Fresh wax, no double dipping, and private treatment rooms — every time.",
    priceFrom: 700,
  },
  {
    slug: "facial",
    href: "facials",
    name: "Facials",
    short: "Calm skin work for glow, texture, and barrier maintenance.",
    description:
      "Facial care designed around your skin — from a classic cleanse to a brightening treatment that leaves you glowing, without the hard sell.",
    priceFrom: 3500,
  },
  {
    slug: "moroccan",
    href: "moroccan",
    name: "Moroccan",
    short: "A deep cleanse ritual using authentic black soap and clay.",
    description:
      "A deep cleansing ritual with authentic Moroccan black soap and clay that draws out impurities and nourishes deeply. Used for centuries across North Africa — now in Colombo.",
    priceFrom: 4500,
  },
  {
    slug: "hydra-facial",
    href: "hydra-facial",
    name: "Hydra Facial",
    short: "Cleanse, extract, hydrate — visible refresh without downtime.",
    description:
      "A professional multi step facial that cleanses, extracts and hydrates in under an hour. Active serums, zero downtime, visible results from the first session.",
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

/** Complete verified salon services matching the price list. */
export const SERVICES: Service[] = [
  // Packages
  { name: "Full Body Wax Package", category: "waxing", duration: "90 min", priceFrom: 10000, slug: "full-body-wax-package", description: "Complete full body smoothness including Full Leg, Full Arms, Underarms & Full Brazilian." },
  { name: "Neck to Toe Package", category: "waxing", duration: "120 min", priceFrom: 15000, slug: "neck-to-toe-package", description: "Complete body and face waxing: Full Body, Full Face, Full Back, Chest & Neck." },
  { name: "Beach Body Package", category: "waxing", duration: "100 min", priceFrom: 13000, slug: "beach-body-package", description: "Getaway and swimwear ready: Full Body, Back, and Stomach waxing." },
  // Waxing - Intimate & Body
  { name: "Full Brazilian", category: "waxing", duration: "35 min", priceFrom: 6500, slug: "full-brazilian", description: "Private, welcoming Brazilian waxing with soothing Lycon Aloe Vera or Pinkini hot wax." },
  { name: "Brazilian + Underarm", category: "waxing", duration: "45 min", priceFrom: 7500, slug: "brazilian-underarm", description: "Our most requested combo using premium Lycon hot wax with fresh spatulas every dip." },
  { name: "Underarms", category: "waxing", duration: "15 min", priceFrom: 2500, slug: "underarms", description: "Fast, soothing Lycon hot wax underarm care that leaves skin soft and smooth." },
  { name: "Full Leg", category: "waxing", duration: "40 min", priceFrom: 5000, slug: "full-leg", description: "Root clean leg waxing from thigh to ankle using Rica White Chocolate or Biahu Gold." },
  { name: "Half Leg", category: "waxing", duration: "25 min", priceFrom: 3000, slug: "half-leg", description: "Smooth lower legs, cleanly waxed at the root for a longer lasting finish." },
  { name: "Full Arms", category: "waxing", duration: "30 min", priceFrom: 2500, slug: "full-arms", description: "Full arm waxing with gentle Rica White Chocolate or Biahu Gold strip wax." },
  { name: "Half Arms", category: "waxing", duration: "20 min", priceFrom: 1500, slug: "half-arms", description: "Quick, gentle forearm waxing with minimal fuss and clean finishing." },
  { name: "Full Back", category: "waxing", duration: "30 min", priceFrom: 2500, slug: "full-back", description: "Thorough back waxing for clean skin and even texture." },
  { name: "Chest / Stomach", category: "waxing", duration: "25 min", priceFrom: 2000, slug: "chest-stomach", description: "Gentle torso waxing using soothing strip wax." },
  // Waxing - Facial Areas (Lycon Superberry)
  { name: "Full Face Wax", category: "waxing", duration: "30 min", priceFrom: 6500, slug: "full-face-wax", description: "Complete facial hair removal with gentle Lycon Superberry hot wax." },
  { name: "Eyebrow Shaping", category: "waxing", duration: "15 min", priceFrom: 1000, slug: "eyebrow-shaping", description: "Considered brow shaping that flatters your features with zero skin redness." },
  { name: "Upper Lips", category: "waxing", duration: "10 min", priceFrom: 700, slug: "upper-lips", description: "Quick, gentle upper lip wax using Lycon Superberry hot wax." },
  { name: "Eyebrow + Upper Lips", category: "waxing", duration: "20 min", priceFrom: 1500, slug: "eyebrow-upper-lips", description: "Convenient face duo for instant facial clarity." },
  { name: "Forehead / Nose / Chin", category: "waxing", duration: "15 min", priceFrom: 1100, slug: "forehead-nose-chin", description: "Focused delicate area waxing with ultra calming Lycon wax." },
  // Facials
  { name: "Classic Facial", category: "facial", duration: "45 min", priceFrom: 3500, slug: "classic-facial", description: "A cleansing, balancing facial that leaves your skin fresh and calm." },
  { name: "Deep Cleanse Facial", category: "facial", duration: "60 min", priceFrom: 4500, slug: "deep-cleanse-facial", description: "A thorough deep cleanse for congested skin, with gentle extraction and hydration." },
  { name: "Brightening Facial", category: "facial", duration: "60 min", priceFrom: 5500, slug: "brightening-facial", description: "A targeted treatment to even tone and bring back a natural glow." },
  // Moroccan
  { name: "Moroccan Black Soap Treatment", category: "moroccan", duration: "60 min", priceFrom: 4500, slug: "moroccan-black-soap", description: "An authentic black soap ritual that exfoliates and softens for radiant skin." },
  { name: "Moroccan Clay Mask", category: "moroccan", duration: "45 min", priceFrom: 4000, slug: "moroccan-clay-mask", description: "A mineral rich clay mask that draws out impurities and nourishes deeply." },
  // Hydra Facial
  { name: "HydraFacial MD", category: "hydra-facial", duration: "50 min", priceFrom: 12500, slug: "hydrafacial-md", description: "The complete multi step HydraFacial — cleanse, extract, hydrate, with active serums and zero downtime." },
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
      "A ladies only space makes such a difference. Warm, calm and professional from start to finish.",
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
  { title: "No double dipping", body: "Spatulas and strips are treated as single use once they touch skin." },
  { title: "Private rooms", body: "Ladies only spaces designed for calm, comfortable appointments." },
  { title: "Skin first choices", body: "Therapists match products and pressure to your skin and service." },
  { title: "Appointment led", body: "Requests are reviewed before confirmation so visits do not feel rushed." },
] as const;

export const CARE_STANDARDS = [
  "Fresh wax setup before every guest",
  "Disposable covers and clean prep surfaces",
  "Clear aftercare guidance before you leave",
  "Quiet rooms, no rushed open floor service",
] as const;

export const REVIEW_THEMES = [
  {
    title: "Cleanliness people notice",
    body: "Guests repeatedly mention fresh tools, disposable covers, and a studio that feels looked after.",
  },
  {
    title: "Less fear around waxing",
    body: "The recurring signal is comfort: first time guests and regulars both call out gentle handling.",
  },
  {
    title: "Product quality matters",
    body: "Public reviews often mention premium wax, careful product choice, and skin aware recommendations.",
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
