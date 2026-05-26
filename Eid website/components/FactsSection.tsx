"use client";
import { motion } from "framer-motion";

const facts = [
  {
    icon: "🌍",
    stat: "1.8 Billion",
    label: "Muslim Celebrants",
    body: "Eid is observed by over 1.8 billion Muslims across 180+ countries — one of the largest religious celebrations on Earth.",
  },
  {
    icon: "📅",
    stat: "~11 Days",
    label: "Earlier Each Year",
    body: "Because the Islamic calendar is purely lunar, Eid shifts approximately 10–11 days earlier every Gregorian year, cycling through all seasons.",
  },
  {
    icon: "🌙",
    stat: "The Crescent",
    label: "Starts Eid",
    body: "Traditionally, Eid begins with the sighting of the new crescent moon. Many communities also rely on astronomical calculations.",
  },
  {
    icon: "💰",
    stat: "Eidi",
    label: "Gift Tradition",
    body: "Elders give children gifts of money or presents called \"Eidi\" as a token of love and blessing — a treasured tradition across cultures.",
  },
  {
    icon: "🕌",
    stat: "Salat al-Eid",
    label: "Special Prayer",
    body: "The Eid prayer is offered in congregation shortly after sunrise, featuring 6 extra takbeers. It's held at mosques or large open grounds.",
  },
  {
    icon: "💝",
    stat: "Zakat al-Fitr",
    label: "Obligatory Charity",
    body: "Before the Eid al-Fitr prayer, every Muslim must give Zakat al-Fitr — charity to ensure the poor can also celebrate.",
  },
  {
    icon: "🍽️",
    stat: "Festive Foods",
    label: "Across the World",
    body: "Every culture has signature Eid dishes: Sheer Khurma in South Asia, Kahk in Egypt, Maamoul in the Levant, and Baklava in Turkey.",
  },
  {
    icon: "👗",
    stat: "New Clothes",
    label: "Sunnah Tradition",
    body: "Wearing new or freshly washed clothes on Eid is a Prophetic tradition (Sunnah), symbolising renewal, joy, and gratitude to God.",
  },
  {
    icon: "🐑",
    stat: "1/3 — 1/3 — 1/3",
    label: "Qurbani Division",
    body: "During Eid al-Adha, the sacrificed animal's meat is divided into thirds: one for the family, one for friends/neighbours, one for the poor.",
  },
  {
    icon: "🕋",
    stat: "Hajj",
    label: "Eid al-Adha Link",
    body: "Eid al-Adha coincides with the peak of the Hajj pilgrimage. Pilgrims in Mecca perform the Qurbani as part of the Hajj rites.",
  },
  {
    icon: "🤝",
    stat: '"Eid Mubarak"',
    label: "Universal Greeting",
    body: '"Eid Mubarak" (عيد مبارك) means "Blessed Eid." Other greetings include "Eid Said" (Happy Eid) and "Kul Aam Wa Antum Bikhair."',
  },
  {
    icon: "📿",
    stat: "Takbeerat",
    label: "The Eid Chant",
    body: 'Muslims recite the takbeerat — "Allahu Akbar, Allahu Akbar, La ilaha illallah" — from the night before until after the Eid prayer.',
  },
];

export default function FactsSection() {
  return (
    <section id="facts" className="bg-[#faf7f0] py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#d4af37] text-sm font-semibold tracking-[0.25em] uppercase">
            Did You Know?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0a1a0f] mt-3">
            Fascinating{" "}
            <span className="text-[#1a4731]">Eid Facts</span>
          </h2>
          <p className="text-[#4a5568] mt-4 max-w-xl mx-auto text-lg">
            From ancient traditions to global customs, explore what makes Eid so
            special.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {facts.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-[#f0e8d5] hover:shadow-md hover:border-[#d4af37]/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0 mt-0.5">{fact.icon}</div>
                <div>
                  <div className="text-[#1a4731] font-bold text-base leading-tight">
                    {fact.stat}
                  </div>
                  <div className="text-[#d4af37] text-xs font-semibold tracking-wider uppercase mb-2">
                    {fact.label}
                  </div>
                  <p className="text-[#4a5568] text-sm leading-relaxed">
                    {fact.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Transition strip to dark section */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-[#0a1a0f]" />
    </section>
  );
}
