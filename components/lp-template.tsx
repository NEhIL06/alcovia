import Image from "next/image"
import { ArrowDown, CheckCircle2, XCircle } from "lucide-react"
import { CTAButton } from "@/components/lp/cta-button"
import { LPNavbar } from "@/components/lp/lp-navbar"
import { MobileFloatingCTA } from "@/components/lp/mobile-floating-cta"
import { HeroParallax } from "@/components/lp/hero-parallax"
import { ScrollFadeInit } from "@/components/lp/scroll-fade-init"
import { LogoCarousel } from "@/components/lp/logo-carousel"
import type { LPContent } from "@/lib/lp-content-types"

const GOLD = "#EABF36"
const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)"
const GOLD_TEXT_STYLE = { backgroundImage: GOLD_GRADIENT, WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent" }

function GoldText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`bg-clip-text text-transparent ${className}`} style={GOLD_TEXT_STYLE}>{children}</span>
}

function SectionHeader({ subtitle, text, highlight }: { subtitle?: string; text: string; highlight: string }) {
  return (
    <div className="lp-fade-in text-center mb-8 md:mb-14">
      {subtitle && <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: GOLD }}>{subtitle}</p>}
      <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
        {text}{" "}<GoldText>{highlight}</GoldText>
      </h2>
    </div>
  )
}

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`lp-fade-in ${className}`}>{children}</div>
}

const PROBLEM_IMAGES = ["/images/lp/false-readiness.jpg", "/images/lp/outdated-guidance.jpg", "/images/lp/weak-environments.jpg"]
const TRANSFORM_IMAGES = ["/images/lp/ideas-to-execution.jpg", "/images/lp/conviction-alt.jpg", "/images/lp/environment.jpg"]
const PILLAR_IMAGES = ["/images/lp/future.jpg", "/images/lp/mentorship.jpg", "/images/lp/cohort.jpg"]

function HeroSection({ hero }: { hero: LPContent["hero"] }) {
  return (
    <section data-hero-section className="relative h-[100svh] min-h-[580px] sm:min-h-[700px] flex items-center justify-center overflow-hidden">
      <div data-hero-img className="absolute inset-0 z-0">
        <Image src="/images/lp/hero.jpg" alt="Alcovia mentorship session" fill className="object-cover object-[center_40%]" loading="eager" sizes="100vw" fetchPriority="high" />
      </div>
      <div data-hero-overlay className="absolute inset-0 z-[1] bg-[#08261e]" style={{ opacity: 0.78 }} />
      <div data-hero-content className="relative z-10 max-w-3xl mx-auto px-6 pt-24 md:pt-32 text-center">
        <p className="lp-hero-stagger-1 text-xs md:text-sm uppercase tracking-[0.35em] mb-6 leading-relaxed" style={{ color: GOLD }}>{hero.subtitle}</p>
        <h1 className="lp-hero-stagger-2 font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
          {hero.headline}{" "}<GoldText>{hero.highlight}</GoldText>
        </h1>
        <p className="lp-hero-stagger-3 font-[family-name:var(--font-satoshi)] text-sm sm:text-base md:text-lg text-white/70 max-w-xl mx-auto mb-6 leading-relaxed">{hero.body}</p>
        <div className="lp-hero-stagger-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <CTAButton>{hero.primaryCta}</CTAButton>
          <a href="#problems" className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors">
            {hero.secondaryCta}
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
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
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight max-w-3xl mx-auto">{authority.intro}</h2>
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
            <FadeIn key={i} className="h-full">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 hover:border-[#EABF36]/20 transition-colors h-full flex flex-col">
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

function LPFooter() {
  return (
    <footer className="bg-[#040f0b] py-12 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center">
            <Image src="/alcovia_logo_dark.png" alt="Alcovia" width={120} height={100} className="object-contain h-[50px] w-auto opacity-40" loading="lazy" />
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

function VideoSection() {
  return (
    <section className="relative w-full bg-[#061f18]">
      <video className="w-full aspect-[21/9] md:aspect-[21/9] object-cover" autoPlay muted loop playsInline preload="none" />
    </section>
  )
}

export interface LPTemplateProps {
  heroSubtitle?: string
  heroHeadline?: string
  heroHighlight?: string
  heroBody?: string
  primaryCta?: string
  secondaryCta?: string
  content?: LPContent
  showVideo?: boolean
}

const DEFAULT_CONTENT: LPContent = {
  hero: { subtitle: "", headline: "", highlight: "", body: "", primaryCta: "", secondaryCta: "" },
  problems: {
    heading: "Why bright teenagers still", headingHighlight: "get left behind.",
    intro: "The problem is rarely a lack of talent. More often, it is the wrong preparation, the wrong environment and the wrong use of formative years.",
    items: [
      { title: "False readiness", body: "Good grades can create the illusion that a teenager is prepared. But the future will reward far more than academic performance. According to the World Economic Forum\u2019s Future of Jobs Report 2025, employers expect 39% of workers\u2019 core skills to change by 2030." },
      { title: "Outdated guidance", body: "Traditional career counselling often asks teenagers to choose too early, with too little exposure and too much borrowed ambition. Teenagers do not need generic advice or formulaic profile-building." },
      { title: "Weak environments", body: "Teenagers do not grow in isolation. They are shaped by the norms, expectations and ambitions of the people around them. The right peer group is not a bonus. It is a developmental multiplier." },
    ],
  },
  transformation: {
    heading: "What changes", headingHighlight: "inside Alcovia.",
    intro: "Alcovia is built to change how a teenager thinks, works, chooses and grows.",
    items: [
      { title: "They stop only consuming ideas. They start building.", body: "At Alcovia, teenagers are expected to move from interest to execution." },
      { title: "They build conviction, not borrowed ambition.", body: "Instead of chasing what sounds impressive, they engage with real professionals and real-world questions." },
      { title: "They grow in a room that raises their standards.", body: "The right environment changes what feels normal." },
    ],
    midCta: "Book Your Teen's Fit Call",
  },
  audience: {
    intro: "Alcovia is intentionally not built for everyone.",
    forList: ["For families who already know that marks, tuition and generic extracurriculars are no longer enough.", "For teenagers who are bright, curious and capable, but not yet stretched in the right way.", "For teenagers who have ideas, but need more consistency, challenge and follow-through."],
    gatekeepingLine: "It is probably not the right fit for families looking for passive online content, formulaic college packaging or a generic enrichment programme.",
  },
  authority: {
    label: "Why Alcovia can do this",
    intro: "Because teenagers do not become exceptional through information alone. They become exceptional through stronger formation.",
    pillars: [
      { title: "Built around the future, not the syllabus", body: "Alcovia is designed around the widening gap between school success and future readiness." },
      { title: "Real-world adults, not just academic abstraction", body: "Teenagers need access to professionals and practitioners whose work helps them understand how the real world functions." },
      { title: "Curated cohort and offline rigor", body: "The value of Alcovia is not only in what is taught, but in the room itself." },
    ],
  },
  socialProof: {
    heading: "Better judgment. Stronger", headingHighlight: "follow-through.",
    intro: "Not just more activity. Better judgment, stronger follow-through, sharper peer influence and clearer intent.",
    prompts: ["Real projects", "Curated peer group", "Mentors from the real world", "Offline accountability"],
  },
  closing: {
    headline: "The future will not ask your teenager for", headlineHighlight: "marks alone.",
    body: "It will ask for judgment, initiative, communication, resilience and clarity.",
    primaryCta: "Book Your Child's Alcovia Fit Call",
    finePrint: "For families who want to understand whether Alcovia is the right ecosystem, not just another programme.",
  },
}

export function LPTemplate({ heroSubtitle, heroHeadline, heroHighlight, heroBody, primaryCta, secondaryCta, content, showVideo }: LPTemplateProps) {
  const c: LPContent = content || DEFAULT_CONTENT
  const hero = content
    ? c.hero
    : { subtitle: heroSubtitle || "", headline: heroHeadline || "", highlight: heroHighlight || "", body: heroBody || "", primaryCta: primaryCta || "", secondaryCta: secondaryCta || "" }
  const shouldShowVideo = showVideo ?? !content

  return (
    <>
      <HeroParallax />
      <ScrollFadeInit />
      <LPNavbar />
      <main>
        <HeroSection hero={hero} />
        <ProblemsSection problems={c.problems} />
        <TransformationSection transformation={c.transformation} />
        {shouldShowVideo && <VideoSection />}
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
