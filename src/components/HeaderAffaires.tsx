import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "./icons";

export default function HeaderAffaires() {
  return (
    <header className="sticky top-0 z-50 border-b-4 border-black bg-affaires-anthracite">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link href="/affaires" className="flex items-center">
          <span className="rounded-lg bg-white px-2 py-1">
            <Image
              src="/logo-affaires.png"
              alt="YAC Affaires — Brico, Jardin, Déco"
              width={734}
              height={345}
              priority
              className="h-8 w-auto sm:h-10"
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
