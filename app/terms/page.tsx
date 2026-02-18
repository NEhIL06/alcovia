"use client"

import { motion } from "framer-motion"
import PremiumNavbar from "@/components/premium-navbar"
import Footer from "@/components/footer"

export default function TermsAndConditions() {
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
                        Terms and Conditions
                    </h1>

                    <div className="p-8 md:p-12 rounded-3xl bg-[#111] shadow-[20px_20px_60px_#050505,-20px_-20px_60px_#1d1d1d] border border-white/5 space-y-8 text-lg text-[#F7F7F3]/80 font-light leading-relaxed">
                        <p className="text-sm text-[#F7F7F3]/40 uppercase tracking-widest font-bold">
                            Last Updated: {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                            <p>
                                Welcome to Alcovian App ("we," "our," or "us"). By accessing or using our mobile application and related services (collectively, the "App"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use the App.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Use of the App</h2>
                            <p>
                                Alcovian App is designed to help students track their academic progress, manage study sessions, and participate in community rankings. You agree to use the App only for lawful purposes and in accordance with these Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
                            <p>
                                To access certain features, you may be required to create an account, potentially using third-party services like Google OAuth. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. User Content and Data</h2>
                            <p>
                                By using the App, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display the data you input (such as study hours, syllabus progress) solely for the purpose of providing and improving the App's services, including the generation of rankings and analytics.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
                            <p>
                                The App and its original content, features, and functionality are and will remain the exclusive property of Alcovian App and its licensors.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Termination</h2>
                            <p>
                                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
                            <p>
                                In no event shall Alcovian App, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the App.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">8. Changes to Terms</h2>
                            <p>
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
                            <p>
                                If you have any questions about these Terms, please contact us at: <a href="mailto:info@alcovia.life" className="text-[#EABF36] hover:underline">info@alcovia.life</a>
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </main>
    )
}
