# 项目技术架构文档

## 📋 目录

- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [核心功能](#核心功能)
- [性能优化](#性能优化)
- [开发工具](#开发工具)

## 🚀 技术栈

### 前端框架
- **Vue 3.4** - 渐进式 JavaScript 框架
  - Composition API
  - Reactive 响应式系统
  - Component 组件化

### 构建工具
- **Vite 7.3** - 下一代前端构建工具
  - 极速的开发服务器
  - 优化的生产构建
  - 插件生态系统

### UI 组件
- **Lucide Vue Next** - 精美的图标库
  - 0.344.0 版本
  - SVG 图标
  - Tree-shakeable

### Canvas 绘图
- **原生 Canvas API** - 2D 图形渲染
  - requestAnimationFrame
  - 粒子系统
  - 性能优化

### PWA 支持
- **vite-plugin-pwa** - PWA 插件
  - Service Worker
  - 离线缓存
  - 应用安装

### 代码质量
- **ESLint 10** - 代码检查
- **Husky** - Git Hooks
- **lint-staged** - 暂存文件检查

### 构建优化
- **Terser** - 代码压缩混淆
  - 移除 console
  - 移除 debugger
  - 代码混淆

## 📁 项目结构

```
Happy-New-Year/
├── public/                 # 静态资源
│   ├── *.png              # PWA 图标
│   ├── favicon.*          # 网站图标
│   └── site.webmanifest   # PWA 配置
├── src/
│   ├── components/        # Vue 组件
│   │   ├── ControlPanel.vue    # 控制面板
│   │   └── BlessingText.vue    # 祝福文字
│   ├── composables/       # 组合式函数
│   │   ├── useBlessings.js     # 祝福语管理
│   │   ├── useFireworks.js     # 烟花逻辑
│   │   └── usePerformance.js   # 性能监控
│   ├── utils/             # 工具函数
│   │   ├── firework.js         # 烟花粒子类
│   │   └── devtools-detector.js # 开发者工具检测
│   ├── App.vue            # 根组件
│   ├── main.js            # 应用入口
│   └── style.css          # 全局样式
├── docs/                  # 技术文档
│   ├── ARCHITECTURE.md         # 架构文档
│   ├── PWA-SETUP.md           # PWA 配置
│   ├── ESLINT-SETUP.md        # ESLint 配置
│   ├── GIT-HOOKS-GUIDE.md     # Git Hooks
│   ├── DEPLOYMENT.md          # 部署指南
│   └── REPOSITORY-SETTINGS.md # 仓库设置
├── .husky/                # Git Hooks
├── .github/               # GitHub 配置
├── dist/                  # 构建输出
├── node_modules/          # 依赖包
├── eslint.config.js       # ESLint 配置
├── vite.config.js         # Vite 配置
├── package.json           # 项目配置
├── LICENSE               # MIT 许可证
└── README.md             # 项目说明
```

## 🎯 核心功能

### 1. 烟花系统 (useFireworks.js)

**技术实现**：
- Canvas 2D 渲染
- 粒子系统
- requestAnimationFrame 动画循环
- 物理模拟（重力、阻力）

**关键代码**：
```javascript
const createFirework = (x, y) => {
  // 创建粒子
  const particles = []
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Firework(x, y, color))
  }
  fireworks.value.push(...particles)
}
```

### 2. 祝福语系统 (useBlessings.js)

**技术实现**：
- Vue Reactive 响应式存储
- LocalStorage 持久化
- 随机选择算法

**功能**：
- 10 个预设祝福语
- 自定义祝福语
- 随机显示

### 3. 性能监控 (usePerformance.js)

**技术实现**：
- Performance API
- FPS 计算
- 自适应质量调整

**监控指标**：
- 帧率 (FPS)
- 渲染时间
- 粒子数量

### 4. 控制面板 (ControlPanel.vue)

**技术实现**：
- Vue 组件
- Props/Emits 通信
- 响应式状态

**功能**：
- 颜色选择
- 祝福语管理
- 性能设置

## ⚡ 性能优化

### Canvas 优化

1. **Desynchronized 模式**
```javascript
canvas.getContext('2d', { 
  desynchronized: true,
  alpha: false 
})
```

2. **批量渲染**
```javascript
// 减少状态切换
particles.forEach(p => {
  ctx.fillStyle = p.color
  ctx.fillRect(p.x, p.y, p.size, p.size)
})
```

3. **设备像素比适配**
```javascript
const dpr = window.devicePixelRatio || 1
canvas.width = width * dpr
canvas.height = height * dpr
ctx.scale(dpr, dpr)
```

### Vue 优化

1. **计算属性缓存**
```javascript
const filteredData = computed(() => {
  // 自动缓存
})
```

2. **事件委托**
```javascript
<div @click="handleClick">
  <!-- 子元素 -->
</div>
```

### 构建优化

1. **代码分割**
```javascript
// vite 自动处理动态导入
const module = await import('./module.js')
```

2. **压缩混淆**
```javascript
terserOptions: {
  compress: {
    drop_console: true,
    drop_debugger: true
  }
}
```

## 🛠️ 开发工具

### 开发命令

```bash
# 开发服务器
npm run dev

# 生产构建
npm run build

# 预览构建
npm run preview

# 代码检查
npm run lint

# 自动修复
npm run lint:fix
```

### 调试工具

- Vue DevTools - Vue 组件调试
- Chrome DevTools - 性能分析
- Lighthouse - PWA 评分
- Network 面板 - 网络请求

## 📊 性能指标

### 目标

- **FPS**: 稳定 60
- **首屏加载**: < 1s
- **PWA 评分**: > 90
- **Lighthouse 性能**: > 90

### 监控

```javascript
// FPS 监控
const fps = computed(() => {
  return Math.round(1000 / frameTime.value)
})

// 性能分级
const performanceLevel = computed(() => {
  if (fps.value >= 55) return 'high'
  if (fps.value >= 30) return 'medium'
  return 'low'
})
```

## 🔐 安全措施

### 生产环境保护

1. **开发者工具检测** (`devtools-detector.js`)
2. **禁用右键菜单**
3. **禁用 F12 等快捷键**
4. **控制台混淆**
5. **代码压缩混淆**

## 🌐 浏览器兼容性

### 支持的浏览器

- Chrome 65+
- Firefox 105+
- Safari 16+
- Edge 79+

### Polyfills

项目使用现代浏览器 API，不包含 polyfills。
如需支持旧浏览器，可添加：
- @vitejs/plugin-legacy

## 📚 技术文档

详细技术文档：

- [PWA 配置指南](./PWA-SETUP.md)
- [ESLint 配置指南](./ESLINT-SETUP.md)
- [Git Hooks 指南](./GIT-HOOKS-GUIDE.md)
- [部署指南](./DEPLOYMENT.md)
- [仓库设置](./REPOSITORY-SETTINGS.md)

## 🔄 更新日志

版本更新和变更记录请查看 GitHub Releases。

---

**架构清晰，性能优秀！** 🚀
