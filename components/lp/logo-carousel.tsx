"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"

const EXPERIENCE_LOGOS = [
  { name: "Flipkart", src: "/images/logos/flipkart.png" },
  { name: "Panasonic", src: "/images/logos/panasonic.png" },
  { name: "Noise", src: "/images/logos/noise.png" },
  { name: "Nothing", src: "/images/logos/nothing.png" },
  { name: "Masters Union", src: "/images/logos/master-union.png" },
  { name: "Bain", src: "/images/logos/bain.png" },
  { name: "McKinsey", src: "/images/logos/mckinsey.png" },
  { name: "Vasant Valley", src: "/images/logos/vasant-valley.png" },
]

export function LogoCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollPosRef = useRef(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    let raf: number
    const animate = () => {
      if (!isPaused && container) {
        const oneThird = container.scrollWidth / 3
        if (scrollPosRef.current === 0) { scrollPosRef.current = oneThird; container.scrollLeft = oneThird }
        scrollPosRef.current += 0.8
        if (scrollPosRef.current >= oneThird * 2) { scrollPosRef.current = oneThird; container.scrollLeft = oneThird }
        else { container.scrollLeft = scrollPosRef.current }
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [isPaused])

  return (
    <div className="lp-fade-in">
      <p className="text-center font-mono text-xs uppercase tracking-widest text-white/20 mb-8">Experienced Folks Who Have Worked In</p>
      <div className="relative w-full overflow-hidden">
        <div ref={scrollRef} className="flex gap-4 md:gap-6 items-center overflow-hidden px-4" style={{ msOverflowStyle: "none", scrollbarWidth: "none" }} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onTouchStart={() => setIsPaused(true)} onTouchEnd={() => setIsPaused(false)}>
          {[...EXPERIENCE_LOGOS, ...EXPERIENCE_LOGOS, ...EXPERIENCE_LOGOS].map((logo, i) => (
            <div key={i} className="flex-shrink-0 opacity-50 hover:opacity-80 transition-opacity duration-300">
              <Image src={logo.src} alt={logo.name} width={200} height={100} className="h-8 sm:h-10 md:h-14 w-auto object-contain min-w-[60px] sm:min-w-[80px] brightness-0 invert" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
