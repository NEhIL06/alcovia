"use client";

import { motion } from "framer-motion";
import TextReveal, { MultiLineReveal } from "@/components/text-reveal";

export default function Philosophy() {
    return (
        <section className="flex flex-col">
            <div className="flex flex-col lg:flex-row">
                {/* Left Side (Text) */}
                <div className="flex min-h-[50vh] flex-col justify-center p-8 lg:min-h-screen lg:w-1/2 lg:p-20" style={{ backgroundColor: '#234944' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <MultiLineReveal
                            lines={[
                                { text: "Alcovia program is hyperpersonalised-" },
                                { text: "ensuring different outcomes for each alcovian." },
                                { text: "We work in the area that shows maximum impact." },
                                { text: "Either an area of big improvement or honing" },
                                { text: "a skill that is already at a mastery level." }
                            ]}
                            className="font-display text-2xl leading-tight lg:text-4xl text-[#E5D1BE]"
                            staggerDelay={0.1}
                        />
                    </motion.div>
                </div>

                {/* Right Side (Visual + Quote) */}
                <div className="relative min-h-[50vh] lg:min-h-screen lg:w-1/2" style={{ backgroundColor: '#002C45' }}>
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        {/* Abstract Fingerprint/Growth Pattern */}
                        <svg className="h-full w-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                            {[...Array(20)].map((_, i) => (
                                <motion.path
                                    key={i}
                                    d={`M50,50 m-${i * 2},0 a${i * 2},${i * 2} 0 1,0 ${i * 4},0 a${i * 2},${i * 2} 0 1,0 -${i * 4},0`}
                                    fill="none"
                                    stroke="#E5D1BE"
                                    strokeWidth="0.5"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 2, delay: i * 0.1, ease: "easeInOut" }}
                                />
                            ))}
                        </svg>
                    </div>

                    {/* Quote Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <MultiLineReveal
                                lines={[
                                    {
                                        content: (
                                            <>
                                                Nobody is <span style={{ color: '#e5c1beff', fontWeight: 'bold', fontStyle: 'italic' }}>perfect</span>,
                                            </>
                                        )
                                    },
                                    { text: "and we love that." }
                                ]}
                                className="font-display text-4xl font-bold leading-none lg:text-6xl text-[#EABF36]"
                                staggerDelay={0.1}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom Text */}
            <div className="flex w-full justify-center py-16" style={{ backgroundColor: '#002C45' }}>
                <TextReveal delay={0} highlightColor="#EABF36">
                    <p className="font-display text-xl uppercase tracking-widest lg:text-2xl" style={{ color: '#E5D1BE' }}>
                        Understand how Alcovia program shows its progress:
                    </p>
                </TextReveal>
            </div>
        </section>
    );
}

