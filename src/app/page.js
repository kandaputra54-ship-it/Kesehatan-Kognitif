"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Tentang from "@/components/Tentang";
import Materi from "@/components/Materi";
import MMSEInfo from "@/components/MMSEInfo";
import Galeri from "@/components/Galeri";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import MMSEWizard from "@/components/MMSEWizard";

export default function LandingPage() {
  // State untuk mengontrol tampilan halaman
  const [view, setView] = useState("landing");
  
  // State untuk modal konfirmasi pembatalan agar data tidak hilang
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const scrollToCTA = () => {
    document.getElementById("cta-section")?.scrollIntoView({ 
      behavior: "smooth" 
    });
  };

  const handleCancelClick = () => {
    // Menampilkan modal peringatan sebelum benar-benar keluar
    setShowConfirmModal(true);
  };

  const confirmExit = () => {
    setShowConfirmModal(false);
    setView("landing");
  };

  return (
    <main className="min-h-screen bg-background">
      {view === "landing" ? (
        /* --- TAMPILAN LANDING PAGE --- */
        <>
          <Navbar />
          <Hero onStart={scrollToCTA} />
          <Tentang />
          <Materi />
          <MMSEInfo />
          <Galeri />
          {/* Tombol CTA mengarahkan ke Pre-Test */}
          <CTA onStart={() => setView("pre-test")} />
          <Footer />
        </>
      ) : (
        /* --- TAMPILAN WIZARD (PRE/POST TEST) --- */
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#F9FAFB] relative">
          
          {/* MODAL KONFIRMASI PEMBATALAN */}
          {showConfirmModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#1F2937]/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white rounded-[32px] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200 border border-gray-100">
                <h3 className="text-xl font-black text-[#1F2937] mb-2">Batalkan Pengkajian?</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  Data yang sudah Anda masukkan akan hilang . Apakah Anda yakin ingin kembali ke beranda?
                </p>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={confirmExit}
                    className="w-full py-4 bg-red-500 text-white rounded-2xl font-black text-sm active:scale-95 transition-all shadow-lg shadow-red-200"
                  >
                    Ya, Batalkan & Keluar
                  </button>
                  <button 
                    onClick={() => setShowConfirmModal(false)}
                    className="w-full py-4 bg-gray-100 text-gray-600 rounded-2xl font-black text-sm active:scale-95 transition-all"
                  >
                    Lanjutkan Pengkajian
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* KONTAINER UTAMA WIZARD */}
          <div className="max-w-xl w-full bg-white p-10 md:p-14 rounded-[40px] shadow-2xl border border-gray-100 relative">
            <MMSEWizard 
              type={view === "pre-test" ? "Pre-Test" : "Post-Test"} 
              onComplete={() => setView("landing")} 
            />

            {/* Tombol Batal dengan Trigger Modal */}
            <button 
              onClick={handleCancelClick}
              className="mt-10 text-xs font-black text-gray-400 uppercase tracking-[0.2em] block mx-auto hover:text-red-500 transition-all cursor-pointer"
            >
              ← Batal & Kembali ke Beranda
            </button>
          </div>
        </div>
      )}
    </main>
  );
}