"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menu = [
    { name: "Home", id: null },
    { name: "Tentang", id: "tentang" },
    { name: "Materi", id: "materi" },
    { name: "Galeri", id: "galeri" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    if (!id) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
          >
            <span className="w-6 h-px bg-primary transition-all duration-300 group-hover:w-10"></span>
            <span
              style={{ fontFamily: "var(--font-display)" }}
              className={`font-bold text-lg italic tracking-tight transition-colors duration-300 ${scrolled ? "text-dark-gray" : "text-white"}`}
            >
              Kognitif<span className="text-primary not-italic">.Life</span>
            </span>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            {menu.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.id)}
                style={{ fontFamily: "var(--font-mono)" }}
                className={`text-xs tracking-widest uppercase transition-colors duration-300 hover:text-primary cursor-pointer ${
                  scrolled ? "text-gray-500" : "text-white/70"
                }`}
              >
                {item.name}
              </button>
            ))}

            <button
              onClick={() => scrollTo("cta")}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 cursor-pointer"
            >
              Mulai Sekarang
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px transition-all duration-300 ${scrolled ? "bg-dark-gray" : "bg-white"} ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 h-px transition-all duration-300 ${scrolled ? "bg-dark-gray" : "bg-white"} ${menuOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-px transition-all duration-300 ${scrolled ? "bg-dark-gray" : "bg-white"} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 bg-dark-gray transition-opacity duration-400 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col justify-center items-center h-full gap-10">
          {menu.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollTo(item.id)}
              style={{ fontFamily: "var(--font-display)" }}
              className="text-4xl font-bold italic text-white/80 hover:text-primary transition-colors duration-200"
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={() => { window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); setMenuOpen(false); }}
            className="mt-4 bg-primary text-white px-10 py-3.5 rounded-xl font-semibold text-base"
          >
            Mulai Sekarang
          </button>
        </div>
      </div>
    </>
  );
}