"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { fadeUp, blurFade, scaleIn, slideFromLeft, viewportOnce } from "@/lib/animations";

const VARIANTS: Record<string, Variants> = {
  fadeUp,
  blurFade,
  scaleIn,
  slideFromLeft,
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
  delay?: number;
  className?: string;
  as?: "div" | "section";
}

/** Scroll-triggered entrance wrapper (file 11). Opacity + transform only. */
export function AnimatedSection({
  children,
  variant = "fadeUp",
  delay = 0,
  className,
  as = "div",
}: AnimatedSectionProps) {
  const MotionTag = as === "section" ? motion.section : motion.div;
  const base = VARIANTS[variant];
  const reduceMotion = useReducedMotion();

  // Clone the variant to apply the optional delay without mutating the shared object.
  const variants: Variants = {
    hidden: base.hidden,
    visible: {
      ...(base.visible as object),
      transition: {
        ...((base.visible as { transition?: object }).transition ?? {}),
        delay,
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  );
}
