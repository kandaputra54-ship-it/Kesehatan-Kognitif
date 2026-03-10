"use client";
import Image from "next/image";
import { useState } from "react";

export default function Materi() {
  const [hovered, setHovered] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [viewingLeaflet, setViewingLeaflet] = useState(null);

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
        leafletId: "1gdqQGqrGBsrgz0x6CbKKqRzugInvis9u",
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
      leafletId: "132oQGVfA8KMtabSc7JWEb4LkVp8Q7ylK",
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
      leafletId: "19AVAxM5BvR-y2pNdJYD3f_f87-W4KLjp", // ID BARU SUDAH TERPASANG
      tag: "Sosial",
      hasVideo: false,
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

                  <button
                    onClick={() =>
                      setViewingLeaflet(
                        `https://drive.google.com/file/d/${modul.leafletId}/preview`,
                      )
                    }
                    className="px-6 py-3.5 rounded-2xl font-bold text-sm border-2 border-stone-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-300 bg-white active:scale-95"
                  >
                    Lihat Leaflet
                  </button>

                  <a
                    href={`https://drive.google.com/uc?export=download&id=${modul.leafletId}`}
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

      {/* --- MODAL VIDEO --- */}
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

      {/* --- MODAL LEAFLET FULLSCREEN --- */}
      {viewingLeaflet && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/95 p-0 md:p-6"
          onClick={() => setViewingLeaflet(null)}
        >
          <div
            className="relative w-full h-full max-w-5xl bg-white md:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex justify-between items-center bg-white">
              <h4 className="font-bold text-gray-800 ml-4">Leaflet Edukasi</h4>
              <button
                onClick={() => setViewingLeaflet(null)}
                className="px-5 py-2 rounded-xl bg-stone-100 text-stone-600 font-bold text-sm hover:bg-stone-200"
              >
                Tutup
              </button>
            </div>
            <div className="flex-1 bg-stone-200">
              <iframe src={viewingLeaflet} className="w-full h-full"></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
