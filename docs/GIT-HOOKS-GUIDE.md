# Git Hooks 配置说明

本项目已配置 Git Hooks，使用 Husky 和 lint-staged 在提交前自动检查代码质量。

## 📦 已安装的工具

- **husky** (9.1.7) - Git Hooks 管理工具
- **lint-staged** (16.2.7) - 只对暂存文件运行 linter

## ⚙️ 配置详情

### 1. Husky 配置

Husky 已初始化，配置文件位于 `.husky/` 目录：

```
.husky/
  ├── _/          # Husky 内部文件
  └── pre-commit  # 提交前钩子
```

### 2. Pre-commit Hook

每次执行 `git commit` 时，会自动运行 `.husky/pre-commit` 脚本：

```bash
npx lint-staged
```

### 3. lint-staged 配置

在 `package.json` 中配置了 lint-staged：

```json
{
  "lint-staged": {
    "*.{js,vue}": [
      "eslint --fix",
      "git add"
    ]
  }
}
```

**说明**：
- 只检查暂存区（staged）的 `.js` 和 `.vue` 文件
- 自动运行 ESLint 修复
- 自动将修复后的文件添加到暂存区

## 🚀 工作流程

### 正常提交流程

```bash
# 1. 修改代码
# 2. 添加到暂存区
git add .

# 3. 提交（会自动触发 lint）
git commit -m "feat: add new feature"

# 流程：
#   → 运行 lint-staged
#   → 对暂存的文件运行 eslint --fix
#   → 如果有错误，提交失败
#   → 如果通过，提交成功
```

### 如果 Lint 检查失败

```bash
$ git commit -m "test"

⚠ ESLint found errors in your code:

  src/App.vue
    10:5  error  'test' is not defined  no-undef

✖ 1 problem (1 error, 0 warnings)

husky - pre-commit hook exited with code 1 (error)
```

**解决方法**：
1. 查看错误信息
2. 修复代码问题
3. 重新添加到暂存区：`git add .`
4. 再次提交：`git commit -m "your message"`

### 跳过 Hooks（不推荐）

在特殊情况下，可以跳过 hooks：

```bash
git commit --no-verify -m "emergency fix"
# 或
git commit -n -m "emergency fix"
```

⚠️ **警告**：不推荐使用，会跳过代码质量检查！

## 📋 优势

✅ **自动化**：无需手动运行 lint，提交时自动检查  
✅ **快速**：只检查修改的文件，不是整个项目  
✅ **自动修复**：能自动修复的问题会自动处理  
✅ **统一标准**：团队成员都使用相同的代码规范  
✅ **防止错误**：阻止有问题的代码被提交  

## 🛠️ 常用命令

```bash
# 手动运行 lint（检查所有文件）
npm run lint

# 手动运行 lint 并自动修复
npm run lint:fix

# 只对暂存文件运行 lint
npx lint-staged

# 测试 pre-commit hook
npx husky test .husky/pre-commit
```

## 🔧 自定义配置

### 修改 lint-staged 规则

编辑 `package.json` 中的 `lint-staged` 配置：

```json
{
  "lint-staged": {
    "*.{js,vue}": [
      "eslint --fix",
      "prettier --write",  // 添加 prettier 格式化
      "git add"
    ],
    "*.css": [
      "stylelint --fix",   // 添加 CSS 检查
      "git add"
    ]
  }
}
```

### 添加其他 Git Hooks

创建新的 hook：

```bash
# 创建 commit-msg hook（检查提交信息格式）
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'

# 创建 pre-push hook（推送前运行测试）
npx husky add .husky/pre-push 'npm test'
```

## 🐛 故障排除

### 问题 1：Hooks 没有运行

**解决方法**：
```bash
# 重新安装 husky
npm run prepare

# 确保 .husky 目录有可执行权限
chmod +x .husky/*
```

### 问题 2：lint-staged 找不到

**解决方法**：
```bash
# 确保已安装
npm install -D lint-staged --legacy-peer-deps

# 检查 package.json 中是否有 lint-staged 配置
```

### 问题 3：在 CI/CD 中跳过 Hooks

在 CI/CD 环境中，设置环境变量：

```bash
# 跳过 husky 安装
HUSKY=0 npm install
```

## 📚 相关资源

- [Husky 官方文档](https://typicode.github.io/husky/)
- [lint-staged 官方文档](https://github.com/okonet/lint-staged)
- [ESLint 官方文档](https://eslint.org/)

## 🎯 最佳实践

1. ✅ 不要跳过 hooks（除非紧急情况）
2. ✅ 提交前确保代码已测试
3. ✅ 保持提交信息清晰明确
4. ✅ 每次提交只包含一个功能或修复
5. ✅ 及时修复 lint 错误，不要累积

---

**配置完成！** 现在每次提交代码时，都会自动运行 ESLint 检查，确保代码质量！🎉
