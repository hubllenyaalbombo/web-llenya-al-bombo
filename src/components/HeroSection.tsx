"use client";

import { useEffect } from "react";
import RevealOnScroll from "./ui/RevealOnScroll";

export default function HeroSection() {

  // Siempre arranca al inicio al recargar
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center bg-transparent pt-16 md:pt-0"
      aria-label="Presentación de Llenya al Bombo"
    >
      {/* ═══════ Background — video FIJO (parallax cover effect) ═══════ */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-negro">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero-poster.webp"
          className="w-full h-full object-cover object-[50%_35%] md:object-center opacity-85 transition-opacity duration-700"
        >
          <source src="/Hero.webm" type="video/webm" />
          <source src="/Hero.mp4" type="video/mp4" />
        </video>
        {/* Overlay oscuro y viñeteado cinematográfico (mayor contraste en móvil) */}
        <div className="absolute inset-0 bg-negro/40 md:bg-negro/50 backdrop-blur-[1px] md:backdrop-blur-[2px] transform-gpu will-change-transform" />
        {/* Degradado superior para la barra de navegación y degradado inferior hacia la siguiente sección */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-negro via-negro/70 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-negro via-negro/80 to-transparent pointer-events-none" />
      </div>

      {/* ═══════ Contenido principal ═══════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">

        <RevealOnScroll delay={0.15}>
          <h1 className="font-heading comic-stroke text-[clamp(2.75rem,13vw,13rem)] leading-[0.9] text-blanco-pure uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            LLENYA <br />
            <span className="text-rojo drop-shadow-[0_0_20px_rgba(225,6,0,0.3)]">AL BOMBO</span>
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={0.5}>
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
            <a
              href="#contacto"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 md:px-16 md:py-6 bg-rojo text-blanco-pure font-heading comic-stroke font-bold uppercase tracking-widest text-base sm:text-xl md:text-2xl shape-blob shadow-xl shadow-rojo/30 hover:bg-rojo-dark hover:shadow-rojo/50 active:scale-[0.97] transition-all duration-300"
            >
              <span className="relative z-10 comic-stroke">Contactar ahora</span>
              <div className="absolute inset-0 bg-blanco/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 shape-blob pointer-events-none" />
            </a>
          </div>
        </RevealOnScroll>
      </div>

    </section>
  );
}
