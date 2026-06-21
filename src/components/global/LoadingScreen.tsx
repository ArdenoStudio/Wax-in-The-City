"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { IMAGES } from "@/lib/images";

const SESSION_KEY = "witc-loaded";
const HOLD_MS = 800;
const HOLD_REDUCED_MS = 300;

/**
 * Brief brand reveal on first homepage visit per session.
 * No scroll lock — content remains accessible underneath.
 */
export function LoadingScreen() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    sessionStorage.setItem(SESSION_KEY, "1");

    const hold = reduce ? HOLD_REDUCED_MS : HOLD_MS;
    const timer = window.setTimeout(() => setVisible(false), hold);
    return () => window.clearTimeout(timer);
  }, [isHome, reduce]);

  return (
    <AnimatePresence>
      {isHome && visible && (
        <motion.div
          key="witc-loader"
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-brand"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.28, ease: "easeIn" } }}
          aria-hidden
        >
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            className="relative h-28 w-28 sm:h-32 sm:w-32"
          >
            <Image
              src={IMAGES.logo}
              alt=""
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
