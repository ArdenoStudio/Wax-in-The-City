import { HeroArrival } from "@/components/sections/HeroArrival";
import { VisitMapSection } from "@/components/sections/VisitMapSection";
import { CarePathsSection } from "@/components/sections/CarePathsSection";
import { LocationStrip } from "@/components/sections/LocationStrip";
import { getPublicServiceContent } from "@/lib/service-content";

export default async function HomePage() {
  const serviceContent = await getPublicServiceContent();

  return (
    <>
      <HeroArrival />
      <VisitMapSection />
      <CarePathsSection categories={serviceContent.categories} />
      <LocationStrip />
    </>
  );
}
