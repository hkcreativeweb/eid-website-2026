"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Equalizer bars animation ────────────────────────────────────────────────
const BAR_CONFIG = [
  { duration: 0.55, heights: [3, 14, 5, 12, 3] },
  { duration: 0.70, heights: [6, 16, 4, 10, 6] },
  { duration: 0.60, heights: [2, 10, 16, 6,  2] },
  { duration: 0.80, heights: [8, 12, 3, 14, 8] },
  { duration: 0.50, heights: [3, 16, 8,  5, 3] },
];

function Equalizer() {
  return (
    <div className="flex items-end gap-[3px] h-5 w-7">
      {BAR_CONFIG.map((bar, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-current flex-shrink-0"
          animate={{ height: bar.heights.map((h) => `${h}px`) }}
          transition={{ duration: bar.duration, repeat: Infinity, ease: "easeInOut", delay: i * 0.07 }}
          style={{ height: "3px" }}
        />
      ))}
    </div>
  );
}

// ── Volume icon ─────────────────────────────────────────────────────────────
function VolumeIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
      {muted ? (
        <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 1.414L12.414 10l1.293 1.293a1 1 0 01-1.414 1.414L11 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L9.586 10 8.293 8.707a1 1 0 011.414-1.414L11 8.586l1.293-1.293z"/>
      ) : (
        <>
          <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z"/>
          <path d="M14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"/>
        </>
      )}
    </svg>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing,  setPlaying]  = useState(false);
  const [ready,    setReady]    = useState(false);
  const [missing,  setMissing]  = useState(false);
  const [volume,   setVolume]   = useState(0.55);
  const [muted,    setMuted]    = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [visible,  setVisible]  = useState(false);

  // Appear after 1.5 s
  useEffect(() => { const t = setTimeout(() => setVisible(true), 1500); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : volume;
  }, [volume, muted]);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || missing) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        // autoplay blocked — that's fine, user can retry
      }
    }
  }, [playing, missing]);

  if (!visible) return null;

  return (
    <>
      {/* Hidden audio element — place eid.mp3 in /public/audio/ */}
      <audio
        ref={audioRef}
        src="/audio/eid.mp3"
        loop
        preload="metadata"
        onCanPlayThrough={() => setReady(true)}
        onError={() => setMissing(true)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* Floating player */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Expanded panel — volume control */}
        <AnimatePresence>
          {expanded && !missing && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0a1a0f]/90 backdrop-blur-md border border-[#d4af37]/30 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl"
            >
              <button
                onClick={() => setMuted((m) => !m)}
                className={`transition-colors ${muted ? "text-white/30" : "text-[#d4af37]"}`}
                aria-label={muted ? "Unmute" : "Mute"}
              >
                <VolumeIcon muted={muted} />
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  setMuted(false);
                }}
                className="w-24 accent-[#d4af37] cursor-pointer"
                aria-label="Volume"
              />
              <span className="text-white/40 text-xs tabular-nums w-6 text-right">
                {muted ? "0" : Math.round(volume * 100)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main button */}
        <div className="flex items-center gap-2">
          {/* Gear / settings toggle */}
          {!missing && (
            <motion.button
              onClick={() => setExpanded((e) => !e)}
              className="w-9 h-9 rounded-full bg-[#0a1a0f]/70 border border-white/10 flex items-center justify-center text-white/40 hover:text-white/70 transition-colors backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Audio settings"
            >
              <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
              </svg>
            </motion.button>
          )}

          {/* Play / Pause pill */}
          <motion.button
            onClick={toggle}
            disabled={missing}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full font-semibold text-sm shadow-xl backdrop-blur-sm select-none transition-all duration-300 ${
              missing
                ? "bg-white/5 border border-white/10 text-white/25 cursor-not-allowed"
                : playing
                ? "bg-[#d4af37] text-[#0a1a0f] shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                : "bg-[#0a1a0f]/80 border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#0a1a0f]/95"
            }`}
            whileHover={missing ? {} : { scale: 1.04 }}
            whileTap={missing ? {} : { scale: 0.96 }}
            aria-label={playing ? "Pause Eid music" : "Play Eid music"}
          >
            {playing ? (
              <>
                <Equalizer />
                <span className="hidden sm:inline" dir="rtl" style={{ fontFamily: "serif" }}>
                  عيد مبارك
                </span>
                {/* Pause icon */}
                <svg viewBox="0 0 20 20" className="w-4 h-4 flex-shrink-0" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
              </>
            ) : missing ? (
              <>
                <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 1.414L12.414 10l1.293 1.293a1 1 0 01-1.414 1.414L11 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L9.586 10 8.293 8.707a1 1 0 011.414-1.414L11 8.586l1.293-1.293z" clipRule="evenodd"/>
                </svg>
                <span>No audio file</span>
              </>
            ) : (
              <>
                {/* Pulse ring when not playing and ready */}
                {ready && (
                  <motion.span
                    className="absolute inset-0 rounded-full border border-[#d4af37]/50"
                    animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <svg viewBox="0 0 20 20" className="w-4 h-4 flex-shrink-0" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                </svg>
                <span>Eid Music 🎵</span>
              </>
            )}
          </motion.button>
        </div>

        {/* "Add audio file" hint when missing */}
        <AnimatePresence>
          {missing && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/30 text-[10px] text-right max-w-[180px] leading-tight"
            >
              Add an MP3 to{" "}
              <code className="text-[#d4af37]/50 font-mono">/public/audio/eid.mp3</code>
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
