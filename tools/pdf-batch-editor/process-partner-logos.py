import json
from pathlib import Path
from PIL import Image

ROOT = Path(r"C:\Users\Administrator\Desktop\cnwslchain-website")
RAW = ROOT / "tools/pdf-batch-editor/_logos/raw"
OUT = ROOT / "public/images/home/partners"
LOGS = Path(r"C:\Users\Administrator\.cursor\browser-logs")

WIDTH, HEIGHT, PAD = 640, 280, 48
OUT.mkdir(parents=True, exist_ok=True)


def extract_cdp(json_name: str, out_name: str) -> None:
    payload = json.loads((LOGS / json_name).read_text(encoding="utf-8"))
    b64 = payload.get("data") or payload.get("result", {}).get("data")
    if not b64:
        raise SystemExit(f"No image data in {json_name}")
    import base64

    (RAW / out_name).write_bytes(base64.b64decode(b64))


extract_cdp("cdp-response-Page.captureScreenshot-2026-09-05T08-31-23-360Z.json", "genesis-clip.png")
extract_cdp("cdp-response-Page.captureScreenshot-2026-09-05T08-33-06-822Z.json", "foxconn-clip.png")
extract_cdp("cdp-response-Page.captureScreenshot-2026-09-05T08-31-16-748Z.json", "avic-clip.png")

jobs = [
    ("bambu-lab", "bambu-favicon.ico", False),
    ("huawei", "huawei-official.png", False),
    ("hapm-magna", "hapm-magna-header.png", False),
    ("trumpchi", "trumpchi-logo.png", True),
    ("foxconn", "foxconn-clip.png", True),
    ("genesis", "genesis-clip.png", True),
    ("gac", "gac-header.png", False),
    ("avic-jingji", "avic-clip.png", False),
    ("midea", "midea-official.png", False),
]


def knockout_light_logo(image: Image.Image) -> Image.Image:
    """Turn white wordmarks on dark/black clips into dark marks on transparency."""
    pixels = image.load()
    for y in range(image.height):
        for x in range(image.width):
            r, g, b, a = pixels[x, y]
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            if a < 24 or lum < 165:
                pixels[x, y] = (0, 0, 0, 0)
            else:
                strength = min(255, int(a * (lum - 165) / 90))
                pixels[x, y] = (28, 36, 48, max(0, strength))
    return image


def fit(src: Image.Image) -> tuple[int, int, int, int]:
    box_w, box_h = WIDTH - PAD * 2, HEIGHT - PAD * 2
    scale = min(box_w / src.width, box_h / src.height)
    w = max(1, round(src.width * scale))
    h = max(1, round(src.height * scale))
    x = (WIDTH - w) // 2
    y = (HEIGHT - h) // 2
    return x, y, w, h


for logo_id, src_name, invert in jobs:
    src_path = RAW / src_name
    image = Image.open(src_path)
    image = image.convert("RGBA")
    if invert:
        image = knockout_light_logo(image)
    canvas = Image.new("RGB", (WIDTH, HEIGHT), (255, 255, 255))
    x, y, w, h = fit(image)
    resized = image.resize((w, h), Image.Resampling.LANCZOS)
    canvas.paste(resized, (x, y), resized)
    dest = OUT / f"{logo_id}.webp"
    canvas.save(dest, "WEBP", quality=90, method=6)
    print(f"{logo_id}\t{image.size}\t-> {w}x{h}\t{dest.stat().st_size}")
