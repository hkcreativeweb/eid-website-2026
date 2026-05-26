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
  title: "Chai One On — West London's Warmest Obsession",
  description:
    "Real karak, real spices, real good vibes — right in the heart of Hayes, West London. Original Karak, Masala Chai, Matcha, Coffee & more.",
  keywords: ["karak chai", "Hayes", "West London", "chai latte", "masala chai", "Chai One On"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-[#0a0500] text-[#fef3c7] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
