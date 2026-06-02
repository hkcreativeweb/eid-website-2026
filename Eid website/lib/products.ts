export type Category = "Prayer" | "Hampers" | "Nikkah" | "Decor";

export type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: Category;
  emoji: string;
  gradient: string;
  description: string;
  features: string[];
  badge?: string;
  inStock: boolean;
};

export const PRODUCTS: Product[] = [
  // ── Prayer ─────────────────────────────────────────────────────────────────
  {
    id: 1,
    name: "Classic Prayer Mat",
    slug: "classic-prayer-mat",
    price: 19.99,
    category: "Prayer",
    emoji: "🕌",
    gradient: "linear-gradient(135deg,#1a4731,#2d6a4f)",
    description: "Beautifully crafted prayer mat with traditional Islamic geometric patterns. Soft, non-slip base — perfect for Eid gifting.",
    features: ["100% cotton", "Non-slip backing", "120 × 70 cm", "Machine washable"],
    inStock: true,
  },
  {
    id: 2,
    name: "Premium Velvet Prayer Mat",
    slug: "premium-velvet-prayer-mat",
    price: 34.99,
    originalPrice: 44.99,
    category: "Prayer",
    emoji: "✨",
    gradient: "linear-gradient(135deg,#0a1a0f,#1a4731)",
    description: "Luxurious velvet prayer mat with embroidered Kaaba design. Gift-boxed and ready to present on any Islamic occasion.",
    features: ["Velvet fabric", "Embroidered design", "Gift box included", "125 × 75 cm"],
    badge: "Best Seller",
    inStock: true,
  },
  {
    id: 3,
    name: "Travel Prayer Mat",
    slug: "travel-prayer-mat",
    price: 14.99,
    category: "Prayer",
    emoji: "🎒",
    gradient: "linear-gradient(135deg,#134e4a,#0f766e)",
    description: "Compact fold-up prayer mat for travel. Includes a qibla compass and carry pouch — ideal for the frequent traveller.",
    features: ["Fold-up design", "Qibla compass", "Carry pouch", "Lightweight 280g"],
    inStock: true,
  },
  // ── Hampers ────────────────────────────────────────────────────────────────
  {
    id: 4,
    name: "Classic Eid Hamper",
    slug: "classic-eid-hamper",
    price: 39.99,
    category: "Hampers",
    emoji: "🎁",
    gradient: "linear-gradient(135deg,#92400e,#d97706)",
    description: "A beautifully curated hamper with Medjool dates, rose water, mixed nuts, and traditional sweets. Perfect for Eid al-Adha.",
    features: ["Medjool dates 500g", "Rose water", "Mixed nuts", "Traditional sweets", "Luxury gift box"],
    inStock: true,
  },
  {
    id: 5,
    name: "Deluxe Eid Gift Box",
    slug: "deluxe-eid-gift-box",
    price: 64.99,
    category: "Hampers",
    emoji: "👑",
    gradient: "linear-gradient(135deg,#78350f,#b45309)",
    description: "Our most popular premium gift box — prayer beads, attar perfume, Medjool dates, and a hand-written Eid card.",
    features: ["Premium dates 750g", "Attar perfume", "Tasbih beads", "Eid card", "Satin-lined box"],
    badge: "Popular",
    inStock: true,
  },
  {
    id: 6,
    name: "Family Eid Bundle",
    slug: "family-eid-bundle",
    price: 89.99,
    originalPrice: 109.99,
    category: "Hampers",
    emoji: "🏡",
    gradient: "linear-gradient(135deg,#7c2d12,#c2410c)",
    description: "Everything your family needs to celebrate Eid in style. Includes multiple hamper items, sweets, and personalised gift tags.",
    features: ["Serves 4–6", "Mixed sweets & dates", "Personalised tags", "Free UK delivery"],
    badge: "Family Deal",
    inStock: true,
  },
  // ── Nikkah ─────────────────────────────────────────────────────────────────
  {
    id: 7,
    name: "Nikkah Gift Set",
    slug: "nikkah-gift-set",
    price: 49.99,
    category: "Nikkah",
    emoji: "💍",
    gradient: "linear-gradient(135deg,#581c87,#7e22ce)",
    description: "A thoughtful gift for the newlywed couple — matching prayer mats, a mini Quran, dates, and a personalised calligraphy frame.",
    features: ["Couple prayer mats", "Mini Quran", "Dates & sweets", "Personalised frame"],
    badge: "New",
    inStock: true,
  },
  {
    id: 8,
    name: "Islamic Calligraphy Frame",
    slug: "islamic-calligraphy-frame",
    price: 29.99,
    category: "Nikkah",
    emoji: "🖼️",
    gradient: "linear-gradient(135deg,#4c1d95,#6d28d9)",
    description: "Elegant Islamic calligraphy wall frame featuring Quranic verses — ideal for new homes, Nikkah gifts, or home decor.",
    features: ["A4 frame", "Quranic verse", "Gold foil print", "Ready to hang"],
    inStock: true,
  },
  {
    id: 9,
    name: "Couple Tasbih Set",
    slug: "couple-tasbih-set",
    price: 24.99,
    category: "Nikkah",
    emoji: "📿",
    gradient: "linear-gradient(135deg,#831843,#be185d)",
    description: "Matching his & hers tasbih set in a luxury gift box, crafted from premium olive wood beads. A beautiful Nikkah keepsake.",
    features: ["His & hers set", "Olive wood beads", "Gift box", "99 beads each"],
    inStock: true,
  },
  // ── Decor ──────────────────────────────────────────────────────────────────
  {
    id: 10,
    name: "Luxury Attar Gift Set",
    slug: "luxury-attar-gift-set",
    price: 34.99,
    category: "Decor",
    emoji: "🌹",
    gradient: "linear-gradient(135deg,#881337,#e11d48)",
    description: "A curated set of three premium attar (oud-based) perfume oils. Long-lasting, alcohol-free, and 100% halal.",
    features: ["3 × 6ml bottles", "Alcohol-free", "Oud-based", "Velvet gift box"],
    inStock: true,
  },
  {
    id: 11,
    name: "Quran with Stand & Cover",
    slug: "quran-with-stand-cover",
    price: 44.99,
    category: "Decor",
    emoji: "📖",
    gradient: "linear-gradient(135deg,#064e3b,#047857)",
    description: "Beautiful leather-bound Quran with an engraved wooden stand and embroidered cover. A timeless Islamic gift for any occasion.",
    features: ["Leather binding", "Wooden stand", "Embroidered cover", "Arabic & English"],
    badge: "Gift Ready",
    inStock: true,
  },
  {
    id: 12,
    name: "Premium Tasbih Beads",
    slug: "premium-tasbih-beads",
    price: 12.99,
    category: "Decor",
    emoji: "📿",
    gradient: "linear-gradient(135deg,#134e4a,#0f766e)",
    description: "Handcrafted 99-bead tasbih in olive wood, engraved with the 99 names of Allah. Smooth, durable, and beautifully presented.",
    features: ["Olive wood", "99 beads", "99 names engraved", "Velvet pouch"],
    inStock: true,
  },
];

export const CATEGORIES: Category[] = ["Prayer", "Hampers", "Nikkah", "Decor"];

export const CATEGORY_META: Record<Category, { color: string; lightBg: string; emoji: string; desc: string }> = {
  Prayer:  { color: "#16a34a", lightBg: "#dcfce7", emoji: "🕌", desc: "Prayer mats & accessories" },
  Hampers: { color: "#d97706", lightBg: "#fef3c7", emoji: "🎁", desc: "Curated Eid gift hampers" },
  Nikkah:  { color: "#9333ea", lightBg: "#f3e8ff", emoji: "💍", desc: "Wedding & Nikkah gifts" },
  Decor:   { color: "#0d9488", lightBg: "#ccfbf1", emoji: "🌙", desc: "Islamic decor & perfumes" },
};
