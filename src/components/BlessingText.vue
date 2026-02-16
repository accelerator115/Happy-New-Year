<template>
  <div 
    class="blessing-text"
    :style="{ 
      left: blessing.x + 'px', 
      top: blessing.y + 'px', 
      color: blessing.color 
    }"
    role="status"
    aria-live="polite"
  >
    {{ blessing.text }}
  </div>
</template>

<script setup>
defineProps({
  blessing: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.blessing-text {
  position: absolute;
  color: white;
  font-size: 28px;
  font-weight: 700;
  text-shadow: 
    0 0 20px currentColor,
    0 2px 4px rgba(0, 0, 0, 0.8),
    0 0 40px rgba(255, 255, 255, 0.5);
  pointer-events: none;
  z-index: 5;
  user-select: none;
  letter-spacing: 0.5px;
  animation: fadeOut 2s ease-out forwards;
  white-space: nowrap;
  /* GPU 加速 */
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}

@keyframes fadeOut {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.3);
    filter: blur(4px);
  }
  20% {
    opacity: 1;
    transform: translateY(-20px) scale(1);
    filter: blur(0);
  }
  70% {
    opacity: 1;
    transform: translateY(-40px) scale(1);
    filter: blur(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-70px) scale(0.8);
    filter: blur(2px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .blessing-text {
    animation: fadeOutSimple 2s ease-out forwards;
  }
  
  @keyframes fadeOutSimple {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}

/* 移动端优化 */
@media (max-width: 768px) {
  .blessing-text {
    font-size: 22px;
  }
}

@media (max-width: 480px) {
  .blessing-text {
    font-size: 18px;
  }
}
</style>
