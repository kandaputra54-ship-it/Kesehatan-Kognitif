const aspek = [
  { tag: "01", label: "Orientasi Waktu & Tempat", desc: "Kemampuan mengenali waktu, tanggal, dan lokasi saat ini." },
  { tag: "02", label: "Registrasi & Memori", desc: "Kemampuan menyimpan dan mengingat kembali informasi baru." },
  { tag: "03", label: "Atensi & Kalkulasi", desc: "Konsentrasi dan kemampuan berhitung secara berurutan." },
  { tag: "04", label: "Fungsi Bahasa", desc: "Pemahaman, pengulangan, dan ekspresi verbal." },
];

const skala = [
  { range: "24 – 30", label: "Normal", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  { range: "18 – 23", label: "Gangguan Ringan", color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  { range: "0 – 17", label: "Gangguan Berat", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
];

export default function MMSEInfo() {
  return (
    <section className="py-24 bg-white border-t border-neutral-100">
      <div className="max-w-6xl mx-auto px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-10 border-b border-neutral-100">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div
                className="flex items-center gap-2 rounded-full px-4 py-1.5 border"
                style={{ background: "rgba(91,75,219,0.08)", borderColor: "rgba(91,75,219,0.25)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#5B4BDB" }} />
                <p style={{ fontFamily: "var(--font-mono)" }} className="text-[10px] tracking-[0.3em] uppercase font-medium" >
                  <span style={{ color: "#5B4BDB" }}>Instrumen Evaluasi</span>
                </p>
              </div>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)" }} className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight tracking-tighter">
              Evaluasi{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #7c3aed, #a78bfa)" }}>
                MMSE
              </span>
              <br />Terstandar
            </h2>
          </div>
          <p className="text-sm text-neutral-500 leading-relaxed max-w-xs font-light">
            Mini-Mental State Examination — instrumen klinis yang digunakan secara global untuk mengukur fungsi kognitif secara objektif.
          </p>
        </div>

        {/* Aspek grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {aspek.map((item) => (
            <div
              key={item.tag}
              className="flex gap-5 p-6 rounded-2xl border bg-white transition-all duration-300 group"
              style={{ borderColor: "#f3f4f6" }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(167,139,250,0.5)";
                e.currentTarget.style.boxShadow = "0 2px 16px rgba(91,75,219,0.08)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "#f3f4f6";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span
                style={{ fontFamily: "var(--font-mono)", color: "rgba(167,139,250,0.7)" }}
                className="text-xs mt-0.5 shrink-0 font-bold transition-colors duration-300 group-hover:text-[#5B4BDB]"
              >
                {item.tag}
              </span>
              <div>
                <p className="font-semibold text-neutral-800 mb-1 transition-colors duration-300 group-hover:text-[#5B4BDB]">{item.label}</p>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}