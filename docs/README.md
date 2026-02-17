# 📚 技术文档索引

欢迎查看数字烟花祈愿池项目的技术文档！

## 📖 文档导航

### 🎯 快速开始

- **[README.md](../README.md)** - 项目介绍和快速开始
- **[LICENSE](../LICENSE)** - MIT 许可证

### 🏗️ 架构与设计

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - 项目技术架构
  - 技术栈详解
  - 项目结构
  - 核心功能实现
  - 性能优化策略

### ⚙️ 配置指南

- **[PWA-SETUP.md](./PWA-SETUP.md)** - PWA 配置指南
  - Service Worker 配置
  - 离线缓存策略
  - 图标资源准备
  - 安装和测试

- **[ESLINT-SETUP.md](./ESLINT-SETUP.md)** - ESLint 配置指南
  - 代码规范配置
  - 自定义规则
  - VS Code 集成
  - 常见问题

- **[GIT-HOOKS-GUIDE.md](./GIT-HOOKS-GUIDE.md)** - Git Hooks 指南
  - Husky 配置
  - lint-staged 使用
  - 提交前检查
  - 故障排除

### 🚀 部署与运维

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - 部署指南
  - 各平台部署方法
  - 服务器配置
  - HTTPS 配置
  - 性能优化
  - 监控方案

### 🔧 GitHub 相关

- **[REPOSITORY-SETTINGS.md](./REPOSITORY-SETTINGS.md)** - 仓库设置指南
  - Description 建议
  - Topics 推荐
  - 社交预览配置
  - GitHub Pages 设置

## 🎨 技术栈概览

### 核心技术

| 技术 | 版本 | 用途 | 文档 |
|------|------|------|------|
| Vue 3 | 3.4.15 | 前端框架 | [ARCHITECTURE.md](./ARCHITECTURE.md) |
| Vite | 7.3.1 | 构建工具 | [DEPLOYMENT.md](./DEPLOYMENT.md) |
| Canvas API | - | 绘图渲染 | [ARCHITECTURE.md](./ARCHITECTURE.md) |
| PWA | - | 离线支持 | [PWA-SETUP.md](./PWA-SETUP.md) |

### 开发工具

| 工具 | 版本 | 用途 | 文档 |
|------|------|------|------|
| ESLint | 10.0.0 | 代码检查 | [ESLINT-SETUP.md](./ESLINT-SETUP.md) |
| Husky | 9.1.7 | Git Hooks | [GIT-HOOKS-GUIDE.md](./GIT-HOOKS-GUIDE.md) |
| lint-staged | 16.2.7 | 暂存检查 | [GIT-HOOKS-GUIDE.md](./GIT-HOOKS-GUIDE.md) |
| Terser | 5.46.0 | 代码压缩 | [ARCHITECTURE.md](./ARCHITECTURE.md) |

## 🔍 按主题查找

### 我想...

#### 🎯 了解项目
→ 阅读 [README.md](../README.md) 和 [ARCHITECTURE.md](./ARCHITECTURE.md)

#### ⚙️ 配置开发环境
→ 阅读 [ESLINT-SETUP.md](./ESLINT-SETUP.md) 和 [GIT-HOOKS-GUIDE.md](./GIT-HOOKS-GUIDE.md)

#### 📱 让应用可安装
→ 阅读 [PWA-SETUP.md](./PWA-SETUP.md)

#### 🚀 部署到生产环境
→ 阅读 [DEPLOYMENT.md](./DEPLOYMENT.md)

#### 🔧 配置 GitHub 仓库
→ 阅读 [REPOSITORY-SETTINGS.md](./REPOSITORY-SETTINGS.md)

#### 🐛 解决问题
→ 查看各文档的"常见问题"章节

## 📝 常用命令速查

```bash
# 开发
npm run dev              # 启动开发服务器
npm run build            # 构建生产版本
npm run preview          # 预览生产构建

# 代码质量
npm run lint             # 检查代码
npm run lint:fix         # 自动修复问题

# Git
git add .                # 添加所有更改
git commit -m "msg"      # 提交（会自动运行 lint）
git push                 # 推送到远程

# 部署
npm run deploy           # 部署（需配置）
```

## 🎓 学习路径

### 新手入门

1. **了解项目** → [README.md](../README.md)
2. **安装依赖** → `npm install`
3. **启动项目** → `npm run dev`
4. **查看架构** → [ARCHITECTURE.md](./ARCHITECTURE.md)

### 开发配置

1. **配置 ESLint** → [ESLINT-SETUP.md](./ESLINT-SETUP.md)
2. **配置 Git Hooks** → [GIT-HOOKS-GUIDE.md](./GIT-HOOKS-GUIDE.md)
3. **开始开发** → 编写代码

### 生产部署

1. **配置 PWA** → [PWA-SETUP.md](./PWA-SETUP.md)
2. **构建测试** → `npm run build && npm run preview`
3. **选择平台** → [DEPLOYMENT.md](./DEPLOYMENT.md)
4. **执行部署** → 按照指南操作

## 🆘 获取帮助

### 遇到问题？

1. **查看相关文档** - 大多数问题都有解答
2. **检查常见问题** - 每个文档都有 FAQ 章节
3. **查看 Issues** - GitHub Issues 可能有相关讨论
4. **提交 Issue** - 如果问题仍未解决

### 贡献文档

发现文档问题或想要改进？

1. Fork 仓库
2. 修改文档
3. 提交 Pull Request

## 📚 外部资源

### 官方文档

- [Vue 3 官方文档](https://vuejs.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [ESLint 官方文档](https://eslint.org/)
- [PWA 开发指南](https://web.dev/progressive-web-apps/)

### 教程和指南

- [Vue 3 教程](https://vuejs.org/tutorial/)
- [Vite 入门](https://vitejs.dev/guide/)
- [Canvas API 教程](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

### 工具和资源

- [Vue DevTools](https://devtools.vuejs.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PWA Builder](https://www.pwabuilder.com/)

## 🔄 文档更新

文档会随项目更新而更新。最后更新日期：2026年2月17日

---

<div align="center">

**📖 选择一个主题开始学习吧！**

[⬆ 回到顶部](#-技术文档索引)

</div>
