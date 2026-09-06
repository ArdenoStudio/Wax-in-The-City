import { createAdminClient } from "@/lib/supabase/admin";
import { getDb } from "@/lib/db";
import { AdminPlate } from "@/components/admin/primitives";
import {
  Smartphone,
  Monitor,
  Globe,
  MessageSquare,
  CalendarCheck,
  TrendingUp,
  Eye,
  Layers,
  ArrowRight,
} from "lucide-react";

interface PageStat {
  path: string;
  count: number;
}

interface SectionStat {
  section: string;
  count: number;
}

interface AnalyticsSummary {
  totalViews: number;
  totalImpressions: number;
  iosViews: number;
  androidViews: number;
  desktopViews: number;
  whatsAppClicks: number;
  bookingClicks: number;
  bookingSubmits: number;
  topPages: PageStat[];
  topSections: SectionStat[];
  recentEvents: Array<{
    id: string;
    event_type: string;
    path: string | null;
    device_type: string | null;
    branch: string | null;
    created_at: string;
    metadata?: Record<string, unknown> | null;
  }>;
}

async function getAnalyticsData(): Promise<AnalyticsSummary | null> {
  let events: AnalyticsSummary["recentEvents"] | null = null;
  let topPages: PageStat[] = [];
  let topSections: SectionStat[] = [];

  // 1. Neon Database Support
  const sql = getDb();
  if (sql) {
    try {
      const [eventRows, pageRows, sectionRows] = await Promise.all([
        sql`
          SELECT id, event_type, path, device_type, branch, metadata, created_at
          FROM analytics_events
          ORDER BY created_at DESC
          LIMIT 250
        `,
        sql`
          SELECT COALESCE(path, '/') as path, COUNT(*)::int as count
          FROM analytics_events
          WHERE event_type = 'page_view'
          GROUP BY path
          ORDER BY count DESC
          LIMIT 8
        `,
        sql`
          SELECT COALESCE(metadata->>'section', 'Hero') as section, COUNT(*)::int as count
          FROM analytics_events
          WHERE event_type IN ('section_view', 'impression')
          GROUP BY section
          ORDER BY count DESC
          LIMIT 8
        `,
      ]);

      events = eventRows as AnalyticsSummary["recentEvents"];
      topPages = pageRows as PageStat[];
      topSections = sectionRows as SectionStat[];
    } catch (e) {
      console.error("[neon] analytics query error:", e);
    }
  }

  // 2. Supabase Fallback
  if (!events) {
    const admin = createAdminClient();
    if (admin) {
      try {
        const { data } = await admin
          .from("analytics_events")
          .select("id, event_type, path, device_type, branch, metadata, created_at")
          .order("created_at", { ascending: false })
          .limit(250);
        events = (data as AnalyticsSummary["recentEvents"]) ?? null;
      } catch {
        events = null;
      }
    }
  }

  if (!events) return null;

  let totalViews = 0;
  let totalImpressions = 0;
  let iosViews = 0;
  let androidViews = 0;
  let desktopViews = 0;
  let whatsAppClicks = 0;
  let bookingClicks = 0;
  let bookingSubmits = 0;

  for (const ev of events) {
    if (ev.event_type === "page_view") {
      totalViews++;
      if (ev.device_type === "ios") iosViews++;
      else if (ev.device_type === "android") androidViews++;
      else desktopViews++;
    } else if (ev.event_type === "section_view" || ev.event_type === "impression") {
      totalImpressions++;
    } else if (ev.event_type === "whatsapp_click") {
      whatsAppClicks++;
    } else if (ev.event_type === "book_click") {
      bookingClicks++;
    } else if (ev.event_type === "booking_submit") {
      bookingSubmits++;
    }
  }

  return {
    totalViews,
    totalImpressions,
    iosViews,
    androidViews,
    desktopViews,
    whatsAppClicks,
    bookingClicks,
    bookingSubmits,
    topPages,
    topSections,
    recentEvents: events.slice(0, 15),
  };
}

export async function AnalyticsSection() {
  const data = await getAnalyticsData();

  const totalDeviceViews = (data?.iosViews ?? 0) + (data?.androidViews ?? 0) + (data?.desktopViews ?? 0) || 1;
  const iosPercent = Math.round(((data?.iosViews ?? 0) / totalDeviceViews) * 100);
  const androidPercent = Math.round(((data?.androidViews ?? 0) / totalDeviceViews) * 100);
  const desktopPercent = Math.round(((data?.desktopViews ?? 0) / totalDeviceViews) * 100);

  const totalConversions = (data?.whatsAppClicks ?? 0) + (data?.bookingClicks ?? 0);
  const conversionRate = data?.totalViews
    ? Math.round((totalConversions / data.totalViews) * 100)
    : 0;

  return (
    <div className="grid gap-6">
      {/* Overview Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <AdminPlate className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-caption font-semibold uppercase tracking-wider text-warm-grey">
            <span>Page Views</span>
            <Globe className="h-4 w-4 text-brand-light" />
          </div>
          <span className="font-serif text-h1 font-medium text-cream">{data?.totalViews ?? 0}</span>
          <span className="text-caption text-cream/60">Live visitor sessions</span>
        </AdminPlate>

        <AdminPlate className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-caption font-semibold uppercase tracking-wider text-warm-grey">
            <span>Section Views</span>
            <Eye className="h-4 w-4 text-brand-light" />
          </div>
          <span className="font-serif text-h1 font-medium text-cream">{data?.totalImpressions ?? 0}</span>
          <span className="text-caption text-cream/60">Scroll impressions</span>
        </AdminPlate>

        <AdminPlate className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-caption font-semibold uppercase tracking-wider text-warm-grey">
            <span>WhatsApp Clicks</span>
            <MessageSquare className="h-4 w-4 text-brand-light" />
          </div>
          <span className="font-serif text-h1 font-medium text-cream">{data?.whatsAppClicks ?? 0}</span>
          <span className="text-caption text-cream/60">Direct branch chats</span>
        </AdminPlate>

        <AdminPlate className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-caption font-semibold uppercase tracking-wider text-warm-grey">
            <span>Booking Inquiries</span>
            <CalendarCheck className="h-4 w-4 text-brand-light" />
          </div>
          <span className="font-serif text-h1 font-medium text-cream">{data?.bookingClicks ?? 0}</span>
          <span className="text-caption text-cream/60">Form visits & clicks</span>
        </AdminPlate>

        <AdminPlate className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-caption font-semibold uppercase tracking-wider text-warm-grey">
            <span>Action Rate</span>
            <TrendingUp className="h-4 w-4 text-brand-light" />
          </div>
          <span className="font-serif text-h1 font-medium text-cream">{conversionRate}%</span>
          <span className="text-caption text-cream/60">Total conversion share</span>
        </AdminPlate>
      </div>

      {/* Mobile Priority Breakdown: iOS vs Android vs Desktop */}
      <AdminPlate>
        <div className="flex items-center justify-between border-b border-cream/10 pb-4">
          <div>
            <h2 className="font-serif text-h3 text-cream">Visitor Devices & Mobile Share</h2>
            <p className="mt-1 text-body-sm text-warm-grey">
              Real-time platform breakdown — prioritizing iOS and Android mobile traffic.
            </p>
          </div>
          <span className="rounded-pill bg-brand-mist/10 px-3 py-1 text-caption font-semibold uppercase tracking-wider text-brand-light">
            Mobile Priority
          </span>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {/* iOS Card */}
          <div className="rounded-card border border-cream/10 bg-cream/[0.04] p-4">
            <div className="flex items-center justify-between">
              <span className="text-body-sm font-semibold text-cream">Apple iOS (iPhone)</span>
              <Smartphone className="h-4 w-4 text-brand-light" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-serif text-h2 font-medium text-cream">{iosPercent}%</span>
              <span className="text-caption text-warm-grey">({data?.iosViews ?? 0} visits)</span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-pill bg-cream/10">
              <div
                className="h-full bg-brand-action transition-all duration-500"
                style={{ width: `${iosPercent}%` }}
              />
            </div>
          </div>

          {/* Android Card */}
          <div className="rounded-card border border-cream/10 bg-cream/[0.04] p-4">
            <div className="flex items-center justify-between">
              <span className="text-body-sm font-semibold text-cream">Android Mobile</span>
              <Smartphone className="h-4 w-4 text-brand-light" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-serif text-h2 font-medium text-cream">{androidPercent}%</span>
              <span className="text-caption text-warm-grey">({data?.androidViews ?? 0} visits)</span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-pill bg-cream/10">
              <div
                className="h-full bg-success transition-all duration-500"
                style={{ width: `${androidPercent}%` }}
              />
            </div>
          </div>

          {/* Desktop Card */}
          <div className="rounded-card border border-cream/10 bg-cream/[0.04] p-4">
            <div className="flex items-center justify-between">
              <span className="text-body-sm font-semibold text-cream">Desktop / Laptop</span>
              <Monitor className="h-4 w-4 text-warm-grey" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-serif text-h2 font-medium text-cream">{desktopPercent}%</span>
              <span className="text-caption text-warm-grey">({data?.desktopViews ?? 0} visits)</span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-pill bg-cream/10">
              <div
                className="h-full bg-warm-grey transition-all duration-500"
                style={{ width: `${desktopPercent}%` }}
              />
            </div>
          </div>
        </div>
      </AdminPlate>

      {/* Side-by-Side: Page Views Breakdown & Section Impressions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Page-by-Page Traffic */}
        <AdminPlate>
          <div className="flex items-center justify-between border-b border-cream/10 pb-4">
            <div>
              <h2 className="font-serif text-h4 text-cream">Page-by-Page Views</h2>
              <p className="mt-1 text-caption text-warm-grey">
                Which specific URLs and treatments attract the most visits.
              </p>
            </div>
            <Globe className="h-4 w-4 text-brand-light" />
          </div>

          {(!data?.topPages || data.topPages.length === 0) ? (
            <p className="mt-4 text-body-sm text-cream/60">
              Page view breakdown will appear here as visitors browse individual routes.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {data.topPages.map((p) => {
                const total = data.totalViews || 1;
                const pct = Math.round((p.count / total) * 100);
                return (
                  <div key={p.path} className="rounded-card border border-cream/5 bg-cream/[0.02] p-3">
                    <div className="flex items-center justify-between text-body-sm">
                      <span className="font-mono text-cream">{p.path}</span>
                      <span className="text-caption font-semibold text-brand-light">
                        {p.count} views ({pct}%)
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-pill bg-cream/10">
                      <div className="h-full bg-brand-action" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </AdminPlate>

        {/* Section Impressions */}
        <AdminPlate>
          <div className="flex items-center justify-between border-b border-cream/10 pb-4">
            <div>
              <h2 className="font-serif text-h4 text-cream">Section Impressions</h2>
              <p className="mt-1 text-caption text-warm-grey">
                Which homepage & treatment sections visitors actually scroll into view.
              </p>
            </div>
            <Layers className="h-4 w-4 text-brand-light" />
          </div>

          {(!data?.topSections || data.topSections.length === 0) ? (
            <p className="mt-4 text-body-sm text-cream/60">
              Section impression data will record automatically as users scroll past sections like the Wax Price Matrix, Services, and Testimonials.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {data.topSections.map((s) => {
                const totalImp = data.totalImpressions || 1;
                const pct = Math.round((s.count / totalImp) * 100);
                return (
                  <div key={s.section} className="rounded-card border border-cream/5 bg-cream/[0.02] p-3">
                    <div className="flex items-center justify-between text-body-sm">
                      <span className="font-medium capitalize text-cream">
                        {s.section.replace(/-/g, " ")}
                      </span>
                      <span className="text-caption font-semibold text-success">
                        {s.count} impressions
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-pill bg-cream/10">
                      <div className="h-full bg-success" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </AdminPlate>
      </div>

      {/* Conversion Funnel */}
      <AdminPlate>
        <div className="flex items-center justify-between border-b border-cream/10 pb-4">
          <div>
            <h2 className="font-serif text-h3 text-cream">Conversion Funnel</h2>
            <p className="mt-1 text-body-sm text-warm-grey">
              Visitor path from initial landing to direct booking confirmation.
            </p>
          </div>
          <TrendingUp className="h-5 w-5 text-brand-light" />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative rounded-card border border-cream/10 bg-cream/[0.03] p-4">
            <span className="text-caption font-semibold uppercase text-warm-grey">Stage 1</span>
            <p className="mt-1 text-body-sm font-semibold text-cream">Site Visitors</p>
            <p className="mt-2 font-serif text-h2 font-medium text-cream">{data?.totalViews ?? 0}</p>
            <span className="text-caption text-cream/60">100% of traffic</span>
          </div>

          <div className="relative rounded-card border border-cream/10 bg-cream/[0.03] p-4">
            <span className="text-caption font-semibold uppercase text-warm-grey">Stage 2</span>
            <p className="mt-1 text-body-sm font-semibold text-cream">Section Engagements</p>
            <p className="mt-2 font-serif text-h2 font-medium text-brand-light">
              {data?.totalImpressions ?? 0}
            </p>
            <span className="text-caption text-cream/60">Scrolled into content</span>
          </div>

          <div className="relative rounded-card border border-cream/10 bg-cream/[0.03] p-4">
            <span className="text-caption font-semibold uppercase text-warm-grey">Stage 3</span>
            <p className="mt-1 text-body-sm font-semibold text-cream">Contact Clicks</p>
            <p className="mt-2 font-serif text-h2 font-medium text-cream">
              {(data?.whatsAppClicks ?? 0) + (data?.bookingClicks ?? 0)}
            </p>
            <span className="text-caption text-cream/60">WhatsApp & CTA interactions</span>
          </div>

          <div className="relative rounded-card border border-cream/10 bg-cream/[0.03] p-4">
            <span className="text-caption font-semibold uppercase text-warm-grey">Stage 4</span>
            <p className="mt-1 text-body-sm font-semibold text-cream">Form Submissions</p>
            <p className="mt-2 font-serif text-h2 font-medium text-success">
              {data?.bookingSubmits ?? 0}
            </p>
            <span className="text-caption text-cream/60">Confirmed bookings saved</span>
          </div>
        </div>
      </AdminPlate>

      {/* Recent Activity Log */}
      <AdminPlate>
        <h2 className="font-serif text-h3 text-cream">Recent Real-Time Activity Log</h2>
        {!data || data.recentEvents.length === 0 ? (
          <p className="mt-3 text-body-sm text-cream/60">
            No events logged yet. As users browse the site and click WhatsApp or Bookings, live events
            will stream here in real time.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-body-sm">
              <thead>
                <tr className="border-b border-cream/10 text-caption font-semibold uppercase tracking-wider text-warm-grey">
                  <th className="pb-3">Event Type</th>
                  <th className="pb-3">Path</th>
                  <th className="pb-3">Device</th>
                  <th className="pb-3">Branch / Detail</th>
                  <th className="pb-3 text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream/5 text-cream/80">
                {data.recentEvents.map((ev) => (
                  <tr key={ev.id} className="hover:bg-cream/[0.02]">
                    <td className="py-2.5 font-medium text-cream">
                      <span className="rounded-pill border border-cream/15 bg-cream/5 px-2.5 py-0.5 text-caption">
                        {ev.event_type.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-2.5 font-mono text-caption text-warm-grey">
                      {ev.path || "/"}
                    </td>
                    <td className="py-2.5 text-caption uppercase text-brand-light font-medium">
                      {ev.device_type || "desktop"}
                    </td>
                    <td className="py-2.5 text-caption text-cream/70">
                      {ev.branch || (typeof ev.metadata === "object" && ev.metadata !== null && "section" in ev.metadata ? String(ev.metadata.section) : "—")}
                    </td>
                    <td className="py-2.5 text-right text-caption text-warm-grey">
                      {new Date(ev.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminPlate>
    </div>
  );
}
