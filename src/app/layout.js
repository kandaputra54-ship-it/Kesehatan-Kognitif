import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "STIMUNO — Sistem Informasi Stimulasi Kognitif, Terapi Kelompok, dan Senam Otak",
  description:
    "Ns. Ahmad Fahri, S.Kep.,M.Kep (NPM: 2506580831). Program stimulasi kognitif, terapi kelompok, dan senam otak berbasis evidence untuk menjaga kesehatan otak dan kebugaran fungsional.",
  keywords: [
    "STIMUNO", 
    "Sistem Informasi Stimulasi Kognitif", 
    "Terapi Kelompok", 
    "Senam Otak", 
    "kognitif", 
    "lansia", 
    "brain gym", 
    "stimulasi kognitif", 
    "kesehatan otak"
  ],
  authors: [{ name: "Ns. Ahmad Fahri, S.Kep.,M.Kep" }],
  
  openGraph: {
    title: "STIMUNO — Sistem Informasi Stimulasi Kognitif, Terapi Kelompok, dan Senam Otak",
    description: "Ns. Ahmad Fahri, S.Kep.,M.Kep (NPM: 2506580831). Program stimulasi kognitif, terapi kelompok, dan senam otak berbasis evidence.",
    type: "website",
    url: "https://stimuno.web.id",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "STIMUNO - Sistem Informasi Stimulasi Kognitif, Terapi Kelompok, dan Senam Otak",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "STIMUNO — Sistem Informasi Stimulasi Kognitif, Terapi Kelompok, dan Senam Otak",
    description: "Ns. Ahmad Fahri, S.Kep.,M.Kep (NPM: 2506580831).",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${playfairDisplay.variable} ${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}