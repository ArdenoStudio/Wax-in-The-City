import { SITE } from "@/lib/site";

interface CatalogService {
  name: string;
  priceFrom: number;
}

export function ServiceCatalogJsonLd({
  category,
  services,
}: {
  category: string;
  services: CatalogService[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `${category} — ${SITE.name}`,
    url: `${SITE.url}/services`,
    itemListElement: services
      .filter((service) => service.priceFrom > 0)
      .map((service) => ({
        "@type": "Offer",
        priceCurrency: "LKR",
        price: service.priceFrom,
        itemOffered: {
          "@type": "Service",
          name: service.name,
          provider: { "@id": `${SITE.url}#organization` },
        },
      })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
