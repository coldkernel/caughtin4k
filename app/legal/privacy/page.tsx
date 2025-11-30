import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-sans flex flex-col">
            <Navbar />
            <main className="flex-grow max-w-4xl mx-auto px-6 py-32">
                <h1 className="text-4xl md:text-5xl font-mono font-bold text-white mb-8">Privacy Policy</h1>

                <div className="space-y-6">
                    <p>Last Updated: November 26, 2025</p>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-mono text-white">1. Introduction</h2>
                        <p>
                            Welcome to Caught in 4k ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you understand how your information is used. This Privacy Policy explains how we collect, use, and share information when you use our services.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-mono text-white">2. Information We Collect</h2>
                        <p>
                            We collect information you provide directly to us, such as when you create an account, upload content for analysis, or communicate with us. This may include:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Account information (email, username)</li>
                            <li>Uploaded content (images, videos, text logs)</li>
                            <li>Usage data and interaction with our services</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-mono text-white">3. How We Use Your Information</h2>
                        <p>
                            We use the collected information to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Provide, maintain, and improve our services</li>
                            <li>Analyze uploaded content to generate loyalty reports</li>
                            <li>Communicate with you about updates and security alerts</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-mono text-white">4. Data Security</h2>
                        <p>
                            We implement reasonable security measures to protect your information. However, no method of transmission over the Internet is 100% secure.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
