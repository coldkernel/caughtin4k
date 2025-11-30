"use client";

import { User, ShieldCheck, CreditCard, LogOut, Fingerprint } from "lucide-react";

export function UserProfile() {
    return (
        <div className="w-full max-w-md mx-auto font-mono">
            <div className="bg-black border border-neon-red/50 rounded-xl overflow-hidden relative shadow-[0_0_30px_rgba(220,38,38,0.1)]">
                {/* Header Background */}
                <div className="h-32 bg-gradient-to-b from-neon-red/20 to-black relative">
                    <div className="absolute inset-0 opacity-30"
                        style={{
                            backgroundImage: "radial-gradient(#dc2626 1px, transparent 1px)",
                            backgroundSize: "20px 20px"
                        }}
                    />
                </div>

                {/* Profile Content */}
                <div className="px-6 pb-8 relative -mt-12">
                    <div className="flex justify-between items-end mb-6">
                        <div className="w-24 h-24 bg-black border-2 border-neon-red rounded-xl flex items-center justify-center relative overflow-hidden group">
                            <User className="w-12 h-12 text-neon-red" />
                            <div className="absolute inset-0 bg-neon-red/10 group-hover:bg-neon-red/20 transition-colors" />
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Agent Status</div>
                            <div className="flex items-center justify-end gap-2 text-green-500 font-bold">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                ACTIVE
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">AGENT 007</h2>
                            <p className="text-gray-500 text-sm">j***@gmail.com</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-2">
                                    <CreditCard className="w-4 h-4" />
                                    Credits
                                </div>
                                <div className="text-2xl font-bold text-neon-red">∞ UNLIMITED</div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-2">
                                    <ShieldCheck className="w-4 h-4" />
                                    Clearance
                                </div>
                                <div className="text-2xl font-bold text-white">LEVEL 5</div>
                            </div>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-white/10">
                            <div className="flex justify-between items-center text-sm text-gray-400">
                                <span className="flex items-center gap-2">
                                    <Fingerprint className="w-4 h-4" />
                                    Agent ID
                                </span>
                                <span className="font-mono text-white">8492-XJ-29</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-400">
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Member Since
                                </span>
                                <span className="font-mono text-white">NOV 2025</span>
                            </div>
                        </div>

                        <button className="w-full mt-4 border border-red-900/50 text-red-500 hover:bg-red-900/20 py-3 rounded-lg font-bold tracking-widest transition-all flex items-center justify-center gap-2 uppercase text-sm">
                            <LogOut className="w-4 h-4" />
                            Deactivate Session
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { Clock } from "lucide-react";
