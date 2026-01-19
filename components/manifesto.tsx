"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import gsap from "gsap"

// Words to highlight in gold (#EABF36)
const accentWords = ["1%", "11-16.", "3%", "EARNED.", "FEW", "INVITED", "TEENS", "LEGACY", "GROWTH","FAILING","TOGETHER"]

// Helper function to render text with highlighted accent words
function renderLineWithAccents(text: string) {
  // Split text into words while preserving spaces
  const words = text.split(" ")

  return words.map((word, idx) => {
    // Check if this word (or its base form without punctuation) should be highlighted
    const isAccent = accentWords.some(accent => word.includes(accent) || word === accent)

    return (
      <span key={idx}>
        <span className={isAccent ? "text-[#EABF36]" : "text-[#F7F7F3]"}>
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
  { text: "WITH A STRICT 3% SELECTION RATE,", isSpacerAfter: false },
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
  { text: "WE ENABLE TEENS TO START THEIR", isSpacerAfter: false },
  { text: "LEGACY BUILDING JOURNEY TODAY.", isSpacerAfter: false },
]

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<(HTMLDivElement | null)[]>([])
  const isInView = useInView(containerRef, { once: true, margin: "-20%" })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      if (prefersReducedMotion) {
        linesRef.current.forEach((line) => {
          if (line) {
            const text = line.querySelector(".reveal-text")
            if (text) gsap.set(text, { opacity: 1 })
          }
        })
        return
      }

      linesRef.current.forEach((line, i) => {
        if (!line) return

        const mask = line.querySelector(".reveal-mask")
        const text = line.querySelector(".reveal-text")

        if (!mask || !text) return

        const tl = gsap.timeline({
          defaults: { ease: "power3.inOut" }
        })

        gsap.set(mask, { scaleX: 0, transformOrigin: "left" })
        gsap.set(text, { opacity: 0 })

        tl.to(mask, {
          scaleX: 1,
          duration: 0.6,
        }, i * 0.1)

        tl.set(mask, { transformOrigin: "right" }, ">")
        tl.set(text, { opacity: 1 }, ">")

        tl.to(mask, {
          scaleX: 0,
          duration: 0.6,
        }, ">")
      })
    }
  }, [isInView, hasAnimated])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[60vh] overflow-hidden bg-transparent px-4 pb-20 pt-8 md:min-h-screen md:px-12 md:py-24 lg:px-20"
      data-theme="graded"
    >
      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-6xl flex flex-col items-center text-center">
        {manifestoLines.map((line, i) => (
          <div key={i}>
            <div
              ref={(el) => { linesRef.current[i] = el }}
              className="reveal-line relative overflow-hidden w-fit my-[-0.05em]"
            >
              <div
                className="reveal-mask absolute inset-0 z-20 bg-[#D4AF37]"
              />

              <p
                className="reveal-text opacity-0 font-[family-name:var(--font-milan)] text-[18px] font-bold leading-[1.3] tracking-tight sm:text-[28px] md:text-[38px] lg:text-[48px] xl:text-[70px] whitespace-nowrap px-1"
              >
                {renderLineWithAccents(line.text)}
              </p>
            </div>

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