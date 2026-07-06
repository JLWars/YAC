import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import CTAButton from "@/components/CTAButton";
import { IconBox, IconCheck, IconPhone, IconPin, IconTag } from "@/components/icons";
import { business, mapsDirectionsHref } from "@/lib/business";

export const metadata: Metadata = {
  title: "Le Concept — YAC L'Imbattable",
  description:
    "Depuis 1974, YAC L'Imbattable déstocke saisies, liquidations, fins de séries et changements de collection pour proposer des prix imbattables à Fréjus.",
};

const steps = [
  {
    n: "01",
    title: "Saisies",
    text: "Des marchandises récupérées lors de saisies sont rachetées en gros lots, directement auprès des professionnels concernés.",
  },
  {
    n: "02",
    title: "Liquidations",
    text: "Quand une entreprise ferme ou liquide son stock, on rachète vite et en grande quantité pour éviter tout intermédiaire.",
  },
  {
    n: "03",
    title: "Fins de séries",
    text: "Les invendus de fin de collection trouvent une seconde vie chez nous, à prix cassé plutôt qu'à la benne.",
  },
  {
    n: "04",
    title: "Changement de collections",
    text: "Dès qu'une nouvelle collection arrive chez les fournisseurs, l'ancienne repart directement dans nos rayons.",
  },
];

const reasons = [
  "Des gros volumes achetés directement, sans intermédiaire",
  "Un stock qui se renouvelle sans cesse, chaque semaine de nouvelles trouvailles",
  "Des remises exceptionnelles répercutées immédiatement sur le prix affiché",
  "Un demi-siècle d'expérience pour dénicher les meilleures opportunités",
];

export default function ConceptPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-black text-white">
        <div className="bg-halftone pointer-events-none absolute inset-0 text-white/5" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-brand-yellow bg-transparent px-4 py-1.5 font-display text-xs uppercase tracking-wide text-brand-yellow sm:text-sm">
              Notre histoire
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-2xl font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Le <span className="text-brand-red">Concept</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Le déstockage n&apos;est pas un coup marketing, c&apos;est notre métier depuis {business.sinceYear}.
            </p>
          </Reveal>
        </div>
        <div className="bg-hazard-stripes h-5 w-full sm:h-6" />
      </section>

      {/* HISTOIRE */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-14">
          <Reveal>
            <span className="block font-display text-7xl leading-none text-brand-red sm:text-8xl lg:text-9xl">
              1974
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-black sm:text-3xl">
                Une histoire de bonnes affaires, transmise depuis un demi-siècle
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-brand-black/75 sm:text-base">
                Tout commence en {business.sinceYear} à Fréjus. Depuis, YAC L&apos;Imbattable déniche les
                meilleures opportunités pour proposer des prix qui cassent le marché. Génération après
                génération, le principe n&apos;a pas changé : acheter des lots issus de saisies, de
                liquidations, de fins de séries et de changements de collection, pour les revendre au plus
                juste prix, sans détour inutile.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-brand-black/75 sm:text-base">
                Résultat : un magasin qui ne ressemble à aucun autre, où décoration, jardin, textile et
                vêtements se mélangent au fil des arrivages — et où la seule certitude, c&apos;est le prix
                imbattable.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMMENT */}
      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="max-w-2xl font-display text-3xl uppercase leading-tight tracking-tight text-brand-black sm:text-4xl">
              Comment on fait des prix <span className="text-brand-red">imbattables</span> ?
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.07}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border-2 border-brand-black bg-white p-6 shadow-[4px_4px_0_0_#141414]">
                  <span className="font-display text-4xl text-brand-red/25">{step.n}</span>
                  <h3 className="font-display text-lg tracking-tight text-brand-black">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-brand-black/70">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 flex items-start gap-3 rounded-2xl border-2 border-dashed border-brand-black/30 bg-white/60 p-5">
              <IconBox className="mt-0.5 h-6 w-6 shrink-0 text-brand-red" />
              <p className="text-sm leading-relaxed text-brand-black/80 sm:text-base">
                Pas de magie : on achète moins cher, donc on vend moins cher. C&apos;est cette règle simple qui
                fait tourner la maison depuis {business.sinceYear}.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* POURQUOI IMBATTABLE */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="font-display text-3xl uppercase leading-tight tracking-tight text-brand-black sm:text-4xl">
              Pourquoi personne ne fait mieux
            </h2>
            <ul className="mt-6 space-y-4">
              {reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-brand-black">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[15px] leading-relaxed text-brand-black/80 sm:text-base">{reason}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-2xl border-2 border-brand-black bg-brand-red p-8 text-white shadow-[6px_6px_0_0_#141414] sm:p-10">
              <IconTag className="h-10 w-10 text-brand-yellow" />
              <p className="mt-4 font-display text-2xl uppercase leading-tight tracking-tight sm:text-3xl">
                Boutique décoration &amp; jardin
              </p>
              <p className="mt-3 text-white/85">
                Textile, vêtements et bien plus encore : le stock change constamment, chaque visite est
                différente.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-yellow py-14 sm:py-16">
        <div className="bg-hazard-stripes absolute inset-x-0 top-0 h-3" />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl uppercase leading-tight tracking-tight text-brand-black sm:text-5xl">
              Venez vérifier par vous-même
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-brand-black/80">
              Le meilleur moyen de comprendre le concept, c&apos;est encore de pousser la porte du magasin.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CTAButton href={business.phoneHref} variant="primary" icon={<IconPhone className="h-4 w-4" />}>
                Appeler maintenant
              </CTAButton>
              <CTAButton
                href={mapsDirectionsHref}
                variant="outline-light"
                className="!border-brand-black !text-brand-black hover:!bg-brand-black hover:!text-white"
                icon={<IconPin className="h-4 w-4" />}
                external
              >
                Voir l&apos;itinéraire
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
