import { BRANCHES, SITE } from "@/lib/site";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}#organization`,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/images/witc-wordmark-square.jpg`,
        sameAs: [SITE.instagram, SITE.facebook],
        description: SITE.description,
      },
      ...BRANCHES.map((branch) => {
        const fallbackCloses = branch.hours.weekday.includes("10:00") ? "22:00" : "18:00";
        const opens = branch.hoursOpen ?? "09:00";
        const closes = branch.hoursClose ?? fallbackCloses;
        return {
          "@type": ["HealthAndBeautyBusiness", "BeautySalon"],
          "@id": `${SITE.url}/locations/${branch.slug}#salon`,
          name: `${SITE.name} — ${branch.name}`,
          description: SITE.description,
          url: `${SITE.url}/locations/${branch.slug}`,
          telephone: branch.phone,
          currenciesAccepted: "LKR",
          paymentAccepted: "Cash, Card, Bank Transfer",
          priceRange: "LKR",
          parentOrganization: {
            "@id": `${SITE.url}#organization`,
          },
          address: {
            "@type": "PostalAddress",
            ...(branch.address.includes("(") ? {} : { streetAddress: branch.address }),
            addressLocality: branch.area,
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
