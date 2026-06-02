"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { PRODUCTS, CATEGORIES, CATEGORY_META, Category } from "@/lib/products";

function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  const { addToCart } = useCart();
  const meta = CATEGORY_META[product.category];
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-3xl border border-[#f0e8d5] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group"
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* Image */}
      <div className="h-48 flex items-center justify-center relative" style={{ background: product.gradient }}>
        <span className="text-6xl drop-shadow-lg">{product.emoji}</span>
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#d4af37] text-[#0a1a0f] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide">
            {product.badge}
          </span>
        )}
        <span
          className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full"
          style={{ background: meta.lightBg, color: meta.color }}
        >
          {meta.emoji} {product.category}
        </span>
        {product.originalPrice && (
          <span className="absolute bottom-3 left-3 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
            SAVE £{(product.originalPrice - product.price).toFixed(2)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-[#0a1a0f] text-base leading-snug mb-1" itemProp="name">
          {product.name}
        </h3>
        <p className="text-[#6b7280] text-xs leading-relaxed mb-3 flex-1" itemProp="description">
          {product.description}
        </p>

        {/* Features */}
        <ul className="flex flex-wrap gap-1.5 mb-4">
          {product.features.slice(0, 3).map(f => (
            <li key={f} className="text-[10px] bg-[#f0e8d5] text-[#6b5a3e] px-2 py-0.5 rounded-full font-medium">
              {f}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-2 mt-auto" itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <div>
            <span className="text-[#d4af37] font-black text-xl" itemProp="price">
              £{product.price.toFixed(2)}
            </span>
            <meta itemProp="priceCurrency" content="GBP" />
            <meta itemProp="availability" content="https://schema.org/InStock" />
            {product.originalPrice && (
              <span className="text-[#9ca3af] line-through text-sm ml-1.5">
                £{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`font-bold text-sm px-4 py-2.5 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
              added
                ? "bg-green-500 text-white scale-95"
                : "bg-[#1a4731] hover:bg-[#d4af37] text-white hover:text-[#0a1a0f] group-hover:scale-105"
            }`}
          >
            {added ? "✓ Added!" : <><span>Add</span><span>🛒</span></>}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const { totalItems, setIsOpen } = useCart();

  const filtered = activeCategory === "All"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0a1a0f] pt-28 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a4731_0%,#0a1a0f_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-[#d4af37]/70 text-xs tracking-[0.3em] uppercase font-bold mb-3"
          >
            🎁 Eid Gifts & Islamic Shop
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Premium Islamic{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f0d060]">
              Gifts
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            className="text-white/60 max-w-lg mx-auto text-base mb-8"
          >
            Prayer mats, Eid hampers, Nikkah sets & Islamic décor — curated with love for every blessed occasion.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              { icon: "🚚", text: "Free delivery over £50" },
              { icon: "🔒", text: "Secure checkout" },
              { icon: "📦", text: "Same-day dispatch" },
              { icon: "↩️", text: "Easy returns" },
            ].map(b => (
              <div key={b.text} className="flex items-center gap-1.5 text-white/50 text-xs font-medium">
                <span>{b.icon}</span><span>{b.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Shop body */}
      <section className="bg-[#faf7f0] py-10 px-6 min-h-screen">
        <div className="max-w-6xl mx-auto">

          {/* Sticky filter + cart bar */}
          <div className="sticky top-[64px] z-30 bg-[#faf7f0]/95 backdrop-blur-sm py-4 mb-8 -mx-2 px-2 border-b border-[#f0e8d5]">
            <div className="flex items-center justify-between flex-wrap gap-3">
              {/* Category filters */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory("All")}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                    activeCategory === "All"
                      ? "bg-[#0a1a0f] text-white border-[#0a1a0f]"
                      : "bg-white text-[#374151] border-[#e5d5c0] hover:border-[#0a1a0f]"
                  }`}
                >
                  All ({PRODUCTS.length})
                </button>
                {CATEGORIES.map(cat => {
                  const m = CATEGORY_META[cat];
                  const count = PRODUCTS.filter(p => p.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                        activeCategory === cat
                          ? "text-white border-transparent"
                          : "bg-white border-[#e5d5c0] hover:border-current"
                      }`}
                      style={
                        activeCategory === cat
                          ? { background: m.color, borderColor: m.color }
                          : { color: m.color }
                      }
                    >
                      {m.emoji} {cat} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Cart button */}
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 bg-[#1a4731] hover:bg-[#0a1a0f] text-white font-bold px-4 py-2 rounded-full transition-colors text-sm relative"
              >
                <span>🛒</span>
                <span>Cart</span>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="bg-[#d4af37] text-[#0a1a0f] text-xs font-black w-5 h-5 rounded-full flex items-center justify-center absolute -top-1.5 -right-1.5"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>
            </div>
          </div>

          {/* Products grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-[#374151] font-semibold">No products in this category</p>
            </div>
          )}

          {/* Bottom info */}
          <div className="mt-16 bg-[#0a1a0f] rounded-3xl p-8 text-center">
            <h2 className="text-white font-bold text-xl mb-2">Need a Custom Order? 📦</h2>
            <p className="text-white/50 text-sm mb-4">
              Looking for a bespoke Eid hamper, bulk corporate gifts, or a personalised Nikkah set?
              Get in touch and we&apos;ll create something special.
            </p>
            <a
              href="mailto:hkcreativeweb@gmail.com?subject=Custom Order Enquiry"
              className="inline-flex items-center gap-2 bg-[#d4af37] hover:bg-[#b8962e] text-[#0a1a0f] font-bold px-6 py-3 rounded-full transition-colors"
            >
              📧 Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
