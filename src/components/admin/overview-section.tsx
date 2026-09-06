import { createAdminClient } from "@/lib/supabase/admin";
import { getDb } from "@/lib/db";
import { whatsappLink } from "@/lib/site";
import { AdminPlate, AdminStatusMessage } from "@/components/admin/primitives";
import { Activity, CheckCircle2, AlertTriangle, Database, Server, Layers } from "lucide-react";

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

interface TableAudit {
  name: string;
  count: number;
  description: string;
}

export async function OverviewSection() {
  const admin = createAdminClient();
  const sql = getDb();

  const stats = [
    { label: "Pending bookings", value: 0 },
    { label: "Total bookings", value: 0 },
    { label: "Active services", value: 0 },
    { label: "Featured gallery items", value: 0 },
  ];
  let connected = false;
  let databaseName = "Database";
  let latencyMs: number | null = null;
  let latest: LatestBookingRow[] = [];
  let tableAudits: TableAudit[] = [];

  // 1. Neon Database Support
  if (sql) {
    try {
      const startTime = performance.now();
      const [pendingRes, totalRes, servicesRes, galleryRes, pricesRes, packagesRes, reviewsRes, analyticsRes] = await Promise.all([
        sql`SELECT COUNT(*)::int AS count FROM booking_requests WHERE status = 'pending'`,
        sql`SELECT COUNT(*)::int AS count FROM booking_requests`,
        sql`SELECT COUNT(*)::int AS count FROM services WHERE active = true`,
        sql`SELECT COUNT(*)::int AS count FROM gallery WHERE featured = true`,
        sql`SELECT COUNT(*)::int AS count FROM wax_prices WHERE active = true`,
        sql`SELECT COUNT(*)::int AS count FROM wax_packages WHERE active = true`,
        sql`SELECT COUNT(*)::int AS count FROM testimonials`,
        sql`SELECT COUNT(*)::int AS count FROM analytics_events`,
      ]);
      latencyMs = Math.round(performance.now() - startTime);

      connected = true;
      databaseName = "Neon Database";
      stats[0].value = pendingRes[0]?.count ?? 0;
      stats[1].value = totalRes[0]?.count ?? 0;
      stats[2].value = servicesRes[0]?.count ?? 0;
      stats[3].value = galleryRes[0]?.count ?? 0;

      tableAudits = [
        { name: "Wax Price Matrix", count: pricesRes[0]?.count ?? 0, description: "Active body & facial areas" },
        { name: "Bundled Packages", count: packagesRes[0]?.count ?? 0, description: "Curated waxing bundles" },
        { name: "Services Menu", count: servicesRes[0]?.count ?? 0, description: "Spa & facial treatments" },
        { name: "Customer Bookings", count: totalRes[0]?.count ?? 0, description: "Total online requests" },
        { name: "Testimonials", count: reviewsRes[0]?.count ?? 0, description: "Published client quotes" },
        { name: "Analytics Events", count: analyticsRes[0]?.count ?? 0, description: "Tracked visitor interactions" },
      ];

      const latestRows = await sql`
        SELECT name, phone, branch, service_preference, status, created_at
        FROM booking_requests
        ORDER BY created_at DESC
        LIMIT 5
      `;
      latest = latestRows as LatestBookingRow[];
    } catch (e) {
      console.error("[neon] overview query error:", e);
    }
  }

  // 2. Supabase Fallback
  if (!connected && admin) {
    try {
      const startTime = performance.now();
      const [pending, total, services, galleryFeatured] = await Promise.all([
        countRows(admin, "booking_requests", { status: "pending" }),
        countRows(admin, "booking_requests"),
        countRows(admin, "services", { active: true }),
        countRows(admin, "gallery", { featured: true }),
      ]);
      latencyMs = Math.round(performance.now() - startTime);

      connected = !pending.error && !total.error && !services.error && !galleryFeatured.error;
      databaseName = "Supabase";

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
      {/* Top Status & Health Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-card border border-cream/10 bg-cream/[0.03] p-4">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center gap-2 rounded-pill border px-3.5 py-1.5 text-caption font-semibold uppercase tracking-[0.12em] ${
              connected
                ? "border-success/30 bg-success/12 text-cream"
                : "border-error/30 bg-error/10 text-brand-light"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-pill ${connected ? "bg-success" : "bg-error"}`}
            />
            {connected ? `${databaseName} connected` : "Database offline"}
          </span>

          {latencyMs !== null && (
            <span className="inline-flex items-center gap-1.5 rounded-pill border border-cream/10 bg-cream/5 px-3 py-1 text-caption text-cream/75">
              <Activity className="h-3.5 w-3.5 text-brand-light" />
              Query latency: <strong className="text-cream font-mono">{latencyMs} ms</strong>
            </span>
          )}

          <span className="inline-flex items-center gap-1.5 rounded-pill border border-cream/10 bg-cream/5 px-3 py-1 text-caption text-cream/75">
            <Server className="h-3.5 w-3.5 text-brand-light" />
            Cloudflare Workers Edge
          </span>
        </div>

        <div className="flex items-center gap-2 text-caption font-medium text-cream/70">
          {connected ? (
            <span className="inline-flex items-center gap-1.5 text-success">
              <CheckCircle2 className="h-4 w-4" />
              All systems operational
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-error">
              <AlertTriangle className="h-4 w-4" />
              System attention required
            </span>
          )}
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>

      {/* Diagnostic & Database Record Audit */}
      {connected && tableAudits.length > 0 && (
        <AdminPlate>
          <div className="flex items-center justify-between border-b border-cream/10 pb-4">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-brand-light" />
              <h2 className="font-serif text-h3 text-cream">System Health & Table Integrity</h2>
            </div>
            <span className="rounded-pill bg-cream/5 px-3 py-1 text-caption font-semibold uppercase tracking-wider text-warm-grey">
              Live Database Audit
            </span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tableAudits.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-card border border-cream/10 bg-cream/[0.02] p-3.5"
              >
                <div>
                  <p className="text-body-sm font-medium text-cream">{item.name}</p>
                  <p className="text-caption text-cream/60">{item.description}</p>
                </div>
                <span className="font-serif text-h3 font-medium text-brand-light">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </AdminPlate>
      )}

      {/* Latest Bookings */}
      <AdminPlate>
        <h2 className="font-serif text-h3 text-cream text-balance">Latest booking requests</h2>
        {!connected && (
          <div className="mt-4">
            <AdminStatusMessage tone="error">
              Database is offline or not configured, so the inbox is unavailable.
            </AdminStatusMessage>
          </div>
        )}
        {connected && latest.length === 0 && (
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
