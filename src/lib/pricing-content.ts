import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getDb } from "@/lib/db";
import {
  WAX_PRICE_ROWS,
  WAX_PACKAGES,
  type WaxPriceRow,
  type WaxPackage,
} from "@/lib/pricing";

export interface AdminWaxPrice {
  id: string;
  area: string;
  category: "face" | "body" | "intimate";
  lyconPinkini: number | null;
  lyconSuperberry: number | null;
  lyconAloeVera: number | null;
  ricaWhiteChoc: number | null;
  biahuGold: number | null;
  note: string | null;
  sortOrder: number;
  active: boolean;
}

export interface AdminWaxPackage {
  id: string;
  name: string;
  description: string;
  inclusions: string[];
  priceEssential: number;
  pricePremium: number;
  duration: string;
  tag: string | null;
  sortOrder: number;
  active: boolean;
}

export interface WaxPricingContent {
  rows: WaxPriceRow[];
  packages: WaxPackage[];
}

interface DBWaxPriceRow {
  id: string;
  area: string;
  category: "face" | "body" | "intimate";
  lycon_pinkini: number | null;
  lycon_superberry: number | null;
  lycon_aloe_vera: number | null;
  rica_white_choc: number | null;
  biahu_gold: number | null;
  note: string | null;
  sort_order: number | null;
  active: boolean | null;
}

interface DBWaxPackageRow {
  id: string;
  name: string;
  description: string;
  inclusions: string[] | null;
  price_essential: number;
  price_premium: number;
  duration: string;
  tag: string | null;
  sort_order: number | null;
  active: boolean | null;
}

function mapRowToWaxPriceRow(row: DBWaxPriceRow): WaxPriceRow {
  const prices: WaxPriceRow["prices"] = {};
  if (row.lycon_pinkini) prices["lycon-pinkini"] = row.lycon_pinkini;
  if (row.lycon_superberry) prices["lycon-superberry"] = row.lycon_superberry;
  if (row.lycon_aloe_vera) prices["lycon-aloe-vera"] = row.lycon_aloe_vera;
  if (row.rica_white_choc) prices["rica-white-choc"] = row.rica_white_choc;
  if (row.biahu_gold) prices["biahu-gold"] = row.biahu_gold;

  return {
    area: row.area,
    prices,
    note: row.note || undefined,
  };
}

function mapRowToAdminWaxPrice(row: DBWaxPriceRow): AdminWaxPrice {
  return {
    id: row.id,
    area: row.area,
    category: row.category,
    lyconPinkini: row.lycon_pinkini,
    lyconSuperberry: row.lycon_superberry,
    lyconAloeVera: row.lycon_aloe_vera,
    ricaWhiteChoc: row.rica_white_choc,
    biahuGold: row.biahu_gold,
    note: row.note,
    sortOrder: row.sort_order ?? 0,
    active: row.active ?? true,
  };
}

function mapRowToWaxPackage(row: DBWaxPackageRow): WaxPackage {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    inclusions: row.inclusions ?? [],
    prices: {
      essential: row.price_essential,
      premium: row.price_premium,
    },
    duration: row.duration,
    tag: row.tag || undefined,
  };
}

function mapRowToAdminWaxPackage(row: DBWaxPackageRow): AdminWaxPackage {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    inclusions: row.inclusions ?? [],
    priceEssential: row.price_essential,
    pricePremium: row.price_premium,
    duration: row.duration,
    tag: row.tag,
    sortOrder: row.sort_order ?? 0,
    active: row.active ?? true,
  };
}

export async function getPublicWaxPricing(): Promise<WaxPricingContent> {
  const fallback: WaxPricingContent = {
    rows: WAX_PRICE_ROWS,
    packages: WAX_PACKAGES,
  };

  // 1. Neon Database Support
  const sql = getDb();
  if (sql) {
    try {
      const [priceRows, packageRows] = await Promise.all([
        sql`SELECT * FROM wax_prices WHERE active = true ORDER BY sort_order ASC`,
        sql`SELECT * FROM wax_packages WHERE active = true ORDER BY sort_order ASC`,
      ]);

      const rows = (priceRows as DBWaxPriceRow[]).map(mapRowToWaxPriceRow);
      const packages = (packageRows as DBWaxPackageRow[]).map(mapRowToWaxPackage);

      if (rows.length > 0) {
        return {
          rows,
          packages: packages.length > 0 ? packages : fallback.packages,
        };
      }
    } catch (error) {
      console.error("[neon] wax pricing query failed:", error);
    }
  }

  // 2. Supabase Fallback
  const supabase = await createClient();
  if (!supabase) return fallback;

  try {
    const [pricesRes, packagesRes] = await Promise.all([
      supabase
        .from("wax_prices")
        .select("*")
        .eq("active", true)
        .order("sort_order", { ascending: true }),
      supabase
        .from("wax_packages")
        .select("*")
        .eq("active", true)
        .order("sort_order", { ascending: true }),
    ]);

    const rows = (pricesRes.data as DBWaxPriceRow[] | null)?.map(mapRowToWaxPriceRow);
    const packages = (packagesRes.data as DBWaxPackageRow[] | null)?.map(mapRowToWaxPackage);

    return {
      rows: rows && rows.length > 0 ? rows : fallback.rows,
      packages: packages && packages.length > 0 ? packages : fallback.packages,
    };
  } catch {
    return fallback;
  }
}

function getStaticAdminPricingFallback(): {
  prices: AdminWaxPrice[];
  packages: AdminWaxPackage[];
} {
  return {
    prices: WAX_PRICE_ROWS.map((row, idx) => ({
      id: `static-${idx}`,
      area: row.area,
      category: "body",
      lyconPinkini: row.prices["lycon-pinkini"] ?? null,
      lyconSuperberry: row.prices["lycon-superberry"] ?? null,
      lyconAloeVera: row.prices["lycon-aloe-vera"] ?? null,
      ricaWhiteChoc: row.prices["rica-white-choc"] ?? null,
      biahuGold: row.prices["biahu-gold"] ?? null,
      note: row.note ?? null,
      sortOrder: (idx + 1) * 10,
      active: true,
    })),
    packages: WAX_PACKAGES.map((pkg, idx) => ({
      id: pkg.id,
      name: pkg.name,
      description: pkg.description,
      inclusions: pkg.inclusions,
      priceEssential: pkg.prices.essential,
      pricePremium: pkg.prices.premium,
      duration: pkg.duration,
      tag: pkg.tag ?? null,
      sortOrder: (idx + 1) * 10,
      active: true,
    })),
  };
}

export async function getAdminWaxPricing(): Promise<{
  prices: AdminWaxPrice[];
  packages: AdminWaxPackage[];
}> {
  // 1. Neon Database Support
  const sql = getDb();
  if (sql) {
    try {
      const [priceRows, packageRows] = await Promise.all([
        sql`SELECT * FROM wax_prices ORDER BY sort_order ASC`,
        sql`SELECT * FROM wax_packages ORDER BY sort_order ASC`,
      ]);

      const prices = (priceRows as DBWaxPriceRow[]).map(mapRowToAdminWaxPrice);
      const packages = (packageRows as DBWaxPackageRow[]).map(mapRowToAdminWaxPackage);

      if (prices.length > 0) {
        return { prices, packages };
      }
    } catch (error) {
      console.error("[neon] admin wax pricing query failed:", error);
    }
  }

  // 2. Supabase Fallback
  const admin = createAdminClient();
  if (admin) {
    try {
      const [pricesRes, packagesRes] = await Promise.all([
        admin.from("wax_prices").select("*").order("sort_order", { ascending: true }),
        admin.from("wax_packages").select("*").order("sort_order", { ascending: true }),
      ]);

      const prices = (pricesRes.data as DBWaxPriceRow[] | null)?.map(mapRowToAdminWaxPrice) ?? [];
      const packages = (packagesRes.data as DBWaxPackageRow[] | null)?.map(mapRowToAdminWaxPackage) ?? [];
      if (prices.length > 0) {
        return { prices, packages };
      }
    } catch {
      // Fall through to static fallback
    }
  }

  // 3. Resilient Static Fallback (Guarantees UI never renders empty or crashes)
  return getStaticAdminPricingFallback();
}
