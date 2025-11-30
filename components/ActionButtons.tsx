"use client";

import { Download, Instagram } from "lucide-react";
import { toBlob } from "html-to-image";
import { useState } from "react";

interface ActionButtonsProps {
    targetId: string;
}

export function ActionButtons({ targetId }: ActionButtonsProps) {
    const [isExporting, setIsExporting] = useState(false);

    const handleDownload = async (shareToStory = false) => {
        setIsExporting(true);
        try {
            const element = document.getElementById(targetId);
            if (!element) throw new Error("Capture element not found");

            // Wait a moment to ensure all assets are ready
            await new Promise(resolve => setTimeout(resolve, 500));

            const blob = await toBlob(element, {
                cacheBust: true,
                width: 1080,
                height: 1920,
                backgroundColor: "#000000",
                style: {
                    transform: "scale(1)", // Reset any transforms
                    transformOrigin: "top left",
                    visibility: "visible", // Ensure visibility
                    position: "static" // Reset positioning for capture
                }
            });

            if (!blob) {
                throw new Error("Generated image is empty.");
            }

            const url = URL.createObjectURL(blob);

            // Create download link
            const link = document.createElement("a");
            link.href = url;
            link.download = `caught-in-4k-proof.png`; // Fixed name to ensure extension
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Cleanup
            setTimeout(() => URL.revokeObjectURL(url), 100);

            if (shareToStory) {
                alert("Image Saved! Opening Instagram...");
                setTimeout(() => {
                    window.location.href = "instagram://story-camera";
                }, 1000);
            }

        } catch (error: any) {
            console.error("Export failed:", error);
            alert(`Failed to export image: ${error.message || "Unknown error"}`);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto mt-8">
            <button
                onClick={() => handleDownload(false)}
                disabled={isExporting}
                className="flex-1 bg-zinc-800 text-white font-mono font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-700 transition-colors uppercase disabled:opacity-50"
            >
                <Download className="w-5 h-5" />
                {isExporting ? "SAVING..." : "SAVE TO GALLERY"}
            </button>

            <button
                onClick={() => handleDownload(true)}
                disabled={isExporting}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-mono font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity uppercase shadow-[0_0_20px_rgba(219,39,119,0.4)] disabled:opacity-50"
            >
                <Instagram className="w-5 h-5" />
                {isExporting ? "PREPARING..." : "SHARE TO STORY"}
            </button>
        </div>
    );
}
