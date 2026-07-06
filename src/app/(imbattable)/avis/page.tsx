import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import StarRating from "@/components/StarRating";
import CTAButton from "@/components/CTAButton";
import TestimonialCard from "@/components/TestimonialCard";
import { IconArrowRight, IconFacebook } from "@/components/icons";
import { business, googleReviewsHref } from "@/lib/business";

export const metadata: Metadata = {
  title: "Avis clients — YAC L'Imbattable",
  description: `YAC L'Imbattable est noté ${business.rating}/5 sur ${business.reviewCount} avis Google. Découvrez ce que pensent nos clients de Fréjus.`,
};

// Témoignages placeholders — à remplacer par les avis Google réels du client.
const testimonials = [
  {
    name: "Sophie M.",
    rating: 5,
    date: "Il y a 2 semaines",
    quote:
      "Des prix vraiment imbattables, on trouve toujours une bonne affaire. Le choix change souvent, ça vaut le coup d'y retourner régulièrement.",
  },
  {
    name: "Karim B.",
    rating: 5,
    date: "Il y a 1 mois",
    quote:
      "Immense magasin, du sol au plafond ! Idéal pour la déco et le jardin sans se ruiner. Le personnel est sympa et disponible.",
  },
  {
    name: "Nathalie R.",
    rating: 4,
    date: "Il y a 3 mois",
    quote:
      "Ouvert 7j/7, ça dépanne bien. Il faut prendre le temps de fouiller mais on repart toujours avec quelque chose.",
  },
  {
    name: "Julien P.",
    rating: 5,
    date: "Il y a 4 mois",
    quote:
      "Client depuis des années, jamais déçu. Les arrivages sont réguliers et il y a vraiment de tout à des prix cassés.",
  },
];

export default function AvisPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-red text-white">
        <div className="bg-halftone pointer-events-none absolute inset-0 text-black/10" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-brand-black bg-brand-yellow px-4 py-1.5 font-display text-xs uppercase tracking-wide text-brand-black sm:text-sm">
              Avis Google
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mx-auto mt-6 max-w-2xl font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-6xl">
              Ils nous font <span className="text-brand-yellow">confiance</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-3 rounded-2xl border-2 border-white/20 bg-white/5 px-6 py-8 backdrop-blur-sm">
              <span className="font-display text-6xl leading-none text-brand-yellow sm:text-7xl">
                {business.rating.toFixed(1)}
              </span>
              <StarRating rating={business.rating} size="lg" dark hideValue />
              <p className="text-sm text-white/70">
                Basé sur {business.reviewCount.toLocaleString("fr-FR")} avis Google
              </p>
            </div>
          </Reveal>
        </div>
        <div className="bg-hazard-stripes h-5 w-full sm:h-6" />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07}>
              <TestimonialCard {...t} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-center justify-center gap-5 rounded-2xl border-2 border-brand-black bg-brand-cream p-8 text-center shadow-[5px_5px_0_0_#141414] sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-black sm:text-3xl">
                Envie de lire tous les avis ?
              </h2>
              <p className="mt-2 text-sm text-brand-black/70 sm:text-base">
                Retrouvez la fiche complète de YAC L&apos;Imbattable sur Google.
              </p>
            </div>
            <CTAButton href={googleReviewsHref} variant="primary" icon={<IconArrowRight className="h-4 w-4" />} external>
              Voir sur Google
            </CTAButton>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-brand-black/60">
            <IconFacebook className="h-4 w-4 text-brand-red" />
            Rejoignez aussi nos {business.facebookFollowers} abonnés sur Facebook
          </div>
        </Reveal>
      </section>
    </>
  );
}
