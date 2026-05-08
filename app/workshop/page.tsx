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
  title: "Claude Code for Teenagers | Alcovia Workshop",
  description:
    "Learn to build real apps with Claude Code in one afternoon. Teens go from idea to a working game, app, or website using AI. May 23rd · Horizon Center · Grades 6–10.",
  openGraph: {
    title: "Claude Code for Teenagers | Alcovia",
    description:
      "The teens who learn Claude Code now don't grow up to use software. They grow up to ship it. One afternoon. Real builds. May 23rd, Gurgaon.",
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
