"use client";

import { useEffect, useState } from "react";

interface HeroVideoProps {
  src: string;
  poster: string;
}

export default function HeroVideo({ src, poster }: HeroVideoProps) {
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setCanPlay(!media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  if (!canPlay) {
    return null;
  }

  return (
    <video
      className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
