"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { business } from "@/lib/business";
import { IconClose, IconMenu, IconPhone, IconStar } from "./icons";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/concept", label: "Le Concept" },
  { href: "/avis", label: "Avis clients" },
  { href: "/infos", label: "Infos pratiques" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b-4 border-brand-black bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5">
          <IconStar className="h-7 w-7 shrink-0 text-brand-yellow sm:h-8 sm:w-8" />
          <span className="font-display text-xl leading-none tracking-tight text-brand-black sm:text-2xl">
            YAC{" "}
            <span className="text-brand-red">L&apos;IMBATTABLE</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-body text-sm font-semibold uppercase tracking-wide transition-colors hover:text-brand-red ${
                pathname === link.href ? "text-brand-red" : "text-brand-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={business.phoneHref}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brand-red px-5 py-2.5 font-display text-sm uppercase tracking-wide text-white shadow-[3px_3px_0_0_#141414] transition-transform hover:-translate-y-0.5"
          >
            <IconPhone className="h-4 w-4" />
            {business.phoneDisplay}
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand-black text-brand-black lg:hidden"
        >
          {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t-4 border-brand-black bg-white lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex min-h-[48px] items-center rounded-lg px-3 font-display text-lg uppercase tracking-wide ${
                    pathname === link.href ? "bg-brand-yellow text-brand-black" : "text-brand-black"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={business.phoneHref}
                className="mt-2 flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-brand-red px-5 font-display text-base uppercase tracking-wide text-white shadow-[3px_3px_0_0_#141414]"
              >
                <IconPhone className="h-4 w-4" />
                Appeler {business.phoneDisplay}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
