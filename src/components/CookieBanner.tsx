"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CookieBannerProps {
  onOpenCookiesPolicy: () => void;
}

export default function CookieBanner({ onOpenCookiesPolicy }: CookieBannerProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already accepted or configured cookies
    const consent = localStorage.getItem("llenya_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("llenya_cookie_consent", "accepted");
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem("llenya_cookie_consent", "declined");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-20 xl:bottom-6 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 bg-[#16161a]/95 backdrop-blur-md border border-blanco/15 p-5 rounded-2xl shadow-2xl text-blanco"
          role="region"
          aria-label="Aviso de cookies"
        >
          <div className="flex items-start gap-3 mb-3">
            <span className="text-xl">🍪</span>
            <div>
              <h4 className="font-heading comic-stroke text-sm uppercase tracking-wider text-blanco">
                Uso de Cookies
              </h4>
              <p className="text-xs text-gris mt-1 leading-relaxed">
                Utilizamos cookies técnicas para garantizar el correcto funcionamiento del sitio. Puedes leer nuestra{" "}
                <button
                  type="button"
                  onClick={onOpenCookiesPolicy}
                  className="text-rojo underline hover:text-rojo-light"
                >
                  política de cookies
                </button>
                .
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 mt-3 pt-2 border-t border-blanco/5">
            <button
              type="button"
              onClick={handleDecline}
              className="px-3.5 py-1.5 text-xs text-gris hover:text-blanco border border-blanco/10 rounded-lg hover:bg-blanco/5 transition-colors font-medium"
            >
              Rechazar
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="px-4 py-1.5 text-xs bg-rojo hover:bg-rojo-dark text-blanco font-heading comic-stroke uppercase tracking-wider rounded-lg transition-colors font-bold shadow-md shadow-rojo/20"
            >
              Aceptar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
