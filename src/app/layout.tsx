import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OverseasContactRail from "@/components/OverseasContactRail";
import { localeHtmlLang } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { getRequestLocale } from "@/lib/request-locale";
import {
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Locale is applied via middleware rewrite (/en/... → /...) + `x-locale`.
 * Force dynamic rendering so each request resolves content for that locale
 * and ISR/static HTML is never shared across languages.
 */
export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FF6600",
};

export function generateMetadata(): Metadata {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const home = messages.homePage;

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cnwslchain.com",
    ),
    title: {
      default: home.metaTitle,
      template: "%s",
    },
    description: home.metaDescription,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = getRequestLocale();
  const organizationLd = buildOrganizationJsonLd(locale);
  const websiteLd = buildWebSiteJsonLd(locale);

  return (
    <html lang={localeHtmlLang[locale]}>
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <OverseasContactRail />
      </body>
    </html>
  );
}
