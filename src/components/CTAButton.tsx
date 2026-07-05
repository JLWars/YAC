import Link from "next/link";
import type { ReactNode } from "react";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline-light";
  icon?: ReactNode;
  className?: string;
  external?: boolean;
};

const variantClasses: Record<NonNullable<CTAButtonProps["variant"]>, string> = {
  primary:
    "bg-brand-red text-white border-2 border-brand-black hover:bg-brand-red-dark",
  secondary:
    "bg-brand-yellow text-brand-black border-2 border-brand-black hover:bg-brand-yellow-dark",
  "outline-light":
    "bg-transparent text-white border-2 border-white hover:bg-white hover:text-brand-black",
};

export default function CTAButton({ href, children, variant = "primary", icon, className = "", external = false }: CTAButtonProps) {
  const classes = `group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-7 py-3 font-display text-base uppercase tracking-wide shadow-[4px_4px_0_0_#141414] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#141414] active:translate-y-0 active:shadow-[2px_2px_0_0_#141414] ${variantClasses[variant]} ${className}`;

  if (external || href.startsWith("http") || href.startsWith("tel:")) {
    return (
      <a href={href} className={classes} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        {icon}
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {icon}
      {children}
    </Link>
  );
}
