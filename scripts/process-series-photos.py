"""Flatten series product photos onto #FFFFFF and export SEO-sized WebP."""

from __future__ import annotations

import json
from collections import deque
from pathlib import Path

from PIL import Image

CANVAS_W = 1600
CANVAS_H = 1000
MARGIN = 0.07
WEBP_QUALITY = 85
ROOT = Path(r"c:\Users\Administrator\Desktop\cnwslchain-website")
JOBS = ROOT / "data" / "wsl-image-jobs.json"
PORTABLE_SRC = Path(
    r"C:\Users\Administrator\.cursor\projects\c-Users-Administrator-Desktop-cnwslchain-website"
    r"\assets\c__Users_Administrator_AppData_Roaming_Cursor_User_workspaceStorage"
    r"_dce66c508b8cff32f9c3bbf5e3c5669a_images_image-e481efdd-a6a5-4123-850d-6f3c40cc6dbc.png"
)
PORTABLE_DEST = ROOT / "public" / "images" / "products" / "categories" / "portable.webp"


def luma_chroma(px: tuple[int, int, int]) -> tuple[float, int]:
    r, g, b = px
    luma = 0.299 * r + 0.587 * g + 0.114 * b
    chroma = max(r, g, b) - min(r, g, b)
    return luma, chroma


def flood_white(im: Image.Image, min_luma: float = 220, max_chroma: int = 28) -> Image.Image:
    rgb = im.convert("RGB")
    px = rgb.load()
    w, h = rgb.size
    mask = [[False] * w for _ in range(h)]
    queue: deque[tuple[int, int]] = deque()

    def try_seed(x: int, y: int) -> None:
        luma, chroma = luma_chroma(px[x, y])
        if luma >= min_luma and chroma <= max_chroma and not mask[y][x]:
            mask[y][x] = True
            queue.append((x, y))

    for x in range(w):
        try_seed(x, 0)
        try_seed(x, h - 1)
    for y in range(h):
        try_seed(0, y)
        try_seed(w - 1, y)

    while queue:
        x, y = queue.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h and not mask[ny][nx]:
                luma, chroma = luma_chroma(px[nx, ny])
                if luma >= min_luma and chroma <= max_chroma:
                    mask[ny][nx] = True
                    queue.append((nx, ny))

    for y in range(h):
        for x in range(w):
            if mask[y][x]:
                px[x, y] = (255, 255, 255)
            else:
                r, g, b = px[x, y]
                if min(r, g, b) >= 248 and max(r, g, b) - min(r, g, b) <= 8:
                    px[x, y] = (255, 255, 255)
    return rgb


def product_bbox(im: Image.Image) -> tuple[int, int, int, int] | None:
    px = im.load()
    w, h = im.size
    min_x, min_y, max_x, max_y = w, h, -1, -1
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            if r < 252 or g < 252 or b < 252:
                if x < min_x:
                    min_x = x
                if y < min_y:
                    min_y = y
                if x > max_x:
                    max_x = x
                if y > max_y:
                    max_y = y
    if max_x < 0:
        return None
    pad = 8
    return (
        max(0, min_x - pad),
        max(0, min_y - pad),
        min(w, max_x + 1 + pad),
        min(h, max_y + 1 + pad),
    )


def fit_on_canvas(im: Image.Image) -> Image.Image:
    box = product_bbox(im)
    subject = im.crop(box) if box else im
    max_w = int(CANVAS_W * (1 - 2 * MARGIN))
    max_h = int(CANVAS_H * (1 - 2 * MARGIN))
    scale = min(max_w / subject.width, max_h / subject.height)
    new_size = (
        max(1, int(subject.width * scale)),
        max(1, int(subject.height * scale)),
    )
    resized = subject.resize(new_size, Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (CANVAS_W, CANVAS_H), (255, 255, 255))
    canvas.paste(resized, ((CANVAS_W - new_size[0]) // 2, (CANVAS_H - new_size[1]) // 2))
    return canvas


def export_webp(src: Path, dest: Path, min_luma: float = 210, max_chroma: int = 30) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    processed = fit_on_canvas(flood_white(Image.open(src), min_luma, max_chroma))
    processed.save(dest, format="WEBP", quality=WEBP_QUALITY, method=6, exact=True)


def main() -> None:
    if PORTABLE_SRC.exists():
        export_webp(PORTABLE_SRC, PORTABLE_DEST, 200, 36)
        print(f"portable: {PORTABLE_DEST} ({PORTABLE_DEST.stat().st_size} bytes)")
    else:
        print(f"portable source missing: {PORTABLE_SRC}")

    if not JOBS.exists():
        print("no image jobs yet")
        return

    jobs = json.loads(JOBS.read_text(encoding="utf-8"))
    done = 0
    for job in jobs:
        src = Path(job["src"])
        dest = Path(job["dest"])
        if not src.exists():
            print("missing", src)
            continue
        export_webp(src, dest)
        done += 1
        if done % 20 == 0 or done == len(jobs):
            print(f"images {done}/{len(jobs)}")


if __name__ == "__main__":
    main()
