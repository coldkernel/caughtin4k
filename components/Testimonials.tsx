"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
    {
        name: "Sarah",
        location: "NYC",
        text: "My gut said yes, this AI said YES in 4k. Broke up immediately. Best $10 I ever spent."
    },
    {
        name: "Jessica",
        location: "LA",
        text: "Found out he had a whole separate folder for 'Gym Progress' that was just thirst traps. COOKED."
    },
    {
        name: "Emily",
        location: "Miami",
        text: "The location matching feature is scary accurate. Caught him at the club when he said he was sleeping."
    },
    {
        name: "Alex",
        location: "Chicago",
        text: "I thought I was crazy. Turns out I was right. Thank you for the receipts."
    },
    {
        name: "Chloe",
        location: "London",
        text: "Literally analyzed 3 years of likes in seconds. The pattern was undeniable."
    }
];

export function Testimonials() {
    return (
        <section className="py-24 bg-black border-t border-gray-900 overflow-hidden">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4">
                    DON'T TAKE OUR WORD. <span className="text-neon-red">ASK THEM.</span>
                </h2>
            </div>

            <div className="relative w-full">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

                <motion.div
                    className="flex gap-6 px-6 w-max"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear"
                    }}
                >
                    {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                        <div
                            key={i}
                            className="w-96 bg-gray-900/20 border border-gray-800 p-8 rounded-xl backdrop-blur-sm flex-shrink-0"
                        >
                            <p className="text-gray-300 mb-6 font-mono text-sm leading-relaxed">
                                "{t.text}"
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-neon-red/20 flex items-center justify-center text-neon-red font-bold">
                                    {t.name[0]}
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">{t.name}</p>
                                    <p className="text-gray-600 text-xs uppercase tracking-wider">{t.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
