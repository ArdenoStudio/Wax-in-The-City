import {
  addTestimonial,
  deleteTestimonial,
  toggleTestimonialFeatured,
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

interface TestimonialRow {
  id: string;
  client_name: string;
  quote: string;
  branch: string | null;
  rating: number | null;
  featured: boolean | null;
}

const BRANCH_OPTIONS = [
  { value: "", label: "No branch" },
  { value: "battaramulla", label: "Battaramulla" },
  { value: "nugegoda", label: "Nugegoda" },
];

export async function TestimonialsSection() {
  const admin = createAdminClient();
  let rows: TestimonialRow[] = [];
  let loadError = !admin;

  if (admin) {
    try {
      const { data, error } = await admin
        .from("testimonials")
        .select("id, client_name, quote, branch, rating, featured")
        .order("created_at", { ascending: false });
      loadError = Boolean(error);
      rows = (data as TestimonialRow[] | null) ?? [];
    } catch {
      loadError = true;
    }
  }

  return (
    <div className="grid gap-5">
      {loadError && (
        <AdminStatusMessage tone="error">
          Could not load testimonials. The service role env vars and schema must be configured.
        </AdminStatusMessage>
      )}

      <AdminPlate>
        <h2 className="font-serif text-h4 text-cream text-balance">Add testimonial</h2>
        <form action={addTestimonial} className="mt-4 grid gap-4">
          <div className="grid gap-4 lg:grid-cols-[1fr_180px_90px]">
            <AdminFieldLabel label="Client name">
              <input name="clientName" required minLength={2} maxLength={120} className={ADMIN_INPUT_CLASS} />
            </AdminFieldLabel>
            <AdminFieldLabel label="Branch">
              <select name="branch" className={ADMIN_SELECT_CLASS} defaultValue="">
                {BRANCH_OPTIONS.map((option) => (
                  <option key={option.value || "none"} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </AdminFieldLabel>
            <AdminFieldLabel label="Rating">
              <input name="rating" type="number" min="1" max="5" defaultValue={5} className={ADMIN_INPUT_CLASS} />
            </AdminFieldLabel>
          </div>
          <AdminFieldLabel label="Quote">
            <textarea
              name="quote"
              required
              minLength={5}
              maxLength={600}
              rows={3}
              className={`${ADMIN_INPUT_CLASS} py-3`}
            />
          </AdminFieldLabel>
          <label className="inline-flex w-fit items-center gap-2 text-body-sm text-warm-grey">
            <input name="featured" type="checkbox" className="h-4 w-4 accent-brand-action" />
            Featured on site
          </label>
          <button type="submit" className={`${ADMIN_PRIMARY_BUTTON_CLASS} w-fit`}>
            Add testimonial
          </button>
        </form>
      </AdminPlate>

      {rows.map((row) => (
        <AdminPlate key={row.id}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-serif text-h4 text-cream">{row.client_name}</h3>
                {row.branch && (
                  <span className="rounded-pill bg-brand-mist px-3 py-1 text-caption font-semibold uppercase tracking-[0.08em] text-brand-action">
                    {row.branch}
                  </span>
                )}
                <span className="text-caption text-cream/55">{row.rating ?? 5} of 5 stars</span>
              </div>
              <p className="mt-2 max-w-xl text-body-sm text-cream/80 text-pretty">{row.quote}</p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <form action={toggleTestimonialFeatured}>
                <input type="hidden" name="id" value={row.id} />
                <input type="hidden" name="featured" value={String(!(row.featured ?? false))} />
                <button
                  type="submit"
                  className={`inline-flex h-10 items-center rounded-pill border px-4 text-body-sm font-medium transition-colors ${
                    row.featured
                      ? "border-gold/40 bg-gold/12 text-brand-light hover:bg-gold/20"
                      : "border-cream/16 text-cream/80 hover:bg-cream/10"
                  }`}
                >
                  {row.featured ? "Featured" : "Feature"}
                </button>
              </form>
              <form action={deleteTestimonial}>
                <input type="hidden" name="id" value={row.id} />
                <button
                  type="submit"
                  className="inline-flex h-10 items-center rounded-pill border border-error/40 px-4 text-caption font-semibold uppercase tracking-[0.12em] text-brand-light transition-colors hover:bg-error/15"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </AdminPlate>
      ))}
    </div>
  );
}
