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
};

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
