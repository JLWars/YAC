import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import CTAButton from "@/components/CTAButton";
import GoogleReviews from "@/components/reviews/GoogleReviews";
import { IconArrowRight, IconFacebook, IconStar } from "@/components/icons";
import { business, reviewLinks, upperFirst } from "@/lib/business";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/avis",
  title: "Avis clients — YAC L'Imbattable",
  description: `${business.name} : ${business.reviews.label}. Découvrez ce que pensent nos clients de Fréjus.`,
});

/** Une sélection d'avis Google réels défile sous la bannière ; tous les avis se lisent
 *  et se laissent sur la fiche Google. */
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
            <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-6 rounded-2xl border-2 border-white/20 bg-white/5 px-6 py-8 backdrop-blur-sm sm:px-10">
              <p className="flex items-center gap-2 font-display text-2xl uppercase tracking-wide text-brand-yellow sm:text-3xl">
                <IconStar className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
                {upperFirst(business.reviews.label)}
              </p>
              <p className="max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
                Les avis de nos clients sont sur notre fiche Google : lisez-les, et après votre visite,
                laissez le vôtre !
              </p>
              <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
                <CTAButton
                  href={reviewLinks.read}
                  variant="secondary"
                  icon={<IconStar className="h-5 w-5" />}
                  className="!min-h-[60px] w-full !px-9 !text-lg sm:w-auto sm:!text-xl"
                  external
                >
                  Lire nos avis sur Google
                </CTAButton>
                <CTAButton
                  href={reviewLinks.write}
                  variant="outline-light"
                  icon={<IconArrowRight className="h-4 w-4" />}
                  className="w-full sm:w-auto"
                  external
                >
                  Laisser un avis
                </CTAButton>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="bg-hazard-stripes h-5 w-full sm:h-6" />
      </section>

      <GoogleReviews store="imbattable" className="bg-brand-cream" />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex items-center justify-center gap-2 text-sm text-brand-black/60">
            <IconFacebook className="h-4 w-4 text-brand-red" />
            Rejoignez aussi nos {business.facebookFollowers} abonnés sur Facebook
          </div>
        </Reveal>
      </section>
    </>
  );
}
