"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { IconArrowRight, IconClose } from "./icons";

type Variant = "imbattable" | "affaires";

type Props = {
  variant: Variant;
  /** URLs publiques des photos, déjà triées (listées au build par StoreGallery) */
  photos: string[];
  storeName: string;
};

const theme = {
  imbattable: {
    frame: "border-brand-black bg-brand-black/10 shadow-[4px_4px_0_0_#141414] focus-visible:outline-brand-red",
    arrow: "border-brand-black bg-brand-yellow text-brand-black shadow-[3px_3px_0_0_#141414] hover:-translate-y-0.5",
    counter: "text-brand-black",
  },
  affaires: {
    frame: "border-black bg-affaires-card shadow-[4px_4px_0_0_#000000] focus-visible:outline-affaires-yellow",
    arrow: "border-black bg-affaires-yellow text-brand-black shadow-[3px_3px_0_0_#000000] hover:-translate-y-0.5",
    counter: "text-white",
  },
};

function ArrowButton({
  direction,
  onClick,
  disabled = false,
  className = "",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Photo précédente" : "Photo suivante"}
      className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition disabled:pointer-events-none disabled:opacity-35 ${className}`}
    >
      <IconArrowRight className={`h-5 w-5 ${direction === "prev" ? "rotate-180" : ""}`} />
    </button>
  );
}

/* ---------- Carrousel (scroll-snap natif) ---------- */

export default function StoreGalleryCarousel({ variant, photos, storeName }: Props) {
  const t = theme[variant];
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLUListElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const frame = useRef(0);
  const [range, setRange] = useState<[number, number]>([0, 0]);
  const [edges, setEdges] = useState({ start: true, end: photos.length <= 1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const altFor = useCallback((i: number) => `Photo du magasin ${storeName} n°${i + 1}`, [storeName]);

  /** Photos entièrement visibles → compteur « 3 / 12 » (ou « 1–4 / 12 » quand plusieurs sont visibles). */
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const box = track.getBoundingClientRect();
    const slides = Array.from(track.children) as HTMLElement[];
    let first = -1;
    let last = -1;
    slides.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      if (r.left >= box.left - 2 && r.right <= box.right + 2) {
        if (first < 0) first = i;
        last = i;
      }
    });
    if (first < 0) {
      const step = slides[0]?.offsetWidth || 1;
      first = last = Math.min(slides.length - 1, Math.round(track.scrollLeft / step));
    }
    setRange([first, last]);
    setEdges({
      start: track.scrollLeft <= 2,
      end: track.scrollLeft >= track.scrollWidth - track.clientWidth - 2,
    });
  }, []);

  const onScroll = () => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(measure);
  };

  useEffect(() => {
    setMounted(true);
    const track = trackRef.current;
    if (!track) return;
    measure();
    const observer = new ResizeObserver(() => measure());
    observer.observe(track);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [measure]);

  const scrollByOne = (direction: 1 | -1) => {
    const track = trackRef.current;
    const slides = track?.children;
    if (!track || !slides || slides.length === 0) return;
    const step =
      slides.length > 1
        ? (slides[1] as HTMLElement).offsetLeft - (slides[0] as HTMLElement).offsetLeft
        : (slides[0] as HTMLElement).offsetWidth;
    track.scrollBy({ left: direction * step, behavior: reduceMotion ? "auto" : "smooth" });
  };

  /** Fermeture de la lightbox : on ramène la dernière photo vue dans le carrousel et on y rend le focus. */
  const closeLightbox = useCallback((lastIndex: number) => {
    setOpenIndex(null);
    const track = trackRef.current;
    const slide = track?.children[lastIndex] as HTMLElement | undefined;
    if (track && slide) {
      const box = track.getBoundingClientRect();
      const r = slide.getBoundingClientRect();
      if (r.left < box.left || r.right > box.right) {
        track.scrollTo({ left: slide.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft) });
      }
    }
    buttonRefs.current[lastIndex]?.focus({ preventScroll: true });
  }, []);

  const [first, last] = range;
  const position = first === last ? `${first + 1}` : `${first + 1}–${last + 1}`;

  return (
    <div className="mt-8">
      <div className="mb-4 flex min-h-12 items-center justify-between gap-4">
        <p className={`font-display text-lg tracking-wide sm:text-xl ${t.counter}`}>
          {position} / {photos.length}
        </p>
        <div className="hidden gap-3 md:flex">
          <ArrowButton direction="prev" onClick={() => scrollByOne(-1)} disabled={edges.start} className={t.arrow} />
          <ArrowButton direction="next" onClick={() => scrollByOne(1)} disabled={edges.end} className={t.arrow} />
        </div>
      </div>

      <ul
        ref={trackRef}
        onScroll={onScroll}
        aria-label={`Photos du magasin ${storeName}`}
        className="no-scrollbar relative -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-4 px-4 pb-3 pt-1 sm:-mx-6 sm:scroll-px-6 sm:gap-5 sm:px-6 lg:-mx-1 lg:scroll-px-1 lg:px-1"
      >
        {photos.map((src, i) => (
          <li key={src} className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[calc((100%-3.75rem)/4)]">
            <button
              ref={(el) => {
                buttonRefs.current[i] = el;
              }}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`${altFor(i)} (agrandir)`}
              className={`group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl border-2 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 ${t.frame}`}
            >
              <Image
                src={src}
                alt={altFor(i)}
                fill
                sizes="(min-width: 1024px) 270px, (min-width: 640px) 44vw, 78vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {openIndex !== null && (
              <Lightbox
                key="lightbox"
                photos={photos}
                start={openIndex}
                altFor={altFor}
                storeName={storeName}
                onClose={closeLightbox}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

/* ---------- Lightbox plein écran ---------- */

function Lightbox({
  photos,
  start,
  altFor,
  storeName,
  onClose,
}: {
  photos: string[];
  start: number;
  altFor: (i: number) => string;
  storeName: string;
  onClose: (lastIndex: number) => void;
}) {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const currentRef = useRef(start);
  const [current, setCurrent] = useState(start);

  // Ouverture directement sur la photo cliquée, sans animation de défilement.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (track) track.scrollLeft = start * track.clientWidth;
  }, [start]);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const target = Math.max(0, Math.min(photos.length - 1, index));
      track.scrollTo({ left: target * track.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
    },
    [photos.length, reduceMotion],
  );

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    if (index !== currentRef.current) {
      currentRef.current = index;
      setCurrent(index);
    }
  };

  // Scroll de la page bloqué (sans décalage dû à la barre de défilement) + focus sur « Fermer ».
  useEffect(() => {
    const html = document.documentElement;
    const scrollbar = window.innerWidth - html.clientWidth;
    const previous = { overflow: html.style.overflow, paddingRight: document.body.style.paddingRight };
    html.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    closeRef.current?.focus();

    const onResize = () => {
      const track = trackRef.current;
      if (track) track.scrollLeft = currentRef.current * track.clientWidth;
    };
    window.addEventListener("resize", onResize);

    return () => {
      html.style.overflow = previous.overflow;
      document.body.style.paddingRight = previous.paddingRight;
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Clavier : Échap ferme, flèches naviguent, Tab reste dans la lightbox.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose(currentRef.current);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(currentRef.current - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(currentRef.current + 1);
      } else if (e.key === "Tab") {
        const buttons = dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (!buttons || buttons.length === 0) return;
        const firstButton = buttons[0];
        const lastButton = buttons[buttons.length - 1];
        const active = document.activeElement;
        if (!dialogRef.current?.contains(active)) {
          e.preventDefault();
          firstButton.focus();
        } else if (e.shiftKey && active === firstButton) {
          e.preventDefault();
          lastButton.focus();
        } else if (!e.shiftKey && active === lastButton) {
          e.preventDefault();
          firstButton.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, onClose]);

  const lightboxArrow =
    "absolute z-10 border-white bg-black/50 text-white hover:bg-white hover:text-brand-black";

  return (
    <motion.div
      ref={dialogRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Photos du magasin ${storeName}`}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md"
    >
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto overscroll-contain"
      >
        {photos.map((src, i) => (
          <div key={src} className="relative h-full w-full shrink-0 snap-center" aria-hidden={i !== current}>
            {/* Seules la photo affichée et ses voisines sont chargées */}
            {Math.abs(i - current) <= 1 && (
              <div className="absolute inset-x-3 bottom-24 top-20 sm:inset-x-24 sm:bottom-16">
                <Image src={src} alt={altFor(i)} fill sizes="100vw" className="object-contain" />
              </div>
            )}
          </div>
        ))}
      </div>

      <p
        aria-live="polite"
        className="absolute left-4 top-5 font-display text-lg tracking-wide text-white sm:left-6 sm:top-6 sm:text-xl"
      >
        {current + 1} / {photos.length}
      </p>

      <button
        ref={closeRef}
        type="button"
        onClick={() => onClose(currentRef.current)}
        aria-label="Fermer"
        className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-white transition-colors hover:bg-white hover:text-brand-black sm:right-6 sm:top-5"
      >
        <IconClose className="h-5 w-5" />
      </button>

      <ArrowButton
        direction="prev"
        onClick={() => goTo(current - 1)}
        disabled={current === 0}
        className={`${lightboxArrow} bottom-6 left-4 sm:bottom-auto sm:left-6 sm:top-1/2 sm:-translate-y-1/2`}
      />
      <ArrowButton
        direction="next"
        onClick={() => goTo(current + 1)}
        disabled={current === photos.length - 1}
        className={`${lightboxArrow} bottom-6 right-4 sm:bottom-auto sm:right-6 sm:top-1/2 sm:-translate-y-1/2`}
      />
    </motion.div>
  );
}
