"use client"

import { ScrollReveal } from "@/components/text-reveal"

// Words to highlight in gold (#EABF36)
const accentWords = ["1%", "11-16.", "3%", "EARNED.", "FEW", "INVITED", "TEENS", "LEGACY", "GROWTH", "FAILING", "TOGETHER"]

// Helper function to render text with highlighted accent words
function renderLineWithAccents(text: string) {
  // Split text into words while preserving spaces
  const words = text.split(" ")

  return words.map((word, idx) => {
    // Check if this word (or its base form without punctuation) should be highlighted
    const isAccent = accentWords.some(accent => word.includes(accent) || word === accent)

    return (
      <span key={idx}>
        <span
          className={isAccent ? "bg-clip-text text-transparent" : "text-[#F7F7F3]"}
          style={isAccent ? { backgroundImage: 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : {}}
        >
          {word}
        </span>
        {idx < words.length - 1 ? " " : ""}
      </span>
    )
  })
}

// DATA STRUCTURE: Grouped into lines matching user's exact text format
const manifestoLines = [
  // Block 1
  { text: "ALCOVIA UNITES THE TOP 1%", isSpacerAfter: false },
  { text: "OF TEENAGERS AGED 11-16.", isSpacerAfter: true },

  // Block 2
  { text: "WITH A STRICT 3% ", isSpacerAfter: false },
  { text: "SELECTION RATE, ", isSpacerAfter: false },
  { text: "ENTRY IS EARNED.", isSpacerAfter: true },

  // Block 3
  { text: "FOR THE FEW", isSpacerAfter: false },
  { text: "WHO ARE INVITED TO JOIN,", isSpacerAfter: false },
  { text: "PREPARE FOR A YEAR OF:", isSpacerAfter: true },

  // Block 4 - List items
  { text: "1. RADICAL GROWTH.", isSpacerAfter: false },
  { text: "2. FAILING OFTEN,", isSpacerAfter: false },
  { text: "3. BUILDING TOGETHER, AND", isSpacerAfter: false },
  { text: "4. SELF DISCOVERY.", isSpacerAfter: true },

  // Block 5
  { text: "AT ALCOVIA,", isSpacerAfter: false },
  { text: "WE ENABLE TEENS", isSpacerAfter: false },
  { text: "TO START THEIR", isSpacerAfter: false },
  { text: "LEGACY BUILDING JOURNEY TODAY.", isSpacerAfter: false },
]

export default function Manifesto() {
  return (
    <section
      className="relative min-h-[60vh] overflow-hidden bg-transparent px-4 pb-20 pt-8 md:min-h-screen md:px-12 md:py-24 lg:px-20"
      data-theme="graded"
    >
      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-6xl flex flex-col items-center text-center">
        {manifestoLines.map((line, i) => (
          <div key={i}>
            <ScrollReveal className="reveal-line relative overflow-hidden w-fit my-[-0.05em]">
              <p
                className="reveal-text font-[family-name:var(--font-milan)] text-[18px] font-normal leading-[1.3] tracking-tight sm:text-[34px] md:text-[38px] lg:text-[48px] xl:text-[70px] whitespace-nowrap px-1"
              >
                {renderLineWithAccents(line.text)}
              </p>
            </ScrollReveal>

            {/* Spacer after specific lines */}
            {line.isSpacerAfter && (
              <div className="h-4 md:h-8 lg:h-10" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}