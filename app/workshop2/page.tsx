import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/distribution-workshop/hero-section";
import WorkshopPageTracker from "@/components/cult-strategy/workshop-page-tracker";
import LazySection from "@/components/lazy-section";

const HookSection = dynamic(() => import("@/components/distribution-workshop/hook-section"));
const WorkshopGallery = dynamic(() => import("@/components/cult-strategy/workshop-gallery"));
const WorkshopPhases = dynamic(() => import("@/components/distribution-workshop/workshop-phases"));
const TakeawaysSection = dynamic(() => import("@/components/distribution-workshop/takeaways-section"));
const AuthoritySection = dynamic(() => import("@/components/distribution-workshop/authority-section"));
const FaqSection = dynamic(() => import("@/components/distribution-workshop/faq-section"));
const ClosingCtaSection = dynamic(() => import("@/components/distribution-workshop/closing-cta-section"));
const MobileFloatingCta = dynamic(() => import("@/components/distribution-workshop/mobile-floating-cta"));
const Footer = dynamic(() => import("@/components/footer"));

export const metadata: Metadata = {
  title: "The Distribution Monopoly | Alcovia Workshop",
  description:
    "Attention is the new currency. Teens learn the actual playbook behind hooks, niches, rhythm, and monetisation — directly from creators doing it today. May 30th · Horizon Center · Grades 6–10.",
  openGraph: {
    title: "The Distribution Monopoly | Alcovia",
    description:
      "The teens who learn to own the feed don't grow up to use it. One afternoon. Real creator infrastructure. May 30th, Gurgaon.",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function DistributionWorkshopPage() {
  return (
    <main className="relative" style={{ background: "#0B1629" }}>
      <WorkshopPageTracker />
      <HeroSection />
      <HookSection />
      <WorkshopGallery accentColor="#D4A853" background="#0B1629" />
      <WorkshopPhases />
      <TakeawaysSection />
      <AuthoritySection />
      <FaqSection />
      <ClosingCtaSection />
      <MobileFloatingCta />
      <LazySection rootMargin="600px 0px" fallbackMinHeight="600px">
        <Footer />
      </LazySection>
    </main>
  );
}
