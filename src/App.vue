<template>
  <div class="firework-app" @click="handleClick" @touchstart="handleTouch">
    <canvas ref="canvas"></canvas>
    
    <!-- 主标题区域 -->
    <header class="app-header">
      <div class="title-container">
        <div class="title-decoration"></div>
        <h1 class="main-title">
          <span class="title-text">烟花祈愿池</span>
          <span class="subtitle">Digital Fireworks & Wishes</span>
        </h1>
        <div class="title-decoration"></div>
      </div>
    </header>
    
    <ControlPanel 
      :colors="colors"
      :selectedColorIndex="selectedColorIndex"
      :showBlessings="showBlessings"
      @select-color="selectColor"
      @add-blessing="addCustomBlessing"
      @toggle-blessings="showBlessings = !showBlessings"
    />
    
    <div class="instructions">
      <span class="dot-indicator"></span>
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
import ControlPanel from './components/ControlPanel.vue'
import BlessingText from './components/BlessingText.vue'
import { useFireworks } from './composables/useFireworks.js'
import { useBlessings } from './composables/useBlessings.js'

const canvas = ref(null)
const selectedColorIndex = ref(0)
const showBlessings = ref(false)  // 控制是否显示祝福语

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
  overflow: hidden;
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

/* 主标题区域 */
.app-header {
  position: absolute;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  pointer-events: none;
  user-select: none;
}

.title-container {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 40px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
  border: 2px solid rgba(255, 215, 0, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset,
    0 0 60px rgba(255, 215, 0, 0.1);
  animation: titleGlow 3s ease-in-out infinite;
}

@keyframes titleGlow {
  0%, 100% {
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset,
      0 0 60px rgba(255, 215, 0, 0.1);
  }
  50% {
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset,
      0 0 80px rgba(255, 215, 0, 0.2);
  }
}

.title-decoration {
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
  box-shadow: 0 0 10px var(--color-accent);
}

.main-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.title-text {
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #ffd700 50%, #ffffff 100%);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 4px;
  text-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 100% center; }
}

.subtitle {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 3px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
}

.instructions {
  position: absolute;
  bottom: var(--spacing-xl);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 28px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: rgba(255, 255, 255, 0.95);
  font-size: 15px;
  font-weight: 500;
  z-index: 10;
  user-select: none;
  pointer-events: none;
  transition: all var(--transition-slow);
  max-width: calc(100vw - 32px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

.dot-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  box-shadow: 0 0 12px rgba(255, 215, 0, 0.6), 0 0 20px rgba(255, 215, 0, 0.3);
  animation: pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes pulse {
  0%, 100% { 
    opacity: 1; 
    transform: scale(1);
    box-shadow: 0 0 12px rgba(255, 215, 0, 0.6), 0 0 20px rgba(255, 215, 0, 0.3);
  }
  50% { 
    opacity: 0.7; 
    transform: scale(1.2);
    box-shadow: 0 0 16px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.5);
  }
}

@media (prefers-reduced-motion: reduce) {
  .dot-indicator,
  .title-container,
  .title-text {
    animation: none;
  }
}

/* 移动端优化 */
@media (max-width: 768px) {
  .app-header {
    top: 20px;
  }
  
  .title-container {
    padding: 16px 28px;
    gap: 16px;
  }
  
  .title-text {
    font-size: 28px;
    letter-spacing: 3px;
  }
  
  .subtitle {
    font-size: 10px;
    letter-spacing: 2px;
  }
  
  .title-decoration {
    width: 30px;
  }
  
  .instructions {
    bottom: var(--spacing-lg);
    padding: 12px 24px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .app-header {
    top: 16px;
  }
  
  .title-container {
    padding: 12px 20px;
    gap: 12px;
  }
  
  .title-text {
    font-size: 22px;
    letter-spacing: 2px;
  }
  
  .subtitle {
    font-size: 9px;
    letter-spacing: 1.5px;
  }
  
  .title-decoration {
    width: 24px;
  }
  
  .instructions {
    bottom: var(--spacing-md);
    padding: 10px 20px;
    font-size: 13px;
    gap: 10px;
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
