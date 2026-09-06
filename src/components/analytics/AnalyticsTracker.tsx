"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageView, trackSectionImpression } from "@/lib/analytics";

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

  useEffect(() => {
    if (typeof window === "undefined" || !pathname || pathname.startsWith("/admin")) return;

    const trackedSections = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            const el = entry.target as HTMLElement;
            const sectionName = el.getAttribute("data-analytics-section");
            if (sectionName && !trackedSections.has(sectionName)) {
              trackedSections.add(sectionName);
              trackSectionImpression(sectionName, pathname);
              observer.unobserve(el);
            }
          }
        }
      },
      { threshold: 0.2 }
    );

    const timer = setTimeout(() => {
      const targets = document.querySelectorAll("[data-analytics-section]");
      targets.forEach((target) => observer.observe(target));
    }, 400);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
