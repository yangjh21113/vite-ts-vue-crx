module.exports = {
  root: true,
  globals: {
    _: true
  },
  parserOptions: {
    // parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },

  extends: ['standard', 'plugin:vue/vue3-essential', 'plugin:prettier/recommended'],

  // add your custom rules here
  // it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    indent: [
      2,
      2,
      {
        SwitchCase: 1 // 对于 switch 语句的 case 关键字，增加一级缩进
      }
    ],
    semi: [2, 'never'], // 要求或禁止使用分号代替 ASI,即禁用行尾使用分号
    eqeqeq: [2, 'always'], // 使用=== !== 代替== !=
    'no-debugger': 2, // 禁止使用debugger语句
    'no-else-return': 2, // 如果if语句里面有return,后面不能跟else语句
    camelcase: 2, // 强制驼峰法命名
    quotes: [2, 'single'], // 使用单引号
    'eol-last': 2, // 文件末尾强制换行
    'no-undef': 2, // 禁止未定义变量
    'no-mixed-spaces-and-tabs': [2], // 禁止空格和 tab 的混合缩进
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index'] // 需要忽略的组件名
      }
    ],
    'prettier/prettier': [
      2,
      {
        tabWidth: 2, // 指定每个缩进级别的空格数<int>，默认2
        useTabs: false, // 用制表符而不是空格缩进行<bool>，默认false
        printWidth: 120, // 一行的字符数如果超过会进行换行，默认为80
        singleQuote: true, // 字符串是否使用单引号，默认为false，使用双引号
        endOfLine: 'auto', // 避免报错delete (cr)的错
        proseWrap: 'always',
        semi: false, // 是否加加分号
        trailingComma: 'none', // 结尾处加逗号
        htmlWhitespaceSensitivity: 'ignore', // 忽略'>'下落问题
        arrowParens: 'avoid', // 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
        bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
        jsxSingleQuote: false // 在jsx中使用单引号代替双引号
      }
    ]
  }
}
