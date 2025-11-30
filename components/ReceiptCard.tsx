"use client";

import { motion } from "framer-motion";
import { Barcode, User, ShieldAlert, Skull } from "lucide-react";

export interface TargetInfo {
    username: string;
    full_name: string;
    profile_pic: string;
}

export interface Threat {
    username: string;
    reason: string;
    profile_pic_url?: string;
}

interface ReceiptCardProps {
    score: number;
    verdictSummary?: string;
    generalOverview?: string;
    aiEnhancedAnalysis?: string;
    targetInfo?: TargetInfo;
    suspects?: Threat[];
    enableCors?: boolean;
    isStatic?: boolean;
}

export function ReceiptCard({ score, verdictSummary, generalOverview, aiEnhancedAnalysis, targetInfo, suspects = [], enableCors = false, isStatic = false }: ReceiptCardProps) {
    const isToxic = score < 50;

    // Wrapper component to handle motion vs static div
    const MotionWrapper = isStatic ? "div" : motion.div;
    const headerAnimation = isStatic ? {} : { opacity: [1, 0.5, 1] };
    const headerTransition = isStatic ? {} : { duration: 2, repeat: Infinity };
    const mainInitial = isStatic ? {} : { scale: 0.9, opacity: 0 };
    const mainAnimate = isStatic ? {} : { scale: 1, opacity: 1 };

    return (
        // @ts-ignore
        <MotionWrapper
            initial={mainInitial}
            animate={mainAnimate}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative w-full max-w-md mx-auto font-mono overflow-hidden rounded-sm aspect-[9/16]"
            style={{
                backgroundColor: "#050505",
                color: "#22c55e",
                boxShadow: "0 0 50px rgba(0,255,0,0.1)",
                borderColor: "rgba(20, 83, 45, 0.5)",
                borderWidth: "1px",
                borderStyle: "solid",
                backgroundImage: `
                    linear-gradient(rgba(0, 255, 0, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 255, 0, 0.03) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
            }}
        >
            {/* Scanline Overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                    backgroundImage: "linear-gradient(transparent 50%, rgba(0,0,0,0.5) 50%)",
                    backgroundSize: "100% 4px",
                    opacity: 0.2
                }}
            />

            <div className="p-6 pb-12 relative z-10 h-full flex flex-col">
                {/* Header */}
                <div className="text-center pb-4 mb-4 shrink-0" style={{ borderBottom: "1px solid rgba(20, 83, 45, 0.5)" }}>
                    {/* @ts-ignore */}
                    <MotionWrapper
                        animate={headerAnimation}
                        transition={headerTransition}
                        className="flex items-center justify-center gap-2 mb-2"
                        style={{ color: "#ef4444" }}
                    >
                        <ShieldAlert className="w-4 h-4" />
                        <h1 className="text-lg font-bold tracking-widest uppercase">SYSTEM BREACH DETECTED</h1>
                        <ShieldAlert className="w-4 h-4" />
                    </MotionWrapper>

                    {targetInfo && (
                        <div className="flex flex-col items-center relative">
                            <div className="relative mb-4 group">
                                <div className="absolute inset-0 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full" style={{ backgroundColor: "#ef4444" }} />
                                <div className="w-24 h-24 rounded-full overflow-hidden relative" style={{ border: "2px solid #ef4444", boxShadow: "0 0 20px rgba(220,38,38,0.5)" }}>
                                    {targetInfo.profile_pic ? (
                                        <img
                                            src={targetInfo.profile_pic}
                                            alt="Target"
                                            crossOrigin={enableCors ? "anonymous" : undefined}
                                            className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                            }}
                                        />
                                    ) : null}
                                    <div className={`w-full h-full flex items-center justify-center ${targetInfo.profile_pic ? 'hidden' : ''}`} style={{ backgroundColor: "#000000" }}>
                                        <User className="w-12 h-12" style={{ color: "#7f1d1d" }} />
                                    </div>

                                    {/* Target Acquired Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-[90%] h-[90%] rounded-full animate-ping absolute" style={{ border: "1px solid rgba(239, 68, 68, 0.3)" }} />
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-[8px] font-black px-2 py-0.5 uppercase tracking-widest shadow-lg" style={{ backgroundColor: "#dc2626", color: "#000000" }}>
                                    TARGET ACQUIRED
                                </div>
                            </div>
                            <h2 className="text-base font-bold uppercase tracking-wider" style={{ color: "#ffffff" }}>{targetInfo.full_name}</h2>
                            <p className="text-[10px] font-bold tracking-widest" style={{ color: "#16a34a" }}>@{targetInfo.username}</p>
                        </div>
                    )}
                </div>

                {/* Score Section */}
                <div className="text-center mb-4 relative shrink-0">
                    <p className="text-[8px] uppercase font-bold mb-1 tracking-[0.2em]" style={{ color: "#15803d" }}>LOYALTY INTEGRITY SCORE</p>
                    <div className="text-5xl font-black tracking-tighter leading-none" style={{ color: isToxic ? '#ef4444' : '#22c55e', textShadow: "0 0 10px rgba(0,0,0,0.8)" }}>
                        <span className="animate-pulse">{score}</span>
                        <span className="text-xl ml-1" style={{ color: "#14532d" }}>%</span>
                    </div>
                </div>

                {/* Analysis Sections (Scrollable) */}
                <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#14532d] scrollbar-track-black space-y-4">

                    {/* General Overview */}
                    {generalOverview && (
                        <div className="p-3 rounded border border-green-900/30 bg-green-900/10">
                            <p className="text-[8px] uppercase font-bold mb-1 tracking-widest" style={{ color: "#4ade80" }}>GENERAL OVERVIEW</p>
                            <p className="text-xs leading-relaxed font-mono text-gray-300">
                                {generalOverview}
                            </p>
                        </div>
                    )}

                    {/* AI Enhanced Analysis */}
                    {aiEnhancedAnalysis && (
                        <div className="p-3 rounded border border-green-900/30 bg-green-900/10">
                            <p className="text-[8px] uppercase font-bold mb-1 tracking-widest" style={{ color: "#4ade80" }}>AI ENHANCED ANALYSIS</p>
                            <p className="text-xs leading-relaxed font-mono text-gray-300">
                                {aiEnhancedAnalysis}
                            </p>
                        </div>
                    )}

                    {/* Verdict Box */}
                    {verdictSummary && (
                        <div className="p-3 rounded relative overflow-hidden" style={{ backgroundColor: "rgba(69, 10, 10, 0.2)", border: "1px solid rgba(127, 29, 29, 0.5)" }}>
                            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: "#dc2626" }} />
                            <div className="flex items-start gap-2">
                                <Skull className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#ef4444" }} />
                                <div>
                                    <p className="text-[8px] uppercase font-bold mb-1 tracking-widest" style={{ color: "#ef4444" }}>AI FORENSIC VERDICT</p>
                                    <p className="text-xs font-bold leading-relaxed font-mono" style={{ color: "rgba(254, 226, 226, 0.9)" }}>
                                        "{verdictSummary}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Hit List */}
                    <div className="pt-2" style={{ borderTop: "1px solid rgba(20, 83, 45, 0.5)" }}>
                        <div className="flex justify-between items-center mb-2 text-[8px] font-bold uppercase tracking-widest" style={{ color: "#15803d" }}>
                            <span>DETECTED THREATS</span>
                            <span>STATUS: ACTIVE</span>
                        </div>

                        <div className="space-y-2 font-mono text-[10px]">
                            {suspects.length > 0 ? (
                                suspects.map((suspect, index) => (
                                    <div key={index} className="flex flex-col gap-0.5 group">
                                        <div className="flex items-center gap-1" style={{ color: "#4ade80" }}>
                                            <span style={{ color: "#166534" }}>{">"}</span>
                                            <span className="font-bold transition-colors">@{suspect.username}</span>
                                        </div>
                                        <div className="pl-4 text-[8px] uppercase tracking-tight" style={{ color: "rgba(22, 163, 74, 0.8)" }}>
                                            [REASON: <span style={{ color: "#f87171" }}>{suspect.reason}</span>]
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-[10px] py-2" style={{ color: "#166534" }}>NO ANOMALIES DETECTED IN NETWORK.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 text-center space-y-1 opacity-50 shrink-0" style={{ borderTop: "1px solid rgba(20, 83, 45, 0.5)" }}>
                    <Barcode className="w-full h-6" style={{ color: "#166534" }} />
                    <p className="text-[6px] uppercase tracking-[0.3em]" style={{ color: "#166534" }}>ENCRYPTED // CAUGHTIN4K.AI // DO NOT DISTRIBUTE</p>
                </div>
            </div>
        </MotionWrapper>
    );
}
