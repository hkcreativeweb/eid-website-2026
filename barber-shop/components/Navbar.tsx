"use client"

import { useState } from "react"
import { Scissors, Menu, X } from "lucide-react"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#products", label: "Products" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-yellow-100 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2 group">
            <Scissors className="h-6 w-6 text-yellow-500 group-hover:rotate-12 transition-transform duration-200" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Sharp &amp; Shear
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-gray-600 hover:text-yellow-500 transition-colors font-medium text-sm"
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-5 py-2 rounded-full transition-all duration-200 hover:shadow-md text-sm"
            >
              Book Now
            </a>
          </div>

          <button
            className="md:hidden p-2 text-gray-600 hover:text-yellow-500 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-4">
            <div className="flex flex-col gap-3">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="text-gray-600 hover:text-yellow-500 transition-colors font-medium px-2 py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </a>
              ))}
              <a
                href="#contact"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-5 py-2 rounded-full transition-all duration-200 text-center mt-2"
                onClick={() => setIsOpen(false)}
              >
                Book Now
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
