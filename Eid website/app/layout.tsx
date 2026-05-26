import type { Metadata } from "next";
import { Geist } from "next/font/google";
import AudioPlayerClient from "@/components/AudioPlayerClient";
import BackToHomeButtonClient from "@/components/BackToHomeButtonClient";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eid Mubarak 2026 — Facts, Dates & Traditions",
  description:
    "Discover everything about Eid al-Fitr and Eid al-Adha 2026 — history, traditions, dates, and fascinating facts about the world's most celebrated Islamic festivals.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} scroll-smooth`}>
      <body className="antialiased">
        {children}
        <AudioPlayerClient />
        <BackToHomeButtonClient />
      </body>
    </html>
  );
}
