import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SheepGame from "@/components/SheepGame";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shear the Sheep — Eid al-Adha Mini Game",
  description:
    "Click as fast as you can to shear the sheep before the Eid al-Adha timer runs out! A fun mini game for the whole family.",
};

export default function GamePage() {
  return (
    <main>
      <Navbar />
      <SheepGame />
      <Footer />
    </main>
  );
}
