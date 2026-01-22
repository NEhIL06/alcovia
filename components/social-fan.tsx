"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { ScrollReveal } from "./text-reveal"

const socials = [
    {
        platform: "LinkedIn",
        handle: "Alcovia",
        
        image: "/images/linkedin.jpg",
        url: "https://www.linkedin.com/company/alcovia-life/",
    },
    {
        platform: "Instagram",
        handle: "@alcovia.in",
        
        image: "/images/insta.jpg",
        url: "https://www.instagram.com/alcovia.life/",
    },
    {
        platform: "YouTube",
        handle: "Alcovia",
        
        image: "/images/youtube.jpg",
        url: "https://www.youtube.com/@Alcovialife",
    }
]

// Card positions - subtle fan layout
const cardPositions = [
    { x: -120, y: 20, rotate: -12, scale: 0.95 },  // Left card (Reduced spread)
    { x: 0, y: 0, rotate: 0, scale: 1 },            // Center card
    { x: 120, y: 20, rotate: 12, scale: 0.95 },     // Right card (Reduced spread)
]

// Desktop positions (wider spread)
const cardPositionsDesktop = [
    { x: -240, y: 35, rotate: -10, scale: 0.95 },
    { x: 0, y: 0, rotate: 0, scale: 1 },
    { x: 240, y: 35, rotate: 10, scale: 0.95 },
]

export default function SocialFan() {
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true, margin: "-100px" })
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 768)
        checkDesktop()
        window.addEventListener("resize", checkDesktop)
        return () => window.removeEventListener("resize", checkDesktop)
    }, [])

    // Get card transform based on hover state - SUBTLE movements only
    const getCardTransform = (index: number) => {
        const positions = isDesktop ? cardPositionsDesktop : cardPositions
        const base = positions[index]

        // No hover - return base position
        if (hoveredIndex === null) {
            return {
                x: base.x,
                y: base.y,
                rotate: base.rotate,
                scale: base.scale,
                zIndex: index === 1 ? 3 : index === 0 ? 1 : 2, // Center card on top by default
            }
        }

        // This card is hovered - rise up slightly
        if (hoveredIndex === index) {
            return {
                x: base.x,
                y: base.y - 30, // Rise up just 30px
                rotate: base.rotate * 0.5, // Straighten slightly
                scale: 1.02, // Tiny scale boost
                zIndex: 10,
            }
        }

        // Another card is hovered - subtle spread away
        const diff = index - hoveredIndex
        const spreadAmount = isDesktop ? 25 : 18 // Subtle spread

        return {
            x: base.x + (diff * spreadAmount),
            y: base.y + 5, // Slight dip
            rotate: base.rotate + (diff * 2), // Tiny rotation
            scale: base.scale * 0.98,
            zIndex: index === 1 ? 2 : 1,
        }
    }

    return (
        <section
            ref={containerRef}
            className="relative bg-[#F5F5EF] px-6 py-24 md:px-12 overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-[#EABF36]/5 blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-[#EABF36]/3 blur-[80px]" />
            </div>

            <div className="relative mx-auto max-w-7xl">

                {/* Header */}
                <motion.div
                    className="flex flex-col mb-12 text-center items-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <ScrollReveal className="w-fit">
                        <h2 className="text-3xl font-black uppercase tracking-tight text-[#0B0B0B] md:text-5xl lg:text-6xl">
                            FOLLOW ALCOVIA
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal className="w-fit">
                        <h2 className="text-3xl font-black uppercase tracking-tight text-[#0B0B0B]/50 md:text-5xl lg:text-6xl">
                            ON SOCIAL MEDIA
                        </h2>
                    </ScrollReveal>
                </motion.div>

                {/* Card Container */}
                <div className="relative flex h-[350px] items-center justify-center md:h-[650px] lg:h-[750px]">
                    {socials.map((social, index) => {
                        const transform = getCardTransform(index)

                        return (
                            <motion.a
                                key={social.platform}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                // OPTIMIZATION: 'will-change-transform' forces the browser to promote this to a GPU layer
                                // creating buttery smooth 60fps animation on mobile.
                                className="absolute cursor-pointer will-change-transform"

                                initial={{
                                    opacity: 0,
                                    x: 0,
                                    y: 150,       // Reduced slightly so the travel distance feels more controlled
                                    rotate: 0,
                                    scale: 0.9,   // Start closer to final size to reduce pixel-shimmering
                                }}

                                animate={isInView ? {
                                    opacity: 1,
                                    x: transform.x,
                                    y: transform.y,
                                    rotate: transform.rotate,
                                    scale: transform.scale,
                                } : {}}

                                // PREMIUM PHYSICS:
                                // High Mass (1.2) + Lower Stiffness (120) = "Heavy" expensive feel.
                                // It won't snap cheaply; it will glide into place with authority.
                                transition={{
                                    type: "spring",
                                    stiffness: 120,
                                    damping: 18,
                                    mass: 1.2,
                                    delay: index * 0.12, // Slightly tighter timing
                                }}

                                // Use style for zIndex to avoid layout thrashing
                                style={{ zIndex: transform.zIndex }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onTouchStart={() => setHoveredIndex(index)}
                                onTouchEnd={() => setHoveredIndex(null)}
                            >
                                {/* VISUAL POLISH: 
                                   1. Added 'ring-1 ring-white/10' for a subtle premium glass edge.
                                   2. Changed shadow to 'shadow-2xl' but with a blacker hue for contrast.
                                */}
                                <div className="relative h-[240px] w-[160px] overflow-hidden rounded-2xl bg-[#0B0B0B] ring-1 ring-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:h-[500px] md:w-[320px] lg:h-[560px] lg:w-[360px]">

                                    <Image
                                        src={social.image}
                                        alt={social.platform}
                                        fill
                                        quality={90} // Ensure crisp avatars
                                        // OPTIMIZATION: Crucial for Core Web Vitals.
                                        // Tells browser to load smaller images on mobile, bigger on desktop.
                                        sizes="(max-width: 768px) 160px, (max-width: 1200px) 320px, 360px"
                                        className="object-cover transition-transform duration-700 ease-out hover:scale-105" // Subtle zoom on image itself
                                    />

                                    {/* Gradient: Made slightly stronger at bottom for text legibility */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/20 to-transparent opacity-90" />

                                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                                        <span className="mb-2 inline-block rounded-full bg-[#EABF36] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0B0B0B] shadow-sm">
                                            {social.platform}
                                        </span>
                                        <h3 className="text-lg font-bold text-white md:text-xl">
                                            {social.handle}
                                        </h3>
                                        
                                    </div>
                                </div>
                            </motion.a>
                        )
                    })}
                </div>

                {/* CTA Text */}
                <motion.div
                    className="mt-16 mb-12 flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <ScrollReveal className="w-fit">
                        <h3 className="text-2xl font-bold uppercase tracking-widest text-[#0B0B0B] text-center md:text-3xl lg:text-4xl">
                            Follow Us Everywhere
                        </h3>
                    </ScrollReveal>
                </motion.div>

                {/* Social Text Links */}
                <motion.div
                    className="mb-16 flex flex-wrap items-center justify-center gap-6 md:gap-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {socials.map((social) => (
                        <a
                            key={social.platform}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative overflow-hidden"
                        >
                            <span className="relative block text-sm font-bold uppercase tracking-widest text-[#0B0B0B] md:text-base">
                                {/* Base text */}
                                <span className="flex">
                                    {social.platform.split("").map((letter, i) => (
                                        <span
                                            key={i}
                                            className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-full"
                                            style={{ transitionDelay: `${i * 20}ms` }}
                                        >
                                            {letter}
                                        </span>
                                    ))}
                                </span>
                                {/* Hover text (hidden below, revealed on hover) */}
                                <span className="absolute inset-0 flex text-[#EABF36]">
                                    {social.platform.split("").map((letter, i) => (
                                        <span
                                            key={i}
                                            className="inline-block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
                                            style={{ transitionDelay: `${i * 20}ms` }}
                                        >
                                            {letter}
                                        </span>
                                    ))}
                                </span>
                            </span>
                        </a>
                    ))}
                </motion.div>

            </div>
        </section>
    )
}
