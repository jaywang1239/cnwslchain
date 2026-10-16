import type { Metadata } from "next";
import Link from "next/link";
import { localizeHref } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n/messages";
import { requireZhEnLocale } from "@/lib/zh-only";
import {
  buildPageSocialMeta,
  buildSimpleBreadcrumbJsonLd,
  seoDescription,
  seoTitle,
} from "@/lib/seo";
import { absoluteUrl, localeAlternatesZhEn } from "@/lib/site";

type PriceBand = {
  group: string;
  range: string;
  basis: string;
  note: string;
};
type Factor = { title: string; body: string };
type Faq = { q: string; a: string };

type PriceCopy = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  crumbs: { home: string; self: string };
  h1: string;
  lead: string;
  bandTitle: string;
  bandLead: string;
  bandHead: { series: string; range: string; variables: string };
  bandFootnote: string;
  factorTitle: string;
  factorLead: string;
  quoteTitle: string;
  quoteLead: string;
  whyTitle: string;
  whyBody: string[];
  faqTitle: string;
  ctaTitle: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaGuide: string;
  ctaProducts: string;
  bands: PriceBand[];
  factors: Factor[];
  quoteNeeds: string[];
  faqs: Faq[];
};

const ZH: PriceCopy = {
  metaTitle: "拖链价格_塑料拖链多少钱一米_厂家报价与计价方式",
  metaDescription:
    "塑料拖链多少钱一米？威仕龙厂家直供：拖链价格由内高内宽、弯曲半径、材质与数量决定，常规微型拖链约 8-25 元/米，中型约 20-60 元/米，承重与无尘系列更高。本文给出计价逻辑、影响价格的因素与询价所需资料，并说明厂家直供与中间商的价差来源。",
  keywords: [
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
  ],
  crumbs: { home: "首页", self: "拖链价格" },
  h1: "拖链价格怎么算：多少钱一米，钱花在哪",
  lead: "不绕弯子，先把参考区间和计价逻辑摆出来。拖链是注塑件，价格不是拍脑袋定的，看的是内高内宽、弯曲半径、材质和数量这几个硬指标。",
  bandTitle: "一、分系列参考价格区间",
  bandLead:
    "先说清楚：下表是「参考区间」，不是报价。拖链按节计价，同样内高不同内宽价格能差一倍以上，所以任何精确到元的「一口价」都不靠谱。具体价格按型号和数量核算。",
  bandHead: { series: "系列", range: "参考区间", variables: "主要变量" },
  bandFootnote:
    "说明：以上为不含接头、分隔片等配件的基础链体价格，不含运费；实际以询价回复为准。承重与无尘系列因结构与洁净等级差异，需按具体工况核算。",
  factorTitle: "二、影响拖链价格的六个因素",
  factorLead: "看懂这六条，你就能自己判断一份报价是高是低，不用被人牵着走。",
  quoteTitle: "三、快速报价需要提供什么",
  quoteLead:
    "资料给全，一次就能报准。缺参数来回问，双方都费时间。以下清单按重要性排列，前四项有了就能出初步报价：",
  whyTitle: "四、厂家直供和中间商，价差在哪",
  whyBody: [
    "这事没什么神秘的。威仕龙的工厂在浙江乐清，模具自主开发、注塑自己做、组装自己做，链条上只有我们自己。报价里没有「贸易商加价」这一项，也没有「区域代理分成」。",
    "我们不会说自己是全网最低价，那种话没法兑现。常规型号自有模具、常备现货，这个成本结构能让我们在同等用料下报出有竞争力的价格；非标定制和特殊材质，该收的模具费和材料差价我们也会如实说明，不会先报低价再层层加钱。",
    "另外提醒一句：遇到明显低于市场价的报价，先问清楚用的是不是全新改性料。拖链装上去不响不动，看不出差别；跑几个月断了线、磨损起粉，损失的是停机时间。",
  ],
  faqTitle: "五、价格常见问题",
  ctaTitle: "要准确报价？把参数发过来",
  ctaBody:
    "内高 × 内宽 + 长度就能出价。还没选型的，把线缆清单、行程和运行速度发给我们，工程师会先帮你算选型参数，再给型号和报价。工厂位于浙江乐清，持有 IATF 16949 与 ISO 9001 认证。",
  ctaPrimary: "获取拖链报价",
  ctaGuide: "先看选型指南",
  ctaProducts: "查看产品系列",
  bands: [
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
  ],
  factors: [
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
  ],
  quoteNeeds: [
    "拖链内高 × 内宽（或直接给型号，如 H25 × B50）",
    "需要的总长度或节数，是否要求按根供应",
    "弯曲半径 R 值，或告知行程长度由我们推算",
    "开口形式偏好：桥式 / 半封闭 / 全封闭",
    "运行速度与是否高频往复，是否需要导向槽或支撑轮",
    "线缆清单（外径、数量、气管规格），需要时我们帮你校核填充率",
    "是否需要接头、分隔片、端部固定件等配件",
    "交期要求与目的地（是否含运费）",
  ],
  faqs: [
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
  ],
};

const EN: PriceCopy = {
  metaTitle: "Cable Carrier Price Guide | Cost per Meter & How We Quote",
  metaDescription:
    "How much does a nylon cable carrier cost per meter? At CNWSL the price depends on inner height and width, bend radius, material and order quantity: micro carriers from roughly USD 1.2-3.5/m, medium carriers USD 3-9/m, with heavier and cleanroom series higher. This page explains the pricing logic, the six factors that move the price, and what to send us for a quote.",
  keywords: [
    "cable carrier price",
    "drag chain price",
    "cable chain cost per meter",
    "nylon cable carrier price",
    "plastic drag chain price",
    "cable carrier quotation",
    "cleanroom cable carrier price",
    "micro cable carrier price",
  ],
  crumbs: { home: "Home", self: "Cable Carrier Price" },
  h1: "How cable carrier pricing works: cost per meter and where the money goes",
  lead: "No runaround — here are the reference ranges and the pricing logic up front. A cable carrier is an injection-moulded part, so the price is not guesswork: it comes down to inner height and width, bend radius, material and quantity.",
  bandTitle: "1. Reference price ranges by series",
  bandLead:
    "To be clear: the table below gives reference ranges, not quotations. Cable carriers are priced per link; the same inner height with a different inner width can differ by more than double, so any single 'exact' figure is unreliable. Actual pricing is calculated by model and quantity.",
  bandHead: { series: "Series", range: "Reference range", variables: "Main variables" },
  bandFootnote:
    "Notes: the ranges above cover the chain body only, excluding connectors, dividers and other accessories, and excluding freight. The final price is confirmed by quotation. Heavy-duty and cleanroom series vary with structure and cleanliness class and must be quoted for the specific application.",
  factorTitle: "2. Six factors that move the cable carrier price",
  factorLead:
    "Understand these six and you can judge for yourself whether a quotation is high or low, without being led along.",
  quoteTitle: "3. What to send us for a fast, accurate quote",
  quoteLead:
    "Give us complete data and we can quote accurately the first time. Missing parameters mean back-and-forth questions that waste time on both sides. The list below is ordered by importance — with the first four you can get an preliminary quote:",
  whyTitle: "4. Direct-from-factory versus a middleman: where the price gap comes from",
  whyBody: [
    "There is no mystery here. CNWSL's factory is in Yueqing, Zhejiang. We develop our own moulds, do our own injection moulding and our own assembly — we are the only link in the chain. There is no 'trader markup' line in our quotation and no 'regional distributor share'.",
    "We will not claim to be the cheapest on the market — that promise cannot be kept. Because we hold our own moulds for standard models and keep stock, our cost structure lets us quote competitively for the same material. For custom work and special materials, we state the mould cost and material difference honestly rather than quoting low and adding charges later.",
    "One more warning: if a quote is noticeably below the market price, first ask whether the material is virgin modified nylon. A carrier made from recycled material looks and sounds fine when installed — the difference shows up months later as broken cables and abrasive dust, and the real cost is downtime.",
  ],
  faqTitle: "5. Frequently asked questions about pricing",
  ctaTitle: "Need an accurate quote? Send us your parameters",
  ctaBody:
    "Inner height × inner width plus length is enough for a price. If you have not selected yet, send us your cable list, travel distance and running speed and our engineers will work out the selection parameters first, then give you the model and the quote. The factory is in Yueqing, Zhejiang and holds IATF 16949 and ISO 9001.",
  ctaPrimary: "Request a quote",
  ctaGuide: "See the selection guide first",
  ctaProducts: "View product series",
  bands: [
    {
      group: "Micro (inner height 5–15 mm)",
      range: "approx. USD 1.2–3.5 / m",
      basis: "Inner height × width, link length",
      note: "Common on small CNC, inspection equipment and electronics assembly lines; quantity drives the price tier",
    },
    {
      group: "Medium (inner height 18–30 mm)",
      range: "approx. USD 3–9 / m",
      basis: "Inner height × width, opening type, dividers",
      note: "The mainstay for injection moulding machines and machining centers; open vs fully enclosed differs by about 10–20%",
    },
    {
      group: "Heavy-duty (inner height 45–80 mm)",
      range: "approx. USD 8–23 / m",
      basis: "Reinforced side plates, inner width, bend radius",
      note: "Gantry machining centers, large injection moulding machines, long-travel equipment; support and guide components quoted separately",
    },
    {
      group: "Silent (inner height 18–45 mm)",
      range: "approx. USD 4.5–13 / m",
      basis: "Low-friction hinge design, inner height and width",
      note: "Clean workshops and high-speed reciprocating applications; pair with a guide trough at high speed",
    },
    {
      group: "Cleanroom (WWC series)",
      range: "approx. USD 10–29 / m",
      basis: "Cleanliness class, particle emission, anti-static requirements",
      note: "Semiconductor, LCD panel and pharmaceutical cleanrooms; must be verified and built to the cleanliness class",
    },
  ],
  factors: [
    {
      title: "Inner height × inner width",
      body: "The basic unit of pricing is the link, not the metre; converting to a per-metre price depends on the link length. At the same inner height, going from a 30 mm to a 100 mm inner width nearly doubles the material, so the price rises accordingly.",
    },
    {
      title: "Material and compound",
      body: "Standard glass-filled PA66 nylon is the norm. Anti-static, flame-retardant, low-temperature or food-grade materials cost noticeably more, and that difference is genuine material cost.",
    },
    {
      title: "Bend radius",
      body: "A larger bend radius means more material and a bigger link. Going from R38 to R100 typically adds 15–30% to the per-metre price. Size it at ten times the stiffest hose in the bundle — do not squeeze it to the limit to save money.",
    },
    {
      title: "Structure",
      body: "Open, semi-enclosed and fully enclosed carriers differ in crossbar and side-plate design. Fully enclosed needs baffles and seals and usually runs 10–20% more than an open design of the same size.",
    },
    {
      title: "Whether the mould exists",
      body: "For standard models we hold the mould, so we can produce and ship in 1–3 days at the standard price tier. A completely non-standard size needs a new mould with a one-off tooling cost, which pushes the unit price up on small quantities.",
    },
    {
      title: "Order quantity",
      body: "As an injection-moulded part, the cost per unit falls as volume rises. The difference between a few dozen metres and a few thousand metres is significant, especially when a mould change, colour matching or material change is involved.",
    },
  ],
  quoteNeeds: [
    "Inner height × inner width (or the model code directly, e.g. H25 × B50)",
    "Total length or number of links required, and whether you need it supplied in runs",
    "Bend radius R, or tell us the travel distance and we will work it out",
    "Preferred opening type: open / semi-enclosed / fully enclosed",
    "Running speed and whether it is high-frequency reciprocating; whether a guide trough or support rollers are needed",
    "Cable list (outer diameter, quantity, hose specification) — we will check the fill rate for you if needed",
    "Whether connectors, dividers, end fixings and other accessories are required",
    "Required lead time and destination (and whether freight is included)",
  ],
  faqs: [
    {
      q: "How much does a cable carrier cost per meter?",
      a: "The range is wide: micro carriers roughly USD 1.2–3.5/m, medium about USD 3–9/m, heavy-duty about USD 8–23/m and cleanroom about USD 10–29/m. These are reference ranges only; the actual quote depends on inner height and width, bend radius, material and quantity. For the same model, buying 20 metres and buying 2000 metres can differ considerably per metre.",
    },
    {
      q: "Why do different suppliers quote so differently?",
      a: "Mainly three things. First, material: recycled versus virgin modified nylon differ substantially in cost, and a recycled carrier looks fine at first — the difference shows after a few months on the machine. Second, moulds and tolerances: a supplier with old moulds produces inconsistent dimensions that bind on installation. Third, channel: each middleman adds a margin. Ours comes directly from the factory in Yueqing, with no intermediary.",
    },
    {
      q: "What information do you need to quote?",
      a: "The simplest approach is to send inner height × inner width and the length. If you have not selected yet, send your cable outer diameters, quantities and hose specification plus travel distance and running speed, and our engineers will calculate the inner height, width and bend radius, then give you the model and the quote.",
    },
    {
      q: "Do you hold stock? What is the lead time?",
      a: "Standard models are held in stock and ship in 1–3 days. Material changes, colour matching or non-standard sizes depend on the mould, generally 5–10 working days. For urgent orders, tell your sales contact — we will fit them in where we can.",
    },
    {
      q: "Can I get a sample to test first?",
      a: "Yes. Standard models can be sent as samples; for non-standard or custom materials we recommend a small trial batch first. 3D drawings for design verification can also be provided — please confirm the format and availability with your sales contact.",
    },
    {
      q: "Do you accept small orders?",
      a: "Yes. We handle both large volume orders and single-run or single-machine trial requirements. The unit price is higher on small quantities, and we say so up front so there is no surprise later.",
    },
  ],
};

function copyFor(locale: string): PriceCopy {
  return locale === "en" ? EN : ZH;
}

export function generateMetadata(): Metadata {
  const locale = requireZhEnLocale();
  const path = localizeHref("/price", locale);
  const copy = copyFor(locale);
  const title = seoTitle(copy.metaTitle);
  const description = seoDescription(copy.metaDescription);

  return {
    title,
    description,
    keywords: copy.keywords,
    alternates: {
      canonical: absoluteUrl(path),
      languages: localeAlternatesZhEn("/price").languages,
    },
    ...buildPageSocialMeta({ title, description, path, locale }),
  };
}

export default function PricePage() {
  const locale = requireZhEnLocale();
  const messages = getMessages(locale);
  const copy = copyFor(locale);
  const path = localizeHref("/price", locale);
  const breadcrumb = buildSimpleBreadcrumbJsonLd([
    { name: messages.home, path: localizeHref("/", locale) },
    { name: copy.crumbs.self, path },
  ]);

  /** FAQ 结构化数据在每次渲染时构建（内容随语言变化）。 */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqs.map((item) => ({
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
          <nav className="mb-4 text-xs text-white/70" aria-label="breadcrumb">
            <Link href={localizeHref("/", locale)} className="hover:text-white">
              {copy.crumbs.home}
            </Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white/90">{copy.crumbs.self}</span>
          </nav>
          <h1 className="text-2xl font-bold leading-snug text-white sm:text-4xl">
            {copy.h1}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/85 sm:text-base">
            {copy.lead}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <section aria-labelledby="bands">
          <h2 id="bands" className="text-xl font-bold text-brand-primary sm:text-2xl">
            {copy.bandTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            {copy.bandLead}
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left">
                  <th className="px-4 py-3 font-medium text-brand-primary">{copy.bandHead.series}</th>
                  <th className="px-4 py-3 font-medium text-brand-primary">{copy.bandHead.range}</th>
                  <th className="px-4 py-3 font-medium text-brand-primary">{copy.bandHead.variables}</th>
                </tr>
              </thead>
              <tbody>
                {copy.bands.map((band) => (
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
            {copy.bandFootnote}
          </p>
        </section>

        <section className="mt-14" aria-labelledby="factors">
          <h2 id="factors" className="text-xl font-bold text-brand-primary sm:text-2xl">
            {copy.factorTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            {copy.factorLead}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {copy.factors.map((f) => (
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
            {copy.quoteTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            {copy.quoteLead}
          </p>
          <ol className="mt-6 space-y-3">
            {copy.quoteNeeds.map((item, i) => (
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
            {copy.whyTitle}
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-foreground/75">
            {copy.whyBody.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="faq">
          <h2 id="faq" className="text-xl font-bold text-brand-primary sm:text-2xl">
            {copy.faqTitle}
          </h2>
          <dl className="mt-6 divide-y divide-gray-100">
            {copy.faqs.map((item) => (
              <div key={item.q} className="py-5">
                <dt className="text-base font-semibold text-foreground">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-foreground/70">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-14 rounded-xl border border-gray-200 bg-gray-50 p-6 sm:p-8" aria-labelledby="cta">
          <h2 id="cta" className="text-lg font-bold text-brand-primary sm:text-xl">
            {copy.ctaTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/75">
            {copy.ctaBody}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={localizeHref("/contact", locale)}
              className="inline-flex rounded-md bg-brand-secondary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-accent"
            >
              {copy.ctaPrimary}
            </Link>
            <Link
              href={localizeHref("/guides/selection", locale)}
              className="inline-flex rounded-md border border-brand-secondary px-5 py-2.5 text-sm font-medium text-brand-secondary transition-colors hover:bg-brand-secondary hover:text-white"
            >
              {copy.ctaGuide}
            </Link>
            <Link
              href={localizeHref("/products", locale)}
              className="inline-flex rounded-md border border-brand-secondary px-5 py-2.5 text-sm font-medium text-brand-secondary transition-colors hover:bg-brand-secondary hover:text-white"
            >
              {copy.ctaProducts}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
