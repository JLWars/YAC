"use client";

import { motion, useReducedMotion } from "framer-motion";

type PromoBadgeProps = {
  label?: string;
  sublabel?: string;
  className?: string;
};

export default function PromoBadge({ label = "-50%", sublabel = "sur une sélection", className = "" }: PromoBadgeProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`relative flex h-32 w-32 shrink-0 items-center justify-center sm:h-36 sm:w-36 ${className}`}
      animate={shouldReduceMotion ? undefined : { rotate: [-8, -3, -8] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)]">
        <polygon
          points="100,4 118,34 151,20 158,56 193,63 178,96 198,124 165,142 168,178 132,172 112,200 92,172 56,178 59,142 26,124 46,96 31,63 66,56 73,20 106,34"
          fill="#FFC72C"
          stroke="#141414"
          strokeWidth="3"
        />
      </svg>
      <div className="relative flex flex-col items-center justify-center text-brand-black">
        <span className="font-display text-3xl leading-none tracking-tight sm:text-4xl">{label}</span>
        <span className="mt-1 max-w-[6.5rem] text-center text-[0.6rem] font-bold uppercase leading-tight tracking-wide sm:text-[0.65rem]">
          {sublabel}
        </span>
      </div>
    </motion.div>
  );
}
