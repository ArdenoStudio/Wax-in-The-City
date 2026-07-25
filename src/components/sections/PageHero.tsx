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

/** Reusable inner-page hero — brand-first Cal Sans, Cult UI oxblood field. */
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
      className={`relative flex min-h-[40vh] w-full items-end overflow-hidden bg-ink ${
        size === "md" ? "sm:min-h-[540px]" : "sm:min-h-[440px]"
      }`}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { opacity: 0.88, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
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
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(18,12,13,0.96)_0%,rgba(35,12,17,0.82)_48%,rgba(35,12,17,0.38)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,transparent_42%,rgba(18,6,10,0.88)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(162,15,55,0.26),transparent_40%),radial-gradient(circle_at_84%_68%,rgba(252,229,236,0.08),transparent_34%)]" />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-7 pb-12 pt-28 lg:px-10 lg:pb-16"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
      >
        {/* Brand-first: Cal Sans hero signal — no italic, no floating badges */}
        <p className="text-balance font-display text-[clamp(1.9rem,5.8vw,2.85rem)] font-semibold leading-[0.96] tracking-tight-display text-cream">
          {SITE.shortName}
        </p>

        {eyebrow && (
          <motion.p
            className="mt-7 font-sans text-caption leading-snug font-semibold uppercase tracking-[0.1em] text-brand-light/90"
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
          >
            {eyebrow}
          </motion.p>
        )}

        <h1 className="min-w-0 mt-4 max-w-[15ch] break-words text-balance font-display text-[clamp(2rem,7.5vw,3.05rem)] font-semibold leading-[1.05] tracking-tight-display text-cream sm:max-w-3xl sm:text-[3.4rem] sm:leading-[1.03]">
          {title}
        </h1>

        {subtitle && (
          <p className="tracking-[-0.011em] font-sans mt-5 max-w-[36rem] text-pretty text-body-lg leading-[1.7] text-cream">
            {subtitle}
          </p>
        )}

        {cta && (
          <div className="mt-7 flex flex-wrap items-center gap-3.5">{cta}</div>
        )}
      </motion.div>
    </section>
  );
}
