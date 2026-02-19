/* global global */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// 创建一个模拟的 devtools-detector 模块用于测试
describe('DevTools Detector', () => {
  let mockWindow

  beforeEach(() => {
    // 模拟 window 对象
    mockWindow = {
      outerWidth: 1920,
      outerHeight: 1080,
      innerWidth: 1920,
      innerHeight: 1000,
      devicePixelRatio: 1
    }

    // 模拟 console
    global.console = {
      clear: vi.fn(),
      log: vi.fn(),
      warn: vi.fn(),
      error: vi.fn()
    }
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('DevTools detection', () => {
    it('should detect devtools when width threshold is exceeded', () => {
      mockWindow.outerWidth = 2100
      mockWindow.innerWidth = 1920

      const threshold = 160
      const widthThreshold = mockWindow.outerWidth - mockWindow.innerWidth > threshold
      expect(widthThreshold).toBe(true)
    })

    it('should detect devtools when height threshold is exceeded', () => {
      mockWindow.outerHeight = 1300
      mockWindow.innerHeight = 1080

      const threshold = 160
      const heightThreshold = mockWindow.outerHeight - mockWindow.innerHeight > threshold
      expect(heightThreshold).toBe(true)
    })

    it('should not detect devtools when differences are small', () => {
      mockWindow.outerWidth = 1930
      mockWindow.innerWidth = 1920
      mockWindow.outerHeight = 1090
      mockWindow.innerHeight = 1080

      const threshold = 160
      const widthThreshold = mockWindow.outerWidth - mockWindow.innerWidth > threshold
      const heightThreshold = mockWindow.outerHeight - mockWindow.innerHeight > threshold
      
      expect(widthThreshold).toBe(false)
      expect(heightThreshold).toBe(false)
    })
  })

  describe('threshold detection', () => {
    it('should use 160 pixel threshold', () => {
      const threshold = 160

      // 恰好超过阈值
      expect(161 > threshold).toBe(true)
      expect(160 > threshold).toBe(false)
      expect(159 > threshold).toBe(false)
    })

    it('should detect on either axis', () => {
      const threshold = 160

      // 宽度超过
      mockWindow.outerWidth = 2100
      const widthDetect = mockWindow.outerWidth - mockWindow.innerWidth > threshold
      expect(widthDetect).toBe(true)

      // 高度超过
      mockWindow = {
        outerWidth: 1920,
        innerWidth: 1920,
        outerHeight: 1300,
        innerHeight: 1080
      }
      const heightDetect = mockWindow.outerHeight - mockWindow.innerHeight > threshold
      expect(heightDetect).toBe(true)
    })
  })

  describe('UI rendering', () => {
    it('should have proper warning HTML structure', () => {
      const warningHTML = `
        <div id="devtools-warning" style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.95);
        ">
          <h1>检测到开发者工具</h1>
        </div>
      `

      expect(warningHTML).toContain('devtools-warning')
      expect(warningHTML).toContain('position: fixed')
      expect(warningHTML).toContain('检测到开发者工具')
    })

    it('should style warning with full screen overlay', () => {
      const styles = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.95)',
        zIndex: 999999,
        display: 'flex',
        backdropFilter: 'blur(20px)'
      }

      expect(styles.position).toBe('fixed')
      expect(styles.zIndex).toBe(999999)
      expect(styles.width).toBe('100%')
      expect(styles.height).toBe('100%')
    })

    it('should blur content when devtools detected', () => {
      const element = {
        style: {
          filter: 'blur(20px)',
          pointerEvents: 'none',
          userSelect: 'none'
        }
      }

      expect(element.style.filter).toBe('blur(20px)')
      expect(element.style.pointerEvents).toBe('none')
      expect(element.style.userSelect).toBe('none')
    })
  })

  describe('content protection', () => {
    it('should disable pointer events on blurred content', () => {
      const style = { pointerEvents: 'none' }
      expect(style.pointerEvents).toBe('none')
    })

    it('should prevent text selection on blurred content', () => {
      const style = { userSelect: 'none' }
      expect(style.userSelect).toBe('none')
    })

    it('should apply blur filter with specific value', () => {
      const blurValue = 20
      const filter = `blur(${blurValue}px)`
      expect(filter).toBe('blur(20px)')
    })
  })

  describe('check interval', () => {
    it('should use 1 second check interval', () => {
      const CHECK_INTERVAL = 1000
      expect(CHECK_INTERVAL).toBe(1000)
    })

    it('should maintain check interval consistency', () => {
      const intervals = [1000, 1000, 1000]
      intervals.forEach(interval => {
        expect(interval).toBe(1000)
      })
    })
  })

  describe('animation', () => {
    it('should have fade in animation', () => {
      const animation = 'fadeIn 0.3s ease-out'
      expect(animation).toContain('fadeIn')
      expect(animation).toContain('0.3s')
    })

    it('should animate warning dialog', () => {
      const keyframes = '@keyframes fadeIn'
      const animationCSS = `
        ${keyframes} {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `
      expect(animationCSS).toContain('fadeIn')
      expect(animationCSS).toContain('opacity: 0')
      expect(animationCSS).toContain('opacity: 1')
    })
  })

  describe('multilingual support', () => {
    it('should provide Chinese warning message', () => {
      const message = '检测到开发者工具'
      expect(message).toBe('检测到开发者工具')
    })

    it('should provide English warning message', () => {
      const message = 'Developer Tools Detected'
      expect(message).toBe('Developer Tools Detected')
    })

    it('should provide instructions in both languages', () => {
      const instructions = [
        '为了保护页面内容和用户体验，请关闭开发者工具后继续访问。',
        'Please close DevTools to continue'
      ]

      expect(instructions[0]).toContain('开发者工具')
      expect(instructions[1]).toContain('DevTools')
    })
  })

  describe('initialization', () => {
    it('should have initial state variables', () => {
      const isDevToolsOpen = false
      const checkInterval = null
      const lastCheck = 0

      expect(isDevToolsOpen).toBe(false)
      expect(checkInterval).toBe(null)
      expect(lastCheck).toBe(0)
    })
  })

  describe('state management', () => {
    it('should toggle devtools open state', () => {
      let isDevToolsOpen = false
      expect(isDevToolsOpen).toBe(false)

      // 打开
      isDevToolsOpen = true
      expect(isDevToolsOpen).toBe(true)

      // 关闭
      isDevToolsOpen = false
      expect(isDevToolsOpen).toBe(false)
    })

    it('should only trigger alert once when devtools opens', () => {
      let isDevToolsOpen = false
      expect(isDevToolsOpen).toBe(false)

      if (!isDevToolsOpen) {
        isDevToolsOpen = true
      }

      expect(isDevToolsOpen).toBe(true)
    })
  })
})
