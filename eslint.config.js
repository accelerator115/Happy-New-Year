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
        // 浏览器环境
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        clearTimeout: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        performance: 'readonly',
        confirm: 'readonly',
        alert: 'readonly',
        // Vite 环境变量
        import: 'readonly',
      }
    },
    rules: {
      // Vue 规则
      'vue/multi-word-component-names': 'off', // 允许单词组件名
      'vue/no-v-html': 'warn', // v-html 警告而不是错误
      'vue/require-default-prop': 'off', // 不强制要求 prop 默认值
      'vue/require-explicit-emits': 'warn', // 建议显式声明 emits
      'vue/max-attributes-per-line': 'off', // 关闭每行最大属性数限制
      'vue/html-indent': ['warn', 2, { 
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: false,
        ignores: []
      }], // 宽松的缩进规则
      'vue/html-self-closing': ['warn', {
        html: {
          void: 'never',
          normal: 'never',
          component: 'always'
        }
      }], // 宽松的自闭合规则
      'vue/attributes-order': 'off', // 关闭属性顺序要求
      'vue/attribute-hyphenation': 'off', // 允许驼峰命名的属性
      
      // JavaScript 规则
      'no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_|^enableGlow'
      }], // 未使用的变量警告
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境警告 console
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 生产环境禁止 debugger
      'no-undef': 'error', // 未定义的变量报错
      'no-redeclare': 'error', // 禁止重复声明
      'no-var': 'warn', // 建议使用 let/const 而不是 var
      'prefer-const': 'warn', // 建议使用 const
      'eqeqeq': ['warn', 'smart'], // 建议使用 === 而不是 ==
    }
  },
  {
    // 忽略的文件
    ignores: [
      'dist/**',
      'node_modules/**',
      'public/**',
      '*.config.js',
      '.github/**',
    ]
  }
]
