import { RouteConfig } from 'vue-router'

const home = () => import('~/pages/index.vue').then(m => m.default || m)

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: home
  }
]
