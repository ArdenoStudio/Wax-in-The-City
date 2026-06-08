import type { Variants } from "motion/react";

/**
 * Shared Framer Motion variants — creative bible file 10.
 * GPU-compositable only: opacity + transform. Never width/height/colour.
 */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const blurFade: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const drawUnderline: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.3 },
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
      duration: 0.55,
      ease: [0.215, 0.61, 0.355, 1],
      delay: 0.1 + i * 0.032,
    },
  }),
};
