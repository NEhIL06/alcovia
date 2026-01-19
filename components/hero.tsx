"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import anime from "animejs"
import { useHeroAnimation } from "@/context/hero-animation-context"
import InteractiveBackground from "./InteractiveBackground"
import { useGSAP } from "@gsap/react"
import { ArrowUpRight } from "lucide-react"
import { useCanvasLiquidReveal } from "@/hooks/useCanvasLiquidReveal"
import { useDepthMapParallax } from "@/hooks/useDepthMapParallax"

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

    // --- SCROLLYTELLING REFS ---
    const scrollyContainerRef = useRef<HTMLDivElement>(null)
    const clipMaskRef = useRef<HTMLDivElement>(null)
    const signaturePathRef = useRef<SVGPathElement>(null)

    // --- HERO MARQUEE SCROLL REFS ---
    const heroMarqueeRef = useRef<HTMLDivElement>(null)
    const heroScrollPosRef = useRef(0)
    const heroAnimationFrameRef = useRef<number | null>(null)
    const [heroMarqueeSpeed, setHeroMarqueeSpeed] = useState(0.5)

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

    // Removed fly-away animation - hero stays in place during scrollytelling
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1])
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 1])
    const y = useTransform(scrollYProgress, [0, 1], [0, 0])

    // --- PRELOAD REVEAL IMAGE ---
    useEffect(() => {
        const img = new window.Image()
        img.src = "/images/hero-girl-reveal.png"
        img.onload = () => {
            revealImageRef.current = img
        }
    }, [])

    // --- HERO MARQUEE RESPONSIVE SPEED ---
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            // Mobile: VERY slow (0.1), Desktop: normal speed (0.5)
            setHeroMarqueeSpeed(width < 768 ? 0.1 : 0.5)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // --- HERO MARQUEE SCROLL ANIMATION ---
    useEffect(() => {
        const container = heroMarqueeRef.current
        if (!container) return

        const animate = () => {
            const oneHalf = container.scrollWidth / 2
            if (heroScrollPosRef.current === 0) {
                heroScrollPosRef.current = 0
                container.scrollLeft = 0
            }
            heroScrollPosRef.current += heroMarqueeSpeed
            if (heroScrollPosRef.current >= oneHalf) {
                heroScrollPosRef.current = 0
                container.scrollLeft = 0
            } else {
                container.scrollLeft = heroScrollPosRef.current
            }
            heroAnimationFrameRef.current = requestAnimationFrame(animate)
        }

        heroAnimationFrameRef.current = requestAnimationFrame(animate)
        return () => {
            if (heroAnimationFrameRef.current) cancelAnimationFrame(heroAnimationFrameRef.current)
        }
    }, [heroMarqueeSpeed])

    // --- CANVAS LOOP (Using Liquid Reveal Hook) ---
    useCanvasLiquidReveal({ canvasRef, revealImageRef, baseImageDimsRef, trailRef })

    // --- DEPTH MAP 3D PARALLAX EFFECT ---
    useDepthMapParallax({
        containerRef: portraitRef,
        imageRef: portraitRef,
        depthMapUrl: "/images/hero-girl-depth.png",
        intensity: 25,
        enabled: !prefersReducedMotion,
    })

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

    // --- SCROLLYTELLING ANIMATION (GSAP ScrollTrigger) ---
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        if (!isRevealed || prefersReducedMotion) return
        if (!scrollyContainerRef.current || !clipMaskRef.current) return

        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger)

        // Get signature path for stroke animation
        const signaturePath = signaturePathRef.current
        let pathLength = 0
        if (signaturePath) {
            pathLength = signaturePath.getTotalLength()
            gsap.set(signaturePath, {
                strokeDasharray: pathLength,
                strokeDashoffset: pathLength,
            })
        }

        // Determine scroll height based on screen size
        const isMobileDevice = window.innerWidth < 640
        const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024

        // Create ScrollTrigger timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scrollyContainerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5, // Smooth damping for premium feel
                onUpdate: (self) => {
                    setScrollProgress(self.progress)
                }
            }
        })

        // Clip-path animation: 
        // Mobile: SQUARE shape (equal top/bottom, equal left/right)
        // Desktop: RECTANGLE (less vertical, more horizontal inset)
        const clipInset = isMobileDevice
            ? "30% 20% 30% 20%"  // Mobile: Square frame (more vertical = square on portrait)
            : isTablet
                ? "20% 28% 20% 28%"  // Tablet: Smaller rectangle
                : "30% 30% 30% 30%"  // Desktop: Smaller rectangle (more horizontal inset)

        tl.to(clipMaskRef.current, {
            clipPath: `inset(${clipInset})`,
            ease: "none",
        }, 0)

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill())
        }
    }, [isRevealed, prefersReducedMotion])

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
            </div >
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
        <>
            {/* SCROLLYTELLING WRAPPER - Provides scroll distance for animation */}
            <div
                ref={scrollyContainerRef}
                className="relative h-[200vh] sm:h-[250vh] lg:h-[300vh] mb-40"
            >
                {/* STICKY CONTAINER - Hero stays pinned while scrolling through wrapper */}
                <div className="sticky top-0 h-screen overflow-hidden">
                    {/* CLIP-PATH MASK - Animates edges closing in */}
                    <div
                        ref={clipMaskRef}
                        className="absolute inset-0 will-change-[clip-path]"
                        style={{ clipPath: "inset(0% 0% 0% 0%)" }}
                    >
                        <motion.section
                            id="hero"
                            ref={containerRef}
                            className="hero-viewport relative flex h-full min-h-screen items-end justify-center overflow-hidden bg-white pb-0"
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

                            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-50  ">
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
                                    style={{ marginTop: "40%" }}
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
                                        className="relative z-20 h-[595px] w-[395px] cursor-pointer overflow-hidden rounded-t-3xl bg-transparent md:h-[650px] md:w-[480px] xl:h-[650px] xl:w-[500px]"
                                        style={{
                                            perspective: 200,  // Reduced from 1000 for subtler parallax
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
                                        className="hidden xl:flex absolute right-[-350px] top-1/2 -translate-y-1/2 flex-col items-start z-30"
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{
                                            opacity: isRevealed && scrollProgress < 0.05 ? 1 : 0,
                                            x: scrollProgress < 0.05 ? 0 : -30,
                                            pointerEvents: scrollProgress < 0.05 ? "auto" : "none"
                                        }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
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
                                    className="absolute bottom-32 left-6 z-30 hidden md:block md:bottom-8 md:left-1 xl:bottom-[clamp(100px,12vh,200px)] xl:left-2"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isRevealed ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 1.5, duration: 0.8 }}
                                >
                                    <a href="https://forms.gle/TJZ2FfN4KvtrKyPL7" target="_blank" rel="noopener noreferrer" className="group block">
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
                                <motion.div
                                    className="absolute bottom-8 right-6 z-30 hidden flex-col items-center gap-6 md:flex md:bottom-8 md:right-6 xl:bottom-[clamp(100px,12vh,200px)] xl:right-12 xl:items-end"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: isRevealed && scrollProgress < 0.05 ? 1 : 0,
                                        pointerEvents: scrollProgress < 0.05 ? "auto" : "none"
                                    }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                >
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
                                </motion.div>
                            </div>

                            <style jsx>{`
        @media screen and (max-width: 376px) and (max-height: 668px) {
          .mobile-tagline {
            margin-top: 13rem !important; /* mt-52 equivalent */
          }
        }
      `}</style>


                        </motion.section>
                    </div>

                    {/* GREY OVERLAY - Appears when scroll begins */}
                    {/* <motion.div
                        className="absolute inset-0 z-30 pointer-events-none bg-[#1a1a1a]"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: scrollProgress > 0.05 ? Math.min(scrollProgress * 0.5, 0.4) : 0
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    /> */}

                    {/* REVEAL TEXT SECTION - Rolling Banner + Scroll-Draw SVG */}
                    <motion.div
                        className="absolute inset-0 z-[5] flex flex-col items-center justify-center pointer-events-none overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: scrollProgress > 0.1 ? 1 : 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* LAYER 1: ROLLING BANNER - Behind the hero frame, z-index lower */}
                        <div className="absolute inset-0 flex items-center opacity-[0.9] select-none overflow-hidden">
                            <div
                                ref={heroMarqueeRef}
                                className="flex whitespace-nowrap overflow-hidden"
                                style={{
                                    msOverflowStyle: 'none',
                                    scrollbarWidth: 'none',
                                }}
                            >
                                {/* Repeat content twice for seamless loop */}
                                {[...Array(2)].map((_, i) => (
                                    <span
                                        key={i}
                                        className="font-[family-name:var(--font-milan)] text-[16vw] sm:text-[10vw] md:text-[6vw] lg:text-[8vw] font-normal uppercase tracking-tight text-[#F7F7F3] mx-8 flex-shrink-0"
                                    >
                                        UNLEASH YOUR FULL POTENTIAL • MENTORSHIP • LEADERSHIP • BUILDERS OF TOMORROW •
                                    </span>
                                ))}
                            </div>
                            
                        </div>

                        {/* LAYER 2: THE "1%" SCROLL-DRAW SVG (Foreground) - Higher z-index */}
                        <div className="relative z-50 w-[50vw] h-[50vw] md:w-[30vw] md:h-[30vw] lg:w-[25vw] lg:h-[25vw]">
                                <svg
                                    viewBox="0 0 200 150"
                                    className="w-full h-full overflow-visible drop-shadow-[0_0_30px_rgba(234,191,54,0.4)]"
                                >
                                    {/* "1" character */}
                                    <path
                                        d="M30,20 L50,20 L50,130 M30,130 L70,130"
                                        fill="none"
                                        stroke="#EABF36"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{
                                            strokeDasharray: 250,
                                            strokeDashoffset: 250 - (Math.max(0, Math.min((scrollProgress - 0.3) * 2.5, 1)) * 250),
                                            transition: "stroke-dashoffset 0.1s ease-out"
                                        }}
                                    />
                                    {/* "%" character */}
                                    <path
                                        d="M90,130 L170,20"
                                        fill="none"
                                        stroke="#EABF36"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                        style={{
                                            strokeDasharray: 150,
                                            strokeDashoffset: 150 - (Math.max(0, Math.min((scrollProgress - 0.4) * 2.5, 1)) * 150),
                                            transition: "stroke-dashoffset 0.1s ease-out"
                                        }}
                                    />
                                    {/* Top circle of % */}
                                    <circle
                                        cx="110"
                                        cy="35"
                                        r="18"
                                        fill="none"
                                        stroke="#EABF36"
                                        strokeWidth="10"
                                        style={{
                                            strokeDasharray: 115,
                                            strokeDashoffset: 115 - (Math.max(0, Math.min((scrollProgress - 0.45) * 3, 1)) * 115),
                                            transition: "stroke-dashoffset 0.1s ease-out"
                                        }}
                                    />
                                    {/* Bottom circle of % */}
                                    <circle
                                        cx="160"
                                        cy="115"
                                        r="18"
                                        fill="none"
                                        stroke="#EABF36"
                                        strokeWidth="10"
                                        style={{
                                            strokeDasharray: 115,
                                            strokeDashoffset: 115 - (Math.max(0, Math.min((scrollProgress - 0.5) * 3, 1)) * 115),
                                            transition: "stroke-dashoffset 0.1s ease-out"
                                        }}
                                    />
                                </svg>
                            </div>

                            {/* LAYER 2: Tagline that appears after SVG is drawn */}
                            <motion.p
                                className="z-50 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#EABF36] text-center px-4 sm:px-8 mt-4"
                                style={{
                                    opacity: scrollProgress > 0.7 ? Math.min((scrollProgress - 0.7) * 4, 1) : 0,
                                    transform: `translateY(${scrollProgress > 0.7 ? Math.max(20 - (scrollProgress - 0.7) * 100, 0) : 20}px)`
                                }}
                            >
                                Join the top 1%.
                            </motion.p>
                    </motion.div>
                </div>
            </div>
        </>
    )
}
