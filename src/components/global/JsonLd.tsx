import { BRANCHES, SITE } from "@/lib/site";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}#organization`,
        name: SITE.name,
        legalName: "Wax In The City Sri Lanka",
        url: SITE.url,
        logo: `${SITE.url}/images/witc-wordmark-square.jpg`,
        sameAs: [SITE.instagram, SITE.facebook],
        description: SITE.description,
        areaServed: [
          { "@type": "City", name: "Colombo" },
          { "@type": "AdministrativeArea", name: "Western Province" },
          { "@type": "Country", name: "Sri Lanka" },
        ],
        knowsAbout: [
          "Ladies Only Waxing",
          "Brazilian & Bikini Waxing",
          "Lycon Australia Hot Wax",
          "Rica Italy Strip Wax",
          "Single-use Spatula Hygiene Protocol",
          "Glow Up & Brightening Facials",
          "Hydra Facial Treatments",
          "Moroccan Body Polish",
        ],
      },
      ...BRANCHES.map((branch) => {
        const fallbackCloses = branch.hours.weekday.includes("10:00") ? "22:00" : "18:00";
        const opens = branch.hoursOpen ?? "09:00";
        const closes = branch.hoursClose ?? fallbackCloses;
        return {
          "@type": ["HealthAndBeautyBusiness", "BeautySalon"],
          "@id": `${SITE.url}/locations/${branch.slug}#salon`,
          name: `${SITE.name} — ${branch.name}`,
          description: branch.blurb || SITE.description,
          url: `${SITE.url}/locations/${branch.slug}`,
          telephone: branch.phone,
          currenciesAccepted: "LKR",
          paymentAccepted: "Cash, Card, Bank Transfer",
          priceRange: "LKR 700 - LKR 26,500",
          hasMap: branch.googleMapsUrl,
          parentOrganization: {
            "@id": `${SITE.url}#organization`,
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: branch.phone,
            contactType: "reservations",
            availableLanguage: ["English", "Sinhala"],
          },
          address: {
            "@type": "PostalAddress",
            streetAddress: branch.address.replace(/\s*\([^)]*\)/g, "").trim(),
            addressLocality: branch.area,
            addressRegion: "Western Province",
            addressCountry: "LK",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: branch.geo.latitude,
            longitude: branch.geo.longitude,
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens,
              closes,
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Saturday", "Sunday"],
              opens,
              closes,
            },
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Wax In The City Menu",
            url: `${SITE.url}/services`,
          },
          image: `${SITE.url}/images/og-image.jpg`,
        };
      }),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
