import type { Metadata } from "next";
import {
  affaires,
  business,
  hours,
  infosFaq,
  mapsUrl,
  postalAddress,
  siteMeta,
  socialLinks,
  storeGeo,
} from "@/lib/business";

export const SITE_URL = siteMeta.url;

/** Image de partage commune (générée par scripts/seo-images.mjs). */
const shareImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "YAC L'Imbattable et YAC Affaires à Fréjus",
};

type PageText = { title: string; description: string; shareDescription?: string };

function shareMetadata({ title, description, shareDescription = description }: PageText) {
  return {
    title,
    description,
    openGraph: {
      title,
      description: shareDescription,
      siteName: siteMeta.name,
      locale: "fr_FR",
      type: "website",
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: shareDescription,
      images: [shareImage.url],
    },
  } satisfies Metadata;
}

/** Layout racine : base des URL absolues et valeurs par défaut (page 404 comprise),
 *  sans canonical ni og:url, propres à chaque page. */
export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...shareMetadata({ title: siteMeta.title, description: siteMeta.description, shareDescription: siteMeta.ogDescription }),
};

/**
 * Métadonnées d'une page : canonical, Open Graph et Twitter. Next fusionne
 * openGraph / twitter de façon superficielle entre layout et page : chaque page
 * redonne donc l'ensemble (image comprise) en plus de son og:url.
 */
export function pageMetadata({ path, ...text }: PageText & { path: string }): Metadata {
  const shared = shareMetadata(text);
  return {
    ...shared,
    alternates: { canonical: path },
    openGraph: { ...shared.openGraph, url: path },
  };
}

/* ---------- Données structurées (schema.org, JSON-LD) ---------- */

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const IMBATTABLE_ID = `${SITE_URL}/limbattable#store`;
const AFFAIRES_ID = `${SITE_URL}/affaires#store`;

const address = {
  "@type": "PostalAddress",
  streetAddress: postalAddress.street,
  postalCode: postalAddress.postalCode,
  addressLocality: postalAddress.city,
  addressCountry: postalAddress.country,
};

const geo = { "@type": "GeoCoordinates", ...storeGeo };

const phone = (href: string) => href.replace("tel:", "");

const absolute = (path: string) => `${SITE_URL}${path}`;

const DAYS: Record<string, string> = {
  Lundi: "Monday",
  Mardi: "Tuesday",
  Mercredi: "Wednesday",
  Jeudi: "Thursday",
  Vendredi: "Friday",
  Samedi: "Saturday",
  Dimanche: "Sunday",
};

/** hours (« 9h00 – 19h30 ») → OpeningHoursSpecification, jours aux mêmes horaires regroupés. */
function openingHours() {
  const specs: { "@type": string; dayOfWeek: string[]; opens: string; closes: string }[] = [];
  for (const { day, hours: h } of hours) {
    const [opens, closes] = h.split("–").map((t) => t.trim().replace("h", ":").padStart(5, "0"));
    const same = specs.find((s) => s.opens === opens && s.closes === closes);
    if (same) same.dayOfWeek.push(DAYS[day]);
    else specs.push({ "@type": "OpeningHoursSpecification", dayOfWeek: [DAYS[day]], opens, closes });
  }
  return specs;
}

const parentOrganization = { "@type": "Organization", "@id": ORGANIZATION_ID, name: siteMeta.name, url: `${SITE_URL}/` };

/** Store YAC L'Imbattable (/limbattable). Pas d'AggregateRating : Google interdit
 *  le balisage d'avis sur sa propre entreprise. */
export const imbattableJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": IMBATTABLE_ID,
  name: business.name,
  description: business.heroDescription,
  url: absolute("/limbattable"),
  telephone: phone(business.phoneHref),
  address,
  geo,
  hasMap: mapsUrl,
  openingHoursSpecification: openingHours(),
  image: absolute(business.logoStar.src),
  logo: absolute(business.logoStar.src),
  foundingDate: String(business.sinceYear),
  // Profil Instagram sans le suffixe /reels/ du lien affiché sur le site
  sameAs: socialLinks.map((link) => link.href.replace(/reels\/$/, "")),
  parentOrganization,
};

/** Store YAC Affaires (/affaires) : même adresse, numéro propre. Horaires et
 *  réseaux propres non fournis dans business.ts : non renseignés. */
export const affairesJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": AFFAIRES_ID,
  name: affaires.name,
  description: affaires.heroDescription,
  url: absolute("/affaires"),
  telephone: phone(affaires.phoneHref),
  address,
  geo,
  hasMap: mapsUrl,
  image: absolute(affaires.logoStar.src),
  logo: absolute(affaires.logoStar.src),
  foundingDate: affaires.openingDate,
  parentOrganization,
};

/** Home : le site (WebSite, pour le nom du site dans Google) et l'Organization
 *  « YAC Fréjus » qui relie les deux magasins. */
export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: siteMeta.name,
      url: `${SITE_URL}/`,
      inLanguage: "fr-FR",
      publisher: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: siteMeta.name,
      description: siteMeta.ogDescription,
      url: `${SITE_URL}/`,
      image: absolute(shareImage.url),
      address,
      subOrganization: [
        { "@type": "Store", "@id": IMBATTABLE_ID, name: business.name, url: absolute("/limbattable"), telephone: phone(business.phoneHref) },
        { "@type": "Store", "@id": AFFAIRES_ID, name: affaires.name, url: absolute("/affaires"), telephone: phone(affaires.phoneHref) },
      ],
    },
  ],
};

/** FAQ de /infos, mêmes questions et réponses que le texte affiché. */
export const infosFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: infosFaq.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};
