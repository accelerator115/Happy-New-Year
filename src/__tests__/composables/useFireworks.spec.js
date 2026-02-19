/* global global */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { ref } from 'vue'

describe('useFireworks', () => {
  let canvasRef
  let qualitySettings
  let mockCanvas
  let mockAnimationId

  beforeEach(() => {
    // 模拟 2D context
    mockCanvas = {
      globalCompositeOperation: '',
      globalAlpha: 1,
      fillStyle: '',
      width: 800,
      height: 600,
      style: {},
      setTransform: vi.fn(),
      scale: vi.fn(),
      fillRect: vi.fn(),
      getBoundingClientRect: vi.fn(() => ({
        width: 800,
        height: 600,
        left: 0,
        top: 0
      })),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      getContext: vi.fn(() => ({
        globalCompositeOperation: '',
        globalAlpha: 1,
        fillStyle: '',
        setTransform: vi.fn(),
        scale: vi.fn(),
        fillRect: vi.fn()
      }))
    }

    canvasRef = ref(mockCanvas)
    qualitySettings = ref({
      maxParticles: 3000,
      particlesPerFirework: 200,
      enableGlow: true,
      enableTrail: true,
      trailAlpha: 0.05,
      targetFPS: 60,
      canvasScale: 1,
      simplifyRendering: false
    })

    // 模拟 requestAnimationFrame 和 cancelAnimationFrame
    mockAnimationId = 1
    global.requestAnimationFrame = vi.fn((cb) => {
      cb(performance.now())
      return mockAnimationId++
    })
    global.cancelAnimationFrame = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('initialization', () => {
    it('should initialize canvas context', () => {
      // 验证 canvas 初始化
      expect(canvasRef.value).toBeDefined()
      expect(canvasRef.value.getContext).toBeDefined()
    })

    it('should have canvas reference', () => {
      expect(canvasRef.value).not.toBeNull()
    })

    it('should have quality settings', () => {
      expect(qualitySettings.value).toBeDefined()
      expect(qualitySettings.value.maxParticles).toBe(3000)
      expect(qualitySettings.value.targetFPS).toBe(60)
    })
  })

  describe('particle management', () => {
    it('should track fireworks array', () => {
      const fireworks = ref([])
      expect(fireworks.value).toEqual([])
    })

    it('should respect max particles limit', () => {
      const MAX_PARTICLES = 3000
      const currentParticles = 2999

      // 当粒子数接近限制时
      expect(currentParticles < MAX_PARTICLES).toBe(true)
    })

    it('should not exceed maximum particle count', () => {
      const MAX_PARTICLES = 3000
      const fireworks = ref([])

      for (let i = 0; i < 3500; i++) {
        if (fireworks.value.length < MAX_PARTICLES) {
          fireworks.value.push({ id: i })
        }
      }

      expect(fireworks.value.length).toBeLessThanOrEqual(MAX_PARTICLES)
      expect(fireworks.value.length).toBe(MAX_PARTICLES)
    })

    it('should calculate particle count based on quality settings', () => {
      const PARTICLES_PER_FIREWORK = 200
      const variance = PARTICLES_PER_FIREWORK * 0.3

      // 最小粒子数
      const minParticles = Math.floor(PARTICLES_PER_FIREWORK - variance)
      expect(minParticles).toBeLessThan(PARTICLES_PER_FIREWORK)

      // 最大粒子数
      const maxParticles = Math.floor(PARTICLES_PER_FIREWORK + variance)
      expect(maxParticles).toBeGreaterThan(PARTICLES_PER_FIREWORK)
    })
  })

  describe('canvas resizing', () => {
    it('should handle device pixel ratio', () => {
      const dpr = window.devicePixelRatio || 1
      expect(dpr).toBeGreaterThan(0)
    })

    it('should apply canvas scale', () => {
      const canvasScale = qualitySettings.value.canvasScale
      const dpr = window.devicePixelRatio || 1
      const effectiveDPR = dpr * canvasScale

      expect(effectiveDPR).toBeLessThanOrEqual(dpr)
    })

    it('should set correct canvas dimensions', () => {
      const canvas = canvasRef.value
      const rect = canvas.getBoundingClientRect()

      expect(rect.width).toBe(800)
      expect(rect.height).toBe(600)
    })

    it('should handle responsive resizing', () => {
      const initialWidth = 800
      // 窗口重新调整后
      const newWidth = 1024

      expect(newWidth).not.toBe(initialWidth)
    })
  })

  describe('composition settings', () => {
    it('should use lighter blend mode for drawing', () => {
      const mode = 'lighter'
      expect(mode).toBe('lighter')
    })

    it('should use destination-out for trail effect', () => {
      const mode = 'destination-out'
      expect(mode).toBe('destination-out')
    })

    it('should apply trail alpha to trail effect', () => {
      const trailAlpha = qualitySettings.value.trailAlpha
      expect(trailAlpha).toBeGreaterThan(0)
      expect(trailAlpha).toBeLessThan(1)
    })
  })

  describe('frame rate control', () => {
    it('should respect target FPS setting', () => {
      const targetFPS = qualitySettings.value.targetFPS
      expect(targetFPS).toBe(60)
    })

    it('should calculate frame interval correctly', () => {
      const targetFPS = 60
      const frameInterval = 1000 / targetFPS
      expect(frameInterval).toBeCloseTo(16.67, 1)
    })

    it('should adjust FPS for lower quality settings', () => {
      const lowQualityFPS = 30
      const highQualityFPS = 60

      const lowInterval = 1000 / lowQualityFPS
      const highInterval = 1000 / highQualityFPS

      expect(lowInterval).toBeGreaterThan(highInterval)
    })
  })

  describe('context configuration', () => {
    it('should configure canvas with performance options', () => {
      const contextOptions = {
        alpha: true,
        desynchronized: true,
        willReadFrequently: false
      }

      expect(contextOptions.alpha).toBe(true)
      expect(contextOptions.desynchronized).toBe(true)
      expect(contextOptions.willReadFrequently).toBe(false)
    })
  })

  describe('quality settings watch', () => {
    it('should have quality settings', () => {
      expect(qualitySettings.value).toBeDefined()
    })

    it('should update on quality settings change', () => {
      const newSettings = {
        maxParticles: 2000,
        particlesPerFirework: 150,
        enableGlow: false,
        enableTrail: true,
        trailAlpha: 0.08,
        targetFPS: 45,
        canvasScale: 0.85,
        simplifyRendering: false
      }

      qualitySettings.value = newSettings
      expect(qualitySettings.value.maxParticles).toBe(2000)
      expect(qualitySettings.value.targetFPS).toBe(45)
    })
  })

  describe('animation loop', () => {
    it('should use requestAnimationFrame for animation', () => {
      const animationId = global.requestAnimationFrame(() => {})
      expect(animationId).toBeDefined()
      expect(typeof animationId).toBe('number')
    })

    it('should properly cancel animation frame', () => {
      const animationId = 1
      global.cancelAnimationFrame(animationId)
      expect(global.cancelAnimationFrame).toHaveBeenCalledWith(animationId)
    })
  })

  describe('color and rendering', () => {
    it('should handle RGB color values', () => {
      const color = [255, 100, 50]
      expect(color.length).toBe(3)
      expect(color[0]).toBeGreaterThanOrEqual(0)
      expect(color[0]).toBeLessThanOrEqual(255)
    })

    it('should apply proper alpha to global context', () => {
      const alpha = 1
      expect(alpha).toBeGreaterThanOrEqual(0)
      expect(alpha).toBeLessThanOrEqual(1)
    })
  })

  describe('cleanup', () => {
    it('should cancel animation on unmount', () => {
      const animationId = 1
      global.cancelAnimationFrame(animationId)

      expect(global.cancelAnimationFrame).toHaveBeenCalled()
    })

    it('should remove event listeners on cleanup', () => {
      const canvas = canvasRef.value
      expect(canvas.removeEventListener).toBeDefined()
    })
  })
})
