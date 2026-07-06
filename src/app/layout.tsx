import type { Metadata } from "next";
import { Anton, Work_Sans } from "next/font/google";
import "./globals.css";

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
  title: "YAC Fréjus — L'Imbattable & Affaires, deux magasins discount",
  description:
    "YAC à Fréjus : deux magasins dans le même bâtiment. L'Imbattable, discounter généraliste depuis 1974, et YAC Affaires, le coin brico, jardin et déco.",
  openGraph: {
    title: "YAC Fréjus — L'Imbattable & Affaires, deux magasins discount",
    description:
      "Deux magasins, un même bâtiment : L'Imbattable (discount généraliste depuis 1974) et YAC Affaires (brico, jardin, déco) à Fréjus.",
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
        {children}
      </body>
    </html>
  );
}
