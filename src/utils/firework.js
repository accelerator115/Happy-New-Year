// 对象池用于复用粒子
const particlePool = []
const MAX_POOL_SIZE = 1000

export class Firework {
  constructor(x, y, color) {
    this.reset(x, y, color)
  }

  reset(x, y, color) {
    this.x = x
    this.y = y
    this.size = Math.random() * 4 + 2
    this.speed = Math.random() * 10 + 4
    this.angle = Math.random() * Math.PI * 2
    this.velocityX = Math.cos(this.angle) * this.speed
    this.velocityY = Math.sin(this.angle) * this.speed
    this.alpha = 1
    this.decay = Math.random() * 0.012 + 0.012
    this.color = color
    this.gravity = 0.12
    this.friction = 0.97
    this.brightness = 1
    this.twinkle = Math.random() * Math.PI * 2
    
    // 预计算颜色字符串（性能优化）
    this.colorStr = `rgb(${color.join(',')})`
    const [r, g, b] = color
    this.brightColorStr = `rgb(${Math.min(255, r + 80)}, ${Math.min(255, g + 80)}, ${Math.min(255, b + 80)})`
  }

  // 静态方法：从对象池获取粒子
  static acquire(x, y, color) {
    let particle
    if (particlePool.length > 0) {
      particle = particlePool.pop()
      particle.reset(x, y, color)
    } else {
      particle = new Firework(x, y, color)
    }
    return particle
  }

  // 静态方法：归还粒子到对象池
  static release(particle) {
    if (particlePool.length < MAX_POOL_SIZE) {
      particlePool.push(particle)
    }
  }

  update() {
    this.velocityY += this.gravity
    this.velocityX *= this.friction
    this.velocityY *= this.friction
    this.x += this.velocityX
    this.y += this.velocityY
    this.alpha -= this.decay
    this.twinkle += 0.2
    this.brightness = this.alpha * (0.7 + Math.sin(this.twinkle) * 0.3)
  }

  draw(ctx) {
    const effectiveBrightness = this.brightness
    const x = this.x
    const y = this.y
    const size = this.size
    
    // 性能优化：alpha 很低时只绘制核心
    if (this.alpha < 0.3) {
      ctx.globalAlpha = this.alpha * effectiveBrightness
      ctx.fillStyle = this.colorStr
      ctx.beginPath()
      ctx.arc(x, y, size * 0.8, 0, Math.PI * 2)
      ctx.fill()
      return
    }
    
    // 外层大光晕（柔和光芒）
    ctx.globalAlpha = this.alpha * 0.15 * effectiveBrightness
    ctx.fillStyle = this.colorStr
    ctx.beginPath()
    ctx.arc(x, y, size * 2.5, 0, Math.PI * 2)
    ctx.fill()
    
    // 中层光晕（主要颜色）
    ctx.globalAlpha = this.alpha * 0.5 * effectiveBrightness
    ctx.beginPath()
    ctx.arc(x, y, size * 1.2, 0, Math.PI * 2)
    ctx.fill()
    
    // 内层亮光
    ctx.globalAlpha = this.alpha * 0.8 * effectiveBrightness
    ctx.fillStyle = this.brightColorStr
    ctx.beginPath()
    ctx.arc(x, y, size * 0.6, 0, Math.PI * 2)
    ctx.fill()
    
    // 核心白光
    ctx.globalAlpha = this.alpha * effectiveBrightness
    ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.beginPath()
    ctx.arc(x, y, size * 0.25, 0, Math.PI * 2)
    ctx.fill()
  }
}
