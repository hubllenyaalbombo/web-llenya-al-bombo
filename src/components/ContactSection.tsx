"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import RevealOnScroll from "./ui/RevealOnScroll";
import Button from "./ui/Button";
import SearchableSelect from "./ui/SearchableSelect";
import { CONTACT_INFO } from "@/lib/constants";
import { SPAIN_PROVINCES, MUNICIPALITIES, type Province } from "@/lib/spain-locations";

export default function ContactSection() {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [province, setProvince] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [customMunicipality, setCustomMunicipality] = useState("");
  const [eventType, setEventType] = useState("");
  const [multiDay, setMultiDay] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState("");
  const [requirements, setRequirements] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");

  // Honeypot anti-spam (invisible field that only bots fill)
  const [honeypot, setHoneypot] = useState("");

  // Validation
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // Read event type from URL hash if present (e.g., #contacto?evento=bodas)
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash.includes("?evento=")) {
        const type = hash.split("?evento=")[1];
        // Map IDs to dropdown values
        const map: Record<string, string> = {
          cumpleanos: "Cumpleaños",
          despedidas: "Despedida de soltero/a",
          bodas: "Boda",
          "fiestas-populares": "Fiesta popular",
          carnavales: "Carnaval",
          procesiones: "Procesión y romería",
          corporativos: "Evento corporativo",
          otros: "Otro",
        };
        if (map[type]) {
          setEventType(map[type]);
        }
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const handleRequirementChange = (value: string) => {
    setRequirements((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Obligatorio";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Email inválido";
    if (!phone.trim()) newErrors.phone = "Obligatorio";
    if (!date) newErrors.date = "Obligatorio";
    if (multiDay && !endDate) newErrors.endDate = "Obligatorio";
    if (!province) newErrors.province = "Obligatorio";
    if (!municipality) newErrors.municipality = "Obligatorio";
    if (municipality === "Otro" && !customMunicipality.trim()) newErrors.customMunicipality = "Obligatorio";
    if (!eventType) newErrors.eventType = "Obligatorio";
    if (description.length < 20) newErrors.description = "Mínimo 20 caracteres";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      // Scroll to first error
      const firstError = document.querySelector(".error-field");
      if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSending(true);

    // Honeypot check — silently reject bot submissions
    if (honeypot) {
      setIsSending(false);
      setIsSent(true); // Fake success so bots think it worked
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE",
          botcheck: "",
          subject: `Nuevo presupuesto de ${name} para un/a ${eventType}`,
          from_name: name,
          email: email,
          Telefono: phone,
          Fecha: date,
          "Varios dias": multiDay ? `Sí, hasta ${endDate}` : "No",
          Provincia: province,
          Municipio: municipality === "Otro" ? customMunicipality : municipality,
          "Duracion estimada": duration || "No especificado",
          "Tipo de evento": eventType,
          Extras: requirements.length > 0 ? requirements.join(", ") : "Ninguno",
          "Como nos conocisteis": source || "No especificado",
          Detalles: description
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSent(true);
      } else {
        alert("Hubo un error al enviar el formulario. Por favor, intenta usar WhatsApp o nuestro correo directo.");
      }
    } catch (error) {
      alert("Hubo un error de conexión. Por favor, revisa tu internet o contáctanos por WhatsApp.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contacto"
      className="relative pt-6 sm:pt-8 md:pt-10 pb-0 bg-negro-light overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rojo/[0.02] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rojo/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 xl:pl-[250px] xl:pr-12">
        
        {/* Header - Asymmetrical */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <RevealOnScroll>
              <span className="inline-block text-rojo text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] mb-4">
                Contacto
              </span>
              <h2
                id="contact-heading"
                className="font-heading comic-stroke text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-blanco uppercase leading-none"
              >
                HABLAMOS?
              </h2>
            </RevealOnScroll>
          </div>
          <div className="max-w-md">
            <RevealOnScroll delay={0.1}>
              <p className="text-blanco/80 text-lg md:text-xl font-bold border-l-4 border-rojo pl-4">
                Rellena el formulario y te mandamos presupuesto personalizado en
                menos de 24 horas. Sin compromiso.
              </p>
            </RevealOnScroll>
          </div>
        </div>

        {/* Direct Contact Cards */}
        <RevealOnScroll delay={0.15}>
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-10 sm:mb-14 max-w-4xl mx-auto">
            <a
              href={`https://wa.me/${CONTACT_INFO.phone.replace(/\s+/g, "").replace("+", "")}?text=${encodeURIComponent("Hola, me interesa contratar a Llenya al Bombo para un evento")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-center items-center text-center p-3 sm:p-5 min-h-[120px] sm:min-h-[170px] bg-[#111111] border-2 sm:border-4 border-[#25D366] shape-blob-1 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:-translate-x-1.5 shadow-[4px_4px_0px_0px_rgba(37,211,102,0.5)] sm:shadow-[6px_6px_0px_0px_rgba(37,211,102,0.5)] hover:shadow-[9px_9px_0px_0px_#25D366]"
            >
              <img src="/WhatsApp.png" alt="WhatsApp" width="52" height="52" className="w-8 h-8 sm:w-[52px] sm:h-[52px] object-contain mb-1 sm:mb-2 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1 relative z-10" />
              <span className="font-heading comic-stroke text-sm sm:text-2xl uppercase tracking-wider text-blanco relative z-10">WhatsApp</span>
            </a>
            
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, "")}`}
              className="group relative flex flex-col justify-center items-center text-center p-3 sm:p-5 min-h-[120px] sm:min-h-[170px] bg-[#111111] border-2 sm:border-4 border-rojo shape-blob-2 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:-translate-x-1.5 shadow-[4px_4px_0px_0px_rgba(239,35,60,0.5)] sm:shadow-[6px_6px_0px_0px_rgba(239,35,60,0.5)] hover:shadow-[9px_9px_0px_0px_#EF233C]"
            >
              <img src="/Phone.png" alt="Llamar" width="52" height="52" className="w-8 h-8 sm:w-[52px] sm:h-[52px] object-contain mb-1 sm:mb-2 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1 relative z-10" />
              <span className="font-heading comic-stroke text-sm sm:text-2xl uppercase tracking-wider text-blanco relative z-10">Llamar</span>
            </a>
            
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="group relative flex flex-col justify-center items-center text-center p-3 sm:p-5 min-h-[120px] sm:min-h-[170px] bg-[#111111] border-2 sm:border-4 border-blanco shape-blob-3 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:-translate-x-1.5 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] sm:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.5)] hover:shadow-[9px_9px_0px_0px_#ffffff]"
            >
              <img src="/Mail.png" alt="Email" width="60" height="60" className="w-8 h-8 sm:w-[60px] sm:h-[60px] object-contain mb-1 sm:mb-2 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1 relative z-10" />
              <span className="font-heading comic-stroke text-sm sm:text-2xl uppercase tracking-wider text-blanco relative z-10">Email</span>
            </a>
          </div>
        </RevealOnScroll>

        {isSent ? (
          /* Success State */
          <RevealOnScroll>
            <div className="bg-negro border border-rojo/30 rounded-[3rem] p-8 md:p-12 text-center shadow-2xl shadow-rojo/10 mb-16 md:mb-24 max-w-3xl mx-auto">
              <div className="w-28 h-28 mx-auto bg-rojo/10 text-rojo rounded-full flex items-center justify-center mb-8 -translate-x-1">
                <img src="/Cabeza.svg" alt="Llenya al Bombo" className="w-full h-full object-contain drop-shadow-lg scale-[2.5] translate-y-2" />
              </div>
              <h3 className="font-heading comic-stroke text-3xl md:text-4xl text-blanco uppercase mb-4">
                ¡Solicitud enviada!
              </h3>
              <p className="text-gris text-base md:text-lg mb-0 max-w-md mx-auto">
                Hemos recibido tu información. Te contactaremos en menos de 24h con un presupuesto sin compromiso.
              </p>
            </div>
          </RevealOnScroll>
        ) : (
          /* Form */
          <RevealOnScroll delay={0.2}>
            <form id="formulario-contacto" onSubmit={handleSubmit} className="space-y-8">
              {/* Honeypot — hidden from humans, bots auto-fill it */}
              <input
                type="text"
                name="botcheck"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="absolute opacity-0 w-0 h-0 overflow-hidden pointer-events-none"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* COLUMNA IZQUIERDA */}
                <div className="space-y-6">
                  
                  {/* Tarjeta 1: Contacto */}
                  <div className="bg-negro/40 p-8 rounded-[2rem] border border-blanco/5 hover:border-rojo/30 transition-colors duration-500 shadow-2xl">
                    <h3 className="text-xl font-heading comic-stroke text-blanco uppercase tracking-widest mb-6 flex items-center gap-3">
                      <span className="w-8 h-[2px] bg-rojo inline-block"></span>
                      Contacto
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-blanco mb-2 tracking-wider">
                          Nombre completo <span className="text-rojo">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Tu nombre completo"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={`w-full bg-negro border ${errors.name ? "border-rojo error-field shadow-[0_0_10px_rgba(255,51,51,0.2)]" : "border-blanco/10"} rounded-xl px-5 py-4 text-blanco focus:outline-none focus:border-rojo transition-all duration-300 placeholder:text-gris-dark`}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-blanco mb-2 tracking-wider">
                          Email <span className="text-rojo">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full bg-negro border ${errors.email ? "border-rojo error-field shadow-[0_0_10px_rgba(255,51,51,0.2)]" : "border-blanco/10"} rounded-xl px-5 py-4 text-blanco focus:outline-none focus:border-rojo transition-all duration-300 placeholder:text-gris-dark`}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-blanco mb-2 tracking-wider">
                          Teléfono / WhatsApp <span className="text-rojo">*</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          placeholder="+34 677 10 77 88"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={`w-full bg-negro border ${errors.phone ? "border-rojo error-field shadow-[0_0_10px_rgba(255,51,51,0.2)]" : "border-blanco/10"} rounded-xl px-5 py-4 text-blanco focus:outline-none focus:border-rojo transition-all duration-300 placeholder:text-gris-dark`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tarjeta 2: Evento */}
                  <div className="bg-negro/40 p-8 rounded-[2rem] border border-blanco/5 hover:border-rojo/30 transition-colors duration-500 shadow-2xl">
                    <h3 className="text-xl font-heading comic-stroke text-blanco uppercase tracking-widest mb-6 flex items-center gap-3">
                      <span className="w-8 h-[2px] bg-rojo inline-block"></span>
                      Logística
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="province" className="block text-sm font-semibold text-blanco mb-2 tracking-wider">
                          Provincia <span className="text-rojo">*</span>
                        </label>
                        <select
                          id="province"
                          value={province}
                          onChange={(e) => {
                            setProvince(e.target.value);
                            setMunicipality("");
                            setCustomMunicipality("");
                          }}
                          className={`w-full bg-negro border ${
                            errors.province ? "border-rojo error-field shadow-[0_0_10px_rgba(255,51,51,0.2)]" : "border-blanco/10"
                          } rounded-xl px-5 py-4 text-blanco focus:outline-none focus:border-rojo transition-all duration-300 appearance-none cursor-pointer`}
                          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23B3B3B3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1.25rem center" }}
                        >
                          <option value="" disabled>Selecciona una provincia...</option>
                          {[...SPAIN_PROVINCES].sort((a, b) => a.localeCompare(b, "es")).map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="municipality" className="block text-sm font-semibold text-blanco mb-2 tracking-wider">
                          Municipio <span className="text-rojo">*</span>
                        </label>
                        <SearchableSelect
                          id="municipality"
                          options={
                            province
                              ? [...(MUNICIPALITIES[province as Province] || [])].sort((a, b) => a.localeCompare(b, "es")).concat(["Otro"])
                              : []
                          }
                          value={municipality}
                          onChange={(val) => {
                            setMunicipality(val);
                            if (val !== "Otro") setCustomMunicipality("");
                          }}
                          placeholder={province ? "Escribe para buscar..." : "Selecciona primero una provincia"}
                          disabled={!province}
                          hasError={!!errors.municipality}
                        />
                      </div>
                      {municipality === "Otro" && (
                        <div>
                          <label htmlFor="customMunicipality" className="block text-sm font-semibold text-blanco mb-2 tracking-wider">
                            Nombre del municipio <span className="text-rojo">*</span>
                          </label>
                          <input
                            id="customMunicipality"
                            type="text"
                            placeholder="Escribe tu municipio"
                            value={customMunicipality}
                            onChange={(e) => setCustomMunicipality(e.target.value)}
                            className={`w-full bg-negro border ${
                              errors.customMunicipality ? "border-rojo error-field shadow-[0_0_10px_rgba(255,51,51,0.2)]" : "border-blanco/10"
                            } rounded-xl px-5 py-4 text-blanco focus:outline-none focus:border-rojo transition-all duration-300 placeholder:text-gris-dark`}
                          />
                        </div>
                      )}
                      <div>
                        <label className="block text-sm font-semibold text-blanco mb-3 tracking-wider">
                          ¿Es un evento de varios días?
                        </label>
                        <div className="flex items-center gap-2 bg-negro border border-blanco/10 p-1.5 rounded-full w-fit mb-4">
                          <button
                            type="button"
                            onClick={() => setMultiDay(false)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${!multiDay ? "bg-rojo text-blanco" : "text-gris hover:text-blanco"}`}
                          >
                            No
                          </button>
                          <button
                            type="button"
                            onClick={() => setMultiDay(true)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${multiDay ? "bg-rojo text-blanco" : "text-gris hover:text-blanco"}`}
                          >
                            Sí
                          </button>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="date" className="block text-sm font-semibold text-blanco mb-2 tracking-wider">
                          Fecha del evento <span className="text-rojo">*</span>
                        </label>
                        {multiDay ? (
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                              <span className="block text-xs text-gris mb-1">Desde:</span>
                              <input
                                type="date"
                                max="9999-12-31"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className={`w-full bg-negro border ${errors.date ? "border-rojo error-field shadow-[0_0_10px_rgba(255,51,51,0.2)]" : "border-blanco/10"} rounded-xl px-5 py-4 text-blanco focus:outline-none focus:border-rojo transition-all duration-300 [color-scheme:dark]`}
                              />
                            </div>
                            <div className="flex-1">
                              <span className="block text-xs text-gris mb-1">Hasta:</span>
                              <input
                                type="date"
                                max="9999-12-31"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className={`w-full bg-negro border ${errors.endDate ? "border-rojo error-field shadow-[0_0_10px_rgba(255,51,51,0.2)]" : "border-blanco/10"} rounded-xl px-5 py-4 text-blanco focus:outline-none focus:border-rojo transition-all duration-300 [color-scheme:dark]`}
                              />
                            </div>
                          </div>
                        ) : (
                          <input
                            id="date"
                            type="date"
                            max="9999-12-31"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className={`w-full bg-negro border ${errors.date ? "border-rojo error-field shadow-[0_0_10px_rgba(255,51,51,0.2)]" : "border-blanco/10"} rounded-xl px-5 py-4 text-blanco focus:outline-none focus:border-rojo transition-all duration-300 [color-scheme:dark]`}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* COLUMNA DERECHA */}
                <div className="space-y-6">
                  
                  {/* Tarjeta 3: Formato */}
                  <div className="bg-negro/40 p-8 rounded-[2rem] border border-blanco/5 hover:border-rojo/30 transition-colors duration-500 shadow-2xl">
                    <h3 className="text-xl font-heading comic-stroke text-blanco uppercase tracking-widest mb-6 flex items-center gap-3">
                      <span className="w-8 h-[2px] bg-rojo inline-block"></span>
                      Formato
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="eventType" className="block text-sm font-semibold text-blanco mb-2 tracking-wider">
                          Tipo de evento <span className="text-rojo">*</span>
                        </label>
                        <select
                          id="eventType"
                          value={eventType}
                          onChange={(e) => setEventType(e.target.value)}
                          className={`w-full bg-negro border ${errors.eventType ? "border-rojo error-field" : "border-blanco/10"} rounded-xl px-5 py-4 text-blanco focus:outline-none focus:border-rojo transition-all duration-300 appearance-none cursor-pointer`}
                          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23B3B3B3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1.25rem center" }}
                        >
                          <option value="" disabled>Selecciona un tipo...</option>
                          <option value="Fiestas Patronales">Fiestas Patronales / Populares</option>
                          <option value="Boda">Boda / Celebración nupcial</option>
                          <option value="Procesión">Procesión o Romería</option>
                          <option value="Despedida">Despedida de soltero/a</option>
                          <option value="Corporativo">Evento corporativo</option>
                          <option value="Otro">Otro formato</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="duration" className="block text-sm font-semibold text-blanco mb-2 tracking-wider">
                          Duración estimada de la actuación
                        </label>
                        <select
                          id="duration"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full bg-negro border border-blanco/10 rounded-xl px-5 py-4 text-blanco focus:outline-none focus:border-rojo transition-all duration-300 appearance-none cursor-pointer"
                          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23B3B3B3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1.25rem center" }}
                        >
                          <option value="">No especificado</option>
                          <option value="Menos de 2 horas">Menos de 2 horas</option>
                          <option value="De 2 a 4 horas">De 2 a 4 horas</option>
                          <option value="Más de 4 horas">Más de 4 horas</option>
                          <option value="Todo el día">Todo el día</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="source" className="block text-sm font-semibold text-blanco mb-2 tracking-wider">
                          ¿Cómo nos conocisteis?
                        </label>
                        <select
                          id="source"
                          value={source}
                          onChange={(e) => setSource(e.target.value)}
                          className="w-full bg-negro border border-blanco/10 rounded-xl px-5 py-4 text-blanco focus:outline-none focus:border-rojo transition-all duration-300 appearance-none cursor-pointer"
                          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23B3B3B3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1.25rem center" }}
                        >
                          <option value="" disabled>Selecciona...</option>
                          <option value="Instagram">Instagram</option>
                          <option value="Facebook">Facebook</option>
                          <option value="YouTube">YouTube</option>
                          <option value="Boca a boca">Boca a boca</option>
                          <option value="Búsqueda web">Búsqueda web</option>
                          <option value="Nos visteis tocar">Nos visteis tocar en directo</option>
                          <option value="Otro">Otro</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Tarjeta 4: Extras */}
                  <div className="bg-negro/40 p-8 rounded-[2rem] border border-blanco/5 hover:border-rojo/30 transition-colors duration-500 shadow-2xl">
                    <h3 className="text-xl font-heading comic-stroke text-blanco uppercase tracking-widest mb-6 flex items-center gap-3">
                      <span className="w-8 h-[2px] bg-rojo inline-block"></span>
                      Actuación
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-blanco mb-4 tracking-wider">
                          Tipo de actuación requerida
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {[
                            "Pasacalles",
                            "Actuación en escenario",
                            "Animación",
                            "Actuación sorpresa",
                            "Otro"
                          ].map((req) => (
                            <label key={req} className="flex items-start gap-3 cursor-pointer group">
                              <div className="relative mt-0.5 w-5 h-5 shrink-0 border border-blanco/30 rounded flex items-center justify-center bg-negro transition-colors group-hover:border-rojo">
                                <input
                                  type="checkbox"
                                  checked={requirements.includes(req)}
                                  onChange={() => handleRequirementChange(req)}
                                  className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <svg className="w-3.5 h-3.5 text-blanco-pure opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </div>
                              <span className="text-sm text-gris leading-tight group-hover:text-blanco transition-colors select-none">
                                {req}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-blanco mb-2 tracking-wider">
                          Descripción del evento <span className="text-rojo">*</span>
                        </label>
                        <textarea
                          id="description"
                          rows={4}
                          placeholder="Cuéntanos los detalles: aforo esperado, tipo de celebración, necesidades especiales..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className={`w-full bg-negro border ${errors.description ? "border-rojo error-field" : "border-blanco/10"} rounded-xl px-5 py-4 text-blanco focus:outline-none focus:border-rojo transition-all duration-300 placeholder:text-gris-dark resize-y`}
                        />
                        <div className="flex justify-end mt-2">
                          <span className={`text-xs ${description.length < 20 ? "text-rojo font-bold" : "text-gris-dark"}`}>
                            {description.length} / mín 20 caracteres
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-10 pb-16 flex justify-center">
                <button
                  type="submit"
                  disabled={isSending}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-rojo text-blanco-pure font-heading comic-stroke font-bold uppercase tracking-[0.2em] text-xl md:text-2xl rounded-tl-3xl rounded-br-3xl hover:bg-blanco-pure hover:text-rojo border-2 border-rojo hover:border-blanco-pure shadow-[8px_8px_0px_0px_rgba(239,35,60,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_transparent] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-rojo disabled:hover:text-blanco-pure disabled:hover:border-rojo disabled:hover:shadow-[8px_8px_0px_0px_rgba(239,35,60,0.3)] disabled:active:translate-y-0 disabled:active:translate-x-0"
                >
                  <span className={`relative z-10 flex items-center justify-center gap-3 comic-stroke ${isSending ? "opacity-0" : "opacity-100"}`}>
                    Solicitar presupuesto
                  </span>
                  {isSending && (
                    <span className="absolute inset-0 z-10 flex items-center justify-center gap-3">
                      Enviando...
                      <svg className="animate-spin h-5 w-5 text-blanco" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  )}
                </button>
              </div>

            </form>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
}
