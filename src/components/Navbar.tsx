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
import { getSearchMessages } from "@/lib/i18n/search-messages";

export default function Navbar() {
  const pathname = usePathname() || "/";
  const locale = localeFromPathname(pathname);
  const copy = getMessages(locale);
  const searchCopy = getSearchMessages(locale);
  const searchHref = localizeHref("/search", locale);
  const contactHref = localizeHref("/contact", locale);
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
    // Redesign 2026-10-14: was a fully saturated #0060AE bar with hover-invert
    // links (read as a 2015 template). Now near-black translucent glass with a
    // hairline and a blue accent rule, so the colour budget goes to content/CTA.
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[color:var(--nav-bg)] backdrop-blur-xl">
      <div className="hairline-x h-px" />
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
        <BrandLogo locale={locale} tone="onLight" />

        <ul className="hidden items-center gap-1 lg:flex lg:gap-4">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(`${item.href}/`));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative inline-flex px-2 py-2 text-sm font-medium transition-colors xl:px-3 xl:text-base ${
                    active ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-2 bottom-0 h-px rounded-full bg-brand-accent transition-opacity ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={contactHref}
            className="hidden rounded-lg bg-brand-secondary px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_22px_-10px_rgba(0,96,174,1)] transition-colors hover:bg-brand-accent lg:inline-flex"
          >
            {copy.nav.contact}
          </Link>
          <Link
            href={searchHref}
            aria-label={searchCopy.navAria}
            title={searchCopy.nav}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white/75 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
              />
            </svg>
          </Link>
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white/75 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
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
        className={`border-t border-white/10 bg-white lg:hidden ${open ? "block" : "hidden"}`}
      >
        <ul className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-md px-3 py-3 text-base font-medium text-brand-primary/90 transition-colors hover:bg-brand-secondary hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={searchHref}
              className="flex items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-brand-primary/90 transition-colors hover:bg-brand-secondary hover:text-white"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.35-4.35M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
                />
              </svg>
              {searchCopy.nav}
            </Link>
          </li>
          <li>
            <Link
              href={contactHref}
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
