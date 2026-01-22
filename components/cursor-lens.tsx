"use client"

import * as React from "react"
import {
    motion,
    useMotionValue,
    useSpring,
    useTime,
    useTransform,
} from "framer-motion"

interface CursorLensProps {
    baseImage: string
    revealImage: string
    objectFit?: "cover" | "contain"
    backgroundColor?: string
    blobOutlineColor?: string
    parallaxStrength?: number
    showBackground?: boolean
    bgBlobCount?: number
    bgBlobSize?: number
    bgBlobComplexity?: number
    bgBlobSpeed?: number
    blobStrokeWidth?: number
    previewCursor?: boolean
    blobSize?: number
    shapeComplexity?: number
    roughness?: number
    speed?: number
    viscosity?: number
}

export default function CursorLens({
    baseImage,
    revealImage,
    objectFit = "cover",
    backgroundColor = "transparent",
    blobOutlineColor = "#1a1a1a",
    parallaxStrength = 4,
    showBackground = true,
    bgBlobCount = 12,
    bgBlobSize = 100,
    bgBlobComplexity = 80,
    bgBlobSpeed = 0.8,
    blobStrokeWidth = 1.5,
    previewCursor = false,
    blobSize = 180,
    shapeComplexity = 0.8,
    roughness = 0,
    speed = 250,
    viscosity = 1,
    showHint = true,
}: CursorLensProps & { showHint?: boolean }) {

    const [isHovering, setIsHovering] = React.useState(false)
    const [hasInteracted, setHasInteracted] = React.useState(false)
    const [isMobileDevice, setIsMobileDevice] = React.useState(false)
    const [imagesLoaded, setImagesLoaded] = React.useState(false)
    const isActive = isHovering || previewCursor

    // Preload images to prevent flicker
    React.useEffect(() => {
        const preloadImages = async () => {
            const loadImage = (src: string) => new Promise<void>((resolve) => {
                const img = new Image()
                img.onload = () => resolve()
                img.onerror = () => resolve() // Resolve even on error to not block
                img.src = src
            })
            await Promise.all([loadImage(baseImage), loadImage(revealImage)])
            setImagesLoaded(true)
        }
        preloadImages()
    }, [baseImage, revealImage])

    // Detect mobile on mount
    React.useEffect(() => {
        const checkMobile = () => setIsMobileDevice(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Reference to the container for coordinate math
    const containerRef = React.useRef<HTMLDivElement>(null)


    // --- 1. SETUP BACKGROUND BLOBS ---
    const random = (min: number, max: number) => Math.random() * (max - min) + min

    const backgroundBlobs = React.useMemo(() => {
        const count = isMobileDevice ? Math.min(bgBlobCount, 2) : bgBlobCount
        return [...Array(count)].map(() => ({
            x: [
                random(-20, 110) + "%",
                random(-20, 110) + "%",
                random(-20, 110) + "%",
            ],
            y: [
                random(-20, 110) + "%",
                random(-20, 110) + "%",
                random(-20, 110) + "%",
            ],
            sizeFactor: random(0.5, 1.5),
            duration: random(25, 50) / bgBlobSpeed,
        }))
    }, [bgBlobCount, bgBlobSpeed, isMobileDevice])

    const bgFilterId = React.useId()

    // --- 2. MOUSE & PARALLAX PHYSICS ---
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const mouseXRatio = useMotionValue(0)
    const mouseYRatio = useMotionValue(0)

    const smoothOptions = { damping: 50, stiffness: 400 }
    const smoothX = useSpring(mouseXRatio, smoothOptions)
    const smoothY = useSpring(mouseYRatio, smoothOptions)

    const baseX = useTransform(
        smoothX,
        [-1, 1],
        [parallaxStrength, -parallaxStrength]
    )
    const baseY = useTransform(
        smoothY,
        [-1, 1],
        [parallaxStrength, -parallaxStrength]
    )
    const revealX = useTransform(
        smoothX,
        [-1, 1],
        [parallaxStrength * 2.5, -parallaxStrength * 2.5]
    )
    const revealY = useTransform(
        smoothY,
        [-1, 1],
        [parallaxStrength * 2.5, -parallaxStrength * 2.5]
    )

    // --- 3. GLOBAL TRACKING LOGIC ---
    React.useEffect(() => {
        const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
            if (!containerRef.current) return

            const rect = containerRef.current.getBoundingClientRect()
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

            // Check if the mouse is physically inside this component's area
            const isInside =
                clientX >= rect.left &&
                clientX <= rect.right &&
                clientY >= rect.top &&
                clientY <= rect.bottom

            setIsHovering(isInside)

            if (isInside) {
                if (!hasInteracted) setHasInteracted(true)
                const x = clientX - rect.left
                const y = clientY - rect.top

                mouseX.set(x)
                mouseY.set(y)
                mouseXRatio.set((x / rect.width) * 2 - 1)
                mouseYRatio.set((y / rect.height) * 2 - 1)
            } else {
                mouseXRatio.set(0)
                mouseYRatio.set(0)
            }
        }

        window.addEventListener("mousemove", handleGlobalMove)
        window.addEventListener("touchstart", handleGlobalMove)
        window.addEventListener("touchmove", handleGlobalMove)

        return () => {
            window.removeEventListener("mousemove", handleGlobalMove)
            window.removeEventListener("touchstart", handleGlobalMove)
            window.removeEventListener("touchmove", handleGlobalMove)
        }
    }, [mouseX, mouseY, mouseXRatio, mouseYRatio])

    // --- 4. FLUID CURSOR PHYSICS ---
    const time = useTime()

    const createWake = (index: number) => {
        const stiffness = speed * (1 - index * 0.15)
        const damping = 20 + viscosity * index * 5
        const mass = 0.1 + index * 0.1
        return {
            x: useSpring(mouseX, { stiffness, damping, mass }),
            y: useSpring(mouseY, { stiffness, damping, mass }),
        }
    }

    const head = createWake(0)
    const body1 = createWake(1)
    const body2 = createWake(2)
    const tail = createWake(4)

    const complexityRadius = blobSize * shapeComplexity * 0.6
    const sat1X = useTransform(
        time,
        (t) => head.x.get() + Math.sin(t * 0.002) * complexityRadius
    )
    const sat1Y = useTransform(
        time,
        (t) => head.y.get() + Math.cos(t * 0.002) * complexityRadius
    )
    const sat2X = useTransform(
        time,
        (t) => head.x.get() + Math.cos(t * 0.004) * (complexityRadius * 0.8)
    )
    const sat2Y = useTransform(
        time,
        (t) => head.y.get() + Math.sin(t * 0.004) * (complexityRadius * 0.8)
    )

    const cursorFilterId = React.useId()
    const maskId = React.useId()

    return (
        <div
            ref={containerRef}
            style={{ ...containerStyle, backgroundColor: backgroundColor }}
        >
            {showBackground && (
                <>
                    <svg width="0" height="0" style={{ position: "absolute" }}>
                        <defs>
                            <filter id={bgFilterId}>
                                {!isMobileDevice && (
                                    <>
                                        <feTurbulence
                                            type="fractalNoise"
                                            baseFrequency="0.008"
                                            numOctaves="3"
                                            result="noise"
                                        />
                                        <feDisplacementMap
                                            in="SourceGraphic"
                                            in2="noise"
                                            scale={bgBlobComplexity}
                                            xChannelSelector="R"
                                            yChannelSelector="G"
                                        />
                                    </>
                                )}
                            </filter>
                        </defs>
                    </svg>

                    <svg
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            zIndex: 0,
                            overflow: "visible",
                        }}
                    >
                        <g filter={isMobileDevice ? undefined : `url(#${bgFilterId})`}>
                            {backgroundBlobs.map((blob, i) => (
                                <motion.circle
                                    key={i}
                                    initial={{ cx: blob.x[0], cy: blob.y[0] }}
                                    animate={{ cx: blob.x, cy: blob.y }}
                                    transition={{
                                        duration: blob.duration,
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        ease: "easeInOut",
                                    }}
                                    r={blob.sizeFactor * bgBlobSize}
                                    fill="none"
                                    stroke={blobOutlineColor}
                                    strokeWidth={blobStrokeWidth}
                                    strokeOpacity={0.5}
                                />
                            ))}
                        </g>
                    </svg>
                </>
            )}

            <svg width="0" height="0" style={{ position: "absolute" }}>
                <defs>
                    <filter id={cursorFilterId}>
                        {!isMobileDevice && (
                            <>
                                <feTurbulence
                                    type="fractalNoise"
                                    baseFrequency="0.015"
                                    numOctaves="2"
                                    result="noise"
                                />
                                <feDisplacementMap
                                    in="SourceGraphic"
                                    in2="noise"
                                    scale={roughness}
                                    xChannelSelector="R"
                                    yChannelSelector="G"
                                    result="distorted"
                                />
                            </>
                        )}
                        <feGaussianBlur
                            in={isMobileDevice ? "SourceGraphic" : "distorted"}
                            stdDeviation="12"
                            result="blur"
                        />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
                            result="goo"
                        />
                        <feComposite
                            in="SourceGraphic"
                            in2="goo"
                            operator="atop"
                        />
                    </filter>
                </defs>
            </svg>

            <svg
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    opacity: 0,
                }}
            >
                <defs>
                    <mask id={maskId}>
                        <g filter={`url(#${cursorFilterId})`}>
                            <motion.g
                                animate={{ opacity: isActive ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.circle
                                    cx={sat1X}
                                    cy={sat1Y}
                                    r={blobSize * 0.6}
                                    fill="white"
                                />
                                <motion.circle
                                    cx={sat2X}
                                    cy={sat2Y}
                                    r={blobSize * 0.5}
                                    fill="white"
                                />
                                <motion.circle
                                    cx={head.x}
                                    cy={head.y}
                                    r={blobSize * 0.7}
                                    fill="white"
                                />
                                <motion.circle
                                    cx={body1.x}
                                    cy={body1.y}
                                    r={blobSize * 0.6}
                                    fill="white"
                                />
                                <motion.circle
                                    cx={body2.x}
                                    cy={body2.y}
                                    r={blobSize * 0.5}
                                    fill="white"
                                />
                                <motion.circle
                                    cx={tail.x}
                                    cy={tail.y}
                                    r={blobSize * 0.3}
                                    fill="white"
                                />
                            </motion.g>
                        </g>
                    </mask>
                </defs>
            </svg>

            <div style={{ ...layerContainerStyle, zIndex: 10 }}>
                <motion.div
                    style={{
                        ...imageStyle,
                        backgroundImage: `url(${baseImage})`,
                        backgroundSize: objectFit,
                        x: baseX,
                        y: baseY,
                        scale: 1.1,
                    }}
                />
            </div>

            <motion.div
                style={{
                    ...layerContainerStyle,
                    mask: `url(#${maskId})`,
                    WebkitMask: `url(#${maskId})`,
                    zIndex: 20,
                }}
            >
                <motion.div
                    style={{
                        ...imageStyle,
                        backgroundImage: `url(${revealImage})`,
                        backgroundSize: objectFit,
                        x: revealX,
                        y: revealY,
                        scale: 1.1,
                    }}
                />
            </motion.div>

            {/* Hover Hint */}
            {showHint && (
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hasInteracted ? 0 : 0.7 }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm">
                        <svg className="w-5 h-5 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                        </svg>
                        <span className="text-white text-sm font-medium">{isMobileDevice ? "Tap to reveal" : "Hover to reveal"}</span>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
}

const layerContainerStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
}

const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    willChange: "transform",
}
