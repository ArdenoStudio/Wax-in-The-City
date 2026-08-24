"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Sparkles, Flower2, Leaf, Droplets, ArrowRight, type LucideIcon } from "lucide-react";
import { SERVICE_CATEGORIES, type ServiceCategory, type ServiceCategoryMeta } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { cn, formatLKRFrom } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerFast, fadeUp, viewportOnce } from "@/lib/animations";

const ICONS: Record<ServiceCategory, LucideIcon> = {
  waxing: Sparkles,
  facial: Flower2,
  moroccan: Leaf,
  "hydra-facial": Droplets,
};

const CATEGORY_IMAGES: Record<ServiceCategory, string> = {
  waxing: IMAGES.services.waxing,
  facial: IMAGES.services.facials,
  moroccan: IMAGES.services.moroccan,
  "hydra-facial": IMAGES.services.hydraFacial,
};

const CATEGORY_TONES: Record<
  ServiceCategory,
  { row: string; icon: string; price: string; arrow: string }
> = {
  waxing: {
    row: "hover:bg-brand-action/[0.06] hover:shadow-[0_10px_28px_rgba(21,16,17,0.06)] hover:-translate-y-[1px]",
    icon: "border-brand-action/14 bg-brand-mist text-brand-action group-hover:bg-brand-action group-hover:text-cream",
    price: "border-brand-action/14 bg-white text-brand-action shadow-[0_4px_14px_rgba(27,14,16,0.07)]",
    arrow: "border-brand-action/18 text-brand-action group-hover:border-brand-action group-hover:bg-brand-action group-hover:text-cream",
  },
  facial: {
    row: "hover:bg-gold/[0.07] hover:shadow-[0_10px_28px_rgba(21,16,17,0.06)] hover:-translate-y-[1px]",
    icon: "border-gold/30 bg-gold/12 text-warm group-hover:bg-gold group-hover:text-brand-dark",
    price: "border-gold/20 bg-white text-warm shadow-[0_4px_14px_rgba(27,14,16,0.07)]",
    arrow: "border-gold/30 text-warm group-hover:border-gold group-hover:bg-gold group-hover:text-brand-dark",
  },
  moroccan: {
    row: "hover:bg-sage/[0.09] hover:shadow-[0_10px_28px_rgba(21,16,17,0.06)] hover:-translate-y-[1px]",
    icon: "border-sage/30 bg-sage/14 text-warm group-hover:bg-sage group-hover:text-brand-dark",
    price: "border-sage/20 bg-white text-warm shadow-[0_4px_14px_rgba(27,14,16,0.07)]",
    arrow: "border-sage/30 text-warm group-hover:border-sage group-hover:bg-sage group-hover:text-brand-dark",
  },
  "hydra-facial": {
    row: "hover:bg-brand/[0.05] hover:shadow-[0_10px_28px_rgba(21,16,17,0.06)] hover:-translate-y-[1px]",
    icon: "border-brand/12 bg-brand/8 text-brand group-hover:bg-brand group-hover:text-cream",
    price: "border-brand/12 bg-white text-brand shadow-[0_4px_14px_rgba(27,14,16,0.07)]",
    arrow: "border-brand/16 text-brand group-hover:border-brand group-hover:bg-brand group-hover:text-cream",
  },
};

/** Service category overview — BeWAXed-inspired visual menu with actual treatment imagery for waxing/facials. */
export function ServicesGrid({
  categories = SERVICE_CATEGORIES,
}: {
  categories?: ServiceCategoryMeta[];
}) {
  return (
    <section id="services" className="relative overflow-hidden bg-cream px-5 py-section-lg lg:px-8">
      <span aria-hidden className="pointer-events-none absolute right-6 top-6 select-none font-serif text-8xl font-light leading-none text-warm/[0.035] sm:text-9xl lg:right-12 lg:text-9xl">01</span>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-60" />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div className="w-full min-w-0 max-w-[calc(100vw-2.5rem)] sm:max-w-full lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Treatment menu"
            title="A tighter menu, built for trust."
            subtitle="Focused choices, clear prep and appointment led care for a calmer visit."
            align="left"
            className="w-full max-w-[calc(100vw-2.5rem)] sm:max-w-full"
          />
          <div className="premium-surface micro-lift mt-8 max-w-full rounded-card p-5">
            <div className="relative z-10">
              <p className="text-caption font-semibold uppercase tracking-[0.16em] text-brand-action text-pretty">
                Positioning
              </p>
              <p className="mt-3 max-w-full break-words font-serif text-h4 font-medium text-warm sm:text-h3 text-pretty">
                Waxing is the hero. Skin care supports the promise.
              </p>
              <div className="mt-5 grid gap-2 text-body-sm text-warm-grey">
                <span>01. Private prep focused appointments</span>
                <span>02. Clear service choices</span>
                <span>03. Gentle aftercare guidance</span>
              </div>
            </div>
          </div>
          <div className="mt-7">
            <Link
              href="/services"
              className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-ink px-5 py-3 text-body-sm font-medium text-cream shadow-[0_14px_34px_rgba(21,16,17,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-action focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
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
          className="studio-plate rounded-[24px] p-2"
        >
          {categories.map((cat, i) => {
            const Icon = ICONS[cat.slug];
            const tone = CATEGORY_TONES[cat.slug];
            const thumb = CATEGORY_IMAGES[cat.slug];
            const isExternal = thumb.startsWith("http");
            return (
              <motion.div key={cat.slug} variants={fadeUp}>
                <Link
                  href={`/services/${cat.href}`}
                  className={cn("group relative z-10 grid gap-5 rounded-card p-5 transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:grid-cols-[76px_1fr_auto] sm:items-center sm:p-6", tone.row)}
                >
                  <span className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-card border border-warm-border/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                    <Image
                      src={thumb}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                      unoptimized={isExternal}
                    />
                    <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(23,7,11,0.55)_100%)]" />
                    <span className={cn("relative flex h-7 w-7 items-center justify-center rounded-pill border bg-white/85 backdrop-blur-md shadow-[0_2px_8px_rgba(21,16,17,0.12)]", tone.icon.includes("bg-brand-mist") ? "border-brand-action/10" : "border-white/50")}>
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                  </span>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-serif text-h2 font-medium leading-tight text-warm text-balance">
                        {cat.name}
                      </h3>
                      {/* BeWAXed pricing-guide cue — clean white pill, more air, tabular nums for premium scan */}
                      <span className={cn("rounded-pill border px-3.5 py-1.5 text-caption font-bold uppercase tracking-[0.12em] tabular-nums shadow-[0_4px_14px_rgba(27,14,16,0.06)]", tone.price)}>
                        {formatLKRFrom(cat.priceFrom)}
                      </span>
                    </div>
                    <p className="mt-2 max-w-lg text-body-sm text-warm-grey text-pretty">{cat.short}</p>
                    {cat.slug === "waxing" && (
                      <span className="mt-2 block text-caption font-medium uppercase tracking-[0.12em] text-warm/45">
                        Hygiene you can trust · fresh wax · no double dipping · appointment led
                      </span>
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
      </div>
    </section>
  );
}
