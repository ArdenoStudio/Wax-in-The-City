import type { Metadata, Viewport } from "next";
import { Geist, Newsreader } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";
import { MobileBookingBar } from "@/components/global/MobileBookingBar";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

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
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  icons: { icon: "/images/witc-logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#461216",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${newsreader.variable} antialiased`}
    >
      <body className="min-h-screen bg-cream text-warm">
        <Navbar />
        <main className="flex min-h-screen flex-col">{children}</main>
        <Footer />
        <MobileBookingBar />
      </body>
    </html>
  );
}
