import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { bodoniModa, sourceSans } from "@/lib/fonts";
import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";
import { MobileBookingBar } from "@/components/global/MobileBookingBar";
import { MotionProvider } from "@/components/global/MotionProvider";
import { SkipLink } from "@/components/global/SkipLink";
import { JsonLd } from "@/components/global/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "waxing Colombo",
    "ladies salon Colombo",
    "Brazilian wax Colombo",
    "hydra facial Sri Lanka",
    "Battaramulla salon",
    "Nugegoda salon",
  ],
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: IMAGES.og,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [IMAGES.og],
  },
  icons: {
    icon: [
      { url: IMAGES.logo, type: "image/png" },
      { url: "/images/witc-logo.svg", type: "image/svg+xml" },
    ],
    apple: "/images/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#2b0710",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodoniModa.variable} ${sourceSans.variable}`}>
      <body className="min-h-screen bg-cream font-sans text-warm antialiased">
        <JsonLd />
        <SkipLink />
        <MotionProvider>
          <Navbar />
          <main id="main-content" className="flex min-h-screen flex-col pb-24 md:pb-0">
            {children}
          </main>
          <Footer />
          <MobileBookingBar />
        </MotionProvider>
      </body>
    </html>
  );
}
