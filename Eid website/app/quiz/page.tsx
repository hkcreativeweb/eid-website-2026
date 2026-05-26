import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import EidQuizPage from "@/components/EidQuizPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Eid Quiz 2026 — Test Your Knowledge",
  description:
    "How well do you know Eid? Take our 10-question quiz on Eid al-Fitr and Eid al-Adha — history, traditions, and facts.",
};

export default function Quiz() {
  return (
    <main>
      <Navbar />
      <EidQuizPage />
      <Footer />
    </main>
  );
}
