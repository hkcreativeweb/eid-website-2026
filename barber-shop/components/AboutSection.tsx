import Image from "next/image"
import { CheckCircle, Clock, Users, Award } from "lucide-react"

const features = [
  "Expert master barbers with 10+ years of experience",
  "Premium professional products used in every service",
  "Relaxing, welcoming atmosphere in the heart of Horley",
  "Walk-ins always welcome — appointments preferred",
  "Hot towel shaves, beard trims, and fade specialists",
  "Friendly, professional service guaranteed every visit",
]

const stats = [
  { icon: Clock, label: "Years Open", value: "12+" },
  { icon: Users, label: "Happy Clients", value: "5,000+" },
  { icon: Award, label: "Awards Won", value: "3×" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative h-[520px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=600&fit=crop"
                alt="Sharp & Shear barber at work in Horley"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-yellow-400 rounded-2xl px-7 py-5 shadow-xl">
              <p className="text-2xl font-bold text-gray-900 leading-tight">Since 2012</p>
              <p className="text-gray-800 font-medium text-sm">Serving Horley</p>
            </div>
          </div>

          <div>
            <p className="text-yellow-500 font-semibold text-xs uppercase tracking-widest mb-3">
              Our Story
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              More Than Just
              <span className="block text-yellow-500">a Haircut</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-5">
              Nestled in the heart of Horley, Sharp &amp; Shear has been the go-to destination for
              gentlemen who take pride in their appearance. We blend traditional barbering
              craftsmanship with contemporary styling to deliver results that consistently exceed
              expectations.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Our team of master barbers brings decades of collective experience to every chair.
              Whether you want a classic fade, a sharp skin taper, or a full beard transformation —
              we treat every client as an individual with a unique vision.
            </p>

            <ul className="space-y-3 mb-10">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center">
                  <Icon className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-gray-900">{value}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
