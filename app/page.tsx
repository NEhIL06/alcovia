"use client"

import { motion, AnimatePresence } from "framer-motion"
import { HeroAnimationProvider } from "@/context/hero-animation-context"

import ScrollProgress from "@/components/scroll-progress"
import Hero from "@/components/hero"
import Manifesto from "@/components/manifesto"
import OfferingsHorizontal from "@/components/offerings-horizontal"
import ToggleCompare from "@/components/toggle-compare"
import StudentSnapshots from "@/components/student-snapshots"
import SocialFan from "@/components/social-fan"
import PartnersSection from "@/components/partners-section"
import Footer from "@/components/footer"
import MicroInteractions from "@/components/micro-interactions"
import ContourBackground from "@/components/ContourBackground"
import ParallaxBackground from "@/components/ParallaxBackground"

// 1. Add this keyframe definition to your global CSS or Tailwind config
// If you are using standard CSS:
/*
@keyframes float {
  0% { transform: translateX(0px) translateY(0px); }
  25% { transform: translateX(2px) translateY(1px); }
  50% { transform: translateX(0px) translateY(3px); }
  75% { transform: translateX(-2px) translateY(1px); }
  100% { transform: translateX(0px) translateY(0px); }
}
*/

const BackgroundLines = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#08261e] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.1]"> {/* Increased opacity slightly for visibility */}
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {[...Array(20)].map((_, i) => {
            // Generate random values for organic movement
            const randomDuration = 15 + Math.random() * 20; // Between 15s and 35s
            const randomDelay = Math.random() * -20; // Start at random point in animation

            return (
              <path
                key={i}
                // I tweaked the Math.sin values here to make the curves longer and more "liquid"
                d={`M-10,${10 + i * 5} Q40,${5 + i * 5 + Math.sin(i * 0.5) * 10} 110,${15 + i * 5}`}
                fill="none"
                stroke="#d4f063" // Using the Lando neon yellow/green for that brand feel, or keep #F7F7F3
                strokeWidth="0.15"
                style={{
                  // This applies the "float" animation defined in your CSS
                  animation: `float ${randomDuration}s ease-in-out infinite`,
                  animationDelay: `${randomDelay}s`,
                  opacity: 0.6 + Math.random() * 0.4, // Randomize opacity slightly for depth
                }}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};



export default function Home() {
  return (
    <HeroAnimationProvider>

      <AnimatePresence>
        <MicroInteractions>
          <ScrollProgress />

          {/* Parallax Background - Moves subtly with cursor */}
          <ParallaxBackground />
          <main data-theme="graded">
            <Hero />
            <Manifesto />
            <OfferingsHorizontal />
            <ToggleCompare />
            <StudentSnapshots />
            <PartnersSection />
            <SocialFan />
            <Footer />
          </main>

        </MicroInteractions>
      </AnimatePresence>
    </HeroAnimationProvider>
  )
}
