"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MUSICIANS from "@/lib/musicians";

/* ─────────── Animation variants ─────────── */
const imageVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.97,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.97,
  }),
};

const infoVariants = {
  enter: (dir: number) => ({ y: dir > 0 ? 24 : -24, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (dir: number) => ({ y: dir > 0 ? -24 : 24, opacity: 0 }),
};

interface TeamModalProps {
  onClose: () => void;
}

const GraffitiBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-100">
    {/* SVG Filter for rough brush/graffiti effect */}
    <svg width="0" height="0" className="absolute">
      <defs>
        <filter id="brush-texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>

    {/* Gran franja roja poligonal (estilo montaña/cinta gruesa) - AHORA ABAJO */}
    <svg className="absolute bottom-[0%] -left-[5%] w-[110%] h-[40%] text-rojo opacity-85" viewBox="0 0 1000 300" preserveAspectRatio="none">
      <path d="M 0,150 L 250,100 L 450,220 L 700,50 L 1000,120 L 1000,300 L 700,250 L 450,300 L 250,180 L 0,300 Z" fill="currentColor" filter="url(#brush-texture)" />
    </svg>

    {/* Pincelada Roja 1 (Arriba) */}
    <svg className="absolute -top-[5%] -left-[10%] w-[120%] h-[40%] text-rojo transform -rotate-6 opacity-70" viewBox="0 0 400 100" preserveAspectRatio="none">
      <path d="M -20,50 Q 100,20 200,50 T 420,50" fill="none" stroke="currentColor" strokeWidth="20" strokeLinecap="round" filter="url(#brush-texture)" />
    </svg>

    {/* Pincelada Blanca (Atraviesa todo de lado a lado, AHORA AL CENTRO) */}
    <svg className="absolute top-[15%] -left-[10%] w-[120%] h-[50%] text-blanco opacity-80 transform rotate-3" viewBox="0 0 400 100" preserveAspectRatio="none">
      <path d="M -20,50 Q 150,90 200,50 T 420,60" fill="none" stroke="currentColor" strokeWidth="25" strokeLinecap="round" filter="url(#brush-texture)" />
    </svg>

    {/* Salpicaduras / Gotas Blancas (Más irregulares y distribuidas) */}
    <div className="absolute inset-0 text-blanco opacity-80 pointer-events-none" style={{ filter: 'url(#brush-texture)' }}>
      {/* Zona Derecha */}
      <div className="absolute top-[15%] right-[20%] w-6 h-10 rounded-[40%_60%_70%_30%] bg-current transform rotate-12"></div>
      <div className="absolute top-[20%] right-[12%] w-4 h-4 rounded-full bg-current"></div>
      <div className="absolute top-[25%] right-[25%] w-12 h-8 rounded-[30%_70%_70%_30%] bg-current transform -rotate-12"></div>
      <div className="absolute top-[35%] right-[10%] w-5 h-7 rounded-[60%_40%_30%_70%] bg-current"></div>
      <div className="absolute top-[40%] right-[18%] w-3 h-3 rounded-full bg-current"></div>
      <div className="absolute top-[10%] right-[5%] w-14 h-6 rounded-[80%_20%_50%_50%] bg-current transform rotate-45"></div>
      <div className="absolute top-[50%] right-[25%] w-2 h-4 rounded-full bg-current transform -rotate-12"></div>
      
      {/* Zona Izquierda */}
      <div className="absolute bottom-[30%] left-[15%] w-8 h-8 rounded-[50%_50%_20%_80%] bg-current transform rotate-45"></div>
      <div className="absolute bottom-[25%] left-[8%] w-4 h-5 rounded-full bg-current"></div>
      <div className="absolute bottom-[35%] left-[22%] w-3 h-3 rounded-full bg-current"></div>
      <div className="absolute bottom-[50%] left-[10%] w-10 h-16 rounded-[40%_60%_70%_30%] bg-current transform rotate-6"></div>
      <div className="absolute bottom-[60%] left-[5%] w-5 h-5 rounded-full bg-current"></div>
      <div className="absolute bottom-[40%] left-[2%] w-6 h-12 rounded-[70%_30%_30%_70%] bg-current transform -rotate-12"></div>

      {/* Zona Centro Arriba */}
      <div className="absolute top-[5%] left-[45%] w-6 h-6 rounded-[30%_70%_70%_30%] bg-current transform rotate-12"></div>
      <div className="absolute top-[8%] left-[50%] w-3 h-3 rounded-full bg-current"></div>
    </div>

    {/* Salpicaduras / Gotas Rojas (Más irregulares y distribuidas) */}
    <div className="absolute inset-0 text-rojo opacity-80 pointer-events-none" style={{ filter: 'url(#brush-texture)' }}>
      {/* Zona Centro / Abajo Izquierda */}
      <div className="absolute bottom-[25%] left-[30%] w-10 h-14 rounded-[70%_30%_30%_70%] bg-current transform -rotate-12"></div>
      <div className="absolute bottom-[20%] left-[25%] w-5 h-5 rounded-full bg-current"></div>
      <div className="absolute bottom-[15%] left-[40%] w-16 h-10 rounded-[30%_70%_70%_30%] bg-current transform rotate-6"></div>
      <div className="absolute bottom-[35%] left-[35%] w-6 h-8 rounded-[40%_60%_70%_30%] bg-current"></div>
      <div className="absolute bottom-[10%] left-[28%] w-4 h-4 rounded-full bg-current"></div>
      <div className="absolute bottom-[5%] left-[50%] w-12 h-6 rounded-[80%_20%_50%_50%] bg-current transform -rotate-6"></div>
      <div className="absolute bottom-[12%] left-[55%] w-3 h-3 rounded-full bg-current"></div>

      {/* Zona Arriba Izquierda */}
      <div className="absolute top-[15%] left-[20%] w-12 h-6 rounded-[80%_20%_50%_50%] bg-current transform rotate-45"></div>
      <div className="absolute top-[10%] left-[30%] w-5 h-5 rounded-full bg-current"></div>
      <div className="absolute top-[22%] left-[15%] w-3 h-4 rounded-full bg-current"></div>
      <div className="absolute top-[5%] left-[10%] w-16 h-16 rounded-[40%_60%_30%_70%] bg-current transform rotate-12"></div>
      <div className="absolute top-[28%] left-[25%] w-2 h-2 rounded-full bg-current"></div>

      {/* Zona Centro Derecha */}
      <div className="absolute top-[60%] right-[30%] w-8 h-12 rounded-[70%_30%_30%_70%] bg-current transform rotate-12"></div>
      <div className="absolute top-[50%] right-[20%] w-4 h-6 rounded-full bg-current"></div>
      <div className="absolute top-[65%] right-[15%] w-14 h-10 rounded-[30%_70%_70%_30%] bg-current transform -rotate-12"></div>
      <div className="absolute top-[75%] right-[25%] w-5 h-5 rounded-full bg-current"></div>
    </div>
  </div>
);

export default function TeamModal({ onClose }: TeamModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const musician = MUSICIANS[activeIndex];
  const total = MUSICIANS.length;

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  /* ─── Keyboard nav ─── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); goNext(); }
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); goPrev(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev, onClose]);

  /* ─── Lock body scroll & dispatch modal event ─── */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
    window.dispatchEvent(new CustomEvent("modal-state-change", { detail: { open: true } }));
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
      window.dispatchEvent(new CustomEvent("modal-state-change", { detail: { open: false } }));
    };
  }, []);

  /* ─── Touch / swipe ─── */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) goNext(); else goPrev();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-6 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-negro/90 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <motion.div
        className="relative z-10 w-full max-w-[1300px] h-full max-h-[92vh] bg-negro overflow-hidden flex flex-col rounded-3xl sm:rounded-[3rem] border border-blanco/10 shadow-[0_0_80px_rgba(0,0,0,0.8)]"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="dialog"
        aria-modal="true"
        aria-labelledby="team-modal-heading"
      >
        {/* Static Background Pattern (Does not animate on slide change) */}
        <GraffitiBackground />

        {/* ─── Dynamic background per musician ─── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${activeIndex}`}
            className="absolute inset-0 z-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse 70% 60% at 30% 50%, hsla(${musician.bgHue}, 70%, 15%, 0.22) 0%, transparent 70%)`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
              <span
                className="font-heading comic-stroke text-[20rem] sm:text-[28rem] lg:text-[32rem] text-blanco uppercase leading-none select-none"
                aria-hidden="true"
              >
                {musician.instrumentTag.charAt(0)}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={onClose}
          className="absolute top-4 sm:top-6 right-4 sm:right-6 z-30 flex items-center gap-2 group transition-all duration-300 bg-negro/30 backdrop-blur-md rounded-full sm:bg-transparent sm:backdrop-blur-none p-1 sm:p-0"
          aria-label="Cerrar"
        >
          <span className="font-heading comic-stroke text-xl text-blanco uppercase tracking-widest group-hover:text-rojo transition-colors duration-300 hidden sm:block">CERRAR</span>
          <div className="w-12 h-12 flex items-center justify-center bg-blanco/10 group-hover:bg-rojo rounded-full transition-colors duration-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blanco" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </button>

        {/* ─── Main content area ─── */}
        <div className="relative z-10 flex-1 flex items-center min-h-0 overflow-hidden px-4 sm:px-6">

          {/* LEFT ARROW */}
          <div className="shrink-0 z-20">
            <button
              onClick={goPrev}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-blanco/5 border border-blanco/10 hover:border-rojo hover:bg-rojo/10 transition-all duration-300 group"
              aria-label="Músico anterior"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blanco/60 group-hover:text-rojo transition-colors" aria-hidden="true">
                <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* INNER CONTENT - CENTRALIZED LAYOUT */}
          <div className="flex-1 h-full px-2 sm:px-8 py-2 sm:py-4 flex items-center justify-center min-w-0 relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`musician-${activeIndex}`}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative w-full h-full max-w-5xl flex flex-col items-center justify-center sm:justify-end pb-4 sm:pb-12"
              >
                {/* Photo in normal flow so the whole block can center on mobile */}
                <div className="relative w-full flex-1 flex items-center sm:items-end justify-center pointer-events-none min-h-0">
                  <img
                    src={musician.photo}
                    alt={`${musician.name} — ${musician.instrument}`}
                    className="w-full h-full object-contain object-center sm:object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] lg:[transform:var(--desktop-transform,none)] transition-transform duration-500"
                    style={{ '--desktop-transform': musician.desktopTransform || 'none' } as React.CSSProperties}
                    loading="eager"
                  />
                </div>

                {/* Overlaid Info */}
                <div className="relative z-10 w-full text-center flex flex-col items-center px-4 shrink-0 -mt-24 sm:-mt-28 lg:-mt-32">
                  
                  {/* Instrument Badge */}
                  <div className="mb-3 sm:mb-4">
                    <span className="bg-rojo/90 backdrop-blur-sm text-blanco px-4 sm:px-5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase shadow-xl border border-blanco/20">
                      {musician.instrument}
                    </span>
                  </div>

                  {/* Name (Huge) */}
                  <h2
                    id="team-modal-heading"
                    className="font-heading comic-stroke text-[2.8rem] sm:text-7xl md:text-[5.5rem] lg:text-[7rem] text-blanco uppercase leading-[0.9] tracking-wide drop-shadow-2xl mb-4 sm:mb-6"
                    style={{ wordSpacing: '100vw' }} /* Forces each word on a new line if it's too wide, or just lets it wrap naturally */
                  >
                    {musician.name}
                  </h2>
                  
                  {/* Bio */}
                  <p className="text-blanco/90 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto font-medium drop-shadow-md bg-negro/60 backdrop-blur-md p-4 sm:p-5 rounded-[2rem] border border-blanco/10">
                    {musician.bio}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT ARROW */}
          <div className="shrink-0 z-20">
            <button
              onClick={goNext}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-blanco/5 border border-blanco/10 hover:border-rojo hover:bg-rojo/10 transition-all duration-300 group"
              aria-label="Músico siguiente"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blanco/60 group-hover:text-rojo transition-colors" aria-hidden="true">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
