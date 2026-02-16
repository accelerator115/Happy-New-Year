<template>
  <div class="control-panel" :class="{ collapsed: isCollapsed }" @click.stop="handlePanelClick">
    <button 
      class="toggle-btn"
      @click.stop="togglePanel"
      :aria-label="isCollapsed ? '展开控制面板' : '收起控制面板'"
      :aria-expanded="!isCollapsed"
    >
      <span class="toggle-icon">{{ isCollapsed ? '◀' : '▶' }}</span>
    </button>
    
    <!-- 收起状态的图标提示 -->
    <div class="collapsed-icon" v-if="isCollapsed">
      <span class="icon-text">⚙</span>
    </div>
    
    <div class="panel-content">
      <h2>烟花祈愿池</h2>
    
    <div class="input-group">
      <label>自定义祝福语</label>
      <input 
        v-model="customBlessing" 
        type="text" 
        placeholder="输入你的新年祝福..."
        @keyup.enter="handleAddBlessing"
        aria-label="自定义祝福语输入框"
      />
    </div>
    
    <button 
      class="btn btn-primary" 
      @click="handleAddBlessing"
      :disabled="!customBlessing.trim()"
    >
      添加祝福
    </button>
    
    <div class="divider"></div>
    
    <div class="input-group">
      <label>自动放烟花</label>
      <button 
        class="toggle-blessing-btn"
        :class="{ active: autoMode }"
        @click="$emit('toggle-auto-mode')"
        :aria-label="autoMode ? '关闭自动模式' : '开启自动模式'"
      >
        <span class="status-indicator" :class="{ active: autoMode }"></span>
        <span>{{ autoMode ? '已开启' : '已关闭' }}</span>
      </button>
    </div>
    
    <div class="divider"></div>
    
    <div class="input-group">
      <label>显示祝福语</label>
      <button 
        class="toggle-blessing-btn"
        :class="{ active: showBlessings }"
        @click="$emit('toggle-blessings')"
        :aria-label="showBlessings ? '关闭祝福语' : '开启祝福语'"
      >
        <span class="status-indicator" :class="{ active: showBlessings }"></span>
        <span>{{ showBlessings ? '已开启' : '已关闭' }}</span>
      </button>
    </div>
    
    <div class="divider"></div>
    
    <div class="input-group">
      <label>画质设置</label>
      <button 
        class="toggle-blessing-btn"
        :class="{ active: autoQuality }"
        @click="$emit('toggle-auto-quality')"
        :aria-label="autoQuality ? '切换至手动画质' : '切换至自动画质'"
      >
        <span class="status-indicator" :class="{ active: autoQuality }"></span>
        <span>{{ autoQuality ? '自动调节' : '手动调节' }}</span>
      </button>
    </div>
    
    <!-- 手动画质选择器 -->
    <div class="input-group" v-if="!autoQuality">
      <label>质量等级</label>
      <div class="quality-selector">
        <button 
          class="quality-btn"
          :class="{ active: performanceLevel === 'low' }"
          @click="$emit('set-quality', 'low')"
          aria-label="设置为低画质"
        >
          <span class="quality-label">低</span>
          <span class="quality-desc">流畅优先</span>
        </button>
        <button 
          class="quality-btn"
          :class="{ active: performanceLevel === 'medium' }"
          @click="$emit('set-quality', 'medium')"
          aria-label="设置为中等画质"
        >
          <span class="quality-label">中</span>
          <span class="quality-desc">均衡模式</span>
        </button>
        <button 
          class="quality-btn"
          :class="{ active: performanceLevel === 'high' }"
          @click="$emit('set-quality', 'high')"
          aria-label="设置为高画质"
        >
          <span class="quality-label">高</span>
          <span class="quality-desc">画质优先</span>
        </button>
      </div>
    </div>
    
    <div class="divider"></div>
    
    <div class="input-group">
      <label>烟花颜色</label>
      <div class="color-palette">
        <button 
          v-for="(color, index) in colors" 
          :key="index"
          class="color-btn"
          :class="{ active: selectedColorIndex === index, rainbow: color.isRandom }"
          :style="{ background: color.gradient }"
          :aria-label="`选择${color.name}烟花`"
          :aria-pressed="selectedColorIndex === index"
          :title="color.name"
          @click="$emit('select-color', index)"
        >
          <span v-if="selectedColorIndex === index" class="check-mark">✓</span>
        </button>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  colors: Array,
  selectedColorIndex: Number,
  showBlessings: Boolean,
  autoMode: Boolean,
  autoQuality: Boolean,
  performanceLevel: String
})

const emit = defineEmits(['select-color', 'add-blessing', 'toggle-blessings', 'toggle-auto-mode', 'toggle-auto-quality', 'set-quality'])

const customBlessing = ref('')
const isCollapsed = ref(false)

// 移动端默认收起
onMounted(() => {
  if (window.innerWidth < 768) {
    isCollapsed.value = true
  }
})

const togglePanel = () => {
  isCollapsed.value = !isCollapsed.value
}

// 移动端点击面板展开
const handlePanelClick = () => {
  if (isCollapsed.value && window.innerWidth <= 768) {
    togglePanel()
  }
}

const handleAddBlessing = () => {
  if (customBlessing.value.trim()) {
    emit('add-blessing', customBlessing.value)
    customBlessing.value = ''
  }
}
</script>

<style scoped>
.control-panel {
  position: absolute;
  top: 24px;
  left: 24px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: white;
  z-index: 10;
  max-width: 340px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  /* macOS 风格的弹性动画 */
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform, border-radius, width, height;
  transform: translateZ(0);
}

.control-panel.collapsed {
  transform: translateX(calc(-100% + 52px));
}

.control-panel.collapsed:hover {
  transform: translateX(calc(-100% + 56px)) scale(1.02);
}

.panel-content {
  padding: 28px;
  opacity: 1;
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.control-panel.collapsed .panel-content {
  opacity: 0;
  pointer-events: none;
  transform: scale(0.95);
}

.control-panel:not(.collapsed):hover {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.15) inset;
}

.toggle-btn {
  position: absolute;
  top: 50%;
  right: -24px;
  transform: translateY(-50%) translateZ(0);
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  color: white;
  cursor: pointer;
  /* macOS 风格弹性动画 */
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  will-change: transform, background;
  font-size: 16px;
}

.toggle-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-50%) scale(1.1) translateZ(0);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.toggle-btn:active {
  transform: translateY(-50%) scale(0.9) translateZ(0);
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.toggle-icon {
  display: inline-block;
  line-height: 1;
  opacity: 0.9;
}

/* 收起状态的图标 */
.collapsed-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.control-panel.collapsed .collapsed-icon {
  opacity: 1;
}

.icon-text {
  font-size: 28px;
  line-height: 1;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
}

h2 {
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 700;
  color: #ffd700;
  text-shadow: 0 2px 12px rgba(255, 215, 0, 0.4);
  letter-spacing: 0.5px;
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  margin: 20px 0;
}

.input-group {
  margin-bottom: 18px;
}

.input-group label {
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 0.3px;
}

.input-group input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  color: white;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease-out;
}

.input-group input:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.3);
}

.input-group input:focus {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 215, 0, 0.5);
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
}

.input-group input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  padding: 13px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.2s ease-out;
  width: 100%;
  letter-spacing: 0.3px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(102, 126, 234, 0.5);
  background: linear-gradient(135deg, #7d8ff0 0%, #8a5db0 100%);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 3px 12px rgba(102, 126, 234, 0.3);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.toggle-blessing-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 12px 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.2s ease-out;
  letter-spacing: 0.3px;
}

.toggle-blessing-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.4);
  color: rgba(255, 255, 255, 0.95);
}

.toggle-blessing-btn.active {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-color: rgba(16, 185, 129, 0.6);
  color: white;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.25);
}

.toggle-blessing-btn.active:hover {
  background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
  border-color: rgba(16, 185, 129, 0.8);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.35);
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  transition: all 0.2s ease-out;
}

.status-indicator.active {
  background: white;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.6);
  animation: statusPulse 2s ease-in-out infinite;
}

@keyframes statusPulse {
  0%, 100% { 
    opacity: 1;
    transform: scale(1);
  }
  50% { 
    opacity: 0.8;
    transform: scale(1.1);
  }
}

/* 画质选择器 */
.quality-selector {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 4px;
}

.quality-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 14px 8px;
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-size: 13px;
}

.quality-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.quality-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: rgba(102, 126, 234, 0.6);
  color: white;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.35);
  transform: translateY(-2px) scale(1.02);
}

.quality-btn.active:hover {
  background: linear-gradient(135deg, #7d8ff0 0%, #8a5db0 100%);
  border-color: rgba(102, 126, 234, 0.8);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.45);
}

.quality-label {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.quality-desc {
  font-size: 11px;
  opacity: 0.85;
  letter-spacing: 0.2px;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .control-panel {
    top: 16px;
    left: 16px;
    right: auto;
    max-width: calc(100% - 32px);
    width: auto;
    /* macOS 风格平滑动画 */
    transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  /* 收起状态：变成小圆形按钮 */
  .control-panel.collapsed {
    width: 56px;
    height: 56px;
    min-width: 56px;
    min-height: 56px;
    max-width: 56px;
    border-radius: 50%;
    padding: 0;
    transform: translateX(0) scale(1);
    background: rgba(255, 255, 255, 0.18);
    cursor: pointer;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4);
  }
  
  .control-panel.collapsed:hover {
    transform: scale(1.08);
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  }
  
  .control-panel.collapsed:active {
    transform: scale(0.95);
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* 显示收起图标 */
  .collapsed-icon {
    display: block;
  }
  
  /* 收起时隐藏切换按钮 */
  .control-panel.collapsed .toggle-btn {
    opacity: 0;
    pointer-events: none;
    transform: translateY(-50%) scale(0);
  }
  
  /* 展开时显示切换按钮 */
  .control-panel:not(.collapsed) .toggle-btn {
    opacity: 1;
    right: 12px;
    top: 16px;
    transform: translateY(0) scale(1);
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
    font-size: 14px;
  }
  
  .panel-content {
    padding: 20px;
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  .control-panel.collapsed .panel-content {
    transform: scale(0.8);
  }
  
  h2 {
    font-size: 20px;
    margin-bottom: 20px;
  }
  
  .input-group input {
    font-size: 16px; /* 防止 iOS 自动缩放 */
    padding: 12px;
  }
  
  .btn {
    padding: 14px 24px;
    font-size: 16px;
    min-height: 48px;
  }
  
  .toggle-blessing-btn {
    padding: 13px 20px;
    font-size: 16px;
    min-height: 48px;
  }
  
  .color-btn {
    width: 50px;
    height: 50px;
  }
  
  .color-palette {
    gap: 12px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .control-panel {
    top: 12px;
    left: 12px;
  }
  
  /* 收起状态：更小的圆形按钮 */
  .control-panel.collapsed {
    width: 52px;
    height: 52px;
    min-width: 52px;
    min-height: 52px;
    max-width: 52px;
  }
  
  .panel-content {
    padding: 18px;
  }
  
  h2 {
    font-size: 18px;
    margin-bottom: 16px;
  }
  
  .color-btn {
    width: 46px;
    height: 46px;
  }
  
  .divider {
    margin: 16px 0;
  }
  
  .input-group {
    margin-bottom: 16px;
  }
  
  .quality-selector {
    gap: 8px;
  }
  
  .quality-btn {
    padding: 12px 6px;
    font-size: 12px;
  }
  
  .quality-label {
    font-size: 14px;
  }
  
  .quality-desc {
    font-size: 10px;
  }
}

.color-palette {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.color-btn {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.2s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.color-btn:hover {
  transform: scale(1.08);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
}

.color-btn:active {
  transform: scale(0.95);
}

.color-btn.active {
  border-color: white;
  border-width: 3px;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25), 0 4px 20px rgba(0, 0, 0, 0.4);
  transform: scale(1.05);
}

.check-mark {
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  line-height: 1;
}

/* 随机颜色按钮动画 */
.color-btn.rainbow {
  background-size: 200% 200%;
  animation: rainbow-shift 3s ease-in-out infinite;
}

@keyframes rainbow-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@media (prefers-reduced-motion: reduce) {
  .btn, .color-btn, .toggle-blessing-btn, .status-indicator {
    transition: none;
  }
  .btn-primary:hover:not(:disabled), .color-btn:hover, .toggle-blessing-btn:hover {
    transform: none;
  }
  .color-btn.rainbow, .status-indicator.active {
    animation: none;
  }
}
</style>
