# -*- coding: utf-8 -*-
"""Optimize factory / warehouse / exhibition photos to site SEO WebP (1600x1000)."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps

RAW = Path(r"c:\Users\Administrator\Desktop\cnwslchain-website\.tools\raw-factory")
OUT_FACTORY = Path(r"c:\Users\Administrator\Desktop\cnwslchain-website\public\images\factory")
OUT_NEWS = Path(r"c:\Users\Administrator\Desktop\cnwslchain-website\public\images\news")
OUT_FACTORY.mkdir(parents=True, exist_ok=True)
OUT_NEWS.mkdir(parents=True, exist_ok=True)

WIDTH, HEIGHT = 1600, 1000

# All optimized assets stay under /images/factory; selected news aliases below.
STEMS = [
    "warehouse-aisle-stock",
    "warehouse-molds-packaging",
    "injection-molding-aisle",
    "injection-molding-haitian",
    "mold-storage-15x20",
    "injection-workshop-line",
    "assembly-packaging-line",
    "cable-chain-assembly",
    "finished-cable-chains",
    "assembly-workshop-wide",
    "warehouse-boxes-crates",
    "engineering-plastic-materials",
    "expo-booth-overview",
    "expo-product-display",
    "expo-booth-cooling-pipes",
    "expo-booth-cable-chains",
    "expo-booth-3d175",
]

# Map optimized factory stems -> news list cover filenames
NEWS_ALIASES = {
    "engineering-plastic-materials": "eu-certification.webp",
    "expo-booth-overview": "industrial-expo-2026.webp",
    "injection-workshop-line": "capacity-expansion.webp",
    "expo-booth-cable-chains": "seminar-recap.webp",
    "finished-cable-chains": "supply-agreements.webp",
    "expo-product-display": "expo-product-display.webp",
    "expo-booth-3d175": "expo-booth-3d175.webp",
    "expo-booth-cooling-pipes": "expo-booth-cooling-pipes.webp",
    "cable-chain-assembly": "cable-chain-assembly.webp",
    "assembly-workshop-wide": "assembly-workshop-wide.webp",
    "injection-molding-haitian": "injection-molding-haitian.webp",
}


def cover_crop(im: Image.Image, tw: int, th: int) -> Image.Image:
    im = ImageOps.exif_transpose(im).convert("RGB")
    scale = max(tw / im.width, th / im.height)
    nw, nh = int(im.width * scale + 0.5), int(im.height * scale + 0.5)
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - tw) // 2
    top = (nh - th) // 2
    if nh / max(nw, 1) > 1.15:
        top = int((nh - th) * 0.32)
    return im.crop((left, top, left + tw, top + th))


def polish(im: Image.Image) -> Image.Image:
    im = ImageEnhance.Contrast(im).enhance(1.05)
    im = ImageEnhance.Color(im).enhance(1.03)
    im = ImageEnhance.Sharpness(im).enhance(1.12)
    return im


def export(src: Path, dest: Path) -> None:
    im = polish(cover_crop(Image.open(src), WIDTH, HEIGHT))
    im.save(dest, "WEBP", quality=82, method=6)
    print(f"{dest.relative_to(dest.parents[2])}  {dest.stat().st_size:7d}")


def main() -> None:
    for stem in STEMS:
        matches = list(RAW.glob(f"{stem}.*"))
        if not matches:
            print("MISSING raw", stem)
            continue
        dest = OUT_FACTORY / f"{stem}.webp"
        export(matches[0], dest)
        if stem in NEWS_ALIASES:
            alias = OUT_NEWS / NEWS_ALIASES[stem]
            alias.write_bytes(dest.read_bytes())
            print(f"  -> news/{alias.name}")


if __name__ == "__main__":
    main()
