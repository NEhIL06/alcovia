"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import gsap from "gsap"
import anime from "animejs"
import { useHeroAnimation } from "@/context/hero-animation-context"
import InteractiveBackground from "./InteractiveBackground"
import { useGSAP } from "@gsap/react"
import { ArrowUpRight, Lock, Unlock, MousePointerClick } from "lucide-react"

import {
  checkReducedMotion,
  isMobile,
  initPageLoadTimeline,
  initSpotlightBreathing,
  createWingRevealTimeline,
  createWingHoverAnimation,
  createWingFoldAnimation,
  createCTAMagneticPull,
  createCTANeonSweep,
  createCTAClickRipple,
  createAmbientParticles,
  createPlaneTakeoff,
  COLORS,
} from "@/lib/hero-animations"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const leftWingRef = useRef<HTMLDivElement>(null)
  const rightWingRef = useRef<HTMLDivElement>(null)
  const wingsContainerRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  // --- MOBILE TAGLINE REFS ---
  const taglineLinesRef = useRef<(HTMLDivElement | null)[]>([])
  const heroTaglineLines = [
    "World's first Ambition",
    "building program for Teenagers."
  ]

  // --- CANVAS REVEAL REFS ---
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const revealImageRef = useRef<HTMLImageElement | null>(null)
  const baseImageDimsRef = useRef<{ width: number; height: number } | null>(null)
  const trailRef = useRef<{ x: number; y: number; age: number; force: number }[]>([])
  const lastMousePos = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  const { setHeroAnimationComplete } = useHeroAnimation()
  const [isRevealed, setIsRevealed] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isScrollLocked, setIsScrollLocked] = useState(false)

  const wingRevealTlRef = useRef<gsap.core.Timeline | null>(null)
  const wingFoldTlRef = useRef<gsap.core.Tween | null>(null)
  const leftWingAnimRef = useRef<ReturnType<typeof createWingHoverAnimation> | null>(null)
  const rightWingAnimRef = useRef<ReturnType<typeof createWingHoverAnimation> | null>(null)
  const particlesRef = useRef<ReturnType<typeof createAmbientParticles> | null>(null)
  const ctaSweepRef = useRef<ReturnType<typeof createCTANeonSweep> | null>(null)
  const ctaMagneticCleanupRef = useRef<(() => void) | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.78])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -120])

  // --- PRELOAD REVEAL IMAGE ---
  useEffect(() => {
    const img = new window.Image()
    img.src = "/images/hero-girl-reveal.png"
    img.onload = () => {
      revealImageRef.current = img
    }
  }, [])

  // --- CANVAS LOOP ---
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    const render = () => {
      // 1. Fade out existing trail
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 2. Update Trail
      // Age points first
      trailRef.current.forEach((p) => {
        p.age -= 0.02 // Decay rate
      })

      // Remove old points
      trailRef.current = trailRef.current.filter((p) => p.age > 0)

      // 3. Draw Trail (The Mask)
      if (trailRef.current.length > 0) {
        ctx.lineCap = "round"
        ctx.lineJoin = "round"

        ctx.save()
        // Create the "Mask" shape (White)
        trailRef.current.forEach((p) => {
          // Safety check: Ensure size is never negative
          const size = Math.max(0, 80 * p.age)
          const alpha = Math.max(0, p.age)

          ctx.beginPath()
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`

          // Soft edges
          ctx.shadowColor = "white"
          ctx.shadowBlur = 30

          ctx.fill()
        })
        ctx.restore()

        // 4. Composite the Reveal Image
        // 'source-in' keeps the source (image) only where the destination (trail) is opaque.
        if (revealImageRef.current) {
          ctx.globalCompositeOperation = "source-in"

          // Calculate dimensions to match 'object-contain object-bottom'
          const img = revealImageRef.current
          
          // Use Base Image aspect ratio if available to ensure perfect alignment
          // otherwise fall back to reveal image aspect ratio
          const imgAspect = baseImageDimsRef.current 
            ? baseImageDimsRef.current.width / baseImageDimsRef.current.height
            : img.width / img.height

          const canvasAspect = canvas.width / canvas.height

          let drawWidth, drawHeight, offsetX, offsetY

          if (canvasAspect > imgAspect) {
            // Canvas is wider than image -> Fit to height
            drawHeight = canvas.height
            drawWidth = canvas.height * imgAspect
            offsetX = (canvas.width - drawWidth) / 2
            offsetY = 0
          } else {
            // Canvas is taller than image -> Fit to width
            drawWidth = canvas.width
            drawHeight = canvas.width / imgAspect
            offsetX = 0
            offsetY = canvas.height - drawHeight // Align bottom
          }

          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)

          // Reset composite
          ctx.globalCompositeOperation = "source-over"
        }
      }

      rafRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // --- RESIZE OBSERVER FOR CANVAS ---
  useEffect(() => {
    if (!portraitRef.current || !canvasRef.current) return

    const updateSize = () => {
      if (!portraitRef.current || !canvasRef.current) return
      const rect = portraitRef.current.getBoundingClientRect()
      // Set actual canvas size to match display size for sharpness
      canvasRef.current.width = rect.width
      canvasRef.current.height = rect.height
    }

    const observer = new ResizeObserver(updateSize)
    observer.observe(portraitRef.current)
    updateSize() // Initial size

    return () => observer.disconnect()
  }, [])


  useEffect(() => {
    const reducedMotion = checkReducedMotion()
    setPrefersReducedMotion(reducedMotion)

    const timer = setTimeout(() => {
      setIsRevealed(true)

      initPageLoadTimeline({
        spotlight: spotlightRef.current || undefined,
        student: portraitRef.current || undefined,
        cta: ctaRef.current || undefined,
      })

      if (spotlightRef.current) {
        initSpotlightBreathing(spotlightRef.current)
      }

      if (leftWingRef.current && rightWingRef.current) {
        wingRevealTlRef.current = createWingRevealTimeline({
          leftWing: leftWingRef.current,
          rightWing: rightWingRef.current,
          wingsContainer: wingsContainerRef.current || undefined,
        })

        leftWingAnimRef.current = createWingHoverAnimation(leftWingRef.current, true)
        rightWingAnimRef.current = createWingHoverAnimation(rightWingRef.current, false)

        wingFoldTlRef.current = createWingFoldAnimation(
          leftWingRef.current,
          rightWingRef.current
        )
      }

      if (ctaRef.current) {
        ctaSweepRef.current = createCTANeonSweep(ctaRef.current)
        ctaMagneticCleanupRef.current = createCTAMagneticPull({
          button: ctaRef.current,
          magnetRadius: 80,
        })
      }

      if (containerRef.current) {
        particlesRef.current = createAmbientParticles({
          container: containerRef.current,
          maxParticles: isMobile() ? 12 : 25,
        })
      }

      const animationCompleteTimer = setTimeout(() => {
        setHeroAnimationComplete(true)
      }, 1700)

      return () => {
        clearTimeout(animationCompleteTimer)
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      particlesRef.current?.destroy()
      if (ctaMagneticCleanupRef.current) ctaMagneticCleanupRef.current()
    }
  }, [])

  // --- TAGLINE ANIMATION (Separate useEffect for timing) ---
  useEffect(() => {
    if (!isRevealed) return

    // Small delay to ensure refs are populated
    const timer = setTimeout(() => {
      taglineLinesRef.current.forEach((line, i) => {
        if (!line) return

        const mask = line.querySelector(".tagline-mask")
        const text = line.querySelector(".tagline-text")

        if (!mask || !text) return

        const tl = gsap.timeline({
          defaults: { ease: "power3.inOut" }
        })

        gsap.set(mask, { scaleX: 0, transformOrigin: "left" })
        gsap.set(text, { opacity: 0 })

        tl.to(mask, {
          scaleX: 1,
          duration: 0.4,
        }, i * 0.15)

        tl.set(mask, { transformOrigin: "right" }, ">")
        tl.set(text, { opacity: 1 }, ">")

        tl.to(mask, {
          scaleX: 0,
          duration: 0.4,
        }, ">")
      })
    }, 200)

    return () => clearTimeout(timer)
  }, [isRevealed])

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      if (value > 0.3 && wingFoldTlRef.current && !isHovering) {
        wingFoldTlRef.current.play()
      } else if (value <= 0.3 && wingFoldTlRef.current) {
        wingFoldTlRef.current.reverse()
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress, isHovering])

  // --- SCROLL LOCK EFFECT ---
  useEffect(() => {
    if (isScrollLocked) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isScrollLocked])

  const handlePortraitMouseEnter = useCallback(() => {
    setIsHovering(true)
    if (prefersReducedMotion) return
    wingRevealTlRef.current?.play()
  }, [prefersReducedMotion])

  const handlePortraitMouseLeave = useCallback(() => {
    setIsHovering(false)
    if (prefersReducedMotion) return
    wingRevealTlRef.current?.reverse()
  }, [prefersReducedMotion])

  const handlePortraitMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!portraitRef.current) return

      const rect = portraitRef.current.getBoundingClientRect()

      // Calculate normalized coordinates for rotation (-0.5 to 0.5)
      const normalizedX = (e.clientX - rect.left) / rect.width - 0.5
      const normalizedY = (e.clientY - rect.top) / rect.height - 0.5

      // Calculate pixel coordinates for mask/trail
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // --- ADD TO TRAIL ---
      // Interpolate points if moving fast for smoother trail
      const dist = Math.hypot(x - lastMousePos.current.x, y - lastMousePos.current.y)
      if (dist > 5) {
        trailRef.current.push({ x, y, age: 1.0, force: 1.0 })
        lastMousePos.current = { x, y }
      }

      if (prefersReducedMotion) return

      gsap.to(portraitRef.current, {
        rotateY: normalizedX * 8,
        rotateX: -normalizedY * 8,
        ease: "power2.out",
        duration: 0.3,
      })

      if (isHovering) {
        leftWingAnimRef.current?.follow(normalizedX, normalizedY)
        rightWingAnimRef.current?.follow(normalizedX, normalizedY)
      }
    },
    [prefersReducedMotion, isHovering]
  )

  const handlePortraitMouseLeaveReset = useCallback(() => {
    if (!portraitRef.current) return
    gsap.to(portraitRef.current, {
      rotateY: 0,
      rotateX: 0,
      ease: "power2.out",
      duration: 0.5,
    })
    handlePortraitMouseLeave()
  }, [handlePortraitMouseLeave])

  const handleCTAClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ctaRef.current || !containerRef.current) return

      createCTAClickRipple(ctaRef.current, e.nativeEvent)

      const rect = ctaRef.current.getBoundingClientRect()
      createPlaneTakeoff(
        containerRef.current,
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      )

      // Navigate to signup form after animation
      setTimeout(() => {
        window.open("https://docs.google.com/forms/d/e/1FAIpQLScvrS8qOc0BaUBKqw5-GSG6oyyBvK3fs0aklTw0eszc1EvBUg/viewform", "_blank")
      }, 800)
    },
    []
  )

  const RotatingEventIcon = () => {
    const iconRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
      // No-op for now as we switched to anime.js, but keeping useGSAP if needed for other parts
      // or we can just use useEffect
    }, { scope: iconRef })

    useEffect(() => {
      if (!iconRef.current) return

      // Set initial tilt
      anime.set(iconRef.current, {
        rotateX: 45,
        rotateZ: 45
      })

      // Continuous 3D Spin
      anime({
        targets: iconRef.current,
        rotateY: 360,
        duration: 8000,
        loop: true,
        easing: 'linear'
      })
    }, [])

    return (
      <div
        ref={iconRef}
        className="w-20 h-20 text-[#0C0C0C] relative"
        style={{ perspective: "500px", transformStyle: "preserve-3d" }}
      >
        {/* 3D Airplane with gradient shading */}
        <svg
          viewBox="0 0 64 64"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          {/* GRADIENT DEFINITIONS */}
          <defs>
            {/* Fuselage gradient - top to bottom shading */}
            <linearGradient id="fuselageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E0E0E0" />
              <stop offset="40%" stopColor="#F5F5F5" />
              <stop offset="60%" stopColor="#F5F5F5" />
              <stop offset="100%" stopColor="#C0C0C0" />
            </linearGradient>

            {/* Left wing gradient - darker on outer edge */}
            <linearGradient id="leftWingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A0A0A0" />
              <stop offset="50%" stopColor="#D0D0D0" />
              <stop offset="100%" stopColor="#E8E8E8" />
            </linearGradient>

            {/* Right wing gradient - darker on outer edge */}
            <linearGradient id="rightWingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E8E8E8" />
              <stop offset="50%" stopColor="#D0D0D0" />
              <stop offset="100%" stopColor="#A0A0A0" />
            </linearGradient>

            {/* Engine gradient */}
            <linearGradient id="engineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#707070" />
              <stop offset="50%" stopColor="#909090" />
              <stop offset="100%" stopColor="#606060" />
            </linearGradient>

            {/* Cockpit gradient */}
            <linearGradient id="cockpitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#505050" />
              <stop offset="50%" stopColor="#707070" />
              <stop offset="100%" stopColor="#404040" />
            </linearGradient>
          </defs>

          {/* DROP SHADOW */}
          <g opacity="0.15" transform="translate(2, 3)">
            <path d="M32 8 C32 8, 30 12, 30 20 L30 44 C30 46, 31 48, 32 50 C33 48, 34 46, 34 44 L34 20 C34 12, 32 8, 32 8" fill="#000" />
            <path d="M30 26 L8 32 L8 34 L12 34 L16 33 L20 33 L24 32 L30 30 Z" fill="#000" />
            <path d="M34 26 L56 32 L56 34 L52 34 L48 33 L44 33 L40 32 L34 30 Z" fill="#000" />
          </g>

          {/* LEFT WING with gradient */}
          <path
            d="M30 26 L8 32 L8 34 L12 34 L16 33 L20 33 L24 32 L30 30 Z"
            fill="url(#leftWingGrad)"
            stroke="#606060"
            strokeWidth="1.5"
          />

          {/* RIGHT WING with gradient */}
          <path
            d="M34 26 L56 32 L56 34 L52 34 L48 33 L44 33 L40 32 L34 30 Z"
            fill="url(#rightWingGrad)"
            stroke="#606060"
            strokeWidth="1.5"
          />

          {/* FUSELAGE with gradient */}
          <path
            d="M32 8 C32 8, 30 12, 30 20 L30 44 C30 46, 31 48, 32 50 C33 48, 34 46, 34 44 L34 20 C34 12, 32 8, 32 8"
            fill="url(#fuselageGrad)"
            stroke="#505050"
            strokeWidth="2"
          />

          {/* Wing engines with metallic gradient */}
          <rect x="14" y="30" width="4" height="6" rx="1" fill="url(#engineGrad)" stroke="#404040" strokeWidth="1.2" />
          <rect x="22" y="29" width="4" height="6" rx="1" fill="url(#engineGrad)" stroke="#404040" strokeWidth="1.2" />
          <rect x="46" y="30" width="4" height="6" rx="1" fill="url(#engineGrad)" stroke="#404040" strokeWidth="1.2" />
          <rect x="38" y="29" width="4" height="6" rx="1" fill="url(#engineGrad)" stroke="#404040" strokeWidth="1.2" />

          {/* Tail wings */}
          <path d="M30 44 L24 48 L24 50 L30 47 Z" fill="#D0D0D0" stroke="#606060" strokeWidth="1.2" />
          <path d="M34 44 L40 48 L40 50 L34 47 Z" fill="#D0D0D0" stroke="#606060" strokeWidth="1.2" />

          {/* Vertical stabilizer */}
          <path d="M31 44 L32 40 L33 44 L33 52 L31 52 Z" fill="#C0C0C0" stroke="#505050" strokeWidth="1.2" />

          {/* Cockpit with glass effect */}
          <ellipse cx="32" cy="17" rx="1.5" ry="4" fill="url(#cockpitGrad)" stroke="#303030" strokeWidth="1" />

          {/* Highlight on fuselage */}
          <path d="M31.5 12 L31.5 35" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.4" />

          {/* Motion lines */}
          <line x1="16" y1="40" x2="16" y2="52" stroke="#0C0C0C" strokeWidth="1" opacity="0.2" />
          <line x1="24" y1="42" x2="24" y2="56" stroke="#0C0C0C" strokeWidth="1" opacity="0.2" />
          <line x1="40" y1="42" x2="40" y2="56" stroke="#0C0C0C" strokeWidth="1" opacity="0.2" />
          <line x1="48" y1="40" x2="48" y2="52" stroke="#0C0C0C" strokeWidth="1" opacity="0.2" />
        </svg>
      </div>
    )
  }

  const handleCTAMouseEnter = useCallback(() => {
    ctaSweepRef.current?.play()
  }, [])

  const handleMobileTap = useCallback(() => {
    if (!isMobile()) return
    setIsHovering((prev) => !prev)

    if (!isHovering) {
      wingRevealTlRef.current?.play()
    } else {
      wingRevealTlRef.current?.reverse()
    }
  }, [isHovering])

  return (
    <motion.section
      id="hero"
      ref={containerRef}
      className="hero-viewport relative flex min-h-screen items-end justify-center overflow-hidden bg-white pb-0"
      style={{ scale, opacity, y }}
      role="region"
      aria-label="Hero section - Take flight with Alcovia"
    >
      {/* Interactive Fluid Background */}
      <InteractiveBackground />

      <div
        ref={spotlightRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-0"
        style={{
          background: "radial-gradient(circle, rgba(206,255,43,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6">
        {/* Mobile/Tablet Tagline - Hidden on Desktop */}
        {/* Mobile/Tablet Tagline - Hidden on Desktop */}
        <div className="xl:hidden mb-6 mt-20 flex flex-col items-center text-center mobile-tagline">
          {heroTaglineLines.map((line, i) => (
            <div
              key={i}
              ref={(el) => { taglineLinesRef.current[i] = el }}
              className="relative overflow-hidden w-fit my-[-0.05em]"
            >
              <div
                className="tagline-mask absolute inset-0 z-20 bg-[#EABF36]"
              />
              <p
                className="tagline-text opacity-0 font-[family-name:var(--font-milan)] text-[27px] font-normal leading-[1.2] tracking-tight text-[#0C0C0C] sm:text-[42px] md:text-[42px] whitespace-nowrap px-1"
              >
                {line}
              </p>
            </div>
          ))}
        </div>
        <div
          className="hero-center relative flex items-end justify-center"
          onClick={handleMobileTap}
        >
          <div
            ref={wingsContainerRef}
            className="pointer-events-none absolute inset-0 z-10 block"
            role="img"
            aria-label="Wings symbolising growth and potential"
          >
            <div
              ref={leftWingRef}
              className="absolute"
              style={{
                opacity: 0,
                transform: "scale(0.8)",
                left: "50%",
                top: "50%",
                marginLeft: "-350px",
                marginTop: "-250px",
              }}
            >
              <Image
                src="/images/element-download-1764790639.png"
                alt=""
                width={438}
                height={438}
                className="object-contain"
                style={{
                  filter: "drop-shadow(0 10px 40px rgba(206,255,43,0.3))",
                  transform: "scaleX(-1)",
                }}
              />
            </div>

            <div
              ref={rightWingRef}
              className="absolute"
              style={{
                opacity: 0,
                transform: "scale(0.8)",
                right: "50%",
                top: "50%",
                marginRight: "-350px",
                marginTop: "-250px",
              }}
            >
              <Image
                src="/images/element-download-1764790639.png"
                alt=""
                width={438}
                height={438}
                className="object-contain"
                style={{
                  filter: "drop-shadow(0 10px 40px rgba(206,255,43,0.3))",
                }}
              />
            </div>
          </div>

          {/* Girl Image - 25% larger, anchored to bottom */}
          <motion.div
            ref={portraitRef}
            className="relative z-20 h-[595px] w-[395px] cursor-pointer overflow-hidden rounded-t-3xl bg-transparent md:h-[750px] md:w-[525px] xl:h-[750px] xl:w-[550px]"
            style={{
              perspective: 1000,
              transformStyle: "preserve-3d",
            }}
            initial={{ clipPath: "circle(0% at 50% 100%)" }}
            animate={isRevealed ? { clipPath: "circle(150% at 50% 100%)" } : {}}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
            onMouseEnter={handlePortraitMouseEnter}
            onMouseMove={handlePortraitMouseMove}
            onMouseLeave={handlePortraitMouseLeaveReset}
            onClick={handleMobileTap}
          >
            {/* Base Image */}
            <Image
              src="/images/hero-girl.png"
              alt="Young Indian student ready to take flight with Alcovia - representing ambition and growth"
              fill
              className="object-contain object-bottom"
              style={{ filter: "contrast(1.05) saturate(0.95) brightness(0.98)" }}
              priority
              onLoad={(e) => {
                const img = e.target as HTMLImageElement
                baseImageDimsRef.current = { width: img.naturalWidth, height: img.naturalHeight }
              }}
            />

            {/* Reveal Layer (Masked) with Water Distortion */}
            {/* <div
              className="absolute inset-0 z-10"
              style={{
                maskImage: "radial-gradient(circle 280px at var(--mask-x, 50%) var(--mask-y, 50%), black 50%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(circle 280px at var(--mask-x, 50%) var(--mask-y, 50%), black 50%, transparent 100%)",
              }}
            >
              {/* SVG Filter for Water Distortion */}
            {/* <svg className="absolute w-0 h-0">
                <defs>
                  <filter id="waterDistortion" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.015"
                      numOctaves="3"
                      result="noise"
                      seed="5"
                    >
                      <animate
                        attributeName="baseFrequency"
                        dur="8s"
                        values="0.015;0.02;0.015"
                        repeatCount="indefinite"
                      />
                    </feTurbulence>
                    <feDisplacementMap
                      in="SourceGraphic"
                      in2="noise"
                      scale="12"
                      xChannelSelector="R"
                      yChannelSelector="G"
                    />
                    <feGaussianBlur stdDeviation="0.5" />
                  </filter>
                </defs>
              </svg> 

              <Image
                src="/images/hero-girl-reveal.png"
                alt="Reveal effect"
                fill
                className="object-contain object-bottom"
                style={{ filter: "url(#waterDistortion)" }}
                priority
              />
            </div> */}
            {/* CANVAS REVEAL LAYER */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 z-10 pointer-events-none"
            />

            <motion.div
              className="pointer-events-none absolute inset-0 rounded-t-3xl"
              animate={{
                boxShadow: isHovering
                  ? "0 0 80px 30px rgba(206,255,43,0.25), inset 0 0 60px rgba(206,255,43,0.08)"
                  : "0 0 0px 0px rgba(206,255,43,0)",
              }}
              transition={{ duration: 0.4 }}
            />

            <motion.div
              className="pointer-events-none absolute inset-0 rounded-t-3xl border-2 border-transparent"
              animate={{
                borderColor: isHovering ? "rgba(206,255,43,0.15)" : "rgba(206,255,43,0)",
                boxShadow: isHovering
                  ? "inset 0 0 20px rgba(206,255,43,0.1)"
                  : "none",
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Desktop-only Tagline - Side of Hero Image */}
          <motion.div
            className="hidden xl:flex absolute right-[-320px] top-1/2 -translate-y-1/2 flex-col items-start z-30"
            initial={{ opacity: 0, x: -30 }}
            animate={isRevealed ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-[#0C0C0C] font-[family-name:var(--font-milan)] text-xl leading-relaxed tracking-tight max-w-[250px]">
              World's first
            </p>
            <p className="text-[#EABF36] font-[family-name:var(--font-milan)] text-2xl font-semibold leading-relaxed tracking-tight max-w-[250px]">
              Ambition Building
            </p>
            <p className="text-[#0C0C0C] font-[family-name:var(--font-milan)] text-xl leading-relaxed tracking-tight max-w-[250px]">
              Program for Teenagers
            </p>
          </motion.div>
        </div>



        {/* Upcoming Workshops Widget - Left Side, Desktop Only */}
        <motion.div
          className="absolute bottom-32 left-6 z-30 hidden md:block md:bottom-8 md:left-1 xl:bottom-[clamp(100px,12vh,200px)] xl:left-0"
          initial={{ opacity: 0, y: 20 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <a href="/events" className="group block">
            {/* McLaren-Style Card Layout 
           - Fixed width/height
           - Distinct border
           - Structured Header/Body/Footer
        */}
            <div className="relative flex h-[240px] w-[180px] flex-col rounded-xl border-2 border-[#0C0C0C] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#EABF36]">

              {/* HEADER: "NEXT RACE" style */}
              <div className="border-b-2 border-[#0C0C0C] px-4 py-2 bg-[#f4f4f4] rounded-t-[9px]">
                <span className="block text-[10px] font-black uppercase tracking-widest text-[#0C0C0C]/60">
                  NEXT EVENT
                </span>
              </div>

              {/* BODY: Rotating Graphic */}
              <div className="flex-1 flex items-center justify-center py-2 bg-white relative overflow-hidden">
                {/* Background Grid Pattern (Optional subtle detail) */}
                <div className="absolute inset-0 opacity-[0.03]"
                  style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "10px 10px" }}
                />

                <RotatingEventIcon />
              </div>

              {/* FOOTER: Event Details */}
              <div className="border-t-2 border-[#0C0C0C] p-4 bg-white rounded-b-[9px]">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="block text-[9px] font-bold uppercase text-[#EABF36]">
                      WORKSHOP
                    </span>
                    <h4 className="text-sm font-black uppercase leading-none text-[#0C0C0C] mt-1">
                      INDUSTRY<br />DISCOVERY
                    </h4>
                  </div>

                  {/* Date Badge */}
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-black text-[#0C0C0C] leading-none">17</span>
                    <span className="text-[8px] font-bold uppercase text-[#0C0C0C]/60">JAN</span>
                  </div>
                </div>

                {/* Hover Action */}
                <div className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase text-[#0C0C0C] opacity-0 transition-opacity group-hover:opacity-100">
                  <span>Register Now</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>

            </div>
          </a>
        </motion.div>

        {/* Desktop CTA - Bottom Right */}
        <div className="absolute bottom-8 right-6 z-30 hidden flex-col items-center gap-6 md:flex md:bottom-8 md:right-6 xl:bottom-[clamp(100px,12vh,200px)] xl:right-12 xl:items-end">
          <motion.button
            ref={ctaRef}
            className="group relative overflow-hidden rounded-full border-2 border-[#0C0C0C] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#0C0C0C] transition-all hover:border-[#EABF36] focus:outline-none focus:ring-2 focus:ring-[#EABF36] focus:ring-offset-2 md:px-8 md:py-4"
            style={{ opacity: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onMouseEnter={handleCTAMouseEnter}
            onClick={handleCTAClick}
            aria-label="Start your journey at Alcovia"
          >
            <span className="relative z-10 transition-colors group-hover:text-[#0C0C0C]">
              Start Your Journey
            </span>
            <motion.div
              className="absolute inset-0 -z-0 bg-[#EABF36]"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.button>
        </div>
      </div>

      <style jsx>{`
        @media screen and (max-width: 376px) and (max-height: 668px) {
          .mobile-tagline {
            margin-top: 13rem !important; /* mt-52 equivalent */
          }
        }
      `}</style>
      {/* Scroll Lock Button - Mobile Only */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-xl bg-[#EABF36] shadow-lg md:hidden"
        onClick={(e) => {
          e.stopPropagation()
          setIsScrollLocked(!isScrollLocked)
        }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
      >
        {isScrollLocked ? (
          <Lock className="h-6 w-6 text-[#0C0C0C]" />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <MousePointerClick className="h-6 w-6 text-[#0C0C0C]" />
            <span className="text-[8px] font-bold leading-none text-[#0C0C0C] mt-0.5">LOCK</span>
          </div>
        )}
      </motion.button>

    </motion.section >
  )
}
