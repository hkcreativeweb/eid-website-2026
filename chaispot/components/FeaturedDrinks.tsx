"use client"
import { Star } from "lucide-react"

const drinks = [
  {
    name: "Original Karak",
    tagline: "Chai Hard With A Vengeance",
    description:
      "The drink that started everything. Ceylon tea slow-brewed with cardamom pods and creamy evaporated milk until it's thick, golden, and frankly irresponsible to stop at one. If chai were a person, it would be this. Iconic. Non-negotiable. Yours.",
    price: "£3.50",
    rating: 4.9,
    reviews: 2400,
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    notes: ["Cardamom", "Evaporated Milk", "Ceylon Tea"],
    cta: "Order This Legend",
  },
  {
    name: "Masala Karak",
    tagline: "Spice, Spice, Baby",
    description:
      "Ginger that warms your soul, black pepper that wakes up your brain, cinnamon that makes you question why you ever drank anything else. This is the chai that has opinions. Strong ones. We respect it.",
    price: "£4.00",
    rating: 4.8,
    reviews: 1750,
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    badge: "Chef's Pick",
    notes: ["Ginger", "Cinnamon", "Black Pepper", "Cloves"],
    cta: "Meet Your New Favourite",
  },
]

export function FeaturedDrinks() {
  return (
    <section id="featured" className="bg-[#05050d] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-[#2563eb] text-xs tracking-[0.4em] uppercase font-semibold mb-4">
            Signature Drinks
          </p>
          <h2 className="text-[#e2e8f0] text-4xl md:text-6xl font-black leading-tight mb-5">
            Two Classics.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#2563eb]">
              Infinite Stories.
            </span>
          </h2>
          <p className="text-[#e2e8f0]/50 text-lg max-w-xl mx-auto">
            Every great chai house has its cornerstone cups. Ours have been
            perfected over years of love, heat, and stubbornness.
          </p>
        </div>

        {/* Drink Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {drinks.map((drink) => (
            <div
              key={drink.name}
              className="group relative rounded-3xl overflow-hidden border border-[#2563eb]/15 bg-gradient-to-b from-[#0c0c1e]/80 to-[#000000] hover:border-[#2563eb]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#2563eb]/10"
            >
              {/* Badge */}
              <div className="absolute top-5 left-5 z-20 px-4 py-1.5 bg-[#2563eb] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-lg">
                {drink.badge}
              </div>

              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-[#2563eb] text-xs tracking-widest uppercase font-semibold mb-1 italic">
                      {drink.tagline}
                    </p>
                    <h3 className="text-[#e2e8f0] text-3xl font-black">
                      {drink.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[#3b82f6] text-2xl font-black">
                      {drink.price}
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-[#3b82f6] fill-[#3b82f6]" />
                    ))}
                  </div>
                  <span className="text-[#e2e8f0]/60 text-sm">
                    {drink.rating} ({drink.reviews.toLocaleString()} reviews)
                  </span>
                </div>

                <p className="text-[#e2e8f0]/60 text-sm leading-relaxed mb-6">
                  {drink.description}
                </p>

                {/* Flavour notes */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {drink.notes.map((note) => (
                    <span
                      key={note}
                      className="px-3 py-1 text-xs font-medium text-[#2563eb] border border-[#2563eb]/30 rounded-full bg-[#2563eb]/5"
                    >
                      {note}
                    </span>
                  ))}
                </div>

                <a
                  href="#menu"
                  className="block w-full text-center py-3.5 bg-gradient-to-r from-[#2563eb]/20 to-[#1d4ed8]/20 border border-[#2563eb]/30 text-[#2563eb] font-bold text-sm rounded-xl hover:from-[#2563eb] hover:to-[#1d4ed8] hover:text-white hover:border-transparent transition-all duration-300"
                >
                  {drink.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
