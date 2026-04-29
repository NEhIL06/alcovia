import type { Metadata } from "next";
import HeroSection from "@/components/cult-strategy/hero-section";
import SpeakerSection from "@/components/cult-strategy/speaker-section";
import HookSection from "@/components/cult-strategy/hook-section";
import WorkshopGallery from "@/components/cult-strategy/workshop-gallery";
import WorkshopPhases from "@/components/cult-strategy/workshop-phases";
import AuthoritySection from "@/components/cult-strategy/authority-section";
import SocialProofSection from "@/components/cult-strategy/social-proof-section";
import FaqSection from "@/components/cult-strategy/faq-section";
import ClosingCtaSection from "@/components/cult-strategy/closing-cta-section";
import MobileFloatingCta from "@/components/cult-strategy/mobile-floating-cta";
import WorkshopPageTracker from "@/components/cult-strategy/workshop-page-tracker";
import Footer from "@/components/footer";

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
      <Footer />
    </main>
  );
}
