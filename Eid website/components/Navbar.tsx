"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

const ANCHOR_LINKS = [
  { label: "About",      href: "/#about"      },
  { label: "Dates",      href: "/#dates"       },
  { label: "Facts",      href: "/#facts"       },
  { label: "Traditions", href: "/#traditions"  },
];

const PAGE_LINKS = [
  { label: "Story",     href: "/story" },
  { label: "Guide",     href: "/guide" },
  { label: "Quiz",      href: "/quiz"  },
];

const GAME_LINKS = [
  { label: "🐑 Shear the Sheep", href: "/game" },
  { label: "🐏 Find Your Sheep",  href: "/maze" },
];

const LANG_LINKS = [
  { label: "اردو",   flag: "🇵🇰", href: "/urdu"    },
  { label: "বাংলা",  flag: "🇧🇩", href: "/bengali" },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [gamesOpen,    setGamesOpen]    = useState(false);
  const [mobileGames,  setMobileGames]  = useState(false);
  const gamesRef = useRef<HTMLDivElement>(null);
  const { totalItems, setIsOpen: openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (gamesRef.current && !gamesRef.current.contains(e.target as Node))
        setGamesOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a1a0f]/95 backdrop-blur-md shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 h-14 flex items-center gap-5">

        {/* ── Logo ────────────────────────────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 mr-1">
          <CrescentStar className="w-7 h-7" />
          <span className="text-[#d4af37] font-bold text-lg tracking-wide leading-none">
            Eid <span className="text-white">2026</span>
          </span>
        </Link>

        {/* ── Desktop nav ─────────────────────────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-1 flex-1 min-w-0">

          {/* Anchor links */}
          {ANCHOR_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="px-2.5 py-1.5 text-white/65 hover:text-white text-sm font-medium rounded-lg hover:bg-white/5 transition-all whitespace-nowrap"
            >
              {l.label}
            </a>
          ))}

          <Divider />

          {/* Page links */}
          {PAGE_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="px-2.5 py-1.5 text-[#d4af37]/75 hover:text-[#d4af37] text-sm font-medium rounded-lg hover:bg-[#d4af37]/8 transition-all whitespace-nowrap"
            >
              {l.label}
            </Link>
          ))}

          {/* Games dropdown */}
          <div ref={gamesRef} className="relative">
            <button
              onClick={() => setGamesOpen(o => !o)}
              className="flex items-center gap-1 px-2.5 py-1.5 text-[#d4af37]/75 hover:text-[#d4af37] text-sm font-medium rounded-lg hover:bg-[#d4af37]/8 transition-all whitespace-nowrap"
            >
              🎮 Games
              <svg
                className={`w-3 h-3 opacity-60 transition-transform duration-200 ${gamesOpen ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {gamesOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-48 bg-[#0d2218] border border-[#d4af37]/20 rounded-2xl shadow-xl shadow-black/50 overflow-hidden">
                {GAME_LINKS.map(g => (
                  <Link
                    key={g.href}
                    href={g.href}
                    onClick={() => setGamesOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-all border-b border-white/5 last:border-0"
                  >
                    {g.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Spacer — pushes right section to edge */}
          <div className="flex-1" />

          {/* Shop + Cart */}
          <Link
            href="/shop"
            className="flex items-center gap-1.5 bg-[#d4af37] hover:bg-[#c9a430] text-[#0a1a0f] text-sm font-bold px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap"
          >
            <span>🛍️</span>
            <span>Shop</span>
          </Link>

          <button
            onClick={() => openCart(true)}
            className="relative p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all"
            aria-label="Open cart"
          >
            <CartIcon />
            {totalItems > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-[#d4af37] text-[#0a1a0f] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>

          <Divider />

          {/* Language links */}
          {LANG_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center gap-1 px-2 py-1.5 text-white/40 hover:text-white/80 text-xs font-medium rounded-lg hover:bg-white/5 transition-all whitespace-nowrap"
              title={l.label}
            >
              <span className="text-base leading-none">{l.flag}</span>
              <span>{l.label}</span>
            </Link>
          ))}
        </div>

        {/* ── Mobile right: cart + hamburger ──────────────────────────────── */}
        <div className="lg:hidden flex items-center gap-2 ml-auto">
          <button
            onClick={() => openCart(true)}
            className="relative p-1.5 text-white/70 hover:text-white transition-colors"
            aria-label="Open cart"
          >
            <CartIcon />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-[#d4af37] text-[#0a1a0f] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="p-1.5 text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile menu ─────────────────────────────────────────────────────── */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0d2218] border-t border-white/8 px-5 py-5">
          <div className="space-y-1 mb-4">
            <p className="text-white/25 text-[10px] font-bold uppercase tracking-widest px-2 mb-2">Explore</p>
            {ANCHOR_LINKS.map(l => (
              <a key={l.href} href={l.href}
                className="block px-3 py-2.5 text-white/70 hover:text-white hover:bg-white/5 rounded-xl text-sm font-medium transition-all"
                onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
          </div>
          <div className="space-y-1 mb-4">
            <p className="text-white/25 text-[10px] font-bold uppercase tracking-widest px-2 mb-2">Pages</p>
            {PAGE_LINKS.map(l => (
              <Link key={l.href} href={l.href}
                className="block px-3 py-2.5 text-[#d4af37]/80 hover:text-[#d4af37] hover:bg-[#d4af37]/5 rounded-xl text-sm font-medium transition-all"
                onClick={() => setMenuOpen(false)}>{l.label}</Link>
            ))}
            {/* Games sub-section */}
            <button
              onClick={() => setMobileGames(o => !o)}
              className="flex items-center justify-between w-full px-3 py-2.5 text-[#d4af37]/80 hover:text-[#d4af37] hover:bg-[#d4af37]/5 rounded-xl text-sm font-medium transition-all"
            >
              <span>🎮 Games</span>
              <svg className={`w-3.5 h-3.5 opacity-50 transition-transform ${mobileGames ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileGames && (
              <div className="ml-4 pl-3 border-l border-white/10 space-y-1">
                {GAME_LINKS.map(g => (
                  <Link key={g.href} href={g.href}
                    className="block px-3 py-2 text-white/60 hover:text-white rounded-lg text-sm transition-all"
                    onClick={() => { setMenuOpen(false); setMobileGames(false); }}>{g.label}</Link>
                ))}
              </div>
            )}
          </div>
          <div className="pt-3 border-t border-white/8 flex items-center justify-between">
            <Link href="/shop"
              className="flex items-center gap-2 bg-[#d4af37] hover:bg-[#c9a430] text-[#0a1a0f] font-bold px-5 py-2.5 rounded-full text-sm transition-all"
              onClick={() => setMenuOpen(false)}>
              🛍️ Shop
            </Link>
            <div className="flex items-center gap-1">
              {LANG_LINKS.map(l => (
                <Link key={l.href} href={l.href}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-white/40 hover:text-white/80 text-xs rounded-lg hover:bg-white/5 transition-all"
                  onClick={() => setMenuOpen(false)}>
                  <span className="text-base">{l.flag}</span>
                  <span>{l.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function Divider() {
  return <div className="w-px h-4 bg-white/10 mx-1 flex-shrink-0" />;
}

function CartIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function CrescentStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none">
      <defs>
        <mask id="nc">
          <circle cx="18" cy="20" r="14" fill="white" />
          <circle cx="24" cy="16" r="11" fill="black" />
        </mask>
      </defs>
      <circle cx="18" cy="20" r="14" fill="#d4af37" mask="url(#nc)" />
      <polygon points="32,4 33.5,9 38.5,9 34.5,12 36,17 32,14 28,17 29.5,12 25.5,9 30.5,9" fill="#d4af37" />
    </svg>
  );
}
