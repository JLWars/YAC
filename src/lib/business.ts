/** Photo lifestyle détourée placée en fond de hero. `null` tant que l'asset
 *  n'est pas fourni : le composant n'affiche alors rien (zone vide propre). */
export type HeroPhoto = { src: string; alt: string } | null;

export type HeroFeature = {
  /** clé mappée vers une icône lucide-react dans FeatureStrip */
  icon: "truck" | "gem" | "leaf" | "users";
  title: string;
  text: string;
};

export const business = {
  name: "YAC L'Imbattable",
  slogan: "Discounter depuis 1974",
  phoneDisplay: "04 94 53 37 01",
  phoneHref: "tel:+33494533701",
  address: "1683 route des Anciens Combattants d'AFN, 83600 Fréjus",
  addressQuery: "1683+route+des+Anciens+Combattants+d'AFN,+83600+Fréjus",
  rating: 4.2,
  reviewCount: 888,
  facebookFollowers: "20 000",
  facebookHref: "https://www.facebook.com/search/top?q=YAC%20L%27Imbattable%20Fr%C3%A9jus",
  category: "Boutique décoration et jardin",
  sinceYear: 1974,
  heroLogo: {
    src: "/logo-imbattable-hero.png",
    width: 1448,
    height: 1086,
    alt: "Logo YAC L'Imbattable",
  },
  socialCta: "Suivez-nous sur nos réseaux pour être au courant de toutes nos bonnes affaires !",

  // --- Hero redesign (maquette da_yac) ---
  heroEyebrow: "Fréjus – Boutique décoration et jardin",
  heroTagline: "Discounter depuis 1974",
  heroDescription:
    "Déstockage de marchandises en tous genres à prix discount suite à saisies, liquidations, fins de séries et changements de collections.",
  socialFollow: {
    title: "Suivez-nous sur nos réseaux",
    subtitle: "pour être au courant de toutes nos bonnes affaires !",
    community: "Rejoignez notre communauté !",
  },
  stickyNote: { text: "Des bonnes affaires toute l'année !" },
  heroPhotos: {
    left: null as HeroPhoto,
    right: null as HeroPhoto,
  },
  features: [
    { icon: "truck", title: "DES PRIX IMBATTABLES", text: "Sur des milliers d'articles" },
    { icon: "gem", title: "DES MARQUES VARIÉES", text: "Qualité et bonnes affaires" },
    { icon: "leaf", title: "DÉCO, MAISON, JARDIN...", text: "Un univers pour tous vos projets" },
    { icon: "users", title: "UNE ÉQUIPE À VOTRE ÉCOUTE", text: "Conseils et accueil chaleureux" },
  ] as HeroFeature[],
  bottomBanner: { text: "L'Imbattable, bien plus qu'un magasin !" },
};

/** YAC Affaires — second magasin, même bâtiment, entrée voisine.
 *  Coordonnées propres (adresse exacte, tél, horaires) : placeholders en
 *  attente des infos client. */
export const affaires = {
  name: "YAC Affaires",
  tagline: "Brico · Jardin · Déco",
  proximity: "Même bâtiment, entrée voisine",
  categories: ["Brico", "Jardin", "Déco"] as const,
  // Placeholders — à compléter après RDV client
  addressPlaceholder: "Adresse exacte à confirmer (même bâtiment que L'Imbattable)",
  phonePlaceholder: "Numéro à confirmer",
  hoursPlaceholder: "Horaires à confirmer",
  heroLogo: {
    src: "/logo-affaires-hero.png",
    width: 1672,
    height: 941,
    alt: "Logo YAC Affaires",
  },
  socialCta: "Suivez-nous pour ne rien manquer de nos arrivages brico, jardin & déco !",

  // --- Hero redesign (même structure que L'Imbattable, identité Affaires) ---
  heroEyebrow: "Fréjus – Brico, jardin & déco",
  heroTagline: "Le coin brico, jardin & déco",
  heroDescription:
    "Les bonnes affaires YAC, version maison et extérieur : outillage, jardin et décoration à prix discount, dans le même bâtiment que L'Imbattable — entrée voisine.",
  socialFollow: {
    title: "Suivez-nous sur nos réseaux",
    subtitle: "pour ne rien manquer de nos arrivages brico, jardin & déco !",
    community: "Rejoignez notre communauté !",
  },
  stickyNote: { text: "Des idées brico & déco toute l'année !" },
  heroPhotos: {
    left: null as HeroPhoto,
    right: null as HeroPhoto,
  },
  features: [
    { icon: "truck", title: "DES PRIX MALINS", text: "Sur l'outillage et le jardin" },
    { icon: "gem", title: "DES MARQUES VARIÉES", text: "Qualité et bonnes affaires" },
    { icon: "leaf", title: "BRICO, JARDIN, DÉCO...", text: "Tout pour la maison et l'extérieur" },
    { icon: "users", title: "UNE ÉQUIPE À VOTRE ÉCOUTE", text: "Conseils et accueil chaleureux" },
  ] as HeroFeature[],
  bottomBanner: { text: "YAC Affaires, la bonne affaire côté maison !" },
};

export const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100069122850772",
    icon: "facebook",
    blurb: "Actualités et arrivages",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/yaclimbattable/reels/",
    icon: "instagram",
    blurb: "Nos coups de cœur",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@yaclimbattable",
    icon: "tiktok",
    blurb: "Vidéos et inspirations",
  },
] as const;

export const galleryPhotos = [
  { src: "/photos/magasin-1.jpg", alt: "Le magasin YAC à Fréjus" },
  { src: "/photos/magasin-2.jpg", alt: "Rayons du magasin YAC à Fréjus" },
  { src: "/photos/magasin-3.jpg", alt: "Intérieur du magasin YAC à Fréjus" },
  { src: "/photos/magasin-4.jpg", alt: "Le magasin YAC à Fréjus" },
] as const;

export const mapsDirectionsHref = `https://www.google.com/maps/dir/?api=1&destination=${business.addressQuery}`;
export const mapsEmbedSrc = `https://www.google.com/maps?q=${business.addressQuery}&output=embed`;
export const googleReviewsHref = `https://www.google.com/maps/search/?api=1&query=${business.addressQuery}`;

export const hours = [
  { day: "Lundi", hours: "9h00 – 19h30" },
  { day: "Mardi", hours: "9h00 – 19h30" },
  { day: "Mercredi", hours: "9h00 – 19h30" },
  { day: "Jeudi", hours: "9h00 – 19h30" },
  { day: "Vendredi", hours: "9h00 – 19h30" },
  { day: "Samedi", hours: "9h00 – 19h30" },
  { day: "Dimanche", hours: "9h00 – 13h00" },
];
