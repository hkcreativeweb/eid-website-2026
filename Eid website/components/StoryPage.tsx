"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay },
});

// ── Timeline ────────────────────────────────────────────────────────────────
const TIMELINE = [
  { year: "609 CE",    event: "First revelation of the Quran to Prophet Muhammad ﷺ in the Cave of Hira during Ramadan." },
  { year: "622 CE",    event: "The Hijra — the Prophet ﷺ migrates from Mecca to Medina and finds two pre-Islamic festivals." },
  { year: "624 CE",    event: "First Eid al-Fitr celebrated after the inaugural Ramadan fast. First Eid al-Adha also established this year." },
  { year: "630 CE",    event: "Conquest of Mecca. Eid celebrated in the holy city for the very first time." },
  { year: "632 CE",    event: "The Prophet ﷺ leads his final Eid prayer and Farewell Hajj before passing away." },
  { year: "700s CE",   event: "Eid spreads with the Islamic world across Persia, North Africa, Central Asia, and Andalusia (Spain)." },
  { year: "969 CE",    event: "The Fatimid Caliphate in Cairo establishes magnificent Eid processions that become legendary." },
  { year: "1453 CE",   event: "Eid celebrated in Constantinople for the first time following the Ottoman conquest." },
  { year: "Today",     event: "Over 1.8 billion Muslims across 180+ countries celebrate Eid, making it one of the world's greatest festivals." },
];

export default function StoryPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#0a1a0f] pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a4731_0%,#0a1a0f_65%)]" />

        {/* decorative Arabic calligraphy watermark */}
        <div
          dir="rtl"
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          <p className="text-white/[0.03] text-[18vw] font-black leading-none whitespace-nowrap">
            عيد مبارك
          </p>
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#d4af37]/70 text-sm tracking-[0.3em] uppercase font-semibold mb-4"
          >
            History & Origins
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4"
          >
            The Story of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f0d060]">
              Eid
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            From a divine command in the desert to a global celebration of over
            1.8 billion souls — the remarkable history behind the world&apos;s
            most joyous Islamic festivals.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#faf7f0] to-transparent" />
      </section>

      {/* ── How Eid Was Established ── */}
      <section className="bg-[#faf7f0] py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fade(0)}>
            <SectionLabel>The Beginning</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1a0f] mt-2 mb-6">
              How Eid Was Established
            </h2>
          </motion.div>

          <motion.div {...fade(0.1)} className="prose-custom">
            <p>
              In <strong>622 CE (1 AH)</strong>, Prophet Muhammad ﷺ completed
              the Hijra — the migration from Mecca to Medina that marks the
              beginning of the Islamic calendar. When he arrived, he found the
              people of Medina observing two annual festivals filled with
              singing, dancing, and play — customs inherited from pre-Islamic
              times.
            </p>
            <p>
              The Prophet ﷺ asked: <em>&quot;What are these two days?&quot;</em> The people
              replied that they were days of festivity celebrated since before
              Islam. The Prophet ﷺ responded with words that would change the
              course of celebration for all of humanity:
            </p>
          </motion.div>

          <motion.blockquote {...fade(0.2)} className="story-quote">
            <p dir="rtl" className="text-[#d4af37] text-xl font-bold mb-2" style={{ fontFamily: "serif" }}>
              إِنَّ اللَّهَ قَدْ أَبْدَلَكُمْ بِهِمَا خَيْرًا مِنْهُمَا
            </p>
            <p className="text-white font-semibold text-lg">
              &quot;Indeed Allah has replaced them for you with something better —
              the Day of Adha and the Day of Fitr.&quot;
            </p>
            <cite className="text-[#d4af37]/70 text-sm mt-2 block not-italic">
              — Prophet Muhammad ﷺ &nbsp;|&nbsp; Sunan Abu Dawud
            </cite>
          </motion.blockquote>

          <motion.div {...fade(0.1)} className="prose-custom">
            <p>
              The first Eid al-Fitr was celebrated in <strong>2 AH (624 CE)</strong>,
              following the very first obligatory Ramadan fast — which had been
              revealed just months earlier. The first Eid al-Adha was
              established the same year, coinciding with the first Hajj
              pilgrimage to Mecca.
            </p>
            <p>
              From that moment in Medina, two days of pure joy, gratitude, and
              worship replaced what had come before — and the entire Muslim
              world has never stopped celebrating since.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Story of Ibrahim AS ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fade(0)}>
            <SectionLabel>Eid al-Adha</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1a0f] mt-2 mb-2">
              Ibrahim (AS) and the Ultimate Test
            </h2>
            <p className="text-[#d4af37] text-lg font-medium mb-6" dir="rtl" style={{ fontFamily: "serif" }}>
              قصة إبراهيم عليه السلام
            </p>
          </motion.div>

          <motion.div {...fade(0.1)} className="prose-custom">
            <p>
              Prophet Ibrahim (AS) — known as <em>Khalilullah</em>, the Friend
              of Allah — spent his life in relentless devotion to God. He had
              shattered his people&apos;s idols, survived being thrown into a
              great fire, and wandered far from his homeland in obedience to
              Allah&apos;s commands. Yet the greatest test was still to come.
            </p>
            <p>
              For years, Ibrahim (AS) had prayed for a righteous son. When his
              son <strong>Ismail (AS)</strong> was finally born, the joy was
              immeasurable. As Ismail grew into a young man of noble character,
              Ibrahim (AS) began to receive a recurring dream — a vision of
              himself sacrificing his son.
            </p>
          </motion.div>

          <motion.blockquote {...fade(0.2)} className="story-quote">
            <p dir="rtl" className="text-[#d4af37] text-lg font-bold mb-2" style={{ fontFamily: "serif" }}>
              يَا بُنَيَّ إِنِّي أَرَىٰ فِي الْمَنَامِ أَنِّي أَذْبَحُكَ فَانظُرْ مَاذَا تَرَىٰ
            </p>
            <p className="text-white font-semibold">
              &quot;O my son, indeed I have seen in a dream that I must sacrifice
              you — so see what you think.&quot;
            </p>
            <cite className="text-[#d4af37]/70 text-sm mt-2 block not-italic">
              — Ibrahim (AS) to Ismail (AS) &nbsp;|&nbsp; Quran 37:102
            </cite>
          </motion.blockquote>

          <motion.div {...fade(0.1)} className="prose-custom">
            <p>
              Ismail (AS) — though still young — did not tremble or protest. He
              replied with words that have echoed through the ages:
            </p>
          </motion.div>

          <motion.blockquote {...fade(0.2)} className="story-quote">
            <p dir="rtl" className="text-[#d4af37] text-lg font-bold mb-2" style={{ fontFamily: "serif" }}>
              يَا أَبَتِ افْعَلْ مَا تُؤْمَرُ ۖ سَتَجِدُنِي إِن شَاءَ اللَّهُ مِنَ الصَّابِرِينَ
            </p>
            <p className="text-white font-semibold">
              &quot;O my father, do as you are commanded. You will find me, if
              Allah wills, of the steadfast.&quot;
            </p>
            <cite className="text-[#d4af37]/70 text-sm mt-2 block not-italic">
              — Ismail (AS) &nbsp;|&nbsp; Quran 37:102
            </cite>
          </motion.blockquote>

          <motion.div {...fade(0.1)} className="prose-custom">
            <p>
              Father and son walked together to the place of sacrifice. Ibrahim
              (AS) laid his beloved son down. He raised the blade. The
              mountains stood still. The angels wept at the sight of such
              absolute surrender to God.
            </p>
            <p>
              Then — at the very moment of the act — a voice called out from
              the heavens:
            </p>
          </motion.div>

          <motion.blockquote {...fade(0.2)} className="story-quote">
            <p dir="rtl" className="text-[#d4af37] text-lg font-bold mb-2" style={{ fontFamily: "serif" }}>
              يَا إِبْرَاهِيمُ قَدْ صَدَّقْتَ الرُّؤْيَا ۚ إِنَّا كَذَٰلِكَ نَجْزِي الْمُحْسِنِينَ
            </p>
            <p className="text-white font-semibold">
              &quot;O Ibrahim! You have fulfilled the vision. Indeed, We thus
              reward the doers of good.&quot;
            </p>
            <cite className="text-[#d4af37]/70 text-sm mt-2 block not-italic">
              — Allah (SWT) &nbsp;|&nbsp; Quran 37:104–105
            </cite>
          </motion.blockquote>

          <motion.div {...fade(0.1)} className="prose-custom">
            <p>
              Allah had never intended for Ismail to be harmed. The command was
              a test — the most profound test of unconditional love and faith.
              Ibrahim (AS) had passed. A magnificent ram was sent from Paradise
              to be sacrificed in Ismail&apos;s place.
            </p>
            <p>
              This is why, every Eid al-Adha, Muslims around the world perform
              <strong> Qurbani</strong> — the sacrifice of an animal. It is not
              the blood that reaches Allah. The Quran makes this clear:
            </p>
          </motion.div>

          <motion.blockquote {...fade(0.2)} className="story-quote">
            <p dir="rtl" className="text-[#d4af37] text-lg font-bold mb-2" style={{ fontFamily: "serif" }}>
              لَن يَنَالَ اللَّهَ لُحُومُهَا وَلَا دِمَاؤُهَا وَلَٰكِن يَنَالُهُ التَّقْوَىٰ مِنكُمْ
            </p>
            <p className="text-white font-semibold">
              &quot;Their meat will not reach Allah, nor will their blood —
              but what reaches Him is piety from you.&quot;
            </p>
            <cite className="text-[#d4af37]/70 text-sm mt-2 block not-italic">
              — Quran 22:37
            </cite>
          </motion.blockquote>

          <motion.div {...fade(0.1)} className="prose-custom">
            <p>
              The sacrifice is a renewal of the spirit of Ibrahim — a yearly
              reminder that faith, gratitude, and complete surrender to God are
              worth more than anything we hold dear. The meat is divided into
              thirds: one for the family, one for friends and neighbours, and
              one for those in need — ensuring that <em>everyone</em> can eat
              and celebrate on Eid.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Story of Eid al-Fitr ── */}
      <section className="bg-[#faf7f0] py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fade(0)}>
            <SectionLabel>Eid al-Fitr</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1a0f] mt-2 mb-2">
              The Reward of Ramadan
            </h2>
            <p className="text-[#d4af37] text-lg font-medium mb-6" dir="rtl" style={{ fontFamily: "serif" }}>
              عيد الفطر — جائزة الصيام
            </p>
          </motion.div>

          <motion.div {...fade(0.1)} className="prose-custom">
            <p>
              Eid al-Fitr is inseparable from Ramadan — the ninth and holiest
              month of the Islamic calendar. Ramadan is the month in which the
              Quran was first revealed to Prophet Muhammad ﷺ, and in{" "}
              <strong>2 AH (624 CE)</strong>, fasting for the entire month was
              made obligatory upon all Muslims.
            </p>
            <p>
              After 29 or 30 days of fasting from dawn to sunset — abstaining
              from food, drink, and ill conduct — Muslims emerge spiritually
              renewed, their sins forgiven, their hearts closer to God. Eid
              al-Fitr is the divine gift at the journey&apos;s end: a day
              decreed by Allah as pure celebration.
            </p>
          </motion.div>

          <motion.div
            {...fade(0.15)}
            className="grid sm:grid-cols-3 gap-4 my-8"
          >
            {[
              { icon: "🌙", title: "Chaand Raat", body: 'The "Night of the Moon" — when the crescent is sighted, celebrations erupt. Henna, markets, and joy fill the night.' },
              { icon: "🤲", title: "Eid Morning", body: "Muslims wake before dawn, bathe, wear their finest clothes, give Zakat al-Fitr, and walk to the Eid prayer." },
              { icon: "🍽️", title: "The Feast", body: "Families reunite over lavish meals. Gifts are exchanged, sweets are shared, and gratitude fills every home." },
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-2xl p-5 border border-[#f0e8d5] shadow-sm">
                <div className="text-3xl mb-3">{card.icon}</div>
                <h4 className="font-bold text-[#1a4731] mb-2">{card.title}</h4>
                <p className="text-[#4a5568] text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </motion.div>

          <motion.div {...fade(0.1)} className="prose-custom">
            <p>
              Before the Eid prayer, every Muslim who is able must give{" "}
              <strong>Zakat al-Fitr</strong> — a small but obligatory amount
              of food or its monetary equivalent — to ensure that no person in
              the community wakes up hungry on the day of Eid. The Prophet ﷺ
              made this compulsory so that{" "}
              <em>everyone</em>, rich or poor, can participate fully in the
              celebration.
            </p>
            <p>
              The Eid prayer itself is a congregation unlike any other —
              mosques overflow into streets and parks, people who haven&apos;t
              seen each other in years embrace, and the air resonates with
              takbeerat: <em>Allahu Akbar, Allahu Akbar, La ilaha illallah…</em>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="bg-[#0a1a0f] py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1a4731_0%,transparent_60%)] opacity-40" />

        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div {...fade(0)} className="text-center mb-14">
            <SectionLabel light>A Journey Through Time</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
              Eid Through the{" "}
              <span className="text-[#d4af37]">Centuries</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[#d4af37]/20" />

            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="flex gap-6 pl-2"
                >
                  {/* Dot */}
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center z-10 relative">
                      <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
                    </div>
                  </div>

                  <div className="pb-2">
                    <span className="text-[#d4af37] font-bold text-sm tracking-wide">
                      {item.year}
                    </span>
                    <p className="text-white/70 text-sm leading-relaxed mt-1">
                      {item.event}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fade(0)}>
            <SectionLabel>Eid Today</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1a0f] mt-2 mb-6">
              A Living Tradition
            </h2>
          </motion.div>

          <motion.div {...fade(0.1)} className="prose-custom">
            <p>
              More than 1,400 years after that first Eid in Medina, the
              celebration lives on — louder, more colourful, and more global
              than ever. In Jakarta and Lagos, in London and Lahore, in Cairo
              and Cape Town, the same crescent moon signals the same
              outpouring of joy.
            </p>
            <p>
              The form changes — the languages, the food, the music, the
              clothes — but the spirit is identical to what the Prophet ﷺ
              established: gratitude to Allah, generosity to the poor, and
              the warmth of human togetherness.
            </p>
            <p>
              Every Eid is a living sermon. A reminder that faith can move a
              father to raise a blade against his own son — and that mercy
              will always descend before the blade falls. A reminder that
              thirty days of inner struggle deserve one morning of pure,
              unrestrained joy. A reminder that the Muslim ummah, scattered
              across every nation and tongue, is ultimately one family.
            </p>
          </motion.div>

          <motion.blockquote {...fade(0.2)} className="story-quote mt-10">
            <p className="text-white font-semibold text-lg">
              &quot;The believers in their mutual kindness, compassion and
              sympathy are just like one body. When one of the limbs suffers,
              the whole body responds to it with wakefulness and fever.&quot;
            </p>
            <cite className="text-[#d4af37]/70 text-sm mt-2 block not-italic">
              — Prophet Muhammad ﷺ &nbsp;|&nbsp; Sahih al-Bukhari & Muslim
            </cite>
          </motion.blockquote>

          {/* CTA back home */}
          <motion.div {...fade(0.2)} className="mt-14 flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#1a4731] hover:bg-[#2d6a4f] text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
            >
              ← Back to Home
            </Link>
            <Link
              href="/#facts"
              className="inline-flex items-center gap-2 border border-[#d4af37]/40 hover:border-[#d4af37] text-[#d4af37] font-semibold px-6 py-3 rounded-full transition-colors text-sm"
            >
              Eid Facts ✦
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Inline styles for prose and quotes */}
      <style>{`
        .prose-custom p {
          color: #374151;
          line-height: 1.85;
          margin-bottom: 1.1rem;
          font-size: 1.0625rem;
        }
        .prose-custom strong { color: #1a4731; }
        .prose-custom em { color: #2d6a4f; }
        .story-quote {
          background: linear-gradient(135deg, #0a1a0f, #1a4731);
          border-left: 3px solid #d4af37;
          border-radius: 1rem;
          padding: 1.5rem 2rem;
          margin: 2rem 0;
        }
      `}</style>
    </>
  );
}

function SectionLabel({
  children,
  light,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <span
      className={`text-xs font-bold tracking-[0.3em] uppercase ${
        light ? "text-[#d4af37]/70" : "text-[#d4af37]"
      }`}
    >
      {children}
    </span>
  );
}
