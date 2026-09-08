# -*- coding: utf-8 -*-
"""Download Whale application photos and export SEO WebP assets."""
from __future__ import annotations

import ssl
import urllib.request
from pathlib import Path

from PIL import Image

UA = {"User-Agent": "Mozilla/5.0"}
CTX = ssl.create_default_context()
OUT = Path(r"c:\Users\Administrator\Desktop\cnwslchain-website\public\images\solutions")
RAW = OUT / "_raw"
OUT.mkdir(parents=True, exist_ok=True)
RAW.mkdir(parents=True, exist_ok=True)

# Whale application gallery order on classid=18
SOURCES = {
    "automation": "https://www.whale-itech.com/file/p/20240827/202408271015586332.jpg",
    "machine-tool": "https://www.whale-itech.com/file/p/20240827/202408271018587816.jpg",
    "new-energy": "https://www.whale-itech.com/file/p/20240827/202408271017595180.jpg",
    "laser": "https://www.whale-itech.com/file/p/20240827/202408271018166375.jpg",
    "robotics": "https://www.whale-itech.com/file/p/20240827/202408271018381243.jpg",
    "cleanroom": "https://www.whale-itech.com/file/p/20240827/202408271019391526.jpg",
    "automotive": "https://www.whale-itech.com/file/p/20240827/202408271016195724.jpg",
    "photovoltaic": "https://www.whale-itech.com/file/p/20240827/202408271019179484.jpg",
}

# SEO card size 16:10
WIDTH, HEIGHT = 1600, 1000


def download(url: str, dest: Path) -> None:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30, context=CTX) as resp:
        dest.write_bytes(resp.read())
    print("downloaded", dest.name, dest.stat().st_size)


def to_webp(src: Path, dest: Path) -> None:
    im = Image.open(src).convert("RGB")
    # cover-crop to 16:10
    tw, th = WIDTH, HEIGHT
    scale = max(tw / im.width, th / im.height)
    nw, nh = int(im.width * scale + 0.5), int(im.height * scale + 0.5)
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - tw) // 2
    top = (nh - th) // 2
    im = im.crop((left, top, left + tw, top + th))
    im.save(dest, "WEBP", quality=82, method=6)
    print("webp", dest.name, im.size, dest.stat().st_size)


def main() -> None:
    # Prefer these six for the solutions page
    picks = [
        "cleanroom",
        "new-energy",
        "automotive",
        "machine-tool",
        "laser",
        "robotics",
    ]
    for key in picks:
        url = SOURCES[key]
        raw = RAW / f"{key}.jpg"
        download(url, raw)
        to_webp(raw, OUT / f"{key}.webp")


if __name__ == "__main__":
    main()
