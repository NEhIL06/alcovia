"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ArrowUpRight, ArrowDown, CheckCircle2, XCircle, Sparkles } from "lucide-react"

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSct-ZWoKEbSLmI3P59ZUj5bqPMoxJAeP9rt-1US3qBwUtAPgw/viewform"
const GOLD = "#EABF36"
const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)"
const DARK = "#08261e"

// ============================================================
// SECTION 1: HERO
// ============================================================
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.55, 0.8])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: imageScale }}>
        <Image
          src="https://res.cloudinary.com/ds1ka0bap/image/upload/f_auto,q_auto,w_1920/v1769157740/forgebonds_bwekt3"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </motion.div>
      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 z-[1] bg-[#08261e]"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
        style={{ y: contentY }}
      >
        <motion.p
          className="text-xs md:text-sm uppercase tracking-[0.35em] mb-6"
          style={{ color: GOLD }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          For parents who see more
        </motion.p>

        <motion.h1
          className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          School is{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: GOLD_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            not enough.
          </span>
        </motion.h1>

        <motion.p
          className="font-[family-name:var(--font-satoshi)] text-base sm:text-lg md:text-xl text-white/70 max-w-xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Bright teenagers are not automatically real-world ready. At Alcovia, they build judgment, resilience, initiative and real-world confidence.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#0C0C0C] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(234,191,54,0.3)]"
            style={{ background: GOLD_GRADIENT }}
          >
            Book Your Child&apos;s Fit Call
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#problems"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
          >
            See how Alcovia works
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#08261e] to-transparent z-[2]" />
    </section>
  )
}

// ============================================================
// SECTION 2: PROBLEM AMPLIFICATION
// ============================================================
const PROBLEMS = [
  {
    number: "01",
    title: "False readiness",
    body: "Good grades can create the illusion that a teenager is prepared. But the future will reward far more than academic performance. Employers expect 39% of workers\u2019 core skills to change by 2030. Marks do not automatically build judgment, initiative, adaptability or follow-through.",
    image: "https://res.cloudinary.com/ds1ka0bap/image/upload/f_auto,q_auto,w_800/v1769157738/academic_jcknnp",
  },
  {
    number: "02",
    title: "Outdated guidance",
    body: "Traditional career counselling often asks teenagers to choose too early, with too little exposure and too much borrowed ambition. Teenagers do not need generic advice. They need sharper exposure to real work, real professionals and real questions.",
    image: "https://res.cloudinary.com/ds1ka0bap/image/upload/f_auto,q_auto,w_800/v1769157739/counselerMeeting_few0qy",
  },
  {
    number: "03",
    title: "Weak environments",
    body: "Teenagers do not grow in isolation. They are shaped by the norms, expectations and ambitions of the people around them. The right peer group is not a bonus. It is a developmental multiplier.",
    image: "https://res.cloudinary.com/ds1ka0bap/image/upload/f_auto,q_auto,w_800/v1769157739/peertopeer_pkenhd",
  },
]

function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

function ProblemsSection() {
  return (
    <section id="problems" className="relative py-24 md:py-32 px-6 bg-[#08261e]">
      <div className="max-w-5xl mx-auto">
        <FadeInSection className="text-center mb-16 md:mb-24">
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: GOLD }}>
            The real problem
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Why bright teenagers still{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: GOLD_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              get left behind.
            </span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/50 max-w-2xl mx-auto">
            The problem is rarely a lack of talent. More often, it is the wrong preparation, the wrong environment and the wrong use of formative years.
          </p>
        </FadeInSection>

        <div className="space-y-16 md:space-y-24">
          {PROBLEMS.map((p, i) => (
            <FadeInSection key={p.number}>
              <div className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-12 items-center`}>
                {/* Image */}
                <div className="w-full md:w-1/2 relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image src={p.image} alt={p.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08261e]/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block text-5xl md:text-7xl font-black text-white/10 font-[family-name:var(--font-monument)]">
                      {p.number}
                    </span>
                  </div>
                </div>
                {/* Text */}
                <div className="w-full md:w-1/2">
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold text-white mb-4">
                    {p.title}
                  </h3>
                  <p className="text-base text-white/60 leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// SECTION 3: TRANSFORMATION
// ============================================================
const TRANSFORMATIONS = [
  {
    label: "From ideas to execution",
    title: "They stop only consuming ideas. They start building.",
    body: "At Alcovia, teenagers are expected to move from interest to execution. They do projects, make decisions, present work, test ideas and finish what they start.",
    image: "https://res.cloudinary.com/ds1ka0bap/image/upload/f_auto,q_auto,w_800/v1769157739/carrerDiscovery_tijhkf",
  },
  {
    label: "Conviction over conformity",
    title: "They build conviction, not borrowed ambition.",
    body: "Instead of chasing what sounds impressive, they engage with real professionals, real domains and real-world questions until they begin to understand what genuinely fits them.",
    image: "https://res.cloudinary.com/ds1ka0bap/image/upload/f_auto,q_auto,w_800/v1769158280/oneonone_mz0dio",
  },
  {
    label: "Environment as multiplier",
    title: "They grow in a room that raises their standards.",
    body: "The right environment changes what feels normal. Teenagers begin to speak more clearly, think more deeply, attempt more difficult work and expect more from themselves.",
    image: "https://res.cloudinary.com/ds1ka0bap/image/upload/f_auto,q_auto,w_800/v1769157740/forgebonds_bwekt3",
  },
]

function TransformationSection() {
  return (
    <section className="relative py-24 md:py-32 px-6 bg-[#061f18]">
      <div className="max-w-6xl mx-auto">
        <FadeInSection className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: GOLD }}>
            The transformation
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            What changes{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: GOLD_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              inside Alcovia.
            </span>
          </h2>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {TRANSFORMATIONS.map((t, i) => (
            <FadeInSection key={i}>
              <div className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#EABF36]/30 transition-all duration-500">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={t.image} alt={t.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061f18] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full border" style={{ color: GOLD, borderColor: `${GOLD}40` }}>
                      {t.label}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white mb-3 leading-snug">
                    {t.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {t.body}
                  </p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>

      {/* Mid-page CTA */}
      <FadeInSection className="mt-20 text-center">
        <p className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold text-white mb-2">
          If your child has potential,
        </p>
        <p className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold mb-8">
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: GOLD_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            the right environment cannot wait.
          </span>
        </p>
        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#0C0C0C] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(234,191,54,0.3)]"
          style={{ background: GOLD_GRADIENT }}
        >
          Book Your Teen&apos;s Fit Call
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </FadeInSection>
    </section>
  )
}

// ============================================================
// SECTION 4: WHO IT'S FOR / NOT FOR
// ============================================================
const FOR_LIST = [
  "Families who already know that marks, tuition and generic extracurriculars are no longer enough.",
  "Teenagers who are bright, curious and capable, but not yet stretched in the right way.",
  "Teenagers who are doing reasonably well, but need stronger peers and sharper exposure.",
  "Teenagers who have ideas, but need more consistency, challenge and follow-through.",
  "Families looking for a curated, high-expectation environment rather than another class or hobby.",
]

const NOT_FOR_LIST = [
  "Families looking for passive online content.",
  "Formulaic college packaging or admissions coaching.",
  "A generic enrichment programme or another tuition centre.",
]

function AudienceSection() {
  return (
    <section className="relative py-24 md:py-32 px-6 bg-[#08261e]">
      <div className="max-w-5xl mx-auto">
        <FadeInSection className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Alcovia is intentionally{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: GOLD_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              not built for everyone.
            </span>
          </h2>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* FOR */}
          <FadeInSection>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 h-full">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle2 className="w-5 h-5" style={{ color: GOLD }} />
                <h3 className="text-lg font-bold uppercase tracking-wider" style={{ color: GOLD }}>
                  Built for
                </h3>
              </div>
              <ul className="space-y-4">
                {FOR_LIST.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: GOLD }} />
                    <span className="text-sm text-white/70 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>

          {/* NOT FOR */}
          <FadeInSection>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 h-full">
              <div className="flex items-center gap-2 mb-6">
                <XCircle className="w-5 h-5 text-white/30" />
                <h3 className="text-lg font-bold uppercase tracking-wider text-white/30">
                  Probably not the right fit
                </h3>
              </div>
              <ul className="space-y-4">
                {NOT_FOR_LIST.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2 flex-shrink-0" />
                    <span className="text-sm text-white/40 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// SECTION 5: WHY ALCOVIA (3 PILLARS)
// ============================================================
const PILLARS = [
  {
    number: "01",
    title: "Built around the future, not the syllabus",
    body: "Alcovia is designed around the widening gap between school success and future readiness. It responds to a world in which skills are changing quickly and conventional markers of achievement are becoming less reliable.",
    image: "/images/resilience.jpg",
  },
  {
    number: "02",
    title: "Real-world adults, not just academic abstraction",
    body: "Teenagers need access to professionals, entrepreneurs and practitioners whose work helps them understand how the real world functions. Alcovia is built around that exposure.",
    image: "/images/mentorshipmoments.jpeg",
  },
  {
    number: "03",
    title: "Curated cohort and offline rigor",
    body: "The value of Alcovia is not only in what is taught, but in the room itself. Offline discussions, stronger peer expectations and real accountability help teenagers grow in ways screens and passive learning often cannot.",
    image: "/images/peertopeer.jpg",
  },
]

function PillarsSection() {
  return (
    <section className="relative py-24 md:py-32 px-6 bg-[#061f18]">
      <div className="max-w-5xl mx-auto">
        <FadeInSection className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: GOLD }}>
            Why Alcovia can do this
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Exceptional through{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: GOLD_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              stronger formation.
            </span>
          </h2>
        </FadeInSection>

        <div className="space-y-12">
          {PILLARS.map((p, i) => (
            <FadeInSection key={p.number}>
              <div className="flex flex-col md:flex-row gap-6 items-center bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
                <div className="w-full md:w-2/5 relative aspect-[3/2] md:aspect-auto md:h-64 overflow-hidden">
                  <Image src={p.image} alt={p.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" loading="lazy" />
                </div>
                <div className="w-full md:w-3/5 p-6 md:p-8">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] mb-2 block" style={{ color: GOLD }}>
                    Pillar {p.number}
                  </span>
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl font-bold text-white mb-3">
                    {p.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// SECTION 6: SOCIAL PROOF
// ============================================================
const PROOF_CARDS = [
  { quote: "They finish what they start now.", tag: "Real projects" },
  { quote: "The peer group changed everything.", tag: "Curated peer group" },
  { quote: "For the first time, my child is thinking ahead with clarity.", tag: "Mentors from the real world" },
  { quote: "This feels nothing like tuition.", tag: "Offline accountability" },
]

const LOGOS = [
  "bain.png", "mckinsey.png", "flipkart.png", "panasonic.png",
  "noise.png", "nothing.png", "master-union.png", "british-school.png", "vasant-valley.png",
]

function SocialProofSection() {
  return (
    <section className="relative py-24 md:py-32 px-6 bg-[#08261e]">
      <div className="max-w-5xl mx-auto">
        <FadeInSection className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: GOLD }}>
            What families begin to notice
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Better judgment. Stronger{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: GOLD_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              follow-through.
            </span>
          </h2>
        </FadeInSection>

        {/* Proof cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-16">
          {PROOF_CARDS.map((card, i) => (
            <FadeInSection key={i}>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 hover:border-[#EABF36]/20 transition-colors">
                <Sparkles className="w-4 h-4 mb-4" style={{ color: GOLD }} />
                <p className="font-[family-name:var(--font-playfair)] text-lg md:text-xl font-semibold text-white mb-3 italic">
                  &ldquo;{card.quote}&rdquo;
                </p>
                <span className="text-xs uppercase tracking-[0.2em] text-white/30">
                  {card.tag}
                </span>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Logo bar */}
        <FadeInSection>
          <p className="text-center text-xs uppercase tracking-[0.3em] text-white/20 mb-8">
            Our mentors come from
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-40">
            {LOGOS.map((logo) => (
              <div key={logo} className="relative w-16 h-10 md:w-20 md:h-12">
                <Image
                  src={`/images/logos/${logo}`}
                  alt={logo.replace(".png", "")}
                  fill
                  className="object-contain brightness-0 invert"
                  sizes="80px"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}

// ============================================================
// SECTION 7: CLOSING CTA
// ============================================================
function ClosingCTASection() {
  return (
    <section className="relative py-24 md:py-32 px-6 bg-[#061f18] overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${GOLD}08 0%, transparent 70%)` }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <FadeInSection>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            The future will not ask your teenager for{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: GOLD_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              marks alone.
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
            It will ask for judgment, initiative, communication, resilience and clarity. The earlier these are built, the more naturally they become part of who your teenager is.
          </p>

          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-10 py-5 text-sm font-bold uppercase tracking-wider text-[#0C0C0C] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(234,191,54,0.3)]"
            style={{ background: GOLD_GRADIENT }}
          >
            Book Your Child&apos;s Alcovia Fit Call
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <p className="mt-6 text-xs text-white/30 max-w-md mx-auto">
            For families who want to understand whether Alcovia is the right ecosystem, not just another programme.
          </p>
        </FadeInSection>
      </div>
    </section>
  )
}

// ============================================================
// FIXED ELEMENTS: NAVBAR + MOBILE CTA
// ============================================================
function LPNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 py-3 bg-[#08261e]/80 backdrop-blur-lg border-b border-white/5">
      <a href="/" className="flex items-center gap-2">
        <Image src="/images/alcovia-logo-navbar.png" alt="Alcovia" width={28} height={28} className="object-contain" />
        <span className="font-[family-name:var(--font-monument)] text-sm font-bold text-white tracking-tight uppercase">
          Alcovia
        </span>
      </a>
      <a
        href={FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-[#0C0C0C] transition-all hover:scale-105"
        style={{ background: GOLD_GRADIENT }}
      >
        Book a Fit Call
        <ArrowUpRight className="w-3 h-3" />
      </a>
    </nav>
  )
}

function MobileFloatingCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] md:hidden p-3 bg-gradient-to-t from-[#08261e] via-[#08261e]/95 to-transparent">
      <a
        href={FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full rounded-full py-4 text-sm font-bold uppercase tracking-wider text-[#0C0C0C]"
        style={{ background: GOLD_GRADIENT }}
      >
        Book a Fit Call
        <ArrowUpRight className="w-4 h-4" />
      </a>
    </div>
  )
}

// ============================================================
// FOOTER (MINIMAL)
// ============================================================
function LPFooter() {
  return (
    <footer className="bg-[#040f0b] py-12 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Image src="/images/alcovia-logo-navbar.png" alt="Alcovia" width={24} height={24} />
            <span className="text-sm text-white/40">Alcovia Life</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-white/20">
            <a href="/Legal/Privacy-policy" className="hover:text-white/50 transition-colors">Privacy Policy</a>
            <a href="/Legal/terms-and-conditions" className="hover:text-white/50 transition-colors">Terms</a>
            <a href="/contact" className="hover:text-white/50 transition-colors">Contact</a>
          </div>
        </div>
        {/* Sources */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-[10px] text-white/15 leading-relaxed">
            Sources: World Economic Forum, Future of Jobs Report 2025. OECD, The State of Global Teenage Career Preparedness, 2025. World Health Organization, Mental Health of Adolescents, 2025.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ============================================================
// MAIN PAGE EXPORT
// ============================================================
export default function LandingPage() {
  return (
    <>
      <LPNavbar />
      <main>
        <HeroSection />
        <ProblemsSection />
        <TransformationSection />
        <AudienceSection />
        <PillarsSection />
        <SocialProofSection />
        <ClosingCTASection />
      </main>
      <LPFooter />
      <MobileFloatingCTA />
    </>
  )
}
