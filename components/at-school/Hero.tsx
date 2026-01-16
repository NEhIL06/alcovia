"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/text-reveal";
import { ChevronDown } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden" style={{ backgroundColor: '#234944' }}>
            {/* Background Abstract Element */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="h-[60vh] w-[60vh]"
                    style={{ border: '1px solid rgba(145, 47, 60, 0.5)', borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute h-[50vh] w-[50vh]"
                    style={{ border: '1px solid rgba(234, 191, 54, 0.3)', borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
                />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="group relative cursor-default font-display text-[15vw] font-bold leading-none tracking-tighter text-transparent"
                    style={{ WebkitTextStroke: "2px #E5D1BE" }}
                >
                    AT SCHOOL
                    <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ WebkitTextStroke: "0px", color: '#EABF36' }}>
                        AT SCHOOL
                    </span>
                </motion.h1>

                <TextReveal delay={0.6} highlightColor="#EABF36">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mt-8 font-body text-sm font-bold uppercase tracking-[0.2em] md:text-base"
                        style={{ color: '#E5D1BE' }}
                    >
                        How Alcovia Helps Students Ace School
                    </motion.p>
                </TextReveal>
            </div>

            {/* Initiate Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs font-medium uppercase tracking-[0.2em]" style={{ color: '#E5D1BE', opacity: 0.6 }}>
                    Initiate Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown className="h-5 w-5" style={{ color: '#E5D1BE', opacity: 0.6 }} />
                </motion.div>
            </motion.div>
        </section>
    );
}
