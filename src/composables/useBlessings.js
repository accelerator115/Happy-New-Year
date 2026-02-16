import { ref } from 'vue'

export function useBlessings() {
  const defaultBlessings = [
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

  const userBlessings = ref([])
  const activeBlessings = ref([])
  let blessingId = 0

  const addCustomBlessing = (blessing) => {
    if (blessing.trim()) {
      userBlessings.value.push(blessing.trim())
    }
  }

  const showBlessing = (x, y, color) => {
    const allBlessings = [...defaultBlessings, ...userBlessings.value]
    const blessing = allBlessings[Math.floor(Math.random() * allBlessings.length)]
    
    const blessingObj = {
      id: blessingId++,
      text: blessing,
      x: x - 100,
      y: y - 50,
      color: `rgb(${color.join(',')})`
    }
    
    activeBlessings.value.push(blessingObj)
    
    setTimeout(() => {
      const index = activeBlessings.value.findIndex(b => b.id === blessingObj.id)
      if (index > -1) {
        activeBlessings.value.splice(index, 1)
      }
    }, 2000)
  }

  return {
    activeBlessings,
    addCustomBlessing,
    showBlessing
  }
}
