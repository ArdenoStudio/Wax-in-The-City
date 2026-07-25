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
 * Booking CTA / Dinaya zone.
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
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(43,7,16,0.97),rgba(23,7,11,0.99)_58%,rgba(18,6,10,1))]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-45" />
        </>
      )}
      <div className={`relative mx-auto ${isWhatsappOnly && standalone ? "max-w-5xl" : "max-w-2xl"}`}>
        <SectionHeading
          eyebrow="Book your visit"
          showEyebrow={false}
          title={heading}
          titleId="booking-heading"
          subtitle={subtitle}
          tone={standalone ? "light" : "dark"}
        />

        <div
          className="mt-11"
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
          <p
            className={
              standalone
                ? "mt-6 text-center font-sans text-body-sm text-cream/58"
                : "mt-6 text-center font-sans text-body-sm text-warm-grey"
            }
          >
            Prefer to chat?{" "}
            <a
              href={whatsappLink("Hi! I'd like to ask about a booking.")}
              target="_blank"
              rel="noopener noreferrer"
              className={
                standalone
                  ? "inline-flex min-h-10 items-center font-medium text-brand-light underline-offset-4 hover:underline"
                  : "inline-flex min-h-10 items-center font-medium text-brand-action underline-offset-4 hover:underline"
              }
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
    <div className="dinaya-widget-zone flex h-[480px] items-center justify-center rounded-card-lg border border-dashed border-cream/20 bg-cream/[0.04] text-center">
      <p className="px-6 font-sans text-body text-cream/64">
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
      <div className="grid overflow-hidden rounded-card-lg border border-cream/10 lg:grid-cols-[0.92fr_1.08fr]">
        {/* Cult-style oxblood side panel — pearl type only */}
        <div className="relative bg-[linear-gradient(165deg,#2b0710_0%,#17070b_100%)] px-7 py-9 lg:px-9 lg:py-11">
          <p className="font-sans text-caption font-semibold uppercase tracking-[0.14em] text-cream/50">
            Ladies only
          </p>
          <p className="mt-4 max-w-sm font-display text-h3 font-semibold leading-snug tracking-[-0.02em] text-cream">
            A private appointment room, confirmed before you arrive.
          </p>
          <p className="mt-4 max-w-sm font-sans text-body-sm leading-relaxed text-cream/64">
            WhatsApp is the quickest route. We&apos;ll confirm a time that works
            for you.
          </p>
        </div>

        <div className="flex flex-col items-start justify-center bg-cream/[0.05] px-7 py-9 lg:px-10 lg:py-11">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-pill bg-brand-action px-6 font-sans font-medium text-cream transition-colors hover:bg-[#8a0d2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            <WhatsappIcon className="h-4 w-4" />
            Chat on WhatsApp
          </a>
          <p className="mt-2.5 max-w-xs font-sans text-caption leading-relaxed text-cream/55">
            Same-day timing? WhatsApp reaches the studio fastest — we&apos;ll confirm
            what&apos;s still open.
          </p>
          <Link
            href="/book"
            className="mt-4 inline-flex h-12 items-center rounded-pill border border-cream/24 px-6 font-sans font-medium text-cream transition-colors hover:bg-cream/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Send a request
          </Link>
          <p className="mt-5 font-sans text-body-sm text-cream/58">
            Ladies-only studio — private rooms, every visit.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center rounded-card-lg border border-warm-border/80 bg-cream p-8 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-card border border-brand-action/15 bg-brand-mist text-brand-action">
        <WhatsappIcon className="h-6 w-6" />
      </span>
      <p className="mt-5 max-w-sm font-sans text-body text-warm-grey">
        The quickest way to book is a quick WhatsApp message. We&apos;ll confirm a
        time that works for you.
      </p>
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center gap-2 rounded-pill bg-brand-action px-6 font-sans font-medium text-cream transition-colors hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40 focus-visible:ring-offset-2"
        >
          <WhatsappIcon className="h-4 w-4" />
          Chat on WhatsApp
        </a>
        <Link
          href="/book"
          className="inline-flex h-12 items-center rounded-pill border border-brand-action/30 px-6 font-sans font-medium text-brand-action transition-colors hover:bg-brand-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40 focus-visible:ring-offset-2"
        >
          Send a request
        </Link>
      </div>
      <p className="mt-3 max-w-sm font-sans text-caption leading-relaxed text-warm-grey/90">
        Same-day timing? WhatsApp reaches the studio fastest — we&apos;ll confirm
        what&apos;s still open.
      </p>
      <p className="mt-5 font-sans text-body-sm text-warm-grey">
        Ladies-only studio — private rooms, every visit.
      </p>
    </div>
  );
}
