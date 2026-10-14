"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

export type HeroSlide = {
  src: string;
  alt: string;
};

type HeroCarouselProps = {
  slides: HeroSlide[];
  /** 轮播容器 aria-label */
  label: string;
  prevLabel: string;
  nextLabel: string;
  /** 自动切换间隔（毫秒） */
  intervalMs?: number;
  /** 叠在图上的文案（服务端传入，保持 SSR 输出） */
  children: ReactNode;
};

/**
 * 首页主视觉轮播。
 *
 * 设计约束（2026-10-14）：
 * - 图片为主体，文案只做叠加，图上不再放任何装饰。
 * - 🔴 素材是 1920×820（2.34:1）的超宽横图。手机上满屏 `object-cover` 会左右各裁掉约 30%
 *   （390px 视口下只露出中间约 40% 宽）：图2 右上的中文标题、图3 两侧的机器人都会被切掉，
 *   现场反馈为「手机上图没显示完全」。因此 **移动端改为整图完整可见**——
 *   图片区按 16:9 占位，主图 `object-contain` 装下整张横图，底下垫一层同图模糊铺底填掉窄边，
 *   文案随图片排在**下方**；`sm+` 仍为满屏铺满 + `object-top`（banner 关键信息在上半部）。
 * - 节奏（2026-10-14 v2）：自动间隔 4s、淡入淡出 700ms。
 * - 尊重系统「减少动态效果」：命中 prefers-reduced-motion 时**不自动播放**，
 *   淡入淡出也一并关掉，只保留手动切换。
 * - 悬停 / 获得焦点时暂停；左右方向键可切换（需先聚焦本区域）。
 */
export default function HeroCarousel({
  slides,
  label,
  prevLabel,
  nextLabel,
  intervalMs = 4000,
  children,
}: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = slides.length;

  const go = useCallback(
    (next: number) => {
      if (count < 2) return;
      setActive(((next % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % count);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [paused, count, intervalMs]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(active - 1);
      setPaused(true);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(active + 1);
      setPaused(true);
    }
  };

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative isolate overflow-hidden bg-[#05080f] outline-none"
    >
      {/* 图区。移动端是流式网格：按 16:9 占位、整图完整装入（不裁切），文案随后排在图片下方；
          sm+ 恢复 position:absolute 满屏铺满。 */}
      <div className="relative grid sm:absolute sm:inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            aria-hidden={index !== active}
            className={`relative col-start-1 row-start-1 aspect-[16/9] w-full overflow-hidden transition-opacity duration-700 ease-out motion-reduce:transition-none sm:absolute sm:inset-0 sm:aspect-auto ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* 同图模糊铺底，只在移动端：填掉 contain 留出的窄边，避免两侧死黑条 */}
            <div
              aria-hidden="true"
              className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl sm:hidden"
              style={{ backgroundImage: `url(${slide.src})` }}
            />
            {/* 主图：移动端完整显示整张横图；桌面端满屏铺满并顶部对齐 */}
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-contain sm:object-cover sm:object-top"
            />
          </div>
        ))}

        {/* 移动端图片下缘往深色文案区过渡 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#05080f] to-transparent sm:hidden"
        />
      </div>

      {/* 桌面端左下压暗，只为文案可读；移动端文案在图片下方，不压暗图片 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden sm:block"
        style={{
          background:
            "radial-gradient(118% 108% at 0% 100%, rgba(3,7,14,0.90) 0%, rgba(3,7,14,0.48) 44%, rgba(3,7,14,0) 72%), linear-gradient(0deg, rgba(3,7,14,0.55) 0%, rgba(3,7,14,0) 42%)",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col px-4 pb-20 pt-8 sm:min-h-[540px] sm:justify-end sm:px-6 sm:pb-28 sm:pt-32 lg:min-h-[640px] lg:px-8">
        {children}
      </div>

      {count > 1 ? (
        <>
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label={prevLabel}
            className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white/80 backdrop-blur-md transition-colors hover:border-white/40 hover:bg-black/45 hover:text-white sm:inline-flex lg:left-5"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label={nextLabel}
            className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white/80 backdrop-blur-md transition-colors hover:border-white/40 hover:bg-black/45 hover:text-white sm:inline-flex lg:right-5"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div className="absolute bottom-6 left-0 right-0 z-10 mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 sm:justify-end sm:px-6 lg:px-8">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => go(index)}
                aria-label={slide.alt}
                aria-current={index === active}
                className={`h-1 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                  index === active
                    ? "w-9 bg-white"
                    : "w-5 bg-white/35 hover:bg-white/65"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
