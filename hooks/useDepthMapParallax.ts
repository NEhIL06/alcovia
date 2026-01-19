"use client"

import { useEffect, useRef, useCallback } from "react"

interface UseDepthMapParallaxOptions {
    containerRef: React.RefObject<HTMLDivElement | null>
    imageRef: React.RefObject<HTMLDivElement | null>
    depthMapUrl: string
    intensity?: number // How strong the parallax effect is (default: 20)
    enabled?: boolean
}

export function useDepthMapParallax({
    containerRef,
    imageRef,
    depthMapUrl,
    intensity = 20,
    enabled = true,
}: UseDepthMapParallaxOptions) {
    const depthMapRef = useRef<HTMLImageElement | null>(null)
    const depthDataRef = useRef<ImageData | null>(null)
    const mouseRef = useRef({ x: 0.5, y: 0.5 }) // Normalized 0-1
    const rafRef = useRef<number | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    // Load depth map and extract pixel data
    useEffect(() => {
        if (!enabled) return

        const img = new window.Image()
        img.crossOrigin = "anonymous"
        img.src = depthMapUrl

        img.onload = () => {
            depthMapRef.current = img

            // Create offscreen canvas to extract depth data
            const canvas = document.createElement("canvas")
            canvas.width = img.width
            canvas.height = img.height
            canvasRef.current = canvas

            const ctx = canvas.getContext("2d", { willReadFrequently: true })
            if (ctx) {
                ctx.drawImage(img, 0, 0)
                depthDataRef.current = ctx.getImageData(0, 0, img.width, img.height)
            }
        }
    }, [depthMapUrl, enabled])

    // Get depth value at normalized coordinates (0-1)
    const getDepthAt = useCallback((nx: number, ny: number): number => {
        if (!depthDataRef.current || !depthMapRef.current) return 0.5

        const x = Math.floor(nx * (depthMapRef.current.width - 1))
        const y = Math.floor(ny * (depthMapRef.current.height - 1))
        const idx = (y * depthMapRef.current.width + x) * 4

        // Get grayscale value (R channel since it's grayscale)
        const depth = depthDataRef.current.data[idx] / 255
        return depth
    }, [])

    // Apply parallax transform based on mouse position and depth
    const applyParallax = useCallback(() => {
        if (!imageRef.current || !enabled) return

        const { x, y } = mouseRef.current

        // Calculate offset from center (-0.5 to 0.5)
        const offsetX = x - 0.5
        const offsetY = y - 0.5

        // Get depth at current mouse position
        const depth = getDepthAt(x, y)

        // Lighter areas (closer to 1) should have more movement
        // Darker areas (closer to 0) should have less movement
        const depthMultiplier = depth

        // Calculate final parallax offset
        const parallaxX = offsetX * intensity * depthMultiplier
        const parallaxY = offsetY * intensity * depthMultiplier

        // Apply transform with smooth transition
        imageRef.current.style.transform = `translate3d(${parallaxX}px, ${parallaxY}px, 0) scale(1.02)`
        imageRef.current.style.transition = "transform 0.15s ease-out"
    }, [imageRef, intensity, getDepthAt, enabled])

    // Mouse move handler
    useEffect(() => {
        if (!containerRef.current || !enabled) return

        const container = containerRef.current

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect()

            // Normalize mouse position to 0-1
            mouseRef.current = {
                x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
                y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)),
            }

            // Use requestAnimationFrame for smooth animation
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            rafRef.current = requestAnimationFrame(applyParallax)
        }

        const handleMouseLeave = () => {
            // Reset to center
            mouseRef.current = { x: 0.5, y: 0.5 }
            if (imageRef.current) {
                imageRef.current.style.transform = "translate3d(0, 0, 0) scale(1)"
                imageRef.current.style.transition = "transform 0.4s ease-out"
            }
        }

        container.addEventListener("mousemove", handleMouseMove)
        container.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            container.removeEventListener("mousemove", handleMouseMove)
            container.removeEventListener("mouseleave", handleMouseLeave)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [containerRef, imageRef, applyParallax, enabled])

    return { getDepthAt }
}
