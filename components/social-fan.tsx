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

export default function SocialFan() {
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.3 })
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    // Get card transform based on hover state and viewport
    const getCardTransform = (index: number) => {
        // MOBILE: Much tighter fan
        const mobilePositions = [
            { x: -70, y: 10, rotate: -6, scale: 0.90 },  // Left - REDUCED spread
            { x: 0, y: 0, rotate: 0, scale: 1 },          // Center
            { x: 70, y: 10, rotate: 6, scale: 0.90 },    // Right - REDUCED spread
        ]

        // DESKTOP: Wide fan
        const desktopPositions = [
            { x: -240, y: 35, rotate: -10, scale: 0.95 },
            { x: 0, y: 0, rotate: 0, scale: 1 },
            { x: 240, y: 35, rotate: 10, scale: 0.95 },
        ]

        const positions = isMobile ? mobilePositions : desktopPositions
        const base = positions[index]

        // No hover
        if (hoveredIndex === null) {
            return {
                x: base.x,
                y: base.y,
                rotate: base.rotate,
                scale: base.scale,
                zIndex: index === 1 ? 3 : index === 0 ? 1 : 2,
            }
        }

        // This card is hovered
        if (hoveredIndex === index) {
            return {
                x: base.x,
                y: base.y - (isMobile ? 15 : 30),
                rotate: base.rotate * 0.5,
                scale: isMobile ? 1.0 : 1.02,
                zIndex: 10,
            }
        }

        // Another card is hovered
        const diff = index - hoveredIndex
        const spreadAmount = isMobile ? 10 : 25

        return {
            x: base.x + (diff * spreadAmount),
            y: base.y + 5,
            rotate: base.rotate + (diff * 2),
            scale: base.scale * 0.98,
            zIndex: index === 1 ? 2 : 1,
        }
    }

    // MOBILE card size
    const cardWidth = isMobile ? 130 : 320
    const cardHeight = isMobile ? 200 : 500

    return (
        <section
            ref={containerRef}
            className="relative bg-[#F5F5EF] px-4 py-16 md:px-12 md:py-24 overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-[#EABF36]/5 blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-[#EABF36]/3 blur-[80px]" />
            </div>

            <div className="relative mx-auto max-w-7xl">
                {/* Header */}
                <motion.div
                    className="flex flex-col mb-8 md:mb-12 text-center items-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <ScrollReveal className="w-fit">
                        <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tight text-[#0B0B0B]">
                            FOLLOW ALCOVIA
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal className="w-fit">
                        <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tight text-[#0B0B0B]/50">
                            ON SOCIAL MEDIA
                        </h2>
                    </ScrollReveal>
                </motion.div>

                {/* FAN LAYOUT - Works on ALL screen sizes */}
                <div 
                    className="relative flex items-center justify-center"
                    style={{
                        // CRITICAL: Give enough height so cards don't get clipped
                        minHeight: isMobile ? '320px' : '650px',
                        paddingTop: '40px',
                        paddingBottom: '40px',
                    }}
                >
                    {socials.map((social, index) => {
                        const transform = getCardTransform(index)

                        return (
                            <motion.a
                                key={social.platform}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute cursor-pointer will-change-transform touch-manipulation"
                                
                                // Start from center, very close to final position
                                initial={{
                                    opacity: 0,
                                    x: 0,
                                    y: 20,  // Start just 20px down
                                    rotate: 0,
                                    scale: 0.95,
                                }}

                                animate={isInView ? {
                                    opacity: 1,
                                    x: transform.x,
                                    y: transform.y,
                                    rotate: transform.rotate,
                                    scale: transform.scale,
                                } : {}}

                                transition={{
                                    type: "spring",
                                    stiffness: 120,
                                    damping: 18,
                                    mass: 1.2,
                                    delay: index * 0.12,
                                }}

                                style={{ zIndex: transform.zIndex }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onTouchStart={() => setHoveredIndex(index)}
                                onTouchEnd={() => setHoveredIndex(null)}
                            >
                                <div 
                                    className="relative overflow-hidden rounded-2xl bg-[#0B0B0B] ring-1 ring-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                                    style={{
                                        width: `${cardWidth}px`,
                                        height: `${cardHeight}px`,
                                    }}
                                >
                                    <Image
                                        src={social.image}
                                        alt={social.platform}
                                        fill
                                        quality={90}
                                        sizes={isMobile ? "130px" : "320px"}
                                        className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                                        priority={index === 1}
                                    />

                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/20 to-transparent opacity-90" />

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6">
                                        <span 
                                            className="mb-1 md:mb-2 inline-block rounded-full bg-[#EABF36] px-2 md:px-3 py-0.5 md:py-1 font-bold uppercase tracking-wider text-[#0B0B0B] shadow-sm"
                                            style={{ fontSize: isMobile ? '7px' : '10px' }}
                                        >
                                            {social.platform}
                                        </span>
                                        <h3 
                                            className="font-bold text-white"
                                            style={{ fontSize: isMobile ? '13px' : '20px' }}
                                        >
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
                    className="mt-12 md:mt-16 mb-8 md:mb-12 flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <ScrollReveal className="w-fit">
                        <h3 className="text-xl md:text-3xl lg:text-4xl font-bold uppercase tracking-widest text-[#0B0B0B] text-center">
                            Follow Us Everywhere
                        </h3>
                    </ScrollReveal>
                </motion.div>

                {/* Social Text Links */}
                <motion.div
                    className="mb-12 md:mb-16 flex flex-wrap items-center justify-center gap-4 md:gap-10"
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
                            <span className="relative block text-xs md:text-base font-bold uppercase tracking-widest text-[#0B0B0B]">
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
                                {/* Hover text */}
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