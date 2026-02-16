import { ref, onMounted, onUnmounted } from 'vue'
import { Firework } from '../utils/firework.js'

export function useFireworks(canvasRef) {
  const fireworks = ref([])
  let ctx = null
  let animationId = null
  let lastTime = 0
  const targetFPS = 60
  const frameInterval = 1000 / targetFPS
  let canvasWidth = 0
  let canvasHeight = 0
  const MAX_PARTICLES = 3000  // 限制最大粒子数

  const resizeCanvas = () => {
    if (canvasRef.value) {
      const dpr = window.devicePixelRatio || 1
      const rect = canvasRef.value.getBoundingClientRect()
      
      // 保存未缩放的尺寸
      canvasWidth = rect.width
      canvasHeight = rect.height
      
      // 设置 canvas 实际像素
      canvasRef.value.width = canvasWidth * dpr
      canvasRef.value.height = canvasHeight * dpr
      
      // 设置显示尺寸
      canvasRef.value.style.width = canvasWidth + 'px'
      canvasRef.value.style.height = canvasHeight + 'px'
      
      // 重置并应用 DPR 缩放（避免累积）
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0)  // 重置 transform
        ctx.scale(dpr, dpr)
      }
    }
  }

  const createFireworkParticles = (x, y, color) => {
    // 检查粒子数量限制
    if (fireworks.value.length >= MAX_PARTICLES) {
      return
    }
    
    const particleCount = Math.min(
      150 + Math.random() * 100,
      MAX_PARTICLES - fireworks.value.length
    )
    
    // 使用对象池创建粒子
    for (let i = 0; i < particleCount; i++) {
      fireworks.value.push(Firework.acquire(x, y, color))
    }
  }

  const animate = (currentTime) => {
    if (!ctx || !canvasRef.value) return

    // 帧率控制
    const deltaTime = currentTime - lastTime
    if (deltaTime < frameInterval) {
      animationId = requestAnimationFrame(animate)
      return
    }
    lastTime = currentTime - (deltaTime % frameInterval)

    // 使用 destination-out 实现拖尾效果（GPU 加速）
    ctx.globalCompositeOperation = 'destination-out'
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    
    // 批量更新和绘制（减少状态切换）
    ctx.globalCompositeOperation = 'lighter'
    
    // 倒序遍历，方便删除
    for (let i = fireworks.value.length - 1; i >= 0; i--) {
      const particle = fireworks.value[i]
      particle.update()
      
      if (particle.alpha <= 0) {
        // 归还到对象池
        Firework.release(particle)
        fireworks.value.splice(i, 1)
      } else {
        particle.draw(ctx)
      }
    }
    
    // 重置 alpha（避免影响其他元素）
    ctx.globalAlpha = 1
    
    animationId = requestAnimationFrame(animate)
  }

  const init = () => {
    if (!canvasRef.value) return
    ctx = canvasRef.value.getContext('2d', {
      alpha: true,
      desynchronized: true,
      willReadFrequently: false
    })
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    lastTime = performance.now()
    animate(lastTime)
  }

  const cleanup = () => {
    window.removeEventListener('resize', resizeCanvas)
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
  }

  onMounted(init)
  onUnmounted(cleanup)

  return {
    createFireworkParticles,
    fireworks  // 导出粒子数组用于自适应防抖
  }
}
