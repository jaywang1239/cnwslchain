#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
百度「普通收录 - API 推送」每日自动推送脚本（CNWSL 官网）

背景
----
- 站点未 ICP 备案 → sitemap 提交配额恒为 0，只能走 API 推送。
- API 配额：**10 条/天**（API 与手动提交共享，与 sitemap 配额独立）。
- sitemap 共 2121 条 URL，但其中 1765 条是 en/vi/es/it/ru 语种镜像。
  百度是中文搜索引擎，推外语页纯属浪费配额 → **只推中文页，共 356 条**。

优先级（rank 越小越先推）
------------------------
  0  首页
  1  产品中心 /products
  2  核心落地页 /price /cases /factory /guides/selection
  3  信任页 /solutions /about /contact /downloads
  4  资讯索引 /blog /news
  5  产品分类页 /products/<cat>
  6  产品系列页 /products/<cat>/<series>
  7  blog / news 文章
  9  产品详情页 /products/model/<spec>   （303 条，量最大，放最后）

行为
----
- 每次运行取「未推过的」按优先级取前 10 条推给百度。
- 全部推完一轮后，自动转入「复推」模式：按上次推送日期从最旧开始补。
- 配额用尽（error 400 / over quota）时**不标记任何 URL**，安全退出。

用法
----
  python push_daily.py            # 正常推送
  python push_daily.py --dry-run  # 只看这次会推什么，不消耗配额
  python push_daily.py --batch 5  # 自定义本次条数（默认 10）
"""

import json
import os
import re
import subprocess
import sys
import datetime

BASE = "https://www.cnwslchain.com"
HERE = os.path.dirname(os.path.abspath(__file__))
TOKEN_FILE = os.path.join(HERE, "baidu_token.txt")
STATE_FILE = os.path.join(HERE, "push_state.json")
LOG_FILE = os.path.join(HERE, "push_log.txt")
SITEMAP_CACHE = os.path.join(HERE, "sitemap_full.xml")
SITEMAP_URL = BASE + "/sitemap.xml"
API_TPL = "http://data.zz.baidu.com/urls?site={site}&token={token}"
DEFAULT_BATCH = 10


# ---------------------------------------------------------------- 工具

def log(msg):
    line = "[%s] %s" % (datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), msg)
    print(line)
    try:
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(line + "\n")
    except Exception:
        pass


def read_token():
    if not os.path.exists(TOKEN_FILE):
        log("ERROR 找不到密钥文件 %s" % TOKEN_FILE)
        sys.exit(2)
    tok = open(TOKEN_FILE, encoding="utf-8").read().strip()
    if not tok:
        log("ERROR 密钥文件为空")
        sys.exit(2)
    return tok


def load_state():
    if os.path.exists(STATE_FILE):
        try:
            return json.load(open(STATE_FILE, encoding="utf-8"))
        except Exception as e:
            log("WARN 状态文件损坏，重建：%s" % e)
    return {"version": 1, "pushed": {}, "runs": []}


def save_state(state):
    tmp = STATE_FILE + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(state, f, ensure_ascii=False, indent=2, sort_keys=True)
    os.replace(tmp, STATE_FILE)


# ---------------------------------------------------------------- sitemap

def fetch_sitemap():
    """优先取线上 sitemap，失败则回退本地缓存。返回 URL 列表。"""
    xml = None
    try:
        import urllib.request
        req = urllib.request.Request(SITEMAP_URL, headers={"User-Agent": "cnwsl-seo-bot"})
        xml = urllib.request.urlopen(req, timeout=60).read().decode("utf-8", "ignore")
        if len(xml) > 1000:
            with open(SITEMAP_CACHE, "w", encoding="utf-8") as f:
                f.write(xml)
            log("sitemap 线上拉取成功（%d 字节）" % len(xml))
    except Exception as e:
        log("WARN 线上 sitemap 拉取失败（%s），回退本地缓存" % e)
    if not xml and os.path.exists(SITEMAP_CACHE):
        xml = open(SITEMAP_CACHE, encoding="utf-8", errors="ignore").read()
        log("使用本地缓存 sitemap")
    if not xml:
        log("ERROR 无可用 sitemap，退出")
        sys.exit(3)
    return re.findall(r"<loc>([^<]+)</loc>", xml)


def is_zh(url):
    """中文页判定：路径首段不是 2 字母语种码（en/vi/es/it/ru）。"""
    p = url.replace(BASE, "")
    return not re.match(r"^/[a-z]{2}(/|$)", p)


def rank(url):
    p = url.replace(BASE, "")
    if p == "":
        return 0
    if p == "/products":
        return 1
    if p in ("/price", "/cases", "/factory", "/guides/selection"):
        return 2
    if p in ("/solutions", "/about", "/contact", "/downloads"):
        return 3
    if p in ("/blog", "/news"):
        return 4
    if re.match(r"^/products/[^/]+$", p):
        return 5
    if re.match(r"^/products/[^/]+/[^/]+$", p):
        return 6
    if p.startswith("/blog/") or p.startswith("/news/"):
        return 7
    if p.startswith("/products/model/"):
        return 9
    return 8


def tier_name(url):
    r = rank(url)
    return {0: "T0-首页", 1: "T1-产品中心", 2: "T1-落地页", 3: "T1-信任页",
            4: "T1-资讯索引", 5: "T2-分类页", 6: "T2-系列页",
            7: "T3-文章", 8: "T?-其他", 9: "T4-详情页"}.get(r, "T?-其他")


def build_queue(state):
    """返回 (待推列表, 统计)。未推过的优先；不足则用最旧的复推补。"""
    all_zh = sorted({u for u in fetch_sitemap() if is_zh(u)})
    pushed = state.get("pushed", {})
    never = [u for u in all_zh if u not in pushed]
    never.sort(key=lambda u: (rank(u), u))
    stats = {
        "total_zh": len(all_zh),
        "already": len(all_zh) - len(never),
        "never": len(never),
    }
    return all_zh, never, stats


# ---------------------------------------------------------------- 推送

def push(urls, token):
    """调用百度 API 推送。返回 (ok_urls, remain, raw_dict)。"""
    body = "\n".join(urls) + "\n"
    api = API_TPL.format(site=BASE, token=token)
    raw = None

    # 首选 curl（本机 urllib 对外网偶发 EOF，curl 更稳）
    try:
        reqfile = os.path.join(HERE, "_push_body.txt")
        with open(reqfile, "w", encoding="utf-8") as f:
            f.write(body)
        p = subprocess.run(
            ["curl", "-s", "--max-time", "60", "-H", "Content-Type:text/plain",
             "--data-binary", "@" + reqfile, api],
            capture_output=True, text=True, timeout=90)
        if p.stdout.strip():
            raw = p.stdout.strip()
    except Exception as e:
        log("WARN curl 推送失败（%s），尝试 urllib" % e)

    if raw is None:
        import urllib.request
        req = urllib.request.Request(api, data=body.encode("utf-8"),
                                     headers={"Content-Type": "text/plain"})
        raw = urllib.request.urlopen(req, timeout=60).read().decode("utf-8", "ignore").strip()

    try:
        resp = json.loads(raw)
    except Exception:
        log("ERROR 返回非 JSON：%s" % raw[:300])
        return [], None, {"raw": raw}

    if "error" in resp:
        log("ERROR 百度返回错误：%s" % json.dumps(resp, ensure_ascii=False)[:300])
        return [], resp.get("remain"), resp

    bad = set(resp.get("not_same_site", [])) | set(resp.get("not_valid", []))
    ok = [u for u in urls if u not in bad]
    if bad:
        log("WARN 被拒 URL：%s" % ", ".join(sorted(bad))[:300])
    return ok, resp.get("remain"), resp


# ---------------------------------------------------------------- 主流程

def main():
    dry = "--dry-run" in sys.argv
    batch = DEFAULT_BATCH
    if "--batch" in sys.argv:
        try:
            batch = int(sys.argv[sys.argv.index("--batch") + 1])
        except Exception:
            pass

    log("=" * 62)
    log("百度每日推送开始%s" % ("（演练模式，不消耗配额）" if dry else ""))
    token = read_token()
    state = load_state()

    all_zh, never, stats = build_queue(state)
    log("中文页 %d 条 | 已推 %d | 待推 %d"
        % (stats["total_zh"], stats["already"], stats["never"]))

    # 选批：未推过的优先，不足则用最旧的补齐（复推）
    if len(never) >= batch:
        batch_urls = never[:batch]
    else:
        batch_urls = list(never)
        rest = [u for u in all_zh if u not in set(never)]
        rest.sort(key=lambda u: (state.get("pushed", {}).get(u, "0000-00-00"), rank(u), u))
        batch_urls += rest[: max(0, batch - len(batch_urls))]
        if rest:
            log("本轮进入复推模式（未推过的已全部推完）")

    if not batch_urls:
        log("无待推 URL，结束")
        return

    log("本次计划推送 %d 条：" % len(batch_urls))
    for u in batch_urls:
        log("   %-12s %s" % (tier_name(u), u))

    if dry:
        log("演练模式结束，未调用百度接口")
        return

    ok, remain, resp = push(batch_urls, token)
    log("百度返回：%s" % json.dumps(resp, ensure_ascii=False)[:300])

    if not ok:
        log("本次 0 条成功（配额用尽或接口异常），未修改状态")
        state.setdefault("runs", []).append({
            "ts": datetime.datetime.now().isoformat(timespec="seconds"),
            "pushed": 0, "remain": remain, "note": "no success",
        })
        state["runs"] = state["runs"][-60:]
        save_state(state)
        return

    today = datetime.date.today().isoformat()
    for u in ok:
        state.setdefault("pushed", {})[u] = today
    state.setdefault("runs", []).append({
        "ts": datetime.datetime.now().isoformat(timespec="seconds"),
        "pushed": len(ok), "remain": remain,
    })
    state["runs"] = state["runs"][-60:]
    save_state(state)

    total_zh, never2, stats2 = build_queue(state)
    log("成功 %d 条 | 百度剩余配额 %s | 累计已推 %d/%d | 待推 %d"
        % (len(ok), remain, stats2["already"], stats2["total_zh"], stats2["never"]))
    if stats2["never"] == 0:
        log("🎉 全部中文页已推完一轮，后续进入复推维护模式")


if __name__ == "__main__":
    main()
