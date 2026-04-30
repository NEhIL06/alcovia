import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/cult-strategy/hero-section";
import WorkshopPageTracker from "@/components/cult-strategy/workshop-page-tracker";
import LazySection from "@/components/lazy-section";

const SpeakerSection = dynamic(() => import("@/components/cult-strategy/speaker-section"));
const HookSection = dynamic(() => import("@/components/cult-strategy/hook-section"));
const WorkshopGallery = dynamic(() => import("@/components/cult-strategy/workshop-gallery"));
const WorkshopPhases = dynamic(() => import("@/components/cult-strategy/workshop-phases"));
const AuthoritySection = dynamic(() => import("@/components/cult-strategy/authority-section"));
const SocialProofSection = dynamic(() => import("@/components/cult-strategy/social-proof-section"));
const FaqSection = dynamic(() => import("@/components/cult-strategy/faq-section"));
const ClosingCtaSection = dynamic(() => import("@/components/cult-strategy/closing-cta-section"));
const MobileFloatingCta = dynamic(() => import("@/components/cult-strategy/mobile-floating-cta"));
const Footer = dynamic(() => import("@/components/footer"));

export const metadata: Metadata = {
  title: "Superfood Workshop for Teenagers | Turn Your Snack Idea Into a Real Brand | Alcovia",
  description:
    "A hands-on workshop where teenagers spot food trends, interview real customers, and pitch a superfood brand. Grades 6-10. May 2nd, Horizon Center, Gurgaon. Only 17 spots.",
  openGraph: {
    title: "Turn Your Snack Idea Into a Real Brand – Alcovia Superfood Workshop",
    description:
      "Every snack on a shelf started as an idea in a notebook. Learn customer research, product strategy, and investor pitching in one day. May 2nd, Gurgaon.",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CultStrategyWorkshopPage() {
  return (
    <main className="relative" style={{ background: "#F9F8F5" }}>
      <WorkshopPageTracker />
      <HeroSection />
      <SpeakerSection />
      <HookSection />
      <WorkshopGallery />
      <WorkshopPhases />
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
