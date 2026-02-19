# Vitest 配置指南

本项目使用 **Vitest** 作为单元测试框架。

## 📦 安装

### 安装依赖
```bash
npm install --legacy-peer-deps
```

依赖项包括：
- `vitest` - 测试框架
- `@vitest/ui` - 测试 UI 界面
- `happy-dom` - 轻量级 DOM 环境
- `@vitest/coverage-v8` - 代码覆盖率

## 🚀 命令

### 运行测试
```bash
# 运行所有测试
npm run test

# 运行测试并监听文件变化
npm run test -- --watch

# 运行指定文件的测试
npm run test src/utils/firework.js
```

### UI 界面
```bash
# 在浏览器中查看测试结果
npm run test:ui
```

### 代码覆盖率
```bash
# 生成代码覆盖率报告
npm run test:coverage

# 覆盖率报告位置：coverage/
```

## 📂 测试文件结构

```
src/
├── __tests__/
│   ├── example.spec.js              # 基础示例测试
│   ├── test-suite-completeness.spec.js  # 测试套件完整性验证
│   ├── composables/
│   │   ├── useBlessings.spec.js      # 祝福语功能测试
│   │   ├── useFireworks.spec.js      # 烟花效果测试
│   │   └── usePerformance.spec.js    # 性能检测测试
│   └── utils/
│       ├── firework.spec.js          # 烟花粒子类测试
│       └── devtools-detector.spec.js # 开发工具检测测试
├── composables/
│   ├── useBlessings.js
│   ├── useFireworks.js
│   └── usePerformance.js
├── utils/
│   ├── firework.js
│   └── devtools-detector.js
└── ...
```

## 📊 测试覆盖情况

### 1. **useBlessings.spec.js** ✅
- **祝福语添加**：验证自定义祝福语的添加、空值过滤、重复添加
- **祝福语显示**：位置计算、颜色转换、ID分配、超时自动移除
- **默认祝福语**：验证预设祝福语列表

**关键测试**：
- ✅ `addCustomBlessing()` - 添加和验证自定义祝福语
- ✅ `showBlessing()` - 显示祝福语并自动移除
- ✅ 祝福语去重和样式处理

### 2. **useFireworks.spec.js** ✅
- **初始化**：Canvas 上下文配置、质量设置
- **粒子管理**：粒子限制、动态调整、对象池复用
- **Canvas 操作**：尺寸适配、DPR 处理、性能优化
- **帧率控制**：FPS 限制、frame interval 计算
- **动画循环**：requestAnimationFrame、混合模式、尾迹效果

**关键测试**：
- ✅ Canvas 初始化和响应式尺寸
- ✅ 粒子数量限制和动态调整
- ✅ 帧率控制和性能优化
- ✅ 动画生命周期和清理

### 3. **usePerformance.spec.js** ✅
- **设备检测**：CPU 核心、内存、移动设备识别
- **性能等级**：Low/Medium/High 质量预设
- **自适应质量**：FPS 监控、自动调整设置
- **内存信息**：堆大小监控（如支持）

**关键测试**：
- ✅ 设备性能检测和分类
- ✅ 质量预设的一致性
- ✅ FPS 监控和质量调整
- ✅ 内存信息访问

### 4. **firework.spec.js** ✅
- **初始化**：位置、颜色、物理参数
- **物理模拟**：重力、摩擦力、速度更新
- **渲染**：透明度、亮度、颜色计算
- **对象池**：粒子复用、池大小限制

**关键测试**：
- ✅ 粒子物理模拟（重力、摩擦）
- ✅ 对象池获取和释放
- ✅ 颜色和亮度变化
- ✅ 生命周期管理

### 5. **devtools-detector.spec.js** ✅
- **检测机制**：窗口尺寸差异、多语言支持
- **UI 渲染**：警告对话框、动画效果
- **内容保护**：模糊化、禁用交互、防止选择
- **状态管理**：开启/关闭状态切换

**关键测试**：
- ✅ 开发工具检测逻辑
- ✅ 警告 UI 和动画
- ✅ 内容安全保护
- ✅ 多语言支持

### 6. **example.spec.js** ✅
- **Vue 反应式**：computed、ref、watch、响应式对象
- **数学运算**：加法、乘法、模运算、幂运算
- **数组操作**：push、filter、map、find、includes
- **字符串操作**：拼接、模板字符串、字符串方法

**关键测试**：
- ✅ Vue 3 组合式 API
- ✅ 基础数学和字符串操作
- ✅ 数组函数式编程
- ✅ 缓存和依赖追踪

### 7. **test-suite-completeness.spec.js** ✅
- **覆盖验证**：确保所有模块都有测试
- **测试质量指标**：AAA 模式、描述性名称、隔离
- **模拟策略**：浏览器 API、生命周期钩子、计时器

## 📝 编写测试

### 基础示例
```javascript
import { describe, it, expect } from 'vitest'

describe('功能名称', () => {
  it('应该...', () => {
    expect(实际值).toBe(期望值)
  })
})
```

### Vue 组件测试
```javascript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from './MyComponent.vue'

describe('MyComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(MyComponent, {
      props: { msg: 'Hello' }
    })
    expect(wrapper.text()).toContain('Hello')
  })
})
```

### Composables 测试
```javascript
import { describe, it, expect, beforeEach } from 'vitest'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  let counter

  beforeEach(() => {
    counter = useCounter()
  })

  it('should increment', () => {
    expect(counter.count.value).toBe(0)
    counter.increment()
    expect(counter.count.value).toBe(1)
  })
})
```

### 异步测试
```javascript
it('should handle async operations', async () => {
  const result = await fetchData()
  expect(result).toBeDefined()
})
```

### 模拟和间谍
```javascript
import { vi } from 'vitest'

it('should call function', () => {
  const spy = vi.fn()
  spy(1, 2)
  expect(spy).toHaveBeenCalledWith(1, 2)
})
```

## ✨ 断言方法

| 方法 | 说明 |
|------|------|
| `toBe(value)` | 严格相等性检查 |
| `toEqual(value)` | 深度相等性检查 |
| `toContain(value)` | 检查数组或字符串包含 |
| `toThrow()` | 检查函数抛出异常 |
| `toBeCloseTo(value)` | 浮点数比较 |
| `toBeTruthy()` | 检查真值 |
| `toBeFalsy()` | 检查假值 |
| `toHaveBeenCalled()` | 检查函数是否被调用 |
| `toHaveBeenCalledWith(args)` | 检查函数调用参数 |
| `toHaveLength(length)` | 检查长度 |
| `toBeGreaterThan(value)` | 大于比较 |
| `toBeLessThan(value)` | 小于比较 |
| `toMatch(regex)` | 正则表达式匹配 |

## 🔧 Vitest 配置

配置文件：`vitest.config.js`

```javascript
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,              // 全局 API（describe, it 等）
    environment: 'happy-dom',   // 使用 happy-dom 作为 DOM 环境
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '.github/',
        'docs/'
      ]
    }
  }
})
```

## 📊 CI/CD 集成

GitHub Actions 工作流程中的测试步骤：

```yaml
- name: Run tests
  run: npm run test

- name: Run test coverage
  run: npm run test:coverage
```

测试失败会导致 CI 流程中断，阻止合并。

## 🛠️ 调试

### 在测试中打印日志
```javascript
it('should work', () => {
  console.log('Debug info:', value)
  expect(value).toBe(expected)
})
```

### 跳过特定测试
```javascript
it.skip('should skip this test', () => {
  // ...
})
```

### 只运行特定测试
```javascript
it.only('should only run this test', () => {
  // ...
})
```

### 使用 Vitest UI 调试
```bash
npm run test:ui
```

打开浏览器访问 `http://localhost:51204/__vitest__/`，可以：
- 可视化查看测试结果
- 过滤和搜索特定测试
- 查看详细的错误信息
- 单独运行测试

## 📈 测试统计

当前项目包含：

- **7 个测试文件**
  - 6 个功能测试
  - 1 个补完性检查

- **90+ 个测试用例**
  - composables: ~35 个测试
  - utils: ~35 个测试
  - example: ~15 个测试
  - test-suite-completeness: ~10 个测试

- **覆盖范围**
  - ✅ 烟花粒子系统
  - ✅ 祝福语功能
  - ✅ 性能检测
  - ✅ 开发工具检测
  - ✅ Vue 3 反应式
  - ✅ 基础工具函数

## 📖 相关资源

- [Vitest 官方文档](https://vitest.dev/)
- [Vitest API](https://vitest.dev/api/)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Vitest UI](https://vitest.dev/guide/ui.html)

## 🤝 贡献指南

### 添加新测试

1. 在相应目录创建 `*.spec.js` 文件
2. 遵循已有的测试模式和命名约定
3. 确保测试隔离（使用 `beforeEach`）
4. 为边界情况编写测试
5. 添加必要的注释说明测试目的

### 运行测试前检查

```bash
# 运行所有测试
npm run test

# 检查覆盖率
npm run test:coverage

# 使用 UI 验证
npm run test:ui
```

### 提交验证

在提交 PR 前，确保：
- ✅ 所有测试通过
- ✅ 覆盖率不降低
- ✅ 新增功能有对应测试
- ✅ 测试名称清晰描述测试内容

## 🎯 最佳实践

1. **一个测试只验证一个功能**
   ```javascript
   // ✅ 好
   it('should add custom blessing', () => { ... })
   it('should remove blessing after timeout', () => { ... })

   // ❌ 避免
   it('should add and remove blessing', () => { ... })
   ```

2. **使用描述性名称**
   ```javascript
   // ✅ 好
   it('should reject empty blessing strings', () => { ... })

   // ❌ 避免
   it('works', () => { ... })
   ```

3. **遵循 AAA 模式**
   ```javascript
   it('should calculate correct total', () => {
     // Arrange
     const items = [1, 2, 3]
     
     // Act
     const total = sum(items)
     
     // Assert
     expect(total).toBe(6)
   })
   ```

4. **使用 beforeEach 进行初始化**
   ```javascript
   describe('MyComponent', () => {
     let component

     beforeEach(() => {
       component = setup()
     })

     it('test 1', () => { ... })
     it('test 2', () => { ... })
   })
   ```

