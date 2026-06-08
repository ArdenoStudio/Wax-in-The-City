"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Sparkles, Flower2, Leaf, Droplets, ArrowRight, type LucideIcon } from "lucide-react";
import { SERVICE_CATEGORIES, type ServiceCategory } from "@/lib/site";
import { formatLKRFrom } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerFast, fadeUp, viewportOnce } from "@/lib/animations";

const ICONS: Record<ServiceCategory, LucideIcon> = {
  waxing: Sparkles,
  facial: Flower2,
  moroccan: Leaf,
  "hydra-facial": Droplets,
};

/** Service category overview with a sharper menu-led layout. */
export function ServicesGrid() {
  return (
    <section id="services" className="relative overflow-hidden bg-cream px-5 py-section-lg lg:px-8">
      <span aria-hidden className="pointer-events-none absolute right-6 top-6 select-none font-serif text-[6rem] font-light leading-none text-warm/[0.035] sm:text-[9rem] lg:right-12 lg:text-[11rem]">01</span>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-60" />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div className="w-full min-w-0 max-w-[calc(100vw-2.5rem)] sm:max-w-full lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Treatment menu"
            title="A tighter menu, built for trust."
            subtitle="Focused choices, clear prep and appointment-led care for a calmer visit."
            align="left"
            className="w-full max-w-[calc(100vw-2.5rem)] sm:max-w-full"
          />
          <div className="premium-surface micro-lift mt-8 max-w-full rounded-card p-5">
            <div className="relative z-10">
              <p className="text-caption font-semibold uppercase tracking-[0.16em] text-brand-action">
                Positioning
              </p>
              <p className="mt-3 max-w-full break-words font-serif text-h4 italic text-warm sm:text-h3">
                Waxing is the hero. Skin care supports the promise.
              </p>
              <div className="mt-5 grid gap-2 text-body-sm text-warm-grey">
                <span>01. Private prep-first appointments</span>
                <span>02. Clear service choices</span>
                <span>03. Gentle after-care guidance</span>
              </div>
            </div>
          </div>
          <div className="mt-7">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-pill bg-ink px-5 py-3 text-body-sm font-medium text-cream shadow-[0_14px_34px_rgba(21,16,17,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-action"
            >
              Full menu
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="premium-surface rounded-card p-2"
        >
          {SERVICE_CATEGORIES.map((cat, i) => {
            const Icon = ICONS[cat.slug];
            return (
              <motion.div key={cat.slug} variants={fadeUp}>
                <Link
                  href={`/services/${cat.href}`}
                  className="group relative z-10 grid gap-5 rounded-card p-5 transition-all duration-500 ease-out hover:bg-white/72 sm:grid-cols-[76px_1fr_auto] sm:items-center sm:p-6"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-card border border-brand-action/12 bg-brand-mist/80 text-brand-action shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-all duration-500 group-hover:border-brand-action/30 group-hover:bg-brand-action group-hover:text-cream">
                      <Icon className="h-6 w-6" />
                  </span>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-serif text-h2 font-medium leading-tight text-warm">
                        {cat.name}
                      </h3>
                      <span className="rounded-pill border border-brand-action/18 bg-brand-mist/70 px-3 py-1 text-caption font-semibold uppercase tracking-[0.12em] text-brand-action">
                        {formatLKRFrom(cat.priceFrom)}
                      </span>
                    </div>
                    <p className="mt-2 max-w-lg text-body-sm text-warm-grey">{cat.short}</p>
                  </div>

                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-pill border border-brand-action/18 text-brand-action transition-all duration-300 group-hover:border-brand-action group-hover:bg-brand-action group-hover:text-cream sm:justify-self-end">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
                {i < SERVICE_CATEGORIES.length - 1 && (
                  <div className="relative z-10 mx-5 h-px bg-warm-border/70" />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
