import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/images";
import { BRANCHES, VISIT_STEPS } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "A ladies-only studio built for private, careful waxing and skin care in Colombo.",
};

const VALUES = [
  {
    title: "Hygiene is visible",
    body: "Fresh wax handling, clean tools, and prepared surfaces — treated as normal, not a premium add-on.",
  },
  {
    title: "Privacy stays protected",
    body: "Ladies-only rooms and appointment-led timing so sensitive services feel less intimidating.",
  },
  {
    title: "Advice stays practical",
    body: "We help you choose what suits your skin and timing — not the biggest treatment on the menu.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Private care, without the salon rush."
        subtitle="Wax In The City is built for women who want beauty care to feel careful, clean, and calm."
        image={IMAGES.socialProof.src}
        imageAlt={IMAGES.socialProof.alt}
        size="md"
      />

      <section className="band-pearl px-5 py-section-lg lg:px-8">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="relative min-h-[420px] overflow-hidden rounded-card bg-brand">
            <Image
              src={IMAGES.socialProof.src}
              alt={IMAGES.socialProof.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-[50%_20%]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(23,7,11,0.75)_100%)]" />
            <p className="absolute bottom-0 left-0 max-w-sm p-6 font-serif text-h3 text-cream">
              Glamour is welcome here. Pressure is not.
            </p>
          </div>

          <div>
            <h2 className="type-title-serif text-warm">
              Built like a private dressing room, run like a careful appointment studio.
            </h2>
            <p className="mt-6 max-w-xl text-body-lg text-warm-grey">
              Comfort, privacy, hygiene, and trust come before the first strip of wax or skincare
              product touches skin. That is why the appointment flow is quieter than a walk-in salon
              and why sensitive services are handled with more context.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {BRANCHES.map((branch) => (
                <div key={branch.slug} className="surface p-5">
                  <p className="type-label text-brand-action">{branch.name}</p>
                  <p className="mt-2 text-body-sm text-warm-grey">{branch.blurb}</p>
                  {branch.status === "coming-soon" && (
                    <p className="mt-2 text-small text-warm-grey">Opening soon</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="band-wine px-5 py-section-lg lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            align="left"
            tone="light"
            title="What should feel different when you walk in."
            subtitle="The details are practical because the services are personal."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="border border-cream/14 bg-cream/6 p-6"
              >
                <h3 className="type-subtitle text-cream">{value.title}</h3>
                <p className="mt-3 text-body-sm text-cream/72">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band-pearl border-t border-warm-border px-5 py-section-lg lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            voice="sans"
            align="left"
            title="The appointment has a shape."
            subtitle="A polished studio is not only how it looks — it is how predictable and considered the visit feels."
          />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VISIT_STEPS.map((step) => (
              <li key={step.step} className="surface p-6">
                <p className="type-label text-brand-action">{step.step}</p>
                <h3 className="type-subtitle mt-3 text-warm">{step.title}</h3>
                <p className="mt-2 text-body-sm text-warm-grey">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Button asChild size="lg">
              <Link href="/book">Send a booking request</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
