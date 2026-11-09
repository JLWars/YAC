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
 *  automatiquement depuis public/galerie/<magasin>/ (voir npm run photos).
 *  `subtitle` absent = titre seul, sans ligne vide dessous. */
export type StoreGalleryContent = { title: string; subtitle?: string };

/** Transporteur d'un point relais. `logo` : chemin dans public/ (nom exact,
 *  casse comprise). `tileColor` : fond de la tuile = couleur des bords du fichier,
 *  lue au pixel près avec sharp, pour que les marges de l'image se fondent dans la
 *  tuile (blanc quand les bords sont transparents). `ownMargin` : l'image contient
 *  déjà ses propres marges, la tuile n'ajoute pas de retrait. */
export type RelayCarrier = {
  name: string;
  logo: string;
  tileColor: string;
  ownMargin?: boolean;
  /** Zoom d'affichage dans la tuile (overflow hidden), pour compenser les marges
   *  d'une image sans la modifier. Réglé pour que le dessin tienne dans la même
   *  zone que Pickup/DPD (72 % de la tuile) : rien n'est rogné. */
  logoScale?: number;
};
export type RelayPoints = { title: string; text: string; carriers: RelayCarrier[] };

/** Textes du hero dont certains champs sont facultatifs d'un magasin à l'autre.
 *  `heroEyebrow` absent = aucune étiquette au-dessus du logo. */
export type StoreHeroText = { heroEyebrow?: string };

/** Vide transparent autour du dessin d'un PNG, en % de sa largeur (left/right)
 *  et de sa hauteur (top/bottom). */
export type LogoCrop = { top: number; right: number; bottom: number; left: number };

/** Avis Google affiché sur le site (voir googleReviews). */
export type GoogleReview = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  store: "imbattable" | "affaires";
  text: string;
};

/** Logos détourés (fond transparent) utilisés comme logo principal de chaque magasin :
 *  hero, carte de la home et header partagent le même fichier. WebP générés par
 *  scripts/seo-images.mjs depuis les PNG d'origine (photos-source/logos/), même
 *  canevas 1448×1086 et alpha sans perte : les crops mesurés ci-dessous restent valables. */
const imbattableLogo = {
  src: "/logo-imbattable-hero.webp",
  width: 1448,
  height: 1086,
  alt: "Logo YAC L'Imbattable",
};

/** Logo étoile au « YAC » jaune. L'image a ~10-11 % (de sa largeur) de vide
 *  transparent en haut et en bas. */
const affairesLogo = {
  src: "/logo-affaires-star.webp",
  width: 1448,
  height: 1086,
  alt: "Logo YAC Affaires",
};

/** Adresse commune aux deux magasins (même bâtiment), aussi utilisée telle quelle
 *  dans les données structurées. */
export const postalAddress = {
  street: "1683 Rue des Combattants d'Afrique du Nord",
  postalCode: "83600",
  city: "Fréjus",
  country: "FR",
};

/** Avis Google de L'Imbattable : un palier qui ne se périme pas, plutôt qu'une note
 *  et un nombre exacts qui changent chaque semaine. Dernier relevé (début octobre
 *  2026) : juste sous ce palier, à vérifier sur la fiche avant mise en ligne. À
 *  relever quand la fiche dépasse le palier suivant. */
const REVIEWS_FLOOR = 900;

/** Majuscule initiale, pour placer un libellé en début de phrase. */
export function upperFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const business = {
  name: "YAC L'Imbattable",
  slogan: "Discounter depuis 1974",
  phoneDisplay: "04 94 53 37 01",
  phoneHref: "tel:+33494533701",
  address: `${postalAddress.street}, ${postalAddress.postalCode} ${postalAddress.city}`,
  reviews: {
    floor: REVIEWS_FLOOR,
    /** « plus de 900 avis » */
    count: `plus de ${REVIEWS_FLOOR} avis`,
    /** « plus de 900 avis Google » */
    label: `plus de ${REVIEWS_FLOOR} avis Google`,
  },
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
  /** Zone dessinée de logo-imbattable-hero (1448×1086), mesurée avec sharp en
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
      "YAC L'Imbattable : plus de 50 ans d'expertise. Une seule promesse : l'imbattable, tous les jours.",
  } as StoreAbout,

  gallery: {
    title: "Le magasin en images",
  } as StoreGalleryContent,

  relayPoints: {
    title: "Point relais colis",
    text: "Retirez et déposez vos colis Pickup, Chronopost et DPD directement au magasin.",
    carriers: [
      // pickup.webp 3840×1379 : bords transparents → tuile blanche
      { name: "Pickup", logo: "/relais/pickup.webp", tileColor: "#ffffff" },
      // chronopost.jpg 600×600 : bords blancs #ffffff, dessin 494×284 centré (82 % × 47 %)
      { name: "Chronopost", logo: "/relais/chronopost.jpg", tileColor: "#ffffff", ownMargin: true, logoScale: 1.35 },
      // dpd.png 4097×1822 : bords transparents → tuile blanche
      { name: "DPD", logo: "/relais/dpd.png", tileColor: "#ffffff" },
    ],
  } as RelayPoints,
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
  /** Zone dessinée de logo-affaires-star (1448×1086), mesurée avec sharp en
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
    "Pièces uniques, petites séries issues de palettes de produits mélangés, prix discount : des arrivages renouvelés en permanence, dans le même bâtiment que L'Imbattable, entrée voisine.",
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

  relayPoints: {
    title: "Point relais Vinted Go",
    text: "Déposez et retirez vos colis Vinted directement au magasin.",
    carriers: [
      // vinted.webp 1200×626 : bords #004756, dessin 685×178 (57 % × 28 %)
      { name: "Vinted Go", logo: "/relais/vinted.webp", tileColor: "#004756", ownMargin: true, logoScale: 1.25 },
    ],
  } as RelayPoints,

  // --- Contenu de la page /affaires ---
  seo: {
    title: "YAC Affaires — Pièces uniques & petites séries à Fréjus",
    description:
      "YAC Affaires à Fréjus : pièces uniques et petites séries à prix discount, arrivages permanents. Même bâtiment que YAC L'Imbattable, entrée voisine.",
  },
  newStat: { value: "2026", label: "Ouverture le 1er juillet" },
  /** Date d'ouverture (about + newStat : 1er juillet 2026), pour les données structurées. */
  openingDate: "2026-07-01",
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
  /** Nom de l'ensemble des deux magasins (Organization des données structurées). */
  name: "YAC Fréjus",
  url: "https://yacfrejus.fr",
  title: "YAC Fréjus — L'Imbattable & Affaires, deux magasins discount",
  /** H1 de la home (invisible, sr-only : la home n'affiche que les deux logos). */
  homeHeading: "YAC Fréjus — L'Imbattable et YAC Affaires, deux magasins discount à Fréjus",
  /** 148 caractères (Google tronque vers 155). */
  description:
    "YAC à Fréjus : L'Imbattable, discounter généraliste depuis 1974, et YAC Affaires, pièces uniques et petites séries. Deux magasins, un même bâtiment.",
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
/** Boutons d'avis : `read` ouvre la fiche Google Maps (« Lire nos avis »), `write` le
 *  formulaire d'avis direct (fiche Google Business → « Demander des avis »), pour tous
 *  les boutons « Laisser un avis ». */
export const reviewLinks = {
  read: mapsUrl,
  write: "https://g.page/r/Cei-AqMaOxSMEBM/review",
};

/** Avis Google réels, recopiés tels quels depuis la fiche (fautes et ponctuation
 *  comprises : ne rien corriger). Affichés par ReviewsMarquee ; jamais repris en
 *  données structurées Review / AggregateRating. */
export const googleReviews: GoogleReview[] = [
  {
    author: "Dmitriy S.",
    rating: 5,
    date: "décembre 2025",
    store: "imbattable",
    text: "Ce magasin est une caverne d’Ali Baba ! Je suis toujours impressionné par la quantité de mille et une petites choses qu’on peut y dénicher. Que vous cherchiez de la nourriture, des outils, des jouets ou des produits de beauté, vous les trouverez ici. Les rayons sont pleins à craquer, l’ambiance est vivante et on a l’impression de faire une chasse au trésor à chaque visite. Un coup de cœur pour ce lieu qui simplifie la vie et où l’on ne repart jamais les mains vides.",
  },
  {
    author: "Gerard S.",
    rating: 5,
    date: "juin 2026",
    store: "imbattable",
    text: "Le meilleur magasin pour faire les plus belles affaires, c’est une véritable caverne d’Ali baba, et je ne parle meme pas des prix, à faire absolument. Personnel très gentil",
  },
  {
    author: "Laura L.",
    rating: 5,
    date: "avril 2026",
    store: "imbattable",
    text: "Très bon magasin où on y trouve de tout a des prix vraiment intéressants, la possibilité de récupérer ses colis est également un plus ! Le parking est grand et le personnel sympathique, j’y retournerai !",
  },
  {
    author: "Corinne L.",
    rating: 5,
    date: "août 2026",
    store: "imbattable",
    text: "On y trouve de tout selon les arrivages a des prix intéressants même des choses auquel on ne penserait pas ..... ouverture même le Dimanche...personnel a l’écoute.mérite le détour.Achat récent d’un très bon matelas de qualité.Merci",
  },
  {
    author: "Jaya D.",
    rating: 5,
    date: "mai 2026",
    store: "imbattable",
    text: "Quoi dire? On trouve de tout et pas toujours les mêmes produits. Alimentaires et pour la maison avec des prix vraiment imbattables.",
  },
  {
    author: "Patrick G.",
    rating: 5,
    date: "novembre 2026",
    store: "imbattable",
    text: "Le coin des bonnes affaires pas chères. Personnel super sympa et en plus maintenant une surface avec que des vêtements",
  },
  {
    author: "Sylvain J.",
    rating: 5,
    date: "septembre 2026",
    store: "imbattable",
    text: "De vrais bonnes affaires, en rayon vaisselle, bricolage et alimentation. Idéal pour passer des vacances à petit prix.",
  },
  {
    author: "Sandy L.",
    rating: 5,
    date: "octobre 2026",
    store: "imbattable",
    text: "Magasin sympa avec beaucoup de choix que ce soit dans le linge, la vaisselle, la déco les produits ménagers, j’aime beaucoup",
  },
  {
    author: "Fanny A.",
    rating: 5,
    date: "janvier 2026",
    store: "imbattable",
    text: "C’est un endroit où j’aime aller voir la déco et chercher mes produits ménagers le personnel et le patron sont très sympa et accueillant",
  },
  {
    author: "Stéphane O.",
    rating: 4,
    date: "novembre 2025",
    store: "imbattable",
    text: "Un discount au personnel avenant et à l’écoute. Quelques arrivages réguliers de nouveaux produits et babioles pour un bon rapport qualité prix. Je recommande",
  },
];

/** Coordonnées GPS de cette fiche Google (les mêmes que dans mapsEmbedUrl). */
export const storeGeo = { latitude: 43.4501897, longitude: 6.7268917 };

export const hours = [
  { day: "Lundi", hours: "9h00 – 19h30" },
  { day: "Mardi", hours: "9h00 – 19h30" },
  { day: "Mercredi", hours: "9h00 – 19h30" },
  { day: "Jeudi", hours: "9h00 – 19h30" },
  { day: "Vendredi", hours: "9h00 – 19h30" },
  { day: "Samedi", hours: "9h00 – 19h30" },
  { day: "Dimanche", hours: "9h00 – 13h00" },
];

const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

/** « du lundi au samedi de 9h00 à 19h30, le dimanche de 9h00 à 13h00 » : jours
 *  consécutifs aux mêmes horaires regroupés. */
function hoursSentence(): string {
  const groups: { first: string; last: string; hours: string }[] = [];
  for (const { day, hours: h } of hours) {
    const prev = groups[groups.length - 1];
    if (prev && prev.hours === h) prev.last = day;
    else groups.push({ first: day, last: day, hours: h });
  }
  return groups
    .map(({ first, last, hours: h }) => {
      const [opens, closes] = h.split("–").map((t) => t.trim());
      const days = first === last ? `le ${lowerFirst(first)}` : `du ${lowerFirst(first)} au ${lowerFirst(last)}`;
      return `${days} de ${opens} à ${closes}`;
    })
    .join(", ");
}

/** FAQ de /infos (affichée et reprise en JSON-LD FAQPage) : réponses construites
 *  uniquement à partir des données ci-dessus. Pas de question parking / accès :
 *  aucune information fournie. */
export const infosFaq: { question: string; answer: string }[] = [
  {
    question: `Quels sont les horaires de ${business.name} ?`,
    answer: `${business.name} est ouvert 7j/7 : ${hoursSentence()}.`,
  },
  {
    question: "Où se trouvent les magasins YAC à Fréjus ?",
    answer: `${business.name} se trouve au ${business.address}. ${affaires.locationNote}`,
  },
  {
    question: `Quelle est la différence entre ${business.name} et ${affaires.name} ?`,
    answer: `${business.name}, discounter depuis ${business.sinceYear}, propose le déstockage de marchandises en tous genres à prix discount suite à saisies, liquidations, fins de séries et changements de collections. ${affaires.name}, ouvert depuis le 1er juillet 2026, propose des pièces uniques et des petites séries issues de palettes de produits mélangés, avec des arrivages renouvelés en permanence.`,
  },
  {
    question: "Peut-on retirer ou déposer un colis chez YAC ?",
    answer: `Oui. Chez ${business.name}, ${lowerFirst(business.relayPoints.text)} Chez ${affaires.name} (${lowerFirst(affaires.relayPoints.title)}), ${lowerFirst(affaires.relayPoints.text)}`,
  },
  {
    question: "Comment joindre les magasins par téléphone ?",
    answer: `${business.name} : ${business.phoneDisplay}. ${affaires.name} : ${affaires.phoneDisplay}.`,
  },
];
