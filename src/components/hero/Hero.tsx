import Reveal from "@/components/Reveal";
import HeroLogoPanel from "@/components/HeroLogoPanel";
import StarRating from "@/components/StarRating";
import CTAButton from "@/components/CTAButton";
import { IconPhone, IconPin } from "@/components/icons";
import { affaires, business, mapsDirectionsHref } from "@/lib/business";
import HeroBackdrop from "./HeroBackdrop";
import BurstLines from "./BurstLines";
import MarkerHighlight from "./MarkerHighlight";
import SocialFollowBlock from "./SocialFollowBlock";
import StickyNote from "./StickyNote";
import LifestylePhoto from "./LifestylePhoto";

type Props = {
  variant: "imbattable" | "affaires";
};

export default function Hero({ variant }: Props) {
  const isAffaires = variant === "affaires";
  const data = isAffaires ? affaires : business;

  const sectionBg = isAffaires
    ? "bg-affaires-anthracite text-white"
    : "bg-brand-red text-white";
  const badge = isAffaires
    ? "border-black bg-affaires-yellow text-brand-black"
    : "border-brand-black bg-brand-yellow text-brand-black";

  return (
    <section className={`relative overflow-hidden ${sectionBg}`}>
      <HeroBackdrop variant={variant} />

      <LifestylePhoto photo={data.heroPhotos.left} side="left" />
      <LifestylePhoto photo={data.heroPhotos.right} side="right" />

      <StickyNote
        variant={variant}
        text={data.stickyNote.text}
        className="right-3 top-4 z-20 hidden lg:block xl:right-8"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-20">
        <Reveal>
          <span
            className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-1.5 font-display text-xs uppercase tracking-wide sm:text-sm ${badge}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-black" />
            {data.heroEyebrow}
          </span>
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-8">
          {/* Colonne gauche : marque + accroche + CTA */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="sr-only">{data.name}</h1>

            <div className="relative">
              <BurstLines
                variant={variant}
                className="absolute -left-6 -top-4 w-9 sm:w-14"
              />
              <BurstLines
                variant={variant}
                flip
                className="absolute -right-8 top-[42%] w-9 sm:w-16"
              />
              <HeroLogoPanel {...data.heroLogo} delay={0.08} />
            </div>

            <Reveal delay={0.14}>
              <p className="mt-7 font-display text-2xl uppercase italic tracking-wide text-brand-black sm:text-3xl">
                <MarkerHighlight variant={variant} underline>
                  {data.heroTagline}
                </MarkerHighlight>
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
                {data.heroDescription}
              </p>
            </Reveal>

            {isAffaires ? null : (
              <Reveal delay={0.26}>
                <div className="mt-5">
                  <StarRating
                    rating={business.rating}
                    reviewCount={business.reviewCount}
                    size="lg"
                    dark
                  />
                </div>
              </Reveal>
            )}

            <Reveal delay={0.32}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <CTAButton
                  href={mapsDirectionsHref}
                  variant="secondary"
                  className={
                    isAffaires
                      ? "!border-black !bg-affaires-yellow !shadow-[4px_4px_0_0_#000000]"
                      : undefined
                  }
                  icon={<IconPin className="h-4 w-4" />}
                  external
                >
                  Voir l&apos;itinéraire
                </CTAButton>
                <CTAButton
                  href={business.phoneHref}
                  variant="primary"
                  className={
                    isAffaires
                      ? "!border-black !bg-affaires-red !shadow-[4px_4px_0_0_#000000] hover:!bg-affaires-red-dark"
                      : undefined
                  }
                  icon={<IconPhone className="h-4 w-4" />}
                >
                  {isAffaires ? "Appeler l'accueil YAC" : "Appeler maintenant"}
                </CTAButton>
              </div>
            </Reveal>
          </div>

          {/* Colonne droite : réseaux sociaux */}
          <Reveal delay={0.16} className="lg:pt-6">
            <SocialFollowBlock variant={variant} content={data.socialFollow} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
