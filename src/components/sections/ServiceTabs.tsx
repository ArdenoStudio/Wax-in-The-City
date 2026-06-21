"use client";

import { useState } from "react";
import {
  SERVICE_CATEGORIES,
  SERVICES,
  type ServiceCategory,
  type ServiceCategoryMeta,
  type Service,
} from "@/lib/site";
import { ServiceCard } from "@/components/ui/service-card";
import { cn } from "@/lib/utils";

export function ServiceTabs({
  initial = "waxing",
  categories = SERVICE_CATEGORIES,
  services = SERVICES,
}: {
  initial?: ServiceCategory;
  categories?: ServiceCategoryMeta[];
  services?: Service[];
}) {
  const [active, setActive] = useState<ServiceCategory>(initial);
  const activeServices = services.filter((service) => service.category === active);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Service categories"
        className="flex max-w-full flex-wrap gap-1 rounded-pill border border-warm-border bg-cream-alt p-1 sm:w-fit"
      >
        {categories.map((cat, index) => {
          const isActive = active === cat.slug;
          return (
            <button
              key={cat.slug}
              type="button"
              role="tab"
              id={`service-tab-${cat.slug}`}
              aria-selected={isActive}
              aria-controls={`service-panel-${cat.slug}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(cat.slug)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  const next = categories[(index + 1) % categories.length];
                  setActive(next.slug);
                }
                if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  const prev = categories[(index - 1 + categories.length) % categories.length];
                  setActive(prev.slug);
                }
              }}
              className={cn(
                "rounded-pill px-4 py-2.5 text-body-sm font-medium transition-colors sm:px-5",
                isActive
                  ? "bg-brand-action text-cream"
                  : "text-warm-grey hover:text-brand-action"
              )}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`service-panel-${active}`}
        aria-labelledby={`service-tab-${active}`}
        tabIndex={0}
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {activeServices.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </div>
  );
}
