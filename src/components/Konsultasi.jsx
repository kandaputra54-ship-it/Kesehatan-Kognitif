"use client";

import { useState } from "react";
import {
  MessageCircle,
  User,
  Calendar,
  FileText,
  ChevronRight,
  Phone,
  Clock,
  ShieldCheck,
} from "lucide-react";

const WA_NUMBER = "6281806137179";

const infoItems = [
  {
    icon: Phone,
    label: "Nomor WhatsApp",
    value: "+62 818-0613-7179",
    desc: "Respons cepat pada hari kerja",
  },
  {
    icon: Clock,
    label: "Jam Layanan",
    value: "08.00 – 17.00 WIB",
    desc: "Senin – Sabtu",
  },
  {
    icon: ShieldCheck,
    label: "Konsultasi Awal",
    value: "Gratis",
    desc: "Tanpa biaya ",
  },
];

const topicOptions = [
  "Stimulasi Kognitif",
  "Terapi Fisik",
  "Lainnya",
];

export default function Konsultasi() {
  const [form, setForm] = useState({ nama: "", usia: "", topik: "", pesan: "" });
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const lines = [
      `Halo, saya ingin berkonsultasi mengenai program kesehatan kognitif.`,
      ``,
      `*Nama:* ${form.nama}`,
      form.usia ? `*Usia:* ${form.usia} tahun` : null,
      form.topik ? `*Topik:* ${form.topik}` : null,
      form.pesan ? `*Pesan:* ${form.pesan}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`,
      "_blank"
    );
    setForm({ nama: "", usia: "", topik: "", pesan: "" });
  };

  const isValid = form.nama.trim().length > 0;

  return (
    <section
      id="konsultasi"
      className="relative py-32 bg-[var(--color-background)] border-t border-stone-300 overflow-hidden"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* Subtle grid — same as Materi */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 60px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <div className="mb-20">
          <p
            className="text-xs font-bold tracking-[0.3em] uppercase mb-5"
            style={{ color: "var(--color-primary)", fontFamily: "var(--font-mono)" }}
          >
            ✦ Hubungi Kami
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight"
              style={{ color: "var(--color-dark-gray)", fontFamily: "var(--font-display)" }}
            >
              Mulai
              <br />
              <em className="not-italic font-light" style={{ color: "#9CA3AF" }}>
                Konsultasi
              </em>
            </h2>
            {/* Subtext — darker for readability */}
            <p
              className="text-lg leading-relaxed max-w-sm font-medium"
              style={{ color: "#1C1917" }}
            >
              Ceritakan kondisi Anda dan  kami akan merespons langsung melalui WhatsApp.
            </p>
          </div>
        </div>

        {/* ── Body Grid ── */}
        <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">

          {/* LEFT — Info cards */}
          <div className="md:col-span-2 space-y-4">
            {infoItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-2xl border-2 border-stone-200 bg-white shadow-sm transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-md"
                >
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <Icon size={20} color="#fff" strokeWidth={2.5} />
                  </div>
                  <div>
                    {/* Label — dark, readable */}
                    <p
                      className="text-xs font-bold uppercase tracking-widest mb-0.5"
                      style={{ fontFamily: "var(--font-mono)", color: "#44403C" }}
                    >
                      {item.label}
                    </p>
                    {/* Value — large & black */}
                    <p className="font-black text-base" style={{ color: "#0C0A09" }}>
                      {item.value}
                    </p>
                    {/* Desc — medium contrast */}
                    <p className="text-sm mt-0.5 font-medium" style={{ color: "#57534E" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Direct WA button */}
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-5 py-4 rounded-2xl font-black text-base transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: "var(--color-primary)", color: "#fff" }}
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
            <form
                onSubmit={handleSubmit}
                className="rounded-3xl border-2 border-stone-200 bg-white shadow-sm p-8 space-y-7"
              >

                {/* Nama */}
                <div className="space-y-2">
                  <label
                    htmlFor="nama"
                    className="flex items-center gap-2 text-sm font-black uppercase tracking-widest"
                    style={{ fontFamily: "var(--font-mono)", color: "#1C1917" }}
                  >
                    <User size={15} strokeWidth={2.5} />
                    Nama Lengkap
                    <span style={{ color: "var(--color-primary)" }}>*</span>
                  </label>
                  <input
                    id="nama"
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    required
                    placeholder="Masukkan nama Anda"
                    className="w-full border-2 border-stone-300 rounded-xl px-5 py-4 text-base font-medium outline-none transition-all focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 placeholder:text-stone-400"
                    style={{ color: "#0C0A09" }}
                  />
                </div>

                {/* Usia */}
                <div className="space-y-2">
                  <label
                    htmlFor="usia"
                    className="flex items-center gap-2 text-sm font-black uppercase tracking-widest"
                    style={{ fontFamily: "var(--font-mono)", color: "#1C1917" }}
                  >
                    <Calendar size={15} strokeWidth={2.5} />
                    Usia
                    <span className="font-medium normal-case tracking-normal text-xs" style={{ color: "#57534E" }}>
                      (opsional)
                    </span>
                  </label>
                  <input
                    id="usia"
                    type="number"
                    name="usia"
                    value={form.usia}
                    onChange={(e) => {
                      if (e.target.value.length <= 3) handleChange(e);
                    }}
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
                      if (form.usia.length >= 3 && !["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    placeholder="Contoh: 65"
                    className="w-full border-2 border-stone-300 rounded-xl px-5 py-4 text-base font-medium outline-none transition-all focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 placeholder:text-stone-400"
                    style={{ color: "#0C0A09" }}
                  />
                </div>

                {/* Topik */}
                <div className="space-y-3">
                  <label
                    className="flex items-center gap-2 text-sm font-black uppercase tracking-widest"
                    style={{ fontFamily: "var(--font-mono)", color: "#1C1917" }}
                  >
                    <FileText size={15} strokeWidth={2.5} />
                    Topik Konsultasi
                    <span className="font-medium normal-case tracking-normal text-xs" style={{ color: "#57534E" }}>
                      (opsional)
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {topicOptions.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() =>
                          setForm({ ...form, topik: form.topik === t ? "" : t })
                        }
                        className="px-5 py-3 rounded-xl text-sm font-bold border-2 transition-all duration-200 active:scale-95"
                        style={
                          form.topik === t
                            ? {
                                backgroundColor: "var(--color-primary)",
                                borderColor: "var(--color-primary)",
                                color: "#fff",
                              }
                            : {
                                backgroundColor: "#fff",
                                borderColor: "#44403C",
                                color: "#1C1917",
                              }
                        }
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pesan */}
                <div className="space-y-2">
                  <label
                    htmlFor="pesan"
                    className="flex items-center gap-2 text-sm font-black uppercase tracking-widest"
                    style={{ fontFamily: "var(--font-mono)", color: "#1C1917" }}
                  >
                    <MessageCircle size={15} strokeWidth={2.5} />
                    Pesan
                    <span className="font-medium normal-case tracking-normal text-xs" style={{ color: "#57534E" }}>
                      (opsional)
                    </span>
                  </label>
                  <textarea
                    id="pesan"
                    name="pesan"
                    value={form.pesan}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Ceritakan kondisi atau kebutuhan Anda di sini..."
                    className="w-full border-2 border-stone-300 rounded-xl px-5 py-4 text-base font-medium outline-none transition-all focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 placeholder:text-stone-400 resize-none"
                    style={{ color: "#0C0A09" }}
                  />
                </div>

                {/* Divider */}
                <div className="border-t-2 border-stone-100" />

                {/* Submit row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  <p className="text-sm font-medium leading-relaxed" style={{ color: "#44403C" }}>
                    Setelah menekan tombol, Anda
                    <br className="hidden sm:block" /> akan masuk ke WhatsApp otomatis.
                  </p>
                  <button
                    type="submit"
                    disabled={!isValid}
                    className="flex items-center gap-3 px-8 py-4 rounded-xl font-black text-base transition-all duration-300 hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                    style={{ backgroundColor: "var(--color-primary)", color: "#fff" }}
                  >
                    <MessageCircle size={20} strokeWidth={2.5} />
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