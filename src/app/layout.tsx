import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import GlobalGraffiti from "@/components/GlobalGraffiti";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://llenyaalbombo.com"),
  title: {
    default: "Llenya al Bombo — Charanga & Xaranga Profesional para Eventos",
    template: "%s | Llenya al Bombo",
  },
  description:
    "Xaranga y Charanga profesional para bodas, despedidas, fiestas patronales, festivales, carnavales y eventos en toda España. Música en directo y animación. ¡Pide presupuesto sin compromiso!",
  keywords: [
    "xaranga",
    "charanga",
    "llenya al bombo",
    "xaranga llenya al bombo",
    "charanga llenya al bombo",
    "llenyaalbombo",
    "contratar charanga",
    "contratar xaranga",
    "charanga bodas",
    "xaranga casaments",
    "charanga fiestas patronales",
    "charanga despedidas",
    "charanga carnavales",
    "charanga fallas",
    "charanga moros y cristianos",
    "charanga valencia",
    "charanga castellon",
    "charanga alicante",
    "charanga teruel",
    "charanga madrid",
    "charanga espanya",
    "brass band valencia",
    "banda de música festiva",
    "música en directo eventos",
    "charanga precio",
  ],
  authors: [{ name: "Llenya al Bombo", url: "https://llenyaalbombo.com" }],
  creator: "Llenya al Bombo",
  publisher: "Llenya al Bombo",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
      "ca-ES": "/",
    },
  },
  openGraph: {
    title: "Llenya al Bombo — Charanga & Xaranga Profesional",
    description:
      "La energía que tu celebración necesita. Charanga profesional para bodas, fiestas, despedidas y eventos. ¡Solicita presupuesto!",
    url: "https://llenyaalbombo.com",
    siteName: "Llenya al Bombo",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/Galeria/Galeria 4.JPG",
        width: 1200,
        height: 630,
        alt: "Charanga Llenya al Bombo en directo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Llenya al Bombo — Charanga & Xaranga Profesional",
    description:
      "Xaranga y Charanga profesional para bodas, fiestas patronales y eventos. La mejor música y animación en directo.",
    images: ["/Galeria/Galeria 4.JPG"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className="h-full antialiased"
    >
      <head>
        <link href="https://fonts.cdnfonts.com/css/pusab" rel="stylesheet" />
        {/* Schema.org — Structured Data (MusicGroup & EntertainmentBusiness) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["MusicGroup", "PerformingGroup"],
                  "@id": "https://llenyaalbombo.com/#organization",
                  name: "Llenya al Bombo",
                  alternateName: [
                    "Xaranga Llenya al Bombo",
                    "Charanga Llenya al Bombo",
                    "Llenya al Bombo",
                    "llenyaalbombo",
                    "Xaranga Llenya",
                    "Charanga Llenya"
                  ],
                  description:
                    "Charanga y Xaranga profesional española especializada en bodas, fiestas patronales, despedidas, festivales y eventos en vivo.",
                  url: "https://llenyaalbombo.com",
                  foundingDate: "2007",
                  email: "xarangallenyaalbombo@gmail.com",
                  telephone: "+34696279408",
                  areaServed: [
                    { "@type": "Country", name: "Spain" },
                    { "@type": "AdministrativeArea", name: "Comunidad Valenciana" },
                    { "@type": "AdministrativeArea", name: "Castellón" },
                    { "@type": "AdministrativeArea", name: "Valencia" },
                    { "@type": "AdministrativeArea", name: "Alicante" },
                    { "@type": "AdministrativeArea", name: "Teruel" },
                    { "@type": "AdministrativeArea", name: "Madrid" }
                  ],
                  genre: [
                    "Charanga",
                    "Xaranga",
                    "Brass Band",
                    "Música Festiva",
                    "Pasacalles",
                    "Música de Boda",
                    "Banda de Música"
                  ],
                  sameAs: [
                    "https://www.instagram.com/llenyaalbombo/",
                    "https://www.tiktok.com/@xarangallenyaalbombo",
                    "https://www.youtube.com/@LlenyaAlBombo",
                    "https://www.facebook.com/people/Charanga-Llenya-Al-Bombo/100063491384459/?locale=es_LA",
                  ],
                },
                {
                  "@type": "EntertainmentBusiness",
                  "@id": "https://llenyaalbombo.com/#business",
                  name: "Llenya al Bombo — Espectáculos y Música en Vivo",
                  url: "https://llenyaalbombo.com",
                  telephone: "+34696279408",
                  email: "xarangallenyaalbombo@gmail.com",
                  priceRange: "€€",
                  openingHours: "Mo-Su 00:00-24:00",
                  currenciesAccepted: "EUR",
                  paymentAccepted: "Cash, Credit Card, Bank Transfer, Bizum",
                  parentOrganization: {
                    "@id": "https://llenyaalbombo.com/#organization"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://llenyaalbombo.com/#website",
                  url: "https://llenyaalbombo.com",
                  name: "Llenya al Bombo",
                  alternateName: "Xaranga Llenya al Bombo",
                  publisher: {
                    "@id": "https://llenyaalbombo.com/#organization"
                  },
                  inLanguage: ["es", "ca"]
                }
              ]
            }),
          }}
        />
      </head>
      <body className={`${nunito.variable} font-sans min-h-full flex flex-col overflow-x-hidden`}>
        {/* Skip link — accessibility */}
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        {/* Global animated texture overlay */}
        <SmoothScrollProvider />
        {/* Irregular Graffiti Background */}
        <GlobalGraffiti />
        <main id="main-content" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
