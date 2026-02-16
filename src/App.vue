<template>
  <div class="firework-app" @click="handleClick" @touchstart="handleTouch">
    <canvas ref="canvas"></canvas>
    
    <ControlPanel 
      :colors="colors"
      :selectedColorIndex="selectedColorIndex"
      :showBlessings="showBlessings"
      @select-color="selectColor"
      @add-blessing="addCustomBlessing"
      @toggle-blessings="showBlessings = !showBlessings"
    />
    
    <div class="instructions">
      <Sparkles :size="20" class="icon" />
      <span>点击屏幕任意位置燃放烟花</span>
    </div>
    
    <BlessingText 
      v-for="blessing in activeBlessings" 
      :key="blessing.id"
      :blessing="blessing"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Sparkles } from 'lucide-vue-next'
import ControlPanel from './components/ControlPanel.vue'
import BlessingText from './components/BlessingText.vue'
import { useFireworks } from './composables/useFireworks.js'
import { useBlessings } from './composables/useBlessings.js'

const canvas = ref(null)
const selectedColorIndex = ref(0)
const showBlessings = ref(true)  // 控制是否显示祝福语

// 防抖控制
let lastFireworkTime = 0
const BASE_DEBOUNCE_INTERVAL = 100  // 基础防抖间隔 100ms

// Use composables
const { createFireworkParticles, fireworks } = useFireworks(canvas)
const { activeBlessings, addCustomBlessing, showBlessing } = useBlessings()

const colors = [
  { 
    rgb: null,  // 随机模式不需要固定 RGB
    gradient: 'linear-gradient(135deg, #ff3232 0%, #ffa500 25%, #ffd700 50%, #32ff32 75%, #32c8ff 100%)',
    name: '随机',
    isRandom: true
  },
  { 
    rgb: [255, 50, 50], 
    gradient: 'linear-gradient(135deg, #ff3232 0%, #ff6b6b 100%)',
    name: '红色'
  },
  { 
    rgb: [255, 165, 0], 
    gradient: 'linear-gradient(135deg, #ffa500 0%, #ffcc00 100%)',
    name: '橙色'
  },
  { 
    rgb: [255, 215, 0], 
    gradient: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
    name: '金色'
  },
  { 
    rgb: [50, 255, 50], 
    gradient: 'linear-gradient(135deg, #32ff32 0%, #6bff6b 100%)',
    name: '绿色'
  },
  { 
    rgb: [50, 200, 255], 
    gradient: 'linear-gradient(135deg, #32c8ff 0%, #6bd8ff 100%)',
    name: '蓝色'
  },
  { 
    rgb: [200, 100, 255], 
    gradient: 'linear-gradient(135deg, #c864ff 0%, #da8fff 100%)',
    name: '紫色'
  },
  { 
    rgb: [255, 105, 180], 
    gradient: 'linear-gradient(135deg, #ff69b4 0%, #ff8fd4 100%)',
    name: '粉色'
  }
]

const selectColor = (index) => {
  selectedColorIndex.value = index
}

const createFirework = (x, y) => {
  if (!x || !y) return
  
  const selectedColor = colors[selectedColorIndex.value]
  
  // 如果是随机模式，随机选择一个非随机的颜色
  let color
  if (selectedColor.isRandom) {
    const normalColors = colors.filter(c => !c.isRandom)
    color = normalColors[Math.floor(Math.random() * normalColors.length)]
  } else {
    color = selectedColor
  }
  
  // Create firework particles
  createFireworkParticles(x, y, color.rgb)
  
  // Show blessing (only if enabled)
  if (showBlessings.value) {
    showBlessing(x, y, color.rgb)
  }
}

const handleClick = (event) => {
  // 只在点击 canvas 或主容器时触发烟花
  if (event.target.tagName === 'CANVAS' || event.target.classList.contains('firework-app')) {
    // 自适应防抖检查（粒子越多，间隔越长）
    const now = performance.now()
    const particleCount = fireworks.value.length
    const adaptiveInterval = BASE_DEBOUNCE_INTERVAL + Math.floor(particleCount / 500) * 50
    
    if (now - lastFireworkTime < adaptiveInterval) {
      return  // 距离上次烟花太近，忽略
    }
    lastFireworkTime = now
    
    const x = event.clientX
    const y = event.clientY
    createFirework(x, y)
  }
}

const handleTouch = (event) => {
  // 只在触摸 canvas 或主容器时触发烟花
  if (event.target.tagName === 'CANVAS' || event.target.classList.contains('firework-app')) {
    // 自适应防抖检查（粒子越多，间隔越长）
    const now = performance.now()
    const particleCount = fireworks.value.length
    const adaptiveInterval = BASE_DEBOUNCE_INTERVAL + Math.floor(particleCount / 500) * 50
    
    if (now - lastFireworkTime < adaptiveInterval) {
      return  // 距离上次烟花太近，忽略
    }
    lastFireworkTime = now
    
    event.preventDefault()
    const x = event.touches[0]?.clientX
    const y = event.touches[0]?.clientY
    createFirework(x, y)
  }
}
</script>

<style scoped>
.firework-app {
  width: 100vw;
  height: 100vh;
  position: relative;
  cursor: crosshair;
}

canvas {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  will-change: contents;
  transform: translateZ(0);
}

.instructions {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 500;
  z-index: 10;
  user-select: none;
  pointer-events: none;
  transition: all 0.3s ease-out;
  max-width: calc(100vw - 32px);
  text-align: center;
}

.instructions .icon {
  flex-shrink: 0;
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}

@media (prefers-reduced-motion: reduce) {
  .instructions .icon {
    animation: none;
  }
}

/* 移动端优化 */
@media (max-width: 768px) {
  .instructions {
    bottom: 16px;
    padding: 10px 20px;
    font-size: 13px;
  }
  
  .instructions .icon {
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 480px) {
  .instructions {
    bottom: 12px;
    padding: 8px 16px;
    font-size: 12px;
    gap: 6px;
  }
  
  .instructions span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/* 移动端触摸优化 */
@media (hover: none) and (pointer: coarse) {
  .firework-app {
    cursor: default;
    -webkit-tap-highlight-color: transparent;
    touch-action: none;
  }
}
</style>
