#!/usr/bin/env bash
# CNWSL 官网每周自测脚本
# 用法: bash ops/seo/selfcheck.sh [base_url]
# 输出: ops/reports/report-YYYY-MM-DD.md + 控制台 PASS/FAIL 汇总
set -u

S="${1:-https://www.cnwslchain.com}"
cd "$(dirname "$0")/../.." || exit 1
OUT="ops/reports"
mkdir -p "$OUT"
DATE=$(date +%Y-%m-%d)
REPORT="$OUT/report-$DATE.md"

PASS=0; FAIL=0
declare -a FAILURES

ok()   { PASS=$((PASS+1)); printf '  ✅ %s\n' "$1"; }
bad()  { FAIL=$((FAIL+1)); FAILURES+=("$1"); printf '  ❌ %s\n' "$1"; }

{
echo "# CNWSL 官网自测报告 — $DATE"
echo
echo "目标: $S"
echo
} > "$REPORT"

echo "===== A. 关键路由 ====="
{
echo "## A. 关键路由状态码"
echo
echo "| 路径 | 状态 |"
echo "| --- | --- |"
} >> "$REPORT"
for p in / /en /vi /es /it /ru /products /about /contact /blog /news /guides/selection; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$S$p")
  echo "| $p | $code |" >> "$REPORT"
  [ "$code" = "200" ] && ok "$p -> 200" || bad "$p -> $code (期望 200)"
done

echo
echo "===== J. 域名归一化（裸域名须永久跳转到 www） ====="
{
echo
echo "## J. 域名归一化"
echo
} >> "$REPORT"
BARE="https://cnwslchain.com"
for bp in / /products /guides/selection; do
  b_code=$(curl -s -o /dev/null -w "%{http_code}" "$BARE$bp")
  b_loc=$(curl -s -o /dev/null -D - "$BARE$bp" | grep -i "^location:" | tr -d '\r' || true)
  echo "- $bp -> $b_code $b_loc" >> "$REPORT"
  # 301 与 308 同属百度认可的永久服务器端重定向
  case "$b_code" in
    301|308) ok "裸域名 $bp 永久跳转 ($b_code)" ;;
    *) bad "裸域名 $bp 未永久跳转: $b_code" ;;
  esac
  # 根路径跳转目标不带尾部斜杠（https://www.cnwslchain.com），子路径带
  if [ "$bp" = "/" ]; then
    expect="www.cnwslchain.com"
  else
    expect="www.cnwslchain.com$bp"
  fi
  case "$b_loc" in
    *"$expect"*) ok "裸域名 $bp 保留路径指向 www" ;;
    *) bad "裸域名 $bp 跳转目标异常: $b_loc" ;;
  esac
done

echo
echo "===== B. 语言策略（中文兜底 / 不清 cookie 不跳英文） ====="
{
echo
echo "## B. 语言策略"
echo
} >> "$REPORT"
loc=$(curl -s -o /dev/null -D - "$S/" | grep -i "^location:" || true)
[ -z "$loc" ] && ok "无 cookie 访问 / 不跳转" || bad "无 cookie 访问 / 被跳到 $loc"
loc2=$(curl -s -o /dev/null -D - -H "Cookie: cnwsl_locale=en" "$S/" | grep -i "^location:" || true)
[ -z "$loc2" ] && ok "带 en cookie 访问 / 不跳转" || bad "带 en cookie 访问 / 被跳到 $loc2"
curl -s "$S/" -o "$OUT/zh.html"
curl -sL "$S/en" -o "$OUT/en.html"
zh_lang=$(grep -o '<html[^>]*lang="[^"]*"' "$OUT/zh.html" | head -1)
en_lang=$(grep -o '<html[^>]*lang="[^"]*"' "$OUT/en.html" | head -1)
echo "- 首页 $zh_lang" >> "$REPORT"
echo "- /en $en_lang" >> "$REPORT"
case "$zh_lang" in *'lang="zh-CN"'*) ok "首页返回中文" ;; *) bad "首页非中文: $zh_lang" ;; esac
case "$en_lang" in *'lang="en"'*)   ok "/en 返回英文" ;; *) bad "/en 非英文: $en_lang" ;; esac

echo
echo "===== K. 全站域名一致性（必须统一 https://www.cnwslchain.com） ====="
{
echo
echo "## K. 域名一致性"
echo
} >> "$REPORT"
# K1: canonical 必须全部是 www
nonwww_canon=0
for f in "$OUT"/zh.html "$OUT"/en.html "$OUT"/guides.html; do
  [ -f "$f" ] || continue
  c=$(grep -o 'rel="canonical" href="[^"]*"' "$f" | head -1)
  case "$c" in
    *"https://www.cnwslchain.com"*) ;;
    "") ;;
    *) nonwww_canon=$((nonwww_canon+1)); echo "- 非规范 canonical: $(basename $f) $c" >> "$REPORT" ;;
  esac
done
[ "$nonwww_canon" -eq 0 ] && ok "各页 canonical 均为 www" || bad "有 $nonwww_canon 个页面 canonical 不是 www"

# K2: 页面内不得出现 http:// 明文或裸域
bad_proto=0
for f in "$OUT"/zh.html "$OUT"/en.html "$OUT"/guides.html; do
  [ -f "$f" ] || continue
  n=$(grep -o -E 'http://cnwslchain\.com|http://www\.cnwslchain\.com|https://cnwslchain\.com' "$f" | wc -l | tr -d ' ')
  bad_proto=$((bad_proto+n))
done
[ "$bad_proto" -eq 0 ] && ok "页面无 http:// 明文/裸域 URL" || bad "页面有 $bad_proto 处非规范域名"

# K3: 大小写异常
bad_case=0
for f in "$OUT"/zh.html "$OUT"/en.html "$OUT"/guides.html; do
  [ -f "$f" ] || continue
  n=$(grep -o -E 'CNWSLChain|cnwslChain|Cnwslchain|CNWSLCHAIN' "$f" | wc -l | tr -d ' ')
  bad_case=$((bad_case+n))
done
[ "$bad_case" -eq 0 ] && ok "无域名大小写异常" || bad "有 $bad_case 处大小写异常"

# K4: sitemap 必须 100% 是 www
sm_nonwww=$(curl -sL "$S/sitemap.xml" | grep -o '<loc>[^<]*</loc>' | grep -vc 'https://www\.cnwslchain\.com')
[ "$sm_nonwww" -eq 0 ] && ok "sitemap 全部为 www 域名" || bad "sitemap 有 $sm_nonwww 条非 www"

# K5: robots 的 Host / Sitemap 指 www
rb=$(curl -sL "$S/robots.txt")
case "$rb" in
  *"Host: https://www.cnwslchain.com"*) ok "robots Host 指向 www" ;;
  *) bad "robots Host 非 www" ;;
esac
case "$rb" in
  *"Sitemap: https://www.cnwslchain.com/sitemap.xml"*) ok "robots Sitemap 指向 www" ;;
  *) bad "robots Sitemap 非 www" ;;
esac

echo
echo "===== C. 图片加载（直连 /images，非空校验） ====="
{
echo
echo "## C. 图片加载"
echo
} >> "$REPORT"
grep -o 'src="/images/[^"]*"' "$OUT/zh.html" | sed 's/src="//;s/"//' | sort -u > "$OUT/imgs.txt"
n_img=$(wc -l < "$OUT/imgs.txt" | tr -d ' ')
echo "首页引用图片: $n_img 张" >> "$REPORT"
bad_img=0
while read -r p; do
  [ -z "$p" ] && continue
  st=$(curl -s "$S$p" -o "$OUT/_img" -w "%{http_code} %{size_download}")
  set -- $st; code=$1; sz=$2
  if [ "$code" != "200" ] || [ "$sz" -lt 100 ]; then
    echo "- ❌ $p -> $code / ${sz}B" >> "$REPORT"; bad_img=$((bad_img+1))
  fi
done < "$OUT/imgs.txt"
if [ "$bad_img" -eq 0 ]; then ok "全部 $n_img 张图片可加载且非空"; else bad "$bad_img 张图片异常"; fi

echo
echo "===== D. 安全头与缓存 ====="
{
echo
echo "## D. 安全头与缓存"
echo
} >> "$REPORT"
hdr=$(curl -s -o /dev/null -D - "$S/")
for h in "Strict-Transport-Security" "X-Content-Type-Options" "Referrer-Policy" "Permissions-Policy" "Cache-Control"; do
  line=$(echo "$hdr" | grep -i "^$h:" | head -1 | tr -d '\r')
  if [ -n "$line" ]; then echo "- \`$line\`" >> "$REPORT"; ok "$h 在位"; else bad "$h 缺失"; fi
done

echo
echo "===== E. SEO 关键词 ====="
{
echo
echo "## E. SEO 关键词"
echo
} >> "$REPORT"
for kw in "替代Igus" "自动化设备拖链" "坦克链"; do
  c=$(grep -c "$kw" "$OUT/zh.html" || true)
  echo "- 中文「$kw」: $c 次" >> "$REPORT"
  [ "$c" -gt 0 ] && ok "中文关键词 $kw" || bad "中文关键词缺失: $kw"
done
c=$(grep -c "cost-effective Igus alternative" "$OUT/en.html" || true)
echo "- 英文「cost-effective Igus alternative」: $c 次" >> "$REPORT"
[ "$c" -gt 0 ] && ok "英文关键词 Igus alternative" || bad "英文关键词缺失"

echo
echo "===== F. 品牌口径红线 ====="
{
echo
echo "## F. 品牌口径红线"
echo
} >> "$REPORT"
cn=$(grep -c "威仕龙常州" "$OUT/zh.html" || true)
old=$(grep -o "常州办事处" "$OUT/zh.html" | wc -l | tr -d ' ')
echo "- 威仕龙常州 出现: $cn 次 | 旧文案「常州办事处」: $old 次" >> "$REPORT"
[ "$cn" -gt 0 ] && ok "页脚口径 威仕龙常州 在位" || bad "页脚 威仕龙常州 缺失"
[ "$old" -eq 0 ] && ok "无「常州办事处」旧文案残留" || bad "仍有 $old 处旧文案"

echo
echo "===== G. 二维码（选型软件） ====="
{
echo
echo "## G. 二维码"
echo
} >> "$REPORT"
st=$(curl -s "$S/images/home/wechat-miniprogram.webp" -o "$OUT/qr.webp" -w "%{http_code} %{size_download}")
set -- $st; code=$1; sz=$2
echo "- /images/home/wechat-miniprogram.webp -> $code / ${sz}B" >> "$REPORT"
if [ "$code" = "200" ] && [ "$sz" -ge 1000 ]; then ok "选型软件二维码正常 (${sz}B)"; else bad "二维码异常 $code/${sz}B"; fi

echo
echo "===== H. 博客（无图文章应已下架） ====="
{
echo
echo "## H. 博客"
echo
} >> "$REPORT"
curl -sL "$S/blog" -o "$OUT/blog.html"
w=$(grep -c "lifespan-testing" "$OUT/blog.html" || true)
[ "$w" -eq 0 ] && ok "无图文章 (lifespan-testing) 已下架" || bad "无图文章仍在列表"

echo
echo "===== I. 选型指南页（SEO 长尾落地页） ====="
{
echo
echo "## I. 选型指南页 /guides/selection"
echo
} >> "$REPORT"
curl -sL "$S/guides/selection" -o "$OUT/guides.html"
g_sz=$(wc -c < "$OUT/guides.html" | tr -d ' ')
echo "- 页面大小: ${g_sz}B" >> "$REPORT"
if [ "$g_sz" -ge 5000 ]; then ok "选型指南页可访问 (${g_sz}B)"; else bad "选型指南页异常 (${g_sz}B)"; fi

g_title=$(grep -o '<title>[^<]*</title>' "$OUT/guides.html" | head -1)
echo "- $g_title" >> "$REPORT"
case "$g_title" in *拖链怎么选型*) ok "title 含核心长尾词「拖链怎么选型」" ;; *) bad "title 缺核心长尾词: $g_title" ;; esac

g_h1=$(grep -o '<h1[^>]*>[^<]*' "$OUT/guides.html" | head -1)
echo "- H1: $g_h1" >> "$REPORT"
[ -n "$g_h1" ] && ok "H1 存在" || bad "H1 缺失"

g_kw=$(grep -o 'name="keywords" content="[^"]*"' "$OUT/guides.html" | head -1)
echo "- $g_kw" >> "$REPORT"
case "$g_kw" in *弯曲半径*) ok "keywords 含「弯曲半径」等选型词" ;; *) bad "keywords 缺选型词" ;; esac

g_can=$(grep -o 'rel="canonical" href="[^"]*"' "$OUT/guides.html" | head -1)
echo "- $g_can" >> "$REPORT"
case "$g_can" in *guides/selection*) ok "canonical 自指正确" ;; *) bad "canonical 异常" ;; esac

g_bc=$(grep -c 'BreadcrumbList' "$OUT/guides.html" || true)
[ "$g_bc" -ge 1 ] && ok "面包屑 JSON-LD 在位" || bad "面包屑 JSON-LD 缺失"

g_sm=$(curl -sL "$S/sitemap.xml" | grep -c "guides/selection" || true)
echo "- sitemap 中 guides 出现次数: $g_sm" >> "$REPORT"
[ "$g_sm" -ge 1 ] && ok "sitemap 已收录选型指南页" || bad "sitemap 未收录选型指南页"

# ===== L. 搜索引擎验证文件（百度/必应等站点所有权验证） =====
echo "===== L. 搜索引擎验证文件 ====="
{
echo
echo "## L. 搜索引擎验证文件"
echo
} >> "$REPORT"

# L1: 百度验证文件必须可访问且内容正确
# 注意：必须落盘量字节！Git Bash 下 curl -o /dev/null -w %{size_download} 恒为 0
BAIDU_V="baidu_verify_codeva-rdEupXvagt.html"
BAIDU_C="codeva-rdEupXvagt"
mkdir -p "$OUT/verify"
b_code=$(curl -s -o "$OUT/verify/b.html" -w "%{http_code}" --max-time 25 "$S/$BAIDU_V" || true)
b_size=$(wc -c < "$OUT/verify/b.html" 2>/dev/null | tr -d ' ')
b_body=$(cat "$OUT/verify/b.html" 2>/dev/null)
echo "- 百度验证文件: HTTP $b_code, $b_size 字节, 内容=[$b_body]" >> "$REPORT"
if [ "$b_code" = "200" ] && [ "$b_size" -gt 0 ] 2>/dev/null; then
  ok "百度验证文件可访问（$b_size 字节）"
else
  bad "百度验证文件不可访问（HTTP $b_code, $b_size 字节）— 会导致百度站验失败"
fi
case "$b_body" in
  *"$BAIDU_C"*) ok "百度验证文件内容含验证串" ;;
  *) bad "百度验证文件内容不含验证串（实际 [$b_body]）" ;;
esac

# L2: 百度爬虫 UA 访问不得被拦
b_sp=$(curl -s -o "$OUT/verify/bs.html" -w "%{http_code}" --max-time 25 \
  -A "Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)" \
  "$S/$BAIDU_V" || true)
b_spsize=$(wc -c < "$OUT/verify/bs.html" 2>/dev/null | tr -d ' ')
echo "- Baiduspider UA: HTTP $b_sp, $b_spsize 字节" >> "$REPORT"
[ "$b_sp" = "200" ] && [ "$b_spsize" -gt 0 ] 2>/dev/null \
  && ok "百度爬虫 UA 可正常抓取验证文件" \
  || bad "百度爬虫 UA 被拦或空响应（HTTP $b_sp）"

# L3: 首页对百度爬虫可达
b_home=$(curl -s -o /dev/null -w "%{http_code}" --max-time 25 \
  -A "Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)" \
  "$S/" || true)
echo "- Baiduspider 访问首页: HTTP $b_home" >> "$REPORT"
[ "$b_home" = "200" ] && ok "首页对百度爬虫可达" || bad "首页对百度爬虫不可达（HTTP $b_home）"

# ===== M. 中文页 SEO 元数据完整性 =====
echo "===== M. 中文页 SEO 元数据（title 含关键词 / keywords 标签） ====="
{
echo
echo "## M. 中文页 SEO 元数据"
echo
} >> "$REPORT"

mkdir -p "$OUT/seo"
for spec in "/:首页" "/products:产品中心" "/solutions:解决方案" "/about:关于我们" \
            "/contact:联系我们" "/downloads:下载中心" "/blog:技术博客" "/news:新闻展会"; do
  p="${spec%%:*}"; n="${spec##*:}"
  f="$OUT/seo/$(echo "$p" | tr '/' '_').html"
  curl -sL --max-time 30 "$S$p" -o "$f" 2>/dev/null || true
  t=$(grep -o '<title>[^<]*</title>' "$f" 2>/dev/null | head -1 | sed 's/<[^>]*>//g')
  k=$(grep -o 'name="keywords" content="[^"]*"' "$f" 2>/dev/null | head -1)
  echo "- $n ($p): title=[$t] | keywords=$([ -n "$k" ] && echo 有 || echo 无)" >> "$REPORT"
  if [ -z "$t" ]; then
    bad "$n 缺 title"
  elif [ ${#t} -lt 15 ]; then
    bad "$n title 过短（${#t} 字）— 可能未含关键词"
  else
    ok "$n title 正常（${#t} 字）"
  fi
  if [ -n "$k" ]; then
    ok "$n 有 keywords 标签"
  else
    bad "$n 缺 keywords 标签"
  fi
done

# ===== N. 产品详情页 SEO + 性能底线 =====
echo "===== N. 产品详情页 SEO 与性能底线 ====="
{
echo
echo "## N. 产品详情页 SEO 与性能底线"
echo
} >> "$REPORT"

# N1: 抽 3 个中文产品详情页，检查 title 含内高/内宽 + keywords 标签
pcount=0
while read -r spec; do
  [ -z "$spec" ] && continue
  pcount=$((pcount+1))
  [ "$pcount" -gt 3 ] && break
  f="$OUT/seo/product-$pcount.html"
  curl -sL --max-time 30 "$S/products/model/$spec" -o "$f" 2>/dev/null || true
  t=$(grep -o '<title>[^<]*</title>' "$f" 2>/dev/null | head -1 | sed 's/<[^>]*>//g')
  k=$(grep -o 'name="keywords" content="[^"]*"' "$f" 2>/dev/null | head -1)
  echo "- 产品页 $spec: title=[$t] | keywords=$([ -n "$k" ] && echo 有 || echo 无)" >> "$REPORT"
  echo "$t" | grep -q "内高" && ok "产品页 $spec title 含规格词（内高）" || bad "产品页 $spec title 缺规格词"
  [ -n "$k" ] && ok "产品页 $spec 有 keywords 标签" || bad "产品页 $spec 缺 keywords 标签"
done <<'SPECS'
wwc15-15-25
wwc18-18-32
wwc22-22-40
SPECS

# N2: 静态资源必须 gzip（传输体积显著小于原始）
# 注意：Git Bash 下 `-o /dev/null -w %{size_download}` 恒返回 0，必须落盘后量字节。
JS_URL="$S/_next/static/chunks/polyfills-42372ed130431b0a.js"
curl -s --max-time 25 -H "Accept-Encoding: identity" "$JS_URL" -o "$OUT/raw.js" 2>/dev/null || true
curl -s --max-time 25 -H "Accept-Encoding: gzip"     "$JS_URL" -o "$OUT/gz.js"  2>/dev/null || true
raw=$(wc -c < "$OUT/raw.js" 2>/dev/null || echo 0)
gz=$(wc -c < "$OUT/gz.js" 2>/dev/null || echo 0)
raw=$(echo "$raw" | tr -d ' '); gz=$(echo "$gz" | tr -d ' ')
echo "- polyfills.js: 原始 ${raw}B / gzip ${gz}B" >> "$REPORT"
if [ "${gz:-0}" -gt 0 ] 2>/dev/null && [ "${raw:-0}" -gt 0 ] 2>/dev/null && [ "$gz" -lt "$raw" ]; then
  ok "静态 JS 已启用 gzip 压缩（$raw → $gz B）"
else
  bad "静态 JS 未压缩或测量异常（原始 ${raw}B / gzip ${gz}B）"
fi

# N3: HTTP/2 支持（多路复用，国内高延迟线路收益明显）
h2=$(curl -sI --max-time 20 -H "Accept-Encoding: gzip" "$S/" 2>/dev/null | head -1)
echo "- 首页响应首行: $h2" >> "$REPORT"
if echo "$h2" | grep -qiE 'HTTP/2|HTTP/1.1'; then
  ok "首页 HTTP 协议正常"
else
  bad "首页协议异常（$h2）"
fi

# N4: 百度爬虫三类 UA 均可达
b_all=0
for ua in "Baiduspider/2.0" "Baiduspider-render/2.0" "BIDUBrowser"; do
  c_test=$(curl -s -o /dev/null --max-time 25 -w "%{http_code}" \
    -A "Mozilla/5.0 (compatible; $ua; +http://www.baidu.com/search/spider.html)" \
    "$S/" || true)
  [ "$c_test" = "200" ] && b_all=$((b_all+1))
done
echo "- 百度爬虫 UA 可达数: $b_all/3" >> "$REPORT"
[ "$b_all" -eq 3 ] && ok "百度爬虫（普通/渲染/浏览器）3 类 UA 全可达" || bad "百度爬虫部分 UA 不可达（$b_all/3）"

# ===== O. 分类页 SEO + 国内长尾落地页 =====
echo "===== O. 分类页 SEO 与国内长尾落地页 ====="
{
echo
echo "## O. 分类页 SEO 与国内长尾落地页"
echo
} >> "$REPORT"

# O1: 6 个产品分类页 title 必须含「厂家」类关键词 + keywords 标签
for spec in "/products/micro:微型拖链" "/products/medium:中型拖链" "/products/heavy:承重拖链" \
            "/products/silent:静音拖链" "/products/portable:便携式拖链" "/products/cleanroom:无尘拖链"; do
  p="${spec%%:*}"; n="${spec##*:}"
  f="$OUT/seo/cat-$(echo "$p" | tr '/' '_').html"
  curl -sL --max-time 30 "$S$p" -o "$f" 2>/dev/null || true
  t=$(grep -o '<title>[^<]*</title>' "$f" 2>/dev/null | head -1 | sed 's/<[^>]*>//g')
  k=$(grep -o 'name="keywords" content="[^"]*"' "$f" 2>/dev/null | head -1)
  echo "- $n ($p): title=[$t] | keywords=$([ -n "$k" ] && echo 有 || echo 无)" >> "$REPORT"
  if echo "$t" | grep -q "厂家\|拖链厂家"; then
    ok "$n 分类页 title 含厂家词（${#t} 字）"
  else
    bad "$n 分类页 title 未含厂家词（$t）"
  fi
  if [ -n "$k" ]; then
    ok "$n 分类页有 keywords 标签"
  else
    bad "$n 分类页缺 keywords 标签"
  fi
done

# O2: 国内长尾落地页 /price /cases /factory 必须 200 + title + keywords + H1 + canonical
for spec in "/price:价格页" "/cases:应用案例页" "/factory:地域工厂页"; do
  p="${spec%%:*}"; n="${spec##*:}"
  f="$OUT/seo/landing-$(echo "$p" | tr '/' '_').html"
  code=$(curl -sL --max-time 30 -o "$f" -w "%{http_code}" "$S$p" 2>/dev/null || echo 000)
  t=$(grep -o '<title>[^<]*</title>' "$f" 2>/dev/null | head -1 | sed 's/<[^>]*>//g')
  k=$(grep -o 'name="keywords" content="[^"]*"' "$f" 2>/dev/null | head -1)
  h1=$(grep -o '<h1[^>]*>[^<]*</h1>' "$f" 2>/dev/null | head -1 | sed 's/<[^>]*>//g')
  can=$(grep -o 'rel="canonical" href="[^"]*"' "$f" 2>/dev/null | head -1)
  echo "- $n ($p): HTTP $code | title=[$t] | H1=[$h1]" >> "$REPORT"
  echo "  canonical=$can | keywords=$([ -n "$k" ] && echo 有 || echo 无)" >> "$REPORT"
  [ "$code" = "200" ] && ok "$n 可访问（200）" || bad "$n 不可访问（HTTP $code）"
  [ -n "$t" ] && ok "$n 有 title" || bad "$n 缺 title"
  [ -n "$k" ] && ok "$n 有 keywords" || bad "$n 缺 keywords"
  [ -n "$h1" ] && ok "$n 有 H1" || bad "$n 缺 H1"
  echo "$can" | grep -q "www.cnwslchain.com" && ok "$n canonical 规范" || bad "$n canonical 异常（$can）"
done

# O3: 新落地页必须被 sitemap 收录
sm=$(curl -sL --max-time 40 "$S/sitemap.xml" 2>/dev/null || true)
echo "$sm" > "$OUT/seo/sitemap.xml"
for p in "/price" "/cases" "/factory"; do
  if echo "$sm" | grep -q "www.cnwslchain.com$p<"; then
    ok "sitemap 已收录 $p"
  else
    bad "sitemap 未收录 $p"
  fi
done

# 汇总
{
echo
echo "---"
echo
echo "## 汇总"
echo
echo "- 通过: **$PASS**"
echo "- 失败: **$FAIL**"
echo
if [ "$FAIL" -gt 0 ]; then
  echo "### 失败项"
  echo
  for f in "${FAILURES[@]}"; do echo "- $f"; done
else
  echo "全部检查通过 ✅"
fi
} >> "$REPORT"

echo
echo "================================"
echo "汇总: PASS=$PASS  FAIL=$FAIL"
[ "$FAIL" -gt 0 ] && { echo "失败项:"; for f in "${FAILURES[@]}"; do echo "  - $f"; done; }
echo "报告: $REPORT"
exit 0
