import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/** Généré au build (export statique) : out/sitemap.xml. Mêmes URL que les canonical. */
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/limbattable", "/affaires", "/infos", "/avis", "/concept"].map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
  }));
}
