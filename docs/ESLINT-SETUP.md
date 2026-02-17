# ESLint 配置指南

本项目使用 ESLint 进行代码质量检查，确保代码风格统一和最佳实践。

## 📦 已安装的依赖

```json
{
  "devDependencies": {
    "eslint": "^10.0.0",
    "eslint-plugin-vue": "^10.8.0",
    "@eslint/js": "^10.0.1",
    "vue-eslint-parser": "^10.4.0"
  }
}
```

## ⚙️ 配置文件

### eslint.config.js

```javascript
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.js', '**/*.vue'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        performance: 'readonly',
        // ... 其他全局变量
      }
    },
    rules: {
      // 自定义规则
    }
  }
]
```

## 🎯 配置的规则

### Vue 特定规则

| 规则 | 设置 | 说明 |
|------|------|------|
| `vue/multi-word-component-names` | off | 允许单词组件名 |
| `vue/no-v-html` | warn | v-html 使用警告 |
| `vue/require-default-prop` | off | 不强制 prop 默认值 |
| `vue/max-attributes-per-line` | off | 不限制每行属性数 |
| `vue/attribute-hyphenation` | off | 允许驼峰属性名 |
| `vue/html-self-closing` | warn | 自闭合标签建议 |

### JavaScript 规则

| 规则 | 设置 | 说明 |
|------|------|------|
| `no-unused-vars` | warn | 未使用变量警告 |
| `no-console` | off (dev) | 开发环境允许 console |
| `no-debugger` | error (prod) | 生产环境禁止 debugger |
| `no-undef` | error | 未定义变量报错 |
| `prefer-const` | warn | 建议使用 const |
| `eqeqeq` | warn | 建议使用 === |

## 🚀 使用方法

### 命令行

```bash
# 检查所有文件
npm run lint

# 自动修复问题
npm run lint:fix

# 检查特定文件
npx eslint src/App.vue

# 检查并修复特定文件
npx eslint src/App.vue --fix
```

### package.json 脚本

```json
{
  "scripts": {
    "lint": "eslint . --ext .vue,.js",
    "lint:fix": "eslint . --ext .vue,.js --fix"
  }
}
```

## 📁 忽略文件

配置中已忽略：

```javascript
{
  ignores: [
    'dist/**',          // 构建输出
    'node_modules/**',  // 依赖包
    'public/**',        // 静态资源
    '*.config.js',      // 配置文件
    '.github/**'        // GitHub 配置
  ]
}
```

## 🔧 VS Code 集成

### 安装扩展

1. 安装 [ESLint 扩展](vscode:extension/dbaeumer.vscode-eslint)

### 配置自动修复

在 `.vscode/settings.json` 中添加：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "vue"
  ]
}
```

## 📊 检查报告示例

### ✅ 无问题
```bash
$ npm run lint
✔ 0 problems (0 errors, 0 warnings)
```

### ⚠️ 有警告
```bash
$ npm run lint

src/App.vue
  15:7  warning  'enableGlow' is assigned but never used  no-unused-vars

✖ 1 problem (0 errors, 1 warning)
```

### ❌ 有错误
```bash
$ npm run lint

src/App.vue
  171:17  error  'performance' is not defined  no-undef

✖ 1 problem (1 error, 0 warnings)
```

## 🎨 自定义规则

### 添加新规则

编辑 `eslint.config.js`：

```javascript
rules: {
  // 添加自定义规则
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  'vue/component-name-in-template-casing': ['error', 'PascalCase'],
  'vue/prop-name-casing': ['error', 'camelCase']
}
```

### 覆盖规则（针对特定文件）

```javascript
{
  files: ['**/*.test.js'],
  rules: {
    'no-unused-expressions': 'off'
  }
}
```

## 🔍 常见问题

### Q: 如何禁用某行的检查？

```javascript
// eslint-disable-next-line no-console
console.log('debug info')

// 或多行
/* eslint-disable no-console */
console.log('log 1')
console.log('log 2')
/* eslint-enable no-console */
```

### Q: 如何禁用整个文件的检查？

文件顶部添加：
```javascript
/* eslint-disable */
```

### Q: 全局变量未定义错误？

在 `eslint.config.js` 的 `globals` 中添加：
```javascript
globals: {
  myGlobal: 'readonly'
}
```

## 🔗 Git Hooks 集成

配合 husky 和 lint-staged 使用：

```json
{
  "lint-staged": {
    "*.{js,vue}": ["eslint --fix"]
  }
}
```

每次提交时自动运行检查。详见 [Git Hooks 指南](./GIT-HOOKS-GUIDE.md)。

## 📚 相关资源

- [ESLint 官方文档](https://eslint.org/)
- [eslint-plugin-vue](https://eslint.vuejs.org/)
- [ESLint 规则列表](https://eslint.org/docs/rules/)
- [Vue.js 风格指南](https://vuejs.org/style-guide/)

## 💡 最佳实践

1. ✅ 提交前运行 `npm run lint`
2. ✅ 修复所有错误和警告
3. ✅ 不要使用 `eslint-disable` 除非必要
4. ✅ 团队成员使用相同的配置
5. ✅ 定期更新 ESLint 和插件版本

---

**代码质量有保障！** ESLint 帮助你写出更好的代码！✨
