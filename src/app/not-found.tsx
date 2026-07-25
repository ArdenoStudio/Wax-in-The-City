import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { SITE, whatsappLink } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-cream px-5 py-section-lg text-center lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(162,15,55,0.18),transparent_42%),radial-gradient(circle_at_18%_80%,rgba(252,229,236,0.55),transparent_40%),radial-gradient(circle_at_88%_70%,rgba(43,7,16,0.08),transparent_36%)]"
      />
      <div className="relative z-10">
        <p className="font-display text-[clamp(1.85rem,5.5vw,2.75rem)] font-semibold leading-none tracking-[0.01em] text-brand">
          {SITE.shortName}
        </p>
        <p className="mt-5 text-caption font-semibold uppercase tracking-[0.18em] text-brand-action">
          404
        </p>
        <h1 className="mt-4 max-w-lg font-display text-h1 font-medium text-warm">
          This page isn&apos;t part of the studio.
        </h1>
        <p className="mt-4 max-w-md text-body-lg text-warm-grey">
          The link may be outdated. Head back home, book a visit, or message us on
          WhatsApp — we&apos;ll help you find what you need.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <Button asChild size="lg" variant="primary">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/book">
              <CalendarDays className="h-4 w-4" />
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
              <WhatsappIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>
        </div>
        <nav
          aria-label="Helpful links"
          className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-body-sm font-medium text-brand-action"
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
        </nav>
      </div>
    </section>
  );
}
