"use client";

import { useState } from "react";
import { MessageCircle, User, Calendar, FileText, ChevronRight, Phone, Clock, ShieldCheck } from "lucide-react";

const WA_NUMBER = "6281806137179";

const infoItems = [
  { icon: Phone, label: "Nomor WhatsApp", value: "+62 818-0613-7179", desc: "Respons cepat pada hari kerja" },
  { icon: Clock, label: "Jam Layanan", value: "08.00 – 17.00 WIB", desc: "Senin – Sabtu" },
  { icon: ShieldCheck, label: "Konsultasi Awal", value: "Gratis", desc: "Tanpa biaya" },
];

const topicOptions = ["Stimulasi Kognitif", "Terapi Fisik", "Lainnya"];

export default function Konsultasi() {
  const [form, setForm] = useState({ nama: "", usia: "", topik: "", pesan: "" });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const lines = [
      `Halo, saya ingin berkonsultasi mengenai program kesehatan kognitif.`,
      ``,
      `*Nama:* ${form.nama}`,
      form.usia ? `*Usia:* ${form.usia} tahun` : null,
      form.topik ? `*Topik:* ${form.topik}` : null,
      form.pesan ? `*Pesan:* ${form.pesan}` : null,
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`, "_blank");
    setForm({ nama: "", usia: "", topik: "", pesan: "" });
  };

  const isValid = form.nama.trim().length > 0;

  return (
    <section id="konsultasi" className="relative py-28 bg-white border-t border-neutral-100 overflow-hidden">
      {/* Soft accent — ungu */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-30 pointer-events-none"
        style={{ background: "#5B4BDB" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-5">
            <div
              className="flex items-center gap-2 rounded-full px-4 py-1.5 border"
              style={{ background: "rgba(91,75,219,0.08)", borderColor: "rgba(91,75,219,0.25)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#5B4BDB" }} />
              <p style={{ fontFamily: "var(--font-mono)", color: "#5B4BDB" }} className="text-[10px] tracking-[0.3em] uppercase font-medium">
                Hubungi Kami
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 style={{ fontFamily: "var(--font-display)" }} className="text-5xl md:text-6xl font-black leading-tight tracking-tighter text-neutral-900">
              Mulai{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #7c3aed, #a78bfa)" }}
              >
                Konsultasi
              </span>
            </h2>
            <p className="text-base leading-relaxed max-w-sm text-neutral-500 font-light">
              Ceritakan kondisi Anda dan kami akan merespons langsung melalui WhatsApp.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-neutral-100 mb-14" />

        {/* Body Grid */}
        <div className="grid md:grid-cols-5 gap-10 md:gap-14 items-start">

          {/* LEFT — Info */}
          <div className="md:col-span-2 space-y-3">
            {infoItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-2xl border bg-white shadow-sm transition-all duration-300 group"
                  style={{ borderColor: "#f3f4f6" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(167,139,250,0.5)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(91,75,219,0.10)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "#f3f4f6";
                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
                  }}
                >
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: "#5B4BDB" }}
                  >
                    <Icon size={18} color="#fff" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-mono)" }} className="text-[10px] uppercase tracking-widest text-neutral-400 mb-0.5">{item.label}</p>
                    <p className="font-black text-base text-neutral-900">{item.value}</p>
                    <p className="text-sm text-neutral-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              );
            })}

            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-5 py-4 rounded-2xl font-bold text-base text-white transition-all duration-300 active:scale-[0.98] shadow-lg"
              style={{ background: "#5B4BDB", boxShadow: "0 8px 30px rgba(91,75,219,0.25)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#7c6fea")}
              onMouseLeave={e => (e.currentTarget.style.background = "#5B4BDB")}
            >
              <span className="flex items-center gap-3">
                <MessageCircle size={20} strokeWidth={2.5} />
                Chat WhatsApp Langsung
              </span>
              <ChevronRight size={20} strokeWidth={3} />
            </a>
          </div>

          {/* RIGHT — Form */}
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="rounded-3xl border border-neutral-100 bg-white shadow-sm p-8 space-y-6">

              {/* Nama */}
              <div className="space-y-2">
                <label htmlFor="nama" style={{ fontFamily: "var(--font-mono)" }} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-700">
                  <User size={14} strokeWidth={2.5} />
                  Nama Lengkap <span style={{ color: "#5B4BDB" }}>*</span>
                </label>
                <input
                  id="nama" type="text" name="nama" value={form.nama} onChange={handleChange} required
                  placeholder="Masukkan nama Anda"
                  className="w-full border border-neutral-200 rounded-xl px-5 py-3.5 text-base font-medium outline-none transition-all placeholder:text-neutral-300 text-neutral-900"
                  style={{ "--tw-ring-color": "rgba(91,75,219,0.10)" }}
                  onFocus={e => {
                    e.currentTarget.style.borderColor = "#a78bfa";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(91,75,219,0.10)";
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = "#e5e7eb";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Usia */}
              <div className="space-y-2">
                <label htmlFor="usia" style={{ fontFamily: "var(--font-mono)" }} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-700">
                  <Calendar size={14} strokeWidth={2.5} />
                  Usia <span className="font-normal normal-case tracking-normal text-xs text-neutral-400">(opsional)</span>
                </label>
                <input
                  id="usia" type="number" name="usia" value={form.usia}
                  onChange={(e) => { if (e.target.value.length <= 3) handleChange(e); }}
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
                    if (form.usia.length >= 3 && !["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight"].includes(e.key)) e.preventDefault();
                  }}
                  placeholder="Contoh: 65"
                  className="w-full border border-neutral-200 rounded-xl px-5 py-3.5 text-base font-medium outline-none transition-all placeholder:text-neutral-300 text-neutral-900"
                  onFocus={e => {
                    e.currentTarget.style.borderColor = "#a78bfa";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(91,75,219,0.10)";
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = "#e5e7eb";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Topik */}
              <div className="space-y-3">
                <label style={{ fontFamily: "var(--font-mono)" }} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-700">
                  <FileText size={14} strokeWidth={2.5} />
                  Topik Konsultasi <span className="font-normal normal-case tracking-normal text-xs text-neutral-400">(opsional)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {topicOptions.map((t) => (
                    <button
                      key={t} type="button"
                      onClick={() => setForm({ ...form, topik: form.topik === t ? "" : t })}
                      className="px-4 py-2.5 rounded-xl text-sm font-bold border transition-all duration-200 active:scale-95"
                      style={form.topik === t
                        ? { backgroundColor: "#5B4BDB", borderColor: "#5B4BDB", color: "#fff" }
                        : { backgroundColor: "#fff", borderColor: "#e5e7eb", color: "#374151" }
                      }
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pesan */}
              <div className="space-y-2">
                <label htmlFor="pesan" style={{ fontFamily: "var(--font-mono)" }} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-700">
                  <MessageCircle size={14} strokeWidth={2.5} />
                  Pesan <span className="font-normal normal-case tracking-normal text-xs text-neutral-400">(opsional)</span>
                </label>
                <textarea
                  id="pesan" name="pesan" value={form.pesan} onChange={handleChange} rows={4}
                  placeholder="Ceritakan kondisi atau kebutuhan Anda di sini..."
                  className="w-full border border-neutral-200 rounded-xl px-5 py-3.5 text-base font-medium outline-none transition-all placeholder:text-neutral-300 text-neutral-900 resize-none"
                  onFocus={e => {
                    e.currentTarget.style.borderColor = "#a78bfa";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(91,75,219,0.10)";
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = "#e5e7eb";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <div className="border-t border-neutral-100" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Anda akan diarahkan ke WhatsApp<br className="hidden sm:block" /> secara otomatis.
                </p>
                <button
                  type="submit" disabled={!isValid}
                  className="flex items-center gap-3 px-7 py-3.5 rounded-xl font-bold text-base text-white transition-all duration-300 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shadow-lg"
                  style={{ background: "#5B4BDB", boxShadow: "0 8px 30px rgba(91,75,219,0.25)" }}
                  onMouseEnter={e => { if (isValid) e.currentTarget.style.background = "#7c6fea"; }}
                  onMouseLeave={e => (e.currentTarget.style.background = "#5B4BDB")}
                >
                  <MessageCircle size={18} strokeWidth={2.5} />
                  Kirim via WhatsApp
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}