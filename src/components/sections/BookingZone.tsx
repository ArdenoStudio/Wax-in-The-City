import { WhatsappIcon } from "@/components/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { BookingForm } from "@/components/sections/BookingForm";
import { getBranch, whatsappLink, type BranchSlug } from "@/lib/site";
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
  /** Heading tag for the section title — "h1" when this is the page's primary heading. */
  titleAs?: "h1" | "h2";
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
  titleAs = "h2",
}: BookingZoneProps) {
  const resolvedMode = mode ?? (isSupabaseConfigured() ? "form" : "whatsapp-only");
  const whatsappMessage =
    defaultService && defaultBranch
      ? `Hi! I'd like to book ${defaultService} at the ${getBranch(defaultBranch).name} branch`
      : defaultService
        ? `Hi! I'd like to book ${defaultService}`
        : "Hi! I'd like to book a visit.";
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
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-60" />
        </>
      )}
      <div className="relative mx-auto max-w-2xl">
        <div className="mx-auto mb-8 h-px w-24 hairline-gradient" />

        <SectionHeading
          eyebrow="Book your visit"
          title={heading}
          titleAs={titleAs}
          subtitle={subtitle}
          tone={standalone ? "light" : "dark"}
        />

        {/* BeWAXed hygiene proximity — impossible to miss at the point of booking */}
        <div
          className={
            standalone
              ? "mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 rounded-2xl border border-cream/10 bg-cream/[0.06] px-4 py-3 backdrop-blur-sm"
              : "mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 rounded-2xl border border-warm-border/70 bg-white px-4 py-3"
          }
        >
          <span
            className={
              standalone
                ? "inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.14em] text-cream/80"
                : "inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.14em] text-warm-grey"
            }
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold/90" aria-hidden />
            Fresh wax setup
          </span>
          <span className={standalone ? "hidden text-cream/18 sm:inline" : "hidden text-warm-border sm:inline"} aria-hidden>
            ·
          </span>
          <span
            className={
              standalone
                ? "inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.14em] text-cream/80"
                : "inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.14em] text-warm-grey"
            }
          >
            Single-use spatulas
          </span>
          <span className={standalone ? "hidden text-cream/18 sm:inline" : "hidden text-warm-border sm:inline"} aria-hidden>
            ·
          </span>
          <span
            className={
              standalone
                ? "inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.14em] text-cream/80"
                : "inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.14em] text-warm-grey"
            }
          >
            Private rooms
          </span>
        </div>
        <p
          className={
            standalone
              ? "mt-3 text-center text-caption leading-relaxed text-cream/60 text-pretty"
              : "mt-3 text-center text-caption leading-relaxed text-warm-grey/70 text-pretty"
          }
        >
          Premium Lycon (Australia) & Rica (Italy) · No double dipping · Aftercare + next-visit note before you leave.
        </p>

        <div
          className="mt-10"
          // Reserve the Dinaya widget footprint so the swap-in causes no reflow.
          style={resolvedMode === "whatsapp-only" ? undefined : { minHeight: 480 }}
        >
          {resolvedMode === "dinaya" ? (
            <DinayaPlaceholder />
          ) : resolvedMode === "whatsapp-only" ? (
            <WhatsappOnly standalone={standalone} message={whatsappMessage} />
          ) : (
            <BookingForm
              defaultBranch={defaultBranch}
              defaultService={defaultService}
              serviceOptions={serviceOptions}
            />
          )}
        </div>

        <p className={standalone ? "mt-6 text-center text-body-sm text-cream/60 text-pretty" : "mt-6 text-center text-body-sm text-warm-grey text-pretty"}>
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

        {/* BeWAXed aftercare retention cue — mirrors "Pain & Sensitivity / Aftercare Tips / Next Appointment" */}
        <p
          className={
            standalone
              ? "mt-4 text-center text-caption leading-relaxed text-cream/60 text-pretty"
              : "mt-4 text-center text-caption leading-relaxed text-warm-grey/60 text-pretty"
          }
        >
          Aftercare tips + next appointment guidance included with every visit
        </p>
      </div>
    </section>
  );
}

/** Reserved wrapper for the future Dinaya embed. */
function DinayaPlaceholder() {
  return (
    <div className="dinaya-widget-zone flex h-[480px] items-center justify-center border border-dashed border-cream/24 bg-cream/5 text-center">
      <p className="px-6 text-body text-cream/66 text-pretty">
        Online booking is coming soon. For now, please send a request or message us
        on WhatsApp.
      </p>
    </div>
  );
}

function WhatsappOnly({
  standalone = true,
  message = "Hi! I'd like to book a visit.",
}: {
  standalone?: boolean;
  message?: string;
}) {
  return (
    <div
      className={
        standalone
          ? "flex flex-col items-center rounded-2xl border border-cream/12 bg-cream/5 p-8 text-center backdrop-blur-sm"
          : "flex flex-col items-center rounded-2xl border border-warm-border bg-white p-8 text-center"
      }
    >
      <span
        className={
          standalone
            ? "flex h-14 w-14 items-center justify-center rounded-pill bg-cream/10 text-brand-light"
            : "flex h-14 w-14 items-center justify-center rounded-pill bg-brand-action/10 text-brand-action"
        }
      >
        <WhatsappIcon className="h-7 w-7" />
      </span>
      <p className={standalone ? "mt-5 max-w-sm text-body text-cream/66 text-pretty" : "mt-5 max-w-sm text-body text-warm-grey text-pretty"}>
        The quickest way to book is a WhatsApp message. We&apos;ll confirm a
        time that works for you.
      </p>
      <a
        href={whatsappLink(message)}
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
