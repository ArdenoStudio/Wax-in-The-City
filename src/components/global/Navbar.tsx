"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE, showAdminNav, whatsappLink } from "@/lib/site";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/icons";

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
  const onHomeHero = pathname === "/" && !scrolled;

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 sm:px-6" aria-label="Main navigation">
      <div
        className={cn(
          "mx-auto flex items-center justify-between gap-3 transition-all duration-300",
          scrolled
            ? "mt-3 h-16 max-w-6xl rounded-pill border border-warm-border bg-cream/95 px-4 shadow-nav sm:px-5"
            : "h-16 max-w-7xl px-1 sm:h-20"
        )}
      >
        <Link href="/" aria-label={`${SITE.name} home`} className="flex min-w-0 items-center">
          <span
            className={cn(
              "inline-flex min-h-11 items-center rounded-pill border px-3.5 py-2 sm:px-4",
              scrolled
                ? "border-warm-border bg-cream"
                : "border-cream/20 bg-brand/60"
            )}
          >
            <span
              className={cn(
                "font-sans text-[1.25rem] font-semibold tracking-tight leading-none sm:text-[1.35rem]",
                onDark ? "text-cream" : "text-brand"
              )}
            >
              Wax
            </span>
            <span
              className={cn(
                "type-label ml-2 !text-[0.56rem] sm:!text-[0.6rem]",
                onDark ? "text-brand-light" : "text-brand-action"
              )}
            >
              In The City
            </span>
          </span>
        </Link>

        <div
          className={cn(
            "absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-pill px-1.5 py-1.5 md:flex",
            onDark ? "border border-cream/14 bg-brand/40" : "border border-warm-border bg-cream"
          )}
        >
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "nav-link rounded-pill px-3 py-2 text-small font-medium lg:px-4",
                  active && (onDark ? "bg-cream/12 text-cream" : "bg-cream-alt text-brand-action"),
                  !active && (onDark ? "text-cream/85 hover:text-cream" : "text-warm-grey hover:text-brand-action")
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            asChild
            size="sm"
            variant={onHomeHero ? "inverted" : "primary"}
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
                aria-label="Open menu"
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-pill border md:hidden",
                  onDark ? "border-cream/20 text-cream" : "border-warm-border text-warm"
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
                        className="border-b border-warm-border py-4 type-subtitle text-warm hover:text-brand-action"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-3 pt-8">
                  <SheetClose asChild>
                    <Button asChild size="lg" variant="primary">
                      <Link href="/book">Send booking request</Link>
                    </Button>
                  </SheetClose>
                  <Button asChild size="lg" variant="outline">
                    <a
                      href={whatsappLink("Hi! I'd like to ask about a booking.")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsappIcon className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>
                  {showAdminNav() && (
                    <SheetClose asChild>
                      <Button asChild size="lg" variant="outline">
                        <Link href="/admin">Admin</Link>
                      </Button>
                    </SheetClose>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
