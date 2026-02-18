"use client"

import { motion } from "framer-motion"
import PremiumNavbar from "@/components/premium-navbar"
import Footer from "@/components/footer"

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-[#0B0B0B] text-[#F7F7F3]">
            <PremiumNavbar />

            <div className="pt-32 pb-20 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 text-[#EABF36]">
                        Privacy Policy
                    </h1>

                    <div className="p-8 md:p-12 rounded-3xl bg-[#111] shadow-[20px_20px_60px_#050505,-20px_-20px_60px_#1d1d1d] border border-white/5 space-y-8 text-lg text-[#F7F7F3]/80 font-light leading-relaxed">
                        <p className="text-sm text-[#F7F7F3]/40 uppercase tracking-widest font-bold">
                            Last Updated: {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                            <p>
                                Alcovian App ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and share information about you when you use our mobile application and related services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                            <p className="mb-4">We collect information to provide better services to all our users.</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong className="text-white">Personal Information:</strong> When you create an account, we may collect personal information such as your name and email address (e.g., via Google OAuth).</li>
                                <li><strong className="text-white">Usage Data:</strong> We collect data on how you interact with the App, including your study sessions, syllabus progress, and app usage frequency.</li>
                                <li><strong className="text-white">Calendar Data:</strong> If you grant permission, we access your calendar events to help you manage your schedule and study sessions. We do not store your calendar data permanently on our servers unless explicitly required for app functionality (e.g., syncing sessions).</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                            <p className="mb-4">We use the information we collect for the following purposes:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>To provide, maintain, and improve our services.</li>
                                <li>To calculate and display your academic ranking and velocity.</li>
                                <li>To personalize your experience and provide study insights.</li>
                                <li>To communicate with you about updates, security alerts, and support messages.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing and Disclosure</h2>
                            <p className="mb-4">We do not share your personal information with companies, organizations, or individuals outside of Alcovian App except in the following cases:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong className="text-white">With Consent:</strong> We will share personal information with companies, organizations, or individuals outside of Alcovian App when we have your consent to do so.</li>
                                <li><strong className="text-white">For Legal Reasons:</strong> We will share personal information if we have a good-faith belief that access, use, preservation, or disclosure of the information is reasonably necessary to meet any applicable law, regulation, legal process, or enforceable governmental request.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
                            <p>
                                We work hard to protect Alcovian App and our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
                            <p>
                                You have the right to request access to the personal information we hold about you and to ask for your personal information to be corrected or deleted.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">7. Changes to This Privacy Policy</h2>
                            <p>
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:info@alcovia.life" className="text-[#EABF36] hover:underline">info@alcovia.life</a>
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </main>
    )
}
