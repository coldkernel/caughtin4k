import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    scans: defineTable({
        storageId: v.optional(v.string()),
        type: v.optional(v.string()), // "file" or "profile"
        username: v.optional(v.string()),
        gender: v.optional(v.string()),
        context: v.optional(v.string()),
        status: v.string(), // "pending", "completed", "failed"
        score: v.number(),
        createdAt: v.number(),
        target_info: v.optional(
            v.object({
                username: v.string(),
                full_name: v.string(),
                profile_pic: v.string(),
            })
        ),
        suspects: v.optional(
            v.array(
                v.object({
                    username: v.string(),
                    reason: v.string(),
                    profile_pic_url: v.optional(v.string()),
                })
            )
        ),
        analysisResult: v.optional(
            v.object({
                verdict: v.string(),
                roast: v.optional(v.string()),
                flags: v.optional(v.array(v.string())),
            })
        ),
    }),
});
