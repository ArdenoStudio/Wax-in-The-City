import { Check } from "lucide-react";
import { BookingZone } from "@/components/sections/BookingZone";
import { type BranchSlug } from "@/lib/site";

const BENEFITS = [
  "We confirm by call or WhatsApp before your visit",
  "No card required — payment at the studio",
  "Usually confirmed within 24 hours",
  "Urgent timing? WhatsApp is faster",
];

interface WaxBookLayoutProps {
  defaultBranch?: BranchSlug;
  defaultService?: string;
  serviceOptions?: string[];
}

/** book-a-demo1 inspired layout — benefits left, form right (no logo carousel) */
export function WaxBookLayout({
  defaultBranch,
  defaultService,
  serviceOptions,
}: WaxBookLayoutProps) {
  return (
    <section className="band-pearl px-5 py-section-lg lg:px-8">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="type-label text-brand-action">Booking request</p>
            <h2 className="type-title-serif mt-3 text-warm">Low-risk way to hold your time.</h2>
            <p className="mt-4 text-body text-warm-grey">
              This is a request, not a confirmed appointment. We review branch, service, and
              therapist availability before locking anything in.
            </p>
            <ul className="mt-8 space-y-3">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex gap-3 text-body-sm text-warm-grey">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-action" />
                  {benefit}
                </li>
              ))}
            </ul>
          </aside>
          <div>
            <BookingZone
              defaultBranch={defaultBranch}
              defaultService={defaultService}
              serviceOptions={serviceOptions}
              embedded
            />
          </div>
        </div>
      </div>
    </section>
  );
}
