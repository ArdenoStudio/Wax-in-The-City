import Link from "next/link";
import { MapPin, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";
import { type Branch, isAddressPending, whatsappLink } from "@/lib/site";

interface BranchCardProps {
  branch: Branch;
  /** Compact card for the home quick-selector; full card for /locations. */
  variant?: "compact" | "full";
}

export function BranchCard({ branch, variant = "compact" }: BranchCardProps) {
  const pending = isAddressPending(branch);
  const wa = whatsappLink(
    `Hi! I'd like to book at your ${branch.name} branch.`,
    branch.whatsapp
  );

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-card-lg border border-warm-border/75 bg-white/75 p-5 transition-colors duration-300 hover:border-warm-border hover:bg-white/95 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-sans text-caption font-semibold uppercase tracking-[0.12em] text-brand-action">
            Branch
          </p>
          <h3 className="mt-1 font-display text-h2 font-semibold leading-tight tracking-[-0.02em] text-warm">
            {branch.name}
          </h3>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-ink text-cream transition-transform duration-300 group-hover:scale-[1.03]">
          <MapPin className="h-4 w-4" strokeWidth={1.75} />
        </span>
      </div>

      <p className="mt-3 font-sans text-body-sm leading-relaxed text-warm-grey">
        {branch.blurb}
      </p>

      {pending && (
        <span className="mt-3 inline-flex w-fit rounded-pill border border-warm-border bg-cream-alt px-2.5 py-0.5 font-sans text-caption font-semibold uppercase tracking-[0.1em] text-warm-grey">
          Exact street address pending confirmation
        </span>
      )}

      <div className="mt-5 space-y-2 border-t border-warm-border/70 pt-4 font-sans text-body-sm text-warm-grey">
        <p>{branch.area}</p>
        <p className="flex items-start gap-2">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-action" strokeWidth={1.75} />
          <span>
            <span className="block">Weekdays · {branch.hours.weekday}</span>
            <span className="mt-1 block">Weekends · {branch.hours.weekend}</span>
          </span>
        </p>
        {variant === "full" && (
          <p className="pl-6 text-caption text-warm-grey/85">{branch.hours.poya}</p>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-6 sm:flex-row sm:flex-wrap sm:items-center">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-pill bg-brand-action px-5 font-sans text-body-sm font-medium text-cream transition-colors duration-300 hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40 focus-visible:ring-offset-2"
        >
          <WhatsappIcon className="h-4 w-4" />
          WhatsApp {branch.name}
        </a>
        {!pending && (
          <a
            href={branch.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-1.5 font-sans text-body-sm font-medium text-brand-action transition-colors duration-300 hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40 focus-visible:ring-offset-2 sm:px-2"
          >
            Open in Maps
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
        <Link
          href={`/locations/${branch.slug}`}
          className="inline-flex h-11 items-center gap-1.5 font-sans text-body-sm font-medium text-brand-action transition-colors duration-300 hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40 focus-visible:ring-offset-2 sm:px-2"
        >
          Branch details
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
