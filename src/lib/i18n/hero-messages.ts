import type { Locale } from "./config";
import { defaultLocale } from "./config";

/**
 * 首页主视觉轮播（hero carousel）文案。
 *
 * 只为「无障碍 / 语义」服务，不参与视觉排版——页面上的可见文字仍是
 * messages.homePage 里的 heroTitle / heroSubtitle / heroCta，本文件不重复它们。
 * alts 与 slides 一一对应（顺序：1 数字线缆概念 → 2 AGV/AMR → 3 智能工厂）。
 */
export type HeroMessages = {
  /** 轮播容器 aria-label */
  label: string;
  /** 上一张按钮 */
  prev: string;
  /** 下一张按钮 */
  next: string;
  /** 每张图的 alt（同时也是指示条的 aria-label） */
  alts: readonly string[];
};

const catalog: Record<Locale, HeroMessages> = {
  zh: {
    label: "首页主视觉",
    prev: "上一张",
    next: "下一张",
    alts: [
      "CNWSL 尼龙拖链——线缆管理数字化示意",
      "智能升降 AGV/AMR 上的高柔性工程塑料拖链",
      "智能工厂产线上的拖链与工业机器人",
    ],
  },
  en: {
    label: "Homepage highlights",
    prev: "Previous slide",
    next: "Next slide",
    alts: [
      "CNWSL nylon cable carrier — digital cable management visual",
      "High-flexibility engineering-plastic cable carrier on a lifting AGV/AMR",
      "Cable carriers and industrial robots on a smart factory line",
    ],
  },
  vi: {
    label: "Hình ảnh nổi bật trang chủ",
    prev: "Ảnh trước",
    next: "Ảnh tiếp theo",
    alts: [
      "Máng cáp nylon CNWSL — hình ảnh quản lý cáp kỹ thuật số",
      "Máng cáp nhựa kỹ thuật độ mềm cao trên AGV/AMR nâng hạ",
      "Máng cáp và robot công nghiệp trên dây chuyền nhà máy thông minh",
    ],
  },
  es: {
    label: "Imágenes destacadas de inicio",
    prev: "Anterior",
    next: "Siguiente",
    alts: [
      "Cadena portacables de nailon CNWSL — gestión digital de cables",
      "Cadena portacables de plástico técnico de alta flexibilidad en un AGV/AMR elevador",
      "Cadenas portacables y robots industriales en una línea de fábrica inteligente",
    ],
  },
  it: {
    label: "Immagini in evidenza della home",
    prev: "Precedente",
    next: "Successiva",
    alts: [
      "Catena portacavi in nylon CNWSL — gestione digitale dei cavi",
      "Catena portacavi in plastica tecnica ad alta flessibilità su AGV/AMR elevatore",
      "Catene portacavi e robot industriali su una linea di fabbrica intelligente",
    ],
  },
  ru: {
    label: "Главные изображения",
    prev: "Предыдущий слайд",
    next: "Следующий слайд",
    alts: [
      "Нейлоновая кабельная цепь CNWSL — визуализация цифрового управления кабелями",
      "Гибкая кабельная цепь из инженерного пластика на подъёмном AGV/AMR",
      "Кабельные цепи и промышленные роботы на линии умного завода",
    ],
  },
};

export function getHeroMessages(locale: Locale): HeroMessages {
  return catalog[locale] ?? catalog[defaultLocale];
}
