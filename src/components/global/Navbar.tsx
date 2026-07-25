"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { CalendarDays, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE, whatsappLink } from "@/lib/site";
import { WhatsappIcon } from "@/components/icons";
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

  useEffect(() => {
    // Close mobile sheet when the route changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  const onDark = !scrolled;

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
      className="fixed inset-x-0 top-0 z-50 px-4 sm:px-6"
      aria-label="Main navigation"
    >
      <div
        className={cn(
          "ease-[var(--ease-apple)] mx-auto flex items-center justify-between gap-3 transition-all duration-300",
          scrolled
            ? "mt-4 h-16 max-w-6xl rounded-pill border border-warm-border/80 bg-cream/95 px-4 shadow-card backdrop-blur-2xl sm:px-6"
            : "h-16 max-w-7xl px-1 sm:h-20"
        )}
      >
        <Link
          href="/"
          aria-label={`${SITE.name} home`}
          className="relative z-10 flex min-w-0 items-center"
        >
          <span
            className={cn(
              "pressable inline-flex min-h-11 shrink-0 items-center rounded-pill border px-3.5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] sm:px-4",
              scrolled
                ? "border-warm-border/80 bg-white/92 shadow-card backdrop-blur-2xl"
                : "border-cream/24 bg-brand/52 shadow-card backdrop-blur-2xl"
            )}
          >
            <span
              className={cn(
                "ease-[var(--ease-apple)] font-display text-[1.2rem] font-semibold leading-[0.96] tracking-[-0.01em] transition-colors duration-300 sm:text-[1.35rem] lg:tracking-[-0.01em]",
                onDark ? "text-cream" : "text-brand"
              )}
            >
              Wax
            </span>
            <span
              className={cn(
                "ease-[var(--ease-apple)] ml-2 text-[0.6rem] font-semibold uppercase leading-none tracking-[0.1em] transition-colors duration-300 sm:text-[0.6rem] lg:tracking-[0.22em]",
                onDark ? "text-brand-light/90" : "text-brand-action/85"
              )}
            >
              In The City
            </span>
          </span>
        </Link>

        <div
          className={cn(
            "absolute left-1/2 hidden -translate-x-1/2 items-center gap-1.5 rounded-pill px-1.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] md:flex",
            onDark ? "border border-cream/24 bg-ink/24 backdrop-blur-2xl" : "border border-warm-border/80 bg-white/72 backdrop-blur-2xl"
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
                  "font-sans text-pretty nav-link rounded-pill px-3.5 py-2 text-body-sm font-semibold tracking-[0.04em] lg:px-4",
                  active && (onDark ? "bg-cream/16 text-cream" : "bg-brand-mist text-brand-action shadow-[inset_0_0_0_1px_rgba(162,15,55,0.08)]"),
                  !active && (onDark ? "text-cream hover:bg-cream/12 hover:text-cream" : "text-warm/82 hover:bg-brand-mist/70 hover:text-brand-action")
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          {!scrolled && (
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="hidden sm:inline-flex"
            >
              <a
                href={whatsappLink("Hi! I'd like to ask about a booking.")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <WhatsappIcon className="h-4 w-4 shrink-0" />
              </a>
            </Button>
          )}
          <Button
            asChild
            size="icon"
            variant={onDark ? "ghost" : "primary"}
            className="sm:hidden"
          >
            <Link href="/book" aria-label="Book your visit">
              <CalendarDays className="h-4 w-4 shrink-0" />
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant={onDark ? "ghost" : "primary"}
            className="hidden sm:inline-flex"
          >
            <Link href="/book">
              <CalendarDays className="h-4 w-4 shrink-0" />
              Book
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={open}
                className={cn(
                  "pressable flex h-11 w-11 items-center justify-center rounded-pill px-5 border md:hidden",
                  onDark ? "border-cream/24 bg-cream/16 text-cream backdrop-blur-2xl hover:bg-cream/14" : "border-warm-border/80 bg-white/78 text-warm backdrop-blur-2xl hover:bg-brand-mist/90"
                )}
              >
                <Menu className="h-6 w-6 shrink-0" />
              </button>
            </SheetTrigger>
            <SheetContent title="Menu">
              <div className="flex h-full flex-col px-7 pb-8 pt-20">
                <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                  <SheetClose asChild>
                    <Link
                      href="/"
                      aria-current={pathname === "/" ? "page" : undefined}
                      className="ease-[var(--ease-apple)] text-balance border-b border-warm-border/75 py-5 font-display font-semibold tracking-[-0.028em] text-h3 text-warm transition-colors duration-300 hover:text-brand-action"
                    >
                      Home
                    </Link>
                  </SheetClose>
                  {NAV_LINKS.map((link) => {
                    const active =
                      pathname === link.href || pathname.startsWith(link.href + "/");
                    return (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                          className="ease-[var(--ease-apple)] text-balance border-b border-warm-border/75 py-5 font-display font-semibold tracking-[-0.028em] text-h3 text-warm transition-colors duration-300 hover:text-brand-action"
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
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
