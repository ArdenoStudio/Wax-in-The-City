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

/**
 * Transparent over the hero (cream text), then cream background + shadow on
 * scroll (file 10, section 2). All pages open with a dark hero, so transparent
 * cream text is always legible at the top.
 */
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
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-cream/78 shadow-nav backdrop-blur-2xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-5 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          aria-label={`${SITE.name} home`}
          className="relative z-10 flex items-center gap-3"
        >
          <span
            className={cn(
              "relative flex items-center justify-center rounded-pill transition-all duration-300",
              // White logo art: shown directly over the dark hero, on a maroon
              // chip once the nav turns cream so it stays legible.
              scrolled
                ? "h-11 w-11 bg-brand p-1.5 shadow-[0_14px_34px_rgba(53,16,23,0.24)] sm:h-12 sm:w-12"
                : "h-10 w-10 drop-shadow-[0_10px_28px_rgba(0,0,0,0.36)] sm:h-12 sm:w-12"
            )}
          >
            <Image
              src="/images/witc-logo.png"
              alt={SITE.name}
              fill
              sizes="48px"
              priority
              className="object-contain p-0.5"
            />
          </span>
          <span className="hidden leading-none sm:block">
            <span
              className={cn(
                "block font-serif text-h4 font-medium transition-colors",
                onDark ? "text-cream" : "text-warm"
              )}
            >
              {SITE.shortName}
            </span>
            <span
              className={cn(
                "mt-1 block text-[0.64rem] font-semibold uppercase tracking-[0.16em] transition-colors",
                onDark ? "text-cream/54" : "text-warm-grey"
              )}
            >
              Private studio
            </span>
          </span>
        </Link>

        {/* Desktop links (centre) */}
        <div
          className={cn(
            "absolute left-1/2 hidden -translate-x-1/2 items-center gap-1.5 rounded-pill px-1.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] lg:flex",
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
                className={cn(
                  "rounded-pill px-4 py-2 text-body-sm font-medium tracking-wide transition-all duration-300",
                  active && (onDark ? "bg-cream/12 text-cream" : "bg-brand-mist text-brand-action"),
                  !active && (onDark ? "text-cream/82 hover:bg-cream/9 hover:text-cream" : "text-warm/74 hover:bg-brand-mist/70 hover:text-brand-action")
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right: Book CTA + mobile hamburger */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
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

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-pill border transition-all duration-300 lg:hidden",
                  onDark ? "border-cream/15 bg-cream/8 text-cream backdrop-blur-xl hover:bg-cream/14" : "border-warm-border/70 bg-white/70 text-warm backdrop-blur-xl hover:bg-brand-mist"
                )}
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent title="Menu">
              <div className="flex h-full flex-col px-7 pb-8 pt-20">
                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
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
