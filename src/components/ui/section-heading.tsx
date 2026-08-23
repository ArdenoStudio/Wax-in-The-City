"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const light = tone === "light";
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div
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
            <span className={cn("h-px w-8", light ? "bg-brand-light/70" : "bg-brand-action/60")} />
            {eyebrow}
          </span>
        )}
        <div className="relative inline-block min-w-24 max-w-full">
          <h2 className={cn("max-w-full break-words text-balance font-serif text-h2 font-medium leading-tight sm:text-h1", light ? "text-cream" : "text-warm")}>{title}</h2>
          <span className={cn("absolute -bottom-3 left-0 block h-px w-full hairline-gradient", align === "center" && "left-1/2 w-24 -translate-x-1/2")} />
        </div>
        {subtitle && <p className={cn("mt-7 w-full max-w-xl break-words text-pretty text-body-lg", light ? "text-cream/70" : "text-warm-grey")}>{subtitle}</p>}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "motion-reduce-none flex flex-col will-change-transform",
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

      <div className="relative inline-block min-w-24 max-w-full">
        <h2
          className={cn(
            "max-w-full break-words text-balance font-serif text-h2 font-medium leading-tight sm:text-h1",
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
            "mt-7 w-full max-w-xl break-words text-pretty text-body-lg",
            light ? "text-cream/70" : "text-warm-grey"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
