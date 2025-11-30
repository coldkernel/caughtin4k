import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const createScan = mutation({
    args: {
        storageId: v.optional(v.string()),
        type: v.optional(v.string()),
        username: v.optional(v.string()),
        gender: v.optional(v.string()),
        context: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const id = await ctx.db.insert("scans", {
            storageId: args.storageId,
            type: args.type,
            username: args.username,
            gender: args.gender,
            context: args.context,
            status: "pending",
            score: 0,
            createdAt: Date.now(),
        });
        return id;
    },
});

export const getDownloadUrl = query({
    args: { storageId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.storage.getUrl(args.storageId);
    },
});

export const updateScanResult = mutation({
    args: {
        id: v.id("scans"),
        score: v.number(),
        status: v.string(),
        analysisResult: v.object({
            verdict: v.string(),
            roast: v.string(),
            flags: v.array(v.string()),
        }),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        await ctx.db.patch(id, updates);
    },
});

export const savePublicScan = mutation({
    args: {
        target_username: v.string(),
        target_gender: v.string(),
        score: v.number(),
        verdict: v.string(),
        target_info: v.object({
            username: v.string(),
            full_name: v.string(),
            profile_pic: v.string(),
        }),
        suspects: v.array(
            v.object({
                username: v.string(),
                reason: v.string(),
                profile_pic_url: v.optional(v.string()),
            })
        ),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("scans", {
            type: "profile",
            username: args.target_username,
            gender: args.target_gender,
            status: "completed",
            score: args.score,
            createdAt: Date.now(),
            target_info: args.target_info,
            suspects: args.suspects,
            analysisResult: {
                verdict: args.verdict,
            },
        });
    },
});

export const getUserScans = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("scans").order("desc").collect();
    },
});
