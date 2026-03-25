export interface ProblemItem {
  title: string
  body: string
}

export interface TransformItem {
  title: string
  body: string
}

export interface PillarItem {
  title: string
  body: string
}

export interface LPContent {
  hero: {
    subtitle: string
    headline: string
    highlight: string
    body: string
    primaryCta: string
    secondaryCta: string
  }
  problems: {
    heading: string
    headingHighlight: string
    intro: string
    items: ProblemItem[]
    bridgeLine?: string
  }
  transformation: {
    heading: string
    headingHighlight: string
    intro: string
    items: TransformItem[]
    midCta: string
  }
  audience: {
    intro: string
    forList: string[]
    gatekeepingLine: string
  }
  authority: {
    label: string
    intro: string
    pillars: PillarItem[]
  }
  socialProof: {
    heading: string
    headingHighlight: string
    intro: string
    prompts: string[]
  }
  closing: {
    headline: string
    headlineHighlight: string
    body: string
    primaryCta: string
    finePrint: string
  }
}
