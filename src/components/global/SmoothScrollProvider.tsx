"use client";

import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let raf = 0;

    const stopLenis = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      lenis?.destroy();
      lenis = null;
    };

    const startLenis = () => {
      if (media.matches || lenis) return;

      lenis = new Lenis({
        duration: 1.05,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        wheelMultiplier: 0.86,
      });

      // Note: Window already types `lenis` from the package ambient types — do not
      // overwrite it. Hero / in-page anchors use native scrollIntoView({ block: "start" }).

      function animate(time: number) {
        lenis?.raf(time);
        raf = requestAnimationFrame(animate);
      }
      raf = requestAnimationFrame(animate);
    };

    const onPreferenceChange = () => {
      if (media.matches) stopLenis();
      else startLenis();
    };

    onPreferenceChange();
    media.addEventListener("change", onPreferenceChange);

    return () => {
      media.removeEventListener("change", onPreferenceChange);
      stopLenis();
    };
  }, []);

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionConfig>
  );
}
