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
  title: "SIBO — Sistem Intervensi Berbasis Online Pam",
  description:
    "Ns. Ahmad Fahri, S.Kep.,M.Kep (NPM: 2506580831). Program stimulasi kognitif berbasis evidence untuk menjaga kesehatan otak dan kebugaran fungsional usia matang.",
  keywords: ["SIBO", "Sistem Intervensi Berbasis Online Pam", "kognitif", "senam otak", "lansia", "brain gym", "stimulasi kognitif", "kesehatan otak"],
  authors: [{ name: "Ns. Ahmad Fahri, S.Kep.,M.Kep" }],
  
  openGraph: {
    title: "SIBO — Sistem Intervensi Berbasis Online Pam",
    description: "Ns. Ahmad Fahri, S.Kep.,M.Kep (NPM: 2506580831). Program stimulasi kognitif berbasis evidence.",
    type: "website",
    url: "https://sibo.web.id",
    // TAMBAHKAN INI
    images: [
      {
        url: "/og-sibo.jpeg", // Nama file di folder public
        width: 1200,
        height: 630,
        alt: "SIBO - Sistem Intervensi Berbasis Online Pam",
      },
    ],
  },

  // TAMBAHKAN INI JUGA AGAR MUNCUL DI TWITTER/X
  twitter: {
    card: "summary_large_image",
    title: "SIBO — Sistem Intervensi Berbasis Online Pam",
    description: "Ns. Ahmad Fahri, S.Kep.,M.Kep (NPM: 2506580831).",
    images: ["/og-sibo.png"],
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