import { createAdminClient } from "@/lib/supabase/admin";
import { whatsappLink } from "@/lib/site";
import { AdminPlate, AdminStatusMessage } from "@/components/admin/primitives";

interface StatCardProps {
  label: string;
  value: number | string;
  hint?: string;
}

function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <AdminPlate className="flex flex-col gap-2">
      <span className="text-caption font-semibold uppercase tracking-[0.12em] text-warm-grey">
        {label}
      </span>
      <span className="font-serif text-h1 font-medium text-cream">{value}</span>
      {hint && <span className="text-body-sm text-cream/60">{hint}</span>}
    </AdminPlate>
  );
}

type CountQuery = Promise<{ count: number | null; error: unknown }>;

async function countRows(
  admin: NonNullable<ReturnType<typeof createAdminClient>>,
  table: "booking_requests" | "services" | "gallery",
  filters?: Record<string, string | boolean>
): CountQuery {
  let query = admin.from(table).select("id", { count: "exact", head: true });
  if (filters) {
    for (const [column, value] of Object.entries(filters)) {
      query = query.eq(column, value);
    }
  }
  const result = await query;
  return { count: result.count, error: result.error };
}

interface LatestBookingRow {
  name: string;
  phone: string;
  branch: string;
  service_preference: string | null;
  status: string;
  created_at: string;
}

export async function OverviewSection() {
  const admin = createAdminClient();

  const stats = [
    { label: "Pending bookings", value: 0 },
    { label: "Total bookings", value: 0 },
    { label: "Active services", value: 0 },
    { label: "Featured gallery items", value: 0 },
  ];
  let connected = false;
  let latest: LatestBookingRow[] = [];

  if (admin) {
    try {
      const [pending, total, services, galleryFeatured] = await Promise.all([
        countRows(admin, "booking_requests", { status: "pending" }),
        countRows(admin, "booking_requests"),
        countRows(admin, "services", { active: true }),
        countRows(admin, "gallery", { featured: true }),
      ]);

      connected = !pending.error && !total.error && !services.error && !galleryFeatured.error;

      stats[0].value = pending.count ?? 0;
      stats[1].value = total.count ?? 0;
      stats[2].value = services.count ?? 0;
      stats[3].value = galleryFeatured.count ?? 0;

      if (connected) {
        const { data } = await admin
          .from("booking_requests")
          .select("name, phone, branch, service_preference, status, created_at")
          .order("created_at", { ascending: false })
          .limit(5);
        latest = (data as LatestBookingRow[] | null) ?? [];
      }
    } catch {
      connected = false;
    }
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`inline-flex items-center gap-2 rounded-pill border px-4 py-2 text-caption font-semibold uppercase tracking-[0.12em] ${
            connected
              ? "border-success/30 bg-success/12 text-cream"
              : "border-error/30 bg-error/10 text-brand-light"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-pill ${connected ? "bg-success" : "bg-error"}`}
          />
          {connected ? "Supabase connected" : "Supabase offline"}
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>

      <AdminPlate>
        <h2 className="font-serif text-h3 text-cream text-balance">Latest booking requests</h2>
        {!admin && (
          <div className="mt-4">
            <AdminStatusMessage tone="error">
              Supabase service role env vars are not configured, so the inbox is unavailable.
            </AdminStatusMessage>
          </div>
        )}
        {admin && latest.length === 0 && (
          <p className="mt-3 text-body-sm text-cream/60">
            No booking requests have arrived yet.
          </p>
        )}
        {latest.length > 0 && (
          <ul className="mt-4 grid gap-3">
            {latest.map((row) => (
              <li
                key={`${row.created_at}-${row.phone}`}
                className="flex flex-col gap-1 rounded-card border border-cream/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-body-sm font-medium text-cream">{row.name}</p>
                  <p className="text-caption text-cream/60">
                    {row.branch} · {row.service_preference ?? "No service preference"}
                  </p>
                </div>
                <a
                  href={whatsappLink(`Hello ${row.name}, regarding your Wax In The City request.`, row.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-sm font-medium text-brand-light underline-offset-4 hover:underline"
                >
                  WhatsApp {row.phone}
                </a>
              </li>
            ))}
          </ul>
        )}
      </AdminPlate>
    </div>
  );
}
