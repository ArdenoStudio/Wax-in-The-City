import { createAdminClient } from "@/lib/supabase/admin";
import { AdminPlate } from "@/components/admin/primitives";
import { Smartphone, Monitor, Globe, MessageSquare, CalendarCheck, TrendingUp } from "lucide-react";

interface AnalyticsSummary {
  totalViews: number;
  iosViews: number;
  androidViews: number;
  desktopViews: number;
  whatsAppClicks: number;
  bookingClicks: number;
  bookingSubmits: number;
  recentEvents: Array<{
    id: string;
    event_type: string;
    path: string | null;
    device_type: string | null;
    branch: string | null;
    created_at: string;
  }>;
}

async function getAnalyticsData(): Promise<AnalyticsSummary | null> {
  const admin = createAdminClient();
  if (!admin) return null;

  try {
    const { data: events, error } = await admin
      .from("analytics_events")
      .select("id, event_type, path, device_type, branch, created_at")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error || !events) return null;

    let totalViews = 0;
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
      iosViews,
      androidViews,
      desktopViews,
      whatsAppClicks,
      bookingClicks,
      bookingSubmits,
      recentEvents: events.slice(0, 15),
    };
  } catch {
    return null;
  }
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminPlate className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-caption font-semibold uppercase tracking-wider text-warm-grey">
            <span>Tracked Page Views</span>
            <Globe className="h-4 w-4 text-brand-light" />
          </div>
          <span className="font-serif text-h1 font-medium text-cream">{data?.totalViews ?? 0}</span>
          <span className="text-caption text-cream/60">Live visitor sessions</span>
        </AdminPlate>

        <AdminPlate className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-caption font-semibold uppercase tracking-wider text-warm-grey">
            <span>WhatsApp Clicks</span>
            <MessageSquare className="h-4 w-4 text-brand-light" />
          </div>
          <span className="font-serif text-h1 font-medium text-cream">{data?.whatsAppClicks ?? 0}</span>
          <span className="text-caption text-cream/60">Inquiries across branches</span>
        </AdminPlate>

        <AdminPlate className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-caption font-semibold uppercase tracking-wider text-warm-grey">
            <span>Booking Attempts</span>
            <CalendarCheck className="h-4 w-4 text-brand-light" />
          </div>
          <span className="font-serif text-h1 font-medium text-cream">{data?.bookingClicks ?? 0}</span>
          <span className="text-caption text-cream/60">CTA clicks & form visits</span>
        </AdminPlate>

        <AdminPlate className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-caption font-semibold uppercase tracking-wider text-warm-grey">
            <span>Action Rate</span>
            <TrendingUp className="h-4 w-4 text-brand-light" />
          </div>
          <span className="font-serif text-h1 font-medium text-cream">{conversionRate}%</span>
          <span className="text-caption text-cream/60">Visitors taking action</span>
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
            Mobile-First Insight
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

      {/* Recent Activity Log */}
      <AdminPlate>
        <h2 className="font-serif text-h3 text-cream">Recent Visitor Activity</h2>
        {!data || data.recentEvents.length === 0 ? (
          <p className="mt-3 text-body-sm text-cream/60">
            No events logged yet. As users browse the site and click WhatsApp or Bookings, live events
            will appear here.
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
                      {ev.branch || "—"}
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
