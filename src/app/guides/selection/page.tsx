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

const TITLE = "拖链怎么选型_内高内宽/弯曲半径/填充率计算全指南";
const DESCRIPTION =
  "拖链选型五步法：先定结构（桥式/半封闭/全封闭），再算内高内宽，然后确定弯曲半径（线径 7.5-10 倍），校核承载，最后定支撑与导向。附填充率、长度计算公式与常见选型误区，威仕龙工程师整理。";

const KEYWORDS = [
  "拖链怎么选型",
  "拖链选型",
  "拖链弯曲半径",
  "拖链内高内宽",
  "拖链填充率",
  "拖链长度计算",
  "拖链选型公式",
];

const steps: { no: string; title: string; body: string; points: string[] }[] = [
  {
    no: "01",
    title: "先定结构：桥式、半封闭还是全封闭",
    body:
      "结构选错，后面参数算得再准也白搭。结构由使用环境决定，不是由价格决定。",
    points: [
      "桥式拖链：链节间有缝隙，能直接观察内部管线，散热好 —— 洁净环境、散热要求高的场合",
      "半封闭拖链：横杆部分封闭，兼顾观察与挡尘 —— 一般车间环境",
      "全封闭拖链：完全封闭，防铁屑、焊渣、切削液进入 —— 切割、焊接、打磨等碎屑多的场合",
    ],
  },
  {
    no: "02",
    title: "再算内高内宽：最容易翻车的一步",
    body:
      "内高、内宽是拖链选型里出错率最高的参数。很多人凭感觉选，装上才发现线缆挤死或晃动撞击。",
    points: [
      "内高 ≥ 所有管线中最大单根直径 + 5mm 预留（例如最大电缆直径 20mm，内高至少 25mm）",
      "内宽 ≥ 所有管线总宽度 + 10%~30% 预留（例如三根电缆并排总宽 80mm，内宽至少 88mm）",
      "多层排布时，还要加上分隔片厚度与层间间隙",
      "填充率校核：管线占内腔截面积控制在 50%~70%，太低会晃动撞击，太高会挤压发热",
    ],
  },
  {
    no: "03",
    title: "确定弯曲半径：决定线缆寿命的生死线",
    body:
      "弯曲半径是影响电缆与气管寿命的第一参数。半径小一档，拖链体积小一圈、成本低一截，但线缆寿命可能缩短到原来的十分之一。",
    points: [
      "圆电缆：最小弯曲半径约为外径的 7.5~10 倍（直径 10mm 的电缆，拖链弯曲半径至少 75~100mm）",
      "气管：PU 气管约为外径的 4~6 倍，普通 PVC 气管需要更大半径",
      "光缆：约为外径的 10~15 倍",
      "混合管线：取所有管线中要求最大的那一个",
      "实用建议：按最粗、最硬管线的 10 倍取，不要卡理论最小值",
    ],
  },
  {
    no: "04",
    title: "校核承载：动态负载远低于静态",
    body:
      "只按静态重量选拖链是常见错误。高频往复时还要承受加减速产生的惯性力。",
    points: [
      "动态负载需在静态负载基础上预留 1.2~1.5 倍安全系数",
      "计算负载要算全所有管线重量 + 运动惯性力的总和",
      "长行程滑行应用必须确认拖链的架空承载能力，不能只看标准标称值",
    ],
  },
  {
    no: "05",
    title: "确定支撑与导向：行程超过 5 米必须加",
    body:
      "行程短时拖链可以完全悬挂运行；行程变长后，上层会因自重下垂，即俗称的“塌腰”。",
    points: [
      "行程 > 5m：需在拖链中间加装支撑槽或支撑轮，支撑点间距通常 2~3m",
      "高速场景（> 0.8m/s）：即使行程不长，也建议加导向槽，防止侧向摆动",
      "垂直或倾斜安装：需增加配重或防松装置，防止重力导致链节松脱",
    ],
  },
];

const mistakes = [
  "为省空间把弯曲半径压到极限 —— 三个月断一次线",
  "填充率塞到 70% 以上还硬塞 —— 管线互相摩擦、散热不良",
  "动力线与信号线绑在一起 —— 电磁干扰导致传感器误触发、编码器信号波动",
  "用普通电缆代替拖链专用高柔性电缆 —— 高速摩擦后产生碎屑",
  "两端固定点不同轴 —— 链节反复承受扭转应力，最终断裂",
  "等线缆彻底断了才排查 —— 应该在出现间歇性报警时就检查拖链内部",
];

const params = [
  { name: "内高 (H)", formula: "≥ 最大管线直径 + 5mm", note: "多层需加分隔片厚度" },
  { name: "内宽 (B)", formula: "≥ 管线总宽 + 10%~30%", note: "线缆间留活动余量" },
  { name: "弯曲半径 (R)", formula: "≥ 最硬管线直径 × 7.5~10", note: "建议取 10 倍以上" },
  { name: "填充率", formula: "管线截面 ÷ 内腔截面 ≤ 70%", note: "无尘场合建议 ≤ 60%" },
  { name: "拖链长度 (L)", formula: "L = 行程 ÷ 2 + π × R + 预留", note: "固定端在行程中点时最短" },
];

export function generateMetadata(): Metadata {
  const locale = getRequestLocale();
  const path = localizeHref("/guides/selection", locale);
  const title = seoTitle(TITLE);
  const description = seoDescription(DESCRIPTION);

  return {
    title,
    description,
    keywords: KEYWORDS,
    alternates: {
      canonical: absoluteUrl(path),
      languages: localeAlternates("/guides/selection").languages,
    },
    ...buildPageSocialMeta({ title, description, path, locale }),
  };
}

export default function SelectionGuidePage() {
  const locale = getRequestLocale();
  const copy = getMessages(locale);
  const path = localizeHref("/guides/selection", locale);
  const breadcrumb = buildSimpleBreadcrumbJsonLd([
    { name: copy.home, path: localizeHref("/", locale) },
    { name: "拖链选型指南", path },
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
            <span className="text-white/90">拖链选型指南</span>
          </nav>
          <h1 className="text-2xl font-bold leading-snug text-white sm:text-4xl">
            拖链怎么选型：五步法完整指南
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/85 sm:text-base">
            {DESCRIPTION}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <section aria-labelledby="summary">
          <h2 id="summary" className="text-xl font-bold text-brand-primary sm:text-2xl">
            一、参数速查表
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            先看这张表，五个关键参数的取值规则一目了然。下面再逐步展开。
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left">
                  <th className="px-4 py-3 font-medium text-brand-primary">参数</th>
                  <th className="px-4 py-3 font-medium text-brand-primary">取值公式</th>
                  <th className="px-4 py-3 font-medium text-brand-primary">备注</th>
                </tr>
              </thead>
              <tbody>
                {params.map((p) => (
                  <tr key={p.name} className="border-b border-gray-100">
                    <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
                    <td className="px-4 py-3 text-foreground/80">{p.formula}</td>
                    <td className="px-4 py-3 text-foreground/60">{p.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="steps">
          <h2 id="steps" className="text-xl font-bold text-brand-primary sm:text-2xl">
            二、拖链选型五步法
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            正确流程是按顺序走完五步，每一项不通过就换方向重选，直到全部通过为止。千万别“看着差不多”就下单。
          </p>

          <ol className="mt-8 space-y-8">
            {steps.map((step) => (
              <li key={step.no} className="border-l-2 border-brand-accent pl-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-bold text-brand-secondary">{step.no}</span>
                  <h3 className="text-base font-semibold text-brand-primary sm:text-lg">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">{step.body}</p>
                <ul className="mt-3 space-y-2">
                  {step.points.map((pt) => (
                    <li
                      key={pt}
                      className="relative pl-4 text-sm leading-relaxed text-foreground/70 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-brand-secondary"
                    >
                      {pt}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14" aria-labelledby="mistakes">
          <h2 id="mistakes" className="text-xl font-bold text-brand-primary sm:text-2xl">
            三、六个最常见的选型误区
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            这些坑在非标自动化行业每天都在上演，避开它们能省下大量停机和返工成本。
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {mistakes.map((m) => (
              <li
                key={m}
                className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-relaxed text-foreground/75"
              >
                {m}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 rounded-xl border border-gray-200 bg-gray-50 p-6 sm:p-8" aria-labelledby="cta">
          <h2 id="cta" className="text-lg font-bold text-brand-primary sm:text-xl">
            不确定怎么选？让工程师帮你算
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/75">
            威仕龙提供免费选型支持：把您的线缆清单（外径、数量、气管规格）、行程、运行速度发给我们，
            工程师会给出建议型号、弯曲半径与配置方案，并可提供 3D 模型与样品测试。
            工厂位于浙江乐清，持有 IATF 16949 与 ISO 9001 认证。
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={localizeHref("/contact", locale)}
              className="inline-flex rounded-md bg-brand-secondary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-accent"
            >
              联系工程师选型
            </Link>
            <Link
              href={localizeHref("/products", locale)}
              className="inline-flex rounded-md border border-brand-secondary px-5 py-2.5 text-sm font-medium text-brand-secondary transition-colors hover:bg-brand-secondary hover:text-white"
            >
              查看拖链产品系列
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
