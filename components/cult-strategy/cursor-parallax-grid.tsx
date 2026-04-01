"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const ACCENT = "#FF6B2B";

interface CursorParallaxGridProps {
    /** How many columns the grid has (default 28) */
    cols?: number;
    /** How many rows the grid has (default 18) */
    rows?: number;
    /** Max pixel offset the grid can move on each axis (default 18) */
    depth?: number;
    /** Overall opacity of the grid lines (default 0.14) */
    opacity?: number;
    /** Show a soft parallaxing radial spotlight following the cursor */
    spotlight?: boolean;
}

/**
 * A full-cover decorative grid that softly follows the cursor position,
 * giving sections a live, spatial feel without hurting performance.
 *
 * Drop it as the first child inside the `<section>` absolute bg layer.
 * It is pointer-events-none, purely decorative.
 */
export default function CursorParallaxGrid({
    cols = 28,
    rows = 18,
    depth = 18,
    opacity = 0.14,
    spotlight = true,
}: CursorParallaxGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Raw mouse position as 0→1 fractions
    const rawX = useMotionValue(0.5);
    const rawY = useMotionValue(0.5);

    // Springy smoothed values
    const springConfig = { stiffness: 60, damping: 22, mass: 1 };
    const smoothX = useSpring(rawX, springConfig);
    const smoothY = useSpring(rawY, springConfig);

    // Map 0→1 to -depth→+depth for translation
    const translateX = useTransform(smoothX, [0, 1], [-depth, depth]);
    const translateY = useTransform(smoothY, [0, 1], [-depth, depth]);

    // Spotlight position (percentage strings)
    const spotX = useTransform(smoothX, [0, 1], ["20%", "80%"]);
    const spotY = useTransform(smoothY, [0, 1], ["20%", "80%"]);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            rawX.set(e.clientX / window.innerWidth);
            rawY.set(e.clientY / window.innerHeight);
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
    }, [rawX, rawY]);

    const colW = 100 / cols;
    const rowH = 100 / rows;

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none select-none"
            aria-hidden="true"
        >
            {/* The grid — translates with cursor */}
            <motion.div
                className="absolute inset-[-5%] w-[110%] h-[110%]"
                style={{ x: translateX, y: translateY }}
            >
                {/* Vertical lines */}
                {Array.from({ length: cols + 1 }).map((_, i) => (
                    <div
                        key={`v${i}`}
                        className="absolute top-0 bottom-0"
                        style={{
                            left: `${i * colW}%`,
                            width: "1px",
                            background: `linear-gradient(180deg, transparent 0%, ${ACCENT} 50%, transparent 100%)`,
                            opacity: opacity * 3,
                        }}
                    />
                ))}

                {/* Horizontal lines */}
                {Array.from({ length: rows + 1 }).map((_, i) => (
                    <div
                        key={`h${i}`}
                        className="absolute left-0 right-0"
                        style={{
                            top: `${i * rowH}%`,
                            height: "1px",
                            background: `linear-gradient(90deg, transparent 0%, ${ACCENT} 50%, transparent 100%)`,
                            opacity: opacity * 3,
                        }}
                    />
                ))}

                {/* Intersection dots — sparse, accent-coloured */}
                {Array.from({ length: cols + 1 }).map((_, ci) =>
                    Array.from({ length: rows + 1 })
                        .filter((_, ri) => (ci + ri) % 5 === 0)
                        .map((_, ri) => (
                            <div
                                key={`d${ci}-${ri}`}
                                className="absolute w-[3px] h-[3px] rounded-full"
                                style={{
                                    left: `calc(${ci * colW}% - 1.5px)`,
                                    top: `calc(${(ri * 5) * rowH}% - 1.5px)`,
                                    background: ACCENT,
                                    opacity: opacity * 8,
                                }}
                            />
                        ))
                )}
            </motion.div>

            {/* Cursor spotlight */}
            {spotlight && (
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: `radial-gradient(ellipse 30% 25% at ${spotX} ${spotY}, rgba(255,107,43,0.06) 0%, transparent 70%)`,
                    }}
                />
            )}
        </div>
    );
}
