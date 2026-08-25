import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";
import { MobileBookingBar } from "@/components/global/MobileBookingBar";
import { LoadingScreen } from "@/components/global/LoadingScreen";
import { JsonLd } from "@/components/global/JsonLd";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <JsonLd />
      <LoadingScreen />
      <Navbar />
      {children}
      <Footer />
      <MobileBookingBar />
    </>
  );
}
