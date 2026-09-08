# -*- coding: utf-8 -*-
import re
import ssl
import urllib.request
from urllib.parse import urljoin

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
CTX = ssl.create_default_context()

URLS = [
    "https://www.whale-itech.com/index.php?a=index&classid=18&m=list",
    "https://www.whale-itech.com/",
    "https://www.longo-tech.com/",
]

IMG_RE = re.compile(
    r"""(?:src|data-src|data-original)\s*=\s*["']([^"']+\.(?:jpg|jpeg|png|webp|gif))["']""",
    re.I,
)
BG_RE = re.compile(r"""url\(["']?([^)"']+\.(?:jpg|jpeg|png|webp|gif))["']?\)""", re.I)


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=15, context=CTX) as resp:
        return resp.read().decode("utf-8", "ignore")


for url in URLS:
    try:
        html = fetch(url)
        print("OK", url, len(html))
        found = set()
        for m in IMG_RE.findall(html) + BG_RE.findall(html):
            found.add(urljoin(url, m))
        for i in sorted(found):
            print(" ", i)
    except Exception as e:
        print("ERR", url, type(e).__name__, e)
