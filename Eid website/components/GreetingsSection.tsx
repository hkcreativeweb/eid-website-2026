"use client";
import { motion } from "framer-motion";

const FEATURED = [
  { lang: "Arabic",  flag: "🇸🇦", text: "عيد مبارك",  dir: "rtl" as const, roman: "Eid Mubarak" },
  { lang: "Urdu",    flag: "🇵🇰", text: "عید مبارک",   dir: "rtl" as const, roman: "Eid Mubarak" },
];

// Four alternating card styles
const STYLES = [
  { bg: "bg-[#0a1a0f]",   text: "text-[#d4af37]",  lang: "text-[#d4af37]/50", border: "border-[#d4af37]/20" },
  { bg: "bg-[#d4af37]",   text: "text-[#0a1a0f]",  lang: "text-[#0a1a0f]/60", border: "border-transparent"  },
  { bg: "bg-[#1a4731]",   text: "text-white",       lang: "text-white/50",     border: "border-white/10"     },
  { bg: "bg-[#faf7f0]",   text: "text-[#1a4731]",  lang: "text-[#1a4731]/50", border: "border-[#1a4731]/10" },
] as const;

const GREETINGS = [
  { lang: "English",    flag: "🇬🇧", text: "Eid Mubarak",           dir: "ltr" as const, style: 0 },
  { lang: "Bengali",    flag: "🇧🇩", text: "ঈদ মোবারক",             dir: "ltr" as const, style: 1 },
  { lang: "Turkish",    flag: "🇹🇷", text: "Bayramınız Mübarek",    dir: "ltr" as const, style: 2 },
  { lang: "Indonesian", flag: "🇮🇩", text: "Selamat Hari Raya",     dir: "ltr" as const, style: 3 },
  { lang: "Persian",    flag: "🇮🇷", text: "عید سعید مبارک",        dir: "rtl" as const, style: 0 },
  { lang: "Chinese",    flag: "🇨🇳", text: "开斋节快乐",             dir: "ltr" as const, style: 1 },
  { lang: "Malay",      flag: "🇲🇾", text: "Selamat Aidiladha",     dir: "ltr" as const, style: 2 },
  { lang: "Somali",     flag: "🇸🇴", text: "Ciid Wanaagsan",        dir: "ltr" as const, style: 3 },
  { lang: "Hausa",      flag: "🇳🇬", text: "Barka da Sallah",       dir: "ltr" as const, style: 0 },
  { lang: "Bosnian",    flag: "🇧🇦", text: "Bajram Mübarek",        dir: "ltr" as const, style: 1 },
  { lang: "French",     flag: "🇫🇷", text: "Bonne Fête de l'Aïd",  dir: "ltr" as const, style: 2 },
  { lang: "Spanish",    flag: "🇪🇸", text: "Feliz Eid al-Adha",    dir: "ltr" as const, style: 3 },
  { lang: "Tamil",      flag: "🇮🇳", text: "ஈத் முபாரக்",          dir: "ltr" as const, style: 0 },
  { lang: "Pashto",     flag: "🇦🇫", text: "اختر دی مبارک شه",     dir: "rtl" as const, style: 1 },
  { lang: "Russian",    flag: "🇷🇺", text: "Ид Мубарак",            dir: "ltr" as const, style: 2 },
  { lang: "Albanian",   flag: "🇦🇱", text: "Gëzuar Bajramin",       dir: "ltr" as const, style: 3 },
  { lang: "Swahili",    flag: "🇰🇪", text: "Eid Mubarak",           dir: "ltr" as const, style: 0 },
  { lang: "Filipino",   flag: "🇵🇭", text: "Maligayang Eid",        dir: "ltr" as const, style: 1 },
];

export default function GreetingsSection() {
  return (
    <section className="bg-[#0a1a0f] py-20 px-6 relative overflow-hidden pb-0">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a4731_0%,transparent_65%)] opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#d4af37] text-xs font-bold tracking-[0.35em] uppercase">
            Around the World
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 leading-tight">
            One Eid,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f0d060]">
              Every Language
            </span>
          </h2>
          <p className="text-white/50 mt-3 max-w-md mx-auto text-sm">
            1.8 billion Muslims — one joyful greeting across every tongue and land.
          </p>
        </motion.div>

        {/* ── Featured Arabic & Urdu ── */}
        <div className="grid sm:grid-cols-2 gap-5 mb-5">
          {FEATURED.map((item, i) => (
            <motion.div
              key={item.lang}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a4731] to-[#0a1a0f] border border-[#d4af37]/30 p-8 flex flex-col items-center justify-center text-center min-h-[160px] group"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-[#d4af37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-3xl mb-3">{item.flag}</div>
              <p
                dir={item.dir}
                className="text-[#f0d060] text-4xl md:text-5xl font-bold leading-tight mb-2"
                style={{ fontFamily: "serif" }}
              >
                {item.text}
              </p>
              <span className="text-[#d4af37]/50 text-xs font-semibold tracking-[0.25em] uppercase mt-1">
                {item.lang} · {item.roman}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ── Grid of all other languages ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {GREETINGS.map((item, i) => {
            const s = STYLES[item.style];
            return (
              <motion.div
                key={item.lang}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 5) * 0.06, duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.03 }}
                className={`${s.bg} border ${s.border} rounded-2xl p-4 flex flex-col items-center justify-center text-center min-h-[110px] transition-all duration-200 cursor-default`}
              >
                <span className="text-xl mb-2 leading-none">{item.flag}</span>
                <p
                  dir={item.dir}
                  className={`${s.text} text-lg md:text-xl font-bold leading-tight`}
                >
                  {item.text}
                </p>
                <span className={`${s.lang} text-[10px] font-semibold tracking-widest uppercase mt-2`}>
                  {item.lang}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-white/25 text-xs mt-10 mb-10 tracking-wide"
        >
          عيد مبارك · Eid Mubarak · ঈদ মোবারক · Bayramınız Mübarek · Ciid Wanaagsan · Barka da Sallah
        </motion.p>
      </div>

      {/* Transition strip to light section */}
      <div className="-mx-6 h-16 bg-gradient-to-b from-[#0a1a0f] to-[#faf7f0]" />
    </section>
  );
}
