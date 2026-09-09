type Props = {
  /** couleur du trait, pilotée par la variante */
  variant: "imbattable" | "affaires";
  /** miroir horizontal pour orienter l'éclat vers le logo */
  flip?: boolean;
  className?: string;
};

/**
 * Petits traits jaunes façon « éclat / vitesse », posés en absolute
 * autour du logo. Décoratif — masqué sous le breakpoint sm.
 */
export default function BurstLines({ variant, flip = false, className }: Props) {
  const color = variant === "affaires" ? "#F5C518" : "#FFC72C";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 44 56"
      className={`hidden sm:block ${flip ? "-scale-x-100" : ""} ${className ?? ""}`}
      fill="none"
      stroke={color}
      strokeWidth={5}
      strokeLinecap="round"
    >
      <path d="M4 27 L23 24" />
      <path d="M9 9 L25 19" />
      <path d="M8 46 L25 32" />
      <path d="M22 2 L30 16" />
    </svg>
  );
}
