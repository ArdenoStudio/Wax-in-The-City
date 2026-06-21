import { SectionHeading } from "@/components/ui/section-heading";
import { BookingForm } from "@/components/sections/BookingForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { type BranchSlug } from "@/lib/site";

interface BookingZoneProps {
  defaultBranch?: BranchSlug;
  defaultService?: string;
  serviceOptions?: string[];
  embedded?: boolean;
}

export function BookingZone({
  defaultBranch,
  defaultService,
  serviceOptions,
  embedded = false,
}: BookingZoneProps) {
  const inner = (
    <>
      {!embedded && (
        <SectionHeading
          voice="sans"
          align="left"
          title="Send a booking request."
          subtitle="Choose your studio and treatment — we confirm by call or WhatsApp before your visit. No card required."
        />
      )}

      <div className={embedded ? "" : "mt-10"}>
        <BookingForm
          defaultBranch={defaultBranch}
          defaultService={defaultService}
          serviceOptions={serviceOptions}
          showChannelChoice
        />
      </div>

      <div className="mt-14">
        <h2 className="type-subtitle text-warm">Before you send</h2>
        <Accordion type="single" collapsible className="mt-4 space-y-2">
          <AccordionItem value="confirm">
            <AccordionTrigger>How soon will you confirm?</AccordionTrigger>
            <AccordionContent>
              Usually within 24 hours — often sooner. For urgent timing, WhatsApp is faster.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="pay">
            <AccordionTrigger>Do I need to pay upfront?</AccordionTrigger>
            <AccordionContent>
              No. This is a request only. Payment happens at the studio after confirmation.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="reschedule">
            <AccordionTrigger>What if I need to reschedule?</AccordionTrigger>
            <AccordionContent>
              Message us on WhatsApp or reply to our confirmation call.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );

  if (embedded) {
    return <div id="book">{inner}</div>;
  }

  return (
    <section id="book" className="band-pearl px-5 py-section-lg lg:px-8">
      <div className="mx-auto max-w-2xl">{inner}</div>
    </section>
  );
}
