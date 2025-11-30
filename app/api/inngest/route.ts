import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { processVideo } from "@/inngest/functions";

// Create an API that serves zero-latency functions
export const GET = serve({
    client: inngest,
    functions: [processVideo],
});

export const POST = serve({
    client: inngest,
    functions: [processVideo],
});
