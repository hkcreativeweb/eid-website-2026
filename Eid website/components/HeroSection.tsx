"use client";
import { motion } from "framer-motion";

const STARS = [
  { x: "10%", y: "15%", size: 14, delay: 0 },
  { x: "85%", y: "10%", size: 10, delay: 0.4 },
  { x: "75%", y: "70%", size: 8, delay: 0.8 },
  { x: "15%", y: "75%", size: 12, delay: 1.2 },
  { x: "50%", y: "8%", size: 7, delay: 0.6 },
  { x: "92%", y: "45%", size: 9, delay: 1.5 },
  { x: "5%", y: "45%", size: 6, delay: 0.9 },
  { x: "60%", y: "85%", size: 11, delay: 1.8 },
  { x: "38%", y: "88%", size: 7, delay: 0.3 },
  { x: "88%", y: "80%", size: 8, delay: 1.1 },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a1a0f]">
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a4731_0%,#0a1a0f_70%)]" />

      {/* Twinkling stars */}
      {STARS.map((star, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: star.x, top: star.y }}
          animate={{ opacity: [1, 0.15, 1], scale: [1, 0.6, 1] }}
          transition={{
            duration: 2.5,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <StarShape size={star.size} />
        </motion.div>
      ))}

      {/* Large crescent moon */}
      <motion.div
        className="absolute right-[5%] top-[10%] md:right-[8%] md:top-[8%]"
        animate={{ y: [0, -20, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <CrescentMoon className="w-48 h-48 md:w-72 md:h-72 opacity-90" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#d4af37]/80 text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-4"
        >
          عيد مبارك
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-8xl font-bold text-white mb-2 leading-tight"
        >
          Eid{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f0d060]">
            Mubarak
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="text-[#d4af37]/40 text-8xl md:text-[10rem] font-black leading-none -mt-4 mb-2 select-none"
        >
          2026
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-white/70 text-base md:text-xl max-w-xl mx-auto mb-8 leading-relaxed"
        >
          Discover the history, traditions, and joy behind the world&apos;s most
          celebrated Islamic festivals.
        </motion.p>

        {/* Date badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          <DateBadge
            label="Eid al-Fitr"
            date="March 20, 2026"
            past
          />
          <DateBadge
            label="Eid al-Adha"
            date="May 27, 2026"
            highlight
          />
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="inline-flex items-center gap-2 text-[#d4af37]/70 hover:text-[#d4af37] transition-colors text-sm"
        >
          Scroll to explore
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↓
          </motion.span>
        </motion.a>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#faf7f0] to-transparent" />
    </section>
  );
}

function DateBadge({
  label,
  date,
  past,
  highlight,
}: {
  label: string;
  date: string;
  past?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={`px-5 py-3 rounded-full border text-sm font-medium flex items-center gap-2 ${
        highlight
          ? "border-[#d4af37] bg-[#d4af37]/15 text-[#f0d060]"
          : past
          ? "border-white/20 bg-white/5 text-white/50"
          : "border-[#d4af37]/40 bg-[#d4af37]/10 text-[#d4af37]/80"
      }`}
    >
      {highlight && (
        <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
      )}
      <span className="text-white/60 font-normal">{label}:</span>
      <span>{date}</span>
      {highlight && (
        <span className="text-xs bg-[#d4af37]/20 text-[#f0d060] px-2 py-0.5 rounded-full">
          Soon!
        </span>
      )}
    </div>
  );
}

function CrescentMoon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <defs>
        <mask id="hero-crescent">
          <circle cx="90" cy="100" r="80" fill="white" />
          <circle cx="122" cy="84" r="64" fill="black" />
        </mask>
        <filter id="moon-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle
        cx="90"
        cy="100"
        r="80"
        fill="#d4af37"
        mask="url(#hero-crescent)"
        filter="url(#moon-glow)"
        opacity="0.85"
      />
    </svg>
  );
}

function StarShape({ size }: { size: number }) {
  const s = size;
  const points = Array.from({ length: 5 }, (_, i) => {
    const outer = ((i * 72 - 90) * Math.PI) / 180;
    const inner = (((i * 72 + 36) - 90) * Math.PI) / 180;
    const ox = s + Math.cos(outer) * s;
    const oy = s + Math.sin(outer) * s;
    const ix = s + Math.cos(inner) * (s * 0.4);
    const iy = s + Math.sin(inner) * (s * 0.4);
    return `${ox},${oy} ${ix},${iy}`;
  }).join(" ");

  return (
    <svg width={s * 2} height={s * 2} viewBox={`0 0 ${s * 2} ${s * 2}`}>
      <polygon points={points} fill="#d4af37" opacity="0.9" />
    </svg>
  );
}
