import Image from "next/image";

export default function Hero({ onStart }) {
  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/galeri/6.jpeg"
          alt="Kegiatan aktivitas fisik"
          fill
          priority
          className="object-cover scale-105"
        />
        {/* Gradient overlay — lebih dalam di kiri buat readability teks */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-gray/95 via-dark-gray/70 to-dark-gray/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 w-full">
        <div className="max-w-2xl">
          {/* Label */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-primary"></span>
            <p
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-xs tracking-widest uppercase text-primary"
            >
              Program Kesehatan Kognitif
            </p>
          </div>

          {/* Heading */}
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6"
          >
            Stimulasi
            <br />
            <em className="text-primary not-italic">Kognitif</em> &<br />
            Terapi Fisik
          </h1>

          {/* Subtext */}
          <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 font-light max-w-md">
            Program berbasis bukti untuk menjaga kesehatan otak dan kebugaran
            fisik lansia bersama komunitas.
          </p>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-primary text-white px-8 py-4 rounded-xl font-semibold cursor-pointer transition-all hover:bg-primary/90"
            >
              Mulai Program
            </button>
            <a
              href="#galeri"
              className="text-white/60 hover:text-white text-sm font-medium transition-colors flex items-center gap-2"
            >
              Lihat Dokumentasi
              <span className="text-lg leading-none">↓</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-10 z-20 flex flex-col items-center gap-2 opacity-40">
        <span
          style={{ fontFamily: "var(--font-mono)" }}
          className="text-white text-xs tracking-widest uppercase rotate-90 origin-center"
        >
          scroll
        </span>
      </div>
    </section>
  );
}
