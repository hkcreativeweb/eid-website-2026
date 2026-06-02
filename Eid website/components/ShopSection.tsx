"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { PRODUCTS, CATEGORY_META } from "@/lib/products";

// Featured: one from each category
const FEATURED_IDS = [2, 5, 7, 11];
const FEATURED = PRODUCTS.filter(p => FEATURED_IDS.includes(p.id));

function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const { addToCart } = useCart();
  const meta = CATEGORY_META[product.category];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white rounded-3xl border border-[#f0e8d5] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group"
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* Image area */}
      <div
        className="h-44 flex items-center justify-center relative"
        style={{ background: product.gradient }}
      >
        <span className="text-6xl drop-shadow-lg" role="img" aria-label={product.name}>
          {product.emoji}
        </span>
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
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-[#0a1a0f] text-base leading-snug mb-1" itemProp="name">
          {product.name}
        </h3>
        <p className="text-[#6b7280] text-xs leading-relaxed mb-3 flex-1" itemProp="description">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-3 mt-auto">
          <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <span className="text-[#d4af37] font-black text-xl" itemProp="price" content={String(product.price)}>
              £{product.price.toFixed(2)}
            </span>
            <meta itemProp="priceCurrency" content="GBP" />
            <meta itemProp="availability" content={product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"} />
            {product.originalPrice && (
              <span className="text-[#9ca3af] line-through text-sm ml-1.5">
                £{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={() => addToCart(product.id)}
            className="bg-[#1a4731] hover:bg-[#d4af37] text-white hover:text-[#0a1a0f] font-bold text-sm px-4 py-2.5 rounded-full transition-all duration-200 flex items-center gap-1.5 group-hover:scale-105"
            aria-label={`Add ${product.name} to cart`}
          >
            <span>Add</span>
            <span>🛒</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function ShopSection() {
  return (
    <section
      id="shop"
      className="bg-[#faf7f0] py-20 px-6"
      aria-labelledby="shop-heading"
      itemScope
      itemType="https://schema.org/Store"
    >
      <meta itemProp="name" content="Eid Gifts & Islamic Shop" />
      <meta itemProp="description" content="Premium Islamic gifts — prayer mats, Eid hampers, Nikkah sets, and more. Delivered across the UK." />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#d4af37] text-xs font-bold tracking-[0.3em] uppercase mb-3">
            🎁 Eid Gifts & Islamic Shop
          </p>
          <h2
            id="shop-heading"
            className="text-4xl md:text-5xl font-bold text-[#0a1a0f] mb-4"
          >
            Give the Gift of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#b8962e]">
              Barakat
            </span>
          </h2>
          <p className="text-[#6b7280] max-w-xl mx-auto text-base">
            Premium prayer mats, Eid hampers, Nikkah gift sets, and Islamic décor — delivered across the UK.
            Perfect for Eid al-Adha, Eid al-Fitr, Nikkah, or any blessed occasion.
          </p>
        </motion.div>

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {(["Prayer", "Hampers", "Nikkah", "Decor"] as const).map(cat => {
            const m = CATEGORY_META[cat];
            return (
              <Link
                key={cat}
                href={`/shop?category=${cat}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all hover:scale-105"
                style={{ borderColor: m.color, color: m.color, background: m.lightBg }}
              >
                <span>{m.emoji}</span>
                <span>{cat}</span>
                <span className="opacity-60 text-xs">— {m.desc}</span>
              </Link>
            );
          })}
        </motion.div>

        {/* Featured products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {FEATURED.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#0a1a0f] hover:bg-[#1a4731] text-white font-bold px-8 py-4 rounded-full transition-colors text-base"
          >
            Browse All 12 Products
            <span>→</span>
          </Link>
          <p className="text-[#9ca3af] text-xs mt-3">
            Free UK delivery on orders over £50 · Secure checkout · Same-day dispatch
          </p>
        </motion.div>
      </div>
    </section>
  );
}
