import type { MetadataRoute } from "next";
import { BRANCHES, SERVICE_CATEGORIES, SITE } from "@/lib/site";

const RELEASE_DATE = new Date("2026-08-15T00:00:00Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/locations", "/book", "/gallery", "/about", "/contact", "/faq"];
  const serviceRoutes = SERVICE_CATEGORIES.map((service) => `/services/${service.href}`);
  const branchRoutes = BRANCHES.map((branch) => `/locations/${branch.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...branchRoutes].map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: RELEASE_DATE,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
