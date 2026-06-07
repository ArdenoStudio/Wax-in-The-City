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
    <section className="bg-cream px-5 py-section-lg lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="w-full min-w-0 max-w-[calc(100vw-2.5rem)] sm:max-w-full lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Treatment menu"
            title="Specialist care, not a salon buffet."
            subtitle="Focused services. Clean prep. Appointment-led care."
            align="left"
            className="w-full max-w-[calc(100vw-2.5rem)] sm:max-w-full"
          />
          <div className="mt-8 max-w-full border-l-2 border-brand-action pl-5">
            <p className="max-w-full break-words font-serif text-h4 italic text-warm sm:text-h3">
              Waxing is the hero. Skin care supports the promise.
            </p>
            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-2 rounded-pill bg-ink px-5 py-3 text-body-sm font-medium text-cream transition-colors hover:bg-brand-action"
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
          className="grid gap-4 sm:grid-cols-2"
        >
          {SERVICE_CATEGORIES.map((cat) => {
            const Icon = ICONS[cat.slug];
            return (
              <motion.div key={cat.slug} variants={fadeUp}>
                <Link
                  href={`/services/${cat.href}`}
                  className="group flex min-h-[260px] flex-col border border-warm-border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-action/50 hover:shadow-card-hover sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-pill bg-brand-mist text-brand-action transition-colors group-hover:bg-brand-action group-hover:text-cream">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="text-caption font-semibold uppercase tracking-[0.14em] text-brand-action">
                      {formatLKRFrom(cat.priceFrom)}
                    </span>
                  </div>
                  <h3 className="mt-8 font-serif text-h2 font-light text-warm">{cat.name}</h3>
                  <p className="mt-2 flex-1 text-body-sm text-warm-grey">{cat.short}</p>
                  <div className="mt-7 flex items-center justify-between border-t border-warm-border pt-4">
                    <span className="text-body-sm font-medium text-warm">Explore</span>
                    <ArrowRight className="h-4 w-4 text-brand-action transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
