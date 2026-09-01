import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  SERVICE_CATEGORIES,
  SERVICES,
  type Service,
  type ServiceCategory,
  type ServiceCategoryMeta,
} from "@/lib/site";

type ServiceRow = {
  id?: string;
  name: string | null;
  category: string | null;
  description: string | null;
  duration_min: string | null;
  price_from: number | null;
  slug: string | null;
  active?: boolean | null;
  featured?: boolean | null;
  sort_order?: number | null;
};

export interface ServiceContent {
  categories: ServiceCategoryMeta[];
  services: Service[];
}

export interface AdminService extends Service {
  id: string;
  active: boolean;
  featured: boolean;
  sortOrder: number;
}

function isServiceCategory(value: string | null): value is ServiceCategory {
  return SERVICE_CATEGORIES.some((category) => category.slug === value);
}

function serviceFromRow(row: ServiceRow): Service | null {
  if (!row.name || !row.slug || !isServiceCategory(row.category)) return null;

  return {
    name: row.name,
    category: row.category,
    duration: row.duration_min || "Time to confirm",
    priceFrom: row.price_from ?? 0,
    description: row.description || "Ask the team for current service details.",
    slug: row.slug,
  };
}

function adminServiceFromRow(row: ServiceRow): AdminService | null {
  const service = serviceFromRow(row);
  if (!service || !row.id) return null;

  return {
    ...service,
    id: row.id,
    active: row.active ?? true,
    featured: row.featured ?? false,
    sortOrder: row.sort_order ?? 0,
  };
}

function categoriesFromServices(services: Service[]): ServiceCategoryMeta[] {
  return SERVICE_CATEGORIES.map((category) => {
    const prices = services
      .filter((service) => service.category === category.slug && service.priceFrom > 0)
      .map((service) => service.priceFrom);

    return {
      ...category,
      priceFrom: prices.length > 0 ? Math.min(...prices) : category.priceFrom,
    };
  });
}

export async function getPublicServiceContent(): Promise<ServiceContent> {
  const fallback = {
    categories: SERVICE_CATEGORIES,
    services: SERVICES,
  };

  const supabase = await createClient();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("services")
    .select("name, category, description, duration_min, price_from, slug")
    .eq("active", true)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error || !data?.length) return fallback;

  const services = data
    .map((row) => serviceFromRow(row as ServiceRow))
    .filter((service): service is Service => Boolean(service));

  if (!services.length) return fallback;

  return {
    categories: categoriesFromServices(services),
    services,
  };
}

export async function getAdminServices(): Promise<AdminService[]> {
  const supabase = createAdminClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("services")
    .select("id, name, category, description, duration_min, price_from, slug, active, featured, sort_order")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error || !data) return [];

  return data
    .map((row) => adminServiceFromRow(row as ServiceRow))
    .filter((service): service is AdminService => Boolean(service));
}
