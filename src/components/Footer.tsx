import Link from "next/link";
import { business, mapsDirectionsHref } from "@/lib/business";
import { IconFacebook, IconPhone, IconPin, IconStar } from "./icons";

const links = [
  { href: "/", label: "Accueil YAC" },
  { href: "/limbattable", label: "L'Imbattable" },
  { href: "/concept", label: "Le Concept" },
  { href: "/avis", label: "Avis clients" },
  { href: "/infos", label: "Infos pratiques" },
  { href: "/affaires", label: "YAC Affaires" },
];

export default function Footer() {
  return (
    <footer className="border-t-4 border-brand-black bg-brand-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <IconStar className="h-7 w-7 text-brand-yellow" />
              <span className="font-display text-xl leading-none tracking-tight">
                YAC <span className="text-brand-red">L&apos;IMBATTABLE</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-white/70">
              {business.slogan}. Déstockage à prix discount à Fréjus : saisies, liquidations, fins de séries,
              changement de collections.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-wide text-brand-yellow">Navigation</h3>
            <ul className="mt-4 space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-wide text-brand-yellow">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>
                <a href={business.phoneHref} className="flex items-start gap-2 hover:text-white">
                  <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={mapsDirectionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 hover:text-white"
                >
                  <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
                  {business.address}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-wide text-brand-yellow">Suivez-nous</h3>
            <div className="mt-4 flex items-center gap-2 text-sm text-white/80">
              <IconStar className="h-4 w-4 text-brand-yellow" />
              {business.rating.toFixed(1)} · {business.reviewCount.toLocaleString("fr-FR")} avis Google
            </div>
            <a
              href={business.facebookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-white/30 px-4 text-sm font-semibold hover:border-white hover:text-white"
            >
              <IconFacebook className="h-4 w-4 text-brand-yellow" />
              {business.facebookFollowers} abonnés
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} {business.name}. {business.category}.
        </div>
      </div>
    </footer>
  );
}
