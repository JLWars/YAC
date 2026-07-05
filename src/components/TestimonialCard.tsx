import StarRating from "./StarRating";
import { IconQuote } from "./icons";

type TestimonialCardProps = {
  name: string;
  rating: number;
  quote: string;
  date: string;
};

export default function TestimonialCard({ name, rating, quote, date }: TestimonialCardProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border-2 border-brand-black bg-brand-cream p-6 shadow-[5px_5px_0_0_#141414]">
      <IconQuote className="h-7 w-7 text-brand-red/70" />
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-brand-black/85">&laquo; {quote} &raquo;</p>
      <div className="mt-5 flex items-center justify-between border-t border-brand-black/10 pt-4">
        <div>
          <p className="font-display text-base tracking-tight text-brand-black">{name}</p>
          <p className="text-xs text-brand-black/50">{date} · avis Google</p>
        </div>
        <StarRating rating={rating} size="sm" />
      </div>
    </div>
  );
}
