"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import TextReveal, { MultiLineReveal, ScrollReveal } from "./text-reveal"

// Flow Button with animated SVG border
function FlowButton({ direction, href }: { direction: "left" | "right"; href: string }) {
  const [isActive, setIsActive] = useState(false)

  return (
    <Link href={href}>
      <motion.button
        className={`${direction === "right" ? "ml-auto" : "mr-auto"} mt-5 relative flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-xl bg-[#EABF36] text-[#0C0C0C] text-xl md:text-2xl font-bold transition-transform group`}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        onTouchStart={() => setIsActive(true)}
        onTouchEnd={() => setIsActive(false)}
      >
        {/* SVG Border with Flow Animation */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2"
            y="2"
            width="60"
            height="60"
            rx="12"
            stroke="#0C0C0C"
            strokeWidth="2"
            strokeDasharray="8 4"
            strokeDashoffset="0"
            className={`transition-all duration-300 ${isActive ? "animate-flow-border" : ""}`}
            style={{
              opacity: isActive ? 1 : 0.3,
            }}
          />
        </svg>

        {/* Arrow Icon */}
        <span className="relative z-10">{direction === "right" ? "→" : "←"}</span>
      </motion.button>

      {/* CSS for animation */}
      <style jsx>{`
        @keyframes flowBorder {
          from {
            stroke-dashoffset: 24;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        :global(.animate-flow-border) {
          animation: flowBorder 0.6s linear infinite;
        }
      `}</style>
    </Link>
  )
}

const sections = [
  {
    id: "at-school",
    topText: "AT",
    bottomText: "SCHOOL",
    descriptionLines: [
      { text: "Empowering academic " },
      { text: "excellence through innovative" },
      { text: "learning methodologies." }
    ],
    image: "/images/atschool.png",
  },
  {
    id: "outside-school",
    topText: "OUTSIDE",
    bottomText: "SCHOOL",
    descriptionLines: [
      { text: "Building differentiation through" },
      { text: "real-world experiences and" },
      { text: "leadership development." }
    ],
    image: "/images/outsideschool.png",
  },
]

export default function ToggleCompare() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const leftImageX = useTransform(scrollYProgress, [0, 0.3, 0.5], [-200, -50, 0])
  const leftTextX = useTransform(scrollYProgress, [0, 0.3, 0.5], [-100, -25, 0])
  // Make opacity come in much earlier to fix "not visible" issue
  const leftOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3], [0, 1, 1])

  const rightImageX = useTransform(scrollYProgress, [0, 0.3, 0.5], [200, 50, 0])
  const rightTextX = useTransform(scrollYProgress, [0, 0.3, 0.5], [100, 25, 0])
  const rightOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3], [0, 1, 1])

  const headerY = useTransform(scrollYProgress, [0, 0.3], [50, 0])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1])
  const mobileImageY = useTransform(scrollYProgress, [0.3, 0.8], ["-10%", "10%"])
  const mobileImageOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1])
  const mobileImageScale = useTransform(scrollYProgress, [0.1, 0.4], [0.9, 1])

  // Create a dedicated progress value for the text reveal
  // It should complete (0->1) while the section is pinned and visible
  // Extended range [0.1, 0.6] to ensure it finishes fully
  const textRevealProgress = useTransform(scrollYProgress, [0.1, 0.6], [0, 1])

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden pt-20 md:min-h-screen md:py-32 sticky top-0 z-0"
    >
      {/* --- DESKTOP IMAGES (xl+) --- */}
      {/* LEFT IMAGE */}
      <motion.div
        className="absolute bottom-0 left-0 top-0 hidden xl:block xl:w-[28%]"
        style={{ x: leftImageX, opacity: leftOpacity }}
      >
        <div className="relative h-full w-full">
          <Image
            src={sections[0].image}
            alt="At School"
            fill
            className="object-cover object-right-top"
          />
        </div>
      </motion.div>

      {/* RIGHT IMAGE */}
      <motion.div
        className="absolute bottom-0 right-0 top-0 hidden xl:block xl:w-[28%]"
        style={{ x: rightImageX, opacity: rightOpacity }}
      >
        <div className="relative h-full w-full">
          <Image
            src={sections[1].image}
            alt="Outside School"
            fill
            className="object-cover object-left-top"
          />
        </div>
      </motion.div>

      {/* --- TABLET IMAGES (md to xl) --- */}
      {/* LEFT IMAGE */}
      <motion.div
        className="absolute bottom-0 left-0 top-0 hidden md:block xl:hidden md:w-[60%]"
        style={{ x: leftImageX, opacity: leftOpacity }}
      >
        <div className="relative h-full w-full">
          <Image
            src={sections[0].image}
            alt="At School"
            fill
            className="object-cover object-right-top"
          />
        </div>
      </motion.div>

      {/* RIGHT IMAGE */}
      <motion.div
        className="absolute bottom-0 right-0 top-0 hidden md:block xl:hidden md:w-[50%]"
        style={{ x: rightImageX, opacity: rightOpacity }}
      >
        <div className="relative h-full w-full">
          <Image
            src={sections[1].image}
            alt="Outside School"
            fill
            className="object-cover object-left-top"
          />
        </div>
      </motion.div>

      {/* CENTER CONTENT */}
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        {/* HEADER */}
        <motion.div
          className="mb-12 text-center md:mb-24"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#F7F7F3] md:text-6xl xl:text-7xl">
            Our <span className="text-[#EABF36]">Impact</span>
          </h2>
        </motion.div>

        {/* 🔥 MOBILE: SIDE BY SIDE | DESKTOP: ROW */}
        <div className="grid grid-cols-2 gap-4 md:flex md:items-start md:justify-center md:gap-10 xl:gap-7">
          {/* AT SCHOOL */}
          <motion.div
            className="cursor-pointer text-right"
            style={{ x: leftTextX, opacity: leftOpacity }}
          >
            <div className="relative mb-4 flex flex-col items-end">
              <span className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#F7F7F3] md:text-6xl xl:text-7xl">
                {sections[0].topText}
              </span>
              <div className="-mt-1">
                <span className="text-4xl font-black uppercase tracking-tight text-[#F7F7F3] md:text-6xl xl:text-7xl">
                  {sections[0].bottomText}
                </span>
              </div>
            </div>

            <div className="ml-auto max-w-[160px] md:max-w-[200px] flex flex-col items-end">
              {sections[0].descriptionLines.map((line, i) => (
                <p key={i} className="text-xs leading-relaxed text-[#F7F7F3]/60 md:text-sm text-right">
                  {line.text}
                </p>
              ))}
            </div>

            <FlowButton direction="right" href="/at-school" />
          </motion.div>

          {/* OUTSIDE SCHOOL */}
          <motion.div
            className="cursor-pointer text-left"
            style={{ x: rightTextX, opacity: rightOpacity }}
          >
            <div className="relative mb-4 flex flex-col items-start">
              <span className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#F7F7F3] md:text-6xl xl:text-7xl">
                {sections[1].topText}
              </span>
              <div className="-mt-1">
                <span className="text-4xl font-black uppercase tracking-tight text-[#F7F7F3] md:text-6xl xl:text-7xl">
                  {sections[1].bottomText}
                </span>
              </div>
            </div>

            <div className="mr-auto max-w-[160px] md:max-w-[200px] flex flex-col items-start">
              {sections[1].descriptionLines.map((line, i) => (
                <p key={i} className="text-xs leading-relaxed text-[#F7F7F3]/60 md:text-sm text-left">
                  {line.text}
                </p>
              ))}
            </div>

            <FlowButton direction="left" href="/outside-school" />
          </motion.div>
        </div>
      </div>

      {/* MOBILE IMAGES */}
      <div className="mt-8 flex gap-2 px-0 md:hidden">
        {/* Left Image - Matches Left Text Behavior */}
        <motion.div
          className="relative aspect-[2/3] flex-1 overflow-hidden rounded-t-2xl"
          style={{ x: leftTextX, opacity: leftOpacity }}
        >
          <div className="relative h-full w-full">
            <Image
              src={sections[0].image}
              alt=""
              fill
              className="object-cover object-top"
            />
          </div>
        </motion.div>

        {/* Right Image - Matches Right Text Behavior */}
        <motion.div
          className="relative aspect-[1/2] flex-1 overflow-hidden rounded-t-2xl"
          style={{ x: rightTextX, opacity: rightOpacity }}
        >
          <div className="relative h-full w-full">
            <Image
              src={sections[1].image}
              alt=""
              fill
              className="object-cover object-top"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
