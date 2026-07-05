import Link from "next/link";
import Reveal from "@/components/Reveal";
import StarRating from "@/components/StarRating";
import CTAButton from "@/components/CTAButton";
import StatTile from "@/components/StatTile";
import PromoBadge from "@/components/PromoBadge";
import TestimonialCard from "@/components/TestimonialCard";
import {
  IconArrowRight,
  IconClock,
  IconFacebook,
  IconLamp,
  IconLeaf,
  IconPhone,
  IconPin,
  IconShirt,
  IconStar,
  IconTag,
} from "@/components/icons";
import { business, mapsDirectionsHref } from "@/lib/business";

const categories = [
  {
    icon: IconLamp,
    title: "Décoration",
    text: "Luminaires, objets déco, petit mobilier à prix cassés.",
  },
  {
    icon: IconLeaf,
    title: "Jardin",
    text: "Mobilier extérieur, outillage et accessoires de jardin.",
  },
  {
    icon: IconShirt,
    title: "Textile & vêtements",
    text: "Fins de séries et changements de collection à petit prix.",
  },
  {
    icon: IconTag,
    title: "Et bien plus",
    text: "Saisies et liquidations : de nouveaux lots chaque semaine.",
  },
];

const previewTestimonials = [
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
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-red text-white">
        <div className="bg-halftone pointer-events-none absolute inset-0 text-black/10" />
        <div className="pointer-events-none absolute -right-4 -top-6 z-10 sm:right-4 sm:top-2 lg:right-10">
          <PromoBadge />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 sm:pb-28 sm:pt-20 lg:px-8 lg:pt-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-brand-black bg-brand-yellow px-4 py-1.5 font-display text-xs uppercase tracking-wide text-brand-black sm:text-sm">
              Fréjus · {business.category}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-3xl font-display text-[3rem] uppercase leading-[0.92] tracking-tight sm:text-[4.5rem] lg:text-[6rem]">
              YAC
              <br />
              <span className="text-brand-yellow">L&apos;Imbattable</span>
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 font-display text-2xl uppercase tracking-wide text-brand-yellow sm:text-3xl">
              {business.slogan}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              Déstockage de marchandises en tous genres à prix discount suite à saisies, liquidations, fins de
              séries et changements de collections.
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-6">
              <StarRating rating={business.rating} reviewCount={business.reviewCount} size="lg" dark />
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <CTAButton href={mapsDirectionsHref} variant="secondary" icon={<IconPin className="h-4 w-4" />} external>
                Voir l&apos;itinéraire
              </CTAButton>
              <CTAButton href={business.phoneHref} variant="outline-light" icon={<IconPhone className="h-4 w-4" />}>
                Appeler maintenant
              </CTAButton>
            </div>
          </Reveal>
        </div>

        <div className="bg-hazard-stripes h-5 w-full sm:h-6" />
      </section>

      {/* STATS */}
      <section className="relative z-10 mx-auto -mt-9 max-w-6xl px-4 sm:-mt-12 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            <StatTile value="1974" label="Discounter depuis" icon={<IconTag className="h-6 w-6" />} />
            <StatTile
              value="4,2★"
              label={`${business.reviewCount.toLocaleString("fr-FR")} avis Google`}
              icon={<IconStar className="h-6 w-6" />}
            />
            <StatTile value="20k" label="Abonnés Facebook" icon={<IconFacebook className="h-6 w-6" />} />
            <StatTile value="7j/7" label="Ouvert toute la semaine" icon={<IconClock className="h-6 w-6" />} />
          </div>
        </Reveal>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl uppercase leading-tight tracking-tight text-brand-black sm:text-4xl lg:text-5xl">
            Un peu de tout, <span className="text-brand-red">à prix imbattables</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.06}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border-2 border-brand-black bg-white p-6 shadow-[4px_4px_0_0_#141414] transition-transform hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-yellow text-brand-black">
                  <cat.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl tracking-tight text-brand-black">{cat.title}</h3>
                <p className="text-sm leading-relaxed text-brand-black/70">{cat.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* AVIS PREVIEW */}
      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="font-display text-3xl uppercase leading-tight tracking-tight text-brand-black sm:text-4xl">
                  Ils ont trouvé leur bonne affaire
                </h2>
                <div className="mt-3">
                  <StarRating rating={business.rating} reviewCount={business.reviewCount} size="md" />
                </div>
              </div>
              <Link
                href="/avis"
                className="inline-flex min-h-[44px] items-center gap-2 font-display text-sm uppercase tracking-wide text-brand-red hover:text-brand-red-dark"
              >
                Voir tous les avis
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {previewTestimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <TestimonialCard {...t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INFOS PREVIEW */}
      <section className="bg-brand-black py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <h2 className="font-display text-3xl uppercase leading-tight tracking-tight sm:text-4xl">
                Retrouvez-nous <span className="text-brand-yellow">à Fréjus</span>
              </h2>
              <ul className="mt-6 space-y-4 text-white/85">
                <li className="flex items-start gap-3">
                  <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-yellow" />
                  <span>{business.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <IconClock className="mt-0.5 h-5 w-5 shrink-0 text-brand-yellow" />
                  <span>Ouvert 7j/7 — horaires détaillés sur la page infos pratiques</span>
                </li>
                <li className="flex items-start gap-3">
                  <IconPhone className="mt-0.5 h-5 w-5 shrink-0 text-brand-yellow" />
                  <a href={business.phoneHref} className="hover:text-white">
                    {business.phoneDisplay}
                  </a>
                </li>
              </ul>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <CTAButton href={mapsDirectionsHref} variant="secondary" icon={<IconPin className="h-4 w-4" />} external>
                  Itinéraire
                </CTAButton>
                <Link
                  href="/infos"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border-2 border-white px-7 font-display text-base uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-brand-black"
                >
                  Infos pratiques
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-2xl border-2 border-white/20">
                <iframe
                  title="Carte YAC L'Imbattable Fréjus"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(business.address)}&output=embed`}
                  className="h-72 w-full grayscale sm:h-80"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="relative overflow-hidden bg-brand-yellow py-14 sm:py-16">
        <div className="bg-hazard-stripes absolute inset-x-0 top-0 h-3" />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl uppercase leading-tight tracking-tight text-brand-black sm:text-5xl">
              Envie de dénicher la bonne affaire ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-brand-black/80">
              On vous attend 7j/7 à Fréjus. Un coup de fil ou un coup de volant, et c&apos;est parti.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CTAButton href={business.phoneHref} variant="primary" icon={<IconPhone className="h-4 w-4" />}>
                Appeler maintenant
              </CTAButton>
              <CTAButton href={mapsDirectionsHref} variant="outline-light" className="!border-brand-black !text-brand-black hover:!bg-brand-black hover:!text-white" icon={<IconPin className="h-4 w-4" />} external>
                Voir l&apos;itinéraire
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
