"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Backdrop overlay covering full screen — clicking anywhere outside closes menu */}
      <motion.div
        className="fixed inset-0 z-[70] bg-negro/70 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        aria-modal="true"
        role="dialog"
      >
        {/* Menu panel - Centered in viewport, stopPropagation prevents closing when clicking inside */}
        <motion.div
          id="mobile-menu"
          className="cursor-default bg-negro/95 backdrop-blur-md border border-blanco/10 rounded-3xl flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden origin-center"
          style={{
            /* Width scales: ~75vw on small phones, max 380px */
            width: "clamp(270px, 75vw, 380px)",
          }}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          aria-label="Menú de navegación"
        >
          {/* Header with Centered Title (no cross button, clicks outside close it) */}
          <div className="py-5 px-6 border-b border-blanco/10 text-center">
            <span className="font-heading comic-stroke text-3xl sm:text-4xl uppercase tracking-widest text-rojo inline-block">
              Menú
            </span>
          </div>

          {/* Links — Centered */}
          <nav className="flex flex-col py-4 px-4 text-center">
            <ul className="space-y-1.5" role="list">
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.35 }}
                >
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    style={{ fontSize: "clamp(1.1rem, 3.2vw, 1.35rem)" }}
                    className="block py-2.5 px-4 font-heading comic-stroke text-blanco uppercase tracking-widest hover:text-rojo hover:bg-blanco/5 rounded-2xl transition-all duration-300"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* CTA — Centered, narrow & sleek button */}
          <div className="px-6 pb-6 pt-1 flex justify-center">
            <motion.a
              href="#contacto"
              onClick={handleLinkClick}
              className="inline-flex items-center justify-center px-7 py-2 bg-rojo text-blanco-pure font-heading comic-stroke font-bold uppercase tracking-wider text-sm rounded-full shadow-lg shadow-rojo/30 hover:bg-rojo-dark hover:shadow-rojo/50 active:scale-[0.98] transition-all duration-300"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.35 }}
            >
              <span className="relative z-10 comic-stroke">Contacto</span>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
