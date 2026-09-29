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
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 z-[60] bg-negro/40 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu panel - Centered in viewport */}
      <div className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none p-4">
        <motion.div
          id="mobile-menu"
          className="pointer-events-auto bg-negro/95 backdrop-blur-md border border-blanco/10 rounded-3xl flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden origin-center"
          style={{
            /* Width scales: ~75vw on small phones, ~50vw on tablets, max 380px */
            width: "clamp(260px, 65vw, 380px)",
          }}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          {/* Header with Title & Close button */}
          <div className="flex items-center justify-between px-6 pt-5 pb-2 border-b border-blanco/5">
            <span className="font-heading comic-stroke text-sm uppercase tracking-widest text-rojo">
              Menú
            </span>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-blanco/5 flex items-center justify-center text-blanco/80 hover:text-blanco hover:bg-rojo transition-colors"
              aria-label="Cerrar menú"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col py-[clamp(12px,2.5vw,20px)] px-[clamp(12px,2.5vw,20px)]">
          <ul className="space-y-1" role="list">
            {NAV_LINKS.map((link, index) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
              >
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)" }}
                  className="block py-3 px-4 font-heading comic-stroke text-blanco uppercase tracking-widest hover:text-rojo hover:bg-blanco/5 rounded-2xl transition-all duration-300"
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <div className="px-[clamp(12px,2.5vw,20px)] pb-[clamp(12px,2.5vw,20px)]">
          <motion.a
            href="#contacto"
            onClick={handleLinkClick}
            style={{ fontSize: "clamp(0.85rem, 2vw, 1.1rem)" }}
            className="group relative flex items-center justify-center w-full py-4 bg-rojo text-blanco-pure font-heading comic-stroke font-bold uppercase tracking-wider shape-blob shadow-lg shadow-rojo/30 hover:bg-rojo-dark hover:shadow-rojo/50 active:scale-[0.98] transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <span className="relative z-10 comic-stroke">Contacto</span>
          </motion.a>
        </div>
      </motion.div>
      </div>
    </>
  );
}
