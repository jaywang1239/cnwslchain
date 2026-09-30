# ops — 官网线上运维与 SEO 资产

CNWSL 官网（<https://www.cnwslchain.com>，Next.js App Router + Hostinger）的**运维与 SEO 长期资产**。

本目录只放「跑在网站源码之外」的东西——脚本、方案、审计结论。网站源码在 `src/`，构建工具在 `tools/`、`scripts/`。

## 目录

| 路径 | 用途 |
| --- | --- |
| `baidu/push_daily.py` | 百度「普通收录 → API 推送」每日自动推送（10 条/天，只推中文页） |
| `baidu/push_state.json` | 推送台账（已推 URL + 日期）；脚本每次运行会覆写，属正常运行态 |
| `baidu/RESULT-2026-09-30.md` | 百度站点验证 + 首轮推送结果存档 |
| `seo/CNWSL-国内推广关键词方案.md` | 五层关键词库 + 各页落位表 + P0 技术问题清单 |
| `seo/selfcheck.sh` | 线上自测（13 组 78 项），输出报告到 `ops/reports/` |
| `seo/网站优化自查-2026-09-28.md` | SEO + 打开速度全面自查结论 |
| `seo/全站域名统一审计报告-2026-09-28.md` | 域名归一化（裸域 → www）审计 |
| `seo/域名归一化报告-2026-09-28.md` | 同上，实施记录 |
| `seo/本轮SEO上线报告-2026-09-28.md` | 该轮 SEO 改动上线清单 |

## 常用操作

```bash
# 每周自测（默认打线上正式域）
bash ops/seo/selfcheck.sh
bash ops/seo/selfcheck.sh http://127.0.0.1:3000    # 打本地开发服务

# 百度推送：演练（只看计划，不消耗配额）
python ops/baidu/push_daily.py --dry-run
# 百度推送：真实推送（默认 10 条）
python ops/baidu/push_daily.py
python ops/baidu/push_daily.py --batch 5
```

推送脚本读取**同目录**的 `baidu_token.txt`（该文件不入库，见下）。

## ⚠️ 安全约定（重要）

**本仓库是 public**。以下内容**绝不入库**：

- **服务器 SSH 凭据**（IP / 端口 / 用户名 / 密码）。本地一次性诊断脚本里可能硬编码，保留在本地即可。
- **API 密钥**：百度推送 token、GitHub token。
- **浏览器会话目录**（`chrome-*` 之类，含登录 cookie）。

规则：**脚本一律从外部文件读密钥，不要把密钥写进代码**。
`baidu/push_daily.py` 是范例——它只读同目录的 `baidu_token.txt`，代码里没有任何密钥。
`.gitignore` 已对上述文件名做兜底排除。

## 背景速览（决定了很多做法）

- 站点**未 ICP 备案** → 百度 sitemap 提交配额恒为 0（入口 disabled），只能走 **API 推送**，而 API 是 10 条/天。
- 线上 sitemap 共 **2121 条**，其中 **1765 条**是 en/vi/es/it/ru 语种镜像页。
  百度是中文搜索引擎，推外语页纯属浪费配额 → **实际只需推 356 条中文页**。
  推送脚本据此做中文页过滤，否则 2121 条按 10 条/天要推 212 天，过滤后约 36 天。
- 服务器在**德国法兰克福**（Hostinger），无 CDN，国内访问 TTFB 稳定 1.0–1.4s。
  **备案是接入国内 CDN 的前提**，也是本目录多条「待办」的公共阻塞点。
