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
    <div className="group premium-surface micro-lift flex h-full flex-col overflow-hidden rounded-card p-6 sm:p-7">
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <p className="text-caption font-semibold uppercase tracking-[0.16em] text-brand-action">
            Branch
          </p>
          <h3 className="mt-1 font-serif text-h2 font-medium leading-tight text-warm">{branch.name}</h3>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-ink text-cream shadow-[0_14px_32px_rgba(21,16,17,0.18)] transition-transform duration-500 group-hover:scale-105">
          <MapPin className="h-5 w-5" />
        </span>
      </div>

      <p className="relative z-10 mt-3 text-body-sm text-warm-grey">{branch.blurb}</p>

      {pending && (
        <span className="relative z-10 mt-3 inline-flex w-fit rounded-pill border border-gold/35 bg-gold/12 px-3 py-1 text-caption font-semibold uppercase tracking-[0.12em] text-warm">
          Address pending confirmation
        </span>
      )}

      <div className="relative z-10 mt-6 space-y-2 border-t border-warm-border/80 pt-5 text-body-sm text-warm-grey">
        <p>{branch.area}</p>
        <p className="flex items-start gap-2">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-action" />
          <span>
            <span className="block">Weekdays · {branch.hours.weekday}</span>
            <span className="mt-1 block">Weekends · {branch.hours.weekend}</span>
          </span>
        </p>
        {variant === "full" && (
          <p className="pl-6 text-caption">{branch.hours.poya}</p>
        )}
      </div>

      <div className="relative z-10 mt-auto flex flex-col gap-2 pt-7 sm:flex-row sm:flex-wrap sm:items-center">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="pressable inline-flex h-11 items-center justify-center gap-2 rounded-pill bg-[linear-gradient(135deg,#a5273f,#6f1726)] px-5 text-body-sm font-medium text-cream shadow-[0_14px_30px_rgba(151,35,58,0.20)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/45 focus-visible:ring-offset-2"
        >
          <WhatsappIcon className="h-4 w-4" />
          WhatsApp {branch.name}
        </a>
        {!pending && (
          <a
            href={branch.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-1.5 text-body-sm font-medium text-brand-action transition-colors duration-500 ease-[var(--ease-apple)] hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/45 focus-visible:ring-offset-2 sm:px-2"
          >
            Open in Maps
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
        <Link
          href={`/locations/${branch.slug}`}
          className="icon-drift inline-flex h-11 items-center gap-1.5 text-body-sm font-medium text-brand-action transition-colors duration-500 ease-[var(--ease-apple)] hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/45 focus-visible:ring-offset-2 sm:px-2"
        >
          Branch details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
