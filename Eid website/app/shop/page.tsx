import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ShopPage from "@/components/ShopPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Eid Gifts & Islamic Shop — Prayer Mats, Hampers & Nikkah Sets",
  description:
    "Shop premium Islamic gifts for Eid al-Adha, Eid al-Fitr, Nikkah and more. Prayer mats, luxury Eid hampers, Nikkah gift sets, attar perfumes & Islamic décor. Free UK delivery on orders over £50.",
  keywords: [
    "Eid gifts", "Islamic gifts UK", "prayer mat", "Eid hamper", "Nikkah gift set",
    "Islamic home decor", "attar perfume", "tasbih", "Eid 2026 gifts", "Muslim gifts"
  ],
  openGraph: {
    title: "Eid Gifts & Islamic Shop",
    description: "Premium prayer mats, Eid hampers, Nikkah sets & Islamic décor — delivered across the UK.",
    type: "website",
  },
};

export default function ShopRoute() {
  return (
    <main>
      <Navbar />
      <ShopPage />
      <Footer />
    </main>
  );
}
