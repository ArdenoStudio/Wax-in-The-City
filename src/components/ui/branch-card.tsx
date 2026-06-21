import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";
import { type Branch, whatsappLink } from "@/lib/site";
import { Button } from "@/components/ui/button";

interface BranchCardProps {
  branch: Branch;
  /** Compact card for the home quick-selector; full card for /locations. */
  variant?: "compact" | "full";
}

export function BranchCard({ branch, variant = "compact" }: BranchCardProps) {
  const isOpen = branch.status === "open";
  const wa = whatsappLink(
    `Hi! I'd like to book at your ${branch.name} branch.`,
    branch.whatsapp
  );

  return (
    <div className="group surface-light flex h-full flex-col overflow-hidden rounded-card p-6 sm:p-7">
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          {!isOpen && (
            <span className="mb-2 inline-flex rounded-pill border border-brand-action/25 bg-brand-mist px-3 py-1 text-caption font-semibold text-brand-action">
              Opening soon
            </span>
          )}
          <h3 className="font-serif text-h2 font-medium leading-tight text-warm">{branch.name}</h3>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-ink text-cream shadow-[0_14px_32px_rgba(21,16,17,0.18)]">
          <MapPin className="h-5 w-5" />
        </span>
      </div>

      <p className="relative z-10 mt-3 text-body-sm text-warm-grey">{branch.blurb}</p>

      <div className="relative z-10 mt-6 space-y-2 border-t border-warm-border/80 pt-5 text-body-sm text-warm-grey">
        <p>{branch.area}</p>
        {isOpen ? (
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-brand-action" />
            <span>{branch.hours.weekday}</span>
          </p>
        ) : (
          <p className="text-warm-grey">{branch.address}</p>
        )}
        {variant === "full" && isOpen && (
          <>
            <p className="pl-6">Weekends · {branch.hours.weekend}</p>
            <p className="pl-6 text-caption">{branch.hours.poya}</p>
          </>
        )}
      </div>

      <div className="relative z-10 mt-auto flex flex-col gap-2 pt-7 sm:flex-row sm:items-center">
        {isOpen ? (
          <>
            <Button asChild size="md" variant="primary" className="w-full sm:w-auto">
              <a href={wa} target="_blank" rel="noopener noreferrer">
                <WhatsappIcon className="h-4 w-4" />
                WhatsApp {branch.name}
              </a>
            </Button>
            <Link
              href={`/locations/${branch.slug}`}
              className="icon-drift inline-flex h-12 items-center justify-center gap-1.5 px-2 text-body-sm font-medium text-brand-action transition-colors duration-500 ease-[var(--ease-apple)] hover:text-brand-dark"
            >
              Branch details
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </>
        ) : (
          <Button asChild size="md" variant="outline" className="w-full sm:w-auto">
            <Link href="/contact">Get opening updates</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
