import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import QurbaniMaze from "@/components/QurbaniMaze";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Find Your Qurbani Sheep — Eid al-Adha Maze Game",
  description:
    "Navigate through the farm maze to find the correct sheep! A fun educational game for kids that teaches colours, numbers, and shapes.",
};

export default function MazePage() {
  return (
    <main>
      <Navbar />
      <QurbaniMaze />
      <Footer />
    </main>
  );
}
