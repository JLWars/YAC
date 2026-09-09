import Image from "next/image";
import type { HeroPhoto } from "@/lib/business";

type Props = {
  photo: HeroPhoto;
  side: "left" | "right";
};

/**
 * Emplacement pour une photo lifestyle détourée (objet sur fond transparent)
 * placée en fond de hero, gauche ou droite. Tant qu'aucun asset n'est fourni
 * (`photo` = null), le composant n'affiche RIEN — pas d'image cassée, pas de
 * placeholder. Renseigner `business.heroPhotos.{left,right}` = { src, alt }
 * une fois le fichier déposé dans /public.
 * Visible en lg+ uniquement.
 */
export default function LifestylePhoto({ photo, side }: Props) {
  if (!photo) return null;
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-0 hidden lg:block ${
        side === "left" ? "left-0" : "right-0"
      }`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={460}
        height={560}
        className="h-auto w-[clamp(200px,24vw,420px)] object-contain object-bottom drop-shadow-[0_22px_32px_rgba(0,0,0,0.35)]"
      />
    </div>
  );
}
