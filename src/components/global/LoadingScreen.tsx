"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { IMAGES } from "@/lib/images";

const SESSION_KEY = "witc-loaded";

/**
 * Full-screen brand reveal on first visit of a session (file 10, section 1).
 * Logo fades + scales in on maroon, holds briefly, then the screen lifts away.
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
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen) return;

    // sessionStorage is a client-only external system; reading it on mount to
    // decide whether to show the once-per-session loader is the intended use.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    sessionStorage.setItem(SESSION_KEY, "1");

    const hold = reduce ? 400 : 1300;
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeIn" } }}
        >
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            className="relative h-28 w-28 sm:h-32 sm:w-32"
          >
            <Image
              src={IMAGES.logo}
              alt="Wax In The City"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="128px"
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
