"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

const fotoKegiatan = [
  
  { src: "/galeri/1.jpeg", alt: "Aktivitas Senam Pagi", title: "Terapi Fisik", tag: "01" },
  { src: "/galeri/2.jpeg", alt: "Sesi Diskusi Kelompok", title: "Stimulasi Kognitif", tag: "02" },
  { src: "/galeri/3.jpeg", alt: "Pengecekan Kesehatan", title: "Evaluasi Klinis", tag: "03" },
  { src: "/galeri/4.jpeg", alt: "Pelatihan Kader", title: "Edukasi Masyarakat", tag: "04" },
  { src: "/galeri/5.jpeg", alt: "Latihan Koordinasi", title: "Dokumentasi", tag: "05" },
  { src: "/galeri/6.jpeg", alt: "Dokumentasi Program", title: "Kegiatan Lapangan", tag: "06" },
  { src: "/mmse.jpeg",     alt: "Aktivitas Program", title: "Aktivitas Program", tag: "07" },
  { src: "/8.jpeg",        alt: "Aktivitas Program", title: "Kegiatan Lapangan", tag: "08" },
  { src: "/9.jpeg", alt: "Dokumentasi Program", title: "Kegiatan Lapangan", tag: "09" },
];

export default function Galeri() {
  const [hovered, setHovered] = useState(null);
  const [lightbox, setLightbox] = useState(null); // index or null

  const openLightbox = (i) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);

  const prev = useCallback(() => {
    setLightbox((i) => (i === 0 ? fotoKegiatan.length - 1 : i - 1));
  }, []);

  const next = useCallback(() => {
    setLightbox((i) => (i === fotoKegiatan.length - 1 ? 0 : i + 1));
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, prev, next]);

  // Lock scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      <section id="galeri" className="py-24 bg-white border-t border-neutral-100">
        <div className="max-w-6xl mx-auto px-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-10 border-b border-neutral-100">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center gap-2 bg-cyan-50 border border-cyan-200 rounded-full px-4 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <p style={{ fontFamily: "var(--font-mono)" }} className="text-[10px] tracking-[0.3em] uppercase text-cyan-600 font-medium">
                    Dokumentasi Program
                  </p>
                </div>
              </div>
              <h2 style={{ fontFamily: "var(--font-display)" }} className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight tracking-tighter">
                Galeri{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #a78bfa 45%, #7c3aed 100%)" }}>
                  Kegiatan
                </span>
                <br />Lapangan
              </h2>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs font-light">
              Momen nyata pelaksanaan program stimulasi kognitif dan aktivitas fisik bersama masyarakat.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fotoKegiatan.map((foto, i) => (
              <div
                key={i}
                className="relative h-64 overflow-hidden rounded-2xl cursor-pointer group"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => openLightbox(i)}
              >
                <Image
                  src={foto.src} alt={foto.alt} fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Number tag */}
                <span style={{ fontFamily: "var(--font-mono)" }}
                  className="absolute top-4 right-4 text-xs text-white/80 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg transition-opacity duration-300 group-hover:opacity-0">
                  {foto.tag}
                </span>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <p style={{ fontFamily: "var(--font-mono)" }} className="text-cyan-400 text-[10px] tracking-widest uppercase mb-1">
                    {foto.tag} — {foto.title}
                  </p>
                  <p style={{ fontFamily: "var(--font-display)" }} className="text-white font-semibold text-lg">{foto.title}</p>
                  <p className="text-white/60 text-xs mt-0.5">{foto.alt}</p>
                </div>

                {/* Zoom icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                    <ZoomIn size={20} className="text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Quote */}
          <div className="mt-12 bg-neutral-900 rounded-2xl p-8 flex items-center gap-6">
            <span style={{ fontFamily: "var(--font-display)" }} className="text-7xl text-cyan-400 leading-none opacity-40 select-none italic shrink-0">"</span>
            <div>
              <p style={{ fontFamily: "var(--font-display)" }} className="text-white/90 italic text-lg leading-relaxed">
                Melihat semangat para peserta adalah motivasi terbesar kami untuk terus mengembangkan program ini.
              </p>
              <p style={{ fontFamily: "var(--font-mono)" }} className="text-cyan-400 text-xs tracking-widest uppercase mt-3">— Tim Program</p>
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <div style={{ fontFamily: "var(--font-mono)" }} className="absolute top-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest">
            {lightbox + 1} / {fotoKegiatan.length}
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-5xl mx-16 md:mx-24 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={lightbox}
              src={fotoKegiatan[lightbox].src}
              alt={fotoKegiatan[lightbox].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
            {/* Caption */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p style={{ fontFamily: "var(--font-mono)" }} className="text-cyan-400 text-[10px] tracking-widest uppercase mb-1">
                {fotoKegiatan[lightbox].tag} — {fotoKegiatan[lightbox].title}
              </p>
              <p style={{ fontFamily: "var(--font-display)" }} className="text-white font-semibold text-xl">
                {fotoKegiatan[lightbox].title}
              </p>
              <p className="text-white/60 text-sm mt-0.5">{fotoKegiatan[lightbox].alt}</p>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-4">
            {fotoKegiatan.map((foto, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                className={`relative w-12 h-9 rounded-lg overflow-hidden transition-all duration-300 ${i === lightbox ? "ring-2 ring-cyan-400 scale-110" : "opacity-50 hover:opacity-80"}`}
              >
                <Image src={foto.src} alt={foto.alt} fill className="object-cover" sizes="48px" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}