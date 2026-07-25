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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  const onDark = !scrolled;

  return (
    <motion.nav
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
      className="fixed inset-x-0 top-0 z-50 px-4 sm:px-6"
      aria-label="Main navigation"
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-between gap-3 transition-all duration-500",
          scrolled
            ? "mt-3 h-14 max-w-6xl rounded-pill border border-warm-border/80 bg-cream/94 px-4 shadow-nav backdrop-blur-xl sm:h-16 sm:px-5"
            : "h-16 max-w-7xl px-1 sm:h-[4.5rem]"
        )}
      >
        <Link
          href="/"
          aria-label={`${SITE.name} home`}
          className="relative z-10 flex min-w-0 items-center"
        >
          <span
            className={cn(
              "pressable inline-flex min-h-10 items-center rounded-pill border px-3.5 py-2 sm:min-h-11 sm:px-4",
              scrolled
                ? "border-warm-border/70 bg-white/80"
                : "border-cream/14 bg-brand/55 backdrop-blur-xl"
            )}
          >
            <span
              className={cn(
                "font-display text-[1.05rem] font-semibold tracking-[-0.03em] sm:text-[1.2rem]",
                onDark ? "text-cream" : "text-brand"
              )}
            >
              {SITE.shortName}
            </span>
          </span>
        </Link>

        <div
          className={cn(
            "absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-pill px-1.5 py-1 md:flex",
            onDark
              ? "border border-cream/12 bg-ink/30 backdrop-blur-xl"
              : "border border-warm-border/70 bg-white/80 backdrop-blur-xl"
          )}
        >
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={active}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "nav-link rounded-pill px-3 py-2 font-sans text-body-sm font-medium lg:px-3.5",
                  active &&
                    (onDark
                      ? "bg-cream/12 text-cream"
                      : "bg-brand-mist text-brand-action"),
                  !active &&
                    (onDark
                      ? "text-cream/80 hover:bg-cream/8 hover:text-cream"
                      : "text-warm/70 hover:bg-brand-mist/70 hover:text-brand-action")
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {!scrolled && (
            <Button asChild size="icon" variant="ghost" className="hidden sm:inline-flex">
              <a
                href={whatsappLink("Hi! I'd like to ask about a booking.")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <WhatsappIcon className="h-4 w-4" />
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
              <CalendarDays className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant={onDark ? "ghost" : "primary"}
            className="hidden sm:inline-flex"
          >
            <Link href="/book">
              <CalendarDays className="h-4 w-4" />
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
                  "pressable flex h-11 w-11 items-center justify-center rounded-pill border md:hidden",
                  onDark
                    ? "border-cream/15 bg-cream/8 text-cream backdrop-blur-xl hover:bg-cream/14"
                    : "border-warm-border/70 bg-white/70 text-warm hover:bg-brand-mist"
                )}
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent title="Menu">
              <div className="flex h-full flex-col px-7 pb-8 pt-20">
                <p className="mb-6 font-display text-h3 font-semibold tracking-[-0.02em] text-brand">
                  {SITE.shortName}
                </p>
                <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                  <SheetClose asChild>
                    <Link
                      href="/"
                      aria-current={pathname === "/" ? "page" : undefined}
                      className="border-b border-warm-border/60 py-4 font-display text-h3 font-semibold tracking-[-0.02em] text-warm transition-colors hover:text-brand-action"
                    >
                      Home
                    </Link>
                  </SheetClose>
                  {NAV_LINKS.map((link) => {
                    const active =
                      pathname === link.href ||
                      pathname.startsWith(link.href + "/");
                    return (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                          className="border-b border-warm-border/60 py-4 font-display text-h3 font-semibold tracking-[-0.02em] text-warm transition-colors hover:text-brand-action"
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
