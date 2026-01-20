"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback, memo } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
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
    const heroTaglineLines = [
        <>World&apos;s first <span className="text-[#EABF36]">Ambition</span></>,
        <>building program for Teenagers.</>
    ]

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
            className="xl:hidden flex flex-col items-center text-center mb-6"
            animate={{
                opacity: scrollProgress > 0.05 ? 0 : 1,
                pointerEvents: scrollProgress > 0.05 ? "none" : "auto"
            }}
            transition={{ duration: 0.3 }}
        >
            {heroTaglineLines.map((line, i) => (
                <div key={i} ref={(el) => { taglineLinesRef.current[i] = el }} className="relative overflow-hidden w-fit my-[-0.05em]">
                    <div className="tagline-mask absolute inset-0 z-20 bg-[#EABF36]" />
                    <p className="tagline-text opacity-0 font-[family-name:var(--font-milan)] text-[20px] font-bold leading-[1.2] tracking-tight text-[#0C0C0C] sm:text-[42px] whitespace-nowrap px-1">
                        {line}
                    </p>
                </div>
            ))}
        </motion.div>
    )
}

const IndustryDiscoveryIcon = () => {
    return (
        <div className="w-20 h-20 text-[#0C0C0C] relative">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                {/* Person Left */}
                <circle cx="30" cy="75" r="12" />
                <path d="M10 100 Q30 90 50 100" />

                {/* Person Right */}
                <circle cx="70" cy="75" r="12" />
                <path d="M50 100 Q70 90 90 100" />

                {/* Speech Bubble */}
                <path d="M65 60 L75 50 H90 A5 5 0 0 0 95 45 V15 A5 5 0 0 0 90 10 H30 A5 5 0 0 0 25 15 V45 A5 5 0 0 0 30 50 H65" />

                {/* Graph inside bubble */}
                <polyline points="35 40 50 25 60 35 80 15" />
                <path d="M75 15 H80 V20" />
            </svg>
        </div>
    )
}

const WorkshopWidget = ({ isRevealed }: { isRevealed: boolean }) => {
    const [isWidgetActive, setIsWidgetActive] = useState(false)

    return (
        <motion.div className="absolute bottom-8 left-4 z-40 hidden md:block xl:bottom-12 xl:left-8" initial={{ opacity: 0, y: 20 }} animate={isRevealed ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.5, duration: 0.8 }}>
            <div
                className="group block cursor-pointer"
                onClick={() => setIsWidgetActive(!isWidgetActive)}
            >
                <div className="relative flex h-[240px] w-[180px] flex-col rounded-xl border-2 border-[#0C0C0C] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#EABF36]">
                    <div className="border-b-2 border-[#0C0C0C] px-4 py-2 bg-[#f4f4f4] rounded-t-[9px]"><span className="block text-[10px] font-black uppercase tracking-widest text-[#0C0C0C]/60">NEXT EVENT</span></div>
                    <div className="flex-1 flex items-center justify-center py-2 bg-white relative overflow-hidden"><div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "10px 10px" }} /><IndustryDiscoveryIcon /></div>
                    <div className="border-t-2 border-[#0C0C0C] p-4 bg-white rounded-b-[9px]">
                        <div className="flex justify-between items-end"><div><span className="block text-[9px] font-bold uppercase text-[#EABF36]">WORKSHOP</span><h4 className="text-sm font-black uppercase leading-none text-[#0C0C0C] mt-1">CONSULTING<br />WORKSHOP</h4></div><div className="flex flex-col items-end"><span className="text-xl font-black text-[#0C0C0C] leading-none">31</span><span className="text-[8px] font-bold uppercase text-[#0C0C0C]/60">JAN</span></div></div>
                        <div className={`mt-3 flex items-center gap-2 text-[10px] font-bold uppercase text-[#0C0C0C] transition-opacity ${isWidgetActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfGbxLIUVTzr3dlEnZdxVd_mXSDIKSPCKgz1KVzcjtEQpxF9A/viewform" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                <span>Register Now</span><ArrowUpRight className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

const CTAButton = ({ isRevealed, scrollProgress, ctaRef, handleCTAMouseEnter, handleCTAClick }: any) => (
    <motion.div className="absolute bottom-8 right-4 z-40 hidden flex-col items-end md:flex xl:bottom-12 xl:right-8" initial={{ opacity: 0 }} animate={{ opacity: isRevealed && scrollProgress < 0.05 ? 1 : 0, pointerEvents: scrollProgress < 0.05 ? "auto" : "none" }} transition={{ duration: 0.4, ease: "easeOut" }}>
        <motion.button ref={ctaRef} className="group relative overflow-hidden rounded-full border-2 border-[#0C0C0C] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#0C0C0C] transition-all hover:border-[#EABF36] focus:outline-none focus:ring-2 focus:ring-[#EABF36] focus:ring-offset-2 bg-white/80 backdrop-blur-sm" style={{ opacity: 0 }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onMouseEnter={handleCTAMouseEnter} onClick={handleCTAClick}>
            <span className="relative z-10 transition-colors group-hover:text-[#0C0C0C]">Start Your Journey</span>
            <motion.div className="absolute inset-0 -z-0 bg-[#EABF36]" initial={{ x: "-100%" }} whileHover={{ x: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} />
        </motion.button>
    </motion.div>
)

const RollingBannerDesktop = memo(({ scrollProgress }: { scrollProgress: number }) => {
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
            heroScrollPosRef2.current -= heroMarqueeSpeed * 0.8

            if (heroScrollPosRef1.current >= oneHalf1) heroScrollPosRef1.current = 0
            if (heroScrollPosRef2.current <= 0) heroScrollPosRef2.current = oneHalf2

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
                        <span key={i} className="font-[family-name:var(--font-milan)] text-[5vw] font-bold uppercase tracking-tight text-[#EABF36] mx-8 flex-shrink-0">
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
})

const RollingBannerMobile = memo(({ scrollProgress }: { scrollProgress: number }) => {
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
            heroScrollPosRef2.current -= 0.25

            if (heroScrollPosRef1.current >= oneHalf1) heroScrollPosRef1.current = 0
            if (heroScrollPosRef2.current <= 0) heroScrollPosRef2.current = oneHalf2

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
                        <span key={i} className="font-[family-name:var(--font-milan)] text-[8vw] font-bold uppercase tracking-tight text-[#EABF36] mx-4 flex-shrink-0">
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
})

const OnePercentSVG = memo(({ scrollProgress }: { scrollProgress: number }) => (
    <motion.div
        className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollProgress > 0.1 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
    >
        <motion.p
            className="absolute top-[28vh] md:top-[15vh] left-0 right-0 z-100 text-2xl font-[family-name:var(--font-milan)] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-[#EABF36] text-center px-8 sm:px-8"
            style={{
                opacity: scrollProgress > 0.7 ? Math.min((scrollProgress - 0.7) * 4, 1) : 0,
                transform: `translateY(${scrollProgress > 0.7 ? 0 : 20}px)`
            }}
        >
            JOIN THE TOP
        </motion.p>

        <div className="relative z-50 w-[90vw] h-[90vw] md:w-[50vw] md:h-[50vw] lg:w-[40vw] lg:h-[40vw]">
            <svg viewBox="0 0 200 150" className="w-full h-full overflow-visible drop-shadow-[0_0_30px_rgba(234,191,54,0.4)]">
                <path d="M30,20 L50,20 L50,130 M30,130 L70,130" fill="none" stroke="#EABF36" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 250, strokeDashoffset: 250 - (Math.max(0, Math.min((scrollProgress - 0.3) * 2.5, 1)) * 250), transition: "stroke-dashoffset 0.1s ease-out" }} />
                <path d="M90,130 L170,20" fill="none" stroke="#EABF36" strokeWidth="10" strokeLinecap="round" style={{ strokeDasharray: 150, strokeDashoffset: 150 - (Math.max(0, Math.min((scrollProgress - 0.4) * 2.5, 1)) * 150), transition: "stroke-dashoffset 0.1s ease-out" }} />
                <circle cx="110" cy="35" r="18" fill="none" stroke="#EABF36" strokeWidth="10" style={{ strokeDasharray: 115, strokeDashoffset: 115 - (Math.max(0, Math.min((scrollProgress - 0.45) * 3, 1)) * 115), transition: "stroke-dashoffset 0.1s ease-out" }} />
                <circle cx="160" cy="115" r="18" fill="none" stroke="#EABF36" strokeWidth="10" style={{ strokeDasharray: 115, strokeDashoffset: 115 - (Math.max(0, Math.min((scrollProgress - 0.5) * 3, 1)) * 115), transition: "stroke-dashoffset 0.1s ease-out" }} />
            </svg>
        </div>
    </motion.div>
))

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
    const baseImageScale = useTransform(scrollYProgress, [0, 1], [1, 0.5])


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
            if (containerRef.current && !isMobile()) particlesRef.current = createAmbientParticles({ container: containerRef.current, maxParticles: 15 })
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
            ? "35% 20% 35% 20%"
            : isTablet
                ? "22% 20% 22% 20%"
                : "28% 25% 25% 28%"

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
                        <section id="hero" ref={containerRef} className="hero-viewport relative flex h-full min-h-screen items-center justify-center overflow-hidden bg-white" role="region" aria-label="Hero section - Take flight with Alcovia">

                            {/* Full-Screen CursorLens with Background Blobs */}
                            <motion.div className="absolute inset-0 z-0" style={{ scale: baseImageScale }}>
                                <CursorLens
                                    baseImage="/images/hero-base.webp"
                                    revealImage="/images/hero-reveal.webp"
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
                            </motion.div>

                            {/* Scroll-sensitive Grey Overlay */}
                            <div
                                className="absolute inset-0 z-[5] pointer-events-none bg-[#4a4a4a]"
                                style={{ opacity: scrollProgress * 0.5 }}
                            />

                            {/* Spotlight Effect */}
                            <div ref={spotlightRef} className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-0 z-[6]" style={{ background: "radial-gradient(circle, rgba(206,255,43,0.08) 0%, transparent 60%)" }} />

                            {/* Mobile Tagline - Top Center */}
                            <div className="absolute top-28 left-0 right-0 z-40 px-4 xl:hidden">
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
                        </section>
                    </div>

                    <RollingBannerDesktop scrollProgress={scrollProgress} />
                    <RollingBannerMobile scrollProgress={scrollProgress} />
                    <OnePercentSVG scrollProgress={scrollProgress} />
                </div>
            </div>
        </>
    )
}