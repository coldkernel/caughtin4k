"use client";

export function Hero() {
    return (
        <div className="text-center space-y-4 mb-12 relative z-20">
            <div className="relative inline-block">
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-neon-red animate-glitch relative z-10">
                    CAUGHT IN 4K
                </h1>
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-cyan-500 absolute top-0 left-0 opacity-70 animate-pulse mix-blend-screen translate-x-1">
                    CAUGHT IN 4K
                </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-400 font-mono tracking-widest uppercase">
                THE AI VIBE CHECK. <span className="text-white animate-pulse">DROP THE RECEIPTS.</span> SEE IF HE'S COOKED.
            </p>
        </div>
    );
}
