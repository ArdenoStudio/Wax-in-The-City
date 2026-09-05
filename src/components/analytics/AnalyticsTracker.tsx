"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    // Only track non-admin pages to avoid polluting public visitor analytics
    if (pathname && !pathname.startsWith("/admin") && lastTracked.current !== pathname) {
      lastTracked.current = pathname;
      trackPageView(pathname);
    }
  }, [pathname]);

  return null;
}
