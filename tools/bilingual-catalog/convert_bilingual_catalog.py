# -*- coding: utf-8 -*-
"""Make CN/EN bilingual copies of WYW catalog DOCX files."""

from __future__ import annotations

import re
import shutil
import sys
import zipfile
from pathlib import Path

from lxml import etree

from glossary import PAIRS, SENTENCES

W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
XML_NS = "http://www.w3.org/XML/1998/namespace"
W_T = f"{{{W_NS}}}t"
W_P = f"{{{W_NS}}}p"
W_R = f"{{{W_NS}}}r"
W_SZ = f"{{{W_NS}}}sz"
W_SZCS = f"{{{W_NS}}}szCs"
W_BR = f"{{{W_NS}}}br"
W_RPR = f"{{{W_NS}}}rPr"
W_VAL = f"{{{W_NS}}}val"

CJK = re.compile(r"[\u4e00-\u9fff]")
LAT = re.compile(r"[A-Za-z]")
SKIP_RE = re.compile(
    r"^[\d\s\.\,\-\+\=\/\|×xXmmkgNMPa°%℃()\[\]~≈≤≥＿_φΦt=HFDKRBiBahaiΔμ·]+$",
    re.I,
)
LIGATURES = str.maketrans(
    {
        "ﬁ": "fi",
        "ﬂ": "fl",
        "ﬀ": "ff",
        "ﬃ": "ffi",
        "ﬄ": "ffl",
        "丶": "、",
    }
)

SERIES_ZH = re.compile(
    r"WYW\s*拖链系统\s*[一\-—–_]?\s*([A-Z]{1,3}E?)\s*系列",
    re.I,
)
SERIES_EN = re.compile(
    r"WYW\s+Cab\s*le\s+Cha\s*in\s+System\s*[-–—_]?\s*([A-Z]{1,3}E?)\s*Series",
    re.I,
)
SERIES_PAGE = re.compile(
    r"^([A-Z]{1,3}E?\d*)\s*系列产品(简介|应用要求|订购示例|定制化服务)$",
)
PAGE_NUM = re.compile(r"[（(](\d+)[)）]页")
SCREW_ZH = re.compile(
    r"接头固定建议用\s*(M[\d/]+)\s*\(GB/T\)\s*螺丝[,，]\s*最大锁紧力不超过\s*([\d.]+)\s*N\.?m",
)
SCREW_EN = re.compile(
    r"(M[\d/]+)\(GB/T\)\s*screws are recommended for mounting bracket installation,?\s*the maximum locking force shall not exceed\s*([\d.]+)\s*N\.m\.?",
    re.I,
)
TIEWWRAP_ZH = re.compile(
    r"如有选配扎线板(?:和电缆夹)?需求[，,]?请参考[（(](\d+)[)）]页去应力附件部分[。.]?",
)
UNSUP_LEN_ZH = re.compile(r"架空长度\s*≤\s*([\d.]+)\s*m")
UNSUP_LEN_EN = re.compile(r"Unsupported length\s*≤\s*([\d.]+)\s*m", re.I)


def collapse(s: str) -> str:
    s = s.translate(LIGATURES)
    s = s.replace("CabIe", "Cable").replace("Cab le", "Cable")
    s = re.sub(r"\s+", "", s)
    s = s.replace("，", ",").replace("。", ".").replace("；", ";")
    return s


def has_cjk(s: str) -> bool:
    return bool(CJK.search(s))


def is_skip(s: str) -> bool:
    t = s.strip()
    if not t or len(t) < 2:
        return True
    if SKIP_RE.match(t):
        return True
    if not CJK.search(t) and not LAT.search(t):
        return True
    return False


def already_bilingual(s: str) -> bool:
    if not has_cjk(s):
        return False
    # chemical table and similar already mixed with real English words
    words = re.findall(r"[A-Za-z]{4,}", s)
    meaningful = [
        w
        for w in words
        if w.lower()
        not in {
            "wyw",
            "series",
            "mm",
            "iso",
            "flg",
            "flb",
            "esd",
            "ulhb",
            "info",
            "http",
            "www",
        }
    ]
    return len(meaningful) >= 2 and len(CJK.findall(s)) >= 2 and (
        "Medium" in s or "Series" in s or "Inner" in s or "Page" in s or "Cable" in s
    )


def bilingual(zh: str, en: str) -> str:
    zh = zh.strip()
    en = en.strip()
    if not zh:
        return en
    if not en:
        return zh
    if zh == en:
        return zh
    if en.lower() in zh.lower() and has_cjk(zh):
        return zh
    if zh in en and has_cjk(en):
        return en
    return f"{zh} {en}"


def build_indexes():
    pairs = []
    seen = set()
    for zh, en in PAIRS:
        zh, en = zh.strip(), en.strip()
        if not zh or not en:
            continue
        key = (zh, en)
        if key in seen:
            continue
        seen.add(key)
        pairs.append((zh, en))
    pairs.sort(key=lambda x: len(x[0]), reverse=True)
    en_pairs = sorted(pairs, key=lambda x: len(x[1]), reverse=True)

    sent_zh = {}
    sent_en = {}
    for zh, en in SENTENCES:
        sent_zh[collapse(zh)] = (zh.strip(), en.strip())
        sent_en[collapse(en)] = (zh.strip(), en.strip())
        sent_zh[collapse(bilingual(zh, en))] = (zh.strip(), en.strip())
    return pairs, en_pairs, sent_zh, sent_en


PAIRS_ZH, PAIRS_EN, SENT_ZH, SENT_EN = build_indexes()


def apply_patterns(text: str) -> str | None:
    m = SERIES_ZH.search(text)
    if m and len(CJK.findall(text)) <= 20:
        code = m.group(1).upper()
        return text[: m.start()] + bilingual(
            f"WYW 拖链系统 {code} 系列",
            f"WYW Cable Chain System - {code} Series",
        ) + text[m.end() :]

    m = SERIES_EN.search(text)
    if m:
        code = m.group(1).upper()
        repl = bilingual(
            f"WYW 拖链系统 {code} 系列",
            f"WYW Cable Chain System - {code} Series",
        )
        # repeated headers on one line
        return SERIES_EN.sub(repl, text)

    m = SERIES_PAGE.match(text.strip())
    if m:
        code, kind = m.group(1), m.group(2)
        kinds = {
            "简介": "Product introduction",
            "应用要求": "Application requirements",
            "订购示例": "Ordering example",
            "定制化服务": "Customized options",
        }
        return bilingual(f"{code} 系列产品{kind}", f"{code} Series {kinds[kind]}")

    if "如有防静电" in text and "请参考" in text:
        m = PAGE_NUM.search(text)
        if m:
            page = m.group(1)
            if "耐高温" in text:
                zh = f"如有防静电、耐高温、无预应力等特殊物料订购需求，请参考({page})页。"
                en = f"Please refer to page {page} for anti-static, high-temperature and non-camber options."
            else:
                zh = f"如有防静电、滑行、无预应力等特殊物料订购需求，请参考({page})页。"
                en = f"Please refer to page {page} for anti-static, sliding and non-camber options."
            return bilingual(zh, en)
    if "Please refer to page" in text and "anti-static" in text.lower():
        m = re.search(r"page\s+(\d+)", text, re.I)
        if m:
            page = m.group(1)
            if "high" in text.lower() and "temp" in text.lower():
                zh = f"如有防静电、耐高温、无预应力等特殊物料订购需求，请参考({page})页。"
                en = f"Please refer to page {page} for anti-static, high-temperature and non-camber options."
            else:
                zh = f"如有防静电、滑行、无预应力等特殊物料订购需求，请参考({page})页。"
                en = f"Please refer to page {page} for anti-static, sliding and non-camber options."
            return bilingual(zh, en)

    m = SCREW_ZH.search(text)
    if m:
        return bilingual(
            f"接头固定建议用 {m.group(1)} (GB/T) 螺丝，最大锁紧力不超过 {m.group(2)} N.m",
            f"{m.group(1)} (GB/T) screws recommended; max. tightening torque {m.group(2)} N.m",
        )

    m = SCREW_EN.search(text)
    if m:
        return bilingual(
            f"接头固定建议用 {m.group(1)} (GB/T) 螺丝，最大锁紧力不超过 {m.group(2)} N.m",
            f"{m.group(1)} (GB/T) screws recommended; max. tightening torque {m.group(2)} N.m",
        )

    m = TIEWWRAP_ZH.search(text)
    if m:
        extra = "和电缆夹" if "电缆夹" in text else ""
        return bilingual(
            f"如有选配扎线板{extra}需求，请参考({m.group(1)})页去应力附件部分。",
            f"See strain-relief accessories on page {m.group(1)} for optional tiewrap plates"
            + (" and clamps" if extra else "")
            + ".",
        )

    m = UNSUP_LEN_ZH.search(text)
    if m and len(text.strip()) < 40:
        return bilingual(f"架空长度 ≤ {m.group(1)}m", f"Unsupported length ≤ {m.group(1)}m")

    m = UNSUP_LEN_EN.search(text)
    if m and len(text.strip()) < 50:
        return bilingual(f"架空长度 ≤ {m.group(1)}m", f"Unsupported length ≤ {m.group(1)}m")
    return None


def protect_replace(text: str, items: list[tuple[str, str]], src_idx: int) -> str:
    if not text:
        return text
    occupied = bytearray(len(text))
    hits: list[tuple[int, int, str]] = []
    for zh, en in items:
        src = zh if src_idx == 0 else en
        dst = bilingual(zh, en)
        if not src or src == dst:
            continue
        start = 0
        while True:
            i = text.find(src, start)
            if i < 0:
                break
            j = i + len(src)
            start = i + 1
            if j > len(occupied):
                break
            if any(occupied[i:j]):
                continue
            # Do not rewrite English tokens that sit inside codes like No.7 / Page3
            if src_idx == 1 and src[:1].isascii() and LAT.search(src):
                if i > 0 and text[i - 1].isalpha():
                    start = i + 1
                    continue
                if j < len(text) and text[j].isalnum():
                    start = i + 1
                    continue
            # already bilingual next to this span
            rest = text[j : j + len(dst) + 4]
            other = en if src_idx == 0 else zh
            if other and other[: min(8, len(other))] in rest:
                continue
            if dst in text[max(0, i - 2) : j + len(other) + 2]:
                continue
            hits.append((i, j, dst))
            occupied[i:j] = b"\x01" * (j - i)
    if not hits:
        return text
    hits.sort()
    out = []
    last = 0
    for i, j, dst in hits:
        out.append(text[last:i])
        out.append(dst)
        last = j
    out.append(text[last:])
    return "".join(out)


def leftover_cjk(text: str) -> int:
    tmp = text
    for zh, en in PAIRS_ZH:
        tmp = tmp.replace(zh, "")
        tmp = tmp.replace(en, "")
        tmp = tmp.replace(bilingual(zh, en), "")
    tmp = re.sub(r"[A-Za-z0-9\s\W_]+", "", tmp, flags=re.UNICODE)
    return len(CJK.findall(tmp))


def is_label_like(text: str) -> bool:
    compact = re.sub(r"\s+", "", text)
    if len(compact) <= 40:
        return True
    return leftover_cjk(text) <= 4


def prefix_len(a: str, b: str) -> int:
    n = 0
    for x, y in zip(a, b):
        if x != y:
            break
        n += 1
    return n


def lookup_sentence(text: str):
    key = collapse(text)
    if key in SENT_ZH:
        return SENT_ZH[key]
    if key in SENT_EN:
        return SENT_EN[key]
    if len(key) < 40:
        return None
    best = None
    best_n = 0
    for ck, pair in list(SENT_ZH.items()) + list(SENT_EN.items()):
        if len(ck) < 40:
            continue
        n = prefix_len(key, ck)
        if n >= 70 and n > best_n:
            best = pair
            best_n = n
    return best


def translate_paragraph(raw: str) -> tuple[str | None, bool]:
    """Return (new_text, use_linebreak_for_long_sentence)."""
    text = raw.translate(LIGATURES).replace("CabIe", "Cable")
    if is_skip(text):
        return None, False
    if already_bilingual(text) and leftover_cjk(text) <= 6:
        return None, False

    hit = lookup_sentence(text)
    if hit:
        zh, en = hit
        if len(CJK.findall(text)) < 2:
            chinese = zh if has_cjk(zh) else en
            return bilingual(chinese, text), True
        return bilingual(zh, en), len(zh) >= 36 or len(en) >= 50

    patterned = apply_patterns(text)
    if patterned and patterned != text:
        return patterned, False

    source_is_zh = len(CJK.findall(text)) >= 2
    if source_is_zh:
        if is_label_like(text) or leftover_cjk(text) <= 8:
            new = protect_replace(text, PAIRS_ZH, 0)
            return (new if new != text else None), False
        # long unmatched Chinese: still phrase-replace labels only if many known terms
        new = protect_replace(text, PAIRS_ZH, 0)
        if new != text:
            return new, False
        return None, False

    # English
    if is_label_like(text) or len(text) <= 80:
        new = protect_replace(text, PAIRS_EN, 1)
        return (new if new != text else None), False
    new = protect_replace(text, PAIRS_EN, 1)
    if new != text:
        return new, False
    return None, False


def paragraph_text(p) -> str:
    return "".join(t.text or "" for t in p.iter(W_T))


def shrink_sizes(p, factor: float = 0.84, minimum: int = 14) -> None:
    for el in list(p.iter(W_SZ)) + list(p.iter(W_SZCS)):
        val = el.get(W_VAL)
        if not val:
            continue
        try:
            n = int(val)
        except ValueError:
            continue
        el.set(W_VAL, str(max(minimum, int(n * factor))))


def set_paragraph_text(p, new_text: str, linebreak: bool, old_len: int) -> None:
    texts = list(p.iter(W_T))
    if not texts:
        return
    grew = len(new_text) > int(old_len * 1.25) and old_len < 120
    if grew:
        shrink_sizes(p)

    if linebreak and " " in new_text:
        # split last English sentence onto second line when we have both scripts
        zh_part = new_text
        en_part = ""
        # bilingual() joins with single space; find first long latin run after CJK
        m = re.search(r"([\u4e00-\u9fff].*?)\s+([A-Z].+)$", new_text)
        if m and len(m.group(2)) > 20:
            zh_part, en_part = m.group(1), m.group(2)

        texts[0].text = zh_part
        texts[0].set(f"{{{XML_NS}}}space", "preserve")
        for t in texts[1:]:
            t.text = None
        if en_part:
            first_r = texts[0].getparent()
            if first_r is not None and first_r.tag == W_R:
                rpr = first_r.find(W_RPR)
                new_r = etree.Element(W_R)
                if rpr is not None:
                    new_r.append(etree.fromstring(etree.tostring(rpr)))
                    for sz in list(new_r.iter(W_SZ)) + list(new_r.iter(W_SZCS)):
                        val = sz.get(W_VAL)
                        if val and val.isdigit():
                            sz.set(W_VAL, str(max(14, int(int(val) * 0.88))))
                new_r.append(etree.Element(W_BR))
                t_el = etree.SubElement(new_r, W_T)
                t_el.set(f"{{{XML_NS}}}space", "preserve")
                t_el.text = en_part
                first_r.addnext(new_r)
        return

    texts[0].text = new_text
    texts[0].set(f"{{{XML_NS}}}space", "preserve")
    for t in texts[1:]:
        t.text = None


def process_xml(xml_bytes: bytes) -> tuple[bytes, int]:
    root = etree.fromstring(xml_bytes)
    changed = 0
    for p in root.iter(W_P):
        raw = paragraph_text(p)
        if not raw.strip():
            continue
        new, linebreak = translate_paragraph(raw)
        if not new or new == raw:
            continue
        set_paragraph_text(p, new, linebreak, len(raw))
        changed += 1
    out = etree.tostring(
        root,
        xml_declaration=True,
        encoding="UTF-8",
        standalone=True,
    )
    return out, changed


def should_process(name: str) -> bool:
    if not name.startswith("word/") or not name.endswith(".xml"):
        return False
    skip = (
        "fontTable",
        "settings",
        "webSettings",
        "theme",
        "styles",
        "_rels",
        "numbering",
        "people",
        "comments",
    )
    return not any(s in name for s in skip)


def convert_docx(src: Path, dst: Path) -> int:
    print(f"Converting {src.name} -> {dst.name}")
    total = 0
    with zipfile.ZipFile(src, "r") as zin:
        with zipfile.ZipFile(dst, "w") as zout:
            for info in zin.infolist():
                data = zin.read(info.filename)
                if should_process(info.filename):
                    try:
                        data, n = process_xml(data)
                        total += n
                        print(f"  {info.filename}: {n} paragraphs")
                    except Exception as exc:
                        print(f"  SKIP {info.filename}: {exc}")
                zout.writestr(info, data, compress_type=info.compress_type)
    print(f"  total paragraphs updated: {total}")
    return total


def main():
    src_dir = Path(r"c:\Users\Administrator\Desktop\资料\pdf")
    jobs = [
        src_dir / "WhaleCatalog2025.docx",
        src_dir / "维钛.docx",
    ]
    for src in jobs:
        if not src.exists():
            print("missing", src)
            continue
        dst = src.with_name(src.stem + "-中英文.docx")
        convert_docx(src, dst)
        print("wrote", dst, "size", dst.stat().st_size)


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
