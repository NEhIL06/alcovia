"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/text-reveal";

const timelineData = [
    {
        id: "Q1",
        title: "5% INCREMENT",
        description: "Securing a minimum 5% rise in academic performance",
    },
    {
        id: "Q2",
        title: "WORKSHOPS MAGIC",
        description: "Building confidence, leadership, and coherence",
    },
    {
        id: "Q3",
        title: "SYSTEM NOTICES",
        description: "Gaining recognition from teachers and staff",
    },
    {
        id: "Q4",
        title: "TOP OF CLASS",
        description: "Topping the class and acing extracurriculars",
    }
];

export default function TimelineGraph() {
    return (
        <section className="relative flex min-h-screen flex-col justify-center py-20 lg:py-32 overflow-hidden" style={{ backgroundColor: '#234944' }}>
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-[#EABF36] opacity-5 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-24 text-center">
                    <TextReveal delay={0} highlightColor="#EABF36">
                        <h2 className="font-display text-5xl font-bold uppercase leading-none text-[#E5D1BE] lg:text-7xl tracking-tight">
                            The Year Ahead
                        </h2>
                    </TextReveal>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100px" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-1 bg-[#EABF36] mx-auto mt-6"
                    />
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Central Glowing Line (Desktop) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden lg:block bg-[#E5D1BE]/10">
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="w-full bg-gradient-to-b from-[#EABF36] via-[#E5D1BE] to-[#EABF36] shadow-[0_0_15px_rgba(234,191,54,0.6)]"
                        />
                    </div>

                    {/* Mobile Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 block lg:hidden bg-[#E5D1BE]/10">
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="w-full bg-[#EABF36]"
                        />
                    </div>

                    <div className="flex flex-col gap-16 lg:gap-32">
                        {timelineData.map((item, index) => (
                            <div key={item.id} className={`relative flex items-center gap-8 lg:gap-0 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>

                                {/* Timeline Node (Center) */}
                                <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 flex items-center justify-center">
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-[#234944] border-2 border-[#EABF36] shadow-[0_0_20px_rgba(234,191,54,0.5)] z-20"
                                    >
                                        <motion.div
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute inset-0 bg-[#EABF36] rounded-full -z-10"
                                        />
                                    </motion.div>
                                </div>

                                {/* Content Card */}
                                <div className={`flex-1 pl-20 lg:pl-0 ${index % 2 === 0 ? 'lg:pr-24 lg:text-right' : 'lg:pl-24 lg:text-left'}`}>
                                    <motion.div
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        className="group relative"
                                    >
                                        <span className="block font-display text-6xl lg:text-8xl font-bold text-[#E5D1BE]/5 mb-[-10px] lg:mb-[-15px] relative z-2 select-none transition-colors duration-500 group-hover:text-[#EABF36]/10">
                                            {item.id}
                                        </span>
                                        <div className="relative z-10">
                                            <h3 className="text-2xl lg:text-4xl font-display font-bold uppercase text-[#E5D1BE] mb-3 group-hover:text-[#EABF36] transition-colors duration-300">
                                                {item.title}
                                            </h3>
                                            <p className="font-body text-[#E5D1BE]/70 text-base lg:text-lg font-light tracking-wide">
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Empty space for the other side */}
                                <div className="hidden lg:block flex-1" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
