"use client";

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
            "mb-3 text-caption font-semibold uppercase tracking-[0.18em]",
            light ? "text-brand-light" : "text-brand-action"
          )}
        >
          {eyebrow}
        </span>
      )}

      <div className="relative inline-block max-w-full">
        <h2
          className={cn(
            "max-w-full break-words font-serif text-h2 font-medium sm:text-[2.5rem] sm:leading-tight",
            light ? "text-cream" : "text-warm"
          )}
        >
          {title}
        </h2>
        <span
          className={cn(
            "absolute -bottom-2 left-0 block h-[2px] w-full",
            light ? "bg-brand-light" : "bg-brand-action/70",
            align === "center" && "left-1/2 w-16 -translate-x-1/2"
          )}
        />
      </div>

      {subtitle && (
        <p
          className={cn(
            "mt-6 w-full max-w-xl break-words text-body-lg",
            light ? "text-cream/70" : "text-warm-grey"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
