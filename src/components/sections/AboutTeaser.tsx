"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { fadeUp, slideFromLeft, viewportOnce } from "@/lib/animations";

/** About teaser: founder/studio positioning without generic beauty-site filler. */
export function AboutTeaser() {
  return (
    <section className="relative overflow-hidden bg-cream px-5 py-section-lg lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-50" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <motion.div
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="group premium-surface micro-lift relative aspect-[4/5] overflow-hidden rounded-card p-2 sm:aspect-[5/4] lg:aspect-[4/5]"
        >
          <div className="relative z-10 h-full overflow-hidden rounded-[7px]">
            <Image
              src="https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=1100&auto=format&fit=crop"
              alt="The calm, welcoming space at Wax In The City"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="image-polish object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/58 via-brand/10 to-transparent" />
          </div>
          <div className="glass-panel absolute bottom-5 left-5 z-20 max-w-xs rounded-card p-5 text-cream">
            <p className="text-caption font-semibold uppercase tracking-[0.14em] text-brand-light">
              The feeling
            </p>
            <p className="mt-2 font-serif text-h4 italic">
              Calm, private care before the first appointment begins.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="text-caption font-semibold uppercase tracking-[0.18em] text-brand-action">
            Our story
          </span>
          <h2 className="mt-4 text-balance font-serif text-h1 font-medium leading-tight text-warm">
            Built around the moments most salons rush.
          </h2>
          <p className="mt-6 max-w-md text-body-lg text-warm-grey">
            Wax In The City is shaped around the details that make clients feel
            comfortable: quiet timing, clean preparation and honest guidance
            after the treatment.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-pill border border-brand-action/35 bg-white/40 px-6 py-3 font-medium text-brand-action shadow-[0_14px_34px_rgba(39,19,21,0.05)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-mist"
          >
            Read our story
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
