import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// 插件：在生产构建时注入禁用调试工具的脚本
const injectDisableDebugScript = () => {
  return {
    name: 'inject-disable-debug',
    transformIndexHtml(html) {
      // 只在生产构建时注入
      if (process.env.NODE_ENV === 'production') {
        const disableScript = `
    <script>
      (function() {
        'use strict';
        const noop = function() {};
        const methods = ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace', 'dir', 'dirxml', 'group', 'groupCollapsed', 'groupEnd', 'clear', 'count', 'countReset', 'assert', 'profile', 'profileEnd', 'time', 'timeLog', 'timeEnd', 'timeStamp'];
        methods.forEach(function(m) { if (console[m]) console[m] = noop; });
        try { Object.freeze(console); } catch(e) {}
        window.eval = function() { throw new Error('eval is disabled'); };
      })();
    </script>`
        return html.replace('</title>', `</title>${disableScript}`)
      }
      return html
    }
  }
}

export default defineConfig({
  plugins: [
    vue(), 
    injectDisableDebugScript(),
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
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        // 运行时缓存策略
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1年
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30天
              }
            }
          }
        ],
        // 清理过期缓存
        cleanupOutdatedCaches: true,
        // 跳过等待，立即激活新的Service Worker
        skipWaiting: true,
        clientsClaim: true
      },
      devOptions: {
        enabled: true,  // 在开发环境也启用PWA，便于测试
        type: 'module'
      }
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true
  },
  build: {
    sourcemap: false,  // 关闭 source map，防止源代码泄露
    minify: 'terser',  // 使用 terser 进行更彻底的压缩
    terserOptions: {
      compress: {
        drop_console: true,      // 移除所有 console
        drop_debugger: true,     // 移除所有 debugger
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']  // 确保移除这些方法
      },
      format: {
        comments: false  // 移除所有注释
      }
    }
  }
})
