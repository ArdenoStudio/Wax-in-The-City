import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";

export const CARE_JOURNEY_STEPS = [
  {
    title: "Arrive",
    body: "Check in calmly — the room is prepared for your service, not a walk-in queue.",
  },
  {
    title: "Prep",
    body: "Skin and timing are checked so the treatment can stay careful and unhurried.",
  },
  {
    title: "Care",
    body: "The session stays private and skin-aware, especially for first-timers or intimate waxing.",
  },
  {
    title: "After-care",
    body: "You leave with simple guidance for your skin instead of vague salon advice.",
  },
] as const;

interface CareJourneyProps {
  className?: string;
  /** Extra note under the subtitle (e.g. confirmation timing). */
  note?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

/** Reusable Arrive → Prep → Care → After-care sequence — wine timeline, less glitter. */
export function CareJourney({
  className,
  note = "Most requests are reviewed the same day when possible; allow up to about a day for confirmation if the diary is full.",
  eyebrow = "Care journey",
  title = "Arrive → Prep → Care → After-care.",
  subtitle = "A quiet sequence so the visit feels predictable without feeling theatrical.",
}: CareJourneyProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-cream-alt px-5 py-section-lg lg:px-8",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-35" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          align="left"
          eyebrow={eyebrow}
          showEyebrow={false}
          title={title}
          subtitle={subtitle}
        />
        {note && (
          <p className="mt-4 max-w-xl font-sans text-body-sm leading-relaxed text-warm-grey">
            {note}
          </p>
        )}

        <ol className="relative mt-12 space-y-0 sm:mt-14">
          <div
            aria-hidden
            className="absolute bottom-3 left-[0.55rem] top-3 w-px bg-[linear-gradient(180deg,rgba(162,15,55,0.45),rgba(162,15,55,0.18),rgba(162,15,55,0.08))]"
          />
          {CARE_JOURNEY_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="relative flex gap-5 pb-11 last:pb-0 sm:gap-6 sm:pb-12"
            >
              <span className="relative z-10 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-action/35 bg-cream-alt">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-action" />
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="font-sans text-caption font-semibold uppercase tracking-[0.12em] text-brand-action/65">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1.5 font-display text-h3 font-semibold tracking-[-0.02em] text-warm">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xl font-sans text-body-sm leading-relaxed text-warm-grey">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
