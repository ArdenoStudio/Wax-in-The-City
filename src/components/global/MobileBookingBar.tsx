"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { CalendarDays } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";
import { whatsappLink } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function MobileBookingBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-warm-border bg-cream/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-nav backdrop-blur-md md:hidden"
        >
          <div className="flex items-center gap-3">
            <Button asChild size="md" variant="primary" className="h-12 flex-1">
              <Link href="/book">
                <CalendarDays className="h-4 w-4" />
                Send request
              </Link>
            </Button>
            <Button asChild size="icon" variant="outline" className="h-12 w-12 shrink-0">
              <a
                href={whatsappLink("Hi! I'd like to ask about a booking.")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
              >
                <WhatsappIcon className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
