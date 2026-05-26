"use client";
import { motion } from "framer-motion";

const regions = [
  {
    flag: "🇵🇰🇮🇳🇧🇩",
    region: "South Asia",
    countries: "Pakistan, India, Bangladesh",
    color: "bg-emerald-50 border-emerald-200",
    headerColor: "bg-[#1a4731]",
    traditions: [
      "Sheer Khurma — vermicelli pudding cooked with dates and milk",
      "Children receive Eidi (money gifts) from elders",
      "Women apply intricate henna (mehndi) designs",
      "New clothes worn; bazaars bustle with shopping",
      "Extended family gatherings with elaborate feasts",
    ],
  },
  {
    flag: "🇸🇦🇦🇪🇪🇬",
    region: "Middle East",
    countries: "Saudi Arabia, UAE, Egypt",
    color: "bg-amber-50 border-amber-200",
    headerColor: "bg-[#7c4d00]",
    traditions: [
      "Kahk — Egyptian shortbread cookies dusted with powdered sugar",
      "Family visits with traditional Arabic coffee and dates",
      "Oud perfume and incense (bakhoor) burned during celebrations",
      "Children's parks and fairs open specially for Eid",
      "Night gatherings with traditional folk music",
    ],
  },
  {
    flag: "🇹🇷",
    region: "Turkey",
    countries: "Turkey & Turkish diaspora",
    color: "bg-red-50 border-red-200",
    headerColor: "bg-[#8b1a1a]",
    traditions: [
      "Called \"Şeker Bayramı\" (Sugar Feast) for Eid al-Fitr",
      "Children go door-to-door collecting sweets and candy",
      "Bayram visits — kissing elders' hands as a mark of respect",
      "Turkish delight and baklava served to every guest",
      "Special Eid television programmes and concerts",
    ],
  },
  {
    flag: "🇮🇩🇲🇾",
    region: "Southeast Asia",
    countries: "Indonesia, Malaysia",
    color: "bg-green-50 border-green-200",
    headerColor: "bg-[#2d6a4f]",
    traditions: [
      "Mudik — mass homecoming travel across the archipelago",
      "Ketupat — diamond-shaped rice cakes eaten with rendang",
      "Open-house celebrations (rumah terbuka) welcome all visitors",
      "Colourful traditional attire (baju kurung / batik)",
      "Firecracker and lantern displays in many regions",
    ],
  },
  {
    flag: "🌍",
    region: "West Africa",
    countries: "Nigeria, Senegal, Ghana",
    color: "bg-yellow-50 border-yellow-200",
    headerColor: "bg-[#5a3e00]",
    traditions: [
      "Vibrant communal prayers with thousands in open fields",
      "Colourful traditional garments (agbada, boubou, kente)",
      "Communal feasting with jollof rice and suya",
      "Drumming, singing, and traditional dance celebrations",
      "Qurbani meat widely distributed to the poorest communities",
    ],
  },
  {
    flag: "🇬🇧🇺🇸🇨🇦",
    region: "Western Countries",
    countries: "UK, USA, Canada, Australia",
    color: "bg-blue-50 border-blue-200",
    headerColor: "bg-[#1e3a5f]",
    traditions: [
      "Large mosque congregations for Eid prayer — often overflowing",
      "Eid festivals and fairs in major city parks",
      "Halal butchers and South Asian grocers see huge demand",
      "Interfaith Eid celebrations welcoming non-Muslim neighbours",
      "Workplace and school Eid greetings increasingly mainstream",
    ],
  },
];

export default function TraditionsSection() {
  return (
    <section id="traditions" className="bg-[#0a1a0f] py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a4731_0%,transparent_65%)] opacity-25" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#d4af37] text-sm font-semibold tracking-[0.25em] uppercase">
            Global Celebrations
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Eid Around the{" "}
            <span className="text-[#d4af37]">World</span>
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
            While the spirit of Eid is universal, every culture adds its own
            beautiful flavour — from South Asian sweetmeats to Turkish candy
            feasts and African communal prayers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((r, i) => (
            <motion.div
              key={r.region}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.15, duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <div className={`${r.headerColor} px-6 py-5`}>
                <div className="text-2xl mb-2">{r.flag}</div>
                <h3 className="text-white font-bold text-xl">{r.region}</h3>
                <p className="text-white/60 text-sm mt-0.5">{r.countries}</p>
              </div>
              <div className="p-6">
                <ul className="space-y-2.5">
                  {r.traditions.map((t, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-[#374151]">
                      <span className="text-[#d4af37] mt-0.5 flex-shrink-0">✦</span>
                      <span className="leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Universal message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-2xl px-8 py-6 max-w-xl">
            <p className="text-white/80 text-lg leading-relaxed">
              Across every continent and culture, Eid carries one universal
              message —{" "}
              <span className="text-[#d4af37] font-semibold">
                gratitude, generosity, and togetherness.
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
