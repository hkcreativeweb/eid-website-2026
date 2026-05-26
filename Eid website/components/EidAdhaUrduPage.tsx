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
    title: "عید الاضحی کا معنی",
    sub: "نام اور اہمیت",
    body: '"عید" کا مطلب ہے "تہوار" اور "اضحیٰ" کا مطلب ہے "قربانی"۔ یہ تہوار ذوالحجہ کی ۱۰ تاریخ کو منایا جاتا ہے اور اسلام کے دو بڑے تہواروں میں سے ایک ہے۔',
  },
  {
    icon: "🕌",
    title: "حضرت ابراہیمؑ کی آزمائش",
    sub: "سب سے بڑی قربانی",
    body: "اللہ تعالیٰ نے حضرت ابراہیمؑ کو خواب میں اپنے بیٹے حضرت اسماعیلؑ کی قربانی دینے کا حکم دیا۔ انہوں نے اللہ کے حکم کو سر تسلیم خم کر دیا — یہ بے مثال اطاعت عید الاضحی کی روح ہے۔",
  },
  {
    icon: "🌿",
    title: "حضرت اسماعیلؑ کی فرمانبرداری",
    sub: "صبر کا نمونہ",
    body: 'حضرت اسماعیلؑ نے اپنے والد کو جواب دیا: "اباجان، جو آپ کو حکم ہوا ہے وہ کر ڈالیں، انشاء اللہ آپ مجھے صابروں میں پائیں گے۔" (قرآن ۳۷:۱۰۲)۔ یہ الفاظ ایمان کی معراج ہیں۔',
  },
  {
    icon: "🐑",
    title: "قربانی کی تقسیم",
    sub: "تین مساوی حصے",
    body: "قربانی کا گوشت تین برابر حصوں میں بانٹا جاتا ہے: ایک اپنے گھر والوں کے لیے، ایک رشتہ داروں اور دوستوں کے لیے، اور ایک غریبوں اور محتاجوں کے لیے — تاکہ ہر گھر میں عید کی خوشی ہو۔",
  },
  {
    icon: "🕋",
    title: "حج کا تعلق",
    sub: "اسلام کا پانچواں رکن",
    body: "عید الاضحی حج کے موسم میں آتی ہے۔ دنیا بھر سے ۲۰ لاکھ سے زائد مسلمان مکہ مکرمہ میں جمع ہو کر حج ادا کرتے ہیں اور منیٰ کے مقام پر قربانی کرتے ہیں۔",
  },
  {
    icon: "🙏",
    title: "نماز عید",
    sub: "خصوصی اجتماعی نماز",
    body: "عید کی صبح خصوصی نماز ادا کی جاتی ہے جس میں ۶ اضافی تکبیرات ہوتی ہیں۔ یہ نماز مسجد یا کھلے میدان میں ادا کی جاتی ہے اور مسلمان بڑی تعداد میں شریک ہوتے ہیں۔",
  },
  {
    icon: "📿",
    title: "تکبیرات",
    sub: "عید کا ترانہ",
    body: "عید الاضحی سے پہلے تکبیرات پڑھنا سنت ہے۔ مسلمان بلند آواز سے پڑھتے ہیں: اللہ اکبر، اللہ اکبر، لا الہ الا اللہ، واللہ اکبر، اللہ اکبر، وللہ الحمد۔",
  },
  {
    icon: "🌍",
    title: "عالمی تہوار",
    sub: "۱.۸ ارب مسلمان",
    body: "دنیا کے ۱۸۰ سے زائد ممالک میں ۱.۸ ارب سے زائد مسلمان عید الاضحی مناتے ہیں۔ یہ دنیا کے سب سے بڑے مذہبی اجتماعات میں سے ایک ہے۔",
  },
  {
    icon: "📅",
    title: "عید ۲۰۲۶ کی تاریخ",
    sub: "۲۷ مئی ۲۰۲۶",
    body: "۲۰۲۶ میں عید الاضحی ۲۷ مئی کو منائی جائے گی جو ۱۴۴۷ ہجری کی ۱۰ ذوالحجہ ہے۔ اسلامی قمری سال گریگورین سال سے تقریباً ۱۱ دن چھوٹا ہے۔",
  },
  {
    icon: "🇵🇰",
    title: "پاکستان میں عید",
    sub: "روایات اور رسوم",
    body: "پاکستان میں عید الاضحی پر لوگ نئے کپڑے پہنتے ہیں، رشتہ داروں سے ملتے ہیں، شیر خورمہ اور بریانی پکاتے ہیں، بچوں کو عیدی دیتے ہیں، اور غریبوں میں گوشت تقسیم کرتے ہیں۔",
  },
  {
    icon: "💝",
    title: "عیدی",
    sub: "بزرگوں کی محبت",
    body: "عید پر بزرگ بچوں کو \"عیدی\" دیتے ہیں — یہ پیسے یا تحائف ہوتے ہیں جو محبت، دعا اور خوشی کی علامت ہیں۔ یہ رسم مسلم دنیا میں بہت مقبول ہے۔",
  },
  {
    icon: "✨",
    title: "قربانی کا حقیقی مقصد",
    sub: "تقویٰ — اللہ کا قرب",
    body: 'اللہ تعالیٰ قرآن میں فرماتا ہے: "اللہ کو نہ ان کا گوشت پہنچتا ہے اور نہ خون، بلکہ اسے تمہارا تقویٰ پہنچتا ہے۔" (سورۃ الحج: ۳۷) — قربانی کا مقصد اللہ کی رضا ہے۔',
  },
];

export default function EidAdhaUrduPage() {
  return (
    <div dir="rtl" lang="ur">
      {/* ── Hero ── */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-[#0a1a0f] pt-20 pb-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a4731_0%,#0a1a0f_65%)]" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <p className="text-white/[0.03] text-[20vw] font-black leading-none whitespace-nowrap">
            عید الاضحی
          </p>
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl mb-4"
          >
            🇵🇰
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#d4af37]/70 text-sm tracking-[0.2em] uppercase font-semibold mb-3"
          >
            اردو زبان میں
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-3"
            style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
          >
            عید الاضحی ۲۰۲۶
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-[#d4af37] text-xl md:text-2xl font-semibold mb-3"
            style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
          >
            قربانی کے تہوار کے بارے میں اہم حقائق
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-white/60 text-base leading-relaxed max-w-xl mx-auto"
            style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
          >
            عید الاضحی اسلام کا ایک عظیم تہوار ہے جو حضرت ابراہیمؑ کی بے مثال قربانی اور اللہ کی رضا میں سب کچھ نثار کر دینے کی یاد میں منایا جاتا ہے۔
          </motion.p>

          {/* Language switcher */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="flex justify-center gap-3 mt-6"
          >
            <span className="bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#d4af37] text-sm font-semibold px-4 py-1.5 rounded-full">
              🇵🇰 اردو
            </span>
            <Link
              href="/bengali"
              className="bg-white/5 border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm font-semibold px-4 py-1.5 rounded-full transition-colors"
            >
              🇧🇩 বাংলা
            </Link>
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
              style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
            >
              فَصَلِّ لِرَبِّكَ وَانْحَرْ
            </p>
            <p
              className="text-white/80 text-lg leading-relaxed"
              style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
            >
              "پس اپنے رب کے لیے نماز پڑھو اور قربانی کرو۔"
            </p>
            <cite className="text-[#d4af37]/60 text-sm mt-2 block not-italic">
              — سورۃ الکوثر: ۲
            </cite>
          </motion.div>
        </div>
      </section>

      {/* ── Facts grid ── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade(0)} className="text-center mb-12">
            <span className="text-[#d4af37] text-xs font-bold tracking-[0.3em] uppercase">حقائق اور معلومات</span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#0a1a0f] mt-2"
              style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
            >
              عید الاضحی کے بارے میں <span className="text-[#1a4731]">۱۲ اہم حقائق</span>
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
                  style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
                >
                  {fact.title}
                </div>
                <div className="text-[#d4af37] text-xs font-semibold tracking-wide uppercase mb-2">
                  {fact.sub}
                </div>
                <p
                  className="text-[#4a5568] text-sm leading-relaxed"
                  style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#1a4731_0%,transparent_60%)] opacity-40" />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div {...fade(0)} className="text-center mb-10">
            <span className="text-[#d4af37] text-xs font-bold tracking-[0.3em] uppercase">مختصر واقعہ</span>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mt-2"
              style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
            >
              حضرت ابراہیمؑ کا واقعہ
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              { step: "۱", text: "حضرت ابراہیمؑ نے تین راتیں لگاتار ایک ہی خواب دیکھا — اللہ انہیں اپنے بیٹے حضرت اسماعیلؑ کی قربانی دینے کا حکم دے رہا ہے۔ انبیاء کا خواب وحی ہوتا ہے۔" },
              { step: "۲", text: 'حضرت ابراہیمؑ نے اپنے بیٹے کو بتایا۔ حضرت اسماعیلؑ نے فوراً کہا: "اباجان جو آپ کو حکم ہوا ہے وہ کریں، انشاء اللہ آپ مجھے صابر پائیں گے۔" — اطاعت کا یہ جواب قیامت تک یاد رہے گا۔' },
              { step: "۳", text: "باپ اور بیٹا دونوں قربانی کی جگہ روانہ ہوئے۔ جب حضرت ابراہیمؑ نے قربانی کرنے کا ارادہ کیا تو اللہ تعالیٰ نے فرمایا: 'اے ابراہیم! تم نے خواب سچ کر دکھایا۔'" },
              { step: "۴", text: "اللہ نے حضرت اسماعیلؑ کی جگہ جنت سے ایک مینڈھا بھیجا۔ یہ آزمائش محض پرکھنے کے لیے تھی — اللہ نے اپنے پیارے بندوں کی محبت اور ایمان کو آزمایا اور وہ کامیاب ہوئے۔" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5"
              >
                <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center flex-shrink-0 text-[#d4af37] font-bold text-sm">
                  {item.step}
                </div>
                <p
                  className="text-white/75 text-sm leading-loose pt-2"
                  style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
                >
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pakistan traditions ── */}
      <section className="bg-[#faf7f0] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fade(0)} className="text-center mb-10">
            <span className="text-[#d4af37] text-xs font-bold tracking-[0.3em] uppercase">پاکستانی روایات</span>
            <h2
              className="text-3xl font-bold text-[#0a1a0f] mt-2"
              style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
            >
              پاکستان میں عید الاضحی
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: "🌙", title: "چاند رات", body: "عید سے ایک رات پہلے چاند رات کا جشن منایا جاتا ہے۔ بازاروں میں رش ہوتا ہے، مہندی لگائی جاتی ہے، اور نئے کپڑے خریدے جاتے ہیں۔" },
              { icon: "🍽️", title: "خصوصی کھانے", body: "عید پر شیر خورمہ، بریانی، کڑاہی اور حلوہ پوری پکائے جاتے ہیں اور پڑوسیوں میں بھی بانٹے جاتے ہیں۔" },
              { icon: "💰", title: "عیدی", body: "بڑے بچوں کو عیدی دیتے ہیں — یہ پاکستانی بچوں کے لیے عید کا سب سے خوشی بھرا لمحہ ہوتا ہے۔" },
              { icon: "🤲", title: "فلاح و بہبود", body: "قربانی کا گوشت غریبوں اور مستحقوں میں تقسیم کیا جاتا ہے تاکہ کوئی بھی عید سے محروم نہ رہے۔" },
            ].map((t, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.1)}
                className="bg-white rounded-2xl p-6 border border-[#f0e8d5] shadow-sm"
              >
                <div className="text-3xl mb-3">{t.icon}</div>
                <h4
                  className="font-bold text-[#1a4731] text-lg mb-2"
                  style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
                >
                  {t.title}
                </h4>
                <p
                  className="text-[#4a5568] text-sm leading-relaxed"
                  style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
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
          >
            گھر واپس ←
          </Link>
          <Link
            href="/bengali"
            className="inline-flex items-center gap-2 border border-[#d4af37]/40 hover:border-[#d4af37] text-[#d4af37] font-semibold px-6 py-3 rounded-full transition-colors text-sm"
          >
            বাংলায় পড়ুন 🇧🇩
          </Link>
          <Link
            href="/story"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white/60 hover:text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm bg-[#0a1a0f]"
          >
            عید کی کہانی ✦
          </Link>
        </div>
      </section>
    </div>
  );
}
