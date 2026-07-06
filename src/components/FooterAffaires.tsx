import Link from "next/link";
import { affaires } from "@/lib/business";
import { IconBolt, IconPin } from "./icons";

const links = [
  { href: "/", label: "Accueil YAC" },
  { href: "/affaires", label: "YAC Affaires" },
  { href: "/limbattable", label: "YAC L'Imbattable" },
];

export default function FooterAffaires() {
  return (
    <footer className="border-t-4 border-black bg-affaires-anthracite-dark text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <IconBolt className="h-6 w-6 -rotate-12 text-affaires-yellow" />
              <span className="font-display text-xl leading-none tracking-tight">
                YAC <span className="text-affaires-red">AFFAIRES</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-white/70">
              {affaires.tagline}. {affaires.proximity} de YAC L&apos;Imbattable, à Fréjus.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-wide text-affaires-yellow">Navigation</h3>
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
            <h3 className="font-display text-sm uppercase tracking-wide text-affaires-yellow">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-affaires-yellow" />
                {affaires.addressPlaceholder}
              </li>
              <li className="italic text-white/50">Téléphone et horaires : à venir</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} {affaires.name}. Brico, jardin &amp; décoration à Fréjus.
        </div>
      </div>
    </footer>
  );
}
