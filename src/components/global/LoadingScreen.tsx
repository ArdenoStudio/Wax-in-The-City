"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/site";

const SESSION_KEY = "witc-loaded";

type NetworkInformation = { saveData?: boolean };

/**
 * Full-screen brand reveal on first visit of a session.
 * Logo + Cal Sans wordmark fade in on maroon, then the screen lifts away.
 * Max ~1.5s. Honours prefers-reduced-motion and sessionStorage.
 */
export function LoadingScreen() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    if (typeof window === "undefined") return;
    const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (conn?.saveData) return;
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen) return;

    // sessionStorage is a client-only external system; reading it on mount to
    // decide whether to show the once-per-session loader is the intended use.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    sessionStorage.setItem(SESSION_KEY, "1");

    const hold = reduce ? 360 : 680;
    const timer = window.setTimeout(() => setVisible(false), hold);
    return () => window.clearTimeout(timer);
  }, [isHome, reduce]);

  // Lock scroll while visible
  useEffect(() => {
    if (isHome && visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isHome, visible]);

  return (
    <AnimatePresence>
      {isHome && visible && (
        <motion.div
          key="witc-loader"
          data-loading-screen
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: reduce ? 0 : -12,
            transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
          }}
          aria-busy="true"
          aria-live="polite"
          role="status"
          aria-label="Loading studio"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(162,15,55,0.35),transparent_52%)]"
          />
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            className="relative z-10 flex flex-col items-center gap-5"
          >
            <div className="relative h-24 w-24 sm:h-28 sm:w-28">
              <Image
                src={IMAGES.logo}
                alt=""
                fill
                loading="eager"
                fetchPriority="high"
                sizes="112px"
                className="object-contain"
              />
            </div>
            <p className="text-balance font-display text-[clamp(1.35rem,4vw,1.75rem)] font-semibold tracking-tight-display text-cream">
              {SITE.shortName}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
