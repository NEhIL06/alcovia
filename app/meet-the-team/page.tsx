import type { Metadata } from "next"
import MeetTheTeamGrid from "@/components/meet-the-team-grid"
import Footer from "@/components/footer"

export const metadata: Metadata = {
    title: "The 1% Team",
    description:
        "Meet the passionate team and leaders at Alcovia dedicated to helping the top 1% achieve their dreams.",
    openGraph: {
        title: "The 1% Team",
        description: "Meet our passionate team and leaders - The launchpad for the top 1%",
    },
}

export default function MeetTheTeamPage() {
    return (
        <div className="bg-black min-h-screen selection:bg-[#CCFF00] selection:text-black">
            <main>
                <MeetTheTeamGrid />
                <Footer />
            </main>
        </div>
    )
}
