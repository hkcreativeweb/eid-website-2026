import { Navbar } from "@/components/Navbar"
import { BackgroundPaths } from "@/components/ui/background-paths"
import { AboutSection } from "@/components/AboutSection"
import { ProductsSection } from "@/components/ProductsSection"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div id="home" className="pt-16">
          <BackgroundPaths
            title="Sharp & Shear"
            subtitle="Horley's Premier Barbershop"
            ctaText="Book Your Appointment"
          />
        </div>
        <AboutSection />
        <ProductsSection />
      </main>
      <Footer />
    </>
  )
}
