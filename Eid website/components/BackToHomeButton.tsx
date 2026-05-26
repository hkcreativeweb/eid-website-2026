"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function BackToHomeButton() {
  const pathname = usePathname();

  // Only show on sub-pages
  if (pathname === "/") return null;

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.4, ease: "easeOut" }}
    >
      <Link
        href="/"
        className="flex items-center gap-2 bg-[#0a1a0f]/85 backdrop-blur-sm border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#1a4731] hover:border-[#d4af37]/60 hover:text-[#f0d060] transition-all duration-250 px-4 py-2.5 rounded-full text-sm font-semibold shadow-xl"
        aria-label="Back to home"
      >
        {/* House icon */}
        <svg viewBox="0 0 20 20" className="w-4 h-4 flex-shrink-0" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <span>Home</span>
      </Link>
    </motion.div>
  );
}
