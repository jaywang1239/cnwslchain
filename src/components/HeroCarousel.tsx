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
 * - 图片为主体，文案只做左下角叠加，图上不再放任何标题式文字块外的装饰。
 * - 图片一律 `object-cover object-top`——banner 素材的关键信息在画面上半部
 *   （AGV 那页的标题就在顶部），居中裁会把它切掉。
 * - 节奏（2026-10-14 v2）：自动间隔 4s、淡入淡出 700ms——原 6.5s/900ms 偏慢，
 *   图片为主体时切换应该更利落；间隔仍留足扫读一行标题的时间。
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
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          aria-hidden={index !== active}
          className={`absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
      ))}

      {/* 左下压暗，只为文案可读；图片本体不动 */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(118% 108% at 0% 100%, rgba(3,7,14,0.90) 0%, rgba(3,7,14,0.48) 44%, rgba(3,7,14,0) 72%), linear-gradient(0deg, rgba(3,7,14,0.55) 0%, rgba(3,7,14,0) 42%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[420px] max-w-7xl flex-col justify-end px-4 pb-24 pt-28 sm:min-h-[540px] sm:px-6 sm:pb-28 sm:pt-32 lg:min-h-[640px] lg:px-8">
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

          <div className="absolute bottom-6 left-0 right-0 z-10 mx-auto flex max-w-7xl items-center justify-end gap-2 px-4 sm:px-6 lg:px-8">
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
