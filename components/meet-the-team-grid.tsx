"use client";

import { useState, useRef, useEffect, useCallback, memo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { Rock_Salt } from 'next/font/google';

const rockSalt = Rock_Salt({ subsets: ['latin'], weight: '400' });

// --- DATA CONFIGURATION ---
const team = [
    { id: "01", name: "Sahil Puri", role: "Founder", img: "/images/team/sahil.png" },
    { id: "02", name: "Neera Handa", role: "Lead Advisor", img: "/images/team/neera.png" },
    { id: "03", name: "Sanam", role: "Academic Advisor", img: "/images/team/sanam.png" },
    { id: "04", name: "Farah", role: "Strategy Head", img: "/images/team/farah.png" },
    { id: "05", name: "Vibhor", role: "AI Product Manager", img: "/images/team/vibhor.png" },
    { id: "06", name: "Hita", role: "Systems Designer", img: "/images/team/hita.png" },
    { id: "07", name: "Nehil", role: "Full Stack Engineer", img: "/images/team/Nehil.png" },
    { id: "08", name: "Vansh", role: "Brand Experience Manager", img: "/images/team/vansh.png" },
    { id: "09", name: "Madhav", role: "GTM lead", img: "/images/team/madhav.png" },
    { id: "10", name: "Manan", role: "GTM intern", img: "/images/team/manan.png" },
];

const experienceLogos = [
    { name: "Flipkart", src: "/images/logos/flipkart.png" },
    { name: "Panasonic", src: "/images/logos/panasonic.png" },
    { name: "Noise", src: "/images/logos/noise.png" },
    { name: "Nothing", src: "/images/logos/nothing.png" },
    { name: "Masters Union", src: "/images/logos/master-union.png" },
    { name: "Bain", src: "/images/logos/bain.png" },
    { name: "McKinsey", src: "/images/logos/mckinsey.png" },
    { name: "British School", src: "/images/logos/british-school.png" },
    { name: "Vasant Valley", src: "/images/logos/vasant-valley.png" },
];

const alumniLogos = ["Harvard", "Cambridge", "IIM Indore", "SRCC", "DTU", "SSCBS"];

// --- SUB-COMPONENTS ---
const DnaItem = ({ num, title, desc }: { num: string, title: string, desc: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });
    return (
        <motion.div
            ref={ref}
            className="w-full max-w-lg transition-all duration-500"
            style={{ opacity: isInView ? 1 : 0.2, filter: isInView ? "blur(0px)" : "blur(2px)" }}
        >
            <span className="text-sm font-mono opacity-40 block mb-4">{num}</span>
            <h3 className="text-3xl md:text-4xl font-black uppercase mb-6 leading-none">{title}</h3>
            <p className="text-lg leading-relaxed font-mono opacity-80">{desc}</p>
        </motion.div>
    );

};

const TeamListItem = memo(({ member, setActiveMember }: { member: any, setActiveMember: (m: any) => void }) => (
    <motion.div
        onMouseEnter={() => setActiveMember(member)}
        onMouseLeave={() => setActiveMember(null)}
        className="group relative w-full flex items-center justify-between py-12 px-[5vw] border-b border-white/10 cursor-pointer transition-colors duration-300 hover:bg-white/5"
    >
        {/* Left: Role */}
        <div className="w-1/3 flex items-center gap-4">
            <span className="text-sm font-mono opacity-30 group-hover:text-[#EABF36] transition-colors duration-300 w-8">
                {member.id}
            </span>
            <span className="text-sm md:text-base font-mono uppercase opacity-70 group-hover:opacity-100 group-hover:text-white transition-colors duration-300">
                {member.role}
            </span>
        </div>

        {/* Center: Spacer for Image */}
        <div className="w-1/3" />

        {/* Right: Name */}
        <div className="w-1/3 text-right">
            <h3 className="text-[clamp(2rem,4vw,4.5rem)] font-black uppercase tracking-tight text-white group-hover:text-[#EABF36] transition-colors duration-300 leading-none">
                {member.name}
            </h3>
        </div>
    </motion.div>
));

const MobileTeamListItem = memo(({ member, setMobileSelectedMember }: { member: any, setMobileSelectedMember: (m: any) => void }) => (
    <div
        onClick={() => setMobileSelectedMember(member)}
        className="w-full flex items-center justify-between py-6 px-6 border-b border-white/10 active:bg-white/5 transition-colors min-h-[80px]"
    >
        <div className="flex flex-col gap-1">
            <span className="font-mono text-xs text-[#EABF36] opacity-80">{member.id}</span>
            <span className="font-mono text-xs uppercase opacity-50 tracking-wider">{member.role}</span>
        </div>
        <h3 className="text-3xl font-black uppercase text-white">{member.name}</h3>
    </div>
));

export default function MeetTheTeamGrid() {
    const [activeMember, setActiveMember] = useState<typeof team[0] | null>(null);
    const [mobileSelectedMember, setMobileSelectedMember] = useState<typeof team[0] | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // AUTO-SCROLL STATE FOR LOGO MARQUEE
    const [autoScrollSpeed, setAutoScrollSpeed] = useState(0.8);
    const logoScrollRef = useRef<HTMLDivElement>(null);
    const alumniScrollRef = useRef<HTMLDivElement>(null);
    const scrollPosRef = useRef(0);
    const alumniScrollPosRef = useRef(0);
    const [isPaused, setIsPaused] = useState(false);
    const animationFrameRef = useRef<number | null>(null);
    const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Responsive scroll speed
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            // Mobile: VERY slow (0.1), Desktop: normal speed (0.5)
            setAutoScrollSpeed(width < 768 ? 0.1 : 0.5);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-scroll animation with requestAnimationFrame for BOTH marquees
    useEffect(() => {
        const logoContainer = logoScrollRef.current;
        const alumniContainer = alumniScrollRef.current;

        const animate = () => {
            // Logo container scroll
            if (!isPaused && logoContainer) {
                const logoOneThird = logoContainer.scrollWidth / 3;
                if (scrollPosRef.current === 0) {
                    scrollPosRef.current = logoOneThird;
                    logoContainer.scrollLeft = logoOneThird;
                }
                scrollPosRef.current += autoScrollSpeed;
                if (scrollPosRef.current >= logoOneThird * 2) {
                    scrollPosRef.current = logoOneThird;
                    logoContainer.scrollLeft = logoOneThird;
                } else {
                    logoContainer.scrollLeft = scrollPosRef.current;
                }
            }

            // Alumni container scroll (reverse direction)
            if (!isPaused && alumniContainer) {
                const alumniOneThird = alumniContainer.scrollWidth / 3;
                if (alumniScrollPosRef.current === 0) {
                    alumniScrollPosRef.current = alumniOneThird * 2;
                    alumniContainer.scrollLeft = alumniOneThird * 2;
                }
                alumniScrollPosRef.current -= autoScrollSpeed; // Reverse direction
                if (alumniScrollPosRef.current <= alumniOneThird) {
                    alumniScrollPosRef.current = alumniOneThird * 2;
                    alumniContainer.scrollLeft = alumniOneThird * 2;
                } else {
                    alumniContainer.scrollLeft = alumniScrollPosRef.current;
                }
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);
        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [isPaused, autoScrollSpeed]);

    const pauseAndResume = useCallback(() => {
        setIsPaused(true);
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = setTimeout(() => setIsPaused(false), 3000);
    }, []);

    const handleLogoInteraction = {
        onMouseEnter: () => setIsPaused(true),
        onMouseLeave: () => {
            if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
            resumeTimeoutRef.current = setTimeout(() => setIsPaused(false), 1000);
        },
        onTouchStart: () => setIsPaused(true),
        onTouchEnd: pauseAndResume,
    };

    // REFS
    const heroTrackRef = useRef<HTMLDivElement>(null); // The tall scrolling track
    const dnaRef = useRef<HTMLDivElement>(null);

    // --- SCROLLYTELLING LOGIC (HERO) ---
    const { scrollYProgress: heroProgress } = useScroll({
        target: heroTrackRef,
        offset: ["start start", "end end"]
    });

    // 1. THE LAUNCHPAD TEXT (0% - 20%)
    const titleOpacity = useTransform(heroProgress, [0, 0.1], [1, 0]);
    const titleScale = useTransform(heroProgress, [0, 0.15], [1, 1.5]);
    const titleY = useTransform(heroProgress, [0, 0.15], [0, -100]);
    const titleBlur = useTransform(heroProgress, [0, 0.15], ["blur(0px)", "blur(20px)"]);

    // 2. SPLIT GRID (20% - 80%)
    // Shared Opacity: Fades in at 20%, stays visible, fades out at 85%
    const gridOpacity = useTransform(heroProgress, [0.15, 0.25, 0.5, 0.8], [0, 1, 1, 0]);

    // Right Column Scroll: Moves from slightly below to way up (simulating scroll)
    const pillarsY = useTransform(heroProgress, [0.2, 0.8], ["20vh", "-120vh"]);

    // 3. "100x BIGGER" REVEAL (85% - 100%)
    const bigTextOpacity = useTransform(heroProgress, [0.85, 0.9], [0, 1]);
    const bigTextScale = useTransform(heroProgress, [0.85, 1], [0.8, 1]);
    const bigTextY = useTransform(heroProgress, [0.85, 1], [100, 0]);

    // --- GLOBAL COLOR LOGIC ---
    const { scrollYProgress: colorProgress } = useScroll({
        target: dnaRef,
        offset: ["start 0.8", "start 0.2"]
    });
    const backgroundColor = useTransform(colorProgress, [0, 1], ["#000000", "#FFFFFF"]);
    const textColor = useTransform(colorProgress, [0, 1], ["#FFFFFF", "#000000"]);
    const borderColor = useTransform(colorProgress, [0, 1], ["rgba(255,255,255,0.2)", "rgba(0,0,0,0.1)"]);

    // --- FOOTER EXPANSION LOGIC ---
    const footerTrackRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: footerProgress } = useScroll({
        target: footerTrackRef,
        offset: ["start end", "end end"]
    });

    const footerScale = useTransform(footerProgress, [0, 1], [0.95, 1]);
    const footerRadius = useTransform(footerProgress, [0, 1], ["12px", "0px"]);
    const footerOnePercentColor = useTransform(footerProgress, [0.2, 1], ["#FFFFFF", "#EABF36"]);

    return (
        <motion.div
            ref={containerRef}
            className="relative font-sans selection:bg-[#EABF36] selection:text-black"
            style={{ backgroundColor, color: textColor }}
        >
            {/* ══════════════════════════════════════════════════════════════
                SECTION 1: THE SCROLLYTELLING HERO (DESKTOP ONLY)
                This section is 300vh tall to allow for the sequence.
            ══════════════════════════════════════════════════════════════ */}
            <section ref={heroTrackRef} className="hidden md:block relative h-[300vh]">
                <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center px-4 md:px-[4vw]">

                    {/* STAGE 1: CENTERED TITLE */}
                    <motion.div
                        style={{ opacity: titleOpacity, scale: titleScale, y: titleY, filter: titleBlur }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        <div className="relative inline-block">
                            <h1 className="text-[clamp(4rem,16vw,20rem)] font-black leading-[0.8] tracking-tighter uppercase text-center whitespace-pre-line font-inter">
                                THE<br />LAUNCHPAD
                            </h1>
                            {/* The Signature Overlay */}
                            <span
                                className={`absolute top-[-5%] right-[-5%] text-[clamp(8rem,16vw,20rem)] text-[#CCFF00] -rotate-12 select-none pointer-events-none ${rockSalt.className}`}
                            >
                                1%
                            </span>
                        </div>
                    </motion.div>

                    {/* STAGE 2: THE SPLIT GRID (Manifesto + Pillars) */}
                    <motion.div
                        style={{ opacity: gridOpacity }}
                        className="absolute w-full max-w-[90vw] grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-start mt-20"
                    >
                        {/* LEFT: Manifesto (Fixed Position via Sticky-like behavior) */}
                        <div className="w-full flex flex-col gap-10 md:sticky md:top-32">
                            <p className="text-3xl md:text-5xl font-medium leading-[1.15] tracking-tight">
                                We are the launchpad for the <span className="text-[#EABF36]">top 1%</span> of those who dream bigger, push harder, and never stop reaching for more.
                            </p>
                            <p className="text-xl md:text-2xl font-normal opacity-70 max-w-lg">
                                At Alcovia, we’re committed to helping teens unlock their full potential through:
                            </p>
                        </div>

                        {/* RIGHT: The 3 Pillars (Scrolling Up) */}
                        <motion.div
                            style={{ y: pillarsY }}
                            className="w-full flex flex-col gap-[5vh]"
                        >
                            {["Mentorship", "Peer Learning", "Hyper-personalized Guidance"].map((item, i) => (
                                <div key={i} className="border-t border-white/50 py-8 first:border-t-2">
                                    <div className="flex flex-col gap-[10vh] pt-[5vh]">
                                        <span className="font-mono text-[#EABF36] text-sm font-bold tracking-widest">
                                            0{i + 1}
                                        </span>
                                        <h3 className="text-5xl md:text-7xl font-black uppercase leading-[0.85] tracking-tighter">
                                            {item.split('-').map((word, idx) => (
                                                <span key={idx} className="block">{word}</span>
                                            ))}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                            {/* Bottom border for the last item to match aesthetics */}
                            <div className="border-t border-white/20 w-full" />
                        </motion.div>
                    </motion.div>

                    {/* STAGE 3: "100x BIGGER" */}
                    <motion.div
                        style={{ opacity: bigTextOpacity, scale: bigTextScale, y: bigTextY }}
                        className="absolute inset-0 flex items-center justify-center text-center px-4"
                    >
                        <div>
                            <p className="font-mono text-sm uppercase tracking-[0.5em] mb-8 opacity-60">To build a life which is</p>
                            <h2 className="text-[clamp(4rem,12vw,14rem)] font-black uppercase leading-[0.8] text-[#EABF36] mb-8">
                                100x BIGGER
                            </h2>
                            <p className="text-xl md:text-4xl font-light opacity-80">than whatever you imagine.</p>
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                SECTION 1 (MOBILE): LINEAR EDITORIAL STACK
                No scroll jacking. Pure vertical flow.
            ══════════════════════════════════════════════════════════════ */}
            <section className="md:hidden block w-full px-6 py-32 flex flex-col">
                {/* Item 1: Title */}
                <div className="mb-20 relative">
                    <h1 className="text-6xl font-black leading-[0.85] tracking-tighter uppercase text-left font-inter">
                        THE<br />LAUNCHPAD
                    </h1>
                    <span
                        className={`absolute top-[-10%] right-[0%] text-6xl text-[#CCFF00] -rotate-12 select-none pointer-events-none ${rockSalt.className}`}
                    >
                        1%
                    </span>
                </div>

                {/* Item 2: Manifesto */}
                <div className="mb-20 flex flex-col gap-6">
                    <p className="text-2xl font-medium leading-tight tracking-tight">
                        We are the launchpad for the <span className="text-[#EABF36]">top 1%</span> of those who dream bigger, push harder, and never stop reaching for more.
                    </p>
                    <p className="text-lg font-normal opacity-70">
                        At Alcovia, we’re committed to helping teens unlock their full potential through:
                    </p>
                </div>

                {/* Item 3: Pillars List */}
                <div className="flex flex-col gap-10 mb-32">
                    {["Mentorship", "Peer Learning", "Hyper-personalized Guidance"].map((item, i) => (
                        <div key={i} className="border-t border-white/30 pt-4">
                            <span className="font-mono text-[#EABF36] text-sm font-bold tracking-widest block mb-2">
                                0{i + 1}
                            </span>
                            <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter">
                                {item.split('-').map((word, idx) => (
                                    <span key={idx} className="block">{word}</span>
                                ))}
                            </h3>
                        </div>
                    ))}
                </div>

                {/* Item 4: The Closer */}
                <div className="text-left">
                    <p className="font-mono text-xs uppercase tracking-[0.3em] mb-4 opacity-60">To build a life which is</p>
                    <h2 className="text-7xl font-black uppercase leading-[0.8] text-[#EABF36] mb-6">
                        100x<br />BIGGER
                    </h2>
                    <p className="text-lg font-light opacity-80">than whatever you imagine.</p>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                SECTION 2: ETHOS (The Locking Section)
            ══════════════════════════════════════════════════════════════ */}
            <section className="relative z-10 pt-32 pb-32 px-[5vw] flex justify-center text-center">
                <div className="max-w-5xl flex flex-col items-center">
                    <h2 className="text-[clamp(2rem,6vw,6rem)] font-bold leading-none uppercase opacity-90 mb-8">
                        <span className="block">First Principle Thinkers,</span>
                        <span className="block">Industry Shakers,</span>
                        <span className="block text-[#EABF36]">Lean & Mean.</span>
                    </h2>
                    <p className="font-mono opacity-50 text-sm tracking-widest uppercase">
                        <span className="block">A team that is obsessed</span>
                        <span className="block">with the problem statements.</span>
                    </p>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                SECTION 3: TEAM CENTER-STAGE LAYOUT (Desktop)
                Role Left | Image Center (Fixed) | Name Right
            ══════════════════════════════════════════════════════════════ */}
            <section className="relative z-10 w-full hidden md:block min-h-screen border-t border-white/20">

                {/* THE STAGE (Fixed Center Image) */}
                <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none z-20">
                    <AnimatePresence mode="wait">
                        {activeMember && (
                            <motion.div
                                key={activeMember.id}
                                initial={{ opacity: 0, scale: 0.8, y: 20, x: -50 }}
                                animate={{ opacity: 1, scale: 1, y: 0, x: -50 }}
                                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }} // Quintic Out
                                className="relative w-[24vw] aspect-[3/4] shadow-2xl mr-20"
                            >
                                <div className="relative w-full h-full overflow-hidden rounded-3xl bg-[#111]">
                                    <Image src={activeMember.img} alt={activeMember.name} fill className="object-cover" priority />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* THE LIST (Scrollable) */}
                <div className="relative z-10 w-full pb-40">
                    {team.map((member) => (
                        <TeamListItem key={member.id} member={member} setActiveMember={setActiveMember} />
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                SECTION 4: TEAM MOBILE (List + Modal)
            ══════════════════════════════════════════════════════════════ */}
            <section className="md:hidden relative z-10 pb-32 w-full border-t border-white/20">
                <p className="font-mono text-xs uppercase tracking-[0.3em] opacity-40 mb-8 ml-6 mt-10">The Team</p>
                <div className="flex flex-col w-full">
                    {team.map((member) => (
                        <MobileTeamListItem key={member.id} member={member} setMobileSelectedMember={setMobileSelectedMember} />
                    ))}
                </div>
            </section>

            {/* MOBILE MODAL OVERLAY */}
            <AnimatePresence>
                {mobileSelectedMember && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                            onClick={() => setMobileSelectedMember(null)}
                        />

                        {/* Card */}
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-sm aspect-[3/4] bg-[#111] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                        >
                            <Image
                                src={mobileSelectedMember.img}
                                alt={mobileSelectedMember.name}
                                fill
                                className="object-cover"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-8">
                                <p className="font-mono text-[#EABF36] text-sm uppercase mb-2 tracking-widest">
                                    {mobileSelectedMember.role}
                                </p>
                                <h3 className="text-5xl font-black uppercase leading-[0.85] text-white">
                                    {mobileSelectedMember.name}
                                </h3>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setMobileSelectedMember(null)}
                                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white active:scale-90 transition-transform"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ══════════════════════════════════════════════════════════════
                SECTION 5: DNA (Color Changing Trigger)
            ══════════════════════════════════════════════════════════════ */}
            {/* ══════════════════════════════════════════════════════════════
                SECTION 5: DNA (Color Changing Trigger)
            ══════════════════════════════════════════════════════════════ */}
            <section ref={dnaRef} className="w-full relative">

                {/* DESKTOP LAYOUT */}
                <div className="hidden lg:flex flex-row items-start w-full max-w-[1800px] mx-auto py-32 px-[5vw]">
                    {/* LEFT: Mission Statement */}
                    <div className="w-1/2 sticky top-48 h-fit pr-10">
                        <h2 className="text-[clamp(3rem,6vw,6rem)] font-black uppercase leading-[0.9] tracking-tight mb-12">
                            Redefining<br />Education.
                        </h2>
                        <p className="text-3xl font-medium leading-relaxed max-w-xl opacity-80">
                            We are redefining education in India by bringing the <span className="font-bold">industry</span> next to school students.
                        </p>
                    </div>

                    {/* RIGHT: DNA Items */}
                    <div className="w-1/2 flex flex-col gap-[60vh] pb-[30vh]">
                        {[
                            { num: "01", title: "Actually Doing It", desc: "We don't just talk. We build. We fail. We iterate. Real-world experience is the only teacher that matters." },
                            { num: "02", title: "Learn from Each Other", desc: "The top 1% don't grow in isolation. They grow through friction, collaboration, and shared ambition." },
                            { num: "03", title: "Mentors for Life", desc: "Access to the minds that have already built the future. Guidance that doesn't end when the program does." }
                        ].map((item, i) => (
                            <div key={i} className="pt-6">
                                <span className="font-mono text-sm mb-4 block opacity-50">{item.num}</span>
                                <h3 className="text-5xl font-black uppercase leading-[0.9] mb-6">{item.title}</h3>
                                <p className="text-lg leading-relaxed font-mono opacity-70">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* MOBILE LAYOUT */}
                <div className="lg:hidden flex flex-col w-full px-6 py-20">
                    {/* Header */}
                    <div className="mb-20">
                        <h2 className="text-6xl font-black uppercase leading-[0.85] tracking-tighter mb-8">
                            Redefining<br />Education.
                        </h2>
                        <p className="text-2xl font-medium leading-tight tracking-tight opacity-90">
                            We are redefining education in India by bringing the <span className="font-bold">industry</span> next to school students.
                        </p>
                    </div>

                    {/* List Items */}
                    <div className="flex flex-col gap-16">
                        {[
                            { num: "01", title: "Actually Doing It", desc: "We don't just talk. We build. We fail. We iterate. Real-world experience is the only teacher that matters." },
                            { num: "02", title: "Learn from Each Other", desc: "The top 1% don't grow in isolation. They grow through friction, collaboration, and shared ambition." },
                            { num: "03", title: "Mentors for Life", desc: "Access to the minds that have already built the future. Guidance that doesn't end when the program does." }
                        ].map((item, i) => (
                            <div key={i} className="border-t border-black/10 pt-6">
                                <span className="font-mono text-[#EABF36] text-sm font-bold tracking-widest block mb-2">
                                    {item.num}
                                </span>
                                <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-lg font-mono opacity-70 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </section>

            {/* ══════════════════════════════════════════════════════════════
                SECTION 6: FOOTER (Marquees & Sticky Expansion CTA)
            ══════════════════════════════════════════════════════════════ */}
            <motion.section className="pb-0 pt-10 border-t" style={{ borderColor }}>
                {/* Marquees... */}
                <div className="mb-20">
                    <p className="text-center font-mono text-xs uppercase tracking-widest opacity-30 mb-8">Experienced Folks Who Have Worked In</p>
                    <div className="relative w-full overflow-hidden">
                        <div
                            ref={logoScrollRef}
                            className="flex gap-6 md:gap-12 items-center overflow-hidden px-6"
                            style={{
                                msOverflowStyle: 'none',
                                scrollbarWidth: 'none',
                            }}
                        >
                            {[...experienceLogos, ...experienceLogos, ...experienceLogos].map((logo, i) => (
                                <div key={i} className="flex-shrink-0 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-5 md:p-6 border border-black/10">
                                    <Image src={logo.src} alt={logo.name} width={200} height={100} className="h-14 sm:h-16 md:h-20 w-auto object-contain min-w-[80px] sm:min-w-[100px]" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mb-32">
                    <p className="text-center font-mono text-xs uppercase tracking-widest opacity-30 mb-8">Are Themselves Alumni Of</p>
                    <div className="relative w-full overflow-hidden">
                        <div
                            ref={alumniScrollRef}
                            className="flex gap-6 md:gap-10 items-center overflow-hidden px-6"
                            style={{
                                msOverflowStyle: 'none',
                                scrollbarWidth: 'none',
                            }}
                        >
                            {[...alumniLogos, ...alumniLogos, ...alumniLogos].map((uni, i) => (
                                <span key={i} className="flex-shrink-0 text-3xl md:text-5xl font-black uppercase opacity-10 hover:opacity-100 transition-opacity select-none whitespace-nowrap">
                                    {uni}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* STICKY EXPANSION CTA */}
                <div ref={footerTrackRef} className="relative h-[120vh] w-full">
                    <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                        <motion.div
                            style={{ scale: footerScale, borderRadius: footerRadius }}
                            className="relative w-full h-full bg-black flex flex-col items-center justify-center text-center overflow-hidden"
                        >
                            <h2 className="text-white text-[clamp(3rem,10vw,8rem)] font-black uppercase mb-10 leading-[0.9]">
                                Ready to join<br />the top <motion.span style={{ color: footerOnePercentColor }}>1%</motion.span>?
                            </h2>
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLScvrS8qOc0BaUBKqw5-GSG6oyyBvK3fs0aklTw0eszc1EvBUg/viewform" target="_blank" className="inline-block border border-[#EABF36] text-[#EABF36] px-12 py-4 font-mono uppercase hover:bg-[#EABF36] hover:text-black transition-all z-10">
                                Apply for Cohort 2026
                            </a>

                            {/* Background decoration to make it pop */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                @keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
                .animate-marquee { animation: marquee 180s linear infinite; }
                .animate-marquee-reverse { animation: marquee-reverse 180s linear infinite; }
                @media (min-width: 768px) {
                    .animate-marquee { animation: marquee 20s linear infinite; }
                    .animate-marquee-reverse { animation: marquee-reverse 25s linear infinite; }
                }
            `}</style>
        </motion.div>
    );
}
