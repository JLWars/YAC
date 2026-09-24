import Reveal from "@/components/Reveal";
import MarkerHighlight from "@/components/hero/MarkerHighlight";
import { affaires, business } from "@/lib/business";

type Props = {
  variant: "imbattable" | "affaires";
};

/**
 * Section « présentation » placée sous le hero de chaque page magasin.
 * Le nom du magasin (avant la première virgule du titre) reçoit le coup
 * de surligneur ; le texte reste limité à ~65 caractères par ligne.
 */
export default function StoreAbout({ variant }: Props) {
  const isAffaires = variant === "affaires";
  const { title, paragraphs, closing } = isAffaires ? affaires.about : business.about;

  const comma = title.indexOf(",");
  const lead = comma > 0 ? title.slice(0, comma + 1) : title;
  const rest = comma > 0 ? title.slice(comma + 1) : "";

  const sectionClass = isAffaires
    ? "bg-affaires-anthracite text-white"
    : "bg-white text-brand-black";
  const bodyClass = isAffaires ? "text-white/80" : "text-brand-black/80";
  const closingClass = isAffaires ? "text-affaires-yellow" : "text-brand-red";

  return (
    <section className={`py-16 sm:py-20 ${sectionClass}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-[65ch]">
            <h2 className="font-display text-3xl uppercase leading-tight tracking-tight sm:text-4xl">
              <MarkerHighlight variant={variant} className="mr-2 text-brand-black">
                {lead}
              </MarkerHighlight>
              {rest}
            </h2>

            <div className={`mt-8 space-y-5 text-base leading-relaxed sm:text-lg ${bodyClass}`}>
              {paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <p className={`mt-8 font-hand text-2xl leading-snug sm:text-3xl ${closingClass}`}>{closing}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
