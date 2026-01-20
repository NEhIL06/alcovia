"use client"

import { useEffect, useRef } from "react"

interface TrailPoint {
    x: number
    y: number
    age: number
    force: number
}

interface UseCanvasLiquidRevealOptions {
    canvasRef: React.RefObject<HTMLCanvasElement | null>
    revealImageRef: React.MutableRefObject<HTMLImageElement | null>
    baseImageDimsRef: React.MutableRefObject<{ width: number; height: number } | null>
    trailRef: React.MutableRefObject<TrailPoint[]>
}

export function useCanvasLiquidReveal({
    canvasRef,
    revealImageRef,
    baseImageDimsRef,
    trailRef,
}: UseCanvasLiquidRevealOptions) {
    const rafRef = useRef<number | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d", { willReadFrequently: true })
        if (!ctx) return

        const render = () => {
            // 1. Clear & Decay
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Decay existing points - slower for more viscosity
            trailRef.current.forEach((p) => { p.age -= 0.015 })
            trailRef.current = trailRef.current.filter((p) => p.age > 0)

            // 2. Draw Liquid Mask (White)
            if (trailRef.current.length > 0) {
                ctx.lineCap = "round"
                ctx.lineJoin = "round"
                // Key for Liquid Effect: Soft shadows merge overlapping strokes
                ctx.shadowBlur = 30
                ctx.shadowColor = "white"

                trailRef.current.forEach((p, i) => {
                    ctx.beginPath()
                    const prev = trailRef.current[i - 1] || p
                    ctx.moveTo(prev.x, prev.y)
                    ctx.lineTo(p.x, p.y)

                    // Width decays with age for trail shrinking
                    ctx.lineWidth = 180 * p.age
                    ctx.strokeStyle = `rgba(255, 255, 255, ${p.age})`
                    ctx.stroke()
                })

                // Reset shadow for image drawing
                ctx.shadowBlur = 0
            }

            // 3. Composite Reveal Image with Parallax
            if (revealImageRef.current && trailRef.current.length > 0) {
                ctx.globalCompositeOperation = "source-in"

                const img = revealImageRef.current
                const imgAspect = baseImageDimsRef.current
                    ? baseImageDimsRef.current.width / baseImageDimsRef.current.height
                    : img.width / img.height
                const canvasAspect = canvas.width / canvas.height
                let drawW, drawH, offX, offY

                if (canvasAspect > imgAspect) {
                    drawH = canvas.height
                    drawW = canvas.height * imgAspect
                    offX = (canvas.width - drawW) / 2
                    offY = 0
                } else {
                    drawW = canvas.width
                    drawH = canvas.width / imgAspect
                    offX = 0
                    offY = canvas.height - drawH
                }

                // --- PARALLAX REMOVED ---
                // Image stays static relative to the container
                ctx.drawImage(img, offX, offY, drawW, drawH)
                ctx.globalCompositeOperation = "source-over"
            }

            rafRef.current = requestAnimationFrame(render)
        }

        render()
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
    }, [canvasRef, revealImageRef, baseImageDimsRef, trailRef])
}
