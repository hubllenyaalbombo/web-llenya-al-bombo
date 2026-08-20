/* ===================================
   CONSTANTS — Placeholder data
   Cada bloque está marcado como PLACEHOLDER
   para encontrarlo fácilmente.
   =================================== */

/* PLACEHOLDER: sustituir por datos reales de navegación si cambian */
export const NAV_LINKS = [
  { label: "Quiénes somos", href: "#quienes-somos" },
  { label: "Eventos", href: "#eventos" },
  { label: "Galería", href: "#galeria" },
  { label: "Comunidad", href: "#comunidad" },
] as const;

/* PLACEHOLDER: sustituir por estadísticas reales */
export const STATS = [
  { value: 100, suffix: "%", prefix: "", label: "música en directo" },
  { value: 80, suffix: "", prefix: "+", label: "actuaciones al año" },
  { value: 0, suffix: "", prefix: "", label: "Toda España", isText: true },
  { value: 24, suffix: "h", prefix: "", label: "tiempo de respuesta" },
] as const;

/* PLACEHOLDER: sustituir por señas de identidad / valores reales */
export const VALUES_CARDS = [
  {
    icon: "music",
    title: "Música en directo",
    description:
      "Un repertorio amplio y variado. Desde un pasodoble hasta el último tema de reggaetón. No somos una gramola: cogemos los temas, les damos una vuelta y los hacemos nuestros.",
  },
  {
    icon: "energy",
    title: "Animación y show",
    description:
      "Puesta en escena pensada para todos los públicos. Nos encanta interactuar, subirnos a la barra y liarla en la pista. Puro chute de adrenalina.",
  },
  {
    icon: "clock",
    title: "Profesionalidad",
    description:
      "Compromiso total con tu evento. Llegamos con margen, montamos rápido y empezamos cuando toca. Cero dolores de cabeza, estás en buenas manos.",
  },
  {
    icon: "people",
    title: "Cercanía",
    description:
      "Nos mezclamos con vosotros. Nos fijamos en qué necesita el ambiente y vamos cambiando sobre la marcha para que la fiesta no decaiga nunca.",
  },
] as const;

/* PLACEHOLDER: sustituir por hitos reales de la charanga */
export const TIMELINE_MILESTONES = [
  {
    year: "2018",
    title: "Nace Llenya al Bombo",
    description: "Un grupo de amigos músicos decide montar una charanga profesional en la Comunidad Valenciana.",
  },
  {
    year: "2019",
    title: "Primer gran evento",
    description: "Primera contratación para unas fiestas patronales con más de 2.000 personas en la plaza.",
  },
  {
    year: "2022",
    title: "+200 actuaciones",
    description: "Superamos las 200 actuaciones acumuladas y nos consolidamos como charanga referente en la región.",
  },
  {
    year: "2025",
    title: "Cobertura nacional",
    description: "Actuaciones por toda España: Comunidad Valenciana, Madrid, Castilla-La Mancha, Aragón y más.",
  },
] as const;

/* PLACEHOLDER: sustituir por redes sociales reales */
export const SOCIAL_LINKS = [
  {
    platform: "Instagram",
    handle: "@llenyaalbombo",
    url: "https://www.instagram.com/llenyaalbombo/",
    icon: "instagram",
  },
  {
    platform: "TikTok",
    handle: "@xarangallenyaalbombo",
    url: "https://www.tiktok.com/@xarangallenyaalbombo",
    icon: "tiktok",
  },
  {
    platform: "YouTube",
    handle: "Llenya Al Bombo",
    url: "https://www.youtube.com/@LlenyaAlBombo",
    icon: "youtube",
  },
  {
    platform: "Facebook",
    handle: "Charanga Llenya Al Bombo",
    url: "https://www.facebook.com/people/Charanga-Llenya-Al-Bombo/100063491384459/?locale=es_LA",
    icon: "facebook",
  },
] as const;

/* Datos de contacto reales */
export const CONTACT_INFO = {
  phone: "+34 696 27 94 08",
  email: "xarangallenyaalbombo@gmail.com",
  location: "Comunidad Valenciana, España",
} as const;
