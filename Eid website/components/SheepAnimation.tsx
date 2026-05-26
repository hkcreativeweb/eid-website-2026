"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SheepAnimation() {
  const [vw, setVw] = useState(1600);

  useEffect(() => {
    setVw(window.innerWidth);
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="absolute bottom-20 left-0 right-0 overflow-hidden pointer-events-none h-36">
      {/* Walking motion across the screen */}
      <motion.div
        className="absolute bottom-2"
        initial={{ x: -180 }}
        animate={{ x: [-180, vw + 200] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 3,
        }}
      >
        {/* Bob + slight tilt to simulate stride */}
        <motion.div
          animate={{ y: [0, -7, 0], rotate: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          {/* Speech-bubble label */}
          <div className="relative mb-2 bg-black/50 backdrop-blur-sm border border-[#d4af37]/40 rounded-2xl px-3 py-1.5 shadow-lg">
            <span className="text-[#f0d060] text-xs font-semibold tracking-wide whitespace-nowrap">
              عيد الأضحى ٢٠٢٦ · Eid al-Adha 2026
            </span>
            {/* bubble tail */}
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/50 rotate-45 border-r border-b border-[#d4af37]/40" />
          </div>

          <Sheep />
        </motion.div>
      </motion.div>
    </div>
  );
}

function Sheep() {
  return (
    <svg
      width="150"
      height="92"
      viewBox="0 0 150 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Walking sheep for Eid al-Adha"
    >
      {/* ── Shadow ── */}
      <ellipse cx="72" cy="88" rx="44" ry="5" fill="black" opacity="0.18" />

      {/* ── Tail (left, small fluff) ── */}
      <circle cx="14" cy="46" r="10" fill="#e8e8e2" />

      {/* ── Wool body — layered circles for fluffy depth ── */}
      {/* back */}
      <circle cx="36" cy="52" r="20" fill="#efefea" />
      {/* mid-back */}
      <circle cx="54" cy="41" r="23" fill="#f5f5f0" />
      {/* centre */}
      <circle cx="75" cy="37" r="23" fill="#f8f8f4" />
      {/* mid-front */}
      <circle cx="94" cy="41" r="21" fill="#f5f5f0" />
      {/* front-low */}
      <circle cx="87" cy="56" r="18" fill="#f0f0eb" />
      {/* centre-low */}
      <circle cx="65" cy="59" r="18" fill="#efefea" />
      {/* back-low */}
      <circle cx="45" cy="58" r="16" fill="#ececE6" />

      {/* ── Back legs ── */}
      {/* leg 1 */}
      <motion.rect
        x="31" y="68" width="9" height="22" rx="4.5" fill="#2a1810"
        animate={{ rotate: [-18, 18] }}
        transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{ transformOrigin: "35.5px 68px" }}
      />
      {/* leg 2 */}
      <motion.rect
        x="47" y="68" width="9" height="22" rx="4.5" fill="#2a1810"
        animate={{ rotate: [18, -18] }}
        transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{ transformOrigin: "51.5px 68px" }}
      />

      {/* ── Front legs ── */}
      {/* leg 3 */}
      <motion.rect
        x="78" y="68" width="9" height="22" rx="4.5" fill="#2a1810"
        animate={{ rotate: [18, -18] }}
        transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{ transformOrigin: "82.5px 68px" }}
      />
      {/* leg 4 */}
      <motion.rect
        x="92" y="68" width="9" height="22" rx="4.5" fill="#2a1810"
        animate={{ rotate: [-18, 18] }}
        transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{ transformOrigin: "96.5px 68px" }}
      />

      {/* ── Hooves ── */}
      <rect x="31" y="87" width="9" height="5" rx="2.5" fill="#140c06" />
      <rect x="47" y="87" width="9" height="5" rx="2.5" fill="#140c06" />
      <rect x="78" y="87" width="9" height="5" rx="2.5" fill="#140c06" />
      <rect x="92" y="87" width="9" height="5" rx="2.5" fill="#140c06" />

      {/* ── Head ── */}
      <ellipse cx="122" cy="46" rx="21" ry="17" fill="#2a1810" />

      {/* ── Ear ── */}
      <ellipse
        cx="112" cy="31" rx="7" ry="12"
        fill="#2a1810"
        transform="rotate(-18 112 31)"
      />
      <ellipse
        cx="112" cy="31" rx="4" ry="7.5"
        fill="#c97868"
        transform="rotate(-18 112 31)"
      />

      {/* ── Eye ── */}
      <circle cx="130" cy="40" r="5.5" fill="white" />
      <circle cx="131" cy="40" r="3" fill="#111" />
      <circle cx="132.2" cy="38.8" r="1.2" fill="white" />

      {/* ── Snout ── */}
      <ellipse cx="139" cy="51" rx="9" ry="7.5" fill="#4a2a1a" />
      {/* nostrils */}
      <circle cx="135.5" cy="49.5" r="2.2" fill="#1a0800" />
      <circle cx="142.5" cy="49.5" r="2.2" fill="#1a0800" />
      {/* smile */}
      <path
        d="M 134 55 Q 139 59.5 144 55"
        stroke="#1a0800"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />

      {/* ── Wool highlight sheen ── */}
      <ellipse cx="72" cy="36" rx="30" ry="10" fill="white" opacity="0.18" />
    </svg>
  );
}
