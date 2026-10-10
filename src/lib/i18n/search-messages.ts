import type { Locale } from "./config";
import { defaultLocale } from "./config";

/**
 * 全站检索文案。
 *
 * 历史：本文件最初只备了「产品型号库」单页检索的字段（型号 / 内高 H / 内宽 B），
 * 但从未被任何页面引用（2026-10-10 全仓库 grep 确认无 import）。
 * 同日改造为**全站检索**（产品型号 + 技术文章 + 新闻展会 + 资料下载 + 站内页面），
 * 原字段全部保留向后兼容，新增分组标题与页面标签。
 */
export type SearchMessages = {
  navAria: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  queryLabel: string;
  queryPlaceholder: string;
  innerHeight: string;
  innerWidth: string;
  allHeights: string;
  allWidths: string;
  search: string;
  reset: string;
  results: string;
  noResults: string;
  category: string;
  series: string;
  viewDetail: string;
  hint: string;
  /** ── 2026-10-10 全站检索新增 ── */
  /** 导航/移动菜单里的入口名（放大镜按钮的 aria-label 用 navAria） */
  nav: string;
  groupProducts: string;
  groupBlog: string;
  groupNews: string;
  groupDownloads: string;
  groupPages: string;
  /** 例：「“{query}” 找到 {count} 条结果」 */
  resultsFor: string;
  emptyQuery: string;
  popular: string;
  pageCases: string;
  pageFactory: string;
  pagePrice: string;
  pageGuides: string;
};

const catalog: Record<Locale, SearchMessages> = {
  zh: {
    navAria: "全站检索",
    metaTitle: "检索 | 威仕龙 CNWSL",
    metaDescription:
      "一次检索威仕龙全站内容：产品型号（支持内高 H、内宽 B 与型号代号）、技术文章、新闻展会与资料下载。",
    title: "全站检索",
    subtitle: "输入型号、内高内宽、材质或任意关键词，产品与文章一起找",
    queryLabel: "检索关键词",
    queryPlaceholder: "例如 WSL35-65-100、内高 65、无尘拖链、选型",
    innerHeight: "内高 (H)",
    innerWidth: "内宽 (B)",
    allHeights: "全部内高",
    allWidths: "全部内宽",
    search: "检索",
    reset: "清空",
    results: "找到 {count} 条结果",
    noResults: "没有找到匹配结果。换个关键词，或只输入数字（如 65、100）按内高内宽找型号。",
    category: "系列大类",
    series: "系列",
    viewDetail: "查看详情",
    hint: "提示：可输入型号、纯数字（内高/内宽/弯曲半径），或中文、英文关键词。",
    nav: "检索",
    groupProducts: "产品型号",
    groupBlog: "技术文章",
    groupNews: "新闻展会",
    groupDownloads: "资料下载",
    groupPages: "站内页面",
    resultsFor: "“{query}” 找到 {count} 条结果",
    emptyQuery: "输入型号、内高内宽、材质或关键词开始检索。",
    popular: "试试这些",
    pageCases: "应用案例",
    pageFactory: "工厂实力",
    pagePrice: "价格与报价",
    pageGuides: "选型五步法",
  },
  en: {
    navAria: "Search the whole site",
    metaTitle: "Search | CNWSL",
    metaDescription:
      "Search all CNWSL content at once: product models (by code, inner height H and inner width B), technical articles, news and downloads.",
    title: "Site search",
    subtitle: "Type a model code, dimensions, material or any keyword to find products and articles together",
    queryLabel: "Keyword",
    queryPlaceholder: "e.g. WSL35-65-100, inner height 65, cleanroom, selection",
    innerHeight: "Inner height (H)",
    innerWidth: "Inner width (B)",
    allHeights: "All heights",
    allWidths: "All widths",
    search: "Search",
    reset: "Clear",
    results: "{count} results",
    noResults: "No matches. Try another keyword, or type only numbers (e.g. 65, 100) to find models by inner height and width.",
    category: "Category",
    series: "Series",
    viewDetail: "View details",
    hint: "Tip: enter a model code, plain numbers (inner height / width / bend radius), or keywords in any language.",
    nav: "Search",
    groupProducts: "Product models",
    groupBlog: "Technical articles",
    groupNews: "News & events",
    groupDownloads: "Downloads",
    groupPages: "Pages",
    resultsFor: "{count} results for “{query}”",
    emptyQuery: "Enter a model code, dimensions, material or keyword to start.",
    popular: "Try these",
    pageCases: "Case studies",
    pageFactory: "Factory",
    pagePrice: "Pricing & quotes",
    pageGuides: "Five-step selection",
  },
  vi: {
    navAria: "Tìm kiếm toàn trang",
    metaTitle: "Tìm kiếm | CNWSL",
    metaDescription:
      "Tìm một lần toàn bộ nội dung CNWSL: mã sản phẩm (theo mã, chiều cao trong H, chiều rộng trong B), bài kỹ thuật, tin tức và tài liệu.",
    title: "Tìm kiếm toàn trang",
    subtitle: "Nhập mã model, kích thước, vật liệu hoặc từ khóa để tìm cả sản phẩm lẫn bài viết",
    queryLabel: "Từ khóa",
    queryPlaceholder: "vd. WSL35-65-100, chiều cao trong 65, phòng sạch, chọn mã",
    innerHeight: "Chiều cao trong (H)",
    innerWidth: "Chiều rộng trong (B)",
    allHeights: "Mọi chiều cao",
    allWidths: "Mọi chiều rộng",
    search: "Tìm kiếm",
    reset: "Xóa",
    results: "{count} kết quả",
    noResults: "Không có kết quả. Thử từ khóa khác, hoặc chỉ nhập số (vd. 65, 100) để tìm mã theo H và B.",
    category: "Danh mục",
    series: "Dòng",
    viewDetail: "Xem chi tiết",
    hint: "Gợi ý: nhập mã model, số thuần (H / B / bán kính uốn) hoặc từ khóa bất kỳ ngôn ngữ nào.",
    nav: "Tìm kiếm",
    groupProducts: "Mã sản phẩm",
    groupBlog: "Bài kỹ thuật",
    groupNews: "Tin tức & triển lãm",
    groupDownloads: "Tài liệu",
    groupPages: "Trang",
    resultsFor: "{count} kết quả cho “{query}”",
    emptyQuery: "Nhập mã model, kích thước, vật liệu hoặc từ khóa để bắt đầu.",
    popular: "Thử các mục sau",
    pageCases: "Dự án tiêu biểu",
    pageFactory: "Năng lực nhà máy",
    pagePrice: "Giá & báo giá",
    pageGuides: "Chọn mã 5 bước",
  },
  es: {
    navAria: "Buscar en todo el sitio",
    metaTitle: "Búsqueda | CNWSL",
    metaDescription:
      "Busque de una vez todo el contenido de CNWSL: modelos (por código, altura interior H y anchura interior B), artículos técnicos, noticias y descargas.",
    title: "Búsqueda en el sitio",
    subtitle: "Escriba un código, dimensiones, material o palabra clave para encontrar productos y artículos juntos",
    queryLabel: "Palabra clave",
    queryPlaceholder: "p. ej. WSL35-65-100, altura interior 65, sala limpia, selección",
    innerHeight: "Altura interior (H)",
    innerWidth: "Anchura interior (B)",
    allHeights: "Todas las alturas",
    allWidths: "Todas las anchuras",
    search: "Buscar",
    reset: "Limpiar",
    results: "{count} resultados",
    noResults: "Sin coincidencias. Pruebe otra palabra clave, o escriba solo números (p. ej. 65, 100) para buscar por H y B.",
    category: "Categoría",
    series: "Serie",
    viewDetail: "Ver detalle",
    hint: "Consejo: escriba un código, números sueltos (H / B / radio de curvatura) o palabras clave en cualquier idioma.",
    nav: "Buscar",
    groupProducts: "Modelos",
    groupBlog: "Artículos técnicos",
    groupNews: "Noticias y ferias",
    groupDownloads: "Descargas",
    groupPages: "Páginas",
    resultsFor: "{count} resultados para “{query}”",
    emptyQuery: "Introduzca un código, dimensiones, material o palabra clave para empezar.",
    popular: "Pruebe esto",
    pageCases: "Casos de aplicación",
    pageFactory: "Fábrica",
    pagePrice: "Precios y cotización",
    pageGuides: "Selección en cinco pasos",
  },
  it: {
    navAria: "Cerca in tutto il sito",
    metaTitle: "Ricerca | CNWSL",
    metaDescription:
      "Cercate in una volta tutto il contenuto CNWSL: modelli (per codice, altezza interna H e larghezza interna B), articoli tecnici, news e download.",
    title: "Ricerca nel sito",
    subtitle: "Inserite codice, dimensioni, materiale o parola chiave per trovare insieme prodotti e articoli",
    queryLabel: "Parola chiave",
    queryPlaceholder: "es. WSL35-65-100, altezza interna 65, sala bianca, selezione",
    innerHeight: "Altezza interna (H)",
    innerWidth: "Larghezza interna (B)",
    allHeights: "Tutte le altezze",
    allWidths: "Tutte le larghezze",
    search: "Cerca",
    reset: "Cancella",
    results: "{count} risultati",
    noResults: "Nessun risultato. Provate un'altra parola chiave, oppure digitate solo numeri (es. 65, 100) per cercare per H e B.",
    category: "Categoria",
    series: "Serie",
    viewDetail: "Vedi dettagli",
    hint: "Suggerimento: inserite un codice, numeri puri (H / B / raggio di curvatura) o parole chiave in qualsiasi lingua.",
    nav: "Cerca",
    groupProducts: "Modelli di prodotto",
    groupBlog: "Articoli tecnici",
    groupNews: "News e fiere",
    groupDownloads: "Download",
    groupPages: "Pagine",
    resultsFor: "{count} risultati per “{query}”",
    emptyQuery: "Inserite codice, dimensioni, materiale o parola chiave per iniziare.",
    popular: "Provate questi",
    pageCases: "Casi applicativi",
    pageFactory: "Stabilimento",
    pagePrice: "Prezzi e preventivi",
    pageGuides: "Selezione in cinque passi",
  },
  ru: {
    navAria: "Поиск по всему сайту",
    metaTitle: "Поиск | CNWSL",
    metaDescription:
      "Ищите сразу по всему сайту CNWSL: модели (по коду, внутренней высоте H и ширине B), технические статьи, новости и материалы для скачивания.",
    title: "Поиск по сайту",
    subtitle: "Введите код модели, размеры, материал или ключевое слово — найдём и продукцию, и статьи",
    queryLabel: "Ключевое слово",
    queryPlaceholder: "напр. WSL35-65-100, внутренняя высота 65, чистое помещение, подбор",
    innerHeight: "Внутренняя высота (H)",
    innerWidth: "Внутренняя ширина (B)",
    allHeights: "Все высоты",
    allWidths: "Все ширины",
    search: "Искать",
    reset: "Очистить",
    results: "{count} результатов",
    noResults: "Совпадений нет. Попробуйте другое слово или введите только числа (напр. 65, 100) для поиска по H и B.",
    category: "Категория",
    series: "Серия",
    viewDetail: "Подробнее",
    hint: "Подсказка: можно ввести код, просто числа (H / B / радиус изгиба) или ключевые слова на любом языке.",
    nav: "Поиск",
    groupProducts: "Модели продукции",
    groupBlog: "Технические статьи",
    groupNews: "Новости и выставки",
    groupDownloads: "Материалы",
    groupPages: "Страницы",
    resultsFor: "{count} результатов по запросу «{query}»",
    emptyQuery: "Введите код модели, размеры, материал или ключевое слово.",
    popular: "Попробуйте эти",
    pageCases: "Примеры применения",
    pageFactory: "Производство",
    pagePrice: "Цены и расчёт",
    pageGuides: "Подбор в пять шагов",
  },
};

export function getSearchMessages(locale: Locale): SearchMessages {
  return catalog[locale] ?? catalog[defaultLocale];
}
