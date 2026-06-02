"use client";
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { PRODUCTS, Product } from "./products";

export type CartItem = { productId: number; qty: number };

export type CartContextType = {
  items: CartItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  updateQty: (productId: number, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  cartProducts: (CartItem & { product: Product })[];
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems]   = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("eid-shop-cart");
      if (stored) setItems(JSON.parse(stored));
    } catch {}
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever items change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("eid-shop-cart", JSON.stringify(items));
  }, [items, hydrated]);

  const addToCart = useCallback((productId: number) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === productId);
      return existing
        ? prev.map(i => i.productId === productId ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { productId, qty: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems(prev => prev.filter(i => i.productId !== productId));
  }, []);

  const updateQty = useCallback((productId: number, qty: number) => {
    if (qty <= 0) { removeFromCart(productId); return; }
    setItems(prev => prev.map(i => i.productId === productId ? { ...i, qty } : i));
  }, [removeFromCart]);

  const clearCart = useCallback(() => setItems([]), []);

  const cartProducts = items
    .map(item => ({ ...item, product: PRODUCTS.find(p => p.id === item.productId)! }))
    .filter(i => !!i.product);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cartProducts.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQty, clearCart,
      totalItems, totalPrice, cartProducts, isOpen, setIsOpen,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
