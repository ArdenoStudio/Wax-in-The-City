import Link from "next/link";
import Image from "next/image";
import { Footer2 } from "@/components/footer2";
import { SITE, NAV_LINKS, BRANCHES, whatsappLink } from "@/lib/site";
import { IMAGES } from "@/lib/images";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="bg-brand-footer text-cream/80">
      <Footer2
        className="py-16 lg:py-20 [&_.container]:max-w-7xl [&_a]:text-cream/70 [&_a:hover]:text-cream [&_h3]:text-cream [&_p]:text-cream/60"
        logo={{
          url: "/",
          src: IMAGES.wordmark,
          alt: SITE.name,
          title: SITE.name,
        }}
        description={`${SITE.tagline} Ladies-only waxing and skin care in Colombo.`}
        sections={[
          {
            title: "Explore",
            links: [
              { name: "Home", href: "/" },
              ...NAV_LINKS.map((l) => ({ name: l.label, href: l.href })),
              { name: "Book Your Visit", href: "/book" },
            ],
          },
          ...BRANCHES.map((b) => ({
            title: b.status === "open" ? `${b.name} · Open` : `${b.name} · Soon`,
            links: [
              { name: b.area, href: `/locations/${b.slug}` },
              ...(b.status === "open"
                ? [
                    {
                      name: `WhatsApp ${b.name}`,
                      href: whatsappLink(`Hi! I'd like to book at ${b.name}.`, b.whatsapp),
                    },
                  ]
                : [{ name: "Get updates", href: "/contact" }]),
            ],
          })),
        ]}
        copyright={`© ${year} ${SITE.name}. All rights reserved.`}
        legalLinks={[
          { name: "Instagram", href: SITE.instagram },
          { name: "Facebook", href: SITE.facebook },
        ]}
      />
      <p className="pb-24 text-center text-caption text-cream/40 md:pb-8">
        Crafted by <span className="text-cream/60">Ardeno Studio</span>
      </p>
    </div>
  );
}
