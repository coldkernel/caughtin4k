"use client";

import { motion } from "framer-motion";
import { Users, Heart, Ghost, Clock, MessageCircle, MapPin } from "lucide-react";

const FEATURES = [
    {
        icon: Users,
        title: "THE FOLLOW LIST",
        desc: "We cross-reference his following list with known OF models, influencers, and local 'baddies'."
    },
    {
        icon: Heart,
        title: "THE LIKER BOT",
        desc: "Analyzes his like history to find patterns. Does he like every bikini pic? We'll know."
    },
    {
        icon: Ghost,
        title: "GHOST FOLLOWERS",
        desc: "Identifies accounts that he follows but don't follow back. High suspicion rating."
    },
    {
        icon: Clock,
        title: "TIME STAMPS",
        desc: "Correlates his 'Goodnight' texts with his actual activity status on other apps."
    },
    {
        icon: MessageCircle,
        title: "DM SLIDE DETECTOR",
        desc: "Scans for common pickup lines and emoji usage patterns in recovered messages."
    },
    {
        icon: MapPin,
        title: "LOCATION MISMATCH",
        desc: "Verifies if his tagged locations match where he said he was."
    }
];

export function FeatureGrid() {
    return (
        <section className="py-24 px-6 bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
                        WE SEE WHAT <span className="text-neon-red">YOU MISS.</span>
                    </h2>
                    <p className="text-gray-500 font-mono uppercase tracking-widest">
                        Advanced Pattern Recognition Protocol
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURES.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gray-900/30 border border-gray-800 p-8 rounded-xl hover:border-neon-red/50 hover:bg-gray-900/50 transition-all group"
                        >
                            <feature.icon className="w-10 h-10 text-gray-600 group-hover:text-neon-red transition-colors mb-6" />
                            <h3 className="text-xl font-bold text-white mb-3 font-mono">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
