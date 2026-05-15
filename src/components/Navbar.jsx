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
    if (!id) window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-neutral-100 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col items-start leading-none"
          >
            <span
              style={{ fontFamily: "var(--font-display)" }}
              className={`font-bold text-2xl tracking-tighter transition-colors duration-300 ${scrolled ? "text-neutral-900" : "text-white"}`}
            >
              STIMUNO<span style={{ color: "#5B4BDB" }}>.</span>
            </span>
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className={`text-[8px] uppercase tracking-[0.3em] font-medium transition-colors duration-300 ${scrolled ? "text-neutral-400" : "text-white/50"}`}
            >
              Kesehatan Kognitif
            </span>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-10">
            {menu.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.id)}
                style={{ fontFamily: "var(--font-mono)" }}
                className={`text-[10px] tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer relative group/item ${scrolled ? "text-neutral-600 hover:text-[#5B4BDB]" : "text-white/80 hover:text-[#a78bfa]"}`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#5B4BDB] transition-all duration-300 group-hover/item:w-full" />
              </button>
            ))}
            <button
              onClick={() => scrollTo("cta")}
              className="text-white px-7 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
              style={{
                background: "#5B4BDB",
                boxShadow: "0 0 0 rgba(91,75,219,0)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#7c6fea";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(91,75,219,0.35)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#5B4BDB";
                e.currentTarget.style.boxShadow = "0 0 0 rgba(91,75,219,0)";
              }}
            >
              Mulai
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1 z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block w-6 h-[1.5px] transition-all duration-300 ${scrolled ? "bg-neutral-800" : "bg-white"} ${
                  i === 0 && menuOpen ? "rotate-45 translate-y-2" :
                  i === 1 && menuOpen ? "opacity-0" :
                  i === 2 && menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 backdrop-blur-xl transition-all duration-500 md:hidden flex flex-col justify-center items-center gap-8 px-8 text-center ${
          menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
        style={{ background: "#1A162E" }}
      >
        {menu.map((item, index) => (
          <button
            key={item.name}
            onClick={() => scrollTo(item.id)}
            style={{
              fontFamily: "var(--font-display)",
              transitionDelay: `${index * 50}ms`,
            }}
            className={`text-5xl font-bold text-white transition-all duration-300 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            onMouseEnter={e => (e.currentTarget.style.color = "#a78bfa")}
            onMouseLeave={e => (e.currentTarget.style.color = "white")}
          >
            {item.name}
          </button>
        ))}
        <button
          onClick={() => {
            document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
            setMenuOpen(false);
          }}
          className="mt-6 text-white w-full max-w-xs py-4 rounded-full font-bold text-sm tracking-widest uppercase"
          style={{ background: "#5B4BDB" }}
        >
          Mulai Sekarang
        </button>
      </div>
    </>
  );
}