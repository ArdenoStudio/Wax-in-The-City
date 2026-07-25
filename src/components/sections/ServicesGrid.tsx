"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Sparkles, Flower2, Leaf, Droplets, ArrowRight, type LucideIcon } from "lucide-react";
import {
  SERVICE_CATEGORIES,
  SERVICES,
  type ServiceCategory,
  type ServiceCategoryMeta,
} from "@/lib/site";
import { formatPriceFrom } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerFast, fadeUp, viewportOnce } from "@/lib/animations";

const ICONS: Record<ServiceCategory, LucideIcon> = {
  waxing: Sparkles,
  facial: Flower2,
  moroccan: Leaf,
  "hydra-facial": Droplets,
};

/** HyperUI-style row tones — wine/pearl first, restrained accent color. */
const CATEGORY_TONES: Record<
  ServiceCategory,
  { row: string; icon: string; price: string; arrow: string; focus: string }
> = {
  waxing: {
    row: "border border-transparent hover:border-brand-action/20 hover:bg-brand-mist/70",
    icon: "border-brand-action/12 bg-brand-mist text-brand-action group-hover:border-brand-action/30 group-hover:bg-brand-action group-hover:text-cream",
    price: "border-brand-action/22 bg-brand-mist text-brand-action",
    arrow: "border-brand-action/22 text-brand-action group-hover:border-brand-action group-hover:bg-brand-action group-hover:text-cream",
    focus: "focus-visible:bg-brand-mist/70 focus-visible:ring-2 focus-visible:ring-brand-action/35 focus-visible:ring-offset-[3px] focus-visible:ring-offset-cream",
  },
  facial: {
    row: "border border-transparent hover:border-warm-border hover:bg-cream-alt/80",
    icon: "border-warm-border bg-cream-alt text-warm group-hover:border-brand-action/25 group-hover:bg-brand-action group-hover:text-cream",
    price: "border-warm-border bg-cream-alt text-warm",
    arrow: "border-warm-border text-warm group-hover:border-brand-action group-hover:bg-brand-action group-hover:text-cream",
    focus: "focus-visible:bg-cream-alt/80 focus-visible:ring-2 focus-visible:ring-brand-action/30 focus-visible:ring-offset-[3px] focus-visible:ring-offset-cream",
  },
  moroccan: {
    row: "border border-transparent hover:border-sage/25 hover:bg-sage/[0.08]",
    icon: "border-sage/34 bg-sage/14 text-warm group-hover:border-sage/50 group-hover:bg-sage group-hover:text-brand-dark",
    price: "border-sage/32 bg-sage/14 text-warm",
    arrow: "border-sage/34 text-warm group-hover:border-sage group-hover:bg-sage group-hover:text-brand-dark",
    focus: "focus-visible:bg-sage/[0.08] focus-visible:ring-2 focus-visible:ring-sage/40 focus-visible:ring-offset-[3px] focus-visible:ring-offset-cream",
  },
  "hydra-facial": {
    row: "border border-transparent hover:border-brand/14 hover:bg-brand/[0.04]",
    icon: "border-brand/10 bg-brand/8 text-brand group-hover:border-brand/20 group-hover:bg-brand group-hover:text-cream",
    price: "border-brand/16 bg-brand/8 text-brand",
    arrow: "border-brand/16 text-brand group-hover:border-brand group-hover:bg-brand group-hover:text-cream",
    focus: "focus-visible:bg-brand/[0.04] focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:ring-offset-[3px] focus-visible:ring-offset-cream",
  },
};

function shortestDurationTeaser(slug: ServiceCategory, services = SERVICES): string | null {
  const inCategory = services.filter((s) => s.category === slug);
  if (!inCategory.length) return null;
  const shortest = inCategory.reduce((best, s) => {
    const mins = parseInt(s.duration, 10);
    const bestMins = parseInt(best.duration, 10);
    if (Number.isNaN(mins)) return best;
    if (Number.isNaN(bestMins) || mins < bestMins) return s;
    return best;
  }, inCategory[0]);
  return `From ${shortest.duration}`;
}

/** Service category overview — HyperUI clear list, Cal Sans titles. */
export function ServicesGrid({
  categories = SERVICE_CATEGORIES,
}: {
  categories?: ServiceCategoryMeta[];
}) {
  return (
    <section
      id="services"
      className="relative scroll-mt-28 overflow-hidden bg-cream px-7 py-section-lg lg:px-8"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute right-6 top-6 select-none font-display text-[5.5rem] font-semibold leading-[0.96] tracking-[-0.032em] text-warm/[0.03] sm:text-[8rem] lg:right-12 lg:text-[10rem]"
      >
        01
      </span>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-40" />
      <div className="mx-auto grid max-w-[72rem] gap-12 lg:grid-cols-[0.76fr_1.24fr] lg:items-start lg:gap-14">
        <div className="w-full min-w-0 max-w-[calc(100vw-2.5rem)] sm:max-w-full lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Treatment menu"
            showEyebrow={false}
            title="A tighter menu, built for trust."
            subtitle="Focused choices, clear prep and appointment-led care for a calmer visit."
            align="left"
            className="w-full max-w-[calc(100vw-2.5rem)] sm:max-w-full"
          />
          <div className="mt-8">
            <Link
              href="/services"
              className="tracking-[-0.011em] font-sans ease-[var(--ease-apple)] text-pretty inline-flex items-center gap-2 rounded-pill bg-ink px-5 py-3 text-body-sm font-semibold text-cream transition-colors duration-300 hover:bg-brand-action focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40 focus-visible:ring-offset-[3px] focus-visible:ring-offset-cream"
            >
              Full menu
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </div>

        {categories.length === 0 ? (
          <div className="rounded-card-lg border border-warm-border/80 bg-white/78 px-7 py-14 text-center">
            <p className="text-balance font-display text-h3 font-semibold tracking-[-0.024em] text-warm">
              Menu updating
            </p>
            <p className="tracking-[-0.011em] text-pretty mx-auto mt-3.5 max-w-[24rem] font-sans text-body-sm text-warm-grey">
              Treatment categories will appear here shortly. Browse the full menu
              or message us on WhatsApp in the meantime.
            </p>
            <Link
              href="/services"
              className="tracking-[-0.011em] font-sans text-pretty mt-6 inline-flex items-center gap-2 text-body-sm font-semibold text-brand-action underline-offset-[3px] hover:underline"
            >
              Full menu
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        ) : (
          <motion.div
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="rounded-card-lg border border-warm-border/80 bg-white/80 p-1.5 sm:p-2"
          >
            {categories.map((cat, i) => {
              const Icon = ICONS[cat.slug];
              const tone = CATEGORY_TONES[cat.slug];
              const fromPrice = formatPriceFrom(cat.priceFrom);
              const durationTeaser = shortestDurationTeaser(cat.slug);
              return (
                <motion.div key={cat.slug} variants={fadeUp}>
                  <Link
                    href={`/services/${cat.href}`}
                    aria-label={`${cat.name}, ${fromPrice}`}
                    className={cn(
                      "group relative z-10 grid gap-5 rounded-card p-4 transition-colors duration-300 ease-out focus-visible:outline-none sm:grid-cols-[64px_1fr_auto] sm:items-center sm:gap-5 sm:p-5",
                      tone.row,
                      tone.focus
                    )}
                  >
                    <span
                      className={cn(
                        "ease-[var(--ease-apple)] flex h-14 w-14 items-center justify-center rounded-card border transition-colors duration-300",
                        tone.icon
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} />
                    </span>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-balance font-display text-h3 font-semibold leading-[1.1] tracking-[-0.024em] text-warm sm:text-h2">
                          {cat.name}
                        </h3>
                        <span
                          className={cn(
                            "rounded-pill border px-2.5 py-0.5 font-sans text-caption leading-snug font-semibold uppercase tracking-[0.1em]",
                            tone.price
                          )}
                        >
                          {fromPrice}
                        </span>
                      </div>
                      <p className="tracking-[-0.011em] text-pretty mt-1.5 max-w-[32rem] font-sans text-body-sm text-warm-grey">
                        {cat.short}
                      </p>
                      {durationTeaser && (
                        <p className="mt-1 font-sans text-caption leading-snug text-warm-grey/75">
                          {durationTeaser}
                        </p>
                      )}
                    </div>

                    <span
                      className={cn(
                        "ease-[var(--ease-apple)] inline-flex h-11 w-10 items-center justify-center rounded-pill px-7 border transition-colors duration-300 sm:justify-self-end",
                        tone.arrow
                      )}
                    >
                      <ArrowRight className="ease-[var(--ease-apple)] h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                  {i < categories.length - 1 && (
                    <div className="relative z-10 mx-4 h-px bg-warm-border/60 sm:mx-5" />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
