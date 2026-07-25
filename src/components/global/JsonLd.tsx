import { FAQ_GROUPS } from "@/lib/faq";
import { BRANCHES, SITE, SERVICES, SERVICE_CATEGORIES, isAddressPending } from "@/lib/site";
import { formatLKRFrom } from "@/lib/utils";

export function JsonLd() {
  const faqEntities = FAQ_GROUPS.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    }))
  );

  const offerCatalog = {
    "@type": "OfferCatalog",
    name: `${SITE.shortName} treatments`,
    itemListElement: SERVICE_CATEGORIES.map((category) => ({
      "@type": "OfferCatalog",
      name: category.name,
      itemListElement: SERVICES.filter(
        (service) => service.category === category.slug
      ).map((service) => ({
        "@type": "Offer",
        name: service.name,
        description: service.description,
        priceCurrency: "LKR",
        price: service.priceFrom,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          priceCurrency: "LKR",
          price: service.priceFrom,
          name: formatLKRFrom(service.priceFrom),
        },
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
      })),
    })),
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      ...BRANCHES.map((branch) => {
        const pending = isAddressPending(branch);
        return {
          "@type": "BeautySalon",
          "@id": `${SITE.url}/locations/${branch.slug}#salon`,
          name: `${SITE.name} — ${branch.name}`,
          description: SITE.description,
          url: `${SITE.url}/locations/${branch.slug}`,
          telephone: branch.phone,
          address: {
            "@type": "PostalAddress",
            ...(pending ? {} : { streetAddress: branch.address }),
            addressLocality: branch.area,
            addressCountry: "LK",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:00",
              closes: "18:00",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Saturday", "Sunday"],
              opens: "09:00",
              closes: "17:00",
            },
          ],
          image: `${SITE.url}/images/og-image.jpg`,
          priceRange: "$$",
          hasOfferCatalog: offerCatalog,
        };
      }),
      {
        "@type": "FAQPage",
        "@id": `${SITE.url}/faq#faq`,
        mainEntity: faqEntities,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
