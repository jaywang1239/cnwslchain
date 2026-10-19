import type { Locale } from "@/lib/i18n/config";

/**
 * 产品分类页的深度内容（2026-10-19 新增）。
 *
 * 背景：分类页原先只有一句 intro（约 70 字）+ 应用标签 + 系列卡片，
 * 中文正文实测仅 357–417 字，属于典型的薄内容页；而这 6 个分类页正是
 * 「微型拖链」「重型拖链」「无尘拖链」等核心词的落地页。
 *
 * 设计取舍（重要，改动前先读）：
 * 1. 内容只做 zh / en。站内其余 4 语种（vi/es/it/ru）不渲染这个区块，
 *    避免中文正文出现在越南语页面上——与 /price /cases 等页的 zh-en 收口一致。
 * 2. 与博客分工：博客讲「怎么算」（内宽公式、弯曲半径倍数、长度推导），
 *    分类页讲「这个系列是什么、边界在哪、和相邻系列怎么分」，再把计算细节
 *    内链到博客。两边不重复，避免站内自我竞争同一关键词。
 * 3. 数字全部取自 data/product-specs.json 的实际规格（304 条），
 *    改产品数据时必须回来同步这里的档位描述。
 */

export interface DeepSection {
  title: string;
  body: string;
}

export interface DeepFaq {
  q: string;
  a: string;
}

export interface DeepPoint {
  label: string;
  value: string;
}

export interface CategoryDeepCopy {
  /** 分类页 meta description，目标 120–155 字（原 intro 仅约 70 字） */
  metaDescription: string;
  heading: string;
  lead: string;
  sections: DeepSection[];
  keyPoints: DeepPoint[];
  faqs: DeepFaq[];
  related: { label: string; href: string }[];
}

const ZH: Record<string, CategoryDeepCopy> = {
  micro: {
    metaDescription:
      "微型拖链内高 5 / 6 / 7 / 10 / 15mm，内宽 5–50mm，弯曲半径 R10–R48，玻纤增强尼龙桥式结构。适合小型 CNC、机械手、检测设备与电子装配线的窄空间走线。附内高内宽选型边界、架空限制与常见故障说明。",
    heading: "微型拖链：内高 5–15mm 的窄空间走线方案",
    lead:
      "内高 5 到 15mm 这一档，客户习惯叫它微型拖链、迷你拖链或者小坦克链。它要解决的不是「能不能走线」，而是「在只有十几毫米的高度里，让线跟着机构来回走几十万次还不磨破」。选这一档先认三个边界：空间、线径、行程。",
    sections: [
      {
        title: "什么工况该上微型拖链",
        body:
          "安装高度被压到 20mm 以内、线缆外径普遍在 8mm 以下、行程通常不超过 1 米——这三条同时成立，微型档才合适。典型场景是小型 CNC 的刀库与工作台、SCARA 和六轴机械手的末端、视觉检测平台的移动轴、电子装配的治具。反过来，如果行程超过 1.5 米，或者要走的线超过 8 根，硬用微型档通常撑不住：侧板薄、节距小，长跨距下容易扭摆，线缆在槽里被反复挤压。这种时候直接看内高 18 的中型档，别在微型里硬凑。",
      },
      {
        title: "内高和内宽怎么落到具体型号",
        body:
          "内高看最粗的那根线：内高至少取线缆最大外径的 1.1 倍，再留 2mm 左右的间隙，让线在槽里能自由浮动而不是被夹死。内宽看总截面：所有线缆与气管的截面积加起来，不超过拖链内腔截面的 60%，换算下来内宽大约是线束并排宽度再放 30%–40%。微型档内宽只有 5 到 50mm 共 11 档，5mm 这一档实际只能走一根 Ø4 以下的线。多根细线建议加隔片分腔，不然高频往复下细线会互相摩擦，先磨破的是绝缘层。",
      },
      {
        title: "弯曲半径与安装的三个硬约束",
        body:
          "弯曲半径从 R10 到 R48 共六档，取值按线缆厂家给的最小弯曲半径乘 1.1 往上靠一档，不要为了省高度往下压——R 每小一档，线缆寿命下降的幅度远大于省下的那点空间。第二个约束是架空：微型链节自重轻，但侧板也薄，架空段建议控制在 0.8 米以内，超过就要加支撑或改滑行方式。第三个是速度：微型档适合 2m/s 以内的常规往复，再高就换同内高的静音系列，铰链结构更能吃速度。安装上把固定端放在行程中点，两端各留一节余量，能明显减少端部拉扯。",
      },
    ],
    keyPoints: [
      { label: "内高档位", value: "5 / 6 / 7 / 10 / 15 mm（5 档）" },
      { label: "内宽范围", value: "5–50 mm，共 11 档" },
      { label: "弯曲半径", value: "R10 / R15 / R18 / R28 / R38 / R48" },
      { label: "结构", value: "桥式（半封闭），可加隔片分腔" },
      { label: "工作温度", value: "-20℃ ~ +120℃" },
      { label: "对应型号", value: "WSL01 / WSL01X / WSL02 / WSL03 系列 / WSL07 系列" },
    ],
    faqs: [
      {
        q: "内高 15 的微型拖链和 18 系列中型拖链怎么选？",
        a: "两者内高接近，但不是一个量级。行程 1 米以内、线径 8mm 以下、安装高度吃紧，走微型 15；行程更长、线束更多，或者需要更好的抗扭，直接上 18 系列。18 的侧板更厚、节距更大，同样宽度下刚性明显更好。",
      },
      {
        q: "微型拖链一根能走几根线？",
        a: "看总截面不看根数。按 60% 填充率，内宽 20mm 的 10 系列大约能并排走 4–6 根 Ø4 动力线。信号线可以叠放，但一定要加隔片，否则细线在往复中互相磨，先坏的是绝缘皮。",
      },
      {
        q: "内宽可以非标定制吗？加隔片要不要另外收费？",
        a: "内宽按标准档位选最稳，现货也齐。确实需要非标宽度的要开模，起订量按具体规格单独谈。隔片和分隔条属于标准配件，下单时说清分几腔、每腔走什么线即可。",
      },
      {
        q: "微型拖链的交期和起订量是多少？",
        a: "常规规格常备现货，散件可以发。非标或大批量按排产走。具体数量和交期需要按型号核对，这里不给统一承诺——不同型号的库存状态差别很大。",
      },
    ],
    related: [
      { label: "拖链选型五步法", href: "/guides/selection" },
      { label: "内宽怎么算：填充率 60% 规则", href: "/blog/cable-carrier-inner-width" },
      { label: "弯曲半径 R 怎么定", href: "/blog/cable-carrier-bend-radius" },
      { label: "拖链价格区间参考", href: "/price" },
    ],
  },

  medium: {
    metaDescription:
      "中型拖链内高 18 / 20 / 25 / 30mm，内宽 18–103mm，弯曲半径 R28–R250，玻纤增强尼龙桥式结构。适用于 CNC 加工中心、注塑机、激光设备与自动化产线。说明四档内高的分工、与微型和承重档的边界、线缆排布与安装要点。",
    heading: "中型拖链：内高 18–30mm 的机床与自动化主力档",
    lead:
      "内高 18 到 30mm 是拖链里最常见的一档。加工中心、注塑机、激光切割机的线缆槽，大部分都落在这个区间。它不像微型那样挑空间，也不像承重档那样笨重，属于「选错了不至于立刻出事、但选对了能多用两三年」的区间。",
    sections: [
      {
        title: "18 / 20 / 25 / 30 四档怎么分工",
        body:
          "18 系列是入门档，线束 5 到 10 根、行程 1 到 3 米，常见于机床刀塔和滑台；20 和 25 系列是主力，线束 10 到 20 根，可以混走动力线、信号线和气管，注塑机与加工中心多在这一档；30 系列往上走，线束 20 根以上，或者单根 Ø25 以上的动力电缆，长跨距下的稳定性明显好于 25。同一内高下先按总截面挑内宽，内宽 18 到 103mm 共 16 档，档位密，基本不用非标。",
      },
      {
        title: "和微型、承重系列的边界在哪",
        body:
          "往上，内高 45 就是承重档：侧板加强、节距更大、支持更长的架空。往下，内高 15 属于微型档。实际判断有个粗口径：线束重量超过 3kg/m，或者行程超过 4 米需要长跨距架空，就该直接看承重档，不要用 30 硬撑。另一点常被忽略——内高 30 的架空能力明显强于 18，同样内宽下，跨度大的场合应该先加内高再考虑加宽度，因为抗弯靠的是侧板截面高度。",
      },
      {
        title: "安装时最容易忽略的三件事",
        body:
          "第一，线缆在槽内要能自由浮动，只在两端捆扎，中间留松；把线绑成一束固定在链节上，等于让线跟着链节一起被反复折弯，断得很快。第二，重线放两侧、轻线放中间，重心偏移会让侧板单边磨损，链节跑偏。第三，固定端与移动端的高度差要留出来，否则弯曲段会被拉直，R 值实际变小，线缆寿命跟着掉。动力线和信号线建议加隔片分开走，减少干扰和互相摩擦。",
      },
    ],
    keyPoints: [
      { label: "内高档位", value: "18 / 20 / 25 / 30 mm（4 档）" },
      { label: "内宽范围", value: "18–103 mm，共 16 档" },
      { label: "弯曲半径", value: "R28 起，最大 R250" },
      { label: "结构", value: "桥式，可加隔片与分隔条" },
      { label: "工作温度", value: "-20℃ ~ +120℃" },
      { label: "对应型号", value: "WSL11 / WSL16 / WSL17 / WSL21 等系列" },
    ],
    faqs: [
      {
        q: "18 系列和 20 系列差别有多大？值得为 2mm 加钱吗？",
        a: "内高只差 2mm，但结构不是同一套。20 的侧板与销轴规格更大，抗扭和架空能力都比 18 好一档。如果线束里有 Ø15 以上的电缆，或者行程超过 2 米，20 更稳；纯信号线、短行程，18 足够。",
      },
      {
        q: "同一槽里能同时走动力线和信号线吗？",
        a: "能，但要加隔片分腔。动力线的电磁干扰会影响编码器和传感器信号，物理隔开是最省事的做法。另外两类线的外径和柔性不同，混在一起排布容易让细线被粗线挤压。",
      },
      {
        q: "气管、液压管能不能放进拖链？",
        a: "可以，注意三点：管子的最小弯曲半径通常比电缆大，要按管子的要求定 R；接头位置要避开弯曲段；高压管要留热胀余量。20 以上的中型档走气管是常规做法。",
      },
      {
        q: "现货和定制的交期分别多久？",
        a: "常备规格的散件通常可以直接发；整批或非标要按排产。具体按型号和数量核对，同一内高下不同内宽、不同 R 的库存状态也不一样。",
      },
    ],
    related: [
      { label: "拖链选型五步法", href: "/guides/selection" },
      { label: "拖链长度怎么算：行程、链长、安装长度", href: "/blog/cable-carrier-length-calculation" },
      { label: "内宽怎么算：填充率 60% 规则", href: "/blog/cable-carrier-inner-width" },
      { label: "拖链价格区间参考", href: "/price" },
    ],
  },

  heavy: {
    metaDescription:
      "承重拖链内高 45 / 65 / 80mm，内宽 50–300mm 共 12 档，弯曲半径 R75–R300。加强侧板与铰链结构，面向龙门加工中心、大型注塑机、冶金与长行程重载设备。说明何时必须上承重档、架空与导向槽的限制，以及塑料与钢制拖链的分界。",
    heading: "承重拖链：内高 45–80mm 的重载与长行程解法",
    lead:
      "内高 45mm 往上，考量的问题变了——不再是「装不装得下」，而是「几公斤一米的线束在几米跨距上反复跑，链节会不会先垮」。这一档的客户大多吃过亏：要么侧板磨穿，要么架空段下垂刮到工件，返工一次的成本远超拖链本身。",
    sections: [
      {
        title: "什么情况下必须上承重档",
        body:
          "三条里中一条就该看承重档：单根动力电缆外径 Ø25 以上；线束总重超过 3kg/m；行程超过 4 米且需要架空或长跨距支撑。典型设备是龙门加工中心、落地镗铣、大型注塑机、压机与冶金产线。反过来说，内高 30 的档位硬撑这类工况，通常半年内出问题——先是侧板单边磨损，接着链节跑偏，最后卡死。前期省下的那点采购差价，抵不上一次停机。",
      },
      {
        title: "45 / 65 / 80 与内宽 50–300 的对应",
        body:
          "45 是中型到承重的过渡档，线束 15 到 30 根，很多龙门的工作台走线落在这里；65 是主流承重档，大型注塑机与龙门横梁常用；80 面向超大线径与多管路，需要走液压主管时才会用到。内宽 50 到 300mm 共 12 档，超过 200mm 要重点评估侧板刚度与节距配合——宽度越大，链条扭转的力矩越大，导向和支撑必须跟上。",
      },
      {
        title: "长行程的两个真正限制：架空与导向",
        body:
          "架空长度不是按内高线性外推的，它取决于链节刚度、负载分布和运行速度。超出架空能力必须加导向槽或滑行支撑，否则上段会下垂，回程时刮擦下段，噪音和磨损同时上来。行程超过 10 米还要考虑链条自重导致的回弯与热胀，安装时留出补偿。另一种选择是钢制拖链：耐高温、抗冲击、承载大，代价是自重大、噪音高、需要更实的支撑结构。塑料承重和钢制的分界通常在温度和冲击上——常规温度区间、需要低噪音的场合，塑料承重更合适。",
      },
    ],
    keyPoints: [
      { label: "内高档位", value: "45 / 65 / 80 mm（3 档）" },
      { label: "内宽范围", value: "50–300 mm，共 12 档" },
      { label: "弯曲半径", value: "R75 起，最大 R300" },
      { label: "结构", value: "桥式加强侧板，可选钢制拖链方案" },
      { label: "工作温度", value: "-20℃ ~ +120℃（钢制按实际工况另核）" },
      { label: "对应型号", value: "WSL27 / WSL35 / WSL37 等系列" },
    ],
    faqs: [
      {
        q: "塑料承重拖链和钢制拖链怎么选？",
        a: "看温度和冲击。常规车间温度、要求低噪音和轻量，用增强尼龙承重档；有高温辐射、飞溅熔渣或强冲击，钢制更合适。钢制自重大，对支撑结构和导向的要求也更高，不是换个材质那么简单。",
      },
      {
        q: "架空多长就必须加导向槽？",
        a: "没有统一数字，取决于内高、内宽、负载和速度的组合。经验上，架空段开始出现肉眼可见的下垂、或者运行时上下段有接触，就必须加导向或支撑。具体项目按工况核算，不要按内高套一个固定值。",
      },
      {
        q: "内宽 300mm 以上还能做吗？",
        a: "300mm 是标准档位的上限。再宽属于非标，需要重新评估侧板刚度、节距和导向方案，通常按项目单独设计，起订量和交期都要另谈。",
      },
      {
        q: "承重拖链的交期一般多久？",
        a: "45 与 65 的常备规格相对齐，80 与非标宽度按排产。重载项目建议在方案阶段就把排产周期算进去，不要等设备装配前才下单。",
      },
    ],
    related: [
      { label: "拖链选型五步法", href: "/guides/selection" },
      { label: "拖链长度怎么算：行程、链长、安装长度", href: "/blog/cable-carrier-length-calculation" },
      { label: "拖链材质怎么选：尼龙、TPU、钢制对比", href: "/blog/cable-carrier-material-comparison" },
      { label: "拖链价格区间参考", href: "/price" },
    ],
  },

  silent: {
    metaDescription:
      "静音拖链内高 18 / 25 / 30 / 35 / 40 / 45mm，内宽 25–125mm，弯曲半径 R28–R200，低摩擦铰链与缓冲限位结构。适用于高速往复、医疗自动化、精密加工与靠近操作工的设备。含降噪落点、填充率与速度边界说明。",
    heading: "静音拖链：内高 18–45mm 的低噪音往复方案",
    lead:
      "静音这一档不是「加了消音棉」，而是改了链节的撞击方式和限位结构。它能压噪音，但压不到零——主轴、导轨、伺服还在响。所以选之前先做一件事：测清楚噪音到底是拖链发出来的，还是整机发出来的。搞错了对象，换了静音链也没用。",
    sections: [
      {
        title: "静音拖链和同内高普通拖链差在哪",
        body:
          "结构是一一对应的：18J 对 18，25J 对 25，内高和内宽尺寸通用，区别在铰链与限位。静音版把链节撞击面加大、加缓冲限位块，降低回位时的敲击声；同时优化了摩擦副的配合间隙，减少高频抖动。要注意内宽范围比普通档窄——静音系列只覆盖 25 到 125mm，两端更宽或更窄的规格没有静音版本，这种情况只能从结构或安装方式上想办法。",
      },
      {
        title: "什么工况值得为静音付溢价",
        body:
          "三类场景收益明显：一是设备靠近操作工，比如医疗设备、实验室仪器、精密装配线；二是高速往复，速度上去以后撞击频率变高，噪音问题会被放大；三是洁净或安静环境，噪音本身就是验收指标。反例也有——装在机床外罩里的拖链，噪音被罩住，花这个溢价意义不大。另外要清楚，静音不等于高速专用，它是「降低撞击能量」，速度超限照样出问题。",
      },
      {
        title: "降噪不能只靠换链",
        body:
          "把填充率从 60% 压到 50%，链节内的撞击声会明显下降，这是成本很低的一个动作。弯曲半径往上取一档，链节回位角度变小，冲击也跟着小。固定端的位置和浮动端的支撑方式影响很大，装偏了静音链也白搭。还有线缆本身——硬质线在槽里弹跳也是声源，换成柔性拖链电缆往往比换链更立竿见影。噪音验收建议先对齐测法：测距、背景噪音、工况点都写清楚，否则双方各测一个数，谈不拢。",
      },
    ],
    keyPoints: [
      { label: "内高档位", value: "18 / 25 / 30 / 35 / 40 / 45 mm（6 档）" },
      { label: "内宽范围", value: "25–125 mm，共 19 档" },
      { label: "弯曲半径", value: "R28 起，最大 R200" },
      { label: "结构", value: "低摩擦铰链 + 缓冲限位（型号带 J 标识）" },
      { label: "工作温度", value: "-20℃ ~ +120℃" },
      { label: "对应型号", value: "WSL01J / WSL02J / WSL04J / WSL06J / WSL08J / WSL10J 等" },
    ],
    faqs: [
      {
        q: "换上静音拖链能降多少分贝？",
        a: "取决于原工况的声源构成和测点位置，没有通用数字。如果噪音主要来自链节撞击，改善会比较明显；如果主轴、导轨本身就占大头，换链的效果有限。建议先测原工况，再对比同测法下的结果。",
      },
      {
        q: "静音系列能跑多快？",
        a: "速度不是单一条件，要和行程、加速度、填充率一起看。同样速度下，行程越长、加速度越大，对链节的要求越高。高速工况建议把填充率压到 50% 以下，弯曲半径取大一档，并核算加速度包络。",
      },
      {
        q: "静音拖链和普通拖链能互换安装吗？",
        a: "同内高同内宽的规格，安装孔位通常可以对应，但链节高度和外廓可能有细微差别，替换前要核对安装尺寸。整机设计阶段就用静音版的，后续维护更省事。",
      },
      {
        q: "有没有更宽的静音规格？",
        a: "标准静音系列覆盖内宽 25–125mm。更宽的规格目前没有静音版本，可以考虑通过安装方式、填充率和线缆选型来降噪，或者按项目单独评估。",
      },
    ],
    related: [
      { label: "静音拖链降噪的五个落点", href: "/blog/low-noise-cable-carrier" },
      { label: "速度与加速度的选型边界", href: "/blog/cable-carrier-speed-acceleration" },
      { label: "拖链选型五步法", href: "/guides/selection" },
      { label: "拖链价格区间参考", href: "/price" },
    ],
  },

  portable: {
    metaDescription:
      "便携式拖链采用轻量化链节与快装开合结构，拆装方便、可整套携带，适合机械手、移动工位、3D 打印设备与展会临时布线。说明适用场景、为什么没有标准规格表、选型要提供的四项信息与交付形式。",
    heading: "便携式拖链：可拆可带的临时布线方案",
    lead:
      "便携式不是「小一号的拖链」，它解决的是另一类问题：设备要经常搬、工位要经常换、线束要能整套提走。这一档没有标准规格表，因为每个客户的「便携」定义不一样——有人要能单手拆，有人要能塞进航空箱，有人要的是整套线束一起走。",
    sections: [
      {
        title: "什么场景适合便携式",
        body:
          "常见四类：展会与演示设备，一天拆装好几次；移动工位与协作机器人工作站，产线要随订单调整；桌面级 3D 打印与小型自动化设备；临时产线改造，不想为一条拖链动土建。共同点是「拆装频次高」和「不需要长期固定」。如果设备装上就不动，用常规桥式拖链更划算——便携结构的成本主要在快装件上。",
      },
      {
        title: "为什么它没有标准规格表",
        body:
          "常规拖链的核心参数是内高、内宽、弯曲半径，便携式的核心是接口：快装卡扣的形式、端接头怎么固定、收纳时怎么收。长度和内宽按实际线束定，常按整套（含两端接头）交付，而不是按米卖。所以做法也不同——先给线束清单和拆装频次，再定结构，最后才是报价。拿常规型号表来对便携式，基本对不上。",
      },
      {
        title: "选型时要提供的四样信息",
        body:
          "一是线束清单：根数、外径、是否含气管或液压管；二是拆装频次与单次允许时间，这决定卡扣形式；三是收纳方式：卷起来、折起来还是装箱，决定链节的柔性与端头设计；四是使用环境：室内还是户外、温度范围、有没有油污或切削液。这四项给全，方案基本一次就能定；缺了拆装频次，往往要来回改两轮。",
      },
    ],
    keyPoints: [
      { label: "结构", value: "轻量化链节 + 快装开合结构" },
      { label: "交付形式", value: "按整套定制（含端接头），不按米卖" },
      { label: "适配设备", value: "机械手、移动工位、3D 打印、展会设备" },
      { label: "常规材质", value: "玻纤增强尼龙" },
      { label: "起订方式", value: "按方案核，非标件通常需先打样" },
      { label: "注意", value: "无标准规格表，需按线束清单定方案" },
    ],
    faqs: [
      {
        q: "能不能只买链节，端头我们自己接？",
        a: "可以谈，但要先确认你端的固定方式和受力方向。便携式的问题大多出在端头——卡扣选错，拆两次就松。如果自己接，建议先拿样品试装。",
      },
      {
        q: "快装结构能拆装多少次？",
        a: "取决于卡扣形式和使用手法，没有统一次数。高频拆装的场景建议选金属嵌件或加强卡扣，并在方案阶段说明频次，按频次选结构比事后维修便宜。",
      },
      {
        q: "能做成防水的吗？",
        a: "常规便携式不防水。户外或潮湿环境需要单独评估密封方案，包括链节间隙、端头密封和线缆入口，属于定制范畴。",
      },
      {
        q: "交期怎么算？",
        a: "便携式多为定制，流程是方案确认、打样、批量。打样周期和批量周期要分开算，具体按线束复杂度和数量核。",
      },
    ],
    related: [
      { label: "拖链选型五步法", href: "/guides/selection" },
      { label: "直线模组场景的拖链选型", href: "/blog/linear-module-cable-carrier" },
      { label: "定制拖链的交付流程", href: "/blog/custom-cable-carrier-delivery-process" },
      { label: "联系我们", href: "/contact" },
    ],
  },

  cleanroom: {
    metaDescription:
      "无尘拖链 WWC 系列，TPU 材质，内高 15 / 18 / 22 / 28 / 35mm，内宽 25–65mm，弯曲半径 R40–R90。低发尘、免润滑，用于半导体、液晶面板、医药洁净室与精密光学设备。含洁净等级口径、材料差异与验收要点。",
    heading: "无尘拖链 WWC 系列：洁净室里的发尘控制",
    lead:
      "无尘拖链和普通尼龙拖链不是「加个盖子」的差别。洁净室里它同时干两件事：带着线缆走，以及不往环境里放颗粒。绝大多数选型失误，都出在只看了第一件——链条能走，但发尘超标，整条线验收过不了。",
    sections: [
      {
        title: "材料先定：TPU，不是尼龙",
        body:
          "常规尼龙拖链在干摩擦下会持续掉屑，这在普通车间无所谓，在洁净室就是污染源。WWC 系列用 TPU，低发尘、无需润滑，这是它能进洁净室的前提。代价也要说清楚：TPU 的刚度不如玻纤增强尼龙，长行程架空能力有限，所以 WWC 的弯曲半径只做到 R90，覆盖的是短行程、轻负载的精密设备。拿它去替代长行程重载拖链，方向就错了。",
      },
      {
        title: "洁净等级是输入条件，不是验收结果",
        body:
          "洁净室分级用 ISO 14644-1，按单位体积空气中的粒子浓度划 ISO Class 1 到 9；旧的美标 FED-STD-209E 用 Class 1 到 100000，ISO Class 5 大致对应旧的 Class 100。选型阶段就要把等级、发尘限值、寿命要求写成可测条款，而不是装完再验。具体能到哪一级，要以对应批次的检测报告为准——不同批次、不同工况的数据会有差异，任何口头承诺都不如一份报告。",
      },
      {
        title: "WWC 五个规格怎么挑",
        body:
          "内高 15、18、22、28、35mm 共五档，内宽 25 到 65mm，弯曲半径 R40 起、最大 R90。半导体前道设备多用 15 和 18，面板与医药线多在中段，28 和 35 用于线束较粗的场合。行程超过 2 米、或者线束重量偏大，需要考虑加支撑或换方案——TPU 的自重和刚性决定了它不是长跨距的料。另外安装时注意：洁净室里不能用普通润滑脂，链节和线缆都不能带油。",
      },
    ],
    keyPoints: [
      { label: "内高档位", value: "15 / 18 / 22 / 28 / 35 mm（5 档）" },
      { label: "内宽范围", value: "25–65 mm" },
      { label: "弯曲半径", value: "R40 / R50 / R60 / R70 / R90" },
      { label: "材质", value: "TPU（免润滑、低发尘）" },
      { label: "工作温度", value: "-20℃ ~ +120℃" },
      { label: "对应型号", value: "WWC15 / WWC18 / WWC22 / WWC28 / WWC35" },
    ],
    faqs: [
      {
        q: "能做到 ISO Class 3 吗？",
        a: "能不能到某一级，取决于整套系统而不只是拖链：线缆、接头、安装方式、气流组织都影响粒子计数。建议把目标等级和测点写进技术协议，用对应批次的检测报告确认，不要按型号直接推定等级。",
      },
      {
        q: "能替代进口无尘拖链吗？",
        a: "常规工况下可以，前提是把接口尺寸、洁净等级、寿命要求三项对齐，并做小批验证。前道核心设备如果已有认证体系，替换要走客户内部的变更流程，这不是供应商单方面能决定的。",
      },
      {
        q: "需要加润滑吗？",
        a: "不需要，也不能加。TPU 链节本身自润滑，加润滑脂反而会成为发尘和析出的来源。安装和清洁时也要避免用带油的抹布。",
      },
      {
        q: "检测报告怎么提供？",
        a: "按批次提供，具体项目（发尘量、材质、RoHS 等）在订单阶段确认。涉及客户审核的，建议提前说明需要哪些报告，避免出货前才发现缺项。",
      },
    ],
    related: [
      { label: "无尘拖链选型指南", href: "/blog/cleanroom-cable-carrier-selection-guide" },
      { label: "拖链材质怎么选：尼龙、TPU、钢制对比", href: "/blog/cable-carrier-material-comparison" },
      { label: "拖链选型五步法", href: "/guides/selection" },
      { label: "联系我们", href: "/contact" },
    ],
  },
};

const EN: Record<string, CategoryDeepCopy> = {
  micro: {
    metaDescription:
      "Micro cable carriers with inner heights of 5, 6, 7, 10 and 15 mm, inner widths 5-50 mm and bend radii R10-R48. Glass-fibre reinforced nylon, open bridge design, for small CNC, robot wrists, inspection stages and electronics assembly. Includes sizing limits, unsupported length and common failure modes.",
    heading: "Micro cable carriers: routing in 5-15 mm of clearance",
    lead:
      "The 5 to 15 mm inner-height band is what customers call micro, mini or small tank-chain carriers. The question is not whether the cable can be routed, but whether it can follow the axis hundreds of thousands of cycles inside a slot barely 20 mm tall without wearing through. Three limits decide it: space, cable diameter, travel.",
    sections: [
      {
        title: "When micro is the right call",
        body:
          "Micro makes sense when three things hold at once: mounting height under about 20 mm, cable outer diameters mostly below 8 mm, and travel usually under one metre. Typical cases are the tool changer or table of a small CNC, the wrist of a SCARA or six-axis robot, the moving axis of a vision stage, and assembly fixtures. If travel exceeds 1.5 m, or more than eight cables have to be carried, micro usually gives up: thin side plates and a short pitch allow twist over long spans, and the cables get pinched in the channel. Move up to the 18 mm medium series instead of forcing micro to do the job.",
      },
      {
        title: "Turning inner height and width into a part number",
        body:
          "Inner height follows the fattest cable: at least 1.1 times the largest outer diameter, plus roughly 2 mm of clearance so the cable can float rather than being clamped. Inner width follows total cross-section: the combined area of every cable and air line should stay under 60 percent of the channel area, which in practice means the side-by-side bundle width plus 30 to 40 percent. Micro covers 11 widths from 5 to 50 mm, and the 5 mm version realistically takes a single cable below 4 mm OD. With several thin cables, add separators, otherwise they rub against each other in high-cycle operation and the insulation fails first.",
      },
      {
        title: "Bend radius and three installation constraints",
        body:
          "Radii run from R10 to R48 in six steps. Choose the cable maker's minimum radius times 1.1, then round up one step. Do not shrink R to save height: each step down costs far more cable life than the space it saves. The second constraint is unsupported length. Micro links are light but the side plates are thin, so keep unsupported runs under about 0.8 m; beyond that add support or switch to a gliding arrangement. The third is speed: micro suits reciprocating motion up to roughly 2 m/s, and above that move to the silent series at the same inner height, whose hinge design handles speed better. Mount the fixed end at the mid-point of travel and leave one link of slack at each end.",
      },
    ],
    keyPoints: [
      { label: "Inner heights", value: "5 / 6 / 7 / 10 / 15 mm (5 sizes)" },
      { label: "Inner widths", value: "5-50 mm, 11 steps" },
      { label: "Bend radii", value: "R10 / R15 / R18 / R28 / R38 / R48" },
      { label: "Design", value: "Open bridge, separators available" },
      { label: "Temperature", value: "-20°C to +120°C" },
      { label: "Series", value: "WSL01 / WSL01X / WSL02 / WSL03 family / WSL07 family" },
    ],
    faqs: [
      {
        q: "Micro 15 versus the 18 mm medium series - which one?",
        a: "They are close in height but not in strength. Under 1 m travel, cables below 8 mm OD and tight mounting height point to micro 15. Longer travel, more cables or better torsion resistance point to the 18 series, which has thicker side plates and a longer pitch.",
      },
      {
        q: "How many cables fit in one micro carrier?",
        a: "Total cross-section decides, not the count. At 60 percent fill, a 20 mm wide 10-series channel takes roughly four to six 4 mm OD power cables side by side. Signal cables can be stacked, but separators are essential.",
      },
      {
        q: "Can inner width be customised, and are separators extra?",
        a: "Standard widths are the safer choice and stock is better. Genuinely non-standard widths need a mould, and minimum order is quoted per size. Separators are standard accessories - state how many compartments and what runs in each.",
      },
      {
        q: "What are the lead time and minimum order?",
        a: "Common sizes ship from stock in small quantities. Non-standard or large batches follow production scheduling. Lead time is quoted per part number because stock status varies widely across the range.",
      },
    ],
    related: [
      { label: "Five-step selection guide", href: "/guides/selection" },
      { label: "How to size inner width", href: "/blog/cable-carrier-inner-width" },
      { label: "How to set the bend radius", href: "/blog/cable-carrier-bend-radius" },
      { label: "Price ranges", href: "/price" },
    ],
  },

  medium: {
    metaDescription:
      "Medium cable carriers with inner heights of 18, 20, 25 and 30 mm, inner widths 18-103 mm and bend radii R28-R250. Glass-fibre reinforced nylon for machining centres, injection moulding machines, laser cutters and automated lines. Covers how the four heights divide the work and where the heavy series takes over.",
    heading: "Medium cable carriers: the 18-30 mm workhorse range",
    lead:
      "Inner heights from 18 to 30 mm are the most common band in cable carrier work. Most machining centres, injection moulding machines and laser cutters route their cables somewhere in this range. It is less space-critical than micro and far less bulky than heavy - the band where a wrong choice rarely fails immediately, but a right one buys two or three extra years.",
    sections: [
      {
        title: "How 18, 20, 25 and 30 divide the work",
        body:
          "The 18 series is the entry point: five to ten cables and one to three metres of travel, typical of lathe turrets and slides. The 20 and 25 series carry the bulk of the work with ten to twenty cables, mixing power, signal and air lines, and dominate injection moulding and machining centres. The 30 series goes above twenty cables, or takes single power cables over 25 mm OD, and holds up noticeably better than 25 over long spans. Within one height, pick width from total cross-section: 18 to 103 mm gives 16 steps, dense enough that custom widths are rarely needed.",
      },
      {
        title: "Where the micro and heavy ranges begin",
        body:
          "Upwards, 45 mm inner height marks the heavy range, with reinforced side plates, longer pitch and more unsupported span. Downwards, 15 mm belongs to micro. A rough rule: if the cable load exceeds about 3 kg per metre, or travel passes four metres with long unsupported spans, go straight to heavy rather than pushing a 30 to its limit. One point is often missed - a 30 mm carrier spans far better than an 18. For long spans, raising inner height buys more stiffness than adding width, because bending resistance comes from side-plate depth.",
      },
      {
        title: "Three things installation usually gets wrong",
        body:
          "First, cables must float freely inside the channel, tied only at both ends with slack in between. Binding them to the links makes the cable flex with every link, and it fails fast. Second, put heavy cables at the sides and light ones in the middle; an offset centre of gravity wears one side plate and makes the chain run crooked. Third, keep height difference between fixed and moving ends, otherwise the bend section straightens out and the effective radius shrinks. Run power and signal cables in separate compartments with separators to cut both interference and abrasion.",
      },
    ],
    keyPoints: [
      { label: "Inner heights", value: "18 / 20 / 25 / 30 mm (4 sizes)" },
      { label: "Inner widths", value: "18-103 mm, 16 steps" },
      { label: "Bend radii", value: "From R28 up to R250" },
      { label: "Design", value: "Open bridge, separators available" },
      { label: "Temperature", value: "-20°C to +120°C" },
      { label: "Series", value: "WSL11 / WSL16 / WSL17 / WSL21 families" },
    ],
    faqs: [
      {
        q: "Is the 20 series worth the extra over 18 for 2 mm of height?",
        a: "The structure differs, not just the height. The 20 has larger side plates and pins, giving one step more torsion and span capability. With cables above 15 mm OD, or travel beyond two metres, 20 is the safer pick. Pure signal runs over short travel do fine on 18.",
      },
      {
        q: "Can power and signal cables share one channel?",
        a: "Yes, with a separator. Power cables interfere with encoder and sensor signals, and physical separation is the simplest fix. The two also differ in diameter and flexibility, so thin cables tend to get squeezed by thick ones when mixed.",
      },
      {
        q: "Can air or hydraulic lines go inside the carrier?",
        a: "Yes. Three points matter: hoses usually need a larger minimum bend radius than cables, so radius is set by the hose; fittings must stay clear of the bend section; and high-pressure lines need thermal expansion allowance.",
      },
      {
        q: "What are typical lead times for stock versus custom?",
        a: "Stock sizes usually ship in loose quantity, while full batches and non-standard items follow production scheduling. Lead time is quoted per part number - stock status differs across widths and radii within the same height.",
      },
    ],
    related: [
      { label: "Five-step selection guide", href: "/guides/selection" },
      { label: "Travel, chain length and mounting length", href: "/blog/cable-carrier-length-calculation" },
      { label: "How to size inner width", href: "/blog/cable-carrier-inner-width" },
      { label: "Price ranges", href: "/price" },
    ],
  },

  heavy: {
    metaDescription:
      "Heavy-duty cable carriers with inner heights of 45, 65 and 80 mm, inner widths 50-300 mm in 12 steps and bend radii R75-R300. Reinforced side plates for gantry machining centres, large injection moulding machines and long-travel heavy equipment. Covers when heavy is mandatory and where steel takes over.",
    heading: "Heavy-duty cable carriers: 45-80 mm for load and long travel",
    lead:
      "Above 45 mm inner height the question changes. It is no longer whether the cables fit, but whether links carrying several kilograms per metre across several metres of span will hold up. Most customers in this band have already been burned once - a worn-through side plate, or a sagging span scraping the workpiece - and one rework costs far more than the carrier.",
    sections: [
      {
        title: "When the heavy range becomes mandatory",
        body:
          "Any one of three conditions points here: a single power cable above 25 mm OD, a cable load above about 3 kg per metre, or travel beyond four metres with unsupported or long-span routing. Typical equipment includes gantry machining centres, floor borers, large injection moulding machines, presses and metallurgical lines. A 30 mm carrier forced into this duty usually fails within six months - one side plate wears first, then the chain runs crooked, then it jams. The purchase saving never covers one stoppage.",
      },
      {
        title: "Matching 45, 65 and 80 to widths of 50-300 mm",
        body:
          "The 45 is the transition from medium to heavy, carrying fifteen to thirty cables, and covers much of the table routing on gantries. The 65 is the main heavy size, common on large moulding machines and gantry crossbeams. The 80 handles very large diameters and multiple lines, and appears when a main hydraulic line has to be carried. Widths run 50 to 300 mm in 12 steps; above 200 mm, evaluate side-plate stiffness against pitch carefully, because wider chains see more torsional load and guidance must keep up.",
      },
      {
        title: "The two real limits on long travel: span and guidance",
        body:
          "Unsupported length does not scale linearly with inner height. It depends on link stiffness, load distribution and speed. Beyond the span capability, add a guide trough or gliding support, otherwise the upper run sags, scrapes the lower run on return, and both noise and wear climb. Beyond about ten metres, allow for self-weight catenary and thermal expansion. Steel carriers are the other option: higher temperature resistance, impact tolerance and load capacity, at the cost of weight, noise and heavier support structures. The usual dividing line is temperature and impact - within normal temperature ranges and where low noise matters, plastics win.",
      },
    ],
    keyPoints: [
      { label: "Inner heights", value: "45 / 65 / 80 mm (3 sizes)" },
      { label: "Inner widths", value: "50-300 mm, 12 steps" },
      { label: "Bend radii", value: "From R75 up to R300" },
      { label: "Design", value: "Reinforced side plates; steel option available" },
      { label: "Temperature", value: "-20°C to +120°C (steel quoted separately)" },
      { label: "Series", value: "WSL27 / WSL35 / WSL37 families" },
    ],
    faqs: [
      {
        q: "Plastic heavy-duty or steel carrier?",
        a: "Temperature and impact decide. Normal shop temperatures with low-noise and light weight point to reinforced nylon. Radiant heat, spatter or heavy impact point to steel. Steel is heavier and demands more from supports and guidance, so it is not a simple material swap.",
      },
      {
        q: "At what span must a guide trough be added?",
        a: "There is no single number; it depends on height, width, load and speed together. In practice, once visible sag appears, or upper and lower runs touch during operation, guidance or support is required. Calculate per application rather than applying a fixed figure.",
      },
      {
        q: "Can widths above 300 mm be made?",
        a: "300 mm is the top of the standard range. Wider is non-standard and requires re-evaluating side-plate stiffness, pitch and guidance. It is usually designed per project, with separate minimum order and lead time.",
      },
      {
        q: "What lead time applies to heavy carriers?",
        a: "Stock is relatively good for 45 and 65; 80 and non-standard widths follow scheduling. Heavy projects should factor production time into the plan at the design stage, not at machine assembly.",
      },
    ],
    related: [
      { label: "Five-step selection guide", href: "/guides/selection" },
      { label: "Travel, chain length and mounting length", href: "/blog/cable-carrier-length-calculation" },
      { label: "Nylon, TPU or steel: material comparison", href: "/blog/cable-carrier-material-comparison" },
      { label: "Price ranges", href: "/price" },
    ],
  },

  silent: {
    metaDescription:
      "Low-noise cable carriers with inner heights of 18, 25, 30, 35, 40 and 45 mm, inner widths 25-125 mm and bend radii R28-R200. Low-friction hinges and cushioned stops for high-speed reciprocation, medical automation, precision machining and equipment near operators.",
    heading: "Low-noise cable carriers: 18-45 mm for quieter reciprocation",
    lead:
      "The silent range is not nylon with foam inside. The link impact and stop geometry are redesigned. It reduces noise but cannot remove it - the spindle, guides and servos are still running. So measure first: is the noise coming from the carrier, or from the machine? Solve the wrong source and a silent chain changes nothing.",
    sections: [
      {
        title: "What actually differs from a standard carrier",
        body:
          "Sizes map one to one: 18J to 18, 25J to 25, with the same inner height and width envelope. The difference is in the hinge and the stop. Silent versions enlarge the impact faces and add cushioned stops, reducing the knock as links return, and tighten the friction-pair clearance to cut high-frequency chatter. Note the narrower width coverage - the silent range only spans 25 to 125 mm. Sizes outside that have no silent version, so the fix has to come from structure or installation.",
      },
      {
        title: "When the premium is worth paying",
        body:
          "Three cases pay off: equipment close to operators, such as medical devices, laboratory instruments and precision assembly; high-speed reciprocation, where impact frequency rises and noise gets amplified; and clean or quiet environments where noise is itself an acceptance criterion. The counter-case is a carrier inside a machine enclosure where noise is already contained - the premium buys little. Also note that silent does not mean high-speed rated; it lowers impact energy, but exceeding speed limits still causes problems.",
      },
      {
        title: "Noise reduction is not only the chain",
        body:
          "Dropping fill from 60 to 50 percent noticeably reduces impact noise inside the channel, at almost no cost. Going up one bend-radius step shrinks the link return angle and the impact with it. Fixed-end position and floating-end support matter a lot; a silent chain installed off-centre still misbehaves. And the cables themselves - stiff cable bouncing in the channel is a noise source, so switching to flexible carrier cable often beats changing the chain. Agree the measurement method before acceptance: distance, background noise and operating point, otherwise each side measures a different number.",
      },
    ],
    keyPoints: [
      { label: "Inner heights", value: "18 / 25 / 30 / 35 / 40 / 45 mm (6 sizes)" },
      { label: "Inner widths", value: "25-125 mm, 19 steps" },
      { label: "Bend radii", value: "From R28 up to R200" },
      { label: "Design", value: "Low-friction hinge with cushioned stops (J suffix)" },
      { label: "Temperature", value: "-20°C to +120°C" },
      { label: "Series", value: "WSL01J / WSL02J / WSL04J / WSL06J / WSL08J / WSL10J" },
    ],
    faqs: [
      {
        q: "How many decibels does a silent carrier remove?",
        a: "It depends on the noise mix and the measurement point, so there is no general figure. If link impact dominates, the improvement is clear; if spindle or guide noise dominates, changing the chain does little. Measure the original condition first, then compare with the same method.",
      },
      {
        q: "How fast can the silent series run?",
        a: "Speed alone is not a specification. It must be read together with travel, acceleration and fill. At the same speed, longer travel and higher acceleration demand more from the links. For high speed, keep fill below 50 percent, take one radius step up, and check the acceleration envelope.",
      },
      {
        q: "Can silent and standard carriers be swapped directly?",
        a: "At the same inner height and width, mounting holes usually correspond, but link height and outer profile can differ slightly. Check mounting dimensions before replacing. Designing the machine with the silent version from the start makes later maintenance simpler.",
      },
      {
        q: "Are wider silent sizes available?",
        a: "The standard silent range covers 25 to 125 mm inner width. Wider sizes have no silent version; consider installation geometry, fill ratio and cable selection instead, or ask for a project-specific evaluation.",
      },
    ],
    related: [
      { label: "Five places to cut carrier noise", href: "/blog/low-noise-cable-carrier" },
      { label: "Speed and acceleration limits", href: "/blog/cable-carrier-speed-acceleration" },
      { label: "Five-step selection guide", href: "/guides/selection" },
      { label: "Price ranges", href: "/price" },
    ],
  },

  portable: {
    metaDescription:
      "Portable cable carriers use lightweight links and quick-release openings so the assembly can be dismantled, carried and reinstalled. For robot cells, movable workstations, 3D printers and exhibition setups. Explains the four inputs needed for a quote and why there is no standard size table.",
    heading: "Portable cable carriers: routing that travels with the machine",
    lead:
      "Portable is not a smaller carrier. It solves a different problem: the machine moves often, the workstation changes, and the cable bundle has to leave as one piece. There is no standard size table because every customer defines portable differently - one wants single-hand release, another wants it to fit a flight case, another wants the whole harness to travel together.",
    sections: [
      {
        title: "Where portable fits",
        body:
          "Four common cases: exhibition and demo equipment dismantled several times a day; movable workstations and collaborative robot cells that follow order changes; desktop 3D printers and small automation; and temporary line conversions where nobody wants civil work for one carrier. The common thread is frequent dismantling and no permanent installation. If the machine is installed once and stays, a standard open-bridge carrier is more economical, because the cost of portable sits in the quick-release hardware.",
      },
      {
        title: "Why there is no standard size table",
        body:
          "A standard carrier is specified by inner height, inner width and bend radius. A portable one is specified by its interfaces: the latch type, how the end fittings anchor, and how it packs down. Length and width follow the actual harness and are usually quoted as a complete assembly with both end fittings, not by the metre. So the process differs - harness list and dismantling frequency first, structure second, price last. Standard part tables simply do not map onto it.",
      },
      {
        title: "Four inputs needed for a quote",
        body:
          "One: the cable list - count, outer diameters, whether air or hydraulic lines are included. Two: dismantling frequency and the time allowed per cycle, which decides the latch type. Three: how it packs - rolled, folded or boxed - which drives link flexibility and end design. Four: the environment - indoor or outdoor, temperature, oil or coolant exposure. Give all four and the design usually lands first time; leave out frequency and expect two rounds of revision.",
      },
    ],
    keyPoints: [
      { label: "Design", value: "Lightweight links with quick-release opening" },
      { label: "Delivery", value: "Complete assembly with end fittings, not per metre" },
      { label: "Typical use", value: "Robot cells, movable stations, 3D printers, exhibitions" },
      { label: "Standard material", value: "Glass-fibre reinforced nylon" },
      { label: "Ordering", value: "Quoted per design; prototypes usually required" },
      { label: "Note", value: "No standard size table - designed from the harness list" },
    ],
    faqs: [
      {
        q: "Can we buy only the links and fit our own ends?",
        a: "Possible, but confirm the anchoring method and load direction first. Most portable problems start at the ends - choose the wrong latch and it loosens after two cycles. If you fit your own, test a sample assembly before committing.",
      },
      {
        q: "How many cycles will the quick-release survive?",
        a: "It depends on latch type and handling, with no universal figure. For frequent dismantling, specify metal inserts or reinforced latches and state the frequency at the design stage; selecting for frequency is cheaper than repairing later.",
      },
      {
        q: "Can it be made water-resistant?",
        a: "Standard portable carriers are not sealed. Outdoor or wet environments need a separate sealing evaluation covering link gaps, end fittings and cable entries - that is custom work.",
      },
      {
        q: "How is lead time calculated?",
        a: "Most portable units are custom, so the sequence is design approval, prototype, batch. Prototype and batch times are quoted separately and depend on harness complexity and quantity.",
      },
    ],
    related: [
      { label: "Five-step selection guide", href: "/guides/selection" },
      { label: "Carriers for linear modules", href: "/blog/linear-module-cable-carrier" },
      { label: "How a custom carrier is delivered", href: "/blog/custom-cable-carrier-delivery-process" },
      { label: "Contact us", href: "/contact" },
    ],
  },

  cleanroom: {
    metaDescription:
      "WWC cleanroom cable carriers in TPU, with inner heights of 15, 18, 22, 28 and 35 mm, inner widths 25-65 mm and bend radii R40-R90. Low particle emission, lubrication-free, for semiconductor, flat panel, pharmaceutical cleanrooms and precision optics.",
    heading: "WWC cleanroom carriers: controlling particle emission",
    lead:
      "A cleanroom carrier is not a standard carrier with a lid. Inside a cleanroom it does two jobs at once: carry the cables, and avoid releasing particles into the environment. Most selection mistakes come from looking only at the first job - the chain runs, but emission exceeds the limit and the line fails acceptance.",
    sections: [
      {
        title: "Material first: TPU, not nylon",
        body:
          "Standard nylon carriers shed particles continuously under dry friction. That is irrelevant in a machine shop and a contamination source in a cleanroom. The WWC series uses TPU, which emits little and needs no lubrication - that is the precondition for entering a cleanroom. The trade-off is real: TPU is less stiff than glass-fibre reinforced nylon, so unsupported span is limited, which is why WWC stops at R90 and covers short-travel, light-load precision equipment. Using it to replace a long-travel heavy carrier is the wrong direction.",
      },
      {
        title: "Cleanliness class is an input, not an acceptance result",
        body:
          "Cleanrooms are classified under ISO 14644-1 by particle concentration per unit volume, from ISO Class 1 to 9. The older US FED-STD-209E used Class 1 to 100000, where ISO Class 5 corresponds roughly to the old Class 100. Write the class, emission limit and life requirement into the technical agreement at the selection stage, not after installation. The class actually achieved must be confirmed against a test report for the specific batch - results vary with batch and operating condition, and no verbal assurance replaces a report.",
      },
      {
        title: "Choosing among the five WWC sizes",
        body:
          "Inner heights are 15, 18, 22, 28 and 35 mm, inner widths 25 to 65 mm, radii from R40 up to R90. Semiconductor front-end equipment tends toward 15 and 18; flat panel and pharmaceutical lines sit in the middle; 28 and 35 handle heavier bundles. Above about two metres of travel, or with a heavy bundle, add support or reconsider the approach - TPU's weight and stiffness rule it out for long spans. Installation note: no ordinary grease in a cleanroom, on the links or the cables.",
      },
    ],
    keyPoints: [
      { label: "Inner heights", value: "15 / 18 / 22 / 28 / 35 mm (5 sizes)" },
      { label: "Inner widths", value: "25-65 mm" },
      { label: "Bend radii", value: "R40 / R50 / R60 / R70 / R90" },
      { label: "Material", value: "TPU, lubrication-free, low emission" },
      { label: "Temperature", value: "-20°C to +120°C" },
      { label: "Series", value: "WWC15 / WWC18 / WWC22 / WWC28 / WWC35" },
    ],
    faqs: [
      {
        q: "Can it reach ISO Class 3?",
        a: "Achieving a class depends on the whole system, not the carrier alone: cables, fittings, installation and airflow all affect particle counts. Write the target class and measurement points into the technical agreement and confirm with a batch test report rather than inferring a class from the part number.",
      },
      {
        q: "Can it replace an imported cleanroom carrier?",
        a: "In standard duty, yes, provided interface dimensions, cleanliness class and life requirement are aligned and a small batch is validated. If the front-end tool already carries certifications, replacement goes through the customer's change process - no supplier can decide that alone.",
      },
      {
        q: "Does it need lubrication?",
        a: "No, and it must not have any. TPU links are self-lubricating; added grease becomes a source of emission and outgassing. Avoid oily cloths during installation and cleaning as well.",
      },
      {
        q: "How are test reports provided?",
        a: "Per batch, with the specific tests - emission, material, RoHS and others - agreed at order stage. Where customer audits are involved, state the required reports early so nothing is missing at shipment.",
      },
    ],
    related: [
      { label: "Cleanroom carrier selection guide", href: "/blog/cleanroom-cable-carrier-selection-guide" },
      { label: "Nylon, TPU or steel: material comparison", href: "/blog/cable-carrier-material-comparison" },
      { label: "Five-step selection guide", href: "/guides/selection" },
      { label: "Contact us", href: "/contact" },
    ],
  },
};

/**
 * 取分类页深度内容。vi / es / it / ru 返回 undefined，
 * 页面据此不渲染该区块（这几语种保持原样，不出现中文正文）。
 */
export function getCategoryDeepCopy(
  categoryId: string,
  locale: Locale,
): CategoryDeepCopy | undefined {
  if (locale === "zh") return ZH[categoryId];
  if (locale === "en") return EN[categoryId];
  return undefined;
}
