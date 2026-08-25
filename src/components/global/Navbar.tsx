"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { CalendarDays, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE, whatsappLink } from "@/lib/site";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onDark = !scrolled;

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
      className="fixed inset-x-0 top-0 z-50 px-4 sm:px-6 will-change-transform"
      aria-label="Main navigation"
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-between gap-3 transition-all duration-500",
          scrolled
            ? "mt-3 h-16 max-w-6xl rounded-pill border border-warm-border/50 bg-cream/92 px-4 shadow-[0_4px_32px_rgba(28,15,15,0.12)] backdrop-blur-xl sm:px-5"
            : "h-16 max-w-7xl px-1 sm:h-20"
        )}
      >
        <Link
          href="/"
          aria-label={`${SITE.name} home`}
          className="relative z-10 flex shrink-0 items-center rounded-pill focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          <span
            className={cn(
              "pressable inline-flex shrink-0 items-center justify-center overflow-hidden rounded-pill border transition-all duration-500",
              scrolled
                ? "border-warm-border/70 bg-white/74 p-1 shadow-[0_12px_30px_rgba(53,16,23,0.10)] backdrop-blur-xl"
                : "border-cream/16 bg-brand/52 p-1.5 shadow-[0_10px_28px_rgba(27,14,16,0.22)] backdrop-blur-xl"
            )}
          >
            {/* Same circular logo artwork in both states — white on dark hero, brand-oxblood on light scrolled nav */}
            <span
              className={cn(
                "relative flex items-center justify-center transition-all duration-500",
                scrolled ? "h-11 w-11 sm:h-12 sm:w-12" : "h-12 w-12 sm:h-14 sm:w-14"
              )}
            >
              <Image
                src="/images/witc-logo-white.png"
                alt="Wax In The City logo"
                width={120}
                height={120}
                priority
                sizes="56px"
                className={cn(
                  "h-full w-full object-contain transition-opacity duration-500",
                  scrolled ? "opacity-0" : "opacity-100"
                )}
              />
              <Image
                src="/images/witc-logo-maroon.png"
                alt=""
                aria-hidden
                width={120}
                height={120}
                priority
                sizes="56px"
                className={cn(
                  "absolute inset-0 h-full w-full object-contain transition-opacity duration-500",
                  scrolled ? "opacity-100" : "opacity-0"
                )}
              />
            </span>
          </span>
        </Link>

        <div
          className={cn(
            "absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-pill px-1.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] md:flex",
            onDark ? "border border-cream/14 bg-ink/24 backdrop-blur-xl" : "border border-warm-border/70 bg-white/72 backdrop-blur-2xl"
          )}
        >
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={active}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "nav-link rounded-pill px-3 py-2 text-body-sm font-medium tracking-wide lg:px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  onDark
                    ? "focus-visible:ring-cream/50 focus-visible:ring-offset-ink"
                    : "focus-visible:ring-brand-action/40 focus-visible:ring-offset-cream",
                  active && (onDark ? "bg-cream/12 text-cream" : "bg-brand-mist text-brand-action shadow-[inset_0_0_0_1px_rgba(162,15,55,0.08)]"),
                  !active && (onDark ? "text-cream/82 hover:bg-cream/9 hover:text-cream" : "text-warm/74 hover:bg-brand-mist/70 hover:text-brand-action")
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          {/* BeWAXed: Book Appointment CTAs everywhere — logo-matched maroon with white text in both nav states */}
          <Button
            asChild
            size="sm"
            variant="primary"
            className="hidden bg-[linear-gradient(135deg,var(--color-brand-action),var(--color-brand))] text-white shadow-[0_14px_30px_rgba(162,15,55,0.24)] hover:shadow-[0_20px_48px_rgba(162,15,55,0.30)] sm:inline-flex"
          >
            <Link href="/book">
              <CalendarDays className="h-4 w-4" />
              <span className="hidden lg:inline">Book Appointment</span>
              <span className="lg:hidden">Book</span>
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className={cn(
                  "pressable flex h-11 w-11 items-center justify-center rounded-pill border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:hidden",
                  onDark
                    ? "border-cream/15 bg-cream/8 text-cream backdrop-blur-xl hover:bg-cream/14 focus-visible:ring-cream/50 focus-visible:ring-offset-ink"
                    : "border-warm-border/70 bg-white/70 text-warm backdrop-blur-xl hover:bg-brand-mist focus-visible:ring-brand-action/40 focus-visible:ring-offset-cream"
                )}
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent title="Menu">
              <div className="flex h-full flex-col px-7 pb-8 pt-20">
                <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={pathname === link.href ? "page" : undefined}
                        className="border-b border-warm-border/60 py-4 font-serif text-h3 text-warm transition-colors hover:text-brand-action"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-auto flex flex-col gap-3 pt-8">
                  <SheetClose asChild>
                    <Button asChild size="lg" variant="primary">
                      <Link href="/book">Book Your Visit</Link>
                    </Button>
                  </SheetClose>
                  <Button asChild size="lg" variant="outline">
                    <a
                      href={whatsappLink("Hi! I'd like to ask about a booking.")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
