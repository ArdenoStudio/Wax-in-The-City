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

const CATEGORY_TONES: Record<
  ServiceCategory,
  { row: string; icon: string; price: string; arrow: string; focus: string }
> = {
  waxing: {
    row: "border border-transparent hover:border-brand-action/25 hover:bg-brand-action/[0.075]",
    icon: "border-brand-action/14 bg-brand-mist text-brand-action group-hover:bg-brand-action group-hover:text-cream",
    price: "border-brand-action/18 bg-brand-mist/80 text-brand-action",
    arrow: "border-brand-action/18 text-brand-action group-hover:border-brand-action group-hover:bg-brand-action group-hover:text-cream",
    focus: "focus-visible:bg-brand-action/[0.075] focus-visible:ring-2 focus-visible:ring-brand-action/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
  },
  facial: {
    row: "border border-transparent hover:border-brand-action/20 hover:bg-gold/[0.09]",
    icon: "border-gold/30 bg-gold/12 text-warm group-hover:bg-gold group-hover:text-brand-dark",
    price: "border-gold/35 bg-gold/12 text-warm",
    arrow: "border-gold/30 text-warm group-hover:border-gold group-hover:bg-gold group-hover:text-brand-dark",
    focus: "focus-visible:bg-gold/[0.09] focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
  },
  moroccan: {
    row: "border border-transparent hover:border-brand-action/18 hover:bg-sage/[0.12]",
    icon: "border-sage/30 bg-sage/14 text-warm group-hover:bg-sage group-hover:text-brand-dark",
    price: "border-sage/35 bg-sage/14 text-warm",
    arrow: "border-sage/30 text-warm group-hover:border-sage group-hover:bg-sage group-hover:text-brand-dark",
    focus: "focus-visible:bg-sage/[0.12] focus-visible:ring-2 focus-visible:ring-sage/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
  },
  "hydra-facial": {
    row: "border border-transparent hover:border-brand-action/22 hover:bg-brand/[0.07]",
    icon: "border-brand/12 bg-brand/8 text-brand group-hover:bg-brand group-hover:text-cream",
    price: "border-brand/16 bg-brand/8 text-brand",
    arrow: "border-brand/16 text-brand group-hover:border-brand group-hover:bg-brand group-hover:text-cream",
    focus: "focus-visible:bg-brand/[0.07] focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
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

/** Service category overview with a sharper menu-led layout. */
export function ServicesGrid({
  categories = SERVICE_CATEGORIES,
}: {
  categories?: ServiceCategoryMeta[];
}) {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden bg-cream px-5 py-section-lg lg:px-8"
    >
      <span aria-hidden className="pointer-events-none absolute right-6 top-6 select-none font-display text-[6rem] font-light leading-none text-warm/[0.035] sm:text-[9rem] lg:right-12 lg:text-[11rem]">01</span>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-60" />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div className="w-full min-w-0 max-w-[calc(100vw-2.5rem)] sm:max-w-full lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Treatment menu"
            showEyebrow={false}
            title="A tighter menu, built for trust."
            subtitle="Focused choices, clear prep and appointment-led care for a calmer visit."
            align="left"
            className="w-full max-w-[calc(100vw-2.5rem)] sm:max-w-full"
          />
          <div className="mt-7">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-pill bg-ink px-5 py-3 text-body-sm font-medium text-cream shadow-[0_14px_34px_rgba(21,16,17,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-action focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/45 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              Full menu
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {categories.length === 0 ? (
          <div className="studio-plate rounded-card px-6 py-14 text-center">
            <p className="font-display text-h3 text-warm">Menu updating</p>
            <p className="mx-auto mt-3 max-w-sm text-body-sm text-warm-grey">
              Treatment categories will appear here shortly. Browse the full menu
              or message us on WhatsApp in the meantime.
            </p>
            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-2 text-body-sm font-medium text-brand-action underline-offset-4 hover:underline"
            >
              Full menu
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <motion.div
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="studio-plate rounded-card p-2"
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
                      "group relative z-10 grid gap-5 rounded-card p-5 transition-all duration-500 ease-out focus-visible:outline-none sm:grid-cols-[76px_1fr_auto] sm:items-center sm:p-6",
                      tone.row,
                      tone.focus
                    )}
                  >
                    <span className={cn("flex h-16 w-16 items-center justify-center rounded-card border shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-all duration-500", tone.icon)}>
                        <Icon className="h-6 w-6" />
                    </span>

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-h2 font-medium leading-tight text-warm">
                          {cat.name}
                        </h3>
                        <span className={cn("rounded-pill border px-3 py-1 text-caption font-semibold uppercase tracking-[0.12em]", tone.price)}>
                          {fromPrice}
                        </span>
                      </div>
                      <p className="mt-2 max-w-lg text-body-sm text-warm-grey">{cat.short}</p>
                      {durationTeaser && (
                        <p className="mt-1.5 text-caption text-warm-grey/80">{durationTeaser}</p>
                      )}
                    </div>

                    <span className={cn("inline-flex h-11 w-11 items-center justify-center rounded-pill border transition-all duration-300 sm:justify-self-end", tone.arrow)}>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                  {i < categories.length - 1 && (
                    <div className="relative z-10 mx-5 h-px bg-warm-border/70" />
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
