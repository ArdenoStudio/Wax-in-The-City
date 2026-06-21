import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";
import { BRANCHES, whatsappLink } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

/** Act IV — location strip + book/WhatsApp, no embedded form. */
export function LocationStrip() {
  const open = BRANCHES.find((b) => b.status === "open");
  const soon = BRANCHES.find((b) => b.status === "coming-soon");

  return (
    <section className="band-wine px-5 py-section-lg lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          voice="serif"
          tone="light"
          align="left"
          title="Your doorstep."
          subtitle="Book Battaramulla now. We will share Nugegoda opening details when the studio is ready."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {open && (
            <div className="surface-on-wine p-6 text-cream sm:p-7">
              <p className="type-label text-brand-light">Open now</p>
              <h3 className="type-title-serif mt-2">{open.name}</h3>
              <p className="mt-2 text-body text-cream/72">{open.address}</p>
              <p className="mt-4 flex items-center gap-2 text-small text-cream/70">
                <MapPin className="h-4 w-4 shrink-0" />
                {open.hours.weekday}
              </p>
              <div className="mt-8 flex flex-col gap-2 sm:flex-row">
                <Button asChild size="md" variant="inverted">
                  <Link href="/book">
                    <CalendarDays className="h-4 w-4" />
                    Send request
                  </Link>
                </Button>
                <Button asChild size="md" variant="ghost">
                  <a
                    href={whatsappLink(`Hi! I'd like to book at ${open.name}.`, open.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsappIcon className="h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          )}

          {soon && (
            <div className="border border-cream/14 bg-cream/5 p-6 text-cream sm:p-7">
              <p className="type-label text-brand-light">Opening soon</p>
              <h3 className="type-title-serif mt-2">{soon.name}</h3>
              <p className="mt-2 text-body text-cream/72">{soon.blurb}</p>
              <Button asChild size="md" variant="ghost" className="mt-8">
                <Link href="/contact">Get opening updates</Link>
              </Button>
            </div>
          )}
        </div>

        <p className="mt-8 text-small text-cream/60">
          <Link href="/locations" className="text-brand-light underline-offset-4 hover:underline">
            Compare both studios
          </Link>
        </p>
      </div>
    </section>
  );
}
