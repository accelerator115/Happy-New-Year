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
  font-size: 30px;
  font-weight: 700;
  text-shadow: 
    0 0 24px currentColor,
    0 3px 6px rgba(0, 0, 0, 0.9),
    0 0 48px rgba(255, 255, 255, 0.6);
  pointer-events: none;
  z-index: 5;
  user-select: none;
  letter-spacing: 1px;
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
    filter: blur(5px);
  }
  20% {
    opacity: 1;
    transform: translateY(-24px) scale(1);
    filter: blur(0);
  }
  70% {
    opacity: 1;
    transform: translateY(-48px) scale(1);
    filter: blur(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-80px) scale(0.8);
    filter: blur(3px);
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
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .blessing-text {
    font-size: 20px;
  }
}
</style>
