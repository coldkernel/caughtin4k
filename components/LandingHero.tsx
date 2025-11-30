"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function LandingHero() {
    return (
        <div className="text-center space-y-8 mb-16 relative z-20 pt-20">
            <div className="relative inline-block">
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-neon-red animate-glitch relative z-10">
                    EXPOSE THE TRUTH
                </h1>
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-cyan-500 absolute top-0 left-0 opacity-70 animate-pulse mix-blend-screen translate-x-1">
                    EXPOSE THE TRUTH
                </h1>
            </div>

            <p className="text-xl md:text-3xl text-gray-400 font-mono tracking-widest uppercase max-w-3xl mx-auto leading-relaxed">
                THE AI LOYALTY AUDITOR. <br />
                <span className="text-white animate-pulse">DON'T GET PLAYED.</span> GET THE RECEIPTS.
            </p>


            <div className="flex justify-center pt-8">
                <Link href="/dashboard">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-neon-red text-black font-black text-2xl px-12 py-6 rounded-xl uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-[0_0_40px_rgba(220,38,38,0.6)] flex items-center gap-4 group"
                    >
                        START AUDIT <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                </Link>
            </div>
        </div>
    );
}
