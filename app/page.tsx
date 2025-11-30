"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Testimonials } from "@/components/Testimonials";
import { Ticker } from "@/components/Ticker";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-black text-white">
      <Navbar />

      <main className="flex-grow flex flex-col pt-32 pb-20">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-24 relative z-20 px-6">
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
            <span className="text-white animate-pulse">SEE WHAT THEY'RE HIDING.</span>
          </p>

          <div className="flex justify-center pt-8">
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-neon-red text-black font-black text-2xl px-12 py-6 rounded-xl uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-[0_0_40px_rgba(220,38,38,0.6)] flex items-center gap-4 group"
              >
                START INVESTIGATION <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </Link>
          </div>

          <div className="flex justify-center gap-6 text-gray-500 font-mono text-sm mt-8">
            <span className="flex items-center gap-2"><Lock className="w-4 h-4" /> ANONYMOUS</span>
            <span className="flex items-center gap-2"><Lock className="w-4 h-4" /> ENCRYPTED</span>
            <span className="flex items-center gap-2"><Lock className="w-4 h-4" /> NO TRACE</span>
          </div>
        </div>

        {/* Social Proof Bar */}
        <div className="w-full bg-neon-red/10 border-y border-neon-red/20 py-4 mb-24 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="font-mono text-neon-red font-bold tracking-widest text-sm md:text-base animate-pulse">
              LIVE STATS_
            </p>
            <div className="flex flex-col md:flex-row gap-8 font-mono text-sm md:text-base text-gray-300">
              <span>15,402 RELATIONSHIPS AUDITED</span>
              <span className="text-neon-red">89% CHEATING RATE DETECTED</span>
              <span>4.2M RED FLAGS FOUND</span>
            </div>
          </div>
        </div>

        <FeatureGrid />
        <Testimonials />
      </main>

      <Footer />
      <Ticker />
    </div>
  );
}
