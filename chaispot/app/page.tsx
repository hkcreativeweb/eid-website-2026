import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { FeaturedDrinks } from "@/components/FeaturedDrinks"
import { VideoSection } from "@/components/VideoSection"
import { MenuSection } from "@/components/MenuSection"
import { LoyaltySection } from "@/components/LoyaltySection"
import { MapSection } from "@/components/MapSection"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedDrinks />
        <VideoSection />
        <MenuSection />
        <LoyaltySection />
        <MapSection />
      </main>
    </>
  )
}
