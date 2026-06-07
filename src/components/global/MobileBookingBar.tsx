"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { WhatsappIcon } from "@/components/icons";
import { whatsappLink } from "@/lib/site";

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
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-warm-border/60 bg-cream/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-sm md:hidden"
        >
          <div className="flex items-center gap-3">
            <Link
              href="/book"
              className="flex h-12 flex-1 items-center justify-center rounded-pill bg-brand-action font-medium text-cream shadow-card transition-colors active:scale-[0.98]"
            >
              Book Appointment
            </Link>
            <a
              href={whatsappLink("Hi! I'd like to ask about a booking.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-pill border border-brand-action/40 text-brand-action transition-colors hover:bg-brand-mist"
            >
              <WhatsappIcon className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
