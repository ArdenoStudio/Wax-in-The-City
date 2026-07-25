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

/** Reusable Arrive → Prep → Care → After-care sequence (wine/gold timeline). */
export function CareJourney({
  className,
  note = "Most requests are reviewed the same day when possible; allow up to about a day for confirmation if the diary is full.",
  eyebrow = "Care journey",
  title = "Arrive → Prep → Care → After-care.",
  subtitle = "A quiet sequence — muted wine and gold — so the visit feels predictable without feeling theatrical.",
}: CareJourneyProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-cream-alt px-5 py-section-lg lg:px-8",
        className
      )}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          align="left"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />
        {note && (
          <p className="mt-5 max-w-xl text-body-sm leading-relaxed text-warm-grey">
            {note}
          </p>
        )}

        <ol className="relative mt-14 space-y-0 sm:mt-16">
          <div
            aria-hidden
            className="absolute bottom-4 left-[0.55rem] top-4 w-px bg-[linear-gradient(180deg,rgba(217,179,95,0.55),rgba(162,15,55,0.35),rgba(217,179,95,0.2))]"
          />
          {CARE_JOURNEY_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="relative flex gap-5 pb-12 last:pb-0 sm:gap-6 sm:pb-14"
            >
              <span className="relative z-10 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#d9b35f]/70 bg-cream">
                <span className="h-2 w-2 rounded-full bg-brand-action/80" />
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="text-caption font-semibold uppercase tracking-[0.14em] text-brand-action/70">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1.5 font-serif text-h3 text-warm">{step.title}</h3>
                <p className="mt-2.5 max-w-xl text-body-sm leading-relaxed text-warm-grey">
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
