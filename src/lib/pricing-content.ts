import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
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

export async function getAdminWaxPricing(): Promise<{
  prices: AdminWaxPrice[];
  packages: AdminWaxPackage[];
}> {
  const admin = createAdminClient();
  if (!admin) return { prices: [], packages: [] };

  try {
    const [pricesRes, packagesRes] = await Promise.all([
      admin.from("wax_prices").select("*").order("sort_order", { ascending: true }),
      admin.from("wax_packages").select("*").order("sort_order", { ascending: true }),
    ]);

    return {
      prices: (pricesRes.data as DBWaxPriceRow[] | null)?.map(mapRowToAdminWaxPrice) ?? [],
      packages: (packagesRes.data as DBWaxPackageRow[] | null)?.map(mapRowToAdminWaxPackage) ?? [],
    };
  } catch {
    return { prices: [], packages: [] };
  }
}
