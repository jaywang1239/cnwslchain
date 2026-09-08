"""Rebuild catalog/specs: series = inner height, not WSL code."""

from __future__ import annotations

import json
import shutil
from collections import defaultdict
from pathlib import Path

ROOT = Path(r"c:\Users\Administrator\Desktop\cnwslchain-website")
CATALOG = ROOT / "data" / "product-catalog.json"
SPECS = ROOT / "data" / "product-specs.json"
IMG_ROOT = ROOT / "public" / "images" / "products" / "series"

MICRO_HEIGHTS = {5, 6, 7, 10, 15}

HEIGHT_IMAGE_SRC = {
    ("micro", 5): "wsl01",
    ("micro", 6): "wsl01x",
    ("micro", 7): "wsl02",
    ("micro", 10): "wsl03",
    ("micro", 15): "wsl07",
    ("medium", 18): "wsl11",
    ("medium", 20): "wsl16",
    ("medium", 25): "wsl17",
    ("medium", 30): "wsl21",
    ("medium", 45): "wsl27",
    ("heavy", 65): "wsl35",
    ("heavy", 80): "wsl37",
    ("silent", 18): "wsl01j",
    ("silent", 25): "wsl02j",
    ("silent", 30): "wsl04j",
    ("silent", 35): "wsl06j",
    ("silent", 40): "wsl08j",
    ("silent", 45): "wsl10j",
    ("cleanroom", 15): "wwc15",
    ("cleanroom", 18): "wwc18",
    ("cleanroom", 22): "wwc22",
    ("cleanroom", 28): "wwc28",
    ("cleanroom", 35): "wwc35",
}


def category_for(spec: dict) -> str:
    if spec["categoryId"] in {"silent", "cleanroom", "portable"}:
        return spec["categoryId"]
    height = spec["innerHeight"]
    if height in MICRO_HEIGHTS or height <= 15:
        return "micro"
    if height >= 45:
        return "heavy"
    return "medium"


def series_id_for(category_id: str, height: int) -> str:
    return str(height)


def series_name_for(category_id: str, height: int) -> str:
    if category_id == "silent":
        return f"静音{height}系列"
    if category_id == "cleanroom":
        return f"WWC{height}"
    return f"{height}系列"


def copy_height_images(category_id: str, height: int) -> list[dict]:
    src_key = HEIGHT_IMAGE_SRC.get((category_id, height))
    dest_dir = IMG_ROOT / series_id_for(category_id, height)
    if category_id == "silent":
        dest_dir = IMG_ROOT / f"{height}j"
    if category_id == "cleanroom":
        dest_dir = IMG_ROOT / f"wwc{height}"

    images = []
    letters = ["a", "b", "c", "d", "e", "f"]
    labels = ["主图", "侧面", "细节", "结构", "安装", "应用"]
    src_dir = IMG_ROOT / src_key if src_key else None
    dest_dir.mkdir(parents=True, exist_ok=True)

    copied = 0
    if src_dir and src_dir.exists():
        for letter in letters:
            src = src_dir / f"{letter}.webp"
            if not src.exists():
                continue
            dest = dest_dir / f"{letter}.webp"
            if src.resolve() != dest.resolve():
                shutil.copy2(src, dest)
            copied += 1

    public_base = f"/images/products/series/{dest_dir.name}"
    for i, letter in enumerate(letters[: max(copied, 1)]):
        dest = dest_dir / f"{letter}.webp"
        if dest.exists():
            images.append(
                {
                    "src": f"{public_base}/{letter}.webp",
                    "alt": f"{series_name_for(category_id, height)}{labels[i]}",
                }
            )
    return images


def main() -> None:
    catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    specs = json.loads(SPECS.read_text(encoding="utf-8"))

    rebuilt = []
    grouped: dict[tuple[str, str], list] = defaultdict(list)

    for spec in specs:
        category_id = category_for(spec)
        height = spec["innerHeight"]
        series_id = series_id_for(category_id, height)
        if category_id == "portable":
            rebuilt.append(spec)
            continue
        model = spec["code"].split("-")[0]
        spec_id = f"{model.lower()}-{height}-{spec['innerWidth']}"
        images = copy_height_images(category_id, height)
        item = {
            **spec,
            "id": spec_id,
            "categoryId": category_id,
            "seriesId": series_id,
            "images": images or spec.get("images", []),
        }
        rebuilt.append(item)
        grouped[(category_id, series_id)].append(item)

    rebuilt.sort(key=lambda s: (s["categoryId"], int(s.get("seriesId", 0) or 0), s["code"]))

    series_details = {}
    category_series = {c["id"]: [] for c in catalog["categories"]}

    for (category_id, series_id), items in sorted(
        grouped.items(), key=lambda kv: (kv[0][0], int(kv[0][1]))
    ):
        height = int(series_id)
        name = series_name_for(category_id, height)
        codes = sorted({item["code"].split("-")[0] for item in items})
        widths = [item["innerWidth"] for item in items]
        radii = sorted({r for item in items for r in item.get("bendRadii", [])})
        category_series[category_id].append(
            {
                "id": series_id,
                "name": name,
                "code": f"H{height}",
                "specCount": len(items),
            }
        )
        kind = (
            "静音拖链"
            if category_id == "silent"
            else "无尘拖链"
            if category_id == "cleanroom"
            else "桥式拖链"
        )
        series_details[series_id if category_id not in {"silent", "cleanroom"} else f"{category_id}-{series_id}"] = {
            "intro": (
                f"{name}为威仕龙{kind}，内高 {height}mm，内宽 "
                f"{min(widths)}–{max(widths)}mm，覆盖 { '、'.join(codes) }。"
                f"可选弯曲半径 {' / '.join(f'R{r}' for r in radii)}。"
            ),
            "material": "PA6+GF30 增强尼龙",
            "openType": items[0].get("openType", "桥式"),
            "tempRange": "-20℃ ~ 120℃",
        }

    # seriesDetails key must match series.id for getSeriesDetail(seriesId)
    catalog["seriesDetails"] = {}
    for category_id, series_list in category_series.items():
        for series in series_list:
            height = int(series["id"])
            items = grouped[(category_id, series["id"])]
            codes = sorted({item["code"].split("-")[0] for item in items})
            widths = [item["innerWidth"] for item in items]
            radii = sorted({r for item in items for r in item.get("bendRadii", [])})
            kind = (
                "静音拖链"
                if category_id == "silent"
                else "无尘拖链"
                if category_id == "cleanroom"
                else "桥式拖链"
            )
            catalog["seriesDetails"][series["id"]] = {
                "intro": (
                    f"{series['name']}为威仕龙{kind}，内高 {height}mm，内宽 "
                    f"{min(widths)}–{max(widths)}mm，覆盖 { '、'.join(codes) }。"
                    f"可选弯曲半径 {' / '.join(f'R{r}' for r in radii)}。"
                ),
                "material": "PA6+GF30 增强尼龙",
                "openType": items[0].get("openType", "桥式"),
                "tempRange": "-20℃ ~ 120℃",
            }

    # seriesDetails keys collide if micro 15 and cleanroom 15 both use "15"
    # getSeriesDetail only uses seriesId. Use unique series ids per category
    # by prefixing silent/cleanroom.
    # Re-key silent/cleanroom series ids so details don't overwrite.

    def unique_series_id(category_id: str, height: int) -> str:
        if category_id == "silent":
            return f"{height}j"
        if category_id == "cleanroom":
            return f"wwc{height}"
        return str(height)

    rebuilt2 = []
    grouped2: dict[tuple[str, str], list] = defaultdict(list)
    for spec in rebuilt:
        if spec["categoryId"] == "portable":
            rebuilt2.append(spec)
            continue
        sid = unique_series_id(spec["categoryId"], spec["innerHeight"])
        spec = {**spec, "seriesId": sid}
        rebuilt2.append(spec)
        grouped2[(spec["categoryId"], sid)].append(spec)

    category_series = {c["id"]: [] for c in catalog["categories"]}
    catalog["seriesDetails"] = {}
    for (category_id, series_id), items in grouped2.items():
        height = items[0]["innerHeight"]
        name = series_name_for(category_id, height)
        codes = sorted({item["code"].split("-")[0] for item in items})
        widths = [item["innerWidth"] for item in items]
        radii = sorted({r for item in items for r in item.get("bendRadii", [])})
        category_series.setdefault(category_id, []).append(
            {
                "id": series_id,
                "name": name,
                "code": f"H{height}",
                "specCount": len(items),
            }
        )
        kind = (
            "静音拖链"
            if category_id == "silent"
            else "无尘拖链"
            if category_id == "cleanroom"
            else "桥式拖链"
        )
        catalog["seriesDetails"][series_id] = {
            "intro": (
                f"{name}为威仕龙{kind}，内高 {height}mm，内宽 "
                f"{min(widths)}–{max(widths)}mm，覆盖 { '、'.join(codes) }。"
                f"可选弯曲半径 {' / '.join(f'R{r}' for r in radii)}。"
            ),
            "material": "PA6+GF30 增强尼龙",
            "openType": items[0].get("openType", "桥式"),
            "tempRange": "-20℃ ~ 120℃",
        }

    def sort_key(series: dict) -> int:
        digits = "".join(ch for ch in series["id"] if ch.isdigit())
        return int(digits) if digits else 0

    for category in catalog["categories"]:
        if category["id"] == "micro":
            category["description"] = "内高 5 / 6 / 7 / 10 / 15mm，适用于小型设备与紧凑型自动化线缆保护。"
            category["intro"] = (
                "微型拖链按内高分为 5、6、7、10、15mm 规格，体积小、重量轻，适合狭小安装空间。"
                "常用于小型 CNC、机械手、检测设备与电子装配线。"
            )
        if category["id"] == "medium":
            category["description"] = "内高大于 15mm、小于 45mm，按内高分为 18 / 20 / 25 / 30 系列。"
        if category["id"] == "heavy":
            category["description"] = "内高 45mm 及以上，按内高分为 45 / 65 / 80 等承重系列。"
        if category["id"] == "portable":
            category["series"] = category.get("series") or [
                {"id": "portable-std", "name": "便携式系列", "code": "便携式", "specCount": 0}
            ]
            continue
        series_list = category_series.get(category["id"], [])
        series_list.sort(key=sort_key)
        category["series"] = series_list

    rebuilt2.sort(
        key=lambda s: (
            s["categoryId"],
            s["innerHeight"],
            s["code"],
            s["innerWidth"],
        )
    )
    SPECS.write_text(json.dumps(rebuilt2, ensure_ascii=False, indent=2), encoding="utf-8")
    CATALOG.write_text(json.dumps(catalog, ensure_ascii=False, indent=2), encoding="utf-8")

    print("rewritten specs", len(rebuilt2))
    for category in catalog["categories"]:
        print(
            category["id"],
            [f"{s['name']}({s['specCount']})" for s in category["series"]],
        )


if __name__ == "__main__":
    main()
