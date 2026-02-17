# 部署指南

本文档介绍如何将数字烟花祈愿池应用部署到各种平台。

## 📋 部署前准备

### 1. 构建生产版本

```bash
# 安装依赖
npm install

# 构建
npm run build

# 预览构建结果
npm run preview
```

构建完成后，`dist/` 目录包含所有生产文件。

### 2. 检查构建输出

```bash
dist/
├── assets/
│   ├── index-*.js      # JavaScript 文件
│   ├── index-*.css     # CSS 文件
│   └── *.png           # 图片资源
├── pwa-*.png           # PWA 图标
├── favicon.*           # 网站图标
├── site.webmanifest    # PWA 配置
├── sw.js               # Service Worker
├── workbox-*.js        # Workbox 文件
└── index.html          # HTML 入口
```

## 🚀 部署平台

### 1. Vercel (推荐)

**特点**：
- ✅ 免费 HTTPS
- ✅ 自动部署
- ✅ 全球 CDN
- ✅ 零配置

**步骤**：

1. 安装 Vercel CLI
```bash
npm i -g vercel
```

2. 登录并部署
```bash
vercel login
vercel --prod
```

3. 或通过 GitHub 集成
   - 访问 [vercel.com](https://vercel.com)
   - Import 你的 GitHub 仓库
   - 自动检测 Vite 项目
   - 点击 Deploy

**配置** (`vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2. Netlify

**特点**：
- ✅ 免费 HTTPS
- ✅ 持续部署
- ✅ 表单处理
- ✅ 函数支持

**步骤**：

1. 通过 CLI 部署
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

2. 或通过 GitHub 集成
   - 访问 [netlify.com](https://netlify.com)
   - New site from Git
   - 选择仓库
   - 构建设置：
     - Build command: `npm run build`
     - Publish directory: `dist`

**配置** (`netlify.toml`):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. GitHub Pages

**特点**：
- ✅ 免费托管
- ✅ 与 GitHub 集成
- ✅ 自定义域名

**步骤**：

1. 修改 `vite.config.js`：
```javascript
export default defineConfig({
  base: '/Happy-New-Year/', // 仓库名
  // ... 其他配置
})
```

2. 添加部署脚本到 `package.json`：
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. 安装并部署：
```bash
npm install -D gh-pages
npm run deploy
```

4. 在仓库设置中启用 GitHub Pages
   - Settings → Pages
   - Source: `gh-pages` 分支

**自动部署** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 4. Cloudflare Pages

**特点**：
- ✅ 免费 HTTPS
- ✅ 全球 CDN
- ✅ 无限带宽
- ✅ Web Analytics

**步骤**：

1. 访问 [pages.cloudflare.com](https://pages.cloudflare.com)
2. 连接 GitHub 仓库
3. 构建设置：
   - Build command: `npm run build`
   - Build output: `dist`
   - Node version: 18
4. 部署

### 5. 传统服务器 (Nginx)

**步骤**：

1. 构建项目
```bash
npm run build
```

2. 上传 `dist/` 到服务器

3. Nginx 配置：
```nginx
server {
    listen 80;
    server_name fireworkwish.cmlover.cn;
    
    root /var/www/firework-wishes/dist;
    index index.html;
    
    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Service Worker 不缓存
    location = /sw.js {
        add_header Cache-Control "no-cache";
        proxy_cache_bypass $http_pragma;
    }
    
    # SPA 路由
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

4. 配置 HTTPS (Let's Encrypt)
```bash
sudo certbot --nginx -d fireworkwish.cmlover.cn
```

## 🔧 环境变量

### Vite 环境变量

创建 `.env.production`：
```env
VITE_APP_TITLE=数字烟花祈愿池
VITE_API_URL=https://api.example.com
```

在代码中使用：
```javascript
const title = import.meta.env.VITE_APP_TITLE
```

## ✅ 部署检查清单

部署前确保：

- [ ] 运行 `npm run build` 无错误
- [ ] 运行 `npm run preview` 测试构建结果
- [ ] 所有 PWA 图标已生成
- [ ] Service Worker 正常工作
- [ ] HTTPS 已配置（PWA 必需）
- [ ] 域名 DNS 已解析
- [ ] 环境变量已设置
- [ ] 运行 Lighthouse 检查 PWA 评分

## 🐛 常见问题

### Q: 部署后页面空白？

**A: 检查 base 配置**
```javascript
// vite.config.js
export default defineConfig({
  base: '/', // 确保正确
})
```

### Q: Service Worker 不工作？

**A:**
1. 确保使用 HTTPS
2. 清除浏览器缓存
3. 检查 `sw.js` 是否存在
4. 查看 DevTools → Application → Service Workers

### Q: 静态资源 404？

**A:**
1. 检查 `base` 路径
2. 确保资源在 `public/` 目录
3. 检查服务器配置

### Q: PWA 无法安装？

**A:**
1. 确保 HTTPS
2. 检查 `site.webmanifest`
3. 确保所有图标存在
4. 查看浏览器控制台错误

## 📊 性能优化

### 1. CDN 加速

使用 CDN 加速静态资源：
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue'],
          'icons': ['lucide-vue-next']
        }
      }
    }
  }
})
```

### 2. 资源压缩

服务器启用 Gzip/Brotli 压缩。

### 3. 缓存策略

```nginx
# 长期缓存（带 hash 的文件）
location ~* \.(js|css)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# 短期缓存（HTML）
location = /index.html {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}
```

## 🔒 安全配置

### HTTP Headers

```nginx
# 安全头
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';" always;
```

## 📈 监控

### 1. Google Analytics

添加到 `index.html`：
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Sentry (错误追踪)

```bash
npm install @sentry/vue
```

```javascript
// main.js
import * as Sentry from "@sentry/vue"

Sentry.init({
  app,
  dsn: "YOUR_DSN",
  environment: "production"
})
```

## 🎯 推荐配置

**生产环境推荐**：
- Vercel / Cloudflare Pages（简单、免费）
- 自有服务器 + Nginx + Let's Encrypt（完全控制）

**域名配置**：
- HTTPS 必需（PWA 要求）
- CDN 加速（提升访问速度）
- 合理缓存策略

---

**部署成功！** 你的应用已经在线上运行！🎉

查看演示：https://fireworkwish.cmlover.cn/
