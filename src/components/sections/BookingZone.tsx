import Link from "next/link";
import { WhatsappIcon } from "@/components/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { BookingForm } from "@/components/sections/BookingForm";
import { whatsappLink, type BranchSlug } from "@/lib/site";
import { isSupabaseConfigured } from "@/lib/supabase/client";

interface BookingZoneProps {
  /**
   * 'form' = Supabase-backed request form, 'dinaya' = embedded widget (future),
   * 'whatsapp-only' = WhatsApp CTA only. Defaults to 'whatsapp-only' whenever
   * Supabase isn't configured, so the primary booking route never points at a
   * form that's guaranteed to fail.
   */
  mode?: "form" | "dinaya" | "whatsapp-only";
  defaultBranch?: BranchSlug;
  defaultService?: string;
  serviceOptions?: string[];
  heading?: string;
  subtitle?: string;
  /** Adds the top section padding + cream background. False when embedded in a page. */
  standalone?: boolean;
}

/**
 * Booking CTA / Dinaya zone (file 08, section 10).
 * The form is the working fallback; the reserved zone keeps the layout ready
 * for the Dinaya widget (~30 days out) with no reflow.
 */
export function BookingZone({
  mode,
  defaultBranch,
  defaultService,
  serviceOptions,
  heading = "Ready when you are.",
  subtitle = "Send a request and the team will confirm before your visit. For urgent slots, WhatsApp is still the fastest route.",
  standalone = true,
}: BookingZoneProps) {
  const resolvedMode = mode ?? (isSupabaseConfigured() ? "form" : "whatsapp-only");
  const isWhatsappOnly = resolvedMode === "whatsapp-only";

  return (
    <section
      id="book"
      aria-labelledby="booking-heading"
      className={
        standalone
          ? "relative overflow-hidden bg-ink px-5 py-section-lg text-cream lg:px-8"
          : "px-5 lg:px-8"
      }
    >
      {standalone && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(43,7,16,0.96),rgba(23,7,11,0.98)_56%,rgba(18,6,10,1))]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-60" />
        </>
      )}
      <div className={`relative mx-auto ${isWhatsappOnly && standalone ? "max-w-5xl" : "max-w-2xl"}`}>
        <div className="mx-auto mb-8 h-px w-24 hairline-gradient" />

        <SectionHeading
          eyebrow="Book your visit"
          title={heading}
          titleId="booking-heading"
          subtitle={subtitle}
          tone={standalone ? "light" : "dark"}
        />

        <div
          className="mt-12"
          style={
            resolvedMode === "dinaya" || resolvedMode === "form"
              ? { minHeight: 480 }
              : undefined
          }
        >
          {resolvedMode === "dinaya" ? (
            <DinayaPlaceholder />
          ) : isWhatsappOnly ? (
            <WhatsappOnly standalone={standalone} />
          ) : (
            <BookingForm
              defaultBranch={defaultBranch}
              defaultService={defaultService}
              serviceOptions={serviceOptions}
            />
          )}
        </div>

        {!isWhatsappOnly && (
          <p className={standalone ? "mt-6 text-center text-body-sm text-cream/60" : "mt-6 text-center text-body-sm text-warm-grey"}>
            Prefer to chat?{" "}
            <a
              href={whatsappLink("Hi! I'd like to ask about a booking.")}
              target="_blank"
              rel="noopener noreferrer"
              className={standalone ? "inline-flex min-h-10 items-center font-medium text-brand-light underline-offset-4 hover:underline" : "inline-flex min-h-10 items-center font-medium text-brand-action underline-offset-4 hover:underline"}
            >
              Message us on WhatsApp
            </a>
          </p>
        )}
      </div>
    </section>
  );
}

/** Reserved wrapper for the future Dinaya embed. */
function DinayaPlaceholder() {
  return (
    <div className="dinaya-widget-zone flex h-[480px] items-center justify-center border border-dashed border-cream/24 bg-cream/5 text-center">
      <p className="px-6 text-body text-cream/66">
        Online booking is coming soon. For now, please send a request or message us
        on WhatsApp.
      </p>
    </div>
  );
}

function WhatsappOnly({ standalone }: { standalone: boolean }) {
  const wa = whatsappLink("Hi! I'd like to book a visit.");

  if (standalone) {
    return (
      <div className="grid overflow-hidden rounded-card border border-cream/12 lg:grid-cols-[0.92fr_1.08fr]">
        {/* Cult-style oxblood side panel — pearl type only */}
        <div className="relative bg-[linear-gradient(160deg,#2b0710_0%,#17070b_100%)] px-7 py-9 lg:px-9 lg:py-11">
          <p className="text-caption font-semibold uppercase tracking-[0.16em] text-cream/55">
            Ladies only
          </p>
          <p className="mt-4 max-w-sm font-serif text-h3 font-medium leading-snug text-cream">
            A private appointment room, confirmed before you arrive.
          </p>
          <p className="mt-4 max-w-sm text-body-sm text-cream/68">
            WhatsApp is the quickest route. We&apos;ll confirm a time that works
            for you.
          </p>
        </div>

        <div className="flex flex-col items-start justify-center bg-cream/[0.06] px-7 py-9 lg:px-10 lg:py-11">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-pill bg-brand-action px-6 font-medium text-cream transition-colors hover:bg-[#8a0d2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            <WhatsappIcon className="h-4 w-4" />
            Chat on WhatsApp
          </a>
          <p className="mt-2 max-w-xs text-caption leading-relaxed text-cream/58">
            Same-day timing? WhatsApp reaches the studio fastest — we&apos;ll confirm
            what&apos;s still open.
          </p>
          <Link
            href="/book"
            className="mt-3 inline-flex h-12 items-center rounded-pill border border-cream/28 px-6 font-medium text-cream transition-colors hover:bg-cream/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Send a request
          </Link>
          <p className="mt-5 text-body-sm text-cream/62">
            Ladies-only studio — private rooms, every visit.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center border border-warm-border bg-cream p-8 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-brand-mist text-brand-action">
        <WhatsappIcon className="h-7 w-7" />
      </span>
      <p className="mt-5 max-w-sm text-body text-warm-grey">
        The quickest way to book is a quick WhatsApp message. We&apos;ll confirm a
        time that works for you.
      </p>
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center gap-2 rounded-pill bg-brand-action px-6 font-medium text-cream transition-colors hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/45 focus-visible:ring-offset-2"
        >
          <WhatsappIcon className="h-4 w-4" />
          Chat on WhatsApp
        </a>
        <Link
          href="/book"
          className="inline-flex h-12 items-center rounded-pill border border-brand-action/35 px-6 font-medium text-brand-action transition-colors hover:bg-brand-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/45 focus-visible:ring-offset-2"
        >
          Send a request
        </Link>
      </div>
      <p className="mt-3 max-w-sm text-caption leading-relaxed text-warm-grey/90">
        Same-day timing? WhatsApp reaches the studio fastest — we&apos;ll confirm
        what&apos;s still open.
      </p>
      <p className="mt-5 text-body-sm text-warm-grey">
        Ladies-only studio — private rooms, every visit.
      </p>
    </div>
  );
}
