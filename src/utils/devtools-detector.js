/**
 * 开发者工具检测器
 * 仅在生产环境启用
 */

let isDevToolsOpen = false
let checkInterval = null
let lastCheck = 0
const CHECK_INTERVAL = 1000

/**
 * 检测开发者工具是否打开
 */
const detectDevTools = () => {
  const threshold = 160
  const widthThreshold = window.outerWidth - window.innerWidth > threshold
  const heightThreshold = window.outerHeight - window.innerHeight > threshold
  
  // 检测窗口尺寸差异（开发者工具会占用空间）
  return widthThreshold || heightThreshold
}

/**
 * 当检测到开发者工具时的处理函数
 */
const onDevToolsOpen = () => {
  if (isDevToolsOpen) return
  
  isDevToolsOpen = true
  console.clear()
  
  // 显示警告信息
  document.body.insertAdjacentHTML('beforeend', `
    <div id="devtools-warning" style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      backdrop-filter: blur(20px);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      animation: fadeIn 0.3s ease-out;
    ">
      <style>
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      </style>
      <div style="text-align: center; max-width: 500px; padding: 40px;">
        <div style="font-size: 64px; margin-bottom: 24px; animation: pulse 2s ease-in-out infinite;">⚠️</div>
        <h1 style="font-size: 32px; margin-bottom: 16px; font-weight: 700;">检测到开发者工具</h1>
        <p style="font-size: 16px; opacity: 0.9; line-height: 1.6; margin-bottom: 24px;">
          为了保护页面内容和用户体验，请关闭开发者工具后继续访问。
        </p>
        <p style="font-size: 14px; opacity: 0.7;">
          Developer Tools Detected<br>
          Please close DevTools to continue
        </p>
      </div>
    </div>
  `)
  
  // 模糊化主内容
  const mainContent = document.querySelector('.firework-app')
  if (mainContent) {
    mainContent.style.filter = 'blur(20px)'
    mainContent.style.pointerEvents = 'none'
    mainContent.style.userSelect = 'none'
  }
}

/**
 * 当开发者工具关闭时的处理函数
 */
const onDevToolsClose = () => {
  if (!isDevToolsOpen) return
  
  isDevToolsOpen = false
  
  // 移除警告层
  const warning = document.getElementById('devtools-warning')
  if (warning) {
    warning.style.animation = 'fadeOut 0.3s ease-out'
    setTimeout(() => warning.remove(), 300)
  }
  
  // 恢复主内容
  const mainContent = document.querySelector('.firework-app')
  if (mainContent) {
    mainContent.style.filter = ''
    mainContent.style.pointerEvents = ''
    mainContent.style.userSelect = ''
  }
}

/**
 * 启动检测
 */
export const startDevToolsDetection = () => {
  // 仅在生产环境启用
  if (import.meta.env.DEV) {
    console.log('🔧 开发环境，跳过开发者工具检测')
    return
  }
  
  console.log('🛡️ 生产环境，启用开发者工具检测')
  
  // 禁用右键菜单
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    return false
  })
  
  // 禁用常见快捷键
  document.addEventListener('keydown', (e) => {
    // F12
    if (e.key === 'F12') {
      e.preventDefault()
      return false
    }
    
    // Ctrl+Shift+I / Cmd+Option+I
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
      e.preventDefault()
      return false
    }
    
    // Ctrl+Shift+J / Cmd+Option+J
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'J') {
      e.preventDefault()
      return false
    }
    
    // Ctrl+Shift+C / Cmd+Option+C
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
      e.preventDefault()
      return false
    }
    
    // Ctrl+U / Cmd+U (查看源代码)
    if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
      e.preventDefault()
      return false
    }
  })
  
  // 定期检测
  checkInterval = setInterval(() => {
    const now = Date.now()
    if (now - lastCheck < CHECK_INTERVAL) return
    lastCheck = now
    
    const detected = detectDevTools()
    
    if (detected && !isDevToolsOpen) {
      onDevToolsOpen()
    } else if (!detected && isDevToolsOpen) {
      onDevToolsClose()
    }
  }, CHECK_INTERVAL)
  
  // 清空控制台并显示警告
  console.clear()
  console.log('%c警告 Warning', 'color: red; font-size: 48px; font-weight: bold;')
  console.log('%c请勿在此处粘贴任何代码！', 'color: orange; font-size: 20px; font-weight: bold;')
  console.log('%cDo not paste any code here!', 'color: orange; font-size: 16px;')
  console.log('%c这可能导致您的账户被盗或恶意操作。', 'color: white; font-size: 14px;')
  console.log('%cThis could lead to account theft or malicious actions.', 'color: white; font-size: 12px;')
}

/**
 * 停止检测
 */
export const stopDevToolsDetection = () => {
  if (checkInterval) {
    clearInterval(checkInterval)
    checkInterval = null
  }
  
  onDevToolsClose()
}

/**
 * 混淆控制台输出
 */
export const obfuscateConsole = () => {
  if (import.meta.env.DEV) return
  
  // 重写 console 方法
  const noop = () => {}
  const methods = ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace', 'dir', 'group', 'groupEnd']
  
  methods.forEach(method => {
    if (console[method]) {
      console[method] = noop
    }
  })
}

// 添加额外的保护措施
if (!import.meta.env.DEV) {
  // 防止通过 iframe 嵌入
  if (window.self !== window.top) {
    window.top.location = window.self.location
  }
  
  // 添加版权信息
  const style = [
    'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'color: white',
    'font-size: 14px',
    'font-weight: bold',
    'padding: 10px 20px',
    'border-radius: 8px'
  ].join(';')
  
  console.log('%c🎆 Happy New Year - Fireworks & Wishes', style)
  console.log('%cMade with ❤️', 'font-size: 12px; color: #999;')
}
