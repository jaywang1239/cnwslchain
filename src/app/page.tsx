import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";
import { localizeCategories } from "@/lib/product-catalog";
import { buildHeroVideoJsonLd } from "@/lib/product-seo";
import { localizeHref, localeOg } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n/messages";
import { getRequestLocale } from "@/lib/request-locale";
import { absoluteUrl, localeAlternates } from "@/lib/site";

const heroPoster = "/images/home/hero-banner.webp";
const heroOg = "/images/home/hero-og.webp";
const heroVideo = "/videos/cnwsl-cleanroom-cable-chain.mp4";

const trustIcons = [
  (
    <svg key="trust-life" className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  ),
  (
    <svg key="trust-warranty" className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
  ),
  (
    <svg key="trust-moq" className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
  ),
  (
    <svg key="trust-3d" className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  ),
  (
    <svg key="trust-design" className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
  ),
  (
    <svg key="trust-sample" className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.169.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 18a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  ),
] as const;

const partners = [
  { name: "拓竹", en: "Bambu Lab", logo: "/images/home/partners/bambu-lab.webp" },
  { name: "华为", en: "HUAWEI", logo: "/images/home/partners/huawei.webp" },
  { name: "航嘉麦格纳", en: "HAPM MAGNA", logo: "/images/home/partners/hapm-magna.webp" },
  { name: "传祺", en: "TRUMPCHI", logo: "/images/home/partners/trumpchi.webp" },
  { name: "富士康", en: "FOXCONN", logo: "/images/home/partners/foxconn.webp" },
  { name: "创世纪", en: "Create Century", logo: "/images/home/partners/genesis.webp" },
  { name: "广汽", en: "GAC", logo: "/images/home/partners/gac.webp" },
  { name: "中航精机", en: "AVIC", logo: "/images/home/partners/avic-jingji.webp" },
  { name: "美的", en: "Midea", logo: "/images/home/partners/midea.webp" },
] as const;

export function generateMetadata(): Metadata {
  const locale = getRequestLocale();
  const copy = getMessages(locale).homePage;
  const path = localizeHref("/", locale);

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: absoluteUrl(path),
      languages: localeAlternates("/").languages,
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      url: absoluteUrl(path),
      siteName: getMessages(locale).brandFull,
      type: "website",
      locale: localeOg[locale],
      images: [
        {
          url: absoluteUrl(heroOg),
          width: 1200,
          height: 630,
          alt: copy.ogImageAlt,
        },
      ],
      videos: [
        {
          url: absoluteUrl(heroVideo),
          width: 720,
          height: 1280,
          type: "video/mp4",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metaTitle,
      description: copy.metaDescription,
      images: [absoluteUrl(heroOg)],
    },
  };
}

export default function Home() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const copy = messages.homePage;
  const productSeries = localizeCategories(locale);
  const marqueeItems = [...productSeries, ...productSeries];
  const trustStats = copy.trust.map((stat, index) => ({
    ...stat,
    icon: trustIcons[index],
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildHeroVideoJsonLd(locale)),
        }}
      />
      <section className="relative min-h-[360px] overflow-hidden sm:min-h-[520px] lg:min-h-[640px]">
        <Image
          src={heroPoster}
          alt={copy.ogImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <HeroVideo src={heroVideo} poster={heroPoster} />
        <div className="relative mx-auto flex min-h-[360px] max-w-7xl flex-col justify-end px-4 py-12 sm:min-h-[520px] sm:justify-center sm:px-6 sm:py-20 lg:min-h-[640px] lg:px-8">
          <h1 className="max-w-3xl text-2xl font-bold leading-snug tracking-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.55)] [word-break:keep-all] sm:text-5xl lg:text-6xl">
            {copy.heroTitle.includes("·") ? (
              <>
                <span className="inline-block">
                  {copy.heroTitle.split("·")[0].trim()}
                </span>
                <span className="mx-1.5 sm:mx-2" aria-hidden="true">
                  ·
                </span>
                <span className="inline-block">
                  {copy.heroTitle.split("·").slice(1).join("·").trim()}
                </span>
              </>
            ) : (
              copy.heroTitle
            )}
          </h1>
          <p className="mt-4 max-w-xl text-base text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.5)] sm:mt-6 sm:text-xl">
            {copy.heroSubtitle}
          </p>
          <Link
            href={localizeHref("/products", locale)}
            className="mt-6 inline-flex w-fit rounded-md bg-brand-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-brand-accent sm:mt-10 sm:px-8 sm:py-3.5 sm:text-base"
          >
            {copy.heroCta}
          </Link>
        </div>
      </section>

      <section className="border-b border-gray-100 bg-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 lg:grid-cols-6">
          {trustStats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent/15 text-brand-secondary">
                {stat.icon}
              </div>
              <p className="text-2xl font-bold text-brand-primary sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-foreground/70 sm:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-brand-primary sm:text-4xl">
              {copy.productsTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-foreground/70">
              {copy.productsSubtitle}
            </p>
          </div>
        </div>

        <div className="mt-12 overflow-hidden">
          <div className="flex w-max animate-product-marquee pause-on-hover gap-6 pr-6">
            {marqueeItems.map((product, index) => (
              <article
                key={`${product.id}-${index}`}
                className="w-[280px] shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:w-[320px]"
              >
                <div className="relative aspect-[16/10] bg-white">
                  {product.imageSrc ? (
                    <Image
                      src={product.imageSrc}
                      alt={product.imageAlt ?? `${product.name}`}
                      fill
                      sizes="320px"
                      className="object-contain"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-foreground/35">
                      <span className="text-sm">{messages.products.productImage}</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-brand-primary">
                    {product.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/70">
                    {product.description}
                  </p>
                  <Link
                    href={localizeHref(`/products/${product.id}`, locale)}
                    className="mt-4 inline-flex items-center text-sm font-medium text-brand-secondary hover:text-brand-primary"
                  >
                    {messages.learnMore}
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[50px]">
        <div className="mx-auto max-w-[1320px] px-4">
          <div className="flex flex-col items-center lg:flex-row">
            <div className="w-full bg-gray-50 lg:w-1/2">
              <div className="px-5 py-6 sm:px-[30px] sm:py-[30px] lg:pr-10">
                <h2 className="text-base font-semibold leading-7 text-brand-secondary">
                  {copy.materialsTitle}
                </h2>
                <p className="my-[30px] text-sm leading-[1.6] text-foreground/70">
                  {copy.materialsBody}
                </p>
                <Link
                  href={localizeHref("/contact", locale)}
                  className="inline-flex text-brand-secondary transition-colors hover:text-brand-primary"
                  aria-label={copy.materialsCta}
                >
                  <svg className="h-[18px] w-[21px]" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
                    <path d="M440.6 273.4c4.7-4.5 7.4-10.8 7.4-17.4s-2.7-12.8-7.4-17.4l-176-168c-9.6-9.2-24.8-8.8-33.9 .8s-8.8 24.8 .8 33.9L364.1 232 24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l340.1 0L231.4 406.6c-9.6 9.2-9.9 24.3-.8 33.9s24.3 9.9 33.9 .8l176-168z" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="flex w-full items-center justify-center lg:w-[41.666%]">
              <Image
                src="/images/home/materials-chain.webp"
                alt={copy.materialsTitle}
                width={1045}
                height={585}
                className="h-auto w-full max-w-[520px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-12 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="partners-heading">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 id="partners-heading" className="text-2xl font-bold text-brand-primary sm:text-4xl">
              {copy.partnersTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-foreground/70">
              {copy.partnersSubtitle}
            </p>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3" aria-labelledby="partners-heading">
            {partners.map((partner) => {
              const displayName = locale === "zh" ? partner.name : partner.en;

              return (
              <li key={partner.name}>
                <figure className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
                  <div className="relative aspect-[16/7] bg-white">
                    <Image
                      src={partner.logo}
                      alt={displayName}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-contain p-5"
                    />
                  </div>
                  <figcaption className="border-t border-gray-100 px-4 py-3 text-center">
                    <p className="text-sm font-semibold text-brand-primary">
                      {displayName}
                    </p>
                  </figcaption>
                </figure>
              </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
