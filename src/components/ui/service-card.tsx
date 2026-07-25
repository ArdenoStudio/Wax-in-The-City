import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { formatPriceFrom, type Service } from "@/lib/site";
import { cn } from "@/lib/utils";

/** HyperUI-clean service cards — flat pearl shells, restrained category rails. */
const SERVICE_CARD_TONES: Record<
  Service["category"],
  { shell: string; rail: string; chip: string; button: string; label: string }
> = {
  waxing: {
    shell: "bg-white/80",
    rail: "bg-brand-action",
    chip: "border-brand-action/18 bg-brand-mist text-brand-action",
    button: "border-brand-action/25 bg-brand-action text-cream hover:bg-brand-dark",
    label: "Signature waxing",
  },
  facial: {
    shell: "bg-white/80",
    rail: "bg-warm-grey/50",
    chip: "border-warm-border bg-cream-alt text-warm",
    button: "border-warm-border bg-cream text-warm hover:bg-brand-mist hover:border-brand-action/25 hover:text-brand-action",
    label: "Skin care",
  },
  moroccan: {
    shell: "bg-white/80",
    rail: "bg-sage",
    chip: "border-sage/30 bg-sage/12 text-warm",
    button: "border-sage/35 bg-cream text-warm hover:bg-sage/16",
    label: "Ritual care",
  },
  "hydra-facial": {
    shell: "bg-white/80",
    rail: "bg-brand",
    chip: "border-brand/12 bg-brand/6 text-brand",
    button: "border-brand/18 bg-brand text-cream hover:bg-brand-action",
    label: "Hydration",
  },
};

export function ServiceCard({
  service,
  branch,
}: {
  service: Service;
  /** When set, included as `branch` query on the book link. */
  branch?: string;
}) {
  const tone = SERVICE_CARD_TONES[service.category];
  const bookHref = branch
    ? `/book?service=${encodeURIComponent(service.name)}&branch=${encodeURIComponent(branch)}`
    : `/book?service=${encodeURIComponent(service.name)}`;

  return (
    <div
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-card-lg border border-warm-border/75 p-5 transition-colors duration-300 hover:border-warm-border sm:p-6",
        tone.shell
      )}
    >
      <div>
        <div
          className={cn(
            "mb-4 h-0.5 w-10 transition-all duration-500 group-hover:w-16",
            tone.rail
          )}
        />
        <p className="mb-1.5 font-sans text-caption font-semibold uppercase tracking-[0.1em] text-warm-grey">
          {tone.label}
        </p>
        <h3 className="font-display text-h4 font-semibold tracking-[-0.02em] text-warm">
          {service.name}
        </h3>
      </div>
      <div className="mt-3.5 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "rounded-pill border px-2.5 py-0.5 font-sans text-caption font-semibold",
            tone.chip
          )}
        >
          {formatPriceFrom(service.priceFrom)}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-pill border border-warm-border/70 bg-cream/80 px-2.5 py-0.5 font-sans text-caption text-warm-grey">
          <Clock3 className="h-3.5 w-3.5 text-brand-action" strokeWidth={1.75} />
          {service.duration}
        </span>
      </div>
      <p className="mt-3.5 flex-1 font-sans text-body-sm leading-relaxed text-warm-grey">
        {service.description}
      </p>
      <Link
        href={bookHref}
        className={cn(
          "mt-5 inline-flex items-center gap-1.5 self-start rounded-pill border px-4 py-2 font-sans text-body-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40 focus-visible:ring-offset-2",
          tone.button
        )}
      >
        Book this
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
