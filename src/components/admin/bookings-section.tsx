import { updateBookingStatus } from "@/app/admin/dashboard-actions";
import { createAdminClient } from "@/lib/supabase/admin";
import { normalizeWhatsApp } from "@/lib/site";
import {
  AdminFieldLabel,
  AdminPlate,
  AdminStatusMessage,
  ADMIN_SELECT_CLASS,
  ADMIN_PRIMARY_BUTTON_CLASS,
} from "@/components/admin/primitives";

interface BookingRow {
  id: string;
  name: string;
  phone: string;
  branch: string;
  service_preference: string | null;
  preferred_date: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "cancelled", label: "Cancelled" },
];

function formatTimestamp(value: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export async function BookingsSection() {
  const admin = createAdminClient();
  let rows: BookingRow[] = [];
  let loadError = !admin;

  if (admin) {
    try {
      const { data, error } = await admin
        .from("booking_requests")
        .select(
          "id, name, phone, branch, service_preference, preferred_date, message, status, created_at"
        )
        .order("created_at", { ascending: false })
        .limit(50);
      loadError = Boolean(error);
      rows = (data as BookingRow[] | null) ?? [];
    } catch {
      loadError = true;
    }
  }

  return (
    <div className="grid gap-5">
      {loadError && (
        <AdminStatusMessage tone="error">
          Could not load booking requests. The service role env vars and schema must be configured.
        </AdminStatusMessage>
      )}

      {!loadError && rows.length === 0 && (
        <AdminPlate>
          <p className="text-body-sm text-cream/60">No booking requests yet.</p>
        </AdminPlate>
      )}

      {rows.map((row) => (
        <AdminPlate key={row.id}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-serif text-h4 text-cream">{row.name}</h3>
                <span className="rounded-pill bg-brand-mist px-3 py-1 text-caption font-semibold uppercase tracking-[0.08em] text-brand-action">
                  {row.branch}
                </span>
                <span className="text-caption text-cream/55">{formatTimestamp(row.created_at)}</span>
              </div>
              <p className="mt-2 text-body-sm text-cream/75">
                {row.service_preference ?? "No service preference"}
                {row.preferred_date ? ` · Preferred date ${row.preferred_date}` : ""}
              </p>

              {row.message && (
                <details className="mt-3 max-w-xl rounded-card border border-cream/10 px-4 py-3">
                  <summary className="cursor-pointer text-caption font-semibold uppercase tracking-[0.12em] text-warm-grey">
                    Message
                  </summary>
                  <p className="mt-2 text-body-sm whitespace-pre-line text-cream/80">{row.message}</p>
                </details>
              )}
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-end lg:flex-col">
              <a
                href={`https://wa.me/${normalizeWhatsApp(row.phone)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-pill border border-success/40 px-4 text-body-sm font-medium text-cream transition-colors hover:bg-success/15"
              >
                WhatsApp {row.phone}
              </a>

              <form action={updateBookingStatus} className="flex items-end gap-2">
                <input type="hidden" name="id" value={row.id} />
                <AdminFieldLabel label="Status">
                  <select name="status" defaultValue={row.status} className={ADMIN_SELECT_CLASS}>
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </AdminFieldLabel>
                <button type="submit" className={`${ADMIN_PRIMARY_BUTTON_CLASS} h-11`}>
                  Save
                </button>
              </form>
            </div>
          </div>
        </AdminPlate>
      ))}
    </div>
  );
}
