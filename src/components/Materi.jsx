"use client";
import Image from "next/image";
import { useState } from "react";
import PdfViewer from "./PdfViewer";

export default function Materi() {
  const [hovered, setHovered] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);

  // State viewingLeaflet sekarang menyimpan object modul lengkap, bukan hanya ID
  const [viewingLeaflet, setViewingLeaflet] = useState(null);
  const [currentLeafletIndex, setCurrentLeafletIndex] = useState(0);

  const [viewingPdf, setViewingPdf] = useState(null);

  const modulData = [
    {
      no: "01",
      title: "Senam Otak",
      subtitle: "Brain Gym",
      desc: "Optimalisasi fungsi kognitif melalui gerakan terarah seperti cross crawl dan lazy 8.",
      detail:
        "Meningkatkan konsentrasi, koordinasi motorik, dan daya ingat jangka pendek secara signifikan.",
      img: "/modul1.jpeg",
      video:
        "https://drive.google.com/file/d/1c_AzrsZDf7gOsqvkafT3mIXXVYYtaxeu/preview",
      leafletId: ["1YvhvbDy7rt5y0MZgw8zvsULsqtWMunss"],
      pdfUrl:
        "https://drive.google.com/file/d/1JrPTDtGVw8kSOrjVHppq0EvUJ-5vVbDF/preview",
      tag: "Kognitif",
      hasVideo: true,
    },
    {
      no: "02",
      title: "Terapi Fisik",
      subtitle: "Aktivitas Ringan Harian",
      desc: "Menjaga kesehatan kardiovaskular dan kebugaran otak melalui rutinitas fisik harian.",
      detail:
        "Sesuai rekomendasi WHO, aktivitas 150 menit per minggu membantu menjaga keseimbangan tubuh.",
      img: "/modul2.jpeg",
      video:
        "https://drive.google.com/file/d/1-GtEmH3bhTGtejm2OO9Ncahfn49a9R7v/preview",
      leafletId: ["132oQGVfA8KMtabSc7JWEb4LkVp8Q7ylK"],
      tag: "Fisik",
      hasVideo: true,
    },
    {
      no: "03",
      title: "Stimulasi Kognitif",
      subtitle: "Kelompok & Sosial",
      desc: "Interaksi sosial melalui diskusi dan permainan memori untuk mencegah penurunan fungsi otak.",
      detail:
        "Pendekatan kolaboratif ini memberikan dukungan psikososial yang kuat bagi lansia.",
      img: "/modul3.jpeg",
      leafletId: ["19AVAxM5BvR-y2pNdJYD3f_f87-W4KLjp"],
      tag: "Sosial",
      hasVideo: false,
    },
  ];

  // Helper fungsi navigasi
  const nextSlide = (e) => {
    e?.stopPropagation();
    if (!viewingLeaflet || !Array.isArray(viewingLeaflet.leafletId)) return;
    setCurrentLeafletIndex((prev) =>
      prev === viewingLeaflet.leafletId.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = (e) => {
    e?.stopPropagation();
    if (!viewingLeaflet || !Array.isArray(viewingLeaflet.leafletId)) return;
    setCurrentLeafletIndex((prev) =>
      prev === 0 ? viewingLeaflet.leafletId.length - 1 : prev - 1,
    );
  };

  return (
    <section
      id="materi"
      className="relative py-32 bg-[var(--color-background)] border-t border-stone-200 overflow-hidden"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 60px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-28">
          <p
            className="text-xs font-bold tracking-[0.3em] uppercase mb-5"
            style={{
              color: "var(--color-primary)",
              fontFamily: "var(--font-mono)",
            }}
          >
            ✦ Langkah Edukasi
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight"
              style={{
                color: "var(--color-dark-gray)",
                fontFamily: "var(--font-display)",
              }}
            >
              Materi Program
              <br />
              <em
                className="not-italic font-light"
                style={{ color: "#9CA3AF" }}
              >
                & Stimulasi Mandiri
              </em>
            </h2>
          </div>
        </div>

        {/* Module Cards */}
        <div className="space-y-24">
          {modulData.map((modul, i) => (
            <div
              key={i}
              className={`group flex flex-col gap-10 md:gap-16 items-stretch ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image Side */}
              <div className="w-full md:w-[52%] relative">
                <span
                  className="absolute -top-8 -left-4 text-[120px] md:text-[160px] font-black leading-none select-none pointer-events-none transition-all duration-500"
                  style={{
                    color:
                      hovered === i ? "var(--color-primary)" : "transparent",
                    WebkitTextStroke: `2px ${hovered === i ? "transparent" : "#D6D3D1"}`,
                    fontFamily: "var(--font-mono)",
                    zIndex: 0,
                  }}
                >
                  {modul.no}
                </span>
                <div className="relative h-[360px] md:h-[480px] w-full rounded-3xl overflow-hidden shadow-xl transition-all duration-700">
                  <Image
                    src={modul.img}
                    alt={modul.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div
                    className="absolute top-6 right-6 bg-white/80 backdrop-blur-sm font-black px-4 py-1.5 rounded-xl text-xs tracking-widest shadow"
                    style={{
                      color: "var(--color-dark-gray)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    MODUL {modul.no}
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-[48%] flex flex-col justify-center space-y-7">
                <div>
                  <p
                    className="text-sm tracking-widest uppercase mb-2 transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: hovered === i ? "var(--color-primary)" : "#A8A29E",
                    }}
                  >
                    {modul.subtitle}
                  </p>
                  <h3
                    className="text-4xl md:text-5xl font-black leading-tight"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-dark-gray)",
                    }}
                  >
                    {modul.title}
                  </h3>
                </div>

                <p
                  className="text-lg font-semibold leading-relaxed"
                  style={{ color: "var(--color-primary)" }}
                >
                  {modul.desc}
                </p>
                <p className="text-base leading-relaxed text-gray-500">
                  {modul.detail}
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  {modul.hasVideo && (
                    <button
                      onClick={() => setPlayingVideo(modul.video)}
                      className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl text-white font-bold text-sm transition-all duration-300 active:scale-95 bg-[var(--color-primary)] shadow-lg shadow-indigo-200"
                    >
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
                        ▶
                      </span>
                      Video Panduan
                    </button>
                  )}
                  {/* 4. TOMBOL BARU UNTUK PDF (Hanya jika pdfUrl ada) */}
                  {modul.pdfUrl && (
                    <button
                      onClick={() =>
                        setViewingPdf({ url: modul.pdfUrl, title: modul.title })
                      }
                      className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-indigo-50 text-[var(--color-primary)] border border-indigo-100 hover:bg-indigo-100 transition-all duration-300 active:scale-95"
                    >
                      📖 Baca Materi
                    </button>
                  )}
                  <button
                    onClick={() => {
                      // Simpan object modul, bukan link
                      setViewingLeaflet(modul);
                      setCurrentLeafletIndex(0);
                    }}
                    className="px-6 py-3.5 rounded-2xl font-bold text-sm border-2 border-stone-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-300 bg-white active:scale-95"
                  >
                    Lihat Leaflet
                  </button>

                  <a
                    href={`https://drive.google.com/uc?export=download&id=${modul.leafletId[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-stone-100 text-stone-600 hover:bg-stone-200 transition-all duration-300 active:scale-95"
                  >
                    ↓ Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL VIDEO (TIDAK BERUBAH) --- */}
      {playingVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setPlayingVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-[110] text-white bg-white/10 hover:bg-white/30 w-10 h-10 rounded-full flex items-center justify-center transition-all"
              onClick={() => setPlayingVideo(null)}
            >
              ✕
            </button>
            <iframe
              src={playingVideo}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* --- MODAL LEAFLET MODERN UI --- */}
      {viewingLeaflet && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-stone-950/98 backdrop-blur-sm animate-fadeIn"
          onClick={() => setViewingLeaflet(null)}
        >
          {/* Header Modal */}
          <div className="w-full p-4 flex justify-between items-center border-b border-stone-800 bg-stone-950 relative z-10">
            <div className="flex flex-col ml-4">
              <h4 className="font-bold text-white text-lg">
                Leaflet: {viewingLeaflet.title}
              </h4>
              <p className="text-xs text-stone-400 font-mono">
                Modul {viewingLeaflet.no} ✦ Halaman {currentLeafletIndex + 1}{" "}
                dari {viewingLeaflet.leafletId.length}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Tombol Download Link Aktif */}
              <a
                href={`https://drive.google.com/uc?export=download&id=${viewingLeaflet.leafletId[currentLeafletIndex]}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-5 py-2.5 rounded-xl bg-stone-800 text-stone-200 font-bold text-xs hover:bg-stone-700 transition-all"
              >
                ↓ Download Halaman Ini
              </a>
              <button
                onClick={() => setViewingLeaflet(null)}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-stone-800 text-stone-400 hover:bg-red-500 hover:text-white transition-all active:scale-95"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Area Konten Foto & Navigasi */}
          <div className="flex-1 relative flex items-center justify-center p-4 md:p-8 group">
            {/* Foto Leaflet */}
            <div className="relative w-full h-full max-w-4xl shadow-2xl rounded-2xl overflow-hidden border border-stone-800 bg-black">
              <Image
                // Trik menampilkan image direct dari drive ID
                src={`https://drive.google.com/uc?id=${viewingLeaflet.leafletId[currentLeafletIndex]}`}
                alt={`Leaflet ${viewingLeaflet.title} halaman ${currentLeafletIndex + 1}`}
                fill
                priority
                className="object-contain" // Foto utuh tidak terpotong
                sizes="(max-width: 1024px) 100vw, 1024px"
              />

              {/* Overlay Navigasi (Hanya muncul jika > 1 halaman) */}
              {viewingLeaflet.leafletId.length > 1 && (
                <>
                  {/* Area klik kiri */}
                  <div
                    className="absolute inset-y-0 left-0 w-1/2 flex items-center justify-start p-4 cursor-pointer z-10"
                    onClick={prevSlide}
                  >
                    <button className="w-14 h-14 rounded-full bg-black/30 backdrop-blur-md text-white border border-white/10 flex items-center justify-center text-2xl font-mono shadow-xl opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-all hover:bg-white/20 hover:scale-110 -translate-x-10 group-hover:translate-x-0">
                      ‹
                    </button>
                  </div>

                  {/* Area klik kanan */}
                  <div
                    className="absolute inset-y-0 right-0 w-1/2 flex items-center justify-end p-4 cursor-pointer z-10"
                    onClick={nextSlide}
                  >
                    <button className="w-14 h-14 rounded-full bg-black/30 backdrop-blur-md text-white border border-white/10 flex items-center justify-center text-2xl font-mono shadow-xl opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-all hover:bg-white/20 hover:scale-110 translate-x-10 group-hover:translate-x-0">
                      ›
                    </button>
                  </div>

                  {/* Indikator Dots Bawah */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5 p-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
                    {viewingLeaflet.leafletId.map((_, dotIndex) => (
                      <button
                        key={dotIndex}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentLeafletIndex(dotIndex);
                        }}
                        className={`h-2.5 rounded-full transition-all duration-300 ${currentLeafletIndex === dotIndex ? "w-8 bg-[var(--color-primary)]" : "w-2.5 bg-white/40 hover:bg-white/70"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tailwind CSS Simple Animation */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      {/* 5. Panggil Komponen PdfViewer di paling bawah */}
      <PdfViewer
        isOpen={!!viewingPdf}
        onClose={() => setViewingPdf(null)}
        pdfUrl={viewingPdf?.url || ""}
        title={viewingPdf?.title || ""}
      />

    </section>
  );
}
