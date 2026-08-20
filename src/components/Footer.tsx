import { NAV_LINKS, CONTACT_INFO } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative z-10 bg-negro-light pt-6 pb-0 px-5 sm:px-8 xl:pl-[250px] xl:pr-12">
      <footer
        className="relative z-10 max-w-6xl xl:max-w-7xl mx-auto border-t-[6px] md:border-t-[8px] border-x-2 border-x-rojo/40 border-t-rojo border-b-0 rounded-t-[3rem] lg:rounded-t-[4.5rem] rounded-b-none overflow-hidden shadow-2xl shadow-black/80"
        style={{ background: "#141010" }}
        role="contentinfo"
      >
        {/* Ambient red glow spots (sombra rojita suave) */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[450px] h-[450px] bg-rojo/[0.08] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-10 right-1/4 w-[350px] h-[350px] bg-rojo/[0.06] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 w-full px-8 sm:px-12 lg:px-16">
          
          {/* Main content — two centred blocks side by side */}
          <div className="py-14 md:py-16 flex flex-col sm:flex-row items-start justify-center gap-14 sm:gap-20 md:gap-28">

            {/* ── Navegación ── */}
            <div>
              <h3 className="font-heading comic-stroke text-lg text-blanco-pure uppercase tracking-widest mb-2">
                Navegación
              </h3>
              {/* Red accent line under title */}
              <div className="w-12 h-[3px] rounded-full bg-rojo mb-6" />
              <ul className="space-y-3" role="list">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-blanco/85 text-sm sm:text-[15px] leading-relaxed hover:text-rojo transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#contacto"
                    className="text-blanco/85 text-sm sm:text-[15px] leading-relaxed hover:text-rojo transition-colors duration-300"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            {/* ── Contacto ── */}
            <div>
              <h3 className="font-heading comic-stroke text-lg text-blanco-pure uppercase tracking-widest mb-2">
                Contacto
              </h3>
              {/* Red accent line under title */}
              <div className="w-12 h-[3px] rounded-full bg-rojo mb-6" />
              <ul className="space-y-4" role="list">
                <li>
                  <a
                    href={`https://wa.me/${CONTACT_INFO.phone.replace(/\s+/g, "").replace("+", "")}?text=Hola%2C%20me%20interesa%20contratar%20a%20Llenya%20al%20Bombo%20para%20un%20evento`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-blanco/85 text-sm sm:text-[15px] hover:text-blanco transition-colors duration-300 group"
                  >
                    <svg
                      className="w-5 h-5 text-rojo shrink-0 group-hover:scale-110 transition-transform duration-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12.031 2a9.978 9.978 0 0 0-9.969 9.97c.003 1.83.5 3.59 1.442 5.128L2 22l5.059-1.328a9.91 9.91 0 0 0 4.97 1.326h.005a9.978 9.978 0 0 0 9.969-9.97A9.978 9.978 0 0 0 12.031 2zm0 1.662c4.582 0 8.307 3.725 8.307 8.308 0 4.582-3.725 8.307-8.307 8.307a8.252 8.252 0 0 1-4.225-1.156l-.303-.18-3.142.824.838-3.063-.197-.314a8.255 8.255 0 0 1-1.278-4.42c0-4.583 3.725-8.308 8.307-8.308zm-3.6 4.795c-.15 0-.33.037-.487.203-.158.165-.6.586-.6 1.43 0 .843.615 1.658.701 1.77.086.113 1.213 1.853 2.94 2.598.411.177.732.282.98.361.413.132.788.113 1.087.068.33-.05 1.02-.417 1.163-.82.143-.402.143-.746.1-.82-.043-.075-.157-.12-.33-.207-.173-.086-1.02-.503-1.178-.56-.157-.056-.27-.086-.386.087-.116.173-.45.56-.55.676-.102.116-.203.13-.376.043a4.73 4.73 0 0 1-1.393-.86c-.537-.478-.9-.1-1.213-.642-.15-.26-.016-.401.07-.533.078-.116.157-.26.236-.389.078-.13.105-.22.157-.367.053-.146.027-.274-.013-.36-.04-.087-.386-.93-.53-1.276-.14-.337-.282-.292-.387-.297l-.33-.006z"/>
                    </svg>
                    {CONTACT_INFO.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-blanco/85 text-sm sm:text-[15px] hover:text-blanco transition-colors duration-300 group"
                  >
                    <svg
                      className="w-5 h-5 text-rojo shrink-0 group-hover:scale-110 transition-transform duration-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .95.68l1.21 3.64a1 1 0 0 1-.27 1.05L8.5 9.62a16 16 0 0 0 6.88 6.88l1.25-1.67a1 1 0 0 1 1.05-.27l3.64 1.21a1 1 0 0 1 .68.95V19a2 2 0 0 1-2 2A18 18 0 0 1 3 5z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {CONTACT_INFO.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="flex items-center gap-3 text-blanco/85 text-sm sm:text-[15px] hover:text-blanco transition-colors duration-300 group"
                  >
                    <svg
                      className="w-5 h-5 text-rojo shrink-0 group-hover:scale-110 transition-transform duration-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                      <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    {CONTACT_INFO.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar — centered layout */}
          <div className="border-t border-blanco/[0.08] py-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-14 text-center">
            <p className="text-blanco/50 text-xs sm:text-sm tracking-wider">
              © {currentYear} Llenya al Bombo · Todos los derechos reservados
            </p>

            <a
              href="https://hubllenyaalbombo.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-7 py-3 bg-[#111111] hover:bg-rojo text-blanco-pure border-2 border-rojo hover:border-blanco-pure font-heading comic-stroke font-bold uppercase tracking-wider text-xs sm:text-sm shape-blob shadow-[4px_4px_0px_0px_rgba(239,35,60,0.5)] hover:shadow-[7px_7px_0px_0px_#EF233C] hover:-translate-y-1 hover:-translate-x-1 active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all duration-300"
            >
              <span className="relative z-10 comic-stroke">
                Área Privada Músicos
              </span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
