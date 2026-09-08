"""Redact contact text from order PDFs and finish leftover JII specs + photos."""

from __future__ import annotations

import json
import re
from collections import defaultdict
from pathlib import Path

import pymupdf
from PIL import Image

ROOT = Path(r"c:\Users\Administrator\Desktop\cnwslchain-website")
SRC_PDF = Path(r"C:\Users\Administrator\Desktop\wsl型号")
SRC_IMG = Path(r"C:\Users\Administrator\Desktop\产品图")
OUT_PDF = ROOT / "public" / "datasheets" / "orders"
CATALOG = ROOT / "data" / "product-catalog.json"
SPECS = ROOT / "data" / "product-specs.json"
JOBS = ROOT / "data" / "wsl-image-jobs.json"

WSL_RE = re.compile(
    r"(WSL\d+[A-Z]*(?:-[A-Z]+)?)-(\d+)-(\d+)[A-Z]?-R([\d.]+[A-Z]*)",
    re.I,
)
WWC_RE = re.compile(r"WWC[.\s]*(\d+)[.\s]+(\d+)[.\s]*R([\d.]+)", re.I)

NEEDLES = [
    "地址",
    "电话",
    "邮箱",
    "传真",
    "QQ",
    "qq.com",
    "虹桥",
    "虹河",
    "宁康",
    "威仕龙塑胶",
    "温州市威仕龙",
    "浙江威仕龙",
    "13968763633",
    "29828961",
    "1677331928",
    "18112888059",
    "13275225528",
    "0577-62328108",
    "0577-62328106",
    "wslmj",
    "乐清市虹桥",
]

FORBIDDEN = [
    "威仕龙塑胶",
    "温州市威仕龙",
    "虹桥镇",
    "虹河西路",
    "宁康东路",
    "13968763633",
    "29828961",
    "1677331928",
    "18112888059",
    "13275225528",
    "@qq.com",
    "地址：",
    "电话：",
    "邮箱：",
]


def normalize_code(raw: str) -> str:
    code = raw.upper().replace("Ⅱ", "II")
    if code == "WSL06JII":
        return "WSL06J2"
    return code


def parse_name(filename: str):
    name = filename.replace("(已瘦身)", "").replace("Ⅱ", "II")
    wsl = WSL_RE.search(name)
    if wsl:
        return {
            "code": normalize_code(wsl.group(1)),
            "height": int(wsl.group(2)),
            "width": int(wsl.group(3)),
            "radius": float(re.sub(r"[A-Z]+$", "", wsl.group(4), flags=re.I)),
        }
    wwc = WWC_RE.search(name)
    if wwc:
        return {
            "code": f"WWC{wwc.group(1)}",
            "height": int(wwc.group(1)),
            "width": int(wwc.group(2)),
            "radius": float(wwc.group(3)),
        }
    return None


def category_for(code: str, height: int) -> str:
    if "J" in code:
        return "silent"
    if code.startswith("WWC"):
        return "cleanroom"
    if height <= 15:
        return "micro"
    if height <= 45:
        return "medium"
    return "heavy"


def series_id(code: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", code.lower())


def path_score(file: Path, code: str) -> float:
    lower = str(file).lower()
    score = 0.0
    if f"\\{code.lower()}\\" in lower:
        score += 50
    if "下载威仕龙" in lower:
        score -= 40
    score -= len(str(file)) / 200
    return score


def redact_pdf(src: Path, dest: Path) -> None:
    doc = pymupdf.open(src)
    for page in doc:
        h = page.rect.height
        w = page.rect.width
        page.add_redact_annot(pymupdf.Rect(0, h - 110, w, h), fill=(1, 1, 1))
        for needle in NEEDLES:
            for rect in page.search_for(needle):
                expanded = pymupdf.Rect(rect.x0 - 10, rect.y0 - 6, min(w, rect.x1 + 320), rect.y1 + 8)
                page.add_redact_annot(expanded, fill=(1, 1, 1))
        page.apply_redactions(images=0)
    dest.parent.mkdir(parents=True, exist_ok=True)
    doc.save(dest, garbage=4, deflate=True)
    doc.close()


def leftover_text(path: Path) -> list[str]:
    leftover = []
    try:
        doc = pymupdf.open(path)
    except Exception as exc:
        return [f"{path.name}: {exc}"]
    for i, page in enumerate(doc, 1):
        text = page.get_text() or ""
        for word in FORBIDDEN:
            if word in text:
                leftover.append(f"{path.name} p{i}: {word}")
    doc.close()
    return leftover


def export_webp(src: Path, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    subject = Image.open(src).convert("RGB")
    canvas_w, canvas_h, margin = 1600, 1000, 0.07
    max_w = int(canvas_w * (1 - 2 * margin))
    max_h = int(canvas_h * (1 - 2 * margin))
    scale = min(max_w / subject.width, max_h / subject.height)
    new_size = (max(1, int(subject.width * scale)), max(1, int(subject.height * scale)))
    resized = subject.resize(new_size, Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (canvas_w, canvas_h), (255, 255, 255))
    canvas.paste(resized, ((canvas_w - new_size[0]) // 2, (canvas_h - new_size[1]) // 2))
    canvas.save(dest, format="WEBP", quality=85, method=6)


def walk_pdfs(root: Path) -> list[Path]:
    return [p for p in root.rglob("*.pdf")]


def main() -> None:
    files = walk_pdfs(SRC_PDF)
    by_name: dict[str, Path] = {}
    for file in files:
        parsed = parse_name(file.name)
        current = by_name.get(file.name)
        if current is None:
            by_name[file.name] = file
        elif parsed and path_score(file, parsed["code"]) > path_score(current, parsed["code"]):
            by_name[file.name] = file

    groups: dict[tuple, dict] = {}
    skipped = []
    for name, file in by_name.items():
        parsed = parse_name(name)
        if not parsed:
            skipped.append(name)
            continue
        key = (parsed["code"], parsed["height"], parsed["width"])
        group = groups.setdefault(
            key,
            {**parsed, "radii": set(), "files": []},
        )
        if parsed["radius"]:
            group["radii"].add(parsed["radius"])
        group["files"].append(file)

    print(f"groups={len(groups)} skipped={len(skipped)}")

    leftovers = []
    fail = 0
    done = 0
    for (code, height, width), group in groups.items():
        sid = series_id(code)
        dest = OUT_PDF / sid / f"{height}-{width}.pdf"
        source = sorted(group["files"], key=lambda p: path_score(p, code), reverse=True)[0]
        try:
            redact_pdf(source, dest)
            leftovers.extend(leftover_text(dest))
        except Exception as exc:
            fail += 1
            print("fail", source.name, exc)
        done += 1
        if done % 40 == 0 or done == len(groups):
            print(f"pdf {done}/{len(groups)} fail={fail} leftover={len(leftovers)}")

    catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    specs = json.loads(SPECS.read_text(encoding="utf-8"))
    spec_keys = {(s["seriesId"], s["id"]) for s in specs}
    added = 0
    series_map = {}
    for category in catalog["categories"]:
        for series in category["series"]:
            series_map[series["id"]] = (category["id"], series)

    for (code, height, width), group in groups.items():
        sid = series_id(code)
        spec_id = f"{height}-{width}"
        category_id = category_for(code, height)
        if (sid, spec_id) in spec_keys:
            continue
        radii = sorted(int(r) if float(r).is_integer() else r for r in group["radii"]) or [50]
        images = []
        img_dir = None
        for size_dir in SRC_IMG.iterdir():
            if not size_dir.is_dir():
                continue
            cand = size_dir / code
            if cand.is_dir():
                img_dir = cand
                break
            cand2 = size_dir / ("WSL06J2" if code == "WSL06J2" else code)
            if cand2.is_dir():
                img_dir = cand2
                break
        if img_dir:
            files_img = sorted(
                p for p in img_dir.iterdir() if p.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"}
            )
            labels = ["主图", "侧面", "细节"]
            for i, src in enumerate(files_img[:3]):
                letter = chr(97 + i)
                images.append(
                    {
                        "src": f"/images/products/series/{sid}/{letter}.webp",
                        "alt": f"{code} {labels[i]}",
                    }
                )
        specs.append(
            {
                "id": spec_id,
                "categoryId": category_id,
                "seriesId": sid,
                "innerHeight": height,
                "innerWidth": width,
                "code": f"{code}-{height}-{width}",
                "connector": f"{code}-{height}-{width}C",
                "bendRadii": radii,
                "material": "PA6+GF30 增强尼龙",
                "openType": "静音" if category_id == "silent" else "桥式",
                "images": images,
                "drawingUrl": f"/datasheets/orders/{sid}/{spec_id}.pdf",
            }
        )
        spec_keys.add((sid, spec_id))
        added += 1
        if sid not in series_map:
            for category in catalog["categories"]:
                if category["id"] == category_id:
                    series = {"id": sid, "name": code, "code": code, "specCount": 0}
                    category["series"].append(series)
                    series_map[sid] = (category_id, series)
                    break
        series_map[sid][1]["specCount"] = series_map[sid][1].get("specCount", 0) + 1

    specs.sort(key=lambda s: (s["seriesId"], s["innerHeight"], s["innerWidth"]))
    SPECS.write_text(json.dumps(specs, ensure_ascii=False, indent=2), encoding="utf-8")
    CATALOG.write_text(json.dumps(catalog, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"added specs={added} leftover={len(leftovers)} fail={fail}")
    if leftovers:
        print("LEFTOVER SAMPLE")
        print("\n".join(leftovers[:30]))

    if JOBS.exists():
        jobs = json.loads(JOBS.read_text(encoding="utf-8"))
        done = 0
        for job in jobs:
            src = Path(job["src"])
            dest = Path(job["dest"])
            if not src.exists():
                print("missing image", src)
                continue
            export_webp(src, dest)
            done += 1
            if done % 30 == 0 or done == len(jobs):
                print(f"images {done}/{len(jobs)}")

    report = {
        "groups": len(groups),
        "skipped": skipped,
        "added": added,
        "fail": fail,
        "leftoverCount": len(leftovers),
        "leftovers": leftovers[:50],
    }
    (ROOT / "data" / "wsl-redact-report.json").write_text(
        json.dumps(report, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    if leftovers:
        raise SystemExit(2)


if __name__ == "__main__":
    main()
