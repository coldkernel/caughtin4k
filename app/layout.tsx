import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Caught in 4k",
  description: "The AI Loyalty Auditor. Upload proof. Get the verdict.",
};

import ConvexClientProvider from "@/components/ConvexClientProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} antialiased crt`}
      >
        <div className="noise" />
        <main className="relative z-10 min-h-screen flex flex-col">
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </main>
      </body>
    </html>
  );
}
