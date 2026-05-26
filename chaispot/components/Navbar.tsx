"use client"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Our Story", href: "#video" },
  { label: "Rewards", href: "#loyalty" },
  { label: "Find Us", href: "#map" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#000000]/95 backdrop-blur-md border-b border-[#2563eb]/20 shadow-lg shadow-black/50"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] flex items-center justify-center shadow-lg shadow-[#2563eb]/30">
            <span className="text-white font-black text-base">C1</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[#e2e8f0] font-black text-lg tracking-tight group-hover:text-[#2563eb] transition-colors">
              Chai One On
            </span>
            <span className="text-[#2563eb]/60 text-[10px] tracking-widest uppercase">Hayes, West London</span>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[#e2e8f0]/80 hover:text-[#2563eb] text-sm font-medium tracking-widest uppercase transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#menu"
              className="px-6 py-2.5 bg-[#2563eb] hover:bg-[#3b82f6] text-white font-black text-sm rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#2563eb]/40"
            >
              Get Chai-ed Up
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#e2e8f0] hover:text-[#2563eb] transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#000000]/98 backdrop-blur-md border-b border-[#2563eb]/20">
          <ul className="flex flex-col px-6 py-6 gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-[#e2e8f0]/80 hover:text-[#2563eb] text-lg font-medium tracking-widest uppercase transition-colors block"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#menu"
                onClick={() => setOpen(false)}
                className="inline-block px-8 py-3 bg-[#2563eb] hover:bg-[#3b82f6] text-white font-black rounded-full transition-all"
              >
                Get Chai-ed Up
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
