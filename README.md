# CNWSL Chain 官网

基于 Next.js 14（App Router）、TypeScript、Tailwind CSS 的企业官网项目，包含产品中心、解决方案、技术博客（支持定时发布）、新闻展会等模块。

## 技术栈

- Next.js 14 / React 18 / TypeScript
- Tailwind CSS
- 自研多语言（zh / en / vi / es / it / ru）
- Vercel 部署 + GitHub Actions 定时构建

## 本地开发运行步骤

### 环境要求

- Node.js 18+（推荐 20 LTS）
- npm 9+

### 安装依赖

```bash
cd cnwslchain-website
npm install
```

### 启动开发服务器

```bash
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)。

### 常用命令

```bash
npm run build   # 生产构建
npm run start   # 启动生产服务（需先 build）
npm run lint    # ESLint 检查
```

### 本地环境变量（可选）

复制并按需修改：

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

| 变量 | 说明 | 是否必须 |
|------|------|----------|
| `NEXT_PUBLIC_SITE_URL` | 站点完整 URL，用于 sitemap、robots、JSON-LD 绝对链接 | 否（默认 `https://www.cnwslchain.com`） |

> 开发环境下（`npm run dev`）博客会显示全部文章，包括未发布与未到发布时间的内容，便于预览。

---

## 部署到 Vercel（详细步骤）

### 一、将代码推送到 GitHub

1. 在 GitHub 创建仓库（例如 `cnwslchain-website`）。
2. 在本地绑定远程并推送：

```bash
git remote add origin https://github.com/<你的用户名>/cnwslchain-website.git
git branch -M main
git push -u origin main
```

### 二、在 Vercel 连接 GitHub 仓库

1. 打开 [Vercel Dashboard](https://vercel.com/dashboard) 并登录。
2. 点击 **Add New… → Project**。
3. 在 **Import Git Repository** 中选择刚推送的 GitHub 仓库（首次需授权 Vercel 访问 GitHub）。
4. 确认框架预设为 **Next.js**，根目录为仓库根路径。
5. 点击 **Deploy**，等待首次部署完成。

之后每次 `main` 分支有新的 push，Vercel 会自动构建并部署（Production）。

### 三、在 Vercel 设置环境变量

进入项目：**Settings → Environment Variables**，建议至少配置：

| 变量名 | 示例值 | 环境 |
|--------|--------|------|
| `NEXT_PUBLIC_SITE_URL` | `https://www.cnwslchain.com` | Production / Preview / Development |

添加后重新部署一次，使变量生效。

### 四、为 GitHub Actions 定时部署配置 Secrets

博客定时发布依赖 `.github/workflows/schedule-build.yml` 每小时重新构建部署。请在 GitHub 仓库配置以下 Secrets：

路径：**Settings → Secrets and variables → Actions → New repository secret**

| Secret 名称 | 获取方式 |
|-------------|----------|
| `VERCEL_TOKEN` | [Vercel Account Tokens](https://vercel.com/account/tokens) 创建 Token |
| `VERCEL_ORG_ID` | 本地执行 `vercel link` 后查看 `.vercel/project.json` 中的 `orgId`，或在 Vercel 团队设置中查看 |
| `VERCEL_PROJECT_ID` | 同上，`project.json` 中的 `projectId`，或项目 Settings → General |

可用 CLI 快速获取 ID：

```bash
npm i -g vercel
vercel login
vercel link
# 查看 .vercel/project.json
```

配置完成后，可在 GitHub **Actions** 页手动运行 **Hourly Build & Deploy to Vercel** 做一次验证。

---

## 定时发布说明（schedule-build.yml）

文件路径：`.github/workflows/schedule-build.yml`

### 作用

博客文章支持定时发布：在 `data/posts.json` 中设置：

- `isPublished: true`
- `publishedAt`：ISO 时间（例如 `2026-09-01T00:00:00.000Z`）

生产环境仅在 **构建时刻** 满足以下条件时展示文章：

```text
isPublished === true 且 publishedAt <= 当前时间
```

由于页面在构建时生成，需要定期重新构建才能让“到期文章”上线。该 Workflow 的作用就是：

1. **每小时**（UTC 整点：`0 * * * *`）自动运行；
2. 执行 `npm ci`、`npm run build`；
3. 使用 Vercel CLI 将生产环境部署到 Vercel。

也可通过 GitHub Actions 的 **Run workflow** 手动触发。

### 与 Vercel Git 集成的关系

- **代码变更**：靠 Vercel 连接 GitHub 的自动部署即可。
- **仅时间到达、代码未变**：靠本 Workflow 每小时强制重建，实现近似“定时发布”。

---

## 绑定自定义域名 cnwslchain.com

在 Vercel 项目中完成域名绑定，并在域名服务商处配置 DNS。

### 1. 在 Vercel 添加域名

1. 打开项目 → **Settings → Domains**。
2. 添加：
   - `cnwslchain.com`
   - `www.cnwslchain.com`（建议一并添加）
3. 按 Vercel 提示选择重定向策略，例如：
   - `cnwslchain.com` → 重定向到 `www.cnwslchain.com`，或反过来（二选一保持统一）。

### 2. 配置 DNS（域名注册商）

登录域名服务商（阿里云、腾讯云、Cloudflare、GoDaddy 等），添加记录：

**推荐：使用 A 记录指向根域名（apex）**

| 类型 | 主机记录 | 值 |
|------|----------|-----|
| A | `@` | `76.76.21.21`（以 Vercel Domains 页面显示为准） |
| CNAME | `www` | `cname.vercel-dns.com`（以 Vercel 提示为准） |

若使用 Cloudflare 等代理 DNS，请按 Vercel 文档关闭橙色云代理（设为 DNS only），或按其官方指引配置。

### 3. 等待生效并验证

1. DNS 通常数分钟到 48 小时内生效。
2. 在 Vercel Domains 页面状态变为 **Valid**。
3. 访问：
   - https://cnwslchain.com
   - https://www.cnwslchain.com
4. 将 Vercel 环境变量 `NEXT_PUBLIC_SITE_URL` 设为最终对外地址（例如 `https://www.cnwslchain.com`），并重新部署。

### 4. HTTPS

Vercel 会自动签发并续期 SSL 证书，无需额外配置。

---

## 项目结构（简要）

```text
cnwslchain-website/
├── data/                 # 产品、博客、新闻 JSON 数据
├── public/               # 静态资源
├── src/
│   ├── app/              # App Router 页面、sitemap、robots
│   ├── components/       # 导航、表单等组件
│   └── lib/              # 数据读取与站点配置
├── .github/workflows/    # 定时构建部署
├── vercel.json           # Vercel 项目配置
└── package.json
```

## 许可证

Private — 仅供 CNWSL Chain 项目使用。
