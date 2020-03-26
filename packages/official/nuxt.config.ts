import { Configuration } from '@nuxt/types'
require('dotenv').config() // 使server端也可以访问

const NuxtConfig: Configuration = {
  mode: 'universal',
  srcDir: 'src',
  head: {
    title: '江湖客栈',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#fff' },
  css: [
    'minireset.css',
    '~/assets/styles/global.styl'
  ],
  plugins: [
    '~plugins/styles.plugin.ts'
  ],
  server: {
    host: '0.0.0.0'
  },
  // SSR need active
  // generate: {
  //   routes: [
  //     '/'
  //   ]
  // },
  modules: [
    '@nuxtjs/style-resources',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/svg-sprite'
  ],
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/eslint-module',
    '@nuxtjs/router',
    '@nuxtjs/vuetify'
  ],
  build: {
    extend(config) {
      if (config.resolve) {
        config.resolve.symlinks = false
      }
    }
  },
  // plugins config
  routerModule: {
    path: 'src/router',
    fileName: 'index.ts'
  },
  styleResources: {
    // stylus config
    stylus: ['~/assets/styles/var.styl', '~/assets/styles/bem.styl']
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: './vuetify.options.ts'
  },
  dotenv: {
    path: './src/config/',
    filename: `${process.env.NODE_ENV}.env`
  },
  eslint: {
    fix: true,
    formatter: 'table'
  },
  typescript: {
    typeCheck: {
      eslint: true
    }
  },
  svgSprite: {
    input: '~/assets/svg/'
  }
}

export default NuxtConfig
