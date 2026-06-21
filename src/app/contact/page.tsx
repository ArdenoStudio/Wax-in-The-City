import type { Metadata } from "next";
import { Clock, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { InstagramIcon, FacebookIcon, WhatsappIcon } from "@/components/icons";
import { BRANCHES, SITE, whatsappLink } from "@/lib/site";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Wax In The City — message us on WhatsApp or send a note.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Questions before you book? Start here."
        subtitle="WhatsApp is best for urgent timing. Use the form for non-urgent questions."
        image={IMAGES.book.src}
        imageAlt={IMAGES.book.alt}
        size="md"
      />

      <section className="band-wine px-5 py-section-lg lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="type-title-serif text-cream">If it is about timing, message us first.</h2>
            <p className="mt-2 max-w-md text-body text-cream/72">
              A WhatsApp message lets us confirm branch, service length, and room before you travel.
            </p>
          </div>
          <Button asChild size="lg" variant="inverted">
            <a
              href={whatsappLink("Hi! I have a question before booking.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappIcon className="h-5 w-5" />
              Message WhatsApp
            </a>
          </Button>
        </div>
      </section>

      <section id="contact-form" className="band-pearl px-5 py-section-lg lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <aside className="space-y-5">
            <SectionHeading
              voice="sans"
              align="left"
              title="Branch details"
              subtitle="Battaramulla is open now. Nugegoda updates will be shared when ready."
            />

            {BRANCHES.map((b) => (
              <div key={b.slug} className="surface p-5">
                <p className="type-label text-brand-action">
                  {b.status === "open" ? "Open now" : "Opening soon"}
                </p>
                <p className="type-subtitle mt-2 text-warm">{b.name}</p>
                <div className="mt-3 space-y-2 text-body-sm text-warm-grey">
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-brand-action" />
                    {b.area}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-brand-action" />
                    {b.hours.weekday}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-brand-action" />
                    {b.phone}
                  </p>
                </div>
                {b.status === "open" && (
                  <Button asChild className="mt-4" size="sm" variant="outline">
                    <a
                      href={whatsappLink(`Hi! I have a question about your ${b.name} branch.`, b.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsappIcon className="h-4 w-4" />
                      WhatsApp {b.name}
                    </a>
                  </Button>
                )}
              </div>
            ))}
          </aside>

          <div>
            <SectionHeading
              voice="sans"
              align="left"
              title="Send the details once, clearly."
              subtitle="Useful for questions, service matching, and context that does not need an instant reply."
            />
            <div className="mt-8">
              <ContactForm />
            </div>

            <div className="mt-10">
              <h3 className="type-subtitle text-warm">Follow us</h3>
              <div className="mt-4 flex gap-3">
                <SocialLink href={SITE.instagram} label="Instagram">
                  <InstagramIcon className="h-5 w-5" />
                </SocialLink>
                <SocialLink href={SITE.facebook} label="Facebook">
                  <FacebookIcon className="h-5 w-5" />
                </SocialLink>
                <SocialLink href={whatsappLink("Hi! I have a question.")} label="WhatsApp">
                  <WhatsappIcon className="h-5 w-5" />
                </SocialLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center rounded-pill border border-brand-action/30 text-brand-action hover:bg-brand-mist"
    >
      {children}
    </a>
  );
}
