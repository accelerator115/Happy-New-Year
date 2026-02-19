import { describe, it, expect } from 'vitest'
import { computed, ref, watch } from 'vue'

describe('Vue Utilities', () => {
  describe('computed properties', () => {
    it('should compute values correctly', () => {
      const count = ref(0)
      const doubled = computed(() => count.value * 2)
      
      expect(doubled.value).toBe(0)
      count.value = 5
      expect(doubled.value).toBe(10)
    })

    it('should cache computed values', () => {
      let callCount = 0
      const count = ref(0)
      const expensive = computed(() => {
        callCount++
        return count.value * 2
      })

      const value1 = expensive.value
      const value2 = expensive.value
      
      expect(callCount).toBe(1)
      expect(value1).toBe(value2)
    })

    it('should recompute when dependency changes', () => {
      const count = ref(1)
      const squared = computed(() => count.value ** 2)
      
      expect(squared.value).toBe(1)
      count.value = 3
      expect(squared.value).toBe(9)
      count.value = 4
      expect(squared.value).toBe(16)
    })
  })

  describe('reactive references', () => {
    it('should track reactive changes', () => {
      const counter = ref(0)
      
      expect(counter.value).toBe(0)
      counter.value++
      expect(counter.value).toBe(1)
      counter.value += 5
      expect(counter.value).toBe(6)
    })

    it('should handle object refs', () => {
      const user = ref({ name: 'Test', age: 25 })
      
      expect(user.value.name).toBe('Test')
      user.value.age = 26
      expect(user.value.age).toBe(26)
    })

    it('should handle array refs', () => {
      const items = ref([1, 2, 3])
      
      expect(items.value.length).toBe(3)
      items.value.push(4)
      expect(items.value.length).toBe(4)
      expect(items.value[3]).toBe(4)
    })
  })

  describe('watch', () => {
    it('should watch reactive value changes', async () => {
      const count = ref(0)
      let watchedValue = null

      watch(count, (newVal) => {
        watchedValue = newVal
      })

      count.value = 5
      await new Promise(resolve => setTimeout(resolve, 0))
      expect(watchedValue).toBe(5)
    })
  })
})

describe('Math Operations', () => {
  it('should add numbers correctly', () => {
    expect(2 + 2).toBe(4)
    expect(0.5 + 0.5).toBe(1)
    expect(-5 + 3).toBe(-2)
  })

  it('should multiply numbers correctly', () => {
    expect(3 * 4).toBe(12)
    expect(0 * 100).toBe(0)
    expect(-2 * -3).toBe(6)
  })

  it('should handle decimal operations with precision', () => {
    expect(0.1 + 0.2).toBeCloseTo(0.3)
    expect(1.1 * 2).toBeCloseTo(2.2)
  })

  it('should perform modulo operations', () => {
    expect(10 % 3).toBe(1)
    expect(7 % 2).toBe(1)
    expect(8 % 2).toBe(0)
  })

  it('should handle power operations', () => {
    expect(2 ** 3).toBe(8)
    expect(5 ** 2).toBe(25)
    expect(10 ** 0).toBe(1)
  })

  it('should handle negative numbers', () => {
    expect(-5 + 2).toBe(-3)
    expect(-3 * -4).toBe(12)
    expect(Math.abs(-10)).toBe(10)
  })
})

describe('Array Operations', () => {
  it('should push elements to array', () => {
    const arr = [1, 2, 3]
    arr.push(4)
    expect(arr.length).toBe(4)
    expect(arr[3]).toBe(4)
  })

  it('should filter array elements', () => {
    const arr = [1, 2, 3, 4, 5]
    const filtered = arr.filter(x => x > 2)
    expect(filtered).toEqual([3, 4, 5])
  })

  it('should map array elements', () => {
    const arr = [1, 2, 3]
    const mapped = arr.map(x => x * 2)
    expect(mapped).toEqual([2, 4, 6])
  })

  it('should find elements in array', () => {
    const arr = [1, 2, 3, 4, 5]
    const found = arr.find(x => x > 3)
    expect(found).toBe(4)
  })

  it('should check array includes', () => {
    const arr = ['a', 'b', 'c']
    expect(arr.includes('b')).toBe(true)
    expect(arr.includes('d')).toBe(false)
  })
})

describe('String Operations', () => {
  it('should concatenate strings', () => {
    expect('hello' + ' ' + 'world').toBe('hello world')
  })

  it('should use template literals', () => {
    const name = 'Test'
    expect(`Hello ${name}`).toBe('Hello Test')
  })

  it('should handle string methods', () => {
    const str = 'hello world'
    expect(str.toUpperCase()).toBe('HELLO WORLD')
    expect(str.length).toBe(11)
    expect(str.includes('world')).toBe(true)
  })

  it('should split strings', () => {
    const str = 'a,b,c'
    const arr = str.split(',')
    expect(arr).toEqual(['a', 'b', 'c'])
  })
})
