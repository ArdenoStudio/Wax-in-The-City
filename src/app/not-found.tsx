import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { SITE, whatsappLink } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[72vh] flex-col items-center justify-center overflow-hidden bg-cream px-5 py-section-lg text-center lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(162,15,55,0.16),transparent_42%),radial-gradient(circle_at_14%_82%,rgba(252,229,236,0.55),transparent_40%),radial-gradient(circle_at_90%_68%,rgba(43,7,16,0.07),transparent_36%)]"
      />
      <div className="relative z-10 max-w-lg">
        <p className="text-balance font-display text-[clamp(1.9rem,5.8vw,2.85rem)] font-semibold leading-[0.96] tracking-tight-display text-brand">
          {SITE.shortName}
        </p>
        <p className="mt-5 font-sans text-caption font-semibold uppercase tracking-[0.1em] text-brand-action">
          404
        </p>
        <h1 className="text-balance mt-3 font-display text-h1 font-semibold tracking-tight-display text-warm">
          This page isn&apos;t part of the studio.
        </h1>
        <p className="font-sans mt-4 text-pretty text-body-lg text-warm-grey">
          The link may be outdated. Head home, book a visit, or message us on
          WhatsApp — we&apos;ll help you find what you need.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <Button asChild size="lg" variant="primary">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/book">
              <CalendarDays className="h-4 w-4 shrink-0" />
              Book your visit
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a
              href={whatsappLink(
                `Hi! I was looking for something on the ${SITE.shortName} website.`
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappIcon className="h-4 w-4 shrink-0" />
              WhatsApp
            </a>
          </Button>
        </div>
        <nav
          aria-label="Helpful links"
          className="text-pretty font-sans mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-body-sm font-semibold text-brand-action"
        >
          <Link href="/services" className="underline-offset-4 hover:underline">
            Services
          </Link>
          <Link href="/locations" className="underline-offset-4 hover:underline">
            Locations
          </Link>
          <Link href="/faq" className="underline-offset-4 hover:underline">
            FAQ
          </Link>
          <Link href="/contact" className="underline-offset-4 hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </section>
  );
}
