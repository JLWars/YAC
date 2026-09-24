import fs from "node:fs";
import path from "node:path";
import Reveal from "./Reveal";
import StoreGalleryCarousel from "./StoreGalleryCarousel";
import { affaires, business } from "@/lib/business";

type Variant = "imbattable" | "affaires";

/** Dossier public/galerie/<dossier>/ de chaque magasin (rempli par `npm run photos`). */
const folders: Record<Variant, string> = { imbattable: "limbattable", affaires: "affaires" };

const IMAGE_FILE = /\.(webp|avif|jpe?g|png)$/i;

const styles = {
  imbattable: {
    section: "bg-brand-cream",
    title: "text-brand-black",
    subtitle: "text-brand-red",
  },
  affaires: {
    section: "bg-affaires-anthracite-dark",
    title: "text-white",
    subtitle: "text-affaires-yellow",
  },
};

/** Lit le dossier au build (composant serveur → page statique, compatible export). */
function listPhotos(folder: string): string[] {
  const dir = path.join(process.cwd(), "public", "galerie", folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => IMAGE_FILE.test(file))
    .sort((a, b) => a.localeCompare(b, "fr", { numeric: true }))
    .map((file) => `/galerie/${folder}/${encodeURIComponent(file)}`);
}

export default function StoreGallery({ variant }: { variant: Variant }) {
  const photos = listPhotos(folders[variant]);
  if (photos.length === 0) return null;

  const data = variant === "affaires" ? affaires : business;
  const s = styles[variant];

  return (
    <section className={`py-16 sm:py-20 ${s.section}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className={`font-display text-3xl uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl ${s.title}`}>
            {data.gallery.title}
          </h2>
          <p className={`mt-2 font-hand text-2xl leading-snug sm:text-3xl ${s.subtitle}`}>{data.gallery.subtitle}</p>
        </Reveal>

        <StoreGalleryCarousel variant={variant} photos={photos} storeName={data.name} />
      </div>
    </section>
  );
}
