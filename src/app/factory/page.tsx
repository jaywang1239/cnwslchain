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
import { absoluteUrl, localeAlternatesZhEn, siteConfig } from "@/lib/site";

type Fact = { k: string; v: string };
type Region = { area: string; covers: string; channel: string; note: string };

type FactoryCopy = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  crumbs: { home: string; self: string };
  h1: string;
  lead: string;
  sec1Title: string;
  sec1Body: string;
  facts: Fact[];
  visitBodyPrefix: string;
  visitBodySuffix: string;
  sec2Title: string;
  sec2Lead: string;
  regionHead: { area: string; covers: string; channel: string };
  sec3Title: string;
  sec3Body: string;
  officeShenzhen: string;
  officeShenzhenSub: string;
  officeChangzhou: string;
  officeChangzhouSub: string;
  warehouseNote: string;
  sec4Title: string;
  sec4Items: string[];
  certNote: string;
  ctaTitle: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaAbout: string;
  ctaPrice: string;
};

const ZH: FactoryCopy = {
  metaTitle: "乐清拖链厂家_浙江尼龙拖链工厂直供_就近发货",
  metaDescription:
    "浙江威仕龙塑胶有限公司，拖链工厂位于浙江温州乐清，70+ 台海天注塑机、3000+ 套模具自主开发，通过 IATF 16949 与 ISO 9001。深圳、常州设销售办事处，广东仓库就近发货华东华南。本文说明工厂位置、各省服务方式与验厂安排。",
  keywords: [
    "乐清拖链厂家",
    "浙江拖链厂家",
    "浙江尼龙拖链",
    "温州拖链厂家",
    "乐清塑料拖链",
    "华东拖链供应商",
    "华南拖链供应商",
    "拖链工厂直供",
    "尼龙拖链生产厂家",
    "拖链验厂",
  ],
  crumbs: { home: "首页", self: "工厂与就近服务" },
  h1: "乐清拖链工厂：在浙江生产，按区域就近服务",
  lead: "工厂只有一个，在浙江乐清。深圳和常州设的是销售办事处，不是分厂。这一点我们写清楚，省得你按「本地有厂」去理解，后面验厂时反而对不上。",
  sec1Title: "一、生产实体：浙江乐清",
  sec1Body:
    "浙江威仕龙塑胶有限公司（前身为温州市威仕龙塑胶有限公司）成立于 2010 年，是一家自主研发生产的拖链制造商，不是贸易商，也不是贴牌代工。模具自己开发、注塑自己做、组装自己做，模具库里常有三千多套模具。",
  facts: [
    { k: "工厂地址", v: "浙江省温州市乐清市天成街道宁康东路2891号" },
    { k: "成立时间", v: "2010 年" },
    { k: "注塑设备", v: "70+ 台海天注塑机" },
    { k: "模具储备", v: "3000+ 套，核心产品模具自主开发" },
    { k: "认证", v: "IATF 16949:2016、ISO 9001:2015" },
    { k: "常规交期", v: "常规型号常备现货，1–3 天可发货" },
  ],
  visitBodyPrefix:
    "如果你需要看产能、看设备、看模具，欢迎来乐清验厂——这是我们唯一能安排实地考察的地方。联系方式见",
  visitBodySuffix: "，电话",
  sec2Title: "二、各区域怎么服务",
  sec2Lead: "工厂只有一个，但服务半径不只覆盖浙江。下面这张表说清楚每个区域通过什么方式对接、货从哪发：",
  regionHead: { area: "区域", covers: "覆盖", channel: "对接与发货方式" },
  sec3Title: "三、销售办事处与仓库",
  sec3Body:
    "深圳和常州设的是「销售办事处」，职能是客户对接、技术支持和订单跟进。两地都不承担生产，这一点不想含糊。如果你在意的是「供应商离我近不近」，正确的判断标准是看仓库和发货地，不是看办事处在哪。",
  officeShenzhen: "威仕龙深圳",
  officeShenzhenSub: "销售办事处 · 广东仓库就近发货",
  officeChangzhou: "威仕龙常州",
  officeChangzhouSub: "销售办事处 · 华东客户对接",
  warehouseNote:
    "广东仓库位于东莞、佛山，主要服务华南客户的常规型号提货需求；上海仓库覆盖长三角。具体到某型号是否本地有货，下单前问一下销售最准，我们不打包票说「全都有现货」。",
  sec4Title: "四、为什么值得跑一趟乐清",
  sec4Items: [
    "模具自己开发，非标尺寸不用等外部供应商排期，改料配色也能快速响应",
    "70+ 台注塑机在厂内，产能和交期能自己控制，急单可以插单安排",
    "拖链寿命测试不低于 1500 万次，有检测报告可以调阅",
    "IATF 16949 与 ISO 9001 在手，汽车类客户的前置门槛能满足",
    "样品可以寄，3D 图纸可以给，先做设计校核再下单，减少返工",
  ],
  certNote:
    "关于认证说明一句实话：ISO 14001 目前还没最终确认，汽车类客户在报价前请先跟我们核实最新状态，我们已经持有的环境与质量相关证明材料可以按需提供。不确定的事不提前写进来。",
  ctaTitle: "要验厂、要样品，还是先要报价？",
  ctaBody:
    "三种需求我们分别安排：验厂约时间走乐清工厂；样品留地址直接寄；报价给内高内宽和数量即可。不确定选型的，把线缆清单和行程发过来，工程师先帮你算参数。",
  ctaPrimary: "联系工厂",
  ctaAbout: "了解公司实力",
  ctaPrice: "查看价格参考",
};

const EN: FactoryCopy = {
  metaTitle: "Cable Carrier Manufacturer in Yueqing, Zhejiang | Factory Direct",
  metaDescription:
    "Zhejiang CNWSL Plastics Co., Ltd. makes nylon cable carriers at its factory in Yueqing, Wenzhou, Zhejiang, with 70+ Haitian injection moulding machines and 3000+ in-house moulds, certified to IATF 16949 and ISO 9001. Sales offices are in Shenzhen and Changzhou, with Guangdong warehouses shipping across South and East China. This page explains where the factory is, how we serve each region, and how to arrange a factory visit.",
  keywords: [
    "cable carrier manufacturer",
    "cable carrier factory China",
    "nylon drag chain manufacturer",
    "Zhejiang cable carrier supplier",
    "Yueqing cable carrier",
    "factory direct cable carrier",
    "drag chain factory audit",
    "IATF 16949 cable carrier",
  ],
  crumbs: { home: "Home", self: "Factory & Regional Service" },
  h1: "Our Yueqing cable carrier factory: made in Zhejiang, served locally by region",
  lead: "There is only one factory, in Yueqing, Zhejiang. Shenzhen and Changzhou are sales offices, not branch plants. We state this plainly so that no one interprets it as a 'local factory' — which would not match up when it comes to a factory audit.",
  sec1Title: "1. The manufacturing site: Yueqing, Zhejiang",
  sec1Body:
    "Zhejiang CNWSL Plastics Co., Ltd. (formerly Wenzhou CNWSL Plastics Co., Ltd.) was founded in 2010. It is a cable carrier manufacturer with its own development and production — not a trading company and not an OEM/ODM label. We develop our own moulds, do our own injection moulding and our own assembly, and our mould store typically holds more than 3000 moulds.",
  facts: [
    { k: "Factory address", v: "No. 2891 Ningkang East Road, Tiancheng Street, Yueqing, Wenzhou, Zhejiang, China" },
    { k: "Founded", v: "2010" },
    { k: "Injection moulding", v: "70+ Haitian injection moulding machines" },
    { k: "Mould inventory", v: "3000+ moulds, with core product moulds developed in-house" },
    { k: "Certification", v: "IATF 16949:2016, ISO 9001:2015" },
    { k: "Standard lead time", v: "Standard models held in stock, shipping in 1–3 days" },
  ],
  visitBodyPrefix:
    "If you want to see our capacity, machines and moulds, you are welcome to visit the factory in Yueqing — it is the only site where we can arrange an on-site inspection. For contact details, see",
  visitBodySuffix: ", telephone",
  sec2Title: "2. How we serve each region",
  sec2Lead:
    "There is only one factory, but our service reach goes beyond Zhejiang. The table below sets out how each region is served and where goods ship from:",
  regionHead: { area: "Region", covers: "Coverage", channel: "Contact & shipping" },
  sec3Title: "3. Sales offices and warehouses",
  sec3Body:
    "Shenzhen and Changzhou are 'sales offices' whose role is customer contact, technical support and order follow-up. Neither carries out production, and we do not want to blur that. If what matters to you is how close your supplier is, the right measure is where the warehouse and shipping point are, not where the sales office is.",
  officeShenzhen: "CNWSL Shenzhen",
  officeShenzhenSub: "Sales office · ships from Guangdong warehouse",
  officeChangzhou: "CNWSL Changzhou",
  officeChangzhouSub: "Sales office · East China customer contact",
  warehouseNote:
    "Our Guangdong warehouses are in Dongguan and Foshan, mainly serving South China customers picking up standard models; a Shanghai warehouse covers the Yangtze River Delta. Whether a particular model is in local stock is best confirmed with your sales contact before ordering — we do not promise that 'everything is in stock everywhere'.",
  sec4Title: "4. Why it is worth the trip to Yueqing",
  sec4Items: [
    "We develop our own moulds, so non-standard sizes do not wait on an outside supplier's schedule, and material or colour changes can be handled quickly.",
    "With 70+ injection moulding machines on site we control capacity and lead time ourselves, and can slot in urgent orders.",
    "Carrier life testing runs to at least 15 million cycles, with test reports available for review.",
    "We hold IATF 16949 and ISO 9001, which meets the entry requirement for automotive customers.",
    "Samples can be sent and 3D drawings provided so you can verify the design before ordering, reducing rework.",
  ],
  certNote:
    "One honest note on certification: ISO 14001 has not yet been finally confirmed. Automotive customers should check the latest status with us before requesting a quote; we can supply the environmental and quality documentation we do hold on request. We do not list things we are not certain of.",
  ctaTitle: "Factory visit, samples, or a quote?",
  ctaBody:
    "We handle the three separately: arrange a factory visit at our Yueqing plant; send samples to your address; or quote from inner height, inner width and quantity. If you have not selected a model, send your cable list and travel distance and our engineers will work out the parameters first.",
  ctaPrimary: "Contact the factory",
  ctaAbout: "About our capability",
  ctaPrice: "See price reference",
};

function copyFor(locale: string): FactoryCopy {
  return locale === "en" ? EN : ZH;
}

/** 区域服务表：结构与语言无关，文案按语种填充。 */
const REGIONS_ZH: Region[] = [
  {
    area: "浙江 / 华东",
    covers: "浙江、江苏、上海、安徽、福建",
    channel: "乐清工厂直发 + 常州销售办事处",
    note: "工厂所在地，验厂、打样、技术对接最方便；常州办事处负责华东客户日常对接与现场支持",
  },
  {
    area: "广东 / 华南",
    covers: "广东、广西、湖南、江西",
    channel: "深圳销售办事处 + 广东仓库就近发货",
    note: "深圳设办事处，东莞、佛山设仓库，常规型号可本地提货，缩短交期与物流成本",
  },
  {
    area: "华北 / 华中 / 西南",
    covers: "山东、河北、河南、湖北、四川、重庆等",
    channel: "乐清工厂直发",
    note: "按订单排产直发，物流时效视具体城市而定，下单前可先确认",
  },
  {
    area: "海外",
    covers: "东南亚、欧洲、南美、中东等",
    channel: "工厂直发出口",
    note: "承担中国台湾、中国香港等地区及海外市场订单，支持按目的国要求做合规与包装",
  },
];

const REGIONS_EN: Region[] = [
  {
    area: "Zhejiang / East China",
    covers: "Zhejiang, Jiangsu, Shanghai, Anhui, Fujian",
    channel: "Direct from the Yueqing factory + Changzhou sales office",
    note: "The factory location — easiest for audits, sampling and technical discussions; the Changzhou office handles day-to-day contact and on-site support for East China customers",
  },
  {
    area: "Guangdong / South China",
    covers: "Guangdong, Guangxi, Hunan, Jiangxi",
    channel: "Shenzhen sales office + shipping from Guangdong warehouses",
    note: "A Shenzhen office and warehouses in Dongguan and Foshan let standard models be collected locally, cutting lead time and logistics cost",
  },
  {
    area: "North / Central / Southwest China",
    covers: "Shandong, Hebei, Henan, Hubei, Sichuan, Chongqing and more",
    channel: "Direct from the Yueqing factory",
    note: "Scheduled to order and shipped direct; transit time depends on the city, so please confirm before ordering",
  },
  {
    area: "Overseas",
    covers: "Southeast Asia, Europe, South America, the Middle East and more",
    channel: "Direct factory export",
    note: "We serve customers in Taiwan, China, Hong Kong, China and overseas markets, and can meet destination-specific compliance and packaging requirements",
  },
];

export function generateMetadata(): Metadata {
  const locale = requireZhEnLocale();
  const path = localizeHref("/factory", locale);
  const copy = copyFor(locale);
  const title = seoTitle(copy.metaTitle);
  const description = seoDescription(copy.metaDescription);

  return {
    title,
    description,
    keywords: copy.keywords,
    alternates: {
      canonical: absoluteUrl(path),
      languages: localeAlternatesZhEn("/factory").languages,
    },
    ...buildPageSocialMeta({ title, description, path, locale }),
  };
}

export default function FactoryPage() {
  const locale = requireZhEnLocale();
  const messages = getMessages(locale);
  const copy = copyFor(locale);
  const path = localizeHref("/factory", locale);
  const regions = locale === "en" ? REGIONS_EN : REGIONS_ZH;
  const breadcrumb = buildSimpleBreadcrumbJsonLd([
    { name: messages.home, path: localizeHref("/", locale) },
    { name: copy.crumbs.self, path },
  ]);

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
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
        <section aria-labelledby="factory">
          <h2 id="factory" className="text-xl font-bold text-brand-primary sm:text-2xl">
            {copy.sec1Title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            {copy.sec1Body}
          </p>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {copy.facts.map((f) => (
              <div key={f.k} className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                <dt className="text-xs font-medium text-foreground/50">{f.k}</dt>
                <dd className="mt-1 text-sm font-medium text-foreground/85">{f.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm leading-relaxed text-foreground/70">
            {copy.visitBodyPrefix}{" "}
            <Link
              href={localizeHref("/contact", locale)}
              className="font-medium text-brand-secondary underline-offset-2 hover:underline"
            >
              {messages.nav.contact}
            </Link>
            {copy.visitBodySuffix} {siteConfig.phone}。
          </p>
        </section>

        <section className="mt-14" aria-labelledby="regions">
          <h2 id="regions" className="text-xl font-bold text-brand-primary sm:text-2xl">
            {copy.sec2Title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            {copy.sec2Lead}
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left">
                  <th className="px-4 py-3 font-medium text-brand-primary">{copy.regionHead.area}</th>
                  <th className="px-4 py-3 font-medium text-brand-primary">{copy.regionHead.covers}</th>
                  <th className="px-4 py-3 font-medium text-brand-primary">{copy.regionHead.channel}</th>
                </tr>
              </thead>
              <tbody>
                {regions.map((r) => (
                  <tr key={r.area} className="border-b border-gray-100 align-top">
                    <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{r.area}</td>
                    <td className="px-4 py-3 text-foreground/70">{r.covers}</td>
                    <td className="px-4 py-3 text-foreground/70">
                      <span className="block font-medium text-foreground/85">{r.channel}</span>
                      <span className="mt-1 block text-xs text-foreground/55">{r.note}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="offices">
          <h2 id="offices" className="text-xl font-bold text-brand-primary sm:text-2xl">
            {copy.sec3Title}
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-foreground/75">
            <p>{copy.sec3Body}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-brand-primary">{copy.officeShenzhen}</h3>
                <p className="mt-2 text-sm text-foreground/70">{siteConfig.addresses.shenzhen}</p>
                <p className="mt-1 text-xs text-foreground/50">{copy.officeShenzhenSub}</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-brand-primary">{copy.officeChangzhou}</h3>
                <p className="mt-2 text-sm text-foreground/70">{siteConfig.addresses.changzhou}</p>
                <p className="mt-1 text-xs text-foreground/50">{copy.officeChangzhouSub}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-foreground/60">
              {copy.warehouseNote}
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="why-us">
          <h2 id="why-us" className="text-xl font-bold text-brand-primary sm:text-2xl">
            {copy.sec4Title}
          </h2>
          <ul className="mt-6 space-y-3">
            {copy.sec4Items.map((item) => (
              <li
                key={item}
                className="relative pl-4 text-sm leading-relaxed text-foreground/75 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-brand-secondary"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-foreground/60">
            {copy.certNote}
          </p>
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
              href={localizeHref("/about", locale)}
              className="inline-flex rounded-md border border-brand-secondary px-5 py-2.5 text-sm font-medium text-brand-secondary transition-colors hover:bg-brand-secondary hover:text-white"
            >
              {copy.ctaAbout}
            </Link>
            <Link
              href={localizeHref("/price", locale)}
              className="inline-flex rounded-md border border-brand-secondary px-5 py-2.5 text-sm font-medium text-brand-secondary transition-colors hover:bg-brand-secondary hover:text-white"
            >
              {copy.ctaPrice}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
