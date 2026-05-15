import Image from "next/image";
import { Phone, ArrowRight } from "lucide-react";

export default function Hero({ onStart }) {
  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#1A162E]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-stimuno.jpeg"
          alt="STIMUNO - Kegiatan aktivitas fisik dan kognitif"
          fill
          priority
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A162E]/90 via-[#1A162E]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A162E]/65 via-transparent to-transparent" />
      </div>

      {/* Decorative glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#5B4BDB]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 w-full py-24">
        <div className="max-w-2xl">
          {/* Label */}
          <div className="flex items-center gap-3 mb-10">
            <div
              className="flex items-center gap-2 rounded-full px-4 py-1.5 backdrop-blur-sm border"
              style={{
                background: "rgba(91,75,219,0.15)",
                borderColor: "rgba(91,75,219,0.35)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] animate-pulse" />
              <p
                style={{ fontFamily: "var(--font-mono)" }}
                className="text-[10px] tracking-[0.3em] uppercase text-white/80 font-medium"
              >
                Sistem Informasi Kesehatan Otak
              </p>
            </div>
          </div>

          {/* Heading */}
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="font-bold leading-[1] mb-6 tracking-tighter"
          >
            <span
              className="block text-7xl md:text-[7rem] bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #e9d5ff 0%, #a78bfa 45%, #5B4BDB 100%)",
              }}
            >
              STIMUNO
            </span>
            <span className="block text-2xl md:text-3xl mt-5 font-light text-white/90 tracking-wide leading-snug">
              Stimulasi{" "}
              <em className="not-italic font-semibold text-[#a78bfa]">
                Kognitif
              </em>{" "}
              &{" "}
              <em className="not-italic font-semibold text-[#a78bfa]">
                Terapi Kelompok
              </em>
            </span>
          </h1>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#5B4BDB]/70" />
            <div className="h-px flex-1 bg-gradient-to-r from-[#5B4BDB]/25 to-transparent" />
          </div>

          {/* Subtext */}
          <p className="text-white/75 text-base md:text-lg leading-relaxed mb-12 font-light max-w-lg">
            Program berbasis bukti{" "}
            <span className="text-white/90 italic">(evidence-based)</span>{" "}
            untuk menjaga kesehatan otak, senam otak, dan kebugaran fungsional
            lansia.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() =>
                document
                  .getElementById("cta")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group text-white px-8 py-4 rounded-full font-bold cursor-pointer transition-all flex items-center gap-2 shadow-xl hover:-translate-y-0.5"
              style={{
                background: "#5B4BDB",
                boxShadow: "0 20px 50px rgba(91,75,219,0.35)",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#7c6fea")}
              onMouseLeave={e => (e.currentTarget.style.background = "#5B4BDB")}
            >
              Mulai Program
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            <a
              href="#konsultasi"
              className="group flex items-center gap-3 border border-white/30 hover:border-[#a78bfa]/60 text-white px-7 py-4 rounded-full font-medium text-base transition-all duration-300 backdrop-blur-md hover:bg-[#5B4BDB]/10"
            >
              <Phone
                size={16}
                className="text-[#a78bfa] group-hover:scale-110 transition-transform"
              />
              Konsultasi
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#1A162E]/60 to-transparent z-10" />

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-12 z-20 hidden md:flex flex-col items-center gap-3">
        <div className="h-20 w-px bg-gradient-to-b from-[#a78bfa]/40 to-transparent" />
        <span
          style={{ fontFamily: "var(--font-mono)", writingMode: "vertical-rl" }}
          className="text-white/40 text-[9px] tracking-[0.5em] uppercase"
        >
          Scroll
        </span>
      </div>
    </section>
  );
}