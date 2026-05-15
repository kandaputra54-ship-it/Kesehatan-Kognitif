const aspek = [
  { tag: "01", label: "Orientasi Waktu & Tempat", desc: "Kemampuan mengenali waktu, tanggal, dan lokasi saat ini." },
  { tag: "02", label: "Registrasi & Memori", desc: "Kemampuan menyimpan dan mengingat kembali informasi baru." },
  { tag: "03", label: "Atensi & Kalkulasi", desc: "Konsentrasi dan kemampuan berhitung secara berurutan." },
  { tag: "04", label: "Fungsi Bahasa", desc: "Pemahaman, pengulangan, dan ekspresi verbal." },
];

const skala = [
  { range: "24 – 30", label: "Normal", accent: "#4ade80", glow: "rgba(74,222,128,0.20)" },
  { range: "18 – 23", label: "Gangguan Ringan", accent: "#fbbf24", glow: "rgba(251,191,36,0.20)" },
  { range: "0 – 17", label: "Gangguan Berat", accent: "#f87171", glow: "rgba(248,113,113,0.20)" },
];

export default function MMSEInfo() {
  return (
    <section className="py-24 bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">

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
            Instrumen Evaluasi
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-black leading-tight tracking-tighter">
            Evaluasi{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg,  #a78bfa 45%, #7c3aed 100%)",
              }}
            >
              MMSE
            </span>{" "}
            Terstandar
            <br />
            <span className="font-light text-black text-3xl md:text-4xl">
              Mini-Mental State Examination
            </span>
          </h2>
        </div>

        {/* Wrapper card — sama seperti Tentang.jsx */}
        <div
          className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #1A162E 0%, #16123a 100%)",
            border: "1px solid rgba(91,75,219,0.20)",
          }}
        >
          {/* Decorative glow */}
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#5B4BDB]/15 rounded-full blur-[100px] pointer-events-none -mb-32 -mr-32" />
          <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#5B4BDB]/10 rounded-full blur-[80px] pointer-events-none -mt-20 -ml-20" />

          <div className="relative z-10 p-8 md:p-14">

            {/* Aspek Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {aspek.map((item, i) => (
                <div
                  key={item.tag}
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
                  <span
                    className="text-xs font-bold tracking-widest"
                    style={{ color: "rgba(167,139,250,0.60)" }}
                  >
                    {item.tag}
                  </span>
                  <h3 className="text-white font-bold text-base leading-snug">
                    {item.label}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div
              className="h-px mb-10"
              style={{
                background:
                  "linear-gradient(to right, rgba(91,75,219,0.5), transparent)",
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}