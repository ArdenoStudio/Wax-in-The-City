"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
  /** Shorter hero for inner pages (default) vs taller. */
  size?: "sm" | "md";
}

/** Reusable inner-page hero (file 08 — every page opens with a hero). */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  size = "sm",
}: PageHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={`relative flex w-full items-end overflow-hidden bg-ink ${
        size === "md" ? "min-h-[560px]" : "min-h-[460px]"
      }`}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { opacity: 0.9, scale: 1.035 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.12, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          unoptimized={image.startsWith("http")}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,12,13,0.94)_0%,rgba(35,12,17,0.78)_50%,rgba(35,12,17,0.42)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.22)_0%,transparent_46%,rgba(21,16,17,0.82)_100%)]" />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-28 lg:px-8 lg:pb-20"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.74, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
      >
        {eyebrow && (
          <motion.p
            className="mb-5 inline-flex rounded-pill border border-cream/18 bg-cream/10 px-4 py-2 text-caption font-semibold uppercase tracking-[0.16em] text-brand-light shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
          >
            {eyebrow}
          </motion.p>
        )}
        <h1 className="max-w-3xl text-balance font-serif text-[3rem] font-medium leading-[1] text-cream sm:text-[4.6rem]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-xl text-balance text-body-lg text-cream/80">
            {subtitle}
          </p>
        )}
      </motion.div>
    </section>
  );
}
