/* ===================================
   EVENTS DATA — Llenya al Bombo
   PLACEHOLDER: sustituir título, descripción,
   e imagen de cada tipo de evento por datos reales.
   =================================== */

export interface EventType {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
}

const EVENTS: EventType[] = [
  {
    id: "cumpleanos",
    num: "01",
    title: "Cumpleaños",
    subtitle: "Fiestas privadas",
    description:
      "Llevamos la fiesta a tu casa, restaurante o local alquilado. Sorpresas garantizadas y diversión para todas las edades.",
  },
  {
    id: "despedidas",
    num: "02",
    title: "Despedidas",
    subtitle: "Gamberreo y calle",
    description:
      "Acompañamos al novio o la novia con un pasacalles lleno de energía, bromas y el mejor ambiente festivo sin frenos.",
  },
  {
    id: "bodas",
    num: "03",
    title: "Bodas",
    subtitle: "Celebración nupcial",
    description:
      "Desde la salida de la ceremonia hasta el cóctel y la barra libre. Ponemos la banda sonora para que nadie se quede sentado.",
  },
  {
    id: "fiestas-populares",
    num: "04",
    title: "Fiestas Populares",
    subtitle: "Pueblos y barrios",
    description:
      "Fallas, carnavales, fiestas patronales y desfiles. Charangueo en las plazas y música en la calle hasta que salga el sol.",
  },
  {
    id: "procesiones",
    num: "05",
    title: "Procesiones",
    subtitle: "Marchas y solemnidad",
    description:
      "Interpretación de marchas procesionales y solemnes con el máximo respeto, calidad musical y afinación.",
  },
  {
    id: "corporativos",
    num: "06",
    title: "Eventos Corporativos",
    subtitle: "Empresas y ferias",
    description:
      "Cenas de empresa, inauguraciones y team building. El toque original y festivo para romper el hielo con los compañeros.",
  },
];

export default EVENTS;
