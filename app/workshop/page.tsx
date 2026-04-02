import type { Metadata } from "next";
import HeroSection from "@/components/cult-strategy/hero-section";
import ProblemSection from "@/components/cult-strategy/problem-section";
import SpeakerSection from "@/components/cult-strategy/speaker-section";
import WorkshopPhases from "@/components/cult-strategy/workshop-phases";
import TakeawaysSection from "@/components/cult-strategy/takeaways-section";
import AuthoritySection from "@/components/cult-strategy/authority-section";
import SocialProofSection from "@/components/cult-strategy/social-proof-section";
import FaqSection from "@/components/cult-strategy/faq-section";
import ClosingCtaSection from "@/components/cult-strategy/closing-cta-section";
import MobileFloatingCta from "@/components/cult-strategy/mobile-floating-cta";
import WorkshopPageTracker from "@/components/cult-strategy/workshop-page-tracker";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "The Cult Strategy: How Brands Manufacture Hype | Alcovia",
  description:
    "Stop getting played by the hype. Learn the secret playbook the world's biggest brands use to engineer status and loyalty. An immersive workshop for Grades 6–10.",
  openGraph: {
    title: "The Cult Strategy: How Brands Manufacture Hype",
    description:
      "Why do people obsess over Nike, Supreme, or Apple? Learn the psychology behind cult brands — and build one yourself. Alcovia Workshop, April 11th.",
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
      <ProblemSection />
      <SpeakerSection />
      <WorkshopPhases />
      <TakeawaysSection />
      
      <AuthoritySection />
      <SocialProofSection />
      <FaqSection />
      <ClosingCtaSection />
      <MobileFloatingCta />
      <Footer />
    </main>
  );
}
