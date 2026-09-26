"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";
import SocialLinks from "@/components/SocialLinks";
import { localeFromPathname, localizeHref } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { getQrCodeAlt } from "@/lib/product-i18n";
import { showOverseasSocial } from "@/lib/social";
import { siteConfig } from "@/lib/site";

const followLabels = {
  zh: "关注我们",
  en: "Follow us",
  vi: "Theo dõi chúng tôi",
  es: "Síganos",
  it: "Seguiteci",
  ru: "Подписывайтесь",
} as const;

export default function Footer() {
  const pathname = usePathname() || "/";
  const locale = localeFromPathname(pathname);
  const copy = getMessages(locale);
  const overseas = showOverseasSocial(locale);
  const sep = locale === "zh" ? "：" : ": ";

  return (
    // Rebrand 2026-09-26: brand-blue footer, blue dominant; links/buttons invert to white on hover
    <footer className="bg-brand-secondary text-white">
      <div className="h-0.5 bg-white/30" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        <div>
          <BrandLogo locale={locale} tone="onLight" />
          <p className="mt-3 text-sm text-white/90">{copy.legalName}</p>
          <p className="mt-4 text-sm text-white/80">{copy.footer.blurb}</p>
          {overseas ? (
            <div className="mt-5">
              <p className="text-sm font-semibold text-white">
                {followLabels[locale]}
              </p>
              <SocialLinks className="mt-3" />
            </div>
          ) : null}
        </div>

        <div>
          <p className="text-sm font-semibold">{copy.footer.contact}</p>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            <li>
              {copy.footer.phone}
              {sep}
              {siteConfig.phone}
            </li>
            <li>
              {copy.footer.fax}
              {sep}
              {siteConfig.fax}
            </li>
            <li>
              {copy.footer.email}
              {sep}
              <a
                href={`mailto:${siteConfig.email}`}
                className="break-all text-white/85 transition-colors hover:text-white"
              >
                {siteConfig.email}
              </a>
            </li>
            {overseas ? (
              <li>
                WhatsApp
                {sep}
                <a
                  href={siteConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/85 transition-colors hover:text-white"
                >
                  +86 {siteConfig.mobile}
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between md:col-span-2 lg:col-span-1">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">{copy.footer.address}</p>
            <ul className="mt-3 space-y-2 text-sm text-white/85">
              <li>
                {copy.footer.changzhou}
                {sep}
                {copy.addressLines.changzhou}
              </li>
              <li>
                {copy.footer.shenzhen}
                {sep}
                {copy.addressLines.shenzhen}
              </li>
              <li>
                {copy.footer.factory}
                {sep}
                {copy.addressLines.factory}
              </li>
              <li>
                {copy.footer.overseas}
                {sep}
                {copy.footer.overseasContact} ·{" "}
                <a
                  href={`tel:+86${siteConfig.mobile}`}
                  className="text-white/85 transition-colors hover:text-white"
                >
                  86{siteConfig.mobile}
                </a>
              </li>
              <li>
                {copy.footer.website}
                {sep}
                <a
                  href="https://www.cnwslchain.com"
                  className="break-all text-white/85 transition-colors hover:text-white"
                >
                  www.cnwslchain.com
                </a>
              </li>
            </ul>
            <Link
              href={localizeHref("/contact", locale)}
              className="mt-4 inline-block rounded-md border border-white/70 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-brand-secondary"
            >
              {copy.contactCta}
            </Link>
          </div>
          <div className="shrink-0">
            <p className="text-sm font-semibold">{copy.footer.miniprogram}</p>
            <p className="mt-2 text-xs text-white/70">{copy.footer.scan}</p>
            <div className="mt-3 rounded-xl bg-white p-2">
              <Image
                src="/images/home/wechat-miniprogram.webp"
                alt={getQrCodeAlt(locale)}
                width={120}
                height={120}
                className="h-[108px] w-[108px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {copy.legalName} {copy.footer.copyright}
      </div>
    </footer>
  );
}
