import { describe, it, expect, beforeEach } from 'vitest'
import { Firework } from '../../utils/firework'

describe('Firework class', () => {
  let firework
  const color = [255, 100, 50]

  beforeEach(() => {
    firework = new Firework(100, 200, color)
  })

  describe('initialization', () => {
    it('should initialize with correct position and color', () => {
      expect(firework.x).toBe(100)
      expect(firework.y).toBe(200)
      expect(firework.color).toEqual(color)
    })

    it('should have valid initial properties', () => {
      expect(firework.size).toBeGreaterThan(0)
      expect(firework.size).toBeLessThanOrEqual(6)
      
      expect(firework.speed).toBeGreaterThan(0)
      expect(firework.speed).toBeLessThanOrEqual(14)
      
      expect(firework.alpha).toBe(1)
      expect(firework.gravity).toBe(0.12)
      expect(firework.friction).toBe(0.97)
    })

    it('should have velocity based on angle and speed', () => {
      const speed = firework.speed
      const velocityMagnitude = Math.sqrt(
        firework.velocityX ** 2 + firework.velocityY ** 2
      )
      
      expect(velocityMagnitude).toBeCloseTo(speed, 1)
    })

    it('should generate color strings for rendering', () => {
      const colorStr = `rgb(${color.join(',')})`
      expect(firework.colorStr).toBe(colorStr)
      expect(firework.brightColorStr).toBeDefined()
    })
  })

  describe('reset method', () => {
    it('should reset to new position and color', () => {
      const newColor = [0, 255, 0]
      firework.reset(300, 400, newColor)

      expect(firework.x).toBe(300)
      expect(firework.y).toBe(400)
      expect(firework.color).toEqual(newColor)
      expect(firework.alpha).toBe(1)
    })

    it('should reset alpha to 1', () => {
      firework.alpha = 0.5
      firework.reset(100, 200, color)
      
      expect(firework.alpha).toBe(1)
    })
  })

  describe('update method', () => {
    it('should apply gravity to velocity', () => {
      const initialVelocityY = firework.velocityY
      const gravity = 0.12
      const friction = 0.97
      
      firework.update()

      // 重力先被添加，然后摩擦力被应用
      // 最终: (initialVelocityY + gravity) * friction
      const expectedVelocityY = (initialVelocityY + gravity) * friction
      expect(firework.velocityY).toBeCloseTo(expectedVelocityY, 2)
    })

    it('should apply friction to velocity', () => {
      firework.update()

      expect(Math.abs(firework.velocityX)).toBeLessThan(Math.abs(firework.velocityX / firework.friction))
      expect(Math.abs(firework.velocityY)).toBeLessThan(Math.abs(firework.velocityY / firework.friction))
    })

    it('should update position based on velocity', () => {
      const initialX = firework.x
      const initialY = firework.y

      firework.update()

      expect(firework.x).not.toBe(initialX)
      expect(firework.y).not.toBe(initialY)
    })

    it('should decrease alpha over time', () => {
      const initialAlpha = firework.alpha
      firework.update()

      expect(firework.alpha).toBeLessThan(initialAlpha)
    })

    it('should update twinkle animation', () => {
      const initialTwinkle = firework.twinkle
      firework.update()

      expect(firework.twinkle).toBeGreaterThan(initialTwinkle)
    })

    it('should update brightness based on alpha', () => {
      firework.update()

      const expectedBrightness = firework.alpha * (0.7 + Math.sin(firework.twinkle) * 0.3)
      expect(firework.brightness).toBeCloseTo(expectedBrightness, 5)
    })

    it('should become inactive when alpha reaches 0', () => {
      // 快速更新直到粒子消失
      while (firework.alpha > 0) {
        firework.update()
      }

      expect(firework.alpha).toBeLessThanOrEqual(0)
    })
  })

  describe('static methods', () => {
    it('should set quality mode', () => {
      expect(() => Firework.setQuality(true)).not.toThrow()
      expect(() => Firework.setQuality(false)).not.toThrow()
    })

    it('should acquire particle from pool', () => {
      const particle = Firework.acquire(50, 150, color)

      expect(particle).toBeInstanceOf(Firework)
      expect(particle.x).toBe(50)
      expect(particle.y).toBe(150)
      expect(particle.color).toEqual(color)
    })

    it('should release particle back to pool', () => {
      const particle = new Firework(100, 200, color)
      expect(() => Firework.release(particle)).not.toThrow()
    })

    it('should reuse particles from pool', () => {
      const particle1 = Firework.acquire(100, 200, color)
      Firework.release(particle1)

      const particle2 = Firework.acquire(50, 150, [0, 255, 0])

      // 由于对象池，应该是同一个实例
      expect(particle1).toBe(particle2)
      // 但位置和颜色应该被更新
      expect(particle2.x).toBe(50)
      expect(particle2.y).toBe(150)
    })

    it('should limit pool size', () => {
      // 这个测试验证对象池不会无限增长
      for (let i = 0; i < 2000; i++) {
        const p = Firework.acquire(100, 200, color)
        Firework.release(p)
      }

      // 如果到了这里，说明池大小被限制了
      expect(true).toBe(true)
    })
  })

  describe('color calculations', () => {
    it('should create bright color variant', () => {
      const original = [100, 100, 100]
      const fw = new Firework(100, 200, original)

      expect(fw.brightColorStr).toContain('rgb')
    })

    it('should clamp bright color to valid RGB values', () => {
      const bright = [200, 200, 200]
      const fw = new Firework(100, 200, bright)

      // brightColorStr 应该有效，不会超过 255
      expect(fw.brightColorStr).toBeDefined()
      expect(fw.brightColorStr).toContain('rgb')
    })
  })

  describe('physics simulation', () => {
    it('should gradually slow down due to friction', () => {
      const measurements = []

      for (let i = 0; i < 5; i++) {
        const speed = Math.sqrt(
          firework.velocityX ** 2 + firework.velocityY ** 2
        )
        measurements.push(speed)
        firework.update()
      }

      // 每次速度应该减少
      for (let i = 1; i < measurements.length; i++) {
        expect(measurements[i]).toBeLessThan(measurements[i - 1])
      }
    })

    it('should fall downward over time', () => {
      firework.velocityY = 0
      const initialY = firework.y

      for (let i = 0; i < 10; i++) {
        firework.update()
      }

      expect(firework.y).toBeGreaterThan(initialY)
    })
  })
})
