# 🎆 数字烟花祈愿池

<div align="center">

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-fireworkwish.cmlover.cn-brightgreen?style=for-the-badge)](https://fireworkwish.cmlover.cn/)
[![Vue](https://img.shields.io/badge/Vue-3.4-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](./LICENSE)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://fireworkwish.cmlover.cn/)

**一个基于 Vue 3 + Vite + Canvas 的交互式烟花祈愿应用**

[✨ 在线演示](https://fireworkwish.cmlover.cn/) | [📖 文档](#使用方法) | [🚀 快速开始](#快速开始)

</div>

---

## 功能特性

- **多彩烟花** - 7种绚丽颜色可选（红、橙、金、绿、蓝、紫、粉）
- **祝福语系统** - 10个默认新年祝福 + 自定义祝福语
- **点击交互** - 点击屏幕任意位置燃放烟花
- **触摸支持** - 完整支持移动端触摸操作
- **可收起面板** - 控制面板可以收起/展开，移动端默认收起
- **动画效果** - 烟花炸开时显示随机祝福语并渐隐
- **美观界面** - Glassmorphism 毛玻璃设计、星空渐变背景
- **响应式设计** - 完美适配手机、平板、桌面端
- **无障碍访问** - 支持键盘导航和屏幕阅读器
- **性能优化** - 尊重用户的减少动画偏好设置
- **PWA支持** - 可安装为独立应用，支持离线访问

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 使用方法

### 桌面端
1. 点击左侧控制面板选择烟花颜色
2. 输入自定义祝福语（可选）
3. 点击屏幕任意位置燃放烟花
4. 烟花炸开时会显示随机祝福语
5. 点击面板右侧按钮可以收起/展开控制面板

### 移动端
1. 控制面板默认收起，点击展开按钮打开
2. 在面板中选择颜色和添加祝福语
3. 触摸屏幕任意位置燃放烟花
4. 支持多点触控

## 响应式断点

- **手机端** (< 480px) - 优化触摸目标、字体和间距
- **平板端** (480px - 768px) - 适中的布局和字体
- **桌面端** (> 768px) - 完整功能展示

## 移动端优化

### 触摸体验
- 所有触摸目标最小 44x44px（符合 Apple HIG 和 Material Design）
- 触摸目标间距最小 8px
- 防止 iOS 自动缩放（input font-size >= 16px）
- 禁用触摸高亮（tap-highlight-color）
- 触摸防抖和事件优化

### 界面适配
- 控制面板响应式宽度
- 移动端默认收起面板
- 平滑的展开/收起动画
- 祝福文字自动缩放
- 底部提示文字自适应

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架（Composition API）
- **Vite** - 下一代前端构建工具
- **Canvas API** - 2D 图形绘制
- **Lucide Vue** - 专业 SVG 图标库
- **Glassmorphism UI** - 现代毛玻璃设计风格

## 项目结构

```
Happy-New-Year/
├── src/
│   ├── components/
│   │   ├── ControlPanel.vue      # 控制面板组件
│   │   └── BlessingText.vue      # 祝福语文字组件
│   ├── utils/
│   │   └── firework.js           # 烟花粒子类
│   ├── App.vue                   # 主应用组件
│   ├── main.js                   # 应用入口
│   └── style.css                 # 全局样式
├── index.html                     # HTML 入口
├── vite.config.js                # Vite 配置
└── package.json                  # 项目配置
```
## 设计特点

### Glassmorphism 设计
- 半透明背景（rgba 0.12）
- 16px 背景模糊效果
- 精细的边框和阴影
- 平滑的过渡动画

### 无障碍访问
- ARIA 标签支持
- 键盘导航友好
- 支持 prefers-reduced-motion
- 良好的色彩对比度

### 性能优化（GPU 加速）
- Canvas desynchronized 模式（低延迟渲染）
- 高分辨率屏幕适配（Retina、4K）
- CSS GPU 加速（transform3d、will-change）
- 帧率控制（稳定 60 FPS）
- 批量渲染减少状态切换
- 简化绘制算法优化性能

### 交互优化
- 点击控制面板不会触发烟花
- 收起按钮固定在面板中央右侧
- 防止误触发优化

## 颜色主题

| 颜色 | RGB | 用途 |
|------|-----|------|
| 红色 | [255, 50, 50] | 喜庆吉祥 |
| 橙色 | [255, 165, 0] | 活力四射 |
| 金色 | [255, 215, 0] | 富贵荣华 |
| 绿色 | [50, 255, 50] | 生机勃勃 |
| 蓝色 | [50, 200, 255] | 清新明快 |
| 紫色 | [200, 100, 255] | 高贵典雅 |
| 粉色 | [255, 105, 180] | 浪漫温馨 |

## 性能指标

### 目标性能
- **帧率**: 稳定 60 FPS
- **延迟**: < 16.67ms per frame
- **GPU 使用**: < 70%
- **浏览器支持**: Chrome 65+, Firefox 105+, Safari 16+, Edge 79+

### 优化特性
- Canvas desynchronized 渲染模式
- 自动适配设备像素比（DPR）
- GPU 合成层加速
- 批量粒子渲染
- 智能帧率控制

## PWA 支持

本应用已配置为 Progressive Web App (PWA)，支持以下功能：

### 安装应用
在支持PWA的浏览器中访问应用时，可以将其安装到设备：

#### 桌面端（Chrome/Edge）
1. 访问应用网址
2. 点击地址栏右侧的"安装"图标
3. 或点击浏览器菜单 → "安装数字烟花祈愿池"

#### 移动端（Android）
1. 在Chrome中打开应用
2. 点击右上角菜单 → "添加到主屏幕"
3. 应用图标将出现在主屏幕上

#### 移动端（iOS）
1. 在Safari中打开应用
2. 点击分享按钮
3. 选择"添加到主屏幕"

### PWA 特性
- ✅ **离线访问** - 首次访问后，即使没有网络也能使用
- ✅ **快速加载** - Service Worker缓存提供秒开体验
- ✅ **独立应用** - 安装后作为独立应用运行，无浏览器UI
- ✅ **自动更新** - 检测到新版本时自动提示更新
- ✅ **全屏体验** - 移动端全屏展示，沉浸式体验

### 测试PWA
```bash
# 构建生产版本
npm run build

# 预览（测试PWA功能）
npm run preview
```

然后在浏览器中：
1. 打开 DevTools (F12)
2. 切换到 Application 标签
3. 检查 Manifest 和 Service Workers 是否正常
4. 使用 Lighthouse 测试 PWA 评分

## 🌟 Star History

如果这个项目对你有帮助，请给个 ⭐️ Star 支持一下！

## 🤝 Contributing

欢迎提交 Issue 和 Pull Request！

## 📄 License

本项目采用 [MIT](./LICENSE) 许可证。

## 💖 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Lucide Icons](https://lucide.dev/) - 精美的开源图标库
- [RealFaviconGenerator](https://realfavicongenerator.net/) - Favicon 生成工具

---

<div align="center">

**Made with ❤️ by [accelerator115](https://github.com/accelerator115)**

[⬆ 回到顶部](#-数字烟花祈愿池)

</div>
