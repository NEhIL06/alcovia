"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import anime from "animejs"
import { useHeroAnimation } from "@/context/hero-animation-context"
import { ArrowUpRight } from "lucide-react"
import CursorLens from "./cursor-lens"

import {
    checkReducedMotion,
    isMobile,
    initPageLoadTimeline,
    initSpotlightBreathing,
    createCTAMagneticPull,
    createCTANeonSweep,
    createCTAClickRipple,
    createAmbientParticles,
    createPlaneTakeoff,
} from "@/lib/hero-animations"

// ========================================
// SUBCOMPONENTS
// ========================================

const MobileTagline = ({ isRevealed, scrollProgress }: { isRevealed: boolean, scrollProgress: number }) => {
    const taglineLinesRef = useRef<(HTMLDivElement | null)[]>([])
    const heroTaglineLines = ["World's first Ambition", "building program for Teenagers."]

    useEffect(() => {
        if (!isRevealed) return
        const timer = setTimeout(() => {
            taglineLinesRef.current.forEach((line, i) => {
                if (!line) return
                const mask = line.querySelector(".tagline-mask")
                const text = line.querySelector(".tagline-text")
                if (!mask || !text) return

                const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } })
                gsap.set(mask, { scaleX: 0, transformOrigin: "left" })
                gsap.set(text, { opacity: 0 })
                tl.to(mask, { scaleX: 1, duration: 0.4 }, i * 0.15)
                tl.set(mask, { transformOrigin: "right" }, ">")
                tl.set(text, { opacity: 1 }, ">")
                tl.to(mask, { scaleX: 0, duration: 0.4 }, ">")
            })
        }, 200)
        return () => clearTimeout(timer)
    }, [isRevealed])

    return (
        <motion.div
            className="xl:hidden flex flex-col items-center text-center"
            animate={{
                opacity: scrollProgress > 0.05 ? 0 : 1,
                pointerEvents: scrollProgress > 0.05 ? "none" : "auto"
            }}
            transition={{ duration: 0.3 }}
        >
            {heroTaglineLines.map((line, i) => (
                <div key={i} ref={(el) => { taglineLinesRef.current[i] = el }} className="relative overflow-hidden w-fit my-[-0.05em]">
                    <div className="tagline-mask absolute inset-0 z-20 bg-[#EABF36]" />
                    <p className="tagline-text opacity-0 font-[family-name:var(--font-milan)] text-[27px] font-normal leading-[1.2] tracking-tight text-[#0C0C0C] sm:text-[42px] whitespace-nowrap px-1">
                        {line}
                    </p>
                </div>
            ))}
        </motion.div>
    )
}

const RotatingEventIcon = () => {
    const iconRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (!iconRef.current) return
        anime.set(iconRef.current, { rotateX: 45, rotateZ: 45 })
        anime({ targets: iconRef.current, rotateY: 360, duration: 8000, loop: true, easing: 'linear' })
    }, [])

    return (
        <div ref={iconRef} className="w-20 h-20 text-[#0C0C0C] relative" style={{ perspective: "500px", transformStyle: "preserve-3d" }}>
            <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                <defs>
                    <linearGradient id="fuselageGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#E0E0E0" /><stop offset="40%" stopColor="#F5F5F5" /><stop offset="60%" stopColor="#F5F5F5" /><stop offset="100%" stopColor="#C0C0C0" /></linearGradient>
                    <linearGradient id="leftWingGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#A0A0A0" /><stop offset="50%" stopColor="#D0D0D0" /><stop offset="100%" stopColor="#E8E8E8" /></linearGradient>
                    <linearGradient id="rightWingGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#E8E8E8" /><stop offset="50%" stopColor="#D0D0D0" /><stop offset="100%" stopColor="#A0A0A0" /></linearGradient>
                    <linearGradient id="engineGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#707070" /><stop offset="50%" stopColor="#909090" /><stop offset="100%" stopColor="#606060" /></linearGradient>
                    <linearGradient id="cockpitGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#505050" /><stop offset="50%" stopColor="#707070" /><stop offset="100%" stopColor="#404040" /></linearGradient>
                </defs>
                <g opacity="0.15" transform="translate(2, 3)"><path d="M32 8 C32 8, 30 12, 30 20 L30 44 C30 46, 31 48, 32 50 C33 48, 34 46, 34 44 L34 20 C34 12, 32 8, 32 8" fill="#000" /><path d="M30 26 L8 32 L8 34 L12 34 L16 33 L20 33 L24 32 L30 30 Z" fill="#000" /><path d="M34 26 L56 32 L56 34 L52 34 L48 33 L44 33 L40 32 L34 30 Z" fill="#000" /></g>
                <path d="M30 26 L8 32 L8 34 L12 34 L16 33 L20 33 L24 32 L30 30 Z" fill="url(#leftWingGrad)" stroke="#606060" strokeWidth="1.5" />
                <path d="M34 26 L56 32 L56 34 L52 34 L48 33 L44 33 L40 32 L34 30 Z" fill="url(#rightWingGrad)" stroke="#606060" strokeWidth="1.5" />
                <path d="M32 8 C32 8, 30 12, 30 20 L30 44 C30 46, 31 48, 32 50 C33 48, 34 46, 34 44 L34 20 C34 12, 32 8, 32 8" fill="url(#fuselageGrad)" stroke="#505050" strokeWidth="2" />
                <rect x="14" y="30" width="4" height="6" rx="1" fill="url(#engineGrad)" stroke="#404040" strokeWidth="1.2" />
                <rect x="22" y="29" width="4" height="6" rx="1" fill="url(#engineGrad)" stroke="#404040" strokeWidth="1.2" />
                <rect x="46" y="30" width="4" height="6" rx="1" fill="url(#engineGrad)" stroke="#404040" strokeWidth="1.2" />
                <rect x="38" y="29" width="4" height="6" rx="1" fill="url(#engineGrad)" stroke="#404040" strokeWidth="1.2" />
                <path d="M30 44 L24 48 L24 50 L30 47 Z" fill="#D0D0D0" stroke="#606060" strokeWidth="1.2" />
                <path d="M34 44 L40 48 L40 50 L34 47 Z" fill="#D0D0D0" stroke="#606060" strokeWidth="1.2" />
                <path d="M31 44 L32 40 L33 44 L33 52 L31 52 Z" fill="#C0C0C0" stroke="#505050" strokeWidth="1.2" />
                <ellipse cx="32" cy="17" rx="1.5" ry="4" fill="url(#cockpitGrad)" stroke="#303030" strokeWidth="1" />
                <path d="M31.5 12 L31.5 35" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.4" />
                <line x1="16" y1="40" x2="16" y2="52" stroke="#0C0C0C" strokeWidth="1" opacity="0.2" />
                <line x1="24" y1="42" x2="24" y2="56" stroke="#0C0C0C" strokeWidth="1" opacity="0.2" />
                <line x1="40" y1="42" x2="40" y2="56" stroke="#0C0C0C" strokeWidth="1" opacity="0.2" />
                <line x1="48" y1="40" x2="48" y2="52" stroke="#0C0C0C" strokeWidth="1" opacity="0.2" />
            </svg>
        </div>
    )
}

const WorkshopWidget = ({ isRevealed }: { isRevealed: boolean }) => (
    <motion.div className="absolute bottom-8 left-4 z-40 hidden md:block xl:bottom-12 xl:left-8" initial={{ opacity: 0, y: 20 }} animate={isRevealed ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.5, duration: 0.8 }}>
        <a href="https://forms.gle/TJZ2FfN4KvtrKyPL7" target="_blank" rel="noopener noreferrer" className="group block">
            <div className="relative flex h-[240px] w-[180px] flex-col rounded-xl border-2 border-[#0C0C0C] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#EABF36]">
                <div className="border-b-2 border-[#0C0C0C] px-4 py-2 bg-[#f4f4f4] rounded-t-[9px]"><span className="block text-[10px] font-black uppercase tracking-widest text-[#0C0C0C]/60">NEXT EVENT</span></div>
                <div className="flex-1 flex items-center justify-center py-2 bg-white relative overflow-hidden"><div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "10px 10px" }} /><RotatingEventIcon /></div>
                <div className="border-t-2 border-[#0C0C0C] p-4 bg-white rounded-b-[9px]">
                    <div className="flex justify-between items-end"><div><span className="block text-[9px] font-bold uppercase text-[#EABF36]">WORKSHOP</span><h4 className="text-sm font-black uppercase leading-none text-[#0C0C0C] mt-1">INDUSTRY<br />DISCOVERY</h4></div><div className="flex flex-col items-end"><span className="text-xl font-black text-[#0C0C0C] leading-none">17</span><span className="text-[8px] font-bold uppercase text-[#0C0C0C]/60">JAN</span></div></div>
                    <div className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase text-[#0C0C0C] opacity-0 transition-opacity group-hover:opacity-100"><span>Register Now</span><ArrowUpRight className="w-3 h-3" /></div>
                </div>
            </div>
        </a>
    </motion.div>
)

const CTAButton = ({ isRevealed, scrollProgress, ctaRef, handleCTAMouseEnter, handleCTAClick }: any) => (
    <motion.div className="absolute bottom-8 right-4 z-40 hidden flex-col items-end md:flex xl:bottom-12 xl:right-8" initial={{ opacity: 0 }} animate={{ opacity: isRevealed && scrollProgress < 0.05 ? 1 : 0, pointerEvents: scrollProgress < 0.05 ? "auto" : "none" }} transition={{ duration: 0.4, ease: "easeOut" }}>
        <motion.button ref={ctaRef} className="group relative overflow-hidden rounded-full border-2 border-[#0C0C0C] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#0C0C0C] transition-all hover:border-[#EABF36] focus:outline-none focus:ring-2 focus:ring-[#EABF36] focus:ring-offset-2 bg-white/80 backdrop-blur-sm" style={{ opacity: 0 }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onMouseEnter={handleCTAMouseEnter} onClick={handleCTAClick}>
            <span className="relative z-10 transition-colors group-hover:text-[#0C0C0C]">Start Your Journey</span>
            <motion.div className="absolute inset-0 -z-0 bg-[#EABF36]" initial={{ x: "-100%" }} whileHover={{ x: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} />
        </motion.button>
    </motion.div>
)

const RollingBannerDesktop = ({ scrollProgress }: { scrollProgress: number }) => {
    const heroMarqueeRef1 = useRef<HTMLDivElement>(null)
    const heroMarqueeRef2 = useRef<HTMLDivElement>(null)
    const heroScrollPosRef1 = useRef(0)
    const heroScrollPosRef2 = useRef(0)
    const heroAnimationFrameRef = useRef<number | null>(null)
    const [heroMarqueeSpeed] = useState(0.5)

    useEffect(() => {
        const container1 = heroMarqueeRef1.current
        const container2 = heroMarqueeRef2.current
        if (!container1 || !container2) return

        const animate = () => {
            const oneHalf1 = container1.scrollWidth / 2
            const oneHalf2 = container2.scrollWidth / 2

            heroScrollPosRef1.current += heroMarqueeSpeed
            heroScrollPosRef2.current += heroMarqueeSpeed * 0.8

            if (heroScrollPosRef1.current >= oneHalf1) heroScrollPosRef1.current = 0
            if (heroScrollPosRef2.current >= oneHalf2) heroScrollPosRef2.current = 0

            container1.scrollLeft = heroScrollPosRef1.current
            container2.scrollLeft = heroScrollPosRef2.current

            heroAnimationFrameRef.current = requestAnimationFrame(animate)
        }
        heroAnimationFrameRef.current = requestAnimationFrame(animate)
        return () => { if (heroAnimationFrameRef.current) cancelAnimationFrame(heroAnimationFrameRef.current) }
    }, [heroMarqueeSpeed])

    return (
        <motion.div
            className="hidden md:block absolute inset-0 z-[-35] select-none overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: scrollProgress > 0.1 ? 0.9 : 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div ref={heroMarqueeRef1} className="flex whitespace-nowrap overflow-hidden w-full" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                    {[...Array(2)].map((_, i) => (
                        <span key={i} className="font-[family-name:var(--font-milan)] text-[2vw] font-bold uppercase tracking-tight text-[#EABF36] mx-8 flex-shrink-0">
                            UNLEASH YOUR FULL POTENTIAL • MENTORSHIP • LEADERSHIP • BUILDERS OF TOMORROW • UNLEASH YOUR FULL POTENTIAL • MENTORSHIP • LEADERSHIP • BUILDERS OF TOMORROW • UNLEASH YOUR FULL POTENTIAL • MENTORSHIP • LEADERSHIP • BUILDERS OF TOMORROW •
                        </span>
                    ))}
                </div>
                <div ref={heroMarqueeRef2} className="flex whitespace-nowrap overflow-hidden w-full" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                    {[...Array(2)].map((_, i) => (
                        <span key={i} className="font-[family-name:var(--font-milan)] text-[5vw] font-normal uppercase tracking-tight text-[#F7F7F3] mx-8 flex-shrink-0">
                            PROVE YOU ARE TOUGH • A PLACE WHERE YOU CAN BE REAL • BREAK AMBITION PARALYSIS • PURPOSE BEYOND STATUS • PROVE YOU ARE TOUGH • A PLACE WHERE YOU CAN BE REAL • BREAK AMBITION PARALYSIS • PURPOSE BEYOND STATUS • PROVE YOU ARE TOUGH • A PLACE WHERE YOU CAN BE REAL • BREAK AMBITION PARALYSIS • PURPOSE BEYOND STATUS •
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

const RollingBannerMobile = ({ scrollProgress }: { scrollProgress: number }) => {
    const heroMarqueeRef1 = useRef<HTMLDivElement>(null)
    const heroMarqueeRef2 = useRef<HTMLDivElement>(null)
    const heroScrollPosRef1 = useRef(0)
    const heroScrollPosRef2 = useRef(-1)
    const heroAnimationFrameRef = useRef<number | null>(null)

    useEffect(() => {
        const container1 = heroMarqueeRef1.current
        const container2 = heroMarqueeRef2.current
        if (!container1 || !container2) return

        const animate = () => {
            const oneHalf1 = container1.scrollWidth / 2
            const oneHalf2 = container2.scrollWidth / 2

            heroScrollPosRef1.current += 0.3
            heroScrollPosRef2.current += 0.25

            if (heroScrollPosRef1.current >= oneHalf1) heroScrollPosRef1.current = 0
            if (heroScrollPosRef2.current >= oneHalf2) heroScrollPosRef2.current = 0

            container1.scrollLeft = heroScrollPosRef1.current
            container2.scrollLeft = heroScrollPosRef2.current

            heroAnimationFrameRef.current = requestAnimationFrame(animate)
        }
        heroAnimationFrameRef.current = requestAnimationFrame(animate)
        return () => { if (heroAnimationFrameRef.current) cancelAnimationFrame(heroAnimationFrameRef.current) }
    }, [])

    return (
        <motion.div
            className="md:hidden absolute bottom-[12vh] left-0 right-0 z-[-35] py-6 select-none overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: scrollProgress > 0.1 ? 0.9 : 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="flex flex-col gap-0">
                <div ref={heroMarqueeRef1} className="flex whitespace-nowrap overflow-hidden" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                    {[...Array(2)].map((_, i) => (
                        <span key={i} className="font-[family-name:var(--font-milan)] text-[4vw] font-bold uppercase tracking-tight text-[#EABF36] mx-4 flex-shrink-0">
                            UNLEASH YOUR FULL POTENTIAL • MENTORSHIP • LEADERSHIP • BUILDERS OF TOMORROW • UNLEASH YOUR FULL POTENTIAL • MENTORSHIP • LEADERSHIP • BUILDERS OF TOMORROW • UNLEASH YOUR FULL POTENTIAL • MENTORSHIP • LEADERSHIP • BUILDERS OF TOMORROW •
                        </span>
                    ))}
                </div>
                <div ref={heroMarqueeRef2} className="flex whitespace-nowrap overflow-hidden" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                    {[...Array(2)].map((_, i) => (
                        <span key={i} className="font-[family-name:var(--font-milan)] text-[8vw] font-normal uppercase tracking-tight text-[#F7F7F3] mx-4 flex-shrink-0">
                            PROVE YOU ARE TOUGH • A PLACE WHERE YOU CAN BE REAL • BREAK AMBITION PARALYSIS • PURPOSE BEYOND STATUS • PROVE YOU ARE TOUGH • A PLACE WHERE YOU CAN BE REAL • BREAK AMBITION PARALYSIS • PURPOSE BEYOND STATUS • PROVE YOU ARE TOUGH • A PLACE WHERE YOU CAN BE REAL • BREAK AMBITION PARALYSIS • PURPOSE BEYOND STATUS •
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

const OnePercentSVG = ({ scrollProgress }: { scrollProgress: number }) => (
    <motion.div
        className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollProgress > 0.1 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
    >
        <motion.p
            className="absolute top-[15vh] left-0 right-0 z-100 text-lg font-[family-name:var(--font-milan)] sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#EABF36] text-center px-8 sm:px-8"
            style={{
                opacity: scrollProgress > 0.7 ? Math.min((scrollProgress - 0.7) * 4, 1) : 0,
                transform: `translateY(${scrollProgress > 0.7 ? 0 : 20}px)`
            }}
        >
            Join the top
        </motion.p>

        <div className="relative z-50 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] lg:w-[40vw] lg:h-[40vw]">
            <svg viewBox="0 0 200 150" className="w-full h-full overflow-visible drop-shadow-[0_0_30px_rgba(234,191,54,0.4)]">
                <path d="M30,20 L50,20 L50,130 M30,130 L70,130" fill="none" stroke="#EABF36" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 250, strokeDashoffset: 250 - (Math.max(0, Math.min((scrollProgress - 0.3) * 2.5, 1)) * 250), transition: "stroke-dashoffset 0.1s ease-out" }} />
                <path d="M90,130 L170,20" fill="none" stroke="#EABF36" strokeWidth="10" strokeLinecap="round" style={{ strokeDasharray: 150, strokeDashoffset: 150 - (Math.max(0, Math.min((scrollProgress - 0.4) * 2.5, 1)) * 150), transition: "stroke-dashoffset 0.1s ease-out" }} />
                <circle cx="110" cy="35" r="18" fill="none" stroke="#EABF36" strokeWidth="10" style={{ strokeDasharray: 115, strokeDashoffset: 115 - (Math.max(0, Math.min((scrollProgress - 0.45) * 3, 1)) * 115), transition: "stroke-dashoffset 0.1s ease-out" }} />
                <circle cx="160" cy="115" r="18" fill="none" stroke="#EABF36" strokeWidth="10" style={{ strokeDasharray: 115, strokeDashoffset: 115 - (Math.max(0, Math.min((scrollProgress - 0.5) * 3, 1)) * 115), transition: "stroke-dashoffset 0.1s ease-out" }} />
            </svg>
        </div>
    </motion.div>
)

// ========================================
// MAIN HERO COMPONENT
// ========================================

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const spotlightRef = useRef<HTMLDivElement>(null)
    const ctaRef = useRef<HTMLButtonElement>(null)
    const scrollyContainerRef = useRef<HTMLDivElement>(null)
    const clipMaskRef = useRef<HTMLDivElement>(null)

    const { setHeroAnimationComplete } = useHeroAnimation()
    const [isRevealed, setIsRevealed] = useState(false)
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)

    const particlesRef = useRef<ReturnType<typeof createAmbientParticles> | null>(null)
    const ctaSweepRef = useRef<ReturnType<typeof createCTANeonSweep> | null>(null)
    const ctaMagneticCleanupRef = useRef<(() => void) | null>(null)

    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1])
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 1])
    const y = useTransform(scrollYProgress, [0, 1], [0, 0])

    useEffect(() => {
        const reducedMotion = checkReducedMotion()
        setPrefersReducedMotion(reducedMotion)
        const timer = setTimeout(() => {
            setIsRevealed(true)
            initPageLoadTimeline({ spotlight: spotlightRef.current || undefined, cta: ctaRef.current || undefined })
            if (spotlightRef.current) initSpotlightBreathing(spotlightRef.current)

            if (ctaRef.current) {
                ctaSweepRef.current = createCTANeonSweep(ctaRef.current)
                ctaMagneticCleanupRef.current = createCTAMagneticPull({ button: ctaRef.current, magnetRadius: 80 })
            }
            if (containerRef.current) particlesRef.current = createAmbientParticles({ container: containerRef.current, maxParticles: isMobile() ? 12 : 25 })
            const animationCompleteTimer = setTimeout(() => { setHeroAnimationComplete(true) }, 1700)
            return () => clearTimeout(animationCompleteTimer)
        }, 100)
        return () => { clearTimeout(timer); particlesRef.current?.destroy(); if (ctaMagneticCleanupRef.current) ctaMagneticCleanupRef.current() }
    }, [setHeroAnimationComplete])

    useEffect(() => {
        if (!isRevealed || prefersReducedMotion || !scrollyContainerRef.current || !clipMaskRef.current) return
        gsap.registerPlugin(ScrollTrigger)
        const isMobileDevice = window.innerWidth < 640
        const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scrollyContainerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5,
                onUpdate: (self) => setScrollProgress(self.progress)
            }
        })

        const clipInset = isMobileDevice
            ? "25% 10% 25% 10%"
            : isTablet
                ? "22% 20% 22% 20%"
                : "25% 25% 25% 25%"

        tl.to(clipMaskRef.current, { clipPath: `inset(${clipInset})`, ease: "none" }, 0)
        return () => { ScrollTrigger.getAll().forEach(st => st.kill()) }
    }, [isRevealed, prefersReducedMotion])

    const handleCTAClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ctaRef.current || !containerRef.current) return
        createCTAClickRipple(ctaRef.current, e.nativeEvent)
        const rect = ctaRef.current.getBoundingClientRect()
        createPlaneTakeoff(containerRef.current, rect.left + rect.width / 2, rect.top + rect.height / 2)
        setTimeout(() => {
            window.open("https://docs.google.com/forms/d/e/1FAIpQLScvrS8qOc0BaUBKqw5-GSG6oyyBvK3fs0aklTw0eszc1EvBUg/viewform", "_blank")
        }, 800)
    }, [])

    const handleCTAMouseEnter = useCallback(() => {
        ctaSweepRef.current?.play()
    }, [])

    return (
        <>
            <div ref={scrollyContainerRef} className="relative h-[200vh] sm:h-[250vh] lg:h-[300vh] mb-12 md:mb-40">
                <div className="sticky top-0 h-screen overflow-hidden">
                    <div ref={clipMaskRef} className="absolute inset-0 will-change-[clip-path]" style={{ clipPath: "inset(0% 0% 0% 0%)" }}>
                        <motion.section id="hero" ref={containerRef} className="hero-viewport relative flex h-full min-h-screen items-center justify-center overflow-hidden bg-white" style={{ scale, opacity, y }} role="region" aria-label="Hero section - Take flight with Alcovia">

                            {/* Full-Screen CursorLens with Background Blobs */}
                            <div className="absolute inset-0 z-0">
                                <CursorLens
                                    baseImage="/images/hero-base.png"
                                    revealImage="/images/hero-reveal.png"
                                    objectFit="cover"
                                    backgroundColor="#f8f8f5"
                                    showBackground={true}
                                    blobSize={200}
                                    bgBlobCount={10}
                                    bgBlobSize={120}
                                    bgBlobComplexity={100}
                                    blobOutlineColor="#2a2a2a"
                                    parallaxStrength={8}
                                    showHint={true}
                                />
                            </div>

                            {/* Spotlight Effect */}
                            <div ref={spotlightRef} className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-0 z-5" style={{ background: "radial-gradient(circle, rgba(206,255,43,0.08) 0%, transparent 60%)" }} />

                            {/* Mobile Tagline - Top Center */}
                            <div className="absolute top-24 left-0 right-0 z-40 px-4">
                                <MobileTagline isRevealed={isRevealed} scrollProgress={scrollProgress} />
                            </div>

                            {/* Desktop Tagline - Right Side */}
                            <motion.div
                                className="hidden xl:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col items-start z-40"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: isRevealed && scrollProgress < 0.05 ? 1 : 0, x: scrollProgress < 0.05 ? 0 : 30, pointerEvents: scrollProgress < 0.05 ? "auto" : "none" }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <p className="text-[#0C0C0C] font-[family-name:var(--font-milan)] text-xl leading-relaxed tracking-tight max-w-[250px]">World&apos;s first</p>
                                <p className="text-[#EABF36] font-[family-name:var(--font-milan)] text-2xl font-semibold leading-relaxed tracking-tight max-w-[250px]">Ambition Building</p>
                                <p className="text-[#0C0C0C] font-[family-name:var(--font-milan)] text-xl leading-relaxed tracking-tight max-w-[250px]">Program for Teenagers</p>
                            </motion.div>

                            {/* Workshop Widget - Bottom Left */}
                            <WorkshopWidget isRevealed={isRevealed} />

                            {/* CTA Button - Bottom Right */}
                            <CTAButton isRevealed={isRevealed} scrollProgress={scrollProgress} ctaRef={ctaRef} handleCTAMouseEnter={handleCTAMouseEnter} handleCTAClick={handleCTAClick} />
                        </motion.section>
                    </div>

                    <RollingBannerDesktop scrollProgress={scrollProgress} />
                    <RollingBannerMobile scrollProgress={scrollProgress} />
                    <OnePercentSVG scrollProgress={scrollProgress} />
                </div>
            </div>
        </>
    )
}