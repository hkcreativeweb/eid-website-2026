import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import EidAdhaBengaliPage from "@/components/EidAdhaBengaliPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ঈদুল আযহা ২০২৬ — বাংলায় গুরুত্বপূর্ণ তথ্য",
  description:
    "ঈদুল আযহা সম্পর্কে গুরুত্বপূর্ণ তথ্য বাংলা ভাষায় — তারিখ, কুরবানি, ইব্রাহিম (আ.)-এর ঘটনা এবং বাংলাদেশের ঐতিহ্য।",
};

export default function BengaliPage() {
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
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <Navbar />
      <EidAdhaBengaliPage />
      <Footer />
    </main>
  );
}
