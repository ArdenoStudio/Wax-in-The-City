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
    <section
      id="about-teaser"
      className="relative overflow-hidden bg-cream px-5 py-section-lg lg:px-8"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-6 top-6 select-none font-display text-[5.5rem] font-semibold leading-none tracking-[-0.03em] text-warm/[0.03] sm:text-[8rem] lg:left-12 lg:text-[10rem]"
      >
        02
      </span>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-40" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <motion.div
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="group relative aspect-[4/5] overflow-hidden rounded-card-lg sm:aspect-[5/4] lg:aspect-[4/5]"
        >
          <Image
            src={IMAGES.about.src}
            alt={IMAGES.about.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            unoptimized={IMAGES.about.src.startsWith("http")}
            className="object-cover transition-transform duration-700 ease-[var(--ease-apple)] group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/62 via-brand/8 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6">
            <p className="font-sans text-caption font-semibold uppercase tracking-[0.12em] text-brand-light">
              The feeling
            </p>
            <p className="mt-2 max-w-xs font-display text-h4 font-semibold tracking-[-0.02em] text-cream">
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
          <h2 className="text-balance font-display text-h1 font-semibold leading-[1.08] tracking-[-0.03em] text-warm">
            Wax In The City is built around the moments most salons rush.
          </h2>
          <p className="mt-5 max-w-md font-sans text-body-lg text-warm-grey">
            We shape visits around the details that make clients feel
            comfortable: quiet timing, clean preparation and honest guidance
            after the treatment — including{" "}
            <Link
              href="/faq"
              className="font-medium text-brand-action underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40"
            >
              privacy
            </Link>{" "}
            and room prep answers when you need them.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-pill border border-brand-action/30 bg-transparent px-6 py-3 font-sans text-body-sm font-medium text-brand-action transition-colors duration-300 hover:bg-brand-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            Read our story
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
