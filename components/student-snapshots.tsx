"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function StudentSnapshots() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView || !videoRef.current) return
    const video = videoRef.current
    if (video.preload !== "auto") video.preload = "auto"
    void video.play().catch(() => {})
  }, [isInView])

  return (
    <section ref={containerRef} className="relative z-10 w-full bg-[#08261e]">
      {/* Full-width Video Container */}
      <motion.div
        className="relative w-full aspect-video"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="none"
          src="/videos/download.mp4"
        />

        {/* Optional Overlay for text/branding */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      </motion.div>
    </section>
  )
}
