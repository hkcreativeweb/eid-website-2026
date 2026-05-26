import { MapPin, Clock, Phone, ExternalLink, Train, Bus } from "lucide-react"

export function MapSection() {
  return (
    <section id="map" className="bg-[#05050d] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[#2563eb] text-xs tracking-[0.4em] uppercase font-semibold mb-4">
            Find Us
          </p>
          <h2 className="text-[#e2e8f0] text-4xl md:text-6xl font-black leading-tight mb-5">
            Where To Find{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#2563eb]">
              Your Cup
            </span>
          </h2>
          <p className="text-[#e2e8f0]/50 text-lg max-w-xl mx-auto">
            One location. All the warmth. Hayes has never tasted this good.
          </p>
        </div>

        {/* Location Card — full width */}
        <div className="rounded-3xl overflow-hidden border border-[#2563eb]/15 bg-[#0a0a1a]/60">
          {/* Map Embed */}
          <div className="relative h-80 bg-[#0a0a1a]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.9763946!2d-0.41756!3d51.50862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760d94fe0f30a5%3A0xa00afcd3f609ff0!2sHayes%2C%20UK!5e0!3m2!1sen!2suk!4v1716000000000"
              className="w-full h-full grayscale contrast-125 opacity-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Chai One On Hayes"
              style={{ border: 0 }}
              allowFullScreen
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0a0a1a]/60 to-transparent" />
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: Details */}
            <div className="p-10 border-b md:border-b-0 md:border-r border-[#2563eb]/10">
              <div className="inline-block px-4 py-1.5 bg-[#2563eb]/15 text-[#2563eb] text-xs font-black uppercase tracking-wider rounded-full mb-6">
                Now Open
              </div>
              <h3 className="text-[#e2e8f0] text-2xl font-black mb-8">
                Chai One On Hayes
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#2563eb]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={16} className="text-[#2563eb]" />
                  </div>
                  <div>
                    <p className="text-[#e2e8f0]/40 text-xs uppercase tracking-widest mb-1">Address</p>
                    <p className="text-[#e2e8f0]/80 text-sm leading-relaxed">
                      14 Station Road<br />Hayes, Middlesex, UB3 4EL
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#2563eb]/15 flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-[#2563eb]" />
                  </div>
                  <div>
                    <p className="text-[#e2e8f0]/40 text-xs uppercase tracking-widest mb-1">Opening Hours</p>
                    <div className="text-[#e2e8f0]/80 text-sm space-y-0.5">
                      <p>Mon–Fri: 7:30am – 8pm</p>
                      <p>Saturday: 8am – 9pm</p>
                      <p>Sunday: 9am – 6pm</p>
                      <p className="text-[#e2e8f0]/40 text-xs italic mt-1">
                        Last order 15 mins before close — chai doesn&apos;t rush
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#2563eb]/15 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-[#2563eb]" />
                  </div>
                  <div>
                    <p className="text-[#e2e8f0]/40 text-xs uppercase tracking-widest mb-1">Call Us</p>
                    <a
                      href="tel:02034567890"
                      className="text-[#e2e8f0]/80 text-sm hover:text-[#2563eb] transition-colors"
                    >
                      020 3456 7890
                    </a>
                    <p className="text-[#e2e8f0]/30 text-xs mt-0.5">
                      hello@chaioneon.co.uk
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Hayes+Middlesex+UB3+4EL"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#2563eb]/15 to-[#1d4ed8]/15 border border-[#2563eb]/30 text-[#2563eb] font-bold text-sm rounded-xl hover:from-[#2563eb] hover:to-[#1d4ed8] hover:text-white hover:border-transparent transition-all duration-300"
              >
                <ExternalLink size={14} />
                Get Directions
              </a>
            </div>

            {/* Right: Getting Here + FAQ */}
            <div className="p-10">
              <h4 className="text-[#e2e8f0]/40 text-xs uppercase tracking-widest mb-6">Getting Here</h4>
              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#2563eb]/10 flex items-center justify-center shrink-0">
                    <Train size={15} className="text-[#2563eb]" />
                  </div>
                  <div>
                    <p className="text-[#e2e8f0]/80 text-sm font-semibold">2 min walk</p>
                    <p className="text-[#e2e8f0]/40 text-xs">Hayes & Harlington station (Elizabeth line — yes, really)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#2563eb]/10 flex items-center justify-center shrink-0">
                    <Bus size={15} className="text-[#2563eb]" />
                  </div>
                  <div>
                    <p className="text-[#e2e8f0]/80 text-sm font-semibold">Bus routes 195, 90 & U5</p>
                    <p className="text-[#e2e8f0]/40 text-xs">Stop right outside. No excuses.</p>
                  </div>
                </div>
              </div>

              {/* Mini FAQ */}
              <h4 className="text-[#e2e8f0]/40 text-xs uppercase tracking-widest mb-5">Quick Questions</h4>
              <div className="space-y-5">
                {[
                  {
                    q: "Do you do takeaway?",
                    a: "Always. We're a Hayes staple, not a sit-down-only establishment.",
                  },
                  {
                    q: "Can I pre-order?",
                    a: "Walk-ins welcome. Calls accepted. Chai One On the phone if you're in a rush.",
                  },
                  {
                    q: "Do you cater events?",
                    a: "Birthday parties, corporate do's, hen nights — we've done it. Drop us a line.",
                  },
                ].map((faq) => (
                  <div key={faq.q}>
                    <p className="text-[#e2e8f0]/70 text-sm font-semibold mb-1">{faq.q}</p>
                    <p className="text-[#e2e8f0]/40 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer strip */}
        <div className="mt-20 pt-10 border-t border-[#2563eb]/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] flex items-center justify-center">
              <span className="text-white font-black text-xs">C1</span>
            </div>
            <div>
              <p className="text-[#e2e8f0] font-black text-base leading-none">Chai One On</p>
              <p className="text-[#2563eb]/60 text-[10px] tracking-widest uppercase">Hayes, West London</p>
            </div>
          </div>
          <p className="text-[#e2e8f0]/25 text-xs text-center">
            © {new Date().getFullYear()} Chai One On Ltd. All rights reserved.
            Made with love, cardamom, and an unhealthy obsession with karak.
          </p>
          <div className="flex items-center gap-4 text-[#e2e8f0]/40 text-xs">
            <a href="#" className="hover:text-[#2563eb] transition-colors">@chaioneon</a>
            <span>·</span>
            <a href="#" className="hover:text-[#2563eb] transition-colors">Chai Bye 🍵</a>
          </div>
        </div>
      </div>
    </section>
  )
}
