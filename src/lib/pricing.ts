/**
 * Detailed wax pricing matrix from the salon price list.
 * Each row maps a body area to product-specific prices (LKR).
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

export const WAX_PRODUCTS: { id: WaxProduct; label: string; short: string }[] = [
  { id: "lycon-superberry", label: "Lycon Superberry", short: "Superberry" },
  { id: "lycon-pinkini", label: "Lycon Pinkini", short: "Pinkini" },
  { id: "lycon-aloe-vera", label: "Lycon Aloe Vera", short: "Aloe Vera" },
  { id: "rica-white-choc", label: "Rica White Choc", short: "Rica" },
  { id: "biahu-gold", label: "Biahu Gold", short: "Biahu Gold" },
  { id: "lycon-with-rica", label: "Lycon with Rica", short: "Lycon + Rica" },
  { id: "lycon-with-butiza", label: "Lycon with Butiza", short: "Lycon + Butiza" },
];

/** Individual wax areas with per-product pricing. */
export const WAX_PRICE_ROWS: WaxPriceRow[] = [
  {
    area: "Full Leg",
    prices: { "rica-white-choc": 6500, "biahu-gold": 5000 },
  },
  {
    area: "Half Leg",
    prices: { "rica-white-choc": 4000, "biahu-gold": 3000 },
  },
  {
    area: "Full Arms",
    prices: { "rica-white-choc": 3500, "biahu-gold": 2500 },
  },
  {
    area: "Half Arms",
    prices: { "rica-white-choc": 2500, "biahu-gold": 1500 },
  },
  {
    area: "Under Arms",
    prices: {
      "lycon-superberry": 3500,
      "lycon-pinkini": 4000,
      "lycon-aloe-vera": 2500,
    },
  },
  {
    area: "Full Brazilian",
    prices: { "lycon-pinkini": 10500, "lycon-aloe-vera": 6500 },
  },
  {
    area: "Full Back",
    prices: { "rica-white-choc": 3500, "biahu-gold": 2500 },
  },
  {
    area: "Chest",
    prices: { "rica-white-choc": 3000, "biahu-gold": 2000 },
  },
  {
    area: "Chin",
    prices: { "lycon-superberry": 3500 },
  },
  {
    area: "Upper Lips",
    prices: { "lycon-superberry": 700 },
  },
  {
    area: "Eyebrow",
    prices: { "lycon-superberry": 1000 },
  },
  {
    area: "Nose",
    prices: { "lycon-superberry": 1500 },
  },
  {
    area: "Forehead",
    prices: { "lycon-superberry": 1100 },
  },
  {
    area: "Full Face",
    prices: { "lycon-superberry": 6500 },
  },
  {
    area: "Stomach",
    prices: { "rica-white-choc": 3500, "biahu-gold": 2500 },
  },
  {
    area: "Brazilian + Underarm",
    prices: { "lycon-pinkini": 10500, "lycon-aloe-vera": 7500 },
  },
  {
    area: "Eyebrow + Upper Lips",
    prices: { "lycon-superberry": 1500 },
  },
  {
    area: "Full Leg + Full Arms",
    prices: { "rica-white-choc": 9000, "biahu-gold": 6500 },
  },
];

/** Package bundles with included treatments. */
export const WAX_PACKAGES: WaxPriceRow[] = [
  {
    area: "Full Body Wax",
    note: "Full leg, full arms, under arms & Brazilian",
    prices: { "lycon-with-rica": 16500, "lycon-with-butiza": 10000 },
  },
  {
    area: "Neck to Toe",
    note: "Full body, full face, full back, chest & neck",
    prices: { "lycon-with-rica": 26000, "lycon-with-butiza": 15000 },
  },
  {
    area: "Beach Body",
    note: "Full body, back & stomach",
    prices: { "lycon-with-rica": 22500, "lycon-with-butiza": 13000 },
  },
];

/** Products used per row — keeps the table readable on mobile. */
export function productsForRow(row: WaxPriceRow): WaxProduct[] {
  return WAX_PRODUCTS.filter((p) => row.prices[p.id] != null).map((p) => p.id);
}

export function minPriceForRow(row: WaxPriceRow): number {
  return Math.min(...Object.values(row.prices).filter((p): p is number => p != null));
}
