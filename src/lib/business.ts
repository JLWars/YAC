/** Photo lifestyle détourée placée en fond de hero. `null` tant que l'asset
 *  n'est pas fourni : le composant n'affiche alors rien (zone vide propre). */
export type HeroPhoto = { src: string; alt: string } | null;

export type HeroFeature = {
  /** clé mappée vers une icône lucide-react dans FeatureStrip */
  icon: "truck" | "gem" | "leaf" | "users";
  title: string;
  text: string;
};

/** Section « présentation » affichée sous le hero de chaque page magasin. */
export type StoreAbout = { title: string; paragraphs: string[]; closing: string };

/** En-tête de la galerie photos. Les photos elles-mêmes sont listées
 *  automatiquement depuis public/galerie/<magasin>/ (voir npm run photos). */
export type StoreGalleryContent = { title: string; subtitle: string };

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
  /** Logo « étoile » PNG détouré, affiché seul et en grand sur la carte de la home. */
  logoStar: { src: "/logo-imbattable-star.png", width: 1448, height: 1086, alt: "Logo YAC L'Imbattable" },

  about: {
    title: "YAC L'Imbattable, votre référence discount depuis 1974.",
    paragraphs: [
      "Historiquement spécialisé dans le traitement de sinistres en tous genres (dégâts des eaux, incendies, inondations), le magasin a su faire évoluer son offre au fil du temps. Depuis longtemps désormais, les arrivages proviennent de fins de séries, changements de collections, sur-stocks et faillites, pour vous garantir toujours les meilleures affaires.",
      "Côté ouverture, le chemin parcouru est tout aussi remarquable : du premier samedi de chaque mois, pendant huit jours, à une ouverture 7j/7 depuis 2018. Une accessibilité totale, pour une offre toujours plus large, disponible chaque jour de la semaine.",
    ],
    closing:
      "YAC L'Imbattable : plus de 50 ans d'expertise, une seule promesse : l'imbattable, tous les jours.",
  } as StoreAbout,

  gallery: {
    title: "Le magasin en images",
    subtitle: "Faites le tour des rayons avant de venir !",
  } as StoreGalleryContent,
};

/** YAC Affaires — second magasin, même bâtiment, entrée voisine.
 *  Coordonnées propres (adresse exacte, tél, horaires) : placeholders en
 *  attente des infos client. */
export const affaires = {
  name: "YAC Affaires",
  tagline: "La nouvelle adresse de la bonne affaire",
  proximity: "Même bâtiment, entrée voisine",
  /** Logo « étoile » PNG détouré, affiché seul et en grand sur la carte de la home. */
  logoStar: { src: "/logo-affaires-star.png", width: 1448, height: 1086, alt: "Logo YAC Affaires" },
  footerNote: "Pièces uniques & petites séries à Fréjus.",
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
  socialCta: "Suivez-nous pour ne rien manquer de nos nouveaux arrivages !",

  // --- Hero redesign (même structure que L'Imbattable, identité Affaires) ---
  heroEyebrow: "Fréjus – Pièces uniques & petites séries",
  heroTagline: "Pièces uniques, prix imbattables",
  heroDescription:
    "Pièces uniques et petites séries issues de palettes de produits mélangés, à prix discount : des arrivages renouvelés en permanence, dans le même bâtiment que L'Imbattable — entrée voisine.",
  socialFollow: {
    title: "Suivez-nous sur nos réseaux",
    subtitle: "pour ne rien manquer de nos nouveaux arrivages !",
    community: "Rejoignez notre communauté !",
  },
  stickyNote: { text: "Une nouvelle trouvaille chaque jour !" },
  heroPhotos: {
    left: null as HeroPhoto,
    right: null as HeroPhoto,
  },
  features: [
    { icon: "truck", title: "DES PRIX MALINS", text: "Sur des pièces uniques" },
    { icon: "gem", title: "DES MARQUES VARIÉES", text: "Qualité et bonnes affaires" },
    { icon: "leaf", title: "PIÈCES UNIQUES, PETITES SÉRIES...", text: "Des arrivages renouvelés en permanence" },
    { icon: "users", title: "UNE ÉQUIPE À VOTRE ÉCOUTE", text: "Conseils et accueil chaleureux" },
  ] as HeroFeature[],
  bottomBanner: { text: "YAC Affaires, la trouvaille du jour !" },

  about: {
    title: "YAC Affaires, la nouvelle adresse de la bonne affaire.",
    paragraphs: [
      "Depuis le 1er juillet 2026, juste au-dessus de YAC L'Imbattable, découvrez YAC Affaires. Même esprit, même promesse de prix imbattables, mais une approche différente : ici, place à la pièce unique et à la toute petite série, issues de palettes de produits mélangés. Une sélection surprenante et renouvelée en permanence, pour les chineurs en quête de la trouvaille du jour.",
    ],
    closing: "YAC Affaires : chaque visite est une découverte.",
  } as StoreAbout,

  gallery: {
    title: "YAC Affaires en images",
    subtitle: "Les trouvailles du moment… elles ne restent jamais longtemps !",
  } as StoreGalleryContent,

  // --- Contenu de la page /affaires ---
  seo: {
    title: "YAC Affaires — Pièces uniques & petites séries à Fréjus",
    description:
      "YAC Affaires à Fréjus : pièces uniques et petites séries à prix discount, arrivages renouvelés en permanence. Même bâtiment que YAC L'Imbattable, entrée voisine.",
  },
  newStat: { value: "2026", label: "Ouverture le 1er juillet" },
  offer: {
    title: "Pièces uniques, petites séries :",
    accent: "la chasse est ouverte",
    items: [
      {
        icon: "tag",
        title: "Pièces uniques",
        text: "Des articles souvent en un seul exemplaire, introuvables ailleurs.",
      },
      {
        icon: "box",
        title: "Petites séries",
        text: "Quelques exemplaires seulement : quand c'est parti, c'est parti.",
      },
      {
        icon: "star",
        title: "Arrivages permanents",
        text: "Des palettes de produits mélangés déballées en continu.",
      },
      {
        icon: "box",
        title: "Et bien plus",
        text: "Arrivages et lots à découvrir directement en magasin.",
      },
    ] as { icon: "tag" | "box" | "star"; title: string; text: string }[],
  },
  closingTitle: "Envie de dénicher la trouvaille du jour ?",
};

/** Métadonnées globales du site (layout racine). */
export const siteMeta = {
  title: "YAC Fréjus — L'Imbattable & Affaires, deux magasins discount",
  description:
    "YAC à Fréjus : deux magasins dans le même bâtiment. L'Imbattable, discounter généraliste depuis 1974, et YAC Affaires, la nouvelle adresse de la bonne affaire : pièces uniques et petites séries.",
  ogDescription:
    "Deux magasins, un même bâtiment : L'Imbattable (discount généraliste depuis 1974) et YAC Affaires (pièces uniques et petites séries) à Fréjus.",
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
