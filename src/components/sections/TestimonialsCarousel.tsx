import { TESTIMONIALS } from "@/lib/site";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Auto-scrolling testimonial marquee (file 08, section 08) — Aceternity
 * "Infinite Moving Cards" pattern. Two identical groups, track translates -50%,
 * pauses on hover, stilled by reduced-motion.
 */
export function TestimonialsCarousel() {
  return (
    <section className="overflow-hidden bg-cream py-section">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="In their words"
          title="What our guests are saying."
        />
      </div>

      <div className="group relative mt-12 overflow-hidden">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream to-transparent sm:w-28" />

        <div className="flex w-max animate-marquee-slow gap-5 px-2.5">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
