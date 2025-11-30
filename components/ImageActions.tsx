"use client";

import { Download, Instagram } from "lucide-react";
import { motion } from "framer-motion";

interface ImageActionsProps {
    imageUrl: string;
}

export function ImageActions({ imageUrl }: ImageActionsProps) {
    const handleDownload = async () => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "caught-in-4k-receipt.png";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error("Download failed:", error);
            alert("Failed to download image. Please try again.");
        }
    };

    const handleShare = () => {
        alert("NOTE: Download the image first, then select it in Instagram Stories.");
        window.location.href = "instagram://story-camera";
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-md mx-auto mt-6">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className="flex-1 bg-zinc-800 text-white font-mono font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-700 transition-colors uppercase"
            >
                <Download className="w-5 h-5" />
                Download Image
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="flex-1 bg-red-600 text-white font-mono font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-red-700 transition-colors uppercase shadow-[0_0_20px_rgba(220,38,38,0.4)]"
            >
                <Instagram className="w-5 h-5" />
                Share on IG Story
            </motion.button>
        </div>
    );
}
