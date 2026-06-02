import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CheckoutPage from "@/components/CheckoutPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Checkout — Eid Gifts & Islamic Shop",
  description: "Complete your Eid gift order. Secure checkout with bank transfer or PayPal. Free UK delivery on orders over £50.",
};

export default function CheckoutRoute() {
  return (
    <main>
      <Navbar />
      <CheckoutPage />
      <Footer />
    </main>
  );
}
