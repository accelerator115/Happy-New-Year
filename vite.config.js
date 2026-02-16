import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

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
  plugins: [vue(), injectDisableDebugScript()],
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
