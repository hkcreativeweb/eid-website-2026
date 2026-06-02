"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

type NavLink =
  | { kind: "anchor"; label: string; href: string }
  | { kind: "pill";   label: string; href: string }
  | { kind: "shop" }
  | { kind: "games" }
  | { kind: "lang";   label: string; href: string; flag: string };

const GAMES = [
  { label: "🐑 Shear the Sheep", href: "/game" },
  { label: "🐏 Find Your Sheep",  href: "/maze" },
];

const LINKS: NavLink[] = [
  { kind: "anchor", label: "About",      href: "/#about"      },
  { kind: "anchor", label: "2026 Dates", href: "/#dates"      },
  { kind: "anchor", label: "Facts",      href: "/#facts"      },
  { kind: "anchor", label: "Traditions", href: "/#traditions" },
  { kind: "pill",   label: "The Story",  href: "/story"       },
  { kind: "pill",   label: "Eid Guide",  href: "/guide"       },
  { kind: "pill",   label: "Quiz",       href: "/quiz"        },
  { kind: "games" },
  { kind: "shop"  },
  { kind: "lang",   label: "اردو",       href: "/urdu",   flag: "🇵🇰" },
  { kind: "lang",   label: "বাংলা",      href: "/bengali", flag: "🇧🇩" },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [gamesOpen,   setGamesOpen]   = useState(false);
  const [mobileGames, setMobileGames] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const { totalItems, setIsOpen: openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setGamesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
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
        <ul className="hidden lg:flex items-center gap-4">
          {LINKS.map((l) => {
            if (l.kind === "anchor")
              return (
                <li key={l.href}>
                  <a href={l.href} className="text-white/80 hover:text-[#d4af37] transition-colors text-sm font-medium">
                    {l.label}
                  </a>
                </li>
              );

            if (l.kind === "pill")
              return (
                <li key={l.href}>
                  <Link href={l.href} className="text-[#d4af37] border border-[#d4af37]/40 hover:bg-[#d4af37]/10 transition-colors text-sm font-semibold px-3 py-1.5 rounded-full">
                    {l.label} ✦
                  </Link>
                </li>
              );

            if (l.kind === "games")
              return (
                <li key="games" ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setGamesOpen((o) => !o)}
                    className="flex items-center gap-1.5 text-[#d4af37] border border-[#d4af37]/40 hover:bg-[#d4af37]/10 transition-colors text-sm font-semibold px-3 py-1.5 rounded-full"
                  >
                    🎮 Games ✦
                    <svg className={`w-3 h-3 transition-transform duration-200 ${gamesOpen ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {gamesOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-[#0a1a0f]/97 border border-[#d4af37]/25 rounded-xl shadow-xl shadow-black/40 overflow-hidden">
                      {GAMES.map((g) => (
                        <Link key={g.href} href={g.href} onClick={() => setGamesOpen(false)}
                          className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors border-b border-[#d4af37]/10 last:border-0">
                          {g.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );

            if (l.kind === "shop")
              return (
                <li key="shop" className="flex items-center gap-2">
                  <Link href="/shop"
                    className="bg-[#d4af37] hover:bg-[#b8962e] text-[#0a1a0f] font-bold text-sm px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5">
                    🛍️ Shop
                  </Link>
                  {/* Cart button */}
                  <button
                    onClick={() => openCart(true)}
                    className="relative text-white/70 hover:text-white transition-colors p-1.5"
                    aria-label="Open cart"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5.6A1 1 0 007 20h10a1 1 0 00.97-1.24L16 13M10 20a1 1 0 102 0M16 20a1 1 0 102 0" />
                    </svg>
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#d4af37] text-[#0a1a0f] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                        {totalItems > 9 ? "9+" : totalItems}
                      </span>
                    )}
                  </button>
                </li>
              );

            // lang
            return (
              <li key={l.href}>
                <Link href={l.href}
                  className="text-white/60 hover:text-white border border-white/15 hover:border-white/35 transition-colors text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile: cart + hamburger */}
        <div className="lg:hidden flex items-center gap-3">
          <button onClick={() => openCart(true)} className="relative text-white/70 hover:text-white transition-colors" aria-label="Open cart">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5.6A1 1 0 007 20h10a1 1 0 00.97-1.24L16 13M10 20a1 1 0 102 0M16 20a1 1 0 102 0" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#d4af37] text-[#0a1a0f] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button className="text-white" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0a1a0f]/97 border-t border-[#d4af37]/20 px-6 py-5">
          <ul className="flex flex-col gap-4">
            {LINKS.map((l) => {
              if (l.kind === "anchor")
                return (
                  <li key={l.href}>
                    <a href={l.href} className="text-white/80 hover:text-[#d4af37] transition-colors text-base font-medium"
                      onClick={() => setMenuOpen(false)}>{l.label}</a>
                  </li>
                );
              if (l.kind === "pill")
                return (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[#d4af37] font-semibold text-base"
                      onClick={() => setMenuOpen(false)}>{l.label} ✦</Link>
                  </li>
                );
              if (l.kind === "games")
                return (
                  <li key="games">
                    <button onClick={() => setMobileGames((o) => !o)}
                      className="flex items-center gap-2 text-[#d4af37] font-semibold text-base w-full text-left">
                      🎮 Games ✦
                      <svg className={`w-4 h-4 transition-transform duration-200 ${mobileGames ? "rotate-180" : ""}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {mobileGames && (
                      <ul className="mt-2 ml-4 flex flex-col gap-3 border-l border-[#d4af37]/20 pl-4">
                        {GAMES.map((g) => (
                          <li key={g.href}>
                            <Link href={g.href} className="text-[#d4af37]/80 hover:text-[#d4af37] text-sm font-medium transition-colors"
                              onClick={() => { setMenuOpen(false); setMobileGames(false); }}>{g.label}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              if (l.kind === "shop")
                return (
                  <li key="shop">
                    <Link href="/shop" className="text-[#d4af37] font-bold text-base flex items-center gap-2"
                      onClick={() => setMenuOpen(false)}>
                      🛍️ Shop ✦
                    </Link>
                  </li>
                );
              return (
                <li key={l.href}>
                  <Link href={l.href}
                    className="text-white/60 hover:text-white transition-colors text-base font-medium flex items-center gap-2"
                    onClick={() => setMenuOpen(false)}>
                    <span>{l.flag}</span><span>{l.label}</span>
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
      <polygon points="32,4 33.5,9 38.5,9 34.5,12 36,17 32,14 28,17 29.5,12 25.5,9 30.5,9" fill="#d4af37" />
    </svg>
  );
}
