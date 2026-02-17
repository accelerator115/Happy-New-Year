# PWA 配置指南

本项目已配置为 Progressive Web App (PWA)，支持离线访问和安装为独立应用。

## 📦 已安装的依赖

```json
{
  "vite-plugin-pwa": "^1.2.0"
}
```

## ⚙️ 配置文件

### Vite 配置 (vite.config.js)

```javascript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['*.png', '*.svg', '*.ico'],
      manifest: {
        name: '数字烟花祈愿池',
        short_name: '烟花祈愿',
        description: '新年数字烟花祈愿池 - 放烟花，许心愿',
        theme_color: '#1a1a2e',
        background_color: '#0f0f1e',
        display: 'standalone',
        icons: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        runtimeCaching: [...],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true
      }
    })
  ]
})
```

### Service Worker 注册 (main.js)

```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then((registration) => {
    registration.addEventListener('updatefound', () => {
      // 处理更新逻辑
    })
  })
}
```

## 🎨 所需图标

PWA 需要以下图标文件（放在 `public/` 目录）：

### 必需文件
- `pwa-192x192.png` - 192x192 像素
- `pwa-512x512.png` - 512x512 像素
- `apple-touch-icon.png` - 180x180 像素
- `favicon.ico` - 32x32 或 16x16
- `favicon.svg` - 矢量图标

## 📱 HTML Meta 标签

在 `index.html` 中添加：

```html
<!-- PWA Meta Tags -->
<meta name="theme-color" content="#1a1a2e" />
<meta name="description" content="🎆 数字烟花祈愿池 - 新年交互式烟花祝福应用" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

<!-- Favicon -->
<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

## 🚀 构建和测试

```bash
# 构建生产版本
npm run build

# 预览（测试 PWA 功能）
npm run preview
```

## ✅ 验证 PWA

### Chrome DevTools

1. 打开 `http://localhost:4173`
2. 按 F12 打开 DevTools
3. 切换到 **Application** 标签
4. 检查：
   - **Manifest** - 应用信息和图标
   - **Service Workers** - 激活状态
   - **Cache Storage** - 缓存的资源

### Lighthouse 评分

1. DevTools → **Lighthouse**
2. 选择 **Progressive Web App**
3. 点击 **Generate report**
4. 目标：PWA 分数 > 90

## 📲 安装测试

### 桌面端 (Chrome/Edge)
- 地址栏会显示"安装"图标
- 点击安装，应用将作为独立窗口打开

### Android (Chrome)
- 菜单 → "添加到主屏幕"
- 图标添加到主屏幕

### iOS (Safari)
- 分享按钮 → "添加到主屏幕"
- 图标添加到主屏幕

## 🔧 离线功能测试

1. 首次在线访问应用
2. 关闭浏览器
3. 启用飞行模式
4. 重新打开应用
5. ✅ 应用应该能正常显示和运行

## 📝 Workbox 缓存策略

### 字体缓存
```javascript
{
  urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
  handler: 'CacheFirst',
  options: {
    cacheName: 'google-fonts-cache',
    expiration: { maxAgeSeconds: 60 * 60 * 24 * 365 }
  }
}
```

### 图片缓存
```javascript
{
  urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
  handler: 'CacheFirst',
  options: {
    cacheName: 'images-cache',
    expiration: { 
      maxEntries: 50,
      maxAgeSeconds: 60 * 60 * 24 * 30 
    }
  }
}
```

## 🐛 常见问题

### Q: Service Worker 没有激活？
**A:** 
- 确保使用 HTTPS 或 localhost
- 清除浏览器缓存
- 在 DevTools → Application → Service Workers 中点击 "Unregister"

### Q: 图标没有显示？
**A:**
- 检查图标文件是否在 `public/` 目录
- 文件名是否正确
- 清除缓存后重新构建

### Q: 无法安装应用？
**A:**
- 确保所有必需图标都已创建
- 检查 `manifest.webmanifest` 文件
- 生产环境需要 HTTPS

## 🌐 部署要求

- ✅ **HTTPS** - PWA 强制要求（localhost 除外）
- ✅ **Service Worker** - 服务器支持正确的 MIME 类型
- ✅ **Manifest** - 正确的 JSON 格式
- ✅ **图标** - 所有尺寸的图标文件

## 📚 相关资源

- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- [Workbox](https://developers.google.com/web/tools/workbox)
- [PWA Builder](https://www.pwabuilder.com/)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)

---

**PWA 配置完成！** 你的应用现在可以离线访问并安装为独立应用！🎉
