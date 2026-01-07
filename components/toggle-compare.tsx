"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

const sections = [
  {
    id: "at-school",
    topText: "AT",
    bottomText: "SCHOOL",
    description:
      "Empowering students to achieve academic excellence through innovative learning methodologies.",
    image: "/images/atschool.png",
  },
  {
    id: "outside-school",
    topText: "OUTSIDE",
    bottomText: "SCHOOL",
    description:
      "Building differentiation through real-world experiences and leadership development.",
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
  const leftOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 0.5, 1])

  const rightImageX = useTransform(scrollYProgress, [0, 0.3, 0.5], [200, 50, 0])
  const rightTextX = useTransform(scrollYProgress, [0, 0.3, 0.5], [100, 25, 0])
  const rightOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 0.5, 1])

  const headerY = useTransform(scrollYProgress, [0, 0.3], [50, 0])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden py-20 md:py-32"
    >
      {/* LEFT IMAGE */}
      <motion.div
        className="absolute bottom-0 left-0 top-0 hidden w-[22%] lg:block"
        style={{ x: leftImageX, opacity: leftOpacity }}
      >
        <div className="relative h-full w-full">
          <Image
            src={sections[0].image}
            alt="At School"
            fill
            className="object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#3d4a2a]" />
        </div>
      </motion.div>

      {/* RIGHT IMAGE */}
      <motion.div
        className="absolute bottom-0 right-0 top-0 hidden w-[22%] lg:block"
        style={{ x: rightImageX, opacity: rightOpacity }}
      >
        <div className="relative h-full w-full">
          <Image
            src={sections[1].image}
            alt="Outside School"
            fill
            className="object-cover object-left"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#3d4a2a]" />
        </div>
      </motion.div>

      {/* CENTER CONTENT */}
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        {/* HEADER */}
        <motion.div
          className="mb-12 text-center md:mb-24"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#F7F7F3] md:text-6xl lg:text-7xl">
            Our <span className="text-[#CEFF2B]">Impact</span>
          </h2>
        </motion.div>

        {/* 🔥 MOBILE: SIDE BY SIDE | DESKTOP: ROW */}
        <div className="grid grid-cols-2 gap-8 md:flex md:items-center md:justify-center md:gap-20 lg:gap-32">
          {/* AT SCHOOL */}
          <motion.div
            className="group cursor-pointer text-center"
            style={{ x: leftTextX, opacity: leftOpacity }}
          >
            <div className="relative mb-4">
              <span className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#F7F7F3] md:text-6xl lg:text-7xl">
                {sections[0].topText}
              </span>
              <div className="-mt-1">
                <span className="text-4xl font-black uppercase tracking-tight text-[#F7F7F3] md:text-6xl lg:text-7xl">
                  {sections[0].bottomText}
                </span>
              </div>
            </div>

            <p className="mx-auto max-w-[160px] text-xs leading-relaxed text-[#F7F7F3]/60 md:max-w-[200px] md:text-sm">
              {sections[0].description}
            </p>

            <motion.button
              className="mx-auto mt-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#CEFF2B] text-[#0C0C0C]"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              →
            </motion.button>
          </motion.div>

          {/* OUTSIDE SCHOOL */}
          <motion.div
            className="group cursor-pointer text-center"
            style={{ x: rightTextX, opacity: rightOpacity }}
          >
            <div className="relative mb-4">
              <span className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#F7F7F3] md:text-6xl lg:text-7xl">
                {sections[1].topText}
              </span>
              <div className="-mt-1">
                <span className="text-4xl font-black uppercase tracking-tight text-[#F7F7F3] md:text-6xl lg:text-7xl">
                  {sections[1].bottomText}
                </span>
              </div>
            </div>

            <p className="mx-auto max-w-[160px] text-xs leading-relaxed text-[#F7F7F3]/60 md:max-w-[200px] md:text-sm">
              {sections[1].description}
            </p>

            <motion.button
              className="mx-auto mt-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#CEFF2B] text-[#0C0C0C]"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              ←
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* MOBILE IMAGES */}
      <div className="mt-16 flex gap-4 px-6 lg:hidden">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            className="relative aspect-[3/4] flex-1 overflow-hidden rounded-2xl"
            initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Image src={section.image} alt="" fill className="object-cover" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
