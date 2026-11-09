"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type FocusEvent } from "react";
import type { GoogleReview } from "@/lib/business";
import { IconGoogle, IconStar } from "../icons";

type Props = {
  reviews: GoogleReview[];
  /** Nom accessible du carrousel */
  label: string;
};

/** Vitesse de défilement : ~33 px/s sur mobile, ~40 px/s sur desktop. */
const SECONDS_PER_REVIEW = 9;

function Stars({ rating }: { rating: GoogleReview["rating"] }) {
  return (
    <div role="img" aria-label={`Note : ${rating} sur 5`} className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <IconStar key={n} className={`h-4 w-4 ${n <= rating ? "text-brand-yellow" : "text-brand-black/15"}`} />
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  open,
  focusable,
  onToggle,
}: {
  review: GoogleReview;
  open: boolean;
  /** false pour les doublons de la boucle (aria-hidden) */
  focusable: boolean;
  onToggle: () => void;
}) {
  const textId = useId();
  const textRef = useRef<HTMLParagraphElement>(null);
  /** Texte réellement coupé à 4 lignes : mesuré, car cela dépend de la largeur et de la police. */
  const [clamped, setClamped] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el || open) return;
    let active = true;
    const measure = () => {
      if (active) setClamped(el.scrollHeight > el.clientHeight + 1);
    };
    measure();
    document.fonts?.ready.then(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [open]);

  const expandable = clamped || open;

  return (
    <figure
      onClick={expandable ? onToggle : undefined}
      className={`flex w-[17.5rem] flex-col rounded-2xl border-2 border-brand-black bg-white p-5 shadow-[4px_4px_0_0_#141414] transition-transform hover:-translate-y-1 sm:w-[21rem] sm:p-6 ${expandable ? "cursor-pointer" : ""}`}
    >
      <div className="flex items-center justify-between">
        <Stars rating={review.rating} />
        <IconGoogle className="h-5 w-5" />
      </div>
      <blockquote className="mt-3">
        {/* min-h = 4 lignes : toutes les cartes fermées ont la même hauteur */}
        <p
          id={textId}
          ref={textRef}
          className={`min-h-[6rem] text-base leading-6 text-brand-black/85 ${open ? "" : "line-clamp-4"}`}
        >
          {review.text}
        </p>
      </blockquote>
      {/* Toujours rendu (place réservée, invisible si le texte tient) : pas de saut au montage */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={textId}
        tabIndex={focusable ? undefined : -1}
        className={`mt-1 self-start rounded text-sm font-semibold text-brand-red underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red ${expandable ? "" : "invisible"}`}
      >
        {open ? "Réduire" : "Lire la suite"}
      </button>
      <figcaption className="mt-4 border-t border-brand-black/10 pt-3">
        <span className="block font-display text-base tracking-tight text-brand-black">{review.author}</span>
        <span className="block text-xs text-brand-black/60">{review.date}</span>
      </figcaption>
    </figure>
  );
}

/**
 * Bande d'avis qui défile en boucle (CSS, voir .reviews-marquee dans globals.css) : la
 * liste est rendue deux fois et la piste glisse d'exactement une liste, sans saut.
 * Pause au survol, doigt posé, focus clavier, et tant qu'un avis est ouvert (on peut le
 * lire) ; elle repart d'où elle était. prefers-reduced-motion : liste fixe, défilable à
 * la main.
 */
export default function ReviewsMarquee({ reviews, label }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  /** Avis ouvert, clé « copie-index » : un seul à la fois. */
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [touching, setTouching] = useState(false);

  // Avis ouvert : refermé par Échap ou par un clic / toucher hors de la bande.
  useEffect(() => {
    if (openKey === null) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpenKey(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenKey(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openKey]);

  /** Clavier : la piste est avancée jusqu'à l'avis qui reçoit le focus, centré. */
  const onFocus = (event: FocusEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const card = target.closest("li");
    const track = trackRef.current;
    const animation = track?.getAnimations?.()[0];
    if (!card || !track || !animation || !target.matches(":focus-visible")) return;
    const copyWidth = track.scrollWidth / 2;
    const viewportWidth = track.parentElement?.clientWidth ?? 0;
    const cardLeft = card.getBoundingClientRect().left - track.getBoundingClientRect().left;
    const offset = Math.min(Math.max(cardLeft - (viewportWidth - card.offsetWidth) / 2, 0), copyWidth - 1);
    animation.currentTime = (offset / copyWidth) * Number(animation.effect?.getTiming().duration);
  };

  const release = () => setTouching(false);

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carrousel"
      aria-label={label}
      data-paused={touching || openKey !== null ? "" : undefined}
      onPointerDown={(event) => {
        if (event.pointerType === "touch") setTouching(true);
      }}
      onPointerUp={release}
      onPointerCancel={release}
      onFocus={onFocus}
      className="reviews-marquee"
    >
      <div className="reviews-marquee-viewport pb-3 pt-2">
        <div
          ref={trackRef}
          className="reviews-marquee-track flex w-max items-start"
          style={{ "--marquee-duration": `${reviews.length * SECONDS_PER_REVIEW}s` } as CSSProperties}
        >
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
              className="reviews-marquee-copy flex shrink-0 items-start gap-4 pr-4 sm:gap-5 sm:pr-5"
            >
              {reviews.map((review, i) => {
                const key = `${copy}-${i}`;
                return (
                  <li key={key} className="shrink-0 snap-start">
                    <ReviewCard
                      review={review}
                      open={openKey === key}
                      focusable={copy === 0}
                      onToggle={() => setOpenKey((current) => (current === key ? null : key))}
                    />
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
