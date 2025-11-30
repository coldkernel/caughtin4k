"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Lock, User, Heart } from "lucide-react";

interface PublicInputProps {
    onScan: (data: { username: string; gender: "male" | "female"; context: string }) => void;
    isLoading?: boolean;
}

export function PublicInput({ onScan, isLoading }: PublicInputProps) {
    const [gender, setGender] = useState<"male" | "female" | null>(null);
    const [username, setUsername] = useState("");
    const [context, setContext] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim() && gender) {
            onScan({ username, gender, context });
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="w-full max-w-2xl mx-auto space-y-8 p-6 bg-black/40 border border-neon-red/20 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(220,38,38,0.1)]"
        >
            {/* Step 1: The Suspect */}
            <div className="space-y-4">
                <label className="block text-neon-red font-mono font-bold tracking-widest text-sm">
                    1. WHO ARE WE AUDITING?
                </label>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => setGender("male")}
                        className={`p-6 border-2 rounded-xl flex flex-col items-center gap-3 transition-all duration-300 group ${gender === "male"
                            ? "border-neon-red bg-neon-red/10 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                            : "border-gray-800 bg-black/50 hover:border-gray-600"
                            }`}
                    >
                        <span className="text-4xl group-hover:scale-110 transition-transform">🧢</span>
                        <span className={`font-mono font-bold tracking-widest ${gender === "male" ? "text-white" : "text-gray-500"}`}>
                            BOYFRIEND
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setGender("female")}
                        className={`p-6 border-2 rounded-xl flex flex-col items-center gap-3 transition-all duration-300 group ${gender === "female"
                            ? "border-neon-red bg-neon-red/10 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                            : "border-gray-800 bg-black/50 hover:border-gray-600"
                            }`}
                    >
                        <span className="text-4xl group-hover:scale-110 transition-transform">🎀</span>
                        <span className={`font-mono font-bold tracking-widest ${gender === "female" ? "text-white" : "text-gray-500"}`}>
                            GIRLFRIEND
                        </span>
                    </button>
                </div>
            </div>

            {/* Step 2: The Target */}
            <div className="space-y-4">
                <label className="block text-neon-red font-mono font-bold tracking-widest text-sm">
                    2. DROP THE @HANDLE
                </label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <span className="text-neon-red font-mono text-xl">@</span>
                    </div>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder={gender === "female" ? "@her_spam_page" : "@his_main_account"}
                        className="w-full bg-black/50 border-2 border-gray-700 rounded-xl py-4 pl-12 pr-4 text-xl font-mono text-white placeholder-gray-600 focus:border-neon-red focus:outline-none focus:shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all duration-300"
                    />
                </div>
            </div>

            {/* Step 3: The Tea */}
            <div className="space-y-4">
                <label className="block text-neon-red font-mono font-bold tracking-widest text-sm">
                    3. WHY ARE YOU SUSPICIOUS? (OPTIONAL)
                </label>
                <textarea
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="Spill the tea... (e.g., He hides his phone, he follows randoms, he's acting distant...)"
                    rows={3}
                    className="w-full bg-black/50 border-2 border-gray-700 rounded-xl p-4 text-base font-mono text-white placeholder-gray-600 focus:border-neon-red focus:outline-none focus:shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all duration-300 resize-none"
                />
            </div>

            <button
                type="submit"
                disabled={!username.trim() || !gender || isLoading}
                className="w-full bg-neon-red text-black font-black text-xl py-6 rounded-xl uppercase tracking-widest hover:bg-white hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-neon-red transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.4)] animate-pulse flex items-center justify-center gap-3"
            >
                {isLoading ? (
                    <span className="animate-spin">⏳</span>
                ) : (
                    <Lock className="w-6 h-6" />
                )}
                {isLoading ? "SCANNING..." : "EXPOSE THEM NOW"}
            </button>
        </motion.form>
    );
}
