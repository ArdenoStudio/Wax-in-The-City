import { WhatsappIcon } from "@/components/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { BookingForm } from "@/components/sections/BookingForm";
import { whatsappLink, type BranchSlug } from "@/lib/site";

interface BookingZoneProps {
  /** 'form' = Supabase fallback (current), 'dinaya' = embedded widget (future). */
  mode?: "form" | "dinaya" | "whatsapp-only";
  defaultBranch?: BranchSlug;
  defaultService?: string;
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
  mode = "form",
  defaultBranch,
  defaultService,
  heading = "Ready when you are.",
  subtitle = "Send a request and we'll confirm within 24 hours — or reach us instantly on WhatsApp.",
  standalone = true,
}: BookingZoneProps) {
  return (
    <section
      id="book"
      className={standalone ? "bg-cream px-5 py-section-lg lg:px-8" : "px-5 lg:px-8"}
    >
      <div className="mx-auto max-w-2xl">
        {/* Maroon accent line at top (file 08) */}
        <div className="mx-auto mb-8 h-0.5 w-16 rounded-pill bg-brand-action" />

        <SectionHeading eyebrow="Book your visit" title={heading} subtitle={subtitle} />

        <div
          className="mt-12"
          // Reserve the Dinaya widget footprint so the swap-in causes no reflow.
          style={{ minHeight: 480 }}
        >
          {mode === "dinaya" ? (
            <DinayaPlaceholder />
          ) : mode === "whatsapp-only" ? (
            <WhatsappOnly />
          ) : (
            <BookingForm defaultBranch={defaultBranch} defaultService={defaultService} />
          )}
        </div>

        <p className="mt-6 text-center text-body-sm text-warm-grey">
          Prefer to chat?{" "}
          <a
            href={whatsappLink("Hi! I'd like to ask about a booking.")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-action underline-offset-4 hover:underline"
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
    <div className="dinaya-widget-zone flex h-[480px] items-center justify-center rounded-card-lg border border-dashed border-warm-border bg-cream-alt text-center">
      <p className="px-6 text-body text-warm-grey">
        Online booking is coming soon. For now, please send a request or message us
        on WhatsApp.
      </p>
    </div>
  );
}

function WhatsappOnly() {
  return (
    <div className="flex flex-col items-center rounded-card-lg border border-warm-border bg-white p-8 text-center shadow-card">
      <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-brand-mist text-brand-action">
        <WhatsappIcon className="h-7 w-7" />
      </span>
      <p className="mt-5 max-w-sm text-body text-warm-grey">
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
