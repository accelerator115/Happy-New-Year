import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

createApp(App).mount('#app')

// PWA 更新提示（vite-plugin-pwa 会自动注册 Service Worker）
// 这里只处理更新通知
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then((registration) => {
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // 发现新版本
            if (confirm('🎆 发现新版本！\n点击确定刷新页面以获取最新内容。')) {
              window.location.reload()
            }
          }
        })
      }
    })
  })
}
