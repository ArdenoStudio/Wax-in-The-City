import { Contact7 } from "@/components/contact7";
import { BRANCHES, whatsappLink } from "@/lib/site";

export function WaxContactMethods() {
  const open = BRANCHES.find((b) => b.status === "open");

  return (
    <Contact7
      title="Fastest route to us"
      description="WhatsApp is best for urgent timing. Use the form for questions that can wait."
      emailLabel="Email"
      emailDescription="For non-urgent questions."
      email="hello@waxinthecitylk.com"
      officeLabel={open ? `${open.name} studio` : "Battaramulla"}
      officeDescription="Ladies-only appointment-led studio."
      officeAddress={open?.address ?? "Battaramulla, Colombo"}
      phoneLabel="Phone"
      phoneDescription="Same number for both branches."
      phone={open?.phone ?? "+94 77 946 9437"}
      chatLabel="WhatsApp"
      chatDescription="Best for same-week booking questions."
      chatLink="Message on WhatsApp"
      chatHref={whatsappLink("Hi! I have a question before booking.")}
      className="py-section-lg [&_.container]:max-w-5xl [&_h2]:type-title-serif [&_h2]:text-warm [&_.rounded-xl]:surface"
    />
  );
}
