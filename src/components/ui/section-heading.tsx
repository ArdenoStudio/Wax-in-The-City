"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  showEyebrow?: boolean;
  titleId?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "dark",
  showEyebrow = true,
  titleId,
  className,
}: SectionHeadingProps) {
  const light = tone === "light";
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={false}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "motion-reduce-none flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {showEyebrow && eyebrow && (
        <span
          className={cn(
            "mb-3 text-caption font-semibold uppercase tracking-[0.14em]",
            light ? "text-brand-light" : "text-brand-action"
          )}
        >
          {eyebrow}
        </span>
      )}

      <h2
        id={titleId}
        className={cn(
          "max-w-full font-display text-[clamp(1.85rem,4vw,2.65rem)] font-semibold leading-[1.1] tracking-[-0.03em]",
          light ? "text-cream" : "text-warm"
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "mt-4 w-full max-w-xl text-pretty text-body-lg",
            light ? "text-cream/72" : "text-warm-grey"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
