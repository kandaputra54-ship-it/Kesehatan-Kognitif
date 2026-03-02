"use client";
import Image from "next/image";
import { useState } from "react";

export default function Materi() {
  const [hovered, setHovered] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);

  const modulData = [
    {
      no: "01",
      title: "Senam Otak",
      subtitle: "Brain Gym",
      desc: "Optimalisasi fungsi kognitif melalui gerakan terarah seperti cross crawl dan lazy 8.",
      detail: "Meningkatkan konsentrasi, koordinasi motorik, dan daya ingat jangka pendek secara signifikan. Ideal dilakukan 10–15 menit per sesi.",
      img: "/modul1.jpeg",
      video: "https://www.youtube.com/watch?v=pMnNRVQwCew",
      tag: "Kognitif",
    },
    {
      no: "02",
      title: "Terapi Fisik",
      subtitle: "Aktivitas Ringan Harian",
      desc: "Menjaga kesehatan kardiovaskular dan kebugaran otak melalui rutinitas fisik harian.",
      detail: "Sesuai rekomendasi WHO, aktivitas 150 menit per minggu membantu menjaga keseimbangan tubuh dan fungsi mental usia matang.",
      img: "/modul2.jpeg",
      video: "https://www.youtube.com/watch?v=ZnoDBtxdw-o",
      tag: "Fisik",
    },
    {
      no: "03",
      title: "Stimulasi Kognitif",
      subtitle: "Kelompok & Sosial",
      desc: "Interaksi sosial melalui diskusi dan permainan memori untuk mencegah penurunan fungsi otak.",
      detail: "Pendekatan kolaboratif ini memberikan dukungan psikososial yang kuat sekaligus memperlambat proses degeneratif kognitif.",
      img: "/modul3.jpeg",
      video: "https://drive.google.com/file/d/1c_AzrsZDf7gOsqvkafT3mIXXVYYtaxeu/preview",
      tag: "Sosial",
    },
  ];

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
            style={{ color: "var(--color-primary)", fontFamily: "var(--font-mono)" }}
          >
            ✦ Langkah Edukasi
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight"
              style={{ color: "var(--color-dark-gray)", fontFamily: "var(--font-display)" }}
            >
              Materi Program
              <br />
              <em className="not-italic font-light" style={{ color: "#9CA3AF" }}>& Stimulasi Mandiri</em>
            </h2>
            <p className="md:max-w-xs text-base leading-relaxed md:text-right" style={{ color: "#6B7280" }}>
              Tiga modul terstruktur untuk mendukung kesehatan otak dan kebugaran fungsional usia matang.
            </p>
          </div>
          <div className="mt-12 flex items-center gap-4">
            <div className="h-px flex-1 bg-stone-300" />
            <span className="text-stone-400 text-xs tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>3 MODUL</span>
            <div className="h-px flex-1 bg-stone-300" />
          </div>
        </div>

        {/* Module Cards */}
        <div className="space-y-24">
          {modulData.map((modul, i) => (
            <div
              key={i}
              className={`group flex flex-col gap-10 md:gap-16 items-stretch ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="w-full md:w-[52%] relative">
                <span
                  className="absolute -top-8 -left-4 text-[120px] md:text-[160px] font-black leading-none select-none pointer-events-none transition-all duration-500"
                  style={{
                    color: hovered === i ? "var(--color-primary)" : "transparent",
                    WebkitTextStroke: `2px ${hovered === i ? "transparent" : "#D6D3D1"}`,
                    fontFamily: "var(--font-mono)",
                    zIndex: 0,
                  }}
                >
                  {modul.no}
                </span>

                <div
                  className="relative h-[360px] md:h-[480px] w-full rounded-3xl overflow-hidden transition-all duration-700"
                  style={{
                    boxShadow:
                      hovered === i
                        ? "0 40px 80px -20px rgba(91,75,219,0.3)"
                        : "0 24px 48px -12px rgba(0,0,0,0.12)",
                  }}
                >
                  <Image
                    src={modul.img}
                    alt={modul.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{
                      background: "linear-gradient(135deg, rgba(91,75,219,0.15) 0%, transparent 60%)",
                      opacity: hovered === i ? 1 : 0,
                    }}
                  />
                  <div
                    className="absolute bottom-6 left-6 px-4 py-1.5 rounded-full text-white text-xs font-bold tracking-widest uppercase"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    {modul.tag}
                  </div>
                  <div
                    className="absolute top-6 right-6 bg-white/80 backdrop-blur-sm font-black px-4 py-1.5 rounded-xl text-xs tracking-widest shadow"
                    style={{ color: "var(--color-dark-gray)", fontFamily: "var(--font-mono)" }}
                  >
                    MODUL {modul.no}
                  </div>
                </div>
              </div>

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
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-dark-gray)" }}
                  >
                    {modul.title}
                  </h3>
                </div>

                <div
                  className="h-0.5 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    width: hovered === i ? "80px" : "40px",
                  }}
                />

                <p
                  className="text-lg font-semibold leading-relaxed"
                  style={{ color: "var(--color-primary)" }}
                >
                  {modul.desc}
                </p>
                <p className="text-base leading-relaxed" style={{ color: "#6B7280" }}>
                  {modul.detail}
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => setPlayingVideo(modul.video)}
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl text-white font-bold text-sm transition-all duration-300 active:scale-95"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      boxShadow: "0 8px 24px -4px rgba(91,75,219,0.4)",
                    }}
                  >
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
                      ▶
                    </span>
                    Tonton Video Panduan
                  </button>
                  <button
                    onClick={() => alert("Leaflet tersedia melalui fasilitator.")}
                    className="px-7 py-3.5 rounded-2xl font-bold text-sm border-2 border-stone-200 hover:border-stone-400 transition-all duration-300 bg-white active:scale-95"
                    style={{ color: "var(--color-dark-gray)" }}
                  >
                    Lihat Leaflet →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-28 pt-10 border-t border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm" style={{ color: "#9CA3AF" }}>
          <span className="tracking-widest text-xs uppercase" style={{ fontFamily: "var(--font-mono)" }}>Program Stimulasi Kognitif</span>
          <span>Dikembangkan berdasarkan panduan WHO & evidence-based practice</span>
        </div>
      </div>

      {/* Video Modal Overlay */}
      {playingVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setPlayingVideo(null)}
        >
          <div 
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 z-[110] text-white bg-white/20 hover:bg-white/40 w-10 h-10 rounded-full transition-colors"
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
    </section>
  );
}