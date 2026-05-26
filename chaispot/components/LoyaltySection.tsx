import { Stamp, Trophy, Users } from "lucide-react"

const steps = [
  {
    icon: <Stamp size={24} className="text-[#2563eb]" />,
    step: "Step 1",
    title: "Chai Be A Stamp Card Regular",
    description:
      "Every purchase earns you a stamp. 8 stamps = a free drink of your choice. No app needed. Just ask at the counter.",
  },
  {
    icon: <Trophy size={24} className="text-[#2563eb]" />,
    step: "Step 2",
    title: "From Regular To Royalty",
    description:
      "Hit Gold status (50 stamps) for early access to new menu drops, exclusive monthly specials, and priority on busy Saturdays. You earned it.",
  },
  {
    icon: <Users size={24} className="text-[#2563eb]" />,
    step: "Step 3",
    title: "More Friends, More Chai",
    description:
      "Refer a friend and you both get a free drink. It's basically a pyramid scheme, but for chai. And entirely legal.",
  },
]

export function LoyaltySection() {
  return (
    <section id="loyalty" className="bg-[#000000] py-28 px-6 overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#2563eb] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#1d4ed8] blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[#2563eb] text-xs tracking-[0.4em] uppercase font-semibold mb-4">
            Regulars&apos; Club
          </p>
          <h2 className="text-[#e2e8f0] text-4xl md:text-6xl font-black leading-tight mb-5">
            Chai-alty Has
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#2563eb]">
              Its Rewards
            </span>
          </h2>
          <p className="text-[#e2e8f0]/50 text-lg max-w-xl mx-auto">
            The more you sip, the more you save. It&apos;s not complicated —
            it&apos;s just good chai karma.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((s, idx) => (
            <div
              key={s.step}
              className="relative p-8 rounded-3xl border border-[#2563eb]/15 bg-gradient-to-b from-[#0c0c1e]/60 to-[#000000] hover:border-[#2563eb]/35 transition-all duration-300 group"
            >
              {/* Step number */}
              <div className="absolute -top-4 -left-2 w-8 h-8 rounded-full bg-[#2563eb] flex items-center justify-center shadow-lg shadow-[#2563eb]/40">
                <span className="text-white font-black text-sm">{idx + 1}</span>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-[#2563eb]/10 flex items-center justify-center mb-5 group-hover:bg-[#2563eb]/20 transition-colors">
                {s.icon}
              </div>
              <p className="text-[#2563eb]/60 text-xs tracking-widest uppercase mb-2">{s.step}</p>
              <h3 className="text-[#e2e8f0] font-black text-lg mb-3 leading-snug">
                {s.title}
              </h3>
              <p className="text-[#e2e8f0]/50 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Block */}
        <div className="text-center p-10 rounded-3xl border border-[#2563eb]/20 bg-gradient-to-b from-[#0c0c1e]/40 to-transparent">
          <p className="text-[#e2e8f0]/50 text-sm mb-6 max-w-md mx-auto">
            One stamp per visit. Gold status reviewed quarterly. Free drink
            excludes premium specials. Terms apply but they&apos;re not evil.
          </p>
          <a
            href="#"
            className="inline-block px-10 py-4 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] hover:from-[#3b82f6] hover:to-[#2563eb] text-white font-black text-base rounded-full transition-all duration-300 shadow-xl shadow-[#2563eb]/30 hover:shadow-[#2563eb]/50 hover:scale-105"
          >
            Join The Chai Club
          </a>
        </div>
      </div>
    </section>
  )
}
