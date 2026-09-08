"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { localeFromPathname, localizeHref } from "@/lib/i18n/config";
import { showOverseasSocial, socialIcons } from "@/lib/social";
import { siteConfig } from "@/lib/site";

const labels = {
  en: {
    wechat: "WeChat",
    whatsapp: "WhatsApp",
    email: "Email",
    scan: "Scan to add on WeChat",
    aria: "Contact shortcuts",
    qrAlt: "CNWSL WeChat QR code",
    contact: "Contact",
  },
  vi: {
    wechat: "WeChat",
    whatsapp: "WhatsApp",
    email: "Email",
    scan: "Quét để thêm WeChat",
    aria: "Lối tắt liên hệ",
    qrAlt: "Mã QR WeChat CNWSL",
    contact: "Liên hệ",
  },
  es: {
    wechat: "WeChat",
    whatsapp: "WhatsApp",
    email: "Email",
    scan: "Escanee para agregar WeChat",
    aria: "Accesos de contacto",
    qrAlt: "Código QR de WeChat de CNWSL",
    contact: "Contacto",
  },
  it: {
    wechat: "WeChat",
    whatsapp: "WhatsApp",
    email: "Email",
    scan: "Scansiona per aggiungere WeChat",
    aria: "Scorciatoie di contatto",
    qrAlt: "Codice QR WeChat CNWSL",
    contact: "Contatti",
  },
  ru: {
    wechat: "WeChat",
    whatsapp: "WhatsApp",
    email: "Email",
    scan: "Отсканируйте, чтобы добавить в WeChat",
    aria: "Быстрые контакты",
    qrAlt: "QR-код WeChat CNWSL",
    contact: "Контакты",
  },
} as const;

export default function OverseasContactRail() {
  const pathname = usePathname() || "/";
  const locale = localeFromPathname(pathname);
  const [wechatOpen, setWechatOpen] = useState(false);

  useEffect(() => {
    setWechatOpen(false);
  }, [pathname]);

  if (!showOverseasSocial(locale)) {
    return null;
  }

  const copy = labels[locale === "zh" ? "en" : locale];

  return (
    <aside
      className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 md:flex"
      aria-label={copy.aria}
    >
      <div className="relative">
        <button
          type="button"
          className="flex w-[4.5rem] flex-col items-center gap-1 rounded-xl bg-[#07C160] px-2 py-2.5 text-[11px] font-semibold text-white shadow-lg transition hover:brightness-110"
          aria-expanded={wechatOpen}
          onClick={() => setWechatOpen((value) => !value)}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d={socialIcons.wechat} />
          </svg>
          {copy.wechat}
        </button>
        {wechatOpen ? (
          <div className="absolute right-full top-0 mr-2 w-40 rounded-xl border border-gray-200 bg-white p-3 shadow-xl">
            <p className="text-center text-[11px] text-foreground/70">{copy.scan}</p>
            <Image
              src="/images/home/wechat-qr.webp"
              alt={copy.qrAlt}
              width={140}
              height={140}
              className="mt-2 h-auto w-full object-contain"
            />
          </div>
        ) : null}
      </div>

      <a
        href={siteConfig.social.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-[4.5rem] flex-col items-center gap-1 rounded-xl bg-[#25D366] px-2 py-2.5 text-[11px] font-semibold text-white shadow-lg transition hover:brightness-110"
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d={socialIcons.whatsapp} />
        </svg>
        {copy.whatsapp}
      </a>

      <a
        href={`mailto:${siteConfig.email}`}
        className="flex w-[4.5rem] flex-col items-center gap-1 rounded-xl bg-brand-secondary px-2 py-2.5 text-[11px] font-semibold text-white shadow-lg transition hover:bg-brand-accent"
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d={socialIcons.email} />
        </svg>
        {copy.email}
      </a>

      <a href={localizeHref("/contact", locale)} className="sr-only">
        {copy.contact}
      </a>
    </aside>
  );
}
