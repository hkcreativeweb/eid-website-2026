import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import EidAdhaUrduPage from "@/components/EidAdhaUrduPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "عید الاضحی ۲۰۲۶ — اردو میں اہم حقائق",
  description:
    "عید الاضحی کے بارے میں اہم حقائق اردو زبان میں — تاریخ، قربانی، حضرت ابراہیمؑ کا واقعہ، اور پاکستانی روایات۔",
};

export default function UrduPage() {
  return (
    <main>
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <Navbar />
      <EidAdhaUrduPage />
      <Footer />
    </main>
  );
}
