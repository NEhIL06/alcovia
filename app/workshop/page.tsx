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
  title: "Claude AI for Teenagers | Alcovia Workshop",
  description:
    "The most practical Claude AI workshop where teens turn their ideas into working games, apps & websites in one afternoon. May 23rd · Horizon Center · Grades 6–10.",
  openGraph: {
    title: "Claude AI for Teenagers | Alcovia",
    description:
      "The most practical Claude AI workshop where teens turn their ideas into working games, apps & websites in one afternoon. May 23rd, Gurgaon.",
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
      <HookSection />
      <SpeakerSection />
      <WorkshopGallery />
      <WorkshopPhases />
      <TakeawaysSection />
      <AuthoritySection />
      {/* <SocialProofSection /> */}
      <FaqSection />
      <ClosingCtaSection />
      <MobileFloatingCta />
      <LazySection rootMargin="600px 0px" fallbackMinHeight="600px">
        <Footer />
      </LazySection>
    </main>
  );
}
