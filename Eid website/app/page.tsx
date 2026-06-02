import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GreetingsSection from "@/components/GreetingsSection";
import WhatIsEidSection from "@/components/WhatIsEidSection";
import EidDatesSection from "@/components/EidDatesSection";
import FactsSection from "@/components/FactsSection";
import TraditionsSection from "@/components/TraditionsSection";
import ShopSection from "@/components/ShopSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <GreetingsSection />
      <WhatIsEidSection />
      <EidDatesSection />
      <FactsSection />
      <TraditionsSection />
      <ShopSection />
      <Footer />
    </main>
  );
}
