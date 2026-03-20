"use client"

import { ScrollReveal } from "@/components/text-reveal"

// Words to highlight in gold (#EABF36)
const accentWords = ["TALENT.", "READINESS.", "GUIDANCE.", "ENVIRONMENTS.", "JUDGMENT,", "INITIATIVE,", "CONFIDENCE."]

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

// DATA STRUCTURE: Grouped into lines matching the new parent-facing copy
const manifestoLines = [
  // Block 1 - Header
  { text: "WHY BRIGHT TEENAGERS", isSpacerAfter: false },
  { text: "STILL GET LEFT BEHIND.", isSpacerAfter: true },

  // Block 2 - Problem statement
  { text: "THE PROBLEM IS RARELY", isSpacerAfter: false },
  { text: "A LACK OF TALENT.", isSpacerAfter: true },

  // Block 3 - Explanation
  { text: "IT IS THE WRONG PREPARATION,", isSpacerAfter: false },
  { text: "THE WRONG ENVIRONMENT,", isSpacerAfter: false },
  { text: "AND THE WRONG USE", isSpacerAfter: false },
  { text: "OF FORMATIVE YEARS.", isSpacerAfter: true },

  // Block 4 - Three problems
  { text: "1. FALSE READINESS.", isSpacerAfter: false },
  { text: "2. OUTDATED GUIDANCE.", isSpacerAfter: false },
  { text: "3. WEAK ENVIRONMENTS.", isSpacerAfter: true },

  // Block 5 - Resolution
  { text: "AT ALCOVIA,", isSpacerAfter: false },
  { text: "WE BUILD JUDGMENT,", isSpacerAfter: false },
  { text: "INITIATIVE, AND", isSpacerAfter: false },
  { text: "REAL-WORLD CONFIDENCE.", isSpacerAfter: false },
]

export default function Manifesto() {
  return (
    <section
      id="problem"
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