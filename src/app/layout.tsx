import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_SC } from "next/font/google";
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
 * CJK face, self-hosted by next/font (no runtime dependency on Google Fonts,
 * which is unreachable from mainland China). `preload: false` because the CJK
 * family is split into many unicode-range subset files — preloading them all
 * would hurt LCP. Inter is listed first in the Tailwind stack so Latin keeps
 * Inter and Chinese falls through to this.
 */
const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sc",
  display: "swap",
  preload: false,
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
  // Rebrand 2026-09-24: brand blue (was #FF6600 orange)
  themeColor: "#0060AE",
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
    // Rebrand 2026-09-24: social share image uses the company logo
    openGraph: {
      images: ["/images/brand/logo.webp"],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/images/brand/logo.webp"],
    },
    /**
     * 关于「404 页出现两条 robots 标签」（2026-11-03 查证，结论：无需修改）：
     * 站内 /vi/price 这类语种收口页返回 404 时，HTML 里会出现
     *   <head> 中：<meta name="robots" content="noindex"/>   ← notFound() 注入，正确
     *   <body> 中：<meta name="robots" content="index, follow"/> ← 本文件的值，Next 15
     *                                                          streaming metadata 追加
     * 看起来冲突，但 Google 只解析 <head> 内的 robots meta，body 内的会被忽略，
     * 实测 404 页 <head> 里也只有 noindex 一条，没有 title/description/canonical。
     * 即线上行为本来就是正确的。此处保留显式 index/follow 给正常页用。
     */
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
      <body className={`${inter.variable} ${notoSansSC.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        {/* 语种必须由服务端传入（2026-11-04）：middleware 把 /en/... rewrite 成
            无前缀路径 + x-locale，客户端 usePathname() 拿到的是无前缀地址，
            自行判断会把所有外语页当成中文 —— 表现为英文正文配中文导航/页脚。 */}
        <Navbar locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
        <OverseasContactRail locale={locale} />
      </body>
    </html>
  );
}
