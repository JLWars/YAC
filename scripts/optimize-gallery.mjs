// Optimise les photos de galerie : photos-source/<magasin>/ -> public/galerie/<magasin>/*.webp
// Usage : npm run photos
//
// - WebP, 1600 px de large max (jamais d'agrandissement), qualité 80
// - orientation EXIF appliquée, toutes les métadonnées (EXIF/GPS, XMP, IPTC) supprimées
// - les copies dont l'original a disparu sont supprimées de public/galerie/<magasin>/
// - les fichiers de photos-source/ ne sont JAMAIS modifiés, renommés ni supprimés
import sharp from "sharp";
import { copyFile, mkdir, readdir, stat, unlink, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const STORES = ["limbattable", "affaires"];
const SOURCE_ROOT = "photos-source";
const OUTPUT_ROOT = path.join("public", "galerie");
const INPUT_EXT = new Set([".webp", ".jpg", ".jpeg", ".png", ".heic", ".heif"]);
const MAX_WIDTH = 1600;
const QUALITY = 80;

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} Ko`;
const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} Mo`;

async function listSources(dir) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && INPUT_EXT.has(path.extname(e.name).toLowerCase()))
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, "fr", { numeric: true }));
}

/** Encode une source ; garde l'original WebP s'il est déjà plus léger et « propre ». */
async function optimize(srcPath, outPath) {
  const input = sharp(srcPath, { failOn: "none" });
  const meta = await input.metadata();
  const { data, info } = await input
    .autoOrient()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer({ resolveWithObject: true });

  const srcSize = (await stat(srcPath)).size;
  const alreadyClean =
    meta.format === "webp" &&
    (meta.width ?? 0) <= MAX_WIDTH &&
    !meta.exif &&
    !meta.xmp &&
    !meta.iptc &&
    !((meta.orientation ?? 1) > 1);

  if (alreadyClean && srcSize <= data.length) {
    await copyFile(srcPath, outPath);
    return { before: srcSize, after: srcSize, width: meta.width, height: meta.height, kept: true };
  }
  await writeFile(outPath, data);
  return { before: srcSize, after: data.length, width: info.width, height: info.height, kept: false };
}

async function main() {
  const perStore = await Promise.all(
    STORES.map(async (store) => ({ store, files: await listSources(path.join(SOURCE_ROOT, store)) })),
  );

  if (!existsSync(SOURCE_ROOT) || perStore.every((s) => s.files.length === 0)) {
    console.log(`⚠ ${SOURCE_ROOT}/ est absent ou ne contient aucune photo : rien n'est généré ni supprimé.`);
    return;
  }

  let totalCount = 0;
  let totalBefore = 0;
  let totalAfter = 0;
  const failures = [];

  for (const { store, files } of perStore) {
    const srcDir = path.join(SOURCE_ROOT, store);
    const outDir = path.join(OUTPUT_ROOT, store);
    console.log(`\n▸ ${store}`);

    // Dossier source vide ou absent : on ne touche pas aux copies existantes.
    if (files.length === 0) {
      console.log(`  ${srcDir}/ vide ou absent : ignoré, aucune copie supprimée.`);
      continue;
    }

    await mkdir(outDir, { recursive: true });

    const expected = new Set();
    let count = 0;
    let before = 0;
    let after = 0;
    let kept = 0;

    for (const name of files) {
      const outName = `${path.parse(name).name}.webp`;
      if (expected.has(outName)) {
        failures.push(`${store}/${name} : ignoré, ${outName} est déjà produit par un autre fichier du même nom`);
        continue;
      }
      expected.add(outName);

      try {
        const r = await optimize(path.join(srcDir, name), path.join(outDir, outName));
        count++;
        before += r.before;
        after += r.after;
        if (r.kept) kept++;
        console.log(
          `  ${name} → ${outName}  ${r.width}×${r.height}  ${kb(r.before)} → ${kb(r.after)}${r.kept ? "  (original déjà optimal, copié tel quel)" : ""}`,
        );
      } catch (err) {
        const ext = path.extname(name).toLowerCase();
        const hint =
          ext === ".heic" || ext === ".heif"
            ? "HEIC non pris en charge par sharp (codec HEVC absent) : convertis-la en JPEG"
            : err.message;
        failures.push(`${store}/${name} : ${hint}`);
        expected.delete(outName);
      }
    }

    // Nettoyage : copies dont l'original n'existe plus (le .gitkeep est conservé).
    const removed = [];
    for (const file of await readdir(outDir)) {
      if (path.extname(file).toLowerCase() !== ".webp" || expected.has(file)) continue;
      const stillHasSource = files.some((f) => `${path.parse(f).name}.webp` === file);
      if (stillHasSource) continue; // source en échec ce coup-ci : on garde l'ancienne copie
      await unlink(path.join(outDir, file));
      removed.push(file);
    }

    const gain = before ? Math.round((1 - after / before) * 100) : 0;
    console.log(`  ${count} photo(s) : ${mb(before)} → ${mb(after)} (${gain >= 0 ? "-" : "+"}${Math.abs(gain)} %)`);
    if (kept) console.log(`  dont ${kept} original(aux) déjà optimal(aux) copié(s) sans ré-encodage`);
    if (removed.length) console.log(`  copies orphelines supprimées : ${removed.join(", ")}`);

    totalCount += count;
    totalBefore += before;
    totalAfter += after;
  }

  const totalGain = totalBefore ? Math.round((1 - totalAfter / totalBefore) * 100) : 0;
  console.log(
    `\nTotal : ${totalCount} photo(s), ${mb(totalBefore)} → ${mb(totalAfter)} (${totalGain >= 0 ? "-" : "+"}${Math.abs(totalGain)} %)`,
  );
  if (failures.length) {
    console.log(`\n⚠ ${failures.length} fichier(s) non traité(s) :`);
    for (const f of failures) console.log(`  - ${f}`);
    process.exitCode = 1;
  }
}

await main();
