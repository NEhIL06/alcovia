import { LPTemplate } from "@/components/lp-template"
import type { LPContent } from "@/lib/lp-content-types"

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

export default function LandingPageAspirational() {
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
