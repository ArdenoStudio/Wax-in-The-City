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

/** Service category overview (file 08, section 05). 2×2 mobile, 4-col desktop. */
export function ServicesGrid() {
  return (
    <section className="bg-cream-alt px-5 py-section lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="What we do"
          title="Treatments made for you."
          subtitle="Four kinds of care, each done with the same genuine attention."
        />

        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6"
        >
          {SERVICE_CATEGORIES.map((cat) => {
            const Icon = ICONS[cat.slug];
            return (
              <motion.div key={cat.slug} variants={fadeUp}>
                <Link
                  href={`/services/${cat.href}`}
                  className="group flex h-full flex-col rounded-card-lg border border-warm-border bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:p-6"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-pill bg-brand-mist text-brand-action transition-colors group-hover:bg-brand-action group-hover:text-cream">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-serif text-h3 text-warm">{cat.name}</h3>
                  <p className="mt-2 flex-1 text-body-sm text-warm-grey">{cat.short}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-caption font-semibold uppercase tracking-wide text-brand-action">
                      {formatLKRFrom(cat.priceFrom)}
                    </span>
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
