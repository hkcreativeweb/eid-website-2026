"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type NavLink =
  | { kind: "anchor"; label: string; href: string }
  | { kind: "pill";   label: string; href: string }
  | { kind: "lang";   label: string; href: string; flag: string };

const LINKS: NavLink[] = [
  { kind: "anchor", label: "About",      href: "/#about"      },
  { kind: "anchor", label: "2026 Dates", href: "/#dates"      },
  { kind: "anchor", label: "Facts",      href: "/#facts"      },
  { kind: "anchor", label: "Traditions", href: "/#traditions" },
  { kind: "pill",   label: "The Story",  href: "/story"       },
  { kind: "pill",   label: "Eid Guide",  href: "/guide"       },
  { kind: "pill",   label: "Quiz",       href: "/quiz"        },
  { kind: "pill",   label: "🐑 Game",    href: "/game"        },
  { kind: "lang",   label: "اردو",       href: "/urdu",   flag: "🇵🇰" },
  { kind: "lang",   label: "বাংলা",      href: "/bengali", flag: "🇧🇩" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a1a0f]/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <CrescentStar className="w-8 h-8" />
          <span className="text-[#d4af37] font-bold text-xl tracking-wide">
            Eid <span className="text-white">2026</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-5">
          {LINKS.map((l) => {
            if (l.kind === "anchor")
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-white/80 hover:text-[#d4af37] transition-colors text-sm font-medium"
                  >
                    {l.label}
                  </a>
                </li>
              );
            if (l.kind === "pill")
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[#d4af37] border border-[#d4af37]/40 hover:bg-[#d4af37]/10 transition-colors text-sm font-semibold px-3 py-1.5 rounded-full"
                  >
                    {l.label} ✦
                  </Link>
                </li>
              );
            // lang
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-white/60 hover:text-white border border-white/15 hover:border-white/35 transition-colors text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5"
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0a1a0f]/97 border-t border-[#d4af37]/20 px-6 py-5">
          <ul className="flex flex-col gap-4">
            {LINKS.map((l) => {
              if (l.kind === "anchor")
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-white/80 hover:text-[#d4af37] transition-colors text-base font-medium"
                      onClick={() => setMenuOpen(false)}
                    >
                      {l.label}
                    </a>
                  </li>
                );
              if (l.kind === "pill")
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[#d4af37] font-semibold text-base"
                      onClick={() => setMenuOpen(false)}
                    >
                      {l.label} ✦
                    </Link>
                  </li>
                );
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/60 hover:text-white transition-colors text-base font-medium flex items-center gap-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}

function CrescentStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none">
      <defs>
        <mask id="nav-crescent">
          <circle cx="18" cy="20" r="14" fill="white" />
          <circle cx="24" cy="16" r="11" fill="black" />
        </mask>
      </defs>
      <circle cx="18" cy="20" r="14" fill="#d4af37" mask="url(#nav-crescent)" />
      <polygon
        points="32,4 33.5,9 38.5,9 34.5,12 36,17 32,14 28,17 29.5,12 25.5,9 30.5,9"
        fill="#d4af37"
      />
    </svg>
  );
}
