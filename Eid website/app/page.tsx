import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatIsEidSection from "@/components/WhatIsEidSection";
import EidDatesSection from "@/components/EidDatesSection";
import FactsSection from "@/components/FactsSection";
import TraditionsSection from "@/components/TraditionsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <WhatIsEidSection />
      <EidDatesSection />
      <FactsSection />
      <TraditionsSection />
      <Footer />
    </main>
  );
}
