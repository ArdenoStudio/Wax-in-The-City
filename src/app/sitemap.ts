import type { MetadataRoute } from "next";
import { BRANCHES, SERVICE_CATEGORIES, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/locations", "/book", "/gallery", "/about", "/contact", "/faq"];
  const serviceRoutes = SERVICE_CATEGORIES.map((service) => `/services/${service.href}`);
  const branchRoutes = BRANCHES.map((branch) => `/locations/${branch.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...branchRoutes].map((route) => ({
    url: `${SITE.url}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
