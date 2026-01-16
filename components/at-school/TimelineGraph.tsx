"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/text-reveal";

const timelineData = [
    {
        id: "Q1",
        title: "5% INCREMENT",
        description: "Securing a minimum 5% rise in academic performance",
        color: "#002C45", // Dark Blue
        textColor: "#E5D1BE"
    },
    {
        id: "Q2",
        title: "WORKSHOPS MAGIC",
        description: "Building confidence, leadership, and coherence",
        color: "#002C45", // Dark Blue
        textColor: "#E5D1BE"
    },
    {
        id: "Q3",
        title: "SYSTEM NOTICES",
        description: "Gaining recognition from teachers and staff",
        color: "#002C45", // Dark Blue
        textColor: "#E5D1BE"
    },
    {
        id: "Q4",
        title: "TOP OF CLASS",
        description: "Topping the class and acing extracurriculars",
        color: "#002C45", // Dark Blue
        textColor: "#E5D1BE"
    }
];

export default function TimelineGraph() {
    return (
        <section className="flex min-h-screen flex-col justify-center py-20 lg:py-32" style={{ backgroundColor: '#EABF36' }} data-theme="yellow">
            <div className="container mx-auto px-6">
                <div className="mb-20 text-center">
                    <TextReveal delay={0} highlightColor="#002C45">
                        <h2 className="font-display text-4xl font-bold uppercase leading-none text-[#002C45] lg:text-6xl">
                            The Year Ahead
                        </h2>
                    </TextReveal>
                </div>

                <div className="relative">
                    {/* Organic Curved Path (Desktop) */}
                    <div className="absolute left-0 top-10 hidden h-40 w-full lg:block">
                        <svg className="h-full w-full" preserveAspectRatio="none">
                            <motion.path
                                d="M0,80 C300,80 300,20 600,50 C900,80 1200,20 1600,50"
                                fill="none"
                                stroke="#002C45"
                                strokeWidth="2"
                                strokeDasharray="8 8"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 0.2 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                        </svg>
                    </div>

                    {/* Vertical Line (Mobile) */}
                    <div className="absolute left-8 top-0 block h-full w-0.5 -translate-x-1/2 bg-[#002C45]/10 lg:hidden">
                        <motion.div
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="h-full w-full origin-top bg-[#002C45]"
                        />
                    </div>

                    <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
                        {timelineData.map((item, index) => (
                            <div key={item.id} className="relative flex items-center gap-8 lg:flex-col lg:gap-6 lg:text-center">
                                {/* Node */}
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.1, backgroundColor: "#912F3C" }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full shadow-2xl transition-colors duration-300 lg:h-24 lg:w-24 lg:mt-4"
                                    style={{ backgroundColor: item.color }}
                                >
                                    <span
                                        className="font-display text-xl font-bold lg:text-2xl"
                                        style={{ color: item.textColor }}
                                    >
                                        {item.id}
                                    </span>
                                </motion.div>

                                {/* Content */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                                    className="flex flex-col pt-2 lg:items-center"
                                >
                                    <h3 className="mb-2 font-display text-xl font-bold uppercase text-[#002C45] lg:text-2xl">
                                        {item.title}
                                    </h3>
                                    <p className="font-body text-sm font-medium text-[#002C45]/80 lg:text-base lg:max-w-[200px]">
                                        {item.description}
                                    </p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
