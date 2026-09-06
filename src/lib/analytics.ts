export type DeviceType = "ios" | "android" | "desktop";

export interface AnalyticsEventPayload {
  eventType: "page_view" | "whatsapp_click" | "book_click" | "booking_submit" | "matrix_filter";
  path?: string;
  branch?: string;
  deviceType?: DeviceType;
  metadata?: Record<string, unknown>;
}

export function detectDeviceType(): DeviceType {
  if (typeof window === "undefined" || !navigator.userAgent) return "desktop";
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  return "desktop";
}

export async function trackEvent(payload: AnalyticsEventPayload): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    const deviceType = payload.deviceType || detectDeviceType();
    const currentPath = payload.path || window.location.pathname;

    const data = {
      eventType: payload.eventType,
      path: currentPath,
      deviceType,
      branch: payload.branch || null,
      metadata: payload.metadata || null,
    };

    if (typeof fetch === "function") {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        keepalive: true,
      }).catch(() => {
        // Non-blocking catch
      });
    }
  } catch (err) {
    // Analytics is non-critical; never crash or block user interactions
    if (process.env.NODE_ENV === "development") {
      console.warn("[analytics] track error:", err);
    }
  }
}

export function trackPageView(path: string) {
  trackEvent({ eventType: "page_view", path });
}

export function trackWhatsAppClick(branchOrSource: string) {
  trackEvent({
    eventType: "whatsapp_click",
    branch: branchOrSource,
  });
}

export function trackBookingClick(source: string) {
  trackEvent({
    eventType: "book_click",
    metadata: { source },
  });
}

export function trackBookingSubmit(branch: string, service?: string) {
  trackEvent({
    eventType: "booking_submit",
    branch,
    metadata: { service },
  });
}
