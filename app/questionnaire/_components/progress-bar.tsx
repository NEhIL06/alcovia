"use client"

import { motion } from "framer-motion"

type ProgressBarProps = {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = Math.max(0, Math.min(100, (current / total) * 100))

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-gray-200">
      <motion.div
        className="h-full bg-[#1a1a2e]"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      />
    </div>
  )
}
