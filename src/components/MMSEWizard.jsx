"use client";
import { useState, useRef, useEffect } from "react";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import {
  FaMars,
  FaVenus,
  FaArrowRight,
  FaArrowLeft,
  FaCheck,
  FaTimes,
  FaWhatsapp,
  FaBrain,
  FaDownload,
} from "react-icons/fa";

const QUESTIONS = [
  { cat: "ORIENTASI", q: "Tanyakan: 'Tahun berapa sekarang?'", type: "text" },
  { cat: "ORIENTASI", q: "Tanyakan: 'Musim apa sekarang?'", type: "text" },
  { cat: "ORIENTASI", q: "Tanyakan: 'Tanggal berapa sekarang?'", type: "text" },
  { cat: "ORIENTASI", q: "Tanyakan: 'Hari apa sekarang?'", type: "text" },
  { cat: "ORIENTASI", q: "Tanyakan: 'Bulan apa sekarang?'", type: "text" },
  {
    cat: "ORIENTASI",
    q: "Tanyakan: 'Di negara mana Anda tinggal?'",
    type: "text",
  },
  {
    cat: "ORIENTASI",
    q: "Tanyakan: 'Di provinsi mana Anda tinggal?'",
    type: "text",
  },
  {
    cat: "ORIENTASI",
    q: "Tanyakan: 'Di kabupaten mana Anda tinggal?'",
    type: "text",
  },
  {
    cat: "ORIENTASI",
    q: "Tanyakan: 'Di kecamatan mana Anda tinggal?'",
    type: "text",
  },
  {
    cat: "ORIENTASI",
    q: "Tanyakan: 'Di desa mana Anda tinggal?'",
    type: "text",
  },
  {
    cat: "REGISTRASI",
    q: "Sebutkan 3 objek , Objek 1:",
    type: "text",
  },
  { cat: "REGISTRASI", q: "Objek 2:", type: "text" },
  { cat: "REGISTRASI", q: "Objek 3:", type: "text" },
  {
    cat: "KALKULASI",
    q: "Eja 'BAPAK' terbalik. Huruf ke-1 (K):",
    type: "char",
  },
  { cat: "KALKULASI", q: "Huruf ke-2 (A):", type: "char" },
  { cat: "KALKULASI", q: "Huruf ke-3 (P):", type: "char" },
  { cat: "KALKULASI", q: "Huruf ke-4 (A):", type: "char" },
  { cat: "KALKULASI", q: "Huruf ke-5 (B):", type: "char" },
  { cat: "MENGINGAT", q: "Ulangi Objek 1 tadi:", type: "text" },
  { cat: "MENGINGAT", q: "Objek 2 tadi:", type: "text" },
  { cat: "MENGINGAT", q: "Objek 3 tadi:", type: "text" },
  { cat: "BAHASA", q: "Tunjukkan Jam Tangan. Tanyakan namanya:", type: "text" },
  { cat: "BAHASA", q: "Tunjukkan Pensil. Tanyakan namanya:", type: "text" },
  {
    cat: "BAHASA",
    q: "Minta ulangi: 'Tak ada jika, dan, atau tetapi':",
    type: "text",
  },
  { cat: "BAHASA", q: "Perintah: 'Ambil kertas!':", type: "text" },
  { cat: "BAHASA", q: "Perintah: 'Lipat dua!':", type: "text" },
  { cat: "BAHASA", q: "Perintah: 'Taruh di lantai!':", type: "text" },
  { cat: "BAHASA", q: "Instruksi: 'Tutup mata':", type: "text" },
  { cat: "BAHASA", q: "Instruksi: 'Tulis satu kalimat':", type: "text" },
  { cat: "BAHASA", q: "Instruksi: 'Salin gambar':", type: "text" },
];

const CAT_COLORS = {
  ORIENTASI: {
    bg: "bg-blue-500",
    light: "bg-blue-50",
    text: "text-blue-600",
    ring: "ring-blue-400",
    bar: "bg-blue-500",
  },
  REGISTRASI: {
    bg: "bg-purple-500",
    light: "bg-purple-50",
    text: "text-purple-600",
    ring: "ring-purple-400",
    bar: "bg-purple-500",
  },
  KALKULASI: {
    bg: "bg-amber-500",
    light: "bg-amber-50",
    text: "text-amber-600",
    ring: "ring-amber-400",
    bar: "bg-amber-500",
  },
  MENGINGAT: {
    bg: "bg-pink-500",
    light: "bg-pink-50",
    text: "text-pink-600",
    ring: "ring-pink-400",
    bar: "bg-pink-500",
  },
  BAHASA: {
    bg: "bg-teal-500",
    light: "bg-teal-50",
    text: "text-teal-600",
    ring: "ring-teal-400",
    bar: "bg-teal-500",
  },
};

function getInterpretation(score) {
  if (score >= 27)
    return {
      label: "Normal",
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      bar: "bg-green-500",
      desc: "Fungsi kognitif dalam batas normal.",
    };
  if (score >= 21)
    return {
      label: "Gangguan Ringan",
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      bar: "bg-amber-400",
      desc: "Terdapat gangguan kognitif ringan. Perlu pemantauan lebih lanjut.",
    };
  return {
    label: "Kerusakan Kognitif",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    bar: "bg-red-500",
    desc: "Nilai < 21 mengindikasikan kerusakan kognitif. Rujukan ke dokter spesialis dianjurkan.",
  };
}

export default function MMSEWizard({
  type = "Pengkajian",
  onComplete = () => {},
}) {
  const [step, setStep] = useState("type");
  const [testType, setTestType] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState(Array(QUESTIONS.length).fill(null));
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(""));
  const [userData, setUserData] = useState({ nama: "", usia: "", gender: "" });
  const [showPanel, setShowPanel] = useState(false);
  const [shake, setShake] = useState(false);
  const activeRef = useRef(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const downloadPDF = () => {
    const totalScore = scores.reduce((a, b) => a + (b || 0), 0);
    const interp = getInterpretation(totalScore);
    const doc = new jsPDF();
    const primaryColor = [91, 75, 219]; // Warna brand Anda

    // --- 1. HEADER & JUDUL ---
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, "F"); // Background header
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(`LAPORAN HASIL ${testType.toUpperCase()} MMSE`, 14, 25);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Mini-Mental State Examination - Screening Kognitif", 14, 32);

    // --- 2. KOTAK IDENTITAS (Kiri) ---
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("IDENTITAS Responden", 14, 55);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const infoY = 62;
    doc.text(`Nama Lengkap  : ${userData.nama}`, 14, infoY);
    doc.text(
      `Usia                     : ${userData.usia} Tahun`,
      14,
      infoY + 6,
    );
    doc.text(`Jenis Kelamin   : ${userData.gender}`, 14, infoY + 12);
    doc.text(
      `Tanggal Tes       : ${new Date().toLocaleDateString("id-ID")}`,
      14,
      infoY + 18,
    );

    // --- 3. KOTAK SKOR (Kanan - Summary Card) ---
    const boxX = 130;
    const boxY = 50;
    // Pilih warna box berdasarkan interpretasi
    let statusColor = [34, 197, 94]; // Hijau (Normal)
    if (totalScore < 21)
      statusColor = [239, 68, 68]; // Merah (Buruk)
    else if (totalScore < 27) statusColor = [245, 158, 11]; // Amber (Ringan)

    doc.setDrawColor(...statusColor);
    doc.setFillColor(252, 252, 252);
    doc.roundedRect(boxX, boxY, 65, 30, 3, 3, "FD"); // Draw Card

    doc.setTextColor(...statusColor);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("SKOR TOTAL", boxX + 5, boxY + 7);

    doc.setFontSize(24);
    doc.text(`${totalScore}`, boxX + 5, boxY + 18);
    doc.setFontSize(12);
    doc.text("/ 30", boxX + 17, boxY + 18);

    doc.setFontSize(10);
    doc.text(interp.label.toUpperCase(), boxX + 5, boxY + 25);

    // --- 4. INTERPRETASI ---
    doc.setDrawColor(230, 230, 230);
    doc.line(14, 85, 196, 85);
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text(`Catatan: ${interp.desc}`, 14, 92, { maxWidth: 180 });

    // --- 5. TABEL HASIL DETAIL ---
    const tableRows = QUESTIONS.map((q, i) => [
      i + 1,
      q.cat,
      q.q.replace("Tanyakan: ", "").replace("Instruksi: ", ""),
      answers[i] || "-",
      {
        content: scores[i] === 1 ? "1" : "0",
        styles: {
          halign: "center",
          fontStyle: "bold",
          textColor: scores[i] === 1 ? [34, 197, 94] : [239, 68, 68],
        },
      },
    ]);

    autoTable(doc, {
      startY: 100,
      head: [
        [
          "No",
          "Kategori",
          "Pertanyaan / Instruksi",
          "Jawaban Responden",
          "Skor",
        ],
      ],
      body: tableRows,
      theme: "striped",
      headStyles: { fillColor: primaryColor, fontSize: 9, halign: "center" },
      styles: { fontSize: 8, cellPadding: 3, valign: "middle" },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 25, fontStyle: "bold" },
        2: { cellWidth: 85 },
        3: { cellWidth: 50 },
        4: { cellWidth: 15 },
      },
      didDrawPage: (data) => {
        // Footer otomatis di setiap halaman
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(
          `Dicetak otomatis oleh Sistem Kesehatan Kognitif - Halaman ${data.pageNumber}`,
          14,
          doc.internal.pageSize.height - 10,
        );
      },
    });

    doc.save(`Hasil_MMSE_${userData.nama.replace(/\s+/g, "_")}.pdf`);
  };

  useEffect(() => {
    if (showPanel && activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentQ, showPanel]);

  const handleBack = () => {
    if (step === "test") {
      if (currentQ > 0) setCurrentQ(currentQ - 1);
      else setStep("gender");
    } else if (step === "gender") setStep("usia");
    else if (step === "usia") setStep("nama");
    else if (step === "nama") setStep("type"); // Tambahkan ini
  };

  const handleNext = (scoreValue) => {
    // Validate: answer must be filled
    const currentAnswer = answers[currentQ].trim();
    if (!currentAnswer) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    const newScores = [...scores];
    newScores[currentQ] = scoreValue;
    setScores(newScores);
    if (currentQ < QUESTIONS.length - 1) setCurrentQ(currentQ + 1);
    else setStep("result");
  };

  const handleJumpTo = (idx) => {
    const firstUnanswered = scores.findIndex((s) => s === null);
    const maxAllowed =
      firstUnanswered === -1 ? QUESTIONS.length - 1 : firstUnanswered;

    if (idx <= maxAllowed) {
      setCurrentQ(idx);
      setShowPanel(false);
    }
  };

  const sendWA = () => {
    const totalScore = scores.reduce((a, b) => a + (b || 0), 0);
    const interp = getInterpretation(totalScore);
    const detailJawaban = answers
      .map(
        (ans, i) =>
          `${i + 1}. ${QUESTIONS[i].q} -> [${ans || "-"}] Skor: ${scores[i]}`,
      )
      .join("%0A");
    const message =
      `*LAPORAN ${testType.toUpperCase()} MMSE*%0A%0A` +
      `*IDENTITAS*%0A Nama: ${userData.nama}%0A Usia: ${userData.usia}%0A Gender: ${userData.gender}%0A%0A` +
      `*HASIL AKHIR: ${totalScore}/30*%0A` +
      `*INTERPRETASI: ${interp.label}*%0A%0A` +
      `*DETAIL DATA:*%0A${detailJawaban}`;
    window.open(`https://wa.me/6281806137179    ?text=${message}`, "_blank");
  };

  // ---- NAV PANEL ----
  const NavPanel = () => {
    const categories = [...new Set(QUESTIONS.map((q) => q.cat))];
    const answeredCount = scores.filter((s) => s !== null).length;

    // Logic: Cari index pertama yang belum diisi untuk menentukan batas maksimal navigasi
    const firstUnanswered = scores.findIndex((s) => s === null);
    const maxReachable =
      firstUnanswered === -1 ? QUESTIONS.length - 1 : firstUnanswered;

    return (
      <div
        className="fixed inset-0 z-50 flex items-end justify-center"
        style={{ background: "rgba(0,0,0,0.45)" }}
        onClick={() => setShowPanel(false)}
      >
        <div
          className="w-full max-w-lg bg-white rounded-t-[36px] p-6 pb-10 shadow-2xl"
          style={{ animation: "slideUp 0.25s ease-out" }}
          onClick={(e) => e.stopPropagation()}
        >
          <style>{`@keyframes slideUp { from { transform: translateY(100%); opacity:0; } to { transform: translateY(0); opacity:1; } }`}</style>
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-5" />
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-black text-gray-800 text-lg">Navigasi Soal</h3>
            <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
              {answeredCount} / {QUESTIONS.length} selesai
            </span>
          </div>
          <div className="flex gap-5 mb-5">
            {[
              { color: "bg-green-400", label: "Benar" },
              { color: "bg-red-400", label: "Salah" },
              { color: "bg-gray-200", label: "Belum" },
            ].map((l) => (
              <div
                key={l.label}
                className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider"
              >
                <div className={`w-3 h-3 rounded-sm ${l.color}`} />
                {l.label}
              </div>
            ))}
          </div>
          <div
            className="space-y-5 overflow-y-auto"
            style={{ maxHeight: "50vh" }}
          >
            {categories.map((cat) => {
              const color = CAT_COLORS[cat];
              const catQs = QUESTIONS.map((q, i) => ({ ...q, idx: i })).filter(
                (q) => q.cat === cat,
              );
              return (
                <div key={cat}>
                  <p
                    className={`text-[10px] font-black tracking-[0.2em] uppercase mb-2 ${color.text}`}
                  >
                    {cat}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {catQs.map(({ idx }) => {
                      const score = scores[idx];
                      const isActive = idx === currentQ;
                      const isReachable = idx <= maxReachable;

                      let cls =
                        "w-9 h-9 rounded-xl text-[11px] font-black flex items-center justify-center transition-all select-none ";

                      if (isActive) {
                        cls += `${color.bg} text-white ring-4 ring-offset-1 ${color.ring} ring-opacity-50 scale-110 shadow-lg`;
                      } else if (score !== null) {
                        // Soal yang sudah dijawab
                        cls +=
                          score === 1
                            ? "bg-green-500 text-white shadow-sm cursor-pointer hover:scale-105 active:scale-95"
                            : "bg-red-400 text-white shadow-sm cursor-pointer hover:scale-105 active:scale-95";
                      } else if (isReachable) {
                        // Soal antrean berikutnya (boleh diklik meskipun belum ada skor)
                        cls +=
                          "bg-white border-2 border-gray-200 text-gray-400 cursor-pointer hover:border-primary hover:text-primary active:scale-95";
                      } else {
                        // Soal yang masih terkunci jauh di depan
                        cls += "bg-gray-100 text-gray-300 cursor-not-allowed";
                      }

                      return (
                        <button
                          key={idx}
                          ref={isActive ? activeRef : null}
                          className={cls}
                          disabled={!isReachable}
                          onClick={() => isReachable && handleJumpTo(idx)}
                          title={
                            !isReachable
                              ? "Selesaikan soal sebelumnya dulu"
                              : isActive
                                ? "Soal aktif"
                                : score !== null
                                  ? `Kembali ke soal ${idx + 1}`
                                  : `Lanjut ke soal ${idx + 1}`
                          }
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setShowPanel(false)}
            className="mt-6 w-full py-4 bg-gray-100 text-gray-600 rounded-2xl font-black text-sm active:scale-95 transition-all"
          >
            Tutup
          </button>
        </div>
      </div>
    );
  };
  // ---- RESULT PAGE ----
  if (step === "result") {
    const totalScore = scores.reduce((a, b) => a + (b || 0), 0);
    const interp = getInterpretation(totalScore);
    const pct = Math.round((totalScore / 30) * 100);
    const catBreakdown = [...new Set(QUESTIONS.map((q) => q.cat))].map(
      (cat) => {
        const idxs = QUESTIONS.map((q, i) => ({ ...q, i }))
          .filter((q) => q.cat === cat)
          .map((q) => q.i);
        const earned = idxs.reduce((s, i) => s + (scores[i] || 0), 0);
        return { cat, earned, total: idxs.length, color: CAT_COLORS[cat] };
      },
    );

    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* Header */}
        <div className="text-center pt-2">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <FaBrain className="text-3xl text-primary" />
          </div>
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
            Hasil MMSE
          </p>
          <h2 className="text-2xl font-black text-gray-800">{userData.nama}</h2>
          <p className="text-sm text-gray-400 mt-1">
            {userData.usia} tahun · {userData.gender}
          </p>
        </div>

        {/* Big score */}
        <div
          className={`rounded-[28px] p-6 border-2 ${interp.bg} ${interp.border} text-center`}
        >
          <p className="text-6xl font-black text-gray-800 leading-none">
            {totalScore}
            <span className="text-2xl text-gray-400 font-bold">/30</span>
          </p>
          <p className={`text-xl font-black mt-2 ${interp.color}`}>
            {interp.label}
          </p>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            {interp.desc}
          </p>
          {/* Score bar */}
          <div className="mt-4 bg-white/70 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full ${interp.bar} transition-all duration-1000`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-1 px-1">
            <span>0</span>
            <span className="text-red-400">Batas: 21</span>
            <span>30</span>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="space-y-2">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
            Rincian per Kategori
          </p>
          {catBreakdown.map(({ cat, earned, total, color }) => (
            <div key={cat} className="flex items-center gap-3">
              <div
                className={`text-[9px] font-black uppercase tracking-wider w-24 shrink-0 ${color.text}`}
              >
                {cat}
              </div>
              <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-full ${color.bar} transition-all duration-700`}
                  style={{ width: `${(earned / total) * 100}%` }}
                />
              </div>
              <div className="text-xs font-black text-gray-500 w-10 text-right shrink-0">
                {earned}/{total}
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <button
          onClick={sendWA}
          className="w-full bg-green-500 text-white py-5 rounded-2xl font-black text-base flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg shadow-green-200"
        >
          <FaWhatsapp className="text-xl" /> Kirim Laporan via WhatsApp
        </button>
        <button
          onClick={downloadPDF}
          className="w-full bg-white border-2 border-primary text-primary py-5 rounded-2xl font-black text-base flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          <FaDownload className="text-xl" /> Unduh Laporan (PDF)
        </button>
        {/* Tombol Selesai Sekarang Memicu Modal */}
        <button
          onClick={() => setShowConfirmModal(true)}
          className="w-full bg-gray-100 text-gray-500 py-4 rounded-2xl font-black text-sm active:scale-95 transition-all"
        >
          Selesai
        </button>
        {showConfirmModal && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-6"
            style={{
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
            }}
          >
            <div className="w-full max-w-sm bg-white rounded-[32px] p-8 shadow-2xl animate-in zoom-in duration-200">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaDownload className="text-2xl" />
              </div>

              <h3 className="text-xl font-black text-gray-800 text-center mb-2">
                Selesaikan Sesi?
              </h3>
              <p className="text-sm text-gray-500 text-center mb-8 leading-relaxed">
                Apakah Anda sudah Mengunduh PDF atau Mengirim WhatsApp? Data
                Sesi ini akan terhapus setelah Anda keluar.
              </p>

              <div className="space-y-3">
                <button
                  onClick={onComplete}
                  className="w-full bg-red-500 text-white py-4 rounded-2xl font-black text-sm active:scale-95 transition-all"
                >
                  Ya, Selesai & Hapus Data
                </button>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="w-full bg-gray-100 text-gray-600 py-4 rounded-2xl font-black text-sm active:scale-95 transition-all"
                >
                  Belum, Kembali
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  // ---- SELECTION STEP ----
  if (step === "type")
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div className="text-center">
          <h2 className="text-3xl font-black text-darkGray leading-tight">
            Tujuan Pengkajian?
          </h2>
          <p className="text-gray-400 font-bold text-xs mt-2 uppercase tracking-widest">
            Silakan pilih kategori sesi
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Tombol Pre-Test */}
          <button
            onClick={() => {
              setTestType("Pre-Test");
              setStep("nama");
            }}
            className={`p-6 border-4 rounded-[32px] flex items-center gap-5 transition-all cursor-pointer active:scale-95 ${testType === "Pre-Test" ? "border-primary bg-primary/5 text-primary" : "border-gray-50 text-gray-500 hover:border-gray-200"}`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-black ${testType === "Pre-Test" ? "bg-primary text-white" : "bg-blue-100 text-blue-600"}`}
            >
              1
            </div>
            <div className="text-left">
              <p className="font-black text-lg leading-none">Pre-Test</p>
              <p className="text-[10px] font-bold opacity-60 uppercase mt-1">
                Sebelum Intervensi/Latihan
              </p>
            </div>
          </button>

          {/* Tombol Post-Test */}
          <button
            onClick={() => {
              setTestType("Post-Test");
              setStep("nama");
            }}
            className={`p-6 border-4 rounded-[32px] flex items-center gap-5 transition-all cursor-pointer active:scale-95 ${testType === "Post-Test" ? "border-primary bg-primary/5 text-primary" : "border-gray-50 text-gray-500 hover:border-gray-200"}`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-black ${testType === "Post-Test" ? "bg-primary text-white" : "bg-green-100 text-green-600"}`}
            >
              2
            </div>
            <div className="text-left">
              <p className="font-black text-lg leading-none">Post-Test</p>
              <p className="text-[10px] font-bold opacity-60 uppercase mt-1">
                Setelah Intervensi/Latihan
              </p>
            </div>
          </button>
        </div>
      </div>
    );
  // ---- IDENTITY STEPS ----
  if (step === "nama")
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div className="text-center">
          <h2 className="text-3xl font-black text-darkGray leading-tight">
            Nama Responden?
          </h2>
        </div>
        <input
          type="text"
          autoFocus
          className="w-full p-6 text-2xl border-b-4 border-gray-100 outline-none focus:border-primary text-center font-bold"
          value={userData.nama}
          onChange={(e) => setUserData({ ...userData, nama: e.target.value })}
          onKeyDown={(e) =>
            e.key === "Enter" && userData.nama && setStep("usia")
          }
        />
        <button
          disabled={!userData.nama}
          onClick={() => setStep("usia")}
          className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-40"
        >
          Lanjut <FaArrowRight />
        </button>
      </div>
    );

  if (step === "usia")
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="text-gray-400 hover:text-primary flex items-center gap-2 font-bold cursor-pointer transition-all active:scale-95"
          >
            <FaArrowLeft /> Mundur
          </button>
          <div className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black tracking-widest uppercase">
            Identitas
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-black text-darkGray">Usia Responden?</h2>
        </div>
        <input
          type="number"
          autoFocus
          className="w-full p-6 text-5xl border-b-4 border-gray-100 outline-none focus:border-primary text-center font-black"
          value={userData.usia}
          onChange={(e) => setUserData({ ...userData, usia: e.target.value })}
        />
        <button
          disabled={!userData.usia}
          onClick={() => setStep("gender")}
          className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-40"
        >
          Lanjut <FaArrowRight />
        </button>
      </div>
    );

  if (step === "gender")
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="text-gray-400 hover:text-primary flex items-center gap-2 font-bold cursor-pointer transition-all active:scale-95"
          >
            <FaArrowLeft /> Mundur
          </button>
          <div className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black tracking-widest uppercase">
            Identitas
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-black text-darkGray">Jenis Kelamin?</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { l: "Laki-laki", i: <FaMars /> },
            { l: "Perempuan", i: <FaVenus /> },
          ].map((g) => (
            <button
              key={g.l}
              onClick={() => setUserData({ ...userData, gender: g.l })}
              className={`p-8 border-4 rounded-[32px] flex flex-col items-center gap-3 transition-all cursor-pointer active:scale-95 ${userData.gender === g.l ? "border-primary bg-primary/5 text-primary" : "border-gray-50 text-gray-300 hover:border-gray-200"}`}
            >
              <span className="text-4xl">{g.i}</span>
              <span className="font-black text-xs tracking-widest">
                {g.l.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
        <button
          disabled={!userData.gender}
          onClick={() => setStep("test")}
          className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-40"
        >
          Mulai Pengkajian MMSE
        </button>
      </div>
    );

  // ---- TEST STEP ----
  const q = QUESTIONS[currentQ];
  const color = CAT_COLORS[q.cat];
  const currentAnswer = answers[currentQ].trim();
  const canScore = currentAnswer.length > 0;

  return (
    <>
      {showPanel && <NavPanel />}
      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        .shake { animation: shake 0.5s ease; }
      `}</style>

      <div className="space-y-5 animate-in fade-in duration-300">
        {/* Top bar */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="text-gray-400 hover:text-primary flex items-center gap-2 font-bold cursor-pointer transition-all active:scale-95"
          >
            <FaArrowLeft /> Mundur
          </button>
          <div
            className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${color.light} ${color.text}`}
          >
            {q.cat}
          </div>
        </div>

        {/* Question */}
        <div className="min-h-[80px] text-center flex flex-col justify-center pt-1">
          <p className="text-gray-400 font-bold text-xs tracking-[0.2em] uppercase mb-2">
            Soal {currentQ + 1} dari {QUESTIONS.length}
          </p>
          <h3 className="text-2xl md:text-3xl font-black text-darkGray leading-tight px-2">
            {q.q}
          </h3>
        </div>

        {/* Answer input */}
        <div className={shake ? "shake" : ""}>
          {q.type === "char" ? (
            <div className="flex flex-col items-center gap-2">
              <input
                maxLength={1}
                placeholder="?"
                autoFocus
                className={`w-24 h-24 mx-auto block text-center text-5xl font-black border-4 rounded-[32px] outline-none uppercase bg-gray-50 shadow-inner transition-all ${currentAnswer ? "border-primary" : "border-gray-200"}`}
                value={answers[currentQ]}
                onChange={(e) => {
                  const a = [...answers];
                  a[currentQ] = e.target.value.toUpperCase();
                  setAnswers(a);
                }}
              />
              {!currentAnswer && (
                <p className="text-xs font-bold text-gray-400">
                  Isi jawaban dulu sebelum menilai
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-1">
              <textarea
                placeholder="Ketik jawaban lisan Responden di sini..."
                className={`w-full p-5 border-2 rounded-[28px] outline-none font-bold min-h-[110px] bg-gray-50/50 text-base transition-all ${currentAnswer ? "border-primary" : "border-gray-200 focus:border-gray-300"}`}
                value={answers[currentQ]}
                onChange={(e) => {
                  const a = [...answers];
                  a[currentQ] = e.target.value;
                  setAnswers(a);
                }}
              />
              {!currentAnswer && (
                <p className="text-xs font-bold text-gray-400 px-2">
                  Isi jawaban dulu sebelum menilai
                </p>
              )}
            </div>
          )}
        </div>

        {/* Score buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleNext(1)}
            disabled={!canScore}
            className={`group p-6 border-2 rounded-[28px] font-black text-base flex items-center justify-center gap-2 transition-all active:scale-95 ${canScore ? "bg-white border-gray-100 text-green-600 hover:bg-green-500 hover:text-white hover:border-green-500 shadow-sm cursor-pointer" : "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"}`}
          >
            <FaCheck
              className={canScore ? "opacity-50 group-hover:opacity-100" : ""}
            />{" "}
            BENAR (1)
          </button>
          <button
            onClick={() => handleNext(0)}
            disabled={!canScore}
            className={`group p-6 border-2 rounded-[28px] font-black text-base flex items-center justify-center gap-2 transition-all active:scale-95 ${canScore ? "bg-white border-gray-100 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 shadow-sm cursor-pointer" : "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"}`}
          >
            <FaTimes
              className={canScore ? "opacity-50 group-hover:opacity-100" : ""}
            />{" "}
            SALAH (0)
          </button>
        </div>

        {/* Nav strip — above progress bar */}
        <button
          onClick={() => setShowPanel(true)}
          className="w-full flex items-center gap-2 py-2.5 px-4 bg-gray-50 rounded-2xl group hover:bg-gray-100 transition-all"
          title="Lihat semua soal"
        >
          <div className="flex gap-[3px] items-center flex-1 overflow-hidden">
            {QUESTIONS.map((_, idx) => {
              const score = scores[idx];
              const isActive = idx === currentQ;
              if (isActive)
                return (
                  <div
                    key={idx}
                    className="w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-primary/30 shrink-0"
                    style={{ transform: "scale(1.15)" }}
                  />
                );
              if (score === 1)
                return (
                  <div
                    key={idx}
                    className="w-2 h-2 rounded-full bg-green-400 shrink-0"
                  />
                );
              if (score === 0)
                return (
                  <div
                    key={idx}
                    className="w-2 h-2 rounded-full bg-red-400 shrink-0"
                  />
                );
              return (
                <div
                  key={idx}
                  className="w-2 h-2 rounded-full bg-gray-200 shrink-0"
                />
              );
            })}
          </div>
          <span className="text-[10px] font-black text-gray-400 group-hover:text-primary transition-colors shrink-0">
            {scores.filter((s) => s !== null).length}/{QUESTIONS.length} ↗
          </span>
        </button>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-[10px] font-black text-gray-400 mb-2 uppercase tracking-[0.2em]">
            <span>Progres</span>
            <span>
              {currentQ + 1} / {QUESTIONS.length}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${color.bar} transition-all duration-700 ease-out`}
              style={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
