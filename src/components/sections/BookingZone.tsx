import { WhatsappIcon } from "@/components/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { BookingForm } from "@/components/sections/BookingForm";
import { WhatsAppBranchPicker } from "@/components/sections/WhatsAppBranchPicker";
import { getBranch, type BranchSlug } from "@/lib/site";
import { isSupabaseConfigured } from "@/lib/supabase/client";

interface BookingZoneProps {
  /**
   * 'form' = Supabase-backed request form, 'whatsapp-only' = WhatsApp CTA only.
   * Defaults to 'whatsapp-only' whenever Supabase isn't configured, so the
   * primary booking route never points at a form that's guaranteed to fail.
   */
  mode?: "form" | "whatsapp-only";
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
 * Booking CTA zone (file 08, section 10).
 * The form is the working fallback; WhatsApp stays the fastest confirmed route.
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
              : "mt-3 text-center text-caption leading-relaxed text-warm-grey text-pretty"
          }
        >
          Premium Lycon (Australia) & Rica (Italy) · No double dipping · Aftercare + next-visit note before you leave.
        </p>

        <div
          className="mt-10"
          style={resolvedMode === "whatsapp-only" ? undefined : { minHeight: 480 }}
        >
          {resolvedMode === "whatsapp-only" ? (
            <WhatsappOnly
              standalone={standalone}
              defaultBranch={defaultBranch}
              defaultService={defaultService}
            />
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
          <WhatsAppBranchPicker
            defaultBranch={defaultBranch}
            service={defaultService}
            className={standalone ? "inline-flex min-h-10 items-center font-medium text-brand-light underline-offset-4 hover:underline" : "inline-flex min-h-10 items-center font-medium text-brand-action underline-offset-4 hover:underline"}
          >
            Message us on WhatsApp
          </WhatsAppBranchPicker>
        </p>

        {/* BeWAXed aftercare retention cue — mirrors "Pain & Sensitivity / Aftercare Tips / Next Appointment" */}
        <p
          className={
            standalone
              ? "mt-4 text-center text-caption leading-relaxed text-cream/60 text-pretty"
              : "mt-4 text-center text-caption leading-relaxed text-warm-grey text-pretty"
          }
        >
          Aftercare tips + next appointment guidance included with every visit
        </p>
      </div>
    </section>
  );
}

function WhatsappOnly({
  standalone = true,
  defaultBranch,
  defaultService,
}: {
  standalone?: boolean;
  defaultBranch?: BranchSlug;
  defaultService?: string;
}) {
  const studioNote = defaultBranch
    ? `We'll open WhatsApp for ${getBranch(defaultBranch).name}.`
    : "You'll pick Battaramulla or Nugegoda next so the right studio can confirm.";

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
      <p
        className={
          standalone
            ? "mt-3 max-w-sm text-caption leading-relaxed text-cream/55 text-pretty"
            : "mt-3 max-w-sm text-caption leading-relaxed text-warm-grey text-pretty"
        }
      >
        {studioNote}
      </p>
      <WhatsAppBranchPicker
        defaultBranch={defaultBranch}
        service={defaultService}
        className="mt-6 inline-flex h-12 items-center gap-2 rounded-pill bg-brand-action px-6 font-medium text-cream transition-colors hover:bg-brand-dark"
      >
        <WhatsappIcon className="h-4 w-4" />
        Chat on WhatsApp
      </WhatsAppBranchPicker>
    </div>
  );
}
