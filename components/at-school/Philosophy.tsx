"use client";

import { motion } from "framer-motion";


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

                        <div className="font-display flex flex-col gap-1 text-3xl leading-relaxed lg:text-[33px] text-[#E5D1BE]">
                            <span>Alcovia program is <span className="font-bold">hyperpersonalised-</span></span>
                            <span>ensuring different outcomes for each <span className="font-bold italic">alcovian.</span></span>
                            <span>We work in the area that shows <span className="font-bold">maximum impact.</span></span>
                            <span>Either an area of big improvement or</span>
                            <span>honing a skill that is already at a <span className="font-bold">mastery level.</span></span>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side (Visual + Quote) */}
                <div className="relative min-h-[50vh] lg:min-h-screen lg:w-1/2" style={{ backgroundColor: '#002C45' }}>
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        {/* Abstract Irregular Fingerprint Pattern */}
                        <svg className="h-full w-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                            {[...Array(20)].map((_, i) => {
                                // Create irregular ellipses with varying radii
                                const rx = i * 2 + (i % 3) * 0.8;
                                const ry = i * 2 + (i % 2) * 1.2;
                                const rotation = (i % 4) * 5 - 10;
                                return (
                                    <motion.ellipse
                                        key={i}
                                        cx={50 + (i % 3 - 1) * 0.5}
                                        cy={50 + (i % 2 - 0.5) * 0.5}
                                        rx={rx}
                                        ry={ry}
                                        transform={`rotate(${rotation} 50 50)`}
                                        fill="none"
                                        stroke="#E5D1BE"
                                        strokeWidth="0.5"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 2, delay: i * 0.1, ease: "easeInOut" }}
                                    />
                                );
                            })}
                        </svg>
                    </div>

                    {/* Quote Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                        <div className="flex flex-col items-center">
                            <span className="font-display text-4xl font-bold leading-none lg:text-6xl text-[#EABF36]">
                                Nobody is <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontStyle: 'italic' }}>perfect</span>,
                            </span>
                            <span className="font-display text-4xl font-bold leading-none lg:text-6xl text-[#EABF36]">
                                and we love that.
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Text */}
            <div className="flex w-full justify-center py-16 px-6 lg:px-0" style={{ backgroundColor: '#002C45' }}>
                <p className="font-display text-xl uppercase tracking-widest lg:text-2xl text-center" style={{ color: '#E5D1BE' }}>
                    Understand how Alcovia program shows its progress:
                </p>
            </div>
        </section>
    );
}
