"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Oswald } from "next/font/google"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"
import { HeroAnimationProvider } from "@/context/hero-animation-context"


const oswald = Oswald({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
})

const quarters = [
    {
        id: "Q1",
        title: "ROADMAPS",
        content: "We are hyper-personalised. Individual roadmaps built on current likes, dislikes, and aspirations. Monthly milestones are binary: either done or not. No excuses—we are go-getters from day 1.",
    },
    {
        id: "Q2",
        title: "INDUSTRY SHAKERS",
        content: "Fortnightly LinkedIn posts, full-blown podcasts, potentially viral reels. Alcovians learn from industry leaders. Social work projects begin this quarter.",
    },
    {
        id: "Q3",
        title: "STARTUP BUILDERS",
        content: "A phonebook of mentors and fortnightly career counseling. Turbulent quarter: they build their own startups and own the goods and bads alone.",
    },
    {
        id: "Q4",
        title: "MATURITY & SCARS",
        content: "10x their imagination. Bonds that last a lifetime. Stories of success & failure. Battle scars make each Alcovian stronger.",
    },
]

interface TimelineRowProps {
    id: string
    title: string
    content: string
    index: number
}

function TimelineRow({ id, title, content, index }: TimelineRowProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group cursor-pointer border-b border-white/10 transition-colors duration-0"
        >
            <motion.div
                animate={{
                    backgroundColor: isHovered ? "#CEFF2B" : "transparent",
                    paddingTop: isHovered ? 48 : 24,
                    paddingBottom: isHovered ? 48 : 24,
                }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 gap-4 px-4 md:grid-cols-12 md:gap-8 md:px-8"
            >
                {/* Quarter ID */}
                <div className="flex items-center gap-4 md:col-span-2">
                    {/* Arrow Icon */}
                    <motion.div
                        animate={{ x: isHovered ? 0 : -20, opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={isHovered ? "#0C0C0C" : "#F7F7F3"}
                            strokeWidth="2"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </motion.div>

                    <span
                        className={`${oswald.className} text-4xl font-bold uppercase tracking-tight transition-colors duration-0 md:text-5xl lg:text-6xl ${isHovered ? "text-[#0C0C0C]" : "text-[#F7F7F3]"
                            }`}
                    >
                        {id}
                    </span>
                </div>

                {/* Title */}
                <div className="flex items-center md:col-span-4">
                    <h3
                        className={`${oswald.className} text-2xl font-bold uppercase tracking-wide transition-colors duration-0 md:text-3xl lg:text-4xl ${isHovered ? "text-[#0C0C0C]" : "text-[#CEFF2B]"
                            }`}
                    >
                        {title}
                    </h3>
                </div>

                {/* Content */}
                <div className="md:col-span-6">
                    <p
                        className={`text-base leading-relaxed transition-colors duration-0 md:text-lg ${isHovered ? "text-[#0C0C0C]/80" : "text-[#F7F7F3]/70"
                            }`}
                    >
                        {content}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function OutsideSchoolPage() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    return (
        <HeroAnimationProvider>
            <CustomCursor />
            <div ref={containerRef} className={`min-h-screen bg-[#0C0C0C] ${oswald.className}`}>
                {/* Back Button */}
                <Link
                    href="/"
                    className="fixed left-8 top-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F7F3] text-[#0C0C0C] transition-transform hover:scale-110 active:scale-95"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </Link>

                {/* Hero Section */}
                <section className="flex min-h-[60vh] items-center justify-center px-4 pt-24">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-[#CEFF2B]">
                            The Journey
                        </span>
                        <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tighter text-[#F7F7F3] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                            OUTSIDE
                            <br />
                            <span className="text-[#CEFF2B]">SCHOOL</span>
                        </h1>
                    </motion.div>
                </section>

                {/* Timeline Section */}
                <section className="px-0 py-16 md:py-24">
                    <div className="mx-auto max-w-7xl">
                        {/* Section Header */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="mb-8 border-b border-white/10 px-4 pb-4 md:px-8"
                        >
                            <h2 className="text-lg font-bold uppercase tracking-widest text-[#F7F7F3]/50">
                                One Year. Four Quarters. Total Transformation.
                            </h2>
                        </motion.div>

                        {/* Timeline Rows */}
                        <div className="border-t border-white/10">
                            {quarters.map((quarter, index) => (
                                <TimelineRow
                                    key={quarter.id}
                                    id={quarter.id}
                                    title={quarter.title}
                                    content={quarter.content}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer CTA */}
                <section className="px-4 py-24">
                    <div className="mx-auto max-w-6xl text-center">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="mb-8 text-lg text-[#F7F7F3]/50"
                        >
                            Ready to start your transformation?
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                href="/contact"
                                className="inline-block bg-[#CEFF2B] px-12 py-4 text-lg font-bold uppercase tracking-wider text-[#0C0C0C] transition-transform hover:scale-105 active:scale-95"
                            >
                                Apply Now
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* Progress Bar */}
                <div className="fixed bottom-0 left-0 right-0 z-50 h-1 bg-white/10">
                    <motion.div
                        style={{ width: progressWidth }}
                        className="h-full bg-[#CEFF2B]"
                    />
                </div>
                <Footer />
            </div>
        </HeroAnimationProvider>
    )
}
