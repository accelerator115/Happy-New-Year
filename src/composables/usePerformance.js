import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 性能检测和自适应质量管理
 * 根据设备性能动态调整渲染质量
 */
export function usePerformance() {
  // 性能等级: 'low' | 'medium' | 'high'
  const performanceLevel = ref('high')
  const currentFPS = ref(60)
  const isLowPerformanceDevice = ref(false)
  const autoQuality = ref(true)  // 是否自动调整画质
  
  // FPS 监控
  let frameCount = 0
  let lastFPSCheck = 0
  let fpsCheckInterval = null
  
  // 质量配置
  const qualitySettings = {
    low: {
      maxParticles: 1200,
      particlesPerFirework: 80,
      enableGlow: false,
      enableTrail: true,
      trailAlpha: 0.15,
      targetFPS: 30,
      canvasScale: 0.75,  // 降低分辨率
      simplifyRendering: true
    },
    medium: {
      maxParticles: 2000,
      particlesPerFirework: 150,
      enableGlow: true,
      enableTrail: true,
      trailAlpha: 0.08,
      targetFPS: 45,
      canvasScale: 0.85,
      simplifyRendering: false
    },
    high: {
      maxParticles: 3000,
      particlesPerFirework: 200,
      enableGlow: true,
      enableTrail: true,
      trailAlpha: 0.05,
      targetFPS: 60,
      canvasScale: 1,
      simplifyRendering: false
    }
  }
  
  /**
   * 检测设备性能
   */
  const detectDevicePerformance = () => {
    // 1. 检查硬件并发数 (CPU 核心)
    const cores = navigator.hardwareConcurrency || 2
    
    // 2. 检查设备内存 (如果支持)
    const memory = navigator.deviceMemory || 4
    
    // 3. 检查是否为移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    // 4. 检查屏幕分辨率
    const screenPixels = window.screen.width * window.screen.height
    const isLowRes = screenPixels < 1920 * 1080
    
    // 5. 检查 DPR (高 DPR 会增加渲染负担)
    const dpr = window.devicePixelRatio || 1
    
    // 综合评分
    let score = 0
    
    // CPU 核心评分
    if (cores >= 8) score += 30
    else if (cores >= 4) score += 20
    else score += 10
    
    // 内存评分
    if (memory >= 8) score += 30
    else if (memory >= 4) score += 20
    else score += 10
    
    // 设备类型评分
    if (!isMobile) score += 25
    else score += 10
    
    // 分辨率评分
    if (!isLowRes) score += 15
    else score += 5
    
    // DPR 惩罚 (高分辨率屏幕渲染压力大)
    if (dpr <= 1) score += 0
    else if (dpr <= 2) score -= 5
    else score -= 10
    
    // 根据评分设置性能等级
    if (score >= 75) {
      performanceLevel.value = 'high'
      isLowPerformanceDevice.value = false
    } else if (score >= 50) {
      performanceLevel.value = 'medium'
      isLowPerformanceDevice.value = false
    } else {
      performanceLevel.value = 'low'
      isLowPerformanceDevice.value = true
    }
    
    console.log('🎯 性能检测:', {
      cores,
      memory,
      isMobile,
      dpr,
      score,
      level: performanceLevel.value
    })
  }
  
  /**
   * FPS 监控和自适应调整
   */
  const monitorFPS = (timestamp) => {
    frameCount++
    
    if (timestamp - lastFPSCheck >= 1000) {
      currentFPS.value = frameCount
      frameCount = 0
      lastFPSCheck = timestamp
      
      // 只在自动模式下调整质量
      if (!autoQuality.value) return
      
      // 根据 FPS 动态调整质量
      const currentSettings = qualitySettings[performanceLevel.value]
      
      // 如果 FPS 持续低于目标,降低质量
      if (currentFPS.value < currentSettings.targetFPS - 10) {
        if (performanceLevel.value === 'high') {
          performanceLevel.value = 'medium'
          console.log('FPS 过低,切换至中等质量')
        } else if (performanceLevel.value === 'medium') {
          performanceLevel.value = 'low'
          console.log('FPS 过低,切换至低质量')
        }
      }
      // 如果 FPS 稳定高于目标,尝试提升质量
      else if (currentFPS.value > currentSettings.targetFPS + 5) {
        if (performanceLevel.value === 'low' && !isLowPerformanceDevice.value) {
          performanceLevel.value = 'medium'
          console.log('FPS 充足,切换至中等质量')
        } else if (performanceLevel.value === 'medium' && !isLowPerformanceDevice.value) {
          performanceLevel.value = 'high'
          console.log('FPS 充足,切换至高质量')
        }
      }
    }
  }
  
  /**
   * 启动 FPS 监控
   */
  const startFPSMonitoring = () => {
    lastFPSCheck = performance.now()
    
    const checkFPS = (timestamp) => {
      monitorFPS(timestamp)
      fpsCheckInterval = requestAnimationFrame(checkFPS)
    }
    
    fpsCheckInterval = requestAnimationFrame(checkFPS)
  }
  
  /**
   * 停止 FPS 监控
   */
  const stopFPSMonitoring = () => {
    if (fpsCheckInterval) {
      cancelAnimationFrame(fpsCheckInterval)
      fpsCheckInterval = null
    }
  }
  
  /**
   * 获取当前质量设置
   */
  const getQualitySettings = () => {
    return qualitySettings[performanceLevel.value]
  }
  
  /**
   * 手动设置性能等级
   */
  const setPerformanceLevel = (level) => {
    if (level in qualitySettings) {
      performanceLevel.value = level
      console.log('🎨 手动设置质量:', level)
    }
  }
  
  /**
   * 切换自动/手动模式
   */
  const toggleAutoQuality = () => {
    autoQuality.value = !autoQuality.value
    console.log('🔧 画质模式:', autoQuality.value ? '自动' : '手动')
  }
  
  /**
   * 设置自动/手动模式
   */
  const setAutoQuality = (auto) => {
    autoQuality.value = auto
  }
  
  onMounted(() => {
    detectDevicePerformance()
    startFPSMonitoring()
  })
  
  onUnmounted(() => {
    stopFPSMonitoring()
  })
  
  return {
    performanceLevel,
    currentFPS,
    isLowPerformanceDevice,
    autoQuality,
    getQualitySettings,
    setPerformanceLevel,
    toggleAutoQuality,
    setAutoQuality,
    qualitySettings
  }
}
