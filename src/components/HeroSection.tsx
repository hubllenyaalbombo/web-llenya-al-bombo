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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center">

        <RevealOnScroll delay={0.15}>
          <h1 className="font-heading comic-stroke text-[clamp(3.6rem,16.5vw,15.5rem)] leading-[0.86] text-blanco-pure uppercase tracking-tighter drop-shadow-[0_0_25px_rgba(255,255,255,0.15)] select-none">
            LLENYA <br />
            <span className="text-rojo drop-shadow-[0_0_30px_rgba(225,6,0,0.4)]">AL BOMBO</span>
          </h1>
        </RevealOnScroll>

      </div>

    </section>
  );
}
