"use client";

import { useEffect } from "react";
import { RefreshCw, ShieldAlert, ArrowLeft } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[witc-admin-error]", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-5 py-16 text-center">
      <div className="rounded-card border border-error/30 bg-error/10 p-8 shadow-card">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-pill bg-error/20 text-brand-light">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <h2 className="mt-4 font-serif text-h3 text-cream">
          Admin Section Temporarily Unavailable
        </h2>
        <p className="mt-2 text-body-sm text-warm-grey">
          A transient database latency or connection timeout occurred while loading this dashboard section.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex h-10 items-center gap-2 rounded-pill bg-brand-action px-5 text-body-sm font-semibold text-cream shadow-md transition-colors hover:bg-brand"
          >
            <RefreshCw className="h-4 w-4" />
            Retry Section
          </button>
          <a
            href="/admin?tab=overview"
            className="inline-flex h-10 items-center gap-2 rounded-pill border border-cream/16 px-4 text-body-sm font-medium text-cream hover:bg-cream/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Overview
          </a>
        </div>
      </div>
    </div>
  );
}
