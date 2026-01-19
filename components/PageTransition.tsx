"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, useLayoutEffect } from "react";

const StarTransition = ({ isExiting }: { isExiting: boolean }) => {
    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Yellow Background */}
            <div className="absolute inset-0 bg-[#EABF36]" />

            {/* 3-pointed Star (Triangle Star) SVG that scales */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0, rotate: 0 }}
                animate={{
                    scale: isExiting ? 0 : 20,
                    rotate: isExiting ? -180 : 0
                }}
                transition={{
                    duration: 0.9,
                    ease: [0.87, 0, 0.13, 1]
                }}
            >
                
            </motion.div>

            {/* Logo in center */}
            <motion.div
                className="relative z-10"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    delay: 0.15,
                    duration: 0.5,
                    ease: [0.34, 1.56, 0.64, 1]
                }}
            >
                <Image
                    src="/images/alcovia-logo.png"
                    alt="alcovia-logo"
                    width={380}
                    height={240}
                    priority
                />
            </motion.div>
        </motion.div>
    );
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [phase, setPhase] = useState<"idle" | "covering" | "revealing">("idle");
    const [frozenChildren, setFrozenChildren] = useState<React.ReactNode>(children);
    const isFirstMount = useRef(true);
    const previousPathname = useRef(pathname);

    useLayoutEffect(() => {
        // Skip on first mount
        if (isFirstMount.current) {
            isFirstMount.current = false;
            previousPathname.current = pathname;
            return;
        }

        // Only trigger if pathname actually changed
        if (previousPathname.current === pathname) {
            return;
        }

        previousPathname.current = pathname;

        // Phase 1: Cover current page with star expanding from center
        setPhase("covering");

        // Phase 2: After star covers screen, swap children and start revealing
        const coverTimer = setTimeout(() => {
            setFrozenChildren(children);
            setPhase("revealing");
        }, 1000);

        // Phase 3: After star shrinks back (reveal), go idle
        const revealTimer = setTimeout(() => {
            setPhase("idle");
        }, 1600);

        return () => {
            clearTimeout(coverTimer);
            clearTimeout(revealTimer);
        };
    }, [pathname, children]);

    // Keep children in sync when idle
    useEffect(() => {
        if (phase === "idle") {
            setFrozenChildren(children);
        }
    }, [children, phase]);

    return (
        <>
            {/* The Star Overlay */}
            <AnimatePresence>
                {phase !== "idle" && (
                    <StarTransition
                        key="transition-overlay"
                        isExiting={phase === "revealing"}
                    />
                )}
            </AnimatePresence>

            {/* The Content */}
            <div>
                {frozenChildren}
            </div>
        </>
    );
}