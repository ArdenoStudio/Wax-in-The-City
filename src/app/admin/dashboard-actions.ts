"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { isAdminAuthenticated, setAdminFlashMessage } from "@/lib/admin-auth";
import { adminError } from "@/lib/admin-access";
import { createAdminClient } from "@/lib/supabase/admin";
import { getDb } from "@/lib/db";
import { GALLERY } from "@/lib/gallery";
import { WAX_PRICE_ROWS, WAX_PACKAGES } from "@/lib/pricing";

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
    const sql = getDb();
    if (sql) {
      await sql`UPDATE booking_requests SET status = ${parsed.data.status} WHERE id = ${parsed.data.id}`;
      outcome = ok;
    } else {
      const supabase = supabaseOrThrow();
      const { error } = await supabase
        .from("booking_requests")
        .update({ status: parsed.data.status })
        .eq("id", parsed.data.id);
      outcome = error ? fail("Could not update the booking status.") : ok;
      if (error) console.error("[admin] booking status update:", error);
    }
  } catch (error) {
    console.error("[admin] booking status update failed:", error);
    outcome = fail("Could not update the booking in the database.");
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
    const sql = getDb();
    if (sql) {
      await sql`
        INSERT INTO gallery (url, alt_text, category, sort_order, featured, active)
        VALUES (
          ${parsed.data.url},
          ${parsed.data.altText ?? null},
          ${parsed.data.category},
          ${parsed.data.sortOrder},
          ${parsed.data.featured},
          true
        )
      `;
      outcome = ok;
    } else {
      const supabase = supabaseOrThrow();
      const { error } = await supabase.from("gallery").insert({
        url: parsed.data.url,
        alt_text: parsed.data.altText ?? null,
        category: parsed.data.category,
        sort_order: parsed.data.sortOrder,
        featured: parsed.data.featured,
        active: true,
      });
      outcome = error ? fail("Could not add the image. Check the database schema first.") : ok;
      if (error) console.error("[admin] gallery add:", error);
    }
  } catch (error) {
    console.error("[admin] gallery add failed:", error);
    outcome = fail("Could not reach database to add the image.");
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
    outcome = fail("Could not reach Supabase storage for the upload. Use URL input instead.");
  }

  if (!outcome.ok || !publicUrl) {
    await adminError(outcome.ok ? "Upload produced no url." : outcome.message, GALLERY_TAB);
    return;
  }

  let insertOutcome: Outcome;
  try {
    const sql = getDb();
    if (sql) {
      await sql`
        INSERT INTO gallery (url, alt_text, category, sort_order, featured, active)
        VALUES (
          ${publicUrl},
          ${altText || null},
          ${categoryValue},
          ${sortOrder},
          false,
          true
        )
      `;
      insertOutcome = ok;
    } else {
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
    }
  } catch (error) {
    console.error("[admin] gallery row save failed:", error);
    insertOutcome = fail("Could not reach database to save the gallery row.");
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
    const sql = getDb();
    if (sql) {
      await sql`
        UPDATE gallery SET
          alt_text = ${parsed.data.altText || null},
          category = ${parsed.data.category},
          sort_order = ${parsed.data.sortOrder},
          featured = ${parsed.data.featured},
          active = ${parsed.data.active}
        WHERE id = ${parsed.data.id}
      `;
      outcome = ok;
    } else {
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
    }
  } catch (error) {
    console.error("[admin] gallery update failed:", error);
    outcome = fail("Could not reach database to update the image.");
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
    const sql = getDb();
    if (sql) {
      await sql`DELETE FROM gallery WHERE id = ${id.data}`;
      outcome = ok;
    } else {
      const supabase = supabaseOrThrow();
      const { error } = await supabase.from("gallery").delete().eq("id", id.data);
      outcome = error ? fail("Could not delete the gallery image.") : ok;
      if (error) console.error("[admin] gallery delete:", error);
    }
  } catch (error) {
    console.error("[admin] gallery delete failed:", error);
    outcome = fail("Could not reach database to delete the image.");
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
    const sql = getDb();
    if (sql) {
      for (const row of rows) {
        await sql`
          INSERT INTO gallery (url, alt_text, category, sort_order, featured, active)
          VALUES (${row.url}, ${row.alt_text}, ${row.category}, ${row.sort_order}, ${row.featured}, ${row.active})
          ON CONFLICT (url) DO UPDATE SET
            alt_text = EXCLUDED.alt_text,
            category = EXCLUDED.category,
            sort_order = EXCLUDED.sort_order,
            featured = EXCLUDED.featured,
            active = EXCLUDED.active;
        `;
      }
      outcome = ok;
    } else {
      const supabase = supabaseOrThrow();
      const { error } = await supabase
        .from("gallery")
        .upsert(rows, { onConflict: "url", ignoreDuplicates: true });
      outcome = error
        ? fail("Could not seed the gallery. Check the Supabase schema first.")
        : ok;
      if (error) console.error("[admin] gallery seed:", error);
    }
  } catch (error) {
    console.error("[admin] gallery seed failed:", error);
    outcome = fail("Could not reach database to seed the gallery.");
  }

  await finish(outcome, "Static gallery rows were seeded into database.", GALLERY_TAB, true);
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
    const sql = getDb();
    if (sql) {
      await sql`
        INSERT INTO testimonials (client_name, quote, branch, rating, featured)
        VALUES (
          ${parsed.data.clientName},
          ${parsed.data.quote},
          ${parsed.data.branch === "" ? null : parsed.data.branch},
          ${parsed.data.rating},
          ${parsed.data.featured}
        )
      `;
      outcome = ok;
    } else {
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
    }
  } catch (error) {
    console.error("[admin] testimonial add failed:", error);
    outcome = fail("Could not reach database to add the testimonial.");
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
    const sql = getDb();
    if (sql) {
      await sql`
        UPDATE testimonials
        SET featured = ${featured}
        WHERE id = ${id.data}
      `;
      outcome = ok;
    } else {
      const supabase = supabaseOrThrow();
      const { error } = await supabase
        .from("testimonials")
        .update({ featured })
        .eq("id", id.data);
      outcome = error ? fail("Could not update the testimonial.") : ok;
      if (error) console.error("[admin] testimonial update:", error);
    }
  } catch (error) {
    console.error("[admin] testimonial update failed:", error);
    outcome = fail("Could not reach database to update the testimonial.");
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
    const sql = getDb();
    if (sql) {
      await sql`DELETE FROM testimonials WHERE id = ${id.data}`;
      outcome = ok;
    } else {
      const supabase = supabaseOrThrow();
      const { error } = await supabase.from("testimonials").delete().eq("id", id.data);
      outcome = error ? fail("Could not delete the testimonial.") : ok;
      if (error) console.error("[admin] testimonial delete:", error);
    }
  } catch (error) {
    console.error("[admin] testimonial delete failed:", error);
    outcome = fail("Could not reach database to delete the testimonial.");
  }

  await finish(outcome, "Testimonial deleted.", TESTIMONIALS_TAB, true);
}

const PRICING_TAB = "pricing";

const waxPriceUpdateSchema = z.object({
  id: z.string().uuid(),
  area: z.string().trim().min(1).max(100),
  category: z.enum(["face", "body", "intimate"]),
  lyconPinkini: z.coerce.number().int().min(0).optional().nullable(),
  lyconSuperberry: z.coerce.number().int().min(0).optional().nullable(),
  lyconAloeVera: z.coerce.number().int().min(0).optional().nullable(),
  ricaWhiteChoc: z.coerce.number().int().min(0).optional().nullable(),
  biahuGold: z.coerce.number().int().min(0).optional().nullable(),
  note: z.string().trim().max(300).optional().nullable(),
  sortOrder: z.coerce.number().int().min(0).max(999),
  active: z.boolean(),
});

export async function updateWaxPrice(formData: FormData) {
  await requireAdminMutation();

  const parseNum = (val: FormDataEntryValue | null) => {
    if (!val || String(val).trim() === "") return null;
    const n = Number(val);
    return Number.isFinite(n) && n > 0 ? n : null;
  };

  const parsed = waxPriceUpdateSchema.safeParse({
    id: formData.get("id"),
    area: formData.get("area"),
    category: formData.get("category"),
    lyconPinkini: parseNum(formData.get("lyconPinkini")),
    lyconSuperberry: parseNum(formData.get("lyconSuperberry")),
    lyconAloeVera: parseNum(formData.get("lyconAloeVera")),
    ricaWhiteChoc: parseNum(formData.get("ricaWhiteChoc")),
    biahuGold: parseNum(formData.get("biahuGold")),
    note: formData.get("note") ? String(formData.get("note")).trim() : null,
    sortOrder: formData.get("sortOrder"),
    active: formData.get("active") === "on",
  });

  if (!parsed.success) {
    await adminError("Check the pricing fields and try again.", PRICING_TAB);
    return;
  }

  let outcome: Outcome;
  try {
    const sql = getDb();
    if (sql) {
      await sql`
        UPDATE wax_prices SET
          area = ${parsed.data.area},
          category = ${parsed.data.category},
          lycon_pinkini = ${parsed.data.lyconPinkini},
          lycon_superberry = ${parsed.data.lyconSuperberry},
          lycon_aloe_vera = ${parsed.data.lyconAloeVera},
          rica_white_choc = ${parsed.data.ricaWhiteChoc},
          biahu_gold = ${parsed.data.biahuGold},
          note = ${parsed.data.note},
          sort_order = ${parsed.data.sortOrder},
          active = ${parsed.data.active}
        WHERE id = ${parsed.data.id}
      `;
      outcome = ok;
    } else {
      const supabase = supabaseOrThrow();
      const { error } = await supabase
        .from("wax_prices")
        .update({
          area: parsed.data.area,
          category: parsed.data.category,
          lycon_pinkini: parsed.data.lyconPinkini,
          lycon_superberry: parsed.data.lyconSuperberry,
          lycon_aloe_vera: parsed.data.lyconAloeVera,
          rica_white_choc: parsed.data.ricaWhiteChoc,
          biahu_gold: parsed.data.biahuGold,
          note: parsed.data.note,
          sort_order: parsed.data.sortOrder,
          active: parsed.data.active,
        })
        .eq("id", parsed.data.id);
      outcome = error ? fail("Could not update the wax pricing row.") : ok;
      if (error) console.error("[admin] wax price update:", error);
    }
  } catch (error) {
    console.error("[admin] wax price update failed:", error);
    outcome = fail("Could not reach database to update wax pricing.");
  }

  await finish(outcome, `Wax pricing for ${parsed.data.area} updated.`, PRICING_TAB, true);
}

const waxPackageUpdateSchema = z.object({
  id: z.string().min(1).max(100),
  name: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(500),
  inclusions: z.string().trim(),
  priceEssential: z.coerce.number().int().min(0),
  pricePremium: z.coerce.number().int().min(0),
  duration: z.string().trim().min(1).max(50),
  tag: z.string().trim().max(50).optional().nullable(),
  sortOrder: z.coerce.number().int().min(0).max(999),
  active: z.boolean(),
});

export async function updateWaxPackage(formData: FormData) {
  await requireAdminMutation();

  const parsed = waxPackageUpdateSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    description: formData.get("description"),
    inclusions: formData.get("inclusions"),
    priceEssential: formData.get("priceEssential"),
    pricePremium: formData.get("pricePremium"),
    duration: formData.get("duration"),
    tag: formData.get("tag") ? String(formData.get("tag")).trim() : null,
    sortOrder: formData.get("sortOrder"),
    active: formData.get("active") === "on",
  });

  if (!parsed.success) {
    await adminError("Check the package fields and try again.", PRICING_TAB);
    return;
  }

  const inclusionsArray = parsed.data.inclusions
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  let outcome: Outcome;
  try {
    const sql = getDb();
    if (sql) {
      await sql`
        UPDATE wax_packages SET
          name = ${parsed.data.name},
          description = ${parsed.data.description},
          inclusions = ${inclusionsArray},
          price_essential = ${parsed.data.priceEssential},
          price_premium = ${parsed.data.pricePremium},
          duration = ${parsed.data.duration},
          tag = ${parsed.data.tag},
          sort_order = ${parsed.data.sortOrder},
          active = ${parsed.data.active}
        WHERE id = ${parsed.data.id}
      `;
      outcome = ok;
    } else {
      const supabase = supabaseOrThrow();
      const { error } = await supabase
        .from("wax_packages")
        .update({
          name: parsed.data.name,
          description: parsed.data.description,
          inclusions: inclusionsArray,
          price_essential: parsed.data.priceEssential,
          price_premium: parsed.data.pricePremium,
          duration: parsed.data.duration,
          tag: parsed.data.tag,
          sort_order: parsed.data.sortOrder,
          active: parsed.data.active,
        })
        .eq("id", parsed.data.id);
      outcome = error ? fail("Could not update the wax package.") : ok;
      if (error) console.error("[admin] wax package update:", error);
    }
  } catch (error) {
    console.error("[admin] wax package update failed:", error);
    outcome = fail("Could not reach database to update wax package.");
  }

  await finish(outcome, `Package ${parsed.data.name} updated.`, PRICING_TAB, true);
}

export async function seedWaxPricingFromStatic() {
  await requireAdminMutation();

  function detectCategory(area: string): "face" | "body" | "intimate" {
    const lower = area.toLowerCase();
    if (lower.includes("brazilian") || lower.includes("underarm")) return "intimate";
    if (
      lower.includes("lip") ||
      lower.includes("eyebrow") ||
      lower.includes("forehead") ||
      lower.includes("nose") ||
      lower.includes("chin") ||
      lower.includes("face")
    ) {
      return "face";
    }
    return "body";
  }

  const priceRows = WAX_PRICE_ROWS.map((row, index) => ({
    area: row.area,
    category: detectCategory(row.area),
    lycon_pinkini: row.prices["lycon-pinkini"] ?? null,
    lycon_superberry: row.prices["lycon-superberry"] ?? null,
    lycon_aloe_vera: row.prices["lycon-aloe-vera"] ?? null,
    rica_white_choc: row.prices["rica-white-choc"] ?? null,
    biahu_gold: row.prices["biahu-gold"] ?? null,
    note: row.note ?? null,
    sort_order: (index + 1) * 10,
    active: true,
  }));

  const packageRows = WAX_PACKAGES.map((pkg, index) => ({
    id: pkg.id,
    name: pkg.name,
    description: pkg.description,
    inclusions: pkg.inclusions,
    price_essential: pkg.prices.essential,
    price_premium: pkg.prices.premium,
    duration: pkg.duration,
    tag: pkg.tag ?? null,
    sort_order: (index + 1) * 10,
    active: true,
  }));

  let outcome: Outcome;
  try {
    const sql = getDb();
    if (sql) {
      for (const row of priceRows) {
        await sql`
          INSERT INTO wax_prices (area, category, lycon_pinkini, lycon_superberry, lycon_aloe_vera, rica_white_choc, biahu_gold, note, sort_order, active)
          VALUES (${row.area}, ${row.category}, ${row.lycon_pinkini}, ${row.lycon_superberry}, ${row.lycon_aloe_vera}, ${row.rica_white_choc}, ${row.biahu_gold}, ${row.note}, ${row.sort_order}, ${row.active})
          ON CONFLICT (area) DO UPDATE SET
            category = EXCLUDED.category,
            lycon_pinkini = EXCLUDED.lycon_pinkini,
            lycon_superberry = EXCLUDED.lycon_superberry,
            lycon_aloe_vera = EXCLUDED.lycon_aloe_vera,
            rica_white_choc = EXCLUDED.rica_white_choc,
            biahu_gold = EXCLUDED.biahu_gold,
            note = EXCLUDED.note,
            sort_order = EXCLUDED.sort_order,
            active = EXCLUDED.active;
        `;
      }
      for (const pkg of packageRows) {
        await sql`
          INSERT INTO wax_packages (id, name, description, inclusions, price_essential, price_premium, duration, tag, sort_order, active)
          VALUES (${pkg.id}, ${pkg.name}, ${pkg.description}, ${pkg.inclusions}, ${pkg.price_essential}, ${pkg.price_premium}, ${pkg.duration}, ${pkg.tag}, ${pkg.sort_order}, ${pkg.active})
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            description = EXCLUDED.description,
            inclusions = EXCLUDED.inclusions,
            price_essential = EXCLUDED.price_essential,
            price_premium = EXCLUDED.price_premium,
            duration = EXCLUDED.duration,
            tag = EXCLUDED.tag,
            sort_order = EXCLUDED.sort_order,
            active = EXCLUDED.active;
        `;
      }
      outcome = ok;
    } else {
      const supabase = supabaseOrThrow();
      const [pRes, pkgRes] = await Promise.all([
        supabase.from("wax_prices").upsert(priceRows, { onConflict: "area" }),
        supabase.from("wax_packages").upsert(packageRows, { onConflict: "id" }),
      ]);

      if (pRes.error || pkgRes.error) {
        console.error("[admin] wax pricing seed error:", pRes.error || pkgRes.error);
        outcome = fail("Could not seed pricing. Confirm the database migration script was executed.");
      } else {
        outcome = ok;
      }
    }
  } catch (error) {
    console.error("[admin] wax pricing seed failed:", error);
    outcome = fail("Could not reach database to seed pricing.");
  }

  await finish(outcome, "Wax pricing and packages seeded from static menu.", PRICING_TAB, true);
}

const waxPriceCreateSchema = z.object({
  area: z.string().trim().min(1).max(100),
  category: z.enum(["face", "body", "intimate"]),
  lyconPinkini: z.coerce.number().int().min(0).optional().nullable(),
  lyconSuperberry: z.coerce.number().int().min(0).optional().nullable(),
  lyconAloeVera: z.coerce.number().int().min(0).optional().nullable(),
  ricaWhiteChoc: z.coerce.number().int().min(0).optional().nullable(),
  biahuGold: z.coerce.number().int().min(0).optional().nullable(),
  note: z.string().trim().max(300).optional().nullable(),
  sortOrder: z.coerce.number().int().min(0).max(999).default(99),
});

export async function createWaxPrice(formData: FormData) {
  await requireAdminMutation();

  const parseNum = (val: FormDataEntryValue | null) => {
    if (!val || String(val).trim() === "") return null;
    const n = Number(val);
    return Number.isFinite(n) && n > 0 ? n : null;
  };

  const parsed = waxPriceCreateSchema.safeParse({
    area: formData.get("area"),
    category: formData.get("category"),
    lyconPinkini: parseNum(formData.get("lyconPinkini")),
    lyconSuperberry: parseNum(formData.get("lyconSuperberry")),
    lyconAloeVera: parseNum(formData.get("lyconAloeVera")),
    ricaWhiteChoc: parseNum(formData.get("ricaWhiteChoc")),
    biahuGold: parseNum(formData.get("biahuGold")),
    note: formData.get("note") ? String(formData.get("note")).trim() : null,
    sortOrder: formData.get("sortOrder") || 99,
  });

  if (!parsed.success) {
    await adminError("Check the treatment area fields and try again.", PRICING_TAB);
    return;
  }

  let outcome: Outcome;
  try {
    const sql = getDb();
    if (sql) {
      await sql`
        INSERT INTO wax_prices (area, category, lycon_pinkini, lycon_superberry, lycon_aloe_vera, rica_white_choc, biahu_gold, note, sort_order, active)
        VALUES (
          ${parsed.data.area},
          ${parsed.data.category},
          ${parsed.data.lyconPinkini},
          ${parsed.data.lyconSuperberry},
          ${parsed.data.lyconAloeVera},
          ${parsed.data.ricaWhiteChoc},
          ${parsed.data.biahuGold},
          ${parsed.data.note},
          ${parsed.data.sortOrder},
          true
        )
        ON CONFLICT (area) DO UPDATE SET
          category = EXCLUDED.category,
          lycon_pinkini = EXCLUDED.lycon_pinkini,
          lycon_superberry = EXCLUDED.lycon_superberry,
          lycon_aloe_vera = EXCLUDED.lycon_aloe_vera,
          rica_white_choc = EXCLUDED.rica_white_choc,
          biahu_gold = EXCLUDED.biahu_gold,
          note = EXCLUDED.note,
          sort_order = EXCLUDED.sort_order,
          active = true;
      `;
      outcome = ok;
    } else {
      outcome = fail("Database not connected.");
    }
  } catch (error) {
    console.error("[admin] wax price create failed:", error);
    outcome = fail("Could not add treatment area.");
  }

  await finish(outcome, `Treatment area "${parsed.data.area}" added to price menu.`, PRICING_TAB, true);
}

export async function deleteWaxPrice(formData: FormData) {
  await requireAdminMutation();

  const id = z.string().uuid().safeParse(formData.get("id"));
  if (!id.success) {
    await adminError("Invalid treatment area reference.", PRICING_TAB);
    return;
  }

  let outcome: Outcome;
  try {
    const sql = getDb();
    if (sql) {
      await sql`DELETE FROM wax_prices WHERE id = ${id.data}`;
      outcome = ok;
    } else {
      outcome = fail("Database not connected.");
    }
  } catch (error) {
    console.error("[admin] wax price delete failed:", error);
    outcome = fail("Could not delete treatment area.");
  }

  await finish(outcome, "Treatment area removed from pricing.", PRICING_TAB, true);
}

const waxPackageCreateSchema = z.object({
  id: z.string().min(1).max(100),
  name: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(500),
  inclusions: z.string().trim(),
  priceEssential: z.coerce.number().int().min(0),
  pricePremium: z.coerce.number().int().min(0),
  duration: z.string().trim().min(1).max(50),
  tag: z.string().trim().max(50).optional().nullable(),
  sortOrder: z.coerce.number().int().min(0).max(999).default(99),
});

export async function createWaxPackage(formData: FormData) {
  await requireAdminMutation();

  let id = String(formData.get("id") || "").trim().toLowerCase();
  if (!id) {
    id = String(formData.get("name") || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  const parsed = waxPackageCreateSchema.safeParse({
    id,
    name: formData.get("name"),
    description: formData.get("description"),
    inclusions: formData.get("inclusions"),
    priceEssential: formData.get("priceEssential"),
    pricePremium: formData.get("pricePremium"),
    duration: formData.get("duration"),
    tag: formData.get("tag") ? String(formData.get("tag")).trim() : null,
    sortOrder: formData.get("sortOrder") || 99,
  });

  if (!parsed.success) {
    await adminError("Check the package bundle fields and try again.", PRICING_TAB);
    return;
  }

  const inclusionsArray = parsed.data.inclusions
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  let outcome: Outcome;
  try {
    const sql = getDb();
    if (sql) {
      await sql`
        INSERT INTO wax_packages (id, name, description, inclusions, price_essential, price_premium, duration, tag, sort_order, active)
        VALUES (
          ${parsed.data.id},
          ${parsed.data.name},
          ${parsed.data.description},
          ${inclusionsArray},
          ${parsed.data.priceEssential},
          ${parsed.data.pricePremium},
          ${parsed.data.duration},
          ${parsed.data.tag},
          ${parsed.data.sortOrder},
          true
        )
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          inclusions = EXCLUDED.inclusions,
          price_essential = EXCLUDED.price_essential,
          price_premium = EXCLUDED.price_premium,
          duration = EXCLUDED.duration,
          tag = EXCLUDED.tag,
          sort_order = EXCLUDED.sort_order,
          active = true;
      `;
      outcome = ok;
    } else {
      outcome = fail("Database not connected.");
    }
  } catch (error) {
    console.error("[admin] wax package create failed:", error);
    outcome = fail("Could not add package bundle.");
  }

  await finish(outcome, `Package bundle "${parsed.data.name}" added to menu.`, PRICING_TAB, true);
}

export async function deleteWaxPackage(formData: FormData) {
  await requireAdminMutation();

  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    await adminError("Invalid package reference.", PRICING_TAB);
    return;
  }

  let outcome: Outcome;
  try {
    const sql = getDb();
    if (sql) {
      await sql`DELETE FROM wax_packages WHERE id = ${id}`;
      outcome = ok;
    } else {
      outcome = fail("Database not connected.");
    }
  } catch (error) {
    console.error("[admin] wax package delete failed:", error);
    outcome = fail("Could not delete package bundle.");
  }

  await finish(outcome, "Package bundle deleted.", PRICING_TAB, true);
}
