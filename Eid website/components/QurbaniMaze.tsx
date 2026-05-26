"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ── Maze (1=fence/wall, 0=grass path) ─────────────────────────────────────
const MAZE = [
  [1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,1],
  [1,0,1,0,0,0,1,0,1],
  [1,0,1,0,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,1],
  [1,0,1,0,0,0,1,0,1],
  [1,0,1,0,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,1],
  [1,1,1,1,1,1,1,1,1],
];

const ROWS = MAZE.length;
const COLS = MAZE[0].length;

const START = { row: 1, col: 1 };

const SHEEP = [
  { id:"A", row:1, col:7, color:"#ef4444", colorName:"Red",    number:1, shape:"●", shapeName:"Circle"   },
  { id:"B", row:7, col:1, color:"#3b82f6", colorName:"Blue",   number:2, shape:"▲", shapeName:"Triangle" },
  { id:"C", row:7, col:7, color:"#22c55e", colorName:"Green",  number:3, shape:"★", shapeName:"Star"     },
  { id:"D", row:4, col:6, color:"#f59e0b", colorName:"Yellow", number:4, shape:"■", shapeName:"Square"   },
];

type ClueType = "color" | "number" | "shape";
type Sheep    = typeof SHEEP[number];

const DIRS: Record<string, [number,number]> = {
  ArrowUp:    [-1, 0], ArrowDown:  [ 1, 0],
  ArrowLeft:  [ 0,-1], ArrowRight: [ 0, 1],
  w:[-1,0], s:[1,0], a:[0,-1], d:[0,1],
};

function makeHint(sheep: Sheep, type: ClueType) {
  if (type === "color")  return { label: `Find the ${sheep.colorName.toUpperCase()} sheep!`,        badge: <span style={{ display:"inline-block", width:28, height:28, borderRadius:"50%", background:sheep.color, verticalAlign:"middle", border:"2px solid white", marginRight:6 }} /> };
  if (type === "number") return { label: `Find sheep with the number ${sheep.number}!`,              badge: <span style={{ display:"inline-block", width:28, height:28, borderRadius:6, background:"#0a1a0f", color:"#d4af37", fontWeight:900, fontSize:18, textAlign:"center", lineHeight:"28px", verticalAlign:"middle", marginRight:6 }}>{sheep.number}</span> };
  return                        { label: `Find the sheep with the ${sheep.shapeName.toUpperCase()} symbol!`, badge: <span style={{ display:"inline-block", width:28, height:28, fontSize:20, textAlign:"center", lineHeight:"28px", verticalAlign:"middle", marginRight:6, color:sheep.color }}>{sheep.shape}</span> };
}

// ── Sheep cell visual ───────────────────────────────────────────────────────
function SheepCell({ sheep, size, isWrong }: { sheep: Sheep; size: number; isWrong: boolean }) {
  const fs = Math.max(14, size * 0.42);
  return (
    <motion.div
      className="relative flex items-center justify-center w-full h-full"
      animate={isWrong ? { x: [-4,4,-3,3,0] } : {}}
      transition={{ duration: 0.3 }}
    >
      <span style={{ fontSize: fs, lineHeight: 1 }}>🐑</span>
      {/* collar color dot */}
      <span style={{
        position:"absolute", bottom:2, right:2,
        width: size * 0.24, height: size * 0.24,
        borderRadius:"50%", background: sheep.color,
        border:"1.5px solid white", display:"block",
      }} />
      {/* number */}
      <span style={{
        position:"absolute", top:1, left:2,
        fontSize: Math.max(9, size * 0.2),
        fontWeight:900, color: sheep.color,
        textShadow:"0 0 3px white",
        lineHeight:1,
      }}>{sheep.number}</span>
      {/* shape */}
      <span style={{
        position:"absolute", bottom:2, left:2,
        fontSize: Math.max(8, size * 0.18),
        color: sheep.color,
        textShadow:"0 0 3px white",
        lineHeight:1,
      }}>{sheep.shape}</span>
    </motion.div>
  );
}

// ── Maze grid ───────────────────────────────────────────────────────────────
function MazeGrid({ player, wrongId, cellSize }: { player:{row:number;col:number}; wrongId:string|null; cellSize:number }) {
  return (
    <div
      style={{
        display:"grid",
        gridTemplateColumns:`repeat(${COLS}, ${cellSize}px)`,
        gridTemplateRows:`repeat(${ROWS}, ${cellSize}px)`,
        gap:0,
        border:"3px solid #5c3d11",
        borderRadius:8,
        overflow:"hidden",
      }}
    >
      {MAZE.map((row, r) =>
        row.map((cell, c) => {
          const isPlayer = player.row === r && player.col === c;
          const sheep    = SHEEP.find(s => s.row === r && s.col === c);
          const isWall   = cell === 1;
          const isWrong  = sheep?.id === wrongId;

          return (
            <div
              key={`${r}-${c}`}
              style={{
                width: cellSize, height: cellSize,
                background: isWall
                  ? (r === 0 || r === ROWS-1 || c === 0 || c === COLS-1)
                    ? "#3b2006"   // outer border
                    : "#5c3d11"   // inner fence
                  : "#7ec860",   // grass
                position:"relative",
                display:"flex", alignItems:"center", justifyContent:"center",
                boxSizing:"border-box",
                borderRight:  isWall ? "1px solid #3b2006" : "1px solid #6ab050",
                borderBottom: isWall ? "1px solid #3b2006" : "1px solid #6ab050",
              }}
            >
              {/* Fence post detail */}
              {isWall && !( r === 0 || r === ROWS-1 || c === 0 || c === COLS-1 ) && (
                <div style={{ position:"absolute", inset:3, background:"#7c5520", borderRadius:2, opacity:0.5 }} />
              )}
              {/* Grass detail */}
              {!isWall && (
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,#8fd970 0%,#7ec860 60%,#6ab050 100%)" }} />
              )}

              {/* Player */}
              {isPlayer && (
                <motion.div
                  style={{ position:"absolute", zIndex:20, fontSize: Math.max(14, cellSize * 0.52), lineHeight:1 }}
                  initial={{ scale:0.5 }} animate={{ scale:1 }} transition={{ type:"spring", stiffness:300 }}
                >
                  🧑‍🌾
                </motion.div>
              )}

              {/* Sheep (only show if player isn't on same cell) */}
              {sheep && !isPlayer && (
                <div style={{ position:"absolute", inset:0, zIndex:10 }}>
                  <SheepCell sheep={sheep} size={cellSize} isWrong={isWrong} />
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

// ── D-Pad ───────────────────────────────────────────────────────────────────
function DPad({ onMove }: { onMove:(dr:number,dc:number)=>void }) {
  const btn = (label:string, dr:number, dc:number, pos:string) => (
    <button
      onPointerDown={(e) => { e.preventDefault(); onMove(dr,dc); }}
      className={`${pos} w-12 h-12 bg-[#1a4731] hover:bg-[#0f2b1f] active:bg-[#0a1a0f] text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-md transition-colors select-none`}
    >
      {label}
    </button>
  );
  return (
    <div className="relative w-40 h-40 mx-auto mt-4">
      {btn("↑", -1,  0, "absolute top-0 left-1/2 -translate-x-1/2")}
      {btn("←",  0, -1, "absolute left-0 top-1/2 -translate-y-1/2")}
      {btn("↓",  1,  0, "absolute bottom-0 left-1/2 -translate-x-1/2")}
      {btn("→",  0,  1, "absolute right-0 top-1/2 -translate-y-1/2")}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-10 h-10 rounded-full bg-[#0a1a0f]/20" />
      </div>
    </div>
  );
}

// ── Legend ──────────────────────────────────────────────────────────────────
function Legend({ cellSize }: { cellSize: number }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      {SHEEP.map(s => (
        <div key={s.id} className="flex items-center gap-1.5 bg-white border border-[#f0e8d5] rounded-full px-3 py-1.5 text-xs font-semibold text-[#374151]">
          <span style={{ width:10, height:10, borderRadius:"50%", background:s.color, display:"inline-block", border:"1px solid #ccc" }} />
          <span>{s.colorName}</span>
          <span className="text-[#d4af37]">{s.number}</span>
          <span style={{ color:s.color }}>{s.shape}</span>
        </div>
      ))}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function QurbaniMaze() {
  const [phase,    setPhase]    = useState<"intro"|"playing"|"won">("intro");
  const [player,   setPlayer]   = useState(START);
  const [target,   setTarget]   = useState(SHEEP[0]);
  const [clueType, setClueType] = useState<ClueType>("color");
  const [wrongId,  setWrongId]  = useState<string|null>(null);
  const [wrongMsg, setWrongMsg] = useState<string|null>(null);
  const [steps,    setSteps]    = useState(0);
  const [cellSize, setCellSize] = useState(44);

  const phaseRef  = useRef(phase);
  const playerRef = useRef(player);
  const targetRef = useRef(target);
  const wrongTimer = useRef<ReturnType<typeof setTimeout>|null>(null);

  useEffect(() => { phaseRef.current  = phase;  }, [phase]);
  useEffect(() => { playerRef.current = player; }, [player]);
  useEffect(() => { targetRef.current = target; }, [target]);

  // Responsive cell size
  useEffect(() => {
    const calc = () => {
      const avail = Math.min(window.innerWidth - 40, 420);
      setCellSize(Math.max(36, Math.floor(avail / COLS)));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Keyboard (mount once, use refs)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phaseRef.current !== "playing") return;
      const delta = DIRS[e.key];
      if (!delta) return;
      e.preventDefault();
      doMove(delta[0], delta[1]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function doMove(dr: number, dc: number) {
    const p = playerRef.current;
    const nr = p.row + dr;
    const nc = p.col + dc;
    if (MAZE[nr]?.[nc] !== 0) return;

    const onSheep = SHEEP.find(s => s.row === nr && s.col === nc);
    if (onSheep) {
      if (onSheep.id === targetRef.current.id) {
        setPhase("won");
      } else {
        if (wrongTimer.current) clearTimeout(wrongTimer.current);
        setWrongId(onSheep.id);
        setWrongMsg(`That's the ${onSheep.colorName} sheep (${onSheep.shape} ${onSheep.number}) — not the one! Keep searching!`);
        wrongTimer.current = setTimeout(() => { setWrongId(null); setWrongMsg(null); }, 1800);
      }
    }
    setPlayer({ row: nr, col: nc });
    setSteps(s => s + 1);
  }

  function startGame() {
    if (wrongTimer.current) clearTimeout(wrongTimer.current);
    const tgt = SHEEP[Math.floor(Math.random() * SHEEP.length)];
    const types: ClueType[] = ["color", "number", "shape"];
    const ct = types[Math.floor(Math.random() * types.length)];
    setTarget(tgt);
    setClueType(ct);
    setPlayer(START);
    setSteps(0);
    setWrongId(null);
    setWrongMsg(null);
    setPhase("playing");
  }

  const hint = phase !== "intro" ? makeHint(target, clueType) : null;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[36vh] flex items-center justify-center overflow-hidden bg-[#0a1a0f] pt-20 pb-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a4731_0%,#0a1a0f_65%)]" />
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
            className="text-[#d4af37]/70 text-sm tracking-[0.3em] uppercase font-semibold mb-3">
            Maze Game
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }}
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
            Find Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f0d060]">
              Qurbani Sheep
            </span>{" "}🐏
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
            className="text-white/50 text-sm">
            Navigate the farm maze — find the right sheep using colours, numbers &amp; shapes!
          </motion.p>
        </div>
      </section>

      {/* Game */}
      <section className="bg-[#faf7f0] min-h-screen py-10 px-4">
        <div className="max-w-lg mx-auto">

          <AnimatePresence mode="wait">

            {/* INTRO */}
            {phase === "intro" && (
              <motion.div key="intro" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                className="text-center">
                <div className="bg-white rounded-3xl border border-[#f0e8d5] shadow-lg p-7 mb-6">
                  <div className="text-6xl mb-5">🐏 🌾</div>
                  <h2 className="text-2xl font-bold text-[#0a1a0f] mb-4">How to Play</h2>

                  <div className="text-left space-y-2 max-w-xs mx-auto mb-6">
                    {[
                      ["🎯","Read the clue at the top — it tells you which sheep to find"],
                      ["🗺️","Navigate the farm maze using arrow keys or the D-pad"],
                      ["🐑","4 sheep are hiding — each has a colour, number & shape"],
                      ["✅","Walk into the correct sheep to win!"],
                      ["❌","Walk into the wrong sheep and get a hint to keep going"],
                    ].map(([icon,text],i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-[#374151]">
                        <span className="flex-shrink-0">{icon}</span>
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Preview of sheep */}
                  <div className="flex justify-center gap-4 mb-6 flex-wrap">
                    {SHEEP.map(s => (
                      <div key={s.id} className="flex flex-col items-center gap-1">
                        <div style={{ position:"relative", width:44, height:44, background:"#7ec860", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <span style={{ fontSize:22 }}>🐑</span>
                          <span style={{ position:"absolute", bottom:2, right:2, width:10, height:10, borderRadius:"50%", background:s.color, border:"1px solid white", display:"block" }} />
                          <span style={{ position:"absolute", top:1, left:2, fontSize:9, fontWeight:900, color:s.color }}>{s.number}</span>
                          <span style={{ position:"absolute", bottom:2, left:2, fontSize:8, color:s.color }}>{s.shape}</span>
                        </div>
                        <span className="text-[10px] font-bold" style={{ color:s.color }}>{s.colorName}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                    onClick={startGame}
                    className="bg-[#1a4731] hover:bg-[#0f2b1f] text-white font-bold px-10 py-4 rounded-full text-lg transition-colors"
                  >
                    Enter the Farm! 🌾
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* PLAYING */}
            {phase === "playing" && (
              <motion.div key="playing" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>

                {/* Clue banner */}
                <div className="bg-[#0a1a0f] rounded-2xl px-5 py-4 mb-4 flex items-center gap-3">
                  <div className="text-2xl">🔍</div>
                  <div>
                    <p className="text-[#d4af37]/70 text-[10px] font-bold tracking-widest uppercase">Your mission</p>
                    <p className="text-white font-bold text-base flex items-center flex-wrap gap-1">
                      {hint?.badge}{hint?.label}
                    </p>
                  </div>
                </div>

                {/* Wrong sheep message */}
                <AnimatePresence>
                  {wrongMsg && (
                    <motion.div
                      initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                      className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-2.5 mb-3 text-center font-medium"
                    >
                      ❌ {wrongMsg}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Maze */}
                <div className="flex justify-center mb-2">
                  <MazeGrid player={player} wrongId={wrongId} cellSize={cellSize} />
                </div>

                {/* Step counter */}
                <p className="text-center text-[#9ca3af] text-xs mb-1">👣 {steps} steps taken</p>

                {/* Legend */}
                <Legend cellSize={cellSize} />

                {/* D-pad */}
                <DPad onMove={doMove} />

                <p className="text-center text-[#9ca3af] text-[10px] mt-3">
                  Arrow keys / WASD also work on keyboard
                </p>
              </motion.div>
            )}

            {/* WON */}
            {phase === "won" && (
              <motion.div key="won" initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
                className="text-center">
                <motion.div animate={{ rotate:[0,-8,8,-5,5,0] }} transition={{ duration:0.6, delay:0.2 }}
                  className="text-7xl mb-4">🎉</motion.div>
                <h2 className="text-3xl font-bold text-[#0a1a0f] mb-2">You found it!</h2>
                <p className="text-[#4a5568] mb-1">
                  You found the{" "}
                  <span className="font-bold" style={{ color: target.color }}>{target.colorName}</span>{" "}
                  sheep (number <strong>{target.number}</strong>, {target.shapeName} {target.shape}) in{" "}
                  <strong>{steps}</strong> steps!
                </p>
                <p className="text-[#d4af37] font-semibold text-lg mb-6">
                  عيد الأضحى مبارك 🐏✨
                </p>

                {/* Show found sheep */}
                <div className="inline-flex flex-col items-center gap-2 bg-white border border-[#f0e8d5] rounded-2xl px-8 py-6 mb-6 shadow">
                  <div style={{ position:"relative", width:64, height:64, background:"#7ec860", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontSize:34 }}>🐑</span>
                    <span style={{ position:"absolute", bottom:3, right:3, width:14, height:14, borderRadius:"50%", background:target.color, border:"2px solid white", display:"block" }} />
                    <span style={{ position:"absolute", top:2, left:3, fontSize:12, fontWeight:900, color:target.color }}>{target.number}</span>
                    <span style={{ position:"absolute", bottom:3, left:3, fontSize:11, color:target.color }}>{target.shape}</span>
                  </div>
                  <div className="text-sm text-[#374151] text-center">
                    <span className="font-bold block" style={{ color:target.color }}>{target.colorName} Sheep</span>
                    <span className="text-[#9ca3af]">#{target.number} · {target.shapeName}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button onClick={startGame}
                    className="bg-[#1a4731] hover:bg-[#0f2b1f] text-white font-bold px-8 py-3 rounded-full transition-colors">
                    Play Again 🗺️
                  </button>
                  <Link href="/game"
                    className="bg-[#d4af37] hover:bg-[#b8962e] text-[#0a1a0f] font-semibold px-8 py-3 rounded-full transition-colors">
                    Shear Game ✂️
                  </Link>
                  <Link href="/"
                    className="border-2 border-[#1a4731] text-[#1a4731] hover:bg-[#1a4731] hover:text-white font-semibold px-8 py-3 rounded-full transition-colors">
                    Home
                  </Link>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
