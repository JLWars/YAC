type Props = {
  className?: string;
  /** miroir horizontal */
  flip?: boolean;
  /** rotation en degrés */
  rotate?: number;
};

/**
 * Flèche courbe « dessinée à la main » (SVG). Décorative, réutilisée
 * dans SocialFollowBlock et sous le post-it. Couleur = currentColor.
 */
export default function HandArrow({ className, flip = false, rotate = 0 }: Props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className={className}
      style={{ transform: `${flip ? "scaleX(-1) " : ""}rotate(${rotate}deg)` }}
      fill="none"
      stroke="currentColor"
      strokeWidth={5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 22 C 34 8, 66 10, 82 40 C 88 52, 86 66, 78 80" />
      <path d="M60 70 L80 82 L86 60" />
    </svg>
  );
}
