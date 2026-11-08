import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import SplitHero from "@/components/SplitHero";
import { siteMeta } from "@/lib/business";
import { homeJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/",
  title: siteMeta.title,
  description: siteMeta.description,
  shareDescription: siteMeta.ogDescription,
});

export default function Home() {
  return (
    <main>
      <JsonLd data={homeJsonLd} />
      <h1 className="sr-only">{siteMeta.homeHeading}</h1>
      <SplitHero />
    </main>
  );
}
