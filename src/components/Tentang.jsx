import Image from "next/image";

const misi = [
  {
    tag: "01",
    label: "Edukasi Kognitif",
    title: "Ketajaman Pikiran",
    desc: "Latihan neuroplastisitas untuk menjaga fungsi memori dan kognisi tetap optimal.",
  },
  {
    tag: "02",
    label: "Terapi Kelompok",
    title: "Bersama Lebih Kuat",
    desc: "Sesi terapi kelompok yang membangun koneksi sosial dan mengurangi isolasi lansia.",
  },
  {
    tag: "03",
    label: "Senam Otak",
    title: "Aktif Setiap Hari",
    desc: "Latihan fisik dan kognitif terintegrasi, dirancang khusus sesuai kemampuan lansia.",
  },
  {
    tag: "04",
    label: "Pendampingan Medis",
    title: "Didampingi Ahlinya",
    desc: "Setiap program dikembangkan bersama tenaga medis untuk keamanan dan hasil optimal.",
  },
];

export default function Tentang() {
  return (
    <section id="tentang" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="relative rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[520px]"
          style={{
            backgroundImage: "url('/tentang-bg.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay: gradien deep purple ke kanan transparan — ikuti pola CTA */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #1A162E/97 0%, #1A162E/80 50%, rgba(91,75,219,0.35) 100%)",
            }}
          />
          {/* Fallback solid untuk pastikan teks terbaca di semua browser */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A162E]/95 via-[#1A162E]/75 to-[#5B4BDB]/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A162E]/40 via-transparent to-[#1A162E]/50" />

          {/* Decorative glow — warna primary ungu seperti CTA */}
          <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-[#5B4BDB]/20 rounded-full blur-[100px] pointer-events-none -mb-32 -mr-32" />
          <div className="absolute top-0 left-1/2 w-[300px] h-[300px] bg-[#5B4BDB]/10 rounded-full blur-[80px] pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row gap-12 p-10 md:p-20">

            {/* KIRI: Header & deskripsi */}
            <div className="flex-1 flex flex-col justify-between">
              {/* Badge */}
              <div>
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
                  Filosofi & Misi
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tighter">
                  Misi{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #e9d5ff 0%, #a78bfa 45%, #7c3aed 100%)",
                    }}
                  >
                    Utama
                  </span>{" "}
                  Kami
                </h2>

                <p className="text-white/60 text-base leading-relaxed max-w-sm border-l border-[#5B4BDB]/50 pl-4">
                  Didesain bersama tenaga medis untuk menciptakan hasil nyata bagi kesejahteraan lansia.
                </p>
              </div>

              {/* Divider */}
              <div
                className="h-px mt-10 hidden md:block"
                style={{
                  background:
                    "linear-gradient(to right, rgba(91,75,219,0.5), transparent)",
                }}
              />
            </div>

            {/* KANAN: Misi Cards grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {misi.map((item, i) => (
                <div
                  key={i}
                  className="group flex flex-col gap-2 p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: "rgba(0,0,0,0.30)",
                    backdropFilter: "blur(8px)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(91,75,219,0.50)";
                    e.currentTarget.style.background = "rgba(91,75,219,0.15)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.background = "rgba(0,0,0,0.30)";
                  }}
                >
                  {/* Tag nomor */}
                  <span
                    className="text-xs font-bold tracking-widest"
                    style={{ color: "rgba(167,139,250,0.60)" }}
                  >
                    {item.tag}
                  </span>

                  {/* Label kecil */}
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase font-semibold"
                    style={{ color: "rgba(167,139,250,0.80)" }}
                  >
                    {item.label}
                  </p>

                  {/* Judul */}
                  <h3 className="text-white font-bold text-base leading-snug">
                    {item.title}
                  </h3>

                  {/* Deskripsi singkat */}
                  <p className="text-white/55 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}