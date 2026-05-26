"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const QUESTIONS = [
  {
    q: 'What does the word "Eid" (عيد) mean in Arabic?',
    options: ["Prayer", "Festival or celebration", "Sacrifice", "Blessing"],
    answer: 1,
    fact: 'The word "Eid" literally means "recurring feast" or "festival" — a day that comes back again and again.',
  },
  {
    q: "How many times a year do Muslims celebrate Eid?",
    options: ["Once", "Twice", "Three times", "Four times"],
    answer: 1,
    fact: "Muslims celebrate two Eids: Eid al-Fitr (after Ramadan) and Eid al-Adha (during Hajj season).",
  },
  {
    q: "Which prophet's devotion is honoured during Eid al-Adha?",
    options: ["Prophet Musa (AS)", "Prophet Isa (AS)", "Prophet Ibrahim (AS)", "Prophet Yusuf (AS)"],
    answer: 2,
    fact: "Eid al-Adha commemorates Prophet Ibrahim (AS) who was willing to sacrifice his son in obedience to Allah, who then replaced the sacrifice with a ram.",
  },
  {
    q: "Eid al-Fitr marks the end of which Islamic month?",
    options: ["Muharram", "Dhul Hijjah", "Ramadan", "Rajab"],
    answer: 2,
    fact: "Eid al-Fitr falls on 1st Shawwal, the day after the 29 or 30 days of Ramadan fasting are complete.",
  },
  {
    q: 'What is "Eidi"?',
    options: [
      "A special Eid prayer",
      "Money or gifts given to children by elders",
      "A traditional Eid dish",
      "The Eid greeting in Urdu",
    ],
    answer: 1,
    fact: "Eidi is a beloved tradition across South Asia and beyond — elders gift children money or presents as a token of love and blessing on Eid.",
  },
  {
    q: "On which Islamic date does Eid al-Adha fall?",
    options: ["1st Shawwal", "10th Muharram", "10th Dhul Hijjah", "27th Ramadan"],
    answer: 2,
    fact: "Eid al-Adha falls on 10 Dhul Hijjah — the 12th and final month of the Islamic lunar calendar, coinciding with the Hajj pilgrimage.",
  },
  {
    q: "What charity must Muslims give before the Eid al-Fitr prayer?",
    options: ["Zakat", "Zakat al-Fitr", "Sadaqah Jariyah", "Khums"],
    answer: 1,
    fact: "Zakat al-Fitr is obligatory for every Muslim — it ensures that the poor can also celebrate Eid with food and joy.",
  },
  {
    q: "How is the Qurbani (sacrificial) meat traditionally divided?",
    options: [
      "Half for family, half for the poor",
      "All distributed to the poor",
      "One-third each: family, friends/neighbours, and the poor",
      "Kept entirely by the family",
    ],
    answer: 2,
    fact: "The three-way split — family, friends/neighbours, poor — ensures the spirit of sharing and generosity reaches everyone in the community.",
  },
  {
    q: "Approximately how many Muslims celebrate Eid worldwide?",
    options: ["500 million", "1 billion", "1.8 billion", "2.5 billion"],
    answer: 2,
    fact: "With 1.8 billion Muslims across 180+ countries, Eid is one of the largest religious celebrations on Earth.",
  },
  {
    q: 'What do the extra "takbeers" (Allahu Akbar) in the Eid prayer number?',
    options: ["3 extra", "6 extra", "9 extra", "12 extra"],
    answer: 1,
    fact: "The Eid prayer features 6 additional takbeers — 3 in the first rak'ah and 3 in the second — making it distinct from regular prayers.",
  },
];

const RESULTS = [
  { min: 0,  max: 3,  label: "Keep Learning!",       msg: "Don't worry — every Eid is a chance to learn more. Explore the site for fascinating facts!",  emoji: "📖" },
  { min: 4,  max: 6,  label: "Good Effort!",          msg: "You know your Eid basics! A bit more reading and you'll be an expert.",                        emoji: "🌙" },
  { min: 7,  max: 8,  label: "Great Knowledge!",      msg: "Impressive! You clearly know and love Eid. Just a couple more to perfect your score.",          emoji: "⭐" },
  { min: 9,  max: 10, label: "Eid Expert! 🎉",         msg: "Mashallah! A perfect or near-perfect score. You are a true Eid scholar!",                       emoji: "🏆" },
];

export default function EidQuizPage() {
  const [current, setCurrent]   = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore]       = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers]   = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));

  const q = QUESTIONS[current];
  const result = RESULTS.find((r) => score >= r.min && score <= r.max)!;
  const pct = Math.round((score / QUESTIONS.length) * 100);

  function choose(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
    if (idx === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (current + 1 >= QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswers(Array(QUESTIONS.length).fill(null));
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[38vh] flex items-center justify-center overflow-hidden bg-[#0a1a0f] pt-20 pb-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a4731_0%,#0a1a0f_65%)]" />
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#d4af37]/70 text-sm tracking-[0.3em] uppercase font-semibold mb-3"
          >
            Test Your Knowledge
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-3"
          >
            Eid{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f0d060]">
              Quiz
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/50 text-sm"
          >
            10 questions · Multiple choice · No time limit
          </motion.p>
        </div>
      </section>

      {/* Quiz body */}
      <section className="bg-[#faf7f0] min-h-screen py-14 px-4">
        <div className="max-w-2xl mx-auto">

          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-[#4a5568] font-semibold mb-2">
                    <span>Question {current + 1} of {QUESTIONS.length}</span>
                    <span className="text-[#d4af37]">{score} correct so far</span>
                  </div>
                  <div className="h-2 bg-[#e8dfd0] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#1a4731] to-[#d4af37] rounded-full"
                      initial={{ width: `${(current / QUESTIONS.length) * 100}%` }}
                      animate={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                {/* Question card */}
                <div className="bg-white rounded-3xl shadow-lg border border-[#f0e8d5] p-7 mb-5">
                  <p className="text-[#0a1a0f] text-xl md:text-2xl font-bold leading-snug">
                    {q.q}
                  </p>
                </div>

                {/* Options */}
                <div className="grid gap-3 mb-5">
                  {q.options.map((opt, i) => {
                    const isCorrect  = i === q.answer;
                    const isSelected = i === selected;
                    const revealed   = selected !== null;

                    let style = "border-[#e8dfd0] bg-white text-[#1a1a1a] hover:border-[#d4af37]/60 hover:bg-[#fdf8ee]";
                    if (revealed) {
                      if (isCorrect)        style = "border-[#1a4731] bg-[#1a4731]/10 text-[#1a4731]";
                      else if (isSelected)  style = "border-red-400 bg-red-50 text-red-700";
                      else                  style = "border-[#e8dfd0] bg-white/50 text-[#9ca3af]";
                    }

                    return (
                      <motion.button
                        key={i}
                        whileHover={selected === null ? { scale: 1.015 } : {}}
                        whileTap={selected === null ? { scale: 0.98 } : {}}
                        onClick={() => choose(i)}
                        className={`w-full text-left px-5 py-4 rounded-2xl border-2 font-medium text-sm md:text-base transition-all duration-200 flex items-center gap-3 ${style} ${selected === null ? "cursor-pointer" : "cursor-default"}`}
                      >
                        {/* Letter badge */}
                        <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                          revealed && isCorrect  ? "bg-[#1a4731] border-[#1a4731] text-white" :
                          revealed && isSelected ? "bg-red-500 border-red-500 text-white" :
                          "border-current text-current opacity-60"
                        }`}>
                          {["A","B","C","D"][i]}
                        </span>
                        <span>{opt}</span>
                        {revealed && isCorrect  && <span className="ml-auto text-lg">✓</span>}
                        {revealed && isSelected && !isCorrect && <span className="ml-auto text-lg">✗</span>}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Fact reveal */}
                <AnimatePresence>
                  {selected !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`rounded-2xl px-5 py-4 mb-5 border text-sm leading-relaxed ${
                        selected === q.answer
                          ? "bg-[#1a4731]/8 border-[#1a4731]/25 text-[#1a4731]"
                          : "bg-red-50 border-red-200 text-red-800"
                      }`}
                    >
                      <span className="font-semibold">
                        {selected === q.answer ? "✓ Correct! " : "✗ Not quite. "}
                      </span>
                      {q.fact}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Next button */}
                {selected !== null && (
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={next}
                    className="w-full bg-[#1a4731] hover:bg-[#0f2b1f] text-white font-bold py-4 rounded-2xl transition-colors duration-200 text-base"
                  >
                    {current + 1 >= QUESTIONS.length ? "See Results →" : "Next Question →"}
                  </motion.button>
                )}
              </motion.div>
            ) : (
              /* Results screen */
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                {/* Score circle */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <svg width="160" height="160" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="68" fill="none" stroke="#e8dfd0" strokeWidth="10" />
                    <motion.circle
                      cx="80" cy="80" r="68"
                      fill="none"
                      stroke="#d4af37"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 68}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 68 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 68 * (1 - pct / 100) }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      transform="rotate(-90 80 80)"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-black text-[#0a1a0f]">{score}/{QUESTIONS.length}</span>
                    <span className="text-[#d4af37] text-sm font-semibold">{pct}%</span>
                  </div>
                </div>

                <div className="text-5xl mb-3">{result.emoji}</div>
                <h2 className="text-3xl font-bold text-[#0a1a0f] mb-2">{result.label}</h2>
                <p className="text-[#4a5568] max-w-sm mx-auto mb-8 leading-relaxed">{result.msg}</p>

                {/* Answer review */}
                <div className="bg-white rounded-3xl border border-[#f0e8d5] p-5 mb-7 text-left shadow-sm">
                  <p className="text-xs font-bold text-[#d4af37] tracking-widest uppercase mb-4">Your Answers</p>
                  <div className="space-y-2">
                    {QUESTIONS.map((question, i) => {
                      const correct = answers[i] === question.answer;
                      return (
                        <div key={i} className="flex items-start gap-3 text-sm">
                          <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${correct ? "bg-[#1a4731] text-white" : "bg-red-500 text-white"}`}>
                            {correct ? "✓" : "✗"}
                          </span>
                          <span className={`leading-snug ${correct ? "text-[#374151]" : "text-[#374151]"}`}>
                            {question.q}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={restart}
                    className="bg-[#d4af37] hover:bg-[#b8962e] text-[#0a1a0f] font-bold px-8 py-3.5 rounded-full transition-colors duration-200"
                  >
                    Try Again
                  </button>
                  <Link
                    href="/"
                    className="bg-[#0a1a0f] hover:bg-[#1a4731] text-white font-semibold px-8 py-3.5 rounded-full transition-colors duration-200"
                  >
                    Back to Home
                  </Link>
                  <Link
                    href="/story"
                    className="border-2 border-[#1a4731] text-[#1a4731] hover:bg-[#1a4731] hover:text-white font-semibold px-8 py-3.5 rounded-full transition-colors duration-200"
                  >
                    Learn More
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
