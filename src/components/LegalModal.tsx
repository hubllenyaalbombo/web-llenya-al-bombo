"use client";

import { motion, AnimatePresence } from "framer-motion";

export type LegalModalType = "privacy" | "cookies" | "legal" | "terms" | null;

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export default function LegalModal({ type, onClose }: LegalModalProps) {
  if (!type) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8">
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
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-blanco/10 bg-negro/60">
            <h3 className="font-heading comic-stroke text-base sm:text-xl text-blanco uppercase tracking-wide">
              {type === "privacy" && "Política de Privacidad y RGPD"}
              {type === "cookies" && "Política de Cookies"}
              {type === "legal" && "Aviso Legal"}
              {type === "terms" && "Condiciones de Contratación"}
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
          <div className="p-5 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-gris-light leading-relaxed">
            {type === "privacy" && (
              <>
                <p>
                  En cumplimiento del <strong>Reglamento General de Protección de Datos (RGPD UE 2016/679)</strong> y de la <strong>Ley Orgánica 3/2018 (LOPDGDD)</strong> de Protección de Datos Personales y garantía de los derechos digitales, te informamos detalladamente:
                </p>
                <div className="p-4 bg-negro rounded-xl border border-blanco/10 space-y-2.5">
                  <p><strong>1. Responsable del tratamiento:</strong> Xaranga Llenya al Bombo.</p>
                  <p><strong>2. Contacto del Delegado / Gestión:</strong> Correo electrónico: <a href="mailto:xarangallenyaalbombo@gmail.com" className="text-rojo hover:underline">xarangallenyaalbombo@gmail.com</a> | Teléfono: +34 696 27 94 08 | Sede: Onda (Castellón, España).</p>
                  <p><strong>3. Finalidad del tratamiento:</strong> Atender las consultas recibidas, elaborar propuestas personalizadas de presupuesto para eventos musicales y coordinar la logística de contratación.</p>
                  <p><strong>4. Legitimación:</strong> El consentimiento expreso e inequívoco del usuario al enviar voluntariamente sus datos a través del formulario de contacto.</p>
                  <p><strong>5. Conservación de los datos:</strong> Los datos se conservarán durante el tiempo imprescindible para responder a tu solicitud y, en caso de contratación, durante los plazos legales aplicables.</p>
                  <p><strong>6. Destinatarios:</strong> No se cederán datos a terceros ajenos a la prestación del servicio ni se realizarán transferencias internacionales salvo requerimiento judicial o legal.</p>
                  <p><strong>7. Derechos ARSOPOL:</strong> Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad enviando un correo a <a href="mailto:xarangallenyaalbombo@gmail.com" className="text-rojo hover:underline">xarangallenyaalbombo@gmail.com</a> adjuntando acreditación de tu identidad.</p>
                  <p><strong>8. Autoridad de control:</strong> Si consideras vulnerados tus derechos, puedes presentar reclamación ante la Agencia Española de Protección de Datos (AEPD - <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-rojo hover:underline">www.aepd.es</a>).</p>
                </div>
              </>
            )}

            {type === "cookies" && (
              <>
                <p>
                  De conformidad con la Ley 34/2002 (LSSI-CE), te informamos de que este sitio web emplea cookies técnicas esenciales para la navegación y componentes externos:
                </p>
                <div className="space-y-3">
                  <div className="p-4 bg-negro rounded-xl border border-blanco/10 space-y-2">
                    <p><strong>Cookies técnicas necesarias:</strong> Guardan tus preferencias de sesión y la aceptación del banner de cookies (almacenamiento local del navegador).</p>
                    <p><strong>Cookies de terceros:</strong> El reproductor de vídeo integrado (YouTube / Google) puede establecer cookies propias para recordar reproducciones de vídeo. Se cargan únicamente si interactúas con los vídeos.</p>
                  </div>
                  <p>
                    Puedes bloquear o eliminar las cookies instaladas en tu equipo configurando las opciones de tu navegador (Chrome, Safari, Firefox, Edge).
                  </p>
                </div>
              </>
            )}

            {type === "legal" && (
              <>
                <div className="space-y-3">
                  <p>
                    <strong>1. Datos identificativos:</strong> El dominio <span className="text-blanco">llenyaalbombo.com</span> y su contenido son titularidad de la formación artística <strong>Llenya al Bombo</strong>, con sede en Onda (Castellón, España). Email: xarangallenyaalbombo@gmail.com.
                  </p>
                  <p>
                    <strong>2. Condiciones de uso:</strong> El acceso a este sitio web otorga la condición de usuario, quien se compromete a hacer un uso lícito y diligente de los contenidos y servicios ofrecidos.
                  </p>
                  <p>
                    <strong>3. Propiedad intelectual e industrial:</strong> Todos los textos, arreglos musicales, logotipos, imágenes y fotografías mostradas son propiedad exclusiva de Llenya al Bombo o cuentan con las debidas licencias de uso. Queda prohibida su reproducción sin consentimiento expreso por escrito.
                  </p>
                  <p>
                    <strong>4. Exclusión de garantías y responsabilidad:</strong> Llenya al Bombo no se hace responsable de posibles interrupciones en el servicio por causas ajenas o mantenimiento técnico de la red.
                  </p>
                </div>
              </>
            )}

            {type === "terms" && (
              <>
                <div className="space-y-3">
                  <p>
                    <strong>1. Presupuestos:</strong> Todos los presupuestos emitidos a través de la web son informativos y sin compromiso, sujetos a disponibilidad de agenda y confirmación mutua de fechas.
                  </p>
                  <p>
                    <strong>2. Reserva de fecha:</strong> La reserva definitiva del evento se formaliza tras la confirmación formal por ambas partes y las condiciones acordadas para la actuación.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 sm:px-6 py-3.5 sm:py-4 border-t border-blanco/10 bg-negro/60 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-rojo hover:bg-rojo-dark text-blanco font-heading comic-stroke uppercase tracking-wider text-xs sm:text-sm rounded-full transition-colors"
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
