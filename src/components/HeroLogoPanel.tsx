"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type HeroLogoPanelProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  delay?: number;
  className?: string;
};

export default function HeroLogoPanel({ src, alt, width, height, delay = 0, className }: HeroLogoPanelProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9, y: shouldReduceMotion ? 0 : -14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : delay, ease: "easeOut" }}
      className={`w-[260px] sm:w-[370px] lg:w-[460px] ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        className="h-auto w-full drop-shadow-[10px_14px_14px_rgba(0,0,0,0.5)]"
      />
    </motion.div>
  );
}
