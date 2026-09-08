import re
import urllib.request

req = urllib.request.Request(
    "https://www.wywmotion.com/",
    headers={"User-Agent": "Mozilla/5.0"},
)
html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")
print("len", len(html))
for pat in ["facebook", "linkedin", "youtube", "instagram", "whatsapp", "twitter", "tiktok"]:
    hits = re.findall(rf"https?://[^\s\"'<>]*{pat}[^\s\"'<>]*", html, re.I)
    print(pat, sorted(set(hits)))

profiles = re.findall(
    r"(?:https?:)?//(?:www\.)?(facebook\.com|linkedin\.com|youtube\.com|instagram\.com|wa\.me|api\.whatsapp\.com)/[^\s\"'<>]+",
    html,
    re.I,
)
print("host hits", profiles[:20])
# dump nearby footer social markup
for m in re.finditer(r".{0,80}(Facebook|LinkedIn|YouTube|Instagram).{0,120}", html, re.I):
    print("---")
    print(m.group(0).replace("\n", " ")[:200])
