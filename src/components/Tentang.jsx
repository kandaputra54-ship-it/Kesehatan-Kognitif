import Image from "next/image";

const misi = [
  {
    tag: "01",
    label: "Edukasi Kognitif",
    title: "Menjaga Ketajaman Pikiran",
    desc: "Program kami fokus pada latihan neuroplastisitas untuk memastikan fungsi memori dan kognisi tetap optimal seiring bertambahnya usia.",
    src: "/tentang1.webp",
  },
  
];

const stats = [
  { value: "200+", label: "Peserta Aktif" },
  { value: "12", label: "Sesi Per Bulan" },
  { value: "3", label: "Tahun Berjalan" },
  { value: "95%", label: "Tingkat Kepuasan" },
];

export default function Tentang() {
  return (
    <section id="tentang" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 pb-10 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-primary"></span>
              <p style={{ fontFamily: 'var(--font-mono)' }} className="text-xs tracking-widest uppercase text-primary">
                Tentang Program
              </p>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl md:text-5xl font-bold text-dark-gray leading-tight">
              Misi & <em>Tujuan</em><br />Program
            </h2>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xs font-light">
            Didesain bersama tenaga medis dan kader kesehatan untuk hasil yang nyata dan berkelanjutan.
          </p>
        </div>

        {/* Zig-zag blocks */}
        <div className="space-y-24">
          {misi.map((item, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              {/* Foto */}
              <div className="relative h-[420px] rounded-2xl overflow-hidden group">
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Tag number pojok */}
                <span
                  style={{ fontFamily: 'var(--font-mono)' }}
                  className="absolute top-5 left-5 text-xs text-white/70 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded"
                >
                  {item.tag}
                </span>
              </div>

              {/* Teks */}
              <div className="space-y-5">
                <p style={{ fontFamily: 'var(--font-mono)' }} className="text-xs tracking-widest uppercase text-primary">
                  {item.label}
                </p>
                <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl md:text-4xl font-bold text-dark-gray leading-snug">
                  {item.title}
                </h3>
                <div className="w-10 h-px bg-gray-200"></div>
                <p className="text-gray-500 leading-relaxed font-light text-base">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden">
          {stats.map((s, i) => (
            <div key={i} className="bg-white px-8 py-8 text-center">
              <p style={{ fontFamily: 'var(--font-display)' }} className="text-4xl font-bold text-primary mb-1 italic">
                {s.value}
              </p>
              <p style={{ fontFamily: 'var(--font-mono)' }} className="text-xs text-gray-400 tracking-widest uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}