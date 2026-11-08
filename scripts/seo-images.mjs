// Images SEO : logos WebP + image de partage (Open Graph / Twitter)
// Usage : node scripts/seo-images.mjs
//
// Sources : photos-source/logos/*.png (PNG d'origine, non versionnés)
// - public/logo-imbattable-hero.webp, public/logo-affaires-star.webp : même canevas
//   1448×1086 que les PNG (cadrage et crops de business.ts inchangés). C'est la bonne
//   taille : le plus grand affichage (carte de la home au survol) fait ~716 px CSS,
//   soit ~1430 px sur écran Retina. WebP q80 + smartSubsample (bords rouge/noir nets),
//   alpha sans perte : < 100 Ko chacun.
// - public/og-image.jpg : 1200×630, fond rouge YAC, les deux logos, bandeau rayé.
import sharp from "sharp";

const SRC = "photos-source/logos";
const RED = "#E30613";
const BLACK = "#141414";
const YELLOW = "#FFC72C";

const logos = [
  { name: "logo-imbattable-hero", scale: 0.93 }, // logoStarScale (business.ts)
  { name: "logo-affaires-star", scale: 1 },
];

for (const { name } of logos) {
  const out = `public/${name}.webp`;
  const info = await sharp(`${SRC}/${name}.png`)
    .webp({ quality: 80, alphaQuality: 100, smartSubsample: true, effort: 6 })
    .toFile(out);
  console.log(`${out} ${info.width}×${info.height} ${(info.size / 1024).toFixed(1)} Ko`);
}

/** Zone réellement dessinée (alpha > 2, comme les crops de business.ts). */
async function drawnBox(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let left = info.width, top = info.height, right = -1, bottom = -1;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > 2) {
        if (x < left) left = x;
        if (x > right) right = x;
        if (y < top) top = y;
        if (y > bottom) bottom = y;
      }
    }
  }
  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

// --- Image de partage 1200×630 ---
const W = 1200;
const H = 630;
const STRIPES = 28;
const GAP = 48;
const SIDE = 48;
// Même logique que la home : cadre commun au ratio du logo le plus large (× scale),
// chaque logo tient en hauteur dans ce cadre.
const boxes = await Promise.all(logos.map(({ name }) => drawnBox(`${SRC}/${name}.png`)));
const frameRatio = Math.max(...boxes.map((b, i) => (b.width / b.height) * logos[i].scale));
const frameW = Math.floor((W - 2 * SIDE - GAP) / 2);
const frameH = Math.round(frameW / frameRatio);
const top = Math.round((H - STRIPES - frameH) / 2);

const layers = await Promise.all(
  logos.map(async ({ name, scale }, i) => {
    const b = boxes[i];
    const h = Math.round(frameH * scale);
    const w = Math.round((h * b.width) / b.height);
    const input = await sharp(`${SRC}/${name}.png`).extract(b).resize(w, h).png().toBuffer();
    const frameLeft = SIDE + i * (frameW + GAP);
    return { input, left: frameLeft + Math.round((frameW - w) / 2), top: top + Math.round((frameH - h) / 2) };
  }),
);

const stripes = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${STRIPES}">
    <defs><pattern id="s" width="34" height="34" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="17" height="34" fill="${BLACK}"/><rect x="17" width="17" height="34" fill="${YELLOW}"/>
    </pattern></defs>
    <rect width="${W}" height="${STRIPES}" fill="url(#s)"/>
  </svg>`,
);

const og = await sharp({ create: { width: W, height: H, channels: 3, background: RED } })
  .composite([...layers, { input: stripes, left: 0, top: H - STRIPES }])
  .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: "4:4:4" })
  .toFile("public/og-image.jpg");
console.log(`public/og-image.jpg ${og.width}×${og.height} ${(og.size / 1024).toFixed(1)} Ko`);
