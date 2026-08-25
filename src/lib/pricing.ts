/**
 * Complete verified salon pricing from the Wax In The City menu sheet.
 * Includes product-specific options (Lycon, Rica, Brazil Gold) and curated package bundles.
 */

export interface WaxPriceRow {
  area: string;
  prices: Partial<Record<WaxProduct, number>>;
  note?: string;
}

export type WaxProduct =
  | "lycon-superberry"
  | "lycon-pinkini"
  | "lycon-aloe-vera"
  | "rica-white-choc"
  | "biahu-gold"
  | "lycon-with-rica"
  | "lycon-with-butiza";

export interface WaxProductDef {
  id: WaxProduct;
  label: string;
  short: string;
  origin: string;
  description: string;
}

export const WAX_PRODUCTS: WaxProductDef[] = [
  {
    id: "lycon-superberry",
    label: "Lycon Superberry",
    short: "Superberry",
    origin: "Australia",
    description: "Premium soothing wax for facial and delicate areas.",
  },
  {
    id: "lycon-pinkini",
    label: "Lycon Pinkini",
    short: "Pinkini",
    origin: "Australia",
    description: "Specialised gentle hybrid hot wax formulated for intimate waxing.",
  },
  {
    id: "lycon-aloe-vera",
    label: "Lycon Aloe Vera",
    short: "Aloe Vera",
    origin: "Australia",
    description: "Ultra calming wax for sensitive underarm and bikini skin.",
  },
  {
    id: "rica-white-choc",
    label: "Rica White Chocolate",
    short: "Rica",
    origin: "Italy",
    description: "Liposoluble gentle strip wax for smooth arm, leg, and body waxing.",
  },
  {
    id: "biahu-gold",
    label: "Brazil Gold",
    short: "Brazil Gold",
    origin: "Professional",
    description: "Everyday gold wax for thorough, smooth body waxing.",
  },
  {
    id: "lycon-with-rica",
    label: "Lycon with Rica",
    short: "Lycon + Rica",
    origin: "Premium Combo",
    description: "Lycon for intimate & delicate zones + Rica for body & limbs.",
  },
  {
    id: "lycon-with-butiza",
    label: "Lycon with Butiza",
    short: "Lycon + Butiza",
    origin: "Essential Combo",
    description: "Lycon for delicate zones + standard wax for body & limbs.",
  },
];

/** Individual wax areas with verified per-product pricing (LKR). */
export const WAX_PRICE_ROWS: WaxPriceRow[] = [
  {
    area: "Upper Lip",
    prices: { "lycon-superberry": 700 },
  },
  {
    area: "Eyebrow Shaping",
    prices: { "lycon-superberry": 1000 },
  },
  {
    area: "Forehead",
    prices: { "lycon-superberry": 1100 },
  },
  {
    area: "Nose",
    prices: { "lycon-superberry": 1500 },
  },
  {
    area: "Eyebrow + Upper Lip",
    prices: { "lycon-superberry": 1500 },
  },
  {
    area: "Chin",
    prices: { "lycon-superberry": 3500 },
  },
  {
    area: "Full Face",
    prices: { "lycon-superberry": 6500 },
  },
  {
    area: "Underarms",
    prices: {
      "lycon-aloe-vera": 2500,
      "lycon-superberry": 3500,
      "lycon-pinkini": 4000,
    },
  },
  {
    area: "Half Arms",
    prices: { "biahu-gold": 1500, "rica-white-choc": 2500 },
  },
  {
    area: "Full Arms",
    prices: { "biahu-gold": 2500, "rica-white-choc": 3500 },
  },
  {
    area: "Half Leg",
    prices: { "biahu-gold": 3000, "rica-white-choc": 4000 },
  },
  {
    area: "Full Leg",
    prices: { "biahu-gold": 5000, "rica-white-choc": 6500 },
  },
  {
    area: "Full Leg + Full Arms",
    prices: { "biahu-gold": 6500, "rica-white-choc": 9000 },
  },
  {
    area: "Full Back",
    prices: { "biahu-gold": 2500, "rica-white-choc": 3500 },
  },
  {
    area: "Chest",
    prices: { "biahu-gold": 2000, "rica-white-choc": 3000 },
  },
  {
    area: "Stomach",
    prices: { "biahu-gold": 2500, "rica-white-choc": 3500 },
  },
  {
    area: "Full Brazilian",
    prices: { "lycon-aloe-vera": 6500, "lycon-pinkini": 10500 },
    note: "Strict no double dipping protocol with fresh spatulas.",
  },
  {
    area: "Brazilian + Underarm",
    prices: { "lycon-aloe-vera": 7500, "lycon-pinkini": 10500 },
  },
];

/** Curated bundle packages from the salon price list. */
export interface WaxPackage {
  id: string;
  name: string;
  description: string;
  inclusions: string[];
  prices: {
    essential: number;
    premium: number;
  };
  duration: string;
  tag?: string;
}

export const WAX_PACKAGES: WaxPackage[] = [
  {
    id: "full-body",
    name: "Full Body Wax",
    description: "The complete full body smooth ritual covering all essential body zones.",
    inclusions: ["Full Leg", "Full Arms", "Underarms", "Full Brazilian"],
    prices: {
      essential: 10000,
      premium: 16500,
    },
    duration: "90 min",
    tag: "Most Popular",
  },
  {
    id: "neck-to-toe",
    name: "Neck to Toe",
    description: "Total body and facial smoothing for a seamless, radiant finish.",
    inclusions: ["Full Body", "Full Face", "Full Back", "Chest", "Neck"],
    prices: {
      essential: 15000,
      premium: 26000,
    },
    duration: "120 min",
    tag: "Signature",
  },
  {
    id: "beach-body",
    name: "Beach Body",
    description: "Focused confidence package designed for swimwear and getaways.",
    inclusions: ["Full Body", "Back", "Stomach"],
    prices: {
      essential: 13000,
      premium: 22500,
    },
    duration: "100 min",
  },
];

export function productsForRow(row: WaxPriceRow): WaxProduct[] {
  return WAX_PRODUCTS.filter((p) => row.prices[p.id] != null).map((p) => p.id);
}

export function minPriceForRow(row: WaxPriceRow): number {
  const prices = Object.values(row.prices).filter((p): p is number => p != null);
  return prices.length > 0 ? Math.min(...prices) : 0;
}
