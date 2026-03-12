"use client";

export default function PdfViewer({ isOpen, onClose, pdfUrl, title }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[110] flex flex-col bg-stone-950/98 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {/* Header Modal */}
      <div className="w-full p-4 flex justify-between items-center border-b border-stone-800 bg-stone-900 relative z-10">
        <div className="flex flex-col ml-4">
          <h4 className="font-bold text-white text-lg">Materi Presentasi: {title}</h4>
          <p className="text-xs text-stone-400 font-mono tracking-widest">DOCUMENT READER ✦ PDF</p>
        </div>
        <button
          onClick={onClose}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-stone-800 text-stone-400 hover:bg-red-500 hover:text-white transition-all active:scale-95"
        >
          ✕
        </button>
      </div>

      {/* Konten PDF */}
      <div className="flex-1 p-2 md:p-6 flex justify-center items-center bg-stone-900/50">
        <div 
          className="w-full h-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-2xl border border-stone-800"
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            src={pdfUrl.replace("/view?usp=sharing", "/preview")}
            className="w-full h-full"
            allow="autoplay"
          ></iframe>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}