"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { WhatsappIcon } from "@/components/icons";
import { WhatsAppBranchPicker } from "@/components/sections/WhatsAppBranchPicker";

/**
 * Fixed bottom booking bar — mobile only (file 10, section 11).
 * Hidden while the user is in the hero, slides up once scrolled past it.
 */
export function MobileBookingBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Reveal once scrolled past ~70% of the first viewport (the hero).
      setShow(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 64, opacity: 0.9, scale: 0.99 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 64, opacity: 0, scale: 0.99 }}
          transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.85 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-warm-border/60 bg-cream/78 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-18px_48px_rgba(39,19,21,0.10)] backdrop-blur-2xl will-change-transform md:hidden"
        >
          <div className="flex items-center gap-3">
            <Link
              href="/book"
              className="pressable flex h-12 flex-1 items-center justify-center rounded-pill bg-[linear-gradient(135deg,var(--color-brand-action),var(--color-brand-dark))] font-medium text-cream shadow-[0_14px_34px_rgba(151,35,58,0.24)]"
            >
              Book appointment
            </Link>
            <WhatsAppBranchPicker
              aria-label="Chat on WhatsApp"
              className="pressable flex h-12 w-12 shrink-0 items-center justify-center rounded-pill border border-brand-action/30 bg-white/52 text-brand-action shadow-[0_10px_24px_rgba(39,19,21,0.06)] backdrop-blur hover:bg-brand-mist"
            >
              <WhatsappIcon className="h-5 w-5" />
            </WhatsAppBranchPicker>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
