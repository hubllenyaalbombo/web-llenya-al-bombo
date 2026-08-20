"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import RevealOnScroll from "./ui/RevealOnScroll";
import GALLERY, { MediaItem } from "@/lib/gallery";

type FilterType = "all" | "photo" | "video";

export default function GallerySection() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and notify components when lightbox is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
      window.dispatchEvent(new CustomEvent("modal-state-change", { detail: { open: true } }));
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
      window.dispatchEvent(new CustomEvent("modal-state-change", { detail: { open: false } }));
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
      window.dispatchEvent(new CustomEvent("modal-state-change", { detail: { open: false } }));
    };
  }, [selectedItem]);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === "Escape") {
        setSelectedItem(null);
      } else if (e.key === "ArrowRight") {
        const currentIdx = GALLERY.findIndex((m) => m.id === selectedItem.id);
        const nextIdx = (currentIdx + 1) % GALLERY.length;
        setSelectedItem(GALLERY[nextIdx]);
      } else if (e.key === "ArrowLeft") {
        const currentIdx = GALLERY.findIndex((m) => m.id === selectedItem.id);
        const prevIdx = (currentIdx - 1 + GALLERY.length) % GALLERY.length;
        setSelectedItem(GALLERY[prevIdx]);
      }
    },
    [selectedItem]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Filter items
  const filteredItems = GALLERY.filter((item) => filter === "all" || item.type === filter);

  return (
    <section
      id="galeria"
      className="relative py-20 md:py-32 bg-negro-light"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:pl-[220px] xl:pr-8">
        
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div>
            <RevealOnScroll>
              <span className="inline-block text-rojo text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] mb-4">
                Galería
              </span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2
                id="gallery-heading"
                className="font-heading comic-stroke text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] text-blanco uppercase leading-[0.9]"
              >
                Viviendo el directo
              </h2>
            </RevealOnScroll>
          </div>

          {/* Tabs */}
          <RevealOnScroll delay={0.2} direction="left">
            <div className="flex flex-nowrap items-center gap-2">
              {[
                { id: "all", label: "Todo" },
                { id: "photo", label: "Fotos" },
                { id: "video", label: "Vídeos" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as FilterType)}
                  className={`px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm uppercase tracking-wider font-heading comic-stroke rounded-full transition-all duration-300 ${
                    filter === tab.id
                      ? "bg-rojo text-blanco-pure shadow-lg shadow-rojo/30 hover:bg-rojo-dark"
                      : "bg-negro-lighter text-gris hover:text-blanco hover:bg-negro-light border border-blanco/10"
                  }`}
                  aria-pressed={filter === tab.id}
                >
                  <span className="relative z-10 comic-stroke">{tab.label}</span>
                </button>
              ))}
            </div>
          </RevealOnScroll>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] sm:auto-rows-[220px] md:auto-rows-[260px] gap-3 sm:gap-5">
          <AnimatePresence>
            {filteredItems.map((item, index) => {
              const spanClasses = item.spanClasses || (
                index === 0
                  ? "col-span-2 row-span-2"
                  : index === 3
                  ? "col-span-2 row-span-1"
                  : "col-span-1 row-span-1"
              );

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className={`${spanClasses}`}
                >
                  <div
                    className="group relative w-full h-full cursor-pointer overflow-hidden rounded-3xl bg-negro-light border border-blanco/5 hover:border-rojo/40 transition-all duration-500 shadow-xl shadow-black/30 hover:shadow-rojo/20 hover:-translate-y-1 hover:-translate-x-1"
                    onClick={() => setSelectedItem(item)}
                    data-cursor-hover
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.alt}
                      loading="lazy"
                      className={`absolute inset-0 w-full h-full object-cover ${item.objectPosition || "object-center"} transition-transform duration-700 group-hover:scale-[1.06]`}
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-negro/80 via-negro/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    
                    {/* Badge for Videos */}
                    {item.type === "video" && (
                      <>
                        <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 px-3 py-1 bg-rojo text-blanco-pure text-[11px] sm:text-xs font-heading comic-stroke uppercase tracking-wider rounded-full shadow-lg shadow-rojo/30">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                          <span>Vídeo</span>
                        </div>

                        {/* Centered Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rojo text-blanco-pure flex items-center justify-center backdrop-blur-sm shadow-2xl shadow-rojo/50 transition-all duration-300 group-hover:scale-115 group-hover:bg-rojo-dark">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="ml-1 w-6 h-6 sm:w-7 sm:h-7">
                              <path d="M8 5v14l11-7L8 5z" />
                            </svg>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Red subtle corner accent */}
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-rojo rounded-full opacity-0 scale-50 transition-all duration-500 group-hover:opacity-40 group-hover:scale-100 blur-xl pointer-events-none" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

      {/* ═══════════════════════════════════════════
          LIGHTBOX MODAL (Rendered in Portal)
          ═══════════════════════════════════════════ */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-negro/95 backdrop-blur-xl p-4 sm:p-8"
              onClick={() => setSelectedItem(null)}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 flex items-center justify-center rounded-full bg-negro border border-blanco/10 text-blanco/60 hover:text-blanco hover:bg-rojo hover:border-rojo transition-all duration-300 z-50 shadow-xl"
                onClick={() => setSelectedItem(null)}
                aria-label="Cerrar galería"
                data-cursor-hover
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Prev Button */}
              <button
                className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-negro border border-blanco/10 text-blanco/60 hover:text-blanco hover:bg-rojo hover:border-rojo transition-all duration-300 z-50 shadow-xl"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIdx = GALLERY.findIndex((m) => m.id === selectedItem.id);
                  const prevIdx = (currentIdx - 1 + GALLERY.length) % GALLERY.length;
                  setSelectedItem(GALLERY[prevIdx]);
                }}
                aria-label="Anterior"
                data-cursor-hover
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-negro border border-blanco/10 text-blanco/60 hover:text-blanco hover:bg-rojo hover:border-rojo transition-all duration-300 z-50 shadow-xl"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIdx = GALLERY.findIndex((m) => m.id === selectedItem.id);
                  const nextIdx = (currentIdx + 1) % GALLERY.length;
                  setSelectedItem(GALLERY[nextIdx]);
                }}
                aria-label="Siguiente"
                data-cursor-hover
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              {/* Content Container */}
              <div
                className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedItem.id}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center"
                  >
                    {selectedItem.type === "photo" ? (
                      <img
                        src={selectedItem.source}
                        alt={selectedItem.alt}
                        className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain rounded-2xl border border-blanco/15 shadow-2xl shadow-black"
                      />
                    ) : (
                      <div className="relative w-[90vw] max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-blanco/15 shadow-2xl shadow-black">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${selectedItem.source}?${selectedItem.startTime ? `start=${selectedItem.startTime}&` : ""}&autoplay=1&rel=0&modestbranding=1`}
                          title={selectedItem.alt}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}

                    {/* YouTube Direct Link (Only for videos, centered without text subtitle) */}
                    {selectedItem.type === "video" && selectedItem.youtubeUrl && (
                      <div className="mt-4 flex justify-center w-full">
                        <a
                          href={selectedItem.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-2.5 bg-rojo hover:bg-rojo-dark text-blanco-pure font-heading comic-stroke uppercase tracking-wider text-xs sm:text-sm rounded-full shadow-lg shadow-rojo/30 hover:scale-105 transition-all duration-300"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                          <span>Ver en YouTube</span>
                          <span>↗</span>
                        </a>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
