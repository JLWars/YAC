import { IconHeart } from "@/components/icons";

type Props = {
  variant: "imbattable" | "affaires";
  text: string;
  /** positionnement (fourni par le Hero) */
  className?: string;
};

/**
 * Post-it décoratif crème, légèrement tourné, avec un bout de washi tape
 * en haut, un texte manuscrit et un petit cœur. Visible en lg+ uniquement
 * (le Hero passe `hidden lg:block` via className).
 */
export default function StickyNote({ variant, text, className }: Props) {
  const heart = variant === "affaires" ? "text-affaires-red" : "text-brand-red";
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className ?? ""}`}>
      <div className="relative w-[190px] -rotate-[7deg] bg-[#FBF0D8] px-5 pb-5 pt-7 shadow-[7px_12px_22px_rgba(0,0,0,0.28)]">
        <span className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3 bg-gradient-to-r from-[#F7A23B]/70 to-[#FFD46A]/70 [clip-path:polygon(2%_0,100%_7%,98%_100%,0_93%)]" />
        <p className="font-hand text-[1.35rem] font-bold leading-[1.15] text-[#3B2C12]">{text}</p>
        <IconHeart className={`mt-2 h-5 w-5 ${heart}`} />
      </div>
    </div>
  );
}
