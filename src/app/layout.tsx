import type { Metadata } from "next";
import { Anton, Work_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YAC L'Imbattable — Discounter depuis 1974 à Fréjus",
  description:
    "Déstockage de marchandises en tous genres à prix discount suite à saisies, liquidations, fins de séries, changement de collections. Ouvert 7j/7 à Fréjus.",
  openGraph: {
    title: "YAC L'Imbattable — Discounter depuis 1974 à Fréjus",
    description:
      "Déstockage à prix discount : liquidations, fins de séries, changement de collections. Ouvert 7j/7 à Fréjus.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${anton.variable} ${workSans.variable} font-body antialiased bg-white text-brand-black`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
