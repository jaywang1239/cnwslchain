# -*- coding: utf-8 -*-
import sys
import zipfile
from lxml import etree

sys.stdout.reconfigure(encoding="utf-8")
W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


def paras(path, limit=80, needle=None):
    with zipfile.ZipFile(path) as z:
        root = etree.fromstring(z.read("word/document.xml"))
    out = []
    for p in root.iter(W + "p"):
        s = "".join(t.text or "" for t in p.iter(W + "t")).strip()
        if not s:
            continue
        if needle and needle not in s:
            continue
        out.append(s)
        if not needle and len(out) >= limit:
            break
    return out


print("==== 维钛 bilingual first 50 ====")
for s in paras(r"c:\Users\Administrator\Desktop\资料\pdf\维钛-中英文.docx", 50):
    print("-", s[:180])

print("\n==== Whale bilingual first 40 ====")
for s in paras(r"c:\Users\Administrator\Desktop\资料\pdf\WhaleCatalog2025-中英文.docx", 40):
    print("-", s[:180])

print("\n==== 维钛 公司简介 ====")
for s in paras(r"c:\Users\Administrator\Desktop\资料\pdf\维钛-中英文.docx", needle="公司简介"):
    print("-", s[:220])

print("\n==== 维钛 架空 ====")
n = 0
for s in paras(r"c:\Users\Administrator\Desktop\资料\pdf\维钛-中英文.docx", needle="架空"):
    if n < 15:
        print("-", s[:200])
    n += 1
print("count", n)

print("\n==== Whale Company ====")
for s in paras(
    r"c:\Users\Administrator\Desktop\资料\pdf\WhaleCatalog2025-中英文.docx", needle="Company"
):
    print("-", s[:220])
