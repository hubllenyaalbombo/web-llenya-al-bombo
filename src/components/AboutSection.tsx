"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RevealOnScroll from "./ui/RevealOnScroll";
import TeamModal from "./TeamModal";
import ImageComparisonSlider from "./ImageComparisonSlider";
import { VALUES_CARDS } from "@/lib/constants";

/* SVG icons for value cards */
const VALUE_ICONS: Record<string, React.ReactNode> = {
  energy: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  music: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  people: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  clock: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
};

/* Milestone data with geometric SVG icons instead of emojis */
const MILESTONES = [
  {
    id: "comienzo",
    year: "2007",
    title: "Comienzo",
    icon: "//",
    photos: [
      "/Historia/2007 (1).png",
      "/Historia/2007(2).png"
    ],
    body: "En Onda (Castellón) empezamos nuestra andadura en el mundo de la música y la animación. Fue el nacimiento de una charanga diferente.",
  },
  {
    id: "consolidacion",
    year: "2010-2019",
    title: "Consolidación",
    icon: "//",
    photos: [
      "/Historia/2015(1).png",
      "/Historia/2015(2).png",
      "/Historia/2015(3).png",
      "/Historia/2015(4).jpeg"
    ],
    body: "Nos consolidamos como charanga de referencia, sumando kilómetros por toda la geografía y afianzando nuestro estilo inconfundible.",
  },
  {
    id: "15-aniversario",
    year: "2022",
    title: "15 Aniversario",
    icon: "//",
    photos: [
      "https://picsum.photos/seed/llenya-2022-1/800/500",
      "https://picsum.photos/seed/llenya-2022-2/800/500",
      "https://picsum.photos/seed/llenya-2022-3/800/500"
    ],
    body: "Celebramos 15 años de locura ininterrumpida. Quince años reventando plazas y repartiendo buena vibra allá donde nos llamaban.",
  },
  {
    id: "rebranding",
    year: "2024",
    title: "Rebranding\ny Reestructuración",
    icon: "//",
    photos: [
      "https://picsum.photos/seed/llenya-2024-1/800/500",
      "https://picsum.photos/seed/llenya-2024-2/800/500"
    ],
    body: "Dimos un salto de calidad profesional: nueva imagen, nuevos arreglos musicales y una actitud más gamberra y batalladora que nunca.",
  },
  {
    id: "actualidad",
    year: "Actualidad",
    title: "Hoy",
    icon: "//",
    photos: [
      "https://picsum.photos/seed/llenya-hoy-1/800/500",
      "https://picsum.photos/seed/llenya-hoy-2/800/500",
      "https://picsum.photos/seed/llenya-hoy-3/800/500"
    ],
    body: "Fallas, carnavales, festivales y todo lo que se nos ponga por delante. Seguimos siendo puro nervio en la calle. ¡Hay Llenya para rato!",
  },
] as const;

type MilestoneId = typeof MILESTONES[number]["id"];

/* Configuración individual por imagen para adaptar encuadre, zoom y posición sin cortar cabezas ni dejar bordes vacíos */
const HISTORIA_PHOTO_CONFIGS: Record<string, string> = {
  // Comienzo 2007 (1): Imagen con grupo de personas. Se posiciona en el 15% superior para mostrar cabezas completas sin recortar
  "/Historia/2007 (1).png": "object-cover object-[50%_15%] scale-100",
  // Comienzo 2007 (2): Mostrar la imagen completa sin zoom excesivo para ver a todos los integrantes y caras
  "/Historia/2007(2).png": "object-contain object-center scale-100",
  // Consolidación 2015 (1): Llenar 100% el cuadro centrado
  "/Historia/2015(1).png": "object-cover object-center scale-100",
  // Consolidación 2015 (2): Llenar 100% el cuadro sin huecos negros ni marcos
  "/Historia/2015(2).png": "object-cover object-[50%_35%] scale-100",
  // Consolidación 2015 (3): Llenar 100% el cuadro
  "/Historia/2015(3).png": "object-cover object-center scale-100",
  // Consolidación 2015 (4): Llenar 100% el cuadro
  "/Historia/2015(4).jpeg": "object-cover object-center scale-100",
  // 2026.jpeg
  "/Historia/2026.jpeg": "object-cover object-center scale-100",
};

function getPhotoClass(photoPath: string): string {
  return HISTORIA_PHOTO_CONFIGS[photoPath] || "object-cover object-center scale-100";
}

/* Interactive Photo Carousel for Milestones */
function MilestoneCarousel({ photos, alt, milestoneId, className = "" }: { photos: readonly string[], alt: string, milestoneId?: string, className?: string }) {
  const [index, setIndex] = useState(0);

  // Reset index when milestone changes
  useEffect(() => { setIndex(0); }, [photos]);

  if (!photos || photos.length === 0) return null;

  const currentPhoto = photos[index];
  const photoClass = getPhotoClass(currentPhoto);

  if (photos.length === 1) {
    return (
      <div className={`absolute inset-0 w-full h-full group ${className}`}>
        <img
          src={photos[0]}
          alt={alt}
          className={`absolute inset-0 w-full h-full transition-all duration-300 ${getPhotoClass(photos[0])}`}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 w-full h-full group ${className}`}>
      <img
        src={currentPhoto}
        alt={`${alt} - ${index + 1}`}
        className={`absolute inset-0 w-full h-full transition-all duration-300 ${photoClass}`}
        loading="lazy"
      />

      {/* Navigation Controls */}
      <button
        onClick={(e) => { e.stopPropagation(); setIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1)); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-negro/50 backdrop-blur-sm flex items-center justify-center text-blanco hover:bg-rojo transition-colors opacity-0 group-hover:opacity-100 z-10"
        aria-label="Foto anterior"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); setIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1)); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-negro/50 backdrop-blur-sm flex items-center justify-center text-blanco hover:bg-rojo transition-colors opacity-0 group-hover:opacity-100 z-10"
        aria-label="Siguiente foto"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setIndex(i); }}
            className={`w-2 h-2 rounded-full transition-all duration-300 shadow-sm ${i === index ? 'bg-rojo scale-125' : 'bg-blanco/50 hover:bg-blanco'}`}
            aria-label={`Ir a foto ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}



/* SVG curved path — shifted down 30px for breathing room at the top */
const PATH_D = "M 60,330 C 150,330 190,180 270,180 C 350,180 400,360 490,360 C 580,360 630,120 710,120 C 790,120 850,310 930,310";

const STOP_POSITIONS = [
  { x: 60, y: 330 },   // valley
  { x: 270, y: 180 },   // peak
  { x: 490, y: 360 },   // valley
  { x: 710, y: 120 },   // HIGH peak
  { x: 930, y: 310 },   // valley
];

/* Treasure Map Component */
function TreasureMap({ activeId, onSelect }: { activeId: MilestoneId | null; onSelect: (id: MilestoneId) => void }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLen, setPathLen] = useState(0);

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  const activeIndex = activeId ? MILESTONES.findIndex((m) => m.id === activeId) : -1;

  return (
    <div className="relative w-full select-none">
      <svg
        /* viewBox expanded significantly on sides to prevent ACTUALIDAD from clipping */
        viewBox="-100 0 1180 480"
        className="w-full"
        aria-hidden="true"
      >
        {/* Dashed trail background */}
        <path d={PATH_D} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" strokeDasharray="16 12" strokeLinecap="round" />

        {/* Animated progressive path GLOW */}
        {pathLen > 0 && (
          <motion.path
            d={PATH_D}
            fill="none"
            stroke="var(--color-rojo)"
            strokeWidth="12"
            strokeLinecap="round"
            className="blur-[4px] opacity-50"
            strokeDasharray={pathLen}
            initial={{ strokeDashoffset: pathLen }}
            animate={{ strokeDashoffset: activeIndex === -1 ? pathLen : pathLen - (pathLen * activeIndex) / (MILESTONES.length - 1) }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        )}

        {/* Animated progressive path */}
        {pathLen > 0 && (
          <motion.path
            d={PATH_D}
            fill="none"
            stroke="var(--color-rojo)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={pathLen}
            initial={{ strokeDashoffset: pathLen }}
            animate={{ strokeDashoffset: activeIndex === -1 ? pathLen : pathLen - (pathLen * activeIndex) / (MILESTONES.length - 1) }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        )}

        {/* Hidden path for measurement */}
        <path ref={pathRef} d={PATH_D} fill="none" stroke="none" />

        {/* STOPS */}
        {MILESTONES.map((m, i) => {
          const sp = STOP_POSITIONS[i];
          const isPeak = sp.y < 220;
          // Separar más las bolas del trazo (34px en lugar de 20px)
          const dotY = isPeak ? sp.y + 34 : sp.y - 34;
          const isActive = m.id === activeId;
          const isPassed = activeIndex !== -1 && i <= activeIndex;

          const titleLines = m.title.split('\n');

          /* Year is ALWAYS above the title */
          const lineY1 = isPeak ? sp.y - 6 : sp.y + 6;
          /* Dinámicamente alargamos la línea en los picos para que roce el texto igual que en 2024 */
          const lineY2 = isPeak ? sp.y - 48 + (titleLines.length - 1) * 18 : sp.y + 30;
          const yearY = isPeak ? sp.y - 85 : sp.y + 65;
          const titleY = isPeak ? sp.y - 55 : sp.y + 90;

          return (
            <motion.g key={m.id} onClick={() => onSelect(m.id)} whileHover="hover" style={{ cursor: "pointer" }} data-cursor-hover>
              {/* Hit area */}
              <circle cx={sp.x} cy={dotY} r="35" fill="rgba(0,0,0,0)" style={{ pointerEvents: "all" }} />
              {/* Shadow */}
              <circle cx={sp.x + 2} cy={dotY + 2} r={isActive ? 20 : 14} fill="rgba(0,0,0,0.4)" />
              {/* Main dot */}
              <motion.circle
                cx={sp.x}
                cy={dotY}
                animate={{
                  r: isActive ? 22 : 16,
                  fill: isPassed ? "var(--color-rojo)" : "var(--color-negro)",
                  stroke: isPassed ? "var(--color-rojo)" : "rgba(255,255,255,0.15)",
                  strokeWidth: isPassed ? 0 : 3
                }}
                variants={{
                  hover: { fill: isPassed ? "var(--color-rojo)" : "rgba(255,255,255,0.12)", stroke: "var(--color-rojo)", scale: 1.1 }
                }}
                transition={{ duration: 0.3 }}
              />
              {/* Icon */}
              <text x={sp.x} y={dotY + 5} textAnchor="middle" fontSize="14" className={`font-heading comic-stroke transition-colors duration-300 ${isPassed ? "fill-blanco-pure" : "fill-blanco/30"}`} style={{ pointerEvents: "none", WebkitTextStroke: "1px #000" }}>{m.icon}</text>

              {/* Dashed connector */}
              <motion.line x1={sp.x} y1={lineY1} x2={sp.x} y2={lineY2} animate={{ stroke: isPassed ? "var(--color-rojo)" : "rgba(255,255,255,0.15)" }} strokeWidth="1.5" strokeDasharray="3 2" transition={{ duration: 0.3 }} />

              {/* Year */}
              <text x={sp.x} y={yearY} textAnchor="middle" fontSize="28" className={`tracking-widest transition-colors duration-300 font-heading comic-stroke ${isPassed ? "fill-rojo font-bold" : "fill-blanco"}`}>{m.year}</text>

              {/* Title */}
              <text x={sp.x} y={titleY} textAnchor="middle" fontSize="14" className={`tracking-widest uppercase transition-colors duration-300 font-heading comic-stroke ${isPassed ? "fill-rojo" : "fill-gris"}`}>
                {m.title.split('\n').map((line, li) => (
                  <tspan key={li} x={sp.x} dy={li === 0 ? 0 : 18}>
                    {line}
                  </tspan>
                ))}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

/* Milestone Modal Popup Component */
function MilestoneModal({ activeId, onClose }: { activeId: MilestoneId | null; onClose: () => void }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (activeId) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [activeId]);

  if (!activeId) return null;
  const milestone = MILESTONES.find((m) => m.id === activeId)!;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <motion.div
        className="absolute inset-0 bg-negro/80 backdrop-blur-md cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="relative bg-negro border border-blanco/10 rounded-[2.5rem] w-[95%] max-w-[1050px] max-h-[90vh] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 flex flex-col lg:flex-row group"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 lg:top-6 lg:right-6 z-20 w-12 h-12 bg-negro/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-rojo hover:scale-110 text-blanco transition-all shadow-xl border border-blanco/20"
          aria-label="Cerrar modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        {/* IMAGE AREA - Half width on lg */}
        <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-auto lg:min-h-[400px] xl:min-h-[500px] relative bg-negro shrink-0 overflow-hidden">
          <MilestoneCarousel photos={milestone.photos} alt={milestone.title} milestoneId={milestone.id} className="rounded-t-[2.5rem] lg:rounded-l-[2.5rem] lg:rounded-tr-none" />
        </div>

        {/* TEXT AREA - Half width on lg */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center bg-negro-light overflow-y-auto overflow-x-hidden">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-rojo font-heading comic-stroke text-3xl lg:text-4xl">{milestone.icon}</span>
            <span className="text-rojo font-heading comic-stroke text-2xl lg:text-3xl tracking-widest">{milestone.year}</span>
          </div>
          <h4 className="font-heading comic-stroke text-3xl sm:text-4xl lg:text-4xl xl:text-5xl text-blanco-pure uppercase tracking-wide mb-6 leading-tight break-words">
            {milestone.title}
          </h4>
          <p className="text-gris-light text-base sm:text-lg lg:text-xl leading-relaxed font-medium">
            {milestone.body}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN ABOUTSECTION COMPONENT
───────────────────────────────────────────── */
export default function AboutSection() {
  /* Flag para activar/desactivar 'El camino hasta aquí' (reservada para el 20º Aniversario) */
  const SHOW_TIMELINE_20TH_ANNIVERSARY = false;

  const [teamOpen, setTeamOpen] = useState(false);
  const [activeId, setActiveId] = useState<MilestoneId | null>(null);
  const [modalId, setModalId] = useState<MilestoneId | null>(null);

  return (
    <>
      <section
        id="quienes-somos"
        className="relative bg-negro-light overflow-hidden"
        aria-labelledby="about-heading"
      >
        {/* Glow Effects */}
        <div className="absolute top-0 -left-64 w-[700px] h-[700px] bg-rojo/[0.04] rounded-full blur-[180px] pointer-events-none transform-gpu will-change-transform" />
        <div className="absolute bottom-0 -right-64 w-[600px] h-[600px] bg-rojo/[0.03] rounded-full blur-[160px] pointer-events-none transform-gpu will-change-transform" />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:pl-[250px] xl:pr-12">

          {/* ══════════════════════════
              INTRO
              ══════════════════════════ */}
          <div className="pt-24 md:pt-32 pb-20 md:pb-28">
            {/* COMPACT BENTO GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

              {/* TOP LEFT: Headline (col-span-7) */}
              <div className="lg:col-span-7 bg-negro/40 border border-blanco/5 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-center relative overflow-hidden group shadow-xl">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-rojo/20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none transform-gpu will-change-transform" />

                <RevealOnScroll delay={0.1}>
                  <h2
                    className="font-heading comic-stroke text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] text-blanco uppercase leading-[0.85] tracking-tighter relative z-10"
                    style={{ textShadow: "6px 6px 0px #000000" }}
                  >
                    Música<br />en vena<br />
                    <span className="text-rojo">desde 2007.</span>
                  </h2>
                </RevealOnScroll>
              </div>

              {/* TOP RIGHT: Image (col-span-5) */}
              <div className="lg:col-span-5 relative rounded-[2.5rem] overflow-hidden border border-blanco/5 min-h-[300px] sm:min-h-[350px] group shadow-xl bg-negro">
                <RevealOnScroll delay={0.2} className="w-full h-full">
                  <ImageComparisonSlider
                    beforeImage="/Historia/2007(2).png"
                    afterImage="/Historia/2026.jpeg"
                    beforeAlt="Charanga en 2007"
                    afterAlt="Charanga en 2026"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-negro/80 via-transparent to-transparent pointer-events-none" />
                </RevealOnScroll>
              </div>

              {/* BOTTOM LEFT: Narratives (col-span-5) */}
              <div className="lg:col-span-5 bg-negro/40 backdrop-blur-sm border border-blanco/5 rounded-[2.5rem] p-8 md:p-10 shadow-xl flex flex-col justify-center">
                <RevealOnScroll delay={0.2}>
                  <p className="text-gris-light text-sm md:text-base leading-relaxed mb-5 font-medium">
                    Desde Onda (Castellón) llevamos poniendo ritmo a la calle desde 2007. Lo que empezó
                    como una excusa entre amigos para hacer música, se ha consolidado en más de 15 años
                    de trayectoria profesional, sumando kilómetros, escenarios y grandes momentos.
                  </p>
                </RevealOnScroll>
                <RevealOnScroll delay={0.3}>
                  <p className="text-gris text-sm md:text-base leading-relaxed mb-6 font-medium">
                    Hemos recorrido gran parte del país animando todo tipo de celebraciones: desde fiestas
                    patronales y bodas, hasta eventos multitudinarios como las Fallas o la Vaquilla del Ángel.
                    Contamos con un repertorio versátil y dinámico, siempre dispuesto a adaptarse a lo que pida el público.
                  </p>
                </RevealOnScroll>
                <RevealOnScroll delay={0.4}>
                  <div className="pl-5 border-l-4 border-rojo">
                    <p className="text-blanco text-base md:text-lg leading-relaxed font-bold">
                      Sabemos que cada actuación es única y nos la tomamos muy en serio. Cuidamos cada detalle
                      musical para ofrecer un espectáculo potente, cercano y de máxima calidad.
                    </p>
                  </div>
                </RevealOnScroll>
              </div>

              {/* BOTTOM RIGHT: Compact Values Grid (col-span-7) */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 h-full items-start">
                {VALUES_CARDS.map((card, idx) => (
                  <RevealOnScroll key={card.title} delay={0.2 + idx * 0.1} className="mt-8">
                    <div className="group relative flex flex-col pt-2">

                      {/* Playful Asymmetrical Title */}
                      <div className="absolute -top-5 left-4 sm:left-6 bg-rojo px-4 py-1.5 z-10 shadow-lg shadow-rojo/20 rounded-tl-3xl rounded-br-3xl rounded-tr-sm rounded-bl-sm -rotate-3 group-hover:rotate-0 group-hover:-translate-y-1 transition-all duration-300 w-max max-w-[85%] flex items-center justify-center">
                        <h4 className="font-heading comic-stroke text-lg md:text-xl text-blanco-pure uppercase tracking-wide leading-tight text-center">
                          {card.title}
                        </h4>
                      </div>

                      {/* Main Card Body */}
                      <div className="bg-negro border border-blanco/10 rounded-3xl p-6 sm:p-8 pt-14 hover:border-rojo/40 hover:bg-negro-light transition-all duration-300 shadow-xl group-hover:shadow-rojo/10">
                        <p className="text-blanco/80 text-[15px] leading-relaxed group-hover:text-blanco transition-colors duration-300">
                          {card.description}
                        </p>
                      </div>

                    </div>
                  </RevealOnScroll>
                ))}
              </div>

            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════════
              TREASURE MAP TIMELINE
              (Oculto para el lanzamiento de la web. Reservado para el 20º Aniversario)
              Para reactivar: cambiar SHOW_TIMELINE_20TH_ANNIVERSARY a true
              ════════════════════════════════════════════════════════════════ */}
          {SHOW_TIMELINE_20TH_ANNIVERSARY && (
            <RevealOnScroll>
              <div className="pb-8 md:pb-12">
                <div className="text-center mb-10 md:mb-16">
                  <h3 className="font-heading comic-stroke text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] text-blanco uppercase leading-[0.9]">
                    El camino hasta aqui
                  </h3>
                </div>

                {/* Desktop Map (Hidden on mobile) */}
                <div className="hidden md:block w-full overflow-hidden mb-16">
                  <div className="w-full max-w-[1000px] mx-auto pb-4">
                    <TreasureMap
                      activeId={activeId}
                      onSelect={(id) => {
                        setActiveId(id);
                        setModalId(id);
                      }}
                    />
                  </div>
                </div>

                {/* Mobile Accordion (Hidden on desktop) */}
                <div className="md:hidden space-y-3 mb-12">
                  {MILESTONES.map((m) => (
                    <div
                      key={m.id}
                      className={`border border-negro-lighter rounded-xl overflow-hidden transition-all duration-300 bg-negro hover:border-blanco/20`}
                    >
                      <button
                        onClick={() => {
                          setActiveId(m.id);
                          setModalId(m.id);
                        }}
                        className="w-full px-5 py-4 flex items-center justify-between text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-300 ${activeId === m.id ? "bg-rojo/20 text-rojo" : "bg-negro-lighter text-gris"}`}>
                            <span className="font-heading comic-stroke text-lg">{m.icon}</span>
                          </div>
                          <div>
                            <span className={`block font-heading comic-stroke text-xl uppercase tracking-wider transition-colors duration-300 ${activeId === m.id ? "text-rojo" : "text-blanco"}`}>
                              {m.year}
                            </span>
                            <span className="block text-sm text-gris uppercase tracking-widest mt-0.5">
                              {m.title}
                            </span>
                          </div>
                        </div>
                        <div className="text-gris">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Milestone Modal */}
                <AnimatePresence>
                  {modalId && (
                    <MilestoneModal activeId={modalId} onClose={() => setModalId(null)} />
                  )}
                </AnimatePresence>
              </div>
            </RevealOnScroll>
          )}

          {/* ══════════════════════════
              CTA — Conoce a la plantilla (OCULTO TEMPORALMENTE)
              ══════════════════════════ */}
          {/* 
          <div className="pb-24 md:pb-32 pt-16 md:pt-24 border-t border-blanco/6">
            <RevealOnScroll>
              <div className="flex flex-col items-center justify-center text-center gap-10 max-w-4xl mx-auto">
                <div>
                  <span className="inline-block text-rojo text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] mb-4">
                    La plantilla
                  </span>
                  <h3 className="font-heading comic-stroke text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-blanco uppercase leading-[0.9]">
                    Quieres conocer a quienes hay detras del sonido?
                  </h3>
                </div>

                <button
                  onClick={() => setTeamOpen(true)}
                  id="btn-conoce-plantilla"
                  className="group relative inline-flex items-center justify-center px-5 py-3 md:px-8 md:py-4 bg-rojo text-blanco-pure font-heading comic-stroke font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-base sm:text-xl md:text-2xl rounded-tl-3xl rounded-br-3xl hover:bg-blanco-pure hover:text-rojo border-2 border-rojo hover:border-blanco-pure shadow-[8px_8px_0px_0px_rgba(239,35,60,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_transparent] transition-all duration-300"
                  aria-haspopup="dialog"
                >
                  <span className="relative z-10 comic-stroke">Conoce a la plantilla</span>
                </button>
              </div>
            </RevealOnScroll>
          </div>
          */}

        </div>
      </section>

      {/* Team Modal */}
      <AnimatePresence>
        {teamOpen && <TeamModal onClose={() => setTeamOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
