import type { Metadata } from "next";
import HeroSection from "@/components/cult-strategy/hero-section";
import SpeakerSection from "@/components/cult-strategy/speaker-section";
import WorkshopPhases from "@/components/cult-strategy/workshop-phases";
import WorkshopGallery from "@/components/cult-strategy/workshop-gallery";
import ClosingCtaSection from "@/components/cult-strategy/closing-cta-section";
import MobileFloatingCta from "@/components/cult-strategy/mobile-floating-cta";
import WorkshopPageTracker from "@/components/cult-strategy/workshop-page-tracker";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Edible Engineering: Architecting the Next Superfood | Alcovia",
  description:
    "A hands-on workshop where teenagers spot food trends, interview real customers, and pitch a superfood brand like they are raising money. Grades 6-10. May 2nd, Gurgaon.",
  openGraph: {
    title: "Edible Engineering: Architecting the Next Superfood",
    description:
      "Every superfood started in someone's notebook. Learn customer research, product strategy, and investor pitching in one day. May 2nd, Gurgaon.",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CultStrategyWorkshopPage() {
  return (
    <main className="relative">
      <WorkshopPageTracker />
      <HeroSection />
      <SpeakerSection />
      <WorkshopPhases />
      <WorkshopGallery />
      <ClosingCtaSection />
      <MobileFloatingCta />
      <Footer />
    </main>
  );
}
