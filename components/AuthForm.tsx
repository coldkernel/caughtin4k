"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

interface AuthFormProps {
    type: "login" | "signup";
}

export function AuthForm({ type }: AuthFormProps) {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Validation
        if (password.length < 8) {
            setError("PASSWORD TOO SHORT (MIN 8 CHARS)");
            setIsLoading(false);
            return;
        }

        // Mock Auth Delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Set Cookie (Mock Auth)
        document.cookie = "auth_token=mock_token_123; path=/; max-age=86400"; // 1 day

        router.push("/dashboard");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md p-8 bg-black/80 border border-neon-red/30 rounded-xl shadow-[0_0_30px_rgba(220,38,38,0.15)] backdrop-blur-sm"
        >
            <div className="text-center mb-8">
                <h1 className="text-3xl font-black tracking-tighter text-white mb-2">
                    {type === "login" ? "ACCESS TERMINAL" : "INITIATE PROTOCOL"}
                </h1>
                <p className="text-gray-500 font-mono text-sm">
                    {type === "login" ? "Enter credentials to proceed." : "Create secure identity."}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-mono text-neon-red uppercase tracking-widest">Email</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-neon-red transition-colors" />
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/50 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:border-neon-red focus:outline-none focus:shadow-[0_0_15px_rgba(220,38,38,0.2)] transition-all"
                            placeholder="user@example.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-mono text-neon-red uppercase tracking-widest">Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-neon-red transition-colors" />
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/50 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:border-neon-red focus:outline-none focus:shadow-[0_0_15px_rgba(220,38,38,0.2)] transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-neon-red font-mono text-xs text-center animate-pulse"
                    >
                        [ERROR]: {error}
                    </motion.div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-neon-red text-black font-bold py-4 rounded-lg uppercase tracking-widest hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <span className="animate-pulse">AUTHENTICATING...</span>
                    ) : (
                        <>
                            {type === "login" ? "LOGIN" : "CREATE ACCOUNT"} <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                    {type === "login" ? "New user? " : "Already have access? "}
                    <Link
                        href={type === "login" ? "/signup" : "/login"}
                        className="text-neon-red hover:text-white hover:underline transition-colors font-mono"
                    >
                        {type === "login" ? "Sign Up" : "Login"}
                    </Link>
                </p>
            </div>
        </motion.div>
    );
}
