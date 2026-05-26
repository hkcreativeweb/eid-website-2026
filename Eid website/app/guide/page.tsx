import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import EidGuide from "@/components/EidGuide";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "What to Do on Eid Day — Sunnah, Prayer & Guide",
  description:
    "A complete guide to Eid day: morning Sunnah practices, how to perform the Eid prayer step by step, and how to spend the rest of your blessed day.",
};

export default function GuidePage() {
  return (
    <main>
      <Navbar />
      <EidGuide />
      <Footer />
    </main>
  );
}
