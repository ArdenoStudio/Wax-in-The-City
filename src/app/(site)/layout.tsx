import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";
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
      <main id="main-content" tabIndex={-1} className="flex min-h-[100dvh] flex-col focus:outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
