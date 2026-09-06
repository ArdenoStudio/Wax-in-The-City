"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface TabItem {
  slug: string;
  label: string;
}

interface AdminTabsNavProps {
  tabs: readonly TabItem[];
  activeTab: string;
}

export function AdminTabsNav({ tabs, activeTab }: AdminTabsNavProps) {
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);

  const handleClick = (slug: string) => {
    if (slug !== activeTab) {
      setLoadingSlug(slug);
    }
  };

  return (
    <nav className="mt-6 flex flex-wrap gap-2" aria-label="Dashboard sections">
      {tabs.map((tab) => {
        const isActive = tab.slug === activeTab;
        const isLoading = tab.slug === loadingSlug;

        return (
          <a
            key={tab.slug}
            href={`/admin?tab=${tab.slug}`}
            onClick={() => handleClick(tab.slug)}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex h-10 items-center gap-2 rounded-pill border px-4 text-body-sm font-medium transition-all ${
              isActive
                ? "border-brand-action bg-brand-action text-cream shadow-[0_2px_8px_rgba(162,15,55,0.25)]"
                : isLoading
                ? "border-brand-action/50 bg-brand-action/20 text-cream"
                : "border-cream/16 text-cream/75 hover:bg-cream/10 hover:text-cream"
            }`}
          >
            {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin text-brand-light" />}
            {tab.label}
          </a>
        );
      })}
    </nav>
  );
}
