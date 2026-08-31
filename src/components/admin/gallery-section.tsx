import Image from "next/image";
import {
  addGalleryImage,
  deleteGalleryImage,
  seedGalleryFromStatic,
  updateGalleryRow,
  uploadGalleryImage,
} from "@/app/admin/dashboard-actions";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  AdminFieldLabel,
  AdminPlate,
  AdminStatusMessage,
  ADMIN_INPUT_CLASS,
  ADMIN_PRIMARY_BUTTON_CLASS,
  ADMIN_SELECT_CLASS,
} from "@/components/admin/primitives";

interface GalleryRow {
  id: string;
  url: string;
  alt_text: string | null;
  category: string | null;
  featured: boolean | null;
  active: boolean | null;
  sort_order: number | null;
}

const GALLERY_CATEGORIES = [
  { value: "salon", label: "Salon" },
  { value: "before-after", label: "Before and after" },
  { value: "results", label: "Results" },
  { value: "events", label: "Events" },
];

async function probeGalleryStorage(
  admin: NonNullable<ReturnType<typeof createAdminClient>>
): Promise<boolean> {
  try {
    const { error } = await admin.storage.getBucket("gallery");
    return !error;
  } catch {
    return false;
  }
}

export async function GallerySection() {
  const admin = createAdminClient();
  let rows: GalleryRow[] = [];
  let loadError = !admin;
  let storageReady = false;

  if (admin) {
    try {
      const [{ data, error }, bucketReady] = await Promise.all([
        admin
          .from("gallery")
          .select("id, url, alt_text, category, featured, active, sort_order")
          .order("sort_order", { ascending: true }),
        probeGalleryStorage(admin),
      ]);
      loadError = Boolean(error);
      rows = (data as GalleryRow[] | null) ?? [];
      storageReady = bucketReady;
    } catch {
      loadError = true;
    }
  }

  return (
    <div className="grid gap-5">
      {loadError && (
        <AdminStatusMessage tone="error">
          Could not load the gallery. The service role env vars and schema must be configured.
        </AdminStatusMessage>
      )}

      {!loadError && rows.length === 0 && (
        <AdminPlate>
          <h2 className="font-serif text-h3 text-cream text-balance">
            No gallery rows in Supabase yet
          </h2>
          <p className="mt-2 max-w-2xl text-body-sm text-warm-grey text-pretty">
            Seed the curated static gallery into Supabase to start managing it from here.
          </p>
          <form action={seedGalleryFromStatic} className="mt-5">
            <button type="submit" className={ADMIN_PRIMARY_BUTTON_CLASS}>
              Seed static gallery
            </button>
          </form>
        </AdminPlate>
      )}

      {rows.length > 0 && (
        <>
          <AdminPlate>
            <h2 className="font-serif text-h4 text-cream text-balance">Add image by url</h2>
            <form action={addGalleryImage} className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr_160px_110px]">
              <AdminFieldLabel label="Image url">
                <input name="url" type="text" required placeholder="/images/gallery/..." className={ADMIN_INPUT_CLASS} />
              </AdminFieldLabel>
              <AdminFieldLabel label="Alt text">
                <input name="altText" type="text" maxLength={300} className={ADMIN_INPUT_CLASS} />
              </AdminFieldLabel>
              <AdminFieldLabel label="Category">
                <select name="category" className={ADMIN_SELECT_CLASS} defaultValue="salon">
                  {GALLERY_CATEGORIES.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </AdminFieldLabel>
              <AdminFieldLabel label="Order">
                <input name="sortOrder" type="number" min="0" defaultValue={99} className={ADMIN_INPUT_CLASS} />
              </AdminFieldLabel>
              <label className="inline-flex items-center gap-2 text-body-sm text-warm-grey lg:col-span-2">
                <input name="featured" type="checkbox" className="h-4 w-4 accent-brand-action" />
                Featured on site
              </label>
              <button type="submit" className={`${ADMIN_PRIMARY_BUTTON_CLASS} lg:col-span-2`}>
                Add image
              </button>
            </form>
          </AdminPlate>

          {admin && storageReady && (
            <AdminPlate>
              <h2 className="font-serif text-h4 text-cream text-balance">Upload to studio storage</h2>
              <p className="mt-2 max-w-2xl text-body-sm text-warm-grey text-pretty">
                Files go to the public gallery bucket in Supabase Storage. JPG, PNG, or WebP up to 8 MB.
              </p>
              <form action={uploadGalleryImage} className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr_160px_140px]">
                <AdminFieldLabel label="File">
                  <input
                    name="file"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    required
                    className={`${ADMIN_INPUT_CLASS} file:mr-3 file:rounded-pill file:border-0 file:bg-brand-action file:px-3 file:py-1.5 file:text-caption file:font-semibold file:text-cream`}
                  />
                </AdminFieldLabel>
                <AdminFieldLabel label="Alt text">
                  <input name="altText" type="text" maxLength={300} className={ADMIN_INPUT_CLASS} />
                </AdminFieldLabel>
                <AdminFieldLabel label="Category">
                  <select name="category" className={ADMIN_SELECT_CLASS} defaultValue="salon">
                    {GALLERY_CATEGORIES.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </AdminFieldLabel>
                <AdminFieldLabel label="Order">
                  <input name="sortOrder" type="number" min="0" defaultValue={99} className={ADMIN_INPUT_CLASS} />
                </AdminFieldLabel>
                <button type="submit" className={`${ADMIN_PRIMARY_BUTTON_CLASS} lg:col-span-4`}>
                  Upload image
                </button>
              </form>
            </AdminPlate>
          )}
        </>
      )}

      {rows.map((row) => (
        <AdminPlate key={row.id}>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-card border border-cream/10 sm:w-40">
              <Image
                src={row.url}
                alt={row.alt_text ?? ""}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <form action={updateGalleryRow} className="grid gap-4">
                <input type="hidden" name="id" value={row.id} />
                <div className="grid gap-4 lg:grid-cols-[1fr_180px_100px]">
                  <AdminFieldLabel label="Alt text">
                    <input name="altText" defaultValue={row.alt_text ?? ""} maxLength={300} className={ADMIN_INPUT_CLASS} />
                  </AdminFieldLabel>
                  <AdminFieldLabel label="Category">
                    <select name="category" defaultValue={row.category ?? "salon"} className={ADMIN_SELECT_CLASS}>
                      {GALLERY_CATEGORIES.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </AdminFieldLabel>
                  <AdminFieldLabel label="Order">
                    <input
                      name="sortOrder"
                      type="number"
                      min="0"
                      defaultValue={row.sort_order ?? 0}
                      className={ADMIN_INPUT_CLASS}
                    />
                  </AdminFieldLabel>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-4 text-body-sm text-warm-grey">
                    <label className="inline-flex items-center gap-2">
                      <input
                        name="active"
                        type="checkbox"
                        defaultChecked={row.active ?? true}
                        className="h-4 w-4 accent-brand-action"
                      />
                      Active
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input
                        name="featured"
                        type="checkbox"
                        defaultChecked={row.featured ?? false}
                        className="h-4 w-4 accent-brand-action"
                      />
                      Featured on site
                    </label>
                  </div>
                  <button type="submit" className={ADMIN_PRIMARY_BUTTON_CLASS}>
                    Save image
                  </button>
                </div>
              </form>

              <form action={deleteGalleryImage} className="mt-3 border-t border-cream/10 pt-3">
                <input type="hidden" name="id" value={row.id} />
                <button
                  type="submit"
                  className="inline-flex h-9 items-center rounded-pill border border-error/40 px-4 text-caption font-semibold uppercase tracking-[0.12em] text-brand-light transition-colors hover:bg-error/15"
                >
                  Delete row
                </button>
              </form>
            </div>
          </div>
        </AdminPlate>
      ))}
    </div>
  );
}
