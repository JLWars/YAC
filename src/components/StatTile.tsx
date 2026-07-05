import type { ReactNode } from "react";

type StatTileProps = {
  value: string;
  label: string;
  icon?: ReactNode;
};

export default function StatTile({ value, label, icon }: StatTileProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border-2 border-brand-black bg-white px-4 py-6 text-center shadow-[4px_4px_0_0_#141414]">
      {icon ? <div className="text-brand-red">{icon}</div> : null}
      <span className="font-display text-3xl leading-none text-brand-black sm:text-4xl">{value}</span>
      <span className="text-xs font-semibold uppercase tracking-wide text-brand-black/60 sm:text-sm">{label}</span>
    </div>
  );
}
