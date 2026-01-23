"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

// Constants for mentor data
const MENTORS = [
    {
        name: "Madhav Seth",
        title: "CEO, Ai+ Smartphone",
        college: "Harvard Business School",
        imageSrc: "/assets/mentors/madhavseth.jpg",
    },
    {
        name: "Chef Gauri Varma",
        title: "Founder, Confect & G's Patisserie",
        college: "Oxford University",
        imageSrc: "/assets/mentors/CHEFGAURI.webp",

    },
    {
        name: "Jivraj Singh Sachar",
        title: "Venture Partner, Tribe Capital",
        college: "St. Xavier's College",
        imageSrc: "/assets/mentors/JIVRAJ.webp",

    },
    {
        name: "Nishant Chahar",
        title: "Founder, AlgoPrep",
        college: "NSUT",
        imageSrc: "/assets/mentors/NISHANT.jpg",

    },
    {
        name: "Puneet Chawla",
        title: "Founder, Designwings",
        college: "Amity University",
        imageSrc: "/assets/mentors/puneetchawla.jpg",

    },
    {
        name: "Nikunj Dang",
        title: "Founder & CEO, Yagnum",
        college: "Yagnum",
        imageSrc: "/assets/mentors/nikunjdang.webp",

    },
    {
        name: "Vipul Gupta",
        title: "Google",
        college: "IIM Ahmedabad",
        imageSrc: "/assets/mentors/vipul.jpeg",

    },
    {
        name: "Devansh Jain",
        title: "Founder & CEO, Culture Circle",
        college: "IIM Ahmedabad",
        imageSrc: "/assets/mentors/Devansh-Jain-2.png",
    },
    {
        name: "Nishant Larioia",
        title: "Partner, The PACT",
        college: "GNLU",
        imageSrc: "/assets/mentors/nisshantlaroia.jpeg",
    },
    {
        name: "Aanchal Kapoor",
        title: "Independent Legal Practitioner",
        college: "NUS Faculty of Law",
        imageSrc: "/assets/mentors/aanchal.webp",

    },
    {
        name: "Ali Rehan",
        title: "President of India Medalist",
        college: "IIT Bombay",
        imageSrc: "/assets/mentors/alirehan.jpeg",

    },
    {
        name: "Suhas Repally",
        title: "Product Manager",
        college: "Coke & Pepsi",
        imageSrc: "/assets/mentors/suhas.jpeg",

    },
    {
        name: "Preeti Sundan",
        title: "Chairperson, UPSC",
        college: "LSE",
        imageSrc: "/assets/mentors/preetisudan.jpeg",

    },
    {
        name: "Rohit Gandhi",
        title: "WION (World is One News)",
        college: "Carleton University",
        imageSrc: "/assets/mentors/rohit-gandhi-1.jpg.jpg",

    },
    {
        name: "Satish Reddy Eadala",
        title: "EA Sports",
        college: "Indian School of Business",
        imageSrc: "/assets/mentors/satishreddy.png",
    },
]

const MentorCard = ({ mentor }: { mentor: typeof MENTORS[0] }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -4 }}
            className="group relative flex flex-col bg-[#111111] border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#FACC15] hover:shadow-[0_10px_40px_-10px_rgba(250,204,21,0.1)]"
        >
            {/* Hero Image Area */}
            <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden bg-[#0a0a0a] flex items-end justify-center pt-8">
                {/* Yellow Abstract Blob */}
                {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-80 z-0">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-[#FACC15]">
                        <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.4,70.6,31.4C59,41.4,47.1,48.6,35.5,54.6C23.9,60.6,12.6,65.4,-0.4,66.1C-13.4,66.8,-29.4,63.4,-42.6,55.5C-55.8,47.6,-66.2,35.2,-73.4,21.1C-80.6,7,-84.6,-8.8,-80.6,-23.1C-76.6,-37.4,-64.6,-50.2,-51.4,-57.8C-38.2,-65.4,-23.8,-67.8,-10.1,-69.2C3.6,-70.6,17.2,-71,30.5,-83.6L44.7,-76.4Z" transform="translate(100 100) scale(1.1)" />
                    </svg>
                </div> */}

                {/* Headshot */}
                <div className="relative z-10 w-full h-full">
                    <Image
                        src={mentor.imageSrc}
                        alt={mentor.name}
                        fill
                        className="object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-20" />
                </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 flex flex-col flex-grow">
                <div className="mb-3 sm:mb-4">
                    <h3 className="text-white font-bold text-base sm:text-lg mb-1 leading-tight">{mentor.name}</h3>
                    <p className="text-zinc-400 text-xs uppercase tracking-wide font-medium">{mentor.title}</p>
                </div>

                <div className="mt-auto">
                    <div className="w-full h-[1px] bg-white/10 mb-3 sm:mb-4" />
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#FACC15]" />
                            <p className="text-zinc-300 text-xs font-medium truncate">{mentor.college}</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default function InfiniteScrollMentors() {
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(5)

    // Adjust items per page based on screen size
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            if (width < 640) {
                setItemsPerPage(2) // Mobile: 2 cards
            } else if (width < 768) {
                setItemsPerPage(3) // Small tablet: 3 cards
            } else if (width < 1024) {
                setItemsPerPage(4) // Tablet: 4 cards
            } else {
                setItemsPerPage(5) // Desktop: 5 cards
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const totalPages = Math.ceil(MENTORS.length / itemsPerPage)
    const currentMentors = MENTORS.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )

    const goToPrevious = () => {
        setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
    }

    const goToNext = () => {
        setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
    }

    return (
        <div className="w-full px-6 md:px-12 lg:px-20 py-10">
            {/* Navigation Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-zinc-500">
                        {currentPage + 1} / {totalPages}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    {/* Previous Button */}
                    <motion.button
                        onClick={goToPrevious}
                        className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border border-white/20 bg-[#EABF36] text-white text-xl md:text-2xl transition-all hover:bg-[#EABF36] hover:border-[#EABF36] hover:text-[#0C0C0C]"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        ←
                    </motion.button>

                    {/* Next Button */}
                    <motion.button
                        onClick={goToNext}
                        className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border border-white/20 bg-[#EABF36] text-white text-xl md:text-2xl transition-all hover:bg-[#EABF36] hover:border-[#EABF36] hover:text-[#0C0C0C]"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        →
                    </motion.button>
                </div>
            </div>

            {/* Mentor Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                <AnimatePresence mode="wait">
                    {currentMentors.map((mentor, index) => (
                        <MentorCard key={`${mentor.name}-${currentPage}-${index}`} mentor={mentor} />
                    ))}
                </AnimatePresence>
            </div>

            {/* Page Dots */}
            {/* <div className="flex items-center justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentPage
                                ? 'w-8 bg-[#EABF36]'
                                : 'w-2 bg-white/30 hover:bg-white/50'
                            }`}
                    />
                ))}
            </div> */}
        </div>
    )
}
