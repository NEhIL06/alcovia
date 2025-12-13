"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const socials = [
  {
    platform: "Instagram",
    handle: "@alcovia.in",
    followers: "639",
    image: "/images/insta.jpg",
    url: "https://instagram.com/alcovia.in",
  },
  {
    platform: "LinkedIn",
    handle: "Alcovia",
    followers: "1,190",
    image: "/images/linkedin.jpg",
    url: "https://linkedin.com/company/alcovia",
  },
  {
    platform: "YouTube",
    handle: "Alcovia",
    followers: "100",
    image: "/images/youtube.jpg",
    url: "https://youtube.com/@alcovia",
  }
]

export default function SocialFan() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-50px" })
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const getRotation = (index: number) => {
    const center = (socials.length - 1) / 2
    const offset = index - center
    // Increased rotation for wider spread (25° per position)
    return offset * 25
  }

  const getScale = (index: number) => {
    const center = Math.floor(socials.length / 2)
    const distance = Math.abs(index - center)
    // More consistent sizing
    if (distance === 0) return 1.1
    if (distance === 1) return 0.95
    return 0.85
  }

  const getZIndex = (index: number) => {
    const center = Math.floor(socials.length / 2)
    return socials.length - Math.abs(index - center)
  }

  const getXOffset = (index: number) => {
    const center = (socials.length - 1) / 2
    // Much wider horizontal spread (160px per card position)
    return (index - center) * 160
  }

  // Increased Y offset to create deeper arc effect
  const getYOffset = (index: number) => {
    const center = Math.floor(socials.length / 2)
    const distance = Math.abs(index - center)
    // Exponential curve for more pronounced arc
    return Math.pow(distance, 1.8) * 45
  }

  // Calculate rotation and offset when hovering - like holding a deck of cards
  const getCardDeckEffect = (currentIndex: number, hoveredIdx: number | null) => {
    if (hoveredIdx === null) return { x: 0, y: 0, rotate: 0, scale: 1 }
    
    if (hoveredIdx === currentIndex) {
      // Hovered card: lift up significantly and rotate to face forward
      return { x: 0, y: -50, rotate: 0, scale: 1.08 }
    }
    
    const distance = currentIndex - hoveredIdx
    const absDistance = Math.abs(distance)
    
    // Cards on the left of hovered card - spread out more dramatically
    if (distance < 0) {
      return {
        x: distance * -80, // Spread much further left
        y: absDistance * 25, // Sink down more
        rotate: distance * -8, // More dramatic rotation
        scale: 0.92 // Slightly smaller
      }
    } 
    // Cards on the right of hovered card - spread out more dramatically
    else {
      return {
        x: distance * 80, // Spread much further right
        y: absDistance * 25, // Sink down more
        rotate: distance * 8, // More dramatic rotation
        scale: 0.92 // Slightly smaller
      }
    }
  }

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-[#F5F5EF] px-6 py-24 md:px-12">
      {/* Animated background with floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient blobs - enhanced */}
        <motion.div
          className="absolute -left-48 top-1/3 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#CEFF2B]/8 to-transparent blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-48 bottom-1/3 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-[#CEFF2B]/6 to-transparent blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Additional morphing blobs */}
        <motion.div
          className="absolute left-[30%] top-[10%] h-[300px] w-[300px] rounded-full bg-gradient-to-br from-[#CEFF2B]/5 to-transparent blur-2xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute right-[25%] bottom-[15%] h-[350px] w-[350px] rounded-full bg-gradient-to-tl from-[#0B0B0B]/3 to-transparent blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -35, 0],
            scale: [1, 1.25, 1],
            rotate: [0, -120, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        {/* Floating circular elements - left side - enhanced */}
        <motion.div
          className="absolute left-[5%] top-[20%] h-24 w-24 rounded-full border-2 border-[#CEFF2B]/20"
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute left-[8%] bottom-[25%] h-16 w-16 rounded-full bg-[#CEFF2B]/10"
          animate={{
            y: [0, 40, 0],
            x: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        <motion.div
          className="absolute left-[12%] top-[60%] h-12 w-12 rounded-full border-2 border-dashed border-[#0B0B0B]/10"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            borderRadius: ["50%", "40%", "50%"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute left-[15%] top-[40%] h-8 w-8 rounded-full bg-[#CEFF2B]/15"
          animate={{
            y: [0, -15, 0],
            x: [0, 25, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Floating circular elements - right side - enhanced */}
        <motion.div
          className="absolute right-[8%] top-[30%] h-20 w-20 rounded-full border-2 border-[#CEFF2B]/15"
          animate={{
            y: [0, 35, 0],
            x: [0, -18, 0],
            rotate: [360, 180, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute right-[5%] bottom-[35%] h-14 w-14 rounded-full bg-[#0B0B0B]/5"
          animate={{
            y: [0, -25, 0],
            x: [0, 12, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute right-[10%] top-[65%] h-10 w-10 rounded-full border border-[#CEFF2B]/20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, -360],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 1 }}
        />
        <motion.div
          className="absolute right-[3%] top-[50%] h-6 w-6 rounded-full bg-[#CEFF2B]/12"
          animate={{
            y: [0, 30, 0],
            x: [0, -15, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />

        {/* Animated connecting lines */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.06]" preserveAspectRatio="none">
          {[...Array(6)].map((_, i) => (
            <motion.line
              key={`line-${i}`}
              x1={`${10 + i * 15}%`}
              y1="20%"
              x2={`${20 + i * 15}%`}
              y2="80%"
              stroke="#CEFF2B"
              strokeWidth="1"
              strokeDasharray="5,10"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: [0, 1, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 1.2
              }}
            />
          ))}
        </svg>

        {/* Smooth wavy lines */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.04]" preserveAspectRatio="none">
          {[...Array(12)].map((_, i) => (
            <motion.path
              key={i}
              d={`M0,${35 + i * 5} Q50,${30 + i * 5 + Math.sin(i) * 8} 100,${35 + i * 5}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-[#0B0B0B]"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 2, ease: "easeInOut" }}
            />
          ))}
        </svg>

        {/* Subtle animated dots */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute h-2 w-2 rounded-full bg-[#CEFF2B]/30"
            style={{
              left: `${15 + (i % 4) * 20}%`,
              top: `${20 + Math.floor(i / 4) * 40}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Title */}
        <motion.div 
          className="mb-16 text-center md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-black uppercase tracking-tight text-[#0B0B0B] md:text-6xl lg:text-8xl">
            VIEW US
          </h2>
          <h2 className="text-5xl font-black uppercase tracking-tight text-[#0B0B0B]/50 md:text-6xl lg:text-8xl">
            ON SOCIALS
          </h2>
        </motion.div>

        {/* Fan of cards with increased spread and arc */}
        <div className="relative flex h-auto flex-col items-center gap-6 md:h-[750px] lg:h-[850px] lg:flex-row lg:justify-center">
          {socials.map((social, index) => {
            const deckEffect = getCardDeckEffect(index, hoveredIndex)
            
            return (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full cursor-pointer md:absolute md:w-auto"
                initial={{
                  opacity: 0,
                  y: 150,
                  x: -200,
                  rotate: -40,
                  scale: 0.7,
                }}
                animate={
                  isInView
                    ? {
                      opacity: 1,
                      y: isMobile ? 0 : getYOffset(index) + deckEffect.y,
                      x: isMobile ? 0 : getXOffset(index) + deckEffect.x,
                      rotate: isMobile ? (index % 2 === 0 ? -3 : 3) : getRotation(index) + deckEffect.rotate,
                      scale: isMobile ? 1 : getScale(index) * deckEffect.scale,
                    }
                    : {}
                }
                transition={{
                  delay: hoveredIndex !== null ? 0 : index * 0.08,
                  duration: hoveredIndex !== null ? 0.5 : 1,
                  type: "spring",
                  stiffness: hoveredIndex !== null ? 200 : 80,
                  damping: hoveredIndex !== null ? 20 : 16,
                }}
                style={{
                  transformOrigin: "bottom center",
                  zIndex: isMobile ? index : hoveredIndex === index ? 100 : getZIndex(index),
                }}
                onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                onMouseLeave={() => !isMobile && setHoveredIndex(null)}
              >
                <div className="relative mx-auto h-80 w-[280px] overflow-hidden rounded-3xl shadow-2xl transition-shadow duration-300 hover:shadow-[0_35px_70px_rgba(0,0,0,0.35)] md:h-[450px] md:w-[280px] lg:h-[520px] lg:w-[320px]">
                  <Image
                    src={social.image || "/placeholder.svg"}
                    alt={`${social.platform} - ${social.handle}`}
                    fill
                    className="object-cover"
                    style={{ filter: "contrast(1.05) saturate(0.9)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/90 via-[#0B0B0B]/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <span className="mb-2 inline-block rounded-full bg-[#CEFF2B] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#0B0B0B] md:px-4 md:text-sm">
                      {social.platform}
                    </span>
                    <h3 className="text-lg font-bold text-white md:text-xl">{social.handle}</h3>
                    {social.followers && (
                      <p className="text-sm text-white/70 md:text-base">{social.followers} followers</p>
                    )}
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>

        <motion.div
          className="mt-8 flex justify-center md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <motion.button
            className="rounded-full bg-[#0B0B0B] px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#0B0B0B]/90 md:text-base"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Follow Us Everywhere
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}