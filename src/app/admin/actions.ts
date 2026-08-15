"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  clearAdminSession,
  isAdminAuthenticated,
  isLoginRateLimited,
  setAdminFlashMessage,
  setAdminSession,
  verifyAdminPassword,
} from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
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
  const { limited, retryAfterSec } = isLoginRateLimited();
  if (limited) {
    await adminError(`Too many failed login attempts. Please wait ${retryAfterSec ?? 900} seconds before trying again.`);
  }

  const password = String(formData.get("password") ?? "");

  const isValid = await verifyAdminPassword(password);
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

  const supabase = createAdminClient();
  if (!supabase) {
    await adminError("Supabase admin env vars are not configured.");
    return;
  }

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

  const { error } = await supabase
    .from("services")
    .upsert(rows, { onConflict: "slug" });

  if (error) {
    await adminError("Could not seed services. Check the Supabase schema first.");
    return;
  }

  revalidatePath("/", "layout");
  await setAdminFlashMessage("Service seed rows were added to Supabase.", "success");
  redirect("/admin");
}

export async function updateService(formData: FormData) {
  await requireAdminMutation();

  const supabase = createAdminClient();
  if (!supabase) {
    await adminError("Supabase admin env vars are not configured.");
    return;
  }

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
    await adminError("Could not update the service. Check Supabase permissions.");
    return;
  }

  revalidatePath("/", "layout");
  await setAdminFlashMessage(`Service "${service.name}" updated successfully.`, "success");
  redirect("/admin");
}
