"use client";

import { MotionConfig } from "motion/react";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionConfig>
  );
}
