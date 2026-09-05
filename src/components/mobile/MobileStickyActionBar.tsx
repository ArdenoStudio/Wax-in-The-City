"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Phone } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";
import { WhatsAppBranchPicker } from "@/components/sections/WhatsAppBranchPicker";
import { BRANCHES } from "@/lib/site";
import { trackBookingClick, trackWhatsAppClick } from "@/lib/analytics";

export function MobileStickyActionBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal sticky bar once user scrolls down slightly (past initial hero action)
      setVisible(window.scrollY > 160);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Do not render on admin pages or booking form page to avoid UI clashes
  if (pathname.startsWith("/admin") || pathname === "/book") {
    return null;
  }

  return (
    <aside
      aria-label="Quick mobile booking actions"
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="border-t border-cream/15 bg-brand-dark/95 px-3.5 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-10px_35px_rgba(18,6,10,0.45)] backdrop-blur-2xl">
        <div className="mx-auto flex max-w-md items-center justify-between gap-2">
          {/* Quick Call Button */}
          <a
            href={`tel:${BRANCHES[0].phone.replace(/\s+/g, "")}`}
            aria-label="Call salon for instant appointment"
            className="pressable flex h-11 w-11 shrink-0 items-center justify-center rounded-pill border border-cream/15 bg-cream/10 text-cream transition-colors active:bg-cream/20"
          >
            <Phone className="h-4 w-4" />
          </a>

          {/* WhatsApp Direct Action */}
          <WhatsAppBranchPicker
            className="pressable flex h-11 flex-1 items-center justify-center gap-1.5 rounded-pill border border-brand-action/40 bg-brand-action/25 px-3 text-caption font-semibold text-brand-light shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-colors active:bg-brand-action/40"
            onClick={() => trackWhatsAppClick("mobile_sticky_bar")}
          >
            <WhatsappIcon className="h-4 w-4 shrink-0 text-brand-light" />
            <span>WhatsApp</span>
          </WhatsAppBranchPicker>

          {/* Primary Book Appointment CTA */}
          <Link
            href="/book"
            onClick={() => trackBookingClick("mobile_sticky_bar")}
            className="pressable flex h-11 flex-1 items-center justify-center gap-1.5 rounded-pill bg-[linear-gradient(135deg,var(--color-brand-action),var(--color-brand))] px-3 text-caption font-semibold text-cream shadow-[0_4px_18px_rgba(162,15,55,0.35)] transition-all active:scale-[0.98]"
          >
            <CalendarDays className="h-4 w-4 shrink-0" />
            <span>Book Visit</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
