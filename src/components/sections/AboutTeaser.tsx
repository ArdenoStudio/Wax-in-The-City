"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { IMAGES, BLUR_DATA_URL } from "@/lib/images";
import { fadeUp, slideFromLeft, viewportOnce } from "@/lib/animations";

/** About teaser: founder/studio positioning without generic beauty-site filler. */
export function AboutTeaser() {
  return (
    <section id="about-teaser" className="relative overflow-hidden bg-cream px-5 py-section-lg lg:px-8">
      <span aria-hidden className="pointer-events-none absolute left-6 top-6 select-none font-serif text-[6rem] font-light leading-none text-warm/[0.035] sm:text-[9rem] lg:left-12 lg:text-[11rem]">02</span>
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
              src={IMAGES.about.src}
              alt={IMAGES.about.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              unoptimized={IMAGES.about.src.startsWith("http")}
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
          <h2 className="text-balance font-serif text-h1 font-medium leading-tight text-warm">
            Wax In The City is built around the moments most salons rush.
          </h2>
          <p className="mt-6 max-w-md text-body-lg text-warm-grey">
            We shape visits around the details that make clients feel
            comfortable: quiet timing, clean preparation and honest guidance
            after the treatment — including{" "}
            <Link
              href="/faq"
              className="font-medium text-brand-action underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/45"
            >
              privacy
            </Link>{" "}
            and room prep answers when you need them.
          </p>
          <Link
            href="/about"
            className="icon-drift mt-8 inline-flex items-center gap-2 rounded-pill border border-brand-action/35 bg-white/40 px-6 py-3 font-medium text-brand-action shadow-[0_14px_34px_rgba(39,19,21,0.05)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/45 focus-visible:ring-offset-2"
          >
            Read our story
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
