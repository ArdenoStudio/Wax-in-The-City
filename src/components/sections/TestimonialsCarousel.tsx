import { REVIEW_THEMES } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Public review theme section. This avoids shipping fake client testimonials
 * while still making the strongest social-proof themes visible.
 */
export function TestimonialsCarousel() {
  return (
    <section className="bg-cream px-5 py-section-lg lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <SectionHeading
          eyebrow="Public review themes"
          title="The proof is not loud. It is consistent."
          subtitle="Across public reviews, the same signals keep showing up: clean process, gentle handling, and careful product choice."
        />

        <div className="grid gap-4">
          {REVIEW_THEMES.map((theme, i) => (
            <article
              key={theme.title}
              className="grid gap-4 border border-warm-border bg-white p-5 sm:grid-cols-[72px_1fr] sm:p-6"
            >
              <span className="font-serif text-[2.5rem] font-light leading-none text-brand-action">
                0{i + 1}
              </span>
              <div>
                <h3 className="font-serif text-h3 text-warm">{theme.title}</h3>
                <p className="mt-2 text-body-sm text-warm-grey">{theme.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
