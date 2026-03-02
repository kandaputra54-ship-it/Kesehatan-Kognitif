"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Tentang from "@/components/Tentang";
import StatsBar from "@/components/StatsBar";
import Materi from "@/components/Materi";
import MMSEInfo from "@/components/MMSEInfo";
import Fitur from "@/components/Fitur";
import Galeri from "@/components/Galeri";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function LandingPage() {
  const scrollToCTA = () => {
    document.getElementById("cta-section")?.scrollIntoView({ 
      behavior: "smooth" 
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero onStart={scrollToCTA} />
      <Tentang />
      <StatsBar />
      <Materi />
      <MMSEInfo />
      <Fitur />
      <Galeri />
      <CTA  />
      <Footer />
    </main>
  );
}