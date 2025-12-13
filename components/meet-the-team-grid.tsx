"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import Image from "next/image"

// Team members data
const teamMembers = [
  {
    name: "Sahil Puri",
    role: "Founder",
    image: "/images/team/sahil.jpg",
    gradient: "from-[#CCFF00] to-[#0B0B0B]",
  },
  {
    name: "Lakshmi Mahajankatti",
    role: "Career Counsellor",
    image: "/images/team/lakshmi.jpg",
    gradient: "from-[#0B0B0B] to-[#CCFF00]",
  },
  {
    name: "Sanam Aryan",
    role: "Academic Advisor",
    image: "/images/team/sanam.jpg",
    gradient: "from-[#CCFF00] to-[#0B0B0B]",
  },
  {
    name: "Ansh Goyal",
    role: "Associate",
    image: "/images/team/ansh.jpg",
    gradient: "from-[#0B0B0B] to-[#CCFF00]",
  },
  {
    name: "Ruhani Taneja",
    role: "Associate",
    image: "/images/team/ruhani.jpg",
    gradient: "from-[#CCFF00] to-[#0B0B0B]",
  },
  {
    name: "Zuala K",
    role: "Associate",
    image: "/images/team/zuala.jpg",
    gradient: "from-[#0B0B0B] to-[#CCFF00]",
  },
]

function TeamCard({
  member,
  index,
  isInView,
}: {
  member: (typeof teamMembers)[0]
  index: number
  isInView: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.article
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl"
        whileHover={{ y: -10 }}
      >
        {/* Image container */}
        <div className="relative h-80 overflow-hidden md:h-[420px]">
          <Image
            src={member.image || "/placeholder.svg"}
            alt={`${member.name} - ${member.role}`}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.div
              className={`h-1 bg-gradient-to-r ${member.gradient} mb-4 rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "50%" : "25%" }}
              transition={{ duration: 0.5 }}
            />

            <h3 className="text-2xl font-bold text-white">{member.name}</h3>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-[#CCFF00]">
              {member.role}
            </p>
          </div>
        </div>

        {/* Neon border on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            boxShadow: isHovered ? "inset 0 0 0 3px #CCFF00" : "inset 0 0 0 0px #CCFF00",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.article>
  )
}

export default function MeetTheTeamGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" })

  return (
    <div ref={containerRef} className="bg-[#F5F5EF] text-[#0B0B0B] overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center px-6 py-24 md:px-12">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Subtle gradient orbs */}
          <motion.div
            className="absolute left-[5%] top-[15%] h-[500px] w-[500px] rounded-full opacity-30 blur-[150px]"
            style={{ background: "radial-gradient(circle, #CCFF00 0%, transparent 70%)" }}
            animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[10%] bottom-[20%] h-[400px] w-[400px] rounded-full opacity-15 blur-[120px]"
            style={{ background: "radial-gradient(circle, #0B0B0B 0%, transparent 70%)" }}
            animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />

          {/* Decorative circles */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-[#0B0B0B]/10"
              style={{
                width: 120 + i * 60,
                height: 120 + i * 60,
                left: `${20 + i * 15}%`,
                top: `${25 + (i % 2) * 25}%`,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 25 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block mb-6 px-4 py-2 rounded-full bg-[#CCFF00]/20 text-sm font-semibold uppercase tracking-[0.2em] text-[#0B0B0B]"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Our People
            </motion.span>
          </motion.div>

          <motion.h1
            className="text-5xl font-black uppercase tracking-tight md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-[#0B0B0B]">MEET THE</span>
            <br />
            <span className="relative">
              <span className="text-[#CCFF00]" style={{ WebkitTextStroke: "2px #0B0B0B" }}>TEAM</span>
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl mx-auto text-lg text-[#0B0B0B]/60 md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The passionate mentors and leaders dedicated to helping you soar
          </motion.p>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="relative px-6 py-20 md:px-12 bg-[#F5F5EF]">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} isInView={teamInView} />
            ))}
          </div>

          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <p className="mb-6 text-lg text-[#0B0B0B]/60">Want to be part of our mission?</p>
            <motion.button
              className="group relative overflow-hidden rounded-full bg-[#0B0B0B] px-8 py-4 font-semibold uppercase tracking-wide text-white transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-[#CCFF00]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 transition-colors group-hover:text-[#0B0B0B]">
                Join Our Team
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
