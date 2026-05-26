export default function Footer() {
  return (
    <footer className="bg-[#050e07] py-12 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        {/* Crescent + Arabic */}
        <div className="flex justify-center mb-4">
          <svg viewBox="0 0 60 30" className="w-16 h-8" fill="none">
            <defs>
              <mask id="footer-crescent">
                <circle cx="14" cy="15" r="12" fill="white" />
                <circle cx="20" cy="11" r="10" fill="black" />
              </mask>
            </defs>
            <circle
              cx="14"
              cy="15"
              r="12"
              fill="#d4af37"
              mask="url(#footer-crescent)"
              opacity="0.8"
            />
            <polygon
              points="40,2 41.8,8 48,8 43,11.5 45,17.5 40,14 35,17.5 37,11.5 32,8 38.2,8"
              fill="#d4af37"
              opacity="0.8"
            />
          </svg>
        </div>

        <p className="text-[#d4af37] text-3xl font-bold mb-1">عيد مبارك</p>
        <p className="text-white/40 text-sm mb-6">Eid Mubarak — Blessed Eid</p>

        <nav className="flex flex-wrap justify-center gap-6 text-sm text-white/40 mb-8">
          {["#about", "#dates", "#facts", "#traditions"].map((href) => (
            <a
              key={href}
              href={href}
              className="hover:text-[#d4af37] transition-colors capitalize"
            >
              {href.replace("#", "")}
            </a>
          ))}
        </nav>

        <p className="text-white/20 text-xs leading-relaxed max-w-md mx-auto">
          Dates shown are estimated based on astronomical calculations. Actual
          Eid dates may vary by 1–2 days depending on moon sighting in your
          region.
        </p>

        <p className="text-white/15 text-xs mt-6">
          © 2026 Eid Mubarak — Celebrating 1.8 billion Muslims worldwide
        </p>
      </div>
    </footer>
  );
}
