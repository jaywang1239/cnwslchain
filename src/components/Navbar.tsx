"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  localeFromPathname,
  localeHtmlLang,
  localizeHref,
} from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

export default function Navbar() {
  const pathname = usePathname() || "/";
  const locale = localeFromPathname(pathname);
  const copy = getMessages(locale);
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: copy.nav.products, href: localizeHref("/products", locale) },
    { label: copy.nav.solutions, href: localizeHref("/solutions", locale) },
    { label: copy.nav.about, href: localizeHref("/about", locale) },
    { label: copy.nav.downloads, href: localizeHref("/downloads", locale) },
    { label: copy.nav.blog, href: localizeHref("/blog", locale) },
    { label: copy.nav.news, href: localizeHref("/news", locale) },
  ] as const;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.lang = localeHtmlLang[locale];
  }, [locale]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="h-0.5 bg-brand-secondary" />
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
        <BrandLogo locale={locale} tone="onLight" />

        <ul className="hidden items-center gap-1 lg:flex lg:gap-5">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-md px-2 py-2 text-sm font-medium text-brand-primary/80 transition-colors hover:text-brand-secondary xl:px-3 xl:text-base"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-brand-primary lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">
              {open ? copy.nav.closeMenu : copy.nav.openMenu}
            </span>
            {open ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        hidden={!open}
        className={`border-t border-gray-200 bg-white lg:hidden ${open ? "block" : "hidden"}`}
      >
        <ul className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-md px-3 py-3 text-base font-medium text-brand-primary/90 transition-colors hover:bg-gray-50 hover:text-brand-secondary"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={localizeHref("/contact", locale)}
              className="mt-1 block rounded-md bg-brand-secondary px-3 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-brand-accent"
            >
              {copy.nav.contact}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
