import { LPTemplate } from "@/components/lp-template"
import type { LPContent } from "@/lib/lp-content-types"

const content: LPContent = {
  hero: {
    subtitle: "For parents who know good grades are not enough",
    headline: "Bright teens are not automatically",
    highlight: "real-world ready.",
    body: "A smart teenager can still crumble under pressure, deadlines, and real responsibility. Alcovia builds resilience through startups, simulations, and projects that demand ownership.",
    primaryCta: "Show me how this works",
    secondaryCta: "Limited seats \u2014 check eligibility"
  },
  problems: {
    heading: "Why bright teenagers still",
    headingHighlight: "struggle",
    intro: "The issue is rarely intelligence. It is that many teenagers are never pushed to handle pressure, ownership, discomfort, or execution.",
    items: [
      {
        title: "Good grades can signal false readiness.",
        body: "A teenager may perform well in school and still find it hard to deal with setbacks, time management, or real responsibility."
      },
      {
        title: "Ideas are easy. Execution is rare.",
        body: "Many teenagers talk well. Few are able to finish what they start."
      },
      {
        title: "Comfort can weaken capability.",
        body: "When teenagers get rewarded for being in their comfort zone, they grow polished on marksheet but hesitant in practice."
      }
    ],
    bridgeLine: "What sets exceptional teenagers apart is how early they build real-world readiness."
  },
  transformation: {
    heading: "What changes",
    headingHighlight: "at Alcovia",
    intro: "At Alcovia, teenagers are expected to act on their ideas.",
    items: [
      {
        title: "They finish what they start.",
        body: "Projects become a way to build discipline, ownership, and follow-through."
      },
      {
        title: "They build real resilience.",
        body: "They learn to face challenge, feedback, and uncertainty without backing away."
      },
      {
        title: "They grow beyond being \u201cbook smart\u201d.",
        body: "They become clearer in thought, stronger in execution, and more ready for the real world."
      }
    ],
    midCta: "See what real-world readiness looks like"
  },
  differentiators: {
    heading: "What Makes Alcovia Different?",
    items: [
      {
        number: "01",
        title: "3% Selection Rate",
        body: "Your teen is surrounded by Delhi-NCR\u2019s most driven 11\u201316 year olds"
      },
      {
        number: "02",
        title: "1:1 Mentorship from Operators, Not Teachers",
        body: "Direct access to founders and leaders from Flipkart, Meesho, Nothing & more"
      },
      {
        number: "03",
        title: "Only 2 Saturdays a Month \u2013 Zero School Disruption",
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
    intro: "Alcovia is for families who feel their teenager (ages 11\u201316) has potential but is not being challenged in the right way.",
    forTitle: "Built For Teenagers Who Are:",
    forList: [
      "Bright, but inconsistent \u2013 they ace tests but drop off when things get hard",
      "Idea-rich, execution-poor \u2013 full of plans but rarely finish them",
      "Under-challenged \u2013 they need sharper peers, real responsibility, and challenges that build real-world grit"
    ],
    notForTitle: "Probably Not The Right Fit If:",
    notForList: [
      "You want babysitting with a fancy name",
      "You expect guaranteed outcomes without discomfort",
      "You\u2019re not ready for them to be pushed, publicly"
    ],
    gatekeepingLine: "This is not just another activity. It is for families who want their teenager to grow stronger in how they think, act, and handle the real world."
  },
  authority: {
    label: "Why Alcovia works",
    intro: "Because resilience is not taught through advice. It is built through experience.",
    pillars: [
      {
        title: "Real-world projects.",
        body: "Teenagers work on things that demand initiative and follow-through."
      },
      {
        title: "The right stretch.",
        body: "They are challenged enough to grow, not just perform."
      },
      {
        title: "A stronger environment.",
        body: "Sharper expectations, better peers, and meaningful accountability change how teenagers develop."
      }
    ]
  },
  socialProof: {
    heading: "What parents begin",
    headingHighlight: "to notice",
    intro: "Not just more activity \u2014 more ownership, seriousness, and follow-through.",
    prompts: [
      "They stop giving up so easily.",
      "They take themselves more seriously.",
      "They become more action-oriented.",
      "They grow beyond school identity."
    ]
  },
  closing: {
    headline: "Book-smart is no longer",
    headlineHighlight: "enough.",
    body: "If your teenager is bright but still not as resilient, proactive, or real-world ready as they could be, Alcovia may be the environment they need.",
    primaryCta: "See what Alcovians do differently",
    finePrint: "Limited seats \u2014 check eligibility"
  }
}

export default function LandingPage1() {
  return <LPTemplate content={content} />
}
