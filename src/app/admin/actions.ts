"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  clearAdminSession,
  getLoginIdentifier,
  isAdminAuthenticated,
  isLoginRateLimited,
  setAdminFlashMessage,
  setAdminSession,
  verifyAdminPassword,
} from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { getDb } from "@/lib/db";
import { SERVICES } from "@/lib/site";

const serviceUpdateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(120),
  category: z.enum(["waxing", "facial", "moroccan", "hydra-facial"]),
  duration: z.string().min(2).max(40),
  priceFrom: z.coerce.number().int().min(0).max(500000),
  description: z.string().min(10).max(500),
  sortOrder: z.coerce.number().int().min(0).max(999),
  active: z.coerce.boolean().optional(),
  featured: z.coerce.boolean().optional(),
});

async function adminError(message: string): Promise<never> {
  await setAdminFlashMessage(message, "error");
  redirect("/admin");
}

async function requireAdminMutation() {
  if (!(await isAdminAuthenticated())) {
    await adminError("Please sign in again before making changes.");
  }
}

export async function loginAdmin(formData: FormData) {
  // Per-client rate limiting keyed on IP + user agent (falls back to "global" when headers unavailable)
  const identifier = await getLoginIdentifier();
  const { limited, retryAfterSec } = isLoginRateLimited(identifier);
  if (limited) {
    await adminError(`Too many failed login attempts. Please wait ${retryAfterSec ?? 900} seconds before trying again.`);
  }

  const password = String(formData.get("password") ?? "");

  const isValid = await verifyAdminPassword(password, identifier);
  if (!isValid) {
    await adminError("The admin password is not correct.");
  }

  await setAdminSession();
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin");
}

export async function seedServices() {
  await requireAdminMutation();

  const rows = SERVICES.map((service, index) => ({
    name: service.name,
    category: service.category,
    description: service.description,
    duration_min: service.duration,
    price_from: service.priceFrom,
    slug: service.slug,
    active: true,
    featured: index < 4,
    sort_order: index + 1,
  }));

  const sql = getDb();
  if (sql) {
    try {
      for (const service of rows) {
        await sql`
          INSERT INTO services (name, category, description, duration_min, price_from, slug, active, featured, sort_order)
          VALUES (${service.name}, ${service.category}, ${service.description}, ${service.duration_min}, ${service.price_from}, ${service.slug}, ${service.active}, ${service.featured}, ${service.sort_order})
          ON CONFLICT (slug) DO UPDATE SET
            name = EXCLUDED.name,
            category = EXCLUDED.category,
            description = EXCLUDED.description,
            duration_min = EXCLUDED.duration_min,
            price_from = EXCLUDED.price_from,
            active = EXCLUDED.active,
            featured = EXCLUDED.featured,
            sort_order = EXCLUDED.sort_order;
        `;
      }
      revalidatePath("/", "layout");
      await setAdminFlashMessage("Service seed rows were added to the database.", "success");
      redirect("/admin?tab=services");
    } catch (error) {
      console.error("[admin] services seed error:", error);
      await adminError("Could not seed services into database.");
    }
  }

  const supabase = createAdminClient();
  if (!supabase) {
    await adminError("Database credentials are not configured.");
    return;
  }

  const { error } = await supabase
    .from("services")
    .upsert(rows, { onConflict: "slug" });

  if (error) {
    await adminError("Could not seed services. Check the database schema first.");
    return;
  }

  revalidatePath("/", "layout");
  await setAdminFlashMessage("Service seed rows were added to the database.", "success");
  redirect("/admin?tab=services");
}

export async function updateService(formData: FormData) {
  await requireAdminMutation();

  const parsed = serviceUpdateSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    duration: formData.get("duration"),
    priceFrom: formData.get("priceFrom"),
    description: formData.get("description"),
    sortOrder: formData.get("sortOrder"),
    active: formData.get("active") === "on",
    featured: formData.get("featured") === "on",
  });

  if (!parsed.success) {
    await adminError("Please check the service fields and try again.");
    return;
  }

  const service = parsed.data;

  const sql = getDb();
  if (sql) {
    try {
      await sql`
        UPDATE services
        SET
          name = ${service.name},
          slug = ${service.slug},
          category = ${service.category},
          description = ${service.description},
          duration_min = ${service.duration},
          price_from = ${service.priceFrom},
          active = ${service.active ?? false},
          featured = ${service.featured ?? false},
          sort_order = ${service.sortOrder}
        WHERE id = ${service.id}
      `;
      revalidatePath("/", "layout");
      await setAdminFlashMessage(`Service "${service.name}" updated successfully.`, "success");
      redirect("/admin?tab=services");
    } catch (error) {
      console.error("[admin] service update error:", error);
      await adminError("Could not update the service in database.");
    }
  }

  const supabase = createAdminClient();
  if (!supabase) {
    await adminError("Database credentials are not configured.");
    return;
  }

  const { error } = await supabase
    .from("services")
    .update({
      name: service.name,
      slug: service.slug,
      category: service.category,
      description: service.description,
      duration_min: service.duration,
      price_from: service.priceFrom,
      active: service.active ?? false,
      featured: service.featured ?? false,
      sort_order: service.sortOrder,
    })
    .eq("id", service.id);

  if (error) {
    await adminError("Could not update the service. Check database permissions.");
    return;
  }

  revalidatePath("/", "layout");
  await setAdminFlashMessage(`Service "${service.name}" updated successfully.`, "success");
  redirect("/admin?tab=services");
}
