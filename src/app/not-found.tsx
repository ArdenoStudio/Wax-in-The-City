import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { SITE, whatsappLink } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-cream px-5 py-section-lg text-center lg:px-8">
      <p className="text-caption font-semibold uppercase tracking-[0.18em] text-brand-action">
        404
      </p>
      <h1 className="mt-4 max-w-lg font-sans text-h1 font-semibold tracking-tight text-warm">
        This page isn&apos;t part of the studio.
      </h1>
      <p className="mt-4 max-w-md text-body-lg text-warm-grey">
        The link may be outdated. Head back home, book a visit, or message us on
        WhatsApp — we&apos;ll help you find what you need.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button asChild size="lg" variant="primary">
          <Link href="/">
            Back to home
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/book">
            <CalendarDays className="h-4 w-4" />
            Book your visit
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a
            href={whatsappLink(`Hi! I was looking for something on the ${SITE.shortName} website.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsappIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </Button>
      </div>
    </section>
  );
}
