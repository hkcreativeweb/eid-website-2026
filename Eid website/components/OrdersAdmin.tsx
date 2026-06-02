"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Order = {
  id: string;
  date: string;
  customer: { name: string; email: string; phone: string };
  address: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  shipping: number;
  payment: string;
  notes: string;
};

const PAYMENT_LABELS: Record<string, string> = {
  "bank-transfer": "🏦 Bank Transfer",
  "paypal":        "💳 PayPal",
  "cash":          "💵 Cash",
};

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("eid-orders") || "[]");
      setOrders(stored);
    } catch {}
  }, []);

  function clearOrders() {
    if (!confirm("Delete all order history? This cannot be undone.")) return;
    localStorage.removeItem("eid-orders");
    setOrders([]);
  }

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

  return (
    <section className="min-h-screen bg-[#faf7f0] pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0a1a0f]">Orders Dashboard</h1>
            <p className="text-[#9ca3af] text-sm mt-1">
              {orders.length} order{orders.length !== 1 ? "s" : ""} · Total revenue: £{totalRevenue.toFixed(2)}
            </p>
          </div>
          {orders.length > 0 && (
            <button
              onClick={clearOrders}
              className="text-red-400 hover:text-red-600 text-sm font-semibold border border-red-200 px-4 py-2 rounded-full transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Stats */}
        {orders.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Orders",    value: orders.length,                          icon: "📦" },
              { label: "Total Revenue",   value: `£${totalRevenue.toFixed(2)}`,           icon: "💰" },
              { label: "Avg Order Value", value: `£${(totalRevenue / orders.length).toFixed(2)}`, icon: "📊" },
              { label: "Pending Payment", value: orders.length,                          icon: "⏳" },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl border border-[#f0e8d5] p-4 text-center">
                <p className="text-2xl mb-1">{s.icon}</p>
                <p className="text-xl font-black text-[#0a1a0f]">{s.value}</p>
                <p className="text-[#9ca3af] text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Orders list */}
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-[#374151] font-semibold text-lg">No orders yet</p>
            <p className="text-[#9ca3af] text-sm mt-1">Orders placed via the shop will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-3xl border border-[#f0e8d5] overflow-hidden"
              >
                {/* Order header */}
                <button
                  onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-[#faf7f0] transition-colors"
                >
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="font-mono font-bold text-[#d4af37] text-sm">{order.id}</span>
                    <span className="text-[#0a1a0f] font-semibold">{order.customer.name}</span>
                    <span className="text-[#9ca3af] text-sm">{new Date(order.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                    <span className="text-[#1a4731] font-black">£{order.total.toFixed(2)}</span>
                    <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full font-semibold">
                      {PAYMENT_LABELS[order.payment] || order.payment}
                    </span>
                  </div>
                  <svg className={`w-5 h-5 text-[#9ca3af] transition-transform ${expanded === order.id ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Expanded details */}
                {expanded === order.id && (
                  <div className="border-t border-[#f0e8d5] p-5 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                    <div>
                      <p className="text-xs font-bold text-[#9ca3af] uppercase tracking-wide mb-2">Customer</p>
                      <p className="text-[#0a1a0f] font-semibold">{order.customer.name}</p>
                      <a href={`mailto:${order.customer.email}`} className="text-[#d4af37] hover:underline block">{order.customer.email}</a>
                      <p className="text-[#374151]">{order.customer.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#9ca3af] uppercase tracking-wide mb-2">Delivery Address</p>
                      <p className="text-[#374151] whitespace-pre-line">{order.address}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#9ca3af] uppercase tracking-wide mb-2">Items Ordered</p>
                      <ul className="space-y-1">
                        {order.items.map((item, j) => (
                          <li key={j} className="flex justify-between text-[#374151]">
                            <span>{item.name} × {item.qty}</span>
                            <span className="font-semibold">£{(item.price * item.qty).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-[#f0e8d5] mt-2 pt-2 flex justify-between font-black text-[#0a1a0f]">
                        <span>Total</span><span>£{order.total.toFixed(2)}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#9ca3af] uppercase tracking-wide mb-2">Notes</p>
                      <p className="text-[#374151]">{order.notes || "—"}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <a
                          href={`mailto:${order.customer.email}?subject=Your Order ${order.id} — Payment Details`}
                          className="bg-[#d4af37] hover:bg-[#b8962e] text-[#0a1a0f] font-bold text-xs px-4 py-2 rounded-full transition-colors"
                        >
                          📧 Send Payment Details
                        </a>
                        <a
                          href={`mailto:${order.customer.email}?subject=Your Order ${order.id} — Dispatched!`}
                          className="bg-[#1a4731] hover:bg-[#0a1a0f] text-white font-bold text-xs px-4 py-2 rounded-full transition-colors"
                        >
                          🚚 Mark Dispatched
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
