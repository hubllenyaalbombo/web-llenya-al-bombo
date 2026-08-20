"use client";

import RevealOnScroll from "./ui/RevealOnScroll";
import EVENTS from "@/lib/events";

export default function EventsSection() {
  return (
    <section
      id="eventos"
      className="relative py-16 md:py-24 bg-negro text-blanco overflow-hidden"
      aria-labelledby="events-heading"
    >
      {/* Background ambient subtle glow */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-rojo/[0.03] rounded-full blur-[140px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-0 -right-48 w-96 h-96 bg-rojo/[0.03] rounded-full blur-[140px] pointer-events-none transform-gpu" />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:pl-[250px] xl:pr-12 relative z-10">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <RevealOnScroll>
            <span className="inline-block text-rojo text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] mb-3">
              Formatos de actuación
            </span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2
              id="events-heading"
              className="font-heading comic-stroke text-3xl sm:text-5xl md:text-6xl lg:text-[5rem] text-blanco uppercase leading-[0.9] max-w-4xl mx-auto"
            >
              Para cualquier celebración
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <p className="text-gris text-base sm:text-lg max-w-2xl mx-auto mt-4 font-medium">
              Nos adaptamos a la energía, el repertorio y las necesidades de cada fiesta.
            </p>
          </RevealOnScroll>
        </div>

        {/* Compact Grid of Events */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {EVENTS.map((event, index) => (
            <RevealOnScroll key={event.id} delay={0.08 + index * 0.04}>
              <a
                href={`#contacto?evento=${event.id}`}
                className="group relative flex flex-col justify-between h-full bg-[#121212] border-2 border-blanco/10 hover:border-rojo rounded-[2rem] p-7 transition-all duration-300 shadow-xl shadow-black/40 hover:shadow-[6px_6px_0px_0px_#D73738] hover:-translate-y-1 hover:-translate-x-1 overflow-hidden"
              >
                {/* Background red glow on hover */}
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-rojo/10 rounded-full blur-2xl group-hover:scale-150 group-hover:bg-rojo/25 transition-all duration-500 pointer-events-none" />

                {/* Title & Description */}
                <div className="relative z-10 flex-1">
                  <h3 className="font-heading comic-stroke text-2xl sm:text-3xl text-blanco uppercase leading-tight mb-2 group-hover:text-rojo transition-colors duration-300">
                    {event.title}
                  </h3>
                  <div className="w-8 h-[3px] bg-rojo rounded-full mb-4 group-hover:w-16 transition-all duration-300" />
                  <p className="text-gris text-sm sm:text-[15px] leading-relaxed group-hover:text-blanco/90 transition-colors duration-300 font-medium">
                    {event.description}
                  </p>
                </div>

                {/* Action CTA link at bottom */}
                <div className="mt-6 pt-4 border-t border-blanco/5 flex items-center justify-between relative z-10 text-xs sm:text-sm font-heading comic-stroke uppercase tracking-wider text-gris group-hover:text-rojo transition-colors">
                  <span>Pedir presupuesto</span>
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-negro group-hover:bg-rojo text-gris group-hover:text-blanco-pure transition-all duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </a>
            </RevealOnScroll>
          ))}
        </div>

      </div>
    </section>
  );
}
