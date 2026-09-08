import re
import urllib.request

html = urllib.request.urlopen(
    urllib.request.Request(
        "https://www.wywmotion.com/",
        headers={"User-Agent": "Mozilla/5.0"},
    ),
    timeout=30,
).read().decode("utf-8", "ignore")

for pat in [r"https?://wa\.me/[^\s\"'<>]+", r"https?://api\.whatsapp\.com/[^\s\"'<>]+", r"whatsapp://[^\s\"'<>]+"]:
    print(pat, re.findall(pat, html, re.I))

# mobile from siteConfig context - search tel and whatsapp nearby
for m in re.finditer(r".{0,60}[Ww]hats[Aa]pp.{0,120}", html):
    print(m.group(0).replace("\n", " ")[:180])
    print("---")
