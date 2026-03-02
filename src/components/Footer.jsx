"use client";

const navLinks = [
  { href: "#tentang", label: "Tentang Program" },
  { href: "#galeri", label: "Galeri Kegiatan" },
  { href: "#mmse", label: "Evaluasi MMSE" },
];

const kontakInfo = [
  {
    tag: "EMAIL",
    value: "kognitiflife@gmail.com",
    href: "mailto:kognitiflife@gmail.com",
  },
  {
    tag: "TELEPON",
    value: "+62-211-1822-644",
    href: "tel:+622111822644",
  },
  {
    tag: "WHATSAPP",
    value: "+62-211-1822-644",
    href: "https://wa.me/628111822644",
  },
  {
    tag: "LOKASI",
    value: "Depok, Jawa Barat, Indonesia",
    href: null,
  },
];

const jamOperasional = [
  { hari: "Senin – Jumat", jam: "08.00 – 17.00" },
  { hari: "Sabtu", jam: "08.00 – 12.00" },
  { hari: "Minggu", jam: "Tutup" },
];

export default function Footer() {
  return (
    <footer className="bg-dark-gray text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-8">

        {/* Top — Brand + Nav + Kontak */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16 border-b border-white/10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-primary"></span>
              <p className="text-[10px] tracking-[0.2em] uppercase text-primary font-bold">
                Program Kesehatan
              </p>
            </div>
            <h3 className="text-2xl font-black text-white mb-6 leading-tight">
              Stimulasi <span className="text-primary italic">Kognitif</span><br />& Terapi Fisik
            </h3>
            <p className="text-base text-white leading-relaxed font-normal max-w-xs">
              Inisiatif kesehatan berbasis bukti untuk optimalisasi fungsi kognitif dan kebugaran fisik bagi individu usia matang.
            </p>

            {/* Tags */}
            <div className="flex gap-2 mt-8 flex-wrap">
              {["Terstruktur", "Klinis", "Mandiri"].map((t) => (
                <span
                  key={t}
                  className="text-[10px] text-white border border-white/20 px-4 py-1.5 rounded-full tracking-widest uppercase font-bold bg-white/5"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-primary mb-8 font-bold">
              Navigasi
            </p>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-base text-white hover:text-primary transition-all duration-300 flex items-center gap-2 group font-medium"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-primary transition-all duration-300"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Jam Operasional */}
            <div className="mt-12">
              <p className="text-[10px] tracking-[0.2em] uppercase text-primary mb-6 font-bold">
                Jam Operasional
              </p>
              <div className="space-y-3">
                {jamOperasional.map((j) => (
                  <div key={j.hari} className="flex justify-between text-sm border-b border-white/5 pb-2">
                    <span className="text-white font-medium">{j.hari}</span>
                    <span className={j.jam === "Tutup" ? "text-red-400 font-bold" : "text-white font-bold"}>{j.jam}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kontak */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-primary mb-8 font-bold">
              Kontak Kami
            </p>
            <div className="space-y-6">
              {kontakInfo.map((k) => (
                <div key={k.tag} className="group">
                  <p className="text-[10px] text-primary/80 tracking-[0.2em] mb-1 font-bold">{k.tag}</p>
                  {k.href ? (
                    <a href={k.href} className="text-base text-white hover:text-primary transition-all duration-300 break-all font-medium border-b border-transparent hover:border-primary pb-0.5">
                      {k.value}
                    </a>
                  ) : (
                    <p className="text-base text-white font-medium">{k.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Maps embed */}
        <div className="py-12 border-b border-white/10">
          <p className="text-[10px] tracking-[0.2em] uppercase text-primary mb-6 font-bold">
            Lokasi Kegiatan
          </p>
          <div className="rounded-[32px] overflow-hidden border border-white/10 h-64 w-full shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.18506771574!2d106.7270261!3d-6.4024793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69eca4f7abe2d5%3A0x30aef41e8b76b736!2sDepok%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1710000000000"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.5)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-white/60 tracking-[0.1em] font-medium uppercase">
            © 2026 Program Stimulasi Kognitif — Seluruh Hak Cipta Dilindungi
          </p>
          <p className="text-[10px] text-white/60 tracking-[0.1em] font-medium uppercase">
            Target: Usia 40+ · Kader · Keluarga
          </p>
        </div>

      </div>
    </footer>
  );
}