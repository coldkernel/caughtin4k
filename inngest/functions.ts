import { inngest } from "./client";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import OpenAI from "openai";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";
import os from "os";
import { Id } from "@/convex/_generated/dataModel";

// Initialize clients
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const processVideo = inngest.createFunction(
    { id: "process-video" },
    { event: "scan.started" },
    async ({ event, step }) => {
        const { scanId, videoUrl, storageId } = event.data as {
            scanId: Id<"scans">;
            videoUrl?: string;
            storageId?: string
        };

        // Step 1: Extract Frames
        const frames = await step.run("extract-frames", async () => {
            let url = videoUrl;
            if (!url && storageId) {
                url = await convex.query(api.scans.getDownloadUrl, { storageId: storageId as any }) || undefined;
            }

            if (!url) return [];

            // Download video to temp file
            const tmpDir = os.tmpdir();
            const inputPath = path.join(tmpDir, `input-${scanId}.mp4`);

            // Fetch video
            const response = await fetch(url);
            const buffer = await response.arrayBuffer();
            fs.writeFileSync(inputPath, Buffer.from(buffer));

            // Extract 3 frames
            const framePaths: string[] = [];
            const timestamps = ["10%", "50%", "90%"];

            try {
                for (let i = 0; i < timestamps.length; i++) {
                    const ts = timestamps[i];
                    const outputPath = path.join(tmpDir, `frame-${scanId}-${i}.jpg`);

                    await new Promise<void>((resolve, reject) => {
                        ffmpeg(inputPath)
                            .screenshots({
                                timestamps: [ts],
                                filename: `frame-${scanId}-${i}.jpg`,
                                folder: tmpDir,
                                size: "1280x720"
                            })
                            .on("end", () => {
                                framePaths.push(outputPath);
                                resolve();
                            })
                            .on("error", (err: any) => {
                                console.error(`Error extracting frame at ${ts}:`, err);
                                reject(err);
                            });
                    });
                }

                // Read frames as base64
                const base64Frames = framePaths.map((p) => {
                    if (fs.existsSync(p)) {
                        const data = fs.readFileSync(p);
                        fs.unlinkSync(p); // Clean up frame file
                        return data.toString("base64");
                    }
                    return null;
                }).filter(Boolean) as string[];

                return base64Frames;
            } finally {
                // Clean up video file
                if (fs.existsSync(inputPath)) {
                    fs.unlinkSync(inputPath);
                }
            }
        });

        // Step 2: OpenAI Analysis
        const result = await step.run("analyze-content", async () => {
            if (frames.length === 0) return { score: 0, verdict: "No video content", roast: "Did you upload a ghost?", flags: ["No video content found"] };

            const response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content: "You are an AI Loyalty Auditor. Analyze these frames from a screen recording for evidence of cheating, toxic behavior, or red flags in a relationship context. Look for dating apps, suspicious DMs, hidden folders, or location mismatches. Return a JSON object with: 'score' (0-100, where 100 is perfectly loyal/clean and 0 is toxic/cheating), 'verdict' (short summary), 'roast' (sarcastic comment), and 'flags' (list of strings). Be aggressive and use Gen Z slang."
                    },
                    {
                        role: "user",
                        content: frames.map(f => ({
                            type: "image_url",
                            image_url: { url: `data:image/jpeg;base64,${f}` }
                        })) as any
                    }
                ],
                response_format: { type: "json_object" }
            });

            const content = response.choices[0].message.content;
            return JSON.parse(content || "{}");
        });

        // Step 3: Update Convex
        await step.run("update-result", async () => {
            await convex.mutation(api.scans.updateScanResult, {
                id: scanId,
                score: result.score || 50,
                status: "completed",
                analysisResult: {
                    verdict: result.verdict || "Analysis failed",
                    roast: result.roast || "Something went wrong",
                    flags: result.flags || ["Analysis failed"],
                }
            });
        });

        return { success: true, scanId };
    }
);
