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

const TITLE = "拖链应用案例_数控机床/注塑机/机器人拖链选型方案";
const DESCRIPTION =
  "拖链应用案例汇总：数控机床拖链、注塑机拖链、机器人第七轴拖链、无尘拖链与长行程龙门拖链的选型思路与常见坑。每类场景给出推荐系列、内高内宽取值要点与失败案例复盘，威仕龙工程师整理。";

const KEYWORDS = [
  "拖链应用案例",
  "数控机床拖链",
  "注塑机拖链",
  "机器人拖链",
  "机床拖链",
  "龙门加工中心拖链",
  "加工中心拖链",
  "无尘拖链应用",
  "拖链选型案例",
  "长行程拖链",
];

type CaseItem = {
  id: string;
  industry: string;
  title: string;
  /** 工况：行程/速度/环境 */
  scene: { k: string; v: string }[];
  problem: string;
  solution: string;
  points: string[];
  series: { name: string; href: string }[];
  /** 复盘：踩过的坑 */
  pitfall: string;
};

const cases: CaseItem[] = [
  {
    id: "cnc",
    industry: "数控机床",
    title: "加工中心三轴拖链：铁屑环境是最大变量",
    scene: [
      { k: "行程", v: "X 轴 1.2m / Y 轴 0.8m / Z 轴 0.5m" },
      { k: "速度", v: "0.6–1.0 m/s 高频往复" },
      { k: "环境", v: "切削液喷淋 + 铁屑飞溅" },
    ],
    problem:
      "客户原先用桥式拖链，用了半年链节内积满铁屑，横杆磨损、线缆被铁屑刮伤，平均三个月换一次线。",
    solution:
      "改用全封闭结构，横杆加装挡板，把铁屑和切削液挡在链腔外；同时把弯曲半径从 R38 提到 R55，减少线缆弯曲应力。",
    points: [
      "铁屑、焊渣、打磨粉尘环境优先选全封闭，不要为了省那 10–20% 用桥式",
      "切削液会带走润滑脂，铰链磨损加快，建议定期检查链节间隙",
      "Z 轴垂直安装要加防松措施，防止链节因自重松脱",
      "线缆必须用拖链专用高柔性电缆，普通电缆在铁屑环境里寿命只有几分之一",
    ],
    series: [
      { name: "中型拖链系列", href: "/products/medium" },
      { name: "承重拖链系列", href: "/products/heavy" },
    ],
    pitfall:
      "客户最初觉得全封闭贵，想继续用桥式。算了笔账：桥式便宜约 15%，但线缆三个月一换，一次停机加人工远超这个差价。",
  },
  {
    id: "injection",
    industry: "注塑机",
    title: "注塑机模板拖链：高温、油污与长寿命的三重考验",
    scene: [
      { k: "行程", v: "模板开合 0.5–1.5m" },
      { k: "速度", v: "0.5 m/s，24 小时连续运行" },
      { k: "环境", v: "模具区高温辐射 + 液压油雾" },
    ],
    problem:
      "注塑机常年不停机，拖链跑几十万次是家常便饭。原来用的拖链一年左右铰链磨损，运行噪音变大，还出现塌腰。",
    solution:
      "按内高 25–30mm 选中型加强款，铰链结构加强；行程超过 1m 的加装支撑槽，避免上层下垂；材质选用耐油配方。",
    points: [
      "注塑机是连续工况，选型不能只按静态负载，要留 1.2–1.5 倍安全系数",
      "液压油雾会侵蚀部分塑料，选料前说明使用环境",
      "行程超 1m 建议加支撑槽，支撑点间距 2–3m",
      "模具区辐射热高，注意拖链与热源的间距，必要时加隔热挡板",
    ],
    series: [
      { name: "中型拖链系列", href: "/products/medium" },
      { name: "承重拖链系列", href: "/products/heavy" },
    ],
    pitfall:
      "很多客户按模板行程的一半长度下单，装上去才发现长度不够——拖链长度要按「行程 ÷ 2 + π × R + 预留」算，固定端在中点时最短。",
  },
  {
    id: "robot",
    industry: "机器人 / 机械手",
    title: "机器人第七轴与机械手：轻量化与低噪音优先",
    scene: [
      { k: "行程", v: "第七轴 3–8m" },
      { k: "速度", v: "1.0–2.0 m/s 高速" },
      { k: "环境", v: "装配车间，噪音敏感" },
    ],
    problem:
      "第七轴高速往复，原拖链噪音大、振动明显，还因为自重过大影响轴负载。机械手末端空间狭小，常规拖链装不下。",
    solution:
      "第七轴用静音系列降低噪音与振动，长行程段加导向槽防侧摆；机械手末端改用微型或便携式快装拖链，减少占用空间。",
    points: [
      "高速场景（> 0.8 m/s）即使行程不长也建议加导向槽，防侧向摆动",
      "长行程（> 5m）必须加支撑或滑行结构，否则上层必然塌腰",
      "机械手末端空间受限，优先看微型系列的内高 5–15mm 规格",
      "静音系列的低摩擦铰链同时能降低磨损，延长更换周期",
    ],
    series: [
      { name: "静音拖链系列", href: "/products/silent" },
      { name: "微型拖链系列", href: "/products/micro" },
      { name: "便携式拖链系列", href: "/products/portable" },
    ],
    pitfall:
      "第七轴项目最容易忽略的是拖链自重。选型时只算线缆重量，忘了拖链本身也有几十公斤，实际负载超了电机能力。",
  },
  {
    id: "cleanroom",
    industry: "半导体 / 洁净室",
    title: "无尘拖链：发尘量是硬指标，不是可选项",
    scene: [
      { k: "行程", v: "0.3–1.0m" },
      { k: "速度", v: "0.3–0.6 m/s 平稳运行" },
      { k: "环境", v: "Class 100 及以上洁净室" },
    ],
    problem:
      "半导体与液晶面板设备对颗粒物极其敏感。普通拖链铰链摩擦产生的碎屑会直接污染晶圆或面板，一次污染就是整批报废。",
    solution:
      "改用 WWC 无尘拖链，优化铰链摩擦副、低发尘材料，控制运行时的颗粒物释放；填充率压到 60% 以下，减少线缆间的相互摩擦。",
    points: [
      "洁净室选型第一看发尘指标，不要只看价格",
      "填充率建议 ≤ 60%（常规场合可到 70%），减少线缆摩擦产生碎屑",
      "需要防静电功能的要提前说明，选抗静电配方",
      "无尘拖链需按洁净等级做验证，不是所有「无尘拖链」都达标",
    ],
    series: [
      { name: "无尘拖链系列", href: "/products/cleanroom" },
      { name: "静音拖链系列", href: "/products/silent" },
    ],
    pitfall:
      "有些客户在洁净室外用普通拖链、进洁净室才换无尘款，但中间过渡段的碎屑会被气流带进去。整条线都要按洁净要求配置。",
  },
  {
    id: "gantry",
    industry: "龙门 / 长行程设备",
    title: "龙门加工中心长行程：支撑与导向决定寿命",
    scene: [
      { k: "行程", v: "6–20m 长行程" },
      { k: "速度", v: "0.8–1.5 m/s" },
      { k: "环境", v: "重载、大跨距、室外或半室外" },
    ],
    problem:
      "长行程拖链最大的敌人是自重下垂。原方案没加支撑，运行几个月上层就塌下来，链节互相挤压，最后断裂。",
    solution:
      "选承重系列并加装支撑槽或滑行滚轮，支撑点间距按 2–3m 布置；弯曲半径加大到 R100 以上，给粗线缆留足空间。",
    points: [
      "行程超 5m 必须加支撑槽或支撑轮，别指望拖链自己撑住",
      "支撑点间距 2–3m，具体看拖链自重与线缆负载",
      "长行程滑行应用要确认架空承载能力，不能只看标称值",
      "承重系列侧板加厚，但自重也大，需要重新校核电机负载",
    ],
    series: [
      { name: "承重拖链系列", href: "/products/heavy" },
      { name: "中型拖链系列", href: "/products/medium" },
    ],
    pitfall:
      "最常见的错误是前期只买了拖链、没规划支撑件，等装上去发现塌腰再补，工期全耽误了。长行程项目建议整体规划。",
  },
  {
    id: "new-energy",
    industry: "新能源产线",
    title: "锂电与光伏产线：高速、长线束与连续生产",
    scene: [
      { k: "行程", v: "2–8m" },
      { k: "速度", v: "1.0–2.0 m/s，节拍紧张" },
      { k: "环境", v: "多粉尘、油污与冷却介质" },
    ],
    problem:
      "新能源产线节拍快、停机成本高。原拖链线束排布混乱，动力线与信号线混走，导致传感器误触发、编码器信号波动。",
    solution:
      "用分隔片把动力线与信号线分开敷设，减少电磁干扰；按内高高一档选型预留散热空间；长行程段配导向槽。",
    points: [
      "动力线与信号线必须分开敷设，中间用分隔片隔开",
      "节拍快的产线建议按内高高一档选，留散热与活动余量",
      "多粉尘环境注意开口形式，必要时选全封闭",
      "停机成本高的场景，建议常备一套备件，别等坏了再买",
    ],
    series: [
      { name: "中型拖链系列", href: "/products/medium" },
      { name: "静音拖链系列", href: "/products/silent" },
    ],
    pitfall:
      "新能源客户最在意交期。常规型号我们有现货，1–3 天可发；但涉及改料或非标的，建议提前排期，别卡在产线等件。",
  },
];

const lessons = [
  "选型不是选最便宜的，是选能撑到下一个大修周期的",
  "弯曲半径压到极限省下的钱，会在三个月后以断线的形式还回来",
  "填充率超过 70% 短期看不出来，长期一定出问题",
  "动力线和信号线混走，是传感器误报警的高频元凶",
  "长行程不加支撑，等于给拖链判了缓刑",
  "等线缆彻底断了才排查，成本已经是预防性检查的十几倍",
];

export function generateMetadata(): Metadata {
  const locale = getRequestLocale();
  const path = localizeHref("/cases", locale);
  const title = seoTitle(TITLE);
  const description = seoDescription(DESCRIPTION);

  return {
    title,
    description,
    keywords: KEYWORDS,
    alternates: {
      canonical: absoluteUrl(path),
      languages: localeAlternates("/cases").languages,
    },
    ...buildPageSocialMeta({ title, description, path, locale }),
  };
}

export default function CasesPage() {
  const locale = getRequestLocale();
  const copy = getMessages(locale);
  const path = localizeHref("/cases", locale);
  const breadcrumb = buildSimpleBreadcrumbJsonLd([
    { name: copy.home, path: localizeHref("/", locale) },
    { name: "应用案例", path },
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
            <span className="text-white/90">应用案例</span>
          </nav>
          <h1 className="text-2xl font-bold leading-snug text-white sm:text-4xl">
            拖链应用案例：六大典型工况的选型与踩坑复盘
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/85 sm:text-base">
            这些案例来自我们日常接触的设备与产线。没有包装过的成功故事，重点写清楚
            哪些地方容易选错、选错之后会付出什么代价。按行业对号入座即可。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="rounded-lg border border-gray-200 bg-gray-50 p-5" aria-label="案例目录">
          <h2 className="text-sm font-semibold text-brand-primary">快速跳转</h2>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {cases.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="text-brand-secondary hover:text-brand-primary">
                  {c.industry}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 space-y-14">
          {cases.map((c) => (
            <section key={c.id} id={c.id} className="scroll-mt-24">
              <div className="flex items-baseline gap-3">
                <span className="rounded bg-brand-secondary/10 px-2.5 py-1 text-xs font-semibold text-brand-secondary">
                  {c.industry}
                </span>
              </div>
              <h2 className="mt-3 text-xl font-bold text-brand-primary sm:text-2xl">
                {c.title}
              </h2>

              <dl className="mt-5 grid gap-3 sm:grid-cols-3">
                {c.scene.map((s) => (
                  <div key={s.k} className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                    <dt className="text-xs font-medium text-foreground/50">{s.k}</dt>
                    <dd className="mt-1 text-sm font-medium text-foreground/85">{s.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 space-y-4">
                <div className="border-l-2 border-gray-300 pl-4">
                  <h3 className="text-sm font-semibold text-foreground/85">碰到的问题</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{c.problem}</p>
                </div>
                <div className="border-l-2 border-brand-accent pl-4">
                  <h3 className="text-sm font-semibold text-foreground/85">解决思路</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{c.solution}</p>
                </div>
              </div>

              <h3 className="mt-6 text-sm font-semibold text-brand-primary">选型要点</h3>
              <ul className="mt-3 space-y-2">
                {c.points.map((p) => (
                  <li
                    key={p}
                    className="relative pl-4 text-sm leading-relaxed text-foreground/70 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-brand-secondary"
                  >
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                <p className="text-sm leading-relaxed text-amber-900">
                  <strong className="font-semibold">复盘：</strong>
                  {c.pitfall}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-foreground/50">推荐系列：</span>
                {c.series.map((s) => (
                  <Link
                    key={s.href}
                    href={localizeHref(s.href, locale)}
                    className="rounded border border-brand-secondary px-3 py-1 text-brand-secondary transition-colors hover:bg-brand-secondary hover:text-white"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-16" aria-labelledby="lessons">
          <h2 id="lessons" className="text-xl font-bold text-brand-primary sm:text-2xl">
            六个案例里反复出现的教训
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            工况千差万别，但翻车的方式高度相似。下面六条几乎每个行业都踩过：
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {lessons.map((l) => (
              <li
                key={l}
                className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-relaxed text-foreground/75"
              >
                {l}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 rounded-xl border border-gray-200 bg-gray-50 p-6 sm:p-8" aria-labelledby="cta">
          <h2 id="cta" className="text-lg font-bold text-brand-primary sm:text-xl">
            你的工况不在上面？说给我们听
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/75">
            把设备类型、行程、运行速度和环境（粉尘、油污、温度、洁净要求）发过来，
            工程师会给出建议系列、内高内宽取值和配置清单。工厂位于浙江乐清，
            持有 IATF 16949 与 ISO 9001 认证，可提供样品测试与图纸校核。
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={localizeHref("/contact", locale)}
              className="inline-flex rounded-md bg-brand-secondary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-accent"
            >
              咨询工况方案
            </Link>
            <Link
              href={localizeHref("/guides/selection", locale)}
              className="inline-flex rounded-md border border-brand-secondary px-5 py-2.5 text-sm font-medium text-brand-secondary transition-colors hover:bg-brand-secondary hover:text-white"
            >
              拖链选型五步法
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
