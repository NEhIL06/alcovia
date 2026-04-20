"use client"

import dynamic from "next/dynamic"

const TakeawaysSection = dynamic(
  () => import("@/components/cult-strategy/takeaways-section"),
  { ssr: false }
)
const AuthoritySection = dynamic(
  () => import("@/components/cult-strategy/authority-section"),
  { ssr: false }
)
const FaqSection = dynamic(
  () => import("@/components/cult-strategy/faq-section"),
  { ssr: false }
)

export function DesktopTakeawaysAuthority() {
  return (
    <div className="hidden md:block">
      <TakeawaysSection />
      <AuthoritySection />
    </div>
  )
}

export function DesktopFaq() {
  return (
    <div className="hidden md:block">
      <FaqSection />
    </div>
  )
}
