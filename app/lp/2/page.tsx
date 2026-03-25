"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, ArrowDown, CheckCircle2, XCircle } from "lucide-react"
import { useRegistrationModal } from "@/context/registration-modal-context"
import type { LPContent } from "@/lib/lp-content-types"

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
      onClick={() => openModal("lp_cta_button")}
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
      className="text-center mb-8 md:mb-14"
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

const PROBLEM_IMAGES = ["/images/lp/false-readiness.jpg", "/images/lp/outdated-guidance.jpg", "/images/lp/weak-environments.jpg"]
const TRANSFORM_IMAGES = ["/images/lp/ideas-to-execution.jpg", "/images/lp/conviction-alt.jpg", "/images/lp/environment.jpg"]
const PILLAR_IMAGES = ["/images/lp/future.jpg", "/images/lp/mentorship.jpg", "/images/lp/cohort.jpg"]

function HeroSection({ hero }: { hero: LPContent["hero"] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.78, 0.92])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[580px] sm:min-h-[700px] flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ scale: imageScale }}>
        <Image src="/images/lp/hero.jpg" alt="Alcovia mentorship session" fill className="object-cover object-[center_40%]" priority />
      </motion.div>
      <motion.div className="absolute inset-0 z-[1] bg-[#08261e]" style={{ opacity: overlayOpacity }} />

      <motion.div className="relative z-10 max-w-3xl mx-auto px-6 pt-24 md:pt-32 text-center" style={{ y: contentY }}>
        <motion.p className="text-xs md:text-sm uppercase tracking-[0.35em] mb-6 leading-relaxed" style={{ color: GOLD }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
          {hero.subtitle}
        </motion.p>

        <motion.h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}>
          {hero.headline}{" "}<GoldText>{hero.highlight}</GoldText>
        </motion.h1>

        <motion.p className="font-[family-name:var(--font-satoshi)] text-sm sm:text-base md:text-lg text-white/70 max-w-xl mx-auto mb-6 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}>
          {hero.body}
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}>
          <CTAButton>{hero.primaryCta}</CTAButton>
          <a href="#problems" className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors">
            {hero.secondaryCta}
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#08261e] to-transparent z-[2]" />
    </section>
  )
}

function ProblemsSection({ problems }: { problems: LPContent["problems"] }) {
  return (
    <section id="problems" className="relative py-14 md:py-24 px-6 bg-[#08261e]">
      <div className="max-w-5xl mx-auto">
        <SectionHeader subtitle="The real problem" text={problems.heading} highlight={problems.headingHighlight} />
        <FadeIn className="text-center -mt-6 mb-8 md:mb-14">
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">{problems.intro}</p>
        </FadeIn>

        <div className="space-y-10 md:space-y-16">
          {problems.items.map((p, i) => (
            <FadeIn key={i}>
              <div className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-12 items-center`}>
                <div className="w-full md:w-1/2 relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image src={PROBLEM_IMAGES[i] || PROBLEM_IMAGES[0]} alt={p.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08261e]/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block text-5xl md:text-7xl font-black text-white/10 font-[family-name:var(--font-monument)]">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold text-white mb-4">{p.title}</h3>
                  <p className="text-base text-white/60 leading-relaxed">{p.body}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {problems.bridgeLine && (
          <FadeIn className="text-center mt-10">
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto italic">{problems.bridgeLine}</p>
          </FadeIn>
        )}
      </div>
    </section>
  )
}

function TransformationSection({ transformation }: { transformation: LPContent["transformation"] }) {
  return (
    <section className="relative py-14 md:py-24 px-6 bg-[#061f18]">
      <div className="max-w-6xl mx-auto">
        <SectionHeader subtitle="The transformation" text={transformation.heading} highlight={transformation.headingHighlight} />
        <FadeIn className="text-center -mt-6 mb-8">
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">{transformation.intro}</p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {transformation.items.map((t, i) => (
            <FadeIn key={i}>
              <div className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#EABF36]/30 transition-all duration-500">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={TRANSFORM_IMAGES[i] || TRANSFORM_IMAGES[0]} alt={t.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" />
                  <div className="absolute inset-0 bg-[#061f18]/50" />
                </div>
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white mb-3 leading-snug">{t.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{t.body}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <FadeIn className="mt-10 text-center">
        <CTAButton>{transformation.midCta}</CTAButton>
      </FadeIn>
    </section>
  )
}

function AudienceSection({ audience }: { audience: LPContent["audience"] }) {
  return (
    <section className="relative py-14 md:py-24 px-6 bg-[#08261e]">
      <div className="max-w-5xl mx-auto">
        <SectionHeader text="Who this is" highlight="for." />

        <FadeIn className="mb-8">
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto text-center mb-8">{audience.intro}</p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-5 h-5" style={{ color: GOLD }} />
              <h3 className="text-lg font-bold uppercase tracking-wider" style={{ color: GOLD }}>Built for</h3>
            </div>
            <ul className="space-y-4">
              {audience.forList.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: GOLD }} />
                  <span className="text-sm text-white/70 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-5 h-5 text-white/30" />
              <h3 className="text-lg font-bold uppercase tracking-wider text-white/30">Probably not the right fit</h3>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">{audience.gatekeepingLine}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function PillarsSection({ authority }: { authority: LPContent["authority"] }) {
  return (
    <section className="relative py-14 md:py-24 px-6 bg-[#061f18]">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-8 md:mb-12">
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: GOLD }}>{authority.label}</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight max-w-3xl mx-auto">
            {authority.intro}
          </h2>
        </FadeIn>

        <div className="space-y-6 md:space-y-10">
          {authority.pillars.map((p, i) => (
            <FadeIn key={i}>
              <div className="flex flex-col md:flex-row gap-6 items-center bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
                <div className="w-full md:w-2/5 relative aspect-[3/2] md:aspect-auto md:h-64 overflow-hidden">
                  <Image src={PILLAR_IMAGES[i] || PILLAR_IMAGES[0]} alt={p.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" loading="lazy" />
                </div>
                <div className="w-full md:w-3/5 p-6 md:p-8">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] mb-2 block" style={{ color: GOLD }}>Pillar {String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl font-bold text-white mb-3">{p.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{p.body}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function SocialProofSection({ socialProof }: { socialProof: LPContent["socialProof"] }) {
  return (
    <section className="relative py-14 md:py-24 px-6 bg-[#08261e]">
      <div className="max-w-5xl mx-auto">
        <SectionHeader subtitle="What families begin to notice" text={socialProof.heading} highlight={socialProof.headingHighlight} />
        <FadeIn className="text-center -mt-6 mb-8">
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">{socialProof.intro}</p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-10">
          {socialProof.prompts.map((prompt, i) => (
            <FadeIn key={i}>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 hover:border-[#EABF36]/20 transition-colors">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mb-4" style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}30` }}>
                  <span className="text-xs font-bold" style={{ color: GOLD }}>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="font-[family-name:var(--font-playfair)] text-lg md:text-xl font-semibold text-white leading-snug">{prompt}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <LogoCarousel />
      </div>
    </section>
  )
}

function ClosingCTASection({ closing }: { closing: LPContent["closing"] }) {
  return (
    <section className="relative py-14 md:py-24 px-6 bg-[#061f18] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${GOLD}08 0%, transparent 70%)` }} />

      <div className="relative max-w-3xl mx-auto text-center">
        <FadeIn>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            {closing.headline}{" "}<GoldText>{closing.headlineHighlight}</GoldText>
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">{closing.body}</p>
          <CTAButton size="lg">{closing.primaryCta}</CTAButton>
          <p className="mt-6 text-xs text-white/30 max-w-md mx-auto">{closing.finePrint}</p>
        </FadeIn>
      </div>
    </section>
  )
}

const EXPERIENCE_LOGOS = [
  { name: "Flipkart", src: "/images/logos/flipkart.png" },
  { name: "Panasonic", src: "/images/logos/panasonic.png" },
  { name: "Noise", src: "/images/logos/noise.png" },
  { name: "Nothing", src: "/images/logos/nothing.png" },
  { name: "Masters Union", src: "/images/logos/master-union.png" },
  { name: "Bain", src: "/images/logos/bain.png" },
  { name: "McKinsey", src: "/images/logos/mckinsey.png" },
  { name: "British School", src: "/images/logos/british-school.png" },
  { name: "Vasant Valley", src: "/images/logos/vasant-valley.png" },
]

function LogoCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollPosRef = useRef(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    let raf: number
    const animate = () => {
      if (!isPaused && container) {
        const oneThird = container.scrollWidth / 3
        if (scrollPosRef.current === 0) { scrollPosRef.current = oneThird; container.scrollLeft = oneThird }
        scrollPosRef.current += 0.8
        if (scrollPosRef.current >= oneThird * 2) { scrollPosRef.current = oneThird; container.scrollLeft = oneThird }
        else { container.scrollLeft = scrollPosRef.current }
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [isPaused])

  return (
    <FadeIn>
      <p className="text-center font-mono text-xs uppercase tracking-widest text-white/20 mb-8">Experienced Folks Who Have Worked In</p>
      <div className="relative w-full overflow-hidden">
        <div ref={scrollRef} className="flex gap-4 md:gap-6 items-center overflow-hidden px-4" style={{ msOverflowStyle: "none", scrollbarWidth: "none" }} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onTouchStart={() => setIsPaused(true)} onTouchEnd={() => setIsPaused(false)}>
          {[...EXPERIENCE_LOGOS, ...EXPERIENCE_LOGOS, ...EXPERIENCE_LOGOS].map((logo, i) => (
            <div key={i} className="flex-shrink-0 opacity-50 hover:opacity-80 transition-opacity duration-300">
              <Image src={logo.src} alt={logo.name} width={200} height={100} className="h-8 sm:h-10 md:h-14 w-auto object-contain min-w-[60px] sm:min-w-[80px] brightness-0 invert" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}

function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && videoRef.current) { videoRef.current.src = "/videos/download.mp4"; videoRef.current.load(); observer.disconnect() } }, { rootMargin: "300px" })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <section ref={sectionRef} className="relative w-full bg-[#061f18]">
      <video ref={videoRef} className="w-full aspect-[21/9] md:aspect-[21/9] object-cover" autoPlay muted loop playsInline preload="none" />
    </section>
  )
}

function LPNavbar() {
  const { openModal } = useRegistrationModal()
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 py-1 bg-[#08261e]/80 backdrop-blur-lg border-b border-white/5">
      <a href="/" className="flex items-center -my-5">
        <Image src="/alcovia_logo_dark.png" alt="Alcovia" width={160} height={133} className="object-contain h-[100px] w-auto" priority />
      </a>
      <button onClick={() => openModal("lp_navbar")} className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-[#0C0C0C] cursor-pointer transition-all hover:scale-105" style={{ background: GOLD_GRADIENT }}>
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
      <button onClick={() => openModal("lp_mobile_floating")} className="flex items-center justify-center gap-2 w-full rounded-full py-4 text-sm font-bold uppercase tracking-wider text-[#0C0C0C] cursor-pointer" style={{ background: GOLD_GRADIENT }}>
        Book a Fit Call
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>
  )
}

function LPFooter() {
  return (
    <footer className="bg-[#040f0b] py-12 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center">
            <Image src="/alcovia_logo_dark.png" alt="Alcovia" width={120} height={100} className="object-contain h-[50px] w-auto opacity-40" />
          </div>
          <div className="flex items-center gap-6 text-xs text-white/20">
            <a href="/Legal/Privacy-policy" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="/Legal/terms-and-conditions" className="hover:text-white/60 transition-colors">Terms</a>
            <a href="/contact" className="hover:text-white/60 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

const content: LPContent = {
  hero: {
    subtitle: "For parents who know college admissions strategy is not equal to future readiness",
    headline: "Preparing for top universities is not the same as",
    highlight: "preparing for the future.",
    body: "Old-school career and college counselling can help teenagers look polished on paper. Alcovia helps them build something far more valuable. Real clarity, real exposure, and a stronger understanding of the world they will actually enter.",
    primaryCta: "Give your teen real clarity- here’s how",
    secondaryCta: "Meet the professionals your teen will work with"
  },
  problems: {
    heading: "Why the old playbook",
    headingHighlight: "no longer works",
    intro: "Most career guidance asks teenagers to choose early, with too little context and too much anxiety. That may have worked in a more predictable world. It does not work now.",
    items: [
      {
        title: "College strategy is not career clarity.",
        body: "A strong application may help a teenager get into a university. It does not help them understand what kind of work, environment, or future actually fits them."
      },
      {
        title: "Outdated advice creates false confidence.",
        body: "Many teenagers are still being prepared for careers that will not exist in 5 years."
      },
      {
        title: "Too many choices are made without real exposure.",
        body: "Teenagers are pushed to decide before they have seen enough of how real professionals think, work, and build."
      }
    ],
    bridgeLine: "Real clarity comes from learning how tech and AI is changing the career landscape."
  },
  transformation: {
    heading: "What Alcovia",
    headingHighlight: "does differently",
    intro: "At Alcovia, teenagers do not just receive advice. They engage with the professionals and experts early enough to make better decisions later.",
    items: [
      {
        title: "They explore real work with real professionals.",
        body: "Teenagers get direct access to people who have actually built careers, companies, and expertise."
      },
      {
        title: "They build clarity through exposure.",
        body: "Instead of choosing blindly, they begin to understand what energises them, what kind of problems they enjoy, and what kind of future feels worth building."
      },
      {
        title: "They grow beyond marks and memory.",
        body: "They develop leadership, resilience, and stronger judgment- the qualities the real world rewards long after admissions season ends."
      }
    ],
    midCta: "What does 2035-ready preparation actually look like?"
  },
  audience: {
    intro: "Alcovia is for families who do not want their teenager to make important career decisions based only on marks, prestige, or outdated advice.",
    forList: [
      "thoughtful teenagers who need more than generic college counselling",
      "students who are bright but still unsure what they genuinely want to build",
      "families who value real exposure over formulaic profile-building",
      "teenagers who would benefit from stronger direction, sharper questions, and real-world context"
    ],
    gatekeepingLine: "This is not a shortcut to college admissions. It is for families who want deeper clarity before bigger decisions are made."
  },
  authority: {
    label: "Why Alcovia works",
    intro: "Because conviction is not built through brochures or borrowed ambition. It is built through proximity to the real world.",
    pillars: [
      {
        title: "Real professionals.",
        body: "Teenagers interact with people who actually do the work- founders, operators, and professionals with lived experience."
      },
      {
        title: "Real questions.",
        body: "We move beyond “What should I take?” toward the deeper questions that shape better futures: What kind of problems do I want to solve? What kind of work suits me? What kind of life am I building toward?"
      },
      {
        title: "Real formation.",
        body: "The outcome is not just better information, but better judgment, stronger self-awareness, and more grounded decision-making."
      }
    ]
  },
  socialProof: {
    heading: "What parents begin",
    headingHighlight: "to notice",
    intro: "Less confusion. Less borrowed aspiration. More seriousness, more curiosity, and more direction.",
    prompts: [
      "They ask better questions.",
      "They speak with more clarity about their interests.",
      "They stop chasing prestige without understanding fit.",
      "They begin to imagine a future they actually believe in."
    ]
  },
  closing: {
    headline: "Stop preparing teenagers for",
    headlineHighlight: "yesterday’s careers.",
    body: "If you want your teenager to build real clarity before making bigger academic and career decisions, Alcovia may be the environment they need.",
    primaryCta: "Old prep vs. Alcovia- experience the difference",
    finePrint: "Is your teen’s career plan already outdated?"
  }
}

export default function LandingPage2() {
  const c = content;
  const hero = c.hero;

  return (
    <>
      <LPNavbar />
      <main>
        <HeroSection hero={hero} />
        <ProblemsSection problems={c.problems} />
        <TransformationSection transformation={c.transformation} />
        <AudienceSection audience={c.audience} />
        <PillarsSection authority={c.authority} />
        <SocialProofSection socialProof={c.socialProof} />
        <ClosingCTASection closing={c.closing} />
      </main>
      <LPFooter />
      <MobileFloatingCTA />
    </>
  )
}
