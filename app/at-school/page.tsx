"use client"

import { useEffect, useLayoutEffect } from "react"
import MicroInteractions from "@/components/micro-interactions"
import Hero from "@/components/at-school/Hero"
import Philosophy from "@/components/at-school/Philosophy"
import HorizontalScroll from "@/components/at-school/HorizontalScroll"
import TimelineGraph from "@/components/at-school/TimelineGraph"
import CTA from "@/components/at-school/CTA"
import Footer from "@/components/footer"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import gsap from "gsap"

gsap.registerPlugin(ScrollTrigger)

export default function AtSchoolPage() {
    // Force scroll to top on mount - fixes navigation scroll issues
    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // Refresh ScrollTrigger after hydration to fix horizontal scroll skipping
    useEffect(() => {
        const timer = setTimeout(() => {
            ScrollTrigger.refresh()
        }, 100)
        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            <MicroInteractions>
                <main className="min-h-screen" style={{ backgroundColor: '#234944' }}>
                    <Hero />
                    <Philosophy />
                    <HorizontalScroll />
                    <TimelineGraph />
                    <CTA />
                    <Footer />
                </main>
            </MicroInteractions>
        </>
    )
}
