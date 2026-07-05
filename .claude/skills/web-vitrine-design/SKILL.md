---
name: web-vitrine-design
description: Standards de qualité visuelle, responsive et animation pour tout site vitrine client SITEO (Next.js/Tailwind/Framer Motion). À utiliser systématiquement lors de la création ou refonte d'un site client.
---

# Standards de design — Sites vitrines SITEO

## Palette & identité
- La palette s'adapte TOUJOURS à la marque du client (logo, couleurs existantes), jamais un template générique.
- Ne pas réutiliser automatiquement le style gold/champagne du site SITEO lui-même — chaque client a son propre univers visuel.
- Maximum 3 couleurs principales + 1 neutre (blanc/noir/gris) pour garder de la cohérence.

## Typographie
- Maximum 2 familles de police : une "display" impactante pour les titres/accroches, une sans-serif lisible pour le corps de texte.
- Taille de base ≥ 16px sur mobile, hiérarchie claire (h1 > h2 > body).

## Responsive (obligatoire, testé à chaque étape)
- Mobile : 375–428px
- Tablette (iPad inclus) : 768–1024px
- Desktop : 1280px et plus
- Aucun texte ne doit déborder ou être coupé à aucune de ces tailles.
- Zones cliquables/tactiles ≥ 44px de hauteur (boutons, liens de nav).
- Prioriser l'expérience mobile en premier (la majorité du trafic local vient du téléphone).

## Animations (Framer Motion)
- Fade-in + léger slide (translateY 10-20px) au scroll pour chaque section, durée 300-500ms max.
- Hover scale doux (1.02-1.05) sur les CTA et cartes, jamais d'animation qui bloque la lecture ou ralentit le scroll.
- Toujours respecter `prefers-reduced-motion` (désactiver ou réduire les animations si l'utilisateur l'a demandé côté OS).
- Une animation doit servir la lisibilité, pas la distraire.

## Structure de page
- Hero clair avec un CTA visible sans avoir à scroller.
- Preuve sociale (avis, chiffres, réputation) intégrée tôt dans la page si le client en a (avis Google, nombre de followers, etc.).
- Coordonnées (téléphone, adresse, horaires) accessibles en un clic depuis n'importe quelle page.

## Performance
- Images via `next/image`, lazy loading par défaut.
- Viser Lighthouse mobile > 90.

## Accessibilité
- Contraste texte/fond minimum AA (4.5:1 pour le texte courant).
- Alt text sur toutes les images.
- Focus visible au clavier sur tous les éléments interactifs.
