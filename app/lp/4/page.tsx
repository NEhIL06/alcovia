import { LPTemplate } from "@/components/lp-template"
import type { LPContent } from "@/lib/lp-content-types"

const content: LPContent = {
  hero: {
    subtitle: "For parents who know environment shapes outcomes for teenagers",
    headline: "Your teenager’s peer group may be",
    highlight: "deciding more than you are.",
    body: "A teenager’s future is shaped not only by school or family, but by the standards, ambition, and energy of the room they grow up in. At Alcovia, ambitious teenagers grow around stronger peers, sharper expectations, and real-world role models.",
    primaryCta: "See who your teen could be surrounded by",
    secondaryCta: "What actually predicts teen success?"
  },
  problems: {
    heading: "Why the wrong room quietly",
    headingHighlight: "lowers potential",
    intro: "Teenagers absorb more than advice. They absorb the standards and the levels of excellence created by their peers.",
    items: [
      {
        title: "Average environments create average standards",
        body: "If a teenager’s circle normalises distraction, passivity, or low ambition, that slowly becomes their benchmark too."
      },
      {
        title: "Peer groups shape confidence and aspiration",
        body: "What teenagers attempt, what they admire, and how seriously they take themselves is heavily influenced by the people around them."
      },
      {
        title: "School success alone is not enough",
        body: "Exceptional teenagers are rarely shaped by marks alone. They are shaped by stronger environments, sharper peers, and richer exposure."
      }
    ],
    bridgeLine: "The right room does not just support growth. It accelerates it."
  },
  transformation: {
    heading: "What changes",
    headingHighlight: "at Alcovia",
    intro: "At Alcovia, teenagers do not just attend a program. They enter a stronger culture.",
    items: [
      {
        title: "They grow around ambitious peers",
        body: "Teenagers begin to see higher standards, bigger goals, and stronger execution as normal."
      },
      {
        title: "They are shaped by real-world exposure",
        body: "They meet mentors, professionals, and role models who expand what feels possible."
      },
      {
        title: "They become more intentional",
        body: "The right environment changes how teenagers think, speak, choose, and show up."
      }
    ],
    midCta: "Your teen could be in this room- find out how"
  },
  audience: {
    intro: "Alcovia is for families who know their teenager needs more than a good school and a busy schedule. It is for teenagers who:",
    forList: [
      "would benefit from stronger peers and higher standards",
      "are capable, but need a more ambitious environment",
      "are ready to grow around thoughtful, driven, real-world-oriented teenagers"
    ],
    gatekeepingLine: "This is not for families looking for just another class. It is for those who want the right room to shape their teenager early."
  },
  authority: {
    label: "Why Alcovia works",
    intro: "Because teenage development is social. Who your child grows around matters.",
    pillars: [
      {
        title: "Curated peer group",
        body: "Alcovia is intentionally built around the power of the cohort, not just the curriculum."
      },
      {
        title: "High-ambition culture",
        body: "Teenagers are surrounded by peers who are building, leading, competing, and thinking seriously about their future."
      },
      {
        title: "Real-world access",
        body: "The community is strengthened by mentors, professionals, and experiences that move teenagers beyond school identity."
      }
    ]
  },
  socialProof: {
    heading: "What parents begin",
    headingHighlight: "to notice",
    intro: "Not just new friends. Better standards, stronger intent, and bigger thinking.",
    prompts: [
      "They start taking themselves more seriously",
      "Their conversations become more ambitious",
      "They are influenced by better peers",
      "They begin aiming higher, naturally"
    ]
  },
  closing: {
    headline: "Your teenager will become like the room",
    headlineHighlight: "they grow in.",
    body: "If your child is bright but surrounded by average standards, Alcovia may be the stronger peer environment they need.",
    primaryCta: "Upgrade your teen’s circle- learn how",
    finePrint: "See who is already in the community"
  }
}

export default function LandingPageMythBusting() {
  return (
    <LPTemplate
      heroSubtitle={content.hero.subtitle}
      heroHeadline={content.hero.headline}
      heroHighlight={content.hero.highlight}
      heroBody={content.hero.body}
      primaryCta={content.hero.primaryCta}
      secondaryCta={content.hero.secondaryCta}
      content={content}
    />
  )
}
