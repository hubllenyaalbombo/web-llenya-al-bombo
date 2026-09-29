"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type LegalModalType = "privacy" | "cookies" | "legal" | null;

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export default function LegalModal({ type, onClose }: LegalModalProps) {
  if (!type) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-negro/85 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full max-w-2xl max-h-[85vh] bg-[#141416] border border-blanco/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 text-blanco"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-blanco/10 bg-negro/50">
            <h3 className="font-heading comic-stroke text-lg sm:text-xl text-blanco uppercase tracking-wide">
              {type === "privacy" && "Política de Privacidad y RGPD"}
              {type === "cookies" && "Política de Cookies"}
              {type === "legal" && "Aviso Legal"}
            </h3>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-blanco/5 hover:bg-rojo text-blanco/70 hover:text-blanco flex items-center justify-center transition-colors"
              aria-label="Cerrar modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-sm sm:text-base text-gris-light leading-relaxed">
            {type === "privacy" && (
              <>
                <p>
                  En cumplimiento del <strong>Reglamento General de Protección de Datos (RGPD UE 2016/679)</strong> y de la <strong>LOPDGDD 3/2018</strong>, te informamos sobre el tratamiento de tus datos:
                </p>
                <div className="p-4 bg-negro rounded-xl border border-blanco/5 space-y-2 text-xs sm:text-sm">
                  <p><strong>Responsable:</strong> Xaranga Llenya al Bombo.</p>
                  <p><strong>Finalidad:</strong> Gestionar la solicitud de información y elaboración de presupuesto para la contratación de la charanga, así como comunicaciones relacionadas con el evento.</p>
                  <p><strong>Legitimación:</strong> Tu consentimiento expreso al enviar el formulario de contacto.</p>
                  <p><strong>Destinatarios:</strong> No se cederán datos a terceros salvo obligación legal. Los envíos del formulario se gestionan mediante conexión cifrada.</p>
                  <p><strong>Conservación:</strong> Los datos se conservarán durante el tiempo necesario para la gestión del servicio o hasta que solicites su supresión.</p>
                  <p><strong>Derechos:</strong> Tienes derecho a acceder, rectificar y suprimir tus datos, así como otros derechos enviando un email a <a href="mailto:xarangallenyaalbombo@gmail.com" className="text-rojo hover:underline">xarangallenyaalbombo@gmail.com</a>.</p>
                </div>
              </>
            )}

            {type === "cookies" && (
              <>
                <p>
                  Este sitio web utiliza cookies técnicas y estrictamente necesarias para el correcto funcionamiento de la navegación y la seguridad de las peticiones.
                </p>
                <div className="space-y-3 text-xs sm:text-sm">
                  <p>
                    <strong>¿Qué cookies usamos?</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Cookies técnicas:</strong> Necesarias para recordar tus preferencias de navegación y garantizar la seguridad del sitio web.</li>
                    <li><strong>Servicios de terceros:</strong> Al reproducir vídeos incrustados de YouTube o interactuar con el mapa, estos proveedores pueden emplear sus propias cookies conforme a sus políticas de privacidad correspondientes.</li>
                  </ul>
                  <p>
                    Puedes configurar o deshabilitar las cookies en cualquier momento a través de los ajustes de tu navegador web.
                  </p>
                </div>
              </>
            )}

            {type === "legal" && (
              <>
                <p>
                  <strong>Identificación:</strong> Llenya al Bombo es una formación musical y charanga profesional con sede en Onda (Castellón, España).
                </p>
                <p>
                  <strong>Contacto:</strong> xarangallenyaalbombo@gmail.com | Teléfono: +34 696 27 94 08.
                </p>
                <p>
                  <strong>Propiedad Intelectual:</strong> Todos los contenidos, audios, fotos, logos y material gráfico exhibidos en este sitio web son propiedad de Llenya al Bombo o cuentan con las autorizaciones pertinentes. Queda prohibida su reproducción sin autorización previa.
                </p>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-blanco/10 bg-negro/50 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-rojo hover:bg-rojo-dark text-blanco font-heading comic-stroke uppercase tracking-wider text-xs sm:text-sm rounded-full transition-colors"
            >
              Entendido
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
