"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const MORNING_STEPS = [
  {
    time: "Before Fajr / After Fajr",
    icon: "🌙",
    title: "Wake early & make Ghusl",
    body: "Perform a full ritual bath (Ghusl) — it is a Sunnah of the Prophet ﷺ to do so on both Eids. Use fragrance/perfume after bathing.",
  },
  {
    time: "After Ghusl",
    icon: "👗",
    title: "Wear your best clothes",
    body: "Putting on new or your finest clean clothes is Sunnah. The Prophet ﷺ had a special garment he wore only on the two Eids and Jumu'ah.",
  },
  {
    time: "Eid al-Fitr only",
    icon: "🍬",
    title: "Eat something sweet before the prayer",
    body: 'For Eid al-Fitr, eat an odd number of dates (3, 5, or 7) before leaving for the prayer. The Prophet ﷺ would not go out until he had eaten. For Eid al-Adha, it is Sunnah NOT to eat until after the prayer.',
    highlight: true,
  },
  {
    time: "Walking to the prayer",
    icon: "🚶",
    title: "Recite the Takbeerat aloud",
    body: 'Recite loudly on the way to the prayer ground:\nاللهُ أَكْبَر، اللهُ أَكْبَر، لَا إِلَهَ إِلَّا اللهُ، واللهُ أَكْبَر، اللهُ أَكْبَر، وَلِلَّهِ الحَمْد\n"Allahu Akbar, Allahu Akbar, La ilaha illallah, wallahu Akbar, Allahu Akbar, walillahil hamd."',
    arabic: true,
  },
  {
    time: "Route to prayer",
    icon: "🛤️",
    title: "Go one way, return another",
    body: "The Prophet ﷺ used to go to the Eid prayer by one route and return home by a different route. Scholars say this was to greet more people and spread the joy of Eid.",
  },
];

const PRAYER_STEPS = [
  {
    step: "1",
    title: "Opening Takbeer (Takbeeratul Ihraam)",
    body: "The Imam raises both hands and says \"Allahu Akbar\" — this officially begins the prayer. Hands are then folded and the opening supplication (du’a al-istiftah) is recited silently.",
    arabic: "اللهُ أَكْبَر",
    transliteration: "Allahu Akbar",
  },
  {
    step: "2",
    title: "6 Extra Takbeers in the First Rak'ah",
    body: "After the opening, the Imam says 6 additional Takbeers (hands raised each time). Between each Takbeer there is a short pause — you may silently praise Allah. This is what makes the Eid prayer unique.",
    arabic: "اللهُ أَكْبَر، اللهُ أَكْبَر، اللهُ أَكْبَر",
    transliteration: "Allahu Akbar × 6",
  },
  {
    step: "3",
    title: "Recitation of Surah al-Fatihah & another Surah",
    body: 'The Imam recites Surah al-Fatihah aloud, followed by another surah (commonly Surah al-A\'la — "Sabbihisma Rabbikal A\'la"). Listen attentively.',
    arabic: "سَبِّحِ اسْمَ رَبِّكَ الْأَعْلَى",
    transliteration: 'Surah al-A\'la (87)',
  },
  {
    step: "4",
    title: "Rukoo', Sujood — complete first rak'ah normally",
    body: "After the recitation, the first rak'ah continues normally: bow (Rukoo'), stand, prostrate twice (Sujood), and rise for the second rak'ah.",
  },
  {
    step: "5",
    title: "5 Extra Takbeers at the start of the Second Rak'ah",
    body: "At the beginning of the second rak'ah — BEFORE the recitation — the Imam says 5 additional Takbeers (hands raised each time). Then Surah al-Fatihah is recited, followed by another surah (often Surah al-Ghashiyah).",
    arabic: "اللهُ أَكْبَر، اللهُ أَكْبَر، اللهُ أَكْبَر",
    transliteration: "Allahu Akbar × 5",
  },
  {
    step: "6",
    title: "Complete the second rak'ah & Tasleem",
    body: "The second rak'ah continues normally with Rukoo' and Sujood. The prayer ends with the Imam giving Tasleem (Assalamu Alaykum wa Rahmatullah) to the right and left.",
    arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ",
    transliteration: "Assalamu Alaykum wa Rahmatullah",
  },
  {
    step: "7",
    title: "The Khutbah (Sermon)",
    body: "After the prayer — unlike Jumu'ah — the Imam delivers two Eid khutbahs. Listening is Sunnah (not obligatory). The khutbah covers topics of gratitude, the significance of the Eid, and community advice.",
  },
];

const AFTER_STEPS = [
  { icon: "🤝", title: "Exchange Eid greetings",      body: 'Say "Eid Mubarak" (عيد مبارك) or "Taqabbalallahu minna wa minkum" (May Allah accept from us and from you). The Companions of the Prophet ﷺ used this greeting.' },
  { icon: "👨‍👩‍👧‍👦", title: "Visit family & relatives",    body: "Strengthen family bonds on this blessed day. Visit parents, grandparents, aunts and uncles. The Prophet ﷺ emphasised maintaining the ties of kinship." },
  { icon: "🎁", title: "Give Eidi to children",        body: "Elders give children gifts of money or presents — spreading joy and making the day special for the little ones." },
  { icon: "🐑", title: "Perform Qurbani (Eid al-Adha)", body: "After the prayer, those who are able perform the animal sacrifice. The meat is divided: one-third for your family, one-third for friends and neighbours, one-third for the poor." },
  { icon: "🍽️", title: "Share a festive meal",         body: "Gather with loved ones for a celebration meal. South Asian families often make Sheer Khurma, biryani, and sweets. Invite neighbours and those who may be alone." },
  { icon: "💰", title: "Give to those in need",         body: "Eid is a day of generosity. Seek out those less fortunate in your community — distribute food, clothes, or money. The spirit of Eid is that everyone celebrates." },
];

export default function EidGuide() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[42vh] flex items-center justify-center overflow-hidden bg-[#0a1a0f] pt-20 pb-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a4731_0%,#0a1a0f_65%)]" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-[#d4af37]/70 text-sm tracking-[0.3em] uppercase font-semibold mb-3"
          >
            Your Complete Guide
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4"
          >
            What to Do on{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f0d060]">
              Eid Day
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-white/55 text-base max-w-xl mx-auto leading-relaxed"
          >
            From the moment you wake up to sharing the festive meal — a step-by-step guide to making the most of Eid.
          </motion.p>
        </div>
      </section>

      {/* ── Morning routine ── */}
      <section className="bg-[#faf7f0] py-20 px-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fade()} className="text-center mb-12">
            <span className="text-[#d4af37] text-xs font-bold tracking-[0.35em] uppercase">Step by step</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1a0f] mt-3">Morning of Eid</h2>
            <p className="text-[#4a5568] mt-3 text-sm max-w-md mx-auto">
              The Sunnah practices before the prayer set the tone for the whole day.
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#d4af37]/20 hidden sm:block" />

            <div className="space-y-6">
              {MORNING_STEPS.map((s, i) => (
                <motion.div key={i} {...fade(i * 0.08)} className="sm:pl-16 relative">
                  {/* Timeline dot */}
                  <div className="hidden sm:flex absolute left-0 top-4 w-12 h-12 rounded-full bg-[#0a1a0f] border-2 border-[#d4af37]/40 items-center justify-center text-xl">
                    {s.icon}
                  </div>
                  <div className={`rounded-2xl p-5 border ${s.highlight ? "bg-[#d4af37]/8 border-[#d4af37]/30" : "bg-white border-[#f0e8d5]"} shadow-sm`}>
                    <p className="text-[#d4af37] text-[10px] font-bold tracking-widest uppercase mb-1">{s.time}</p>
                    <h3 className="text-[#0a1a0f] font-bold text-base mb-2 flex items-center gap-2">
                      <span className="sm:hidden text-lg">{s.icon}</span>
                      {s.title}
                    </h3>
                    {s.arabic && (
                      <p dir="rtl" className="text-[#1a4731] text-lg font-bold mb-2" style={{ fontFamily: "serif" }}>
                        {s.body.split("\n")[1]}
                      </p>
                    )}
                    <p className="text-[#4a5568] text-sm leading-relaxed">
                      {s.arabic ? s.body.split("\n")[2] : s.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-[#0a1a0f]" />
      </section>

      {/* ── How to perform Eid prayer ── */}
      <section className="bg-[#0a1a0f] py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1a4731_0%,transparent_60%)] opacity-40" />

        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div {...fade()} className="text-center mb-12">
            <span className="text-[#d4af37] text-xs font-bold tracking-[0.35em] uppercase">Step by step</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
              How to Perform the{" "}
              <span className="text-[#d4af37]">Eid Prayer</span>
            </h2>
            <p className="text-white/50 mt-3 text-sm max-w-md mx-auto">
              The Eid prayer (Salat al-Eid) is 2 rak'ahs with additional Takbeers. Here's exactly what happens.
            </p>

            {/* Key fact banner */}
            <div className="mt-6 inline-block bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-2xl px-6 py-3 text-sm text-[#d4af37]">
              🕌 Eid prayer is performed in congregation — at a mosque or open ground — after sunrise
            </div>
          </motion.div>

          <div className="space-y-4">
            {PRAYER_STEPS.map((s, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.07)}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-4"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] font-black text-sm">
                  {s.step}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-base mb-1.5">{s.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-2">{s.body}</p>
                  {s.arabic && (
                    <div className="bg-[#d4af37]/8 border border-[#d4af37]/20 rounded-xl px-4 py-2.5 mt-2">
                      <p dir="rtl" className="text-[#f0d060] text-lg font-bold leading-relaxed" style={{ fontFamily: "serif" }}>
                        {s.arabic}
                      </p>
                      <p className="text-[#d4af37]/60 text-xs mt-1 italic">{s.transliteration}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Madhab note */}
          <motion.p {...fade(0.4)} className="text-white/25 text-xs text-center mt-8 max-w-md mx-auto leading-relaxed">
            Note: The number of extra Takbeers may vary slightly between madhabs (schools of jurisprudence). The above follows the Hanafi and Shafi'i method most common in South Asia and Southeast Asia. Consult your local imam if unsure.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-[#faf7f0]" />
      </section>

      {/* ── After the prayer ── */}
      <section className="bg-[#faf7f0] py-20 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fade()} className="text-center mb-12">
            <span className="text-[#d4af37] text-xs font-bold tracking-[0.35em] uppercase">Rest of the day</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1a0f] mt-3">After the Prayer</h2>
            <p className="text-[#4a5568] mt-3 text-sm max-w-md mx-auto">
              The prayer is just the beginning — here's how to spend the rest of your blessed Eid day.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AFTER_STEPS.map((s, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.07)}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-[#f0e8d5] p-5 shadow-sm hover:shadow-md hover:border-[#d4af37]/30 transition-all duration-200"
              >
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="text-[#0a1a0f] font-bold text-sm mb-2">{s.title}</h3>
                <p className="text-[#4a5568] text-sm leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>

          {/* Closing du'a */}
          <motion.div {...fade(0.3)} className="mt-14 text-center">
            <div className="inline-block bg-[#0a1a0f] rounded-3xl px-8 py-7 max-w-lg">
              <p dir="rtl" className="text-[#f0d060] text-2xl font-bold mb-2" style={{ fontFamily: "serif" }}>
                تَقَبَّلَ اللهُ مِنَّا وَمِنْكُمْ
              </p>
              <p className="text-white/50 text-sm italic mb-1">Taqabbalallahu minna wa minkum</p>
              <p className="text-white/40 text-xs">May Allah accept from us and from you</p>
            </div>
          </motion.div>
        </div>

        {/* CTA links */}
        <motion.div {...fade(0.4)} className="mt-12 flex flex-wrap justify-center gap-3">
          <Link href="/" className="bg-[#0a1a0f] hover:bg-[#1a4731] text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm">
            ← Back to Home
          </Link>
          <Link href="/story" className="border-2 border-[#1a4731] text-[#1a4731] hover:bg-[#1a4731] hover:text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm">
            The Story of Eid
          </Link>
          <Link href="/quiz" className="bg-[#d4af37] hover:bg-[#b8962e] text-[#0a1a0f] font-semibold px-6 py-3 rounded-full transition-colors text-sm">
            Take the Quiz ✦
          </Link>
        </motion.div>
      </section>
    </>
  );
}
