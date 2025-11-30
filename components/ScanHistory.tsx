"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Eye, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { ReceiptCard } from "./ReceiptCard";
import { useState } from "react";
import { X } from "lucide-react";

export function ScanHistory() {
    const scans = useQuery(api.scans.getUserScans);
    const [selectedScan, setSelectedScan] = useState<any>(null);

    if (scans === undefined) {
        return <div className="text-neon-red animate-pulse font-mono text-center mt-10">LOADING ENCRYPTED ARCHIVES...</div>;
    }

    if (scans === null || scans.length === 0) {
        return (
            <div className="text-center mt-10 font-mono text-gray-500">
                <p>NO CASE FILES FOUND.</p>
                <p className="text-xs mt-2">START A NEW INVESTIGATION TO POPULATE DATABASE.</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto font-mono">
            <h2 className="text-2xl font-bold text-neon-red mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                CASE FILES ARCHIVE
            </h2>

            <div className="border border-neon-red/30 rounded-lg overflow-hidden bg-black/50 backdrop-blur-sm">
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-neon-red/30 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <div className="col-span-3">Date</div>
                    <div className="col-span-4">Target</div>
                    <div className="col-span-2 text-center">Score</div>
                    <div className="col-span-3 text-right">Action</div>
                </div>

                <div className="divide-y divide-neon-red/10">
                    {scans.map((scan) => (
                        <motion.div
                            key={scan._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-neon-red/5 transition-colors group"
                        >
                            <div className="col-span-3 text-xs text-gray-400">
                                {new Date(scan.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                }).toUpperCase()}
                            </div>

                            <div className="col-span-4 flex items-center gap-2">
                                {scan.target_info?.profile_pic && (
                                    <img
                                        src={scan.target_info.profile_pic}
                                        alt="avatar"
                                        className="w-6 h-6 rounded-full grayscale group-hover:grayscale-0 transition-all"
                                    />
                                )}
                                <span className="text-white font-bold truncate">
                                    @{scan.username || "UNKNOWN"}
                                </span>
                            </div>

                            <div className="col-span-2 flex justify-center">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${scan.score < 50
                                        ? "bg-red-900/30 text-red-500 border border-red-500/30"
                                        : "bg-green-900/30 text-green-500 border border-green-500/30"
                                    }`}>
                                    {scan.score}%
                                </span>
                            </div>

                            <div className="col-span-3 text-right">
                                <button
                                    onClick={() => setSelectedScan(scan)}
                                    className="text-xs bg-neon-red/10 hover:bg-neon-red text-neon-red hover:text-black px-3 py-1.5 rounded transition-all flex items-center gap-1 ml-auto"
                                >
                                    <Eye className="w-3 h-3" />
                                    VIEW REPORT
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal for Report View */}
            {selectedScan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
                    <div className="relative w-full max-w-md">
                        <button
                            onClick={() => setSelectedScan(null)}
                            className="absolute -top-12 right-0 text-white hover:text-neon-red transition-colors"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <ReceiptCard
                            score={selectedScan.score}
                            verdictSummary={selectedScan.analysisResult?.verdict || "NO VERDICT"}
                            targetInfo={selectedScan.target_info}
                            suspects={selectedScan.suspects}
                            isStatic={true}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
