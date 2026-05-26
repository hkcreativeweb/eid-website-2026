"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const FACTS = [
  {
    icon: "📖",
    title: "ঈদুল আযহার নাম ও অর্থ",
    sub: "নাম এবং গুরুত্ব",
    body: '"ঈদ" অর্থ "উৎসব" এবং "আযহা" অর্থ "কুরবানি"। এটি প্রতি বছর জিলহজ মাসের ১০ তারিখে পালিত হয় এবং ইসলামের দুটি প্রধান উৎসবের একটি।',
  },
  {
    icon: "🕌",
    title: "ইব্রাহিম (আ.)-এর পরীক্ষা",
    sub: "সর্বোচ্চ ত্যাগ",
    body: "আল্লাহ তায়ালা ইব্রাহিম (আ.)-কে স্বপ্নে তাঁর পুত্র ইসমাইল (আ.)-কে কুরবানি করার নির্দেশ দেন। তিনি আল্লাহর নির্দেশ মেনে নেন — এই অতুলনীয় আনুগত্যই ঈদুল আযহার মূল চেতনা।",
  },
  {
    icon: "🌿",
    title: "ইসমাইল (আ.)-এর আনুগত্য",
    sub: "ধৈর্যের আদর্শ",
    body: 'ইসমাইল (আ.) তাঁর পিতাকে উত্তর দিলেন: "হে আমার পিতা, আপনাকে যা আদেশ করা হয়েছে তাই করুন। ইনশাআল্লাহ আপনি আমাকে ধৈর্যশীলদের মধ্যে পাবেন।" (কুরআন ৩৭:১০২)',
  },
  {
    icon: "🐑",
    title: "কুরবানির মাংস বণ্টন",
    sub: "তিন সমান ভাগ",
    body: "কুরবানির মাংস তিন সমান ভাগে ভাগ করা হয়: এক ভাগ নিজের পরিবারের জন্য, এক ভাগ আত্মীয়স্বজন ও বন্ধুদের জন্য, এবং এক ভাগ গরিব ও অভাবীদের জন্য — যাতে সবার ঘরে ঈদের আনন্দ পৌঁছায়।",
  },
  {
    icon: "🕋",
    title: "হজের সাথে সম্পর্ক",
    sub: "ইসলামের পঞ্চম স্তম্ভ",
    body: "ঈদুল আযহা হজের মৌসুমে পালিত হয়। বিশ্বের বিভিন্ন প্রান্ত থেকে ২০ লক্ষেরও বেশি মুসলমান মক্কায় একত্রিত হন এবং মিনায় কুরবানি করেন।",
  },
  {
    icon: "🙏",
    title: "ঈদের নামাজ",
    sub: "বিশেষ সম্মিলিত নামাজ",
    body: "ঈদের সকালে বিশেষ নামাজ পড়া হয় যেখানে ৬টি অতিরিক্ত তাকবির রয়েছে। এই নামাজ মসজিদে বা খোলা মাঠে আদায় করা হয় এবং বিশাল সংখ্যক মুসলমান একত্রিত হন।",
  },
  {
    icon: "📿",
    title: "তাকবির পাঠ",
    sub: "ঈদের ধ্বনি",
    body: "ঈদুল আযহার আগে তাকবির পাঠ করা সুন্নত। মুসলমানরা উচ্চস্বরে পাঠ করেন: আল্লাহু আকবার, আল্লাহু আকবার, লা ইলাহা ইল্লাল্লাহ, ওয়াল্লাহু আকবার, আল্লাহু আকবার, ওয়ালিল্লাহিল হামদ।",
  },
  {
    icon: "🌍",
    title: "বিশ্বব্যাপী উৎসব",
    sub: "১৮০ কোটি মুসলমান",
    body: "১৮০টিরও বেশি দেশে ১৮০ কোটিরও বেশি মুসলমান ঈদুল আযহা উদযাপন করেন। এটি পৃথিবীর অন্যতম বৃহত্তম ধর্মীয় উৎসব।",
  },
  {
    icon: "📅",
    title: "ঈদ ২০২৬ তারিখ",
    sub: "২৭ মে ২০২৬",
    body: "২০২৬ সালে ঈদুল আযহা ২৭ মে পালিত হবে, যা ১৪৪৭ হিজরির ১০ জিলহজ। ইসলামিক চান্দ্র বছর গ্রেগরিয়ান বছরের চেয়ে প্রায় ১১ দিন ছোট।",
  },
  {
    icon: "🇧🇩",
    title: "বাংলাদেশে ঈদ",
    sub: "উৎসবের আনন্দ",
    body: "বাংলাদেশে ঈদুল আযহায় মানুষ নতুন পোশাক পরেন, আত্মীয়দের সাথে দেখা করেন, সেমাই ও বিরিয়ানি রান্না করেন, ছোটদের ঈদি দেন এবং গরিবদের মধ্যে মাংস বিতরণ করেন।",
  },
  {
    icon: "💝",
    title: "ঈদি",
    sub: "বড়দের ভালোবাসার উপহার",
    body: "ঈদে বড়রা ছোটদের \"ঈদি\" দেন — যা টাকা বা উপহার হয়ে থাকে এবং ভালোবাসা, দোয়া ও আনন্দের প্রতীক। মুসলিম বিশ্বে এই রীতি অত্যন্ত জনপ্রিয়।",
  },
  {
    icon: "✨",
    title: "কুরবানির প্রকৃত উদ্দেশ্য",
    sub: "তাকওয়া — আল্লাহর নৈকট্য",
    body: 'আল্লাহ তায়ালা কুরআনে বলেছেন: "আল্লাহর কাছে পৌঁছায় না এর গোশত এবং রক্ত, বরং পৌঁছায় তোমাদের তাকওয়া।" (সূরা হজ: ৩৭) — কুরবানির লক্ষ্য আল্লাহর সন্তুষ্টি।',
  },
];

export default function EidAdhaBengaliPage() {
  return (
    <div lang="bn">
      {/* ── Hero ── */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-[#0a1a0f] pt-20 pb-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a4731_0%,#0a1a0f_65%)]" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <p className="text-white/[0.03] text-[14vw] font-black leading-none whitespace-nowrap">
            ঈদুল আযহা
          </p>
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl mb-4"
          >
            🇧🇩
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#d4af37]/70 text-sm tracking-[0.2em] uppercase font-semibold mb-3"
          >
            বাংলা ভাষায়
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-3"
            style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
          >
            ঈদুল আযহা ২০২৬
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-[#d4af37] text-xl md:text-2xl font-semibold mb-3"
            style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
          >
            কুরবানির ঈদ সম্পর্কে গুরুত্বপূর্ণ তথ্য
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-white/60 text-base leading-relaxed max-w-xl mx-auto"
            style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
          >
            ঈদুল আযহা ইসলামের একটি মহান উৎসব যা হযরত ইব্রাহিম (আ.)-এর অতুলনীয় ত্যাগ এবং আল্লাহর সন্তুষ্টির জন্য সবকিছু উৎসর্গ করার স্মরণে পালিত হয়।
          </motion.p>

          {/* Language switcher */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="flex justify-center gap-3 mt-6"
          >
            <Link
              href="/urdu"
              className="bg-white/5 border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm font-semibold px-4 py-1.5 rounded-full transition-colors"
            >
              🇵🇰 اردو
            </Link>
            <span className="bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#d4af37] text-sm font-semibold px-4 py-1.5 rounded-full">
              🇧🇩 বাংলা
            </span>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#faf7f0] to-transparent" />
      </section>

      {/* ── Quranic verse ── */}
      <section className="bg-[#faf7f0] py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            {...fade(0)}
            className="bg-gradient-to-br from-[#0a1a0f] to-[#1a4731] rounded-2xl p-8 text-center border border-[#d4af37]/20"
          >
            <p
              className="text-[#f0d060] text-2xl md:text-3xl font-bold leading-loose mb-4"
              dir="rtl"
              style={{ fontFamily: "serif" }}
            >
              فَصَلِّ لِرَبِّكَ وَانْحَرْ
            </p>
            <p
              className="text-white/80 text-lg leading-relaxed"
              style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
            >
              "অতএব তোমার রবের উদ্দেশ্যে সালাত আদায় করো এবং কুরবানি দাও।"
            </p>
            <cite className="text-[#d4af37]/60 text-sm mt-2 block not-italic"
              style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
            >
              — সূরা আল-কাউসার: ২
            </cite>
          </motion.div>
        </div>
      </section>

      {/* ── Facts grid ── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade(0)} className="text-center mb-12">
            <span className="text-[#d4af37] text-xs font-bold tracking-[0.3em] uppercase">তথ্য ও জ্ঞান</span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#0a1a0f] mt-2"
              style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
            >
              ঈদুল আযহা সম্পর্কে{" "}
              <span className="text-[#1a4731]">১২টি গুরুত্বপূর্ণ তথ্য</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FACTS.map((fact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="bg-[#faf7f0] rounded-2xl p-6 border border-[#f0e8d5] hover:border-[#d4af37]/40 hover:shadow-md transition-all duration-300"
              >
                <div className="text-3xl mb-3">{fact.icon}</div>
                <div
                  className="text-[#1a4731] font-bold text-lg leading-snug mb-1"
                  style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
                >
                  {fact.title}
                </div>
                <div className="text-[#d4af37] text-xs font-semibold tracking-wide uppercase mb-2">
                  {fact.sub}
                </div>
                <p
                  className="text-[#4a5568] text-sm leading-relaxed"
                  style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
                >
                  {fact.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story section ── */}
      <section className="bg-[#0a1a0f] py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#1a4731_0%,transparent_60%)] opacity-40" />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div {...fade(0)} className="text-center mb-10">
            <span className="text-[#d4af37] text-xs font-bold tracking-[0.3em] uppercase">সংক্ষিপ্ত ঘটনা</span>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mt-2"
              style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
            >
              ইব্রাহিম (আ.)-এর ঘটনা
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              { step: "১", text: "ইব্রাহিম (আ.) পরপর তিন রাত একই স্বপ্ন দেখলেন — আল্লাহ তাঁকে তাঁর পুত্র ইসমাইল (আ.)-কে কুরবানি করার নির্দেশ দিচ্ছেন। নবীদের স্বপ্ন ওহী বলে গণ্য হয়।" },
              { step: "২", text: 'ইব্রাহিম (আ.) তাঁর পুত্রকে বিষয়টি জানালেন। ইসমাইল (আ.) তৎক্ষণাৎ বললেন: "হে আমার পিতা, আপনাকে যা আদেশ করা হয়েছে তাই করুন। ইনশাআল্লাহ আপনি আমাকে ধৈর্যশীলদের মধ্যে পাবেন।" — আনুগত্যের এই উত্তর চিরকাল স্মরণীয়।' },
              { step: "৩", text: "পিতা ও পুত্র একসাথে কুরবানির স্থানে গেলেন। যখন ইব্রাহিম (আ.) কুরবানি করতে উদ্যত হলেন, তখন আল্লাহ ডেকে বললেন: 'হে ইব্রাহিম! তুমি স্বপ্নকে সত্য করে দেখিয়েছ।'" },
              { step: "৪", text: "আল্লাহ ইসমাইল (আ.)-এর পরিবর্তে জান্নাত থেকে একটি দুম্বা পাঠিয়ে দিলেন। এই পরীক্ষা ছিল শুধু যাচাই করার জন্য — আল্লাহ তাঁর প্রিয় বান্দাদের ঈমান ও ভালোবাসা পরীক্ষা করেছিলেন এবং তাঁরা সফল হয়েছিলেন।" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5"
              >
                <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center flex-shrink-0 text-[#d4af37] font-bold text-sm"
                  style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
                >
                  {item.step}
                </div>
                <p
                  className="text-white/75 text-sm leading-loose pt-2"
                  style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
                >
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bangladesh traditions ── */}
      <section className="bg-[#faf7f0] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fade(0)} className="text-center mb-10">
            <span className="text-[#d4af37] text-xs font-bold tracking-[0.3em] uppercase">বাংলাদেশের ঐতিহ্য</span>
            <h2
              className="text-3xl font-bold text-[#0a1a0f] mt-2"
              style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
            >
              বাংলাদেশে ঈদুল আযহা
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: "🌙", title: "চাঁদ রাত", body: "ঈদের আগের রাতে চাঁদ রাতের উৎসব পালিত হয়। বাজারে ভিড় লাগে, মেহেদি লাগানো হয় এবং নতুন পোশাক কেনা হয়।" },
              { icon: "🍽️", title: "বিশেষ খাবার", body: "ঈদে সেমাই, বিরিয়ানি, কোরমা ও হালুয়া রান্না করা হয় এবং প্রতিবেশীদের মধ্যেও বিতরণ করা হয়।" },
              { icon: "💰", title: "ঈদি", body: "বড়রা ছোটদের ঈদি দেন — বাংলাদেশের শিশুদের জন্য ঈদের সবচেয়ে আনন্দের মুহূর্ত এটিই।" },
              { icon: "🤲", title: "দান-সদকা", body: "কুরবানির মাংস গরিব ও অসহায়দের মধ্যে বিতরণ করা হয় যাতে সমাজের প্রতিটি মানুষ ঈদের আনন্দ উপভোগ করতে পারে।" },
            ].map((t, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.1)}
                className="bg-white rounded-2xl p-6 border border-[#f0e8d5] shadow-sm"
              >
                <div className="text-3xl mb-3">{t.icon}</div>
                <h4
                  className="font-bold text-[#1a4731] text-lg mb-2"
                  style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
                >
                  {t.title}
                </h4>
                <p
                  className="text-[#4a5568] text-sm leading-relaxed"
                  style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
                >
                  {t.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Navigation ── */}
      <section className="bg-white py-12 px-6 border-t border-[#f0e8d5]">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#1a4731] hover:bg-[#2d6a4f] text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
            style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
          >
            ← হোমে ফিরুন
          </Link>
          <Link
            href="/urdu"
            className="inline-flex items-center gap-2 border border-[#d4af37]/40 hover:border-[#d4af37] text-[#d4af37] font-semibold px-6 py-3 rounded-full transition-colors text-sm"
          >
            اردو میں پڑھیں 🇵🇰
          </Link>
          <Link
            href="/story"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white/60 hover:text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm bg-[#0a1a0f]"
            style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
          >
            ঈদের ইতিহাস ✦
          </Link>
        </div>
      </section>
    </div>
  );
}
