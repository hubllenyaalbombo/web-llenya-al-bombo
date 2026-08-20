"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MUSICIANS from "@/lib/musicians";

/* ─────────── Animation variants ─────────── */
const imageVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.95,
  }),
};

const infoVariants = {
  enter: (dir: number) => ({
    y: dir > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    y: dir > 0 ? -30 : 30,
    opacity: 0,
  }),
};

export default function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);

  const musician = MUSICIANS[activeIndex];
  const total = MUSICIANS.length;

  /* ─── Navigate ─── */
  const goTo = useCallback(
    (index: number, dir?: number) => {
      if (index === activeIndex) return;
      setDirection(dir ?? (index > activeIndex ? 1 : -1));
      setActiveIndex(index);
    },
    [activeIndex]
  );

  const goNext = useCallback(() => {
    const next = (activeIndex + 1) % total;
    setDirection(1);
    setActiveIndex(next);
  }, [activeIndex, total]);

  const goPrev = useCallback(() => {
    const prev = (activeIndex - 1 + total) % total;
    setDirection(-1);
    setActiveIndex(prev);
  }, [activeIndex, total]);

  /* ─── Keyboard nav ─── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Only respond when section is somewhat in view
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
      if (!inView) return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  /* ─── Touch / swipe ─── */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    // Only trigger if horizontal swipe > 50px and mostly horizontal
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) goNext();
      else goPrev();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="la-plantilla"
      className="relative min-h-screen bg-negro overflow-hidden flex flex-col"
      aria-labelledby="team-heading"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ─── Subtle dynamic background ─── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${activeIndex}`}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Radial glow — shifts hue per musician */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 70% 60% at 30% 50%, hsla(${musician.bgHue}, 70%, 15%, 0.25) 0%, transparent 70%)`,
            }}
          />
          {/* Instrument silhouette watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <span
              className="font-heading comic-stroke text-[20rem] sm:text-[28rem] lg:text-[36rem] text-blanco uppercase leading-none select-none"
              aria-hidden="true"
            >
              {musician.instrumentTag.charAt(0)}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ─── Grid pattern ─── */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ═══════ Top bar ═══════ */}
      <div className="relative z-10 pt-24 md:pt-28 pb-4 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div>
            <span className="text-rojo text-xs font-semibold uppercase tracking-[0.25em]">
              La plantilla
            </span>
            <h2 id="team-heading" className="font-heading comic-stroke text-2xl sm:text-3xl text-blanco uppercase tracking-wide">
              Conoce a la plantilla
            </h2>
          </div>

          {/* Progress counter */}
          <div className="flex items-center gap-3">
            <span className="font-heading comic-stroke text-3xl sm:text-4xl text-blanco tabular-nums">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-gris-dark text-lg">/</span>
            <span className="font-heading comic-stroke text-lg text-gris-dark tabular-nums">
              {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* ═══════ Main content ═══════ */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center">

            {/* ─── Main zone ─── */}
            <div className="lg:col-span-7 xl:col-span-7 relative flex justify-center lg:justify-end items-center gap-4 md:gap-8">
              
              {/* Nav arrows — Left */}
              <button
                onClick={goPrev}
                className="z-20 w-12 h-12 sm:w-14 sm:h-14 flex shrink-0 items-center justify-center rounded-full border border-blanco/10 bg-negro/50 backdrop-blur-sm text-blanco/60 hover:text-blanco hover:border-rojo/50 hover:bg-rojo/10 transition-all duration-300 active:scale-90"
                aria-label="Músico anterior"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Musician image */}
              <div className="relative w-[220px] sm:w-[280px] md:w-[340px] lg:w-[420px] xl:w-[460px] shrink-0">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`img-${activeIndex}`}
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative aspect-[2/3] overflow-hidden rounded-sm"
                  >
                    {/* PLACEHOLDER: sustituir por foto real del músico */}
                    <img
                      src={musician.photo}
                      alt={`${musician.name} — ${musician.instrument} de Llenya al Bombo`}
                      className="w-full h-full object-cover"
                      loading="eager"
                      width={600}
                      height={900}
                    />
                    {/* Bottom gradient fade */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-negro/80 to-transparent pointer-events-none" />
                    {/* Left edge red glow */}
                    <div className="absolute inset-y-0 left-0 w-1 bg-rojo/60" />
                  </motion.div>
                </AnimatePresence>

                {/* Decorative frame corner */}
                <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-rojo/40 rounded-br-sm pointer-events-none" />
              </div>

              {/* Nav arrows — Right */}
              <button
                onClick={goNext}
                className="z-20 w-12 h-12 sm:w-14 sm:h-14 flex shrink-0 items-center justify-center rounded-full border border-blanco/10 bg-negro/50 backdrop-blur-sm text-blanco/60 hover:text-blanco hover:border-rojo/50 hover:bg-rojo/10 transition-all duration-300 active:scale-90"
                aria-label="Músico siguiente"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

            </div>

            {/* ─── Info zone ─── */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center lg:pl-6">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`info-${activeIndex}`}
                  custom={direction}
                  variants={infoVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Instrument badge */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-rojo border border-rojo/40 bg-rojo/5 rounded-sm">
                      {musician.instrumentTag}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="font-heading comic-stroke text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-blanco uppercase leading-[0.85] mb-5">
                    {musician.name.split(" ").map((word, i) => (
                      <span key={i} className="block">
                        {word}
                      </span>
                    ))}
                  </h3>

                  {/* Instrument label */}
                  <p className="text-gris text-sm uppercase tracking-[0.15em] font-medium mb-5">
                    {musician.instrument}
                  </p>

                  {/* Divider */}
                  <div className="w-12 h-[2px] bg-rojo mb-5" />

                  {/* Bio */}
                  <p className="text-gris-light text-sm sm:text-base leading-relaxed max-w-md">
                    {/* PLACEHOLDER: sustituir por bio real */}
                    {musician.bio}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ Bottom thumbnail strip ═══════ */}
      <div className="relative z-10 py-6 md:py-8 px-5 sm:px-8 lg:px-12">
        {/* Top separator */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-negro-lighter to-transparent" />

        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {MUSICIANS.map((m, index) => (
              <button
                key={m.id}
                onClick={() => goTo(index)}
                className={`relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-sm overflow-hidden transition-all duration-300 ${
                  index === activeIndex
                    ? "ring-2 ring-rojo ring-offset-2 ring-offset-negro scale-110 z-10"
                    : "opacity-50 hover:opacity-80 grayscale hover:grayscale-0"
                }`}
                aria-label={`Ver a ${m.name} — ${m.instrument}`}
                aria-current={index === activeIndex ? "true" : undefined}
              >
                {/* PLACEHOLDER: sustituir por foto real del músico */}
                <img
                  src={m.photo}
                  alt={m.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={64}
                  height={64}
                />
                {/* Active overlay glow */}
                {index === activeIndex && (
                  <motion.div
                    className="absolute inset-0 border border-rojo/50"
                    layoutId="thumb-highlight"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Keyboard hint (desktop only) ─── */}
      <div className="hidden lg:flex absolute bottom-6 right-12 z-10 items-center gap-2 text-gris-dark text-[11px] uppercase tracking-[0.15em]">
        <kbd className="inline-flex items-center justify-center w-6 h-6 rounded-sm border border-negro-lighter bg-negro-light text-gris text-[10px]">
          ←
        </kbd>
        <kbd className="inline-flex items-center justify-center w-6 h-6 rounded-sm border border-negro-lighter bg-negro-light text-gris text-[10px]">
          →
        </kbd>
        <span className="ml-1">navegar</span>
      </div>
    </section>
  );
}
