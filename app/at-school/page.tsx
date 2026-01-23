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
    // Kill all ScrollTriggers and force scroll to top BEFORE paint
    useLayoutEffect(() => {
        // Kill all existing ScrollTriggers from previous page
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        ScrollTrigger.clearScrollMemory()

        // Force scroll to top - multiple methods for reliability
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0

        // Also reset after a tick to handle any async scroll restoration
        requestAnimationFrame(() => {
            window.scrollTo(0, 0)
        })
    }, [])

    // Refresh ScrollTrigger after hydration with longer delay
    useEffect(() => {
        const timer = setTimeout(() => {
            ScrollTrigger.refresh(true)
        }, 300)

        // Also refresh when all images are loaded
        const handleLoad = () => {
            ScrollTrigger.refresh(true)
        }
        window.addEventListener('load', handleLoad)

        return () => {
            clearTimeout(timer)
            window.removeEventListener('load', handleLoad)
        }
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
