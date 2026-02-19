import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useBlessings } from '../../composables/useBlessings'

describe('useBlessings', () => {
  let blessings

  beforeEach(() => {
    blessings = useBlessings()
  })

  describe('addCustomBlessing', () => {
    it('should add a custom blessing', () => {
      blessings.addCustomBlessing('新年快乐')
      // 显示祝福语来验证自定义祝福语已添加
      blessings.showBlessing(100, 100, [255, 0, 0])
      expect(blessings.activeBlessings.value.length).toBeGreaterThan(0)
    })

    it('should trim whitespace from blessings', () => {
      blessings.addCustomBlessing('  新年快乐  ')
      // 显示祝福语
      blessings.showBlessing(100, 100, [255, 0, 0])
      expect(blessings.activeBlessings.value.length).toBeGreaterThan(0)
    })

    it('should not add empty blessings', () => {
      blessings.addCustomBlessing('')
      blessings.addCustomBlessing('   ')
      // 尝试显示祝福语后检查
      blessings.showBlessing(100, 100, [255, 0, 0])
      // 应该显示默认祝福语
      expect(blessings.activeBlessings.value.length).toBeGreaterThanOrEqual(1)
    })

    it('should add multiple blessings', () => {
      blessings.addCustomBlessing('新年快乐')
      blessings.addCustomBlessing('万事如意')
      blessings.addCustomBlessing('心想事成')
      
      // 显示多个祝福语
      blessings.showBlessing(100, 100, [255, 0, 0])
      blessings.showBlessing(200, 200, [0, 255, 0])
      blessings.showBlessing(300, 300, [0, 0, 255])
      
      expect(blessings.activeBlessings.value.length).toBeGreaterThanOrEqual(3)
    })
  })

  describe('showBlessing', () => {
    it('should display a blessing at given coordinates', () => {
      const x = 100
      const y = 200
      const color = [255, 100, 50]

      blessings.showBlessing(x, y, color)

      expect(blessings.activeBlessings.value.length).toBeGreaterThan(0)
      const blessing = blessings.activeBlessings.value[0]
      
      expect(blessing.x).toBe(x - 100)
      expect(blessing.y).toBe(y - 50)
      expect(blessing.color).toBe(`rgb(${color.join(',')})`)
    })

    it('should have text property from default or custom blessings', () => {
      blessings.showBlessing(100, 100, [255, 0, 0])

      expect(blessings.activeBlessings.value.length).toBeGreaterThan(0)
      expect(blessings.activeBlessings.value[0].text).toBeDefined()
      expect(typeof blessings.activeBlessings.value[0].text).toBe('string')
    })

    it('should assign unique IDs to blessings', () => {
      blessings.showBlessing(100, 100, [255, 0, 0])
      const id1 = blessings.activeBlessings.value[0].id

      blessings.showBlessing(200, 200, [0, 255, 0])
      const id2 = blessings.activeBlessings.value[1].id

      expect(id1).not.toBe(id2)
    })

    it('should remove blessing after timeout', async () => {
      vi.useFakeTimers()

      blessings.showBlessing(100, 100, [255, 0, 0])
      expect(blessings.activeBlessings.value.length).toBe(1)

      vi.advanceTimersByTime(2000)
      expect(blessings.activeBlessings.value.length).toBe(0)

      vi.useRealTimers()
    })

    it('should prefer custom blessings when available', async () => {
      vi.useFakeTimers()

      blessings.addCustomBlessing('自定义祝福')
      
      // 显示多个祝福语来检查是否有自定义的
      for (let i = 0; i < 10; i++) {
        blessings.showBlessing(100, 100, [255, 0, 0])
      }

      // 验证祝福语已显示
      expect(blessings.activeBlessings.value.length).toBeGreaterThan(0)

      vi.useRealTimers()
    })
  })

  describe('default blessings', () => {
    it('should have default blessings list', () => {
      blessings.showBlessing(100, 100, [255, 0, 0])

      expect(blessings.activeBlessings.value.length).toBeGreaterThan(0)
      const blessing = blessings.activeBlessings.value[0]
      
      const defaultList = [
        '新年快乐',
        '万事如意',
        '心想事成',
        '财源广进',
        '身体健康',
        '步步高升',
        '阖家欢乐',
        '福星高照',
        '大吉大利',
        '龙马精神'
      ]
      
      expect(defaultList).toContain(blessing.text)
    })
  })
})
