import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductBreadcrumb from "@/components/ProductBreadcrumb";
import {
  CATEGORY_IMAGE,
  buildProductBreadcrumbs,
  categoryImageSrcSet,
  getAllCategoryParams,
  getCategoryById,
  getSeriesImageSrc,
  getSpecsBySeries,
  localizeCategory,
} from "@/lib/product-catalog";
import {
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
  buildFaqJsonLd,
} from "@/lib/product-seo";
import { getCategoryDeepCopy } from "@/lib/product-deep-copy";
import { localizeHref, localeOg } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n/messages";
import { getRequestLocale } from "@/lib/request-locale";
import { absoluteUrl, localeAlternates } from "@/lib/site";

interface CategoryPageProps {
  /** Next.js 15 起动态路由参数为 Promise，需 await 后使用。 */
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return getAllCategoryParams();
}

export async function generateMetadata({
  params: paramsPromise,
}: CategoryPageProps): Promise<Metadata> {
  const params = await paramsPromise;
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const raw = getCategoryById(params.category);

  if (!raw) {
    return { title: messages.products.categoryNotFound };
  }

  const category = localizeCategory(raw, locale);
  // 分类页文案来自 messages.categories，其中的 metaTitle/keywords 仅中文填写。
  const categoryCopy = messages.categories[raw.id as keyof typeof messages.categories];
  // 深度内容（zh/en 专有）同时提供 metaTitle 与 metaDescription：
  // 英文 title 原为 `${category.name} | CNWSL`（26 字符、无规格词），
  // 现改为「系列名 + 内高档位 + 材质 + 品牌」。description 原先是 intro（约 70 字），偏短。
  const deep = getCategoryDeepCopy(raw.id, locale);
  const title =
    locale === "zh"
      ? (categoryCopy?.metaTitle ?? `${category.name} | 威仕龙塑料拖链`)
      : (deep?.metaTitle ?? `${category.name} | CNWSL`);
  const keywords =
    locale === "zh" && categoryCopy?.keywords
      ? categoryCopy.keywords.split(",").map((k) => k.trim()).filter(Boolean)
      : undefined;
  const description = deep?.metaDescription ?? category.intro;
  const imageAlt = category.imageAlt ?? category.name;
  const path = localizeHref(`/products/${params.category}`, locale);

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: absoluteUrl(path),
      languages: localeAlternates(`/products/${params.category}`).languages,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      type: "website",
      locale: localeOg[locale],
      ...(category.imageSrc
        ? {
            images: [
              {
                url: absoluteUrl(category.imageSrc),
                width: CATEGORY_IMAGE.width,
                height: CATEGORY_IMAGE.height,
                alt: imageAlt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(category.imageSrc ? { images: [absoluteUrl(category.imageSrc)] } : {}),
    },
  };
}

export default async function CategoryPage({
  params: paramsPromise,
}: CategoryPageProps) {
  const params = await paramsPromise;
  const locale = getRequestLocale();
  const copy = getMessages(locale).products;
  const raw = getCategoryById(params.category);

  if (!raw) {
    notFound();
  }

  const category = localizeCategory(raw, locale);
  const breadcrumbs = buildProductBreadcrumbs(category.id, undefined, undefined, locale);
  const pagePath = localizeHref(`/products/${category.id}`, locale);
  // vi / es / it / ru 下返回 undefined，该区块整体不渲染（不留中文正文）。
  const deep = getCategoryDeepCopy(category.id, locale);
  const isZh = locale === "zh";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbJsonLd(breadcrumbs, pagePath)),
        }}
      />
      {deep && deep.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              buildFaqJsonLd(deep.faqs.map((f) => ({ question: f.q, answer: f.a }))),
            ),
          }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildCollectionPageJsonLd({
              name: category.name,
              description: category.intro,
              pageUrl: pagePath,
              locale,
              items: category.series.map((series) => ({
                name: series.name,
                url: localizeHref(`/products/${category.id}/${series.id}`, locale),
                image:
                  series.id === "portable-std"
                    ? "/images/products/categories/portable.webp"
                    : `/images/products/series/${series.id}/a.webp`,
              })),
            }),
          ),
        }}
      />

      <div className="bg-gray-50">
        <section className="page-hero px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ProductBreadcrumb items={breadcrumbs} tone="onInk" />
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              {category.name}
            </h1>
            <p className="mt-4 max-w-3xl text-white/80">{category.intro}</p>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {category.imageSrc && (
              <div className="relative mb-10 aspect-[16/10] overflow-hidden rounded-xl border border-gray-200 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element --
                    分类图手工 srcSet：100vw 大图会取回 1600 原图，小屏则取 640/960 档。 */}
                <img
                  src={category.imageSrc}
                  srcSet={categoryImageSrcSet(category.imageSrc)}
                  sizes="100vw"
                  alt={category.imageAlt ?? category.name}
                  loading="eager"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </div>
            )}
            {deep && (
              <div className="mb-10 rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
                <p className="text-base leading-relaxed text-foreground/75">
                  {deep.lead}
                </p>
              </div>
            )}
            <h2 className="text-lg font-semibold text-brand-primary">
              {copy.applications}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {category.applications.map((app) => (
                <span
                  key={app}
                  className="rounded-full border border-brand-primary/20 bg-white px-4 py-1.5 text-sm text-brand-primary"
                >
                  {app}
                </span>
              ))}
            </div>

            <h2 className="mt-12 text-lg font-semibold text-brand-primary">
              {copy.seriesHeading}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.series.map((series) => {
                const specCount =
                  getSpecsBySeries(category.id, series.id).length ||
                  series.specCount;

                return (
                  <Link
                    key={series.id}
                    href={localizeHref(`/products/${category.id}/${series.id}`, locale)}
                    className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-brand-secondary/30 hover:shadow-md"
                  >
                    <div className="relative aspect-[16/10] bg-white">
                      <Image
                        src={getSeriesImageSrc(series.id)}
                        alt={series.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-brand-primary group-hover:text-brand-secondary">
                        {series.name}
                      </h3>
                      <p className="mt-1 text-sm text-foreground/50">
                        {`${copy.codePrefix} ${series.code}`}
                      </p>
                      {specCount > 0 && (
                        <p className="mt-3 text-xs text-brand-secondary">
                          {copy.specsCount.replace("{count}", String(specCount))}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {deep && (
              <>
                <div className="mt-16 border-t border-gray-200 pt-10">
                  <h2 className="text-xl font-semibold text-brand-primary">
                    {deep.heading}
                  </h2>
                  <div className="mt-6 space-y-7">
                    {deep.sections.map((section) => (
                      <div key={section.title}>
                        <h3 className="text-base font-semibold text-brand-primary">
                          {section.title}
                        </h3>
                        <p className="mt-2 max-w-4xl text-sm leading-relaxed text-foreground/70">
                          {section.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-lg font-semibold text-brand-primary">
                    {isZh ? "规格速查" : "At a glance"}
                  </h2>
                  <dl className="mt-4 divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-200 bg-white">
                    {deep.keyPoints.map((point) => (
                      <div
                        key={point.label}
                        className="grid grid-cols-1 gap-1 px-5 py-3 sm:grid-cols-3 sm:items-baseline"
                      >
                        <dt className="text-xs font-medium text-foreground/50 sm:text-sm">
                          {point.label}
                        </dt>
                        <dd className="text-sm font-medium text-brand-primary sm:col-span-2">
                          {point.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-3 text-xs leading-relaxed text-foreground/45">
                    {isZh
                      ? "以上为常规档位。具体型号的内高、内宽、弯曲半径以规格表为准，非标尺寸单独评估。"
                      : "Standard sizes shown. Confirm inner height, width and radius against the spec table for each part number; non-standard sizes are quoted separately."}
                  </p>
                </div>

                {category.id === "cleanroom" &&
                  (locale === "zh" || locale === "en") && (
                    <div className="mt-12 rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-lg font-semibold text-brand-primary">
                          {isZh
                            ? "防静电性能：第三方实测数据"
                            : "Anti-static performance: measured by a third party"}
                        </h2>
                        <span className="rounded bg-brand-primary/10 px-2 py-0.5 text-xs font-medium text-brand-primary">
                          CTI
                        </span>
                      </div>
                      <p className="mt-3 max-w-4xl text-sm leading-relaxed text-foreground/70">
                        {isZh
                          ? "无尘拖链主体样板送华测检测认证（广州）有限公司，按 ANSI/ESD S20.20:2021 测试体积电阻与表面电阻，报告编号 A2260607033101E，2026 年 7 月 28 日签发。六个测点的平均值："
                          : "A cleanroom carrier body sample was submitted to Centre Testing International (Guangzhou) and tested to ANSI/ESD S20.20:2021 for volume and surface resistance. Report No. A2260607033101E, issued on 28 July 2026. Averages across six measurement points:"}
                      </p>
                      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {[
                          {
                            label: isZh ? "体积电阻" : "Volume resistance",
                            value: "1.19×10⁶ Ω",
                          },
                          {
                            label: isZh ? "表面电阻" : "Surface resistance",
                            value: "2.42×10⁶ Ω",
                          },
                        ].map((metric) => (
                          <div
                            key={metric.label}
                            className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4"
                          >
                            <p className="text-xs font-medium text-foreground/50">
                              {metric.label}
                            </p>
                            <p className="mt-1 text-xl font-semibold text-brand-primary">
                              {metric.value}
                            </p>
                          </div>
                        ))}
                      </div>
                      <dl className="mt-5 divide-y divide-gray-100 rounded-lg border border-gray-200">
                        {[
                          {
                            label: isZh ? "测试标准" : "Test standard",
                            value: "ANSI/ESD S20.20:2021",
                          },
                          {
                            label: isZh ? "环境条件" : "Conditions",
                            value: isZh
                              ? "温度 (23±2)℃、湿度 (12±3)%RH，预处理 48 小时"
                              : "(23±2)℃, (12±3)%RH, 48 h conditioning",
                          },
                          {
                            label: isZh ? "测试电压" : "Test voltage",
                            value: isZh ? "100 VDC，测试时间 15s" : "100 VDC, 15 s",
                          },
                          {
                            label: isZh ? "测试设备" : "Equipment",
                            value: isZh
                              ? "TREK 152-1 阻抗测试仪、FHA328D 电子干燥柜"
                              : "TREK 152-1 impedance tester, FHA328D dry cabinet",
                          },
                        ].map((row) => (
                          <div
                            key={row.label}
                            className="grid grid-cols-1 gap-1 px-5 py-3 sm:grid-cols-3 sm:items-baseline"
                          >
                            <dt className="text-xs font-medium text-foreground/50 sm:text-sm">
                              {row.label}
                            </dt>
                            <dd className="text-sm text-brand-primary sm:col-span-2">
                              {row.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                      <p className="mt-4 rounded-lg bg-gray-50 px-4 py-3 text-xs leading-relaxed text-foreground/55">
                        {isZh
                          ? "说明：该报告为委托检测，结果仅对送样样品负责，不等同于整机或整条产线通过 ESD 认证。上述电阻值处于静电耗散区间，实际防静电效果与接地方式、安装结构及使用环境有关。"
                          : "Note: this is a commissioned test and the results apply to the submitted sample only. It is not a certification of a complete machine or production line. The values above fall in the static-dissipative range; actual performance depends on grounding, mounting and the operating environment."}
                      </p>
                      <a
                        href="/datasheets/anti-static-cleanroom-chain-test-report.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex w-fit items-center gap-2 rounded-md bg-brand-secondary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                          />
                        </svg>
                        {isZh
                          ? "下载完整检测报告（PDF，7 页）"
                          : "Download the full test report (PDF, 7 pages)"}
                      </a>
                    </div>
                  )}

                <div className="mt-12">
                  <h2 className="text-lg font-semibold text-brand-primary">
                    {isZh ? "常见问题" : "Frequently asked questions"}
                  </h2>
                  <dl className="mt-4 space-y-5">
                    {deep.faqs.map((faq) => (
                      <div
                        key={faq.q}
                        className="rounded-xl border border-gray-200 bg-white p-5"
                      >
                        <dt className="text-sm font-semibold text-brand-primary">
                          {faq.q}
                        </dt>
                        <dd className="mt-2 text-sm leading-relaxed text-foreground/70">
                          {faq.a}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="mt-12 rounded-xl border border-gray-200 bg-white p-6">
                  <h2 className="text-sm font-semibold text-brand-primary">
                    {isZh ? "相关阅读" : "Related reading"}
                  </h2>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {deep.related.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={localizeHref(item.href, locale)}
                          className="text-sm text-brand-secondary underline-offset-4 hover:underline"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
