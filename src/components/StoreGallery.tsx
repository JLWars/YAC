"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { galleryPhotos } from "@/lib/business";
import { IconClose } from "./icons";

const variantClasses = {
  imbattable: "border-brand-black shadow-[4px_4px_0_0_#141414]",
  affaires: "border-black shadow-[4px_4px_0_0_#000000]",
};

type StoreGalleryProps = {
  title: string;
  accent: string;
  variant: keyof typeof variantClasses;
  dark?: boolean;
  className?: string;
};

export default function StoreGallery({ title, accent, variant, dark = false, className }: StoreGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex]);

  return (
    <section className={className}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2
            className={`font-display text-3xl uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl ${
              dark ? "text-white" : "text-brand-black"
            }`}
          >
            {title} <span className={accent}>en images</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {galleryPhotos.map((photo, i) => (
            <Reveal key={photo.src} delay={i * 0.06}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`Agrandir la photo : ${photo.alt}`}
                className={`group relative block aspect-square w-full overflow-hidden rounded-2xl border-2 transition-transform hover:-translate-y-1 ${variantClasses[variant]}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  priority={i === 0}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
            onClick={() => setOpenIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={galleryPhotos[openIndex].alt}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label="Fermer"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white text-white transition-colors hover:bg-white hover:text-brand-black sm:right-6 sm:top-6"
            >
              <IconClose className="h-5 w-5" />
            </button>
            <div
              className="relative h-full max-h-[85vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryPhotos[openIndex].src}
                alt={galleryPhotos[openIndex].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
