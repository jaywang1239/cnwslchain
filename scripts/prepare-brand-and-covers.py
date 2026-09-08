"""Export brand logo and reuse existing product photos as missing covers."""

from pathlib import Path

from PIL import Image

ROOT = Path(r"c:\Users\Administrator\Desktop\cnwslchain-website")
ASSETS = Path(
    r"C:\Users\Administrator\.cursor\projects\c-Users-Administrator-Desktop-cnwslchain-website\assets"
)
PUBLIC = ROOT / "public" / "images"
CATEGORIES = PUBLIC / "products" / "categories"


def save_webp(im: Image.Image, dest: Path, size: tuple[int, int] | None = None) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    out = im.convert("RGBA")
    if size:
        canvas = Image.new("RGBA", size, (255, 255, 255, 0))
        out.thumbnail((size[0] - 16, size[1] - 16), Image.Resampling.LANCZOS)
        canvas.paste(out, ((size[0] - out.width) // 2, (size[1] - out.height) // 2), out)
        out = canvas
    out.save(dest, format="WEBP", quality=90, method=6)
    print(dest, dest.stat().st_size)


def letterbox(src: Path, dest: Path, size: tuple[int, int] = (1600, 1000)) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    im = Image.open(src).convert("RGB")
    scale = min(size[0] / im.width, size[1] / im.height)
    new = (
        max(1, int(im.width * scale)),
        max(1, int(im.height * scale)),
    )
    resized = im.resize(new, Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", size, (255, 255, 255))
    canvas.paste(resized, ((size[0] - new[0]) // 2, (size[1] - new[1]) // 2))
    canvas.save(dest, format="WEBP", quality=85, method=6)
    print(dest, dest.stat().st_size)


def main() -> None:
    logo = Image.open(ASSETS / "_logo-crop.png")
    save_webp(logo, PUBLIC / "brand" / "logo.webp", (640, 240))

    jobs = {
        PUBLIC / "blog" / "selection-guide.webp": CATEGORIES / "medium.webp",
        PUBLIC / "blog" / "tpu-performance.webp": CATEGORIES / "silent.webp",
        PUBLIC / "blog" / "lifespan-testing.webp": CATEGORIES / "heavy.webp",
        PUBLIC / "blog" / "custom-process.webp": CATEGORIES / "portable.webp",
        PUBLIC / "blog" / "expo-preview.webp": CATEGORIES / "cleanroom.webp",
        PUBLIC / "news" / "eu-certification.webp": CATEGORIES / "heavy.webp",
        PUBLIC / "news" / "industrial-expo-2026.webp": PUBLIC / "home" / "hero-banner.webp",
        PUBLIC / "news" / "capacity-expansion.webp": PUBLIC / "home" / "materials-chain.webp",
        PUBLIC / "news" / "seminar-recap.webp": CATEGORIES / "silent.webp",
        PUBLIC / "news" / "supply-agreements.webp": CATEGORIES / "medium.webp",
        PUBLIC / "solutions" / "cleanroom.webp": CATEGORIES / "cleanroom.webp",
        PUBLIC / "solutions" / "new-energy.webp": CATEGORIES / "heavy.webp",
        PUBLIC / "solutions" / "automotive.webp": CATEGORIES / "medium.webp",
        PUBLIC / "downloads" / "chain-catalog.webp": CATEGORIES / "medium.webp",
        PUBLIC / "downloads" / "cleanroom-catalog.webp": CATEGORIES / "cleanroom.webp",
        PUBLIC / "about" / "factory.webp": PUBLIC / "home" / "hero-banner.webp",
        PUBLIC / "contact" / "factory.webp": CATEGORIES / "portable.webp",
    }
    for dest, src in jobs.items():
        if not src.exists():
            print("missing", src)
            continue
        letterbox(src, dest)


if __name__ == "__main__":
    main()
