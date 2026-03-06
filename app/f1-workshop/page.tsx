import type { Metadata } from "next";
import HeroSection from "@/components/f1-workshop/hero-section";
import TextRevealSection from "@/components/f1-workshop/text-reveal-section";
import WorkshopCardsSection from "@/components/f1-workshop/workshop-cards-section";
import EventDetailsSection from "@/components/f1-workshop/event-details-section";
import SpeakerSection from "@/components/f1-workshop/speaker-section";
import CtaFooterSection from "@/components/f1-workshop/cta-footer-section";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "The Billion-Dollar Playbook: The Business of F1 & IPL | Alcovia",
  description:
    "An immersive workshop where teenagers take control of a massive sports franchise and learn the fundamentals of billion-dollar sports businesses — from someone in RedBull itself!",
  openGraph: {
    title: "The Billion-Dollar Playbook: The Business of F1 & IPL",
    description:
      "Move from the grandstand to the boardroom. An immersive Alcovia workshop on the business of F1 & IPL.",
    type: "website",
  },
};

export default function F1WorkshopPage() {
  return (
    <main className="relative">
      <HeroSection />
      <TextRevealSection />
      <WorkshopCardsSection />
      <EventDetailsSection />
      <SpeakerSection />
      <CtaFooterSection />
      <Footer />
    </main>
  );
}
