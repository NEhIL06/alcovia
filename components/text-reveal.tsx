"use client"
import type React from "react"
import { useRef } from "react"
import { motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion"

interface TextRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  highlightColor?: string
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8, // Faster default to match Lando snappiness
  highlightColor = "#EABF36", // Default Lando Yellow/Green
}: TextRevealProps) {
  const ref = useRef(null)
  // Trigger when 20% of element is in view
  const isInView = useInView(ref, { once: true, margin: "-20%" })

  return (
    <span ref={ref} className={`relative inline-block overflow-hidden ${className}`}>
      {/* 1. THE TEXT (Hidden initially, reveals halfway) */}
      <motion.span
        className="relative z-10 block" // 'block' or 'inline-block' needed for transform
        initial={{ opacity: 0 }}
        animate={
          isInView
            ? { opacity: [0, 0, 1, 1] } // Stay 0, then switch to 1
            : { opacity: 0 }
        }
        transition={{
          delay,
          duration,
          times: [0, 0.49, 0.5, 1], // Switch opacity exactly when bar is full width
          ease: "linear",
        }}
      >
        {children}
      </motion.span>

      {/* 2. THE CURTAIN (Scale 0->1 Left, Switch, Scale 1->0 Right) */}
      <motion.span
        className="absolute inset-0 z-20"
        style={{ backgroundColor: highlightColor }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={
          isInView
            ? {
              scaleX: [0, 1, 1, 0], // Grow, Hold, Hold, Shrink
              originX: [0, 0, 1, 1], // Left, Left, Right, Right (The Switch)
            }
            : { scaleX: 0 }
        }
        transition={{
          delay,
          duration,
          times: [0, 0.5, 0.5, 1], // Syncs perfectly with the text reveal
          ease: "easeInOut", // Smooth growth/shrink
        }}
      />
    </span>
  )
}

interface MultiLineRevealProps {
  lines: Array<{ text?: string; content?: React.ReactNode; isAccent?: boolean }>
  className?: string
  lineClassName?: string
  baseDelay?: number
  staggerDelay?: number
  direction?: "left" | "right"
}

export function MultiLineReveal({
  lines,
  className = "",
  lineClassName = "",
  baseDelay = 0,
  staggerDelay = 0.1, // Tighter stagger for a "cascade" feel
  direction = "left",
}: MultiLineRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <div ref={ref} className={className}>
      {lines.map((line, index) => (
        <div key={index} className={`relative inline-block ${lineClassName}`}>

          {/* 1. THE TEXT */}
          <motion.span
            className="relative z-10 block px-1" // Added padding to prevent font clipping
            initial={{ opacity: 0 }}
            animate={
              isInView
                ? { opacity: [0, 0, 1, 1] }
                : { opacity: 0 }
            }
            transition={{
              delay: baseDelay + index * staggerDelay,
              duration: 0.8,
              times: [0, 0.49, 0.5, 1],
              ease: "linear",
            }}
          >
            {line.content || line.text}
          </motion.span>

          {/* 2. THE CURTAIN */}
          <motion.span
            className="absolute inset-0 z-20"
            style={{
              backgroundColor: line.isAccent ? "#EABF36" : "#EABF36" // Or use different colors if needed
            }}
            initial={{ scaleX: 0, originX: direction === "left" ? 0 : 1 }}
            animate={
              isInView
                ? {
                  scaleX: [0, 1, 1, 0],
                  originX: direction === "left" ? [0, 0, 1, 1] : [1, 1, 0, 0],
                }
                : { scaleX: 0 }
            }
            transition={{
              delay: baseDelay + index * staggerDelay,
              duration: 0.8,
              times: [0, 0.5, 0.5, 1],
              ease: "easeInOut",
            }}
          />
        </div>
      ))}
    </div>
  )
}

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  offset?: any // framer-motion offset type
  direction?: "left" | "right"
  progress?: MotionValue<number>
}

export function ScrollReveal({
  children,
  className = "",
  offset = ["start 95%", "start 45%"], // Slower/Smoother default
  direction = "left",
  progress
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: defaultScrollProgress } = useScroll({
    target: containerRef,
    offset: offset
  })

  const activeProgress = progress || defaultScrollProgress

  // 1. Mask Scale: Grows 0->1, stays 1, then shrinks 1->0
  const maskScale = useTransform(activeProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0])

  // 2. Mask Origin: Left for first half, Right for second half (if direction is left)
  // If direction is right: Right for first half, Left for second half
  const maskOrigin = useTransform(activeProgress, (v) => {
    if (direction === "left") {
      return v < 0.5 ? 0 : 1
    } else {
      return v < 0.5 ? 1 : 0
    }
  })

  // 3. Text Opacity: Hidden until mask is full, then visible
  // Smoother transition: [0.4, 0.6] instead of [0.45, 0.55]
  const textOpacity = useTransform(activeProgress, [0.4, 0.6], [0, 1])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-fit ${className}`}
    >
      {/* The Mask */}
      <motion.div
        className="absolute inset-0 z-20"
        style={{
          backgroundColor: '#EABF36',
          scaleX: maskScale,
          originX: maskOrigin
        }}
      />

      {/* The Text */}
      <motion.div
        style={{ opacity: textOpacity }}
      >
        {children}
      </motion.div>
    </div>
  )
}