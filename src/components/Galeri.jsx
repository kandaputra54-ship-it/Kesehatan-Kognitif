import Image from "next/image";
import { useState } from "react";

export default function Galeri() {
  const [hovered, setHovered] = useState(null);

  const fotoKegiatan = [
    { src: "/galeri/1.jpeg", alt: "Aktivitas Senam Pagi", title: "Terapi Fisik", tag: "01" },
    { src: "/galeri/2.jpeg", alt: "Sesi Diskusi Kelompok", title: "Stimulasi Kognitif", tag: "02" },
    { src: "/galeri/3.jpeg", alt: "Pengecekan Kesehatan", title: "Evaluasi Klinis", tag: "03" },
    { src: "/galeri/4.jpeg", alt: "Pelatihan Kader", title: "Edukasi Masyarakat", tag: "04" },
    { src: "/galeri/5.jpeg", alt: "Latihan Koordinasi", title: "Dokumentasi", tag: "05" },
    { src: "/galeri/6.jpeg", alt: "Dokumentasi Program", title: "Kegiatan Lapangan", tag: "06" },
  ];

  return (
    <section id="galeri" className="py-24 bg-background border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-10 border-b border-gray-200">
          <div>
            <p style={{ fontFamily: 'var(--font-mono)' }} className="text-xs tracking-widest uppercase text-primary mb-3">
              Dokumentasi Program
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl md:text-5xl font-bold text-dark-gray leading-tight">
              Galeri <em>Kegiatan</em><br />Lapangan
            </h2>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xs font-light">
            Momen nyata pelaksanaan program stimulasi kognitif dan aktivitas fisik bersama masyarakat.
          </p>
        </div>

        {/* Grid — 3 col x 2 row, konsisten */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {fotoKegiatan.map((foto, i) => (
            <div
              key={i}
              className="relative h-72 overflow-hidden rounded-2xl cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                className={`object-cover transition-transform duration-700 ${hovered === i ? "scale-110" : "scale-100"}`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Number tag */}
              <span
                style={{ fontFamily: 'var(--font-mono)' }}
                className={`absolute top-4 right-4 text-xs text-white/70 bg-black/30 backdrop-blur-sm px-2 py-1 rounded transition-opacity duration-300 ${hovered === i ? "opacity-0" : "opacity-100"}`}
              >
                {foto.tag}
              </span>

              {/* Hover overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-dark-gray/85 via-dark-gray/20 to-transparent flex flex-col justify-end p-6 transition-opacity duration-500 ${hovered === i ? "opacity-100" : "opacity-0"}`}>
                <p style={{ fontFamily: 'var(--font-mono)' }} className="text-primary text-xs tracking-widest uppercase mb-1">
                  {foto.tag} — {foto.title}
                </p>
                <p style={{ fontFamily: 'var(--font-display)' }} className="text-white font-semibold text-xl italic">{foto.title}</p>
                <p className="text-white/60 text-sm mt-0.5">{foto.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Quote */}
        <div className="mt-14 bg-dark-gray rounded-2xl p-8 flex items-center gap-6">
          <span style={{ fontFamily: 'var(--font-display)' }} className="text-7xl text-primary leading-none opacity-50 select-none italic">"</span>
          <div>
            <p style={{ fontFamily: 'var(--font-display)' }} className="text-white/90 italic text-xl leading-relaxed">
              Melihat semangat para peserta adalah motivasi terbesar kami untuk terus mengembangkan program ini.
            </p>
            <p style={{ fontFamily: 'var(--font-mono)' }} className="text-primary text-xs tracking-widest uppercase mt-3">— Tim Program</p>
          </div>
        </div>

      </div>
    </section>
  );
}