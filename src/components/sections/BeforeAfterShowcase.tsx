import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";

const PROOF_POINTS = [
  "Private room and prep before treatment starts",
  "Clear after-care guidance before you leave",
] as const;

export function BeforeAfterShowcase() {
  return (
    <section className="relative overflow-hidden bg-brand px-5 py-section-lg text-cream lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(255,214,222,0.12),transparent_32%),linear-gradient(145deg,rgba(43,7,16,1),rgba(23,7,11,1)_64%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-55" />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-14">
        <div>
          <p className="font-sans text-caption leading-snug font-semibold uppercase tracking-[0.1em] text-brand-light/90">
            Before and after
          </p>
          <h2 className="text-balance mt-5 max-w-[36rem] font-display text-h1 font-semibold leading-[1.1] tracking-[-0.032em] text-cream sm:text-[clamp(2.5rem,5vw,3.5rem)] sm:leading-[0.98]">
            From unsure to looked after.
          </h2>
          <p className="tracking-[-0.011em] text-pretty mt-5 max-w-[36rem] font-sans text-body-lg text-cream">
            The comparison stays honest for now: it shows the appointment shift
            from questions and prep to clear after-care, without pretending that
            stock photos are client results.
          </p>

          <ul className="mt-8 grid gap-3">
            {PROOF_POINTS.map((point) => (
              <li
                key={point}
                className="tracking-[-0.011em] text-pretty flex gap-3.5 py-1 font-sans text-body-sm leading-[1.7] text-cream"
              >
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-sage" strokeWidth={1.75} />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/services/waxing"
            className="tracking-[-0.011em] ease-[var(--ease-apple)] text-pretty mt-8 inline-flex items-center gap-2 rounded-pill bg-cream px-6 py-3.5 font-sans text-body-sm font-semibold text-brand transition-colors duration-300 hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/45 focus-visible:ring-offset-[3px] focus-visible:ring-offset-brand"
          >
            See treatment flow
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Link>
        </div>

        <div className="relative">
          <BeforeAfterSlider
            beforeSrc={IMAGES.beforeAfter.waxing.before}
            afterSrc={IMAGES.beforeAfter.waxing.after}
            beforeAlt="Illustrative clean preparation before a waxing visit"
            afterAlt="Illustrative smooth finish after a waxing visit"
            beforeLabel="Before care"
            afterLabel="After care"
          />
          <p className="mt-4 font-sans text-caption leading-snug text-cream/48">
            Illustrative care imagery — approved result photos can replace this panel later.
          </p>
        </div>
      </div>
    </section>
  );
}
