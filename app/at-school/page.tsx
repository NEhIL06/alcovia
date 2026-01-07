"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Oswald } from "next/font/google"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"
import { HeroAnimationProvider } from "@/context/hero-animation-context"

const oswald = Oswald({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
})

const introText = "Alcovia program is hyperpersonalised— ensuring different outcomes for each alcovian. We work in the area that shows maximum impact. Either an area of big improvement or honing a skill that is already at a mastery level. Nobody is perfect, and we love that."

const statsCards = [
    {
        quarter: "Q1",
        highlight: ["5%"],
        title: "ACADEMIC PERFORMANCE",
        body: "Our proprietary structures enable daily rigour in terms of academic improvement, combined with inputs from academic advisors. Academic is the ground work that we begin with first. 102 meetings with academic advisors across the year help alcovians ace acads.",
    },
    {
        quarter: "Q2",
        highlight: ["MAGIC"],
        title: "WORKSHOPS",
        body: "All alcovians within the first 6 months are now moving with incrementally better confidence, showcase leadership skills, and are better at people management. Thoughts are more coherent, well structured & are now not only participating in school competitions, but are winning them too.",
    },
    {
        quarter: "Q3",
        highlight: ["NOTICE"],
        title: "THE SYSTEM TAKES NOTICE",
        body: "Teachers, counsellors & staff see the alcovians change the way they move. More competition wins, big stake competitions are coming the school's way. While scores are getting better, so are the class level inputs for any discussions being done in classes. Teachers will ask parents in PTMs on what has changed.",
    },
    {
        quarter: "Q4",
        highlight: ["TOP"],
        title: "BARE MINIMUM",
        body: "Top at class, great at extracurriculars are the bare minimum inputs from all alcovians by the end of 9 months of the program. Exam stresses are a thing of the past, alcovians move with a better sense of purpose, anxiety about the future subsides.",
    },
]

const cardVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    }),
}

interface StatsCardProps {
    quarter: string
    highlight: string[]
    title: string
    body: string
    index: number
}

function StatsCard({ quarter, highlight, title, body, index }: StatsCardProps) {
    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover="hover"
            className="group relative cursor-pointer border border-white/20 p-8 transition-colors duration-0 hover:border-[#CEFF2B] hover:bg-[#CEFF2B]"
        >
            {/* Quarter Label */}
            <span className={`${oswald.className} mb-2 inline-block text-sm font-bold uppercase tracking-widest text-[#CEFF2B]/60 transition-colors duration-0 group-hover:text-[#0C0C0C]/60`}>
                {quarter}
            </span>

            {/* Highlight Numbers */}
            <div className="mb-6 flex flex-wrap gap-4">
                {highlight.map((h, i) => (
                    <span
                        key={i}
                        className={`${oswald.className} text-6xl font-bold uppercase leading-none tracking-tight text-[#CEFF2B] transition-colors duration-0 group-hover:text-[#0C0C0C] md:text-7xl lg:text-8xl`}
                    >
                        {h}
                    </span>
                ))}
            </div>

            {/* Title */}
            <h3
                className={`${oswald.className} mb-4 text-2xl font-bold uppercase tracking-wide text-[#F7F7F3] transition-colors duration-0 group-hover:text-[#0C0C0C] md:text-3xl`}
            >
                {title}
            </h3>

            {/* Body */}
            <p className="text-base leading-relaxed text-[#F7F7F3]/70 transition-colors duration-0 group-hover:text-[#0C0C0C]/80 md:text-lg">
                {body}
            </p>

            {/* Corner Accent */}
            <div className="absolute right-4 top-4 h-3 w-3 bg-[#CEFF2B] transition-colors duration-0 group-hover:bg-[#0C0C0C]" />
        </motion.div>
    )
}

export default function AtSchoolPage() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    })

    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

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
                <motion.section
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="sticky top-0 z-0 flex h-screen items-center justify-center overflow-hidden px-4"
                >
                    <h1 className="text-center text-6xl font-black uppercase leading-[0.85] tracking-tighter text-[#F7F7F3] sm:text-7xl md:text-8xl lg:text-9xl">
                        ACADEMIC
                        <br />
                        <span className="text-[#CEFF2B]">EXCELLENCE</span>
                    </h1>
                </motion.section>

                {/* Bento Grid Section */}
                <section className="relative z-10 bg-[#0C0C0C] px-4 py-24 md:px-8 lg:px-16">
                    <div className="mx-auto max-w-6xl">
                        {/* Section Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-16 border-b border-white/10 pb-8"
                        >
                            <span className="text-sm font-bold uppercase tracking-widest text-[#CEFF2B]">
                                At School
                            </span>
                            <h2 className="mt-2 text-4xl font-black uppercase tracking-tight text-[#F7F7F3] md:text-5xl lg:text-6xl">
                                THE STATS
                            </h2>
                        </motion.div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 gap-0 border-t border-white/20 lg:grid-cols-2">
                            {statsCards.map((card, index) => (
                                <StatsCard
                                    key={card.title}
                                    quarter={card.quarter}
                                    highlight={card.highlight}
                                    title={card.title}
                                    body={card.body}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer CTA */}
                <section className="relative z-10 bg-[#0C0C0C] px-4 py-24">
                    <div className="mx-auto max-w-6xl text-center">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="mb-8 text-lg text-[#F7F7F3]/50"
                        >
                            Ready to transform your academic journey?
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
                <Footer />
            </div>
        </HeroAnimationProvider>
    )
}
