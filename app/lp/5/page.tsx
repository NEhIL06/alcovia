import { LPTemplate } from "@/components/lp-template"
import type { LPContent } from "@/lib/lp-content-types"

const content: LPContent = {
  hero: {
    subtitle: "For parents who know potential needs an unfair advantage",
    headline: "Potential alone does not put a teenager",
    highlight: "in the top 1%.",
    body: "The teenagers who stand apart are not just talented. They are shaped early by stronger peers, better mentors, higher standards, and rooms that make ambition feel normal. That is what Alcovia is built to provide.",
    primaryCta: "Give your teen the same edge you had",
    secondaryCta: "See what 14-year-olds are building"
  },
  problems: {
    heading: "Why most bright teenagers never truly",
    headingHighlight: "stand apart",
    intro: "Most teenagers are told to wait- wait to specialise, wait to build, wait to lead, wait to become serious. By then, the difference between average and exceptional has already begun to widen.",
    items: [
      {
        title: "Potential without stretch stays ordinary",
        body: "Talent matters, but it does not compound on its own. Teenagers need exposure, challenge, and standards that pull more out of them early."
      },
      {
        title: "Most rooms normalise average ambition",
        body: "If a teenager grows up surrounded by passive peers, shallow goals, and low expectations, that becomes their benchmark too."
      },
      {
        title: "The top 1% is built before adulthood",
        body: "Exceptional outcomes usually begin with earlier access- to better rooms, stronger role models, and work that feels real."
      }
    ],
    bridgeLine: "The right ecosystem does not just support potential. It sharpens it into an edge."
  },
  transformation: {
    heading: "What changes",
    headingHighlight: "at Alcovia",
    intro: "At Alcovia, teenagers are not treated like children waiting for the future. They are treated like young people capable of building it.",
    items: [
      {
        title: "They enter stronger rooms",
        body: "They grow around ambitious peers, real builders, and higher expectations- the kind of environment that quietly raises standards."
      },
      {
        title: "They start earlier",
        body: "Instead of waiting for college to become serious, they begin exploring, building, presenting, and taking ownership now."
      },
      {
        title: "They develop an uncommon edge",
        body: "They become more articulate, more proactive, and more capable of translating potential into visible action."
      }
    ],
    midCta: "Where are real leaders actually built?"
  },
  audience: {
    intro: "Alcovia is for families who know their teenager should not grow on an ordinary track if they have extraordinary potential. It is for teenagers who are:",
    forList: [
      "bright, capable, and ready for more than school performance",
      "likely to grow faster in a sharper peer environment",
      "curious about building, leadership, entrepreneurship, or real-world work",
      "ready for challenge, ownership, and earlier exposure to serious opportunities"
    ],
    gatekeepingLine: "This is not for families looking for another activity to add to the calendar. It is for those who want their teenager in the kind of room that changes trajectory."
  },
  authority: {
    label: "Why Alcovia works",
    intro: "Because the top 1% is not created by advice alone. It is created by environment, repetition, and access.",
    pillars: [
      {
        title: "Selective cohort",
        body: "Alcovia is built around ambitious teenagers who benefit from growing with peers who raise the bar, not lower it."
      },
      {
        title: "Real-world access",
        body: "Teenagers engage with serious ideas, real professionals, and work that feels closer to the world they will eventually enter."
      },
      {
        title: "Earlier formation",
        body: "We focus on what usually gets delayed - leadership, execution, communication, and ownership - while it still compounds fastest."
      }
    ]
  },
  socialProof: {
    heading: "What families begin",
    headingHighlight: "to notice",
    intro: "Not just a busier teenager. A sharper one.",
    prompts: [
      "They become more serious about their own potential.",
      "They begin choosing better peers, better goals, and better uses of time.",
      "They look less like teenagers waiting and more like teenagers building.",
      "They start carrying themselves with more intent, confidence, and direction."
    ]
  },
  closing: {
    headline: "The 99% wait.",
    headlineHighlight: "The 1% build.",
    body: "If your teenager has unusual promise, they need more than encouragement. They need the kind of environment that gives them an early, visible edge.",
    primaryCta: "See what 14-year-olds are building with mentors",
    finePrint: "Don’t let your teen’s potential go to waste"
  }
}

export default function LandingPageComparison() {
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
