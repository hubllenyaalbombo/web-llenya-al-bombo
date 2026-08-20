"use client";

import { motion } from "framer-motion";

const MARQUEE_ITEMS = [
  "PASACALLES",
  "BODAS",
  "CARNAVALES",
  "FIESTAS POPULARES",
  "CUMPLEAÑOS",
  "PROCESIONES",
  "DESPEDIDAS",
  "EVENTOS CORPORATIVOS",
  "FESTIVALES",
  "VERBENAS",
];

function MarqueeTrack() {
  return (
    <div className="flex items-center gap-0 shrink-0">
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={i} className="flex items-center shrink-0">
          <span className="text-blanco/40 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] whitespace-nowrap px-4 sm:px-6">
            {item}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-rojo shrink-0" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div
      className="relative overflow-hidden py-4 sm:py-5 bg-negro border-y border-blanco/[0.06]"
      aria-hidden="true"
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-negro to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-negro to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {/* Duplicate track for seamless loop */}
        <MarqueeTrack />
        <MarqueeTrack />
      </motion.div>
    </div>
  );
}
