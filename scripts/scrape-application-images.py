# -*- coding: utf-8 -*-
import re
import urllib.request
from pathlib import Path
from html.parser import HTMLParser

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

URLS = [
    "https://www.whale-itech.com/index.php?a=index&classid=18&m=list",
    "https://www.whale-itech.com/",
    "https://www.whale-itech.com/index.php?a=index&classid=15&m=list",
    "https://www.longo-tech.com/",
    "https://www.longo-tech.com/application.html",
    "https://www.longo-tech.com/applications.html",
    "https://www.longo-tech.com/product-application.html",
]

class ImgParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.imgs = []

    def handle_starttag(self, tag, attrs):
        if tag != "img":
            return
        d = dict(attrs)
        for k in ("src", "data-src", "data-original", "data-lazy"):
            if d.get(k):
                self.imgs.append(d[k])


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "ignore")


def abs_url(base: str, src: str) -> str:
    if src.startswith("//"):
        return "https:" + src
    if src.startswith("http"):
        return src
    if src.startswith("/"):
        from urllib.parse import urljoin
        return urljoin(base, src)
    from urllib.parse import urljoin
    return urljoin(base, src)


for url in URLS:
    try:
        html = fetch(url)
    except Exception as e:
        print("FAIL", url, e)
        continue
    p = ImgParser()
    p.feed(html)
    # also regex background images
    bg = re.findall(r"url\((['\"]?)([^)'\"]+\.(?:jpg|jpeg|png|webp|gif))\1\)", html, re.I)
    all_imgs = list(p.imgs) + [b[1] for b in bg]
    print("====", url, "imgs", len(all_imgs))
    for i in all_imgs:
        if any(x in i.lower() for x in (".jpg", ".jpeg", ".png", ".webp", ".gif")):
            print(" ", abs_url(url, i))
