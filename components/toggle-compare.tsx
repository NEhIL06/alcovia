"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion"

const atSchool = {
  title: "AT SCHOOL",
  label: "01",
  tagline: "Excellence in Education",
  description: "Empowering students to achieve academic excellence through innovative learning methodologies and personalized support systems.",
  stats: [
    { value: "98%", label: "Success Rate" },
    { value: "500+", label: "Students" },
    { value: "50+", label: "Programs" }
  ],
  image: "/images/atschool.png",
  color: "#CCFF00"
}

const outsideSchool = {
  title: "OUTSIDE SCHOOL",
  label: "02",
  tagline: "Beyond the Classroom",
  description: "Building differentiation through real-world experiences, leadership development, and personal growth opportunities that shape future leaders.",
  stats: [
    { value: "100+", label: "Activities" },
    { value: "30+", label: "Partners" },
    { value: "24/7", label: "Support" }
  ],
  image: "/images/outsideschool.png",
  color: "#00F0FF"
}

export default function PremiumToggleCompare() {
  const [activeTab, setActiveTab] = useState<"school" | "outside">("school")
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 200 })
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 200 })

  const currentData = activeTab === "school" ? atSchool : outsideSchool

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mouseX.set((e.clientX - rect.left) / rect.width)
        mouseY.set((e.clientY - rect.top) / rect.height)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-black px-6 py-24 md:px-12"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${smoothMouseX.get() * 100}% ${smoothMouseY.get() * 100}%, ${currentData.color}15 0%, transparent 50%)`
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.3
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            opacity: [null, Math.random() * 0.5, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.div
            className="mb-4 inline-block"
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <span className="text-sm font-light tracking-[0.3em] text-white/40">ALCOVIA</span>
          </motion.div>
          <h1 className="text-5xl font-light text-white md:text-7xl lg:text-8xl">
            OUR <span className="font-bold">IMPACT</span>
          </h1>
        </motion.div>

        {/* Main toggle interface */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Toggle buttons */}
          <div className="flex flex-col justify-center space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`label-${activeTab}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="mb-4"
              >
                <span
                  className="text-6xl font-bold md:text-8xl"
                  style={{ color: currentData.color }}
                >
                  {currentData.label}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Toggle buttons */}
            <div className="space-y-6">
              {[
                { key: "school", data: atSchool },
                { key: "outside", data: outsideSchool }
              ].map(({ key, data }) => (
                <motion.button
                  key={key}
                  onClick={() => setActiveTab(key as "school" | "outside")}
                  onHoverStart={() => setIsHovering(true)}
                  onHoverEnd={() => setIsHovering(false)}
                  className="group relative w-full text-left"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/30">
                    {/* Active indicator */}
                    <AnimatePresence>
                      {activeTab === key && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-2xl"
                          style={{ backgroundColor: `${data.color}20` }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 30 }}
                        />
                      )}
                    </AnimatePresence>

                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <h3 className={`text-2xl font-bold transition-colors duration-300 md:text-3xl ${activeTab === key ? 'text-white' : 'text-white/50'
                          }`}>
                          {data.title}
                        </h3>
                        <p className={`mt-1 text-sm transition-colors duration-300 ${activeTab === key ? 'text-white/70' : 'text-white/30'
                          }`}>
                          {data.tagline}
                        </p>
                      </div>

                      <motion.div
                        animate={{ rotate: activeTab === key ? 0 : -90 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg
                          className={`h-6 w-6 transition-colors duration-300 ${activeTab === key ? 'text-white' : 'text-white/30'
                            }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Hover effect line */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px]"
                      style={{ backgroundColor: data.color }}
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`desc-${activeTab}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <p className="text-lg leading-relaxed text-white/70 md:text-xl">
                  {currentData.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6">
                  {currentData.stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="text-center"
                    >
                      <div
                        className="text-3xl font-bold md:text-4xl"
                        style={{ color: currentData.color }}
                      >
                        {stat.value}
                      </div>
                      <div className="mt-1 text-xs text-white/50">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  className="group relative overflow-hidden rounded-full border border-white/20 px-8 py-4 text-sm font-medium text-white transition-all hover:border-white/40"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{ backgroundColor: currentData.color }}
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center gap-2 transition-colors group-hover:text-black">
                    Learn More
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Image showcase */}
          <div className="relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`image-${activeTab}`}
                className="relative"
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute -inset-4 rounded-3xl opacity-50 blur-3xl"
                  style={{ backgroundColor: currentData.color }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Image container */}
                <motion.div
                  className="relative h-[500px] w-[350px] overflow-hidden rounded-3xl border border-white/20 md:h-[600px] md:w-[450px]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={currentData.image}
                    alt={currentData.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Placeholder gradient */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${currentData.color}40 0%, transparent 100%)`
                    }}
                  />

                  {/* Scan line effect */}
                  <motion.div
                    className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-white/10 to-transparent"
                    animate={{
                      y: ["-100%", "200%"]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  {/* Image overlay text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-center"
                    >
                      <div className="text-6xl font-bold text-white/20 md:text-8xl">
                        {currentData.label}
                      </div>
                      <div className="mt-4 text-xl text-white/40">
                        {currentData.title}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Corner accents */}
                {[
                  { top: -2, left: -2, rotate: 0 },
                  { top: -2, right: -2, rotate: 90 },
                  { bottom: -2, right: -2, rotate: 180 },
                  { bottom: -2, left: -2, rotate: 270 }
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-8 w-8"
                    style={{
                      ...pos,
                      rotate: pos.rotate
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 + 0.5 }}
                  >
                    <svg viewBox="0 0 20 20" fill="none">
                      <path
                        d="M0 0 L20 0 L20 2 L2 2 L2 20 L0 20 Z"
                        fill={currentData.color}
                      />
                    </svg>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom progress indicator */}
        <motion.div
          className="mt-20 flex justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {["school", "outside"].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab as "school" | "outside")}
              className="group relative"
              whileHover={{ scale: 1.1 }}
            >
              <div className={`h-1 w-12 rounded-full transition-all duration-500 ${activeTab === tab ? 'bg-white' : 'bg-white/20'
                }`}>
                {activeTab === tab && (
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: currentData.color }}
                    layoutId="progress"
                    transition={{ duration: 0.5, type: "spring" }}
                  />
                )}
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}