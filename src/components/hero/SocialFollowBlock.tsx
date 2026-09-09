import type { CSSProperties } from "react";
import { socialLinks } from "@/lib/business";
import { IconFacebook, IconInstagram, IconTiktok } from "@/components/icons";
import HandArrow from "./HandArrow";

const iconMap = {
  facebook: IconFacebook,
  instagram: IconInstagram,
  tiktok: IconTiktok,
} as const;

/** Couleurs de marque officielles — appliquées sur le bouton rond uniquement. */
const brandStyle: Record<string, CSSProperties> = {
  facebook: { backgroundColor: "#1877F2" },
  instagram: { backgroundImage: "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)" },
  tiktok: { backgroundColor: "#010101" },
};

type Props = {
  variant: "imbattable" | "affaires";
  content: { title: string; subtitle: string; community: string };
};

export default function SocialFollowBlock({ variant, content }: Props) {
  const accent = variant === "affaires" ? "text-affaires-yellow" : "text-brand-yellow";

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="font-display text-2xl uppercase leading-tight text-white sm:text-3xl">
        {content.title}
      </h2>
      <p className={`mt-1 text-sm italic sm:text-base ${accent}`}>{content.subtitle}</p>

      <ul className="mt-7 flex items-start justify-center gap-4 sm:gap-6">
        {socialLinks.map((link) => {
          const Icon = iconMap[link.icon];
          return (
            <li key={link.name} className="w-[92px] sm:w-28">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.name} — ${link.blurb}`}
                style={brandStyle[link.icon]}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-white shadow-[0_8px_18px_rgba(0,0,0,0.32)] transition-transform duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-[72px] sm:w-[72px]"
              >
                <Icon className="h-8 w-8 text-white" />
              </a>
              <p className="mt-2 font-display text-sm uppercase leading-tight text-white">
                {link.name}
              </p>
              <p className="mt-0.5 text-xs leading-tight text-white/80">{link.blurb}</p>
            </li>
          );
        })}
      </ul>

      <div className="relative mt-7">
        <p className={`font-hand text-2xl font-bold sm:text-3xl ${accent}`}>{content.community}</p>
        <HandArrow
          className={`absolute -left-14 -top-2 hidden h-14 w-14 lg:block ${accent}`}
          rotate={18}
        />
      </div>
    </div>
  );
}
