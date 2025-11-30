"use client";

import { motion } from "framer-motion";
import { Globe, Lock } from "lucide-react";

interface ScanSelectorProps {
    method: "public" | "private";
    setMethod: (method: "public" | "private") => void;
}

export function ScanSelector({ method, setMethod }: ScanSelectorProps) {
    return (
        <div className="flex w-full max-w-2xl mx-auto gap-4 mb-8">
            <button
                onClick={() => setMethod("public")}
                className={`flex-1 relative group overflow-hidden rounded-xl border-2 transition-all duration-300 ${method === "public"
                        ? "border-neon-red bg-black/80 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                        : "border-gray-800 bg-black/40 hover:border-gray-600"
                    }`}
            >
                {method === "public" && (
                    <motion.div
                        layoutId="active-glow"
                        className="absolute inset-0 bg-neon-red/10"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                )}
                <div className="relative z-10 flex flex-col items-center justify-center py-6 space-y-2">
                    <Globe className={`w-8 h-8 ${method === "public" ? "text-neon-red" : "text-gray-500"}`} />
                    <span className={`font-mono font-bold tracking-wider ${method === "public" ? "text-white" : "text-gray-500"}`}>
                        🔓 PUBLIC PROFILE
                    </span>
                </div>
            </button>

            <button
                onClick={() => setMethod("private")}
                className={`flex-1 relative group overflow-hidden rounded-xl border-2 transition-all duration-300 ${method === "private"
                        ? "border-neon-red bg-black/80 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                        : "border-gray-800 bg-black/40 hover:border-gray-600"
                    }`}
            >
                {method === "private" && (
                    <motion.div
                        layoutId="active-glow"
                        className="absolute inset-0 bg-neon-red/10"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                )}
                <div className="relative z-10 flex flex-col items-center justify-center py-6 space-y-2">
                    <Lock className={`w-8 h-8 ${method === "private" ? "text-neon-red" : "text-gray-500"}`} />
                    <span className={`font-mono font-bold tracking-wider ${method === "private" ? "text-white" : "text-gray-500"}`}>
                        🔒 PRIVATE ACCOUNT
                    </span>
                </div>
            </button>
        </div>
    );
}
