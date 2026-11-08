import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/** Généré au build (export statique) : out/robots.txt. Tout est autorisé. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
