import { Star } from "lucide-react";
import { type Testimonial } from "@/lib/site";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="premium-surface micro-lift flex h-full w-[300px] shrink-0 flex-col rounded-card p-6 sm:w-[360px]">
      <div className="relative z-10 flex gap-0.5 text-brand-action">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <blockquote className="relative z-10 mt-4 flex-1 font-serif text-body-lg italic leading-relaxed text-warm">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="relative z-10 mt-5 border-t border-warm-border/80 pt-4">
        <p className="font-semibold text-warm">{testimonial.name}</p>
        <p className="text-body-sm text-warm-grey">{testimonial.branch} branch</p>
      </figcaption>
    </figure>
  );
}
