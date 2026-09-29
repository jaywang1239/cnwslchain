import type { Metadata } from "next";
import Link from "next/link";
import { localizeHref } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n/messages";
import { getRequestLocale } from "@/lib/request-locale";
import {
  buildPageSocialMeta,
  buildSimpleBreadcrumbJsonLd,
  seoDescription,
  seoTitle,
} from "@/lib/seo";
import { absoluteUrl, localeAlternates } from "@/lib/site";

const TITLE = "拖链价格_塑料拖链多少钱一米_厂家报价与计价方式";
const DESCRIPTION =
  "塑料拖链多少钱一米？威仕龙厂家直供：拖链价格由内高内宽、弯曲半径、材质与数量决定，常规微型拖链约 8-25 元/米，中型约 20-60 元/米，承重与无尘系列更高。本文给出计价逻辑、影响价格的因素与询价所需资料，并说明厂家直供与中间商的价差来源。";

const KEYWORDS = [
  "拖链价格",
  "塑料拖链价格",
  "拖链多少钱一米",
  "尼龙拖链价格",
  "拖链批发价",
  "拖链报价",
  "坦克链价格",
  "无尘拖链价格",
  "微型拖链价格",
  "拖链厂家报价",
];

/** 价格区间：按内高分组，给到「参考区间」而非报价，避免被当作正式报价。 */
const priceBands: {
  group: string;
  range: string;
  basis: string;
  note: string;
}[] = [
  {
    group: "微型拖链（内高 5–15mm）",
    range: "约 8–25 元/米",
    basis: "内高 × 内宽、单节长度",
    note: "小型 CNC、检测设备、电子装配线常用；数量直接决定单价档位",
  },
  {
    group: "中型拖链（内高 18–30mm）",
    range: "约 20–60 元/米",
    basis: "内高 × 内宽、开口形式、是否带分隔片",
    note: "注塑机、加工中心主力规格；桥式与全封闭同规格价差约 10–20%",
  },
  {
    group: "承重拖链（内高 45–80mm）",
    range: "约 55–160 元/米",
    basis: "侧板加强结构、内宽、弯曲半径",
    note: "龙门加工中心、大型注塑机、长行程设备；含支撑导向件时另计",
  },
  {
    group: "静音拖链（内高 18–45mm）",
    range: "约 30–90 元/米",
    basis: "低摩擦铰链结构、内高内宽",
    note: "洁净车间、高速往复工况；高速场景建议搭配导向槽",
  },
  {
    group: "无尘拖链（WWC 系列）",
    range: "约 70–200 元/米",
    basis: "洁净等级、发尘指标、防静电要求",
    note: "半导体、液晶面板、医药洁净室；需按洁净等级定制验证",
  },
];

const factors = [
  {
    title: "内高 × 内宽",
    body: "拖链最基础的计价单位是「节」而不是「米」，换算成米价要看单节长度。同样内高，内宽从 30mm 加到 100mm，用料接近翻倍，价格自然上涨。",
  },
  {
    title: "材质与改性配方",
    body: "标准 PA66 增强尼龙是常规配置。需要防静电、阻燃、耐低温或食品级材质时，原料成本会有明显差异，这部分差价是实打实的材料钱。",
  },
  {
    title: "弯曲半径",
    body: "弯曲半径越大，单节用料越多、体积越大。R 值从 38 提到 100，米价通常上浮 15–30%。选型时按最硬管线的 10 倍取，别为省钱压到极限。",
  },
  {
    title: "结构形式",
    body: "桥式、半封闭、全封闭的横杆与侧板结构不同。全封闭要加挡板与密封件，同规格一般比桥式贵 10–20%。",
  },
  {
    title: "模具是否现成",
    body: "常规型号模具在手，1–3 天就能生产发货，价格按标准档走。完全非标尺寸需要开新模，前期有一次性模具费，量小的时候摊到单价上会偏高。",
  },
  {
    title: "采购数量",
    body: "拖链是注塑件，批量越大单件成本越低。几十米和几千米的单价差异很明显，尤其是需要换模、配色或改料的时候。",
  },
];

const quoteNeeds = [
  "拖链内高 × 内宽（或直接给型号，如 H25 × B50）",
  "需要的总长度或节数，是否要求按根供应",
  "弯曲半径 R 值，或告知行程长度由我们推算",
  "开口形式偏好：桥式 / 半封闭 / 全封闭",
  "运行速度与是否高频往复，是否需要导向槽或支撑轮",
  "线缆清单（外径、数量、气管规格），需要时我们帮你校核填充率",
  "是否需要接头、分隔片、端部固定件等配件",
  "交期要求与目的地（是否含运费）",
];

const faqs = [
  {
    q: "拖链多少钱一米？",
    a: "价格跨度很大，常规微型拖链约 8–25 元/米，中型约 20–60 元/米，承重系列约 55–160 元/米，无尘系列约 70–200 元/米。这只是参考区间，实际报价要看内高内宽、弯曲半径、材质与数量。同一个型号，买 20 米和买 2000 米的单价能差不少。",
  },
  {
    q: "为什么不同厂家报价差这么多？",
    a: "主要差在三块：一是原料，再生料和全新改性料成本差一大截，用再生料的拖链前期看不出，装到设备上跑几个月就知道；二是模具与公差，模具老的厂家尺寸一致性差，装机容易卡；三是渠道，中间商经手一层就要加价。我们这边是乐清工厂直供，没有中间环节。",
  },
  {
    q: "报价需要提供什么资料？",
    a: "最省事的做法是直接给内高 × 内宽和长度。如果还没选型，把线缆的外径、数量、气管规格，加上行程和运行速度发过来，我们的工程师会帮你算内高内宽和弯曲半径，再给型号和报价。",
  },
  {
    q: "有现货吗？交期多久？",
    a: "常规型号常备现货，1–3 天可发货；需要改料、配色或非标尺寸的，看模具情况，一般在 5–10 个工作日。急单可以先跟销售说明，能插单处理的会尽量安排。",
  },
  {
    q: "能不能先拿样品测试？",
    a: "可以。常规型号可以寄样测试，非标或定制材质建议先做小批量试装。需要 3D 图纸做设计校核的也可以提供，具体格式和可用性请跟销售确认。",
  },
  {
    q: "数量少是不是就不接？",
    a: "接。我们既有大批量订单，也有单根、单台的试样需求。只是数量少的时候单价比批量高，这个要提前说清楚，避免后面觉得落差大。",
  },
];

export function generateMetadata(): Metadata {
  const locale = getRequestLocale();
  const path = localizeHref("/price", locale);
  const title = seoTitle(TITLE);
  const description = seoDescription(DESCRIPTION);

  return {
    title,
    description,
    keywords: KEYWORDS,
    alternates: {
      canonical: absoluteUrl(path),
      languages: localeAlternates("/price").languages,
    },
    ...buildPageSocialMeta({ title, description, path, locale }),
  };
}

export default function PricePage() {
  const locale = getRequestLocale();
  const copy = getMessages(locale);
  const path = localizeHref("/price", locale);
  const breadcrumb = buildSimpleBreadcrumbJsonLd([
    { name: copy.home, path: localizeHref("/", locale) },
    { name: "拖链价格", path },
  ]);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="page-hero px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <nav className="mb-4 text-xs text-white/70" aria-label="面包屑">
            <Link href={localizeHref("/", locale)} className="hover:text-white">
              首页
            </Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white/90">拖链价格</span>
          </nav>
          <h1 className="text-2xl font-bold leading-snug text-white sm:text-4xl">
            拖链价格怎么算：多少钱一米，钱花在哪
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/85 sm:text-base">
            不绕弯子，先把参考区间和计价逻辑摆出来。拖链是注塑件，价格不是拍脑袋定的，
            看的是内高内宽、弯曲半径、材质和数量这几个硬指标。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <section aria-labelledby="bands">
          <h2 id="bands" className="text-xl font-bold text-brand-primary sm:text-2xl">
            一、分系列参考价格区间
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            先说清楚：下表是<strong className="font-semibold text-foreground">参考区间，不是报价</strong>。
            拖链按节计价，同样内高不同内宽价格能差一倍以上，所以任何精确到元的「一口价」都不靠谱。
            具体价格按型号和数量核算。
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left">
                  <th className="px-4 py-3 font-medium text-brand-primary">系列</th>
                  <th className="px-4 py-3 font-medium text-brand-primary">参考区间</th>
                  <th className="px-4 py-3 font-medium text-brand-primary">主要变量</th>
                </tr>
              </thead>
              <tbody>
                {priceBands.map((band) => (
                  <tr key={band.group} className="border-b border-gray-100 align-top">
                    <td className="px-4 py-3 font-medium text-foreground">{band.group}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-semibold text-brand-secondary">
                      {band.range}
                    </td>
                    <td className="px-4 py-3 text-foreground/70">
                      <span className="block">{band.basis}</span>
                      <span className="mt-1 block text-xs text-foreground/55">{band.note}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-foreground/50">
            说明：以上为不含接头、分隔片等配件的基础链体价格，不含运费；实际以询价回复为准。
            承重与无尘系列因结构与洁净等级差异，需按具体工况核算。
          </p>
        </section>

        <section className="mt-14" aria-labelledby="factors">
          <h2 id="factors" className="text-xl font-bold text-brand-primary sm:text-2xl">
            二、影响拖链价格的六个因素
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            看懂这六条，你就能自己判断一份报价是高是低，不用被人牵着走。
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {factors.map((f) => (
              <div
                key={f.title}
                className="rounded-lg border border-gray-200 bg-gray-50 p-5"
              >
                <h3 className="text-base font-semibold text-brand-primary">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="quote">
          <h2 id="quote" className="text-xl font-bold text-brand-primary sm:text-2xl">
            三、快速报价需要提供什么
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            资料给全，一次就能报准。缺参数来回问，双方都费时间。以下清单按重要性排列，
            前四项有了就能出初步报价：
          </p>
          <ol className="mt-6 space-y-3">
            {quoteNeeds.map((item, i) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/75">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-secondary text-xs font-semibold text-white">
                  {i + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14" aria-labelledby="why">
          <h2 id="why" className="text-xl font-bold text-brand-primary sm:text-2xl">
            四、厂家直供和中间商，价差在哪
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-foreground/75">
            <p>
              这事没什么神秘的。威仕龙的工厂在浙江乐清，模具自主开发、注塑自己做、组装自己做，
              链条上只有我们自己。报价里没有「贸易商加价」这一项，也没有「区域代理分成」。
            </p>
            <p>
              我们不会说自己是全网最低价，那种话没法兑现。常规型号自有模具、常备现货，
              这个成本结构能让我们在同等用料下报出有竞争力的价格；非标定制和特殊材质，
              该收的模具费和材料差价我们也会如实说明，不会先报低价再层层加钱。
            </p>
            <p>
              另外提醒一句：遇到明显低于市场价的报价，先问清楚用的是不是全新改性料。
              拖链装上去不响不动，看不出差别；跑几个月断了线、磨损起粉，损失的是停机时间。
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="faq">
          <h2 id="faq" className="text-xl font-bold text-brand-primary sm:text-2xl">
            五、价格常见问题
          </h2>
          <dl className="mt-6 divide-y divide-gray-100">
            {faqs.map((item) => (
              <div key={item.q} className="py-5">
                <dt className="text-base font-semibold text-foreground">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-foreground/70">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-14 rounded-xl border border-gray-200 bg-gray-50 p-6 sm:p-8" aria-labelledby="cta">
          <h2 id="cta" className="text-lg font-bold text-brand-primary sm:text-xl">
            要准确报价？把参数发过来
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/75">
            内高 × 内宽 + 长度就能出价。还没选型的，把线缆清单、行程和运行速度发给我们，
            工程师会先帮你算选型参数，再给型号和报价。工厂位于浙江乐清，持有 IATF 16949 与 ISO 9001 认证。
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={localizeHref("/contact", locale)}
              className="inline-flex rounded-md bg-brand-secondary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-accent"
            >
              获取拖链报价
            </Link>
            <Link
              href={localizeHref("/guides/selection", locale)}
              className="inline-flex rounded-md border border-brand-secondary px-5 py-2.5 text-sm font-medium text-brand-secondary transition-colors hover:bg-brand-secondary hover:text-white"
            >
              先看选型指南
            </Link>
            <Link
              href={localizeHref("/products", locale)}
              className="inline-flex rounded-md border border-brand-secondary px-5 py-2.5 text-sm font-medium text-brand-secondary transition-colors hover:bg-brand-secondary hover:text-white"
            >
              查看产品系列
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
