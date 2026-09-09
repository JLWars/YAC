import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant: "imbattable" | "affaires";
  /** ajoute un trait de soulignement courbe sous le texte */
  underline?: boolean;
  className?: string;
};

/**
 * Effet surligneur / coup de feutre derrière un texte : une forme jaune
 * irrégulière (SVG) posée derrière le contenu, avec option de soulignement
 * dessiné main. Le texte reste au-dessus et pleinement lisible.
 */
export default function MarkerHighlight({ children, variant, underline = false, className }: Props) {
  const color = variant === "affaires" ? "#F5C518" : "#FFC72C";
  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 300 72"
        preserveAspectRatio="none"
        className="absolute -left-4 -top-2 h-[calc(100%+0.9rem)] w-[calc(100%+2rem)]"
      >
        <path
          d="M6 24 C 40 12 90 8 150 11 C 214 14 262 6 294 16 C 300 30 298 48 292 58 C 286 68 250 66 190 64 C 120 62 70 68 34 66 C 10 65 0 54 2 40 C 3 32 3 28 6 24 Z"
          fill={color}
        />
      </svg>
      <span className="relative">{children}</span>
      {underline && (
        <svg
          aria-hidden="true"
          viewBox="0 0 300 14"
          preserveAspectRatio="none"
          className="absolute -bottom-2 left-0 h-2.5 w-full"
        >
          <path
            d="M4 8 C 70 2 150 12 210 6 C 250 2 280 7 296 5"
            fill="none"
            stroke={color}
            strokeWidth={6}
            strokeLinecap="round"
          />
        </svg>
      )}
    </span>
  );
}
