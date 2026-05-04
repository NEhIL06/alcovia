import { LPTemplate } from "@/components/lp-template"
import type { LPContent } from "@/lib/lp-content-types"

const content: LPContent = {
  hero: {
    subtitle: "For parents who know legacy isn't wealth",
    headline: "You built a top 1% life. Now build it for your",
    highlight: "teenager.",
    body: "Most parents focus on leaving wealth. But the real legacy is giving your teenager the same edge, drive, and capability that built your success. At Alcovia, teenagers join an exclusive circle of ambitious peers, work with founder-mentors, and build real products and companies.",
    primaryCta: "Show me how this works",
    secondaryCta: "See why this matters"
  },
  problems: {
    heading: "Why most teenagers with advantages still",
    headingHighlight: "fall behind",
    intro: "The issue isn't providing opportunities. It's that most teenagers never learn to earn them – through ownership, execution, and real-world pressure.",
    items: [
      {
        title: "Comfort can weaken capability.",
        body: "When teenagers are given everything without building anything, they grow entitled instead of capable."
      },
      {
        title: "Potential without stretch stays ordinary.",
        body: "Bright teenagers surrounded by average standards, passive peers, and low expectations will normalize mediocrity – even with every advantage."
      },
      {
        title: "The top 1% is built before adulthood.",
        body: "Exceptional outcomes don't start with inheritance. They start with earlier access to stronger networks, real builders, and impactful work."
      }
    ]
  },
  transformation: {
    heading: "What changes",
    headingHighlight: "at Alcovia",
    intro: "At Alcovia, teenagers are not treated like children waiting for the future. They join an exclusive group of driven teens building real products and companies – now.",
    items: [
      {
        title: "They enter stronger rooms.",
        body: "They grow around ambitious peers, real founders, and higher standards – the kind of environment that quietly raises what feels possible."
      },
      {
        title: "They build real things.",
        body: "Instead of hypothetical projects, they ship actual products, test real ideas, and learn what it takes to create value."
      },
      {
        title: "They develop an uncommon edge.",
        body: "They become more proactive, more articulate, and more capable of translating potential into visible action – before college."
      }
    ],
    midCta: "Show me how this works"
  },
  differentiators: {
    heading: "What Makes Alcovia Different?",
    items: [
      {
        number: "01",
        title: "3% Selection Rate",
        body: "Your teen is surrounded by Delhi-NCR's most driven 11–16 year olds"
      },
      {
        number: "02",
        title: "1:1 Mentorship from Operators, Not Teachers",
        body: "Direct access to founders and leaders from Flipkart, Meesho, Nothing & more"
      },
      {
        number: "03",
        title: "Only 2 Saturdays a Month – Zero School Disruption",
        body: "Fortnightly 4-hour workshops with lunch included"
      },
      {
        number: "04",
        title: "Project-First, Never Theory-First",
        body: "They build products, launch micro-ventures and learn leadership skills"
      }
    ]
  },
  audience: {
    heading: "Who Is This For",
    intro: "Alcovia is for families who've built a top 1% life and want the same trajectory for their teenager – not through inheritance, but through capability, character, and early access.",
    forTitle: "Built for",
    forList: [
      "teenagers aged 11-16 who are bright, capable, and ready for more than school performance",
      "teens who would grow faster around sharper peers and higher standards",
      "young people curious about building, entrepreneurship, leadership, or real-world work",
      "families who want their teen mentored by founders, not just teachers"
    ],
    gatekeepingLine: "This is not for families looking for tuition, coding classes, or college counselling. It is for those who want to give their teenager the right environment to thrive."
  },
  authority: {
    label: "Why Alcovia Works",
    intro: "Because the top 1% is not created by wealth. It's created by environment, mentorship, and real work.",
    pillars: [
      {
        title: "A private circle of driven teens.",
        body: "Alcovia is intentionally selective. Your teenager grows alongside ambitious peers who raise the bar, not lower it – the kind of network that becomes a lifelong advantage."
      },
      {
        title: "Building real products and companies.",
        body: "Teenagers don't do pretend projects. They ship real work, face real feedback, and learn what it takes to create something from nothing – the ultimate unfair advantage."
      },
      {
        title: "Mentored by founders.",
        body: "Your teenager learns directly from people who have actually built companies, led teams, and created value."
      }
    ]
  },
  socialProof: {
    heading: "What parents begin",
    headingHighlight: "to notice",
    intro: "Not just a busier teenager. A sharper, more serious, more capable one.",
    prompts: [
      "They start taking themselves more seriously.",
      "They become more action-oriented and less dependent on direction.",
      "They begin choosing better peers, better goals, and better uses of time.",
      "They look less like teenagers waiting and more like teenagers building."
    ]
  },
  closing: {
    headline: "Your legacy isn't wealth. It's who your teenager",
    headlineHighlight: "becomes.",
    body: "If your teenager has unusual promise, they need more than resources. They need the kind of environment that gives them an early, visible edge – the same edge that built your success.",
    primaryCta: "Give your teen the edge",
    finePrint: "Offline in Gurgaon | For Ages 11-16"
  }
}

export default function LandingPage6() {
  return <LPTemplate content={content} />
}
