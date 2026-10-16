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

type CaseItem = {
  id: string;
  industry: string;
  title: string;
  /** 工况：行程/速度/环境 */
  scene: { k: string; v: string }[];
  problem: string;
  solution: string;
  points: string[];
  /** 复盘：踩过的坑 */
  pitfall: string;
};

type CasesCopy = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  crumbs: { home: string; self: string };
  h1: string;
  lead: string;
  tocTitle: string;
  problemLabel: string;
  solutionLabel: string;
  pointsLabel: string;
  pitfallLabel: string;
  seriesLabel: string;
  lessonsTitle: string;
  lessonsLead: string;
  lessons: string[];
  ctaTitle: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaGuide: string;
  ctaPrice: string;
  cases: CaseItem[];
  /** 案例目录锚点标签（短，用于顶部快速跳转） */
  toc: { id: string; label: string }[];
};

/** 案例骨架：与语言无关的锚点、推荐系列链接。文案在下方按语种填充。 */
const CASE_META: { id: string; series: { name: string; href: string }[] }[] = [
  {
    id: "cnc",
    series: [
      { name: "__MEDIUM__", href: "/products/medium" },
      { name: "__HEAVY__", href: "/products/heavy" },
    ],
  },
  {
    id: "injection",
    series: [
      { name: "__MEDIUM__", href: "/products/medium" },
      { name: "__HEAVY__", href: "/products/heavy" },
    ],
  },
  {
    id: "robot",
    series: [
      { name: "__SILENT__", href: "/products/silent" },
      { name: "__MICRO__", href: "/products/micro" },
      { name: "__PORTABLE__", href: "/products/portable" },
    ],
  },
  {
    id: "cleanroom",
    series: [
      { name: "__WHC__", href: "/products/cleanroom" },
      { name: "__SILENT__", href: "/products/silent" },
    ],
  },
  {
    id: "gantry",
    series: [
      { name: "__HEAVY__", href: "/products/heavy" },
      { name: "__MEDIUM__", href: "/products/medium" },
    ],
  },
  {
    id: "new-energy",
    series: [
      { name: "__MEDIUM__", href: "/products/medium" },
      { name: "__SILENT__", href: "/products/silent" },
    ],
  },
];

/** 推荐系列的中英文名（内联，避免依赖 messages.ts 的分类结构变化）。 */
const SERIES_NAME_ZH: Record<string, string> = {
  __MEDIUM__: "中型拖链系列",
  __HEAVY__: "承重拖链系列",
  __SILENT__: "静音拖链系列",
  __MICRO__: "微型拖链系列",
  __PORTABLE__: "便携式拖链系列",
  __WHC__: "无尘拖链系列",
};
const SERIES_NAME_EN: Record<string, string> = {
  __MEDIUM__: "Medium series",
  __HEAVY__: "Heavy-duty series",
  __SILENT__: "Silent series",
  __MICRO__: "Micro series",
  __PORTABLE__: "Portable series",
  __WHC__: "Cleanroom series",
};

const ZH: CasesCopy = {
  metaTitle: "拖链应用案例_数控机床/注塑机/机器人拖链选型方案",
  metaDescription:
    "拖链应用案例汇总：数控机床拖链、注塑机拖链、机器人第七轴拖链、无尘拖链与长行程龙门拖链的选型思路与常见坑。每类场景给出推荐系列、内高内宽取值要点与失败案例复盘，威仕龙工程师整理。",
  keywords: [
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
  ],
  crumbs: { home: "首页", self: "应用案例" },
  h1: "拖链应用案例：六大典型工况的选型与踩坑复盘",
  lead: "这些案例来自我们日常接触的设备与产线。没有包装过的成功故事，重点写清楚哪些地方容易选错、选错之后会付出什么代价。按行业对号入座即可。",
  tocTitle: "快速跳转",
  problemLabel: "碰到的问题",
  solutionLabel: "解决思路",
  pointsLabel: "选型要点",
  pitfallLabel: "复盘：",
  seriesLabel: "推荐系列：",
  lessonsTitle: "六个案例里反复出现的教训",
  lessonsLead: "工况千差万别，但翻车的方式高度相似。下面六条几乎每个行业都踩过：",
  lessons: [
    "选型不是选最便宜的，是选能撑到下一个大修周期的",
    "弯曲半径压到极限省下的钱，会在三个月后以断线的形式还回来",
    "填充率超过 70% 短期看不出来，长期一定出问题",
    "动力线和信号线混走，是传感器误报警的高频元凶",
    "长行程不加支撑，等于给拖链判了缓刑",
    "等线缆彻底断了才排查，成本已经是预防性检查的十几倍",
  ],
  ctaTitle: "你的工况不在上面？说给我们听",
  ctaBody:
    "把设备类型、行程、运行速度和环境（粉尘、油污、温度、洁净要求）发过来，工程师会给出建议系列、内高内宽取值和配置清单。工厂位于浙江乐清，持有 IATF 16949 与 ISO 9001 认证，可提供样品测试与图纸校核。",
  ctaPrimary: "咨询工况方案",
  ctaGuide: "拖链选型五步法",
  ctaPrice: "查看价格参考",
  toc: [
    { id: "cnc", label: "数控机床" },
    { id: "injection", label: "注塑机" },
    { id: "robot", label: "机器人 / 机械手" },
    { id: "cleanroom", label: "半导体 / 洁净室" },
    { id: "gantry", label: "龙门 / 长行程设备" },
    { id: "new-energy", label: "新能源产线" },
  ],
  cases: [
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
      pitfall:
        "新能源客户最在意交期。常规型号我们有现货，1–3 天可发；但涉及改料或非标的，建议提前排期，别卡在产线等件。",
    },
  ],
};

const EN: CasesCopy = {
  metaTitle: "Cable Carrier Application Cases | CNC, Injection Molding, Robot",
  metaDescription:
    "Real-world cable carrier application cases from CNWSL engineers: CNC machining centers, injection molding machines, robot 7th-axis, cleanroom and long-travel gantry. Each case gives the recommended series, inner height and width rules, and a failure post-mortem so you can avoid the same mistakes.",
  keywords: [
    "cable carrier application cases",
    "drag chain case study",
    "CNC machine cable carrier",
    "injection molding machine drag chain",
    "robot 7th axis cable carrier",
    "cleanroom cable carrier",
    "long travel gantry cable carrier",
    "cable chain selection",
  ],
  crumbs: { home: "Home", self: "Application Cases" },
  h1: "Cable Carrier Application Cases: Selection and Post-Mortems from Six Typical Working Conditions",
  lead: "These cases come from the equipment and production lines we deal with every day. No polished success stories — we focus on where selection goes wrong and what it costs when it does. Find the industry that matches yours.",
  tocTitle: "Jump to case",
  problemLabel: "The problem",
  solutionLabel: "How we solved it",
  pointsLabel: "Selection points",
  pitfallLabel: "Post-mortem: ",
  seriesLabel: "Recommended series: ",
  lessonsTitle: "Lessons that keep showing up across all six cases",
  lessonsLead:
    "Working conditions vary widely, but the ways projects fail are remarkably similar. Almost every industry has hit these six:",
  lessons: [
    "Selection is not about the cheapest option — it is about the one that lasts until the next major overhaul.",
    "The money you save by pushing bend radius to its limit comes back as a broken cable three months later.",
    "A fill rate above 70% looks fine at first, but it will cause problems in the long run.",
    "Running power and signal cables together is a frequent cause of false sensor alarms.",
    "Long travel without support is a suspended sentence for your cable carrier.",
    "Waiting until a cable breaks before investigating costs ten times more than a preventive check.",
  ],
  ctaTitle: "Your working condition not listed here? Tell us about it",
  ctaBody:
    "Send us the equipment type, travel distance, running speed and environment (dust, oil mist, temperature, cleanliness class). Our engineers will recommend a series, inner height and width, and a configuration list. The factory is in Yueqing, Zhejiang and holds IATF 16949 and ISO 9001; sample testing and drawing verification are available.",
  ctaPrimary: "Discuss your application",
  ctaGuide: "Five-step selection guide",
  ctaPrice: "See price reference",
  toc: [
    { id: "cnc", label: "CNC machine tools" },
    { id: "injection", label: "Injection molding" },
    { id: "robot", label: "Robots / manipulators" },
    { id: "cleanroom", label: "Semiconductor / cleanroom" },
    { id: "gantry", label: "Gantry / long travel" },
    { id: "new-energy", label: "New-energy lines" },
  ],
  cases: [
    {
      id: "cnc",
      industry: "CNC machine tools",
      title: "Three-axis carrier on a machining center: chips are the biggest variable",
      scene: [
        { k: "Travel", v: "X 1.2 m / Y 0.8 m / Z 0.5 m" },
        { k: "Speed", v: "0.6–1.0 m/s, high-frequency reciprocation" },
        { k: "Environment", v: "Coolant spray + flying chips" },
      ],
      problem:
        "The customer was using an open (bridge) carrier. After six months the links were packed with chips, the crossbars were worn and cables were gouged by debris — they were replacing cables about every three months.",
      solution:
        "We switched to a fully enclosed design with baffles on the crossbars to keep chips and coolant out of the chain cavity, and raised the bend radius from R38 to R55 to reduce stress on the cables.",
      points: [
        "For chips, weld spatter and grinding dust, choose fully enclosed — do not save 10–20% by using an open design.",
        "Coolant washes out grease and accelerates hinge wear; inspect link clearance periodically.",
        "Vertically mounted Z axes need anti-loosening measures so links do not work loose under their own weight.",
        "Always use drag-chain-rated high-flex cable. Standard cable lasts only a fraction as long in a chip environment.",
      ],
      pitfall:
        "The customer first thought the fully enclosed version was too expensive and wanted to stay with the open design. We ran the numbers: the open carrier is about 15% cheaper, but cables were replaced every three months — one downtime plus labour costs far more than the difference.",
    },
    {
      id: "injection",
      industry: "Injection molding",
      title: "Platen carrier on an injection molding machine: heat, oil mist and long life",
      scene: [
        { k: "Travel", v: "Platen opening 0.5–1.5 m" },
        { k: "Speed", v: "0.5 m/s, running 24 hours a day" },
        { k: "Environment", v: "High radiant heat at the mold area + hydraulic oil mist" },
      ],
      problem:
        "Injection molding machines rarely stop, so hundreds of thousands of cycles is normal. The original carrier showed hinge wear after about a year — noisier running and sagging in the middle.",
      solution:
        "We selected a reinforced medium series with an inner height of 25–30 mm, added support troughs for travels over 1 m to prevent sagging, and chose an oil-resistant material grade.",
      points: [
        "Injection molding is a continuous duty cycle — do not select on static load alone; allow a 1.2–1.5× safety factor.",
        "Hydraulic oil mist attacks some plastics; state the working environment before choosing material.",
        "For travels over 1 m, add a support trough with support points every 2–3 m.",
        "Watch the distance between the carrier and the heat source at the mold area; add a heat shield if needed.",
      ],
      pitfall:
        "Many customers order half the platen travel and find the carrier is too short. Calculate length as travel ÷ 2 + π × R + allowance — it is shortest when the fixed end is at mid-travel.",
    },
    {
      id: "robot",
      industry: "Robots / manipulators",
      title: "Robot 7th axis and manipulators: keep it light, keep it quiet",
      scene: [
        { k: "Travel", v: "7th axis 3–8 m" },
        { k: "Speed", v: "1.0–2.0 m/s, high speed" },
        { k: "Environment", v: "Assembly shop, noise-sensitive" },
      ],
      problem:
        "At high speed on the 7th axis the original carrier was noisy and vibrated, and its own weight was loading the axis. At the manipulator end there was simply not enough space for a standard carrier.",
      solution:
        "We used the silent series on the 7th axis to cut noise and vibration, added a guide trough on the long travel section to stop lateral sway, and switched the manipulator end to a micro or portable quick-open carrier to save space.",
      points: [
        "At high speed (> 0.8 m/s), add a guide trough even on short travels to prevent lateral sway.",
        "For long travel (> 5 m) you must add support or a gliding structure, otherwise the upper run will sag.",
        "Where the manipulator end is tight, look first at micro series with inner heights of 5–15 mm.",
        "The low-friction hinge of the silent series also reduces wear and extends the replacement interval.",
      ],
      pitfall:
        "The most commonly overlooked factor in 7th-axis projects is the carrier's own weight. People calculate only the cable load and forget the carrier itself can weigh tens of kilograms — the actual load then exceeds the motor's capacity.",
    },
    {
      id: "cleanroom",
      industry: "Semiconductor / cleanroom",
      title: "Cleanroom carrier: particle emission is a hard spec, not an option",
      scene: [
        { k: "Travel", v: "0.3–1.0 m" },
        { k: "Speed", v: "0.3–0.6 m/s, smooth running" },
        { k: "Environment", v: "Class 100 cleanroom or better" },
      ],
      problem:
        "Semiconductor and LCD panel equipment is extremely sensitive to particles. Debris from normal carrier hinge friction directly contaminates wafers or panels — a single contamination event scraps the whole batch.",
      solution:
        "We switched to the WWC cleanroom carrier with an optimised hinge friction pair and low-emission material to control particle release during operation, and kept the fill rate below 60% to reduce cable-to-cable friction.",
      points: [
        "For cleanrooms, particle emission is the first specification — do not select on price alone.",
        "Keep the fill rate at or below 60% (up to 70% is acceptable in ordinary environments) to reduce debris from cable friction.",
        "If anti-static performance is needed, say so up front so an anti-static grade can be selected.",
        "Cleanroom carriers must be verified against the cleanliness class — not every 'cleanroom carrier' passes.",
      ],
      pitfall:
        "Some customers use a standard carrier outside the cleanroom and switch to a cleanroom model only inside — but debris from the transition section is carried in by the airflow. The entire line must be configured to cleanroom requirements.",
    },
    {
      id: "gantry",
      industry: "Gantry / long travel",
      title: "Long-travel gantry machining centers: support and guidance decide service life",
      scene: [
        { k: "Travel", v: "6–20 m, long travel" },
        { k: "Speed", v: "0.8–1.5 m/s" },
        { k: "Environment", v: "Heavy load, wide span, outdoor or semi-outdoor" },
      ],
      problem:
        "The biggest enemy of a long-travel carrier is sagging under its own weight. The original design had no support, and within a few months the upper run collapsed, links crushed each other and the chain finally broke.",
      solution:
        "We selected the heavy-duty series with support troughs or gliding rollers, spaced 2–3 m apart, and increased the bend radius to R100 or more to give thick cables enough room.",
      points: [
        "For travels over 5 m you must add a support trough or rollers — do not expect the carrier to hold itself up.",
        "Space support points 2–3 m apart, depending on carrier weight and cable load.",
        "For long-travel gliding applications, confirm the unsupported load capacity — do not rely on the nominal figure alone.",
        "Heavy-duty series have thicker side plates but also weigh more, so motor load must be rechecked.",
      ],
      pitfall:
        "The most common mistake is buying only the carrier up front without planning support components, then discovering the sag after installation and losing the whole schedule to a retrofit. Long-travel projects should be planned as a whole.",
    },
    {
      id: "new-energy",
      industry: "New-energy lines",
      title: "Lithium battery and PV lines: high speed, long cable runs, continuous production",
      scene: [
        { k: "Travel", v: "2–8 m" },
        { k: "Speed", v: "1.0–2.0 m/s, tight cycle times" },
        { k: "Environment", v: "Dusty, oily and exposed to cooling media" },
      ],
      problem:
        "New-energy lines run fast and downtime is expensive. The original cable routing was messy, with power and signal cables run together, causing false sensor triggers and encoder signal fluctuations.",
      solution:
        "We separated power and signal cables with dividers to reduce electromagnetic interference, selected one size up on inner height to leave cooling space, and added guide troughs on long-travel sections.",
      points: [
        "Power and signal cables must be routed separately, divided by a separator.",
        "On fast-cycle lines, select one inner-height size up to leave cooling and movement allowance.",
        "In dusty environments watch the opening type; choose fully enclosed where necessary.",
        "Where downtime is expensive, keep a spare set on hand rather than waiting for a failure.",
      ],
      pitfall:
        "New-energy customers care most about lead time. For standard models we hold stock and ship in 1–3 days; for material changes or custom sizes, plan ahead so you are not left waiting on parts mid-production.",
    },
  ],
};

function copyFor(locale: string): CasesCopy {
  return locale === "en" ? EN : ZH;
}

export function generateMetadata(): Metadata {
  const locale = requireZhEnLocale();
  const path = localizeHref("/cases", locale);
  const copy = copyFor(locale);
  const title = seoTitle(copy.metaTitle);
  const description = seoDescription(copy.metaDescription);

  return {
    title,
    description,
    keywords: copy.keywords,
    alternates: {
      canonical: absoluteUrl(path),
      languages: localeAlternatesZhEn("/cases").languages,
    },
    ...buildPageSocialMeta({ title, description, path, locale }),
  };
}

export default function CasesPage() {
  const locale = requireZhEnLocale();
  const messages = getMessages(locale);
  const copy = copyFor(locale);
  const path = localizeHref("/cases", locale);
  const seriesName = locale === "en" ? SERIES_NAME_EN : SERIES_NAME_ZH;
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
        <nav className="rounded-lg border border-gray-200 bg-gray-50 p-5" aria-label="case index">
          <h2 className="text-sm font-semibold text-brand-primary">{copy.tocTitle}</h2>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {copy.toc.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="text-brand-secondary hover:text-brand-primary">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 space-y-14">
          {copy.cases.map((c, caseIndex) => {
            const meta = CASE_META.find((item) => item.id === c.id) ?? CASE_META[caseIndex];
            return (
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
                  <h3 className="text-sm font-semibold text-foreground/85">{copy.problemLabel}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{c.problem}</p>
                </div>
                <div className="border-l-2 border-brand-accent pl-4">
                  <h3 className="text-sm font-semibold text-foreground/85">{copy.solutionLabel}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{c.solution}</p>
                </div>
              </div>

              <h3 className="mt-6 text-sm font-semibold text-brand-primary">{copy.pointsLabel}</h3>
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
                  <span className="font-semibold">{copy.pitfallLabel}</span>
                  {c.pitfall}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-foreground/50">{copy.seriesLabel}</span>
                {meta.series.map((s) => (
                  <Link
                    key={s.href}
                    href={localizeHref(s.href, locale)}
                    className="rounded border border-brand-secondary px-3 py-1 text-brand-secondary transition-colors hover:bg-brand-secondary hover:text-white"
                  >
                    {seriesName[s.name] ?? s.name}
                  </Link>
                ))}
              </div>
            </section>
            );
          })}
        </div>

        <section className="mt-16" aria-labelledby="lessons">
          <h2 id="lessons" className="text-xl font-bold text-brand-primary sm:text-2xl">
            {copy.lessonsTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            {copy.lessonsLead}
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {copy.lessons.map((l) => (
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
