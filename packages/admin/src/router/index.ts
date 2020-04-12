import { routes } from './routes'
import Vue from 'vue'
import Router from 'vue-router'
import { APP_ENV } from '~/config'

Vue.use(Router)

export function createRouter () {
  const router = new Router({
    mode: 'history',
    base: APP_ENV.isProd ? '/admin/' : undefined,
    routes
  })
  return router
}
