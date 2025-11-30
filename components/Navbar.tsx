"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/5"
        >
            <Link href="/" className="text-2xl font-black tracking-tighter text-white hover:text-neon-red transition-colors animate-glitch">
                CAUGHT IN 4K
            </Link>

            <div className="flex items-center gap-6">
                <Link href="/login" className="text-sm font-mono text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
                    Login
                </Link>
                <Link href="/signup">
                    <button className="bg-neon-red text-black font-bold px-6 py-2 rounded-lg uppercase tracking-widest text-sm hover:bg-white transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                        Get Started
                    </button>
                </Link>
            </div>
        </motion.nav>
    );
}
