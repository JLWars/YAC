import { IconStar } from "./icons";

type StarRatingProps = {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  dark?: boolean;
  hideValue?: boolean;
};

export default function StarRating({ rating, reviewCount, size = "md", dark = false, hideValue = false }: StarRatingProps) {
  const starSize = size === "lg" ? "w-6 h-6" : size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";
  const textSize = size === "lg" ? "text-lg" : size === "sm" ? "text-xs" : "text-sm";
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.3 && rating - full < 0.8;

  return (
    <div className={`inline-flex items-center gap-2 ${textSize} font-semibold ${dark ? "text-white" : "text-brand-black"}`}>
      <div className="flex items-center gap-0.5 text-brand-yellow">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="relative inline-block">
            <IconStar className={`${starSize} ${dark ? "text-white/25" : "text-black/15"}`} />
            {(i < full || (i === full && hasHalf)) && (
              <IconStar
                className={`${starSize} text-brand-yellow absolute inset-0`}
                style={
                  i === full && hasHalf ? { clipPath: "inset(0 50% 0 0)" } : undefined
                }
              />
            )}
          </span>
        ))}
      </div>
      {!hideValue || reviewCount ? (
        <span>
          {!hideValue && rating.toFixed(1)}
          {reviewCount ? (
            <span className={dark ? "text-white/70 font-medium" : "text-brand-black/60 font-medium"}>
              {!hideValue && " · "}
              {reviewCount.toLocaleString("fr-FR")} avis
            </span>
          ) : null}
        </span>
      ) : null}
    </div>
  );
}
