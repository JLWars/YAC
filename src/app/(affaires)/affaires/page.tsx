import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Hero from "@/components/hero/Hero";
import FeatureStrip from "@/components/FeatureStrip";
import BottomBanner from "@/components/BottomBanner";
import CTAButton from "@/components/CTAButton";
import StatTile from "@/components/StatTile";
import StoreGallery from "@/components/StoreGallery";
import StoreAbout from "@/components/StoreAbout";
import {
  IconArrowRight,
  IconBox,
  IconClock,
  IconPhone,
  IconPin,
  IconStar,
  IconTag,
} from "@/components/icons";
import { affaires, business, mapsDirectionsHref } from "@/lib/business";

export const metadata: Metadata = {
  title: affaires.seo.title,
  description: affaires.seo.description,
};

const offerIcons = { tag: IconTag, box: IconBox, star: IconStar };

const categories = affaires.offer.items.map((item) => ({ ...item, icon: offerIcons[item.icon] }));

const esprit = [
  {
    icon: IconTag,
    title: "Prix discount",
    text: "Le même ADN que L'Imbattable : des bonnes affaires avant tout, depuis 1974.",
  },
  {
    icon: IconBox,
    title: "Arrivages réguliers",
    text: "Le stock bouge tout le temps : chaque visite réserve de nouvelles trouvailles.",
  },
  {
    icon: IconPin,
    title: "Deux magasins, un bâtiment",
    text: "L'Imbattable et Affaires sont voisins de palier : un seul trajet, deux fois plus de choix.",
  },
];

export default function AffairesPage() {
  return (
    <>
      {/* HERO */}
      <Hero variant="affaires" />
      <FeatureStrip features={affaires.features} />
      <BottomBanner variant="affaires" text={affaires.bottomBanner.text} />
      <StoreAbout variant="affaires" />
      <StoreGallery variant="affaires" />

      {/* STATS + CATEGORIES */}
      <section className="bg-affaires-anthracite-deep pb-16 pt-14 sm:pb-20 sm:pt-16">
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              <StatTile dark value={affaires.newStat.value} label={affaires.newStat.label} icon={<IconStar className="h-6 w-6" />} />
              <StatTile dark value="2" label="Magasins, un seul bâtiment" icon={<IconPin className="h-6 w-6" />} />
              <StatTile dark value="1974" label="L'ADN discount YAC depuis" icon={<IconTag className="h-6 w-6" />} />
              <StatTile dark value="Bientôt" label="Horaires détaillés à venir" icon={<IconClock className="h-6 w-6" />} />
            </div>
          </Reveal>
        </div>

        <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">
          <Reveal>
            <h2 className="max-w-2xl font-display text-3xl uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {affaires.offer.title} <span className="text-affaires-red">{affaires.offer.accent}</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 0.06}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border-2 border-black bg-affaires-card p-6 shadow-[4px_4px_0_0_#000000] transition-transform hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-affaires-yellow text-brand-black">
                    <cat.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl tracking-tight text-white">{cat.title}</h3>
                  <p className="text-sm leading-relaxed text-white/70">{cat.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ESPRIT YAC */}
      <section className="bg-affaires-anthracite py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="font-display text-3xl uppercase leading-tight tracking-tight text-white sm:text-4xl">
                  Le même esprit <span className="text-affaires-yellow">YAC</span>
                </h2>
                <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-white/80">
                  <IconStar className="h-4 w-4 text-affaires-yellow" />
                  {business.rating.toFixed(1).replace(".", ",")} · {business.reviewCount} avis Google pour
                  L&apos;Imbattable, juste à côté
                </p>
              </div>
              <Link
                href="/avis"
                className="inline-flex min-h-[44px] items-center gap-2 font-display text-sm uppercase tracking-wide text-affaires-yellow hover:text-white"
              >
                Voir les avis de L&apos;Imbattable
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {esprit.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border-2 border-black bg-affaires-card p-6 shadow-[4px_4px_0_0_#000000]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-affaires-red text-white">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl tracking-tight text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/70">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INFOS PRATIQUES — PLACEHOLDERS */}
      <section className="bg-brand-black py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <h2 className="font-display text-3xl uppercase leading-tight tracking-tight sm:text-4xl">
                Retrouvez-nous <span className="text-affaires-yellow">à Fréjus</span>
              </h2>
              <p className="mt-4 max-w-lg text-white/80">
                YAC Affaires se trouve dans le même bâtiment que YAC L&apos;Imbattable, entrée voisine.
              </p>

              <div className="mt-6 rounded-2xl border-2 border-dashed border-affaires-yellow/70 bg-white/5 p-5 sm:p-6">
                <p className="font-display text-xs uppercase tracking-wide text-affaires-yellow sm:text-sm">
                  À compléter — infos client à venir
                </p>
                <ul className="mt-4 space-y-3 text-sm text-white/70 sm:text-base">
                  <li className="flex items-start gap-3">
                    <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-affaires-yellow" />
                    <span className="italic">{affaires.addressPlaceholder}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <IconClock className="mt-0.5 h-5 w-5 shrink-0 text-affaires-yellow" />
                    <span className="italic">{affaires.hoursPlaceholder}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <IconPhone className="mt-0.5 h-5 w-5 shrink-0 text-affaires-yellow" />
                    <span className="italic">
                      {affaires.phonePlaceholder} — en attendant, l&apos;accueil YAC répond au{" "}
                      <a
                        href={business.phoneHref}
                        className="font-semibold not-italic text-white underline decoration-affaires-yellow underline-offset-4 hover:text-affaires-yellow"
                      >
                        {business.phoneDisplay}
                      </a>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <CTAButton
                  href={mapsDirectionsHref}
                  variant="secondary"
                  className="!bg-affaires-yellow !border-black !shadow-[4px_4px_0_0_#000000]"
                  icon={<IconPin className="h-4 w-4" />}
                  external
                >
                  Itinéraire
                </CTAButton>
                <Link
                  href="/limbattable"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border-2 border-white px-7 font-display text-base uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-brand-black"
                >
                  Voir L&apos;Imbattable
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-2xl border-2 border-white/20">
                <iframe
                  title="Carte du bâtiment YAC à Fréjus (L'Imbattable & Affaires)"
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
      <section className="relative overflow-hidden bg-affaires-yellow py-14 sm:py-16">
        <div className="bg-hazard-stripes absolute inset-x-0 top-0 h-3" />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl uppercase leading-tight tracking-tight text-brand-black sm:text-5xl">
              {affaires.closingTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-brand-black/80">
              Passez nous voir à Fréjus — et profitez-en pour faire un tour chez L&apos;Imbattable, juste à
              côté.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CTAButton
                href={mapsDirectionsHref}
                variant="primary"
                className="!bg-affaires-red !border-black !shadow-[4px_4px_0_0_#000000] hover:!bg-affaires-red-dark"
                icon={<IconPin className="h-4 w-4" />}
                external
              >
                Voir l&apos;itinéraire
              </CTAButton>
              <Link
                href="/limbattable"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border-2 border-brand-black px-7 font-display text-base uppercase tracking-wide text-brand-black transition-colors hover:bg-brand-black hover:text-white"
              >
                Découvrir L&apos;Imbattable
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
