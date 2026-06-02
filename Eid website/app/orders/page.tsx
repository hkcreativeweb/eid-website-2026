import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import OrdersAdmin from "@/components/OrdersAdmin";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Orders Dashboard — Eid Shop Admin",
  description: "View and manage all customer orders from the Eid gift shop.",
};

export default function OrdersRoute() {
  return (
    <main>
      <Navbar />
      <OrdersAdmin />
      <Footer />
    </main>
  );
}
