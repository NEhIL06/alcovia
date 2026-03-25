import { LPTemplate } from "@/components/lp-template"
import type { LPContent } from "@/lib/lp-content-types"

const content: LPContent = {
  hero: {
    subtitle: "For parents who know busyness is not the same as growth",
    headline: "Time is your teenager’s biggest asset. The right environment can",
    highlight: "multiply it.",
    body: "Many teenagers look busy: tuitions, hobbies, screens, endless “study time.” But busyness is not the same as direction. At Alcovia, teenagers learn how to use time with intent, build stronger routines, and turn scattered effort into real momentum.",
    primaryCta: "High performance without burnout- learn how Alcovia does it",
    secondaryCta: "Understand the exact frameworks we use"
  },
  problems: {
    heading: "Why time disappears",
    headingHighlight: "without creating growth",
    intro: "The issue is rarely effort. It is misdirected effort. Many teenagers are overloaded but lack direction, which means their days feel full while their focus, discipline, and confidence remain weak.",
    items: [
      {
        title: "Busy does not mean being productive.",
        body: "A packed schedule can still produce drift, distraction, and burnout."
      },
      {
        title: "Hidden drains on attention.",
        body: "Fake study calls, endless scrolling, and too many low-value commitments quietly drain attention and momentum."
      },
      {
        title: "Reacting instead of building.",
        body: "Without systems, even bright teenagers spend their best years reacting instead of building."
      }
    ]
  },
  transformation: {
    heading: "What changes",
    headingHighlight: "at Alcovia",
    intro: "At Alcovia, teenagers are taught to use time as an advantage.",
    items: [
      {
        title: "They replace scattered activity with focus.",
        body: "Instead of being busy everywhere, they learn what to prioritise, what to cut, and how to work with intent."
      },
      {
        title: "They build stronger systems.",
        body: "Teens learn practical planning, execution, and review habits that create momentum without constant pressure."
      },
      {
        title: "They grow without burning out.",
        body: "The goal is not a fuller calendar. It is deeper progress, better energy, and more meaningful output."
      }
    ],
    midCta: "Busy vs. productive- which one is your teen?"
  },
  audience: {
    intro: "Alcovia is for families who feel their teenager is working hard, but not moving in the right direction.",
    forList: [
      "bright and capable, but easily distracted or overwhelmed",
      "busy all week, but not building enough depth or momentum",
      "managing multiple commitments without a clear system",
      "in need of better routines, stronger discipline, and sharper focus"
    ],
    gatekeepingLine: "This is not for families looking to simply add one more activity. It is for those who want their teenager to use time with greater intention and maturity."
  },
  authority: {
    label: "Why Alcovia works",
    intro: "Because time management is a skill that can be taught, practised, and strengthened.",
    pillars: [
      {
        title: "Real frameworks, not vague advice.",
        body: "Teenagers learn practical systems for planning, prioritising, and executing."
      },
      {
        title: "High standards, not constant supervision.",
        body: "The environment encourages accountability, ownership, and follow-through."
      },
      {
        title: "A better peer culture.",
        body: "When teenagers grow around others who are serious about how they spend their time, their own standards rise."
      }
    ]
  },
  socialProof: {
    heading: "What parents begin",
    headingHighlight: "to notice",
    intro: "Not more pressure. Better structure, better focus, and better use of time.",
    prompts: [
      "They stop confusing busyness with progress.",
      "They become more deliberate about what they say yes to.",
      "They start finishing more of what matters.",
      "They look calmer, clearer, and more in control of their week."
    ]
  },
  closing: {
    headline: "Scrolling vs. mastering-",
    headlineHighlight: "pick a side.",
    body: "If your teenager is busy but not yet building enough focus, structure, or momentum, Alcovia may be the environment they need.",
    primaryCta: "Where is your teen’s time actually going?",
    finePrint: "Scrolling vs. mastering — pick a side"
  }
}

export default function LandingPageAuthority() {
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
