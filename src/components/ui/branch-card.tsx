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
    <div className="ease-[var(--ease-apple)] group flex h-full flex-col overflow-hidden rounded-card-lg border border-warm-border/75 bg-white/80 p-5 transition-colors duration-300 hover:border-warm-border hover:bg-white/95 sm:p-6">
      <div className="flex items-start justify-between gap-3.5">
        <div className="min-w-0">
          <p className="font-sans text-caption leading-snug font-semibold uppercase tracking-[0.1em] text-brand-action">
            Branch
          </p>
          <h3 className="text-balance mt-1 font-display text-h2 font-semibold leading-[1.1] tracking-[-0.024em] text-warm">
            {branch.name}
          </h3>
        </div>
        <span className="ease-[var(--ease-apple)] flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-ink text-cream transition-transform duration-300 group-hover:scale-[1.03]">
          <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.75} />
        </span>
      </div>

      <p className="tracking-[-0.011em] text-pretty mt-3 font-sans text-body-sm leading-[1.7] text-warm-grey">
        {branch.blurb}
      </p>

      {pending && (
        <span className="mt-3.5 inline-flex w-fit rounded-pill border border-warm-border bg-cream-alt px-2.5 py-0.5 font-sans text-caption leading-snug font-semibold uppercase tracking-[0.1em] text-warm-grey">
          Exact street address pending confirmation
        </span>
      )}

      <div className="tracking-[-0.011em] text-pretty mt-5 space-y-2.5 border-t border-warm-border/80 pt-4 font-sans text-body-sm text-warm-grey">
        <p>{branch.area}</p>
        <p className="flex items-start gap-2">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-action" strokeWidth={1.75} />
          <span>
            <span className="block">Weekdays · {branch.hours.weekday}</span>
            <span className="mt-1 block">Weekends · {branch.hours.weekend}</span>
          </span>
        </p>
        {variant === "full" && (
          <p className="pl-6 font-sans text-caption leading-snug text-warm-grey/85">{branch.hours.poya}</p>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-6 sm:flex-row sm:flex-wrap sm:items-center">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="tracking-[-0.011em] ease-[var(--ease-apple)] text-pretty inline-flex h-11 items-center justify-center gap-2.5 rounded-pill bg-brand-action px-5 font-sans text-body-sm font-semibold text-cream transition-colors duration-300 hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40 focus-visible:ring-offset-[3px]"
        >
          <WhatsappIcon className="h-4 w-4 shrink-0" />
          WhatsApp {branch.name}
        </a>
        {!pending && (
          <a
            href={branch.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tracking-[-0.011em] ease-[var(--ease-apple)] text-pretty inline-flex h-11 items-center gap-1.5 font-sans text-body-sm font-semibold text-brand-action transition-colors duration-300 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40 focus-visible:ring-offset-[3px] focus-visible:ring-offset-cream sm:px-2"
          >
            Open in Maps
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
        <Link
          href={`/locations/${branch.slug}`}
          className="tracking-[-0.011em] ease-[var(--ease-apple)] text-pretty inline-flex h-11 items-center gap-1.5 font-sans text-body-sm font-semibold text-brand-action transition-colors duration-300 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40 focus-visible:ring-offset-[3px] focus-visible:ring-offset-cream sm:px-2"
        >
          Branch details
          <ArrowRight className="ease-[var(--ease-apple)] h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
