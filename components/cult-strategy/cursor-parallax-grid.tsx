"use client";

import { useEffect, useRef } from "react";

const ACCENT = "#22C55E";

interface CursorParallaxGridProps {
    cols?: number;
    rows?: number;
    depth?: number;
    opacity?: number;
    spotlight?: boolean;
}

export default function CursorParallaxGrid({
    cols = 28,
    rows = 18,
    depth = 18,
    opacity = 0.14,
    spotlight = true,
}: CursorParallaxGridProps) {
    const gridRef = useRef<HTMLDivElement>(null);
    const spotRef = useRef<HTMLDivElement>(null);
    const frame = useRef(0);
    const target = useRef({ x: 0.5, y: 0.5 });
    const current = useRef({ x: 0.5, y: 0.5 });

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const tick = () => {
            current.current.x += (target.current.x - current.current.x) * 0.08;
            current.current.y += (target.current.y - current.current.y) * 0.08;

            const tx = (current.current.x - 0.5) * 2 * depth;
            const ty = (current.current.y - 0.5) * 2 * depth;

            if (gridRef.current) {
                gridRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
            }
            if (spotRef.current) {
                const sx = 20 + current.current.x * 60;
                const sy = 20 + current.current.y * 60;
                spotRef.current.style.background = `radial-gradient(ellipse 30% 25% at ${sx}% ${sy}%, rgba(34,197,94,0.06) 0%, transparent 70%)`;
            }
            frame.current = requestAnimationFrame(tick);
        };

        const onMove = (e: MouseEvent) => {
            target.current.x = e.clientX / window.innerWidth;
            target.current.y = e.clientY / window.innerHeight;
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        frame.current = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(frame.current);
        };
    }, [depth]);

    const colW = 100 / cols;
    const rowH = 100 / rows;

    return (
        <div
            className="absolute inset-0 overflow-hidden pointer-events-none select-none"
            aria-hidden="true"
        >
            <div
                ref={gridRef}
                className="absolute inset-[-5%] w-[110%] h-[110%] will-change-transform"
            >
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
            </div>

            {spotlight && (
                <div
                    ref={spotRef}
                    className="absolute inset-0"
                    style={{
                        background: `radial-gradient(ellipse 30% 25% at 50% 50%, rgba(34,197,94,0.06) 0%, transparent 70%)`,
                    }}
                />
            )}
        </div>
    );
}
