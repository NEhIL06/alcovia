import type { Metadata } from "next";
import HeroSection from "@/components/neuromarketing-workshop/hero-section";
import ProblemSection from "@/components/neuromarketing-workshop/problem-section";
import TransformationSection from "@/components/neuromarketing-workshop/transformation-section";
import CtaMidSection from "@/components/neuromarketing-workshop/cta-mid-section";
import AudienceSection from "@/components/neuromarketing-workshop/audience-section";
import AuthoritySection from "@/components/neuromarketing-workshop/authority-section";
import SpeakerSection from "@/components/neuromarketing-workshop/speaker-section";
import SocialProofSection from "@/components/neuromarketing-workshop/social-proof-section";
import ClosingCtaSection from "@/components/neuromarketing-workshop/closing-cta-section";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title:
    "The Invisible Influence: Brand Warfare & Neuromarketing | Alcovia",
  description:
    "An immersive workshop where teenagers decode the hidden science brands use to control decisions, and learn to build brands that weaponize psychology.",
  openGraph: {
    title: "The Invisible Influence: Brand Warfare & Neuromarketing",
    description:
      "You think you choose what you buy. You don't. An immersive Alcovia workshop on neuromarketing and brand warfare.",
    type: "website",
  },
};

export default function NeuromarketingWorkshopPage() {
  return (
    <main className="relative">
      <HeroSection />
      <ProblemSection />
      <TransformationSection />
      <CtaMidSection />
      <AudienceSection />
      <AuthoritySection />
      <SpeakerSection />
      <SocialProofSection />
      <ClosingCtaSection />
      <Footer />
    </main>
  );
}
