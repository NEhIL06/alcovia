"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, ArrowDown, CheckCircle2, XCircle, Sparkles } from "lucide-react"
import { useRegistrationModal } from "@/context/registration-modal-context"
const GOLD = "#EABF36"
const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)"
const GOLD_TEXT_STYLE = { backgroundImage: GOLD_GRADIENT, WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent" }

function GoldText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`bg-clip-text text-transparent ${className}`} style={GOLD_TEXT_STYLE}>{children}</span>
}

function CTAButton({ children, size = "md" }: { children: React.ReactNode; size?: "sm" | "md" | "lg" }) {
  const { openModal } = useRegistrationModal()
  const sizes = { sm: "px-5 py-2 text-[11px]", md: "px-8 py-4 text-sm", lg: "px-10 py-5 text-sm" }
  return (
    <button
      onClick={openModal}
      className={`inline-flex items-center gap-2 rounded-full font-bold uppercase tracking-wider text-[#0C0C0C] cursor-pointer transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(234,191,54,0.3)] ${sizes[size]}`}
      style={{ background: GOLD_GRADIENT }}
    >
      {children}
      <ArrowUpRight className="w-4 h-4" />
    </button>
  )
}

function SectionHeader({ subtitle, text, highlight }: { subtitle?: string; text: string; highlight: string }) {
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {subtitle && (
        <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: GOLD }}>{subtitle}</p>
      )}
      <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
        {text}{" "}<GoldText>{highlight}</GoldText>
      </h2>
    </motion.div>
  )
}

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

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
          src="/images/lp/hero.jpg"
          alt="Alcovia classroom"
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
          <GoldText>not enough.</GoldText>
        </motion.h1>

        <motion.p
          className="font-[family-name:var(--font-satoshi)] text-base sm:text-lg md:text-xl text-white/70 max-w-xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          School success and future success are no longer the same thing. At Alcovia, teenagers build judgment, resilience, initiative and real-world confidence through challenge, mentorship and a stronger peer environment.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <CTAButton>Book Your Child&apos;s Fit Call</CTAButton>
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
    image: "/images/lp/false-readiness.jpg",
  },
  {
    number: "02",
    title: "Outdated guidance",
    body: "Traditional career counselling often asks teenagers to choose too early, with too little exposure and too much borrowed ambition. OECD analysis shows that career uncertainty among teenagers remains high and that students with clearer career thinking tend to fare better later. Teenagers do not need generic advice. They need sharper exposure to real work, real professionals and real questions.",
    image: "/images/lp/outdated-guidance.jpg",
  },
  {
    number: "03",
    title: "Weak environments",
    body: "Teenagers do not grow in isolation. They are shaped by the norms, expectations and ambitions of the people around them. The World Health Organization notes that adolescence is a critical developmental stage and that pressure to conform with peers can be a significant source of stress. The right peer group is not a bonus. It is a developmental multiplier.",
    image: "/images/lp/weak-environments.jpg",
  },
]


function ProblemsSection() {
  return (
    <section id="problems" className="relative py-24 md:py-32 px-6 bg-[#08261e]">
      <div className="max-w-5xl mx-auto">
        <SectionHeader subtitle="The real problem" text="Why bright teenagers still" highlight="get left behind." />
        <FadeIn className="text-center -mt-10 mb-16 md:mb-24">
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            The problem is rarely a lack of talent. More often, it is the wrong preparation, the wrong environment and the wrong use of formative years.
          </p>
        </FadeIn>

        <div className="space-y-16 md:space-y-24">
          {PROBLEMS.map((p, i) => (
            <FadeIn key={p.number}>
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
            </FadeIn>
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
    image: "/images/lp/ideas-to-execution.jpg",
  },
  {
    label: "Conviction over conformity",
    title: "They build conviction, not borrowed ambition.",
    body: "Instead of chasing what sounds impressive, they engage with real professionals, real domains and real-world questions until they begin to understand what genuinely fits them.",
    image: "/images/lp/conviction.jpg",
  },
  {
    label: "Environment as multiplier",
    title: "They grow in a room that raises their standards.",
    body: "The right environment changes what feels normal. Teenagers begin to speak more clearly, think more deeply, attempt more difficult work and expect more from themselves.",
    image: "/images/lp/environment.jpg",
  },
]

function TransformationSection() {
  return (
    <section className="relative py-24 md:py-32 px-6 bg-[#061f18]">
      <div className="max-w-6xl mx-auto">
        <SectionHeader subtitle="The transformation" text="What changes" highlight="inside Alcovia." />
        <FadeIn className="text-center -mt-10 mb-16">
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            Alcovia is built to change how a teenager thinks, works, chooses and grows.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {TRANSFORMATIONS.map((t, i) => (
            <FadeIn key={i}>
              <div className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#EABF36]/30 transition-all duration-500">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={t.image} alt={t.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061f18] via-[#061f18]/40 to-[#061f18]/30" />
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
                  <p className="text-sm text-white/60 leading-relaxed">
                    {t.body}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Mid-page CTA */}
      <FadeIn className="mt-20 text-center">
        <p className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold text-white mb-2">
          If your child has potential,
        </p>
        <p className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold mb-8">
          <GoldText>the right environment cannot wait.</GoldText>
        </p>
        <CTAButton>Book Your Teen&apos;s Fit Call</CTAButton>
      </FadeIn>
    </section>
  )
}

// ============================================================
// SECTION 4: WHO IT'S FOR / NOT FOR
// ============================================================
const FOR_LIST = [
  "Families who already know that marks, tuition and generic extracurriculars are no longer enough.",
  "Teenagers who are bright, curious and capable, but not yet stretched in the right way.",
  "Teenagers who are doing reasonably well, but need stronger peers, sharper exposure and greater real-world confidence.",
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
        <SectionHeader text="Alcovia is intentionally" highlight="not built for everyone." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* FOR */}
          <FadeIn>
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
          </FadeIn>

          {/* NOT FOR */}
          <FadeIn>
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
          </FadeIn>
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
    image: "/images/lp/future.jpg",
  },
  {
    number: "02",
    title: "Real-world adults, not just academic abstraction",
    body: "Teenagers need access to professionals, entrepreneurs and practitioners whose work helps them understand how the real world functions. Alcovia is built around that exposure.",
    image: "/images/lp/mentorship.jpg",
  },
  {
    number: "03",
    title: "Curated cohort and offline rigor",
    body: "The value of Alcovia is not only in what is taught, but in the room itself. Offline discussions, stronger peer expectations and real accountability help teenagers grow in ways screens and passive learning often cannot.",
    image: "/images/lp/cohort.jpg",
  },
]

function PillarsSection() {
  return (
    <section className="relative py-24 md:py-32 px-6 bg-[#061f18]">
      <div className="max-w-5xl mx-auto">
        <SectionHeader subtitle="Why Alcovia can do this" text="Exceptional through" highlight="stronger formation." />
        <FadeIn className="text-center -mt-10 mb-16">
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            Because teenagers do not become exceptional through information alone. They become exceptional through stronger formation.
          </p>
        </FadeIn>

        <div className="space-y-12">
          {PILLARS.map((p, i) => (
            <FadeIn key={p.number}>
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
                  <p className="text-sm text-white/60 leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </div>
            </FadeIn>
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
        <SectionHeader subtitle="What families begin to notice" text="Better judgment. Stronger" highlight="follow-through." />
        <FadeIn className="text-center -mt-10 mb-16">
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            Not just more activity. Better judgment, stronger follow-through, sharper peer influence and clearer intent.
          </p>
        </FadeIn>

        {/* Proof cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-16">
          {PROOF_CARDS.map((card, i) => (
            <FadeIn key={i}>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 hover:border-[#EABF36]/20 transition-colors">
                <Sparkles className="w-4 h-4 mb-4" style={{ color: GOLD }} />
                <p className="font-[family-name:var(--font-playfair)] text-lg md:text-xl font-semibold text-white mb-3 italic">
                  &ldquo;{card.quote}&rdquo;
                </p>
                <span className="text-xs uppercase tracking-[0.2em] text-white/30">
                  {card.tag}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Logo bar */}
        <FadeIn>
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
        </FadeIn>
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
        <FadeIn>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            The future will not ask your teenager for{" "}
            <GoldText>marks alone.</GoldText>
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
            It will ask for judgment, initiative, communication, resilience and clarity. The earlier these are built, the more naturally they become part of who your teenager is.
          </p>

          <CTAButton size="lg">Book Your Child&apos;s Alcovia Fit Call</CTAButton>

          <p className="mt-6 text-xs text-white/30 max-w-md mx-auto">
            For families who want to understand whether Alcovia is the right ecosystem, not just another programme.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

// ============================================================
// FIXED ELEMENTS: NAVBAR + MOBILE CTA
// ============================================================
function LPNavbar() {
  const { openModal } = useRegistrationModal()
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 py-3 bg-[#08261e]/80 backdrop-blur-lg border-b border-white/5">
      <a href="/" className="flex items-center">
        <Image src="/images/alcovia-logo-white.png" alt="Alcovia" width={120} height={39} className="object-contain h-[30px] w-auto" />
      </a>
      <button
        onClick={openModal}
        className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-[#0C0C0C] cursor-pointer transition-all hover:scale-105"
        style={{ background: GOLD_GRADIENT }}
      >
        Book a Fit Call
        <ArrowUpRight className="w-3 h-3" />
      </button>
    </nav>
  )
}

function MobileFloatingCTA() {
  const { openModal } = useRegistrationModal()
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] md:hidden p-3 bg-gradient-to-t from-[#08261e] via-[#08261e]/95 to-transparent">
      <button
        onClick={openModal}
        className="flex items-center justify-center gap-2 w-full rounded-full py-4 text-sm font-bold uppercase tracking-wider text-[#0C0C0C] cursor-pointer"
        style={{ background: GOLD_GRADIENT }}
      >
        Book a Fit Call
        <ArrowUpRight className="w-4 h-4" />
      </button>
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
          <div className="flex items-center">
            <Image src="/images/alcovia-logo-white.png" alt="Alcovia" width={100} height={32} className="object-contain h-[26px] w-auto opacity-40" />
          </div>
          <div className="flex items-center gap-6 text-xs text-white/20">
            <a href="/Legal/Privacy-policy" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="/Legal/terms-and-conditions" className="hover:text-white/60 transition-colors">Terms</a>
            <a href="/contact" className="hover:text-white/60 transition-colors">Contact</a>
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
