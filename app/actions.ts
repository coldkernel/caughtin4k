"use server";

import { inngest } from "@/inngest/client";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function triggerScan(scanId: string) {
    await inngest.send({
        name: "analysis.submitted",
        data: { scanId },
    });
}

export async function startPublicScan(data: { target_username: string; target_gender: "male" | "female" }) {
    console.log("🚀 Sending request to Python...", data);
    try {
        const response = await fetch("http://127.0.0.1:8000/scan", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            cache: "no-store", // Ensure no caching
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Microservice error (${response.status}):`, errorText);
            try {
                const errorJson = JSON.parse(errorText);
                return { success: false, error: errorJson.detail || response.statusText };
            } catch {
                return { success: false, error: `Microservice Error: ${response.statusText}` };
            }
        }

        const result = await response.json();
        console.log("✅ Python response received:", result.status);

        // Save to Convex
        try {
            await convex.mutation(api.scans.savePublicScan, {
                target_username: data.target_username,
                target_gender: data.target_gender,
                score: result.loyalty_score,
                verdict: result.verdict,
                target_info: result.target_info,
                suspects: result.suspects,
            });
            console.log("✅ Scan saved to Convex DB");
        } catch (dbError) {
            console.error("Failed to save scan to DB:", dbError);
            // Don't fail the request if DB save fails, just log it
        }

        return { success: true, data: result };
    } catch (error) {
        console.error("Public scan failed:", error);
        return { success: false, error: "Connection Refused. Is Python running? (Check port 8000)" };
    }
}
