import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/cult-strategy/hero-section";
import WorkshopPageTracker from "@/components/cult-strategy/workshop-page-tracker";
import LazySection from "@/components/lazy-section";

const SpeakerSection = dynamic(() => import("@/components/cult-strategy/speaker-section"));
const HookSection = dynamic(() => import("@/components/cult-strategy/hook-section"));
const WorkshopGallery = dynamic(() => import("@/components/cult-strategy/workshop-gallery"));
const WorkshopPhases = dynamic(() => import("@/components/cult-strategy/workshop-phases"));
const TakeawaysSection = dynamic(() => import("@/components/cult-strategy/takeaways-section"));
const AuthoritySection = dynamic(() => import("@/components/cult-strategy/authority-section"));
const SocialProofSection = dynamic(() => import("@/components/cult-strategy/social-proof-section"));
const FaqSection = dynamic(() => import("@/components/cult-strategy/faq-section"));
const ClosingCtaSection = dynamic(() => import("@/components/cult-strategy/closing-cta-section"));
const MobileFloatingCta = dynamic(() => import("@/components/cult-strategy/mobile-floating-cta"));
const Footer = dynamic(() => import("@/components/footer"));

export const metadata: Metadata = {
  title: "The 120 Year Asset: The Business of Immortality | Alcovia Workshop",
  description:
    "We are teaching teenagers the business and science of radical life extension. Move from passive observers to active founders by pitching high-stakes longevity startups.",
  openGraph: {
    title: "The 120 Year Asset: The Business of Immortality | Alcovia",
    description:
      "Defying death is the new gold rush. Understand the frameworks investors use to value life-extending science and build your own longevity startup.",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CultStrategyWorkshopPage() {
  return (
    <main className="relative" style={{ background: "#050505" }}>
      <WorkshopPageTracker />
      <HeroSection />
      {/* <SpeakerSection /> */}
      <HookSection />
      <WorkshopGallery />
      <WorkshopPhases />
      <TakeawaysSection />
      <AuthoritySection />
      <SocialProofSection />
      <FaqSection />
      <ClosingCtaSection />
      <MobileFloatingCta />
      <LazySection rootMargin="600px 0px" fallbackMinHeight="600px">
        <Footer />
      </LazySection>
    </main>
  );
}
