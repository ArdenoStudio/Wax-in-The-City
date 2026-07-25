"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { WhatsappIcon } from "@/components/icons";
import { whatsappLink } from "@/lib/site";

function whatsappMessageForPath(pathname: string): string {
  if (pathname.startsWith("/services")) {
    return "Hi! I'd like to ask about a service booking.";
  }
  if (pathname.startsWith("/locations")) {
    return "Hi! I'd like to book at one of your branches.";
  }
  if (pathname.startsWith("/faq") || pathname.startsWith("/contact")) {
    return "Hi! I have a quick question before booking.";
  }
  if (pathname.startsWith("/gallery") || pathname.startsWith("/about")) {
    return "Hi! I'd like to book a visit after browsing the site.";
  }
  return "Hi! I'd like to ask about a booking.";
}

/**
 * Fixed bottom booking bar — mobile only.
 * Reveals after scrolling past the hero; hides on /book and while #book is in view.
 * z-40 stays below Navbar (z-50) and Sheet (z-[60]).
 */
export function MobileBookingBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [bookInView, setBookInView] = useState(false);
  const reduceMotion = useReducedMotion();
  const hideOnBookPage = pathname === "/book";

  useEffect(() => {
    if (hideOnBookPage) {
      // Sync bar visibility to route — external navigation system.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(false);
      return;
    }
    const onScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.68);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hideOnBookPage]);

  useEffect(() => {
    if (hideOnBookPage) return;
    const target = document.getElementById("book");
    if (!target) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBookInView(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setBookInView(entry.isIntersecting),
      { rootMargin: "-10% 0px -20% 0px", threshold: 0.12 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hideOnBookPage, pathname]);

  const visible = show && !hideOnBookPage && !bookInView;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="region"
          aria-label="Quick booking"
          initial={reduceMotion ? false : { y: 96, opacity: 0.72, scale: 0.985 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { y: 96, opacity: 0, scale: 0.985 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 420, damping: 36, mass: 0.9 }
          }
          data-mobile-booking-bar
          className="fixed inset-x-0 bottom-0 z-40 border-t border-warm-border/55 bg-cream/82 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-16px_44px_rgba(27,14,16,0.09)] backdrop-blur-2xl md:hidden"
        >
          <p className="mb-2 text-center font-sans text-caption text-warm-grey/90">
            Request a time · WhatsApp for same-day
          </p>
          <div className="flex items-center gap-2.5">
            <Link
              href="/book"
              className="pressable flex h-12 flex-1 items-center justify-center rounded-pill bg-[linear-gradient(135deg,#a5273f,#6f1726)] font-semibold tracking-[-0.01em] text-cream shadow-[0_14px_34px_rgba(151,35,58,0.22)]"
            >
              Request a time
            </Link>
            <a
              href={whatsappLink(whatsappMessageForPath(pathname))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp — fastest booking"
              className="pressable flex h-12 w-12 shrink-0 items-center justify-center rounded-pill border border-brand-action/28 bg-white/60 text-brand-action shadow-card backdrop-blur-xl hover:bg-brand-mist"
            >
              <WhatsappIcon className="h-5 w-5 shrink-0" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
