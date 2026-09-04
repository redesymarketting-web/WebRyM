import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const SITE_URL = "https://web-ry-m.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Redes y Marketing | Potenciamos tu presencia digital con diseño y estrategia",
    template: "%s | Redes y Marketing",
  },
  description:
    "Agencia de marketing digital y desarrollo web. Creamos landing pages, webs de servicios y gestionamos tus redes sociales con estrategia y diseño de alto impacto. Impulsa tu marca con Redes y Marketing.",
  keywords: [
    "marketing digital",
    "gestión de redes sociales",
    "desarrollo web",
    "landing pages",
    "Community Manager",
    "diseño gráfico",
    "estrategia digital",
    "instagram",
    "redes y marketing",
    "branding",
  ],
  authors: [{ name: "Redes y Marketing", url: SITE_URL }],
  creator: "Redes y Marketing",
  publisher: "Redes y Marketing",
  applicationName: "Redes y Marketing",
  openGraph: {
    type: "website",
    locale: "es_VE",
    url: SITE_URL,
    siteName: "Redes y Marketing",
    title: "Redes y Marketing | Potenciamos tu presencia digital",
    description:
      "Potenciamos tu presencia digital con diseño y estrategia. Desarrollo web, gestión de redes sociales y campañas de alto impacto.",
    images: [
      {
        url: "/logonew.png",
        width: 1200,
        height: 630,
        alt: "Logotipo de Redes y Marketing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Redes y Marketing | Presencia digital con diseño y estrategia",
    description:
      "Desarrollo web, gestión de redes sociales y estrategia digital de alto impacto.",
    images: ["/logonew.png"],
    site: "@redesymarketting",
    creator: "@redesymarketting",
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
  alternates: {
    canonical: "/",
    languages: {
      "es-VE": "/",
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "marketing",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020202",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <meta name="geo.region" content="VE" />
        <meta name="geo.placename" content="Venezuela" />
        <link rel="icon" type="image/png" href="/logonew.png" />
        <link rel="apple-touch-icon" href="/logonew.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Redes y Marketing",
              url: SITE_URL,
              description:
                "Agencia de marketing digital y desarrollo web. Potenciamos tu presencia digital con diseño y estrategia.",
              inLanguage: "es",
              publisher: {
                "@type": "Organization",
                name: "Redes y Marketing",
                url: SITE_URL,
                logo: {
                  "@type": "ImageObject",
                  url: `${SITE_URL}/logonew.png`,
                },
                sameAs: [
                  "https://instagram.com/redesymarketting",
                  "https://facebook.com/redesymarketting",
                  "https://tiktok.com/@redesymarketting",
                ],
              },
              author: {
                "@type": "Person",
                name: "Alan Flores",
                jobTitle: "Creador de Redes y Marketing",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}