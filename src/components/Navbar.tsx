"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track if any modal / lightbox is open
  useEffect(() => {
    const handleModalChange = (e: any) => {
      setModalOpen(Boolean(e.detail?.open));
    };
    window.addEventListener("modal-state-change", handleModalChange);
    return () => window.removeEventListener("modal-state-change", handleModalChange);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ═══════ DESKTOP SIDEBAR (xl+ / 1280px+) ═══════ */}
      <motion.header
        className={`hidden xl:flex fixed inset-y-0 my-auto left-8 z-50 w-[160px] h-max rounded-[2.5rem] border border-blanco/10 bg-negro/95 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex-col justify-between overflow-hidden transition-all duration-300 ${
          modalOpen ? "opacity-0 pointer-events-none -translate-x-full" : "opacity-100 translate-x-0"
        }`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: modalOpen ? -200 : 0, opacity: modalOpen ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="flex flex-col items-center justify-center w-full py-8">
          <a
            href="#inicio"
            className="flex flex-col items-center gap-3 group translate-y-2 translate-x-[6px]"
            aria-label="Llenya al Bombo — volver al inicio"
          >
            <div className="w-20 h-20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <img src="/Cabeza.svg" alt="Llenya al Bombo Logo" className="w-full h-full object-contain scale-[4]" />
            </div>
          </a>
        </div>

        <nav className="flex flex-col gap-2 px-3 mt-0 items-center" aria-label="Navegación principal">
          <ul className="flex flex-col gap-2 w-full" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="w-full text-center">
                <a
                  href={link.href}
                  className="relative flex items-center justify-center py-4 px-2 text-[14px] sm:text-base font-heading comic-stroke uppercase tracking-widest text-gris hover:text-blanco rounded-3xl hover:bg-blanco/5 transition-all duration-300 group"
                >
                  <span className="relative z-10 block transition-transform duration-300 group-hover:scale-110">
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-5">
          <a
            href="#contacto"
            className="group relative flex items-center justify-center gap-2 w-full py-4 bg-rojo text-blanco-pure font-heading comic-stroke font-bold uppercase tracking-wider text-[14px] shape-blob shadow-lg shadow-rojo/30 hover:bg-rojo-dark hover:shadow-rojo/50 active:scale-[0.98] transition-all duration-300"
          >
            <span className="relative z-10 comic-stroke">Contacto</span>
          </a>
        </div>
      </motion.header>

      {/* ═══════ MOBILE & TABLET TOP BAR (< xl) ═══════ */}
      <div
        className={`xl:hidden fixed top-0 inset-x-0 z-40 px-4 sm:px-6 py-3 sm:py-3.5 transition-all duration-300 ${
          modalOpen ? "opacity-0 pointer-events-none -translate-y-full" : "opacity-100 translate-y-0"
        } ${scrolled ? "bg-negro/90 backdrop-blur-md border-b border-blanco/10 shadow-lg shadow-black/50" : "bg-gradient-to-b from-negro/90 via-negro/40 to-transparent"}`}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto gap-2">
          {/* Logo / Brand Link */}
          <a
            href="#inicio"
            className="flex items-center gap-2.5 sm:gap-3 group min-w-0"
            aria-label="Llenya al Bombo — Inicio"
          >
            <div className="w-11 h-11 sm:w-13 sm:h-13 overflow-hidden flex items-center justify-center shrink-0">
              <img
                src="/Cabeza.svg"
                alt="Llenya Logo"
                className="w-full h-full object-contain scale-[2.3] group-hover:scale-[2.5] transition-transform"
              />
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="font-heading comic-stroke text-[1.32rem] sm:text-3xl text-blanco uppercase tracking-wider leading-[0.88] text-center block">
                Llenya
              </span>
              <span className="font-heading comic-stroke text-[1.16rem] sm:text-2xl text-rojo uppercase tracking-wider leading-[0.88] text-center block mt-0.5">
                al Bombo
              </span>
            </div>
          </a>

          {/* Action & Menu Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <a
              href="#contacto"
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-rojo text-blanco-pure text-[11px] sm:text-xs font-heading comic-stroke uppercase tracking-wider rounded-full shadow-md shadow-rojo/30 hover:bg-rojo-dark active:scale-95 transition-all whitespace-nowrap"
            >
              Presupuesto
            </a>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blanco/10 hover:bg-blanco/20 active:scale-95 flex items-center justify-center text-blanco border border-blanco/15 shadow-md transition-all"
              aria-label="Abrir menú"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="7" x2="20" y2="7"></line>
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="17" x2="20" y2="17"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu onClose={() => setMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
