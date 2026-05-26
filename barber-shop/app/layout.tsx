import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Sharp & Shear Barbers — Horley",
  description:
    "Horley's premier barbershop since 2012. Expert fades, classic cuts, hot towel shaves, and professional grooming for the modern gentleman. Walk-ins welcome.",
  keywords: [
    "barber",
    "barbershop",
    "Horley",
    "Surrey",
    "men's haircut",
    "fades",
    "beard trim",
    "hot towel shave",
    "Sharp and Shear",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-white text-gray-900 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
