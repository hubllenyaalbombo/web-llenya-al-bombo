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
  metadataBase: new URL("https://www.llenyaalbombo.com"),
  title: {
    default: "Charanga Llenya al Bombo | Castellón y Valencia",
    template: "%s | Charanga Llenya al Bombo",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  description:
    "🎺 Charanga y Xaranga profesional para bodas, despedidas y fiestas patronales en Castellón y Valencia. Música 100% en directo y animación. ¡Pide presupuesto!",
  keywords: [
    "xaranga",
    "charanga",
    "charanga castellon",
    "charanga llenya al bombo",
    "xaranga llenya al bombo",
    "llenya al bombo",
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
    "charanga alicante",
    "charanga teruel",
    "charanga madrid",
    "charanga espanya",
    "brass band valencia",
    "banda de música festiva",
    "música en directo eventos",
    "charanga precio",
  ],
  authors: [{ name: "Charanga Llenya al Bombo", url: "https://llenyaalbombo.com" }],
  creator: "Charanga Llenya al Bombo",
  publisher: "Charanga Llenya al Bombo",
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
    title: "Charanga Llenya al Bombo | Castellón y Valencia",
    description:
      "La energía que tu celebración necesita. Charanga profesional para bodas, fiestas, despedidas y eventos. ¡Solicita presupuesto!",
    url: "https://llenyaalbombo.com",
    siteName: "Charanga Llenya al Bombo",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/galeria/galeria-4.jpg",
        width: 1200,
        height: 630,
        alt: "Charanga Llenya al Bombo en directo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Charanga Llenya al Bombo | Castellón y Valencia",
    description:
      "Xaranga y Charanga profesional para bodas, fiestas patronales y eventos. La mejor música y animación en directo.",
    images: ["/galeria/galeria-4.jpg"],
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
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="preload" href="/hero-poster.webp" as="image" type="image/webp" fetchPriority="high" />
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
                  "@id": "https://www.llenyaalbombo.com/#organization",
                  name: "Charanga Llenya al Bombo",
                  alternateName: [
                    "Xaranga Llenya al Bombo",
                    "Llenya al Bombo",
                    "llenyaalbombo",
                    "Xaranga Llenya",
                    "Charanga Llenya"
                  ],
                  description:
                    "Charanga y Xaranga profesional española especializada en bodas, fiestas patronales, despedidas, festivales y eventos en vivo.",
                  url: "https://www.llenyaalbombo.com",
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
                  "@id": "https://www.llenyaalbombo.com/#business",
                  name: "Charanga Llenya al Bombo — Espectáculos y Música en Vivo",
                  url: "https://www.llenyaalbombo.com",
                  telephone: "+34696279408",
                  email: "xarangallenyaalbombo@gmail.com",
                  priceRange: "€€",
                  openingHours: "Mo-Su 00:00-24:00",
                  currenciesAccepted: "EUR",
                  paymentAccepted: "Cash, Credit Card, Bank Transfer, Bizum",
                  parentOrganization: {
                    "@id": "https://www.llenyaalbombo.com/#organization"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.llenyaalbombo.com/#website",
                  url: "https://www.llenyaalbombo.com",
                  name: "Charanga Llenya al Bombo",
                  alternateName: ["Llenya al Bombo", "Xaranga Llenya al Bombo", "llenyaalbombo.com"],
                  publisher: {
                    "@id": "https://www.llenyaalbombo.com/#organization"
                  },
                  inLanguage: ["es", "ca"]
                }
              ]
            }),
          }}
        />
      </head>
      <body className={`${nunito.variable} font-sans min-h-full flex flex-col overflow-x-clip w-full max-w-full overscroll-x-none`}>
        {/* Skip link — accessibility */}
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        {/* Global animated texture overlay */}
        <SmoothScrollProvider />
        {/* Irregular Graffiti Background */}
        <GlobalGraffiti />
        <main id="main-content" className="flex-1 w-full max-w-full overflow-x-clip">
          {children}
        </main>
      </body>
    </html>
  );
}
