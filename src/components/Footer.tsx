"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";
import SocialLinks from "@/components/SocialLinks";
import { localeFromPathname, localizeHref, defaultLocale, type Locale } from "@/lib/i18n/config";
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

/**
 * 页脚产品导航：六个分类，顺序与产品中心一致。
 *
 * 为什么放在页脚而不是只放导航栏（2026-11-09 改版）：
 * 页脚是**全站每一页都会出现**的链接位，六个分类页是承接「微型拖链 / 无尘拖链」
 * 这类品类词的主力页面，把它们的入口铺到全站，等于给 300+ 型号页补了一条
 * 统一的向上通道——型号页 ← 分类页 ← 首页的层级才真正成立。
 * 锚文本直接用分类名（`copy.categories[id].name`），带品类关键词，不用「点击这里」。
 */
const productCategories = ["micro", "medium", "heavy", "silent", "portable", "cleanroom"] as const;

/** 页脚各栏标题与「查看全部」文案（只做栏目标题，不新增 h2，避免全站标题层级重复）。 */
const sectionLabels = {
  zh: { products: "产品中心", resources: "资源与支持", allModels: "查看全部型号 →" },
  en: { products: "Products", resources: "Resources", allModels: "All models →" },
  vi: { products: "Sản phẩm", resources: "Tài nguyên", allModels: "Tất cả mã →" },
  es: { products: "Productos", resources: "Recursos", allModels: "Todos los modelos →" },
  it: { products: "Prodotti", resources: "Risorse", allModels: "Tutti i modelli →" },
  ru: { products: "Продукция", resources: "Ресурсы", allModels: "Все модели →" },
} as const;

/**
 * 品牌栏的信任点。左栏原来只有 logo + 一行简介，桌面端下面空一大截；
 * 这里用四条能在别处对上的硬信息填起来（工厂地址、注塑机数量、认证、质保），
 * 顺带把「乐清 / 注塑机 / 质保」这些词铺到全站文本里。
 * 口径与首页一致：工厂在浙江乐清，常州是办事处，别写成「常州工厂」。
 */
const trustPoints = {
  zh: [
    "浙江乐清自有工厂，70+ 台注塑机",
    "通过 IATF 16949 / ISO 9001 认证",
    "拖链寿命测试 ≥4000 万次",
    "常规型号现货，36 个月质保",
  ],
  en: [
    "Own factory in Yueqing, 70+ injection presses",
    "IATF 16949 / ISO 9001 certified",
    "Carrier life tested to 15M+ cycles",
    "Stock models, 36-month warranty",
  ],
  vi: [
    "Nhà máy tại Yueqing, 70+ máy ép Haitian",
    "Chứng nhận IATF 16949 / ISO 9001",
    "Thử nghiệm tuổi thọ ≥40 triệu chu kỳ",
    "Hàng có sẵn, bảo hành 36 tháng",
  ],
  es: [
    "Fábrica en Yueqing, más de 70 inyectoras",
    "Certificados IATF 16949 / ISO 9001",
    "Ensayado a ≥40 millones de ciclos",
    "Modelos en stock, garantía 36 meses",
  ],
  it: [
    "Stabilimento a Yueqing, oltre 70 presse",
    "Certificati IATF 16949 / ISO 9001",
    "Collaudo a ≥40 milioni di cicli",
    "Modelli a stock, garanzia 36 mesi",
  ],
  ru: [
    "Собственный завод в Юэцине, 70+ прессов",
    "Сертификаты IATF 16949 / ISO 9001",
    "Ресурс от ≥40 млн циклов",
    "Складские модели, гарантия 36 месяцев",
  ],
} as const;

/**
 * 只有中英双语的三个页面（`requireZhEnLocale()` 收口，vi/es/it/ru 访问会 404）。
 * 其余语种不渲染，否则页脚会在四个语种上挂出死链 —— 与 /official、/privacy 一套处理。
 */
const zhEnLinks = {
  zh: [
    { href: "/factory", label: "乐清工厂实况" },
    { href: "/price", label: "拖链价格怎么算" },
    { href: "/guides/selection", label: "选型五步法" },
  ],
  en: [
    { href: "/factory", label: "Yueqing factory" },
    { href: "/price", label: "How pricing works" },
    { href: "/guides/selection", label: "5-step selection" },
  ],
} as const;

/**
 * 官方声明入口。`/official` 只有中英双语（见 src/lib/zh-only.ts），
 * 其余语种不渲染这个链接 —— 否则页脚会在 4 个语种上挂出 404 死链。
 */
const officialLinkLabels = {
  zh: "唯一官方网站声明",
  en: "Official website statement",
} as const;

/**
 * 隐私政策入口（2026-10-19 新增）。同样只在中英渲染 —— 与 /official 一套收口。
 * 放页脚而不是主导航：Google Ads 审核会检查落地页能否找到隐私政策，
 * 但客户浏览时不需要它占一个导航位。
 */
const privacyLinkLabels = {
  zh: "隐私政策",
  en: "Privacy policy",
} as const;

const officialNoticeLabels = {
  zh: "www.cnwslchain.com 为本公司唯一官方网站",
  en: "www.cnwslchain.com is our only official website",
} as const;

/**
 * locale 由 layout 服务端传入（2026-11-04）。
 * 原因同 Navbar：middleware 已把 /en/... rewrite 成无前缀路径，
 * 客户端 pathname 判不出语种，页脚会在英文站渲染成一整片中文。
 */
export default function Footer({ locale: localeProp }: { locale?: Locale }) {
  const pathname = usePathname() || "/";
  const pathLocale = localeFromPathname(pathname);
  const locale =
    pathLocale !== defaultLocale ? pathLocale : (localeProp ?? defaultLocale);
  const copy = getMessages(locale);
  const overseas = showOverseasSocial(locale);
  const sep = locale === "zh" ? "：" : ": ";
  const officialLocale = locale === "zh" || locale === "en" ? locale : null;
  const labels = sectionLabels[locale];
  /* 0086-0577-62328108 → +8657762328108，手机点一下就能拨 */
  const telHref = `tel:${siteConfig.phone.replace(/[^\d+]/g, "").replace(/^00/, "+")}`;

  const resourceLinks = [
    { href: "/solutions", label: copy.nav.solutions },
    { href: "/blog", label: copy.nav.blog },
    { href: "/news", label: copy.nav.news },
    { href: "/downloads", label: copy.nav.downloads },
    { href: "/about", label: copy.nav.about },
  ];

  return (
    // Rebrand 2026-09-26: brand-blue footer, blue dominant; links/buttons invert to white on hover
    <footer className="bg-brand-secondary text-white">
      <div className="h-0.5 bg-white/30" />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-12 sm:gap-x-10 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.35fr_0.85fr_1.1fr_0.8fr] lg:px-8">
        {/* 1. 品牌：logo + 主体 + 定位 + 信任点 + 小程序码（贴底对齐右栏）
            手机上两栏并排会被挤扁，品牌栏通栏；md 起回到单列。 */}
        <div className="col-span-2 flex flex-col md:col-span-1">
          <BrandLogo locale={locale} tone="onLight" />
          <p className="mt-3 text-sm text-white/90">{copy.legalName}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/75">{copy.footer.blurb}</p>

          <ul className="mt-5 space-y-2 text-[13px] leading-snug text-white/80">
            {trustPoints[locale].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/55"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6">
            <p className="text-xs text-white/60">
              {copy.footer.miniprogram}
              <span aria-hidden="true"> · </span>
              {copy.footer.scan}
            </p>
            <div className="mt-2 inline-flex rounded-lg bg-white p-1.5">
              <Image
                src="/images/home/wechat-miniprogram.webp"
                alt={getQrCodeAlt(locale)}
                width={96}
                height={96}
                className="h-[88px] w-[88px] object-contain"
              />
            </div>
          </div>
        </div>

        {/* 2. 产品中心：六个分类页 + 全部型号，全语种可用
            手机上与「资源与支持」并排两列（order 见各栏），省掉一半竖向高度 */}
        <nav aria-label={labels.products} className="order-2 min-w-0 md:order-none">
          <p className="text-sm font-semibold">{labels.products}</p>
          <ul className="mt-3 space-y-2.5 text-sm text-white/85">
            {productCategories.map((id) => (
              <li key={id}>
                <Link
                  href={localizeHref(`/products/${id}`, locale)}
                  className="transition-colors hover:text-white"
                >
                  {copy.categories[id].name}
                </Link>
              </li>
            ))}
            <li className="pt-1">
              <Link
                href={localizeHref("/products", locale)}
                className="text-white/70 transition-colors hover:text-white"
              >
                {labels.allModels}
              </Link>
            </li>
          </ul>
        </nav>

        {/* 3. 联系方式 + 地址：NAP 保持原样，方便搜索引擎与客户核对一致性
            手机上通栏放最后（地址本来就宽，挤进半栏会断成一堆行） */}
        <div className="order-4 col-span-2 md:order-none md:col-span-1">
          <p className="text-sm font-semibold">{copy.footer.contact}</p>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            <li>
              {copy.footer.phone}
              {sep}
              <a
                href={telHref}
                className="transition-colors hover:text-white"
              >
                {siteConfig.phone}
              </a>
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

          <p className="mt-6 text-sm font-semibold">{copy.footer.address}</p>
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
            className="mt-5 inline-block rounded-md border border-white/70 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-brand-secondary"
          >
            {copy.contactCta}
          </Link>
        </div>

        {/* 4. 资源与支持：站内重点落地页，中英额外挂三个双语页 */}
        <div className="order-3 flex min-w-0 flex-col md:order-none">
          <nav aria-label={labels.resources}>
            <p className="text-sm font-semibold">{labels.resources}</p>
            <ul className="mt-3 space-y-2.5 text-sm text-white/85">
              {resourceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localizeHref(item.href, locale)}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {officialLocale
                ? zhEnLinks[officialLocale].map((item) => (
                    <li key={item.href}>
                      <Link
                        href={localizeHref(item.href, officialLocale)}
                        className="transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))
                : null}
            </ul>
          </nav>

          {overseas ? (
            <div className="mt-6">
              <p className="text-sm font-semibold text-white">{followLabels[locale]}</p>
              <SocialLinks className="mt-3" />
            </div>
          ) : null}

          {officialLocale ? (
            <div className="mt-auto flex flex-col items-start gap-y-1 pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
              <Link
                href={localizeHref("/official", officialLocale)}
                className="inline-block text-xs text-white/60 underline-offset-2 transition-colors hover:text-white hover:underline"
              >
                {officialLinkLabels[officialLocale]}
              </Link>
              <Link
                href={localizeHref("/privacy", officialLocale)}
                className="inline-block text-xs text-white/60 underline-offset-2 transition-colors hover:text-white hover:underline"
              >
                {privacyLinkLabels[officialLocale]}
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      <div className="border-t border-white/20 py-4 text-center text-xs text-white/60">
        <p>
          © {new Date().getFullYear()} {copy.legalName} {copy.footer.copyright}
        </p>
        {officialLocale ? (
          <p className="mt-1 text-white/55">{officialNoticeLabels[officialLocale]}</p>
        ) : null}
      </div>
    </footer>
  );
}
