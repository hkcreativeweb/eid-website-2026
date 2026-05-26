"use client"
import { useScreenSize } from "@/hooks/use-screen-size"
import { PixelTrail } from "@/components/ui/pixel-trail"
import { GooeyFilter } from "@/components/ui/gooey-filter"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const screenSize = useScreenSize()

  return (
    <section className="relative w-full h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden bg-[#000000]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=1920&q=80"
          alt="Chai being prepared"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-[#0a0a1a]/60 to-[#000000]" />
      </div>

      {/* Gooey Pixel Trail */}
      <GooeyFilter id="gooey-filter-hero" strength={5} />
      <div
        className="absolute inset-0 z-10"
        style={{ filter: "url(#gooey-filter-hero)" }}
      >
        <PixelTrail
          pixelSize={screenSize.lessThan("md") ? 20 : 28}
          fadeDuration={0}
          delay={400}
          pixelClassName="bg-[#2563eb]/70"
        />
      </div>

      {/* Hero Content — two-column on md+ */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
        {/* Text side */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-[#2563eb] text-xs md:text-sm tracking-[0.4em] uppercase font-semibold mb-6">
            Hayes, West London &nbsp;·&nbsp; Brewing Since 2021
          </p>
          <h1 className="text-[#e2e8f0] text-5xl sm:text-7xl md:text-8xl font-black leading-[0.95] tracking-tight mb-6">
            You Had Me
            <br />
            At{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#2563eb]">
              Chai
            </span>
          </h1>
          <p className="text-[#e2e8f0]/70 text-lg md:text-xl max-w-2xl mx-auto md:mx-0 mb-10 leading-relaxed font-light">
            Real karak. Real spices. Real good vibes — right in the heart of Hayes.
            Pull up a chair. We&apos;ve been expecting you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <a
              href="#menu"
              className="px-10 py-4 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] hover:from-[#3b82f6] hover:to-[#2563eb] text-white font-black text-base rounded-full transition-all duration-300 shadow-xl shadow-[#2563eb]/30 hover:shadow-[#2563eb]/50 hover:scale-105"
            >
              Get Chai-ed Up
            </a>
            <a
              href="#map"
              className="px-10 py-4 border border-[#e2e8f0]/30 text-[#e2e8f0]/80 hover:border-[#2563eb] hover:text-[#2563eb] font-semibold text-base rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              Find Us In Hayes
            </a>
          </div>
        </div>

        {/* Chai image side */}
        <div className="flex-shrink-0 w-64 h-64 md:w-[380px] md:h-[380px] relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#2563eb]/30 to-[#1d4ed8]/10 blur-3xl" />
          <div className="relative w-full h-full rounded-3xl overflow-hidden border border-[#2563eb]/30 shadow-2xl shadow-[#2563eb]/20">
            <img
              src="https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80"
              alt="A perfect cup of chai"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white font-black text-xl">Karak Chai</p>
              <p className="text-[#3b82f6] text-sm font-medium">Brewed fresh, every time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#featured"
        className="absolute bottom-10 z-20 flex flex-col items-center gap-2 text-[#e2e8f0]/40 hover:text-[#2563eb] transition-colors group"
      >
        <span className="text-xs tracking-[0.3em] uppercase">Scroll (or chai and try to resist)</span>
        <ChevronDown size={20} className="animate-bounce" />
      </a>
    </section>
  )
}
