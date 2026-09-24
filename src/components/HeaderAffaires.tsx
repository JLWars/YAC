import Image from "next/image";
import Link from "next/link";
import { affaires } from "@/lib/business";
import { IconArrowRight } from "./icons";

export default function HeaderAffaires() {
  return (
    <header className="sticky top-0 z-50 border-b-4 border-black bg-affaires-anthracite">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link href="/affaires" className="flex items-center">
          {/* Le PNG étoile a ~13 % de marge transparente en haut et en bas : le cadre 16/9
              + object-cover masque ces marges pour que le logo reste lisible sans agrandir le header. */}
          <span className="block aspect-video h-12 overflow-hidden sm:h-16">
            <Image
              src={affaires.logoStar.src}
              alt={affaires.logoStar.alt}
              width={affaires.logoStar.width}
              height={affaires.logoStar.height}
              sizes="(min-width: 640px) 114px, 86px"
              priority
              className="h-full w-full object-cover"
            />
          </span>
        </Link>

        <Link
          href="/limbattable"
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border-2 border-brand-yellow px-3 py-2 text-xs font-semibold uppercase tracking-wide text-brand-yellow transition-colors hover:bg-brand-yellow hover:text-brand-black sm:px-4"
        >
          <span className="hidden sm:inline">Voir aussi :&nbsp;</span>
          YAC L&apos;Imbattable
          <IconArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </header>
  );
}
