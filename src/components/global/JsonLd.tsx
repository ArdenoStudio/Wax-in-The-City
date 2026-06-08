import { BRANCHES, SITE } from "@/lib/site";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": BRANCHES.map((branch) => ({
      "@type": "BeautySalon",
      "@id": `${SITE.url}/locations/${branch.slug}#salon`,
      name: `${SITE.name} — ${branch.name}`,
      description: SITE.description,
      url: `${SITE.url}/locations/${branch.slug}`,
      telephone: branch.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: branch.address,
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
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
