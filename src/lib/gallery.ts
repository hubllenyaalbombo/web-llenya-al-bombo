/* ===================================
   GALLERY DATA — Llenya al Bombo
   =================================== */

export type MediaType = "photo" | "video";

export interface MediaItem {
  id: string;
  type: MediaType;
  aspectRatio: string;
  spanClasses?: string;
  objectPosition?: string;
  thumbnail: string;
  source: string;
  alt: string;
  youtubeUrl?: string;
  startTime?: number;
}

const GALLERY: MediaItem[] = [
  {
    id: "g1",
    type: "video",
    aspectRatio: "aspect-video",
    spanClasses: "col-span-2 row-span-2",
    thumbnail: "https://img.youtube.com/vi/D6ZqGKFEjGg/maxresdefault.jpg",
    source: "D6ZqGKFEjGg",
    startTime: 800,
    youtubeUrl: "https://www.youtube.com/watch?v=D6ZqGKFEjGg&t=800s",
    alt: "Llenya al Bombo — Actuación en directo",
  },
  {
    id: "g2",
    type: "photo",
    aspectRatio: "aspect-[3/4]",
    spanClasses: "col-span-1 row-span-2",
    objectPosition: "object-[50%_25%]",
    thumbnail: "/Galeria/Galeria 1.jpeg",
    source: "/Galeria/Galeria 1.jpeg",
    alt: "Fiesta y energía en las calles",
  },
  {
    id: "g3",
    type: "photo",
    aspectRatio: "aspect-[3/4]",
    spanClasses: "col-span-1 row-span-2",
    objectPosition: "object-[50%_20%]",
    thumbnail: "/Galeria/Galeria 2.jpeg",
    source: "/Galeria/Galeria 2.jpeg",
    alt: "Sección de vientos dándolo todo",
  },
  {
    id: "g4",
    type: "photo",
    aspectRatio: "aspect-[4/3]",
    spanClasses: "col-span-2 row-span-1",
    objectPosition: "object-center",
    thumbnail: "/Galeria/Galeria 3.jpeg",
    source: "/Galeria/Galeria 3.jpeg",
    alt: "La charanga al completo haciendo vibrar al público",
  },
  {
    id: "g5",
    type: "photo",
    aspectRatio: "aspect-[3/2]",
    spanClasses: "col-span-1 row-span-1",
    objectPosition: "object-[50%_40%]",
    thumbnail: "/Galeria/Galeria 4.JPG",
    source: "/Galeria/Galeria 4.JPG",
    alt: "Pasacalles festivo y espectáculo musical",
  },
  {
    id: "g6",
    type: "photo",
    aspectRatio: "aspect-[3/2]",
    spanClasses: "col-span-1 row-span-1",
    objectPosition: "object-center",
    thumbnail: "/Galeria/Galeria 5.JPG",
    source: "/Galeria/Galeria 5.JPG",
    alt: "Fuerza y espectáculo en directo",
  },
  {
    id: "g7",
    type: "photo",
    aspectRatio: "aspect-[3/2]",
    spanClasses: "col-span-2 row-span-1",
    objectPosition: "object-center",
    thumbnail: "/Galeria/Galeria 6.JPG",
    source: "/Galeria/Galeria 6.JPG",
    alt: "Puro nervio y diversión Llenya al Bombo",
  },
];

export default GALLERY;
