"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export default function ParallaxBackground() {
    const [isMounted, setIsMounted] = useState(false)

    // Mouse position motion values
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth springs for fluid movement
    const springConfig = { damping: 30, stiffness: 100 }
    const springX = useSpring(mouseX, springConfig)
    const springY = useSpring(mouseY, springConfig)

    // PARALLAX - Very subtle movement (max 12px)
    const bgX = useTransform(springX, [-0.5, 0.5], [12, -12])
    const bgY = useTransform(springY, [-0.5, 0.5], [12, -12])

    useEffect(() => {
        setIsMounted(true)

        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) - 0.5
            const y = (e.clientY / window.innerHeight) - 0.5
            mouseX.set(x)
            mouseY.set(y)
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [mouseX, mouseY])

    if (!isMounted) {
        // SSR fallback - static background
        return (
            <div className="fixed inset-0 z-[-1] bg-[#08261e]">
                <div
                    className="absolute inset-[-20px] opacity-30"
                    style={{
                        backgroundImage: "url('/images/nav-menu.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />
            </div>
        )
    }

    return (
        <div className="fixed inset-0 z-[-1] bg-[#08261e] overflow-hidden">
            {/* PARALLAX BACKGROUND LAYER - Moves subtly with cursor */}
            <motion.div
                className="absolute inset-[-20px] opacity-30 pointer-events-none"
                style={{
                    backgroundImage: "url('/images/nav-menu.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    x: bgX,
                    y: bgY,
                }}
            />
        </div>
    )
}
