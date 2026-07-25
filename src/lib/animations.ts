import type { Variants } from "motion/react";

/**
 * Shared Framer Motion variants — creative bible file 10.
 * GPU-compositable only: opacity + transform. Never width/height/colour.
 */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeUpFast: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.58, ease: [0.16, 1, 0.3, 1] } },
};

export const blurFade: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.78, ease: [0.16, 1, 0.3, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.02 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.965 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.68, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.74, ease: [0.16, 1, 0.3, 1] },
  },
};

export const drawUnderline: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.68, ease: [0.16, 1, 0.3, 1], delay: 0.18 },
  },
};

/** Standard viewport config for whileInView section entrances. */
export const viewportOnce = { once: true, margin: "-10% 0px" } as const;

/** Character-level curtain reveal — wrap each char in overflow-hidden span. */
export const charVariant: Variants = {
  hidden: { y: "105%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: [0.215, 0.61, 0.355, 1],
      delay: 0.1 + i * 0.032,
    },
  }),
};
