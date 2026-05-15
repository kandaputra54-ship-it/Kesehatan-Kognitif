"use client";
import { useState } from "react";
import Image from "next/image";

export default function Tutorial() {
  const [isReady, setIsReady] = useState(false);

  const videoSource = "https://drive.google.com/file/d/1DH7fVaFMcOOFhRXk7xQp4yV7USH_YAhK/preview";

  const steps = [
    { no: "01", title: "Pahami Alur", desc: "Tonton video untuk mengerti cara navigasi menu dan fitur utama SIBO." },
    { no: "02", title: "Isi Pengkajian", desc: "Ikuti petunjuk pengisian MMSE yang benar untuk hasil yang akurat." },
    { no: "03", title: "Implementasi", desc: "Gunakan materi stimulasi otak sesuai dengan hasil pengkajian kognitif." },
  ];

  return (
    <section id="tutorial" className="py-24 bg-neutral-50 border-t border-neutral-100">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="flex items-center gap-2 bg-cyan-50 border border-cyan-200 rounded-full px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              <p style={{ fontFamily: "var(--font-mono)" }} className="text-[10px] tracking-[0.3em] uppercase text-cyan-600 font-medium">
                Video Panduan
              </p>
            </div>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)" }} className="text-3xl md:text-5xl font-bold text-neutral-900 tracking-tighter">
            Cara Menggunakan{" "}
            <span className="font-light text-neutral-400 italic">Platform SIBO</span>
          </h2>
        </div>

        {/* Video */}
        <div className="relative max-w-4xl mx-auto">
          <div
            className="relative aspect-video w-full bg-neutral-200 rounded-3xl overflow-hidden shadow-md border border-neutral-200 cursor-pointer transition-all duration-500 hover:shadow-xl group"
            onClick={() => setIsReady(true)}
          >
            {!isReady ? (
              <div className="relative w-full h-full">
                <Image
                  src="/tutorial.webp" alt="Tutorial SIBO Thumbnail" fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105" priority
                />
                <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-neutral-900/25 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-4 px-8 py-4 rounded-full bg-white/95 backdrop-blur-md text-neutral-800 shadow-xl border border-white/50 transition-all group-hover:bg-cyan-500 group-hover:text-white group-hover:scale-105 active:scale-95">
                    <span className="text-xl">▶</span>
                    <span className="font-bold text-sm tracking-widest uppercase">Lihat Tutorial</span>
                  </div>
                </div>
              </div>
            ) : (
              <iframe
                src={videoSource} className="w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture" allowFullScreen loading="lazy"
              />
            )}
          </div>

          {/* Steps */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.no} className="flex gap-4 p-5 rounded-2xl bg-white border border-neutral-100 hover:border-cyan-200 hover:shadow-sm transition-all duration-300 group">
                <span style={{ fontFamily: "var(--font-mono)" }} className="text-xl font-black text-cyan-400 shrink-0 group-hover:text-cyan-500 transition-colors">
                  {step.no}
                </span>
                <div>
                  <h4 style={{ fontFamily: "var(--font-mono)" }} className="font-bold text-neutral-800 uppercase tracking-wider text-xs mb-2">{step.title}</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}