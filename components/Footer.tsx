"use client";

import Link from "next/link";


export function Footer() {
    return (
        <footer className="bg-black border-t border-gray-900 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                <div className="space-y-4">
                    <h3 className="text-2xl font-black tracking-tighter text-white">CAUGHT IN 4K</h3>
                    <p className="text-gray-500 text-sm font-mono">
                        The world's most advanced AI loyalty auditor. We see what you miss.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-white font-bold uppercase tracking-widest text-sm">Product</h4>
                    <ul className="space-y-2 text-sm text-gray-500 font-mono">
                        <li><Link href="#" className="hover:text-neon-red transition-colors">Features</Link></li>
                        <li><Link href="#" className="hover:text-neon-red transition-colors">Pricing</Link></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-white font-bold uppercase tracking-widest text-sm">Legal</h4>
                    <ul className="space-y-2 text-sm text-gray-500 font-mono">
                        <li><Link href="/legal/privacy" className="hover:text-neon-red transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/legal/terms" className="hover:text-neon-red transition-colors">Terms of Service</Link></li>
                        <li><Link href="/legal/acceptable-use" className="hover:text-neon-red transition-colors">Acceptable Use</Link></li>
                        <li><Link href="/legal/cookie-policy" className="hover:text-neon-red transition-colors">Cookie Policy</Link></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-900 text-center">
                <p className="text-gray-600 text-xs font-mono uppercase">
                    © 2025 CAUGHT IN 4K INC. ALL RIGHTS RESERVED.
                </p>
            </div>
        </footer>
    );
}
