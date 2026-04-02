"use client";
import { useState } from "react";
import { FaArrowRight, FaArrowLeft, FaCheck, FaUserAlt, FaCalendarAlt, FaMars, FaVenus, FaClipboardList } from "react-icons/fa";
import MMSEResultCard from "./MMSEResultCard";

const QUESTIONS = [
  { id: 1, cat: "ORIENTASI",  sub: "Waktu",       q: "Sebutkan Hari, Tanggal, Bulan, Tahun, dan Musim saat ini.",        points: 5 },
  { id: 2, cat: "ORIENTASI",  sub: "Tempat",      q: "Sebutkan Negara, Kota, Tempat , dan Ruangan saat ini.",  points: 5 },
  { id: 3, cat: "REGISTRASI", sub: "Memori",      q: "Mengulang 3 kata yang disebutkan pemeriksa.",                              points: 3 },
  { id: 4, cat: "KALKULASI",  sub: "Atensi",      q: "Menghitung mundur (misalnya 100 dikurangi 7 berturut-turut)atau mengeja kata secara terbalik.",             points: 5 },
  { id: 5, cat: "MENGINGAT",  sub: "Recall",      q: "Mengingat kembali 3 kata sebelumnya.",             points: 3 },
  { id: 6, cat: "BAHASA",     sub: "Penamaan",    q: "Menyebutkan Nama Benda .",                       points: 2 },
  { id: 7, cat: "BAHASA",     sub: "Repetisi",    q: "Mengulang Kalimat.",                   points: 1 },
  { id: 8, cat: "BAHASA",     sub: "3 Langkah",   q: "Perintah 3 Langkah ",                   points: 3 },
  { id: 9, cat: "BAHASA",     sub: "Visual",      q: "Menyalin gambar atau Merangkai Kata",                                  points: 1 },
  { id: 10, cat: "BAHASA",    sub: "Menulis",     q: "Menulis Kalimat",                                   points: 1 },
  { id: 11, cat: "BAHASA",    sub: "Konstruksi",  q: "Menyalin gambar atau Merangkai Kata.",                                       points: 1 },
];

// Warna per kategori — hanya label & badge yang berwarna
const CAT_STYLE = {
  ORIENTASI:  { label: "text-blue-500",    badge: "bg-blue-50 text-blue-500 border-blue-200" },
  REGISTRASI: { label: "text-violet-500",  badge: "bg-violet-50 text-violet-500 border-violet-200" },
  KALKULASI:  { label: "text-amber-500",   badge: "bg-amber-50 text-amber-600 border-amber-200" },
  MENGINGAT:  { label: "text-rose-500",    badge: "bg-rose-50 text-rose-500 border-rose-200" },
  BAHASA:     { label: "text-emerald-600", badge: "bg-emerald-50 text-emerald-600 border-emerald-200" },
};

// State tombol navigasi
const NAV_BTN = {
  idle:   "bg-gray-100 text-gray-400",
  done:   "bg-green-500 text-white",
  active: "bg-blue-500 text-white ring-2 ring-blue-300",
};

// Grupkan soal berdasarkan kategori (urut kemunculan pertama)
const SECTIONS = QUESTIONS.reduce((acc, q, idx) => {
  const existing = acc.find((s) => s.cat === q.cat);
  if (existing) {
    existing.indices.push(idx);
  } else {
    acc.push({ cat: q.cat, indices: [idx] });
  }
  return acc;
}, []);


function NavPanel({ responses, currentQ, setCurrentQ, totalDone }) {
  const [open, setOpen] = useState(false);
  const activeStyle = CAT_STYLE[QUESTIONS[currentQ].cat];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all">
      {/* ── Header / toggle bar ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3.5 py-2.5 gap-3 hover:bg-gray-50 transition-colors"
      >
        {/* Kiri: mini dot-strip progres — grayscale */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex gap-[3px] shrink-0">
            {QUESTIONS.map((_, idx) => {
              const isDone = responses[idx].score !== null && responses[idx].answer;
              const isActive = currentQ === idx;
              return (
                <span
                  key={idx}
                  className={`block h-2 rounded-full transition-all ${
                    isActive ? "w-3.5 bg-gray-900"
                    : isDone ? "w-2 bg-gray-400"
                    : "w-2 bg-gray-150"
                  }`}
                  style={!isActive && !isDone ? { backgroundColor: "#e5e7eb" } : {}}
                />
              );
            })}
          </div>
          <span className="text-[11px] text-gray-400 font-medium shrink-0">
            {totalDone}/{QUESTIONS.length} selesai
          </span>
        </div>

        {/* Kanan: badge kategori aktif + chevron */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeStyle.badge} border`}>
            {QUESTIONS[currentQ].cat}
          </span>
          <svg
            className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* ── Panel soal (pop in/out) ── */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-3.5 pb-3 pt-1 space-y-2.5 border-t border-gray-100">
          {SECTIONS.map((section) => {
            const s = CAT_STYLE[section.cat];
            return (
              <div key={section.cat}>
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${s.label}`}>
                  {section.cat}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {section.indices.map((idx) => {
                    const isDone = responses[idx].score !== null && responses[idx].answer;
                    const isActive = currentQ === idx;
                    const btnClass = isActive ? NAV_BTN.active : isDone ? NAV_BTN.done : NAV_BTN.idle;
                    return (
                      <button
                        key={idx}
                        onClick={() => { setCurrentQ(idx); setOpen(false); }}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all shrink-0 ${btnClass}`}
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
      </div>
    </div>
  );
}

export default function MMSEWizard({ onComplete }) {
  const [step, setStep] = useState("selectType");
  const [testType, setTestType] = useState("");
  const [currentQ, setCurrentQ] = useState(0);
  const [userData, setUserData] = useState({ nama: "", usia: "", gender: "" });
  const [responses, setResponses] = useState(
    QUESTIONS.map(() => ({ answer: "", score: null })),
  );

  const currentRes = responses[currentQ];
  const isCurrentStepValid = currentRes?.answer.trim().length > 2 && currentRes?.score !== null;

  const updateResponse = (field, value) => {
    const newResponses = [...responses];
    newResponses[currentQ][field] = value;
    setResponses(newResponses);
  };

  const handleSelectType = (type) => {
    setTestType(type);
    setStep("start");
  };

  // --- STEP 0: PILIH JENIS TES ---
  if (step === "selectType")
    return (
      <div className="p-4 sm:p-6 flex flex-col gap-6 animate-in fade-in duration-500">
        <div className="flex flex-col items-center gap-1.5 text-center pt-2">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-1">
            <FaClipboardList size={20} />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Pilih jenis tes</h2>
          <p className="text-sm text-gray-400">Tentukan tahap pengkajian saat ini</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => handleSelectType("Pre-test")}
            className="group flex items-center gap-4 sm:flex-col sm:items-start p-4 sm:p-5 bg-white border border-blue-100 hover:border-blue-300 rounded-2xl transition-all active:scale-[0.97] text-left"
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center text-blue-400 group-hover:bg-blue-100 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Pre-test</p>
              <p className="text-xs text-gray-400 mt-0.5">Sebelum intervensi</p>
            </div>
          </button>

          <button
            onClick={() => handleSelectType("Post-test")}
            className="group flex items-center gap-4 sm:flex-col sm:items-start p-4 sm:p-5 bg-white border border-green-100 hover:border-green-300 rounded-2xl transition-all active:scale-[0.97] text-left"
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-green-50 flex items-center justify-center text-green-500 group-hover:bg-green-100 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Post-test</p>
              <p className="text-xs text-gray-400 mt-0.5">Setelah intervensi</p>
            </div>
          </button>
        </div>
      </div>
    );

  // --- STEP 1: RESPONDEN ---
  if (step === "start")
    return (
      <div className="p-4 sm:p-6 space-y-5 animate-in fade-in duration-500">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-1">
            <FaUserAlt size={18} />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Data Responden ({testType})</h2>
          <p className="text-xs sm:text-sm text-gray-400">Lengkapi identitas responden sebelum memulai pengkajian</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Nama lengkap</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-300">
                <FaUserAlt size={13} />
              </div>
              <input
                type="text"
                placeholder="Contoh: Budi Santoso"
                className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-blue-400 focus:bg-white transition-all"
                onChange={(e) => setUserData({ ...userData, nama: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Usia (tahun)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-300">
                  <FaCalendarAlt size={13} />
                </div>
                <input
                  type="number"
                  placeholder="65"
                  min="1"
                  max="120"
                  className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-blue-400 focus:bg-white transition-all"
                  onInput={(e) => { if (e.target.value.length > 3) e.target.value = e.target.value.slice(0, 3); }}
                  onChange={(e) => setUserData({ ...userData, usia: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Jenis kelamin</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setUserData({ ...userData, gender: "Laki-Laki" })}
                  className={`h-11 flex items-center justify-center gap-2 rounded-xl border text-sm font-medium transition-all ${
                    userData.gender === "Laki-Laki" ? "border-blue-400 bg-blue-50 text-blue-600" : "border-gray-200 bg-gray-50 text-gray-400 hover:border-gray-300"
                  }`}
                >
                  <FaMars size={13} /> Pria
                </button>
                <button
                  type="button"
                  onClick={() => setUserData({ ...userData, gender: "Perempuan" })}
                  className={`h-11 flex items-center justify-center gap-2 rounded-xl border text-sm font-medium transition-all ${
                    userData.gender === "Perempuan" ? "border-pink-400 bg-pink-50 text-pink-600" : "border-gray-200 bg-gray-50 text-gray-400 hover:border-gray-300"
                  }`}
                >
                  <FaVenus size={13} /> Wanita
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          disabled={!userData.nama || !userData.usia || !userData.gender}
          onClick={() => setStep("test")}
          className="w-full h-12 bg-primary text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
        >
          Mulai pengkajian <FaArrowRight size={13} />
        </button>
      </div>
    );

  // --- STEP 2: TEST ---
  if (step === "test") {
    const q = QUESTIONS[currentQ];
    const style = CAT_STYLE[q.cat];
    const totalDone = responses.filter((r) => r.score !== null && r.answer).length;

    return (
      <div className="p-4 sm:p-6 space-y-3">

        {/* ── Navigasi soal — collapsible ── */}
        <NavPanel
          responses={responses}
          currentQ={currentQ}
          setCurrentQ={setCurrentQ}
          totalDone={totalDone}
        />

        {/* ── Kartu soal ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">

          {/* Badge kategori + sub */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wide ${style.badge}`}>
              {q.cat}
            </span>
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{q.sub}</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-gray-800 leading-snug">{q.q}</h3>

          {/* Jawaban */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Jawaban Responden:</label>
              {currentRes.answer.length < 3 && (
                <span className="text-[10px] text-red-400 font-bold italic">Wajib diisi*</span>
              )}
            </div>
            <textarea
              rows="2"
              placeholder="Ketik jawaban responden..."
              className={`w-full p-3 rounded-xl border-2 outline-none text-sm transition-all resize-none ${
                currentRes.answer.length > 2 ? "border-green-200 bg-white" : "border-gray-100 bg-white"
              }`}
              value={currentRes.answer}
              onChange={(e) => updateResponse("answer", e.target.value)}
            />
          </div>

          {/* Skor */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Skor (0 – {q.points}):</label>
              {currentRes.score === null && (
                <span className="text-[10px] text-red-400 font-bold italic">Pilih skor*</span>
              )}
            </div>
            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: `repeat(${q.points + 1}, minmax(0, 1fr))` }}
            >
              {[...Array(q.points + 1)].map((_, i) => {
                const isSelected = currentRes.score === i;
                return (
                  <button
                    key={i}
                    onClick={() => updateResponse("score", i)}
                    className={`py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                      isSelected
                        ? "bg-blue-500 border-blue-500 text-white shadow-md"
                        : "border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-600"
                    }`}
                  >
                    {i}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Navigasi prev/next ── */}
        <div className="flex gap-3">
          <button
            disabled={currentQ === 0}
            onClick={() => setCurrentQ((prev) => prev - 1)}
            className="flex-1 h-12 bg-gray-100 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-30 text-gray-500 transition-all active:scale-[0.98]"
          >
            <FaArrowLeft size={13} /> Kembali
          </button>

          {currentQ === QUESTIONS.length - 1 ? (
            <button
              disabled={!isCurrentStepValid || responses.some((r) => r.score === null)}
              onClick={() => setStep("result")}
              className="flex-1 h-12 bg-green-600 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:bg-gray-100 disabled:text-gray-300 transition-all active:scale-[0.98]"
            >
              Selesai <FaCheck size={13} />
            </button>
          ) : (
            <button
              disabled={!isCurrentStepValid}
              onClick={() => setCurrentQ((prev) => prev + 1)}
              className="flex-1 h-12 bg-primary text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:bg-gray-100 disabled:text-gray-300 transition-all active:scale-[0.98]"
            >
              Lanjut <FaArrowRight size={13} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // --- STEP 3: RESULT ---
  if (step === "result") {
    const totalScore = responses.reduce((acc, curr) => acc + (curr.score || 0), 0);

    return (
      <MMSEResultCard
        testType={testType}
        userData={userData}
        responses={responses}
        totalScore={totalScore}
        onSave={(data) => onComplete?.(data)}
        onRestart={() => window.location.reload()}
      />
    );
  }
}