"use client";

import { useState, useEffect } from "react";
import { PublicInput } from "@/components/PublicInput";
import UploadZone from "@/components/UploadZone";
import { Ticker } from "@/components/Ticker";
import { ReceiptCard } from "@/components/ReceiptCard";
import { motion, AnimatePresence } from "framer-motion";
import { startPublicScan } from "@/app/actions";
import { ScanSelector } from "@/components/ScanSelector";
import { StoryExport } from "@/components/StoryExport";
import { ActionButtons } from "@/components/ActionButtons";
import { ScanHistory } from "@/components/ScanHistory";
import { UserProfile } from "@/components/UserProfile";
import { Search, FolderOpen, UserCircle } from "lucide-react";

type AppState = "idle" | "scanning" | "result";
type ScanMethod = "public" | "private";
type ActiveTab = "scan" | "history" | "account";

export default function Dashboard() {
    const [status, setStatus] = useState<AppState>("idle");
    const [scanMethod, setScanMethod] = useState<ScanMethod>("public");
    const [activeTab, setActiveTab] = useState<ActiveTab>("scan");
    const [logs, setLogs] = useState<string[]>([]);
    const [result, setResult] = useState<{ score: number; redFlags: string[]; targetInfo?: any; suspects?: any[]; verdictSummary?: string; generalOverview?: string; aiEnhancedAnalysis?: string } | null>(null);

    const handlePublicScan = async (data: { username: string; gender: "male" | "female"; context: string }) => {
        console.log("🖱️ Expose Them Now clicked", data);
        setStatus("scanning");
        setLogs([]); // Clear previous logs

        // Dynamic Scanning Text Logic
        const maleLogs = [
            "🔍 STALKING HIS FOLLOWING LIST...",
            "🚩 CHECKING FOR BADDIES...",
            "💅 ANALYZING HIS TASTE IN WOMEN...",
            "💀 CALCULATING LOYALTY SCORE..."
        ];

        const femaleLogs = [
            "🔍 STALKING HER FOLLOWING LIST...",
            "🚩 CHECKING FOR SIMPS & EXES...",
            "🧢 ANALYZING HER ATTENTION SEEKING...",
            "💀 CALCULATING LOYALTY SCORE..."
        ];

        const sequence = data.gender === "male" ? maleLogs : femaleLogs;

        // Start log sequence
        let logIndex = 0;
        const logInterval = setInterval(() => {
            if (logIndex < sequence.length) {
                setLogs(prev => [...prev, sequence[logIndex]]);
                logIndex++;
            } else {
                clearInterval(logInterval);
            }
        }, 800);

        try {
            const scanResult = await startPublicScan({
                target_username: data.username,
                target_gender: data.gender,
            });

            if (scanResult.success) {
                // Wait for the log sequence to finish mostly before showing result
                setTimeout(() => {
                    setResult({
                        score: scanResult.data.loyalty_score,
                        redFlags: [], // Deprecated in favor of suspects list
                        targetInfo: scanResult.data.target_info,
                        suspects: scanResult.data.suspects,
                        verdictSummary: scanResult.data.verdict,
                        generalOverview: scanResult.data.general_overview,
                        aiEnhancedAnalysis: scanResult.data.ai_enhanced_analysis
                    });
                    setStatus("result");
                }, sequence.length * 800 + 1000);

            } else {
                console.error("Scan failed:", scanResult.error);
                alert(`Scan Failed: ${scanResult.error}`);
                setLogs(prev => [...prev, `ERROR: ${scanResult.error || "TARGET NOT FOUND OR PRIVATE"}`]);
                setTimeout(() => setStatus("idle"), 3000);
            }
        } catch (error) {
            console.error("Scan failed:", error);
            alert("System Failure: See console for details");
            setLogs(prev => [...prev, "SYSTEM FAILURE"]);
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    const handleUploadScan = (result: any) => {
        setStatus("result");
        setResult({
            score: result.loyalty_score,
            redFlags: [],
            targetInfo: result.target_info,
            suspects: result.suspects,
            verdictSummary: result.verdict,
            generalOverview: result.general_overview,
            aiEnhancedAnalysis: result.ai_enhanced_analysis
        });
    };

    const reset = () => {
        setStatus("idle");
        setLogs([]);
        setResult(null);
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-black text-white relative overflow-hidden">
            {/* Sidebar / Topbar */}
            <nav className="w-full md:w-64 md:h-screen bg-black border-b md:border-b-0 md:border-r border-neon-red/30 p-4 z-20 flex md:flex-col justify-between items-center md:items-stretch sticky top-0 md:fixed">
                <div className="hidden md:block mb-8">
                    <h1 className="text-2xl font-black tracking-tighter text-neon-red animate-glitch">
                        CAUGHT IN 4K
                    </h1>
                    <p className="text-[10px] text-gray-500 font-mono tracking-widest">FORENSIC AI TOOL</p>
                </div>

                <div className="flex md:flex-col gap-2 w-full md:w-auto justify-around md:justify-start">
                    <button
                        onClick={() => setActiveTab("scan")}
                        className={`flex flex-col md:flex-row items-center gap-2 p-3 rounded-lg transition-all font-mono text-xs md:text-sm ${activeTab === "scan" ? "bg-neon-red text-black font-bold shadow-[0_0_15px_rgba(220,38,38,0.5)]" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                    >
                        <Search className="w-5 h-5" />
                        <span className="hidden md:inline">NEW INVESTIGATION</span>
                        <span className="md:hidden">SCAN</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("history")}
                        className={`flex flex-col md:flex-row items-center gap-2 p-3 rounded-lg transition-all font-mono text-xs md:text-sm ${activeTab === "history" ? "bg-neon-red text-black font-bold shadow-[0_0_15px_rgba(220,38,38,0.5)]" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                    >
                        <FolderOpen className="w-5 h-5" />
                        <span className="hidden md:inline">CASE FILES</span>
                        <span className="md:hidden">HISTORY</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("account")}
                        className={`flex flex-col md:flex-row items-center gap-2 p-3 rounded-lg transition-all font-mono text-xs md:text-sm ${activeTab === "account" ? "bg-neon-red text-black font-bold shadow-[0_0_15px_rgba(220,38,38,0.5)]" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                    >
                        <UserCircle className="w-5 h-5" />
                        <span className="hidden md:inline">AGENT PROFILE</span>
                        <span className="md:hidden">PROFILE</span>
                    </button>
                </div>

                <div className="hidden md:block mt-auto pt-4 border-t border-neon-red/20">
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        SYSTEM ONLINE
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 pt-24 md:pt-8 min-h-screen relative">
                <div className="max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        {activeTab === "scan" && (
                            <motion.div
                                key="scan"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="text-center mb-12">
                                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-2">
                                        INITIATE SCAN
                                    </h1>
                                    <p className="text-gray-400 font-mono tracking-widest text-sm uppercase">
                                        SELECT YOUR INVESTIGATION METHOD
                                    </p>
                                </div>

                                <div className="min-h-[400px] flex flex-col items-center justify-start">
                                    <AnimatePresence mode="wait">
                                        {status === "idle" && (
                                            <motion.div
                                                key="idle"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                className="w-full flex flex-col items-center"
                                            >
                                                <ScanSelector method={scanMethod} setMethod={setScanMethod} />

                                                <div className="w-full mt-8">
                                                    {scanMethod === "public" ? (
                                                        <PublicInput onScan={handlePublicScan} isLoading={false} />
                                                    ) : (
                                                        <UploadZone onUpload={handleUploadScan} isScanning={false} />
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}

                                        {status === "scanning" && (
                                            <motion.div
                                                key="scanning"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="w-full max-w-2xl font-mono text-neon-red bg-black/80 p-6 rounded-xl border border-neon-red/30 shadow-[0_0_30px_rgba(220,38,38,0.2)]"
                                            >
                                                <div className="h-64 overflow-y-auto space-y-2">
                                                    {logs.map((log, i) => (
                                                        <p key={i} className="text-sm md:text-base animate-pulse">
                                                            {">"} {log}
                                                        </p>
                                                    ))}
                                                    <div className="w-3 h-5 bg-neon-red inline-block animate-pulse" />
                                                </div>
                                            </motion.div>
                                        )}

                                        {status === "result" && result && (
                                            <motion.div
                                                key="result"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="w-full"
                                            >
                                                <ReceiptCard
                                                    score={result.score}
                                                    verdictSummary={result.verdictSummary}
                                                    generalOverview={result.generalOverview}
                                                    aiEnhancedAnalysis={result.aiEnhancedAnalysis}
                                                    targetInfo={result.targetInfo}
                                                    suspects={result.suspects}
                                                />

                                                <ActionButtons targetId="story-capture-zone" />
                                                <StoryExport data={result} id="story-capture-zone" />

                                                <div className="text-center mt-12">
                                                    <button
                                                        onClick={reset}
                                                        className="text-gray-500 hover:text-white font-mono text-sm underline decoration-dotted underline-offset-4 transition-colors"
                                                    >
                                                        [ START NEW INVESTIGATION ]
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "history" && (
                            <motion.div
                                key="history"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ScanHistory />
                            </motion.div>
                        )}

                        {activeTab === "account" && (
                            <motion.div
                                key="account"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <UserProfile />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 w-full z-50 pointer-events-none md:hidden">
                <Ticker />
            </div>
            <div className="hidden md:block fixed bottom-0 right-0 w-[calc(100%-16rem)] z-50 pointer-events-none">
                <Ticker />
            </div>
        </div>
    );
}
