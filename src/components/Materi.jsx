"use client";
import Image from "next/image";
import { useState } from "react";
import PdfViewer from "./PdfViewer";

export default function Materi() {
  const [hovered, setHovered] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [viewingLeaflet, setViewingLeaflet] = useState(null);
  const [currentLeafletIndex, setCurrentLeafletIndex] = useState(0);
  const [viewingPdf, setViewingPdf] = useState(null);

  const modulData = [
    {
      no: "01",
      title: "Senam Otak",
      subtitle: "Brain Gym",
      desc: "Optimalisasi fungsi kognitif melalui gerakan terarah seperti cross crawl dan lazy 8.",
      detail: "Meningkatkan konsentrasi, koordinasi motorik, dan daya ingat jangka pendek secara signifikan.",
      img: "/modul1.jpeg",
      video: "https://drive.google.com/file/d/1c_AzrsZDf7gOsqvkafT3mIXXVYYtaxeu/preview",
      leafletId: ["1YvhvbDy7rt5y0MZgw8zvsULsqtWMunss"],
      pdfUrl: "https://drive.google.com/file/d/1JrPTDtGVw8kSOrjVHppq0EvUJ-5vVbDF/preview",
      tag: "Kognitif",
      hasVideo: true,
    },
    {
      no: "02",
      title: "Terapi Kelompok",
      subtitle: "Aktivitas Ringan Harian",
      desc: "Menjaga kesehatan kardiovaskular dan kebugaran otak melalui rutinitas Kelompok harian.",
      detail: "Sesuai rekomendasi WHO, aktivitas 150 menit per minggu membantu menjaga keseimbangan tubuh.",
      img: "/modul2.jpeg",
      video: "https://drive.google.com/file/d/1-GtEmH3bhTGtejm2OO9Ncahfn49a9R7v/preview",
      leafletId: ["132oQGVfA8KMtabSc7JWEb4LkVp8Q7ylK"],
      tag: "Fisik",
      hasVideo: true,
    },
    {
      no: "03",
      title: "Stimulasi Kognitif",
      subtitle: "Kelompok & Sosial",
      desc: "Interaksi sosial melalui diskusi dan permainan memori untuk mencegah penurunan fungsi otak.",
      detail: "Pendekatan kolaboratif ini memberikan dukungan psikososial yang kuat bagi lansia.",
      img: "/modul3.jpeg",
      leafletId: ["19AVAxM5BvR-y2pNdJYD3f_f87-W4KLjp"],
      tag: "Sosial",
      hasVideo: false,
    },
  ];

  const nextSlide = (e) => {
    e?.stopPropagation();
    if (!viewingLeaflet) return;
    setCurrentLeafletIndex((prev) =>
      prev === viewingLeaflet.leafletId.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = (e) => {
    e?.stopPropagation();
    if (!viewingLeaflet) return;
    setCurrentLeafletIndex((prev) =>
      prev === 0 ? viewingLeaflet.leafletId.length - 1 : prev - 1
    );
  };

  return (
    <section
      id="materi"
      className="relative py-28 bg-background overflow-hidden"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-[0.2em] mb-6"
            style={{
              background: "rgba(91,75,219,0.20)",
              borderColor: "rgba(91,75,219,0.35)",
              color: "rgba(255,255,255,0.90)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#a78bfa" }}
            />
            Langkah Edukasi
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-black leading-tight tracking-tighter">
            Materi{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg,  #7c3aed 100%)",
              }}
            >
              Program
            </span>
            <br />
            <span className="font-light text-black text-3xl md:text-4xl">
              & Stimulasi Mandiri
            </span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {modulData.map((modul, i) => (
            <div
              key={i}
              className="group relative rounded-[2rem] overflow-hidden shadow-2xl min-h-[540px] flex flex-col cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: "#1A162E",
              }}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <Image
                  src={modul.img}
                  alt={modul.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlays — same pattern as Tentang.jsx */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, #1A162E 0%, rgba(26,22,46,0.80) 50%, rgba(26,22,46,0.30) 100%)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A162E]/95 via-[#1A162E]/50 to-transparent" />
              </div>

              {/* Glow on hover */}
              <div
                className="absolute bottom-0 right-0 w-[260px] h-[260px] rounded-full blur-[80px] pointer-events-none -mb-20 -mr-20 transition-opacity duration-500"
                style={{
                  background: "#5B4BDB",
                  opacity: hovered === i ? 0.25 : 0.10,
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full p-7">
                {/* Top row: nomor + tag */}
                <div className="flex items-start justify-between mb-auto">
                  <span
                    className="text-[72px] font-black leading-none select-none transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: hovered === i ? "rgba(167,139,250,0.70)" : "rgba(255,255,255,0.10)",
                    }}
                  >
                    {modul.no}
                  </span>

                  <span
                    className="text-[10px] font-bold tracking-[0.3em] uppercase px-3 py-1 rounded-full border mt-2"
                    style={{
                      background: "rgba(91,75,219,0.25)",
                      borderColor: "rgba(91,75,219,0.45)",
                      color: "rgba(167,139,250,0.90)",
                    }}
                  >
                    {modul.tag}
                  </span>
                </div>

                {/* Bottom text block */}
                <div className="mt-auto space-y-3">
                  {/* Subtitle */}
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase font-semibold"
                    style={{ color: "rgba(167,139,250,0.75)" }}
                  >
                    {modul.subtitle}
                  </p>

                  {/* Title */}
                  <h3 className="text-white font-black text-2xl leading-snug tracking-tight">
                    {modul.title}
                  </h3>

                  {/* Divider */}
                  <div
                    className="h-px transition-all duration-300"
                    style={{
                      background: hovered === i
                        ? "linear-gradient(to right, rgba(91,75,219,0.6), transparent)"
                        : "rgba(255,255,255,0.08)",
                    }}
                  />

                  {/* Desc */}
                  <p className="text-white/60 text-sm leading-relaxed">
                    {modul.desc}
                  </p>

                  {/* Detail — fades in on hover */}
                  <p
                    className="text-white/40 text-xs leading-relaxed transition-all duration-300"
                    style={{
                      opacity: hovered === i ? 1 : 0,
                      maxHeight: hovered === i ? "80px" : "0px",
                      overflow: "hidden",
                    }}
                  >
                    {modul.detail}
                  </p>

                  {/* Buttons */}
                  <div
                    className="flex flex-wrap gap-2 pt-1 transition-all duration-300"
                    style={{
                      opacity: hovered === i ? 1 : 0.6,
                    }}
                  >
                    {modul.hasVideo && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingVideo(modul.video);
                        }}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs text-white transition-all duration-200 active:scale-95"
                        style={{
                          background: "#5B4BDB",
                          boxShadow: "0 4px 16px rgba(91,75,219,0.35)",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#7c6fea")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "#5B4BDB")
                        }
                      >
                        <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[9px]">
                          ▶
                        </span>
                        Video
                      </button>
                    )}

                    {modul.pdfUrl && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setViewingPdf({ url: modul.pdfUrl, title: modul.title });
                        }}
                        className="px-4 py-2 rounded-xl font-bold text-xs transition-all duration-200 active:scale-95"
                        style={{
                          background: "rgba(0,0,0,0.35)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255,255,255,0.10)",
                          color: "rgba(255,255,255,0.80)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "rgba(91,75,219,0.50)";
                          e.currentTarget.style.color = "#a78bfa";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
                          e.currentTarget.style.color = "rgba(255,255,255,0.80)";
                        }}
                      >
                        📖 Materi
                      </button>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewingLeaflet(modul);
                        setCurrentLeafletIndex(0);
                      }}
                      className="px-4 py-2 rounded-xl font-bold text-xs transition-all duration-200 active:scale-95"
                      style={{
                        background: "rgba(0,0,0,0.35)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        color: "rgba(255,255,255,0.80)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(91,75,219,0.50)";
                        e.currentTarget.style.color = "#a78bfa";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.80)";
                      }}
                    >
                      Leaflet
                    </button>

                    <a
                      href={`https://drive.google.com/uc?export=download&id=${modul.leafletId[0]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-4 py-2 rounded-xl font-bold text-xs transition-all duration-200 active:scale-95"
                      style={{
                        background: "rgba(0,0,0,0.35)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        color: "rgba(255,255,255,0.55)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(91,75,219,0.50)";
                        e.currentTarget.style.color = "#a78bfa";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                      }}
                    >
                      ↓ Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Video */}
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
            />
          </div>
        </div>
      )}

      {/* Modal Leaflet */}
      {viewingLeaflet && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-neutral-950/98 backdrop-blur-sm animate-fadeIn"
          onClick={() => setViewingLeaflet(null)}
        >
          <div className="w-full p-4 flex justify-between items-center border-b border-neutral-800 bg-neutral-950 z-10">
            <div className="ml-4">
              <h4 className="font-bold text-white text-lg">
                Leaflet: {viewingLeaflet.title}
              </h4>
              <p className="text-xs text-neutral-400 font-mono">
                Modul {viewingLeaflet.no} ✦ Halaman {currentLeafletIndex + 1} dari{" "}
                {viewingLeaflet.leafletId.length}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`https://drive.google.com/uc?export=download&id=${viewingLeaflet.leafletId[currentLeafletIndex]}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-5 py-2.5 rounded-xl bg-neutral-800 text-neutral-200 font-bold text-xs hover:bg-neutral-700 transition-all"
              >
                ↓ Download
              </a>
              <button
                onClick={() => setViewingLeaflet(null)}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-neutral-800 text-neutral-400 hover:bg-red-500 hover:text-white transition-all"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="flex-1 relative flex items-center justify-center p-4 md:p-8 group">
            <div className="relative w-full h-full max-w-4xl shadow-2xl rounded-2xl overflow-hidden border border-neutral-800 bg-black">
              <Image
                src={`https://drive.google.com/uc?id=${viewingLeaflet.leafletId[currentLeafletIndex]}`}
                alt={`Leaflet ${viewingLeaflet.title} halaman ${currentLeafletIndex + 1}`}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              {viewingLeaflet.leafletId.length > 1 && (
                <>
                  <div
                    className="absolute inset-y-0 left-0 w-1/2 flex items-center justify-start p-4 cursor-pointer z-10"
                    onClick={prevSlide}
                  >
                    <button className="w-14 h-14 rounded-full bg-black/30 backdrop-blur-md text-white border border-white/10 flex items-center justify-center text-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 -translate-x-10 group-hover:translate-x-0">
                      ‹
                    </button>
                  </div>
                  <div
                    className="absolute inset-y-0 right-0 w-1/2 flex items-center justify-end p-4 cursor-pointer z-10"
                    onClick={nextSlide}
                  >
                    <button className="w-14 h-14 rounded-full bg-black/30 backdrop-blur-md text-white border border-white/10 flex items-center justify-center text-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 translate-x-10 group-hover:translate-x-0">
                      ›
                    </button>
                  </div>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5 p-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
                    {viewingLeaflet.leafletId.map((_, dotIndex) => (
                      <button
                        key={dotIndex}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentLeafletIndex(dotIndex);
                        }}
                        className="h-2.5 rounded-full transition-all duration-300"
                        style={{
                          width: currentLeafletIndex === dotIndex ? "2rem" : "0.625rem",
                          background:
                            currentLeafletIndex === dotIndex
                              ? "#5B4BDB"
                              : "rgba(255,255,255,0.4)",
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>

      <PdfViewer
        isOpen={!!viewingPdf}
        onClose={() => setViewingPdf(null)}
        pdfUrl={viewingPdf?.url || ""}
        title={viewingPdf?.title || ""}
      />
    </section>
  );
}