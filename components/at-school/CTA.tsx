"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/text-reveal";

export default function CTA() {
    return (
        <section
            className="relative flex h-screen flex-col items-center justify-center px-6 text-center overflow-hidden"
            style={{ backgroundColor: '#1d3a36ff' }}
        >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-[#EABF36] opacity-10 blur-[150px] rounded-full" />
            </div>

            {/* Abstract Rotating Rings (Matching Hero) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="h-[80vh] w-[80vh] border border-[#EABF36] rounded-full"
                    style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute h-[60vh] w-[60vh] border border-[#E5D1BE] rounded-full"
                    style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
                />
            </div>

            <div className="relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 font-display text-5xl font-bold uppercase leading-[0.9] md:text-7xl lg:text-9xl tracking-tighter"
                    style={{ color: '#E5D1BE' }}
                >
                    <TextReveal delay={0} highlightColor="#EABF36">
                        Ready to start
                    </TextReveal>
                    <br />
                    <TextReveal delay={0.25} highlightColor="#EABF36">
                        your season?
                    </TextReveal>
                </motion.h2>

                <motion.a
                    href="https://forms.gle/5VUPvvswL7zcKFaQA"
                    target="_self"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center justify-center px-12 py-6 overflow-hidden rounded-full transition-all duration-300 bg-[#EABF36]"
                >
                    {/* Button Glow Effect */}
                    <div className="absolute inset-0 w-full h-full text-[] bg-[#EABF36] group-hover:scale-[1.5] transition-transform duration-500 rounded-full blur-xl opacity-0 group-hover:opacity-100" />

                    <span className="relative font-display text-xl md:text-2xl font-bold uppercase tracking-widest text-black/70" >
                        Start Your Journey
                    </span>
                </motion.a>
            </div>
        </section>
    );
}

