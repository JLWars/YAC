"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { business, affaires, type LogoCrop } from "@/lib/business";
import { IconArrowRight, IconChevronDown, IconPhone, IconStar } from "./icons";

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

type StarLogo = { src: string; width: number; height: number; alt: string };

type LogoProps = { logo: StarLogo; crop: LogoCrop; scale?: number; compact: boolean };

/**
 * Logo « étoile » détouré, seul et en grand : pas de cadre, fond ni ombre.
 * Les deux cartes ont un cadre identique ; dedans, une boîte au ratio de la zone
 * réellement dessinée (crop mesuré dans business.ts) prend toute la hauteur
 * (× scale) et l'image déborde de cette boîte uniquement par son vide transparent
 * (overflow visible : rien n'est coupé).
 */
function StoreLogo({ logo, crop, scale = 1, compact }: LogoProps) {
  const cw = 100 - crop.left - crop.right;
  const ch = 100 - crop.top - crop.bottom;
  const drawnRatio = (logo.width * cw) / (logo.height * ch);
  return (
    <div
      className={`flex aspect-[21/10] w-[88%] items-center justify-center ${
        compact ? "max-h-[26dvh] max-w-sm" : "max-h-[min(40dvh,calc(100dvh-24rem))] max-w-[36rem]"
      }`}
    >
      <div className="relative" style={{ height: `${scale * 100}%`, aspectRatio: drawnRatio }}>
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          priority
          sizes={compact ? "85vw" : "(min-width: 1024px) 40vw, 45vw"}
          className="absolute max-w-none"
          style={{
            width: `${(100 * 100) / cw}%`,
            height: `${(100 * 100) / ch}%`,
            left: `${(-crop.left * 100) / cw}%`,
            top: `${(-crop.top * 100) / ch}%`,
          }}
        />
      </div>
    </div>
  );
}

type BaseProps = LogoProps & { tagline: ReactNode; children?: ReactNode };

/**
 * Logo + accroche (+ détails en desktop). Seuls le cadre du logo et l'accroche
 * (même hauteur sur les deux panneaux) sont dans le flux : logos et accroches
 * restent alignés. Les détails s'empilent juste sous l'accroche, en absolu,
 * avec leur hauteur naturelle ; la place nécessaire est réservée par le pb du
 * panneau.
 */
function StoreBase({ tagline, children, ...logo }: BaseProps) {
  return (
    <div className="relative flex w-full flex-col items-center text-center">
      <StoreLogo {...logo} />
      {tagline}
      {children ? <div className="absolute inset-x-0 top-full">{children}</div> : null}
    </div>
  );
}

const taglineClass = "mt-2 font-display text-base uppercase tracking-wide sm:text-lg";

function ImbattableBase({ compact = false, children }: { compact?: boolean; children?: ReactNode }) {
  return (
    <StoreBase
      logo={business.logoStar}
      crop={business.logoStarCrop}
      scale={business.logoStarScale}
      compact={compact}
      tagline={<p className={`${taglineClass} text-brand-black`}>{business.slogan}</p>}
    >
      {children}
    </StoreBase>
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
        {business.rating.toFixed(1).replace(".", ",")} · {business.reviewCount} avis Google
      </p>
    </div>
  );
}

function AffairesBase({ compact = false, children }: { compact?: boolean; children?: ReactNode }) {
  return (
    <StoreBase
      logo={affaires.logoStar}
      crop={affaires.logoStarCrop}
      scale={affaires.logoStarScale}
      compact={compact}
      tagline={<p className={`${taglineClass} text-affaires-yellow`}>{affaires.tagline}</p>}
    >
      {children}
    </StoreBase>
  );
}

function AffairesDetails() {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90 sm:text-sm">
        <IconStar className="h-3.5 w-3.5 text-affaires-yellow" />
        {affaires.proximity}
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

  /** Détails desktop : accroche → détails → bouton, mêmes espacements sur les
   *  deux cartes, hauteur naturelle (Affaires plus court qu'Imbattable). */
  const detailsClass = (visible: boolean) =>
    `mt-[clamp(0.75rem,3dvh,1.5rem)] flex w-full flex-col items-center gap-5 transition-all duration-[450ms] ${
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
          {/* pb = bandeau rayé (1rem) + marge (1,5rem) + place réservée aux détails
              les plus longs (Imbattable : chips, avis, tél., bouton ≈ 14,5rem) */}
          <div className="relative flex h-full flex-col items-center justify-center px-6 pb-[17rem] pt-6 lg:px-10">
            <ImbattableBase>
              <div className={detailsClass(active === "imbattable")} aria-hidden={active !== "imbattable"}>
                <div>
                  <ImbattableDetails />
                </div>
                <Link href="/limbattable" tabIndex={active === "imbattable" ? 0 : -1} onClick={(e) => e.stopPropagation()}>
                  <DiscoverCTA store="imbattable" />
                </Link>
              </div>
            </ImbattableBase>
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
          {/* pb = bandeau rayé (1rem) + marge (1,5rem) + place réservée aux détails
              les plus longs (Imbattable : chips, avis, tél., bouton ≈ 14,5rem) */}
          <div className="relative flex h-full flex-col items-center justify-center px-6 pb-[17rem] pt-6 lg:px-10">
            <AffairesBase>
              <div className={detailsClass(active === "affaires")} aria-hidden={active !== "affaires"}>
                <div>
                  <AffairesDetails />
                </div>
                <Link href="/affaires" tabIndex={active === "affaires" ? 0 : -1} onClick={(e) => e.stopPropagation()}>
                  <DiscoverCTA store="affaires" />
                </Link>
              </div>
            </AffairesBase>
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
                  href={affaires.phoneHref}
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
