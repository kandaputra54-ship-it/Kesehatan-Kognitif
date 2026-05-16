"use client";
import { useState, useRef } from "react";

// ─── Konstanta & helpers ──────────────────────────────────────────────────────

const QUESTIONS = [
  { id: 1, cat: "ORIENTASI",  sub: "Waktu",      points: 5 },
  { id: 2, cat: "ORIENTASI",  sub: "Tempat",     points: 5 },
  { id: 3, cat: "REGISTRASI", sub: "Memori",     points: 3 },
  { id: 4, cat: "KALKULASI",  sub: "Atensi",     points: 5 },
  { id: 5, cat: "MENGINGAT",  sub: "Recall",     points: 3 },
  { id: 6, cat: "BAHASA",     sub: "Penamaan",   points: 2 },
  { id: 7, cat: "BAHASA",     sub: "Repetisi",   points: 1 },
  { id: 8, cat: "BAHASA",     sub: "3 Langkah",  points: 3 },
  { id: 9, cat: "BAHASA",     sub: "Visual",     points: 1 },
  { id: 10, cat: "BAHASA",    sub: "Menulis",    points: 1 },
  { id: 11, cat: "BAHASA",    sub: "Konstruksi", points: 1 },
];

const CAT_COLORS = {
  ORIENTASI:  { pill: "#3b82f6", bg: "#eff6ff" },
  REGISTRASI: { pill: "#8b5cf6", bg: "#f5f3ff" },
  KALKULASI:  { pill: "#f59e0b", bg: "#fffbeb" },
  MENGINGAT:  { pill: "#ef4444", bg: "#fef2f2" },
  BAHASA:     { pill: "#10b981", bg: "#ecfdf5" },
};

function getInterpretation(score) {
  if (score >= 23) return { label: "Normal", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" };
  if (score >= 18) return { label: "Gangguan Kognitif Ringan", color: "#d97706", bg: "#fffbeb", border: "#fde68a" };
  return { label: "Gangguan Kognitif Berat", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" };
}

function formatWANumber(raw) {
  let n = raw.replace(/\D/g, "");
  if (n.startsWith("0")) n = "62" + n.slice(1);
  if (!n.startsWith("62")) n = "62" + n;
  return n;
}

function buildWAMessage({ testType, userData, responses, totalScore }) {
  const interp = getInterpretation(totalScore);
  const now = new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });

   const lines = [
    `*[ HASIL MMSE - stimuno.web.id ]*`,
    `Tanggal : ${now}`,
    ``,
    `*-- IDENTITAS RESPONDEN --*`,
    `Nama    : ${userData.nama}`,
    `Usia    : ${userData.usia} tahun`,
    `Gender  : ${userData.gender}`,
    `Jenis   : ${testType}`,
    ``,
    `*-- SKOR PER KATEGORI --*`,
    ...QUESTIONS.map((q, i) => `${String(i + 1).padStart(2, "0")}. ${q.cat} (${q.sub}) : ${responses[i].score ?? 0}/${q.points}`),
    ``,
    `*Total Skor : ${totalScore} / 30*`,
    `Interpretasi: ${interp.label}`,
    ``,
    `Generate by stimuno.web.id`,
  ];

  return encodeURIComponent(lines.join("\n"));
}

// ─── PDF Generator (vanilla jsPDF via CDN) ───────────────────────────────────

async function generatePDF({ testType, userData, responses, totalScore }) {
  // Muat jsPDF dari CDN kalau belum tersedia
  if (!window.jspdf) {
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const interp = getInterpretation(totalScore);
  const now = new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });

  // ── Header strip ──
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, W, 28, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("stimuno.web.id", 14, 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text("Mini-Mental State Examination (MMSE)", 14, 19);
  doc.text(`Tanggal: ${now}`, 14, 24);

  // Jenis tes badge (kanan header)
  const badgeLabel = testType;
  const badgeX = W - 14 - doc.getTextWidth(badgeLabel) - 8;
  doc.setFillColor(59, 130, 246);
  doc.roundedRect(badgeX - 2, 8, doc.getTextWidth(badgeLabel) + 12, 8, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text(badgeLabel, badgeX + 4, 13.5);

  let y = 38;

  // ── Identitas responden ──
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("IDENTITAS RESPONDEN", 14, y);

  y += 6;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(14, y, W - 14, y);
  y += 5;

  const fields = [
    ["Nama Lengkap", userData.nama],
    ["Usia", `${userData.usia} tahun`],
    ["Jenis Kelamin", userData.gender],
    ["Jenis Tes", testType],
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  fields.forEach(([label, val]) => {
    doc.setTextColor(100, 116, 139);
    doc.text(label, 14, y);
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.text(val, 70, y);
    doc.setFont("helvetica", "normal");
    y += 6;
  });

  y += 4;

  // ── Skor total card ──
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(14, y, W - 28, 24, 3, 3, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(15, 23, 42);
  doc.text(`${totalScore}`, 28, y + 17);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.setTextColor(148, 163, 184);
  doc.text("/ 30", 28 + doc.getTextWidth(`${totalScore}`) + 2, y + 17);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text("SKOR TOTAL", 28, y + 22);

  // Interpretasi di sebelah kanan card
  const [r, g, b] = interp.color.match(/\w\w/g).map(x => parseInt(x, 16));
  doc.setFillColor(r, g, b);
  doc.roundedRect(W - 80, y + 5, 66, 14, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  const interpW = doc.getTextWidth(interp.label);
  doc.text(interp.label, W - 80 + (66 - interpW) / 2, y + 14);

  y += 32;

  // ── Tabel detail soal ──
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("DETAIL JAWABAN", 14, y);
  y += 5;
  doc.setDrawColor(226, 232, 240);
  doc.line(14, y, W - 14, y);
  y += 4;

  // Header tabel
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, W - 28, 7, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text("NO", 17, y + 5);
  doc.text("KATEGORI", 27, y + 5);
  doc.text("SUB", 72, y + 5);
  doc.text("JAWABAN", 102, y + 5);
  doc.text("SKOR", W - 22, y + 5);
  y += 7;

  QUESTIONS.forEach((q, i) => {
    const res = responses[i];
    const score = res.score ?? 0;
    const answer = res.answer || "-";
    const cat = CAT_COLORS[q.cat];
    const [cr, cg, cb] = cat.pill.match(/\w\w/g).map(x => parseInt(x, 16));
    const rowH = 8;

    if (i % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, y, W - 28, rowH, "F");
    }

    // Nomor
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(String(i + 1).padStart(2, "0"), 17, y + 5.5);

    // Pill kategori
    const pillW = doc.getTextWidth(q.cat) + 4;
    doc.setFillColor(cr, cg, cb);
    doc.roundedRect(26, y + 1.5, pillW, 5, 1, 1, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6);
    doc.text(q.cat, 28, y + 5.5);

    // Sub
    doc.setTextColor(71, 85, 105);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text(q.sub, 72, y + 5.5);

    // Jawaban (truncate)
    const maxAnsW = 55;
    let ans = answer;
    while (ans.length > 3 && doc.getTextWidth(ans) > maxAnsW) ans = ans.slice(0, -1);
    if (ans !== answer) ans += "…";
    doc.setTextColor(15, 23, 42);
    doc.text(ans, 102, y + 5.5);

    // Skor
    const scoreStr = `${score}/${q.points}`;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(score === q.points ? 22 : score === 0 ? 220 : 15, score === q.points ? 163 : score === 0 ? 38 : 23, score === q.points ? 74 : score === 0 ? 38 : 42);
    doc.text(scoreStr, W - 22, y + 5.5);

    y += rowH;

    // New page check
    if (y > 265) {
      doc.addPage();
      y = 20;
    }
  });

  y += 6;

  // ── Panduan penilaian ──
  if (y > 240) { doc.addPage(); y = 20; }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text("PANDUAN PENILAIAN MMSE", 14, y);
  y += 5;
  doc.setDrawColor(226, 232, 240);
  doc.line(14, y, W - 14, y);
  y += 5;

  const guide = [
    { range: "23 – 30", label: "Normal", color: "#16a34a" },
    { range: "18 – 22", label: "Gangguan Kognitif Ringan", color: "#d97706" },
    { range: "0 – 17",  label: "Gangguan Kognitif Berat",  color: "#dc2626" },
  ];

  guide.forEach(({ range, label, color }) => {
    const active = interp.label === label;
    const [r2, g2, b2] = color.match(/\w\w/g).map(x => parseInt(x, 16));
    if (active) {
      doc.setFillColor(r2, g2, b2);
      doc.roundedRect(14, y - 3, W - 28, 9, 2, 2, "F");
      doc.setTextColor(255, 255, 255);
    } else {
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(14, y - 3, W - 28, 9, 2, 2, "F");
      doc.setTextColor(r2, g2, b2);
    }
    doc.setFont("helvetica", active ? "bold" : "normal");
    doc.setFontSize(8.5);
    doc.text(label, 20, y + 3);
    doc.text(range, W - 30, y + 3);
    y += 11;
  });

  y += 4;

  // ── Footer ──
  const footerY = doc.internal.pageSize.getHeight() - 10;
  doc.setDrawColor(226, 232, 240);
  doc.line(14, footerY - 4, W - 14, footerY - 4);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text("Dokumen ini digenerate otomatis oleh stimuno.web.id · Mini-Mental State Examination (MMSE)", 14, footerY);
  doc.text(`Halaman 1`, W - 14, footerY, { align: "right" });

  // ── Save ──
  const filename = `MMSE_${userData.nama.replace(/\s+/g, "_")}_${testType}_${Date.now()}.pdf`;
  doc.save(filename);
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * MMSEResultCard
 * Props:
 *   testType  : "Pre-test" | "Post-test"
 *   userData  : { nama, usia, gender }
 *   responses : [{ answer: string, score: number }] × 11
 *   totalScore: number
 *   onSave    : (data) => void   — callback simpan ke DB / state parent
 *   onRestart : () => void
 */
export default function MMSEResultCard({ testType, userData, responses, totalScore, onSave, onRestart }) {
  const [waNumber, setWaNumber] = useState("");
  const [waError, setWaError] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [waSent, setWaSent] = useState(false);
  const [saved, setSaved] = useState(false);
  const inputRef = useRef(null);

  const interp = getInterpretation(totalScore);
  const now = new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });

  // Per-kategori summary
  const catSummary = Object.keys(CAT_COLORS).map((cat) => {
    const qs = QUESTIONS.filter((q) => q.cat === cat);
    const indices = qs.map((q) => q.id - 1);
    const earned = indices.reduce((s, i) => s + (responses[i]?.score ?? 0), 0);
    const max = qs.reduce((s, q) => s + q.points, 0);
    return { cat, earned, max, pct: Math.round((earned / max) * 100) };
  });

  const handleDownloadPDF = async () => {
    setPdfLoading(true);
    try {
      await generatePDF({ testType, userData, responses, totalScore });
    } catch (e) {
      console.error(e);
      alert("Gagal generate PDF. Pastikan koneksi internet aktif.");
    } finally {
      setPdfLoading(false);
    }
  };

  const handleSendWA = () => {
    const cleaned = waNumber.replace(/\D/g, "");
    if (cleaned.length < 9) {
      setWaError("Nomor tidak valid. Minimal 9 digit.");
      inputRef.current?.focus();
      return;
    }
    setWaError("");
    const num = formatWANumber(cleaned);
    const msg = buildWAMessage({ testType, userData, responses, totalScore });
    window.open(`https://wa.me/${num}?text=${msg}`, "_blank");
    setWaSent(true);
    setTimeout(() => setWaSent(false), 4000);
  };

  const handleSave = () => {
    onSave?.({ testType, userData, responses, totalScore });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 animate-in fade-in duration-500">

      {/* ── Brand header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
            </svg>
          </div>
          <span className="text-xs font-bold text-gray-800 tracking-tight">stimuno.web.id</span>
        </div>
        <span
          className="text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wide"
          style={{ color: "#3b82f6", background: "#eff6ff", borderColor: "#bfdbfe" }}
        >
          {testType} · MMSE
        </span>
      </div>

      {/* ── Identitas + Skor ── */}
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
        <div className="px-4 py-3.5 border-b border-gray-100 flex justify-between items-start gap-3">
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-800 truncate">{userData.nama}</p>
            <p className="text-xs text-gray-400 mt-0.5">{userData.usia} tahun · {userData.gender}</p>
            <p className="text-[10px] text-gray-300 mt-0.5">{now}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-4xl font-black leading-none" style={{ color: interp.color }}>
              {totalScore}
              <span className="text-base font-semibold text-gray-300">/30</span>
            </p>
            <p className="text-[9px] text-gray-400 uppercase font-bold mt-1">Skor Total</p>
          </div>
        </div>

        {/* Interpretasi */}
        <div
          className="px-4 py-2.5 border-b"
          style={{ background: interp.bg, borderColor: interp.border }}
        >
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Interpretasi</p>
          <p className="text-sm font-bold" style={{ color: interp.color }}>{interp.label}</p>
        </div>

        {/* Mini bar chart per kategori */}
        <div className="px-4 py-3.5 space-y-2.5">
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">Skor Per Kategori</p>
          {catSummary.map(({ cat, earned, max, pct }) => {
            const c = CAT_COLORS[cat];
            return (
              <div key={cat} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold" style={{ color: c.pill }}>{cat}</span>
                  <span className="text-[10px] font-bold text-gray-500">{earned}/{max}</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: c.pill }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Panduan penilaian ── */}
      <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3.5 space-y-2">
        <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">Panduan Penilaian MMSE</p>
        {[
          { range: "23 – 30", label: "Normal",                color: "#16a34a", bg: "#f0fdf4", active: totalScore >= 23 },
          { range: "18 – 22", label: "Gangguan Kognitif Ringan", color: "#d97706", bg: "#fffbeb", active: totalScore >= 18 && totalScore <= 22 },
          { range: "0 – 17",  label: "Gangguan Kognitif Berat",  color: "#dc2626", bg: "#fef2f2", active: totalScore <= 17 },
        ].map((row) => (
          <div
            key={row.range}
            className="flex items-center justify-between px-3 py-2 rounded-xl transition-all"
            style={{ background: row.active ? row.bg : "#f8fafc" }}
          >
            <div className="flex items-center gap-2">
              {row.active && (
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: row.color }} />
              )}
              <span className="text-xs font-semibold" style={{ color: row.active ? row.color : "#94a3b8" }}>
                {row.label}
              </span>
            </div>
            <span className="text-xs font-bold tabular-nums" style={{ color: row.active ? row.color : "#cbd5e1" }}>
              {row.range}
            </span>
          </div>
        ))}
      </div>

      {/* ─────── ACTIONS ─────── */}

      {/* 1. Download PDF */}
      <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3.5 space-y-2.5">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-5 h-5 rounded-md bg-red-50 flex items-center justify-center">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/>
            </svg>
          </div>
          <p className="text-xs font-bold text-gray-700">Download Dokumen PDF</p>
        </div>
        <p className="text-[10px] text-gray-400 leading-relaxed">
          Generate dokumen hasil MMSE lengkap dengan identitas, skor per kategori, dan interpretasi klinis — berformat PDF siap cetak.
        </p>
        <button
          onClick={handleDownloadPDF}
          disabled={pdfLoading}
          className="w-full h-11 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60"
          style={{ background: pdfLoading ? "#f1f5f9" : "#ef4444", color: pdfLoading ? "#94a3b8" : "white" }}
        >
          {pdfLoading ? (
            <>
              <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
              </svg>
              Membuat PDF…
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download PDF
            </>
          )}
        </button>
      </div>

      {/* 2. Kirim WhatsApp */}
      <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3.5 space-y-2.5">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-5 h-5 rounded-md bg-green-50 flex items-center justify-center">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <p className="text-xs font-bold text-gray-700">Kirim via WhatsApp</p>
        </div>
        <p className="text-[10px] text-gray-400 leading-relaxed">
          Masukkan nomor WhatsApp untuk mengirimkan hasil MMSE. 
        </p>

        <div className="space-y-1.5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-xs font-bold text-gray-400">+62</span>
            </div>
            <input
              ref={inputRef}
              type="tel"
              placeholder="812-3456-7890"
              value={waNumber}
              onChange={(e) => { setWaNumber(e.target.value); setWaError(""); }}
              className={`w-full h-11 pl-10 pr-4 rounded-xl border-2 text-sm outline-none transition-all ${
                waError ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-green-400 focus:bg-white"
              }`}
            />
          </div>
          {waError && <p className="text-[10px] text-red-500 font-medium">{waError}</p>}
        </div>

        <button
          onClick={handleSendWA}
          className="w-full h-11 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ background: waSent ? "#dcfce7" : "#25D366", color: waSent ? "#16a34a" : "white" }}
        >
          {waSent ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              WhatsApp Dibuka!
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
              Kirim ke WhatsApp
            </>
          )}
        </button>
      </div>

      {/* 3. Simpan & Mulai Ulang */}
      <div className="space-y-2">
       
        <button
          onClick={onRestart ?? (() => window.location.reload())}
          className="w-full h-12 border-2 border-gray-200 rounded-xl font-semibold text-sm text-gray-400 active:scale-[0.98] transition-all hover:border-gray-300 hover:text-gray-600"
        >
          Selesai
        </button>
      </div>

      {/* Footer note */}
      <p className="text-center text-[9px] text-gray-300 font-medium pb-1">
        Dokumen digenerate oleh · <span className="text-gray-400 font-bold">stimuno.web.id</span>
      </p>
    </div>
  );
}