"use client";

import { useState } from "react";
import { Upload, FileVideo, AlertCircle } from "lucide-react";

interface UploadZoneProps {
    onUpload?: (result: any) => void;
    isScanning?: boolean;
}

export default function UploadZone({ onUpload, isScanning }: UploadZoneProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
    const [selectedGender, setSelectedGender] = useState<"male" | "female">("male");

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setUploadStatus("uploading");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("target_gender", selectedGender);

        try {
            const res = await fetch("http://localhost:8000/analyze-video", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error(`Analysis failed: ${res.statusText}`);
            }

            const result = await res.json();
            console.log("✅ Video Analysis Result:", result);

            setUploadStatus("success");
            if (onUpload) onUpload(result);

        } catch (error) {
            console.error("Upload failed:", error);
            setUploadStatus("error");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Gender Toggle for Video Analysis */}
            <div className="flex justify-center mb-6 gap-4">
                <button
                    onClick={() => setSelectedGender("male")}
                    className={`px-6 py-2 rounded-full font-bold text-sm tracking-widest transition-all ${selectedGender === "male"
                            ? "bg-neon-red text-black shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                            : "bg-white/5 text-gray-500 hover:text-white border border-white/10"
                        }`}
                >
                    HIM
                </button>
                <button
                    onClick={() => setSelectedGender("female")}
                    className={`px-6 py-2 rounded-full font-bold text-sm tracking-widest transition-all ${selectedGender === "female"
                            ? "bg-neon-red text-black shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                            : "bg-white/5 text-gray-500 hover:text-white border border-white/10"
                        }`}
                >
                    HER
                </button>
            </div>

            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-neon-red/50 bg-black/50 text-neon-red font-mono rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.1)] relative overflow-hidden group hover:border-neon-red transition-colors">
                <div className="absolute inset-0 bg-[url('/grid.png')] opacity-10 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    {uploadStatus === "idle" && (
                        <>
                            <Upload className="w-12 h-12 mb-4 animate-bounce" />
                            <h2 className="text-xl font-bold mb-2 uppercase tracking-widest">
                                UPLOAD SCREEN RECORDING
                            </h2>
                            <p className="text-xs text-gray-500 max-w-xs mb-6">
                                Upload a screen recording of their following list. We will extract usernames and analyze them.
                            </p>
                            <span className="text-xs bg-neon-red/10 px-3 py-1 rounded text-neon-red border border-neon-red/20">
                                SUPPORTS MP4, MOV
                            </span>
                        </>
                    )}

                    {uploadStatus === "uploading" && (
                        <>
                            <FileVideo className="w-12 h-12 mb-4 animate-pulse" />
                            <h2 className="text-xl font-bold mb-2 uppercase tracking-widest animate-pulse">
                                EXTRACTING USERNAMES...
                            </h2>
                            <p className="text-xs text-gray-500">
                                Running OCR & AI Analysis. This may take a minute.
                            </p>
                        </>
                    )}

                    {uploadStatus === "success" && (
                        <>
                            <div className="w-12 h-12 mb-4 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500">
                                <Upload className="w-6 h-6 text-green-500" />
                            </div>
                            <h2 className="text-xl font-bold mb-2 uppercase tracking-widest text-green-500">
                                ANALYSIS COMPLETE
                            </h2>
                        </>
                    )}

                    {uploadStatus === "error" && (
                        <>
                            <AlertCircle className="w-12 h-12 mb-4 text-red-600" />
                            <h2 className="text-xl font-bold mb-2 uppercase tracking-widest text-red-600">
                                ANALYSIS FAILED
                            </h2>
                            <p className="text-xs text-red-400">
                                Could not process video. Try a shorter clip.
                            </p>
                        </>
                    )}
                </div>

                <input
                    type="file"
                    accept="video/*"
                    onChange={handleUpload}
                    disabled={isUploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
            </div>
        </div>
    );
}
