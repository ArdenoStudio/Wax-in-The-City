import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";
import { type Branch, whatsappLink } from "@/lib/site";

interface BranchCardProps {
  branch: Branch;
  /** Compact card for the home quick-selector; full card for /locations. */
  variant?: "compact" | "full";
}

export function BranchCard({ branch, variant = "compact" }: BranchCardProps) {
  const wa = whatsappLink(
    `Hi! I'd like to book at your ${branch.name} branch.`,
    branch.whatsapp
  );

  return (
    <div className="group flex h-full flex-col rounded-card-lg border border-warm-border bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-caption font-semibold uppercase tracking-[0.16em] text-brand-action">
            Branch
          </p>
          <h3 className="mt-1 font-serif text-h3 text-warm">{branch.name}</h3>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-brand-mist text-brand-action">
          <MapPin className="h-5 w-5" />
        </span>
      </div>

      <p className="mt-3 text-body-sm text-warm-grey">{branch.area}</p>

      <div className="mt-5 space-y-2 text-body-sm text-warm-grey">
        <p className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-brand-action" />
          <span>{branch.hours.weekday}</span>
        </p>
        {variant === "full" && (
          <>
            <p className="pl-6">Weekends · {branch.hours.weekend}</p>
            <p className="pl-6 text-caption">{branch.hours.poya}</p>
          </>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-2 pt-2">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-pill bg-brand-action px-5 text-body-sm font-medium text-cream transition-colors hover:bg-brand-dark"
        >
          <WhatsappIcon className="h-4 w-4" />
          WhatsApp {branch.name}
        </a>
        <Link
          href={`/locations/${branch.slug}`}
          className="nav-link inline-flex items-center gap-1.5 self-start text-body-sm font-medium text-brand-action"
        >
          Branch details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
