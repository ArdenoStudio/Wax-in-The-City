import type { Variants } from "motion/react";

/**
 * Shared Framer Motion variants — creative bible file 10.
 * GPU-compositable only: opacity + transform. Never width/height/colour.
 */

/**
 * Apple motion constants — keep in sync with globals.css --ease-apple.
 * GPU only (opacity/transform). Springs where interruptible; curated
 * cubic-bezier [0.16,1,0.3,1] for non-interruptible reveals (WWDC 2018
 * critically-damped house spring, duration 0.28–0.65).
 */
export const EASE_APPLE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_APPLE_SOFT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: EASE_APPLE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.42, ease: EASE_APPLE } },
};

export const blurFade: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.56, ease: EASE_APPLE },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.52, ease: EASE_APPLE },
  },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.54, ease: EASE_APPLE },
  },
};

export const drawUnderline: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.58, ease: EASE_APPLE, delay: 0.18 },
  },
};

/** Standard viewport config for whileInView section entrances. */
export const viewportOnce = { once: true, margin: "-80px" } as const;

/** Character-level curtain reveal — wrap each char in overflow-hidden span. */
export const charVariant: Variants = {
  hidden: { y: "105%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.48,
      ease: EASE_APPLE,
      delay: 0.08 + i * 0.028,
    },
  }),
};
