import type { Locale } from "./config";
import { defaultLocale } from "./config";

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
};

const catalog: Record<Locale, SearchMessages> = {
  zh: {
    navAria: "搜索产品型号",
    metaTitle: "产品型号库 | 威仕龙 CNWSL",
    metaDescription:
      "按产品型号、内高、内宽精准检索威仕龙拖链规格，快速定位 WSL / WWC 型号参数与详情页。",
    title: "产品型号库",
    subtitle: "专门检索产品型号：支持型号代号、内高 (H)、内宽 (B)",
    queryLabel: "产品型号",
    queryPlaceholder: "例如 WSL27-45-100 或 WWC18",
    innerHeight: "内高 (H)",
    innerWidth: "内宽 (B)",
    allHeights: "全部内高",
    allWidths: "全部内宽",
    search: "搜索",
    reset: "清空",
    results: "找到 {count} 个型号",
    noResults: "未找到匹配型号，请调整型号或内高、内宽条件。",
    category: "系列大类",
    series: "系列",
    viewDetail: "查看详情",
    hint: "提示：可只填型号，或只选内高/内宽；也可组合筛选。",
  },
  en: {
    navAria: "Search product models",
    metaTitle: "Product Model Library | CNWSL",
    metaDescription:
      "Search CNWSL cable carrier models by code, inner height and inner width. Jump to WSL / WWC specs and detail pages.",
    title: "Product model library",
    subtitle: "Search by model code, inner height (H) and inner width (B)",
    queryLabel: "Model code",
    queryPlaceholder: "e.g. WSL27-45-100 or WWC18",
    innerHeight: "Inner height (H)",
    innerWidth: "Inner width (B)",
    allHeights: "All heights",
    allWidths: "All widths",
    search: "Search",
    reset: "Clear",
    results: "{count} models found",
    noResults: "No matching models. Adjust the code, height or width filters.",
    category: "Category",
    series: "Series",
    viewDetail: "View details",
    hint: "Tip: search by code only, by height/width only, or combine filters.",
  },
  vi: {
    navAria: "Tìm mã sản phẩm",
    metaTitle: "Thư viện mã sản phẩm | CNWSL",
    metaDescription:
      "Tìm xích dẫn cáp CNWSL theo mã, chiều cao trong và chiều rộng trong. Đến trang thông số WSL / WWC.",
    title: "Thư viện mã sản phẩm",
    subtitle: "Tìm theo mã model, chiều cao trong (H) và chiều rộng trong (B)",
    queryLabel: "Mã sản phẩm",
    queryPlaceholder: "vd. WSL27-45-100 hoặc WWC18",
    innerHeight: "Chiều cao trong (H)",
    innerWidth: "Chiều rộng trong (B)",
    allHeights: "Mọi chiều cao",
    allWidths: "Mọi chiều rộng",
    search: "Tìm kiếm",
    reset: "Xóa",
    results: "Tìm thấy {count} mã",
    noResults: "Không có mã phù hợp. Hãy chỉnh mã, chiều cao hoặc chiều rộng.",
    category: "Danh mục",
    series: "Dòng",
    viewDetail: "Xem chi tiết",
    hint: "Gợi ý: chỉ nhập mã, chỉ chọn H/B, hoặc kết hợp cả hai.",
  },
  es: {
    navAria: "Buscar modelos de producto",
    metaTitle: "Biblioteca de modelos | CNWSL",
    metaDescription:
      "Busque portacables CNWSL por código, altura interior y anchura interior. Acceda a fichas WSL / WWC.",
    title: "Biblioteca de modelos",
    subtitle: "Búsqueda por código, altura interior (H) y anchura interior (B)",
    queryLabel: "Código de modelo",
    queryPlaceholder: "p. ej. WSL27-45-100 o WWC18",
    innerHeight: "Altura interior (H)",
    innerWidth: "Anchura interior (B)",
    allHeights: "Todas las alturas",
    allWidths: "Todas las anchuras",
    search: "Buscar",
    reset: "Limpiar",
    results: "{count} modelos encontrados",
    noResults: "Sin coincidencias. Ajuste el código, la altura o la anchura.",
    category: "Categoría",
    series: "Serie",
    viewDetail: "Ver detalle",
    hint: "Consejo: busque solo por código, solo por H/B, o combine filtros.",
  },
  it: {
    navAria: "Cerca modelli prodotto",
    metaTitle: "Libreria modelli prodotto | CNWSL",
    metaDescription:
      "Cercate le catene portacavi CNWSL per codice, altezza interna e larghezza interna. Aprite le schede WSL / WWC.",
    title: "Libreria modelli prodotto",
    subtitle: "Ricerca per codice, altezza interna (H) e larghezza interna (B)",
    queryLabel: "Codice modello",
    queryPlaceholder: "es. WSL27-45-100 o WWC18",
    innerHeight: "Altezza interna (H)",
    innerWidth: "Larghezza interna (B)",
    allHeights: "Tutte le altezze",
    allWidths: "Tutte le larghezze",
    search: "Cerca",
    reset: "Cancella",
    results: "{count} modelli trovati",
    noResults: "Nessun modello corrispondente. Modificate codice, altezza o larghezza.",
    category: "Categoria",
    series: "Serie",
    viewDetail: "Vedi dettagli",
    hint: "Suggerimento: cercate solo per codice, solo per H/B, o combinate i filtri.",
  },
  ru: {
    navAria: "Поиск моделей продукции",
    metaTitle: "Библиотека моделей | CNWSL",
    metaDescription:
      "Ищите кабельные цепи CNWSL по коду, внутренней высоте и ширине. Переходите к параметрам WSL / WWC.",
    title: "Библиотека моделей",
    subtitle: "Поиск по коду модели, внутренней высоте (H) и ширине (B)",
    queryLabel: "Код модели",
    queryPlaceholder: "напр. WSL27-45-100 или WWC18",
    innerHeight: "Внутренняя высота (H)",
    innerWidth: "Внутренняя ширина (B)",
    allHeights: "Все высоты",
    allWidths: "Все ширины",
    search: "Искать",
    reset: "Очистить",
    results: "Найдено моделей: {count}",
    noResults: "Совпадений нет. Измените код, высоту или ширину.",
    category: "Категория",
    series: "Серия",
    viewDetail: "Подробнее",
    hint: "Подсказка: можно искать только по коду, только по H/B или комбинировать фильтры.",
  },
};

export function getSearchMessages(locale: Locale): SearchMessages {
  return catalog[locale] ?? catalog[defaultLocale];
}
