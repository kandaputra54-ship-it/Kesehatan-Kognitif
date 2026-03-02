"use client";
import Image from "next/image";

export default function CTA({ onStart }) {
  return (
    <section id="cta" className="py-24 px-6 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto relative rounded-[48px] overflow-hidden shadow-2xl border border-white/10 group">
        {/* Background Image dengan Overlay Professional */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/cta.webp" // Ganti dengan foto kegiatan terbaikmu
            alt="Background Kegiatan"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Gradient Muted: Deep Purple ke Dark Slate */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A162E]/95 via-[#1A162E]/80 to-primary/40" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 p-10 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl text-left">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-xs font-bold tracking-[0.2em] uppercase mb-6 text-white/90">
              Mulai Langkah Pertama
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight">
              Investasi Terbaik Adalah <br />
              <span className="text-white/70">Kesehatan Otak Anda.</span>
            </h2>

            <p className="text-white/70 text-lg md:text-xl max-w-lg leading-relaxed mb-0">
              Bergabunglah dengan program stimulasi kognitif mandiri yang
              dirancang khusus untuk menjaga kualitas hidup di usia matang.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={onStart}
              className="group relative bg-primary text-white px-12 py-6 rounded-2xl font-black text-xl transition-all duration-300 hover:bg-white hover:text-primary cursor-pointer shadow-[0_20px_50px_rgba(91,75,219,0.3)] hover:shadow-xl active:scale-95 overflow-hidden border-2 border-primary"
            >
              {/* Label Tombol */}
              <span className="relative z-10">Mulai Program Sekarang</span>

              {/* Efek Shimmer/Kilau saat Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer transition-transform duration-1000" />
            </button>

            <p className="text-white/40 text-xs flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Privasi Terjamin: Data Skor Disimpan Secara Lokal
            </p>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[120px] -mb-32 -mr-32"></div>
      </div>
    </section>
  );
}
