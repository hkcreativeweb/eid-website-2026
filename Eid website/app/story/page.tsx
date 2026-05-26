import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import StoryPage from "@/components/StoryPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Story of Eid — History, Origin & the Test of Ibrahim (AS)",
  description:
    "Discover the origins of Eid al-Fitr and Eid al-Adha — from the Prophet's ﷺ arrival in Medina to the remarkable story of Ibrahim (AS) and the sacrifice.",
};

export default function Story() {
  return (
    <main>
      <Navbar />
      <StoryPage />
      <Footer />
    </main>
  );
}
