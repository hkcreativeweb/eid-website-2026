"use client"
import { useState } from "react"
import { Flame, Snowflake, UtensilsCrossed, Coffee, Leaf } from "lucide-react"

type Category = "hot" | "iced" | "matcha" | "coffee" | "bites"

const categories: { id: Category; label: string; icon: React.ReactNode }[] = [
  { id: "hot", label: "Hot Chai", icon: <Flame size={15} /> },
  { id: "iced", label: "Iced Drinks", icon: <Snowflake size={15} /> },
  { id: "matcha", label: "Matcha", icon: <Leaf size={15} /> },
  { id: "coffee", label: "Coffee", icon: <Coffee size={15} /> },
  { id: "bites", label: "Bites", icon: <UtensilsCrossed size={15} /> },
]

const menu: Record<
  Category,
  { name: string; pun: string; description: string; price: string; tag?: string }[]
> = {
  hot: [
    {
      name: "Original Karak",
      pun: "Chai Hard With A Vengeance",
      description: "The one that started it all. Simple. Iconic. Absolutely chai-conic.",
      price: "£3.50",
      tag: "Best Seller",
    },
    {
      name: "Masala Karak",
      pun: "Spice Girls Would Approve",
      description: "Ginger, black pepper, cinnamon, cloves. Bold, unapologetic, and deeply right.",
      price: "£4.00",
      tag: "Chef's Pick",
    },
    {
      name: "Dirty Chai",
      pun: "When Chai Met Coffee And Things Got Complicated",
      description: "An espresso shot crashed the chai party. Nobody's complaining.",
      price: "£4.50",
    },
    {
      name: "Saffron Dream",
      pun: "More Luxurious Than Your Weekend Plans",
      description: "Gold-steeped saffron with cardamom and evaporated milk. Slightly fancy for a Thursday.",
      price: "£4.50",
      tag: "Premium",
    },
    {
      name: "Vanilla Chai",
      pun: "Smooth Operator",
      description: "Real vanilla bean meets classic karak. Sweet, smooth, and never the awkward one at the party.",
      price: "£3.80",
    },
    {
      name: "Haleeb Chai",
      pun: "The Creamiest Thing This Side Of The M4",
      description: "All milk, no water. For the serious ones. You know who you are.",
      price: "£4.00",
    },
  ],
  iced: [
    {
      name: "Iced Original Karak",
      pun: "Your Chai, On The Rocks",
      description: "Cold, creamy, and absolutely unbothered by the British weather.",
      price: "£4.00",
      tag: "New",
    },
    {
      name: "Iced Masala",
      pun: "Cool As A Cucumber, Spicy As Your Ex",
      description: "All the fire of our masala karak, served over ice. Make it make sense.",
      price: "£4.20",
    },
    {
      name: "Iced Dirty Chai",
      pun: "The Chaos Theory In A Cup",
      description: "Cold chai. Cold brew espresso. Cold confidence. Order with caution.",
      price: "£4.80",
      tag: "Popular",
    },
    {
      name: "Iced Vanilla Chai",
      pun: "The Crowd-Pleaser",
      description: "Everyone orders one. You will too. We've stopped fighting it.",
      price: "£4.20",
    },
  ],
  matcha: [
    {
      name: "Classic Matcha Latte",
      pun: "Go Green Or Go Home",
      description: "Ceremonial grade, whisked properly, poured over steamed oat milk. No gritty bits. The real green.",
      price: "£4.00",
    },
    {
      name: "Matcha × Chai",
      pun: "A Match-a Made In Heaven",
      description: "Half matcha. Half karak. Two legends in one cup — like a very delicious crossover episode.",
      price: "£4.50",
      tag: "Signature",
    },
    {
      name: "Strawberry Matcha",
      pun: "Pink Is The New Green. Or Something.",
      description: "Fresh strawberry purée meets matcha. Sounds wrong. Tastes incredibly right.",
      price: "£4.50",
    },
    {
      name: "Iced Matcha Latte",
      pun: "Green, Dreamy, And Slightly Superior",
      description: "Ceremonial matcha with oat milk over ice. The green dream that walked so iced chai could run.",
      price: "£4.20",
    },
  ],
  coffee: [
    {
      name: "Flat White",
      pun: "For The Person Who Said 'Just A Coffee' And Meant It",
      description: "Double ristretto, velvety microfoam, no drama. Exactly what it says on the tin.",
      price: "£3.50",
    },
    {
      name: "Oat Latte",
      pun: "Oat's Not To Love?",
      description: "Silky, slightly sweet, and better for the planet than your commute.",
      price: "£3.80",
    },
    {
      name: "Cortado",
      pun: "Half Espresso. Half Milk. 100% Serious.",
      description: "Equal parts bold and smooth. The coffee for people who mean business before 9am.",
      price: "£3.20",
    },
    {
      name: "Espresso",
      pun: "No Nonsense. Just Get In.",
      description: "A single. A double. A decision. That's it. No further questions.",
      price: "£2.50",
    },
    {
      name: "Chai Cortado",
      pun: "The Best Of Both Worlds",
      description: "Espresso meets spiced karak concentrate. Tiny. Intense. Somehow everything.",
      price: "£4.00",
      tag: "New",
    },
  ],
  bites: [
    {
      name: "Chicken Samosa (2pc)",
      pun: "Crispy. Spiced. Dangerously Dippable.",
      description: "Hand-folded pastry, spiced chicken, fresh herbs. With our chilli chutney. Don't say we didn't warn you.",
      price: "£3.50",
      tag: "Best Seller",
    },
    {
      name: "Cheese & Chilli Toastie",
      pun: "Melty, Oozy, Slightly Irresponsible",
      description: "Proper cheddar, pickled jalapeños, sourdough. Pairs with literally any drink on this menu.",
      price: "£5.50",
    },
    {
      name: "Cardamom & Date Cookie",
      pun: "One Is Never Enough. We've Accepted This.",
      description: "Buttery, spiced, chewy in all the right places. A chai's best friend.",
      price: "£2.50",
      tag: "Signature",
    },
    {
      name: "Banana Bread",
      pun: "The Only Reason Mondays Are Survivable",
      description: "Moist, packed with banana, slightly charred on top. The way it should be.",
      price: "£3.00",
    },
    {
      name: "Luqaimat (4pc)",
      pun: "The Golden Boys",
      description: "Crispy-outside, pillowy-inside dough balls drizzled with date syrup. A banger. Non-negotiable.",
      price: "£4.00",
    },
    {
      name: "Date & Walnut Slice",
      pun: "Absolutely Worth The Napkin Situation",
      description: "Medjool dates, toasted walnuts, brown butter tray bake. A proper treat.",
      price: "£3.50",
    },
  ],
}

export function MenuSection() {
  const [active, setActive] = useState<Category>("hot")

  return (
    <section id="menu" className="bg-[#05050d] py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#2563eb] text-xs tracking-[0.4em] uppercase font-semibold mb-4">
            What We&apos;re Brewing
          </p>
          <h2 className="text-[#e2e8f0] text-4xl md:text-6xl font-black leading-tight mb-5">
            The Full{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#2563eb]">
              Chai-talogue
            </span>
          </h2>
          <p className="text-[#e2e8f0]/50 text-lg max-w-xl mx-auto">
            Everything made to order. Everything made with love. Everything
            definitely worth queuing for.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                active === cat.id
                  ? "bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white shadow-lg shadow-[#2563eb]/30"
                  : "border border-[#2563eb]/20 text-[#e2e8f0]/60 hover:border-[#2563eb]/50 hover:text-[#2563eb]"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {menu[active].map((item) => (
            <div
              key={item.name}
              className="group relative p-6 rounded-2xl border border-[#2563eb]/10 bg-gradient-to-b from-[#0c0c1e]/60 to-[#000000] hover:border-[#2563eb]/30 hover:bg-[#0c0c1e]/80 transition-all duration-300"
            >
              {item.tag && (
                <span className="absolute top-4 right-4 px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full bg-[#2563eb]/15 text-[#2563eb] border border-[#2563eb]/20">
                  {item.tag}
                </span>
              )}
              <h3 className="text-[#e2e8f0] font-bold text-lg mb-1 group-hover:text-[#3b82f6] transition-colors pr-16">
                {item.name}
              </h3>
              <p className="text-[#2563eb]/80 text-xs italic mb-3 font-medium">
                &ldquo;{item.pun}&rdquo;
              </p>
              <p className="text-[#e2e8f0]/45 text-sm leading-relaxed mb-4">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[#2563eb] font-black text-lg">
                  {item.price}
                </span>
                <button className="text-xs font-bold text-[#e2e8f0]/40 hover:text-[#2563eb] transition-colors uppercase tracking-widest">
                  Add +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Download menu CTA */}
        <div className="text-center mt-14">
          <a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 border border-[#2563eb]/30 text-[#2563eb] font-bold rounded-full hover:bg-[#2563eb] hover:text-white hover:border-transparent transition-all duration-300"
          >
            Download Full Menu ↓
          </a>
        </div>
      </div>
    </section>
  )
}
