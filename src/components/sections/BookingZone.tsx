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
  return (
    <section
      id="book"
      className={
        standalone
          ? "relative overflow-hidden bg-ink px-5 py-section-lg text-cream lg:px-8"
          : "px-5 lg:px-8"
      }
    >
      {standalone && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(53,16,23,0.84),rgba(21,16,17,0.98)_56%,rgba(19,9,13,1))]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-60" />
        </>
      )}
      <div className="relative mx-auto max-w-2xl">
        <div className="mx-auto mb-8 h-px w-24 hairline-gradient" />

        <SectionHeading
          eyebrow="Book your visit"
          title={heading}
          subtitle={subtitle}
          tone={standalone ? "light" : "dark"}
        />

        <div
          className="mt-12"
          // Reserve the Dinaya widget footprint so the swap-in causes no reflow.
          style={{ minHeight: 480 }}
        >
          {resolvedMode === "dinaya" ? (
            <DinayaPlaceholder />
          ) : resolvedMode === "whatsapp-only" ? (
            <WhatsappOnly />
          ) : (
            <BookingForm
              defaultBranch={defaultBranch}
              defaultService={defaultService}
              serviceOptions={serviceOptions}
            />
          )}
        </div>

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

function WhatsappOnly() {
  return (
    <div className="flex flex-col items-center border border-cream/12 bg-cream/5 p-8 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-cream/10 text-brand-light">
        <WhatsappIcon className="h-7 w-7" />
      </span>
      <p className="mt-5 max-w-sm text-body text-cream/66">
        The quickest way to book is a quick WhatsApp message. We&apos;ll confirm a
        time that works for you.
      </p>
      <a
        href={whatsappLink("Hi! I'd like to book a visit.")}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex h-12 items-center gap-2 rounded-pill bg-brand-action px-6 font-medium text-cream transition-colors hover:bg-brand-dark"
      >
        <WhatsappIcon className="h-4 w-4" />
        Chat on WhatsApp
      </a>
    </div>
  );
}
