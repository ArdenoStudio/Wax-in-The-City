"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
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
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-cream/92 shadow-nav backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-5 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          aria-label={`${SITE.name} home`}
          className="relative z-10 flex items-center"
        >
          <span
            className={cn(
              "relative flex items-center justify-center rounded-pill transition-all duration-300",
              // White logo art: shown directly over the dark hero, on a maroon
              // chip once the nav turns cream so it stays legible.
              scrolled
                ? "h-11 w-11 bg-brand p-1.5 shadow-card sm:h-12 sm:w-12"
                : "h-10 w-10 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)] sm:h-12 sm:w-12"
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
        </Link>

        {/* Desktop links (centre) */}
        <div
          className={cn(
            "absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-pill px-2 py-1 lg:flex",
            onDark ? "border border-cream/12 bg-ink/22 backdrop-blur-md" : "border border-warm-border/70 bg-white/70"
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
                  "rounded-pill px-4 py-2 text-body-sm font-medium tracking-wide transition-colors",
                  onDark ? "text-cream/90 hover:text-cream" : "text-warm hover:text-brand-action"
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
            <Link href="/book">Book Your Visit</Link>
          </Button>

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-pill transition-colors lg:hidden",
                  onDark ? "text-cream hover:bg-cream/10" : "text-warm hover:bg-brand-mist"
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
