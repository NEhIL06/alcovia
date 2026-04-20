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
  title: "The Nike Playbook: Engineering a Cult Brand | Alcovia",
  description:
    "Join Siddhant Narayan (Country Head of Marketing, Nike) to pull back the curtain on how the world's most iconic brand manufactures hype and builds global communities. Grades 6–10.",
  openGraph: {
    title: "The Nike Playbook: Engineering a Cult Brand",
    description:
      "A masterclass from the man behind Nike India's marketing engine. Learn the psychology of 'The Drop,' community building, and brand status. April 18th, Gurgaon.",
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
      <div className="hidden md:block">
        <ProblemSection />
      </div>
      <SpeakerSection />
      <WorkshopPhases />
      <div className="hidden md:block">
        <TakeawaysSection />
        <AuthoritySection />
        <SocialProofSection />
        <FaqSection />
      </div>
      <ClosingCtaSection />
      <MobileFloatingCta />
      <Footer />
    </main>
  );
}
