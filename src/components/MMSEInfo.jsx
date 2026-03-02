const aspek = [
  { tag: "01", label: "Orientasi Waktu & Tempat", desc: "Kemampuan mengenali waktu, tanggal, dan lokasi saat ini." },
  { tag: "02", label: "Registrasi & Memori", desc: "Kemampuan menyimpan dan mengingat kembali informasi baru." },
  { tag: "03", label: "Atensi & Kalkulasi", desc: "Konsentrasi dan kemampuan berhitung secara berurutan." },
  { tag: "04", label: "Fungsi Bahasa", desc: "Pemahaman, pengulangan, dan ekspresi verbal." },
];

const skala = [
  { range: "24 – 30", label: "Normal", color: "#22c55e", bg: "rgba(34,197,94,0.08)" },
  { range: "18 – 23", label: "Gangguan Ringan", color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
  { range: "0 – 17", label: "Gangguan Berat", color: "#ef4444", bg: "rgba(239,68,68,0.08)" },
];

export default function MMSEInfo() {
  return (
    <section className="py-24 bg-background border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-10 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-primary"></span>
              <p style={{ fontFamily: 'var(--font-mono)' }} className="text-xs tracking-widest uppercase text-primary">
                Instrumen Evaluasi
              </p>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl md:text-5xl font-bold text-dark-gray leading-tight">
              Evaluasi <em>MMSE</em><br />Terstandar
            </h2>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xs font-light">
            Mini-Mental State Examination — instrumen klinis yang digunakan secara global untuk mengukur fungsi kognitif secara objektif.
          </p>
        </div>

        {/* Aspek grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {aspek.map((item) => (
            <div key={item.tag} className="flex gap-5 p-6 rounded-2xl border border-gray-100 bg-white hover:border-primary/20 hover:shadow-sm transition-all duration-300">
              <span style={{ fontFamily: 'var(--font-mono)' }} className="text-xs text-primary/50 mt-0.5 shrink-0">{item.tag}</span>
              <div>
                <p className="font-semibold text-dark-gray mb-1">{item.label}</p>
                <p className="text-sm text-gray-400 font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}