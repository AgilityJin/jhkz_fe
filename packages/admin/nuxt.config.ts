import { Configuration } from '@nuxt/types'
require('dotenv').config() // 使server端也可以访问

const NuxtConfig: Configuration = {
  mode: 'spa',
  srcDir: 'src',
  head: {
    titleTemplate: '%s - ' + '江湖客栈后台管理系统',
    title:'江湖客栈',
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
    '~/plugins/api.plugin.ts',
    '~/plugins/message.plugin.ts',
    '~/plugins/directives.plugin.ts'
  ],
  server: {
    // host: '0.0.0.0',
    port: 3200,
  },
  router: {
    base: process.env.NODE_ENV === "production" ? '/admin/' : undefined
  },
  // SSR need active
  generate: {
    routes: [
      '/'
    ]
  },
  modules: [
    '@nuxtjs/style-resources',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/proxy'
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
    },
    babel: {
      plugins: [
        [
          "component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ]
    },
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
  },
  typescript: {
    typeCheck: {
      eslint: true
    }
  },
  svgSprite: {
    input: '~/assets/svg/'
  },
  // https://github.com/chimurai/http-proxy-middleware#options
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      pathRewrite: {
        '^/api': '/' // 需要rewrite的, 路径重写
      }
    }
  },
}

export default NuxtConfig
