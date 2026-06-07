"use client";

import Image from "next/image";
import { motion } from "motion/react";

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
  return (
    <section
      className={`relative flex w-full items-end overflow-hidden ${
        size === "md" ? "h-[68svh] min-h-[460px]" : "h-[58svh] min-h-[380px]"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand/90 via-brand/45 to-brand/35" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 lg:px-8 lg:pb-20">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-3 text-caption font-semibold uppercase tracking-[0.22em] text-brand-light"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-2xl font-serif text-[2.75rem] font-light italic leading-tight text-cream sm:text-[3.75rem]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 max-w-xl text-body-lg text-cream/85"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
