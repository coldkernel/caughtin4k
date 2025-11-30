"use client";

import { ReceiptCard, TargetInfo, Threat } from "./ReceiptCard";

interface StoryExportProps {
    data: {
        score: number;
        verdictSummary?: string;
        generalOverview?: string;
        aiEnhancedAnalysis?: string;
        targetInfo?: TargetInfo;
        suspects?: Threat[];
    };
    id: string;
}

export function StoryExport({ data, id }: StoryExportProps) {
    // Prepare data with proxied images
    const proxiedTargetInfo = data.targetInfo ? {
        ...data.targetInfo,
        profile_pic: data.targetInfo.profile_pic?.startsWith("http")
            ? `/api/proxy-image?url=${encodeURIComponent(data.targetInfo.profile_pic)}`
            : data.targetInfo.profile_pic
    } : undefined;

    const proxiedSuspects = data.suspects?.map(s => ({
        ...s,
        profile_pic_url: s.profile_pic_url?.startsWith("http")
            ? `/api/proxy-image?url=${encodeURIComponent(s.profile_pic_url)}`
            : s.profile_pic_url
    }));

    return (
        <div style={{ position: "fixed", top: "0", left: "-10000px" }}>
            <div
                id={id}
                style={{
                    width: "1080px",
                    height: "1920px",
                    backgroundColor: "#000000",
                    backgroundImage: `
                        linear-gradient(rgba(0, 255, 0, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 255, 0, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "120px 60px",
                    fontFamily: "monospace",
                }}
            >
                {/* Header Logo */}
                <div className="text-center">
                    <h1 className="text-8xl font-black tracking-tighter drop-shadow-[0_0_30px_rgba(220,38,38,0.8)] animate-pulse" style={{ color: "#dc2626" }}>
                        CAUGHT IN 4K
                    </h1>
                    <p className="text-2xl tracking-[0.5em] mt-4 uppercase" style={{ color: "#16a34a" }}>
                        AI FORENSIC AUDIT
                    </p>
                </div>

                {/* Main Content - Scaled Receipt */}
                <div className="w-full transform scale-125 origin-center my-10">
                    <ReceiptCard
                        score={data.score}
                        verdictSummary={data.verdictSummary}
                        generalOverview={data.generalOverview}
                        aiEnhancedAnalysis={data.aiEnhancedAnalysis}
                        targetInfo={proxiedTargetInfo}
                        suspects={proxiedSuspects}
                        enableCors={true}
                        isStatic={true}
                    />
                </div>

                {/* Footer Marketing */}
                <div className="text-center space-y-4">
                    <p className="text-3xl font-bold uppercase tracking-widest" style={{ color: "#ffffff" }}>
                        SCAN YOUR PARTNER AT
                    </p>
                    <div className="text-4xl font-black py-4 px-12 rounded-full inline-block transform -rotate-2" style={{ backgroundColor: "#dc2626", color: "#000000" }}>
                        CAUGHTIN4K.AI
                    </div>
                </div>
            </div>
        </div>
    );
}
