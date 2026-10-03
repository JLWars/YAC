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

/** Textes du hero dont certains champs sont facultatifs d'un magasin à l'autre.
 *  `heroEyebrow` absent = aucune étiquette au-dessus du logo. */
export type StoreHeroText = { heroEyebrow?: string };

/** Vide transparent autour du dessin d'un PNG, en % de sa largeur (left/right)
 *  et de sa hauteur (top/bottom). */
export type LogoCrop = { top: number; right: number; bottom: number; left: number };

/** PNG détourés (fond transparent) utilisés comme logo principal de chaque magasin :
 *  hero, carte de la home et header partagent le même fichier. */
const imbattableLogo = {
  src: "/logo-imbattable-hero.png",
  width: 1448,
  height: 1086,
  alt: "Logo YAC L'Imbattable",
};

/** Logo étoile au « YAC » jaune. Le PNG a ~10-11 % (de sa largeur) de vide
 *  transparent en haut et en bas. */
const affairesLogo = {
  src: "/logo-affaires-star.png",
  width: 1448,
  height: 1086,
  alt: "Logo YAC Affaires",
};

export const business = {
  name: "YAC L'Imbattable",
  slogan: "Discounter depuis 1974",
  phoneDisplay: "04 94 53 37 01",
  phoneHref: "tel:+33494533701",
  address: "1683 Rue des Combattants d'Afrique du Nord, 83600 Fréjus",
  rating: 4.3,
  reviewCount: 897,
  facebookFollowers: "20 000",
  facebookHref: "https://www.facebook.com/search/top?q=YAC%20L%27Imbattable%20Fr%C3%A9jus",
  category: "Boutique décoration et jardin",
  sinceYear: 1974,
  heroLogo: imbattableLogo,
  /** Logo du header (en haut à gauche) : même PNG que le hero. */
  headerLogo: imbattableLogo,
  socialCta: "Suivez-nous sur nos réseaux pour être au courant de toutes nos bonnes affaires !",

  // --- Hero redesign (maquette da_yac) ---
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
  /** Logo PNG détouré, affiché seul et en grand sur la carte de la home (même PNG que le hero). */
  logoStar: imbattableLogo,
  /** Zone dessinée de logo-imbattable-hero.png (1448×1086), mesurée avec sharp en
   *  lecture seule : pixels d'alpha > 2 (au-dessous, voile invisible de détourage).
   *  Boîte dessinée x 37→1418, y 195→864, soit 1382×670 px (ratio 2,06). */
  logoStarCrop: { top: 17.96, right: 2.0, bottom: 20.35, left: 2.56 } as LogoCrop,
  /** Correction d'échelle à l'œil sur la home : à hauteur égale, L'iMBATTABLE
   *  (ratio 2,06) paraît plus gros qu'AFFAIRES (1,80). */
  logoStarScale: 0.93,

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
 *  Numéro propre ; horaires pas encore fournis : rien n'est affiché
 *  tant qu'ils ne sont pas renseignés. */
export const affaires = {
  name: "YAC Affaires",
  phoneDisplay: "04 94 51 04 33",
  phoneHref: "tel:+33494510433",
  tagline: "La nouvelle adresse de la bonne affaire",
  proximity: "Même bâtiment, entrée voisine",
  /** Phrase de localisation de la section « Retrouvez-nous » de /affaires. */
  locationNote: "YAC Affaires se trouve dans le même bâtiment que YAC L'Imbattable, entrée voisine.",
  /** Version courte de locationNote, pour le footer. */
  locationShort: "Dans le même bâtiment que YAC L'Imbattable, entrée voisine",
  /** Logo « étoile » PNG détouré, affiché seul et en grand sur la carte de la home. */
  logoStar: affairesLogo,
  /** Zone dessinée de logo-affaires-star.png (1448×1086), mesurée avec sharp en
   *  lecture seule : pixels d'alpha > 2. Boîte dessinée x 25→1446, y 139→928,
   *  soit 1422×790 px (ratio 1,80). */
  logoStarCrop: { top: 12.8, right: 0.07, bottom: 14.46, left: 1.73 } as LogoCrop,
  logoStarScale: 1,
  footerNote: "Pièces uniques & petites séries à Fréjus.",
  /** trimY : resserre le vide transparent haut/bas (fraction de la largeur) pour
   *  garder l'encombrement de l'ancien logo du hero, sans rien rogner. */
  heroLogo: { ...affairesLogo, trimY: 0.07 },
  /** Logo du header (en haut à gauche) : même PNG que le hero. */
  headerLogo: affairesLogo,
  socialCta: "Suivez-nous pour ne rien manquer de nos nouveaux arrivages !",

  // --- Hero redesign (même structure que L'Imbattable, identité Affaires) ---
  heroTagline: "Pièces uniques, prix imbattables",
  heroDescription:
    "Pièces uniques et petites séries issues de palettes de produits mélangés, à prix discount : des arrivages renouvelés en permanence, dans le même bâtiment que L'Imbattable, entrée voisine.",
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
      "Depuis le 1er juillet 2026, dans le même bâtiment que YAC L'Imbattable, entrée voisine, découvrez YAC Affaires. Même esprit, même promesse de prix imbattables, mais une approche différente : ici, place à la pièce unique et à la toute petite série, issues de palettes de produits mélangés. Une sélection surprenante et renouvelée en permanence, pour les chineurs en quête de la trouvaille du jour.",
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

/** Fiche Google Maps de YAC (L'Imbattable et Affaires : même bâtiment). Seul lien
 *  de localisation / itinéraire / avis du site. Ne fonctionne pas dans un iframe. */
export const mapsUrl = "https://maps.app.goo.gl/vYBoSbUf5AimuedM8";
/** Carte intégrée (iframe) de la même fiche Google « Yac l'Imbattable »
 *  (id 0x12cea2c7f027a353:0x8c143b1aa302bee8, GPS 43.4501897, 6.7268917). */
export const mapsEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2893.5!2d6.7268917!3d43.4501897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cea2c7f027a353%3A0x8c143b1aa302bee8!2sYac%20l%27Imbattable!5e0!3m2!1sfr!2sfr!4v1759269600000!5m2!1sfr!2sfr";

export const hours = [
  { day: "Lundi", hours: "9h00 – 19h30" },
  { day: "Mardi", hours: "9h00 – 19h30" },
  { day: "Mercredi", hours: "9h00 – 19h30" },
  { day: "Jeudi", hours: "9h00 – 19h30" },
  { day: "Vendredi", hours: "9h00 – 19h30" },
  { day: "Samedi", hours: "9h00 – 19h30" },
  { day: "Dimanche", hours: "9h00 – 13h00" },
];
