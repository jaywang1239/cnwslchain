import type { Locale } from "./config";
import { defaultLocale } from "./config";

export type AppMessages = {
  brand: string;
  brandFull: string;
  legalName: string;
  description: string;
  nav: {
    products: string;
    solutions: string;
    about: string;
    downloads: string;
    blog: string;
    news: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
  };
  language: string;
  home: string;
  learnMore: string;
  viewSeries: string;
  viewSpecs: string;
  contactCta: string;
  breadcrumb: string;
  footer: {
    blurb: string;
    contact: string;
    phone: string;
    fax: string;
    email: string;
    address: string;
    factory: string;
    shenzhen: string;
    changzhou: string;
    overseas: string;
    overseasContact: string;
    website: string;
    miniprogram: string;
    scan: string;
    copyright: string;
  };
  /** Localized street addresses for footer / contact (not legal-only Chinese). */
  addressLines: {
    factory: string;
    shenzhen: string;
    changzhou: string;
  };
  homePage: {
    metaTitle: string;
    metaDescription: string;
    ogImageAlt: string;
    heroTitle: string;
    heroSubtitle: string;
    heroCta: string;
    trust: { value: string; label: string }[];
    productsTitle: string;
    productsSubtitle: string;
    materialsTitle: string;
    materialsBody: string;
    materialsCta: string;
    partnersTitle: string;
    partnersSubtitle: string;
  };
  products: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    subtitle: string;
    viewCategory: string;
    seriesIntro: string;
    specsTitle: string;
    material: string;
    openType: string;
    innerHeight: string;
    innerWidth: string;
    bendRadius: string;
    downloadPdf: string;
    inquire: string;
    related: string;
    noSpecs: string;
    backToCategory: string;
    features: string;
    applications: string;
    faq: string;
    seriesHeading: string;
    tempRange: string;
    specCode: string;
    actions: string;
    contactSales: string;
    paramsTitle: string;
    connector: string;
    downloadDrawing: string;
    bendRadiiTitle: string;
    bendRadiiHint: string;
    codeExample: string;
    note: string;
    radiusCompact: string;
    radiusCommon: string;
    radiusLong: string;
    imagePending: string;
    inquiryTitle: string;
    inquiryHint: string;
    codePrefix: string;
    specsCount: string;
    notFound: string;
    categoryNotFound: string;
    productImage: string;
    productNo: string;
    productSeries: string;
    lifespan: string;
    downloadCatalog: string;
    downloadWord: string;
  };
  solutions: {
    title: string;
    description: string;
    seo: string;
    cta: string;
    items: {
      id: "cleanroom" | "new-energy" | "automotive" | "machine-tool" | "laser" | "robotics";
      title: string;
      summary: string;
      points: string[];
      imageAlt: string;
    }[];
  };
  about: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    subtitle: string;
    introTitle: string;
    introBody: string[];
    factoryPhotoAlt: string;
    milestonesTitle: string;
    milestones: { year: string; title: string; description: string }[];
    patentsTitle: string;
    patentsBadge: string;
    certsTitle: string;
    certifications: { name: string; description: string }[];
  };
  contact: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    subtitle: string;
    formTitle: string;
    formHint: string;
    infoTitle: string;
    factoryPhotoAlt: string;
    labels: {
      company: string;
      phone: string;
      fax: string;
      email: string;
      factory: string;
      shenzhen: string;
      changzhou: string;
    };
  };
  form: {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
    productModel: string;
    quantity: string;
    subject: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
    inquirySubmit: string;
    inquirySuccess: string;
    inquiryMessage: string;
    placeholders: {
      name: string;
      email: string;
      phone: string;
      company: string;
      message: string;
      productModel: string;
      quantity: string;
      subject: string;
      inquiryMessage: string;
    };
  };
  downloads: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    subtitle: string;
    download: string;
    catalogSection: string;
    cleanroomSection: string;
  };
  blog: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    subtitle: string;
    empty: string;
    readMore: string;
    back: string;
    publishedAt: string;
    author: string;
    category: string;
    articleCount: string;
    prevPage: string;
    nextPage: string;
    pageStatus: string;
    draft: string;
    scheduled: string;
    paginationLabel: string;
    notFound: string;
  };
  news: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    subtitle: string;
    empty: string;
    readMore: string;
    back: string;
    companyNews: string;
    expo: string;
    notFound: string;
    videoLabel: string;
  };
  categories: Record<
    "micro" | "medium" | "heavy" | "silent" | "portable" | "cleanroom",
    {
      name: string;
      description: string;
      intro: string;
      applications: string[];
    }
  >;
};

const zh: AppMessages = {
  brand: "威仕龙",
  brandFull: "威仕龙 CNWSL",
  legalName: "浙江威仕龙塑胶有限公司",
  description:
    "浙江威仕龙塑胶有限公司专注精密塑料拖链与高端注塑零部件，配备 70 余台海天注塑机与 3000+ 套模具，通过 IATF 16949 与 ISO 9001。工厂位于浙江乐清，并设深圳、常州办事处。",
  nav: {
    products: "产品中心",
    solutions: "解决方案",
    about: "关于我们",
    downloads: "下载中心",
    blog: "技术博客",
    news: "新闻展会",
    contact: "联系我们",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
  },
  language: "语言",
  home: "首页",
  learnMore: "了解更多",
  viewSeries: "查看系列",
  viewSpecs: "查看规格 →",
  contactCta: "在线联系我们 →",
  breadcrumb: "面包屑导航",
  footer: {
    blurb: "集研发、生产、销售为一体，专业制造定制增强型尼龙拖链。",
    contact: "联系方式",
    phone: "电话",
    fax: "传真",
    email: "邮箱",
    address: "地址：",
    factory: "威仕龙乐清",
    shenzhen: "威仕龙深圳",
    changzhou: "威仕龙常州",
    overseas: "威仕龙海外",
    overseasContact: "王经理",
    website: "网址",
    miniprogram: "选型小程序",
    scan: "微信扫码进入",
    copyright: "版权所有",
  },
  addressLines: {
    factory: "浙江省温州市乐清市天成街道宁康东路2891号",
    shenzhen: "深圳市宝安区沙井街道上南东路128号",
    changzhou: "江苏省常州市天宁区听松大厦306",
  },
  homePage: {
    metaTitle: "威仕龙 CNWSL | 浙江威仕龙塑胶有限公司",
    metaDescription:
      "浙江威仕龙塑胶有限公司专业生产塑料拖链、无尘拖链与冷却管。无尘拖链低发尘、低噪音，适用于半导体与洁净室。工厂位于浙江乐清，并设深圳、常州办事处。",
    ogImageAlt: "威仕龙无尘拖链往复运行演示",
    heroTitle: "欧标防尘拖链 · 国产化替代领导者",
    heroSubtitle: "≥1500万次寿命测试 · 36个月质保",
    heroCta: "查看产品",
    trust: [
      { value: "1500+", label: "万次起寿命" },
      { value: "36", label: "个月质保" },
      { value: "1", label: "最小起订量" },
      { value: "3D", label: "模型服务" },
      { value: "专业", label: "方案设计" },
      { value: "免费", label: "样品测试" },
    ],
    productsTitle: "核心产品系列",
    productsSubtitle: "覆盖多场景工业应用，以可靠品质助力设备稳定运行",
    materialsTitle: "高性能拖链材料",
    materialsBody:
      "威仕龙专为拖链应用定制开发的高性能材料经过了市场的验证和认可。同时我们不断地改进该家族材料，以此为基础衍生出的 PA 321X11 NAT、PA6+GF30、TPU 等多种材料可应用于不同工况。威仕龙标准型拖链采用 PA 321X11 NAT 材料，高抗拉性，低摩擦系数，兼具强度和韧性，可广泛运用于多种环境和温度条件下。无尘拖链采用 TPU 材质，低磨损、低发尘。我们仍在扩展我们的材料库，针对某些特殊应用，我们很乐意为您提供其他材料的解决方案，请咨询我们。",
    materialsCta: "咨询高性能拖链材料",
    partnersTitle: "合作伙伴",
    partnersSubtitle: "服务 3C、汽车、机床与自动化一线品牌，以稳定交付赢得长期合作",
  },
  products: {
    metaTitle: "塑料拖链产品中心 | 威仕龙 CNWSL",
    metaDescription:
      "威仕龙塑料拖链覆盖微型、中型、承重、静音、便携式及无尘系列，按内高 5–80mm 选型，适用于 CNC、注塑机、半导体与自动化设备。",
    title: "塑料拖链产品中心",
    subtitle:
      "威仕龙塑料拖链按内高与工况分为微型、中型、承重、静音、便携式和无尘六大系列。先选大类，再按内高进入规格页查看参数、弯曲半径与图纸。",
    viewCategory: "进入系列",
    seriesIntro: "按内高 × 内宽选择规格，点击进入详情页查看参数、图纸与询盘。",
    specsTitle: "规格选型表",
    material: "材质",
    openType: "开口类型",
    innerHeight: "内高 (H)",
    innerWidth: "内宽 (B)",
    bendRadius: "弯曲半径",
    downloadPdf: "下载产品手册 (PDF)",
    inquire: "立即询盘",
    related: "同系列其他规格",
    noSpecs: "系列规格页正在整理上线中。",
    backToCategory: "返回系列列表",
    features: "产品特点",
    applications: "典型应用",
    faq: "常见问题",
    seriesHeading: "产品系列",
    tempRange: "工作温度",
    specCode: "规格代号",
    actions: "操作",
    contactSales: "联系销售获取完整型号清单 →",
    paramsTitle: "规格参数",
    connector: "接头型号",
    downloadDrawing: "下载图纸 (PDF)",
    bendRadiiTitle: "可选弯曲半径",
    bendRadiiHint: "同一规格可按不同弯曲半径 R 值订购，长度与行程可按工况定制。",
    codeExample: "代号示例",
    note: "说明",
    radiusCompact: "紧凑空间",
    radiusCommon: "常用规格",
    radiusLong: "大行程 / 粗线缆",
    imagePending: "产品图片待上传",
    inquiryTitle: "产品询盘",
    inquiryHint: "请告知设备类型、行程与弯曲半径需求，我们将尽快回复报价。",
    codePrefix: "代号",
    specsCount: "{count} 个规格已上线 →",
    notFound: "规格未找到 | 威仕龙 CNWSL",
    categoryNotFound: "分类未找到 | 威仕龙 CNWSL",
    productImage: "产品图",
    productNo: "产品编号",
    productSeries: "产品系列",
    lifespan: "使用寿命",
    downloadCatalog: "下载产品样册 (PDF)",
    downloadWord: "下载 Word 样册 (.docx)",
  },
  solutions: {
    title: "解决方案",
    description:
      "覆盖半导体洁净室、新能源锂电池与光伏、汽车制造、数控机床、激光切割及机器人自动化等行业场景，提供可落地的拖链选型与定制方案。",
    seo: "CNWSL 拖链解决方案覆盖洁净室、新能源产线、汽车制造、机床、激光设备与机器人自动化，提供欧标防尘拖链与定制化线缆保护方案。",
    cta: "咨询该场景方案 →",
    items: [
      {
        id: "cleanroom",
        title: "洁净室 / 半导体",
        summary: "低粉尘、低噪音运行，适配半导体与精密电子洁净室自动化设备。",
        points: [
          "全封闭防尘结构，降低颗粒物侵入风险",
          "静音铰链设计，减少洁净车间噪音干扰",
          "可选抗静电与易清洁表面处理方案",
        ],
        imageAlt: "CNWSL 无尘拖链应用于半导体洁净室自动化设备线缆保护",
      },
      {
        id: "new-energy",
        title: "新能源产线",
        summary: "应对高速往复与长行程工况，保障锂电池与光伏产线连续生产。",
        points: [
          "高寿命循环能力，降低停机维护频率",
          "耐油污与冷却介质，适配复杂产线环境",
          "支持多线束分区敷设与快速维护",
        ],
        imageAlt: "CNWSL 拖链应用于新能源锂电池产线高速往复线缆保护",
      },
      {
        id: "automotive",
        title: "汽车制造",
        summary: "覆盖焊装、涂装与总装自动化，满足高节拍产线稳定性要求。",
        points: [
          "重载与标准系列可选，匹配不同负载",
          "快装结构缩短换线与检修时间",
          "提供现场选型与国产化替代评估支持",
        ],
        imageAlt: "CNWSL 拖链应用于汽车焊装与总装自动化产线线缆保护",
      },
      {
        id: "machine-tool",
        title: "数控机床",
        summary: "适配 CNC 加工中心与精密机床的往复行程与冷却液环境。",
        points: [
          "多弯曲半径可选，匹配机床行程与安装空间",
          "耐切削液与油雾，延长线缆与气管寿命",
          "开闭式结构便于检修与线束增改",
        ],
        imageAlt: "CNWSL 拖链应用于数控机床与加工中心线缆气管保护",
      },
      {
        id: "laser",
        title: "激光切割设备",
        summary: "服务激光切割与钣金加工设备的高速轴运动与长行程敷设。",
        points: [
          "高加速度工况下仍保持平稳运行",
          "分区隔板减少线缆缠绕与磨损",
          "可定制行程与接口，对接主流激光机床",
        ],
        imageAlt: "CNWSL 拖链应用于激光切割设备高速轴运动线缆保护",
      },
      {
        id: "robotics",
        title: "机器人 / 自动化",
        summary: "面向工业机器人、机械手与柔性自动化单元的动态线缆管理。",
        points: [
          "轻量化结构降低附加惯量",
          "适应多轴联动与复杂运动轨迹",
          "支持气液电混合敷设与快速更换",
        ],
        imageAlt: "CNWSL 拖链应用于工业机器人与机械手自动化线缆保护",
      },
    ],
  },
  about: {
    metaTitle: "关于我们 | 威仕龙 CNWSL",
    metaDescription:
      "浙江威仕龙塑胶有限公司成立于2010年，专注精密塑料拖链与注塑零部件。70+台海天注塑机、3000+套模具，通过IATF 16949与ISO 9001，工厂位于浙江乐清。",
    title: "关于我们",
    subtitle: "精密塑料拖链与注塑零部件 · 以欧标品质打造国产化替代",
    introTitle: "公司简介",
    introBody: [
      "威仕龙 CNWSL（浙江威仕龙塑胶有限公司，前身为温州市威仕龙塑胶有限公司）成立于 2010 年，始终专注精密塑料拖链系统及高端注塑零部件的研发与制造。公司集模具设计、材料改性、精密注塑与智能制造于一体，工厂位于浙江省温州市乐清市天成街道宁康东路2891号，并设深圳、常州办事处。产品覆盖精密机床拖链、无尘拖链与塑料冷却管等，拖链寿命测试不低于 1500 万次，以欧标品质服务机床、半导体、汽车与自动化等高端场景。",
      "依托乐清精密模具产业基础，威仕龙坚持核心产品模具自主开发，累计获得国家专利授权十余项，模具储备超过 3000 套；生产端配备 70 余台海天注塑机及自动组装线，可快速响应非标尺寸、防静电/阻燃材质与颜色定制，常规及多数定制需求 1–3 天即可生产发货。公司已通过 IATF 16949:2016 与 ISO 9001:2015 认证，产品经 SGS 等机构检测并符合 RoHS 等法规，服务麦格纳、英纳法、广汽、极氪、中航精机等行业客户。",
    ],
    factoryPhotoAlt:
      "浙江威仕龙塑胶有限公司乐清工厂外景，楼面 CNWSL 威仕龙塑胶标识",
    milestonesTitle: "发展历程",
    milestones: [
      {
        year: "2010",
        title: "公司成立",
        description: "温州市威仕龙塑胶有限公司在浙江乐清成立，专注塑料拖链研发与制造。",
      },
      {
        year: "2016",
        title: "产能扩张",
        description:
          "模具库持续扩容，标准型号覆盖主流机床与自动化设备，精密注塑产能稳步提升。",
      },
      {
        year: "2020",
        title: "防尘系列量产",
        description: "全封闭防尘拖链通过多项寿命与工况验证，进入规模化交付。",
      },
      {
        year: "2023",
        title: "认证体系升级",
        description: "完善 SGS、ROHS 等检测与合规流程，强化出口与高端客户服务能力。",
      },
      {
        year: "2026",
        title: "成立常州办事处",
        description:
          "设立常州办事处，就近服务华东客户。温州市威仕龙塑胶有限公司更名为浙江威仕龙塑胶有限公司。",
      },
    ],
    patentsTitle: "专利荣誉",
    patentsBadge: "实用新型专利",
    certsTitle: "资质认证与检测报告",
    certifications: [
      {
        name: "IATF 16949",
        description: "汽车质量管理体系认证，覆盖注塑件与拖链生产。",
      },
      {
        name: "SGS RoHS",
        description: "无尘拖链通过 SGS 有害物质检测，结论符合。",
      },
      {
        name: "PA 321X11 NAT 物性表",
        description: "拖链材料物性参数，便于选型与来料对照。",
      },
      {
        name: "无尘拖链高低温测试",
        description: "无尘拖链高低温环境检测报告，验证洁净室工况适应性。",
      },
      {
        name: "无尘拖链疲劳试验",
        description: "无尘拖链疲劳寿命检测报告，验证往复运行可靠性。",
      },
    ],
  },
  contact: {
    metaTitle: "联系我们 | 威仕龙 CNWSL",
    metaDescription:
      "联系浙江威仕龙塑胶有限公司，获取拖链选型、样册下载与定制方案。",
    title: "联系我们",
    subtitle: "留下需求，我们的工程师将尽快与您对接",
    formTitle: "在线留言",
    formHint: "请填写以下信息，我们会在 1 个工作日内回复。",
    infoTitle: "联系方式",
    factoryPhotoAlt: "威仕龙便携式拖链与工厂产品",
    labels: {
      company: "公司名称",
      phone: "联系电话",
      fax: "传真",
      email: "邮箱",
      factory: "工厂地址",
      shenzhen: "深圳办事处",
      changzhou: "常州办事处",
    },
  },
  form: {
    name: "姓名",
    email: "邮箱",
    phone: "电话",
    company: "公司名称",
    message: "留言内容",
    productModel: "产品型号",
    quantity: "数量",
    subject: "咨询主题",
    submit: "提交留言",
    submitting: "提交中…",
    success: "留言已提交，我们会在 1 个工作日内与您联系。",
    error: "提交失败，请稍后重试或直接致电我们。",
    inquirySubmit: "提交询盘",
    inquirySuccess: "询盘已提交，我们的销售团队将在 1 个工作日内与您联系。",
    inquiryMessage: "询盘内容",
    placeholders: {
      name: "请输入您的姓名",
      email: "name@company.com",
      phone: "请输入联系电话",
      company: "请输入公司名称",
      message: "请描述您的需求或问题",
      productModel: "如：WWC18 / 静音25 系列",
      quantity: "如：10 米 / 50 节",
      subject: "如：产品选型 / 定制方案 / 售后支持",
      inquiryMessage: "请描述您对「{product}」的具体需求，如数量、规格、应用场景等",
    },
  },
  downloads: {
    metaTitle: "下载中心 | 威仕龙 CNWSL",
    metaDescription: "下载威仕龙拖链产品目录与无尘拖链目录。",
    title: "下载中心",
    subtitle: "威仕龙拖链产品目录与无尘拖链目录",
    download: "下载目录",
    catalogSection: "产品目录",
    cleanroomSection: "无尘拖链目录",
  },
  blog: {
    metaTitle: "技术博客 | 威仕龙 CNWSL",
    metaDescription:
      "阅读欧标防尘拖链选型指南、TPU 材料技术与寿命测试等技术文章，获取工业线缆保护实践经验。",
    title: "技术博客",
    subtitle: "分享拖链选型、材料技术与行业实践",
    empty: "暂无文章，请稍后再来。",
    readMore: "阅读全文",
    back: "← 返回博客列表",
    publishedAt: "发布时间",
    author: "作者",
    category: "分类",
    articleCount: "（当前共 {total} 篇文章）",
    prevPage: "上一页",
    nextPage: "下一页",
    pageStatus: "第 {current} / {total} 页",
    draft: "草稿",
    scheduled: "定时",
    paginationLabel: "博客分页",
    notFound: "文章未找到 | 威仕龙 CNWSL",
  },
  news: {
    metaTitle: "新闻展会 | 威仕龙 CNWSL",
    metaDescription:
      "查看威仕龙最新公司新闻与展会活动，了解产能升级、认证进展与行业展会动态。",
    title: "新闻展会",
    subtitle: "公司动态与展会活动，按发布时间统一展示",
    empty: "暂无新闻，请稍后再来。",
    readMore: "查看详情",
    back: "← 返回新闻列表",
    companyNews: "公司新闻",
    expo: "展会活动",
    notFound: "资讯未找到 | 威仕龙 CNWSL",
    videoLabel: "展位视频",
  },
  categories: {
    micro: {
      name: "微型拖链系列",
      description: "内高 5 / 6 / 7 / 10 / 15mm，适用于小型设备与紧凑型自动化线缆保护。",
      intro:
        "微型拖链按内高分为 5、6、7、10、15mm 规格，体积小、重量轻，适合狭小安装空间。常用于小型 CNC、机械手、检测设备与电子装配线。",
      applications: ["小型 CNC", "机械手", "检测设备", "电子装配"],
    },
    medium: {
      name: "中型拖链系列",
      description: "内高大于 15mm、小于 45mm，按内高分为 18 / 20 / 25 / 30 系列。",
      intro:
        "中型拖链覆盖内高大于 15mm、小于 45mm 的主力规格，兼顾填充空间与运行平稳性。适用于 CNC 加工中心、注塑机、激光设备等常规工业场景。",
      applications: ["CNC 加工中心", "注塑机", "激光设备", "自动化产线"],
    },
    heavy: {
      name: "承重拖链系列",
      description: "内高 45mm 及以上，按内高分为 45 / 65 / 80 等承重系列。",
      intro:
        "承重拖链面向内高 45mm 及以上的重载工况，侧板与铰链结构加强，适合龙门加工中心、大型注塑机与长行程设备。",
      applications: ["龙门加工中心", "大型注塑机", "重载产线", "长行程设备"],
    },
    silent: {
      name: "静音拖链系列",
      description: "低噪音静音拖链，覆盖内高 18–45mm，适合洁净车间与高速往复工况。",
      intro:
        "静音拖链系列采用低摩擦铰链与优化链节结构，有效降低高速往复运动中的噪音与振动，延长线缆使用寿命。",
      applications: ["洁净车间", "精密加工", "医疗自动化", "电子装配线"],
    },
    portable: {
      name: "便携式拖链系列",
      description: "轻量化快装结构，便于携带、安装与维护，适用于移动设备与临时布线。",
      intro:
        "便携式拖链采用轻量化链节与快装开合结构，拆装方便、便于携带，适合机械手、移动工位、3D 打印设备及展会临时布线。",
      applications: ["机械手", "移动工位", "3D 打印设备", "展会设备"],
    },
    cleanroom: {
      name: "无尘拖链系列",
      description: "WWC 无尘拖链，低发尘低噪音，适用于半导体、液晶面板与医药洁净室。",
      intro:
        "无尘拖链 WWC 系列专为半导体、液晶面板、医药洁净室等对环境洁净度要求极高的场景设计，低发尘、低噪音，满足 Class 100 及以上洁净等级要求。",
      applications: ["半导体设备", "液晶面板", "医药洁净室", "精密光学"],
    },
  },
};

const en: AppMessages = {
  brand: "CNWSL",
  brandFull: "CNWSL",
  legalName: "Zhejiang CNWSL Cable Drag Chain Co., Ltd.",
  description:
    "CNWSL develops precision plastic cable carriers and injection-molded parts—70+ Haitian presses, 3,000+ molds, IATF 16949 and ISO 9001. Factory in Yueqing with Shenzhen and Changzhou offices.",
  nav: {
    products: "Products",
    solutions: "Solutions",
    about: "About",
    downloads: "Downloads",
    blog: "Blog",
    news: "News",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  language: "Language",
  home: "Home",
  learnMore: "Learn more",
  viewSeries: "View series",
  viewSpecs: "View specs →",
  contactCta: "Contact us →",
  breadcrumb: "Breadcrumb",
  footer: {
    blurb:
      "Integrated R&D, manufacturing and sales—specializing in custom reinforced nylon cable carriers.",
    contact: "Contact",
    phone: "Phone",
    fax: "Fax",
    email: "Email",
    address: "Address:",
    factory: "Yueqing factory",
    shenzhen: "Shenzhen office",
    changzhou: "Changzhou office",
    overseas: "Overseas",
    overseasContact: "Mr. Wang",
    website: "Website",
    miniprogram: "Selection mini program",
    scan: "Scan in WeChat",
    copyright: "All rights reserved",
  },
  addressLines: {
    factory:
      "No. 2891 Ningkang East Road, Tiancheng Subdistrict, Yueqing, Wenzhou, Zhejiang, China",
    shenzhen:
      "No. 128 Shangnan East Road, Shajing Subdistrict, Bao'an District, Shenzhen, China",
    changzhou:
      "Room 306, Tingsong Building, Tianning District, Changzhou, Jiangsu, China",
  },
  homePage: {
    metaTitle: "CNWSL | Zhejiang CNWSL Cable Drag Chain Co., Ltd.",
    metaDescription:
      "CNWSL manufactures plastic cable carriers, cleanroom carriers and cooling tubes. Factory in Yueqing, with Shenzhen and Changzhou offices.",
    ogImageAlt: "CNWSL cleanroom cable carrier in reciprocating motion",
    heroTitle: "European-standard dust-proof cable carriers — localization leader",
    heroSubtitle: "≥15M cycle life tested · 36-month warranty",
    heroCta: "View products",
    trust: [
      { value: "15M+", label: "cycle life" },
      { value: "36", label: "months warranty" },
      { value: "1", label: "MOQ" },
      { value: "3D", label: "CAD models" },
      { value: "Pro", label: "design support" },
      { value: "Free", label: "sample testing" },
    ],
    productsTitle: "Core product series",
    productsSubtitle: "Cable carriers for CNC, molding, cleanroom and automation lines.",
    materialsTitle: "High-performance carrier materials",
    materialsBody:
      "CNWSL materials are engineered specifically for cable carriers and proven in the field. We continually refine this family—including PA 321X11 NAT, PA6+GF30 and TPU—for different duty cycles. Standard CNWSL carriers use PA 321X11 NAT for high tensile strength, low friction and a balance of rigidity and toughness across temperatures. Cleanroom carriers use TPU for low wear and low particle emission. We keep expanding the portfolio and can recommend alternative materials for special applications—contact us to discuss.",
    materialsCta: "Ask about carrier materials",
    partnersTitle: "Partners",
    partnersSubtitle:
      "Trusted by leading 3C, automotive, machine-tool and automation brands through reliable delivery.",
  },
  products: {
    metaTitle: "Plastic Cable Carriers | CNWSL",
    metaDescription:
      "CNWSL plastic cable carriers cover micro, medium, heavy-duty, silent, portable and cleanroom series, selected by 5–80 mm inner height for CNC, molding, semiconductor and automation.",
    title: "Plastic Cable Carriers",
    subtitle:
      "CNWSL carriers are grouped by inner height and duty: micro, medium, heavy-duty, silent, portable and cleanroom. Choose a family, then open a height series for parameters, bend radii and drawings.",
    viewCategory: "Browse series",
    seriesIntro: "Select by inner height × width, then open a detail page for parameters, drawings and inquiries.",
    specsTitle: "Specification table",
    material: "Material",
    openType: "Opening type",
    innerHeight: "Inner height (H)",
    innerWidth: "Inner width (B)",
    bendRadius: "Bend radius",
    downloadPdf: "Download catalog (PDF)",
    inquire: "Request a quote",
    related: "Other sizes in this series",
    noSpecs: "Specification pages for this series are being prepared.",
    backToCategory: "Back to series list",
    features: "Features",
    applications: "Applications",
    faq: "FAQ",
    seriesHeading: "Series",
    tempRange: "Operating temperature",
    specCode: "Model code",
    actions: "Action",
    contactSales: "Contact sales for the full model list →",
    paramsTitle: "Specifications",
    connector: "Connector",
    downloadDrawing: "Download drawing (PDF)",
    bendRadiiTitle: "Available bend radii",
    bendRadiiHint:
      "The same size can be ordered with different bend radii (R). Length and travel can be customized to your duty cycle.",
    codeExample: "Code example",
    note: "Notes",
    radiusCompact: "Compact spaces",
    radiusCommon: "Common choice",
    radiusLong: "Long travel / thick cables",
    imagePending: "Product images coming soon",
    inquiryTitle: "Request a quote",
    inquiryHint:
      "Tell us your machine type, travel and bend-radius needs—we will reply with pricing promptly.",
    codePrefix: "Code",
    specsCount: "{count} specs online →",
    notFound: "Spec not found | CNWSL",
    categoryNotFound: "Category not found | CNWSL",
    productImage: "Product image",
    productNo: "Product ID",
    productSeries: "Series",
    lifespan: "Service life",
    downloadCatalog: "Download catalog (PDF)",
    downloadWord: "Download Word catalog (.docx)",
  },
  solutions: {
    title: "Solutions",
    description:
      "Cable carrier selection and customization for semiconductor cleanrooms, lithium-battery and PV lines, automotive plants, CNC machine tools, laser cutting equipment, and robotics automation.",
    seo: "CNWSL cable carrier (drag chain) solutions for cleanrooms, new-energy lines, automotive manufacturing, machine tools, laser equipment, and industrial robots.",
    cta: "Ask about this application →",
    items: [
      {
        id: "cleanroom",
        title: "Cleanroom / Semiconductor",
        summary:
          "Low dust and low noise for semiconductor and precision electronics cleanroom automation.",
        points: [
          "Enclosed covers reduce particle ingress",
          "Silent hinges for quiet cleanroom operation",
          "Optional antistatic and easy-clean finishes",
        ],
        imageAlt:
          "CNWSL dust-proof cable carriers for semiconductor cleanroom automation cable protection",
      },
      {
        id: "new-energy",
        title: "New energy lines",
        summary:
          "Built for high-speed travel and long strokes on lithium-battery and PV production lines.",
        points: [
          "High cycle life to cut unplanned downtime",
          "Oil and coolant resistance for harsh lines",
          "Multi-cable separators and faster maintenance",
        ],
        imageAlt:
          "CNWSL cable carriers for high-speed reciprocating cable protection on lithium battery lines",
      },
      {
        id: "automotive",
        title: "Automotive manufacturing",
        summary: "Stable carriers for welding, painting and final assembly takt.",
        points: [
          "Heavy-duty and standard series for different loads",
          "Quick-open design shortens changeover time",
          "On-site selection and localization support",
        ],
        imageAlt:
          "CNWSL cable carriers for automotive welding and assembly automation cable protection",
      },
      {
        id: "machine-tool",
        title: "CNC / Machine tools",
        summary:
          "Matched to CNC machining centers and precision machine-tool stroke and coolant duty.",
        points: [
          "Multiple bend radii for stroke and install space",
          "Coolant and oil-mist resistance to extend cable life",
          "Open/closed designs for faster inspection and rewiring",
        ],
        imageAlt:
          "CNWSL cable carriers for CNC machine tools and machining center cable and hose protection",
      },
      {
        id: "laser",
        title: "Laser cutting equipment",
        summary:
          "High-speed axis motion and long-travel routing for laser cutting and sheet-metal machines.",
        points: [
          "Smooth running under high acceleration",
          "Separators reduce cable twist and wear",
          "Custom stroke and interfaces for mainstream laser machines",
        ],
        imageAlt:
          "CNWSL cable carriers for high-speed axis cable protection on laser cutting equipment",
      },
      {
        id: "robotics",
        title: "Robotics / Automation",
        summary:
          "Dynamic cable management for industrial robots, manipulators and flexible automation cells.",
        points: [
          "Lightweight construction lowers added inertia",
          "Suited to multi-axis paths and complex trajectories",
          "Supports mixed air-fluid-power routing and quick change",
        ],
        imageAlt:
          "CNWSL cable carriers for industrial robots and manipulator automation cable protection",
      },
    ],
  },
  about: {
    metaTitle: "About Us | CNWSL",
    metaDescription:
      "Founded in 2010, CNWSL develops precision plastic cable carriers and injection-molded parts. 70+ Haitian presses, 3,000+ molds, IATF 16949 and ISO 9001. Factory in Yueqing, Zhejiang.",
    title: "About Us",
    subtitle:
      "Precision plastic cable carriers and molded parts—European-standard quality for localized replacement.",
    introTitle: "Company profile",
    introBody: [
      "CNWSL (Zhejiang CNWSL Cable Drag Chain Co., Ltd., formerly Wenzhou CNWSL Cable Drag Chain Co., Ltd.) was founded in 2010 and focuses on precision plastic cable-carrier systems and high-end injection-molded parts. We integrate mold design, material compounding, precision molding and smart manufacturing. Our factory is at No. 2891 Ningkang East Road, Tiancheng Subdistrict, Yueqing, Wenzhou, Zhejiang, with offices in Shenzhen and Changzhou. The portfolio covers machine-tool carriers, cleanroom carriers and plastic cooling tubes; life testing starts at no less than 15 million cycles.",
      "Rooted in Yueqing’s mold industry, we develop core molds in-house, hold 10+ national patents and stock more than 3,000 molds. Production runs on 70+ Haitian injection presses with automatic assembly lines—supporting non-standard sizes, anti-static/flame-retardant materials and color options, with most standard and custom orders shipping in 1–3 days. Certified to IATF 16949:2016 and ISO 9001:2015, products are tested via SGS and meet RoHS and related requirements, serving customers such as Magna, Inalfa, GAC, Zeekr and AVIC Precision Machinery.",
    ],
    factoryPhotoAlt:
      "CNWSL Zhejiang factory exterior in Yueqing with CNWSL Cable Drag Chain facade signage",
    milestonesTitle: "Milestones",
    milestones: [
      {
        year: "2010",
        title: "Company founded",
        description:
          "Wenzhou CNWSL Cable Drag Chain Co., Ltd. was established in Yueqing, Zhejiang, focused on cable carrier R&D and manufacturing.",
      },
      {
        year: "2016",
        title: "Capacity expansion",
        description:
          "Mold library expanded; standard models covered mainstream machine tools and automation as precision molding capacity grew.",
      },
      {
        year: "2020",
        title: "Dust-proof series in volume",
        description:
          "Fully enclosed dust-proof carriers passed life and duty validation and entered large-scale delivery.",
      },
      {
        year: "2023",
        title: "Certification upgrade",
        description:
          "SGS, RoHS and related compliance processes strengthened export and premium-customer service.",
      },
      {
        year: "2026",
        title: "Changzhou office opened",
        description:
          "Changzhou office opened to serve East China customers nearby. The company was renamed Zhejiang CNWSL Cable Drag Chain Co., Ltd.",
      },
    ],
    patentsTitle: "Patents & awards",
    patentsBadge: "Utility model patent",
    certsTitle: "Certifications & test reports",
    certifications: [
      {
        name: "IATF 16949",
        description: "Automotive quality management system covering molding and carrier production.",
      },
      {
        name: "SGS RoHS",
        description: "Cleanroom carriers passed SGS hazardous-substance testing with compliant results.",
      },
      {
        name: "PA 321X11 NAT datasheet",
        description: "Material property data for selection and incoming inspection.",
      },
      {
        name: "Cleanroom high/low temperature test",
        description: "Environmental test report verifying cleanroom duty adaptability.",
      },
      {
        name: "Cleanroom fatigue test",
        description: "Fatigue life report verifying reciprocating reliability.",
      },
    ],
  },
  contact: {
    metaTitle: "Contact | CNWSL",
    metaDescription:
      "Contact Zhejiang CNWSL Cable Drag Chain Co., Ltd. for cable carrier selection, catalogs and custom projects.",
    title: "Contact",
    subtitle: "Share your requirements—our engineers will follow up promptly.",
    formTitle: "Online inquiry",
    formHint: "Please fill in the form below. We reply within 1 business day.",
    infoTitle: "Contact details",
    factoryPhotoAlt: "CNWSL portable cable carriers and factory products",
    labels: {
      company: "Company",
      phone: "Phone",
      fax: "Fax",
      email: "Email",
      factory: "Factory",
      shenzhen: "Shenzhen office",
      changzhou: "Changzhou office",
    },
  },
  form: {
    name: "Name",
    email: "Email",
    phone: "Phone",
    company: "Company",
    message: "Message",
    productModel: "Product model",
    quantity: "Quantity",
    subject: "Subject",
    submit: "Submit",
    submitting: "Submitting…",
    success: "Message sent. We will contact you within 1 business day.",
    error: "Submission failed. Please try again later or call us directly.",
    inquirySubmit: "Submit inquiry",
    inquirySuccess:
      "Inquiry sent. Our sales team will contact you within 1 business day.",
    inquiryMessage: "Inquiry details",
    placeholders: {
      name: "Your name",
      email: "name@company.com",
      phone: "Your phone number",
      company: "Company name",
      message: "Describe your requirements or questions",
      productModel: "e.g. WWC18 / Silent 25 series",
      quantity: "e.g. 10 m / 50 links",
      subject: "e.g. Selection / custom project / after-sales",
      inquiryMessage:
        "Describe your needs for “{product}”—quantity, size, application, etc.",
    },
  },
  downloads: {
    metaTitle: "Downloads | CNWSL",
    metaDescription: "Download CNWSL cable carrier and cleanroom catalogs.",
    title: "Downloads",
    subtitle: "CNWSL cable carrier catalog and cleanroom catalog",
    download: "Download catalog",
    catalogSection: "Product catalogs",
    cleanroomSection: "Cleanroom catalogs",
  },
  blog: {
    metaTitle: "Technical Blog | CNWSL",
    metaDescription:
      "Cable carrier selection, TPU materials and life testing notes from CNWSL.",
    title: "Technical Blog",
    subtitle: "Selection guides, materials technology and application practice",
    empty: "No articles yet. Please check back later.",
    readMore: "Read more",
    back: "← Back to blog",
    publishedAt: "Published",
    author: "Author",
    category: "Category",
    articleCount: "({total} articles)",
    prevPage: "Previous",
    nextPage: "Next",
    pageStatus: "Page {current} / {total}",
    draft: "Draft",
    scheduled: "Scheduled",
    paginationLabel: "Blog pagination",
    notFound: "Article not found | CNWSL",
  },
  news: {
    metaTitle: "News & Exhibitions | CNWSL",
    metaDescription:
      "CNWSL company news, capacity updates and exhibition highlights.",
    title: "News & Exhibitions",
    subtitle: "Company updates and exhibition activity, listed by date",
    empty: "No news yet. Please check back later.",
    readMore: "Read more",
    back: "← Back to news",
    companyNews: "Company news",
    expo: "Exhibitions",
    notFound: "News not found | CNWSL",
    videoLabel: "Booth video",
  },
  categories: {
    micro: {
      name: "Micro Cable Carriers",
      description:
        "Inner heights of 5 / 6 / 7 / 10 / 15 mm for compact machines and tight cable routing.",
      intro:
        "Micro carriers are grouped by inner height at 5, 6, 7, 10 and 15 mm. They are compact and light, and suit small CNC machines, robots, inspection equipment and electronics assembly.",
      applications: ["Small CNC", "Robots", "Inspection equipment", "Electronics assembly"],
    },
    medium: {
      name: "Medium Cable Carriers",
      description: "Inner heights above 15 mm and below 45 mm, in 18 / 20 / 25 / 30 series.",
      intro:
        "Medium carriers cover the main industrial sizes between 15 mm and 45 mm inner height. They suit CNC machining centers, injection molding machines and laser equipment.",
      applications: ["CNC machining centers", "Injection molding", "Laser equipment", "Automation lines"],
    },
    heavy: {
      name: "Heavy-Duty Cable Carriers",
      description: "Inner heights of 45 mm and above, in 45 / 65 / 80 series.",
      intro:
        "Heavy-duty carriers start at 45 mm inner height, with reinforced side plates and hinges for gantry machines, large molding presses and long-travel equipment.",
      applications: ["Gantry machining centers", "Large molding machines", "Heavy-duty lines", "Long travel"],
    },
    silent: {
      name: "Silent Cable Carriers",
      description:
        "Low-noise silent carriers from 18–45 mm inner height for clean rooms and high-speed travel.",
      intro:
        "Silent carriers use low-friction hinges and optimized links to cut noise and vibration in high-speed reciprocating motion.",
      applications: ["Clean rooms", "Precision machining", "Medical automation", "Electronics lines"],
    },
    portable: {
      name: "Portable Cable Carriers",
      description: "Lightweight quick-open carriers for mobile equipment and temporary cable routing.",
      intro:
        "Portable carriers use light links and a quick-open design for robots, mobile stations, 3D printers and exhibition wiring.",
      applications: ["Robots", "Mobile workstations", "3D printers", "Exhibition equipment"],
    },
    cleanroom: {
      name: "Cleanroom Cable Carriers",
      description:
        "WWC cleanroom carriers with low dust and low noise for semiconductor and medical rooms.",
      intro:
        "WWC cleanroom carriers are built for semiconductor, LCD and pharmaceutical cleanrooms, with low particle emission and low noise for Class 100 and above.",
      applications: ["Semiconductor equipment", "LCD panels", "Pharma cleanrooms", "Precision optics"],
    },
  },
};

const vi: AppMessages = {
  brand: "CNWSL",
  brandFull: "CNWSL",
  legalName: "Zhejiang CNWSL Cable Drag Chain Co., Ltd.",
  description:
    "CNWSL sản xuất xích dẫn cáp nhựa, xích phòng sạch và ống làm mát. Nhà máy tại Nhạc Thanh (Chiết Giang), có văn phòng Thâm Quyến và Thường Châu.",
  nav: {
    products: "Sản phẩm",
    solutions: "Giải pháp",
    about: "Về chúng tôi",
    downloads: "Tải xuống",
    blog: "Blog kỹ thuật",
    news: "Tin tức & triển lãm",
    contact: "Liên hệ",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
  },
  language: "Ngôn ngữ",
  home: "Trang chủ",
  learnMore: "Tìm hiểu thêm",
  viewSeries: "Xem dòng sản phẩm",
  viewSpecs: "Xem thông số →",
  contactCta: "Liên hệ trực tuyến →",
  breadcrumb: "Đường dẫn điều hướng",
  footer: {
    blurb:
      "Nghiên cứu, sản xuất và kinh doanh tích hợp—chuyên sản xuất xích dẫn cáp nylon gia cường tùy chỉnh.",
    contact: "Liên hệ",
    phone: "Điện thoại",
    fax: "Fax",
    email: "Email",
    address: "Địa chỉ:",
    factory: "Nhà máy Nhạc Thanh",
    shenzhen: "Văn phòng Thâm Quyến",
    changzhou: "Văn phòng Thường Châu",
    overseas: "Hải ngoại",
    overseasContact: "Ông Vương",
    website: "Website",
    miniprogram: "Mini chương trình WeChat chọn mẫu",
    scan: "Quét mã WeChat để vào",
    copyright: "Bản quyền thuộc về",
  },
  addressLines: {
    factory:
      "Số 2891 đường Ninh Khang Đông, phố Thiên Thành, Nhạc Thanh, Ôn Châu, Chiết Giang, Trung Quốc",
    shenzhen:
      "Số 128 đường Thượng Nam Đông, phố Sa Tỉnh, quận Bảo An, Thâm Quyến, Trung Quốc",
    changzhou:
      "Phòng 306, Tòa Tingsong, quận Thiên Ninh, Thường Châu, Giang Tô, Trung Quốc",
  },
  homePage: {
    metaTitle: "CNWSL | Zhejiang CNWSL Cable Drag Chain Co., Ltd.",
    metaDescription:
      "CNWSL sản xuất xích dẫn cáp nhựa, xích phòng sạch và ống làm mát. Nhà máy tại Nhạc Thanh (Chiết Giang), có văn phòng Thâm Quyến và Thường Châu.",
    ogImageAlt: "Xích dẫn cáp phòng sạch CNWSL chuyển động qua lại",
    heroTitle: "Xích dẫn cáp chống bụi chuẩn châu Âu · Đơn vị dẫn đầu thay thế nội địa",
    heroSubtitle: "Tuổi thọ thử nghiệm ≥15 triệu chu kỳ · Bảo hành 36 tháng",
    heroCta: "Xem sản phẩm",
    trust: [
      { value: "15M+", label: "chu kỳ tuổi thọ" },
      { value: "36", label: "tháng bảo hành" },
      { value: "1", label: "đơn hàng tối thiểu" },
      { value: "3D", label: "mô hình CAD" },
      { value: "Kỹ thuật", label: "thiết kế phương án" },
      { value: "Miễn phí", label: "thử mẫu" },
    ],
    productsTitle: "Dòng sản phẩm cốt lõi",
    productsSubtitle:
      "Xích dẫn cáp cho CNC, ép phun, phòng sạch và dây chuyền tự động hóa.",
    materialsTitle: "Vật liệu xích dẫn cáp hiệu suất cao",
    materialsBody:
      "Vật liệu do CNWSL phát triển riêng cho xích dẫn cáp đã được thị trường kiểm chứng. Chúng tôi liên tục cải tiến họ vật liệu này—gồm PA 321X11 NAT, PA6+GF30 và TPU—phù hợp nhiều điều kiện làm việc. Xích tiêu chuẩn CNWSL dùng PA 321X11 NAT: độ bền kéo cao, hệ số ma sát thấp, cân bằng cứng–dẻo trên nhiều nhiệt độ. Xích phòng sạch dùng TPU, ít mài mòn và phát bụi thấp. Chúng tôi tiếp tục mở rộng kho vật liệu và sẵn sàng đề xuất giải pháp cho ứng dụng đặc biệt—vui lòng liên hệ.",
    materialsCta: "Tư vấn vật liệu xích dẫn cáp",
    partnersTitle: "Đối tác",
    partnersSubtitle:
      "Phục vụ thương hiệu hàng đầu 3C, ô tô, máy công cụ và tự động hóa nhờ giao hàng ổn định.",
  },
  products: {
    metaTitle: "Trung tâm xích dẫn cáp nhựa | CNWSL",
    metaDescription:
      "Xích dẫn cáp nhựa CNWSL gồm dòng cỡ nhỏ, cỡ trung, chịu tải, chạy êm, di động và phòng sạch; chọn theo chiều cao trong 5–80 mm cho CNC, ép phun, bán dẫn và tự động hóa.",
    title: "Trung tâm xích dẫn cáp nhựa",
    subtitle:
      "Xích CNWSL được phân theo chiều cao trong và điều kiện làm việc: cỡ nhỏ, cỡ trung, chịu tải, chạy êm, di động và phòng sạch. Chọn nhóm, rồi mở dòng theo chiều cao để xem thông số, bán kính uốn và bản vẽ.",
    viewCategory: "Vào dòng sản phẩm",
    seriesIntro:
      "Chọn theo chiều cao trong × chiều rộng trong, rồi mở trang chi tiết để xem thông số, bản vẽ và gửi yêu cầu báo giá.",
    specsTitle: "Bảng thông số kỹ thuật",
    material: "Vật liệu",
    openType: "Kiểu mở",
    innerHeight: "Chiều cao trong (H)",
    innerWidth: "Chiều rộng trong (B)",
    bendRadius: "Bán kính uốn",
    downloadPdf: "Tải catalogue (PDF)",
    inquire: "Gửi yêu cầu báo giá",
    related: "Các kích thước khác cùng dòng",
    noSpecs: "Trang thông số của dòng này đang được chuẩn bị.",
    backToCategory: "Quay lại danh sách dòng",
    features: "Đặc điểm",
    applications: "Ứng dụng điển hình",
    faq: "Câu hỏi thường gặp",
    seriesHeading: "Dòng sản phẩm",
    tempRange: "Nhiệt độ làm việc",
    specCode: "Mã quy cách",
    actions: "Thao tác",
    contactSales: "Liên hệ bán hàng để nhận danh sách model đầy đủ →",
    paramsTitle: "Thông số kỹ thuật",
    connector: "Mã đầu nối",
    downloadDrawing: "Tải bản vẽ (PDF)",
    bendRadiiTitle: "Bán kính uốn tùy chọn",
    bendRadiiHint:
      "Cùng một kích thước có thể đặt theo các bán kính uốn R khác nhau; chiều dài và hành trình tùy chỉnh theo điều kiện làm việc.",
    codeExample: "Ví dụ mã",
    note: "Ghi chú",
    radiusCompact: "Không gian hẹp",
    radiusCommon: "Quy cách phổ biến",
    radiusLong: "Hành trình dài / cáp dày",
    imagePending: "Hình sản phẩm sắp cập nhật",
    inquiryTitle: "Yêu cầu báo giá",
    inquiryHint:
      "Cho chúng tôi biết loại thiết bị, hành trình và bán kính uốn—chúng tôi sẽ phản hồi báo giá sớm.",
    codePrefix: "Mã",
    specsCount: "{count} quy cách đã lên trang →",
    notFound: "Không tìm thấy quy cách | CNWSL",
    categoryNotFound: "Không tìm thấy danh mục | CNWSL",
    productImage: "Hình sản phẩm",
    productNo: "Mã sản phẩm",
    productSeries: "Dòng sản phẩm",
    lifespan: "Tuổi thọ",
    downloadCatalog: "Tải catalogue (PDF)",
    downloadWord: "Tải catalogue Word (.docx)",
  },
  solutions: {
    title: "Giải pháp",
    description:
      "Lựa chọn và tùy chỉnh xích dẫn cáp cho phòng sạch bán dẫn, dây chuyền pin lithium & PV, sản xuất ô tô, máy CNC, thiết bị cắt laser và robot tự động hóa.",
    seo: "Giải pháp xích dẫn cáp CNWSL cho phòng sạch, năng lượng mới, ô tô, máy công cụ, laser và robot công nghiệp.",
    cta: "Tư vấn giải pháp cho ứng dụng này →",
    items: [
      {
        id: "cleanroom",
        title: "Phòng sạch / Bán dẫn",
        summary:
          "Ít bụi, ít tiếng ồn—phù hợp tự động hóa phòng sạch bán dẫn và điện tử chính xác.",
        points: [
          "Kết cấu kín chống bụi, giảm rủi ro hạt xâm nhập",
          "Bản lề chạy êm giúp vận hành yên tĩnh trong phòng sạch",
          "Tùy chọn bề mặt chống tĩnh điện và dễ làm sạch",
        ],
        imageAlt:
          "Xích dẫn cáp chống bụi CNWSL bảo vệ cáp trên thiết bị tự động hóa phòng sạch bán dẫn",
      },
      {
        id: "new-energy",
        title: "Dây chuyền năng lượng mới",
        summary:
          "Đáp ứng chuyển động qua lại tốc độ cao và hành trình dài trên dây chuyền pin lithium và quang điện.",
        points: [
          "Tuổi thọ chu kỳ cao, giảm dừng máy đột xuất",
          "Chịu dầu và môi chất làm mát trong môi trường khắc nghiệt",
          "Phân vùng nhiều bó cáp và bảo trì nhanh hơn",
        ],
        imageAlt:
          "Xích dẫn cáp CNWSL bảo vệ cáp chuyển động tốc độ cao trên dây chuyền pin lithium",
      },
      {
        id: "automotive",
        title: "Sản xuất ô tô",
        summary: "Ổn định trên hàn, sơn và lắp ráp cuối theo nhịp sản xuất cao.",
        points: [
          "Dòng chịu tải và tiêu chuẩn phù hợp nhiều mức tải",
          "Kết cấu lắp nhanh rút ngắn thời gian đổi dòng và bảo dưỡng",
          "Hỗ trợ chọn mẫu tại hiện trường và đánh giá thay thế nội địa hóa",
        ],
        imageAlt:
          "Xích dẫn cáp CNWSL bảo vệ cáp trên dây chuyền hàn và lắp ráp ô tô tự động",
      },
      {
        id: "machine-tool",
        title: "Máy CNC / Máy công cụ",
        summary:
          "Phù hợp hành trình và môi trường dung dịch làm mát của trung tâm gia công CNC và máy chính xác.",
        points: [
          "Nhiều bán kính uốn phù hợp hành trình và không gian lắp",
          "Chịu dung dịch cắt và sương dầu, kéo dài tuổi thọ cáp",
          "Kết cấu mở/đóng tiện kiểm tra và bổ sung bó cáp",
        ],
        imageAlt:
          "Xích dẫn cáp CNWSL bảo vệ cáp và ống trên máy CNC và trung tâm gia công",
      },
      {
        id: "laser",
        title: "Thiết bị cắt laser",
        summary:
          "Phục vụ chuyển động trục tốc độ cao và hành trình dài trên máy cắt laser và gia công tấm.",
        points: [
          "Vận hành ổn định dưới gia tốc cao",
          "Vách ngăn giảm xoắn và mài mòn cáp",
          "Tùy chỉnh hành trình và đầu nối cho máy laser phổ biến",
        ],
        imageAlt:
          "Xích dẫn cáp CNWSL bảo vệ cáp chuyển động trục tốc độ cao trên máy cắt laser",
      },
      {
        id: "robotics",
        title: "Robot / Tự động hóa",
        summary:
          "Quản lý cáp động cho robot công nghiệp, tay máy và cell tự động hóa linh hoạt.",
        points: [
          "Kết cấu nhẹ giảm quán tính phụ",
          "Thích nghi quỹ đạo đa trục phức tạp",
          "Hỗ trợ đi khí–dịch–điện hỗn hợp và thay nhanh",
        ],
        imageAlt:
          "Xích dẫn cáp CNWSL bảo vệ cáp trên robot công nghiệp và tay máy tự động hóa",
      },
    ],
  },
  about: {
    metaTitle: "Về chúng tôi | CNWSL",
    metaDescription:
      "Thành lập năm 2010, CNWSL chuyên xích dẫn cáp nhựa chính xác và linh kiện ép phun. 70+ máy Haitian, 3000+ khuôn, IATF 16949 và ISO 9001. Nhà máy tại Yueqing.",
    title: "Về chúng tôi",
    subtitle:
      "Xích dẫn cáp nhựa chính xác và linh kiện ép phun—chất lượng châu Âu cho thay thế nội địa hóa.",
    introTitle: "Giới thiệu công ty",
    introBody: [
      "CNWSL (Zhejiang CNWSL Cable Drag Chain Co., Ltd., tiền thân Wenzhou CNWSL Cable Drag Chain Co., Ltd.) thành lập năm 2010, tập trung hệ thống xích dẫn cáp nhựa chính xác và linh kiện ép phun cao cấp. Chúng tôi tích hợp thiết kế khuôn, biến tính vật liệu, ép phun chính xác và sản xuất thông minh. Nhà máy tại số 2891 đường Ningkang Đông, phố Thiên Thành, Yueqing, Ôn Châu, Chiết Giang, kèm văn phòng Thâm Quyến và Thường Châu. Danh mục gồm xích máy công cụ, xích phòng sạch và ống làm mát nhựa; thử tuổi thọ không dưới 15 triệu chu kỳ.",
      "Dựa trên nền công nghiệp khuôn Yueqing, chúng tôi tự phát triển khuôn lõi, sở hữu hơn 10 bằng sáng chế quốc gia và hơn 3000 bộ khuôn. Sản xuất với 70+ máy ép Haitian và dây lắp ráp tự động—hỗ trợ kích thước phi tiêu chuẩn, vật liệu chống tĩnh điện/chống cháy và tùy chọn màu, hầu hết đơn tiêu chuẩn và tùy chỉnh giao trong 1–3 ngày. Chứng nhận IATF 16949:2016 và ISO 9001:2015; sản phẩm kiểm tra qua SGS, đạt RoHS, phục vụ khách hàng như Magna, Inalfa, GAC, Zeekr và AVIC Precision Machinery.",
    ],
    factoryPhotoAlt:
      "Ngoại thất nhà máy CNWSL tại Yueqing, Chiết Giang với biển hiệu CNWSL Cable Drag Chain",
    milestonesTitle: "Lịch sử phát triển",
    milestones: [
      {
        year: "2010",
        title: "Thành lập công ty",
        description:
          "Wenzhou CNWSL Cable Drag Chain Co., Ltd. được thành lập tại Yueqing, Chiết Giang, tập trung R&D và sản xuất xích dẫn cáp.",
      },
      {
        year: "2016",
        title: "Mở rộng năng lực",
        description:
          "Hệ thống ép phun và khuôn hoàn thiện; mẫu chuẩn phủ máy công cụ và tự động hóa phổ biến.",
      },
      {
        year: "2020",
        title: "Sản xuất hàng loạt dòng chống bụi",
        description:
          "Xích kín chống bụi vượt nhiều thử nghiệm tuổi thọ và điều kiện làm việc, bước vào giao hàng quy mô lớn.",
      },
      {
        year: "2023",
        title: "Nâng cấp hệ thống chứng nhận",
        description:
          "Hoàn thiện quy trình SGS, RoHS và tuân thủ, tăng cường xuất khẩu và dịch vụ khách hàng cao cấp.",
      },
      {
        year: "2026",
        title: "Mở văn phòng Thường Châu",
        description:
          "Mở văn phòng Thường Châu để phục vụ khách hàng Hoa Đông gần hơn. Công ty đổi tên thành Zhejiang CNWSL Cable Drag Chain Co., Ltd.",
      },
    ],
    patentsTitle: "Bằng sáng chế & danh hiệu",
    patentsBadge: "Bằng sáng chế kiểu hữu ích",
    certsTitle: "Chứng nhận & báo cáo thử nghiệm",
    certifications: [
      {
        name: "IATF 16949",
        description: "Hệ thống quản lý chất lượng ô tô cho ép phun và sản xuất xích.",
      },
      {
        name: "SGS RoHS",
        description: "Xích phòng sạch đạt kiểm nghiệm chất độc hại SGS với kết luận đạt.",
      },
      {
        name: "Bảng tính chất PA 321X11 NAT",
        description: "Thông số vật liệu phục vụ chọn mẫu và đối chiếu hàng đến.",
      },
      {
        name: "Thử nghiệm nhiệt độ cao/thấp xích phòng sạch",
        description: "Báo cáo môi trường xác nhận thích ứng điều kiện phòng sạch.",
      },
      {
        name: "Thử nghiệm mỏi xích phòng sạch",
        description: "Báo cáo tuổi thọ mỏi xác nhận độ tin cậy chuyển động qua lại.",
      },
    ],
  },
  contact: {
    metaTitle: "Liên hệ | CNWSL",
    metaDescription:
      "Liên hệ Zhejiang CNWSL Cable Drag Chain Co., Ltd. để chọn mẫu xích dẫn cáp, tải catalogue và dự án tùy chỉnh.",
    title: "Liên hệ",
    subtitle: "Để lại nhu cầu—kỹ sư của chúng tôi sẽ phản hồi sớm.",
    formTitle: "Gửi yêu cầu trực tuyến",
    formHint: "Vui lòng điền thông tin bên dưới. Chúng tôi phản hồi trong 1 ngày làm việc.",
    infoTitle: "Thông tin liên hệ",
    factoryPhotoAlt: "Xích dẫn cáp di động CNWSL và sản phẩm nhà máy",
    labels: {
      company: "Công ty",
      phone: "Điện thoại",
      fax: "Fax",
      email: "Email",
      factory: "Nhà máy",
      shenzhen: "Văn phòng Thâm Quyến",
      changzhou: "Văn phòng Thường Châu",
    },
  },
  form: {
    name: "Họ tên",
    email: "Email",
    phone: "Điện thoại",
    company: "Công ty",
    message: "Nội dung",
    productModel: "Mã sản phẩm",
    quantity: "Số lượng",
    subject: "Chủ đề tư vấn",
    submit: "Gửi yêu cầu",
    submitting: "Đang gửi…",
    success: "Đã gửi. Chúng tôi sẽ liên hệ trong 1 ngày làm việc.",
    error: "Gửi thất bại. Vui lòng thử lại sau hoặc gọi trực tiếp cho chúng tôi.",
    inquirySubmit: "Gửi yêu cầu báo giá",
    inquirySuccess:
      "Đã gửi yêu cầu. Đội ngũ bán hàng sẽ liên hệ trong 1 ngày làm việc.",
    inquiryMessage: "Nội dung yêu cầu",
    placeholders: {
      name: "Nhập họ tên của bạn",
      email: "name@company.com",
      phone: "Nhập số điện thoại",
      company: "Nhập tên công ty",
      message: "Mô tả nhu cầu hoặc câu hỏi của bạn",
      productModel: "vd: WWC18 / dòng chạy êm 25",
      quantity: "vd: 10 m / 50 mắt xích",
      subject: "vd: Chọn mẫu / dự án tùy chỉnh / hậu mãi",
      inquiryMessage:
        'Mô tả nhu cầu về "{product}"—số lượng, quy cách, ứng dụng, v.v.',
    },
  },
  downloads: {
    metaTitle: "Tải xuống | CNWSL",
    metaDescription: "Tải catalogue xích dẫn cáp và xích phòng sạch CNWSL.",
    title: "Tải xuống",
    subtitle: "Catalogue xích dẫn cáp và catalogue xích phòng sạch CNWSL",
    download: "Tải catalogue",
    catalogSection: "Catalogue sản phẩm",
    cleanroomSection: "Catalogue phòng sạch",
  },
  blog: {
    metaTitle: "Blog kỹ thuật | CNWSL",
    metaDescription:
      "Hướng dẫn chọn xích dẫn cáp, vật liệu TPU và ghi chú thử nghiệm tuổi thọ từ CNWSL.",
    title: "Blog kỹ thuật",
    subtitle: "Chọn mẫu, công nghệ vật liệu và thực tiễn ứng dụng",
    empty: "Chưa có bài viết. Vui lòng quay lại sau.",
    readMore: "Đọc tiếp",
    back: "← Quay lại danh sách blog",
    publishedAt: "Ngày đăng",
    author: "Tác giả",
    category: "Chuyên mục",
    articleCount: "(hiện có {total} bài)",
    prevPage: "Trang trước",
    nextPage: "Trang sau",
    pageStatus: "Trang {current} / {total}",
    draft: "Nháp",
    scheduled: "Hẹn giờ",
    paginationLabel: "Phân trang blog",
    notFound: "Không tìm thấy bài viết | CNWSL",
  },
  news: {
    metaTitle: "Tin tức & triển lãm | CNWSL",
    metaDescription:
      "Tin công ty CNWSL, cập nhật năng lực và điểm nhấn triển lãm.",
    title: "Tin tức & triển lãm",
    subtitle: "Động thái công ty và hoạt động triển lãm, sắp xếp theo ngày",
    empty: "Chưa có tin. Vui lòng quay lại sau.",
    readMore: "Xem chi tiết",
    back: "← Quay lại danh sách tin",
    companyNews: "Tin công ty",
    expo: "Triển lãm",
    notFound: "Không tìm thấy tin | CNWSL",
    videoLabel: "Video gian hàng",
  },
  categories: {
    micro: {
      name: "Dòng xích dẫn cáp cỡ nhỏ",
      description:
        "Chiều cao trong 5 / 6 / 7 / 10 / 15 mm cho máy nhỏ và đi dây trong không gian hẹp.",
      intro:
        "Xích cỡ nhỏ phân theo chiều cao trong 5, 6, 7, 10 và 15 mm—gọn, nhẹ, phù hợp không gian lắp đặt hẹp. Thường dùng cho CNC nhỏ, robot, thiết bị kiểm tra và lắp ráp điện tử.",
      applications: ["CNC nhỏ", "Robot", "Thiết bị kiểm tra", "Lắp ráp điện tử"],
    },
    medium: {
      name: "Dòng xích dẫn cáp cỡ trung",
      description:
        "Chiều cao trong trên 15 mm và dưới 45 mm, gồm dòng 18 / 20 / 25 / 30.",
      intro:
        "Xích cỡ trung phủ các kích thước công nghiệp chính từ trên 15 mm đến dưới 45 mm chiều cao trong. Phù hợp trung tâm gia công CNC, máy ép phun và thiết bị laser.",
      applications: ["Trung tâm gia công CNC", "Ép phun", "Thiết bị laser", "Dây chuyền tự động"],
    },
    heavy: {
      name: "Dòng xích chịu tải",
      description: "Chiều cao trong từ 45 mm trở lên, gồm dòng 45 / 65 / 80.",
      intro:
        "Xích chịu tải từ chiều cao trong 45 mm trở lên, với tấm bên và bản lề gia cường cho máy cổng, máy ép lớn và thiết bị hành trình dài.",
      applications: ["Máy cổng", "Máy ép lớn", "Dây chuyền tải nặng", "Hành trình dài"],
    },
    silent: {
      name: "Dòng xích dẫn cáp chạy êm",
      description:
        "Xích chạy êm, ít tiếng ồn, chiều cao trong 18–45 mm cho phòng sạch và chuyển động tốc độ cao.",
      intro:
        "Dòng chạy êm dùng bản lề ma sát thấp và mắt xích tối ưu để giảm ồn và rung khi chuyển động qua lại tốc độ cao.",
      applications: ["Phòng sạch", "Gia công chính xác", "Tự động hóa y tế", "Dây chuyền điện tử"],
    },
    portable: {
      name: "Dòng xích di động",
      description:
        "Kết cấu nhẹ, mở nhanh—dễ mang, lắp và bảo trì cho thiết bị di động và đi dây tạm.",
      intro:
        "Xích di động dùng mắt nhẹ và cấu trúc mở nhanh, tháo lắp tiện, phù hợp robot, trạm di động, máy in 3D và đi dây tạm tại triển lãm.",
      applications: ["Robot", "Trạm di động", "Máy in 3D", "Thiết bị triển lãm"],
    },
    cleanroom: {
      name: "Dòng xích phòng sạch",
      description:
        "Xích phòng sạch WWC ít phát bụi, ít tiếng ồn cho bán dẫn và phòng y tế.",
      intro:
        "Dòng WWC thiết kế cho phòng sạch bán dẫn, LCD và dược phẩm—phát hạt thấp, ồn thấp, đáp ứng Class 100 trở lên.",
      applications: ["Thiết bị bán dẫn", "Tấm LCD", "Phòng sạch dược", "Quang học chính xác"],
    },
  },
};

const es: AppMessages = {
  brand: "CNWSL",
  brandFull: "CNWSL",
  legalName: "Zhejiang CNWSL Cable Drag Chain Co., Ltd.",
  description:
    "CNWSL fabrica portacables de plástico, portacables para sala limpia y tubos de refrigeración. Fábrica en Yueqing (Zhejiang), con oficinas en Shenzhen y Changzhou.",
  nav: {
    products: "Productos",
    solutions: "Soluciones",
    about: "Nosotros",
    downloads: "Descargas",
    blog: "Blog técnico",
    news: "Noticias y ferias",
    contact: "Contacto",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  language: "Idioma",
  home: "Inicio",
  learnMore: "Saber más",
  viewSeries: "Ver serie",
  viewSpecs: "Ver especificaciones →",
  contactCta: "Contáctenos →",
  breadcrumb: "Ruta de navegación",
  footer: {
    blurb:
      "I+D, fabricación y venta integradas—especializados en portacables de nylon reforzado a medida.",
    contact: "Contacto",
    phone: "Teléfono",
    fax: "Fax",
    email: "Correo",
    address: "Dirección:",
    factory: "Fábrica de Yueqing",
    shenzhen: "Oficina de Shenzhen",
    changzhou: "Oficina de Changzhou",
    overseas: "Exterior",
    overseasContact: "Sr. Wang",
    website: "Sitio web",
    miniprogram: "Mini programa de selección",
    scan: "Escanee en WeChat",
    copyright: "Todos los derechos reservados",
  },
  addressLines: {
    factory:
      "No. 2891, Ningkang East Road, Tiancheng, Yueqing, Wenzhou, Zhejiang, China",
    shenzhen:
      "No. 128, Shangnan East Road, Shajing, Bao'an, Shenzhen, China",
    changzhou:
      "Oficina 306, edificio Tingsong, distrito Tianning, Changzhou, Jiangsu, China",
  },
  homePage: {
    metaTitle: "CNWSL | Zhejiang CNWSL Cable Drag Chain Co., Ltd.",
    metaDescription:
      "CNWSL fabrica portacables de plástico, portacables para sala limpia y tubos de refrigeración. Fábrica en Yueqing, con oficinas en Shenzhen y Changzhou.",
    ogImageAlt: "Portacables de sala limpia CNWSL en movimiento alternativo",
    heroTitle: "Líder en portacables de norma europea",
    heroSubtitle: "Vida útil ensayada ≥15 millones de ciclos · Garantía de 36 meses",
    heroCta: "Ver productos",
    trust: [
      { value: "15M+", label: "ciclos de vida" },
      { value: "36", label: "meses de garantía" },
      { value: "1", label: "pedido mín." },
      { value: "3D", label: "modelos CAD" },
      { value: "Técnico", label: "diseño de soluciones" },
      { value: "Gratis", label: "prueba de muestras" },
    ],
    productsTitle: "Series principales",
    productsSubtitle:
      "Portacables para CNC, inyección, salas limpias y líneas de automatización.",
    materialsTitle: "Materiales de alto rendimiento para portacables",
    materialsBody:
      "Los materiales CNWSL, desarrollados específicamente para portacables, están validados en el mercado. Mejoramos continuamente esta familia—incluidos PA 321X11 NAT, PA6+GF30 y TPU—para distintos regímenes de trabajo. Los portacables estándar CNWSL usan PA 321X11 NAT: alta resistencia a la tracción, bajo coeficiente de fricción y equilibrio entre rigidez y tenacidad en un amplio rango térmico. Los portacables de sala limpia usan TPU por su bajo desgaste y baja emisión de partículas. Seguimos ampliando el catálogo de materiales y podemos ofrecer alternativas para aplicaciones especiales; consúltenos.",
    materialsCta: "Consultar materiales para portacables",
    partnersTitle: "Socios",
    partnersSubtitle:
      "Al servicio de marcas líderes en 3C, automoción, máquina-herramienta y automatización gracias a entregas estables.",
  },
  products: {
    metaTitle: "Centro de portacables de plástico | CNWSL",
    metaDescription:
      "Los portacables de plástico CNWSL cubren series micro, media, pesada, silenciosa, portátil y sala limpia; selección por altura interior 5–80 mm para CNC, inyección, semiconductores y automatización.",
    title: "Centro de portacables de plástico",
    subtitle:
      "Los portacables CNWSL se agrupan por altura interior y régimen: micro, media, pesada, silenciosa, portátil y sala limpia. Elija la familia y abra la serie por altura para ver parámetros, radios de curvatura y planos.",
    viewCategory: "Entrar en la serie",
    seriesIntro:
      "Seleccione por altura interior × anchura interior y abra la ficha para parámetros, planos y solicitud de oferta.",
    specsTitle: "Tabla de especificaciones",
    material: "Material",
    openType: "Tipo de apertura",
    innerHeight: "Altura interior (H)",
    innerWidth: "Anchura interior (B)",
    bendRadius: "Radio de curvatura",
    downloadPdf: "Descargar catálogo (PDF)",
    inquire: "Solicitar oferta",
    related: "Otros tamaños de la serie",
    noSpecs: "Las páginas de especificaciones de esta serie se están preparando.",
    backToCategory: "Volver al listado de series",
    features: "Características",
    applications: "Aplicaciones",
    faq: "Preguntas frecuentes",
    seriesHeading: "Series",
    tempRange: "Temperatura de trabajo",
    specCode: "Código de modelo",
    actions: "Acción",
    contactSales: "Contacte con ventas para la lista completa de modelos →",
    paramsTitle: "Parámetros",
    connector: "Conector",
    downloadDrawing: "Descargar plano (PDF)",
    bendRadiiTitle: "Radios de curvatura disponibles",
    bendRadiiHint:
      "El mismo tamaño puede pedirse con distintos radios R. Longitud y recorrido se personalizan según el ciclo de trabajo.",
    codeExample: "Ejemplo de código",
    note: "Notas",
    radiusCompact: "Espacios compactos",
    radiusCommon: "Opción habitual",
    radiusLong: "Largo recorrido / cables gruesos",
    imagePending: "Imágenes del producto próximamente",
    inquiryTitle: "Solicitud de oferta",
    inquiryHint:
      "Indíquenos el tipo de máquina, el recorrido y el radio de curvatura; responderemos con precios con prontitud.",
    codePrefix: "Código",
    specsCount: "{count} especificaciones publicadas →",
    notFound: "Especificación no encontrada | CNWSL",
    categoryNotFound: "Categoría no encontrada | CNWSL",
    productImage: "Imagen del producto",
    productNo: "ID de producto",
    productSeries: "Serie",
    lifespan: "Vida útil",
    downloadCatalog: "Descargar catálogo (PDF)",
    downloadWord: "Descargar catálogo Word (.docx)",
  },
  solutions: {
    title: "Soluciones",
    description:
      "Selección y personalización de portacables para salas limpias de semiconductores, líneas de baterías de litio y FV, automoción, máquinas CNC, corte láser y robótica.",
    seo: "Soluciones de portacables CNWSL para salas limpias, nuevas energías, automoción, máquinas-herramienta, láser y robots industriales.",
    cta: "Consultar esta aplicación →",
    items: [
      {
        id: "cleanroom",
        title: "Sala limpia / Semiconductor",
        summary:
          "Baja emisión de polvo y bajo ruido para automatización en salas limpias de semiconductores y electrónica de precisión.",
        points: [
          "Estructura cerrada antipolvo que reduce la entrada de partículas",
          "Bisagras silenciosas para un funcionamiento silencioso en sala limpia",
          "Acabados opcionales antiestáticos y de fácil limpieza",
        ],
        imageAlt:
          "Portacables antipolvo CNWSL para protección de cables en automatización de salas limpias de semiconductores",
      },
      {
        id: "new-energy",
        title: "Líneas de nuevas energías",
        summary:
          "Pensados para carrera a alta velocidad y largos recorridos en líneas de baterías de litio y fotovoltaica.",
        points: [
          "Alta vida útil en ciclos para reducir paradas imprevistas",
          "Resistencia a aceites y refrigerantes en entornos exigentes",
          "Separadores multicable y mantenimiento más rápido",
        ],
        imageAlt:
          "Portacables CNWSL para protección de cables en movimiento de alta velocidad en líneas de baterías de litio",
      },
      {
        id: "automotive",
        title: "Automoción",
        summary:
          "Estabilidad en soldadura, pintura y montaje final con altos ritmos de producción.",
        points: [
          "Series pesadas y estándar según la carga",
          "Apertura rápida que acorta cambios de línea y revisiones",
          "Selección in situ y apoyo a la localización de suministros",
        ],
        imageAlt:
          "Portacables CNWSL para protección de cables en soldadura y montaje automotriz automatizado",
      },
      {
        id: "machine-tool",
        title: "CNC / Máquinas-herramienta",
        summary:
          "Adaptados a centros de mecanizado CNC y máquinas de precisión con refrigerante y carrera continua.",
        points: [
          "Varios radios de curvatura según carrera y espacio de montaje",
          "Resistencia a refrigerantes y neblina de aceite para alargar la vida del cable",
          "Diseños abiertos/cerrados para inspección y reacondicionamiento rápidos",
        ],
        imageAlt:
          "Portacables CNWSL para protección de cables y mangueras en máquinas CNC y centros de mecanizado",
      },
      {
        id: "laser",
        title: "Equipos de corte láser",
        summary:
          "Movimiento de ejes a alta velocidad y tendido de larga carrera en corte láser y chapa.",
        points: [
          "Funcionamiento suave bajo alta aceleración",
          "Separadores que reducen torsión y desgaste del cable",
          "Carrera e interfaces personalizables para máquinas láser habituales",
        ],
        imageAlt:
          "Portacables CNWSL para protección de cables en ejes de alta velocidad de equipos de corte láser",
      },
      {
        id: "robotics",
        title: "Robótica / Automatización",
        summary:
          "Gestión dinámica de cables para robots industriales, manipuladores y celdas flexibles.",
        points: [
          "Estructura ligera que reduce la inercia añadida",
          "Aptos para trayectorias multieje complejas",
          "Soportan tendido mixto aire-fluido-eléctrico y cambio rápido",
        ],
        imageAlt:
          "Portacables CNWSL para protección de cables en robots industriales y manipuladores de automatización",
      },
    ],
  },
  about: {
    metaTitle: "Nosotros | CNWSL",
    metaDescription:
      "Fundada en 2010, CNWSL desarrolla portacables de plástico de precisión y piezas inyectadas. Más de 70 prensas Haitian, más de 3000 moldes, IATF 16949 e ISO 9001. Fábrica en Yueqing.",
    title: "Nosotros",
    subtitle:
      "Portacables de plástico de precisión y piezas moldeadas: calidad europea para la sustitución localizada.",
    introTitle: "Perfil de la empresa",
    introBody: [
      "CNWSL (Zhejiang CNWSL Cable Drag Chain Co., Ltd., antes Wenzhou CNWSL Cable Drag Chain Co., Ltd.) se fundó en 2010 y se centra en sistemas de portacables de plástico de precisión y piezas inyectadas de alto nivel. Integramos diseño de moldes, modificación de materiales, inyección de precisión y fabricación inteligente. Nuestra fábrica está en el n.º 2891 de Ningkang East Road, Tiancheng, Yueqing, Wenzhou, Zhejiang, con oficinas en Shenzhen y Changzhou. La cartera cubre portacables para máquina-herramienta, portacables de sala limpia y tubos de refrigeración; los ensayos de vida parten de no menos de 15 millones de ciclos.",
      "Con la base industrial de moldes de Yueqing, desarrollamos los moldes clave internamente, contamos con más de 10 patentes nacionales y más de 3000 moldes. La producción opera con más de 70 inyectoras Haitian y líneas de montaje automático—tamaños no estándar, materiales antiestáticos/ignífugos y color, con la mayoría de pedidos estándar y a medida enviados en 1–3 días. Certificados IATF 16949:2016 e ISO 9001:2015; productos ensayados por SGS y conformes a RoHS, al servicio de clientes como Magna, Inalfa, GAC, Zeekr y AVIC Precision Machinery.",
    ],
    factoryPhotoAlt:
      "Exterior de la fábrica CNWSL en Yueqing, Zhejiang, con rótulo CNWSL Cable Drag Chain",
    milestonesTitle: "Hitos",
    milestones: [
      {
        year: "2010",
        title: "Fundación",
        description:
          "Wenzhou CNWSL Cable Drag Chain Co., Ltd. se estableció en Yueqing (Zhejiang), centrada en I+D y fabricación de portacables.",
      },
      {
        year: "2016",
        title: "Ampliación de capacidad",
        description:
          "Se consolidaron la inyección y el utillaje; los modelos estándar cubrieron máquina-herramienta y automatización mainstream.",
      },
      {
        year: "2020",
        title: "Serie antipolvo en volumen",
        description:
          "Los portacables cerrados antipolvo superaron ensayos de vida y régimen y entraron en suministro a gran escala.",
      },
      {
        year: "2023",
        title: "Mejora del sistema de certificación",
        description:
          "Se reforzaron SGS, RoHS y procesos de cumplimiento para exportación y clientes premium.",
      },
      {
        year: "2026",
        title: "Oficina en Changzhou",
        description:
          "Se abrió la oficina de Changzhou para atender de cerca a clientes del este de China. La empresa pasó a llamarse Zhejiang CNWSL Cable Drag Chain Co., Ltd.",
      },
    ],
    patentsTitle: "Patentes y reconocimientos",
    patentsBadge: "Patente de modelo de utilidad",
    certsTitle: "Certificaciones e informes de ensayo",
    certifications: [
      {
        name: "IATF 16949",
        description:
          "Sistema de gestión de calidad de automoción que cubre inyección y producción de portacables.",
      },
      {
        name: "SGS RoHS",
        description:
          "Portacables de sala limpia con ensayo SGS de sustancias peligrosas: resultado conforme.",
      },
      {
        name: "Ficha PA 321X11 NAT",
        description: "Propiedades del material para selección e inspección de entrada.",
      },
      {
        name: "Ensayo térmico alto/bajo (sala limpia)",
        description:
          "Informe ambiental que verifica la aptitud para servicio en sala limpia.",
      },
      {
        name: "Ensayo de fatiga (sala limpia)",
        description:
          "Informe de vida a fatiga que verifica la fiabilidad en movimiento alternativo.",
      },
    ],
  },
  contact: {
    metaTitle: "Contacto | CNWSL",
    metaDescription:
      "Contacte con Zhejiang CNWSL Cable Drag Chain Co., Ltd. para selección de portacables, catálogos y proyectos a medida.",
    title: "Contacto",
    subtitle: "Indíquenos su necesidad; nuestros ingenieros le responderán en breve.",
    formTitle: "Consulta en línea",
    formHint: "Complete el formulario. Respondemos en 1 día laborable.",
    infoTitle: "Datos de contacto",
    factoryPhotoAlt: "Portacables portátiles CNWSL y productos de fábrica",
    labels: {
      company: "Empresa",
      phone: "Teléfono",
      fax: "Fax",
      email: "Correo",
      factory: "Fábrica",
      shenzhen: "Oficina de Shenzhen",
      changzhou: "Oficina de Changzhou",
    },
  },
  form: {
    name: "Nombre",
    email: "Correo",
    phone: "Teléfono",
    company: "Empresa",
    message: "Mensaje",
    productModel: "Modelo de producto",
    quantity: "Cantidad",
    subject: "Asunto",
    submit: "Enviar",
    submitting: "Enviando…",
    success: "Mensaje enviado. Le contactaremos en 1 día laborable.",
    error: "Error al enviar. Inténtelo más tarde o llámenos directamente.",
    inquirySubmit: "Enviar solicitud",
    inquirySuccess:
      "Solicitud enviada. Nuestro equipo comercial le contactará en 1 día laborable.",
    inquiryMessage: "Detalle de la solicitud",
    placeholders: {
      name: "Su nombre",
      email: "name@company.com",
      phone: "Su número de teléfono",
      company: "Nombre de la empresa",
      message: "Describa su necesidad o consulta",
      productModel: "p. ej. WWC18 / serie Silencioso 25",
      quantity: "p. ej. 10 m / 50 eslabones",
      subject: "p. ej. Selección / proyecto a medida / posventa",
      inquiryMessage:
        "Describa sus necesidades de «{product}»: cantidad, tamaño, aplicación, etc.",
    },
  },
  downloads: {
    metaTitle: "Descargas | CNWSL",
    metaDescription: "Descargue catálogos de portacables y de sala limpia CNWSL.",
    title: "Descargas",
    subtitle: "Catálogo de portacables y catálogo de sala limpia CNWSL",
    download: "Descargar catálogo",
    catalogSection: "Catálogos de producto",
    cleanroomSection: "Catálogos de sala limpia",
  },
  blog: {
    metaTitle: "Blog técnico | CNWSL",
    metaDescription:
      "Selección de portacables, materiales TPU y notas de ensayos de vida útil de CNWSL.",
    title: "Blog técnico",
    subtitle: "Guías de selección, tecnología de materiales y práctica industrial",
    empty: "Aún no hay artículos. Vuelva más tarde.",
    readMore: "Leer más",
    back: "← Volver al blog",
    publishedAt: "Publicado",
    author: "Autor",
    category: "Categoría",
    articleCount: "({total} artículos)",
    prevPage: "Anterior",
    nextPage: "Siguiente",
    pageStatus: "Página {current} / {total}",
    draft: "Borrador",
    scheduled: "Programado",
    paginationLabel: "Paginación del blog",
    notFound: "Artículo no encontrado | CNWSL",
  },
  news: {
    metaTitle: "Noticias y ferias | CNWSL",
    metaDescription:
      "Noticias de empresa CNWSL, actualizaciones de capacidad y destacados de ferias.",
    title: "Noticias y ferias",
    subtitle: "Novedades de la empresa y actividad ferial, ordenadas por fecha",
    empty: "Aún no hay noticias. Vuelva más tarde.",
    readMore: "Ver detalle",
    back: "← Volver a noticias",
    companyNews: "Noticias de la empresa",
    expo: "Ferias",
    notFound: "Noticia no encontrada | CNWSL",
    videoLabel: "Vídeo del stand",
  },
  categories: {
    micro: {
      name: "Portacables micro",
      description:
        "Alturas interiores de 5 / 6 / 7 / 10 / 15 mm para máquinas compactas y guiado de cables en espacios reducidos.",
      intro:
        "Los portacables micro se agrupan por altura interior 5, 6, 7, 10 y 15 mm. Son compactos y ligeros; ideales para CNC pequeños, robots, equipos de inspección y montaje electrónico.",
      applications: ["CNC pequeño", "Robots", "Equipos de inspección", "Montaje electrónico"],
    },
    medium: {
      name: "Portacables medianos",
      description:
        "Alturas interiores superiores a 15 mm e inferiores a 45 mm, en series 18 / 20 / 25 / 30.",
      intro:
        "Los portacables medianos cubren los tamaños industriales principales entre más de 15 mm y menos de 45 mm de altura interior. Aptos para centros de mecanizado CNC, inyectoras y equipos láser.",
      applications: [
        "Centros de mecanizado CNC",
        "Inyección",
        "Equipos láser",
        "Líneas de automatización",
      ],
    },
    heavy: {
      name: "Portacables de carga pesada",
      description: "Alturas interiores de 45 mm o más, en series 45 / 65 / 80.",
      intro:
        "Los portacables de carga pesada parten de 45 mm de altura interior, con laterales y bisagras reforzados para pórticos, grandes inyectoras y equipos de largo recorrido.",
      applications: [
        "Centros de mecanizado de pórtico",
        "Grandes inyectoras",
        "Líneas de carga pesada",
        "Largos recorridos",
      ],
    },
    silent: {
      name: "Portacables silenciosos",
      description:
        "Portacables de bajo ruido, altura interior 18–45 mm, para salas limpias y desplazamientos a alta velocidad.",
      intro:
        "Los portacables silenciosos usan bisagras de baja fricción y eslabones optimizados para reducir ruido y vibración en movimiento alternativo a alta velocidad.",
      applications: [
        "Salas limpias",
        "Mecanizado de precisión",
        "Automatización médica",
        "Líneas electrónicas",
      ],
    },
    portable: {
      name: "Portacables portátiles",
      description:
        "Estructura ligera de apertura rápida para equipos móviles y cableado temporal.",
      intro:
        "Los portacables portátiles emplean eslabones ligeros y apertura rápida; fáciles de montar y transportar, ideales para robots, puestos móviles, impresoras 3D y cableado temporal en ferias.",
      applications: ["Robots", "Puestos móviles", "Impresoras 3D", "Equipos de feria"],
    },
    cleanroom: {
      name: "Portacables de sala limpia",
      description:
        "Portacables WWC de baja emisión y bajo ruido para semiconductores y salas médicas.",
      intro:
        "La serie WWC está pensada para salas limpias de semiconductores, LCD y farmacéutica, con baja emisión de partículas y bajo ruido para Class 100 o superior.",
      applications: [
        "Equipos de semiconductores",
        "Paneles LCD",
        "Salas limpias farmacéuticas",
        "Óptica de precisión",
      ],
    },
  },
};

const it: AppMessages = {
  brand: "CNWSL",
  brandFull: "CNWSL",
  legalName: "Zhejiang CNWSL Cable Drag Chain Co., Ltd.",
  description:
    "CNWSL produce catene portacavi in plastica, catene per cleanroom e tubi di raffreddamento. Stabilimento a Yueqing (Zhejiang), con uffici a Shenzhen e Changzhou.",
  nav: {
    products: "Prodotti",
    solutions: "Soluzioni",
    about: "Chi siamo",
    downloads: "Download",
    blog: "Blog tecnico",
    news: "Notizie e fiere",
    contact: "Contatti",
    openMenu: "Apri menu",
    closeMenu: "Chiudi menu",
  },
  language: "Lingua",
  home: "Home",
  learnMore: "Scopri di più",
  viewSeries: "Vedi serie",
  viewSpecs: "Vedi specifiche →",
  contactCta: "Contattateci →",
  breadcrumb: "Percorso di navigazione",
  footer: {
    blurb:
      "R&S, produzione e vendita integrate—specializzati in catene portacavi in nylon rinforzato su misura.",
    contact: "Contatti",
    phone: "Telefono",
    fax: "Fax",
    email: "Email",
    address: "Indirizzo:",
    factory: "Stabilimento di Yueqing",
    shenzhen: "Ufficio di Shenzhen",
    changzhou: "Ufficio di Changzhou",
    overseas: "Estero",
    overseasContact: "Sig. Wang",
    website: "Sito web",
    miniprogram: "Mini programma di selezione",
    scan: "Scansiona con WeChat",
    copyright: "Tutti i diritti riservati",
  },
  addressLines: {
    factory:
      "No. 2891, Ningkang East Road, Tiancheng, Yueqing, Wenzhou, Zhejiang, Cina",
    shenzhen:
      "No. 128, Shangnan East Road, Shajing, Bao'an, Shenzhen, Cina",
    changzhou:
      "Ufficio 306, edificio Tingsong, distretto Tianning, Changzhou, Jiangsu, Cina",
  },
  homePage: {
    metaTitle: "CNWSL | Zhejiang CNWSL Cable Drag Chain Co., Ltd.",
    metaDescription:
      "CNWSL produce catene portacavi in plastica, catene per cleanroom e tubi di raffreddamento. Stabilimento a Yueqing, con uffici a Shenzhen e Changzhou.",
    ogImageAlt: "Catena portacavi cleanroom CNWSL in movimento alternato",
    heroTitle: "Leader nelle catene portacavi a norma europea",
    heroSubtitle: "Vita utile collaudata ≥15 milioni di cicli · Garanzia 36 mesi",
    heroCta: "Vedi prodotti",
    trust: [
      { value: "15M+", label: "cicli di vita" },
      { value: "36", label: "mesi di garanzia" },
      { value: "1", label: "q.tà min." },
      { value: "3D", label: "modelli CAD" },
      { value: "Tecnico", label: "progettazione soluzioni" },
      { value: "Gratis", label: "test su campioni" },
    ],
    productsTitle: "Serie di prodotto principali",
    productsSubtitle:
      "Catene portacavi per CNC, stampaggio, cleanroom e linee di automazione.",
    materialsTitle: "Materiali ad alte prestazioni per catene portacavi",
    materialsBody:
      "I materiali CNWSL, sviluppati appositamente per le catene portacavi, sono validati sul campo. Continuiamo a migliorare questa famiglia—tra cui PA 321X11 NAT, PA6+GF30 e TPU—per diversi regimi di lavoro. Le catene standard CNWSL usano PA 321X11 NAT: elevata resistenza a trazione, basso coefficiente di attrito ed equilibrio tra rigidità e tenacità su un ampio intervallo termico. Le catene cleanroom usano TPU per bassa usura e bassa emissione di particelle. Stiamo ampliando il portafoglio materiali e possiamo proporre alternative per applicazioni speciali: contattateci.",
    materialsCta: "Richiedi informazioni sui materiali",
    partnersTitle: "Partner",
    partnersSubtitle:
      "Al servizio di brand leader in 3C, automotive, macchine utensili e automazione grazie a consegne affidabili.",
  },
  products: {
    metaTitle: "Centro prodotti catene portacavi in plastica | CNWSL",
    metaDescription:
      "Le catene portacavi CNWSL coprono serie micro, medie, per carichi pesanti, silenziose, portatili e cleanroom; selezione per altezza interna 5–80 mm per CNC, stampaggio, semiconduttori e automazione.",
    title: "Centro prodotti catene portacavi in plastica",
    subtitle:
      "Le catene CNWSL sono raggruppate per altezza interna e regime: micro, medie, per carichi pesanti, silenziose, portatili e cleanroom. Scegliete la famiglia, poi aprite la serie per altezza per parametri, raggi di curvatura e disegni.",
    viewCategory: "Entra nella serie",
    seriesIntro:
      "Selezionate per altezza interna × larghezza interna, poi aprite la scheda per parametri, disegni e richiesta di offerta.",
    specsTitle: "Tabella specifiche",
    material: "Materiale",
    openType: "Tipo di apertura",
    innerHeight: "Altezza interna (H)",
    innerWidth: "Larghezza interna (B)",
    bendRadius: "Raggio di curvatura",
    downloadPdf: "Scarica catalogo (PDF)",
    inquire: "Richiedi un'offerta",
    related: "Altre misure della serie",
    noSpecs: "Le pagine delle specifiche di questa serie sono in preparazione.",
    backToCategory: "Torna all'elenco serie",
    features: "Caratteristiche",
    applications: "Applicazioni",
    faq: "Domande frequenti",
    seriesHeading: "Serie",
    tempRange: "Temperatura di esercizio",
    specCode: "Codice modello",
    actions: "Azione",
    contactSales: "Contattate le vendite per l'elenco completo dei modelli →",
    paramsTitle: "Parametri",
    connector: "Connettore",
    downloadDrawing: "Scarica disegno (PDF)",
    bendRadiiTitle: "Raggi di curvatura disponibili",
    bendRadiiHint:
      "La stessa misura può essere ordinata con diversi raggi R. Lunghezza e corsa sono personalizzabili in base al ciclo di lavoro.",
    codeExample: "Esempio di codice",
    note: "Note",
    radiusCompact: "Spazi compatti",
    radiusCommon: "Scelta comune",
    radiusLong: "Lunga corsa / cavi spessi",
    imagePending: "Immagini prodotto in arrivo",
    inquiryTitle: "Richiesta di offerta",
    inquiryHint:
      "Indicate tipo di macchina, corsa e raggio di curvatura: risponderemo rapidamente con i prezzi.",
    codePrefix: "Codice",
    specsCount: "{count} specifiche online →",
    notFound: "Specifica non trovata | CNWSL",
    categoryNotFound: "Categoria non trovata | CNWSL",
    productImage: "Immagine prodotto",
    productNo: "ID prodotto",
    productSeries: "Serie",
    lifespan: "Vita utile",
    downloadCatalog: "Scarica catalogo (PDF)",
    downloadWord: "Scarica catalogo Word (.docx)",
  },
  solutions: {
    title: "Soluzioni",
    description:
      "Selezione e personalizzazione delle catene portacavi per cleanroom semiconduttori, linee batterie al litio e FV, automotive, macchine CNC, taglio laser e robotica.",
    seo: "Soluzioni catene portacavi CNWSL per cleanroom, nuove energie, automotive, macchine utensili, laser e robot industriali.",
    cta: "Consulta questa applicazione →",
    items: [
      {
        id: "cleanroom",
        title: "Cleanroom / Semiconduttori",
        summary:
          "Bassa emissione di polvere e basso rumore per l'automazione in cleanroom di semiconduttori ed elettronica di precisione.",
        points: [
          "Struttura chiusa antipolvere che riduce l'ingresso di particelle",
          "Cerniere silenziose per un funzionamento quieto in cleanroom",
          "Finiture opzionali antistatiche e facili da pulire",
        ],
        imageAlt:
          "Catene portacavi antipolvere CNWSL per protezione cavi nell'automazione cleanroom semiconduttori",
      },
      {
        id: "new-energy",
        title: "Linee di nuove energie",
        summary:
          "Progettate per corsa ad alta velocità e lunghe corse su linee batterie al litio e fotovoltaico.",
        points: [
          "Elevata vita a cicli per ridurre fermi non pianificati",
          "Resistenza a oli e refrigeranti in ambienti severi",
          "Separatori multicavo e manutenzione più rapida",
        ],
        imageAlt:
          "Catene portacavi CNWSL per protezione cavi ad alta velocità su linee batterie al litio",
      },
      {
        id: "automotive",
        title: "Automotive",
        summary:
          "Stabilità in saldatura, verniciatura e montaggio finale con alti ritmi produttivi.",
        points: [
          "Serie per carichi pesanti e standard per carichi diversi",
          "Apertura rapida che abbrevia cambi linea e interventi",
          "Selezione in loco e supporto alla localizzazione delle forniture",
        ],
        imageAlt:
          "Catene portacavi CNWSL per protezione cavi su linee di saldatura e montaggio automotive",
      },
      {
        id: "machine-tool",
        title: "CNC / Macchine utensili",
        summary:
          "Adatte a centri di lavoro CNC e macchine di precisione con refrigerante e corsa continua.",
        points: [
          "Più raggi di curvatura per corsa e spazio di montaggio",
          "Resistenza a refrigeranti e nebbia d'olio per allungare la vita dei cavi",
          "Aperture aperte/chiuse per ispezione e ricablaggio rapidi",
        ],
        imageAlt:
          "Catene portacavi CNWSL per protezione cavi e tubi su macchine CNC e centri di lavoro",
      },
      {
        id: "laser",
        title: "Attrezzature di taglio laser",
        summary:
          "Movimento degli assi ad alta velocità e posa a lunga corsa su taglio laser e lavorazione lamiera.",
        points: [
          "Funzionamento fluido sotto elevata accelerazione",
          "Separatori che riducono torsione e usura dei cavi",
          "Corsa e interfacce personalizzabili per macchine laser comuni",
        ],
        imageAlt:
          "Catene portacavi CNWSL per protezione cavi sugli assi ad alta velocità di macchine laser",
      },
      {
        id: "robotics",
        title: "Robotica / Automazione",
        summary:
          "Gestione dinamica dei cavi per robot industriali, manipolatori e celle di automazione flessibile.",
        points: [
          "Struttura leggera che riduce l'inerzia aggiuntiva",
          "Adatte a traiettorie multi-asse complesse",
          "Supportano posa mista aria-fluido-elettrica e sostituzione rapida",
        ],
        imageAlt:
          "Catene portacavi CNWSL per protezione cavi su robot industriali e manipolatori di automazione",
      },
    ],
  },
  about: {
    metaTitle: "Chi siamo | CNWSL",
    metaDescription:
      "Fondata nel 2010, CNWSL sviluppa catene portacavi in plastica di precisione e particolari stampati. 70+ presse Haitian, 3000+ stampi, IATF 16949 e ISO 9001. Stabilimento a Yueqing.",
    title: "Chi siamo",
    subtitle:
      "Catene portacavi in plastica di precisione e particolari stampati—qualità europea per la sostituzione localizzata.",
    introTitle: "Profilo aziendale",
    introBody: [
      "CNWSL (Zhejiang CNWSL Cable Drag Chain Co., Ltd., già Wenzhou CNWSL Cable Drag Chain Co., Ltd.) è stata fondata nel 2010 e si concentra su sistemi di catene portacavi in plastica di precisione e particolari stampati a iniezione di fascia alta. Integriamo progettazione stampi, modifica dei materiali, stampaggio di precisione e produzione intelligente. Lo stabilimento è al n. 2891 Ningkang East Road, Tiancheng, Yueqing, Wenzhou, Zhejiang, con uffici a Shenzhen e Changzhou. La gamma comprende catene per macchine utensili, catene cleanroom e tubi di raffreddamento; i test di vita partono da non meno di 15 milioni di cicli.",
      "Radicati nell'industria degli stampi di Yueqing, sviluppiamo internamente gli stampi core, deteniamo oltre 10 brevetti nazionali e più di 3000 stampi. La produzione opera con oltre 70 presse Haitian e linee di assemblaggio automatico—misure non standard, materiali antistatici/flame-retardant e colori, con la maggior parte degli ordini standard e custom spediti in 1–3 giorni. Certificati IATF 16949:2016 e ISO 9001:2015; prodotti testati da SGS e conformi RoHS, al servizio di clienti come Magna, Inalfa, GAC, Zeekr e AVIC Precision Machinery.",
    ],
    factoryPhotoAlt:
      "Esterno dello stabilimento CNWSL a Yueqing, Zhejiang, con insegna CNWSL Cable Drag Chain",
    milestonesTitle: "Tappe",
    milestones: [
      {
        year: "2010",
        title: "Fondazione",
        description:
          "Wenzhou CNWSL Cable Drag Chain Co., Ltd. viene costituita a Yueqing (Zhejiang), focalizzata su R&S e produzione di catene portacavi.",
      },
      {
        year: "2016",
        title: "Espansione della capacità",
        description:
          "Sistemi di stampaggio e utensileria consolidati; i modelli standard coprono macchine utensili e automazione mainstream.",
      },
      {
        year: "2020",
        title: "Serie antipolvere in volume",
        description:
          "Le catene chiuse antipolvere superano prove di vita e di regime ed entrano in fornitura su larga scala.",
      },
      {
        year: "2023",
        title: "Upgrade delle certificazioni",
        description:
          "Processi SGS, RoHS e di conformità rafforzati per export e clienti premium.",
      },
      {
        year: "2026",
        title: "Ufficio di Changzhou",
        description:
          "Apertura dell'ufficio di Changzhou per servire da vicino i clienti della Cina orientale. La società assume il nome Zhejiang CNWSL Cable Drag Chain Co., Ltd.",
      },
    ],
    patentsTitle: "Brevetti e riconoscimenti",
    patentsBadge: "Brevetto di modello di utilità",
    certsTitle: "Certificazioni e rapporti di prova",
    certifications: [
      {
        name: "IATF 16949",
        description:
          "Sistema di gestione qualità automotive che copre stampaggio e produzione di catene.",
      },
      {
        name: "SGS RoHS",
        description:
          "Catene cleanroom con prova SGS sulle sostanze pericolose: esito conforme.",
      },
      {
        name: "Scheda PA 321X11 NAT",
        description: "Proprietà del materiale per selezione e controllo in ingresso.",
      },
      {
        name: "Prova termica alto/basso (cleanroom)",
        description:
          "Rapporto ambientale che verifica l'idoneità al servizio in cleanroom.",
      },
      {
        name: "Prova a fatica (cleanroom)",
        description:
          "Rapporto di vita a fatica che verifica l'affidabilità nel movimento alternato.",
      },
    ],
  },
  contact: {
    metaTitle: "Contatti | CNWSL",
    metaDescription:
      "Contattate Zhejiang CNWSL Cable Drag Chain Co., Ltd. per selezione catene portacavi, cataloghi e progetti su misura.",
    title: "Contatti",
    subtitle: "Indicateci le vostre esigenze: i nostri ingegneri vi risponderanno al più presto.",
    formTitle: "Richiesta online",
    formHint: "Compilate il modulo. Rispondiamo entro 1 giorno lavorativo.",
    infoTitle: "Dati di contatto",
    factoryPhotoAlt: "Catene portacavi portatili CNWSL e prodotti dello stabilimento",
    labels: {
      company: "Azienda",
      phone: "Telefono",
      fax: "Fax",
      email: "Email",
      factory: "Stabilimento",
      shenzhen: "Ufficio di Shenzhen",
      changzhou: "Ufficio di Changzhou",
    },
  },
  form: {
    name: "Nome",
    email: "Email",
    phone: "Telefono",
    company: "Azienda",
    message: "Messaggio",
    productModel: "Modello prodotto",
    quantity: "Quantità",
    subject: "Oggetto",
    submit: "Invia",
    submitting: "Invio in corso…",
    success: "Messaggio inviato. Vi contatteremo entro 1 giorno lavorativo.",
    error: "Invio non riuscito. Riprovate più tardi o chiamateci direttamente.",
    inquirySubmit: "Invia richiesta",
    inquirySuccess:
      "Richiesta inviata. Il team commerciale vi contatterà entro 1 giorno lavorativo.",
    inquiryMessage: "Dettagli della richiesta",
    placeholders: {
      name: "Il vostro nome",
      email: "name@company.com",
      phone: "Il vostro numero di telefono",
      company: "Nome dell'azienda",
      message: "Descrivete le vostre esigenze o domande",
      productModel: "es. WWC18 / serie Silenzioso 25",
      quantity: "es. 10 m / 50 maglie",
      subject: "es. Selezione / progetto su misura / post-vendita",
      inquiryMessage:
        "Descrivete le esigenze per «{product}»: quantità, misura, applicazione, ecc.",
    },
  },
  downloads: {
    metaTitle: "Download | CNWSL",
    metaDescription: "Scaricate i cataloghi catene portacavi e cleanroom CNWSL.",
    title: "Download",
    subtitle: "Catalogo catene portacavi e catalogo cleanroom CNWSL",
    download: "Scarica catalogo",
    catalogSection: "Cataloghi prodotto",
    cleanroomSection: "Cataloghi cleanroom",
  },
  blog: {
    metaTitle: "Blog tecnico | CNWSL",
    metaDescription:
      "Selezione catene portacavi, materiali TPU e note sulle prove di vita utile da CNWSL.",
    title: "Blog tecnico",
    subtitle: "Guide di selezione, tecnologia dei materiali e prassi applicativa",
    empty: "Nessun articolo al momento. Tornate più tardi.",
    readMore: "Leggi di più",
    back: "← Torna al blog",
    publishedAt: "Pubblicato",
    author: "Autore",
    category: "Categoria",
    articleCount: "({total} articoli)",
    prevPage: "Precedente",
    nextPage: "Successiva",
    pageStatus: "Pagina {current} / {total}",
    draft: "Bozza",
    scheduled: "Programmata",
    paginationLabel: "Paginazione blog",
    notFound: "Articolo non trovato | CNWSL",
  },
  news: {
    metaTitle: "Notizie e fiere | CNWSL",
    metaDescription:
      "Notizie aziendali CNWSL, aggiornamenti di capacità e highlight fieristici.",
    title: "Notizie e fiere",
    subtitle: "Aggiornamenti aziendali e attività fieristiche, in ordine di data",
    empty: "Nessuna notizia al momento. Tornate più tardi.",
    readMore: "Vedi dettaglio",
    back: "← Torna alle notizie",
    companyNews: "Notizie aziendali",
    expo: "Fiere",
    notFound: "Notizia non trovata | CNWSL",
    videoLabel: "Video dello stand",
  },
  categories: {
    micro: {
      name: "Catene portacavi micro",
      description:
        "Altezze interne 5 / 6 / 7 / 10 / 15 mm per macchine compatte e percorsi cavi stretti.",
      intro:
        "Le catene micro sono raggruppate per altezza interna 5, 6, 7, 10 e 15 mm. Compatte e leggere, adatte a piccoli CNC, robot, attrezzature di ispezione e assemblaggio elettronico.",
      applications: ["CNC piccoli", "Robot", "Attrezzature di ispezione", "Assemblaggio elettronico"],
    },
    medium: {
      name: "Catene portacavi medie",
      description:
        "Altezze interne sopra 15 mm e sotto 45 mm, nelle serie 18 / 20 / 25 / 30.",
      intro:
        "Le catene medie coprono le misure industriali principali tra oltre 15 mm e sotto 45 mm di altezza interna. Ideali per centri di lavoro CNC, presse a iniezione e attrezzature laser.",
      applications: [
        "Centri di lavoro CNC",
        "Stampaggio a iniezione",
        "Attrezzature laser",
        "Linee di automazione",
      ],
    },
    heavy: {
      name: "Catene portacavi per carichi pesanti",
      description: "Altezze interne da 45 mm in su, nelle serie 45 / 65 / 80.",
      intro:
        "Le catene per carichi pesanti partono da 45 mm di altezza interna, con fianchi e cerniere rinforzati per portali, grandi presse e attrezzature a lunga corsa.",
      applications: [
        "Centri di lavoro a portale",
        "Grandi presse",
        "Linee a carico elevato",
        "Lunghe corse",
      ],
    },
    silent: {
      name: "Catene portacavi silenziose",
      description:
        "Catene a basso rumore, altezza interna 18–45 mm, per cleanroom e spostamenti ad alta velocità.",
      intro:
        "Le catene silenziose usano cerniere a basso attrito e maglie ottimizzate per ridurre rumore e vibrazioni nel movimento alternato ad alta velocità.",
      applications: [
        "Cleanroom",
        "Lavorazioni di precisione",
        "Automazione medicale",
        "Linee elettroniche",
      ],
    },
    portable: {
      name: "Catene portacavi portatili",
      description:
        "Struttura leggera ad apertura rapida per attrezzature mobili e cablaggio temporaneo.",
      intro:
        "Le catene portatili usano maglie leggere e apertura rapida; facili da montare e trasportare, adatte a robot, postazioni mobili, stampanti 3D e cablaggio temporaneo in fiera.",
      applications: ["Robot", "Postazioni mobili", "Stampanti 3D", "Attrezzature fieristiche"],
    },
    cleanroom: {
      name: "Catene portacavi cleanroom",
      description:
        "Catene WWC a bassa emissione e basso rumore per semiconduttori e ambienti medicali.",
      intro:
        "La serie WWC è pensata per cleanroom di semiconduttori, LCD e farmaceutica, con bassa emissione di particelle e basso rumore per Class 100 e superiori.",
      applications: [
        "Attrezzature per semiconduttori",
        "Pannelli LCD",
        "Cleanroom farmaceutiche",
        "Ottica di precisione",
      ],
    },
  },
};

const ru: AppMessages = {
  brand: "CNWSL",
  brandFull: "CNWSL",
  legalName: "Zhejiang CNWSL Cable Drag Chain Co., Ltd.",
  description:
    "CNWSL производит пластиковые кабельные цепи, кабельные цепи для чистых помещений и охлаждающие трубки. Завод в Юэцине (провинция Чжэцзян), офисы в Шэньчжэне и Чанчжоу.",
  nav: {
    products: "Продукция",
    solutions: "Решения",
    about: "О компании",
    downloads: "Загрузки",
    blog: "Блог",
    news: "Новости и выставки",
    contact: "Контакты",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
  },
  language: "Язык",
  home: "Главная",
  learnMore: "Подробнее",
  viewSeries: "Смотреть серию",
  viewSpecs: "Смотреть характеристики →",
  contactCta: "Связаться с нами →",
  breadcrumb: "Навигация",
  footer: {
    blurb:
      "НИОКР, производство и продажи в едином цикле — специализируемся на заказных усиленных нейлоновых кабельных цепях.",
    contact: "Контакты",
    phone: "Телефон",
    fax: "Факс",
    email: "Email",
    address: "Адрес:",
    factory: "Завод в Юэцине",
    shenzhen: "Офис в Шэньчжэне",
    changzhou: "Офис в Чанчжоу",
    overseas: "Зарубежный отдел",
    overseasContact: "г-н Ван",
    website: "Сайт",
    miniprogram: "Мини-программа подбора",
    scan: "Сканируйте в WeChat",
    copyright: "Все права защищены",
  },
  addressLines: {
    factory:
      "№ 2891, ул. Нинкан Дун, р-н Тяньчэн, Юэцин, Вэньчжоу, Чжэцзян, Китай",
    shenzhen:
      "№ 128, ул. Шаннан Дун, р-н Шацзин, район Баоань, Шэньчжэнь, Китай",
    changzhou:
      "Офис 306, здание Тинсун, район Тяньнин, Чанчжоу, Цзянсу, Китай",
  },
  homePage: {
    metaTitle: "CNWSL | Zhejiang CNWSL Cable Drag Chain Co., Ltd.",
    metaDescription:
      "CNWSL производит пластиковые кабельные цепи, кабельные цепи для чистых помещений и охлаждающие трубки. Завод в Юэцине, офисы в Шэньчжэне и Чанчжоу.",
    ogImageAlt: "Кабельная цепь CNWSL для чистых помещений в возвратно-поступательном движении",
    heroTitle: "Лидер кабельных цепей европейского стандарта",
    heroSubtitle: "Ресурс от ≥15 млн циклов · Гарантия 36 месяцев",
    heroCta: "Смотреть продукцию",
    trust: [
      { value: "15M+", label: "циклов ресурса" },
      { value: "36", label: "месяцев гарантии" },
      { value: "1", label: "MOQ" },
      { value: "3D", label: "CAD-модели" },
      { value: "Проект", label: "проектирование" },
      { value: "Бесплатно", label: "испытание образцов" },
    ],
    productsTitle: "Основные серии продукции",
    productsSubtitle: "Кабельные цепи для станков с ЧПУ, литья, чистых помещений и линий автоматизации.",
    materialsTitle: "Высокоэффективные материалы для кабельных цепей",
    materialsBody:
      "Материалы CNWSL разработаны специально для кабельных цепей и проверены в эксплуатации. Мы постоянно совершенствуем эту линейку — включая PA 321X11 NAT, PA6+GF30 и TPU — под разные режимы нагрузки. Стандартные кабельные цепи CNWSL изготавливаются из PA 321X11 NAT: высокая прочность на растяжение, низкое трение и баланс жёсткости и ударной вязкости в широком диапазоне температур. Цепи для чистых помещений — из TPU с низким износом и низкой эмиссией частиц. Мы расширяем портфель материалов и можем рекомендовать альтернативы для особых применений — свяжитесь с нами для обсуждения.",
    materialsCta: "Узнать о материалах кабельных цепей",
    partnersTitle: "Партнёры",
    partnersSubtitle:
      "Нам доверяют ведущие бренды 3C, автомобильной отрасли, станкостроения и автоматизации благодаря надёжным поставкам.",
  },
  products: {
    metaTitle: "Пластиковые кабельные цепи | CNWSL",
    metaDescription:
      "Пластиковые кабельные цепи CNWSL: микро, средние, усиленные, бесшумные, портативные и для чистых помещений — подбор по внутренней высоте 5–80 мм для станков с ЧПУ, литья, полупроводников и автоматизации.",
    title: "Пластиковые кабельные цепи",
    subtitle:
      "Кабельные цепи CNWSL сгруппированы по внутренней высоте и назначению: микро, средние, усиленные, бесшумные, портативные и для чистых помещений. Выберите семейство, затем откройте серию по высоте — параметры, радиусы изгиба и чертежи.",
    viewCategory: "Смотреть серии",
    seriesIntro: "Выберите по внутренней высоте × ширине, затем откройте страницу с параметрами, чертежами и запросом.",
    specsTitle: "Таблица характеристик",
    material: "Материал",
    openType: "Тип открытия",
    innerHeight: "Внутренняя высота (H)",
    innerWidth: "Внутренняя ширина (B)",
    bendRadius: "Радиус изгиба",
    downloadPdf: "Скачать каталог (PDF)",
    inquire: "Запросить коммерческое предложение",
    related: "Другие размеры в этой серии",
    noSpecs: "Страницы характеристик для этой серии готовятся.",
    backToCategory: "К списку серий",
    features: "Особенности",
    applications: "Применения",
    faq: "Частые вопросы",
    seriesHeading: "Серия",
    tempRange: "Рабочая температура",
    specCode: "Код модели",
    actions: "Действие",
    contactSales: "Свяжитесь с отделом продаж за полным списком моделей →",
    paramsTitle: "Характеристики",
    connector: "Соединитель",
    downloadDrawing: "Скачать чертёж (PDF)",
    bendRadiiTitle: "Доступные радиусы изгиба",
    bendRadiiHint:
      "Один и тот же размер можно заказать с разными радиусами изгиба (R). Длина и ход настраиваются под ваш режим работы.",
    codeExample: "Пример кода",
    note: "Примечания",
    radiusCompact: "Компактные пространства",
    radiusCommon: "Типовой выбор",
    radiusLong: "Длинный ход / толстые кабели",
    imagePending: "Изображения продукции скоро появятся",
    inquiryTitle: "Запросить коммерческое предложение",
    inquiryHint:
      "Укажите тип оборудования, ход и требования к радиусу изгиба — мы оперативно ответим с ценой.",
    codePrefix: "Код",
    specsCount: "{count} характеристик онлайн →",
    notFound: "Характеристика не найдена | CNWSL",
    categoryNotFound: "Категория не найдена | CNWSL",
    productImage: "Изображение продукта",
    productNo: "ID продукта",
    productSeries: "Серия",
    lifespan: "Срок службы",
    downloadCatalog: "Скачать каталог (PDF)",
    downloadWord: "Скачать каталог Word (.docx)",
  },
  solutions: {
    title: "Решения",
    description:
      "Подбор и кастомизация кабельных цепей для чистых помещений полупроводниковой отрасли, линий литиевых батарей и фотовольтаики, автомобильных заводов, станков с ЧПУ, лазерного оборудования и робототехники.",
    seo: "Решения CNWSL по кабельным цепям (кабелеукладчикам) для чистых помещений, линий новой энергетики, автомобильного производства, станков, лазерного оборудования и промышленных роботов.",
    cta: "Спросить об этом применении →",
    items: [
      {
        id: "cleanroom",
        title: "Чистые помещения / Полупроводники",
        summary:
          "Низкая пылевыделяемость и низкий шум для автоматизации чистых помещений в полупроводниковой и прецизионной электронике.",
        points: [
          "Закрытые крышки снижают проникновение частиц",
          "Бесшумные шарниры для тихой работы в чистых помещениях",
          "Опциональные антистатические и легкоочищаемые покрытия",
        ],
        imageAlt:
          "Пылезащитные кабельные цепи CNWSL для защиты кабелей в автоматизации чистых помещений полупроводниковой отрасли",
      },
      {
        id: "new-energy",
        title: "Линии новой энергетики",
        summary:
          "Рассчитаны на высокоскоростной ход и длинные перемещения на линиях литиевых батарей и фотовольтаики.",
        points: [
          "Высокий ресурс циклов снижает внеплановые простои",
          "Стойкость к маслам и СОЖ в тяжёлых условиях",
          "Разделители для нескольких кабелей и ускоренное обслуживание",
        ],
        imageAlt:
          "Кабельные цепи CNWSL для высокоскоростной возвратно-поступательной защиты кабелей на линиях литиевых батарей",
      },
      {
        id: "automotive",
        title: "Автомобильное производство",
        summary: "Стабильные кабельные цепи для сварки, окраски и финальной сборки в такте.",
        points: [
          "Усиленные и стандартные серии под разные нагрузки",
          "Быстрое открытие сокращает время переналадки",
          "Подбор на объекте и поддержка локализации",
        ],
        imageAlt:
          "Кабельные цепи CNWSL для защиты кабелей в автоматизации сварки и сборки автомобилей",
      },
      {
        id: "machine-tool",
        title: "ЧПУ / Станки",
        summary:
          "Соответствуют ходу и режимам СОЖ обрабатывающих центров с ЧПУ и прецизионных станков.",
        points: [
          "Несколько радиусов изгиба под ход и монтажное пространство",
          "Стойкость к СОЖ и масляному туману для продления срока службы кабелей",
          "Открытые/закрытые конструкции для быстрой проверки и перепрокладки",
        ],
        imageAlt:
          "Кабельные цепи CNWSL для защиты кабелей и шлангов станков с ЧПУ и обрабатывающих центров",
      },
      {
        id: "laser",
        title: "Лазерное оборудование",
        summary:
          "Высокоскоростное движение осей и прокладка на длинном ходу для лазерной резки и листовой обработки.",
        points: [
          "Плавный ход при высоких ускорениях",
          "Разделители снижают скручивание и износ кабелей",
          "Индивидуальный ход и интерфейсы для основных лазерных станков",
        ],
        imageAlt:
          "Кабельные цепи CNWSL для высокоскоростной защиты кабелей осей лазерного оборудования",
      },
      {
        id: "robotics",
        title: "Робототехника / Автоматизация",
        summary:
          "Динамическое управление кабелями для промышленных роботов, манипуляторов и гибких ячеек автоматизации.",
        points: [
          "Лёгкая конструкция снижает добавленную инерцию",
          "Подходит для многоосных траекторий и сложных путей",
          "Поддержка смешанной прокладки воздух–жидкость–энергия и быстрой смены",
        ],
        imageAlt:
          "Кабельные цепи CNWSL для защиты кабелей промышленных роботов и манипуляторов",
      },
    ],
  },
  about: {
    metaTitle: "О компании | CNWSL",
    metaDescription:
      "Основана в 2010 году: CNWSL разрабатывает прецизионные пластиковые кабельные цепи и литьевые детали. 70+ термопластавтоматов Haitian, 3000+ пресс-форм, IATF 16949 и ISO 9001. Завод в Юэцине.",
    title: "О компании",
    subtitle:
      "Прецизионные пластиковые кабельные цепи и литьё — качество европейского стандарта для локальной замены.",
    introTitle: "Профиль компании",
    introBody: [
      "CNWSL (Zhejiang CNWSL Cable Drag Chain Co., Ltd., ранее Wenzhou CNWSL Cable Drag Chain Co., Ltd.) основана в 2010 году и специализируется на прецизионных системах пластиковых кабельных цепей и высококлассных литьевых деталях. Мы объединяем проектирование пресс-форм, модификацию материалов, прецизионное литьё и интеллектуальное производство. Завод — по адресу No. 2891 Ningkang East Road, Tiancheng Subdistrict, Yueqing, Wenzhou, Zhejiang; офисы — в Шэньчжэне и Чанчжоу. Ассортимент включает цепи для станков, цепи для чистых помещений и пластиковые охлаждающие трубки; ресурсные испытания — не менее 15 млн циклов.",
      "Опираясь на пресс-форменную промышленность Юэцина, мы самостоятельно разрабатываем ключевые пресс-формы, имеем более 10 национальных патентов и свыше 3000 пресс-форм. Производство — на 70+ термопластавтоматах Haitian с автоматическими сборочными линиями: нестандартные размеры, антистатические/огнестойкие материалы и цвет; большинство стандартных и заказных партий отгружается за 1–3 дня. Сертификаты IATF 16949:2016 и ISO 9001:2015; продукция проходит испытания SGS и соответствует RoHS. Среди клиентов — Magna, Inalfa, GAC, Zeekr и AVIC Precision Machinery.",
    ],
    factoryPhotoAlt:
      "Внешний вид завода CNWSL в Юэцине с вывеской CNWSL Cable Drag Chain",
    milestonesTitle: "Вехи",
    milestones: [
      {
        year: "2010",
        title: "Основание компании",
        description:
          "Wenzhou CNWSL Cable Drag Chain Co., Ltd. учреждена в Юэцине (Чжэцзян) с фокусом на НИОКР и производство кабельных цепей.",
      },
      {
        year: "2016",
        title: "Расширение мощностей",
        description:
          "Системы литья и оснастки достигли зрелости; стандартные модели покрыли основные станки и автоматизацию.",
      },
      {
        year: "2020",
        title: "Пылезащитная серия в серию",
        description:
          "Полностью закрытые пылезащитные кабельные цепи прошли ресурсные испытания и вышли на крупносерийные поставки.",
      },
      {
        year: "2023",
        title: "Обновление сертификации",
        description:
          "Процессы соответствия SGS, RoHS и смежным требованиям усилили экспорт и сервис для премиальных клиентов.",
      },
      {
        year: "2026",
        title: "Открытие офиса в Чанчжоу",
        description:
          "Открыт офис в Чанчжоу для обслуживания клиентов Восточного Китая. Компания переименована в Zhejiang CNWSL Cable Drag Chain Co., Ltd.",
      },
    ],
    patentsTitle: "Патенты и награды",
    patentsBadge: "Патент на полезную модель",
    certsTitle: "Сертификаты и протоколы испытаний",
    certifications: [
      {
        name: "IATF 16949",
        description: "Система менеджмента качества автомобильной отрасли, охватывающая литьё и производство кабельных цепей.",
      },
      {
        name: "SGS RoHS",
        description: "Кабельные цепи для чистых помещений прошли испытания SGS на опасные вещества с соответствующими результатами.",
      },
      {
        name: "PA 321X11 NAT datasheet",
        description: "Данные о свойствах материала для подбора и входного контроля.",
      },
      {
        name: "Испытание чистых помещений на высокие/низкие температуры",
        description: "Протокол климатических испытаний, подтверждающий пригодность к режимам чистых помещений.",
      },
      {
        name: "Усталостные испытания для чистых помещений",
        description: "Протокол усталостного ресурса, подтверждающий надёжность возвратно-поступательного режима.",
      },
    ],
  },
  contact: {
    metaTitle: "Контакты | CNWSL",
    metaDescription:
      "Свяжитесь с Zhejiang CNWSL Cable Drag Chain Co., Ltd. по вопросам подбора кабельных цепей, каталогов и индивидуальных проектов.",
    title: "Контакты",
    subtitle: "Опишите ваши требования — инженеры оперативно свяжутся с вами.",
    formTitle: "Онлайн-запрос",
    formHint: "Заполните форму ниже. Мы ответим в течение 1 рабочего дня.",
    infoTitle: "Контактные данные",
    factoryPhotoAlt: "Портативные кабельные цепи CNWSL и продукция завода",
    labels: {
      company: "Компания",
      phone: "Телефон",
      fax: "Факс",
      email: "Email",
      factory: "Завод",
      shenzhen: "Офис в Шэньчжэне",
      changzhou: "Офис в Чанчжоу",
    },
  },
  form: {
    name: "Имя",
    email: "Email",
    phone: "Телефон",
    company: "Компания",
    message: "Сообщение",
    productModel: "Модель продукта",
    quantity: "Количество",
    subject: "Тема",
    submit: "Отправить",
    submitting: "Отправка…",
    success: "Сообщение отправлено. Мы свяжемся с вами в течение 1 рабочего дня.",
    error: "Не удалось отправить. Попробуйте позже или позвоните нам напрямую.",
    inquirySubmit: "Отправить запрос",
    inquirySuccess:
      "Запрос отправлен. Отдел продаж свяжется с вами в течение 1 рабочего дня.",
    inquiryMessage: "Детали запроса",
    placeholders: {
      name: "Ваше имя",
      email: "name@company.com",
      phone: "Ваш номер телефона",
      company: "Название компании",
      message: "Опишите ваши требования или вопросы",
      productModel: "напр. WWC18 / бесшумная серия 25",
      quantity: "напр. 10 м / 50 звеньев",
      subject: "напр. подбор / индивидуальный проект / сервис",
      inquiryMessage:
        "Опишите ваши потребности по «{product}» — количество, размер, применение и т. д.",
    },
  },
  downloads: {
    metaTitle: "Загрузки | CNWSL",
    metaDescription: "Скачайте каталоги кабельных цепей CNWSL и каталоги для чистых помещений.",
    title: "Загрузки",
    subtitle: "Каталог кабельных цепей CNWSL и каталог для чистых помещений",
    download: "Скачать каталог",
    catalogSection: "Каталоги продукции",
    cleanroomSection: "Каталоги для чистых помещений",
  },
  blog: {
    metaTitle: "Технический блог | CNWSL",
    metaDescription:
      "Подбор кабельных цепей, материалы TPU и заметки по ресурсным испытаниям от CNWSL.",
    title: "Технический блог",
    subtitle: "Руководства по подбору, материалы и практика применения",
    empty: "Статей пока нет. Загляните позже.",
    readMore: "Читать далее",
    back: "← Назад к блогу",
    publishedAt: "Опубликовано",
    author: "Автор",
    category: "Категория",
    articleCount: "({total} статей)",
    prevPage: "Назад",
    nextPage: "Далее",
    pageStatus: "Страница {current} / {total}",
    draft: "Черновик",
    scheduled: "Запланировано",
    paginationLabel: "Пагинация блога",
    notFound: "Статья не найдена | CNWSL",
  },
  news: {
    metaTitle: "Новости и выставки | CNWSL",
    metaDescription:
      "Новости компании CNWSL, обновления мощностей и обзоры выставок.",
    title: "Новости и выставки",
    subtitle: "Обновления компании и выставочная активность по дате",
    empty: "Новостей пока нет. Загляните позже.",
    readMore: "Читать далее",
    back: "← Назад к новостям",
    companyNews: "Новости компании",
    expo: "Выставки",
    notFound: "Новость не найдена | CNWSL",
    videoLabel: "Видео стенда",
  },
  categories: {
    micro: {
      name: "Микро кабельные цепи",
      description:
        "Внутренние высоты 5 / 6 / 7 / 10 / 15 мм для компактных машин и тесной прокладки кабелей.",
      intro:
        "Микро кабельные цепи сгруппированы по внутренней высоте 5, 6, 7, 10 и 15 мм. Компактны и легки, подходят для малых станков с ЧПУ, роботов, контрольного оборудования и сборки электроники.",
      applications: ["Малые станки с ЧПУ", "Роботы", "Контрольное оборудование", "Сборка электроники"],
    },
    medium: {
      name: "Средние кабельные цепи",
      description: "Внутренние высоты свыше 15 мм и ниже 45 мм, серии 18 / 20 / 25 / 30.",
      intro:
        "Средние кабельные цепи покрывают основные промышленные размеры при внутренней высоте от свыше 15 мм до ниже 45 мм. Подходят для обрабатывающих центров с ЧПУ, термопластавтоматов и лазерного оборудования.",
      applications: ["Обрабатывающие центры с ЧПУ", "Литьё под давлением", "Лазерное оборудование", "Линии автоматизации"],
    },
    heavy: {
      name: "Усиленные кабельные цепи",
      description: "Внутренние высоты от 45 мм и выше, серии 45 / 65 / 80.",
      intro:
        "Усиленные кабельные цепи начинаются с внутренней высоты 45 мм: усиленные боковые пластины и шарниры для портальных станков, крупных литьевых прессов и оборудования с длинным ходом.",
      applications: ["Портальные обрабатывающие центры", "Крупные литьевые машины", "Линии для тяжёлых нагрузок", "Длинный ход"],
    },
    silent: {
      name: "Бесшумные кабельные цепи",
      description:
        "Низкошумные кабельные цепи с внутренней высотой 18–45 мм для чистых помещений и высокоскоростного хода.",
      intro:
        "Бесшумные кабельные цепи используют шарниры с низким трением и оптимизированные звенья для снижения шума и вибрации при высокоскоростном возвратно-поступательном движении.",
      applications: ["Чистые помещения", "Прецизионная обработка", "Медицинская автоматизация", "Электронные линии"],
    },
    portable: {
      name: "Портативные кабельные цепи",
      description: "Лёгкие быстрооткрывающиеся кабельные цепи для мобильного оборудования и временной прокладки кабелей.",
      intro:
        "Портативные кабельные цепи — лёгкие звенья и быстрое открытие для роботов, мобильных станций, 3D-принтеров и выставочной проводки.",
      applications: ["Роботы", "Мобильные рабочие станции", "3D-принтеры", "Выставочное оборудование"],
    },
    cleanroom: {
      name: "Кабельные цепи для чистых помещений",
      description:
        "Кабельные цепи WWC для чистых помещений с низким пылевыделением и низким шумом для полупроводниковых и медицинских помещений.",
      intro:
        "Кабельные цепи WWC для чистых помещений рассчитаны на полупроводниковые, LCD и фармацевтические чистые помещения: низкая эмиссия частиц и низкий шум для Class 100 и выше.",
      applications: ["Полупроводниковое оборудование", "LCD-панели", "Фармацевтические чистые помещения", "Прецизионная оптика"],
    },
  },
};

export const messages: Record<Locale, AppMessages> = {
  zh,
  en,
  vi,
  es,
  it,
  ru,
};

export function getMessages(locale: Locale): AppMessages {
  return messages[locale] ?? messages[defaultLocale];
}

const seriesNameRules: Record<
  Exclude<Locale, "zh">,
  { silent: string; portableSeries: string; series: string }
> = {
  en: { silent: "Silent ", portableSeries: "Portable Series", series: " Series" },
  vi: { silent: "Êm ", portableSeries: "Dòng di động", series: " Dòng" },
  es: { silent: "Silencioso ", portableSeries: "Serie portátil", series: " Serie" },
  it: { silent: "Silenzioso ", portableSeries: "Serie portatile", series: " Serie" },
  ru: { silent: "Бесшумная ", portableSeries: "Портативная серия", series: " серия" },
};

export function localizeSeriesName(name: string, locale: Locale): string {
  if (locale === "zh") return name;
  const rules = seriesNameRules[locale];
  return name
    .replace("静音", rules.silent)
    .replace("便携式系列", rules.portableSeries)
    .replace("系列", rules.series)
    .replace(/\s+/g, " ")
    .trim();
}

