"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { BLUR_DATA_URL } from "@/lib/images";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
  /** Shorter hero for inner pages (default) vs taller. */
  size?: "sm" | "md";
  /** Whether this hero image is LCP and should be prioritized (default true — PageHero is always above the fold). */
  priority?: boolean;
}

/** Reusable inner-page hero (file 08 — every page opens with a hero). */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  size = "sm",
  priority = true,
}: PageHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={`relative flex w-full items-end overflow-hidden bg-ink ${
        size === "md" ? "min-h-[560px]" : "min-h-[460px]"
      }`}
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        initial={reduceMotion ? false : { opacity: 0.9, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="100vw"
          placeholder={image.startsWith("/") ? "blur" : "empty"}
          blurDataURL={BLUR_DATA_URL}
          className="object-cover object-center"
          unoptimized={image.startsWith("http")}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,12,13,0.94)_0%,rgba(35,12,17,0.78)_50%,rgba(35,12,17,0.42)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.22)_0%,transparent_46%,rgba(21,16,17,0.82)_100%)]" />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-28 lg:px-8 lg:pb-20 will-change-transform"
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.44, ease: [0.16, 1, 0.3, 1], delay: reduceMotion ? 0 : 0.05 }}
      >
        {eyebrow && (
          <motion.p
            className="mb-5 inline-flex rounded-pill border border-cream/18 bg-cream/10 px-4 py-2 text-caption font-semibold uppercase tracking-[0.16em] text-brand-light shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl will-change-transform"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1], delay: reduceMotion ? 0 : 0.1 }}
          >
            {eyebrow}
          </motion.p>
        )}
        <h1 className="max-w-[12ch] break-words text-balance font-serif text-4xl font-medium leading-[1.04] bg-gradient-to-r from-cream via-pearl-blush to-cream/90 bg-clip-text text-transparent sm:max-w-3xl sm:text-6xl lg:text-7xl sm:leading-[1]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-xl text-pretty text-body-lg text-cream/80">
            {subtitle}
          </p>
        )}
      </motion.div>
    </section>
  );
}
