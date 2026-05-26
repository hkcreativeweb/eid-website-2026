"use client"
import { useState } from "react"
import { Play } from "lucide-react"

export function VideoSection() {
  const [playing, setPlaying] = useState(false)

  return (
    <section id="video" className="bg-[#000000] py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#2563eb] text-xs tracking-[0.4em] uppercase font-semibold mb-4">
            The Art of the Brew
          </p>
          <h2 className="text-[#e2e8f0] text-4xl md:text-6xl font-black leading-tight mb-5">
            Brewing Trouble
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#2563eb]">
              Since 2021
            </span>
          </h2>
          <p className="text-[#e2e8f0]/50 text-lg max-w-xl mx-auto">
            Watch how we chai and try every single day — the slow simmer, the
            perfect pour, the moment it all comes together. Spoiler: it smells
            incredible.
          </p>
        </div>

        {/* Video Player */}
        <div className="relative rounded-3xl overflow-hidden border border-[#2563eb]/20 shadow-2xl shadow-black/60 group">
          {!playing ? (
            <div className="relative aspect-video bg-[#0a0a1a]">
              <img
                src="https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&w=1920&q=80"
                alt="Chai One On brewing"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/30 to-[#000000]/60" />

              <button
                onClick={() => setPlaying(true)}
                className="absolute inset-0 flex items-center justify-center"
                aria-label="Play video"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[#2563eb]/30 scale-150 animate-ping" />
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] flex items-center justify-center shadow-2xl shadow-[#2563eb]/50 hover:scale-110 transition-transform duration-300">
                    <Play size={32} className="text-white ml-1 fill-white" />
                  </div>
                </div>
              </button>

              <div className="absolute bottom-6 right-6 px-3 py-1 bg-black/70 text-[#e2e8f0] text-sm font-medium rounded-lg backdrop-blur-sm">
                4:32
              </div>
            </div>
          ) : (
            <div className="aspect-video">
              {/* Replace YOUR_YOUTUBE_ID with your actual video ID */}
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Chai One On Story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { value: "3+", label: "Years Brewing" },
            { value: "30K+", label: "Cups a Month" },
            { value: "1", label: "Spot in Hayes\n(It's Enough)" },
            { value: "100%", label: "Whole Spices" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl border border-[#2563eb]/10 bg-[#2563eb]/5"
            >
              <div className="text-3xl md:text-4xl font-black text-[#3b82f6] mb-2">
                {stat.value}
              </div>
              <div className="text-[#e2e8f0]/50 text-sm font-medium whitespace-pre-line leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
