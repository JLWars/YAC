import { Gem, Leaf, Truck, Users } from "lucide-react";
import type { HeroFeature } from "@/lib/business";

const iconMap = {
  truck: Truck,
  gem: Gem,
  leaf: Leaf,
  users: Users,
} as const;

type Props = {
  features: HeroFeature[];
};

/**
 * Bandeau « 4 atouts » pleine largeur, fond blanc, sous le hero.
 * Contenu piloté par business.ts (adaptable par page).
 */
export default function FeatureStrip({ features }: Props) {
  return (
    <section className="border-b border-brand-black/10 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-y-7 px-4 py-9 sm:grid-cols-2 sm:gap-x-8 sm:px-6 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-brand-black/12 lg:py-10">
        {features.map((feature) => {
          const Icon = iconMap[feature.icon];
          return (
            <div
              key={feature.title}
              className="flex items-center gap-3 lg:justify-center lg:px-5"
            >
              <Icon
                className="h-8 w-8 shrink-0 text-brand-black"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <div>
                <p className="font-display text-sm uppercase leading-tight text-brand-black">
                  {feature.title}
                </p>
                <p className="mt-0.5 text-xs leading-tight text-brand-black/60">
                  {feature.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
