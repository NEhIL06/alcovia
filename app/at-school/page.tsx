"use client"


import MicroInteractions from "@/components/micro-interactions"
import Hero from "@/components/at-school/Hero"
import Philosophy from "@/components/at-school/Philosophy"
import HorizontalScroll from "@/components/at-school/HorizontalScroll"
import TimelineGraph from "@/components/at-school/TimelineGraph"
import CTA from "@/components/at-school/CTA"
import Footer from "@/components/footer"

export default function AtSchoolPage() {
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
