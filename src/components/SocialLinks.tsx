import { socialLinks } from "@/lib/business";
import { IconFacebook, IconInstagram, IconTiktok } from "./icons";

const iconMap = {
  facebook: IconFacebook,
  instagram: IconInstagram,
  tiktok: IconTiktok,
};

const variantClasses = {
  imbattable: "border-brand-black bg-brand-yellow text-brand-black shadow-[3px_3px_0_0_#141414] hover:shadow-[5px_5px_0_0_#141414]",
  affaires: "border-black bg-affaires-yellow text-brand-black shadow-[3px_3px_0_0_#000000] hover:shadow-[5px_5px_0_0_#000000]",
};

type SocialLinksProps = {
  variant: keyof typeof variantClasses;
  className?: string;
};

export default function SocialLinks({ variant, className }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-5 ${className ?? ""}`}>
      {socialLinks.map((link) => {
        const Icon = iconMap[link.icon];
        return (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            className={`flex h-20 w-20 items-center justify-center rounded-full border-2 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 sm:h-24 sm:w-24 ${variantClasses[variant]}`}
          >
            <Icon className="h-9 w-9 sm:h-10 sm:w-10" />
          </a>
        );
      })}
    </div>
  );
}
