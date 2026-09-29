"use client";

import { useEffect, useState } from "react";
import { CONTACT_INFO } from "@/lib/constants";

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button after a slight delay so it doesn't pop in immediately on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const message = encodeURIComponent("Hola, me interesa contratar a Llenya al Bombo para un evento");
  const phoneUrl = CONTACT_INFO.phone.replace(/\s+/g, "").replace("+", "");
  const whatsappUrl = `https://wa.me/${phoneUrl}?text=${message}`;

  return (
    <div
      className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[90] transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Outer pulsing ring */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
      
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-blanco-pure rounded-full shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-110 transition-all duration-300"
        aria-label="Contactar por WhatsApp"
        data-cursor-hover
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.031 2a9.978 9.978 0 0 0-9.969 9.97c.003 1.83.5 3.59 1.442 5.128L2 22l5.059-1.328a9.91 9.91 0 0 0 4.97 1.326h.005a9.978 9.978 0 0 0 9.969-9.97A9.978 9.978 0 0 0 12.031 2zm0 1.662c4.582 0 8.307 3.725 8.307 8.308 0 4.582-3.725 8.307-8.307 8.307a8.252 8.252 0 0 1-4.225-1.156l-.303-.18-3.142.824.838-3.063-.197-.314a8.255 8.255 0 0 1-1.278-4.42c0-4.583 3.725-8.308 8.307-8.308zm-3.6 4.795c-.15 0-.33.037-.487.203-.158.165-.6.586-.6 1.43 0 .843.615 1.658.701 1.77.086.113 1.213 1.853 2.94 2.598.411.177.732.282.98.361.413.132.788.113 1.087.068.33-.05 1.02-.417 1.163-.82.143-.402.143-.746.1-.82-.043-.075-.157-.12-.33-.207-.173-.086-1.02-.503-1.178-.56-.157-.056-.27-.086-.386.087-.116.173-.45.56-.55.676-.102.116-.203.13-.376.043a4.73 4.73 0 0 1-1.393-.86c-.537-.478-.9-.1-1.213-.642-.15-.26-.016-.401.07-.533.078-.116.157-.26.236-.389.078-.13.105-.22.157-.367.053-.146.027-.274-.013-.36-.04-.087-.386-.93-.53-1.276-.14-.337-.282-.292-.387-.297l-.33-.006z"/>
        </svg>

        {/* Tooltip on hover */}
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-negro-lighter text-blanco text-sm font-semibold px-4 py-2 rounded-sm whitespace-nowrap opacity-0 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:mr-5 border border-blanco/10">
          ¿Hablamos?
          {/* Tooltip triangle */}
          <span className="absolute left-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-l-negro-lighter" />
        </span>
      </a>
    </div>
  );
}
