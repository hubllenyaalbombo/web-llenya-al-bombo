"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Draggable state
  const [headPos, setHeadPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartTime = useRef(0);
  const dragMoved = useRef(false);
  const constraintsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track if we're on mobile/tablet (< xl / 1280px)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1280);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

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

  // Handle tap vs drag
  const handlePointerDown = () => {
    dragStartTime.current = Date.now();
    dragMoved.current = false;
  };

  const handleDragStart = () => {
    setIsDragging(true);
    dragMoved.current = true;
  };

  const handleDragEnd = (_: any, info: any) => {
    setIsDragging(false);
    setHeadPos({ x: info.point.x, y: info.point.y });
  };

  const handleTap = () => {
    if (!dragMoved.current) {
      setMobileMenuOpen(true);
    }
  };

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

      {/* ═══════ MOBILE & TABLET FLOATING BOAR HEAD (< xl) ═══════ */}
      {/* Invisible drag constraints container */}
      <div
        ref={constraintsRef}
        className="xl:hidden fixed inset-0 z-50 pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        className={`xl:hidden fixed z-50 cursor-grab active:cursor-grabbing touch-none select-none will-change-transform transform-gpu ${
          modalOpen ? "pointer-events-none" : ""
        }`}
        style={{
          /* Scale with viewport: ~22vw on mobile, ~15vw on tablet, clamped */
          width: "clamp(85px, 22vw, 165px)",
          height: "clamp(85px, 22vw, 165px)",
          top: "10px",
          left: "50%",
          x: "-50%",
          touchAction: "none",
        }}
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragMomentum={false}
        onPointerDown={handlePointerDown}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onTap={handleTap}
        whileDrag={{ scale: 1.15 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: modalOpen ? 0 : 1,
          scale: modalOpen ? 0 : 1,
        }}
        transition={{
          opacity: { duration: 0.25 },
          scale: { duration: 0.25 },
        }}
      >
        <div className="w-full h-full flex items-center justify-center pointer-events-none">
          <img
            src="/Cabeza.svg"
            alt="Llenya al Bombo — Abrir menú"
            className="w-full h-full object-contain drop-shadow-[0_6px_16px_rgba(0,0,0,0.65)] pointer-events-none transform-gpu"
            style={{ transform: "scale(3.3)" }}
            draggable={false}
          />
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu onClose={() => setMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
