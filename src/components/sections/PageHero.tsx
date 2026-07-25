"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { BLUR_DATA_URL } from "@/lib/images";
import { SITE } from "@/lib/site";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  /** Shorter hero for inner pages (default) vs taller. */
  size?: "sm" | "md";
  /** Optional Book / WhatsApp CTA group under the subtitle. */
  cta?: ReactNode;
}

/** Reusable inner-page hero (file 08 — every page opens with a hero). */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = "",
  size = "sm",
  cta,
}: PageHeroProps) {
  const reduceMotion = useReducedMotion();
  const hasImage = Boolean(image?.trim());

  return (
    <section
      className={`relative flex min-h-[42vh] w-full items-end overflow-hidden bg-ink ${
        size === "md" ? "sm:min-h-[560px]" : "sm:min-h-[460px]"
      }`}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { opacity: 0.9, scale: 1.035 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.12, ease: [0.16, 1, 0.3, 1] }}
      >
        {hasImage && image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            unoptimized={image.startsWith("http")}
            className="object-cover object-center"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(135deg,#2b0710,#17070b_55%,#12060a)]"
            style={{
              backgroundImage: `url(${BLUR_DATA_URL})`,
              backgroundSize: "cover",
              filter: "blur(24px)",
            }}
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,12,13,0.94)_0%,rgba(35,12,17,0.78)_50%,rgba(35,12,17,0.42)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.22)_0%,transparent_46%,rgba(21,16,17,0.82)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(162,15,55,0.28),transparent_42%),radial-gradient(circle_at_82%_70%,rgba(252,229,236,0.10),transparent_36%)]" />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-28 lg:px-8 lg:pb-20"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.74, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
      >
        <p className="font-serif text-[clamp(1.85rem,5.5vw,2.75rem)] font-medium italic leading-none tracking-[0.01em] text-cream">
          {SITE.shortName}
        </p>
        {eyebrow && (
          <motion.p
            className="mt-4 inline-flex rounded-pill border border-cream/18 bg-cream/10 px-4 py-2 text-caption font-semibold uppercase tracking-[0.16em] text-brand-light shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
          >
            {eyebrow}
          </motion.p>
        )}
        <h1 className="mt-5 max-w-[16ch] break-words text-balance font-serif text-[clamp(2.1rem,8vw,3.15rem)] font-medium leading-[1.06] text-cream/96 sm:max-w-3xl sm:text-[3.6rem] sm:leading-[1.04]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-xl text-balance text-body-lg text-cream/80">
            {subtitle}
          </p>
        )}
        {cta && <div className="mt-7 flex flex-wrap items-center gap-3">{cta}</div>}
      </motion.div>
    </section>
  );
}
