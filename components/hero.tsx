"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback, memo, useMemo } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
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
// CONSTANTS
// ========================================

const HERO_TAGLINE_LINES = [
    <>World&apos;s first <span className="text-[#EABF36]">Ambition</span></>,
    <>building program for Teenagers.</>
]

const MARQUEE_CONTENT_1 = "UNLEASH YOUR FULL POTENTIAL • MENTORSHIP • LEADERSHIP • BUILDERS OF TOMORROW • ".repeat(3)
const MARQUEE_CONTENT_2 = "PROVE YOU ARE TOUGH • A PLACE WHERE YOU CAN BE REAL • BREAK AMBITION PARALYSIS • PURPOSE BEYOND STATUS • ".repeat(3)

const GOLD_GRADIENT = 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)'

// ========================================
// SUBCOMPONENTS
// ========================================

const MobileTagline = memo(({ isRevealed, scrollProgress }: { isRevealed: boolean, scrollProgress: number }) => {
    const taglineLinesRef = useRef<(HTMLDivElement | null)[]>([])

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
                    .set(mask, { transformOrigin: "right" })
                    .set(text, { opacity: 1 })
                    .to(mask, { scaleX: 0, duration: 0.4 })
            })
        }, 200)
        return () => clearTimeout(timer)
    }, [isRevealed])

    const isVisible = scrollProgress <= 0.05

    return (
        <motion.div
            className="xl:hidden flex flex-col items-center text-center mb-6"
            animate={{
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? "auto" : "none"
            }}
            transition={{ duration: 0.3 }}
        >
            {HERO_TAGLINE_LINES.map((line, i) => (
                <div key={i} ref={(el) => { taglineLinesRef.current[i] = el }} className="relative overflow-hidden w-fit my-[-0.05em]">
                    <div className="tagline-mask absolute inset-0 z-20 bg-[#EABF36]" />
                    <p className="tagline-text opacity-0 font-[family-name:var(--font-milan)] text-[20px] font-bold leading-[1.2] tracking-tight text-[#0C0C0C] sm:text-[42px] whitespace-nowrap px-1">
                        {line}
                    </p>
                </div>
            ))}
        </motion.div>
    )
})

const BRAIN_SVG = "M 85 68 C 83 62, 82 55, 84 49 C 86 43, 90 38, 96 35 C 102 32, 108 31, 113 30 C 115 27, 118 24, 123 22 C 128 20, 134 19, 140 20 C 144 17, 149 15, 155 15 C 161 15, 167 17, 171 20 C 175 18, 180 17, 185 18 C 190 19, 194 22, 196 26 C 200 27, 204 29, 207 33 C 210 37, 211 42, 210 47 C 213 50, 215 54, 215 59 C 215 64, 213 69, 210 72 C 211 76, 210 80, 208 84 C 206 88, 202 91, 198 92 C 196 96, 192 99, 188 100 C 184 101, 179 101, 175 99 C 172 102, 168 104, 163 104 C 158 104, 153 102, 150 99 C 146 101, 141 102, 136 101 C 131 100, 127 97, 125 93 C 121 93, 117 91, 114 88 C 111 85, 109 81, 108 77 C 104 76, 100 74, 97 71 C 93 69, 88 68, 85 68 Z M 175 99 C 178 96, 182 94, 186 95 C 184 92, 183 88, 184 84 M 150 99 C 152 95, 155 92, 159 91 C 157 88, 156 84, 157 80 M 125 93 C 128 90, 132 88, 136 89 C 134 85, 134 81, 135 77 M 108 77 C 112 76, 116 76, 120 78 C 119 74, 119 70, 121 66 M 85 68 C 90 67, 95 68, 99 71 C 99 67, 100 63, 103 60 M 96 35 C 101 37, 105 41, 107 46 M 140 20 C 142 25, 142 30, 140 35 M 185 18 C 186 23, 185 28, 182 32 M 210 47 C 206 48, 202 48, 198 46"

const NeuroAnimation = memo(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const dpr = window.devicePixelRatio || 1
        const rect = canvas.getBoundingClientRect()
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        ctx.scale(dpr, dpr)

        const cw = rect.width
        const ch = rect.height

        // Brain SVG is in ~85-215 x ~15-104 space (width ~130, height ~89)
        // Scale to fill widget with padding
        const brainW = 130
        const brainH = 89
        const padX = cw * 0.08
        const padY = ch * 0.08
        const scaleX = (cw - padX * 2) / brainW
        const scaleY = (ch - padY * 2) / brainH
        const sc = Math.min(scaleX, scaleY)
        const offX = (cw - brainW * sc) / 2 - 85 * sc
        const offY = (ch - brainH * sc) / 2 - 15 * sc

        // Create Path2D with transform
        const brainPath = new Path2D()
        const transform = new DOMMatrix()
            .translate(offX, offY)
            .scale(sc, sc)
        brainPath.addPath(new Path2D(BRAIN_SVG), transform)

        // Point-in-brain test (use the filled outer shape only)
        const outerOnly = BRAIN_SVG.split("Z")[0] + "Z"
        const outerPath = new Path2D()
        outerPath.addPath(new Path2D(outerOnly), transform)

        const isInside = (px: number, py: number) => ctx.isPointInPath(outerPath, px, py)

        // Brain center for node generation
        const bcx = cw / 2
        const bcy = ch / 2

        // Generate nodes inside brain
        const nodes: { x: number; y: number; vx: number; vy: number; r: number; pulse: number; fireTimer: number; isFiring: boolean }[] = []
        let attempts = 0
        while (nodes.length < 18 && attempts < 2000) {
            attempts++
            const x = bcx + (Math.random() - 0.5) * cw * 0.75
            const y = bcy + (Math.random() - 0.5) * ch * 0.7
            if (isInside(x, y)) {
                nodes.push({
                    x, y,
                    vx: (Math.random() - 0.5) * 0.2,
                    vy: (Math.random() - 0.5) * 0.2,
                    r: Math.random() * 1.8 + 1.2,
                    pulse: Math.random() * Math.PI * 2,
                    fireTimer: Math.floor(Math.random() * 120) + 30,
                    isFiring: false,
                })
            }
        }

        const signals: { from: number; to: number; progress: number; speed: number }[] = []
        const maxDist = Math.min(cw, ch) * 0.45

        let frame: number
        const draw = () => {
            ctx.clearRect(0, 0, cw, ch)
            ctx.fillStyle = "#051a14"
            ctx.fillRect(0, 0, cw, ch)

            const t = Date.now() * 0.001

            // Brain fill: subtle inner glow
            ctx.save()
            ctx.fillStyle = `rgba(199, 125, 255, ${0.04 + Math.sin(t * 0.5) * 0.015})`
            ctx.fill(outerPath)
            ctx.restore()

            // Brain outline: glowing purple
            ctx.save()
            ctx.strokeStyle = `rgba(199, 125, 255, ${0.45 + Math.sin(t * 0.7) * 0.1})`
            ctx.lineWidth = 1.2
            ctx.stroke(brainPath)
            ctx.restore()

            // Outer glow on brain outline
            ctx.save()
            ctx.strokeStyle = `rgba(199, 125, 255, 0.1)`
            ctx.lineWidth = 4
            ctx.stroke(brainPath)
            ctx.restore()

            // Update and bounce nodes
            for (const n of nodes) {
                n.pulse += 0.025
                const nx = n.x + n.vx
                const ny = n.y + n.vy
                if (isInside(nx, ny)) {
                    n.x = nx
                    n.y = ny
                } else {
                    n.vx *= -0.8
                    n.vy *= -0.8
                    n.vx += (Math.random() - 0.5) * 0.1
                    n.vy += (Math.random() - 0.5) * 0.1
                }

                n.fireTimer--
                if (n.fireTimer <= 0) {
                    n.isFiring = true
                    n.fireTimer = 60 + Math.floor(Math.random() * 160)
                    // Fire signal to nearest node
                    let best = -1, bestD = maxDist
                    const idx = nodes.indexOf(n)
                    for (let j = 0; j < nodes.length; j++) {
                        if (j === idx) continue
                        const d = Math.hypot(n.x - nodes[j].x, n.y - nodes[j].y)
                        if (d < bestD) { bestD = d; best = j }
                    }
                    if (best >= 0 && signals.length < 10) {
                        signals.push({ from: idx, to: best, progress: 0, speed: 0.018 + Math.random() * 0.018 })
                    }
                } else if (n.fireTimer < n.fireTimer) {
                    n.isFiring = false
                }
                if (n.isFiring && n.fireTimer > 10) n.isFiring = false
            }

            // Dendrite connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y)
                    if (d < maxDist * 0.6) {
                        const alpha = (1 - d / (maxDist * 0.6)) * 0.18
                        const mx = (nodes[i].x + nodes[j].x) / 2 + Math.sin(i + j) * 4
                        const my = (nodes[i].y + nodes[j].y) / 2 + Math.cos(i + j) * 4
                        ctx.beginPath()
                        ctx.moveTo(nodes[i].x, nodes[i].y)
                        ctx.quadraticCurveTo(mx, my, nodes[j].x, nodes[j].y)
                        ctx.strokeStyle = `rgba(199, 125, 255, ${alpha})`
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }
                }
            }

            // Signals
            for (let i = signals.length - 1; i >= 0; i--) {
                const s = signals[i]
                s.progress += s.speed
                if (s.progress >= 1) {
                    nodes[s.to].isFiring = true
                    nodes[s.to].fireTimer = Math.max(nodes[s.to].fireTimer, 5)
                    signals.splice(i, 1)
                    continue
                }
                const a = nodes[s.from], b = nodes[s.to]
                const mx = (a.x + b.x) / 2 + Math.sin(s.from + s.to) * 4
                const my = (a.y + b.y) / 2 + Math.cos(s.from + s.to) * 4
                const p = s.progress
                const px = (1-p)*(1-p)*a.x + 2*(1-p)*p*mx + p*p*b.x
                const py = (1-p)*(1-p)*a.y + 2*(1-p)*p*my + p*p*b.y

                // Active path
                ctx.beginPath()
                ctx.moveTo(a.x, a.y)
                ctx.quadraticCurveTo(mx, my, b.x, b.y)
                ctx.strokeStyle = `rgba(199, 125, 255, ${0.35 * (1 - p * 0.4)})`
                ctx.lineWidth = 1.2
                ctx.stroke()

                // Signal glow
                const sg = ctx.createRadialGradient(px, py, 0, px, py, 7)
                sg.addColorStop(0, "rgba(255,255,255,0.9)")
                sg.addColorStop(0.3, "rgba(199,125,255,0.5)")
                sg.addColorStop(1, "transparent")
                ctx.beginPath()
                ctx.arc(px, py, 7, 0, Math.PI * 2)
                ctx.fillStyle = sg
                ctx.fill()
                ctx.beginPath()
                ctx.arc(px, py, 1.5, 0, Math.PI * 2)
                ctx.fillStyle = "#fff"
                ctx.fill()
            }

            // Neuron nodes
            for (const n of nodes) {
                const glow = (Math.sin(n.pulse) + 1) * 0.5
                const fire = n.isFiring ? 1 : 0
                const r = n.r + glow * 0.6 + fire * 2.5

                if (n.isFiring) {
                    const fg = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 5)
                    fg.addColorStop(0, "rgba(199,125,255,0.35)")
                    fg.addColorStop(0.5, "rgba(199,125,255,0.08)")
                    fg.addColorStop(1, "transparent")
                    ctx.beginPath()
                    ctx.arc(n.x, n.y, r * 5, 0, Math.PI * 2)
                    ctx.fillStyle = fg
                    ctx.fill()
                }

                // Ambient glow
                const ag = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3)
                ag.addColorStop(0, `rgba(199,125,255,${0.12 + glow * 0.1 + fire * 0.2})`)
                ag.addColorStop(1, "transparent")
                ctx.beginPath()
                ctx.arc(n.x, n.y, r * 3, 0, Math.PI * 2)
                ctx.fillStyle = ag
                ctx.fill()

                // Body
                ctx.beginPath()
                ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
                ctx.fillStyle = n.isFiring
                    ? `rgba(255,255,255,${0.85 + glow * 0.15})`
                    : `rgba(199,125,255,${0.55 + glow * 0.3})`
                ctx.fill()

                // Center
                ctx.beginPath()
                ctx.arc(n.x, n.y, r * 0.3, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255,255,255,${0.35 + glow * 0.3 + fire * 0.35})`
                ctx.fill()
            }

            frame = requestAnimationFrame(draw)
        }

        draw()
        return () => cancelAnimationFrame(frame)
    }, [])

    return (
        <div className="w-full h-full relative overflow-hidden bg-[#051a14]">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    )
})

const WorkshopWidget = memo(({ isRevealed }: { isRevealed: boolean }) => (
    <motion.div
        className="absolute bottom-8 left-4 z-40 hidden md:block xl:bottom-12 xl:left-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isRevealed ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.5, duration: 0.8 }}
    >
        <a
            href="/neuromarketing-workshop"
            className="group block cursor-pointer"
        >
            <div className="relative flex h-[280px] w-[220px] flex-col rounded-xl border-2 border-[#0C0C0C] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#C77DFF]">
                <div className="border-b-2 border-[#0C0C0C] px-4 py-2 bg-[#f4f4f4] rounded-t-[9px]">
                    <span className="block text-[10px] font-black uppercase tracking-widest text-[#0C0C0C]/60">NEXT EVENT</span>
                </div>
                <div className="flex-1 relative overflow-hidden bg-[#051a14]">
                    <NeuroAnimation />
                </div>
                <div className="border-t-2 border-[#0C0C0C] p-3 bg-white rounded-b-[9px]">
                    <div className="flex justify-between items-end gap-2">
                        <div className="flex-1 min-w-0">
                            <span className="block text-[9px] font-bold uppercase text-[#C77DFF]">WORKSHOP</span>
                            <h4 className="text-[10px] font-black uppercase leading-tight text-[#0C0C0C] mt-1">THE INVISIBLE INFLUENCE: BRAND WARFARE & NEUROMARKETING</h4>
                        </div>
                        <div className="flex flex-col items-end flex-shrink-0">
                            <span className="text-xl font-black text-[#0C0C0C] leading-none">28</span>
                            <span className="text-[8px] font-bold uppercase text-[#0C0C0C]/60">MAR</span>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-[10px] font-bold uppercase text-[#C77DFF] transition-opacity opacity-0 group-hover:opacity-100">
                        <span>Register Now</span>
                        <ArrowUpRight className="w-3 h-3" />
                    </div>
                </div>
            </div>
        </a>
    </motion.div>
))

const CTAButton = memo(({
    isRevealed,
    scrollProgress,
    ctaRef,
    onMouseEnter,
    onClick
}: {
    isRevealed: boolean
    scrollProgress: number
    ctaRef: React.RefObject<HTMLButtonElement | null>
    onMouseEnter: () => void
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => {
    const isVisible = isRevealed && scrollProgress < 0.05

    return (
        <motion.div
            className="absolute bottom-8 right-4 z-40 hidden flex-col items-end md:flex xl:bottom-12 xl:right-8"
            initial={{ opacity: 0 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? "auto" : "none"
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <motion.button
                ref={ctaRef}
                className="group relative overflow-hidden rounded-full border-2 border-[#0C0C0C] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#0C0C0C] transition-all hover:border-[#BF953F] focus:outline-none focus:ring-2 focus:ring-[#BF953F] focus:ring-offset-2 bg-white/80 backdrop-blur-sm"
                style={{ opacity: 0 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={onMouseEnter}
                onClick={onClick}
            >
                <span className="relative z-10 transition-colors group-hover:text-[#0C0C0C]">Start Your Journey</span>
                <motion.div
                    className="absolute inset-0 -z-0"
                    style={{ backgroundImage: GOLD_GRADIENT }}
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
            </motion.button>
        </motion.div>
    )
})

const MarqueeRow = memo(({
    containerRef,
    content,
    speed,
    className,
    style
}: {
    containerRef: React.RefObject<HTMLDivElement | null>
    content: string
    speed: number
    className: string
    style?: React.CSSProperties
}) => {
    const [offset, setOffset] = useState(0)
    const animationFrameRef = useRef<number | null>(null)
    const contentRef = useRef<HTMLSpanElement>(null)
    const contentWidthRef = useRef(0)
    const initializedRef = useRef(false)

    useEffect(() => {
        const animate = () => {
            // Get content width on first frame
            if (contentRef.current && contentWidthRef.current === 0) {
                contentWidthRef.current = contentRef.current.offsetWidth
            }

            const contentWidth = contentWidthRef.current

            if (contentWidth > 0) {
                // Initialize offset for positive speed
                if (!initializedRef.current && speed > 0) {
                    setOffset(-contentWidth)
                    initializedRef.current = true
                } else if (!initializedRef.current) {
                    initializedRef.current = true
                }

                setOffset(prev => {
                    let newOffset = prev + speed
                    // For negative speed (right-to-left): reset when scrolled one full width
                    if (speed < 0 && newOffset <= -contentWidth) {
                        newOffset = 0
                    }
                    // For positive speed (left-to-right): reset when back to start
                    if (speed > 0 && newOffset >= 0) {
                        newOffset = -contentWidth
                    }
                    return newOffset
                })
            }

            animationFrameRef.current = requestAnimationFrame(animate)
        }

        animationFrameRef.current = requestAnimationFrame(animate)

        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
        }
    }, [speed])

    return (
        <div
            ref={containerRef}
            className="whitespace-nowrap overflow-hidden w-full"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
            <div
                className="inline-flex"
                style={{ transform: `translateX(${offset}px)`, willChange: 'transform' }}
            >
                <span ref={contentRef} className={className} style={style}>
                    {content}
                </span>
                <span className={className} style={style}>
                    {content}
                </span>
            </div>
        </div>
    )
})

const RollingBannerDesktop = memo(({ scrollProgress }: { scrollProgress: number }) => {
    const marqueeRef1 = useRef<HTMLDivElement>(null)
    const marqueeRef2 = useRef<HTMLDivElement>(null)

    const isVisible = scrollProgress > 0.1

    return (
        <motion.div
            className="hidden md:block absolute bottom-[3vh] left-0 right-0 z-40 select-none overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 0.9 : 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="flex flex-col items-center justify-center">
                <MarqueeRow
                    containerRef={marqueeRef1}
                    content={MARQUEE_CONTENT_1}
                    speed={0.4}
                    className="font-[family-name:var(--font-milan)] text-[3vw] font-bold uppercase tracking-tight bg-clip-text text-transparent mx-8 flex-shrink-0"
                    style={{ backgroundImage: GOLD_GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                />
                <MarqueeRow
                    containerRef={marqueeRef2}
                    content={MARQUEE_CONTENT_2}
                    speed={-0.4}
                    className="font-[family-name:var(--font-milan)] text-[3vw] font-normal uppercase tracking-tight text-[#F7F7F3] mx-8 flex-shrink-0"
                />
            </div>
        </motion.div>
    )
})

const RollingBannerMobile = memo(({ scrollProgress }: { scrollProgress: number }) => {
    const marqueeRef1 = useRef<HTMLDivElement>(null)
    const marqueeRef2 = useRef<HTMLDivElement>(null)

    const isVisible = scrollProgress > 0.1

    return (
        <motion.div
            className="md:hidden absolute bottom-[12vh] left-0 right-0 z-[-35] py-18 select-none overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 0.9 : 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="flex flex-col gap-0">
                <MarqueeRow
                    containerRef={marqueeRef1}
                    content={MARQUEE_CONTENT_1}
                    speed={0.4}
                    className="font-[family-name:var(--font-milan)] text-[8vw] font-bold uppercase tracking-tight bg-clip-text text-transparent mx-4 flex-shrink-0"
                    style={{ backgroundImage: GOLD_GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                />
                <MarqueeRow
                    containerRef={marqueeRef2}
                    content={MARQUEE_CONTENT_2}
                    speed={-0.4}
                    className="font-[family-name:var(--font-milan)] text-[8vw] font-normal uppercase tracking-tight text-[#F7F7F3] mx-4 flex-shrink-0"
                />
            </div>
        </motion.div>
    )
})

const WingsReveal = memo(({
    isHovered,
    scrollProgress,
    isMobile
}: {
    isHovered: boolean
    scrollProgress: number
    isMobile: boolean
}) => {
    if (isMobile) return null

    const shouldShow = isHovered && scrollProgress < 0.15

    const wingClasses = `absolute pointer-events-none
        w-[210px] h-[210px]
        sm:w-[260px] sm:h-[260px]
        md:w-[600px] md:h-[600px]
        lg:w-[700px] lg:h-[700px]
        xl:w-[525px] xl:h-[525px]
        2xl:w-[525px] 2xl:h-[525px]`

    return (
        <>
            <motion.div
                className={wingClasses}
                style={{
                    top: '60%',
                    right: '55%',
                    marginRight: '-15px',
                    transformOrigin: 'right center',
                    zIndex: 5,
                }}
                initial={{ opacity: 0, x: 120, scale: 0.6, y: '-50%' }}
                animate={{
                    opacity: shouldShow ? 1 : 0,
                    x: shouldShow ? 0 : 120,
                    scale: shouldShow ? 1 : 0.6,
                    rotate: shouldShow ? -20 : -10,
                }}
                transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                <img
                    src="/images/element-download-1764790639.png"
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-contain"
                    style={{ transform: 'scaleX(-1)' }}
                    draggable={false}
                />
            </motion.div>

            <motion.div
                className={wingClasses}
                style={{
                    top: '60%',
                    left: '57%',
                    marginLeft: '-15px',
                    transformOrigin: 'left center',
                    zIndex: 5,
                }}
                initial={{ opacity: 0, x: -120, scale: 0.6, y: '-50%' }}
                animate={{
                    opacity: shouldShow ? 1 : 0,
                    x: shouldShow ? 0 : -120,
                    scale: shouldShow ? 1 : 0.6,
                    rotate: shouldShow ? 20 : 10,
                }}
                transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.1,
                }}
            >
                <img
                    src="/images/element-download-1764790639.png"
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-contain"
                    draggable={false}
                />
            </motion.div>
        </>
    )
})

const OnePercentSVG = memo(({ scrollProgress }: { scrollProgress: number }) => {
    const textOpacity = scrollProgress > 0.7 ? Math.min((scrollProgress - 0.7) * 4, 1) : 0
    const textY = scrollProgress > 0.7 ? 0 : 20

    const strokeOffsets = useMemo(() => ({
        one: 250 - (Math.max(0, Math.min((scrollProgress - 0.3) * 2.5, 1)) * 250),
        slash: 150 - (Math.max(0, Math.min((scrollProgress - 0.4) * 2.5, 1)) * 150),
        zero1: 115 - (Math.max(0, Math.min((scrollProgress - 0.45) * 3, 1)) * 115),
        zero2: 115 - (Math.max(0, Math.min((scrollProgress - 0.5) * 3, 1)) * 115),
    }), [scrollProgress])

    return (
        <motion.div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: scrollProgress > 0.1 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
        >
            <motion.p
                className="absolute top-[25vh] md:top-[20vh] left-0 right-0 z-100 text-5xl font-[family-name:var(--font-milan)] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold bg-clip-text text-transparent text-center px-8 sm:px-8"
                style={{
                    backgroundImage: GOLD_GRADIENT,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    opacity: textOpacity,
                    transform: `translateY(${textY}px)`
                }}
            >
                JOIN THE TOP
            </motion.p>

            <div className="relative z-50 w-[65vw] h-[65vw] md:w-[30vw] md:h-[30vw] lg:w-[20vw] lg:h-[20vw]">
                <svg viewBox="0 0 200 150" className="w-full h-full overflow-visible drop-shadow-[0_0_30px_rgba(234,191,54,0.4)]">
                    <defs>
                        <linearGradient id="heroGold" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#BF953F" />
                            <stop offset="25%" stopColor="#FCF6BA" />
                            <stop offset="50%" stopColor="#B38728" />
                            <stop offset="75%" stopColor="#FBF5B7" />
                            <stop offset="100%" stopColor="#AA771C" />
                        </linearGradient>
                    </defs>
                    <path d="M30,20 L50,20 L50,130 M30,130 L70,130" fill="none" stroke="url(#heroGold)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 250, strokeDashoffset: strokeOffsets.one, transition: "stroke-dashoffset 0.1s ease-out" }} />
                    <path d="M90,130 L170,20" fill="none" stroke="url(#heroGold)" strokeWidth="10" strokeLinecap="round" style={{ strokeDasharray: 150, strokeDashoffset: strokeOffsets.slash, transition: "stroke-dashoffset 0.1s ease-out" }} />
                    <circle cx="110" cy="35" r="18" fill="none" stroke="url(#heroGold)" strokeWidth="10" style={{ strokeDasharray: 115, strokeDashoffset: strokeOffsets.zero1, transition: "stroke-dashoffset 0.1s ease-out" }} />
                    <circle cx="160" cy="115" r="18" fill="none" stroke="url(#heroGold)" strokeWidth="10" style={{ strokeDasharray: 115, strokeDashoffset: strokeOffsets.zero2, transition: "stroke-dashoffset 0.1s ease-out" }} />
                </svg>
            </div>
        </motion.div>
    )
})

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
    const [isHeroHovered, setIsHeroHovered] = useState(false)
    const [isMobileDevice, setIsMobileDevice] = useState(false)

    const particlesRef = useRef<ReturnType<typeof createAmbientParticles> | null>(null)
    const ctaSweepRef = useRef<ReturnType<typeof createCTANeonSweep> | null>(null)
    const ctaMagneticCleanupRef = useRef<(() => void) | null>(null)

    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })
    const baseImageScale = useTransform(scrollYProgress, [0, 1], [1, 0.5])

    // Preload hero images as early as possible
    useEffect(() => {
        const urls = [
            "https://res.cloudinary.com/ds1ka0bap/image/upload/f_auto,q_auto,w_1920/v1769156300/hero-base_adraen",
            "https://res.cloudinary.com/ds1ka0bap/image/upload/f_auto,q_auto,w_1920/v1769156301/hero-reveal_pso2uj",
        ]
        urls.forEach((href) => {
            const existing = document.querySelector(`link[href="${href}"]`)
            if (existing) return
            const link = document.createElement("link")
            link.rel = "preload"
            link.as = "image"
            link.href = href
            link.fetchPriority = "high"
            document.head.appendChild(link)
        })
    }, [])

    // Check for mobile device
    useEffect(() => {
        const checkMobile = () => setIsMobileDevice(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Initialize animations
    useEffect(() => {
        const reducedMotion = checkReducedMotion()
        setPrefersReducedMotion(reducedMotion)

        const timer = setTimeout(() => {
            setIsRevealed(true)
            initPageLoadTimeline({
                spotlight: spotlightRef.current || undefined,
                cta: ctaRef.current || undefined
            })

            if (spotlightRef.current) {
                initSpotlightBreathing(spotlightRef.current)
            }

            if (ctaRef.current) {
                ctaSweepRef.current = createCTANeonSweep(ctaRef.current)
                ctaMagneticCleanupRef.current = createCTAMagneticPull({
                    button: ctaRef.current,
                    magnetRadius: 80
                })
            }

            if (containerRef.current && !isMobile()) {
                particlesRef.current = createAmbientParticles({
                    container: containerRef.current,
                    maxParticles: 15
                })
            }

            const animationCompleteTimer = setTimeout(() => {
                setHeroAnimationComplete(true)
            }, 1700)

            return () => clearTimeout(animationCompleteTimer)
        }, 100)

        return () => {
            clearTimeout(timer)
            particlesRef.current?.destroy()
            if (ctaMagneticCleanupRef.current) ctaMagneticCleanupRef.current()
        }
    }, [setHeroAnimationComplete])

    // ScrollTrigger setup
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

        const clipInset = "50% 50% 50% 50%"
        tl.to(clipMaskRef.current, { clipPath: `inset(${clipInset})`, ease: "none" }, 0)

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill())
        }
    }, [isRevealed, prefersReducedMotion])

    const handleCTAClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ctaRef.current || !containerRef.current) return

        createCTAClickRipple(ctaRef.current, e.nativeEvent)
        const rect = ctaRef.current.getBoundingClientRect()
        createPlaneTakeoff(containerRef.current, rect.left + rect.width / 2, rect.top + rect.height / 2)

        setTimeout(() => {
            window.open("https://docs.google.com/forms/d/e/1FAIpQLSct-ZWoKEbSLmI3P59ZUj5bqPMoxJAeP9rt-1US3qBwUtAPgw/viewform", "_self")
        }, 800)
    }, [])

    const handleCTAMouseEnter = useCallback(() => {
        ctaSweepRef.current?.play()
    }, [])

    const handleMouseEnter = useCallback(() => {
        if (!isMobileDevice) setIsHeroHovered(true)
    }, [isMobileDevice])

    const handleMouseLeave = useCallback(() => {
        if (!isMobileDevice) setIsHeroHovered(false)
    }, [isMobileDevice])

    return (
        <div ref={scrollyContainerRef} className="relative h-[200vh] sm:h-[250vh] lg:h-[300vh] mb-12 md:mb-40">
            <div className="sticky top-0 h-screen overflow-hidden">
                <div ref={clipMaskRef} className="absolute inset-0 will-change-[clip-path]" style={{ clipPath: "inset(0% 0% 0% 0%)" }}>
                    <section
                        id="hero"
                        ref={containerRef}
                        data-theme="light"
                        className="hero-viewport relative flex h-full min-h-screen items-center justify-center overflow-hidden bg-white"
                        role="region"
                        aria-label="Hero section - Take flight with Alcovia"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Full-Screen CursorLens with Background Blobs */}
                        <motion.div className="absolute inset-0 z-0" style={{ scale: baseImageScale }}>
                            <WingsReveal isHovered={isHeroHovered} scrollProgress={scrollProgress} isMobile={isMobileDevice} />
                            <CursorLens
                                baseImage="https://res.cloudinary.com/ds1ka0bap/image/upload/f_auto,q_auto,w_1920/v1769156300/hero-base_adraen"
                                revealImage="https://res.cloudinary.com/ds1ka0bap/image/upload/f_auto,q_auto,w_1920/v1769156301/hero-reveal_pso2uj"
                                objectFit="cover"
                                backgroundColor="#f8f8f5"
                                showBackground={true}
                                blobSize={200}
                                bgBlobCount={0}
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
                        <div
                            ref={spotlightRef}
                            className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-0 z-[6]"
                            style={{ background: "radial-gradient(circle, rgba(206,255,43,0.08) 0%, transparent 60%)" }}
                        />

                        {/* Mobile Tagline - Top Center */}
                        <div className="absolute top-28 left-0 right-0 z-40 px-4 xl:hidden">
                            <MobileTagline isRevealed={isRevealed} scrollProgress={scrollProgress} />
                        </div>

                        {/* Desktop Tagline - Right Side */}
                        <motion.div
                            className="hidden xl:flex absolute right-12 top-[45%] -translate-y-1/2 flex-col items-start z-40"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{
                                opacity: isRevealed && scrollProgress < 0.05 ? 1 : 0,
                                x: scrollProgress < 0.05 ? 0 : 30,
                                pointerEvents: scrollProgress < 0.05 ? "auto" : "none"
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <p className="text-[#0C0C0C] font-[family-name:var(--font-milan)] text-xl leading-relaxed tracking-tight max-w-[250px]">World&apos;s first</p>
                            <p className="text-[#EABF36] font-[family-name:var(--font-milan)] text-2xl font-semibold leading-relaxed tracking-tight max-w-[250px]">Ambition Building</p>
                            <p className="text-[#0C0C0C] font-[family-name:var(--font-milan)] text-xl leading-relaxed tracking-tight max-w-[250px]">Program for Teenagers</p>
                        </motion.div>

                        {/* Workshop Widget - Bottom Left */}
                        <WorkshopWidget isRevealed={isRevealed} />

                        {/* CTA Button - Bottom Right */}
                        <CTAButton
                            isRevealed={isRevealed}
                            scrollProgress={scrollProgress}
                            ctaRef={ctaRef}
                            onMouseEnter={handleCTAMouseEnter}
                            onClick={handleCTAClick}
                        />
                    </section>
                </div>

                <RollingBannerDesktop scrollProgress={scrollProgress} />
                <RollingBannerMobile scrollProgress={scrollProgress} />
                <OnePercentSVG scrollProgress={scrollProgress} />
            </div>
        </div>
    )
}