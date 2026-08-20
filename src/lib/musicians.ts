/* ===================================
   MUSICIANS DATA — Llenya al Bombo
   PLACEHOLDER: sustituir nombre, instrumento,
   foto y bio de cada músico por datos reales.
   =================================== */

export interface Musician {
  id: number;
  name: string;
  instrument: string;
  /** Short instrument code for the badge */
  instrumentTag: string;
  /** Placeholder image URL — replace with real photo */
  photo: string;
  /** 3-4 line bio placeholder */
  bio: string;
  /** Hue shift for subtle background variation (0-360) */
  bgHue: number;
  /** Optional custom CSS transform applied only on desktop (lg breakpoint) */
  desktopTransform?: string;
}

const MUSICIANS: Musician[] = [
  {
    id: 1,
    name: "Carlos Catalán",
    instrument: "Sousafón",
    instrumentTag: "SOUSAFÓN",
    photo: "/Carlos Catalán.png",
    bio: "El bajo que sostiene a toda la charanga. Con su sousafón marca los graves que hacen vibrar el suelo de las plazas y asegura que la banda suene siempre compacta y con cuerpo.",
    bgHue: 0,
    desktopTransform: "scale(1.2) translate(4%, 7%)",
  },
  {
    id: 2,
    name: "Aaron Sanchez",
    instrument: "Percusión",
    instrumentTag: "PERCUSIÓN",
    photo: "/Aaron Sanchez.png",
    bio: "El corazón rítmico de la charanga. Su percusión marca el pulso que mueve al resto de músicos y al público entero.",
    bgHue: 30,
    desktopTransform: "scale(1.2) translate(0%, 8%)",
  },
  {
    id: 3,
    name: "Joan Miquel",
    instrument: "Percusión",
    instrumentTag: "PERCUSIÓN",
    photo: "https://picsum.photos/seed/joanm/600/900",
    bio: "Percusionista todoterreno. Encargado de los redobles que ponen los pelos de punta en las procesiones y de mantener la energía a tope en los pasacalles.",
    bgHue: 60,
  },
  {
    id: 4,
    name: "Lluis Borras",
    instrument: "Percusión",
    instrumentTag: "PERCUSIÓN",
    photo: "https://picsum.photos/seed/lluis/600/900",
    bio: "Pura dinamita en la sección rítmica. Aporta el groove necesario para que la gente no pueda parar de saltar y bailar.",
    bgHue: 90,
  },
  {
    id: 5,
    name: "Toni Esbri",
    instrument: "Trombón",
    instrumentTag: "TROMBÓN",
    photo: "/Toni Esbri.png",
    bio: "El alma del trombón. Con una energía que contagia a todos, es fundamental para darle potencia y color a los arreglos de metales.",
    bgHue: 120,
    desktopTransform: "scale(1.15) translate(6.5%, 8%)",
  },
  {
    id: 6,
    name: "Miguel Aguilella",
    instrument: "Trombón",
    instrumentTag: "TROMBÓN",
    photo: "https://picsum.photos/seed/miguel/600/900",
    bio: "Trombón con un sonido impecable. Siempre aportando buenas ideas de repertorio y dejándose la voz y el aire en cada actuación.",
    bgHue: 150,
  },
  {
    id: 7,
    name: "Ruben Martinez",
    instrument: "Trompeta",
    instrumentTag: "TROMPETA",
    photo: "https://picsum.photos/seed/ruben/600/900",
    bio: "Trompeta solista con una potencia envidiable. El primero en marcar el ritmo de los pasacalles y en bajar a la pista a interactuar con el público.",
    bgHue: 180,
  },
  {
    id: 8,
    name: "Joel Vericat",
    instrument: "Trompeta",
    instrumentTag: "TROMPETA",
    photo: "https://picsum.photos/seed/joel/600/900",
    bio: "Especialista en agudos que ponen los pelos de punta. Su carácter festivo se nota en cada nota que toca.",
    bgHue: 210,
  },
  {
    id: 9,
    name: "Victor Martín",
    instrument: "Trompeta",
    instrumentTag: "TROMPETA",
    photo: "/Victor Martín.png",
    bio: "La trompeta que cierra y empasta la sección de metales agudos. Fundamental para que los acordes suenen llenos y brillantes.",
    bgHue: 240,
    desktopTransform: "scale(1.6) translate(-1%, -6%)",
  },
  {
    id: 13,
    name: "Javier Aguilella",
    instrument: "Trompeta",
    instrumentTag: "TROMPETA",
    photo: "/Javi Aguilella.png",
    bio: "Un refuerzo de lujo para la sección de trompetas. Su sonido brillante y su energía en el escenario suman mucha fuerza a la banda.",
    bgHue: 255,
    desktopTransform: "scale(1.1) translate(1%, 10%)",
  },
  {
    id: 10,
    name: "Diego Sansano",
    instrument: "Saxofón",
    instrumentTag: "SAXOFÓN",
    photo: "https://picsum.photos/seed/diego/600/900",
    bio: "Saxofonista versátil que lo mismo te toca un pasodoble clásico que el último tema de reggaetón. Aporta calidez y ritmo al conjunto.",
    bgHue: 270,
  },
  {
    id: 11,
    name: "Joan González",
    instrument: "Saxofón",
    instrumentTag: "SAXOFÓN",
    photo: "/Joan.png",
    bio: "Saxo con un tono potente y mucho groove. Cuando hay que hacer un solo en medio de una boda, él es el encargado de liarla.",
    bgHue: 300,
    desktopTransform: "scale(1.2) translate(7%, 8%)",
  },
  {
    id: 12,
    name: "Rubén Cerisuelo",
    instrument: "Saxofón",
    instrumentTag: "SAXOFÓN",
    photo: "/Ruben Cerisuelo.png",
    bio: "Cierra la sección de saxos asegurando que la melodía siempre esté presente y con fuerza. Indispensable en cualquier buena fiesta.",
    bgHue: 330,
    desktopTransform: "scale(1.2) translate(-6%, 8%)",
  },
];

export default MUSICIANS;
