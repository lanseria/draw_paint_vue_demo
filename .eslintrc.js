// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': 0,
    'no-console': 0,
    'no-plusplus': 0,
    'no-continue': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-restricted-syntax': 0,
    'consistent-return': 0,
    'no-bitwise': 0,
    'import/no-unresolved': 0,
    'no-trailing-spaces': 0,
    'no-fallthrough': 0,
    'linebreak-style': 0,
    'space-before-function-paren': 0,
    'one-var-declaration-per-line': 0,
    'one-var': 0,
    'prefer-const': 0,
    'no-cond-assign': 0,
    'no-mixed-operators': 0,
    'prefer-template': 0,
    'no-use-before-define': 0

  }
}
