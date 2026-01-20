"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { AnimatePresence } from "framer-motion"
import { HeroAnimationProvider } from "@/context/hero-animation-context"

import ScrollProgress from "@/components/scroll-progress"
import Hero from "@/components/hero"
import Manifesto from "@/components/manifesto"
import OfferingsHorizontal from "@/components/offerings-horizontal"
import MicroInteractions from "@/components/micro-interactions"
import ParallaxBackground from "@/components/ParallaxBackground"

// Lazy load below-the-fold components for better initial page load
const ToggleCompare = dynamic(() => import("@/components/toggle-compare"), {
  loading: () => <div className="min-h-screen" />,
  ssr: true,
})

const StudentSnapshots = dynamic(() => import("@/components/student-snapshots"), {
  ssr: true,
})

const PartnersSection = dynamic(() => import("@/components/partners-section"), {
  ssr: true,
})

const SocialFan = dynamic(() => import("@/components/social-fan"), {
  ssr: true,
})

const Footer = dynamic(() => import("@/components/footer"), {
  ssr: true,
})

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
            <Suspense fallback={<div className="min-h-screen" />}>
              <ToggleCompare />
            </Suspense>
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
