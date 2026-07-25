import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { calSans, inter } from "@/lib/fonts";
import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";
import { MobileBookingBar } from "@/components/global/MobileBookingBar";
import { SmoothScrollProvider } from "@/components/global/SmoothScrollProvider";
import { LoadingScreen } from "@/components/global/LoadingScreen";
import { SkipLink } from "@/components/global/SkipLink";
import { JsonLd } from "@/components/global/JsonLd";

/** Keep meta descriptions in the ~120–160 char SEO band. */
const META_DESCRIPTION =
  SITE.description.length >= 110 && SITE.description.length <= 170
    ? SITE.description
    : SITE.description.slice(0, 157).trimEnd() + "…";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: META_DESCRIPTION,
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
    description: META_DESCRIPTION,
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
    description: META_DESCRIPTION,
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
    <html
      lang="en-LK"
      className={`${calSans.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-screen bg-cream font-sans text-warm antialiased">
        <JsonLd />
        <SkipLink />
        <LoadingScreen />
        <SmoothScrollProvider>
          <Navbar />
          <main
            id="main-content"
            tabIndex={-1}
            className="flex min-h-screen flex-col pb-20 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-action md:pb-0"
          >
            {children}
          </main>
          <Footer />
          <MobileBookingBar />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
