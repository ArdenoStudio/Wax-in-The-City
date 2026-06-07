"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { blurFade, drawUnderline, viewportOnce } from "@/lib/animations";

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
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <motion.span
          variants={blurFade}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={cn(
            "mb-3 text-caption font-semibold uppercase tracking-[0.18em]",
            light ? "text-brand-light" : "text-brand-action"
          )}
        >
          {eyebrow}
        </motion.span>
      )}

      <div className="relative inline-block">
        <motion.h2
          variants={blurFade}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={cn(
            "font-serif text-h2 font-medium sm:text-[2.5rem] sm:leading-tight",
            light ? "text-cream" : "text-warm"
          )}
        >
          {title}
        </motion.h2>
        <motion.span
          variants={drawUnderline}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          style={{ transformOrigin: "left" }}
          className={cn(
            "absolute -bottom-2 left-0 block h-[2px] w-full",
            light ? "bg-brand-light" : "bg-brand-action/70",
            align === "center" && "left-1/2 w-16 -translate-x-1/2"
          )}
        />
      </div>

      {subtitle && (
        <motion.p
          variants={blurFade}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={cn(
            "mt-6 max-w-xl text-body-lg",
            light ? "text-cream/70" : "text-warm-grey"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
