import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import CTAButton from "@/components/CTAButton";
import StarRating from "@/components/StarRating";
import { IconClock, IconFacebook, IconPhone, IconPin, IconStar } from "@/components/icons";
import { business, hours, mapsDirectionsHref, mapsEmbedSrc } from "@/lib/business";

export const metadata: Metadata = {
  title: "Infos pratiques — YAC L'Imbattable",
  description:
    "Adresse, horaires et téléphone de YAC L'Imbattable à Fréjus. Ouvert 7j/7, itinéraire et carte disponibles.",
};

export default function InfosPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-black text-white">
        <div className="bg-halftone pointer-events-none absolute inset-0 text-white/5" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-brand-yellow px-4 py-1.5 font-display text-xs uppercase tracking-wide text-brand-yellow sm:text-sm">
              Nous trouver
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-2xl font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-6xl">
              Infos <span className="text-brand-red">pratiques</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Adresse, horaires, téléphone : tout ce qu&apos;il faut pour venir faire vos affaires à Fréjus.
            </p>
          </Reveal>
        </div>
        <div className="bg-hazard-stripes h-5 w-full sm:h-6" />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* COORDONNEES */}
          <Reveal>
            <div className="flex h-full flex-col gap-6 rounded-2xl border-2 border-brand-black bg-white p-6 shadow-[5px_5px_0_0_#141414] sm:p-8">
              <div>
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-black sm:text-3xl">
                  Coordonnées
                </h2>
                <StarRating rating={business.rating} reviewCount={business.reviewCount} size="sm" />
              </div>

              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-brand-black">
                  <IconPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-brand-black">{business.address}</p>
                  <a
                    href={mapsDirectionsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-sm font-semibold text-brand-red hover:text-brand-red-dark"
                  >
                    Obtenir l&apos;itinéraire →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-brand-black">
                  <IconPhone className="h-5 w-5" />
                </span>
                <div>
                  <a href={business.phoneHref} className="font-semibold text-brand-black hover:text-brand-red">
                    {business.phoneDisplay}
                  </a>
                  <p className="mt-1 text-sm text-brand-black/60">Appel direct depuis votre mobile</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-brand-black">
                  <IconClock className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-brand-black">Ouvert 7j/7</p>
                  <p className="mt-1 text-sm text-brand-black/60">Voir le détail des horaires ci-dessous</p>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row">
                <CTAButton href={business.phoneHref} variant="primary" icon={<IconPhone className="h-4 w-4" />} className="flex-1">
                  Appeler
                </CTAButton>
                <CTAButton
                  href={mapsDirectionsHref}
                  variant="secondary"
                  icon={<IconPin className="h-4 w-4" />}
                  className="flex-1"
                  external
                >
                  Itinéraire
                </CTAButton>
              </div>
            </div>
          </Reveal>

          {/* CARTE */}
          <Reveal delay={0.1}>
            <div className="h-full overflow-hidden rounded-2xl border-2 border-brand-black shadow-[5px_5px_0_0_#141414]">
              <iframe
                title="Carte YAC L'Imbattable Fréjus"
                src={mapsEmbedSrc}
                className="h-full min-h-[320px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>

        {/* HORAIRES */}
        <Reveal delay={0.05}>
          <div className="mt-10 rounded-2xl border-2 border-brand-black bg-brand-cream p-6 shadow-[5px_5px_0_0_#141414] sm:p-8">
            <h2 className="font-display text-2xl uppercase tracking-tight text-brand-black sm:text-3xl">
              Horaires d&apos;ouverture
            </h2>
            <div className="mt-5 divide-y divide-brand-black/10 overflow-hidden rounded-xl border border-brand-black/10 bg-white">
              {hours.map((h) => (
                <div key={h.day} className="flex items-center justify-between px-4 py-3 sm:px-6">
                  <span className="text-brand-black">{h.day}</span>
                  <span className="text-brand-black/80">{h.hours}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-brand-black/50">
              Horaires à titre indicatif, merci de les confirmer par téléphone au {business.phoneDisplay}.
            </p>
          </div>
        </Reveal>

        {/* RESEAUX */}
        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <a
              href={business.facebookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border-2 border-brand-black bg-white p-6 shadow-[4px_4px_0_0_#141414] transition-transform hover:-translate-y-1"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-red text-white">
                <IconFacebook className="h-6 w-6" />
              </span>
              <div>
                <p className="font-display text-lg tracking-tight text-brand-black">Facebook</p>
                <p className="text-sm text-brand-black/60">{business.facebookFollowers} abonnés</p>
              </div>
            </a>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${business.addressQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border-2 border-brand-black bg-white p-6 shadow-[4px_4px_0_0_#141414] transition-transform hover:-translate-y-1"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-brand-black">
                <IconStar className="h-6 w-6" />
              </span>
              <div>
                <p className="font-display text-lg tracking-tight text-brand-black">Google</p>
                <p className="text-sm text-brand-black/60">
                  {business.rating.toFixed(1)}★ · {business.reviewCount.toLocaleString("fr-FR")} avis
                </p>
              </div>
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
