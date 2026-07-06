"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { business, affaires } from "@/lib/business";
import { IconArrowRight, IconBolt, IconChevronDown, IconPhone, IconStar } from "./icons";

type StoreId = "imbattable" | "affaires";

const EASE = "cubic-bezier(.4,0,.2,1)";

const imbattableCategories = [
  "Brico",
  "Déco",
  "Sport",
  "Bazar",
  "Jardin",
  "Hi-Fi",
  "Vidéo",
  "Alimentaire",
];

/* ---------- Contenu des panneaux (partagé desktop / mobile) ---------- */

function ImbattableBase({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className={`rounded-2xl bg-white p-3 shadow-[4px_4px_0_0_#141414] ${compact ? "w-40" : "w-44 sm:w-52 lg:w-64"}`}>
        <Image
          src="/logo-imbattable.png"
          alt="Logo YAC L'Imbattable"
          width={730}
          height={352}
          priority
          className="h-auto w-full"
        />
      </div>
      <h2 className="mt-5 font-display text-3xl uppercase leading-none tracking-tight text-white sm:text-4xl lg:text-5xl">
        YAC <span className="text-brand-yellow">L&apos;Imbattable</span>
      </h2>
      <p className="mt-2 font-display text-base uppercase tracking-wide text-brand-yellow sm:text-lg">
        Discounter depuis 1974
      </p>
    </div>
  );
}

function ImbattableDetails() {
  return (
    <div className="flex flex-col items-center text-center">
      <ul className="flex max-w-md flex-wrap justify-center gap-1.5 sm:gap-2">
        {imbattableCategories.map((cat) => (
          <li
            key={cat}
            className="rounded-full border border-white/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white sm:text-sm"
          >
            {cat}
          </li>
        ))}
      </ul>
      <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-white sm:text-base">
        <IconStar className="h-4 w-4 text-brand-yellow" />
        4,2 · {business.reviewCount} avis Google
      </p>
      <p className="mt-1 text-sm text-white/85">{business.phoneDisplay}</p>
    </div>
  );
}

function AffairesBase({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className={`rounded-2xl bg-white p-3 shadow-[4px_4px_0_0_#000000] ${compact ? "w-40" : "w-44 sm:w-52 lg:w-64"}`}>
        <Image
          src="/logo-affaires.png"
          alt="Logo YAC Affaires"
          width={734}
          height={345}
          priority
          className="h-auto w-full"
        />
      </div>
      <h2 className="mt-5 flex items-center gap-2 font-display text-3xl uppercase leading-none tracking-tight text-white sm:text-4xl lg:text-5xl">
        YAC <span className="text-affaires-red">Affaires</span>
        <IconBolt className="h-6 w-6 text-affaires-yellow sm:h-8 sm:w-8" />
      </h2>
      <p className="mt-2 font-display text-base uppercase tracking-wide text-affaires-yellow sm:text-lg">
        {affaires.tagline}
      </p>
    </div>
  );
}

function AffairesDetails() {
  return (
    <div className="flex flex-col items-center text-center">
      <ul className="flex flex-wrap justify-center gap-2">
        {affaires.categories.map((cat) => (
          <li
            key={cat}
            className="rounded-full bg-affaires-anthracite-dark px-4 py-1.5 font-display text-xs uppercase tracking-wide text-affaires-yellow ring-1 ring-affaires-yellow/60 sm:text-sm"
          >
            {cat}
          </li>
        ))}
      </ul>
      <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90 sm:text-sm">
        <IconStar className="h-3.5 w-3.5 text-affaires-yellow" />
        {affaires.proximity}
      </p>
      <p className="mt-2 text-xs italic text-white/60 sm:text-sm">
        Adresse &amp; horaires : infos à venir
      </p>
    </div>
  );
}

function DiscoverCTA({ store }: { store: StoreId }) {
  const isImb = store === "imbattable";
  return (
    <span
      className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 px-6 py-2.5 font-display text-sm uppercase tracking-wide transition-transform hover:scale-[1.03] sm:text-base ${
        isImb
          ? "border-brand-black bg-brand-yellow text-brand-black shadow-[4px_4px_0_0_#141414]"
          : "border-black bg-affaires-yellow text-brand-black shadow-[4px_4px_0_0_#000000]"
      }`}
    >
      Découvrir le magasin
      <IconArrowRight className="h-4 w-4" />
    </span>
  );
}

/* ---------- Split hero ---------- */

export default function SplitHero() {
  const router = useRouter();
  // Capacité de survol (desktop souris) vs tactile (iPad) — via media query, pas le user-agent
  const [canHover, setCanHover] = useState(false);
  // Panneau étendu en horizontal (hover desktop / tap iPad)
  const [active, setActive] = useState<StoreId | null>(null);
  // Bloc ouvert en vertical (mobile) — L'Imbattable ouvert par défaut
  const [mobileOpen, setMobileOpen] = useState<StoreId>("imbattable");

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const storeHref = (store: StoreId) => (store === "imbattable" ? "/limbattable" : "/affaires");

  const handlePanelClick = (store: StoreId) => {
    if (canHover || active === store) {
      router.push(storeHref(store));
    } else {
      // iPad / tactile : 1er tap = étendre, 2e tap = naviguer
      setActive(store);
    }
  };

  const horizontalStyle = (store: StoreId) => ({
    flexGrow: active === store ? 2.1 : active ? 0.7 : 1,
    flexBasis: 0,
    transition: `flex-grow 450ms ${EASE}, filter 450ms ${EASE}`,
    filter: active && active !== store ? "brightness(0.55)" : "brightness(1)",
  });

  const verticalStyle = (store: StoreId) => ({
    flexGrow: mobileOpen === store ? 5 : 0.9,
    flexBasis: 0,
    transition: `flex-grow 400ms ${EASE}`,
  });

  const detailsClass = (visible: boolean) =>
    `flex flex-col items-center gap-5 transition-all duration-[450ms] ${
      visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2.5 opacity-0"
    }`;

  return (
    <div className="flex h-[100dvh] min-h-[540px] flex-col overflow-hidden">
      {/* ===== DESKTOP + TABLETTE (≥768px) : split horizontal ===== */}
      <div className="hidden h-full w-full flex-row md:flex">
        {/* Panneau L'Imbattable */}
        <section
          role="link"
          tabIndex={0}
          aria-label="YAC L'Imbattable — découvrir le magasin"
          style={horizontalStyle("imbattable")}
          onMouseEnter={canHover ? () => setActive("imbattable") : undefined}
          onMouseLeave={canHover ? () => setActive(null) : undefined}
          onFocusCapture={() => setActive("imbattable")}
          onClick={() => handlePanelClick("imbattable")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              router.push("/limbattable");
            }
          }}
          className="relative min-w-0 cursor-pointer overflow-hidden bg-brand-red outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-brand-yellow"
        >
          <div className="bg-halftone pointer-events-none absolute inset-0 text-black/10" />
          <div className="relative flex h-full flex-col items-center justify-center gap-6 px-6 py-10 lg:px-10">
            <ImbattableBase />
            <div className={detailsClass(active === "imbattable")} aria-hidden={active !== "imbattable"}>
              <ImbattableDetails />
              <Link href="/limbattable" tabIndex={active === "imbattable" ? 0 : -1} onClick={(e) => e.stopPropagation()}>
                <DiscoverCTA store="imbattable" />
              </Link>
            </div>
          </div>
          <div className="bg-hazard-stripes absolute inset-x-0 bottom-0 h-4" />
        </section>

        {/* Panneau Affaires */}
        <section
          role="link"
          tabIndex={0}
          aria-label="YAC Affaires — découvrir le magasin"
          style={horizontalStyle("affaires")}
          onMouseEnter={canHover ? () => setActive("affaires") : undefined}
          onMouseLeave={canHover ? () => setActive(null) : undefined}
          onFocusCapture={() => setActive("affaires")}
          onClick={() => handlePanelClick("affaires")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              router.push("/affaires");
            }
          }}
          className="relative min-w-0 cursor-pointer overflow-hidden bg-affaires-anthracite outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-affaires-yellow"
        >
          <div className="bg-striated pointer-events-none absolute inset-0" />
          <div className="relative flex h-full flex-col items-center justify-center gap-6 px-6 py-10 lg:px-10">
            <AffairesBase />
            <div className={detailsClass(active === "affaires")} aria-hidden={active !== "affaires"}>
              <AffairesDetails />
              <Link href="/affaires" tabIndex={active === "affaires" ? 0 : -1} onClick={(e) => e.stopPropagation()}>
                <DiscoverCTA store="affaires" />
              </Link>
            </div>
          </div>
          <div className="bg-hazard-stripes absolute inset-x-0 bottom-0 h-4" />
        </section>
      </div>

      {/* ===== MOBILE (<768px) : empilé vertical, tout au tap ===== */}
      <div className="flex h-full w-full flex-col md:hidden">
        {/* Bloc L'Imbattable */}
        <section
          style={verticalStyle("imbattable")}
          className="relative min-h-0 overflow-hidden bg-brand-red"
        >
          <div className="bg-halftone pointer-events-none absolute inset-0 text-black/10" />
          {mobileOpen === "imbattable" ? (
            <div className="relative flex h-full flex-col items-center justify-center gap-4 overflow-y-auto px-5 py-6">
              <ImbattableBase compact />
              <ImbattableDetails />
              <div className="flex w-full max-w-xs flex-col gap-3">
                <Link href="/limbattable" className="w-full">
                  <span className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border-2 border-brand-black bg-brand-yellow px-6 font-display text-sm uppercase tracking-wide text-brand-black shadow-[4px_4px_0_0_#141414]">
                    Découvrir le magasin
                    <IconArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <a
                  href={business.phoneHref}
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border-2 border-white px-6 font-display text-sm uppercase tracking-wide text-white"
                >
                  <IconPhone className="h-4 w-4" />
                  Appeler
                </a>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setMobileOpen("imbattable")}
              aria-expanded={false}
              className="relative flex h-full w-full items-center justify-center gap-3 px-5"
            >
              <span className="font-display text-xl uppercase tracking-tight text-white">
                YAC <span className="text-brand-yellow">L&apos;Imbattable</span>
              </span>
              <IconChevronDown className="h-5 w-5 rotate-180 text-brand-yellow" />
            </button>
          )}
        </section>

        <div className="bg-hazard-stripes h-3 w-full shrink-0" />

        {/* Bloc Affaires */}
        <section
          style={verticalStyle("affaires")}
          className="relative min-h-0 overflow-hidden bg-affaires-anthracite"
        >
          <div className="bg-striated pointer-events-none absolute inset-0" />
          {mobileOpen === "affaires" ? (
            <div className="relative flex h-full flex-col items-center justify-center gap-4 overflow-y-auto px-5 py-6">
              <AffairesBase compact />
              <AffairesDetails />
              <div className="flex w-full max-w-xs flex-col gap-3">
                <Link href="/affaires" className="w-full">
                  <span className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border-2 border-black bg-affaires-yellow px-6 font-display text-sm uppercase tracking-wide text-brand-black shadow-[4px_4px_0_0_#000000]">
                    Découvrir le magasin
                    <IconArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <a
                  href={business.phoneHref}
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border-2 border-white px-6 font-display text-sm uppercase tracking-wide text-white"
                >
                  <IconPhone className="h-4 w-4" />
                  Appeler (accueil YAC)
                </a>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setMobileOpen("affaires")}
              aria-expanded={false}
              className="relative flex h-full w-full items-center justify-center gap-3 px-5"
            >
              <span className="font-display text-xl uppercase tracking-tight text-white">
                YAC <span className="text-affaires-red">Affaires</span>
              </span>
              <IconChevronDown className="h-5 w-5 text-affaires-yellow" />
            </button>
          )}
        </section>
      </div>
    </div>
  );
}
