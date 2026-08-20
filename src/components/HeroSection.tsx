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
      className="relative min-h-[100dvh] flex flex-col items-center justify-center bg-transparent"
      aria-label="Presentación de Llenya al Bombo"
    >
      {/* ═══════ Background — video FIJO (parallax cover effect) ═══════ */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
          src="/Hero.mp4"
        />
        {/* Overlay oscuro suave para legibilidad del texto */}
        <div className="absolute inset-0 bg-negro/50 backdrop-blur-[2px] transform-gpu will-change-transform" />
      </div>

      {/* ═══════ Contenido principal ═══════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 text-center flex flex-col items-center">



        <RevealOnScroll delay={0.15}>
          <h1 className="font-heading comic-stroke text-[clamp(4rem,15vw,14rem)] leading-[0.85] text-blanco-pure uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            LLENYA <br />
            <span className="text-rojo drop-shadow-[0_0_20px_rgba(225,6,0,0.3)]">AL BOMBO</span>
          </h1>
        </RevealOnScroll>



        <RevealOnScroll delay={0.5}>
          <div className="mt-16">
            <a
              href="#contacto"
              className="group relative inline-flex items-center justify-center gap-2 px-10 py-5 md:px-20 md:py-8 bg-rojo text-blanco-pure font-heading comic-stroke font-bold uppercase tracking-widest text-lg md:text-2xl shape-blob shadow-xl shadow-rojo/30 hover:bg-rojo-dark hover:shadow-rojo/50 active:scale-[0.97] transition-all duration-300"
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
