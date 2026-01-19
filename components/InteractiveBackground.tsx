"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export default function InteractiveBackground() {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

    // 1. MOUSE TRACKING
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // 2. PHYSICS: "Heavier" spring for underwater/premium float feel
    const springConfig = { stiffness: 40, damping: 30, mass: 1.5 }
    const mouseX = useSpring(x, springConfig)
    const mouseY = useSpring(y, springConfig)

    useEffect(() => {
        // Initial Size
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })

        const handleMouseMove = (e: MouseEvent) => {
            // Center the coordinate system (0,0 is middle of screen)
            // This makes the parallax feel more natural radiating from center
            x.set(e.clientX - window.innerWidth / 2)
            y.set(e.clientY - window.innerHeight / 2)
        }

        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("resize", handleResize)
        }
    }, [x, y])

    // 3. PARALLAX LAYERS (Different movement ranges for depth)
    // Layer 1 (Deepest/Back) - Moves slowly
    const xMove1 = useTransform(mouseX, [-windowSize.width / 2, windowSize.width / 2], [15, -15])
    const yMove1 = useTransform(mouseY, [-windowSize.height / 2, windowSize.height / 2], [15, -15])

    // Layer 2 (Mid) - Moves moderately
    const xMove2 = useTransform(mouseX, [-windowSize.width / 2, windowSize.width / 2], [30, -30])
    const yMove2 = useTransform(mouseY, [-windowSize.height / 2, windowSize.height / 2], [30, -30])

    // Layer 3 (Front) - Moves the most
    const xMove3 = useTransform(mouseX, [-windowSize.width / 2, windowSize.width / 2], [50, -50])
    const yMove3 = useTransform(mouseY, [-windowSize.height / 2, windowSize.height / 2], [50, -50])

    return (
        <div className="absolute inset-0 -z-10 overflow-hidden bg-[#FAFAFA]">

            {/* ═══════════════════════════════════════════════════════════════════
          LAYER 1: Deep Background Contours (Slow, Faint)
          Large organic curves that mimic topographic map lines
      ═══════════════════════════════════════════════════════════════════ */}
            <motion.div
                className="absolute inset-[-15%] w-[130%] h-[130%]"
                style={{ x: xMove1, y: yMove1 }}
            >
                <svg
                    viewBox="0 0 1000 800"
                    preserveAspectRatio="xMidYMid slice"
                    className="w-full h-full"
                >
                    <g stroke="#B8B8B8" fill="none" strokeWidth="1.5" opacity="0.5">
                        {/* Organic flowing contour lines */}
                        <path d="M-50,100 Q150,50 300,150 T600,100 T950,180 T1050,120" />
                        <path d="M-50,200 Q200,150 350,250 T700,180 T1050,280" />
                        <path d="M-50,350 Q100,280 250,380 T550,320 T850,420 T1050,350" />
                        <path d="M-50,500 Q180,430 380,530 T680,470 T1050,550" />
                        <path d="M-50,650 Q120,580 320,680 T620,620 T920,720 T1050,680" />
                        <path d="M-50,780 Q200,720 400,800 T800,750 T1050,820" />

                        {/* Additional flowing curves for density */}
                        <path d="M100,-50 Q150,100 100,250 T180,500 T120,750 T200,900" />
                        <path d="M300,-50 Q280,150 350,300 T280,550 T350,800 T300,900" />
                        <path d="M550,-50 Q500,100 580,280 T520,480 T600,700 T550,900" />
                        <path d="M750,-50 Q720,120 800,300 T740,520 T820,720 T780,900" />
                        <path d="M920,-50 Q880,180 950,350 T900,580 T980,780 T920,900" />
                    </g>
                </svg>
            </motion.div>

            {/* ═══════════════════════════════════════════════════════════════════
          LAYER 2: Mid-ground Contours (Moderate speed, Medium opacity)
          Creates depth between layers
      ═══════════════════════════════════════════════════════════════════ */}
            <motion.div
                className="absolute inset-[-15%] w-[130%] h-[130%]"
                style={{ x: xMove2, y: yMove2 }}
            >
                <svg
                    viewBox="0 0 1000 800"
                    preserveAspectRatio="xMidYMid slice"
                    className="w-full h-full"
                >
                    <g stroke="#909090" fill="none" strokeWidth="2" opacity="0.6">
                        {/* Sweeping horizontal contours */}
                        <path d="M-100,80 C100,20 200,140 400,60 S700,150 900,80 L1100,100" />
                        <path d="M-100,220 C150,160 300,280 500,200 S750,300 950,220 L1100,250" />
                        <path d="M-100,380 C80,320 250,440 450,360 S700,460 900,380 L1100,400" />
                        <path d="M-100,540 C150,480 320,600 520,520 S780,620 980,540 L1100,560" />
                        <path d="M-100,700 C100,640 280,760 480,680 S720,780 920,700 L1100,720" />

                        {/* Diagonal wave patterns */}
                        <path d="M-50,0 C100,100 50,200 200,300 S150,500 300,600 T400,800 L350,900" />
                        <path d="M450,-50 C400,80 550,180 500,320 S650,420 600,580 T700,780 L680,900" />
                        <path d="M850,-50 C900,100 800,220 880,380 S780,500 860,660 T920,850 L900,950" />
                    </g>
                </svg>
            </motion.div>

            {/* ═══════════════════════════════════════════════════════════════════
          LAYER 3: Foreground Contours (Fastest, Most visible)
          Creates the "close to camera" depth feeling
      ═══════════════════════════════════════════════════════════════════ */}
            <motion.div
                className="absolute inset-[-20%] w-[140%] h-[140%]"
                style={{ x: xMove3, y: yMove3 }}
            >
                <svg
                    viewBox="0 0 1000 800"
                    preserveAspectRatio="xMidYMid slice"
                    className="w-full h-full"
                >
                    <g stroke="#707070" fill="none" strokeWidth="2.5" opacity="0.7">
                        {/* Bold, flowing primary contours */}
                        <path d="M-100,150 Q200,50 400,180 T800,100 T1100,200" />
                        <path d="M-100,400 Q150,300 350,430 T750,350 T1100,450" />
                        <path d="M-100,650 Q180,550 380,680 T780,600 T1100,700" />

                        {/* Intersecting curved lines for complexity */}
                        <path d="M200,-100 Q150,150 280,350 T200,580 T300,850" />
                        <path d="M600,-100 Q650,100 550,300 T650,520 T580,800" />
                        <path d="M900,-100 Q850,180 950,380 T880,600 T950,850" />
                    </g>
                </svg>
            </motion.div>

            {/* ═══════════════════════════════════════════════════════════════════
          NOISE GRAIN OVERLAY
          Adds "paper" texture feel for premium aesthetic
      ═══════════════════════════════════════════════════════════════════ */}
            <div
                className="absolute inset-0 opacity-[0.35] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* ═══════════════════════════════════════════════════════════════════
          VIGNETTE
          Softens edges to focus attention on center content
      ═══════════════════════════════════════════════════════════════════ */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.8)_90%)] pointer-events-none" />

        </div>
    )
}
