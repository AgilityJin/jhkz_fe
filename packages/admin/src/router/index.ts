import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes'
import { APP_ENV } from '~/config'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    base: APP_ENV.isProd ? '/admin/' : undefined,
    routes
  })
}
