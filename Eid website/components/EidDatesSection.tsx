"use client";
import { motion } from "framer-motion";

const dates = [
  {
    name: "Eid al-Fitr 2026",
    arabic: "عيد الفطر",
    gregorian: "March 20, 2026",
    hijri: "1 Shawwal 1447 AH",
    status: "passed" as const,
    description:
      "Marked the end of the blessed month of Ramadan. Muslims broke their 30-day fast with prayer, charity, and celebration.",
    icon: "🌙",
    color: "border-white/10 bg-white/5",
    textColor: "text-white/50",
  },
  {
    name: "Eid al-Adha 2026",
    arabic: "عيد الأضحى",
    gregorian: "May 27, 2026",
    hijri: "10 Dhul Hijjah 1447 AH",
    status: "soon" as const,
    description:
      "The Festival of Sacrifice, coinciding with the Hajj pilgrimage to Mecca. Observed with special prayers, Qurbani, and sharing meals with those in need.",
    icon: "⭐",
    color: "border-[#d4af37]/40 bg-[#d4af37]/5",
    textColor: "text-[#d4af37]",
  },
];

export default function EidDatesSection() {
  return (
    <section id="dates" className="bg-[#0a1a0f] py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#1a4731_0%,transparent_60%)] opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#1a4731_0%,transparent_60%)] opacity-30" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#d4af37] text-sm font-semibold tracking-[0.25em] uppercase">
            Islamic Calendar
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Eid <span className="text-[#d4af37]">2026</span> Dates
          </h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto text-base leading-relaxed">
            Eid dates are based on the lunar Islamic (Hijri) calendar and may
            vary by 1–2 days depending on moon sighting in your region.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {dates.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className={`rounded-2xl border p-8 relative ${d.color}`}
            >
              {d.status === "soon" && (
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/40 rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
                  <span className="text-[#d4af37] text-xs font-semibold">
                    Eid al-Adha 2026
                  </span>
                </div>
              )}
              {d.status === "passed" && (
                <div className="absolute top-4 right-4 bg-white/10 rounded-full px-3 py-1">
                  <span className="text-white/40 text-xs font-medium">Passed</span>
                </div>
              )}

              <div className="text-4xl mb-4">{d.icon}</div>
              <p className={`text-sm font-medium tracking-widest uppercase mb-1 ${d.textColor}`}>
                {d.arabic}
              </p>
              <h3
                className={`text-2xl font-bold mb-1 ${
                  d.status === "soon" ? "text-white" : "text-white/50"
                }`}
              >
                {d.name}
              </h3>

              <div className="flex flex-wrap gap-3 mt-4 mb-5">
                <span
                  className={`text-sm font-semibold px-4 py-1.5 rounded-full ${
                    d.status === "soon"
                      ? "bg-[#d4af37]/20 text-[#f0d060]"
                      : "bg-white/5 text-white/40"
                  }`}
                >
                  📅 {d.gregorian}
                </span>
                <span
                  className={`text-xs px-4 py-1.5 rounded-full ${
                    d.status === "soon"
                      ? "bg-white/10 text-white/60"
                      : "bg-white/5 text-white/30"
                  }`}
                >
                  {d.hijri}
                </span>
              </div>

              <p
                className={`text-sm leading-relaxed ${
                  d.status === "soon" ? "text-white/70" : "text-white/40"
                }`}
              >
                {d.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Lunar calendar note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
        >
          <p className="text-white/70 text-sm leading-relaxed max-w-2xl mx-auto">
            <span className="text-[#d4af37] font-semibold">Did you know?</span>{" "}
            The Islamic lunar year is about 10–11 days shorter than the Gregorian
            year, which means Eid shifts earlier each year, cycling through all
            seasons over approximately 33 years.
          </p>
        </motion.div>
      </div>

      {/* Transition strip to light section */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-[#faf7f0]" />
    </section>
  );
}
