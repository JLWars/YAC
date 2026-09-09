import { IconHeart } from "@/components/icons";

type Props = {
  variant: "imbattable" | "affaires";
  text: string;
};

/**
 * Bande jaune pleine largeur, bord haut « déchiré », texte manuscrit noir
 * souligné + petit cœur. Placée après le hero (via FeatureStrip).
 */
export default function BottomBanner({ variant, text }: Props) {
  const bg = variant === "affaires" ? "bg-affaires-yellow" : "bg-brand-yellow";
  const heart = variant === "affaires" ? "text-affaires-red" : "text-brand-red";

  return (
    <div className={`edge-torn-top relative -mt-2 ${bg}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 px-4 py-5 sm:px-6 sm:py-6">
        <p className="relative inline-block font-hand text-2xl font-bold leading-tight text-brand-black sm:text-3xl lg:text-4xl">
          {text}
          <svg
            aria-hidden="true"
            viewBox="0 0 300 12"
            preserveAspectRatio="none"
            className="absolute -bottom-1.5 left-0 h-2 w-full"
          >
            <path
              d="M4 7 C 80 1 150 11 210 5 C 250 1 280 6 296 4"
              fill="none"
              stroke="#141414"
              strokeWidth={5}
              strokeLinecap="round"
            />
          </svg>
        </p>
        <IconHeart className={`hidden h-7 w-7 shrink-0 sm:block ${heart}`} />
      </div>
    </div>
  );
}
