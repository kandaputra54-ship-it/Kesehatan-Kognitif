export default function StatsBar() {
  const stats = [
    { n: "4+", l: "TAHAPAN PROGRAM" },
    { n: "100%", l: "BERBASIS BUKTI" },
    { n: "15-20", l: "MENIT PER SESI" } // Fokus ke durasi yang ringan
  ];

  return (
    <div className="bg-primary/5 py-16 border-y border-primary/10">
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {stats.map((item, i) => (
          <div key={i} className="space-y-2">
            <p className="text-4xl font-black text-primary tracking-tighter">{item.n}</p>
            <p className="text-xs font-bold text-gray-400 tracking-[0.2em]">{item.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}