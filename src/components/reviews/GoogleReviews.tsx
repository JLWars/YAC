import Reveal from "@/components/Reveal";
import CTAButton from "@/components/CTAButton";
import { IconArrowRight, IconStar } from "@/components/icons";
import { affaires, business, googleReviews, reviewLinks, type GoogleReview } from "@/lib/business";
import ReviewsMarquee from "./ReviewsMarquee";

type Props = {
  store: GoogleReview["store"];
  className?: string;
  /** false : titre seul, sans les boutons (déjà présents ailleurs sur la page, ex. /avis) */
  actions?: boolean;
};

/** Sélection d'avis Google réels (googleReviews) en bande défilante + accès à la fiche.
 *  Volontairement sans données structurées Review / AggregateRating. */
export default function GoogleReviews({ store, className = "", actions = true }: Props) {
  const reviews = googleReviews.filter((review) => review.store === store);
  if (reviews.length === 0) return null;

  return (
    <section className={`py-16 sm:py-20 ${className}`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl uppercase leading-tight tracking-tight text-brand-black sm:text-4xl">
            Sélection d&apos;avis Google <span className="text-brand-red">· {business.reviews.count}</span>
          </h2>
        </Reveal>
        {actions ? (
          <Reveal delay={0.06} className="shrink-0">
            <div className="flex flex-col gap-4 sm:flex-row">
              <CTAButton
                href={reviewLinks.read}
                variant="primary"
                icon={<IconStar className="h-4 w-4" />}
                external
              >
                Voir tous les avis
              </CTAButton>
              <CTAButton
                href={reviewLinks.write}
                variant="secondary"
                icon={<IconArrowRight className="h-4 w-4" />}
                external
              >
                Laisser un avis
              </CTAButton>
            </div>
          </Reveal>
        ) : null}
      </div>

      <Reveal delay={0.1} className="mt-10">
        <ReviewsMarquee
          reviews={reviews}
          label={`Sélection d'avis Google sur ${store === "affaires" ? affaires.name : business.name}`}
        />
      </Reveal>
    </section>
  );
}
