"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { CATEGORY_META } from "@/lib/products";

export default function CartDrawer() {
  const { isOpen, setIsOpen, cartProducts, totalPrice, totalItems, updateQty, removeFromCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/50 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[70] flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0e8d5] bg-[#0a1a0f]">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛒</span>
                <h2 className="text-white font-bold text-lg">Your Cart</h2>
                {totalItems > 0 && (
                  <span className="bg-[#d4af37] text-[#0a1a0f] text-xs font-black px-2 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {cartProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="text-5xl mb-4">🛒</div>
                  <p className="text-[#374151] font-semibold mb-1">Your cart is empty</p>
                  <p className="text-[#9ca3af] text-sm mb-6">Add some beautiful Eid gifts!</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-[#d4af37] font-semibold text-sm border border-[#d4af37]/40 px-5 py-2 rounded-full hover:bg-[#d4af37]/10 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartProducts.map(({ product, qty }) => {
                  const meta = CATEGORY_META[product.category];
                  return (
                    <div key={product.id} className="flex gap-3 bg-[#faf7f0] rounded-2xl p-3 border border-[#f0e8d5]">
                      {/* Product icon */}
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ background: product.gradient }}
                      >
                        {product.emoji}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[#0a1a0f] font-semibold text-sm leading-tight truncate">
                            {product.name}
                          </p>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-[#9ca3af] hover:text-red-400 transition-colors flex-shrink-0"
                            aria-label="Remove item"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        <p className="text-[#d4af37] font-bold text-sm mt-0.5">
                          £{(product.price * qty).toFixed(2)}
                        </p>

                        {/* Qty controls */}
                        <div className="flex items-center gap-2 mt-1.5">
                          <button
                            onClick={() => updateQty(product.id, qty - 1)}
                            className="w-6 h-6 rounded-full bg-[#e8dfd0] hover:bg-[#d4af37]/20 flex items-center justify-center text-[#374151] font-bold text-sm transition-colors"
                          >−</button>
                          <span className="text-[#374151] font-semibold text-sm w-4 text-center">{qty}</span>
                          <button
                            onClick={() => updateQty(product.id, qty + 1)}
                            className="w-6 h-6 rounded-full bg-[#e8dfd0] hover:bg-[#d4af37]/20 flex items-center justify-center text-[#374151] font-bold text-sm transition-colors"
                          >+</button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {cartProducts.length > 0 && (
              <div className="border-t border-[#f0e8d5] px-5 py-4 space-y-3 bg-white">
                <div className="flex justify-between items-center">
                  <span className="text-[#374151] font-medium">Subtotal</span>
                  <span className="text-[#0a1a0f] font-black text-lg">£{totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-[#9ca3af] text-xs">Shipping calculated at checkout</p>
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-[#d4af37] hover:bg-[#b8962e] text-[#0a1a0f] font-bold text-center py-3.5 rounded-full transition-colors"
                >
                  Checkout · £{totalPrice.toFixed(2)}
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center text-[#374151] text-sm font-medium hover:text-[#0a1a0f] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
