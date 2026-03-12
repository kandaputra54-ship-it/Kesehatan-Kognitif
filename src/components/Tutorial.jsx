"use client";
import { useState } from "react";
import Image from "next/image";

export default function Tutorial() {
  const [isReady, setIsReady] = useState(false);

  // PERBAIKAN: Gunakan format /preview dan hapus ?usp=drive_link
  const videoSource =
    "https://drive.google.com/file/d/1DH7fVaFMcOOFhRXk7xQp4yV7USH_YAhK/preview";

  return (
    <section
      id="tutorial"
      className="py-24 bg-[#FCFBFA] border-t border-stone-100"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4 text-[var(--color-primary)] font-mono">
            ✦ Video Panduan
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 tracking-tight font-display">
            Cara Menggunakan{" "}
            <span className="font-light text-stone-400 italic">
              Platform SIBO
            </span>
          </h2>
          <div className="h-1 w-12 bg-[var(--color-primary)] mx-auto mt-6 rounded-full" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div
            className="relative aspect-video w-full bg-stone-200 rounded-[32px] overflow-hidden shadow-sm border border-stone-200 cursor-pointer transition-all duration-500 hover:shadow-2xl group"
            onClick={() => setIsReady(true)}
          >
            {!isReady ? (
              <div className="relative w-full h-full">
                <Image
                  src="/tutorial.webp"
                  alt="Tutorial SIBO Thumbnail"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />

                <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/30 transition-colors duration-300" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-4 px-8 py-4 rounded-full bg-white/90 backdrop-blur-md text-stone-800 shadow-2xl border border-white/50 transition-all group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:scale-105 active:scale-95">
                    <span className="text-xl">▶</span>
                    <span className="font-bold text-sm tracking-widest uppercase">
                      Lihat Tutorial
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* PERBAIKAN: Tambahkan autoplay=1 di sini */
              <iframe
                src={videoSource}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            )}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="space-y-3 text-sm text-stone-500 leading-relaxed">
              <div className="text-2xl text-[var(--color-primary)]">01</div>
              <h4 className="font-bold text-stone-800 uppercase tracking-wider text-xs">
                Pahami Alur
              </h4>
              <p>
                Tonton video untuk mengerti cara navigasi menu dan fitur utama
                SIBO.
              </p>
            </div>
            <div className="space-y-3 text-sm text-stone-500 leading-relaxed">
              <div className="text-2xl text-[var(--color-primary)]">02</div>
              <h4 className="font-bold text-stone-800 uppercase tracking-wider text-xs">
                Isi Pengkajian
              </h4>
              <p>
                Ikuti petunjuk pengisian MMSE yang benar untuk hasil yang
                akurat.
              </p>
            </div>
            <div className="space-y-3 text-sm text-stone-500 leading-relaxed">
              <div className="text-2xl text-[var(--color-primary)]">03</div>
              <h4 className="font-bold text-stone-800 uppercase tracking-wider text-xs">
                Implementasi
              </h4>
              <p>
                Gunakan materi stimulasi otak sesuai dengan hasil pengkajian
                kognitif.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
