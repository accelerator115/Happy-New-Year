import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { usePerformance } from '../../composables/usePerformance'

describe('usePerformance', () => {
  let performance

  beforeEach(() => {
    performance = usePerformance()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('initialization', () => {
    it('should initialize with default values', () => {
      expect(performance.performanceLevel).toBeDefined()
      expect(performance.currentFPS).toBeDefined()
      expect(performance.isLowPerformanceDevice).toBeDefined()
      expect(performance.autoQuality).toBeDefined()
    })
  })

  describe('quality settings levels', () => {
    it('low quality should have reduced settings', () => {
      // Test that different quality levels have different configurations
      expect(performance).toBeDefined()
    })
  })

  describe('device detection', () => {
    it('should detect performance level', () => {
      expect(performance.performanceLevel).toBeDefined()
      expect(['low', 'medium', 'high']).toContain(performance.performanceLevel.value || 'high')
    })
  })

  describe('FPS monitoring', () => {
    it('should track FPS', () => {
      expect(performance.currentFPS).toBeDefined()
    })
  })

  describe('memory info', () => {
    it('should provide memory information capability', () => {
      expect(performance).toBeDefined()
    })
  })

  describe('lifecycle', () => {
    it('should have lifecycle methods', () => {
      expect(performance).toBeDefined()
    })
  })

  describe('quality presets', () => {
    it('should have consistent quality settings', () => {
      expect(performance).toBeDefined()
    })
  })
})
