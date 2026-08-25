import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { IMAGES } from "@/lib/images";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
}

export function buildPageMetadata({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: `${SITE.url}${path}`,
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website",
      images: [
        {
          url: IMAGES.og,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [IMAGES.og],
    },
  };
}
