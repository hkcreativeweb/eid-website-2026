import { Scissors, MapPin, Phone, Mail, Clock } from "lucide-react"

const hours = [
  { day: "Mon – Fri", time: "09:00 – 18:30" },
  { day: "Saturday", time: "08:30 – 17:00" },
  { day: "Sunday", time: "10:00 – 14:00" },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Scissors className="h-6 w-6 text-yellow-400" />
              <span className="text-xl font-bold tracking-tight">Sharp &amp; Shear</span>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Horley&apos;s premier barbershop since 2012. Expert cuts, hot towel shaves, and a
              welcoming atmosphere for every gentleman.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-yellow-400 mb-5 text-sm uppercase tracking-widest">
              Opening Hours
            </h3>
            <ul className="space-y-3">
              {hours.map(({ day, time }) => (
                <li key={day} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-400">
                    <Clock className="h-3.5 w-3.5 text-yellow-500/70" />
                    {day}
                  </span>
                  <span className="text-gray-300 font-medium">{time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-yellow-400 mb-5 text-sm uppercase tracking-widest">
              Find Us
            </h3>
            <address className="not-italic space-y-3">
              <p className="flex items-start gap-2.5 text-gray-400 text-sm">
                <MapPin className="h-4 w-4 text-yellow-500/70 mt-0.5 flex-shrink-0" />
                <span>
                  45 Victoria Road<br />
                  Horley, Surrey<br />
                  RH6 7BN
                </span>
              </p>
              <p className="flex items-center gap-2.5 text-sm">
                <Phone className="h-4 w-4 text-yellow-500/70 flex-shrink-0" />
                <a
                  href="tel:+441293550000"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  01293 550 000
                </a>
              </p>
              <p className="flex items-center gap-2.5 text-sm">
                <Mail className="h-4 w-4 text-yellow-500/70 flex-shrink-0" />
                <a
                  href="mailto:hello@sharpandshear.co.uk"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  hello@sharpandshear.co.uk
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-600 text-xs">
          <p>© 2024 Sharp &amp; Shear Barbers, Horley. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
