"use client";
import { motion } from "framer-motion";

const eids = [
  {
    arabic: "عيد الفطر",
    name: "Eid al-Fitr",
    subtitle: "The Festival of Breaking the Fast",
    icon: "🌙",
    color: "from-[#1a4731] to-[#2d6a4f]",
    description:
      "Eid al-Fitr marks the joyous end of Ramadan — the Islamic holy month of fasting. After 29 or 30 days of fasting from dawn to sunset, Muslims around the world celebrate with prayers, feasting, and gratitude.",
    details: [
      { label: "When", value: "1st of Shawwal (10th Islamic month)" },
      { label: "Duration", value: "1–3 days" },
      { label: "Meaning", value: '"Festival of Breaking the Fast"' },
      { label: "Key Act", value: "Zakat al-Fitr (obligatory charity)" },
    ],
  },
  {
    arabic: "عيد الأضحى",
    name: "Eid al-Adha",
    subtitle: "The Festival of Sacrifice",
    icon: "🐑",
    color: "from-[#7c4d00] to-[#a07c1a]",
    description:
      "Eid al-Adha honours the profound devotion of Prophet Ibrahim (AS), who demonstrated ultimate obedience to God. It coincides with the annual Hajj pilgrimage, the largest gathering of people on Earth.",
    details: [
      { label: "When", value: "10th of Dhul Hijjah (12th Islamic month)" },
      { label: "Duration", value: "3–4 days" },
      { label: "Meaning", value: '"Festival of Sacrifice"' },
      { label: "Key Act", value: "Qurbani (animal sacrifice)" },
    ],
  },
];

export default function WhatIsEidSection() {
  return (
    <section
      id="about"
      className="bg-[#faf7f0] py-24 px-6 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#d4af37] text-sm font-semibold tracking-[0.25em] uppercase">
            Understanding Eid
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0a1a0f] mt-3">
            What is{" "}
            <span className="text-[#1a4731]">Eid?</span>
          </h2>
          <p className="text-[#4a5568] mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
            The word <strong className="text-[#1a4731]">&quot;Eid&quot; (عيد)</strong> means
            &quot;feast,&quot; &quot;festival,&quot; or &quot;holiday&quot; in Arabic. Islam has two major
            Eids, each carrying deep spiritual significance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {eids.map((eid, i) => (
            <motion.div
              key={eid.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="rounded-3xl overflow-hidden shadow-xl"
            >
              {/* Card header */}
              <div
                className={`bg-gradient-to-br ${eid.color} p-8 text-white`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white/60 text-sm font-medium tracking-widest uppercase mb-1">
                      {eid.subtitle}
                    </p>
                    <h3 className="text-3xl font-bold">{eid.name}</h3>
                    <p className="text-[#d4af37] text-2xl mt-1 font-light">
                      {eid.arabic}
                    </p>
                  </div>
                  <span className="text-5xl">{eid.icon}</span>
                </div>
              </div>

              {/* Card body */}
              <div className="bg-white p-8">
                <p className="text-[#4a5568] leading-relaxed mb-6">
                  {eid.description}
                </p>
                <dl className="grid grid-cols-2 gap-4">
                  {eid.details.map((d) => (
                    <div key={d.label} className="bg-[#faf7f0] rounded-xl p-4">
                      <dt className="text-[#d4af37] text-xs font-semibold tracking-widest uppercase mb-1">
                        {d.label}
                      </dt>
                      <dd className="text-[#1a1a1a] font-medium text-sm leading-snug">
                        {d.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-[#1a4731] text-xl md:text-2xl font-medium italic max-w-2xl mx-auto leading-relaxed">
            &quot;Every people has a festival, and this is our festival.&quot;
          </p>
          <cite className="text-[#d4af37] text-sm mt-3 block not-italic font-semibold tracking-wide">
            — Prophet Muhammad (ﷺ), Sahih al-Bukhari
          </cite>
        </motion.blockquote>
      </div>

      {/* Transition strip to dark section */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-[#0a1a0f]" />
    </section>
  );
}
