"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { HeroAnimationProvider } from "@/context/hero-animation-context"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

import ScrollProgress from "@/components/scroll-progress"
import Hero from "@/components/hero"
import Manifesto from "@/components/manifesto"
import OfferingsHorizontal from "@/components/offerings-horizontal"
import MicroInteractions from "@/components/micro-interactions"
import ParallaxBackground from "@/components/ParallaxBackground"
import SmoothScrollProvider from "@/components/smooth-scroll-provider"

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

const Footer = dynamic(() => import("@/components/footer"), {
  ssr: true,
})

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSct-ZWoKEbSLmI3P59ZUj5bqPMoxJAeP9rt-1US3qBwUtAPgw/viewform"

const LP_MANIFESTO_LINES = [
  { text: "WHY BRIGHT TEENAGERS", isSpacerAfter: false },
  { text: "STILL GET LEFT BEHIND.", isSpacerAfter: true },
  { text: "THE PROBLEM IS RARELY", isSpacerAfter: false },
  { text: "A LACK OF TALENT.", isSpacerAfter: true },
  { text: "IT IS THE WRONG PREPARATION,", isSpacerAfter: false },
  { text: "THE WRONG ENVIRONMENT,", isSpacerAfter: false },
  { text: "AND THE WRONG USE", isSpacerAfter: false },
  { text: "OF FORMATIVE YEARS.", isSpacerAfter: true },
  { text: "1. FALSE READINESS.", isSpacerAfter: false },
  { text: "2. OUTDATED GUIDANCE.", isSpacerAfter: false },
  { text: "3. WEAK ENVIRONMENTS.", isSpacerAfter: true },
  { text: "AT ALCOVIA,", isSpacerAfter: false },
  { text: "WE BUILD JUDGMENT,", isSpacerAfter: false },
  { text: "INITIATIVE, AND", isSpacerAfter: false },
  { text: "REAL-WORLD CONFIDENCE.", isSpacerAfter: false },
]

const LP_MANIFESTO_ACCENTS = ["TALENT.", "READINESS.", "GUIDANCE.", "ENVIRONMENTS.", "JUDGMENT,", "INITIATIVE,", "CONFIDENCE."]

const LP_OFFERINGS = [
  {
    id: "01",
    label: "FROM IDEAS TO EXECUTION",
    title: "They stop only consuming ideas. They start building.",
    description: "At Alcovia, teenagers are expected to move from interest to execution. They do projects, make decisions, present work, test ideas and finish what they start.",
    image: "https://res.cloudinary.com/ds1ka0bap/image/upload/f_auto,q_auto,w_800/v1769157739/carrerDiscovery_tijhkf",
  },
  {
    id: "02",
    label: "CONVICTION OVER CONFORMITY",
    title: "They build conviction, not borrowed ambition.",
    description: "Instead of chasing what sounds impressive, they engage with real professionals, real domains and real-world questions until they begin to understand what genuinely fits them.",
    image: "https://res.cloudinary.com/ds1ka0bap/image/upload/f_auto,q_auto,w_800/v1769158280/oneonone_mz0dio",
  },
  {
    id: "03",
    label: "ENVIRONMENT AS MULTIPLIER",
    title: "They grow in a room that raises their standards.",
    description: "The right environment changes what feels normal. Teenagers begin to speak more clearly, think more deeply, attempt more difficult work and expect more from themselves.",
    image: "https://res.cloudinary.com/ds1ka0bap/image/upload/f_auto,q_auto,w_800/v1769157740/forgebonds_bwekt3",
  },
]

const LP_TOGGLE_SECTIONS = [
  {
    id: "who-its-for",
    topText: "WHO IT'S",
    bottomText: "FOR",
    descriptionLines: [
      { text: "For families who know" },
      { text: "marks and tuition are" },
      { text: "no longer enough." }
    ],
    image: "/images/atschool.png",
  },
  {
    id: "why-alcovia",
    topText: "WHY",
    bottomText: "ALCOVIA",
    descriptionLines: [
      { text: "Built around the future," },
      { text: "not the syllabus." },
      { text: "Real-world formation." }
    ],
    image: "/images/outsideschool.png",
  },
]

function LPNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-md border-b border-black/5">
      <a href="/" className="flex items-center gap-2">
        <Image
          src="/images/alcovia-logo-navbar.png"
          alt="Alcovia"
          width={32}
          height={32}
          className="object-contain"
        />
        <span className="font-[family-name:var(--font-milan)] text-lg font-bold text-[#0C0C0C] tracking-tight">
          ALCOVIA
        </span>
      </a>
      <a
        href={GOOGLE_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 rounded-full border-2 border-[#0C0C0C] px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#0C0C0C] transition-all hover:bg-[#0C0C0C] hover:text-white"
      >
        Book a Fit Call
        <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </nav>
  )
}

function MidPageCTA() {
  return (
    <section className="relative py-20 px-6 text-center">
      <div className="mx-auto max-w-2xl">
        <p className="font-[family-name:var(--font-milan)] text-sm uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
          Your child has potential
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl font-bold text-[#F7F7F3] mb-6">
          The right environment <span className="text-[#EABF36]">cannot wait.</span>
        </h2>
        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#EABF36] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#0C0C0C] transition-all hover:scale-105 hover:shadow-lg"
        >
          Book Your Child&apos;s Alcovia Fit Call
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}

function MobileFloatingCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] md:hidden p-3 bg-gradient-to-t from-black/80 to-transparent">
      <a
        href={GOOGLE_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full rounded-full bg-[#EABF36] py-4 text-sm font-bold uppercase tracking-wider text-[#0C0C0C]"
      >
        Book a Fit Call
        <ArrowUpRight className="w-4 h-4" />
      </a>
    </div>
  )
}

export default function LandingPage() {
  return (
    <SmoothScrollProvider>
      <HeroAnimationProvider>
        <AnimatePresence>
          <MicroInteractions>
            <ScrollProgress />
            <ParallaxBackground />
            <LPNavbar />
            <main className="pt-0">
              <Hero
                taglineLines={[
                  <>For parents who know <span className="text-[#EABF36]">school</span></>,
                  <>is not enough.</>
                ]}
                desktopTagline={
                  <>
                    <p className="text-[#0C0C0C] font-[family-name:var(--font-milan)] text-xl leading-relaxed tracking-tight max-w-[250px]">For parents who know</p>
                    <p className="text-[#EABF36] font-[family-name:var(--font-milan)] text-2xl font-semibold leading-relaxed tracking-tight max-w-[250px]">school is not enough.</p>
                    <p className="text-[#0C0C0C]/60 font-[family-name:var(--font-milan)] text-sm leading-relaxed tracking-tight max-w-[250px] mt-2">Bright teenagers are not automatically real-world ready.</p>
                  </>
                }
                marquee1={"JUDGMENT \u2022 RESILIENCE \u2022 INITIATIVE \u2022 REAL-WORLD CONFIDENCE \u2022 CHALLENGE \u2022 MENTORSHIP \u2022 STRONGER PEER ENVIRONMENT \u2022 ".repeat(3)}
                marquee2={"SCHOOL SUCCESS IS NOT FUTURE SUCCESS \u2022 THE RIGHT ENVIRONMENT CHANGES EVERYTHING \u2022 BUILD JUDGMENT NOT JUST GRADES \u2022 ".repeat(3)}
                ctaText="Book Your Child's Fit Call"
                ctaLink={GOOGLE_FORM_URL}
              />
              <div id="problem">
                <Manifesto
                  lines={LP_MANIFESTO_LINES}
                  accents={LP_MANIFESTO_ACCENTS}
                />
              </div>
              <MidPageCTA />
              <OfferingsHorizontal
                offerings={LP_OFFERINGS}
                subLabel="The Transformation"
                sectionTitle={["What changes", "inside Alcovia."]}
                closingQuote={['"If your child has potential,', "the right environment", 'cannot wait."']}
              />
              <Suspense fallback={<div className="min-h-screen" />}>
                <ToggleCompare
                  data={LP_TOGGLE_SECTIONS}
                  sectionHeader="Built for the Right"
                  headerAccent="Families"
                />
              </Suspense>
              <StudentSnapshots />
              <PartnersSection />
              <Footer />
            </main>
            <MobileFloatingCTA />
          </MicroInteractions>
        </AnimatePresence>
      </HeroAnimationProvider>
    </SmoothScrollProvider>
  )
}
