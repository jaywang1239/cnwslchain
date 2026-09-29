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
import { siteConfig } from "@/lib/site";

const TITLE = "乐清拖链厂家_浙江尼龙拖链工厂直供_就近发货";
const DESCRIPTION =
  "浙江威仕龙塑胶有限公司，拖链工厂位于浙江温州乐清，70+ 台海天注塑机、3000+ 套模具自主开发，通过 IATF 16949 与 ISO 9001。深圳、常州设销售办事处，广东仓库就近发货华东华南。本文说明工厂位置、各省服务方式与验厂安排。";

const KEYWORDS = [
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
];

const facts = [
  { k: "工厂地址", v: "浙江省温州市乐清市天成街道宁康东路2891号" },
  { k: "成立时间", v: "2010 年" },
  { k: "注塑设备", v: "70+ 台海天注塑机" },
  { k: "模具储备", v: "3000+ 套，核心产品模具自主开发" },
  { k: "认证", v: "IATF 16949:2016、ISO 9001:2015" },
  { k: "常规交期", v: "常规型号常备现货，1–3 天可发货" },
];

const regions: {
  area: string;
  covers: string;
  channel: string;
  note: string;
}[] = [
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

export function generateMetadata(): Metadata {
  const locale = getRequestLocale();
  const path = localizeHref("/factory", locale);
  const title = seoTitle(TITLE);
  const description = seoDescription(DESCRIPTION);

  return {
    title,
    description,
    keywords: KEYWORDS,
    alternates: {
      canonical: absoluteUrl(path),
      languages: localeAlternates("/factory").languages,
    },
    ...buildPageSocialMeta({ title, description, path, locale }),
  };
}

export default function FactoryPage() {
  const locale = getRequestLocale();
  const copy = getMessages(locale);
  const path = localizeHref("/factory", locale);
  const breadcrumb = buildSimpleBreadcrumbJsonLd([
    { name: copy.home, path: localizeHref("/", locale) },
    { name: "工厂与就近服务", path },
  ]);

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <section className="page-hero px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <nav className="mb-4 text-xs text-white/70" aria-label="面包屑">
            <Link href={localizeHref("/", locale)} className="hover:text-white">
              首页
            </Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white/90">工厂与就近服务</span>
          </nav>
          <h1 className="text-2xl font-bold leading-snug text-white sm:text-4xl">
            乐清拖链工厂：在浙江生产，按区域就近服务
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/85 sm:text-base">
            工厂只有一个，在浙江乐清。深圳和常州设的是销售办事处，不是分厂。
            这一点我们写清楚，省得你按「本地有厂」去理解，后面验厂时反而对不上。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <section aria-labelledby="factory">
          <h2 id="factory" className="text-xl font-bold text-brand-primary sm:text-2xl">
            一、生产实体：浙江乐清
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            浙江威仕龙塑胶有限公司（前身为温州市威仕龙塑胶有限公司）成立于 2010 年，
            是一家自主研发生产的拖链制造商，不是贸易商，也不是贴牌代工。模具自己开发、
            注塑自己做、组装自己做，模具库里常有三千多套模具。
          </p>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {facts.map((f) => (
              <div key={f.k} className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                <dt className="text-xs font-medium text-foreground/50">{f.k}</dt>
                <dd className="mt-1 text-sm font-medium text-foreground/85">{f.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm leading-relaxed text-foreground/70">
            如果你需要看产能、看设备、看模具，欢迎来乐清验厂——这是我们唯一能安排实地考察的地方。
            联系方式见{" "}
            <Link
              href={localizeHref("/contact", locale)}
              className="font-medium text-brand-secondary underline-offset-2 hover:underline"
            >
              联系我们
            </Link>
            ，电话 {siteConfig.phone}。
          </p>
        </section>

        <section className="mt-14" aria-labelledby="regions">
          <h2 id="regions" className="text-xl font-bold text-brand-primary sm:text-2xl">
            二、各区域怎么服务
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            工厂只有一个，但服务半径不只覆盖浙江。下面这张表说清楚每个区域通过什么方式对接、
            货从哪发：
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left">
                  <th className="px-4 py-3 font-medium text-brand-primary">区域</th>
                  <th className="px-4 py-3 font-medium text-brand-primary">覆盖</th>
                  <th className="px-4 py-3 font-medium text-brand-primary">对接与发货方式</th>
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
            三、销售办事处与仓库
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-foreground/75">
            <p>
              深圳和常州设的是<strong className="font-semibold text-foreground">销售办事处</strong>，
              职能是客户对接、技术支持和订单跟进。两地都不承担生产，这一点不想含糊。
              如果你在意的是「供应商离我近不近」，正确的判断标准是看仓库和发货地，不是看办事处在哪。
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-brand-primary">威仕龙深圳</h3>
                <p className="mt-2 text-sm text-foreground/70">{siteConfig.addresses.shenzhen}</p>
                <p className="mt-1 text-xs text-foreground/50">销售办事处 · 广东仓库就近发货</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-brand-primary">威仕龙常州</h3>
                <p className="mt-2 text-sm text-foreground/70">{siteConfig.addresses.changzhou}</p>
                <p className="mt-1 text-xs text-foreground/50">销售办事处 · 华东客户对接</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-foreground/60">
              广东仓库位于东莞、佛山，主要服务华南客户的常规型号提货需求；上海仓库覆盖长三角。
              具体到某型号是否本地有货，下单前问一下销售最准，我们不打包票说「全都有现货」。
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="why-us">
          <h2 id="why-us" className="text-xl font-bold text-brand-primary sm:text-2xl">
            四、为什么值得跑一趟乐清
          </h2>
          <ul className="mt-6 space-y-3">
            {[
              "模具自己开发，非标尺寸不用等外部供应商排期，改料配色也能快速响应",
              "70+ 台注塑机在厂内，产能和交期能自己控制，急单可以插单安排",
              "拖链寿命测试不低于 1500 万次，有检测报告可以调阅",
              "IATF 16949 与 ISO 9001 在手，汽车类客户的前置门槛能满足",
              "样品可以寄，3D 图纸可以给，先做设计校核再下单，减少返工",
            ].map((item) => (
              <li
                key={item}
                className="relative pl-4 text-sm leading-relaxed text-foreground/75 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-brand-secondary"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-foreground/60">
            关于认证说明一句实话：ISO 14001 目前还没最终确认，汽车类客户在报价前请先跟我们核实最新状态，
            我们已经持有的环境与质量相关证明材料可以按需提供。不确定的事不提前写进来。
          </p>
        </section>

        <section className="mt-14 rounded-xl border border-gray-200 bg-gray-50 p-6 sm:p-8" aria-labelledby="cta">
          <h2 id="cta" className="text-lg font-bold text-brand-primary sm:text-xl">
            要验厂、要样品，还是先要报价？
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/75">
            三种需求我们分别安排：验厂约时间走乐清工厂；样品留地址直接寄；
            报价给内高内宽和数量即可。不确定选型的，把线缆清单和行程发过来，工程师先帮你算参数。
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={localizeHref("/contact", locale)}
              className="inline-flex rounded-md bg-brand-secondary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-accent"
            >
              联系工厂
            </Link>
            <Link
              href={localizeHref("/about", locale)}
              className="inline-flex rounded-md border border-brand-secondary px-5 py-2.5 text-sm font-medium text-brand-secondary transition-colors hover:bg-brand-secondary hover:text-white"
            >
              了解公司实力
            </Link>
            <Link
              href={localizeHref("/price", locale)}
              className="inline-flex rounded-md border border-brand-secondary px-5 py-2.5 text-sm font-medium text-brand-secondary transition-colors hover:bg-brand-secondary hover:text-white"
            >
              查看价格参考
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
