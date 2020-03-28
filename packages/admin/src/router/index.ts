import Vue from 'vue'
import Router from 'vue-router'
import { APP_ENV } from '~/config'

Vue.use(Router)

const home = () => import('~/pages/index.vue').then(m => m.default || m)

export function createRouter () {
  return new Router({
    mode: 'history',
    base: APP_ENV.isProd ? '/admin/' : undefined,
    routes: [
      {
        path: '/',
        component: home
      }
    ]
  })
}
