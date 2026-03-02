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
  title: "Kognitif.Life — Stimulasi Kognitif untuk Usia Matang",
  description:
    "Program stimulasi kognitif berbasis evidence untuk menjaga kesehatan otak dan kebugaran fungsional usia matang. Didukung panduan WHO & evidence-based practice.",
  keywords: ["kognitif", "senam otak", "lansia", "brain gym", "stimulasi kognitif", "kesehatan otak"],
  authors: [{ name: "Kognitif.Life" }],
  openGraph: {
    title: "Kognitif.Life — Stimulasi Kognitif untuk Usia Matang",
    description:
      "Program stimulasi kognitif berbasis evidence untuk menjaga kesehatan otak dan kebugaran fungsional usia matang.",
    type: "website",
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