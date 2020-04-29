module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    "ecmaFeatures": {
      legacyDecorators: true
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/recommended',
    '@nuxtjs/eslint-config-typescript',
  ],
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  // see eslint-config.md
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  }
}
