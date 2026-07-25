import type { MetadataRoute } from "next";
import { BRANCHES, SERVICE_CATEGORIES, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/services",
    "/locations",
    "/book",
    "/gallery",
    "/about",
    "/contact",
    "/faq",
  ];
  const serviceRoutes = SERVICE_CATEGORIES.map(
    (service) => `/services/${service.href}`
  );
  const branchRoutes = BRANCHES.map((branch) => `/locations/${branch.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...branchRoutes].map((route) => {
    const isHome = route === "";
    const isKey =
      isHome ||
      route === "/services" ||
      route === "/book" ||
      route === "/locations";

    return {
      url: `${SITE.url}${route}`,
      lastModified: now,
      changeFrequency: isHome ? "weekly" : isKey ? "weekly" : "monthly",
      priority: isHome ? 1 : isKey ? 0.85 : 0.7,
    };
  });
}
