import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { affaires, business, type RelayCarrier } from "@/lib/business";

type Props = {
  variant: "imbattable" | "affaires";
  /** Fond sur lequel le bloc est posé : sombre (sections noires) ou clair (cartes blanches). */
  tone?: "dark" | "light";
  className?: string;
};

/** Le fichier existe-t-il dans public/ avec ce nom exact, casse comprise ?
 *  (fs.existsSync ignore la casse sur macOS, pas sur l'hébergement Linux.) */
function logoExists(src: string) {
  try {
    const file = path.join(process.cwd(), "public", src);
    return fs.readdirSync(path.dirname(file)).includes(path.basename(file));
  } catch {
    return false;
  }
}

/** Texte sombre sur tuile claire, blanc sur tuile foncée (fallback sans logo). */
function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.299 * r + 0.587 * g + 0.114 * b > 150;
}

function CarrierTile({ carrier, outlined }: { carrier: RelayCarrier; outlined: boolean }) {
  const hasLogo = logoExists(carrier.logo);
  const scale = carrier.logoScale ?? 1;
  return (
    <li
      className={`relative flex aspect-[9/5] items-center justify-center overflow-hidden rounded-xl ${
        outlined ? "border border-brand-black/15" : ""
      }`}
      style={{ backgroundColor: carrier.tileColor }}
    >
      {hasLogo ? (
        <div
          className={`absolute ${carrier.ownMargin ? "inset-0" : "inset-[14%]"}`}
          style={scale !== 1 ? { transform: `scale(${scale})` } : undefined}
        >
          <Image
            src={carrier.logo}
            alt={carrier.name}
            fill
            sizes={`(min-width: 640px) ${Math.round(150 * scale)}px, ${Math.round(30 * scale)}vw`}
            className="object-contain"
          />
        </div>
      ) : (
        <span
          className={`px-2 text-center font-display text-sm uppercase tracking-wide sm:text-base ${
            isLight(carrier.tileColor) ? "text-brand-black" : "text-white"
          }`}
        >
          {carrier.name}
        </span>
      )}
    </li>
  );
}

/** Bloc « point relais colis » : titre, texte, puis une tuile de même taille par
 *  transporteur (fond = couleur des bords du logo, logo en object-contain). */
export default function RelayPoints({ variant, tone = "dark", className = "" }: Props) {
  const data = variant === "affaires" ? affaires.relayPoints : business.relayPoints;
  const light = tone === "light";
  const titleColor = light ? "text-brand-black" : variant === "affaires" ? "text-affaires-yellow" : "text-brand-yellow";

  return (
    <div className={className}>
      <h3 className={`font-display text-xl uppercase tracking-wide ${titleColor}`}>{data.title}</h3>
      <p className={`mt-2 max-w-lg text-sm sm:text-base ${light ? "text-brand-black/70" : "text-white/80"}`}>{data.text}</p>
      <ul className="mt-4 grid max-w-md grid-cols-3 gap-3">
        {data.carriers.map((carrier) => (
          <CarrierTile key={carrier.name} carrier={carrier} outlined={light} />
        ))}
      </ul>
    </div>
  );
}
