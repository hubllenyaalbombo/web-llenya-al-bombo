"use client";

import RevealOnScroll from "./ui/RevealOnScroll";
import { SOCIAL_LINKS, CONTACT_INFO } from "@/lib/constants";

// Icon mapping using raw SVGs
export const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  instagram: (
    <img src="/Instagram.png" alt="Instagram" className="w-10 h-10 sm:w-14 sm:h-14 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110" />
  ),
  tiktok: (
    <img src="/Tik Tok.png" alt="TikTok" className="w-12 h-12 sm:w-16 sm:h-16 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110" />
  ),
  youtube: (
    <img src="/Youtube.png" alt="YouTube" className="w-14 h-12 sm:w-[4.5rem] sm:h-16 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110" />
  ),
  facebook: (
    <img src="/Facebook.png" alt="Facebook" className="w-12 h-12 sm:w-16 sm:h-16 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110" />
  ),
  whatsapp: (
    <img src="/WhatsApp.png" alt="WhatsApp" className="w-12 h-12 sm:w-16 sm:h-16 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110" />
  ),
};

const SOCIAL_STYLES: Record<string, string> = {
  instagram: "border-[#E1306C] shape-blob-1 shadow-[4px_4px_0px_0px_rgba(225,48,108,0.4)] group-hover:shadow-[7px_7px_0px_0px_#E1306C]",
  tiktok: "border-blanco shape-blob-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.4)] group-hover:shadow-[7px_7px_0px_0px_#ffffff]",
  youtube: "border-[#FF0000] shape-blob-3 shadow-[4px_4px_0px_0px_rgba(255,0,0,0.4)] group-hover:shadow-[7px_7px_0px_0px_#FF0000]",
  facebook: "border-[#1877F2] shape-blob-4 shadow-[4px_4px_0px_0px_rgba(24,119,242,0.4)] group-hover:shadow-[7px_7px_0px_0px_#1877F2]",
};

export default function FollowSection() {
  const ALL_SOCIALS = [...SOCIAL_LINKS];

  return (
    <section id="comunidad" className="py-20 md:py-24 bg-negro">
      <div className="max-w-4xl mx-auto px-5 xl:pl-[220px] text-center">
        <RevealOnScroll>
          <span className="inline-block text-rojo text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] mb-4">
            Comunidad
          </span>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <h2 className="font-heading comic-stroke text-3xl sm:text-4xl md:text-5xl text-blanco uppercase leading-tight mb-4">
            Síguenos para ver lo que hacemos
            <br />
            antes de contratarnos
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <p className="text-gris text-base mb-12">
            Únete a nuestra familia en redes sociales y no te pierdas ningún directo, ensayo o locura.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {ALL_SOCIALS.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3"
                data-cursor-hover
                aria-label={`Síguenos en ${social.platform}`}
              >
                <div className={`w-20 h-20 sm:w-24 sm:h-24 bg-[#111111] border-[3px] flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:-translate-x-1.5 ${SOCIAL_STYLES[social.icon] || 'border-blanco shape-blob'}`}>
                  {SOCIAL_ICONS[social.icon]}
                </div>
                <span className="text-sm uppercase tracking-wider font-heading comic-stroke text-gris transition-colors duration-300 group-hover:text-blanco">
                  <span className="relative z-10 comic-stroke">{social.platform}</span>
                </span>
              </a>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
