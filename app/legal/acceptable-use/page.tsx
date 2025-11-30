import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AcceptableUse() {
    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-sans flex flex-col">
            <Navbar />
            <main className="flex-grow max-w-4xl mx-auto px-6 py-32">
                <h1 className="text-4xl md:text-5xl font-mono font-bold text-white mb-8">Acceptable Use Policy</h1>

                <div className="space-y-6">
                    <p>Last Updated: November 26, 2025</p>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-mono text-white">1. Overview</h2>
                        <p>
                            This Acceptable Use Policy outlines the prohibited uses of the Caught in 4k service. We reserve the right to suspend or terminate accounts that violate this policy.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-mono text-white">2. Prohibited Content</h2>
                        <p>
                            You may not upload or transmit content that:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Is illegal, violent, or promotes hate speech</li>
                            <li>Infringes on the intellectual property rights of others</li>
                            <li>Contains malware, viruses, or malicious code</li>
                            <li>Depicts non-consensual sexual content</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-mono text-white">3. Prohibited Actions</h2>
                        <p>
                            You may not:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Attempt to reverse engineer or hack the service</li>
                            <li>Use the service to harass, bully, or intimidate others</li>
                            <li>Automate access to the service (scraping, bots) without permission</li>
                        </ul>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
