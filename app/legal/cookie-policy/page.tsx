import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CookiePolicy() {
    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-sans flex flex-col">
            <Navbar />
            <main className="flex-grow max-w-4xl mx-auto px-6 py-32">
                <h1 className="text-4xl md:text-5xl font-mono font-bold text-white mb-8">Cookie Policy</h1>

                <div className="space-y-6">
                    <p>Last Updated: November 26, 2025</p>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-mono text-white">1. What Are Cookies?</h2>
                        <p>
                            Cookies are small text files that are stored on your device when you visit a website. They help us recognize you and improve your experience.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-mono text-white">2. How We Use Cookies</h2>
                        <p>
                            We use cookies for the following purposes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Essential Cookies:</strong> Necessary for the website to function (e.g., authentication).</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our service.</li>
                            <li><strong>Functionality Cookies:</strong> Remember your preferences and settings.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-mono text-white">3. Managing Cookies</h2>
                        <p>
                            You can control and manage cookies through your browser settings. However, disabling certain cookies may affect the functionality of our service.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
