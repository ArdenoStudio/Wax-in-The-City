"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { isAdminAuthenticated, setAdminFlashMessage } from "@/lib/admin-auth";
import { adminError } from "@/lib/admin-access";
import { createAdminClient } from "@/lib/supabase/admin";
import { GALLERY } from "@/lib/gallery";

async function requireAdminMutation() {
  if (!(await isAdminAuthenticated())) {
    await adminError("Please sign in again before making changes.");
  }
}

function supabaseOrThrow() {
  const supabase = createAdminClient();
  if (!supabase) throw new Error("Supabase admin env vars are not configured.");
  return supabase;
}

type Outcome = { ok: true } | { ok: false; message: string };

const ok: Outcome = { ok: true };
const fail = (message: string): Outcome => ({ ok: false, message });

async function finish(outcome: Outcome, successMessage: string, tab: string, publicImpact: boolean) {
  if (!outcome.ok) await adminError(outcome.message, tab);

  if (publicImpact) revalidatePath("/", "layout");
  revalidatePath("/admin");

  await setAdminFlashMessage(successMessage, "success");
  redirect(`/admin?tab=${tab}`);
}

const BOOKING_TAB = "bookings";
const GALLERY_TAB = "gallery";
const TESTIMONIALS_TAB = "testimonials";

const bookingStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["pending", "confirmed", "cancelled"]),
});

export async function updateBookingStatus(formData: FormData) {
  await requireAdminMutation();

  const parsed = bookingStatusSchema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
  });
  if (!parsed.success) {
    await adminError("Invalid booking status update.", BOOKING_TAB);
    return;
  }

  let outcome: Outcome;
  try {
    const supabase = supabaseOrThrow();
    const { error } = await supabase
      .from("booking_requests")
      .update({ status: parsed.data.status })
      .eq("id", parsed.data.id);
    outcome = error ? fail("Could not update the booking status.") : ok;
    if (error) console.error("[admin] booking status update:", error);
  } catch (error) {
    console.error("[admin] booking status update failed:", error);
    outcome = fail("Could not reach Supabase to update the booking.");
  }

  await finish(outcome, "Booking status updated.", BOOKING_TAB, false);
}

const GALLERY_CATEGORIES = ["salon", "before-after", "results", "events"] as const;

const galleryAddSchema = z.object({
  url: z.string().trim().min(1).max(2000),
  altText: z.string().trim().max(300).optional(),
  category: z.enum(GALLERY_CATEGORIES),
  sortOrder: z.coerce.number().int().min(0).max(999),
  featured: z.boolean(),
});

export async function addGalleryImage(formData: FormData) {
  await requireAdminMutation();

  const parsed = galleryAddSchema.safeParse({
    url: formData.get("url"),
    altText: formData.get("altText") || undefined,
    category: formData.get("category"),
    sortOrder: formData.get("sortOrder"),
    featured: formData.get("featured") === "on",
  });
  if (!parsed.success) {
    await adminError("Check the image fields and try again.", GALLERY_TAB);
    return;
  }

  let outcome: Outcome;
  try {
    const supabase = supabaseOrThrow();
    const { error } = await supabase.from("gallery").insert({
      url: parsed.data.url,
      alt_text: parsed.data.altText ?? null,
      category: parsed.data.category,
      sort_order: parsed.data.sortOrder,
      featured: parsed.data.featured,
      active: true,
    });
    outcome = error ? fail("Could not add the image. Check the Supabase schema first.") : ok;
    if (error) console.error("[admin] gallery add:", error);
  } catch (error) {
    console.error("[admin] gallery add failed:", error);
    outcome = fail("Could not reach Supabase to add the image.");
  }

  await finish(outcome, "Gallery image added.", GALLERY_TAB, true);
}

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const UPLOAD_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function uploadGalleryImage(formData: FormData) {
  await requireAdminMutation();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    await adminError("Choose an image file to upload.", GALLERY_TAB);
    return;
  }
  const ext = UPLOAD_TYPES[file.type];
  if (!ext || file.size > MAX_UPLOAD_BYTES) {
    await adminError("Upload a JPG, PNG, or WebP image under 8 MB.", GALLERY_TAB);
    return;
  }

  const categoryValue = String(formData.get("category") ?? "");
  if (!GALLERY_CATEGORIES.includes(categoryValue as (typeof GALLERY_CATEGORIES)[number])) {
    await adminError("Choose a valid category for the upload.", GALLERY_TAB);
    return;
  }

  const altText = String(formData.get("altText") ?? "").trim().slice(0, 300);
  const sortOrderRaw = Number(formData.get("sortOrder"));
  const sortOrder = Number.isFinite(sortOrderRaw) ? Math.min(Math.max(Math.trunc(sortOrderRaw), 0), 999) : 99;

  let publicUrl: string | null = null;
  let outcome: Outcome;
  try {
    const supabase = supabaseOrThrow();
    const path = `admin/${randomUUID()}.${ext}`;
    const bytes = new Uint8Array(await file.arrayBuffer());

    const { error } = await supabase.storage
      .from("gallery")
      .upload(path, bytes, { contentType: file.type, upsert: false });

    if (error) {
      console.error("[admin] gallery upload:", error);
      outcome = fail("Upload failed. Confirm the gallery storage bucket exists and is public.");
    } else {
      publicUrl = supabase.storage.from("gallery").getPublicUrl(path).data.publicUrl;
      outcome = ok;
    }
  } catch (error) {
    console.error("[admin] gallery upload failed:", error);
    outcome = fail("Could not reach Supabase storage for the upload.");
  }

  if (!outcome.ok || !publicUrl) {
    await adminError(outcome.ok ? "Upload produced no url." : outcome.message, GALLERY_TAB);
    return;
  }

  let insertOutcome: Outcome;
  try {
    const supabase = supabaseOrThrow();
    const { error } = await supabase.from("gallery").insert({
      url: publicUrl,
      alt_text: altText || null,
      category: categoryValue,
      sort_order: sortOrder,
      featured: false,
      active: true,
    });
    insertOutcome = error ? fail("Uploaded the file but could not save the gallery row.") : ok;
    if (error) console.error("[admin] gallery row save:", error);
  } catch (error) {
    console.error("[admin] gallery row save failed:", error);
    insertOutcome = fail("Could not reach Supabase to save the gallery row.");
  }

  await finish(insertOutcome, "Image uploaded and added to the gallery.", GALLERY_TAB, true);
}

const galleryUpdateSchema = z.object({
  id: z.string().uuid(),
  altText: z.string().trim().max(300),
  category: z.enum(GALLERY_CATEGORIES),
  sortOrder: z.coerce.number().int().min(0).max(999),
  featured: z.boolean(),
  active: z.boolean(),
});

export async function updateGalleryRow(formData: FormData) {
  await requireAdminMutation();

  const parsed = galleryUpdateSchema.safeParse({
    id: formData.get("id"),
    altText: formData.get("altText"),
    category: formData.get("category"),
    sortOrder: formData.get("sortOrder"),
    featured: formData.get("featured") === "on",
    active: formData.get("active") === "on",
  });
  if (!parsed.success) {
    await adminError("Check the image fields and try again.", GALLERY_TAB);
    return;
  }

  let outcome: Outcome;
  try {
    const supabase = supabaseOrThrow();
    const { error } = await supabase
      .from("gallery")
      .update({
        alt_text: parsed.data.altText || null,
        category: parsed.data.category,
        sort_order: parsed.data.sortOrder,
        featured: parsed.data.featured,
        active: parsed.data.active,
      })
      .eq("id", parsed.data.id);
    outcome = error ? fail("Could not update the gallery image.") : ok;
    if (error) console.error("[admin] gallery update:", error);
  } catch (error) {
    console.error("[admin] gallery update failed:", error);
    outcome = fail("Could not reach Supabase to update the image.");
  }

  await finish(outcome, "Gallery image updated.", GALLERY_TAB, true);
}

export async function deleteGalleryImage(formData: FormData) {
  await requireAdminMutation();

  const id = z.string().uuid().safeParse(formData.get("id"));
  if (!id.success) {
    await adminError("Invalid gallery image reference.", GALLERY_TAB);
    return;
  }

  let outcome: Outcome;
  try {
    const supabase = supabaseOrThrow();
    const { error } = await supabase.from("gallery").delete().eq("id", id.data);
    outcome = error ? fail("Could not delete the gallery image.") : ok;
    if (error) console.error("[admin] gallery delete:", error);
  } catch (error) {
    console.error("[admin] gallery delete failed:", error);
    outcome = fail("Could not reach Supabase to delete the image.");
  }

  await finish(outcome, "Gallery image deleted.", GALLERY_TAB, true);
}

export async function seedGalleryFromStatic() {
  await requireAdminMutation();

  const rows = GALLERY.map((image, index) => ({
    url: image.src,
    alt_text: image.alt,
    category: image.category,
    sort_order: index + 1,
    featured: index < 4,
    active: true,
  }));

  let outcome: Outcome;
  try {
    const supabase = supabaseOrThrow();
    const { error } = await supabase
      .from("gallery")
      .upsert(rows, { onConflict: "url", ignoreDuplicates: true });
    outcome = error
      ? fail("Could not seed the gallery. Check the Supabase schema first.")
      : ok;
    if (error) console.error("[admin] gallery seed:", error);
  } catch (error) {
    console.error("[admin] gallery seed failed:", error);
    outcome = fail("Could not reach Supabase to seed the gallery.");
  }

  await finish(outcome, "Static gallery rows were seeded into Supabase.", GALLERY_TAB, true);
}

const BRANCH_VALUES = ["battaramulla", "nugegoda"] as const;

const testimonialAddSchema = z.object({
  clientName: z.string().trim().min(2).max(120),
  quote: z.string().trim().min(5).max(600),
  branch: z.enum(BRANCH_VALUES).or(z.literal("")),
  rating: z.coerce.number().int().min(1).max(5),
  featured: z.boolean(),
});

export async function addTestimonial(formData: FormData) {
  await requireAdminMutation();

  const parsed = testimonialAddSchema.safeParse({
    clientName: formData.get("clientName"),
    quote: formData.get("quote"),
    branch: formData.get("branch"),
    rating: formData.get("rating"),
    featured: formData.get("featured") === "on",
  });
  if (!parsed.success) {
    await adminError("Check the testimonial fields and try again.", TESTIMONIALS_TAB);
    return;
  }

  let outcome: Outcome;
  try {
    const supabase = supabaseOrThrow();
    const { error } = await supabase.from("testimonials").insert({
      client_name: parsed.data.clientName,
      quote: parsed.data.quote,
      branch: parsed.data.branch === "" ? null : parsed.data.branch,
      rating: parsed.data.rating,
      featured: parsed.data.featured,
    });
    outcome = error ? fail("Could not add the testimonial.") : ok;
    if (error) console.error("[admin] testimonial add:", error);
  } catch (error) {
    console.error("[admin] testimonial add failed:", error);
    outcome = fail("Could not reach Supabase to add the testimonial.");
  }

  await finish(outcome, "Testimonial added.", TESTIMONIALS_TAB, true);
}

export async function toggleTestimonialFeatured(formData: FormData) {
  await requireAdminMutation();

  const id = z.string().uuid().safeParse(formData.get("id"));
  const featured = formData.get("featured") === "true";
  if (!id.success) {
    await adminError("Invalid testimonial reference.", TESTIMONIALS_TAB);
    return;
  }

  let outcome: Outcome;
  try {
    const supabase = supabaseOrThrow();
    const { error } = await supabase
      .from("testimonials")
      .update({ featured })
      .eq("id", id.data);
    outcome = error ? fail("Could not update the testimonial.") : ok;
    if (error) console.error("[admin] testimonial update:", error);
  } catch (error) {
    console.error("[admin] testimonial update failed:", error);
    outcome = fail("Could not reach Supabase to update the testimonial.");
  }

  await finish(
    outcome,
    featured ? "Testimonial marked as featured." : "Testimonial removed from featured.",
    TESTIMONIALS_TAB,
    true
  );
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdminMutation();

  const id = z.string().uuid().safeParse(formData.get("id"));
  if (!id.success) {
    await adminError("Invalid testimonial reference.", TESTIMONIALS_TAB);
    return;
  }

  let outcome: Outcome;
  try {
    const supabase = supabaseOrThrow();
    const { error } = await supabase.from("testimonials").delete().eq("id", id.data);
    outcome = error ? fail("Could not delete the testimonial.") : ok;
    if (error) console.error("[admin] testimonial delete:", error);
  } catch (error) {
    console.error("[admin] testimonial delete failed:", error);
    outcome = fail("Could not reach Supabase to delete the testimonial.");
  }

  await finish(outcome, "Testimonial deleted.", TESTIMONIALS_TAB, true);
}
