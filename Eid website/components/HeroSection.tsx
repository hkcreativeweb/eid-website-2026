"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// ── Multilingual greetings ──────────────────────────────────────────────────
const GREETINGS = [
  { lang: "Arabic",     text: "عيد مبارك",                         dir: "rtl" },
  { lang: "Urdu",       text: "عید مبارک",                          dir: "rtl" },
  { lang: "English",    text: "Eid Mubarak",                        dir: "ltr" },
  { lang: "Turkish",    text: "Bayramınız Mübarek Olsun",           dir: "ltr" },
  { lang: "Bengali",    text: "ঈদ মোবারক",                          dir: "ltr" },
  { lang: "Indonesian", text: "Selamat Hari Raya Idul Adha",        dir: "ltr" },
  { lang: "Persian",    text: "عید سعید قربان مبارک",               dir: "rtl" },
  { lang: "French",     text: "Bonne Fête de l'Aïd",               dir: "ltr" },
  { lang: "Somali",     text: "Ciid Wanaagsan",                     dir: "ltr" },
  { lang: "Bosnian",    text: "Bajram Šerif Mubarek Olsun",         dir: "ltr" },
  { lang: "Malay",      text: "Selamat Hari Raya Aidiladha",        dir: "ltr" },
  { lang: "Spanish",    text: "Feliz Eid al-Adha",                  dir: "ltr" },
  { lang: "Swahili",    text: "Eid Mubarak kwa Wote",               dir: "ltr" },
  { lang: "Hausa",      text: "Barka da Sallah",                    dir: "ltr" },
];

// Eid al-Adha 2026 target — May 27 2026 00:00:00 local time
const EID_TARGET = new Date("2026-05-27T00:00:00").getTime();

const STARS = [
  { x: "8%",  y: "12%", size: 14, delay: 0   },
  { x: "83%", y: "8%",  size: 10, delay: 0.4 },
  { x: "76%", y: "68%", size: 8,  delay: 0.8 },
  { x: "14%", y: "72%", size: 12, delay: 1.2 },
  { x: "50%", y: "6%",  size: 7,  delay: 0.6 },
  { x: "93%", y: "44%", size: 9,  delay: 1.5 },
  { x: "4%",  y: "43%", size: 6,  delay: 0.9 },
  { x: "62%", y: "83%", size: 11, delay: 1.8 },
  { x: "37%", y: "87%", size: 7,  delay: 0.3 },
  { x: "89%", y: "78%", size: 8,  delay: 1.1 },
];

// ── Countdown hook ──────────────────────────────────────────────────────────
function useCountdown(target: number) {
  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, over: true };
    return {
      days:    Math.floor(diff / 86_400_000),
      hours:   Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000)  / 60_000),
      seconds: Math.floor((diff % 60_000)     / 1_000),
      over: false,
    };
  };

  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return t;
}

// ── Component ───────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [greetIdx, setGreetIdx] = useState(0);
  const countdown = useCountdown(EID_TARGET);

  useEffect(() => {
    const id = setInterval(
      () => setGreetIdx((i) => (i + 1) % GREETINGS.length),
      2800
    );
    return () => clearInterval(id);
  }, []);

  const current = GREETINGS[greetIdx];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a1a0f]">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a4731_0%,#0a1a0f_70%)]" />

      {/* Stars */}
      {STARS.map((star, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: star.x, top: star.y }}
          animate={{ opacity: [1, 0.15, 1], scale: [1, 0.6, 1] }}
          transition={{ duration: 2.5, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <StarShape size={star.size} />
        </motion.div>
      ))}

      {/* Floating crescent */}
      <motion.div
        className="absolute right-[5%] top-[10%] md:right-[8%] md:top-[8%]"
        animate={{ y: [0, -20, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <CrescentMoon className="w-44 h-44 md:w-64 md:h-64 opacity-90" />
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full">

        {/* Rotating multilingual greeting */}
        <div className="h-14 mb-3 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={greetIdx}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45 }}
              className="flex flex-col items-center"
            >
              <p
                dir={current.dir}
                className={`text-[#d4af37] font-bold leading-tight ${
                  current.dir === "rtl"
                    ? "text-2xl md:text-3xl"
                    : "text-xl md:text-2xl"
                }`}
              >
                {current.text}
              </p>
              <span className="text-white/30 text-xs tracking-widest uppercase mt-0.5">
                {current.lang}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-8xl font-bold text-white leading-tight"
        >
          Eid{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f0d060]">
            Mubarak
          </span>
        </motion.h1>

        {/* 2026 watermark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="text-[#d4af37]/30 text-8xl md:text-[9rem] font-black leading-none -mt-2 mb-1 select-none"
        >
          2026
        </motion.div>

        {/* Personal dedication */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8 space-y-1"
        >
          <p
            dir="rtl"
            className="text-white/80 text-xl md:text-2xl font-medium"
            style={{ fontFamily: "serif" }}
          >
            محمد حمزہ خالد کی جانب سے
          </p>
          <p
            dir="rtl"
            className="text-[#d4af37]/70 text-base md:text-lg"
            style={{ fontFamily: "serif" }}
          >
            من محمد حمزة خالد — عيد أضحى مبارك
          </p>
          <p className="text-white/40 text-sm tracking-wide">
            from Muhammad Hamza Khalid
          </p>
        </motion.div>

        {/* ── Countdown timer ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-8"
        >
          <p className="text-white/50 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            {countdown.over
              ? "🎉 Eid al-Adha is here!"
              : "Eid al-Adha 2026 begins in"}
          </p>

          {countdown.over ? (
            <div className="inline-block border border-[#d4af37]/40 bg-[#d4af37]/10 rounded-2xl px-8 py-4">
              <p className="text-[#f0d060] text-2xl font-bold">
                عيد أضحى مبارك 🎊
              </p>
            </div>
          ) : (
            <div className="flex justify-center gap-3 md:gap-4">
              {[
                { value: countdown.days,    label: "Days"    },
                { value: countdown.hours,   label: "Hours"   },
                { value: countdown.minutes, label: "Minutes" },
                { value: countdown.seconds, label: "Seconds" },
              ].map(({ value, label }, i) => (
                <div key={label} className="flex items-center gap-3 md:gap-4">
                  <div className="flex flex-col items-center">
                    <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-xl w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={value}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="text-[#f0d060] text-2xl md:text-3xl font-black tabular-nums"
                        >
                          {String(value).padStart(2, "0")}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <span className="text-white/40 text-[10px] font-semibold tracking-widest uppercase mt-1.5">
                      {label}
                    </span>
                  </div>
                  {i < 3 && (
                    <span className="text-[#d4af37]/50 text-2xl font-bold -mt-4">:</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Date badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          <DateBadge label="Eid al-Fitr"  date="March 20, 2026" past />
          <DateBadge label="Eid al-Adha"  date="May 27, 2026"   highlight />
        </motion.div>

        {/* Scroll cue */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="inline-flex items-center gap-2 text-[#d4af37]/60 hover:text-[#d4af37] transition-colors text-sm"
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

      {/* Bottom fade to cream */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#faf7f0] to-transparent" />
    </section>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────
function DateBadge({
  label, date, past, highlight,
}: {
  label: string; date: string; past?: boolean; highlight?: boolean;
}) {
  return (
    <div
      className={`px-4 py-2 rounded-full border text-sm font-medium flex items-center gap-2 ${
        highlight
          ? "border-[#d4af37] bg-[#d4af37]/15 text-[#f0d060]"
          : "border-white/15 bg-white/5 text-white/40"
      }`}
    >
      {highlight && <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />}
      <span className={highlight ? "text-white/60" : "text-white/30"}>{label}:</span>
      <span>{date}</span>
      {past && <span className="text-[10px] text-white/25 border border-white/15 rounded-full px-1.5 py-0.5">Passed</span>}
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
      <circle cx="90" cy="100" r="80" fill="#d4af37"
        mask="url(#hero-crescent)" filter="url(#moon-glow)" opacity="0.85" />
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
    const ix = s + Math.cos(inner) * s * 0.4;
    const iy = s + Math.sin(inner) * s * 0.4;
    return `${ox},${oy} ${ix},${iy}`;
  }).join(" ");
  return (
    <svg width={s * 2} height={s * 2} viewBox={`0 0 ${s * 2} ${s * 2}`}>
      <polygon points={points} fill="#d4af37" opacity="0.9" />
    </svg>
  );
}
