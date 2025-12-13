import type { Metadata } from "next"
import CustomCursor from "@/components/custom-cursor"
import MeetTheTeamGrid from "@/components/meet-the-team-grid"
import Footer from "@/components/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Meet The Team | ALCOVIA",
  description:
    "Meet the passionate mentors and leaders at Alcovia dedicated to helping the top 1% achieve their dreams.",
  openGraph: {
    title: "Meet The Team | ALCOVIA",
    description: "Meet our passionate mentors and leaders - The launchpad for the top 1%",
  },
}

export default function MeetTheTeamPage() {
  return (
    <>
      <CustomCursor />
      <main className="bg-[#F5F5EF]">
        {/* Floating navbar with light glassmorphism */}
        <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-[#F5F5EF]/90 backdrop-blur-md border-b border-[#0B0B0B]/5" />

          <Link
            href="/"
            className="relative text-2xl font-black uppercase tracking-tight text-[#0B0B0B] transition-colors hover:text-[#CCFF00]"
            style={{ WebkitTextStroke: "0.5px #0B0B0B" }}
          >
            ALCOVIA
          </Link>

          <Link
            href="/"
            className="group relative flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#0B0B0B]/70 transition-colors hover:text-[#0B0B0B]"
          >
            <svg
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back Home
          </Link>
        </nav>

        <div className="pt-0">
          <MeetTheTeamGrid />
        </div>

        <Footer />
      </main>
    </>
  )
}
