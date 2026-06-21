import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VISIT_STEPS } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { SectionHeading } from "@/components/ui/section-heading";

export function VisitMapSection() {
  return (
    <section id="visit-map" className="band-pearl px-5 py-section-lg lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <SectionHeading
            voice="serif"
            align="left"
            title="What happens in the room."
            subtitle="A quieter appointment flow than a walk-in salon — from your first message to after-care guidance."
          />
          <Link
            href="/about"
            className="mt-8 inline-flex min-h-12 items-center gap-2 text-body-sm font-medium text-brand-action hover:underline"
          >
            Full studio standards
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ol className="space-y-0 divide-y divide-warm-border border-y border-warm-border">
          {VISIT_STEPS.map((item, index) => (
            <li key={item.step} className="grid gap-4 py-8 sm:grid-cols-[72px_1fr] sm:gap-6">
              <span className="font-serif text-[2.5rem] leading-none text-brand-action/30">
                {item.step}
              </span>
              <div>
                <h3 className="type-subtitle text-warm">{item.title}</h3>
                <p className="mt-2 max-w-lg text-body text-warm-grey">{item.body}</p>
                {index === 1 && (
                  <div className="relative mt-5 aspect-[16/10] max-w-md overflow-hidden rounded-card bg-cream-alt">
                    <Image
                      src={IMAGES.book.src}
                      alt="Prep station before each visit"
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover"
                      unoptimized
                    />
                    <div className="scrim-caption absolute inset-0" />
                    <p className="absolute bottom-3 left-3 text-small text-cream">
                      Prep station · Battaramulla
                    </p>
                  </div>
                )}
                <p className="mt-4 text-small text-warm-grey/90 italic">
                  {item.note}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
