import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";

const PROOF_POINTS = [
  "Private room and prep before treatment starts",
  "Clear after-care guidance before you leave",
  "Approved result photos can replace this panel later",
] as const;

export function BeforeAfterShowcase() {
  return (
    <section className="relative overflow-hidden bg-brand px-5 py-section-lg text-cream lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,214,222,0.16),transparent_34%),linear-gradient(135deg,rgba(43,7,16,1),rgba(23,7,11,1)_62%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-70" />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-pill border border-cream/14 bg-cream/8 px-4 py-2 text-caption font-semibold uppercase tracking-[0.12em] text-brand-light">
            <Sparkles className="h-4 w-4" />
            Before and after
          </div>
          <h2 className="mt-6 max-w-xl font-serif text-h1 font-medium leading-tight text-cream sm:text-display">
            From unsure to looked after.
          </h2>
          <p className="mt-5 max-w-xl text-body-lg text-cream/72">
            The comparison stays honest for now: it shows the appointment shift
            from questions and prep to clear after-care, without pretending that
            stock photos are client results.
          </p>

          <ul className="mt-7 grid gap-3">
            {PROOF_POINTS.map((point) => (
              <li
                key={point}
                className="flex gap-3 rounded-card border border-cream/12 bg-cream/[0.055] p-3 text-body-sm text-cream/76"
              >
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/services/waxing"
            className="mt-8 inline-flex items-center gap-2 rounded-pill bg-cream px-6 py-3 text-body-sm font-medium text-brand shadow-[0_16px_34px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-light"
          >
            See treatment flow
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-[18px]">
          <div className="absolute -inset-4 rounded-[18px] border border-cream/10 bg-cream/[0.045]" />
          <BeforeAfterSlider
            beforeSrc={IMAGES.beforeAfter.waxing.before}
            afterSrc={IMAGES.beforeAfter.waxing.after}
            beforeAlt="Illustrative clean preparation before a waxing visit"
            afterAlt="Illustrative smooth finish after a waxing visit"
            beforeLabel="Before care"
            afterLabel="After care"
          />
        </div>
      </div>
    </section>
  );
}
