"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

// ─────────────────────────────────────────────────────────────────────────────
// 📬 ORDER DELIVERY CONFIGURATION
//
// Orders are emailed to you automatically via two channels:
//  1. A mailto link opens in the user's browser (works instantly, no setup)
//  2. Formspree (optional, more reliable) — sign up at https://formspree.io
//     → Create a free account with hkcreativeweb@gmail.com
//     → Create a new form → copy the Form ID (e.g. "xabc1234")
//     → Paste it below to replace "YOUR_FORMSPREE_ID"
// ─────────────────────────────────────────────────────────────────────────────
const FORMSPREE_ID = "YOUR_FORMSPREE_ID"; // Replace this with your Formspree form ID
const OWNER_EMAIL  = "hkcreativeweb@gmail.com";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  notes: string;
  paymentMethod: string;
};

const INITIAL: FormData = {
  fullName: "", email: "", phone: "",
  address: "", city: "", postcode: "", country: "United Kingdom",
  notes: "", paymentMethod: "bank-transfer",
};

function generateOrderId() {
  return "EID-" + Date.now().toString(36).toUpperCase().slice(-6);
}

export default function CheckoutPage() {
  const { cartProducts, totalPrice, totalItems, clearCart } = useCart();
  const [form, setForm]       = useState<FormData>(INITIAL);
  const [errors, setErrors]   = useState<Partial<FormData>>({});
  const [status, setStatus]   = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [orderId, setOrderId] = useState("");

  const shipping = totalPrice >= 50 ? 0 : 3.99;
  const grandTotal = totalPrice + shipping;

  function update(field: keyof FormData, value: string) {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<FormData> = {};
    if (!form.fullName.trim())  e.fullName = "Full name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim())     e.phone    = "Phone number is required";
    if (!form.address.trim())   e.address  = "Address is required";
    if (!form.city.trim())      e.city     = "City is required";
    if (!form.postcode.trim())  e.postcode = "Postcode is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    const id = generateOrderId();
    setOrderId(id);

    const itemsText = cartProducts
      .map(({ product, qty }) => `  • ${product.name} × ${qty}  —  £${(product.price * qty).toFixed(2)}`)
      .join("\n");

    const orderBody = `
══════════════════════════════════
  NEW ORDER FROM EID SHOP
══════════════════════════════════

Order ID:    ${id}
Date:        ${new Date().toLocaleString("en-GB")}

── CUSTOMER ───────────────────────
Name:        ${form.fullName}
Email:       ${form.email}
Phone:       ${form.phone}

── DELIVERY ADDRESS ───────────────
${form.address}
${form.city}, ${form.postcode}
${form.country}

── ORDER ITEMS ────────────────────
${itemsText}

Subtotal:    £${totalPrice.toFixed(2)}
Shipping:    ${shipping === 0 ? "FREE" : "£" + shipping.toFixed(2)}
TOTAL:       £${grandTotal.toFixed(2)}

── PAYMENT METHOD ─────────────────
${form.paymentMethod === "bank-transfer" ? "Bank Transfer (Faster Payments)" :
  form.paymentMethod === "paypal" ? "PayPal" : "Cash on Collection"}

── NOTES ──────────────────────────
${form.notes || "(none)"}

══════════════════════════════════
`;

    // Save order to localStorage for your records
    try {
      const existing = JSON.parse(localStorage.getItem("eid-orders") || "[]");
      existing.unshift({
        id, date: new Date().toISOString(),
        customer: { name: form.fullName, email: form.email, phone: form.phone },
        address: `${form.address}, ${form.city}, ${form.postcode}, ${form.country}`,
        items: cartProducts.map(({ product, qty }) => ({ name: product.name, qty, price: product.price })),
        total: grandTotal, shipping, payment: form.paymentMethod, notes: form.notes,
      });
      localStorage.setItem("eid-orders", JSON.stringify(existing));
    } catch {}

    // Try Formspree (if configured)
    let formspreeOk = false;
    if (FORMSPREE_ID !== "YOUR_FORMSPREE_ID") {
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            orderId: id, name: form.fullName, email: form.email, phone: form.phone,
            address: `${form.address}, ${form.city}, ${form.postcode}, ${form.country}`,
            payment: form.paymentMethod, total: `£${grandTotal.toFixed(2)}`,
            items: cartProducts.map(({ product, qty }) => `${product.name} × ${qty} — £${(product.price * qty).toFixed(2)}`).join("; "),
            notes: form.notes,
          }),
        });
        formspreeOk = res.ok;
      } catch {}
    }

    // Mailto fallback — opens email client with full order details
    if (!formspreeOk) {
      const subject = encodeURIComponent(`New Order ${id} — ${form.fullName}`);
      const body    = encodeURIComponent(orderBody);
      window.open(`mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`, "_blank");
    }

    clearCart();
    setStatus("success");
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <section className="min-h-screen bg-[#faf7f0] flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl border border-[#f0e8d5] shadow-xl p-10 max-w-md w-full text-center"
        >
          <motion.div
            animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-6xl mb-5"
          >🎉</motion.div>
          <h1 className="text-2xl font-bold text-[#0a1a0f] mb-2">Order Placed!</h1>
          <p className="text-[#d4af37] font-mono font-bold text-sm mb-4">{orderId}</p>
          <p className="text-[#6b7280] text-sm mb-6 leading-relaxed">
            Thank you, <strong>{form.fullName.split(" ")[0]}</strong>! Your order has been received.
            We&apos;ll contact you at <strong>{form.email}</strong> within 24 hours with payment details and a dispatch confirmation.
          </p>
          <div className="bg-[#faf7f0] rounded-2xl p-4 mb-6 text-left space-y-1.5">
            <p className="text-xs font-bold text-[#9ca3af] uppercase tracking-wide mb-2">What happens next?</p>
            {[
              "📧 We email you payment instructions",
              "💳 You complete payment (bank transfer / PayPal)",
              "📦 We dispatch within 1–2 working days",
              "🚚 Delivery in 2–4 working days",
            ].map(s => <p key={s} className="text-[#374151] text-xs">{s}</p>)}
          </div>
          <Link href="/shop" className="block w-full bg-[#1a4731] hover:bg-[#0a1a0f] text-white font-bold py-3.5 rounded-full transition-colors text-sm">
            Continue Shopping
          </Link>
          <Link href="/" className="block mt-3 text-[#9ca3af] text-sm hover:text-[#374151] transition-colors">
            ← Back to Home
          </Link>
        </motion.div>
      </section>
    );
  }

  // ── Empty cart ──────────────────────────────────────────────────────────────
  if (cartProducts.length === 0 && status !== "success") {
    return (
      <section className="min-h-screen bg-[#faf7f0] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-5xl mb-4">🛒</div>
          <h1 className="text-xl font-bold text-[#0a1a0f] mb-2">Your cart is empty</h1>
          <p className="text-[#6b7280] text-sm mb-6">Add some items before checking out.</p>
          <Link href="/shop" className="bg-[#d4af37] hover:bg-[#b8962e] text-[#0a1a0f] font-bold px-8 py-3 rounded-full transition-colors">
            Browse Shop
          </Link>
        </div>
      </section>
    );
  }

  // ── Main checkout ───────────────────────────────────────────────────────────
  return (
    <section className="min-h-screen bg-[#faf7f0] pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="mb-8">
          <Link href="/shop" className="text-[#d4af37] text-sm font-semibold hover:text-[#b8962e] transition-colors flex items-center gap-1 mb-4">
            ← Back to Shop
          </Link>
          <h1 className="text-3xl font-bold text-[#0a1a0f]">Checkout</h1>
          <p className="text-[#9ca3af] text-sm mt-1">{totalItems} item{totalItems !== 1 ? "s" : ""} in your cart</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

            {/* ── LEFT: Form ────────────────────────────────────────────────── */}
            <div className="space-y-6">

              {/* Contact */}
              <div className="bg-white rounded-3xl border border-[#f0e8d5] p-6">
                <h2 className="font-bold text-[#0a1a0f] text-lg mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 bg-[#0a1a0f] rounded-full text-white text-xs flex items-center justify-center font-black">1</span>
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name *" error={errors.fullName}>
                    <input type="text" placeholder="Muhammad Hamza" value={form.fullName}
                      onChange={e => update("fullName", e.target.value)}
                      className={inputClass(!!errors.fullName)} />
                  </Field>
                  <Field label="Email Address *" error={errors.email}>
                    <input type="email" placeholder="you@example.com" value={form.email}
                      onChange={e => update("email", e.target.value)}
                      className={inputClass(!!errors.email)} />
                  </Field>
                  <Field label="Phone Number *" error={errors.phone} className="sm:col-span-2">
                    <input type="tel" placeholder="+44 7700 000000" value={form.phone}
                      onChange={e => update("phone", e.target.value)}
                      className={inputClass(!!errors.phone)} />
                  </Field>
                </div>
              </div>

              {/* Delivery */}
              <div className="bg-white rounded-3xl border border-[#f0e8d5] p-6">
                <h2 className="font-bold text-[#0a1a0f] text-lg mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 bg-[#0a1a0f] rounded-full text-white text-xs flex items-center justify-center font-black">2</span>
                  Delivery Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Street Address *" error={errors.address} className="sm:col-span-2">
                    <input type="text" placeholder="123 Crescent Road, Flat 2" value={form.address}
                      onChange={e => update("address", e.target.value)}
                      className={inputClass(!!errors.address)} />
                  </Field>
                  <Field label="City *" error={errors.city}>
                    <input type="text" placeholder="London" value={form.city}
                      onChange={e => update("city", e.target.value)}
                      className={inputClass(!!errors.city)} />
                  </Field>
                  <Field label="Postcode *" error={errors.postcode}>
                    <input type="text" placeholder="E1 6RF" value={form.postcode}
                      onChange={e => update("postcode", e.target.value)}
                      className={inputClass(!!errors.postcode)} />
                  </Field>
                  <Field label="Country" className="sm:col-span-2">
                    <select value={form.country} onChange={e => update("country", e.target.value)}
                      className={inputClass(false)}>
                      <option>United Kingdom</option>
                      <option>Pakistan</option>
                      <option>Bangladesh</option>
                      <option>India</option>
                      <option>UAE</option>
                      <option>Other</option>
                    </select>
                  </Field>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-3xl border border-[#f0e8d5] p-6">
                <h2 className="font-bold text-[#0a1a0f] text-lg mb-2 flex items-center gap-2">
                  <span className="w-7 h-7 bg-[#0a1a0f] rounded-full text-white text-xs flex items-center justify-center font-black">3</span>
                  Payment Method
                </h2>
                <p className="text-[#9ca3af] text-xs mb-5">
                  You won&apos;t be charged now. We&apos;ll contact you with payment details after confirming your order.
                </p>
                <div className="space-y-3">
                  {[
                    { value: "bank-transfer", label: "Bank Transfer (Faster Payments)", icon: "🏦", desc: "We'll send you our account details" },
                    { value: "paypal",         label: "PayPal",                           icon: "💳", desc: "We'll send you a PayPal request" },
                    { value: "cash",           label: "Cash on Collection",               icon: "💵", desc: "Local collection only" },
                  ].map(opt => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        form.paymentMethod === opt.value
                          ? "border-[#d4af37] bg-[#d4af37]/5"
                          : "border-[#f0e8d5] hover:border-[#d4af37]/40"
                      }`}
                    >
                      <input type="radio" name="payment" value={opt.value}
                        checked={form.paymentMethod === opt.value}
                        onChange={() => update("paymentMethod", opt.value)}
                        className="accent-[#d4af37] w-4 h-4 flex-shrink-0"
                      />
                      <span className="text-2xl">{opt.icon}</span>
                      <div>
                        <p className="font-semibold text-[#0a1a0f] text-sm">{opt.label}</p>
                        <p className="text-[#9ca3af] text-xs">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="bg-white rounded-3xl border border-[#f0e8d5] p-6">
                <h2 className="font-bold text-[#0a1a0f] text-base mb-3">Order Notes (optional)</h2>
                <textarea
                  value={form.notes}
                  onChange={e => update("notes", e.target.value)}
                  placeholder="Any special requests, gift messages, or delivery instructions..."
                  rows={3}
                  className={inputClass(false) + " resize-none"}
                />
              </div>
            </div>

            {/* ── RIGHT: Order summary ──────────────────────────────────────── */}
            <div className="lg:sticky lg:top-28 self-start space-y-4">
              <div className="bg-white rounded-3xl border border-[#f0e8d5] p-6">
                <h2 className="font-bold text-[#0a1a0f] text-lg mb-5">Order Summary</h2>

                <div className="space-y-3 mb-5">
                  {cartProducts.map(({ product, qty }) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                        style={{ background: product.gradient }}>
                        {product.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#0a1a0f] text-sm font-medium truncate">{product.name}</p>
                        <p className="text-[#9ca3af] text-xs">Qty: {qty}</p>
                      </div>
                      <p className="text-[#374151] font-semibold text-sm flex-shrink-0">
                        £{(product.price * qty).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#f0e8d5] pt-4 space-y-2 mb-5">
                  <div className="flex justify-between text-sm text-[#6b7280]">
                    <span>Subtotal</span><span>£{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#6b7280]">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
                      {shipping === 0 ? "FREE" : `£${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[#9ca3af] text-xs">Add £{(50 - totalPrice).toFixed(2)} more for free shipping</p>
                  )}
                  <div className="flex justify-between text-[#0a1a0f] font-black text-lg pt-2 border-t border-[#f0e8d5]">
                    <span>Total</span><span>£{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-[#d4af37] hover:bg-[#b8962e] disabled:opacity-60 text-[#0a1a0f] font-black py-4 rounded-full transition-all text-base flex items-center justify-center gap-2"
                >
                  {status === "submitting" ? (
                    <><span className="animate-spin">⏳</span> Placing order…</>
                  ) : (
                    <><span>🎁</span> Place Order · £{grandTotal.toFixed(2)}</>
                  )}
                </button>

                <p className="text-center text-[#9ca3af] text-xs mt-3">
                  🔒 Secure · No payment taken now
                </p>
              </div>

              {/* Reassurance */}
              <div className="bg-[#0a1a0f] rounded-3xl p-5 space-y-3">
                {[
                  { icon: "📦", text: "Same-day dispatch on orders before 2pm" },
                  { icon: "🚚", text: "Free UK delivery on orders over £50" },
                  { icon: "↩️",  text: "14-day hassle-free returns" },
                  { icon: "📞", text: "Questions? Email hkcreativeweb@gmail.com" },
                ].map(item => (
                  <div key={item.text} className="flex items-start gap-2.5 text-white/60 text-xs">
                    <span className="flex-shrink-0 text-sm">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function inputClass(hasError: boolean) {
  return `w-full px-4 py-3 rounded-xl border text-[#0a1a0f] text-sm bg-[#faf7f0] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 transition-all ${
    hasError
      ? "border-red-300 focus:ring-red-200"
      : "border-[#e5d5c0] focus:ring-[#d4af37]/30 focus:border-[#d4af37]"
  }`;
}

function Field({
  label, error, children, className = "",
}: {
  label: string; error?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-[#374151] mb-1.5">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-red-500 text-xs mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
