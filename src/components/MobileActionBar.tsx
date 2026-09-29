"use client";

import { useEffect, useState } from "react";
import { CONTACT_INFO } from "@/lib/constants";

export default function MobileActionBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show action bar after scrolling past the first 120px
      setIsVisible(window.scrollY > 120);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleModal = (e: any) => {
      setModalOpen(Boolean(e.detail?.open));
    };
    window.addEventListener("modal-state-change", handleModal);
    return () => window.removeEventListener("modal-state-change", handleModal);
  }, []);

  if (modalOpen) return null;

  const phoneClean = CONTACT_INFO.phone.replace(/\s+/g, "").replace("+", "");
  const whatsappUrl = `https://wa.me/${phoneClean}?text=${encodeURIComponent("Hola, me gustaría pedir presupuesto para contratar a Llenya al Bombo")}`;
  const callUrl = `tel:${CONTACT_INFO.phone.replace(/\s+/g, "")}`;

  return (
    <aside
      aria-label="Acciones rápidas de contacto"
      className={`xl:hidden fixed bottom-0 inset-x-0 z-40 p-2.5 sm:p-3 bg-negro/95 backdrop-blur-lg border-t border-blanco/10 shadow-[0_-8px_25px_rgba(0,0,0,0.6)] transition-all duration-300 transform-gpu ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
      style={{ paddingBottom: "max(0.65rem, env(safe-area-inset-bottom))" }}
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-[#25D366] text-blanco-pure rounded-xl text-xs sm:text-sm font-heading comic-stroke uppercase tracking-wider font-bold shadow-md shadow-[#25D366]/20 active:scale-95 transition-transform"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
            <path d="M12.031 2a9.978 9.978 0 0 0-9.969 9.97c.003 1.83.5 3.59 1.442 5.128L2 22l5.059-1.328a9.91 9.91 0 0 0 4.97 1.326h.005a9.978 9.978 0 0 0 9.969-9.97A9.978 9.978 0 0 0 12.031 2zm0 1.662c4.582 0 8.307 3.725 8.307 8.308 0 4.582-3.725 8.307-8.307 8.307a8.252 8.252 0 0 1-4.225-1.156l-.303-.18-3.142.824.838-3.063-.197-.314a8.255 8.255 0 0 1-1.278-4.42c0-4.583 3.725-8.308 8.307-8.308zm-3.6 4.795c-.15 0-.33.037-.487.203-.158.165-.6.586-.6 1.43 0 .843.615 1.658.701 1.77.086.113 1.213 1.853 2.94 2.598.411.177.732.282.98.361.413.132.788.113 1.087.068.33-.05 1.02-.417 1.163-.82.143-.402.143-.746.1-.82-.043-.075-.157-.12-.33-.207-.173-.086-1.02-.503-1.178-.56-.157-.056-.27-.086-.386.087-.116.173-.45.56-.55.676-.102.116-.203.13-.376.043a4.73 4.73 0 0 1-1.393-.86c-.537-.478-.9-.1-1.213-.642-.15-.26-.016-.401.07-.533.078-.116.157-.26.236-.389.078-.13.105-.22.157-.367.053-.146.027-.274-.013-.36-.04-.087-.386-.93-.53-1.276-.14-.337-.282-.292-.387-.297l-.33-.006z"/>
          </svg>
          <span>WhatsApp</span>
        </a>

        {/* Llamar Button */}
        <a
          href={callUrl}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-negro border border-blanco/20 text-blanco rounded-xl text-xs sm:text-sm font-heading comic-stroke uppercase tracking-wider font-bold hover:bg-blanco/10 active:scale-95 transition-transform"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-rojo">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>Llamar</span>
        </a>

        {/* Email Button */}
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-rojo text-blanco-pure rounded-xl text-xs sm:text-sm font-heading comic-stroke uppercase tracking-wider font-bold shadow-md shadow-rojo/30 active:scale-95 transition-transform"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
            <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span>Email</span>
        </a>
      </div>
    </aside>
  );
}
