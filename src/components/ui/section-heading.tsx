"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small uppercase eyebrow above the title. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /** Cream text + light underline for dark backgrounds. */
  tone?: "dark" | "light";
  className?: string;
}

/**
 * Editorial section heading (file 11) — Cormorant title with an underline that
 * draws in on scroll (drawUnderline variant, transform-origin left).
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const light = tone === "light";
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "mb-3 inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.18em]",
            light ? "text-brand-light" : "text-brand-action"
          )}
        >
          <span
            className={cn(
              "h-px w-8",
              light ? "bg-brand-light/70" : "bg-brand-action/60"
            )}
          />
          {eyebrow}
        </span>
      )}

      <div className="relative inline-block max-w-full">
        <h2
          className={cn(
            "max-w-full break-words text-balance font-serif text-h2 font-medium leading-tight sm:text-[2.65rem]",
            light ? "text-cream" : "text-warm"
          )}
        >
          {title}
        </h2>
        <span
          className={cn(
            "absolute -bottom-3 left-0 block h-px w-full hairline-gradient",
            align === "center" && "left-1/2 w-24 -translate-x-1/2"
          )}
        />
      </div>

      {subtitle && (
        <p
          className={cn(
            "mt-7 w-full max-w-xl break-words text-balance text-body-lg",
            light ? "text-cream/70" : "text-warm-grey"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
