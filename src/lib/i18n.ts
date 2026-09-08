export type { Locale } from "./i18n/config";
export {
  locales,
  defaultLocale,
  LOCALE_COOKIE,
  localeHtmlLang,
  localeOg,
  localeLabels,
  countryToLocale,
  isLocale,
  detectPreferredLocale,
  localeFromPathname,
  stripLocalePrefix,
  localizeHref,
  switchLocalePath,
  pathHasLocalePrefix,
} from "./i18n/config";

export {
  getMessages,
  localizeSeriesName,
  type AppMessages,
} from "./i18n/messages";

import type { Locale } from "./i18n/config";
import { locales } from "./i18n/config";
import { getMessages, type AppMessages } from "./i18n/messages";

type UiBundle = {
  brand: string;
  nav: AppMessages["nav"];
  language: string;
  languageShort: string;
  home: string;
  learnMore: string;
  viewSeries: string;
  viewSpecs: string;
  contactCta: string;
  footer: AppMessages["footer"];
};

/** @deprecated Prefer getMessages(locale). Kept for gradual migration. */
export const ui = Object.fromEntries(
  locales.map((locale) => {
    const m = getMessages(locale);
    return [
      locale,
      {
        brand: m.brandFull,
        nav: m.nav,
        language: m.language,
        languageShort: locale === "zh" ? "中文" : locale.toUpperCase(),
        home: m.home,
        learnMore: m.learnMore,
        viewSeries: m.viewSeries,
        viewSpecs: m.viewSpecs,
        contactCta: m.contactCta,
        footer: m.footer,
      } satisfies UiBundle,
    ];
  }),
) as Record<Locale, UiBundle>;

const categoryIds = [
  "micro",
  "medium",
  "heavy",
  "silent",
  "portable",
  "cleanroom",
] as const;

export const categoryCopy = Object.fromEntries(
  categoryIds.map((id) => [
    id,
    Object.fromEntries(
      locales.map((locale) => [locale, getMessages(locale).categories[id]]),
    ),
  ]),
) as Record<
  string,
  Record<Locale, { name: string; description: string; intro: string; applications: string[] }>
>;
