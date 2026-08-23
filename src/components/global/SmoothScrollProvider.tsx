"use client";

import { useEffect, useRef } from "react";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";

/**
 * Apple inertial scroll — Lenis is destroyed when prefers-reduced-motion
 * is active, and re-created if the user toggles the preference mid-session.
 * Tuning: duration 1.0 + wheelMultiplier 0.92 = iOS-like momentum without
 * the "wading through honey" drag. GPU rAF, smoothWheel only.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const start = () => {
      if (lenisRef.current) return;
      const lenis = new Lenis({
        duration: 1.0,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        wheelMultiplier: 0.92,
        touchMultiplier: 1.1,
        gestureOrientation: "vertical",
      });
      lenisRef.current = lenis;

      const tick = (time: number) => {
        lenis.raf(time);
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };

    if (!media.matches) start();

    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) stop();
      else start();
    };
    media.addEventListener("change", onChange);

    return () => {
      media.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionConfig>
  );
}
