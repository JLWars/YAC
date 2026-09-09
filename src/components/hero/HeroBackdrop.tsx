type Props = {
  variant: "imbattable" | "affaires";
};

/**
 * Fond décoratif du hero : rayons radiaux très subtils derrière le logo
 * + texture de points demi-teinte. Purement visuel, non interactif.
 * Les couleurs de base (rouge / anthracite) restent sur la <section> parente.
 */
export default function HeroBackdrop({ variant }: Props) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {variant === "affaires" && <div className="bg-striated absolute inset-0" />}
      <div
        className={`bg-sunburst absolute inset-0 ${
          variant === "affaires" ? "text-white/[0.04]" : "text-white/[0.07]"
        }`}
      />
      <div
        className={`bg-halftone absolute inset-0 ${
          variant === "affaires" ? "text-black/20" : "text-black/10"
        }`}
      />
    </div>
  );
}
