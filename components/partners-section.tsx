"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import InfiniteScrollMentors from "@/components/infinite-scroll-mentors"
import { ScrollReveal } from "./text-reveal"

export default function PartnersSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  // Parallax scroll setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Parallax transforms - different speeds for depth effect
  const alcoviaY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const headlineY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const subheadY = useTransform(scrollYProgress, [0, 1], [80, -80])
  const paragraphY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <motion.section
      ref={containerRef}
      className="relative w-full overflow-hidden py-24 md:py-32 bg-[#F5F5EF]"
    >
      {/* ALCOVIA SVG Background - with extra top spacing */}
      <div className="absolute inset-0 flex items-start justify-center overflow-hidden pointer-events-none pt-16 md:pt-24">
        <motion.svg
          className="absolute top-10 w-full h-[500px]"
          viewBox="0 0 900 300"
          preserveAspectRatio="xMidYMid meet"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          style={{ y: alcoviaY }}
        >
          <defs>
            <linearGradient id="premiumFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EABF36" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#EABF36" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#EABF36" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="premiumStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EABF36" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#EABF36" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EABF36" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          <motion.text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="url(#premiumFill)"
            stroke="url(#premiumStroke)"
            strokeWidth="1.5"
            fontSize="200"
            fontWeight="900"
            letterSpacing="0.02em"
            style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              textShadow: "0 0 30px rgba(206,255,43,0.3)"
            }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            ALCOVIA
          </motion.text>
        </motion.svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 pt-12 md:pt-16">
        <div className="mb-16 flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-16">
          {/* Left Column - Headlines with Parallax */}
          <motion.div style={{ y: headlineY }}>
            <ScrollReveal className="w-fit">
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#0B0B0B]">
                PROUD TO CALL
              </h2>
            </ScrollReveal>
            <ScrollReveal className="w-fit">
              <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#0B0B0B]/60 mt-1">
                OUR MENTORS
              </h3>
            </ScrollReveal>
          </motion.div>

          {/* Right Column - Paragraph with Parallax */}
          <motion.div
            className="self-end mt-4 md:mt-0"
            style={{ y: paragraphY }}
          >
            <div className="text-sm sm:text-base md:text-base text-[#0B0B0B]/70 font-bold leading-relaxed">
              <ScrollReveal className="w-fit">
                <span>Alcovia is proud to collaborate with a range of mentors, who share</span>
              </ScrollReveal>
              <br className="hidden sm:block" />
              <ScrollReveal className="w-fit">
                <span>our passion for empowering students across India.</span>
              </ScrollReveal>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mentors Text */}
      <div className="relative w-full overflow-hidden mt-25 md:mt-45">
        <InfiniteScrollMentors />
      </div>
    </motion.section>
  )
}
