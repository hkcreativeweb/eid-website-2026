"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const CLICKS_NEEDED = 28;
const TIME_LIMIT    = 15;

const WOOL = [
  { cx: 36,  cy: 52, r: 20, fill: "#f0f0eb" },
  { cx: 45,  cy: 58, r: 16, fill: "#eceae4" },
  { cx: 54,  cy: 41, r: 23, fill: "#f5f5f0" },
  { cx: 65,  cy: 59, r: 18, fill: "#efefea" },
  { cx: 75,  cy: 37, r: 23, fill: "#f8f8f4" },
  { cx: 87,  cy: 56, r: 18, fill: "#f0f0eb" },
  { cx: 94,  cy: 41, r: 21, fill: "#f5f5f0" },
];

type Snip = { id: number; x: number; y: number };

// ── Sheep SVG that changes as wool is sheared ──────────────────────────────
function SheepSVG({ woolShown, onClick }: { woolShown: number; onClick: (e: React.MouseEvent<SVGSVGElement>) => void }) {
  return (
    <svg
      width="260" height="160"
      viewBox="0 0 150 92"
      onClick={onClick}
      className="cursor-pointer select-none drop-shadow-xl"
      style={{ touchAction: "none" }}
    >
      <ellipse cx="72" cy="88" rx="44" ry="5" fill="black" opacity="0.12" />
      <circle cx="14" cy="46" r="10" fill={woolShown > 0 ? "#e8e8e2" : "#ccc"} opacity={woolShown > 0 ? 1 : 0.2} />

      {/* Wool circles — fade out as woolShown decreases */}
      {WOOL.map((w, i) => (
        <circle
          key={i}
          cx={w.cx} cy={w.cy} r={w.r}
          fill={w.fill}
          opacity={i < woolShown ? 1 : 0}
          style={{ transition: "opacity 0.25s" }}
        />
      ))}

      {/* Bald body when wool is gone */}
      {woolShown === 0 && (
        <ellipse cx="65" cy="50" rx="38" ry="22" fill="#d4c9b0" opacity="0.9" />
      )}

      {/* Legs */}
      <rect x="31" y="68" width="9" height="22" rx="4.5" fill="#2a1810" />
      <rect x="47" y="68" width="9" height="22" rx="4.5" fill="#2a1810" />
      <rect x="78" y="68" width="9" height="22" rx="4.5" fill="#2a1810" />
      <rect x="92" y="68" width="9" height="22" rx="4.5" fill="#2a1810" />
      <rect x="31" y="87" width="9" height="5" rx="2.5" fill="#140c06" />
      <rect x="47" y="87" width="9" height="5" rx="2.5" fill="#140c06" />
      <rect x="78" y="87" width="9" height="5" rx="2.5" fill="#140c06" />
      <rect x="92" y="87" width="9" height="5" rx="2.5" fill="#140c06" />

      {/* Head */}
      <ellipse cx="122" cy="46" rx="21" ry="17" fill="#2a1810" />
      <ellipse cx="112" cy="31" rx="7" ry="12" fill="#2a1810" transform="rotate(-18 112 31)" />
      <ellipse cx="112" cy="31" rx="4" ry="7.5" fill="#c97868" transform="rotate(-18 112 31)" />
      <circle cx="130" cy="40" r="5.5" fill="white" />
      <circle cx="131" cy="40" r="3" fill="#111" />
      <circle cx="132.2" cy="38.8" r="1.2" fill="white" />
      <ellipse cx="139" cy="51" rx="9" ry="7.5" fill="#4a2a1a" />
      <circle cx="135.5" cy="49.5" r="2.2" fill="#1a0800" />
      <circle cx="142.5" cy="49.5" r="2.2" fill="#1a0800" />
      <path d="M 134 55 Q 139 59.5 144 55" stroke="#1a0800" strokeWidth="1.6" strokeLinecap="round" fill="none" />

      {/* Sheen */}
      {woolShown > 0 && (
        <ellipse cx="72" cy="36" rx="30" ry="10" fill="white" opacity="0.18" />
      )}
    </svg>
  );
}

// ── Main export ────────────────────────────────────────────────────────────
export default function SheepGame() {
  const [phase, setPhase]     = useState<"intro"|"playing"|"won"|"lost">("intro");
  const [clicks, setClicks]   = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [snips, setSnips]     = useState<Snip[]>([]);
  const [shake, setShake]     = useState(false);
  const snipId   = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);

  const woolShown = WOOL.length - Math.min(WOOL.length, Math.floor((clicks / CLICKS_NEEDED) * WOOL.length));
  const progress  = Math.min(100, Math.round((clicks / CLICKS_NEEDED) * 100));
  const urgent    = timeLeft <= 5 && phase === "playing";

  const startGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("playing");
    setClicks(0);
    setTimeLeft(TIME_LIMIT);
    setSnips([]);
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setPhase("lost");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase]);

  function handleClick(e: React.MouseEvent<SVGSVGElement>) {
    if (phase !== "playing") return;

    const rect = wrapRef.current?.getBoundingClientRect();
    const x = rect ? e.clientX - rect.left : 130;
    const y = rect ? e.clientY - rect.top  : 80;

    const id = snipId.current++;
    setSnips((s) => [...s, { id, x, y }]);
    setTimeout(() => setSnips((s) => s.filter((sn) => sn.id !== id)), 500);

    // Brief shake
    setShake(true);
    setTimeout(() => setShake(false), 150);

    setClicks((c) => {
      const next = c + 1;
      if (next >= CLICKS_NEEDED) {
        if (timerRef.current) clearInterval(timerRef.current);
        setPhase("won");
      }
      return next;
    });
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[36vh] flex items-center justify-center overflow-hidden bg-[#0a1a0f] pt-20 pb-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a4731_0%,#0a1a0f_65%)]" />
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-[#d4af37]/70 text-sm tracking-[0.3em] uppercase font-semibold mb-3">
            Mini Game
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-3">
            Shear the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f0d060]">Sheep!</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-white/50 text-sm">
            🐑 ✂️ Click fast to shear the sheep before time runs out!
          </motion.p>
        </div>
      </section>

      {/* ── Game area ── */}
      <section className="bg-[#faf7f0] min-h-screen py-12 px-4 flex items-start justify-center">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">

            {/* INTRO */}
            {phase === "intro" && (
              <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-center">
                <div className="bg-white rounded-3xl border border-[#f0e8d5] shadow-lg p-8 mb-6">
                  <div className="flex justify-center mb-6">
                    <SheepSVG woolShown={WOOL.length} onClick={() => {}} />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0a1a0f] mb-3">How to play</h2>
                  <ul className="text-[#4a5568] text-sm space-y-2 text-left max-w-xs mx-auto mb-6">
                    <li className="flex items-start gap-2"><span className="text-[#d4af37] mt-0.5">✦</span> Click or tap the sheep as fast as you can</li>
                    <li className="flex items-start gap-2"><span className="text-[#d4af37] mt-0.5">✦</span> Shear all its wool within <strong>{TIME_LIMIT} seconds</strong></li>
                    <li className="flex items-start gap-2"><span className="text-[#d4af37] mt-0.5">✦</span> Watch the wool disappear with each click!</li>
                    <li className="flex items-start gap-2"><span className="text-[#d4af37] mt-0.5">✦</span> You need <strong>{CLICKS_NEEDED} clicks</strong> to fully shear it</li>
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    onClick={startGame}
                    className="bg-[#1a4731] hover:bg-[#0f2b1f] text-white font-bold px-10 py-4 rounded-full text-lg transition-colors"
                  >
                    Start Shearing! ✂️
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* PLAYING */}
            {phase === "playing" && (
              <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Timer + progress */}
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-2xl font-black tabular-nums ${urgent ? "text-red-500 animate-pulse" : "text-[#0a1a0f]"}`}>
                      {urgent ? "⏰" : "⏱"} {timeLeft}s
                    </span>
                    <span className="text-[#d4af37] font-bold text-sm">{progress}% sheared</span>
                  </div>
                  <div className="h-3 bg-[#e8dfd0] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#1a4731] to-[#d4af37]"
                      animate={{ width: `${progress}%` }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#9ca3af] mt-1">
                    <span>0</span>
                    <span>{CLICKS_NEEDED} clicks needed</span>
                  </div>
                </div>

                {/* Sheep + click snips */}
                <div className="bg-white rounded-3xl border border-[#f0e8d5] shadow-lg p-6 flex justify-center items-center relative overflow-hidden"
                  style={{ minHeight: 220 }} ref={wrapRef}>
                  {/* Grass */}
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#d4f0c4] to-transparent rounded-b-3xl" />

                  <motion.div animate={shake ? { x: [-4, 4, -3, 3, 0] } : {}} transition={{ duration: 0.15 }}>
                    <SheepSVG woolShown={woolShown} onClick={handleClick} />
                  </motion.div>

                  {/* Snip particles */}
                  <AnimatePresence>
                    {snips.map((sn) => (
                      <motion.span
                        key={sn.id}
                        className="absolute text-lg pointer-events-none select-none"
                        style={{ left: sn.x - 12, top: sn.y - 12 }}
                        initial={{ opacity: 1, scale: 0.5, y: 0 }}
                        animate={{ opacity: 0, scale: 1.4, y: -30 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45 }}
                      >
                        ✂️
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>

                <p className="text-center text-[#9ca3af] text-xs mt-3">
                  {clicks} / {CLICKS_NEEDED} clicks · Keep going!
                </p>
              </motion.div>
            )}

            {/* WON */}
            {phase === "won" && (
              <motion.div key="won" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="text-center">
                <motion.div
                  animate={{ rotate: [0, -5, 5, -3, 3, 0] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-7xl mb-4"
                >🎉</motion.div>
                <h2 className="text-3xl font-bold text-[#0a1a0f] mb-2">Sheep Sheared!</h2>
                <p className="text-[#4a5568] mb-2">You sheared the sheep with <strong>{timeLeft}s</strong> to spare!</p>
                <p className="text-[#d4af37] font-semibold mb-6">عيد الأضحى مبارك 🐑✨</p>

                <div className="bg-white rounded-3xl border border-[#f0e8d5] p-6 mb-6 flex justify-center">
                  <SheepSVG woolShown={0} onClick={() => {}} />
                </div>
                <p className="text-[#9ca3af] text-xs mb-6">One freshly sheared sheep, ready for Eid al-Adha!</p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button onClick={startGame}
                    className="bg-[#d4af37] hover:bg-[#b8962e] text-[#0a1a0f] font-bold px-8 py-3 rounded-full transition-colors">
                    Play Again ✂️
                  </button>
                  <Link href="/" className="bg-[#0a1a0f] hover:bg-[#1a4731] text-white font-semibold px-8 py-3 rounded-full transition-colors">
                    Back to Home
                  </Link>
                </div>
              </motion.div>
            )}

            {/* LOST */}
            {phase === "lost" && (
              <motion.div key="lost" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="text-center">
                <div className="text-7xl mb-4">⏰</div>
                <h2 className="text-3xl font-bold text-[#0a1a0f] mb-2">Time&apos;s Up!</h2>
                <p className="text-[#4a5568] mb-1">The sheep still has its wool — try clicking faster!</p>
                <p className="text-[#9ca3af] text-sm mb-6">
                  You got <strong>{clicks}</strong> of {CLICKS_NEEDED} clicks ({progress}% sheared)
                </p>

                <div className="bg-white rounded-3xl border border-[#f0e8d5] p-6 mb-6 flex justify-center">
                  <SheepSVG woolShown={woolShown} onClick={() => {}} />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button onClick={startGame}
                    className="bg-[#1a4731] hover:bg-[#0f2b1f] text-white font-bold px-8 py-3 rounded-full transition-colors">
                    Try Again 🐑
                  </button>
                  <Link href="/" className="border-2 border-[#1a4731] text-[#1a4731] hover:bg-[#1a4731] hover:text-white font-semibold px-8 py-3 rounded-full transition-colors">
                    Back to Home
                  </Link>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Links */}
          {phase === "intro" && (
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <Link href="/quiz" className="text-[#d4af37] hover:text-[#b8962e] text-sm font-semibold transition-colors">
                Take the Quiz instead →
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
