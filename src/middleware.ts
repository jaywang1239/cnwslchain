import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  LOCALE_COOKIE,
  defaultLocale,
  detectPreferredLocale,
  isLocale,
  localeFromPathname,
  localizeHref,
  locales,
  stripLocalePrefix,
  type Locale,
} from "@/lib/i18n/config";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** Search-engine / preview bots — never 302 them off Chinese (unprefixed) URLs. */
const CRAWLER_UA =
  /googlebot|bingbot|duckduckbot|baiduspider|yandexbot|slurp|facebookexternalhit|twitterbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|applebot|semrushbot|ahrefsbot|mj12bot|dotbot|petalbot|bytespider/i;

function isCrawler(request: NextRequest): boolean {
  const ua = request.headers.get("user-agent") || "";
  return CRAWLER_UA.test(ua);
}

function setLocaleCookie(response: NextResponse, locale: Locale) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });
}

function withLocaleHeader(request: NextRequest, locale: Locale) {
  const headers = new Headers(request.headers);
  headers.set("x-locale", locale);
  return headers;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Explicit locale prefix in URL always wins.
  const pathLocale = localeFromPathname(pathname);
  if (pathLocale !== defaultLocale) {
    const headers = withLocaleHeader(request, pathLocale);
    const url = request.nextUrl.clone();
    url.pathname = stripLocalePrefix(pathname);
    const response = NextResponse.rewrite(url, { request: { headers } });
    setLocaleCookie(response, pathLocale);
    return response;
  }

  // Unprefixed path = Chinese URL tree (canonical for CN + crawlers).
  // Humans: China → stay on zh; other countries → 302 to /en/...
  // Cookie (language switcher) overrides geo. Crawlers never redirected.
  // Local/dev: no geo redirect — keep URL as source of truth.
  const preferred = detectPreferredLocale(request);
  const isDev = process.env.NODE_ENV === "development";
  if (
    preferred !== defaultLocale &&
    !isCrawler(request) &&
    !isDev
  ) {
    const url = request.nextUrl.clone();
    url.pathname = localizeHref(pathname, preferred);
    const response = NextResponse.redirect(url);
    setLocaleCookie(response, preferred);
    return response;
  }

  const headers = withLocaleHeader(request, defaultLocale);
  const response = NextResponse.next({ request: { headers } });

  // This branch always serves Chinese content — persist zh only if no cookie yet.
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (!isLocale(cookie)) {
    setLocaleCookie(response, defaultLocale);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next|images|videos|datasheets|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};

void locales;
