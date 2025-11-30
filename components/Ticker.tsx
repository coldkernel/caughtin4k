"use client";

import { motion } from "framer-motion";

const MOCK_RESULTS = [
    "JESSICA CAUGHT ALEX - SCORE: 12",
    "BRAD EXPOSED BY SARAH - SCORE: 8",
    "ANONYMOUS UPLOAD - SCORE: 92 (SAFE)",
    "TOM'S DMS LEAKED - SCORE: 4",
    "EMILY VERIFIED LOYAL - SCORE: 98",
    "CHRIS CAUGHT IN 4K - SCORE: 0",
];

export function Ticker() {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-neon-red text-black font-bold py-2 overflow-hidden z-50 border-t-2 border-black">
            <motion.div
                animate={{ x: [0, -1000] }}
                transition={{
                    repeat: Infinity,
                    duration: 20,
                    ease: "linear",
                }}
                className="whitespace-nowrap flex gap-8"
            >
                {[...MOCK_RESULTS, ...MOCK_RESULTS, ...MOCK_RESULTS].map((result, i) => (
                    <span key={i} className="uppercase tracking-widest">
                        +++ {result} +++
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
