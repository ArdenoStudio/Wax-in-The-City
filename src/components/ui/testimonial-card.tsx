import { Star } from "lucide-react";
import { type Testimonial } from "@/lib/site";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full w-[300px] shrink-0 flex-col rounded-card-lg border border-warm-border bg-white p-6 shadow-card sm:w-[360px]">
      <div className="flex gap-0.5 text-brand-action">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 font-serif text-body-lg italic leading-relaxed text-warm">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-5 border-t border-warm-border pt-4">
        <p className="font-semibold text-warm">{testimonial.name}</p>
        <p className="text-body-sm text-warm-grey">{testimonial.branch} branch</p>
      </figcaption>
    </figure>
  );
}
